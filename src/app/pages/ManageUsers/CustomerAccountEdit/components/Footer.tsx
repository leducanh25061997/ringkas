import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import CustomButton from 'app/components/CustomButton';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface Props {
  handleSubmit: () => void;
  handleBack: () => void;
  isLoading?: boolean;
  stepCustomer: number;
}

const RootContainer = styled.div`
  display: flex;
  justify-content: space-between;
  color: #223250;
  background: white;
  margin-top: 1rem;
  padding-right: 0.5rem;
`;

const FlexStart = styled.div`
  flex-basis: '40%';
`;
const FlexEnd = styled.div`
  flex-basis: '60%';
  display: flex;
`;

export const Footer = memo((props: Props) => {
  const { handleSubmit, handleBack, isLoading, stepCustomer } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <RootContainer>
      <FlexStart></FlexStart>
      <FlexEnd>
        <Button
          sx={{
            border: '1px solid black',
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: 'black',
            fontSize: '16px',
          }}
          onClick={handleBack}
        >
          {t(translations.common.back)}
        </Button>
        <LoadingButton
          sx={{
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: 'black',
            background: '#FFCC04',
            fontSize: '16px',
          }}
          disabled={stepCustomer === 0}
          loading={isLoading}
          type="submit"
          onSubmit={handleSubmit}
        >
          {t(translations.common.update)}
        </LoadingButton>
      </FlexEnd>
    </RootContainer>
  );
});
