import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BedtimeIcon from '@mui/icons-material/Bedtime';

const actions = [
  {
    id: 'heartrate',
    label: '심박수',
    value: '84',
    unit: 'bpm',
    icon: <FavoriteIcon sx={{ fontSize: 28, color: '#E84228' }} />,
    bgColor: '#FFF5F3',
  },
  {
    id: 'steps',
    label: '걸음수',
    value: '8,542',
    unit: 'steps',
    icon: <DirectionsWalkIcon sx={{ fontSize: 28, color: '#72E040' }} />,
    bgColor: '#F3FFF0',
  },
  {
    id: 'calories',
    label: '칼로리',
    value: '420',
    unit: 'kcal',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 28, color: '#F0956A' }} />,
    bgColor: '#FFF8F3',
  },
  {
    id: 'sleep',
    label: '수면',
    value: '7.5',
    unit: 'hrs',
    icon: <BedtimeIcon sx={{ fontSize: 28, color: '#9B8BE8' }} />,
    bgColor: '#F5F3FF',
  },
];

/**
 * QuickActions 컴포넌트 - 4개 퀵 액션 통계 카드 그리드
 *
 * Example usage:
 * <QuickActions />
 */
function QuickActions() {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#888888',
          mb: 2,
        }}
      >
        Quick Actions
      </Typography>
      <Grid container spacing={1.5}>
        {actions.map((action) => (
          <Grid size={{ xs: 6, sm: 3 }} key={action.id}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: '12px',
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.75,
                cursor: 'pointer',
                bgcolor: action.bgColor,
                border: '1px solid rgba(0,0,0,0.04)',
                transition: 'transform 0.15s',
                '&:hover': { transform: 'translateY(-2px)' },
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {action.icon}
              </Box>
              <Typography
                sx={{ fontSize: '1.25rem', fontWeight: 700, lineHeight: 1, color: '#1A1A1A' }}
              >
                {action.value}
              </Typography>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  sx={{ fontSize: '0.625rem', color: '#AAAAAA', lineHeight: 1, display: 'block' }}
                >
                  {action.unit}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.6875rem', color: '#555555', fontWeight: 600 }}
                >
                  {action.label}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default QuickActions;
