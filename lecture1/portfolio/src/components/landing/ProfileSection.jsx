import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const SKILLS = ['React', 'MUI', 'Vite', 'JavaScript', 'TypeScript', 'Figma'];

const SOCIAL_LINKS = [
  { icon: <GitHubIcon />, href: 'https://github.com', label: 'GitHub' },
  { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <EmailIcon />, href: 'mailto:hello@example.com', label: 'Email' },
];

/**
 * ProfileSection 컴포넌트
 * 포트폴리오 메인 히어로 — 가상 프로필을 표시합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <ProfileSection />
 */
function ProfileSection() {
  return (
    <Box
      component='section'
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        py: { xs: 8, md: 0 },
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
            gap: 4,
          }}
        >
          {/* 역할 배지 */}
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#2563EB',
              letterSpacing: '0.1em',
            }}
          >
            FRONTEND DEVELOPER
          </Typography>

          {/* 이름 */}
          <Box>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                color: '#1E293B',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              Kim Dev
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 700,
                color: '#2563EB',
                lineHeight: 1.2,
              }}
            >
              김개발
            </Typography>
          </Box>

          {/* 소개 */}
          <Typography
            variant='body1'
            sx={{
              maxWidth: 480,
              fontSize: { xs: '0.9375rem', md: '1rem' },
              color: '#64748B',
              lineHeight: 1.8,
            }}
          >
            미니멀한 UI와 직관적인 사용자 경험을 추구하는 프론트엔드 개발자입니다.
            React와 MUI를 중심으로 빠르고 아름다운 웹 서비스를 만들어갑니다.
          </Typography>

          {/* 스킬 태그 */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            {SKILLS.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size='small'
                sx={{
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  height: '26px',
                  borderRadius: '20px',
                }}
              />
            ))}
          </Box>

          {/* SNS 링크 */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {SOCIAL_LINKS.map(({ icon, href, label }) => (
              <IconButton
                key={label}
                component='a'
                href={href}
                target='_blank'
                rel='noreferrer'
                aria-label={label}
                sx={{
                  color: '#64748B',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  width: 44,
                  height: 44,
                  '&:hover': {
                    color: '#2563EB',
                    borderColor: '#BFDBFE',
                    backgroundColor: '#EFF6FF',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ProfileSection;
