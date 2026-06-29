import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const weekData = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 80 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 90 },
  { day: 'Fri', value: 72 },
  { day: 'Sat', value: 85 },
  { day: 'Sun', value: 50 },
];

const stats = [
  { label: '총 거리', value: '42.5 km' },
  { label: '총 시간', value: '8h 20m' },
  { label: '칼로리', value: '3,240' },
];

/**
 * WeeklyChart 컴포넌트 - 주간 활동 막대 차트 (CSS 기반)
 *
 * Example usage:
 * <WeeklyChart />
 */
function WeeklyChart() {
  return (
    <Card sx={{ p: 2.5, mb: 2 }}>
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
          Weekly Activity
        </Typography>
        <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: '#72E040' }}>
          이번 주
        </Typography>
      </Box>

      {/* 막대 차트 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 0.75,
          height: '100px',
          mb: 0.5,
        }}
      >
        {weekData.map((d, i) => (
          <Box
            key={d.day}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              justifyContent: 'flex-end',
              gap: 0.5,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: `${d.value}%`,
                bgcolor: i === 3 ? '#E84228' : d.value >= 75 ? '#72E040' : '#A8F07A',
                borderRadius: '4px 4px 0 0',
                transition: 'height 0.4s ease',
              }}
            />
          </Box>
        ))}
      </Box>

      {/* 요일 레이블 */}
      <Box sx={{ display: 'flex', gap: 0.75, mb: 2 }}>
        {weekData.map((d) => (
          <Box key={d.day} sx={{ flex: 1, textAlign: 'center' }}>
            <Typography
              sx={{ fontSize: '0.5625rem', color: '#AAAAAA', fontWeight: 500 }}
            >
              {d.day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 통계 요약 */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {stats.map((s) => (
          <Box
            key={s.label}
            sx={{
              flex: 1,
              bgcolor: '#F8FAF7',
              borderRadius: '10px',
              p: 1,
              textAlign: 'center',
            }}
          >
            <Typography
              sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#1A1A1A', lineHeight: 1.2 }}
            >
              {s.value}
            </Typography>
            <Typography sx={{ fontSize: '0.5625rem', color: '#888888', mt: 0.25 }}>
              {s.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
}

export default WeeklyChart;
