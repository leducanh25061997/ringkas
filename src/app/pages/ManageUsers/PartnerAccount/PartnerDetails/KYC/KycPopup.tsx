import { Typography } from '@mui/material';
import CustomRow from 'app/components/CustomRow';
import Img from 'app/components/Img';
import deleteIcon from 'assets/icons/delete.svg';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import tickBlue from 'assets/icons/tick-blue.svg';
import notFound from 'assets/images/not-found.jpg';
import { translations } from 'locales/translations';
import moment from 'moment';
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
  kyc?: PartnerDetails['kyc'];
  verified: boolean;
  onClose?: () => void;
}

interface ImageProps {
  url?: string;
  title?: string;
}

const KycPopup = ({ kyc, verified, onClose }: Props) => {
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
              {t(translations.createCustomer.kyc)}
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

      <div className="max-h-[700px] px-10 overflow-y-auto">
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.common.nameAsID)}
            description={kyc?.fullName || '-'}
            className="w-1/3"
          />
          <CustomRow
            title={t(translations.dataVerification.birthPlace)}
            description={kyc?.birthPlace || '-'}
            className="w-1/3"
          />
          <CustomRow
            title={t(translations.dataVerification.dob)}
            description={
              kyc?.dob
                ? moment(+moment(kyc?.dob).format('x')).format('DD/MM/YYYY')
                : '-'
            }
            className="w-1/3"
          />
        </div>
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.dataVerification.nik)}
            description={kyc?.nik || '-'}
            className="w-1/3"
          />
          <CustomRow
            title={t(translations.dataVerification.npwp)}
            description={kyc?.npwp || '-'}
            className="w-2/3"
          />
        </div>
        <CustomRow
          title={t(translations.common.address)}
          description={
            kyc?.location ? Object.values(kyc.location).join(', ') : '-'
          }
          className="mt-6"
        />
        <div className="flex mt-6">
          <CustomRow
            title={t(translations.developerInformation.phoneNumber)}
            description={kyc?.phone || '-'}
            className="w-2/4"
          />
          <CustomRow
            title={t(translations.customerList.email)}
            description={kyc?.email || '-'}
            className="w-2/4"
          />
        </div>
      </div>
    </div>
  );
};

export default KycPopup;
