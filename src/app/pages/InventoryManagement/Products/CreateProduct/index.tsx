import FormLeft from './component/FormLeft';
import FormRight from './component/FormRight';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { translations } from 'locales/translations';
import path from '../../../../routes/path';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useProductManagementCreateSlice } from './slice';
import { selectProductManagementCreate } from './slice/selectors';
import { useNavigate, useParams } from 'react-router';
import Notifier from '../../../Notifier';
import { Promotions } from './slice/types';
import { formatCurrency } from 'app/components/CustomTextField';
import { FileUploadWithProgress } from 'types/FileUpload';
import axios from 'axios';
import s3Service from '../../../../../services/api/fileService';
import PageHeader from 'app/components/PageHeader';
import blueArrowLeft from 'assets/icons/blue-arrow-left.svg';

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background: ${props => (props.disabled ? '#f3f3f3' : '#005FC5')};
  border-radius: 8px;
  color: ${props => (props.disabled ? '#000' : '#fff')};
  width: 128px;
`;

const CancelButton = styled.div`
  width: 128px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #005fc5;
  background: #f6f7ff;
  margin-right: 16px;
  text-align: center;
  cursor: pointer;
`;

interface Props {
  typeAction?: string;
  title?: string;
}

const CreateProduct = (props: Props) => {
  const { typeAction = 'CREATE', title } = props;
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const { control, ...methods } = useForm<any>({
    defaultValues: {
      promotions: [
        { promotionName: '', startDate: undefined, endDate: undefined },
      ],
      images: [],
      videos: [],
    },
  });
  const dispatch = useDispatch();
  const { actions } = useProductManagementCreateSlice();
  const { productDetail } = useSelector(selectProductManagementCreate);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getProductInformation(id));
  }, []);

  const links = React.useMemo(() => {
    if (typeAction === 'CREATE') {
      return [
        {
          label: `${t(translations.productInformation.inventory)}`,
          link: path.productList,
        },
        {
          label: `${t(translations.sidebar.manageProduct)}`,
          link: path.productList,
        },
      ];
    } else if (typeAction === 'EDIT') {
      return [
        {
          label: `${t(translations.productInformation.inventory)}`,
          link: path.productList,
        },
        {
          label: `${t(translations.sidebar.manageProduct)}`,
          link: path.productList,
        },
        {
          label: `${t(translations.productManagement.detailProduct)}`,
          link: `${path.productList}/${id}`,
        },
      ];
    }
  }, [typeAction, t]);

  useEffect(() => {
    if (typeAction === 'EDIT') {
      if (!productDetail) return;
      methods.reset({
        ...productDetail,
        projectName: {
          label: productDetail.projectName,
          value: productDetail.projectId,
        },
        others:
          productDetail?.facility &&
          productDetail?.facility?.others &&
          productDetail?.facility?.others[0],
        numberOfBathroom:
          productDetail?.facility && productDetail?.facility.numberOfBathroom,
        numberOfFloor:
          productDetail?.facility && productDetail?.facility.numberOfFloor,
        numberOfRoom:
          productDetail?.facility && productDetail?.facility.numberOfRoom,
        buybackGuaranteePolicy:
          productDetail?.commission &&
          productDetail.commission.buybackGuaranteePolicy,
        maxAgentCommissionRate:
          productDetail?.commission &&
          productDetail.commission.maxAgentCommissionRate,
        maxBankInterestRate:
          productDetail?.commission &&
          productDetail.commission.maxBankInterestRate,
        type: {
          value: productDetail?.type,
          label: productDetail?.type,
        },
        cluster: {
          value: productDetail?.cluster,
          label: productDetail?.cluster,
        },
        housePrice: formatCurrency(String(productDetail?.pricing?.housePrice)),
        promotions: productDetail?.promotions,
      });
    }
  }, [productDetail, typeAction]);

  const onSubmit = async (data: any) => {
    setDisabled(true);

    const payload = {
      propertyId: id,
      projectId: data?.projectName?.value,
      type: data?.type.value,
      unit: data?.unit,
      lot: data?.lot,
      landArea: data?.landArea,
      buildingArea: data?.buildingArea,
      facility: {
        numberOfFloor: data?.numberOfFloor,
        numberOfRoom: data?.numberOfRoom,
        numberOfBathroom: data?.numberOfBathroom,
        others: [data?.others],
      },
      pricing: {
        housePrice: data?.housePrice.replaceAll('.', ''),
      },
      promotions:
        data?.promotions &&
        data?.promotions
          .filter(
            (item: Promotions) =>
              item.promotionName !== '' &&
              item.startDate !== undefined &&
              item.endDate !== undefined,
          )
          .map((item: Promotions) => ({
            promotionName: item?.promotionName,
            startDate:
              typeof item?.startDate === 'number'
                ? item?.startDate
                : item?.startDate?.getTime(),
            endDate:
              typeof item?.endDate === 'number'
                ? item?.endDate
                : item?.endDate?.getTime(),
          })),
      commission: {
        maxBankInterestRate: data?.maxBankInterestRate,
        buybackGuaranteePolicy: data?.buybackGuaranteePolicy ?? 0,
        maxAgentCommissionRate: data?.maxAgentCommissionRate ?? 0,
      },
      cluster: data?.cluster?.value,
    };

    const cancelTokenSource = axios.CancelToken.source();
    const _imageList: FileUploadWithProgress[] = [...data.images].filter(
      item => !item.url,
    );
    const _imageHasUrl: FileUploadWithProgress[] = [...data.images].filter(
      item => item.url,
    );

    const _videoList: FileUploadWithProgress[] = [...data.videos].filter(
      item => !item.url,
    );
    const _videoHasUrl: FileUploadWithProgress[] = [...data.videos].filter(
      item => item.url,
    );

    for (let i = 0; i < _imageList.length; i++) {
      const fileNameImage = [_imageList[i]?.file?.name];

      const fetchUrl = await s3Service.fetchUrlImages({
        fileName: fileNameImage,
      });
      const getUrl = await s3Service.getUrlImageData(
        [{ url: fetchUrl[0].url, files: _imageList[i].file }],
        cancelTokenSource,
        event => {
          const mediaListClone = [..._imageList];
          mediaListClone[i].progress = Math.round(
            (100 * event.loaded) / event.total,
          );
          mediaListClone[i].s3Key = fetchUrl[0].s3Key;
        },
      );
    }

    for (let i = 0; i < _videoList.length; i++) {
      const fileNameVideo = [_videoList[i]?.file?.name];

      const fetchUrl = await s3Service.fetchUrlImages({
        fileName: fileNameVideo,
      });
      const getUrl = await s3Service.getUrlImageData(
        [{ url: fetchUrl[0].url, files: _videoList[i].file }],
        cancelTokenSource,
        event => {
          const mediaListClone = [..._videoList];
          mediaListClone[i].progress = Math.round(
            (100 * event.loaded) / event.total,
          );
          mediaListClone[i].s3Key = fetchUrl[0].s3Key;
        },
      );
    }

    const isDoneImage = [..._imageList].every(item => item.s3Key);
    const isDoneVideo = [..._videoList].every(item => item.s3Key);

    if (isDoneImage && isDoneVideo) {
      if (typeAction === 'CREATE') {
        dispatch(
          actions.createProduct(
            {
              ...payload,
              // @ts-ignore
              images: _imageList.map(item => item.s3Key),
              // @ts-ignore
              videos: _videoList.map(item => item.s3Key),
            },
            () => {
              Notifier.addNotifySuccess({
                messageId: 'success.createProductSuccess',
              });
              navigate(`${path.product}`);
            },
            (err: any) => {
              setDisabled(false);
              if (err.code === 'data_duplicated') {
                Notifier.addNotifyError({
                  messageId: 'error.duplicateUnit',
                });
              } else {
                Notifier.addNotifyError({
                  messageId: 'error.createProductFailed',
                });
              }
            },
          ),
        );
      }

      if (typeAction === 'EDIT') {
        dispatch(
          actions.updateProduct(
            {
              ...payload,
              // @ts-ignore
              images: [
                ..._imageList.map(item => item.s3Key),
                ..._imageHasUrl.map(item => item.s3Key),
              ],
              // @ts-ignore
              videos: [
                ..._videoList.map(item => item.s3Key),
                ..._videoHasUrl.map(item => item.s3Key),
              ],
            },
            () => {
              Notifier.addNotifySuccess({
                messageId: 'success.updateProductSuccess',
              });
              navigate(`${path.product}/${id}`);
            },
            () => {
              setDisabled(false);
              Notifier.addNotifyError({
                messageId: 'error.updateProductFailed',
              });
            },
          ),
        );
      }
    }
  };

  return (
    <FormProvider {...methods} control={control}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              onClick={() => {
                if (typeAction === 'CREATE') {
                  navigate(`${path.product}`);
                }
                if (typeAction === 'EDIT') {
                  navigate(`${path.product}/${id}`);
                }
              }}
            >
              <div className="flex items-center py-[10px] px-6 bg-[#fff] rounded-[8px] mr-6">
                <img
                  className="h-[16px] w-[16px]"
                  src={blueArrowLeft}
                  alt="arrow"
                />
                <p className="text-[#005FC5] text-[16px] leading-[28px] font-semibold ml-2">
                  {t(translations.common.back)}
                </p>
              </div>
              <PageHeader
                // @ts-ignore
                parentItems={links}
                title={
                  title
                    ? title
                    : `${t(translations.productManagement.createNewProduct)}`
                }
              />
            </div>
            <div className="rounded-[16px] bg-[#fff] px-[64px] py-8">
              <p className="text-[18px] leading-[25px] font-bold mb-2">
                {t(translations.productInformation.productInformation)}
              </p>
              <p className="text-[14px] leading-8 mb-6">
                {t(translations.productInformation.completeProductInformation)}
              </p>
              <div className="flex justify-between">
                <FormLeft
                  typeAction={typeAction}
                  projectId={methods.watch('projectName')?.value}
                />
                <FormRight typeAction={typeAction} />
              </div>
            </div>
          </Grid>

          <ActionButtonWrap>
            <CancelButton onClick={() => navigate(`${path.product}`)}>
              {t(translations.common.cancel)}
            </CancelButton>
            {typeAction === 'CREATE' && (
              <ConfirmButton type="submit" disabled={disabled}>
                {t(translations.common.create)}
              </ConfirmButton>
            )}
            {typeAction === 'EDIT' && (
              <ConfirmButton type="submit" disabled={disabled}>
                {t(translations.common.submit)}
              </ConfirmButton>
            )}
          </ActionButtonWrap>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default React.memo(CreateProduct);
