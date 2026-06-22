import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SectionWrapper from '../ui/section-wrapper';

const VARIANTS = ['contained', 'outlined', 'text'];
const COLORS = ['primary', 'secondary', 'error'];

function ButtonSection() {
  const handleClick = (variant, color) => {
    alert(`variant: ${variant} / color: ${color}`);
  };

  return (
    <SectionWrapper title='Button' description='variant × color 조합 버튼 모음'>
      {VARIANTS.map((variant) => (
        <Box key={variant} sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}>
          <Typography variant='caption' sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>
            { variant }
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {COLORS.map((color) => (
              <Button
                key={color}
                variant={variant}
                color={color}
                onClick={() => handleClick(variant, color)}
              >
                { color }
              </Button>
            ))}
          </Box>
        </Box>
      ))}
    </SectionWrapper>
  );
}

export default ButtonSection;
