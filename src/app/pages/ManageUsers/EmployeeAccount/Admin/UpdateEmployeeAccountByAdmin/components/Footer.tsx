import { LoadingButton } from '@mui/lab';
import { Button } from '@mui/material';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

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
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          {t(translations.common.cancel)}
        </Button>
        <LoadingButton
          sx={{
            padding: '0.5rem 2rem',
            margin: '1rem',
            color: 'white',
            background: '#005FC5',
            fontSize: '16px',
          }}
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
