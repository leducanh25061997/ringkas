import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import path from 'app/routes/path';
import { Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import backIcon from 'assets/icons/back-blue.svg';

import { useProjectInformationSlice } from './slice';
import { selectProjectInformation } from './slice/selectors';
import { ProjectInputForm } from './components/ProjectInputForm.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import Header from './components/Header';

const ProjectInformation = () => {
  const { t } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const dispatch = useDispatch();
  const { actions } = useProjectInformationSlice();
  const { projectInformation } = useSelector(selectProjectInformation);
  const [houseType, setHouseType] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchProjectDetail(id));
    dispatch(actions.fetchProjectTaskList(id));
  }, []);

  const validateForm = yup.object().shape({});

  const methods = useForm<any>({
    resolver: yupResolver(validateForm),
  });

  const onSubmit = () => {};

  const handleClickBack = () => {
    navigate(path.projectList);
  };

  return (
    <Grid
      container
      sx={{ background: '#f0f4f9' }}
      direction="row"
      justifyContent="flex-end"
    >
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
        <Header title={projectInformation?.name} />
      </Grid>
      <Grid item md={12} mt={2}>
        <FormProvider {...methods}>
          <form
            style={{ width: '100%' }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <ProjectInputForm
              houseType={houseType}
              setHouseType={setHouseType}
            />
          </form>
        </FormProvider>
      </Grid>
    </Grid>
  );
};

export default ProjectInformation;
