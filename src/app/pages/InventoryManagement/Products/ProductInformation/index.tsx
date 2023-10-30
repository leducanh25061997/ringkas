import React, { useEffect } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import path from 'app/routes/path';
import { Grid, Tooltip, Typography } from '@mui/material';
import editIcon from 'assets/icons/edit-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useProductManagementCreateSlice } from '../CreateProduct/slice';
import { selectProductManagementCreate } from '../CreateProduct/slice/selectors';
import { useNavigate, useParams } from 'react-router';
import { Promotions } from '../CreateProduct/slice/types';
import moment from 'moment';
import { formatCurrency } from 'app/components/CustomTextField';
import ImageList from './ImageList';
import blueArrowLeft from '../../../../../assets/icons/blue-arrow-left.svg';
import PageHeader from '../../../../components/PageHeader';

const ProductInformation = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { actions } = useProductManagementCreateSlice();
  const { productDetail, isLoading } = useSelector(
    selectProductManagementCreate,
  );
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getProductInformation(id));
  }, []);

  const links = React.useMemo(
    () => [
      // `${t(translations.sidebar.inventoryManagement)}`,
      // `${t(translations.sidebar.manageProduct)}`,
      {
        label: `${t(translations.productInformation.inventory)}`,
        link: path.productList,
      },
      {
        label: `${t(translations.sidebar.manageProduct)}`,
        link: path.productList,
      },
    ],
    [t],
  );

  if (!productDetail) return null;

  return (
    <Grid
      sx={{
        minHeight: 'calc(100vh - 85px)!important',
        height: '100%',
      }}
    >
      <Grid
        sx={{
          height: '100%',
          flex: 1,
          marginBottom: '40px',
          padding: '24px 24px 0 24px',
        }}
      >
        <div
          className="flex items-center mb-4 cursor-pointer"
          onClick={() => navigate(`${path.product}`)}
        >
          <div className="flex items-center py-[10px] px-6 bg-[#fff] rounded-[8px] mr-6">
            <img
              className="h-[16px] w-[16px]"
              src={blueArrowLeft}
              alt="arrow"
            />
            <p className="text-[#005FC5] text-[16px] leading-[28px] font-semibold ml-2">
              Back
            </p>
          </div>
          <PageHeader
            parentItems={links}
            title={t(translations.productManagement.detailProduct)}
          />
        </div>
        <div className="pt-4 pb-[50px] pl-10 bg-[#fff] rounded-[16px]">
          <div className="flex items-center mb-6">
            <p className="text-[#223250] text-[20px] leading-[24px] font-bold mr-2">
              Product Information
            </p>
            <img
              src={editIcon}
              alt="edit-icon"
              className="cursor-pointer"
              onClick={() => navigate(`${path.product}/update/${id}`)}
            />
          </div>
          <div className="flex pb-[54px]">
            <div className="max-w-[324px]">
              {/*// @ts-ignore*/}
              <ImageList
                imageList={productDetail.images}
                videoList={productDetail.videos}
              />
            </div>
            <div className="ml-10 pr-12 border-r border-[#D7E2EE]">
              <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                Project Name
              </p>
              <p className="mb-8 text-[#223250] text-[16px] leading-[20px] font-medium">
                {productDetail?.projectName}
              </p>
              <div className="flex mb-8">
                <div className="w-[206px]">
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Cluster
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.cluster ? productDetail?.cluster : '-'}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Type
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.type}
                  </p>
                </div>
              </div>
              <div className="flex mb-8">
                <div className="w-[206px]">
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Unit
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.unit}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Lot
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.lot ? productDetail?.lot : '-'}
                  </p>
                </div>
              </div>
              <div className="flex mb-8">
                <div className="w-[206px]">
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Land Area
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.landArea} m2
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Building Area
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.buildingArea} m2
                  </p>
                </div>
              </div>
              <div className="flex mb-8">
                <div className="w-[206px]">
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Number of Floor
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.facility?.numberOfFloor
                      ? productDetail?.facility.numberOfFloor
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Number of Room
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.facility?.numberOfRoom
                      ? productDetail?.facility.numberOfRoom
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="flex">
                <div className="w-[206px]">
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Number of Bathroom
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.facility?.numberOfBathroom
                      ? productDetail?.facility.numberOfBathroom
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                    Other facility
                  </p>
                  <Tooltip
                    title={
                      productDetail?.facility?.others &&
                      productDetail?.facility.others[0] != null
                        ? productDetail?.facility.others[0]
                        : '-'
                    }
                    placement="bottom-start"
                  >
                    <Typography
                      sx={{
                        maxWidth: 250,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: '#223250',
                        fontSize: '16px',
                        fontWeight: 500,
                      }}
                    >
                      {productDetail?.facility?.others &&
                      productDetail?.facility.others[0] != null
                        ? productDetail?.facility.others[0]
                        : '-'}
                    </Typography>
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="pl-12">
              <p className="mb-4 text-[#202A42] text-[18px] leading-[25px] font-bold">
                Pricing
              </p>
              <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                House Price
              </p>
              <p className="mb-10 text-[#223250] text-[16px] leading-[20px] font-medium">
                Rp{' '}
                {formatCurrency(String(productDetail?.pricing?.housePrice)) ||
                  '-'}
              </p>

              <p className="mb-4 text-[#202A42] text-[18px] leading-[25px] font-bold">
                Commission
              </p>
              <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                Max Agent Commission
              </p>
              <p className="mb-10 text-[#223250] text-[16px] leading-[20px] font-medium">
                {productDetail?.commission?.maxAgentCommissionRate
                  ? `${productDetail?.commission?.maxAgentCommissionRate} %`
                  : '-'}
              </p>

              <p className="mb-4 text-[#202A42] text-[18px] leading-[25px] font-bold">
                Interest & Buyback
              </p>
              <div className="flex">
                <div className="mr-8">
                  <p className="text-[#6B7A99] text-[14px] leading-[20px] font-semibold mb-2">
                    Max Bank Interest{' '}
                  </p>
                  <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                    {productDetail?.commission?.maxBankInterestRate
                      ? `${productDetail?.commission?.maxBankInterestRate} %`
                      : '-'}
                  </p>
                </div>
                <div>
                  <p className="text-[#6B7A99] text-[14px] leading-[20px] font-semibold mb-2">
                    Buy Back Guarantee
                  </p>
                  {productDetail?.commission?.buybackGuaranteePolicy ? (
                    <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                      {productDetail?.commission?.buybackGuaranteePolicy > 1
                        ? `${productDetail?.commission?.buybackGuaranteePolicy} years`
                        : `${productDetail?.commission?.buybackGuaranteePolicy} year`}
                    </p>
                  ) : (
                    <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                      -
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-[#D7E2EE]">
            <p className="mb-4 text-[#202A42] text-[18px] leading-[25px] font-bold">
              Promotion
            </p>

            {productDetail?.promotions &&
            productDetail?.promotions.length > 0 ? (
              <div className="flex">
                {productDetail?.promotions.map((item: Promotions) => (
                  <div className="mr-14">
                    <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                      Promo Name
                    </p>
                    <p className="mb-8 text-[#223250] text-[16px] leading-[20px] font-medium">
                      {item?.promotionName}
                    </p>

                    <div className="flex">
                      <div className="mr-6">
                        <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                          Start Date
                        </p>
                        <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                          {moment(item?.startDate).format('DD/MM/YYYY')}
                        </p>
                      </div>
                      <div>
                        <p className="mb-2 text-[#6B7A99] text-[14px] leading-[20px] font-semibold">
                          End Date
                        </p>
                        <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
                          {moment(item?.endDate).format('DD/MM/YYYY')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mb-4 text-[#202A42] text-[14px] leading-[25px] font-medium">
                No Promotion
              </p>
            )}
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default React.memo(ProductInformation);
