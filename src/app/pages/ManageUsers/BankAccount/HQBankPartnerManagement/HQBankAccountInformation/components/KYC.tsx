import { Container } from '@mui/material';
import { Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import styled from 'styled-components';
import { BankAccountInfo } from 'types/BankAccountManagement';

interface Props {
  hqBankAccountInfo?: BankAccountInfo;
}

const Img = styled.img`
  width: 160px;
  object-fit: contain;
  border: 1px solid #c6d7e0;
  border-radius: 8px;
`;

const Href = styled.a`
  color: #005fc5 !important;
  margin-right: 2rem;
  padding-right: 2rem;
  border-right: 1px solid #005fc5;
  font-weight: 600;
`;

const Flex = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

export const KYC = memo((props: Props) => {
  const { hqBankAccountInfo } = props;
  const { t } = useTranslation();

  function downloadImage(src: string, name: string) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx && ctx.drawImage(img, 0, 0);
      const a = document.createElement('a');
      a.download = name;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
  }

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Row style={{ marginTop: '1rem' }}>
        <Label>{t(translations.developerInformation.fullName)}</Label>
        <Value>{hqBankAccountInfo?.kyc?.fullName || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.phoneNumber)}</Label>
        <Value>{hqBankAccountInfo?.kyc?.phone || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.idCardNumber)}</Label>
        <Value>{hqBankAccountInfo?.kyc?.nik || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.dateOfBirth)}</Label>
        <Value>
          {hqBankAccountInfo?.kyc?.dob
            ? moment(hqBankAccountInfo?.kyc?.dob).format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.registerDate)}</Label>
        <Value>
          {hqBankAccountInfo?.createdDate
            ? moment
                .unix(hqBankAccountInfo?.createdDate / 1000)
                .format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.photoOfIdCard)}</Label>
        {hqBankAccountInfo?.kyc?.fileNik && hqBankAccountInfo?.kyc?.fileNik ? (
          <Value>
            <Img src={hqBankAccountInfo?.kyc?.fileNik?.url || ''}></Img>
            <Flex>
              <Href href={hqBankAccountInfo?.kyc?.fileNik?.url} target="_blank">
                {t(translations.common.view)}
              </Href>
              <a
                style={{ color: '#005FC5', fontWeight: 600 }}
                onClick={() =>
                  downloadImage(
                    hqBankAccountInfo?.kyc?.fileNik?.url || '',
                    hqBankAccountInfo?.kyc?.fileNik?.originalName || '',
                  )
                }
              >
                {t(translations.common.download)}
              </a>
            </Flex>
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.digitalSignature)}</Label>
        {hqBankAccountInfo?.kyc?.fileSignature &&
        hqBankAccountInfo?.kyc?.fileSignature ? (
          <Value>
            <Img src={hqBankAccountInfo?.kyc?.fileSignature?.url || ''}></Img>
            <Flex>
              <Href
                href={hqBankAccountInfo?.kyc?.fileSignature?.url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <a
                style={{ color: '#005FC5', fontWeight: 600 }}
                onClick={() =>
                  downloadImage(
                    hqBankAccountInfo?.kyc?.fileSignature?.url || '',
                    hqBankAccountInfo?.kyc?.fileSignature?.originalName || '',
                  )
                }
              >
                {t(translations.common.download)}
              </a>
            </Flex>
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
    </Container>
  );
});
