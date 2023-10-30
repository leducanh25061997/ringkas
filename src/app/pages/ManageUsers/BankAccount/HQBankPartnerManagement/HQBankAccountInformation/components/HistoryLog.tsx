import { Container } from '@mui/material';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

interface Props {}

export const HistoryLog = memo((props: Props) => {
  const { t } = useTranslation();

  return <Container sx={{ marginTop: '0', minHeight: '600px' }}></Container>;
});
