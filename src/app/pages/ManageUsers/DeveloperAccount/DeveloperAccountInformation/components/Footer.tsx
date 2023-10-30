import { Grid } from '@mui/material';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  ApplicationStatus,
  DeveloperAccountList,
} from 'types/DeveloperAccountManagement';

interface Props {
  developerAccountInfo?: DeveloperAccountList;
  handleVerify: () => void;
}

const RootContainer = styled.div`
  color: #223250;
  background: white;
  margin: 0 20px;
`;

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
`;

const ActionButtonWrap2 = styled.div`
  display: flex;
  justify-content: space-between;

  background: #fff;
  padding: 12px 32px;
`;

const YellowButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background: rgba(255, 204, 4, 1);
  border-radius: 8px;
  color: #000;
  width: 128px;
`;

const WhiteButton = styled.button`
  width: 128px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #000;
  border: 1px solid #000;
  background: #ffffff;
  margin-right: 32px;
`;

export const Footer = memo((props: Props) => {
  const { developerAccountInfo, handleVerify } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!developerAccountInfo) return null;

  return (
    <RootContainer>
      {developerAccountInfo?.verificationStatus ===
      ApplicationStatus.VERIFIED ? (
        <ActionButtonWrap>
          <WhiteButton
            onClick={() => {
              navigate(path.developerAccountList);
            }}
          >
            {t(translations.common.back)}
          </WhiteButton>
          <YellowButton
            onClick={() => {
              navigate(
                `${path.developerAccountList}/edit/${developerAccountInfo?.userUuid}`,
              );
            }}
          >
            {t(translations.common.update)}
          </YellowButton>
        </ActionButtonWrap>
      ) : (
        <ActionButtonWrap2>
          <Grid item sx={{ width: '128px', mr: '32px' }}>
            <WhiteButton
              onClick={() => {
                navigate(path.developerAccountList);
              }}
            >
              {t(translations.common.back)}
            </WhiteButton>
          </Grid>
          <div style={{ display: 'flex' }}>
            <WhiteButton
              onClick={() => {
                navigate(
                  `${path.developerAccountList}/edit/${developerAccountInfo?.userUuid}`,
                );
              }}
            >
              {t(translations.common.update)}
            </WhiteButton>
            <YellowButton onClick={handleVerify}>
              {t(translations.common.verify)}
            </YellowButton>
          </div>
        </ActionButtonWrap2>
      )}
    </RootContainer>
  );
});
