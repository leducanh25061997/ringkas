import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledTextarea } from 'app/components/TextArea';
import { ControlledProjectsDropdown } from 'app/components/DropdownInput/Projects';
import { ControlledClusterDropdown } from 'app/components/DropdownInput/Cluster';
import { ControlledHouseTypeDropdown } from 'app/components/DropdownInput/HouseType';
import { ControllerUploadImageV2 } from 'app/components/UploadImageV2';
import { ControllerUploadVideoV2 } from '../../../../../../components/UploadVideoV2';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  typeAction?: string;
  projectId?: number;
}

const FormLeft = ({ typeAction, projectId }: Props) => {
  const { control } = useFormContext();
  const { t } = useTranslation();

  return (
    <form className="w-1/2">
      <div className="mr-[56px]">
        <ControlledProjectsDropdown
          className="mb-4"
          label={`${t(translations.projectManagement.projectName)}`}
          name="projectName"
          control={control}
          rules={{
            required: t(translations.required.fillThisField) as string,
          }}
          required
          disabled={typeAction === 'EDIT'}
        />
        <ControlledClusterDropdown
          className="mb-4"
          label={`${t(translations.productInformation.cluster)}`}
          placeholder={`${t(translations.common.cluster)}`}
          name="cluster"
          control={control}
          projectId={projectId}
        />
        <ControlledHouseTypeDropdown
          className="mb-4"
          label={`${t(translations.common.type)}`}
          placeholder={`${t(translations.common.type)}`}
          name="type"
          control={control}
          rules={{
            required: t(translations.required.fillThisField) as string,
          }}
          required
          projectId={projectId}
        />
        <ControlledTextField
          className="mb-4"
          label={`${t(translations.common.unit)}`}
          name="unit"
          control={control}
          rules={{
            required: t(translations.required.fillThisField) as string,
          }}
          required
          disabled={typeAction === 'VIEW'}
        />
        <ControlledTextField
          className="mb-4"
          label={`${t(translations.productInformation.lotOptional)}`}
          name="lot"
          control={control}
          disabled={typeAction === 'VIEW'}
        />
        <ControllerUploadImageV2
          name="images"
          control={control}
          disabled={typeAction === 'VIEW'}
        />
        <ControllerUploadVideoV2
          name="videos"
          control={control}
          disabled={typeAction === 'VIEW'}
        />
        <div className="flex justify-between">
          <ControlledTextField
            className="my-4 mr-4 flex-1"
            label={`${t(translations.productInformation.landArea)}`}
            name="landArea"
            control={control}
            rules={{
              required: t(translations.required.fillThisField) as string,
            }}
            required
            endAdornment="m2"
            type="float"
            disabled={typeAction === 'VIEW'}
          />
          <ControlledTextField
            className="my-4 flex-1"
            label={`${t(translations.productInformation.buildingArea)}`}
            name="buildingArea"
            control={control}
            rules={{
              required: t(translations.required.fillThisField) as string,
            }}
            required
            endAdornment="m2"
            type="float"
            disabled={typeAction === 'VIEW'}
          />
        </div>
        <div className="flex items-center justify-between">
          <ControlledTextField
            className="mb-4 mr-4 flex-1"
            label={`${t(
              translations.productInformation.numBerOfFloorIsOptional,
            )}`}
            name="numberOfFloor"
            control={control}
            type="int"
            disabled={typeAction === 'VIEW'}
          />
          <ControlledTextField
            className="mb-4 flex-1"
            label={`${t(
              translations.productInformation.numberOfRoomsIsOptional,
            )}`}
            name="numberOfRoom"
            control={control}
            type="int"
            disabled={typeAction === 'VIEW'}
          />
        </div>
        <ControlledTextField
          className="mb-4"
          label={`${t(
            translations.productInformation.numberOfBathroomIsOptional,
          )}`}
          name="numberOfBathroom"
          control={control}
          type="int"
          disabled={typeAction === 'VIEW'}
        />
        <ControlledTextarea
          className="field"
          label={`${t(translations.productInformation.addOtherFacility)}`}
          name="others"
          control={control}
          disabled={typeAction === 'VIEW'}
        />
      </div>
    </form>
  );
};

export default React.memo(FormLeft);
