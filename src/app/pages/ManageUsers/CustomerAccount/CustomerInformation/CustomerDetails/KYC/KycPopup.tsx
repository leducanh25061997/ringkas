import tickBlue from 'assets/icons/tick-blue.svg';
import Tabs from 'app/components/Tabs';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { useState } from 'react';
import CustomRow from 'app/components/CustomRow';
import Img from 'app/components/Img';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import { CustomerApplicationKycDetail } from 'types/CustomerManagement';
import moment from 'moment';
import notFound from 'assets/images/not-found.jpg';
import { Typography } from '@mui/material';
import deleteIcon from 'assets/icons/delete.svg';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { VerificationStatusResponse } from '../../../PreKprVerification/types';
import { selectManageCustomer } from '../../../slice/selectors';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
`;

interface Props {
  customerKyc: CustomerApplicationKycDetail;
  customerKycGuarantor?: CustomerApplicationKycDetail;
  customerKycBasic?: VerificationStatusResponse;
  onClose?: () => void;
}

interface ImageProps {
  url?: string;
  title?: string;
}

const Image = ({ url, title }: ImageProps) => {
  return (
    <div className="flex mt-6">
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold w-2/5">
        {title}
      </p>
      <div className="w-full relative w-3/5">
        <Img
          src={url || notFound}
          alt=""
          className="rounded-lg h-[200px] w-full object-cover"
        />
        {url && (
          <a
            className="p-2 absolute right-3 bottom-3 cursor-pointer bg-[rgba(0,0,0,0.5)] rounded-lg"
            href={url}
            target="_blank"
            rel="noreferrer"
          >
            <img src={fullscreenIcon} alt="" width={16} height={16} />
          </a>
        )}
      </div>
    </div>
  );
};

const KycPopup = ({
  customerKyc,
  customerKycGuarantor,
  customerKycBasic,
  onClose,
}: Props) => {
  const { customerPreference } = useSelector(selectManageCustomer);
  const address = customerKyc && customerKyc?.location;
  const { t } = useTranslation();
  const [tabSelect, setTabSelect] = useState(0);
  const tabList = customerPreference?.jointIncome
    ? [
        t(translations.createCustomer.requester),
        t(translations.createCustomer.warrantor),
      ]
    : [t(translations.createCustomer.requester)];

  const isVerified = React.useMemo(() => {
    return (
      customerKycBasic?.applicationStatus === 'PRE_SCORING_READY' ||
      customerKycBasic?.applicationStatus === 'APPROVED' ||
      customerKycBasic?.applicationStatus === 'DECLINED'
    );
  }, [customerKycBasic]);

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
            {isVerified && <img src={tickBlue} alt="tick blue" />}
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
      <Tabs
        className="mb-6 justify-center mt-6"
        tabList={tabList}
        pageActive={tabList[tabSelect]}
        onChange={e => {
          setTabSelect(tabList.indexOf(e));
        }}
      />
      {tabSelect === 0 && (
        <div className="max-h-[700px] px-10 overflow-y-auto scrollbar">
          <div className="flex mt-6">
            <CustomRow
              title={t(translations.common.nameAsID)}
              description={customerKyc.fullName ? customerKyc.fullName : '-'}
              className="w-1/3"
            />
            <CustomRow
              title={t(translations.dataVerification.birthPlace)}
              description={
                customerKyc.birthPlace ? customerKyc.birthPlace : '-'
              }
              className="w-1/3"
            />
            <CustomRow
              title={t(translations.dataVerification.dob)}
              description={
                customerKyc.dob
                  ? moment(+moment(customerKyc.dob).format('x')).format(
                      'DD/MM/YYYY',
                    )
                  : '-'
              }
              className="w-1/3"
            />
          </div>
          <div className="flex mt-6">
            <CustomRow
              title={t(translations.dataVerification.nik)}
              description={customerKyc.nik ? customerKyc.nik : '-'}
              className="w-1/3"
            />
            <CustomRow
              title={t(translations.dataVerification.npwp)}
              description={customerKyc.npwp ? customerKyc.npwp : '-'}
              className="w-2/3"
            />
          </div>
          <CustomRow
            title={t(translations.common.address)}
            description={
              address
                ? `${address?.province ? address?.province : '-'}/ ${
                    address?.city ? address?.city : '-'
                  }/ ${address?.district ? address?.district : '-'}/ ${
                    address?.subDistrict ? address?.subDistrict : '-'
                  }/ ${address?.postalCode ? address?.postalCode : '-'}`
                : '-'
            }
            className="mt-6"
          />
          <div className="flex mt-6">
            <CustomRow
              title={t(translations.developerInformation.phoneNumber)}
              description={customerKyc.phone ? customerKyc.phone : '-'}
              className="w-2/4"
            />
            <CustomRow
              title={t(translations.customerList.email)}
              description={
                customerKycBasic?.account?.email
                  ? `${customerKycBasic?.account?.email}`
                  : '-'
              }
              className="w-2/4"
            />
          </div>
          <Image
            url={customerKyc.fileKtp && customerKyc.fileKtp[0].url}
            title="Photo of KTP"
          />
          <Image
            url={customerKyc.fileNpwp && customerKyc.fileNpwp[0].url}
            title="Photo of NPWP"
          />
          <Image
            url={customerKyc.filePhoto && customerKyc.filePhoto[0].url}
            title="Selfie"
          />
        </div>
      )}
      {tabSelect === 1 && (
        <div className="max-h-[700px] px-10 overflow-y-auto scrollbar">
          <div className="flex mt-6">
            <CustomRow
              title={t(translations.common.nameAsID)}
              description={
                customerKycGuarantor?.fullName
                  ? customerKycGuarantor?.fullName
                  : '-'
              }
              className="w-1/3"
            />
            <CustomRow
              title={t(translations.dataVerification.birthPlace)}
              description={
                customerKycGuarantor?.birthPlace
                  ? customerKycGuarantor?.birthPlace
                  : '-'
              }
              className="w-1/3"
            />
            <CustomRow
              title={t(translations.dataVerification.dob)}
              description={
                customerKycGuarantor?.dob
                  ? moment(
                      +moment(customerKycGuarantor?.dob).format('x'),
                    ).format('DD/MM/YYYY')
                  : '-'
              }
              className="w-1/3"
            />
          </div>
          <div className="flex mt-6">
            <CustomRow
              title={t(translations.dataVerification.nik)}
              description={
                customerKycGuarantor?.nik ? customerKycGuarantor?.nik : '-'
              }
              className="w-1/3"
            />
            <CustomRow
              title={t(translations.dataVerification.npwp)}
              description={
                customerKycGuarantor?.npwp ? customerKycGuarantor?.npwp : '-'
              }
              className="w-2/3"
            />
          </div>
          <CustomRow
            title={t(translations.common.address)}
            description={
              address
                ? `${address?.province ? address?.province : '-'}/ ${
                    address?.city ? address?.city : '-'
                  }/ ${address?.district ? address?.district : '-'}/ ${
                    address?.subDistrict ? address?.subDistrict : '-'
                  }/ ${address?.postalCode ? address?.postalCode : '-'}`
                : '-'
            }
            className="mt-6"
          />
          <div className="flex mt-6">
            <CustomRow
              title={t(translations.developerInformation.phoneNumber)}
              description={
                customerKycGuarantor?.phone ? customerKycGuarantor?.phone : '-'
              }
              className="w-2/4"
            />
            <CustomRow
              title={t(translations.customerList.email)}
              description={
                customerKycBasic?.account?.email
                  ? `${customerKycBasic?.account?.email}`
                  : '-'
              }
              className="w-2/4"
            />
          </div>
          <Image
            url={
              customerKycGuarantor?.fileKtp &&
              customerKycGuarantor?.fileKtp[0].url
            }
            title={t(translations.createCustomer.ktpPhotoLabel)}
          />
          <Image
            url={
              customerKycGuarantor?.fileNpwp &&
              customerKycGuarantor?.fileNpwp[0].url
            }
            title={t(translations.createCustomer.npwpPhotoLabel)}
          />
          <Image
            url={
              customerKycGuarantor?.filePhoto &&
              customerKycGuarantor?.filePhoto[0].url
            }
            title={t(translations.createCustomer.selfiePhotoLabel)}
          />
        </div>
      )}
    </div>
  );
};

export default KycPopup;
