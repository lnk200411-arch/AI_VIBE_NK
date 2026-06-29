import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase, BUCKET } from '../../lib/supabase';

/**
 * ImageCard 컴포넌트
 *
 * Props:
 * @param {string} name - 스토리지에 저장된 파일명 [Required]
 * @param {string} url - 이미지 공개 URL [Required]
 * @param {function} onDelete - 삭제 후 갤러리 갱신 콜백 [Required]
 *
 * Example usage:
 * <ImageCard name="abc.jpg" url="https://..." onDelete={refresh} />
 */
function ImageCard({ name, url, onDelete }) {
  const displayName = name.replace(/^\d+_[a-z0-9]+\./, '').slice(0, 24) || name;

  const handleDownload = async () => {
    const { data, error } = await supabase.storage.from(BUCKET).download(name);
    if (error || !data) return;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(data);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleDelete = async () => {
    const { error } = await supabase.storage.from(BUCKET).remove([name]);
    if (!error) onDelete();
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component='img'
        image={url}
        alt={displayName}
        sx={{
          height: 200,
          objectFit: 'cover',
          bgcolor: 'grey.100',
        }}
      />
      <CardContent sx={{ py: 1, flexGrow: 1 }}>
        <Typography variant='caption' color='text.secondary' noWrap>
          {displayName}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title='다운로드'>
          <IconButton size='small' onClick={handleDownload} color='primary'>
            <DownloadIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='삭제'>
          <IconButton size='small' onClick={handleDelete} color='error'>
            <DeleteIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default ImageCard;
