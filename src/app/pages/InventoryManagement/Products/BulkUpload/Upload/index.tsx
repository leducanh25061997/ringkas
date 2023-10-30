import { DropdownItem } from 'app/components/DropdownInput/type';
import classNames from 'classnames';
import React, { useState } from 'react';
import Create from './Create';
import DownloadTemplate from './DownloadTemplate';
import Tabs from './Tabs';
import Update from './Update';

function Upload() {
  const [pageActive, setPageActive] = useState<'UPDATE' | 'CREATE'>('CREATE');
  const [project, setProject] = useState<DropdownItem>();

  const handleGotoUpdate = (value?: DropdownItem) => {
    setProject(value);
    setPageActive('UPDATE');
  };

  const handleGoToCreate = () => setPageActive('CREATE');

  return (
    <div className="mt-6 py-6 bg-white rounded-2xl ">
      <h2 className="text-[24px] leading-7 font-bold mb-8 px-8">Bulk Upload</h2>
      <Tabs pageActive={pageActive} />
      <div className="flex px-8 mt-8">
        <DownloadTemplate active={false} />
        <div className="grow ml-6 border border-[#D7E2EE] rounded-lg p-6">
          <Create
            onContinue={handleGotoUpdate}
            className={classNames({ hidden: pageActive !== 'CREATE' })}
          />
          <Update
            onBack={handleGoToCreate}
            className={classNames({ hidden: pageActive !== 'UPDATE' })}
            project={project}
          />
        </div>
      </div>
    </div>
  );
}

export default Upload;
