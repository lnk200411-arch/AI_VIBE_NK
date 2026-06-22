import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonSection from './components/sections/button-section';

function App() {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        bgcolor: 'grey.50',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth='lg'>
        <Typography
          variant='h4'
          component='h1'
          sx={{
            mb: { xs: 4, md: 6 },
            fontWeight: 600,
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          UI 컴포넌트 쇼케이스
        </Typography>

        <ButtonSection />

      </Container>
    </Box>
  );
}

export default App;
