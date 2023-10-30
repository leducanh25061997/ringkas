import React, { useEffect, useState } from 'react';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useBankTaskSlice } from '../Task/slice';
import { selectBankTask } from '../Task/slice/selectors';
import Spinner from 'app/components/Spinner';
import {
  getFileName,
  fieldNameTransform,
  checkEndpointUrl,
  checkFileType,
} from 'utils/commonFunction';
import classNames from 'classnames';
import Dialog from 'app/components/Dialog';
import Img from 'app/components/Img';
import notFound from 'assets/images/not-found.jpg';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import Notifier from '../../../../Notifier';

function CustomerDocument() {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { t } = useTranslation();
  const { customerDocuments, isCustomerDocsSuccess, isCustomerDocsLoading } =
    useSelector(selectBankTask);
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const bankActions = useBankTaskSlice().actions;

  useEffect(() => {
    if (!id) return;
    const params = {
      id,
      valueType: 'FILE',
    };
    // @ts-ignore
    dispatch(bankActions.getCustomerDocs(params));
  }, [id]);

  return (
    <div className="card pt-4">
      <div className="flex justify-between items-center px-6">
        <p className="font-bold text-[20px] leading-6">
          {t(translations.common.customerDocument)}
        </p>
        <div className="view-all" onClick={() => setOpen(true)}>
          {t(translations.common.viewAll)}
        </div>
      </div>
      <div className="pb-4">
        <div className="flex text-[#6B7A99] text-[14px] mt-6 pb-2 border-b border-b-[#D7E2EE]">
          <p className="w-1/2 font-semibold px-6">CATEGORY</p>
          <p className="w-1/2 font-semibold px-6">FILE NAME</p>
        </div>
        <div className="max-h-[250px] min-h-[250px] overflow-y-auto scrollbar">
          {isCustomerDocsLoading ? (
            <div className="w-full h-full flex items-center justify-center  min-h-[250px]">
              <Spinner />
            </div>
          ) : (
            <>
              {customerDocuments &&
                customerDocuments.length > 0 &&
                customerDocuments.map((item, idx) => (
                  <Row
                    key={idx}
                    category={fieldNameTransform(item.key)}
                    fileName={
                      (item?.values &&
                        item?.values[0] &&
                        checkEndpointUrl(item?.values[0]) &&
                        getFileName(item?.values[0] as string)) ||
                      '-'
                    }
                    link={
                      (item?.values &&
                        checkEndpointUrl(item?.values[0]) &&
                        item?.values[0]) ||
                      undefined
                    }
                  />
                ))}
              {customerDocuments && customerDocuments.length === 0 && (
                <div className="flex items-center justify-center text-[#6B7A99] font-medium text-[16px] h-full">
                  {t(translations.components.table.noDataFound)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setOpen(false)}
        title={t(translations.common.customerDocument)}
        submitTitle={t(translations.common.download)}
        onSubmit={() => {
          if (!id) return;
          const params = {
            applicationId: id,
            type: 'CUSTOMER_DOCUMENT',
          };
          // @ts-ignore
          dispatch(
            bankActions.downloadDocsByType(
              params,
              () => {},
              () => {
                Notifier.addNotifyError({ messageId: 'error.anErrorOccurred' });
              },
            ),
          );
        }}
      >
        <div className="max-h-[750px] min-w-[692px] overflow-y-auto scrollbar pb-4">
          {customerDocuments &&
            customerDocuments.length > 0 &&
            customerDocuments.map((item, idx) => {
              if (
                item?.values &&
                checkEndpointUrl(item?.values[0]) &&
                checkFileType(item?.values[0]) === 'IMG'
              ) {
                return (
                  <Image
                    key={idx}
                    url={
                      item?.values &&
                      checkEndpointUrl(item?.values[0]) &&
                      item?.values[0]
                    }
                    title={fieldNameTransform(item.key)}
                  />
                );
              }

              return (
                <Row
                  key={idx}
                  category={fieldNameTransform(item.key)}
                  fileName={
                    (item?.values &&
                      item?.values[0] &&
                      checkEndpointUrl(item?.values[0]) &&
                      getFileName(item?.values[0] as string)) ||
                    '-'
                  }
                  link={
                    (item?.values &&
                      checkEndpointUrl(item?.values[0]) &&
                      item?.values[0]) ||
                    undefined
                  }
                />
              );
            })}
        </div>
      </Dialog>
    </div>
  );
}

export default CustomerDocument;

interface RowProps {
  category: string;
  fileName: string;
  link: string | undefined;
}

const Row = (props: RowProps) => {
  const { category, fileName, link } = props;
  return (
    <div className="flex mt-4">
      <p className="px-6 text-[#6B7A99] font-medium w-1/2">{category}</p>
      <p
        className={classNames(
          'w-1/2 text-[#000] font-semibold px-6 text-ellipsis overflow-hidden whitespace-nowrap cursor-pointer',
          { 'underline !text-[#005FC5]': link },
        )}
        onClick={() => {
          if (!link) return;
          window.open(link);
        }}
      >
        {fileName}
      </p>
    </div>
  );
};

interface ImageProps {
  url?: string;
  title?: string;
}

export const Image = ({ url, title }: ImageProps) => {
  return (
    <div className="flex items-center mb-6 px-8">
      <p className="text-[#6B7A99] text-[16px] leading-[20px] min-w-[240px] font-medium w-1/2">
        {title}
      </p>
      <div className="w-full relative w-1/2">
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
