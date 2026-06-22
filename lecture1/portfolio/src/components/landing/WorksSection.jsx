import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const WORKS = [
  {
    id: 1,
    title: 'PiCKCARE',
    subtitle: '반려동물 AI 플랫폼',
    description:
      '반려동물의 건강 데이터를 AI로 분석하고, 맞춤형 케어 솔루션을 제공하는 반려생활 플랫폼입니다.',
    tags: ['React', 'MUI', 'Supabase', 'AI'],
    color: '#EFF6FF',
    accent: '#2563EB',
    href: '#',
  },
  {
    id: 2,
    title: '비상교재 디자인',
    subtitle: '디자인 시스템 분석',
    description:
      '비상교재 웹사이트의 타이포그래피, 컬러, 컴포넌트를 분석하여 MUI 기반 디자인 시스템으로 문서화했습니다.',
    tags: ['Design System', 'MUI', 'Typography'],
    color: '#F8FAFC',
    accent: '#1D4ED8',
    href: '#',
  },
  {
    id: 3,
    title: 'Portfolio',
    subtitle: '개인 포트폴리오 사이트',
    description:
      '미니멀리즘 컨셉으로 제작한 개인 포트폴리오 사이트입니다. React + MUI + GitHub Pages 기반으로 배포됩니다.',
    tags: ['React', 'MUI', 'GitHub Pages', 'Vite'],
    color: '#EFF6FF',
    accent: '#2563EB',
    href: '#',
  },
];

/**
 * WorksSection 컴포넌트
 * 포트폴리오 작업물 목차를 카드 그리드로 표시합니다.
 *
 * Props: 없음
 *
 * Example usage:
 * <WorksSection />
 */
function WorksSection() {
  return (
    <Box
      component='section'
      sx={{
        width: '100%',
        backgroundColor: '#F8FAFC',
        py: { xs: 8, md: 10, lg: 12 },
      }}
    >
      <Container maxWidth='md'>
        {/* 섹션 헤더 */}
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#2563EB',
              letterSpacing: '0.1em',
              mb: 1.5,
            }}
          >
            WORKS
          </Typography>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 800,
              color: '#1E293B',
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
            }}
          >
            작업물 목차
          </Typography>
        </Box>

        {/* 카드 그리드 */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {WORKS.map((work) => (
            <Grid key={work.id} size={{ xs: 12, md: 6 }}>
              <Card
                component='a'
                href={work.href}
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  backgroundColor: work.color,
                  border: '1px solid #E2E8F0',
                  height: '100%',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#BFDBFE',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 24px rgba(37,99,235,0.1)',
                  },
                  transition: 'all 0.25s ease',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: work.accent,
                          letterSpacing: '0.06em',
                          mb: 0.5,
                        }}
                      >
                        {work.subtitle}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '1.125rem',
                          fontWeight: 700,
                          color: '#1E293B',
                          lineHeight: 1.3,
                        }}
                      >
                        {work.title}
                      </Typography>
                    </Box>
                    <ArrowOutwardIcon
                      sx={{
                        color: '#94A3B8',
                        fontSize: '1.1rem',
                        mt: 0.25,
                        flexShrink: 0,
                      }}
                    />
                  </Box>

                  <Typography
                    variant='body2'
                    sx={{
                      color: '#64748B',
                      lineHeight: 1.7,
                      mb: 2.5,
                    }}
                  >
                    {work.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                    {work.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size='small'
                        sx={{
                          backgroundColor: 'rgba(37,99,235,0.08)',
                          color: work.accent,
                          fontWeight: 600,
                          fontSize: '0.6875rem',
                          height: '22px',
                          borderRadius: '20px',
                        }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default WorksSection;
