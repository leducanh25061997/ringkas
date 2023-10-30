import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Dialog, Typography } from '@mui/material';
import deleteIcon from '../../../assets/icons/delete.svg';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px 8px 0 0;
  padding: 24px;
`;

const ConfirmButton = styled.button`
  padding: 10px 16px;
  line-height: 28px;
  font-weight: 600;
  background: #005fc5;
  border-radius: 8px;
  color: #ffffff;
`;

const NoPermission = () => {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  return (
    <Dialog open={open} maxWidth="sm" onClose={() => setOpen(false)}>
      <Header>
        <Typography
          sx={{
            color: '#223250',
            fontSize: '20px',
            fontWeight: '700',
            lineHeight: '25px',
            flex: '1 !important',
            textAlign: 'center',
          }}
        >
          {t(translations.common.notice)}
        </Typography>
        <img
          src={deleteIcon}
          width={24}
          height={24}
          alt="delete-icon"
          className="cursor-pointer"
          // @ts-ignore
          onClick={() => setOpen(false)}
        />
      </Header>
      <p className="text-[#202A42] font-medium text-[16px] mt-4 text-center px-[60px]">
        {t(translations.notFoundPage.waitForVerificationWarning)}
      </p>
      <div className="flex justify-center py-4 px-8 mt-4">
        <ConfirmButton onClick={() => setOpen(false)}>
          {t(translations.common.confirm)}
        </ConfirmButton>
      </div>
    </Dialog>
  );
};

export default NoPermission;
