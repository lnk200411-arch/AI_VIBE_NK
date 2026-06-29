import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { getFileType } from '../utils/fileUtils';

/**
 * useFiles 훅 - 파일 목록 조회, 정렬, 필터, 검색
 *
 * @param {object} options
 * @param {string} options.mode - 'all'|'mine'|'shared'|'recent'|'favorites'|'trash'
 * @param {string} options.userId - 사용자 ID
 * @param {string} options.searchQuery - 검색어
 * @param {string} options.sortBy - 'created_at'|'file_name'|'size'
 * @param {string} options.filterType - 'all'|'image'|'video'|...
 * @param {number} options.refreshKey - 강제 리프레시 트리거
 */
export function useFiles({ mode = 'all', userId, searchQuery = '', sortBy = 'created_at', filterType = 'all', refreshKey = 0 }) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFiles = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase.from('files').select('*');

      if (mode === 'trash') {
        query = query.eq('is_deleted', true);
      } else {
        query = query.eq('is_deleted', false);
      }

      if (mode === 'mine' && userId) query = query.eq('owner_id', userId);
      if (mode === 'shared') query = query.eq('is_shared', true);
      if (mode === 'favorites' && userId) {
        const { data: favs } = await supabase.from('favorites').select('file_id').eq('user_id', userId);
        const ids = (favs || []).map((f) => f.file_id);
        if (ids.length === 0) { setFiles([]); setIsLoading(false); return; }
        query = query.in('id', ids);
      }
      if (mode === 'recent') {
        query = query.order('created_at', { ascending: false }).limit(50);
      }

      if (searchQuery) {
        query = query.ilike('file_name', `%${searchQuery}%`);
      }

      const order = sortBy === 'file_name'
        ? { column: 'file_name', ascending: true }
        : sortBy === 'size'
          ? { column: 'size', ascending: false }
          : { column: 'created_at', ascending: false };

      query = query.order(order.column, { ascending: order.ascending });

      const { data, error: fetchError } = await query;
      if (fetchError) throw fetchError;

      let result = data || [];

      if (filterType !== 'all') {
        result = result.filter((f) => {
          const { type } = getFileType(f.extension);
          return type === filterType;
        });
      }

      setFiles(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [mode, userId, searchQuery, sortBy, filterType, refreshKey]);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  return { files, isLoading, error, refetch: fetchFiles };
}
