import React, { useState } from 'react';
import Tabs from './Tabs';
import DownloadTable from './DownloadTable';
import UploadTable from './UploadTable';
import classNames from 'classnames';

function History() {
  const [tabActive, setTabActive] = useState<'DOWNLOAD' | 'UPLOAD'>('DOWNLOAD');

  return (
    <div className="bg-white rounded-2xl mt-6 pt-6">
      <p className="text-[24px] leading-7 font-bold ml-8">History</p>
      <Tabs pageActive={tabActive} className="mt-8" onChange={setTabActive} />
      <DownloadTable
        className={classNames({ hidden: tabActive !== 'DOWNLOAD' })}
      />
      <UploadTable className={classNames({ hidden: tabActive !== 'UPLOAD' })} />
    </div>
  );
}

export default History;
