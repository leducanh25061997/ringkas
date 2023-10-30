import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import CustomButton from 'app/components/CustomButton';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { AccountStatus } from 'types';
import { BankAccountInfo } from 'types/BankAccountManagement';

interface Props {
  handleVerify: () => void;
  step: number;
  hqBankAccountInfo?: BankAccountInfo;
  isLoading?: boolean;
}

const RootContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #223250;
  background: white;
  margin-top: 1rem;
  padding-right: 16px;
  padding-left: 16px;
`;

const Flex = styled.div`
  display: flex;
`;

export const Footer = memo((props: Props) => {
  const { hqBankAccountInfo, handleVerify, step, isLoading } = props;
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  const updateAccount = () => {
    navigate(`${path.hqBankAccountList}/edit/${params.id}`);
  };

  return step === 3 && hqBankAccountInfo?.verificationStatus !== 'VERIFIED' ? (
    <RootContainer>
      <Button
        sx={{
          border: '1px solid black',
          padding: '0.5rem 2rem',
          margin: '1rem',
          color: 'black',
          fontSize: '16px',
        }}
        onClick={() => {
          navigate(path.bankAccountList);
        }}
      >
        {t(translations.common.back)}
      </Button>
      <Flex>
        <Button
          sx={{
            border: '1px solid black',
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: 'black',
            fontSize: '16px',
          }}
          onClick={updateAccount}
        >
          {t(translations.common.update)}
        </Button>
        {hqBankAccountInfo &&
        hqBankAccountInfo?.verificationStatus === 'VERIFIED' ? (
          <Button
            sx={{
              padding: '0.5rem 2rem',
              margin: '1rem',
              color: 'black',
              background: '#FFCC04',
              fontSize: '16px',
              display: 'none!important',
            }}
          >
            {t(translations.common.verified)}
          </Button>
        ) : (
          <LoadingButton
            onClick={handleVerify}
            sx={{
              padding: '0.5rem 2rem',
              margin: '1rem',
              color: 'black',
              background: '#FFCC04',
              fontSize: '16px',
            }}
            loading={isLoading}
          >
            {t(translations.common.verify)}
          </LoadingButton>
        )}
      </Flex>
    </RootContainer>
  ) : (
    <RootContainer>
      <div></div>
      <Flex>
        <Button
          sx={{
            border: '1px solid black',
            padding: '10px 32px',
            margin: '1rem',
            color: 'black',
            fontSize: '16px',
          }}
          onClick={() => {
            navigate(path.bankAccountList);
          }}
        >
          {t(translations.common.back)}
        </Button>
        <Button
          onClick={updateAccount}
          sx={{
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: 'black',
            background: '#FFCC04',
            fontSize: '16px',
          }}
        >
          {t(translations.common.update)}
        </Button>
      </Flex>
    </RootContainer>
  );
});
