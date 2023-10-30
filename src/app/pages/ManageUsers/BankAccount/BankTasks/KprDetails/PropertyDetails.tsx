import Img from 'app/components/Img';
import { useSelector } from 'react-redux';
import { selectManageCustomer } from '../../../CustomerAccount/slice/selectors';
import { formatCurrency } from 'app/components/CustomTextField';
import notFound from 'assets/images/not-found.jpg';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface RowProps {
  title: string;
  description: string;
  className?: string;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={className}>
      <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
        {description}
      </p>
    </div>
  );
};

const PropertyDetails = () => {
  const { t } = useTranslation();
  const { customerPreference, propertyDetail } =
    useSelector(selectManageCustomer);

  const finalPrice =
    propertyDetail && propertyDetail.housePrice
      ? Math.round(
          propertyDetail.housePrice -
            (propertyDetail.housePrice * propertyDetail.discount) / 100,
        )
      : 0;

  const downPaymentRp =
    propertyDetail && propertyDetail.downPayment
      ? Math.round((finalPrice * propertyDetail.downPayment) / 100)
      : 0;

  const kprAmount =
    propertyDetail && propertyDetail.bookingFee
      ? Math.round(finalPrice - propertyDetail.bookingFee - downPaymentRp)
      : 0;

  return (
    <div className="card min-h-[349px]">
      <div className="pt-6 px-8 pb-10">
        <p className="text-[#202A42] text-[18px] leading-[24px] font-bold mb-6">
          {t(translations.developerWorkspace.propertyDetails)}
        </p>
        <div className="flex">
          <div className="w-[120px] h-[120px]">
            <Img
              className="w-full h-full object-cover rounded-[8px]"
              src={
                (propertyDetail?.property?.images &&
                  propertyDetail?.property?.images[0] &&
                  propertyDetail?.property?.images[0]?.url) ||
                notFound
              }
              alt="property"
            />
          </div>
          <div className="ml-6 w-[370px]">
            <p className="text-[#202A42] text-[18px] leading-[24px] font-semibold">
              {customerPreference?.project?.name || '-'}
            </p>
            <p className="text-[#202A42] text-[18px] leading-[24px] font-bold mb-6 mt-2">
              {customerPreference?.project?.name || '-'}
            </p>
            <div className="flex mb-8">
              <Row
                title={t(translations.customerList.unitPrice)}
                description={
                  propertyDetail?.housePrice
                    ? `Rp ${formatCurrency(propertyDetail?.housePrice)}`
                    : '-'
                }
                className="w-6/12 mr-10"
              />
              <Row
                title={t(translations.customerList.bookingFee)}
                description={
                  propertyDetail?.bookingFee
                    ? `Rp ${formatCurrency(propertyDetail?.bookingFee)}`
                    : '-'
                }
              />
            </div>
            <div className="flex">
              <Row
                title={t(translations.customerList.downPayment)}
                description={`${
                  propertyDetail?.downPayment || 0
                }% - Rp ${formatCurrency(downPaymentRp)}`}
                className="w-6/12 mr-10"
              />
              <Row
                title={t(translations.customerList.pkrAmount)}
                description={`Rp ${formatCurrency(kprAmount)}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
