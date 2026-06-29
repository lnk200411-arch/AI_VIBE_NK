import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DownloadIcon from '@mui/icons-material/Download';
import ZoomInIcon from '@mui/icons-material/ZoomIn';

/**
 * ImageCard 컴포넌트
 *
 * Props:
 * @param {string} name - 파일명 [Required]
 * @param {string} url - 이미지 Public URL [Required]
 * @param {function} onPreview - 미리보기 클릭 시 콜백 [Optional]
 *
 * Example usage:
 * <ImageCard name="photo.jpg" url="https://..." onPreview={handlePreview} />
 */
function ImageCard({ name, url, onPreview }) {
  const handleDownload = async () => {
    const res = await fetch(url);
    const blob = await res.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const displayName = name.replace(/^\d+_/, '');

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        transition: 'box-shadow 0.2s ease',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <CardMedia
        component='img'
        image={url}
        alt={displayName}
        onClick={() => onPreview?.({ name, url })}
        sx={{
          height: 200,
          objectFit: 'cover',
          cursor: 'pointer',
        }}
      />
      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Typography
          variant='body2'
          color='text.secondary'
          noWrap
          title={displayName}
        >
          {displayName}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title='미리보기'>
          <IconButton size='small' onClick={() => onPreview?.({ name, url })}>
            <ZoomInIcon fontSize='small' />
          </IconButton>
        </Tooltip>
        <Tooltip title='다운로드'>
          <IconButton size='small' onClick={handleDownload}>
            <DownloadIcon fontSize='small' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}

export default ImageCard;
