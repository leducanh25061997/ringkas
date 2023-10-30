import { Button, Step } from '@mui/material';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import { ControlledCityDropdown } from 'app/components/DropdownInput/Cities';
import { ControlledUnitDropdown } from 'app/components/DropdownInput/unit';
import Input from 'app/components/Input';
import { useSafeState } from 'app/hooks/useSafeState';
import { useProductManagementCreateSlice } from 'app/pages/InventoryManagement/Products/CreateProduct/slice';
import { ProductInformation } from 'app/pages/InventoryManagement/Products/CreateProduct/slice/types';
import Notifier from 'app/pages/Notifier';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import React from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ProjectType } from '../../slice/types';
import CreateNewInventoryDialog from './components/CreateNewInventoryDialog';
import InputHousePriceDialog from './components/InputHousePriceDialog';
import ListProject from './ListProject';

interface Props {
  formMethod: UseFormReturn<FieldValues, any>;
  show: boolean;
  setActiveStep: (value: number) => void;
  activeStep: number;
}
function Property({ formMethod, show, activeStep, setActiveStep }: Props) {
  const { control, watch, resetField, setValue } = formMethod;
  const dispatch = useDispatch();
  const { actions } = useProductManagementCreateSlice();
  const { t } = useTranslation();
  const [openHousePrice, setOpenHousePrice] = useSafeState<boolean>(false);
  const [openCreateInventory, setOpenCreateInventory] =
    useSafeState<boolean>(false);
  const city = watch('city');
  const project: ProjectType = watch('project');
  const projectType = watch('projectType');

  const handleInputHousePrice = () => {
    setOpenHousePrice(true);
  };

  const handleCreateInventory = () => {
    setOpenCreateInventory(true);
  };

  const submitInputHousePrice = () => {
    setOpenHousePrice(false);
    setActiveStep(activeStep + 1);
  };
  const submitCreateInventory = (inputData: ProductInformation) => {
    dispatch(
      actions.createProduct(
        {
          projectId: inputData.projectData?.value,
          cluster: inputData.clusterData?.value,
          type: inputData.typeData?.value,
          unit: inputData.unit,
          pricing: {
            housePrice: inputData.pricing?.housePrice
              ? parseInt(
                  inputData.pricing?.housePrice.toString().replaceAll('.', ''),
                )
              : 0,
          },
        },
        value => {
          setValue('propertyId', value.id || 0);
          setValue('product', value);
          setValue('housePrice', inputData.pricing?.housePrice);
          setValue('projectName', inputData.projectData?.label);
          setActiveStep(activeStep + 1);
          setOpenCreateInventory(false);
        },
        (err: any) => {
          Notifier.addNotifyError({
            messageId: 'error.anErrorOccurred',
          });
        },
      ),
    );
  };

  return (
    <form
      className={classNames('w-full flex flex-col', {
        hidden: !show,
      })}
    >
      <div
        className={classNames(
          'mt-6 w-full h-fit py-10 bg-white rounded-2xl text-[#202A42] mx-auto',
          {
            hidden: !show,
          },
        )}
      >
        <div className="flex flex-col w-[40%] mx-auto">
          <p className="font-bold text-[18px] leading-8">
            {t(translations.createCustomer.propertyPreference)}
          </p>
          <p className="text-[14px] leading-8">
            {t(translations.createCustomer.propertyPreferenceDescription)}
          </p>

          <ControlledCityDropdown
            name="city"
            label={t(translations.createCustomer.cityLabel) + '*'}
            placeholder={t(translations.createCustomer.cityLabel)}
            rules={{
              required: t(translations.formValidate.required) as string,
            }}
            className="mt-4 w-full"
            control={control}
            onChange={() => {
              setValue('housePrice', '');
              resetField('project');
              resetField('projectType');
              resetField('unit');
            }}
          />
        </div>
      </div>
      {city && (
        <>
          <div className="rounded-2xl bg-white pt-6 mt-6 mb-6">
            <div className="items-center flex justify-between px-8">
              <p className="text-[#202A42] leading-6 font-bold text-[18px]">
                {t(translations.createCustomer.listProject)}
              </p>
              <div className="flex">
                <Button
                  sx={{
                    padding: '0.5rem 2rem',
                    margin: '1rem',
                    color: '#005FC5',
                    fontSize: '16px',
                    background: '#F6F7FF',
                  }}
                  disabled={!!watch('project')}
                  onClick={handleInputHousePrice}
                >
                  {t(translations.createCustomer.inputHousePrice)}
                </Button>
                <Button
                  sx={{
                    padding: '0.5rem 2rem',
                    my: '1rem',
                    color: 'white',
                    background: '#005FC5',
                    fontSize: '16px',
                  }}
                  disabled={!!watch('project')}
                  onClick={handleCreateInventory}
                >
                  {t(translations.createCustomer.createNewInventory)}
                </Button>
              </div>
              {/* <Controller
                name="housePrice"
                control={control}
                rules={{
                  required: watch('project')
                    ? false
                    : (t(translations.formValidate.required) as string),
                }}
                render={({ field }) => {
                  return (
                    <Input
                      {...field}
                      disabled={!!watch('project')}
                      type="currency"
                      autoComplete="off"
                      placeholder={t(
                        translations.createCustomer.housePriceLabel,
                      )}
                      className="h-[48px] px-5 w-[280px]"
                      maxLength={15}
                      onChange={newValue => {
                        field.onChange(newValue);
                        resetField('projectType');
                        resetField('unit');
                      }}
                    />
                  );
                }}
              /> */}
            </div>
            <ListProject city={city.value} formMethod={formMethod} />
          </div>

          {project && (
            <div className="px-[75px] py-10 grid grid-cols-2 gap-[84px] rounded-2xl bg-white mb-10">
              <ControlledDropdownInput
                options={project.houseTypes.map(item => ({
                  label: item,
                  value: item,
                }))}
                name="projectType"
                label={t(translations.createCustomer.type) + '*'}
                placeholder={t(translations.createCustomer.type)}
                rules={{
                  required: !watch('project')
                    ? false
                    : (t(translations.formValidate.required) as string),
                }}
                className="mt-4 w-full"
                control={control}
                onChange={() => {
                  resetField('unit');
                }}
              />
              <ControlledUnitDropdown
                projectId={project.projectId}
                projectType={projectType?.value}
                name="unit"
                label={t(translations.createCustomer.unit) + '*'}
                placeholder={t(translations.createCustomer.unit)}
                rules={{
                  required: !watch('project')
                    ? false
                    : (t(translations.formValidate.required) as string),
                }}
                className="mt-4 w-full"
                control={control}
              />
            </div>
          )}
        </>
      )}
      <CreateNewInventoryDialog
        open={openCreateInventory}
        setOpen={setOpenCreateInventory}
        onConfirm={submitCreateInventory}
        city={city}
        controlMethod1={control}
      />
      <InputHousePriceDialog
        open={openHousePrice}
        setOpen={setOpenHousePrice}
        onConfirm={submitInputHousePrice}
        control={control}
      />
    </form>
  );
}

export default Property;
