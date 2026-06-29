import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ImageCard from './ImageCard';
import { supabase, BUCKET } from '../../lib/supabase';

/**
 * ImageGallery 컴포넌트
 *
 * Props:
 * @param {number} refreshKey - 값이 바뀔 때마다 갤러리 재로드 [Required]
 *
 * Example usage:
 * <ImageGallery refreshKey={tick} />
 */
function ImageGallery({ refreshKey }) {
  const [images, setImages] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadImages = React.useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET).list('', {
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (error || !data) {
      setImages([]);
      setIsLoading(false);
      return;
    }

    const filtered = data.filter((f) => f.name !== '.emptyFolderPlaceholder');

    const withUrls = filtered.map((file) => {
      const { data: { publicUrl } } = supabase.storage
        .from(BUCKET)
        .getPublicUrl(file.name);
      return { ...file, url: publicUrl };
    });

    setImages(withUrls);
    setIsLoading(false);
  }, []);

  React.useEffect(() => {
    loadImages();
  }, [loadImages, refreshKey]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (images.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color='text.secondary' variant='h6'>
          업로드된 이미지가 없습니다.
        </Typography>
        <Typography color='text.secondary' variant='body2' sx={{ mt: 1 }}>
          위 업로드 영역을 통해 이미지를 추가해보세요.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {images.map((image) => (
        <Grid key={image.name} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
          <ImageCard name={image.name} url={image.url} onDelete={loadImages} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ImageGallery;
