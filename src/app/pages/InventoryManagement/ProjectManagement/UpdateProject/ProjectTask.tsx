import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectInformationParams, ProjectTask } from 'types/ProjectManagement';
import { numberRegex } from 'utils/helpers/regex';

import { Footer } from './components/Footer';
import { useUpdateProjectSlice } from './slice';
import { selectUpdateProject } from './slice/selectors';
import { Box, Grid } from '@mui/material';
import backIcon from 'assets/icons/back-blue.svg';
import Header from './components/Header';
import { WorkflowCustomization } from './components/WorkflowCustomization';
import { StatusToDo } from '../CreateProject/slice/types';

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

export default function ProjectTaskList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { isLoading } = useSelector(selectUpdateProject);
  const { id } = params;
  const { actions } = useUpdateProjectSlice();
  const [items, setItems] = useState<ProjectTask[]>([]);
  const validateForm = yup.object().shape({});
  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  React.useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchProjectTaskList(id));
  }, []);

  const onSubmit = (inputData: ProjectInformationParams) => {
    const body: ProjectTask[] = [];
    items.map(item => {
      const newItem = { ...item };
      if (!item?.document?.url) {
        delete newItem.document;
      }
      if (item.isEdit === StatusToDo.TODO) {
        delete newItem.id;
        delete newItem.isEdit;
        newItem.id = id;
        newItem.projectId = id;
        dispatch(
          actions.createProjectTask(newItem, (err?: any) => {
            if (err?.id) {
              newItem.id = err?.id;
            }
          }),
        );
      } else {
        body.push(newItem);
      }
    });
    dispatch(
      actions.updateMultiProjectTask({
        formData: body,
        navigate,
        id,
      }),
    );
  };

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
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.paper',
              display: 'flex',
              margin: '0px 24px 24px 24px',
              borderRadius: '12px',
              mt: 2,
            }}
          >
            <WorkflowCustomization setItems={setItems} items={items} />
          </Box>
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleBack={handleClickBack}
            isLoading={isLoading}
            isDisabled={Object.keys(methods.formState.errors).length !== 0}
          />
        </form>
      </FormProvider>
    </RootContainer>
  );
}
