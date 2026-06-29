import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from '../components/common/Sidebar';
import HeroSection from '../components/dashboard/HeroSection';
import QuickActions from '../components/dashboard/QuickActions';
import CircleActivity from '../components/dashboard/CircleActivity';
import WeeklyChart from '../components/dashboard/WeeklyChart';
import WorkoutCards from '../components/dashboard/WorkoutCards';
import TodayResults from '../components/dashboard/TodayResults';

function DashboardPage() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#FFFAF5',
      }}
    >
      {/* 사이드바 */}
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      {/* 메인 콘텐츠 */}
      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: { xs: 2, md: 3 },
          minWidth: 0,
        }}
      >
        {/* 헤더 */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
          }}
        >
          <Typography variant='h1' sx={{ color: '#1A1A1A' }}>
            Dashboard
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size='small'
              sx={{
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                '&:hover': { bgcolor: '#F8F8F8' },
              }}
            >
              <SearchIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <IconButton
              size='small'
              sx={{
                bgcolor: '#FFFFFF',
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
                '&:hover': { bgcolor: '#F8F8F8' },
              }}
            >
              <NotificationsNoneIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <AvatarGroup
              max={3}
              sx={{
                ml: 0.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  fontSize: '0.75rem',
                  border: '2px solid #FFFAF5',
                },
              }}
            >
              <Avatar sx={{ bgcolor: '#72E040' }}>N</Avatar>
              <Avatar sx={{ bgcolor: '#E84228' }}>K</Avatar>
              <Avatar sx={{ bgcolor: '#F0956A' }}>J</Avatar>
            </AvatarGroup>
          </Box>
        </Box>

        {/* 2단 그리드 레이아웃 */}
        <Grid container spacing={3}>
          {/* 좌측 메인 */}
          <Grid size={{ xs: 12, md: 7 }}>
            <HeroSection />
            <QuickActions />
            <CircleActivity />
          </Grid>

          {/* 우측 사이드 */}
          <Grid size={{ xs: 12, md: 5 }}>
            <WeeklyChart />
            <WorkoutCards />
            <TodayResults />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DashboardPage;
