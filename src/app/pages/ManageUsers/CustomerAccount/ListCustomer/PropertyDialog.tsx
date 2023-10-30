import Dialog from 'app/components/Dialog';
import React, { useEffect, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import { PropertyInformation } from './types';
import defaultProperty from 'assets/images/default-building.jpg';
import Img from 'app/components/Img';
import { formatCurrency } from 'app/components/CustomTextField';
import { useDispatch, useSelector } from 'react-redux';
import { useManageCustomerSlice } from '../slice';
import { selectManageCustomer } from '../slice/selectors';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

// TO DO: fill location
interface Props {
  data?: PropertyInformation & {
    logo?: string;
  };
}
function PropertyDialog(props: Props) {
  const { data } = props;
  const [open, setOpen] = useState(false);
  const customerActions = useManageCustomerSlice().actions;

  const { t } = useTranslation();

  const { propertyDetail } = useSelector(selectManageCustomer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (open)
      dispatch(customerActions.fetchPropertyDetail(data?.applicationId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.applicationId, open]);

  if (!data?.projectName) return null;

  const finalPrice = propertyDetail?.housePrice
    ? Math.round(
        propertyDetail.housePrice -
          (propertyDetail.housePrice * propertyDetail.discount) / 100,
      )
    : 0;

  const downPaymentRp = propertyDetail?.housePrice
    ? Math.round((finalPrice * propertyDetail.downPayment) / 100)
    : 0;

  const kprAmount = propertyDetail?.housePrice
    ? Math.round(finalPrice - propertyDetail.bookingFee - downPaymentRp)
    : 0;

  return (
    <div className="relative inline-block !w-[30px] h-[30px] shrink-0">
      <img
        src={infoIcon}
        width={30}
        height={30}
        alt=""
        onClick={() => setOpen(true)}
        className="cursor-pointer"
      />
      <Dialog
        open={open}
        hideFooter
        onClose={() => setOpen(false)}
        title={t(translations.customerList.property)}
        maxWidth="xl"
      >
        <div className="w-[950px] p-6 pt-0 grid grid-cols-2 gap-[50px] text-[#202A42] leading-5">
          <div>
            <div className="flex">
              <div className="w-[112px] h-[112px] rounded-lg overflow-hidden shrink-0">
                <Img
                  src={data?.images ? data.images[0].url : defaultProperty}
                  className="w-full h-full rounded-lg object-cover border"
                  alt=""
                />
              </div>
              <div className="pl-4 w-[calc(100%-112px)]">
                <div className="flex">
                  <p className="font-bold text-[18px] leading-6 mr-4">
                    {data?.projectName || '-'}
                  </p>
                  {data?.logo && <img src={data.logo} alt="" width={71} />}
                </div>
                <p className="text-[#6B7A99] mt-2">{data?.type}</p>
                <p className="text-[#6B7A99] mt-2 text-[14px]">-</p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-6 gap-6">
              <div>
                <p className="text-[#6B7A99] text-[14px] font-semibold">
                  {t(translations.customerList.unitPrice)}
                </p>
                <p className="mt-2 font-medium">
                  {propertyDetail?.housePrice
                    ? `Rp ${formatCurrency(propertyDetail.housePrice)}`
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-[#6B7A99] text-[14px] font-semibold">
                  {t(translations.customerList.pkrAmount)}
                </p>
                <p className="mt-2 font-medium">
                  {kprAmount ? `Rp ${formatCurrency(kprAmount)}` : '-'}
                </p>
              </div>
              <div>
                <p className="text-[#6B7A99] text-[14px] font-semibold">
                  {t(translations.customerList.bookingFee)}
                </p>
                <p className="mt-2 font-medium">
                  {propertyDetail?.bookingFee
                    ? `Rp ${formatCurrency(propertyDetail.bookingFee)}`
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-[#6B7A99] text-[14px] font-semibold">
                  {t(translations.customerList.discount)} (%)
                </p>
                <p className="mt-2 font-medium">
                  {propertyDetail?.discount
                    ? `${propertyDetail.discount}%`
                    : '-'}
                </p>
              </div>
              <div>
                <p className="text-[#6B7A99] text-[14px] font-semibold">
                  {t(translations.customerList.downPayment)}
                </p>
                <p className="mt-2 font-medium">
                  {propertyDetail?.downPayment
                    ? `${propertyDetail.downPayment}%`
                    : '-'}
                </p>
                <p className="mt-2 font-medium">
                  {downPaymentRp ? `Rp ${formatCurrency(downPaymentRp)}` : '-'}
                </p>
              </div>
              <div>
                <p className="text-[#6B7A99] text-[14px] font-semibold">
                  {t(translations.customerList.creditPreference)}
                </p>
                <p className="mt-2 font-medium">-</p>
                <p className="mt-2 font-medium">-</p>
                <p className="mt-2 font-medium">-</p>
              </div>
            </div>
          </div>
          <div className="text-[#6B7A99]">
            <div>
              <p className="text-[#6B7A99] text-[14px] font-semibold">
                {t(translations.customerList.adminRingkas)}
              </p>
              <p className="mt-2 font-medium">-</p>
            </div>
            <div className="mt-6">
              <p className="text-[#6B7A99] text-[14px] font-semibold">
                {t(translations.customerList.officerRingkas)}
              </p>
              <p className="mt-2 font-medium">-</p>
            </div>
            <div className="mt-6">
              <p className="text-[#6B7A99] text-[14px] font-semibold">
                {t(translations.customerList.ownerPicDeveloper)}
              </p>
              <p className="mt-2 font-medium">-</p>
            </div>
            <div className="mt-6">
              <p className="text-[#6B7A99] text-[14px] font-semibold">
                {t(translations.customerList.ownerBankPartner)}
              </p>
              <p className="mt-2 font-medium">-</p>
            </div>
            <div className="mt-6">
              <p className="text-[#6B7A99] text-[14px] font-semibold">
                {t(translations.customerList.ownerAgents)}
              </p>
              <p className="mt-2 font-medium">-</p>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default PropertyDialog;
