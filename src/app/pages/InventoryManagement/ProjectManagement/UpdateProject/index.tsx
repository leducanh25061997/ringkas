import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectInformationParams } from 'types/ProjectManagement';
import { numberRegex } from 'utils/helpers/regex';

import { Footer } from './components/Footer';
import { ProjectInputForm } from './components/ProjectInputForm';
import { useUpdateProjectSlice } from './slice';
import { selectUpdateProject } from './slice/selectors';
import { Grid } from '@mui/material';
import backIcon from 'assets/icons/back-blue.svg';
import Header from './components/Header';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
  & .MuiInputLabel-root {
    color: #919eab;
  }
`;

interface DataType {
  data: string;
  isEdit: boolean;
}

export default function DeveloperAccountUpdate() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { projectInformation, isLoading } = useSelector(selectUpdateProject);
  const { id } = params;
  const { actions } = useUpdateProjectSlice();
  const [formData, setFormData] = useState<ProjectInformationParams>();
  const [projectAccess, setProjectAssess] = useState<string[]>([]);
  const [projectFacility, setProjectFacility] = useState<string[]>([]);
  const [valueTab, setValueTab] = React.useState<number>(0);
  const [houseType, setHouseType] = useState<DataType[]>([]);
  const [cluster, setCluster] = useState<DataType[]>([]);

  const validateForm = yup.object().shape({
    name: yup.string().required(t(translations.required.projectNameRequired)),
    provinceName: yup
      .string()
      .required(t(translations.required.provinceNameRequired)),
    cityName: yup.string().required(t(translations.required.cityName)),
    longitude: yup.lazy(value =>
      value === '' || value === '-'
        ? yup.string()
        : yup.number().min(-180, 'Min is -180').max(180, 'Max is 180'),
    ),
    latitude: yup.lazy(value =>
      value === '' || value === '-'
        ? yup.string()
        : yup.number().min(-85, 'Min is -85').max(85, 'Max is 85'),
    ),
    buildYear: yup.lazy(value =>
      value === ''
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
        : yup
            .number()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            ),
    ),
    completionYear: yup.lazy(value =>
      value === ''
        ? yup
            .string()
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
        : yup
            .number()
            .typeError(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .when('buildYear', (st: any) => {
              if (st) return yup.number().min(st || 0);
              else
                return yup
                  .number()
                  .required(
                    t(
                      translations.createProductError.pleaseEnterRequiredFields,
                    ),
                  );
            })
            .required(
              t(translations.createProductError.pleaseEnterRequiredFields),
            ),
    ),
    cerType: yup.string().required(t(translations.required.cerTypeRequired)),
  });
  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  const handleBack = () => {
    navigate(path.projectList);
  };

  React.useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchProvinces());
    dispatch(actions.fetchProjectDetail(id));
    dispatch(actions.fetchProjectTaskList(id));
  }, []);

  React.useEffect(() => {
    if (projectInformation) {
      setProjectAssess(projectInformation?.accessibilities);
      setProjectFacility(projectInformation?.facilities);
    }
  }, [projectInformation]);

  const onSubmit = (inputData: ProjectInformationParams) => {
    setFormData(inputData);
  };

  useEffect(() => {
    if (formData) {
      const certificateTypes: string[] = [];
      if (formData.SHM) {
        certificateTypes.push('SHM');
      }
      if (formData.AJB) {
        certificateTypes.push('AJB');
      }
      if (formData.HGB) {
        certificateTypes.push('HGB');
      }
      if (formData.SHSRS) {
        certificateTypes.push('SHSRS');
      }
      if (formData.GIRIK) {
        certificateTypes.push('GIRIK');
      }
      if (formData.OTHER) {
        certificateTypes.push('OTHER');
      }
      formData.houseTypes = formData.houseType ? [formData.houseType] : [];
      if (houseType.length > 0) {
        houseType.map(item => {
          formData.houseTypes.push(item.data);
        });
      }
      formData.clusters = formData.cluster ? [formData.cluster] : [];
      if (cluster.length > 0) {
        cluster.map(item => {
          formData.clusters.push(item.data);
        });
      }
      formData.certificateTypes = certificateTypes;
      formData.id = id;
      dispatch(
        actions.updateProject({
          formData,
          navigate,
          id,
        }),
      );
    }
  }, [formData]);

  const handleClickBack = () => {
    navigate(`${path.project}/${id}`);
  };

  return (
    <RootContainer>
      <Grid
        className="mb-6 flex items-center"
        container
        item
        md={12}
        sx={{ padding: '20px 31px 0 31px' }}
      >
        <div
          className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
          onClick={handleClickBack}
        >
          <img src={backIcon} width={16} height={16} className="mr-2" alt="" />
          <p className="font-semibold">{t(translations.common.back)}</p>
        </div>
        <Header />
      </Grid>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ProjectInputForm
            setHouseType={setHouseType}
            houseType={houseType}
            setCluster={setCluster}
            cluster={cluster}
          />
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleBack={handleBack}
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </RootContainer>
  );
}
