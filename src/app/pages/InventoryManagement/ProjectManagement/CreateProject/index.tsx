import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { method } from 'lodash';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { ProjectInformationParams } from 'types/ProjectManagement';
import { numberRegex } from 'utils/helpers/regex';

import { Footer } from './components/Footer';
import { ProjectInputForm } from './components/ProjectInputForm';
import { useCreateProjectSlice } from './slice';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f0f4f9;
  & .MuiInputLabel-root {
    color: #919eab;
  }
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  padding: 24px 24px 0px 24px;
  .parent-label {
    color: #005fc5;
  }
`;

interface DataType {
  data: string;
  isEdit: boolean;
}

export default function DeveloperAccountCreate() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useCreateProjectSlice();
  const [stepProject, setStepProject] = useState<number>(0);
  const [formData, setFormData] = useState<ProjectInformationParams>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [projectAccess, setProjectAssess] = useState<string[]>([]);
  const [houseType, setHouseType] = useState<DataType[]>([]);
  const [cluster, setCluster] = useState<DataType[]>([]);
  const links = React.useMemo(
    () => [
      {
        title: t(translations.sidebar.inventoryManagement),
        path: path.inventoryManagement,
      },
      {
        title: t(translations.sidebar.manageProject),
        path: path.project,
      },
      {
        title: t(translations.projectManagement.createNewProject),
      },
    ],
    [t],
  );

  const validateForm = yup.object().shape({
    name: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    location: yup
      .object()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
    cerType: yup.string(),
    houseType: yup
      .string()
      .required(t(translations.createProductError.pleaseEnterRequiredFields)),
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
    projectAccessibility: yup.string(),
    buildYear: yup.lazy(value => (value === '' ? yup.string() : yup.number())),
    completionYear: yup.lazy(value =>
      value === ''
        ? yup.string()
        : yup
            .number()
            .typeError(
              t(translations.createProductError.pleaseEnterRequiredFields),
            )
            .when('buildYear', (st: any) => {
              if (st)
                return yup
                  .number()
                  .min(
                    st || 0,
                    'Completion year must be greater than or equal to build year',
                  );
              else return yup.number();
            }),
    ),
  });

  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  const onSubmit = (inputData: any) => {
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
          item.data && formData.houseTypes.push(item.data);
        });
      }
      formData.clusters = formData.cluster ? [formData.cluster] : [];
      if (cluster.length > 0) {
        cluster.map(item => {
          item.data && formData.clusters.push(item.data);
        });
      }
      formData.certificateTypes = certificateTypes;
      dispatch(
        actions.createProject({
          formData,
          navigate,
        }),
      );
    }
  }, [formData]);

  const handleBack = () => {
    if (stepProject === 0) {
      navigate(path.projectList);
    } else {
      setStepProject(stepProject - 1);
    }
  };

  React.useEffect(() => {
    dispatch(actions.fetchProvinces());
  }, []);

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ProjectInputForm
            stepProject={stepProject}
            setIsDisabled={setIsDisabled}
            setProjectAssess={setProjectAssess}
            projectAccess={projectAccess}
            setHouseType={setHouseType}
            houseType={houseType}
            setCluster={setCluster}
            cluster={cluster}
          />
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleBack={handleBack}
            stepProject={stepProject}
            isDisabled={
              isDisabled || Object.keys(methods.formState.errors).length !== 0
            }
          />
        </form>
      </FormProvider>
    </RootContainer>
  );
}
