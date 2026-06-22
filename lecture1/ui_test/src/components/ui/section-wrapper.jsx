import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

/**
 * SectionWrapper 컴포넌트
 *
 * Props:
 * @param {string} title - 섹션 제목 [Required]
 * @param {string} description - 섹션 설명 [Optional]
 * @param {React.ReactNode} children - 섹션 내용 [Required]
 *
 * Example usage:
 * <SectionWrapper title="버튼" description="MUI 버튼 변형 모음">
 *   <Button variant="contained">버튼</Button>
 * </SectionWrapper>
 */
function SectionWrapper({ title, description, children }) {
  return (
    <Box
      component='section'
      sx={{
        mb: { xs: 4, md: 6 },
        p: { xs: 2, md: 4 },
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography
        variant='h5'
        component='h2'
        sx={{ mb: 1, fontWeight: 600, color: 'text.primary' }}
      >
        { title }
      </Typography>
      {description && (
        <Typography variant='body2' sx={{ mb: 2, color: 'text.secondary' }}>
          { description }
        </Typography>
      )}
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        { children }
      </Box>
    </Box>
  );
}

export default SectionWrapper;
