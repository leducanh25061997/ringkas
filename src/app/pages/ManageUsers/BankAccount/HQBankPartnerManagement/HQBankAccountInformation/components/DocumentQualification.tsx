import { Container } from '@mui/material';
import { Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BankAccountInfo } from 'types/BankAccountManagement';
import moment from 'moment';

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

const Download = styled.a`
  color: #005fc5 !important;
  font-weight: 600;
`;

const Flex = styled.div`
  display: flex;
  margin-top: 0.5rem;
`;

export const DocumentQualification = memo((props: Props) => {
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
        <Label>{t(translations.developerInformation.directorIDCard)}</Label>
        {hqBankAccountInfo?.documentQualification?.fileKtpDirector &&
        hqBankAccountInfo?.documentQualification?.fileKtpDirector[0].url ? (
          <Value>
            <Img
              src={
                hqBankAccountInfo?.documentQualification?.fileKtpDirector[0].url
              }
            ></Img>
            <Flex>
              <Href
                href={
                  hqBankAccountInfo?.documentQualification?.fileKtpDirector[0]
                    .url
                }
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification
                      ?.fileKtpDirector &&
                      hqBankAccountInfo?.documentQualification
                        ?.fileKtpDirector[0].url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification
                      ?.fileKtpDirector &&
                      hqBankAccountInfo?.documentQualification
                        ?.fileKtpDirector[0]?.originalName) ||
                      '',
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
        <Label>NPWP</Label>
        {hqBankAccountInfo?.documentQualification?.fileNpwp &&
        hqBankAccountInfo?.documentQualification?.fileNpwp.length > 0 ? (
          <Value>
            <Img
              src={hqBankAccountInfo?.documentQualification?.fileNpwp[0].url}
            ></Img>
            <Flex>
              <Href
                href={hqBankAccountInfo?.documentQualification?.fileNpwp[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification?.fileNpwp &&
                      hqBankAccountInfo?.documentQualification?.fileNpwp[0]
                        .url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification?.fileNpwp &&
                      hqBankAccountInfo?.documentQualification?.fileNpwp[0]
                        .originalName) ||
                      '',
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
        <Label>TDP</Label>
        {hqBankAccountInfo?.documentQualification?.fileTdp &&
        hqBankAccountInfo?.documentQualification?.fileTdp.length > 0 ? (
          <Value>
            <Img
              src={hqBankAccountInfo?.documentQualification?.fileTdp[0].url}
            ></Img>
            <Flex>
              <Href
                href={hqBankAccountInfo?.documentQualification?.fileTdp[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification?.fileTdp &&
                      hqBankAccountInfo?.documentQualification?.fileTdp[0]
                        .url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification?.fileTdp &&
                      hqBankAccountInfo?.documentQualification?.fileTdp[0]
                        .originalName) ||
                      '',
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
        <Label>SIUP</Label>
        {hqBankAccountInfo?.documentQualification?.fileSiup &&
        hqBankAccountInfo?.documentQualification?.fileSiup.length > 0 ? (
          <Value>
            <Img
              src={hqBankAccountInfo?.documentQualification?.fileSiup[0].url}
            ></Img>
            <Flex>
              <Href
                href={hqBankAccountInfo?.documentQualification?.fileSiup[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification?.fileSiup &&
                      hqBankAccountInfo?.documentQualification?.fileSiup[0]
                        .url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification?.fileSiup &&
                      hqBankAccountInfo?.documentQualification?.fileSiup[0]
                        .originalName) ||
                      '',
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
        <Label>SPPKP</Label>
        {hqBankAccountInfo?.documentQualification?.fileSppkp &&
        hqBankAccountInfo?.documentQualification?.fileSppkp.length > 0 ? (
          <Value>
            <Img
              src={hqBankAccountInfo?.documentQualification?.fileSppkp[0].url}
            ></Img>
            <Flex>
              <Href
                href={
                  hqBankAccountInfo?.documentQualification?.fileSppkp[0].url
                }
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification?.fileSppkp &&
                      hqBankAccountInfo?.documentQualification?.fileSppkp[0]
                        .url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification?.fileSppkp &&
                      hqBankAccountInfo?.documentQualification?.fileSppkp[0]
                        .originalName) ||
                      '',
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
        <Label>{t(translations.developerInformation.NDAWithRingkas)}</Label>
        {hqBankAccountInfo?.documentQualification?.fileNda &&
        hqBankAccountInfo?.documentQualification?.fileNda.length > 0 ? (
          <Value>
            <Img
              src={hqBankAccountInfo?.documentQualification?.fileNda[0].url}
            ></Img>
            <Flex>
              <Href
                href={hqBankAccountInfo?.documentQualification?.fileNda[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification?.fileNda &&
                      hqBankAccountInfo?.documentQualification?.fileNda[0]
                        ?.url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification?.fileNda &&
                      hqBankAccountInfo?.documentQualification?.fileNda[0]
                        ?.originalName) ||
                      '',
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
        <Label>{t(translations.developerInformation.NDAExpiredDate)}</Label>
        <Value>
          {hqBankAccountInfo?.documentQualification?.ndaExpiredDate
            ? moment(
                hqBankAccountInfo?.documentQualification?.ndaExpiredDate,
              ).format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.MOUWithRingkas)}</Label>
        {hqBankAccountInfo?.documentQualification?.fileMou &&
        hqBankAccountInfo?.documentQualification?.fileMou.length > 0 ? (
          <Value>
            <Img
              src={hqBankAccountInfo?.documentQualification?.fileMou[0]?.url}
            ></Img>
            <Flex>
              <Href
                href={hqBankAccountInfo?.documentQualification?.fileMou[0].url}
                target="_blank"
              >
                {t(translations.common.view)}
              </Href>
              <Download
                onClick={() =>
                  downloadImage(
                    (hqBankAccountInfo?.documentQualification?.fileMou &&
                      hqBankAccountInfo?.documentQualification?.fileMou[0]
                        .url) ||
                      '',
                    (hqBankAccountInfo?.documentQualification?.fileMou &&
                      hqBankAccountInfo?.documentQualification?.fileMou[0]
                        ?.originalName) ||
                      '',
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
        <Label>{t(translations.developerInformation.MOUExpiredDate)}</Label>
        <Value>
          {hqBankAccountInfo?.documentQualification?.mouExpiredDate
            ? moment(
                hqBankAccountInfo?.documentQualification?.mouExpiredDate,
              ).format('DD/MM/YYYY')
            : '-'}
        </Value>
      </Row>
    </Container>
  );
});
