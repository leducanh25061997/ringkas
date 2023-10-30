import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';

import path from 'app/routes/path';

// ----------------------------------------------------------------------

export default function Page404() {
  const { t } = useTranslation();

  return (
    <Container>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <Button
          to={path.root}
          size="large"
          variant="contained"
          component={RouterLink}
        >
          {t('notFoundPage.goToHome')}
        </Button>
      </Box>
    </Container>
  );
}
