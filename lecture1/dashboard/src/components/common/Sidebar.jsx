import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GroupIcon from '@mui/icons-material/Group';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon fontSize='small' /> },
  { id: 'trainings', label: 'Trainings', icon: <FitnessCenterIcon fontSize='small' /> },
  { id: 'health', label: 'Health', icon: <FavoriteIcon fontSize='small' /> },
  { id: 'circles', label: 'Circles', icon: <GroupIcon fontSize='small' /> },
  { id: 'friends', label: 'Friends', icon: <PeopleIcon fontSize='small' /> },
];

const bottomItems = [
  { id: 'additional', label: 'Additional', icon: <MenuBookIcon fontSize='small' /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon fontSize='small' /> },
];

/**
 * Sidebar 컴포넌트 - 좌측 고정 네비게이션
 *
 * Props:
 * @param {string} activeMenu - 현재 활성화된 메뉴 ID [Optional, 기본값: 'dashboard']
 * @param {function} onMenuChange - 메뉴 클릭 시 호출 함수 [Optional]
 *
 * Example usage:
 * <Sidebar activeMenu='dashboard' onMenuChange={setActiveMenu} />
 */
function Sidebar({ activeMenu = 'dashboard', onMenuChange }) {
  return (
    <Box
      sx={{
        width: '210px',
        minHeight: '100vh',
        bgcolor: '#FFFFFF',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        borderRight: '1px solid #F0EBE3',
      }}
    >
      {/* 로고 */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontSize: '1.375rem',
            fontWeight: 800,
            color: '#72E040',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          VIBE
        </Typography>
        <Typography
          sx={{
            fontSize: '0.625rem',
            color: '#888',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          FITNESS
        </Typography>
      </Box>

      {/* 사용자 프로필 */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <Avatar
          sx={{
            width: 40,
            height: 40,
            bgcolor: '#72E040',
            fontSize: '0.875rem',
            fontWeight: 700,
          }}
        >
          NK
        </Avatar>
        <Box>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 700, lineHeight: 1.3 }}>
            남경님
          </Typography>
          <Chip
            label='Top User'
            size='small'
            sx={{
              bgcolor: '#72E040',
              color: '#FFFFFF',
              fontSize: '0.5625rem',
              fontWeight: 700,
              height: '16px',
              mt: 0.25,
            }}
          />
        </Box>
      </Box>

      {/* 메인 메뉴 */}
      <Box sx={{ flex: 1 }}>
        {menuItems.map((item) => {
          const isActive = activeMenu === item.id;
          return (
            <Box
              key={item.id}
              onClick={() => onMenuChange?.(item.id)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.25,
                px: 1,
                borderRadius: '8px',
                cursor: 'pointer',
                mb: 0.5,
                color: isActive ? '#E84228' : '#555555',
                bgcolor: isActive ? '#FFF5F3' : 'transparent',
                transition: 'all 0.15s',
                '&:hover': {
                  bgcolor: isActive ? '#FFF5F3' : '#F8F8F8',
                  color: isActive ? '#E84228' : '#1A1A1A',
                },
              }}
            >
              <Box sx={{ color: isActive ? '#E84228' : '#AAAAAA', display: 'flex' }}>
                {item.icon}
              </Box>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 700 : 500,
                  color: 'inherit',
                }}
              >
                {item.label}
              </Typography>
            </Box>
          );
        })}
      </Box>

      <Divider sx={{ my: 2, borderColor: '#F0EBE3' }} />

      {/* 하단 메뉴 */}
      <Box>
        {bottomItems.map((item) => (
          <Box
            key={item.id}
            onClick={() => onMenuChange?.(item.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              py: 1.25,
              px: 1,
              borderRadius: '8px',
              cursor: 'pointer',
              mb: 0.5,
              color: '#888888',
              transition: 'all 0.15s',
              '&:hover': { bgcolor: '#F8F8F8', color: '#1A1A1A' },
            }}
          >
            <Box sx={{ color: '#BBBBBB', display: 'flex' }}>{item.icon}</Box>
            <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Sidebar;
