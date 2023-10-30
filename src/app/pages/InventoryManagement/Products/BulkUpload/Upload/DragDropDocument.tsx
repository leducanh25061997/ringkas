import uploadIcon from 'assets/icons/upload-v3.svg';
import { FileWithPath, useDropzone } from 'react-dropzone';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

interface Props {
  file?: FileWithPath;
  onChange: (files: FileWithPath) => void;
}

function DragDropDocument({ onChange, file }: Props) {
  const { t } = useTranslation();
  const { getRootProps, getInputProps } = useDropzone({
    accept: [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ],
    maxFiles: 1,
    maxSize: 5242880,
    onDropAccepted: files => onChange(files[0]),
  });

  return (
    <section className="w-full ">
      {file ? (
        <div className="w-full py-7 flex items-center p-4 rounded-lg bg-[#F0F4F9] mt-4">
          <div
            {...getRootProps({
              className:
                'p-[10px_16px] bg-white border border-[#005FC5] rounded-lg shrink-0',
            })}
          >
            <input {...getInputProps()} />
            <p className="text-[#005FC5] leading-7 font-semibold">
              Change Document
            </p>
          </div>
          <p className="text-[#202A42] font-medium leading-5 grow overflow-hidden text-ellipsis ml-2 whitespace-nowrap">
            {file.name}
          </p>
        </div>
      ) : (
        <div
          {...getRootProps({
            className:
              'w-full py-7 flex items-center justify-center border border-dashed border-[#009CE0] rounded-lg bg-[#F0F4F9] mt-4',
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <img src={uploadIcon} alt="" width={12} height={16} />
              <p className="font-medium leading-5 text-[#6B7A99] ml-[6px]">
                {`${t(
                  translations.imageUploadComponent.dragAndDropDocument,
                )}  `}
                <span className="text-[#005FC5] font-semibold underline">
                  {t(translations.imageUploadComponent.browse)}
                </span>
              </p>
            </div>
            <p className="text-[#9098A7] text-[14px] leading-6 mt-2">
              {t(translations.imageUploadComponent.maxFileSize)}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default DragDropDocument;
