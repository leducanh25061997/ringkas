import React from 'react';
import classNames from 'classnames';
import ArrowRight from 'assets/icons/arrow-right.svg';
import Spinner from 'assets/loader/spinner.svg';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (newValue: string) => void;
  type?: string;
  data?: string[];
  isLoading?: boolean;
}

const DropdownData = ({
  onChange,
  value,
  error,
  errorText,
  data,
  isLoading,
}: Props) => {
  return (
    <div className={classNames('flex flex-col bg-white text-[14px] z-10 pt-4')}>
      <div className="w-full h-[260px] overflow-y-auto scrollbar">
        {isLoading ? (
          <div className="h-[260px] w-full flex items-center justify-center">
            <img src={Spinner} alt="Loading" width={80} height={80} />
          </div>
        ) : (
          <>
            {data &&
              data.length > 0 &&
              data.map((item: string, index) => (
                <div
                  key={index}
                  className={classNames(
                    'min-h-[48px] border-b-2 border-b-[#F5F6F7] hover:bg-stone-100 px-4 flex items-center cursor-pointer shrink-0 py-2 justify-between',
                    {
                      'bg-stone-100': value === item,
                    },
                  )}
                  onClick={() => {
                    onChange && onChange(item);
                  }}
                >
                  <div className="text-[#7D8FB3] text-[16px] leading-[26px]">
                    {item}
                  </div>
                  <div>
                    <img
                      src={ArrowRight}
                      height={24}
                      width={24}
                      alt="arrow-right"
                    />
                  </div>
                </div>
              ))}
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
