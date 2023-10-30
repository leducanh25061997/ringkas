import { Box, Button, Grid, Typography } from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EditIcon from 'assets/icons/edit-icon.svg';
import LocationIcon from 'assets/icons/location.svg';

import { selectProjectInformation } from '../../slice/selectors';
import { FieldInput } from '../../slice/types';
import { useNavigate, useParams } from 'react-router';
import path from 'app/routes/path';

export const RootCheckbox = styled('div')({
  '& .MuiCheckbox-root': {
    color: '#C6D7E0',
  },
});

const Title = styled('div')({
  color: '#6B7A99',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '30px',
});

const Value = styled('div')({
  fontSize: '16px',
  color: '#202A42',
  lineHeight: '30px',
  fontWeight: 500,
});

const Location = styled('div')({
  fontSize: '16px',
  color: '#005FC5',
  lineHeight: '30px',
  textDecoration: 'underline',
  fontWeight: 600,
});

interface Props {
  houseType: string[];
}

export const ProjectInformation = memo((props: Props) => {
  const { houseType } = props;
  const { projectInformation } = useSelector(selectProjectInformation);
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const changeText = (value: string) => {
    switch (value) {
      case 'SHM':
        return FieldInput['SHM'];
      case 'AJB':
        return FieldInput['AJB'];
      case 'HGB':
        return FieldInput['HGB'];
      case 'SHSRS':
        return FieldInput['SHSRS'];
      case 'GIRIK':
        return FieldInput['GIRIK'];
      case 'OTHER':
        return FieldInput['OTHER'];
      default:
        return '-';
    }
  };

  const updateProject = () => {
    navigate(`${path.project}/update/${id}`);
  };

  return (
    <Box sx={{ mt: 4, mb: 4, width: '100%' }}>
      <div className="flex">
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '20px',
            color: '#223250',
            mr: '1rem',
          }}
        >
          {t(translations.projectManagement.projectInfo)}
        </Typography>
        <img src={EditIcon} alt="edit icon" onClick={updateProject} />
      </div>
      <Typography
        className="py-6"
        sx={{ fontWeight: 'bold', fontSize: '18px', color: '#223250' }}
      >
        {projectInformation?.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <div>
            <Title>{t(translations.common.provinceAndCity)}</Title>
            <Value>
              {`${projectInformation?.provinceName}/${projectInformation?.cityName}`}
            </Value>
          </div>
        </Grid>
        <Grid item md={4}>
          <div>
            <Title>{t(translations.common.fullAddress)}</Title>
            <Value>{projectInformation?.fullAddress || '-'}</Value>
          </div>
        </Grid>
        <Grid item md={4}>
          <div>
            <Title>{t(translations.common.location)}</Title>
            {projectInformation?.longitude ? (
              <div className="flex">
                <img src={LocationIcon} alt="location" />
                <Location>{`${projectInformation?.longitude}, ${projectInformation?.latitude}`}</Location>
              </div>
            ) : (
              '-'
            )}
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={4} mt={2}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Title>{t(translations.projectManagement.yearBuild)}</Title>
              <Value>{projectInformation?.buildYear}</Value>
            </Grid>
            <Grid item md={8}>
              <Title>{t(translations.projectManagement.yearCompletion)}</Title>
              <Value>{projectInformation?.buildYear}</Value>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} mt={2}>
          <Title>
            {t(translations.projectManagement.projectAccessibility)}
          </Title>
          {projectInformation?.accessibilities &&
          projectInformation?.accessibilities.length > 0
            ? projectInformation?.accessibilities[0]
                .split(/\r?\n/)
                .map(item => <Value>{`• ${item}`}</Value>)
            : '-'}
        </Grid>
        <Grid item md={4} mt={2}>
          <Title>{t(translations.common.cluster)}</Title>
          {projectInformation?.clusters &&
          projectInformation?.clusters.length > 0
            ? projectInformation?.clusters.map((item, index) => (
                <Value>{`${index + 1}. ${item}`}</Value>
              ))
            : '-'}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={4} mt={2}>
          <Title>{t(translations.projectManagement.houseType)}</Title>
          {projectInformation?.houseTypes &&
          projectInformation?.houseTypes.length > 0
            ? projectInformation?.houseTypes.map((item, index) => (
                <Value>{`${index + 1}. ${item}`}</Value>
              ))
            : '-'}
        </Grid>
        <Grid item md={4} mt={2}>
          <Title>{t(translations.projectManagement.cerType)}</Title>
          {projectInformation?.certificateTypes &&
          projectInformation?.certificateTypes.length > 0
            ? projectInformation?.certificateTypes.map(
                (item: string, index) => (
                  <Value>{`${index + 1}. ${changeText(item)}`}</Value>
                ),
              )
            : '-'}
        </Grid>
        <Grid item md={4} mt={2}>
          <Title>{t(translations.common.projectFacility)}</Title>
          {projectInformation?.facilities &&
          projectInformation?.facilities.length > 0
            ? projectInformation?.facilities[0]
                .split(/\r?\n/)
                .map(item => <Value>{`• ${item}`}</Value>)
            : '-'}
        </Grid>
      </Grid>
    </Box>
  );
});
