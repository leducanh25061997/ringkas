import deleteIcon from 'assets/icons/delete-media.svg';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import moment from 'moment';
import React from 'react';
import { UseFieldArrayRemove, useFormContext } from 'react-hook-form';

interface Props {
  index: number;
  disabled?: boolean;
  remove: UseFieldArrayRemove;
}

const PromotionItem = ({ index, disabled, remove }: Props) => {
  const { control, watch, trigger } = useFormContext();

  const promotionName = watch(`promotions.${index}.promotionName`);
  const endDate = watch(`promotions.${index}.endDate`);
  const startDate = watch(`promotions.${index}.startDate`);

  React.useEffect(() => {
    trigger(`promotions.${index}.promotionName`);
  }, [startDate, promotionName, endDate]);

  React.useEffect(() => {
    trigger(`promotions.${index}.startDate`);
  }, [startDate, promotionName, endDate]);

  React.useEffect(() => {
    trigger(`promotions.${index}.endDate`);
  }, [startDate, promotionName, endDate]);

  return (
    <div key={index}>
      {!disabled && (
        <>
          {index > 0 && (
            <div className="flex justify-end mb-2 cursor-pointer">
              <img
                onClick={() => remove(index)}
                src={deleteIcon}
                width={24}
                height={24}
                alt="bin"
              />
            </div>
          )}
        </>
      )}

      <ControlledTextField
        className="mb-4"
        label="Promo Name"
        name={`promotions.${index}.promotionName`}
        control={control}
        disabled={disabled}
        rules={
          startDate || endDate
            ? {
                required: 'Please fill this field',
              }
            : {
                required: false,
              }
        }
      />

      <div className="flex justify-between">
        <ControlledDatePicker
          name={`promotions.${index}.startDate`}
          label="Promo Start Date	"
          control={control}
          className="mb-4 mr-4 flex-1"
          disabled={disabled}
          // @ts-ignore
          rules={
            promotionName || endDate
              ? {
                  required: 'Please fill this field',
                  validate: value => {
                    let isValidDate;
                    if (value === undefined || value == null) return true;
                    if (typeof value === 'number') {
                      isValidDate = new Date(value);
                    } else {
                      isValidDate =
                        value instanceof Date && !isNaN(value.getTime());
                    }
                    if (
                      !isValidDate ||
                      moment(value).isAfter(
                        watch(`promotions.${index}.endDate`),
                        'date',
                      )
                    )
                      return 'Invalid Date';
                    return true;
                  },
                }
              : {
                  validate: value => {
                    let isValidDate;
                    if (value === undefined || value == null) return true;
                    if (typeof value === 'number') {
                      isValidDate = new Date(value);
                    } else {
                      isValidDate =
                        value instanceof Date && !isNaN(value.getTime());
                    }
                    if (
                      !isValidDate ||
                      moment(value).isAfter(
                        watch(`promotions.${index}.endDate`),
                        'date',
                      )
                    )
                      return 'Invalid Date';
                    return true;
                  },
                }
          }
        />
        <ControlledDatePicker
          name={`promotions.${index}.endDate`}
          label="Promo End Date	"
          control={control}
          className="mb-4 flex-1"
          disabled={disabled}
          // @ts-ignore
          rules={
            startDate || promotionName
              ? {
                  required: 'Please fill this field',
                  validate: value => {
                    let isValidDate;
                    if (value === undefined || value == null) return true;
                    if (typeof value === 'number') {
                      isValidDate = new Date(value);
                    } else {
                      isValidDate =
                        value instanceof Date && !isNaN(value.getTime());
                    }
                    if (
                      !isValidDate ||
                      moment(value).isBefore(
                        watch(`promotions.${index}.startDate`),
                        'date',
                      )
                    )
                      return 'Invalid Date';
                    return true;
                  },
                }
              : {
                  validate: value => {
                    let isValidDate;
                    if (value === undefined || value == null) return true;
                    if (typeof value === 'number') {
                      isValidDate = new Date(value);
                    } else {
                      isValidDate =
                        value instanceof Date && !isNaN(value.getTime());
                    }
                    if (
                      !isValidDate ||
                      moment(value).isBefore(
                        watch(`promotions.${index}.startDate`),
                        'date',
                      )
                    )
                      return 'Invalid Date';
                    return true;
                  },
                }
          }
        />
      </div>
    </div>
  );
};

export default PromotionItem;
