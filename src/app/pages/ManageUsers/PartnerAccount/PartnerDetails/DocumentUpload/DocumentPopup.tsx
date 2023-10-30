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
  document?: PartnerDetails['document'];
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

const DocumentPopup = ({ document, onClose }: Props) => {
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
              {t(translations.registerNewClient.document)}
            </p>
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
        <Image
          url={document?.fileKtpDirector && document?.fileKtpDirector[0]?.url}
          title={t(translations.registerNewClient.kptDirector)}
        />
        <Image
          url={
            document?.fileDeedOfCompany && document?.fileDeedOfCompany[0]?.url
          }
          title={t(translations.registerNewClient.deedOfCompany)}
        />
        <Image
          url={document?.fileCompanyNpwp && document?.fileCompanyNpwp[0]?.url}
          title={t(translations.registerNewClient.companyNPWP)}
        />
        <Image
          url={document?.fileNib && document?.fileNib[0]?.url}
          title={t(translations.registerNewClient.nib)}
        />
        <Image
          url={
            document?.fileCompanyDecree && document?.fileCompanyDecree[0]?.url
          }
          title={t(translations.registerNewClient.companyDecree)}
        />
        {document?.fileSupportingDocument?.map((file, index) => (
          <Image
            url={file?.url}
            title={`${t(translations.registerNewClient.supportingDocument)} ${
              index || ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default DocumentPopup;
