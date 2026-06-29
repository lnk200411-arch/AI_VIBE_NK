import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

/**
 * HeroSection 컴포넌트 - 라임 그린 히어로 배너
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <Box
      sx={{
        borderRadius: '20px',
        bgcolor: '#72E040',
        p: 3,
        mb: 3,
        position: 'relative',
        overflow: 'hidden',
        minHeight: '160px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* 장식 원형 배경 */}
      <Box
        sx={{
          position: 'absolute',
          right: -40,
          top: -40,
          width: 180,
          height: 180,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.12)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: 30,
          bottom: -50,
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.08)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: 120,
          top: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          bgcolor: 'rgba(255,255,255,0.1)',
          pointerEvents: 'none',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          sx={{
            fontSize: { xs: '1.5rem', md: '2rem' },
            fontWeight: 800,
            color: '#FFFFFF',
            lineHeight: 1.2,
            mb: 0.75,
          }}
        >
          오늘의 추천 활동
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.85)',
            mb: 2.5,
            lineHeight: 1.6,
          }}
        >
          목표에 맞는 운동 루틴을 시작해보세요 💪
        </Typography>
        <Button
          variant='contained'
          startIcon={<PlayCircleIcon />}
          sx={{
            bgcolor: '#E84228',
            color: '#FFFFFF',
            borderRadius: '24px',
            py: 1,
            px: 3,
            fontSize: '0.875rem',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(232,66,40,0.35)',
            '&:hover': { bgcolor: '#C43020', boxShadow: '0 4px 16px rgba(232,66,40,0.45)' },
          }}
        >
          시작하기
        </Button>
      </Box>
    </Box>
  );
}

export default HeroSection;
