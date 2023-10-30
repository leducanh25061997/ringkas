import Button from 'app/components/common/Button';
import TextField from 'app/components/CustomTextField';
import React from 'react';
import InfoItem from './Components/InfoItem';
import ItemRow from './Components/ItemRow';

function OtherHistory() {
  return (
    <InfoItem label="Other History" className="mt-4">
      <ItemRow label="Latest Update Date" value="01/04/2022" />
      <p className="font-bold leading-[22px] mr-4 mb-6">Other History-1</p>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <TextField className="w-full" label="Subject" />
        <TextField className="w-full" label="Transaction Value" />
      </div>
      <TextField className="w-full" label="Notes" />
      <div className="border border-dashed border-[#009CE0] rounded-2xl flex items-center justify-center h-[56px] text-[#005FC5] font-semibold cursor-pointer mt-4 mb-4">
        + <span className="font-semibold underline">Add more</span>
      </div>
      <div className="mx-[-32px] border-t border-t-[#D7E2EE] h-[80px] flex items-center">
        <Button color="primary" className="mr-4 ml-auto" disabled>
          Update
        </Button>
      </div>
    </InfoItem>
  );
}

export default OtherHistory;
