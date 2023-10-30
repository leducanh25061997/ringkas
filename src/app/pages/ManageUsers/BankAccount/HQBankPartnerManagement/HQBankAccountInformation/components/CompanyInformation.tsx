import { Container } from '@mui/material';
import { EmailValue, Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BankAccountInfo } from 'types/BankAccountManagement';

interface Props {
  hqBankAccountInfo?: BankAccountInfo;
}

export const CompanyInformation = memo((props: Props) => {
  const { hqBankAccountInfo } = props;
  const { t } = useTranslation();

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Row style={{ marginTop: '1rem' }}>
        <Label>{t(translations.developerInformation.companyName)}</Label>
        <Value>{hqBankAccountInfo?.company?.name || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyAddress)}</Label>
        <Value>{hqBankAccountInfo?.company?.address || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyEmail)}</Label>
        <EmailValue>{hqBankAccountInfo?.company?.email || '-'}</EmailValue>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyPhoneNumber)}</Label>
        <Value>{hqBankAccountInfo?.company?.phone || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companyNpwpNumber)}</Label>
        <Value>{hqBankAccountInfo?.company?.npwpNumber || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.companySppkpNumber)}</Label>
        <Value>{hqBankAccountInfo?.company?.sppkpNumber || '-'}</Value>
      </Row>
    </Container>
  );
});
