import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { selectManageCustomer } from '../../../slice/selectors';

interface Props {
  handleSubmit: () => void;
  handleBack: () => void;
  isLoading?: boolean;
}

const RootContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #223250;
  background: white;
  margin-top: 1rem;
  padding-right: 0.5rem;
  position: fixed;
  bottom: 0;
  width: 100%;
  right: 0;
  left: 0;
`;

const CustomButton = styled.div`
  & .MuiLoadingButton-root {
    &.Mui-disabled {
      color: white !important;
      opacity: 0.5;
    }
  }
`;

const FlexStart = styled.div`
  flex-basis: '40%';
`;
const FlexEnd = styled.div`
  flex-basis: '60%';
  display: flex;
`;

export const Footer = memo((props: Props) => {
  const { handleSubmit, handleBack, isLoading } = props;
  const { bankPreference } = useSelector(selectManageCustomer);
  const { t } = useTranslation();
  return (
    <RootContainer>
      <FlexStart></FlexStart>
      <FlexEnd>
        <Button
          sx={{
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: '#005FC5',
            fontSize: '16px',
            background: '#F6F7FF',
          }}
          onClick={handleBack}
        >
          {t(translations.common.decline)}
        </Button>
        {bankPreference?.banks && bankPreference?.banks.length < 5 && (
          <CustomButton>
            <LoadingButton
              sx={{
                padding: '0.5rem 2rem',
                margin: '1rem',
                color: 'white',
                background: '#005FC5',
                fontSize: '16px',
              }}
              onClick={handleSubmit}
              loading={isLoading}
            >
              {t(translations.common.continue)}
            </LoadingButton>
          </CustomButton>
        )}
      </FlexEnd>
    </RootContainer>
  );
});
