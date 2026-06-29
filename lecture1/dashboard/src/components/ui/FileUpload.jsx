import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { supabase } from '../../lib/supabase';

/**
 * FileUpload 컴포넌트
 *
 * Props:
 * @param {function} onUploadSuccess - 업로드 성공 시 호출되는 콜백 [Required]
 * @param {function} onUploadError - 업로드 실패 시 호출되는 콜백 [Optional]
 *
 * Example usage:
 * <FileUpload onUploadSuccess={handleSuccess} onUploadError={handleError} />
 */
function FileUpload({ onUploadSuccess, onUploadError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const uploadFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      onUploadError?.('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setIsUploading(true);
    const fileName = `${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from('gallery')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    setIsUploading(false);

    if (error) {
      onUploadError?.(error.message);
    } else {
      onUploadSuccess?.();
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(uploadFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e) => handleFiles(e.target.files);

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isUploading && fileInputRef.current?.click()}
      sx={{
        border: '2px dashed',
        borderColor: isDragging ? 'primary.main' : 'grey.400',
        borderRadius: 3,
        p: { xs: 4, md: 6 },
        textAlign: 'center',
        cursor: isUploading ? 'not-allowed' : 'pointer',
        bgcolor: isDragging ? 'primary.50' : 'grey.50',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: 'primary.main',
          bgcolor: 'primary.50',
        },
      }}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        multiple
        hidden
        onChange={handleInputChange}
      />
      {isUploading ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress size={40} />
          <Typography variant='body2' color='text.secondary'>
            업로드 중...
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
          <Typography variant='h6' color='text.primary'>
            이미지를 드래그하거나 클릭하여 업로드
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            PNG, JPG, GIF, WEBP 지원 · 여러 파일 동시 업로드 가능
          </Typography>
          <Button variant='contained' size='small' sx={{ mt: 1 }}>
            파일 선택
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default FileUpload;
