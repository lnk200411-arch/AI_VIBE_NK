import Box from '@mui/material/Box';
import Header from './Header';
import Sidebar from './Sidebar';

/**
 * AppLayout 컴포넌트 - Header + Sidebar + Main 3단 레이아웃
 *
 * Props:
 * @param {React.ReactNode} children - 메인 콘텐츠 영역 [Required]
 * @param {function} onUploadClick - 업로드 버튼 핸들러 [Optional]
 * @param {function} onSearch - 검색 핸들러 [Optional]
 *
 * Example usage:
 * <AppLayout onUploadClick={handleUpload}>{children}</AppLayout>
 */
function AppLayout({ children, onUploadClick, onSearch }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onUploadClick={onUploadClick} onSearch={onSearch} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <Box
          component='main'
          sx={{
            flex: 1,
            overflow: 'auto',
            bgcolor: '#F8FAFC',
            minHeight: 'calc(100vh - 56px)',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default AppLayout;
