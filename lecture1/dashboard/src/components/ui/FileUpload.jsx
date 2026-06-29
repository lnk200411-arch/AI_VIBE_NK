import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { supabase, BUCKET } from '../../lib/supabase';

/**
 * FileUpload 컴포넌트
 *
 * Props:
 * @param {function} onUploadSuccess - 업로드 성공 시 호출되는 콜백 [Required]
 */
function FileUpload({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [error, setError] = React.useState('');
  const inputRef = React.useRef(null);

  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];

  const uploadFile = async (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('이미지 파일만 업로드 가능합니다. (jpg, png, gif, webp, svg)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    setError('');
    setIsUploading(true);

    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(fileName, file);

    setIsUploading(false);

    if (uploadError) {
      setError(`업로드 실패: ${uploadError.message}`);
      return;
    }

    onUploadSuccess();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(uploadFile);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    files.forEach(uploadFile);
  };

  return (
    <Box>
      <Box
        onClick={() => !isUploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: isDragging ? 'primary.main' : 'divider',
          borderRadius: 3,
          p: { xs: 4, md: 6 },
          textAlign: 'center',
          cursor: isUploading ? 'not-allowed' : 'pointer',
          bgcolor: isDragging ? 'primary.50' : 'background.paper',
          transition: 'all 0.2s',
          '&:hover': {
            borderColor: 'primary.main',
            bgcolor: 'action.hover',
          },
        }}
      >
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          multiple
          hidden
          onChange={handleFileChange}
        />
        {isUploading ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={40} />
            <Typography color='text.secondary'>업로드 중...</Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Typography variant='h6' color='text.primary'>
              이미지를 드래그하거나 클릭하여 업로드
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              jpg, png, gif, webp, svg · 최대 10MB · 다중 선택 가능
            </Typography>
            <Button variant='contained' component='span' sx={{ mt: 1 }}>
              파일 선택
            </Button>
          </Box>
        )}
      </Box>
      {error && (
        <Alert severity='error' sx={{ mt: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default FileUpload;
