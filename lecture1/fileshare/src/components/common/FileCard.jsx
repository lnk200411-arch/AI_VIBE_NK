import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DownloadIcon from '@mui/icons-material/Download';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ShareIcon from '@mui/icons-material/Share';
import FileTypeIcon from './FileTypeIcon';
import { formatBytes, formatDate } from '../../utils/fileUtils';

/**
 * FileCard 컴포넌트 - 파일 카드 아이템 (카드뷰)
 *
 * Props:
 * @param {object} file - 파일 데이터 객체 [Required]
 * @param {boolean} isSelected - 선택 여부 [Optional, 기본값: false]
 * @param {boolean} isFavorite - 즐겨찾기 여부 [Optional, 기본값: false]
 * @param {function} onSelect - 체크박스 선택 핸들러 [Optional]
 * @param {function} onDownload - 다운로드 핸들러 [Optional]
 * @param {function} onRename - 이름변경 핸들러 [Optional]
 * @param {function} onDelete - 삭제 핸들러 [Optional]
 * @param {function} onToggleFavorite - 즐겨찾기 토글 [Optional]
 *
 * Example usage:
 * <FileCard file={file} onDownload={handleDownload} />
 */
function FileCard({ file, isSelected, isFavorite, onSelect, onDownload, onRename, onDelete, onToggleFavorite }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [hovered, setHovered] = useState(false);

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        borderRadius: '12px',
        border: isSelected ? '2px solid #2563EB' : '1px solid #E2E8F0',
        boxShadow: hovered ? '0 4px 12px rgba(0,0,0,0.08)' : '0 1px 3px rgba(0,0,0,0.06)',
        transition: 'all 0.15s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      {/* 선택 체크박스 */}
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          left: 8,
          opacity: hovered || isSelected ? 1 : 0,
          transition: 'opacity 0.15s',
          zIndex: 1,
        }}
      >
        <Checkbox
          size='small'
          checked={!!isSelected}
          onChange={(e) => onSelect?.(file.id, e.target.checked)}
          sx={{ p: 0.25, bgcolor: '#FFFFFF', borderRadius: '4px', '&.Mui-checked': { color: '#2563EB' } }}
        />
      </Box>

      {/* 즐겨찾기 */}
      <Box sx={{ position: 'absolute', top: 8, right: 36, zIndex: 1 }}>
        <IconButton
          size='small'
          onClick={() => onToggleFavorite?.(file.id)}
          sx={{ opacity: hovered || isFavorite ? 1 : 0, transition: 'opacity 0.15s' }}
        >
          {isFavorite
            ? <StarIcon sx={{ fontSize: 16, color: '#F59E0B' }} />
            : <StarBorderIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
          }
        </IconButton>
      </Box>

      {/* 더보기 메뉴 */}
      <Box sx={{ position: 'absolute', top: 8, right: 4, zIndex: 1 }}>
        <IconButton size='small' onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon sx={{ fontSize: 16, color: '#94A3B8' }} />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5, pt: 1 }}>
          <FileTypeIcon extension={file.extension} size={52} />
        </Box>
        <Typography
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#0F172A',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            mb: 0.5,
          }}
        >
          {file.file_name}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: '0.6875rem', color: '#94A3B8' }}>
            {formatBytes(file.size)}
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: '#94A3B8' }}>
            {formatDate(file.created_at)}
          </Typography>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { borderRadius: '10px', border: '1px solid #E2E8F0', minWidth: 160 } }}
      >
        <MenuItem
          onClick={() => { onDownload?.(file); handleMenuClose(); }}
          sx={{ gap: 1.5, fontSize: '0.875rem' }}
        >
          <DownloadIcon fontSize='small' sx={{ color: '#64748B' }} />
          다운로드
        </MenuItem>
        <MenuItem
          onClick={() => { onRename?.(file); handleMenuClose(); }}
          sx={{ gap: 1.5, fontSize: '0.875rem' }}
        >
          <DriveFileRenameOutlineIcon fontSize='small' sx={{ color: '#64748B' }} />
          이름 변경
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ gap: 1.5, fontSize: '0.875rem' }}>
          <ShareIcon fontSize='small' sx={{ color: '#64748B' }} />
          공유
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => { onDelete?.(file.id); handleMenuClose(); }}
          sx={{ gap: 1.5, fontSize: '0.875rem', color: '#E11D48' }}
        >
          <DeleteOutlinedIcon fontSize='small' />
          삭제
        </MenuItem>
      </Menu>
    </Card>
  );
}

export default FileCard;
