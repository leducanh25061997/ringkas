import * as React from 'react';
import { useState } from 'react';
import { Dialog } from '@mui/material';
import ApprovedFrom from './ApprovedFrom';
import RejectedForm from './RejectedForm';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Props {
  index: number;
  item: any;
}

const listValue = ['Select options', 'Approved', 'Rejected'];

const BankTaskItem = ({ index, item }: Props) => {
  const [selectStatus, setSelectStatus] = useState<string | undefined>();
  const [value, setValue] = React.useState<string>('Select options');

  const handleChange = (event: SelectChangeEvent) => {
    const { value: newValue } = event.target;
    setValue(newValue);
    handleValue(newValue);
  };

  const handleValue = (newValue: string) => {
    if (newValue === 'Approved') {
      setSelectStatus('Approved');
    }
    if (newValue === 'Rejected') {
      setSelectStatus('Rejected');
    }
  };

  const handleResetSelectStatus = React.useCallback(() => {
    setValue('Select options');
    setSelectStatus(undefined);
  }, []);

  return (
    <div className="flex items-center justify-between px-2 py-6">
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium flex-1 max-w-[150px]">
        {item.bankPic}
      </p>
      <div className="flex items-center flex-1 max-w-[785px]">
        <FormControl sx={{ m: 1, width: '100%' }}>
          <Select value={value} onChange={handleChange} displayEmpty>
            {listValue.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <p className="text-[#223250] text-[16px] leading-[22px] font-bold flex-1 max-w-[150px]">
        00:00
      </p>
      <Dialog
        open={selectStatus === 'Approved'}
        maxWidth="xl"
        onClose={handleResetSelectStatus}
        scroll="body"
      >
        <ApprovedFrom onClose={handleResetSelectStatus} />
      </Dialog>
      <Dialog
        open={selectStatus === 'Rejected'}
        maxWidth="xl"
        onClose={handleResetSelectStatus}
        scroll="body"
      >
        <RejectedForm onClose={handleResetSelectStatus} />
      </Dialog>
    </div>
  );
};

export default React.memo(BankTaskItem);
