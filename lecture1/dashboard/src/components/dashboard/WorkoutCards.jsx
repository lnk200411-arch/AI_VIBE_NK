import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const workouts = [
  {
    id: 1,
    title: '모닝 루틴',
    desc: '전신 스트레칭 + 코어',
    duration: '21 m',
    icon: <FitnessCenterIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />,
    bgColor: '#72E040',
  },
  {
    id: 2,
    title: '저녁 산책',
    desc: '유산소 운동 30분',
    duration: '35 m',
    icon: <DirectionsWalkIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />,
    bgColor: '#E84228',
  },
  {
    id: 3,
    title: '요가 세션',
    desc: '마음 챙김 + 유연성',
    duration: '15 m',
    icon: <SelfImprovementIcon sx={{ fontSize: 28, color: '#FFFFFF' }} />,
    bgColor: '#F0956A',
  },
];

/**
 * WorkoutCards 컴포넌트 - 오늘의 운동 카드 목록
 *
 * Example usage:
 * <WorkoutCards />
 */
function WorkoutCards() {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#888888',
          }}
        >
          오늘의 운동
        </Typography>
        <Typography
          sx={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#E84228',
            cursor: 'pointer',
            border: '1px solid #E84228',
            borderRadius: '20px',
            px: 1.5,
            py: 0.5,
          }}
        >
          더보기
        </Typography>
      </Box>

      <Grid container spacing={1.5}>
        {workouts.map((w) => (
          <Grid size={{ xs: 12 }} key={w.id}>
            <Card
              sx={{
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.15s',
                '&:hover': { transform: 'translateY(-1px)' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2, gap: 2 }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: '14px',
                    bgcolor: w.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {w.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{ fontSize: '0.9375rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}
                  >
                    {w.title}
                  </Typography>
                  <Typography variant='body2' sx={{ color: '#888888', mt: 0.25 }}>
                    {w.desc}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 14, color: '#AAAAAA' }} />
                  <Typography
                    sx={{ fontSize: '0.8125rem', fontWeight: 600, color: '#555555' }}
                  >
                    {w.duration}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default WorkoutCards;
