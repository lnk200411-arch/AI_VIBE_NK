import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';

const members = [
  { id: 1, name: '홍길동', initials: 'HG', progress: 85, color: '#72E040' },
  { id: 2, name: '김민지', initials: 'KM', progress: 72, color: '#E84228' },
  { id: 3, name: '이수진', initials: 'LS', progress: 68, color: '#F0956A' },
  { id: 4, name: '박지호', initials: 'PJ', progress: 55, color: '#9B8BE8' },
];

/**
 * CircleActivity 컴포넌트 - 그룹 멤버 활동 현황 및 진행률
 *
 * Example usage:
 * <CircleActivity />
 */
function CircleActivity() {
  return (
    <Box sx={{ mb: 3 }}>
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
          Circle Activity
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
          전체보기
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {members.map((m) => (
          <Box key={m.id} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                bgcolor: m.color,
                fontSize: '0.75rem',
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {m.initials}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}
              >
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: '#1A1A1A' }}>
                  {m.name}
                </Typography>
                <Typography
                  sx={{ fontSize: '0.8125rem', fontWeight: 700, color: m.color, flexShrink: 0 }}
                >
                  {m.progress}%
                </Typography>
              </Box>
              <LinearProgress
                variant='determinate'
                value={m.progress}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: '#F0F0F0',
                  '& .MuiLinearProgress-bar': {
                    bgcolor: m.color,
                    borderRadius: 3,
                  },
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CircleActivity;
