import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Header 컴포넌트 - 상단 앱바
 *
 * Props:
 * @param {function} onUploadClick - 업로드 버튼 클릭 핸들러 [Optional]
 * @param {function} onSearch - 검색어 변경 핸들러 [Optional]
 *
 * Example usage:
 * <Header onUploadClick={handleUpload} onSearch={handleSearch} />
 */
function Header({ onUploadClick, onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <AppBar
      position='sticky'
      elevation={0}
      sx={{
        bgcolor: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        color: '#0F172A',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ gap: 2, minHeight: '56px !important', px: { xs: 2, md: 3 } }}>
        {/* 로고 (모바일) */}
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#2563EB',
            display: { xs: 'block', md: 'none' },
            flexShrink: 0,
          }}
        >
          FileShare
        </Typography>

        {/* 검색창 */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 480,
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#F1F5F9',
            borderRadius: '8px',
            px: 1.5,
            py: 0.75,
            gap: 1,
            border: '1px solid transparent',
            '&:focus-within': {
              border: '1px solid #2563EB',
              bgcolor: '#FFFFFF',
            },
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: '#94A3B8' }} />
          <InputBase
            placeholder='파일 검색...'
            value={searchValue}
            onChange={handleSearchChange}
            sx={{
              flex: 1,
              fontSize: '0.875rem',
              '& input': { padding: 0 },
            }}
          />
        </Box>

        <Box sx={{ flex: 1 }} />

        {/* 업로드 버튼 */}
        <Button
          variant='contained'
          startIcon={<CloudUploadIcon />}
          onClick={onUploadClick}
          sx={{
            bgcolor: '#2563EB',
            borderRadius: '8px',
            px: 2,
            py: 0.875,
            fontSize: '0.875rem',
            fontWeight: 600,
            flexShrink: 0,
            '&:hover': { bgcolor: '#1D4ED8' },
          }}
        >
          업로드
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
