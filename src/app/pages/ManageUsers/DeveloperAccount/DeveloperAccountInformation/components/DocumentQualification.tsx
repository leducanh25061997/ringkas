import { Container } from '@mui/material';
import { Label, Row, Value } from 'app/components/KeyText';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import { downloadImage } from '../../../../../../utils/commonFunction';
import GroupButtonAction from '../../../../../components/GroupButtonAction';

interface Props {
  developerAccountInfo?: DeveloperAccountList;
}
const Img = styled.img`
  width: 160px;
  object-fit: contain;
  border: 1px solid #c6d7e0;
  border-radius: 8px;
`;

export const DocumentQualification = memo((props: Props) => {
  const { developerAccountInfo } = props;
  const { t } = useTranslation();

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <Row style={{ marginTop: '1rem' }}>
        <Label>{t(translations.developerInformation.directorIDCard)}</Label>
        {developerAccountInfo?.documentQualification?.fileKtpDirector &&
        developerAccountInfo?.documentQualification?.fileKtpDirector[0].url ? (
          <Value>
            <Img
              src={
                developerAccountInfo?.documentQualification?.fileKtpDirector[0]
                  .url
              }
            ></Img>
            <GroupButtonAction
              buttonGroup={[
                {
                  title: 'View',
                  onClick: () =>
                    window.open(
                      developerAccountInfo?.documentQualification
                        ?.fileKtpDirector[0].url,
                    ),
                },
                {
                  title: 'Download',
                  onClick: () =>
                    downloadImage(
                      developerAccountInfo?.documentQualification
                        ?.fileKtpDirector[0].url,
                    ),
                },
              ]}
            />
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>NPWP</Label>
        {developerAccountInfo?.documentQualification?.fileNpwp &&
        developerAccountInfo?.documentQualification?.fileNpwp.length > 0 ? (
          <Value>
            <Img
              src={developerAccountInfo?.documentQualification?.fileNpwp[0].url}
            ></Img>
            <GroupButtonAction
              buttonGroup={[
                {
                  title: 'View',
                  onClick: () =>
                    window.open(
                      developerAccountInfo?.documentQualification?.fileNpwp[0]
                        .url,
                    ),
                },
                {
                  title: 'Download',
                  onClick: () =>
                    downloadImage(
                      developerAccountInfo?.documentQualification?.fileNpwp[0]
                        .url,
                    ),
                },
              ]}
            />
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>TDP</Label>
        {developerAccountInfo?.documentQualification?.fileTdp &&
        developerAccountInfo?.documentQualification?.fileTdp.length > 0 ? (
          <Value>
            <Img
              src={developerAccountInfo?.documentQualification?.fileTdp[0].url}
            ></Img>
            <GroupButtonAction
              buttonGroup={[
                {
                  title: 'View',
                  onClick: () =>
                    window.open(
                      developerAccountInfo?.documentQualification?.fileTdp[0]
                        .url,
                    ),
                },
                {
                  title: 'Download',
                  onClick: () =>
                    downloadImage(
                      developerAccountInfo?.documentQualification?.fileTdp[0]
                        .url,
                    ),
                },
              ]}
            />
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>SIUP</Label>
        {developerAccountInfo?.documentQualification?.fileSiup &&
        developerAccountInfo?.documentQualification?.fileSiup.length > 0 ? (
          <Value>
            <Img
              src={developerAccountInfo?.documentQualification?.fileSiup[0].url}
            ></Img>
            <GroupButtonAction
              buttonGroup={[
                {
                  title: 'View',
                  onClick: () =>
                    window.open(
                      developerAccountInfo?.documentQualification?.fileSiup[0]
                        .url,
                    ),
                },
                {
                  title: 'Download',
                  onClick: () =>
                    downloadImage(
                      developerAccountInfo?.documentQualification?.fileSiup[0]
                        .url,
                    ),
                },
              ]}
            />
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>SPPKP</Label>
        {developerAccountInfo?.documentQualification?.fileSppkp &&
        developerAccountInfo?.documentQualification?.fileSppkp.length > 0 ? (
          <Value>
            <Img
              src={
                developerAccountInfo?.documentQualification?.fileSppkp[0].url
              }
            ></Img>
            <GroupButtonAction
              buttonGroup={[
                {
                  title: 'View',
                  onClick: () =>
                    window.open(
                      developerAccountInfo?.documentQualification?.fileSppkp[0]
                        .url,
                    ),
                },
                {
                  title: 'Download',
                  onClick: () =>
                    downloadImage(
                      developerAccountInfo?.documentQualification?.fileSppkp[0]
                        .url,
                    ),
                },
              ]}
            />
          </Value>
        ) : (
          <Value>-</Value>
        )}
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.NDAWithRingkas)}</Label>
        <Value>-</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.NDAExpiredDate)}</Label>
        <Value>-</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.MOUWithRingkas)}</Label>
        <Value>-</Value>
      </Row>
      <Row>
        <Label>{t(translations.developerInformation.MOUExpiredDate)}</Label>
        <Value>-</Value>
      </Row>
    </Container>
  );
});
