import { DropdownItem } from 'app/components/DropdownInput/type';
import classNames from 'classnames';
import React, { useState } from 'react';
import uploadIcon from 'assets/icons/upload-v2.svg';
import arrowLeft from 'assets/icons/arrow-left.svg';
import DragDropDocument from './DragDropDocument';
import { Grid } from '@mui/material';
import { FileWithPath } from 'react-dropzone';

import greenCheckIcon from 'assets/icons/tick-green.svg';
import xIcon from 'assets/icons/x-red.svg';

interface Props {
  className?: string;
  project?: DropdownItem;
  onBack: () => void;
}

function Update({ className, project, onBack }: Props) {
  const [documentFile, setDocumentFile] = useState<FileWithPath>();

  // console.log(documentFile);

  const handleBackToCreate = onBack;

  return (
    <div className={classNames(className, 'flex flex-col')}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <section className="flex items-center">
            <button onClick={handleBackToCreate}>
              <img src={arrowLeft} alt="" width={24} height={24} />
            </button>

            <h2 className="text-[18px] leading-[22px] font-semibold ml-1">
              Upload Document - {project?.label}
            </h2>
          </section>
          <DragDropDocument onChange={setDocumentFile} file={documentFile} />
          <button
            // onClick={handleContinue}
            disabled={!documentFile}
            className={classNames(
              'bg-[#005FC5] rounded-lg text-white leading-7 font-semibold w-[135px] h-[48px] mt-6 flex justify-center items-center',
              {
                '!bg-[#D7E2EE]': !documentFile,
              },
            )}
          >
            <img
              src={uploadIcon}
              width={16}
              height={16}
              alt=""
              className="mr-2"
            />
            <span>Upload</span>
          </button>
        </Grid>
        <Grid item xs={6}>
          <div className="border border-[#005FC5] rounded-2xl p-4">
            <div className="flex flex-col px-[22px] py-4 border border-[#D7E2EE] rounded-lg">
              <p className="leading-[19px] font-semibold border-b border-[#D7E2EE] pb-4">
                Total: 144 Rows
              </p>
              <div className="flex items-center px-4 mt-4">
                <img src={greenCheckIcon} alt="" width={16} height={16} />
                <p className="ml-4 leading-[22px] font-medium">
                  120 Rows Success
                </p>
              </div>
              <div className="flex items-center px-4 mt-4">
                <img src={xIcon} alt="" width={16} height={16} />
                <p className="ml-4 leading-[22px] font-medium">22 Rows Error</p>
              </div>
            </div>
            <button
              // onClick={handleContinue}
              className={classNames(
                'bg-[#005FC5] rounded-lg text-white leading-7 font-semibold px-[22px] h-[48px] mt-6 flex justify-center items-center',
              )}
            >
              <img
                src={uploadIcon}
                width={16}
                height={16}
                alt=""
                className="mr-2"
              />
              <span>Download Error File</span>
            </button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Update;
