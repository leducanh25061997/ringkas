import { Typography } from '@mui/material';
import CustomRow from 'app/components/CustomRow';
import Img from 'app/components/Img';
import deleteIcon from 'assets/icons/delete.svg';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import tickBlue from 'assets/icons/tick-blue.svg';
import notFound from 'assets/images/not-found.jpg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PartnerDetails } from 'types/PartnerAccountManagement';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

interface Props {
  company?: PartnerDetails['company'];
  verified: boolean;
  onClose?: () => void;
}

interface ImageProps {
  url?: string;
  title?: string;
}

const KybPopup = ({ company, verified, onClose }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="py-6 w-[682px]">
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
          <div className="flex justify-center">
            <p className="text-[#202A42] text-[20px] leading-[24px] font-bold mr-2">
              {t(translations.common.kyb)}
            </p>
            {verified && <img src={tickBlue} alt="tick blue" />}
          </div>
        </Typography>
        <img
          src={deleteIcon}
          width={24}
          height={24}
          alt="delete-icon"
          className="cursor-pointer"
          // @ts-ignore
          onClick={onClose}
        />
      </Header>

      <div className="max-h-[700px] px-10 overflow-y-auto scrollbar">
        <CustomRow
          title={t(translations.registerNewClient.companyName)}
          description={company?.name || '-'}
          className="mt-6"
        />
        <CustomRow
          title={t(translations.registerNewClient.companyAddress)}
          description={company?.address || '-'}
          className="mt-6"
        />
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.registerNewClient.companyEmail)}
            description={company?.email || '-'}
            className="w-1/2"
          />
          <CustomRow
            title={t(translations.registerNewClient.companyPhoneNumber)}
            description={company?.phone || '-'}
            className="w-1/2"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.registerNewClient.companySppkpNumber)}
            description={company?.sppkpNumber || '-'}
            className="w-1/2"
          />
          <CustomRow
            title={t(translations.registerNewClient.npwpNumber)}
            description={company?.npwpNumber || '-'}
            className="w-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default KybPopup;
