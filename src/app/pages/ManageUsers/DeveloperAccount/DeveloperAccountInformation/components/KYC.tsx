import { Container } from '@mui/material';
import { Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import moment from 'moment';
import styled from 'styled-components';

interface Props {
  developerAccountInfo?: DeveloperAccountList;
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

const Download = styled.a`
  color: #005fc5 !important;
  font-weight: 600;
`;

const Flex = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

export const KYC = memo((props: Props) => {
  const { developerAccountInfo } = props;
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
        <Value>{developerAccountInfo?.kyc?.fullName || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.phoneNumber)}</Label>
        <Value>{developerAccountInfo?.kyc?.phone || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.idCardNumber)}</Label>
        <Value>{developerAccountInfo?.kyc?.nik || '-'}</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.dateOfBirth)}</Label>
        <Value>
          {developerAccountInfo?.kyc?.dob
            ? moment(developerAccountInfo?.kyc?.dob).format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.registerDate)}</Label>
        <Value>
          {developerAccountInfo?.createdDate
            ? moment
                .unix(developerAccountInfo?.createdDate / 1000)
                .format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.photoOfIdCard)}</Label>
        {developerAccountInfo?.kyc?.fileKtp &&
        developerAccountInfo?.kyc?.fileKtp.length > 0 &&
        developerAccountInfo?.kyc?.fileKtp[0] ? (
          <Value>
            <Img src={developerAccountInfo?.kyc?.fileKtp[0].url || ''}></Img>
            <Flex>
              <Href
                href={developerAccountInfo?.kyc?.fileKtp[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    developerAccountInfo?.kyc?.fileKtp[0].url,
                    developerAccountInfo?.kyc?.fileKtp[0].originalName,
                  )
                }
              >
                {t(translations.common.download)}
              </Download>
            </Flex>
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.digitalSignature)}</Label>
        {developerAccountInfo?.kyc?.fileSignature &&
        developerAccountInfo?.kyc?.fileSignature.length > 0 &&
        developerAccountInfo?.kyc?.fileSignature[0] ? (
          <Value>
            <Img
              src={developerAccountInfo?.kyc?.fileSignature[0].url || ''}
            ></Img>
            <Flex>
              <Href
                href={developerAccountInfo?.kyc?.fileSignature[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    developerAccountInfo?.kyc?.fileSignature[0].url,
                    developerAccountInfo?.kyc?.fileSignature[0].originalName,
                  )
                }
              >
                {t(translations.common.download)}
              </Download>
            </Flex>
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
    </Container>
  );
});
