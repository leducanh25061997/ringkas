import React, { useEffect } from 'react';
import classNames from 'classnames';
import ArrowRight from 'assets/icons/arrow-right.svg';
import Spinner from 'assets/loader/spinner.svg';
import { Checkbox, FormControlLabel, styled } from '@mui/material';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';
import { useSafeState } from 'app/hooks/useSafeState';

export const RootCheckbox = styled('div')({
  '& .MuiCheckbox-root': {
    color: '#C6D7E0',
  },
});

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: Developer[];
  onChange?: (newValue: DeveloperAccountList) => void;
  type?: string;
  data?: DeveloperAccountList[];
  isLoading?: boolean;
}

interface Developer {
  name: string;
  id: string;
}

const DropdownData = ({
  onChange,
  value,
  error,
  errorText,
  data,
  isLoading,
}: Props) => {
  const [checkData, setCheckData] = useSafeState<string[]>([]);

  useEffect(() => {
    const newData: string[] = [];
    value &&
      value.map(item => {
        newData.push(item.id);
      });
    setCheckData(newData);
  }, [value]);
  return (
    <div className={classNames('bg-white text-[14px] z-10 pt-4')}>
      <div className="w-full h-[260px] overflow-y-scroll scrollbar pl-4">
        {isLoading ? (
          <div className="h-[260px] w-full items-center justify-center">
            <img src={Spinner} alt="Loading" width={80} height={80} />
          </div>
        ) : (
          <>
            {data &&
              data.length > 0 &&
              data.map(
                (item: DeveloperAccountList, index) =>
                  item?.kyc?.fullName && (
                    <FormControlLabel
                      sx={{ width: '100%', mr: 0 }}
                      key={index}
                      control={
                        <RootCheckbox>
                          <Checkbox
                            onChange={e => {
                              onChange && onChange(item);
                            }}
                            checked={checkData.includes(item?.userUuid || '')}
                          />
                        </RootCheckbox>
                      }
                      label={item?.kyc?.fullName}
                    />
                  ),
              )}
            {data && data.length === 0 && (
              <div className="text-center mt-[100px] text-[16px] text-[#9098a7]">
                No data
              </div>
            )}
          </>
        )}
      </div>
      {error ? (
        <span className="text-[14px] leading-[18px] pl-4 mt-5 text-[#FF0000]">
          {errorText}
        </span>
      ) : null}
    </div>
  );
};

export default DropdownData;
