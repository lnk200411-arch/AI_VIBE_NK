import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

const results = [
  { label: '유산소', percent: 45, color: '#72E040' },
  { label: '근력', percent: 30, color: '#E84228' },
  { label: '유연성', percent: 25, color: '#F0956A' },
];

/**
 * DonutChart - SVG 기반 도넛 차트
 *
 * Props:
 * @param {number} percent - 진행률 (0~100) [Required]
 * @param {string} color - 차트 색상 hex [Required]
 * @param {number} size - 차트 크기(px) [Optional, 기본값: 64]
 *
 * Example usage:
 * <DonutChart percent={45} color='#72E040' size={64} />
 */
function DonutChart({ percent, color, size = 64 }) {
  const r = 24;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox='0 0 64 64'>
      <circle cx='32' cy='32' r={r} fill='none' stroke='#F0F0F0' strokeWidth='6' />
      <circle
        cx='32'
        cy='32'
        r={r}
        fill='none'
        stroke={color}
        strokeWidth='6'
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap='round'
        transform='rotate(-90 32 32)'
      />
      <text
        x='32'
        y='32'
        textAnchor='middle'
        dominantBaseline='central'
        fill={color}
        fontSize='11'
        fontWeight='700'
        fontFamily='Inter, sans-serif'
      >
        {percent}%
      </text>
    </svg>
  );
}

/**
 * TodayResults 컴포넌트 - 오늘의 운동 결과 도넛 차트
 *
 * Example usage:
 * <TodayResults />
 */
function TodayResults() {
  return (
    <Card sx={{ p: 2.5 }}>
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
        Today Results
      </Typography>

      {/* 도넛 차트 그리드 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          mb: 2.5,
        }}
      >
        {results.map((r) => (
          <Box
            key={r.label}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.75 }}
          >
            <DonutChart percent={r.percent} color={r.color} />
            <Typography
              sx={{ fontSize: '0.75rem', fontWeight: 600, color: '#555555' }}
            >
              {r.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* 목표 달성률 배너 */}
      <Box
        sx={{
          bgcolor: '#72E040',
          borderRadius: '12px',
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography sx={{ fontSize: '0.8125rem', fontWeight: 700, color: '#FFFFFF' }}>
            오늘 목표 달성률
          </Typography>
          <Typography sx={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.75)' }}>
            굉장히 잘 하고 있어요! 🎉
          </Typography>
        </Box>
        <Typography
          sx={{ fontSize: '1.75rem', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}
        >
          85°
        </Typography>
      </Box>
    </Card>
  );
}

export default TodayResults;
