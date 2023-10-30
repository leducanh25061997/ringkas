import { Container } from '@mui/material';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

interface Props {
  developerAccountInfo?: DeveloperAccountList;
}

export const CompanyInformation = memo((props: Props) => {
  const { developerAccountInfo } = props;
  const { t } = useTranslation();

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Row style={{ marginTop: '1rem' }}>
        <Label>{t(translations.developerInformation.companyName)}</Label>
        <Value>{developerAccountInfo?.company?.name || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyAddress)}</Label>
        <Value>{developerAccountInfo?.company?.address || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyEmail)}</Label>
        <EmailValue>{developerAccountInfo?.company?.email || '-'}</EmailValue>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyPhoneNumber)}</Label>
        <Value>{developerAccountInfo?.company?.phone || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyNpwpNumber)}</Label>
        <Value>{developerAccountInfo?.company?.npwpNumber || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companySppkpNumber)}</Label>
        <Value>{developerAccountInfo?.company?.sppkpNumber || '-'}</Value>
      </Row>
    </Container>
  );
});
