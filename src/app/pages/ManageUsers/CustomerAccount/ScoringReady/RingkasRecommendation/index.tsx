import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { ControlledInput } from 'app/components/Input';
import { Controller, useFormContext } from 'react-hook-form';

function RingkasRecommendation() {
  const { control, register, watch } = useFormContext();

  const recommendedValue = watch('recommendedValue');
  return (
    <div className="bg-white rounded-2xl px-8 py-6 mt-6">
      <h2 className="text-[#202A42] text-[18px] font-bold leading-6">
        Ringkas Recommendation
      </h2>
      <Controller
        name="recommendedValue"
        control={control}
        defaultValue={true}
        render={({ field }) => {
          return (
            <RadioGroup
              row
              className="flex"
              name="test-form"
              value={field.value}
              onChange={field.onChange}
              sx={{
                marginTop: '16px',
                '& .MuiTypography-root': {
                  color: '#6B7A99',
                  lineHeight: '20px',
                  fontWeight: 500,
                  fontSize: '16px',
                },
              }}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Recommended"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="Not Recommended"
              />
            </RadioGroup>
          );
        }}
      />
      {recommendedValue === 'true' ? (
        <>
          <p className="text-[#223250] leading-5 font-semibold mt-6">Notes</p>
          <textarea
            {...register('recommendedNote')}
            className="p-6 text-[#223250] font-medium leading-5 resize-none border border-[#D7E2EE] rounded-lg focus:border-[#005FC5] w-full mt-2 h-[112px]"
            placeholder="Input Text Here"
          />
        </>
      ) : (
        <div className="text-[#6B7A99] leading-5 grid grid-cols-2 gap-8 mt-8">
          <div>
            <div className="flex items-center">
              <p className="font-medium w-[60%]">DBR</p>

              <ControlledInput
                control={control}
                name="dbr"
                placeholder="Input Text Here"
                className="w-[40%]"
              />
            </div>
            <div className="flex items-center mt-4">
              <p className="font-medium w-[60%]">
                Suggested Target House Price
              </p>
              <ControlledInput
                control={control}
                name="housePriceSuggestion"
                className="w-[40%]"
                placeholder="Input Text Here"
              />
            </div>
            <div className="flex items-center mt-4">
              <p className="font-medium w-[60%]">Suggested Monthly Payment</p>
              <ControlledInput
                control={control}
                name="monthlyPaymentSuggestion"
                placeholder="Input Text Here"
                className="w-[40%]"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#223250] leading-5 font-semibold shrink-0">
              Notes
            </p>
            <textarea
              {...register('notRecommendedNote')}
              className="p-6 text-[#223250] font-medium leading-5 resize-none border border-[#D7E2EE] rounded-lg focus:border-[#005FC5] w-full mt-2 grow"
              placeholder="Input Text Here"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RingkasRecommendation;
