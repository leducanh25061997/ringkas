import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Key, KV, Row, SubValue, Value } from 'app/components/DataDisplay';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import CustomizedSwitches from 'app/components/AntSwitch';
import DialogAction from 'app/components/DialogAction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { ChangeProjectStatus } from 'types/ProjectManagement';

import { selectProjectInformation } from '../../slice/selectors';
import { useProjectInformationSlice } from '../../slice';

interface Props {}

const ProjectInfo = (props: Props) => {
  const { t } = useTranslation();
  const [checked, setChecked] = React.useState(true);
  const { projectInformation } = useSelector(selectProjectInformation);
  const { actions } = useProjectInformationSlice();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  React.useEffect(() => {
    if (projectInformation) {
      if (projectInformation?.status === 'INACTIVE') {
        setChecked(false);
      } else {
        setChecked(true);
      }
    }
  }, [projectInformation]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenDialog(true);
    // setChecked(event.target.checked);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeStatus = () => {
    const projectId = id;
    const newParams: ChangeProjectStatus = {
      projectId,
      status: checked ? 'INACTIVE' : 'ACTIVE',
    };
    dispatch(
      actions.updateProjectStatus(
        newParams,
        (changeStatus?: ChangeProjectStatus) => {
          setOpenDialog(false);
          dispatch(actions.fetchProjectDetail(id));
          setChecked(!checked);
        },
      ),
    );
  };

  return (
    <Grid container sx={{ minHeight: '600px' }}>
      <Grid item md={12}>
        <KV>
          <Row>
            <Key>{t(translations.projectInformation.projectCode)}</Key>
            <Value>{projectInformation?.code}</Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.projectName)}</Key>
            <Value>{projectInformation?.name}</Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.projectAddress)}</Key>
            <Value>{}</Value>
          </Row>
          <Row>
            <Key>{t(translations.common.province)}</Key>
            <Value>{projectInformation?.provinceName}</Value>
          </Row>
          <Row>
            <Key>{t(translations.common.city)}</Key>
            <Value>{projectInformation?.cityName}</Value>
          </Row>
          <Row>
            <Key>{t(translations.common.fullAddress)}</Key>
            <Value>{projectInformation?.fullAddress}</Value>
          </Row>
          <Row>
            <Key>
              {t(translations.projectInformation.projectLocationPinpoints)}
            </Key>
            <Value>{}</Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.longitude)}</Key>
            <Value>{projectInformation?.longitude}</Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.latitude)}</Key>
            <Value>{projectInformation?.latitude}</Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.projectAccessibility)}</Key>
            <Value>{}</Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.tolAccess)}</Key>
            {projectInformation?.accessibilities &&
              projectInformation?.accessibilities.length > 0 && (
                <SubValue>
                  {projectInformation?.accessibilities.map(item => (
                    <Typography>{item}</Typography>
                  ))}
                </SubValue>
              )}
          </Row>
          {/* <Row>
            <Key>{t(translations.projectInformation.mall)}</Key>
            <Value>{}</Value>
          </Row> */}
          <Row>
            <Key>{t(translations.common.createdDate)}</Key>
            <Value>
              {moment(projectInformation?.createdDate).format('DD/MM/YYYY')}
            </Value>
          </Row>
          <Row>
            <Key>{t(translations.projectInformation.projectStatus)}</Key>
            <Value>
              <Box sx={{ display: 'flex' }}>
                <CustomizedSwitches checked={checked} onChange={handleChange} />
                <Box ml={1} sx={{ fontWeight: '600' }}>
                  {checked ? 'Active' : 'Inactive'}
                </Box>
              </Box>
            </Value>
          </Row>
        </KV>
      </Grid>
      <DialogAction
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        title={checked ? 'Inactive Account' : 'Active Account'}
        description={
          checked
            ? 'Are you sure you want to inactive this account? The account will no longer be able to use our services.'
            : 'Are you sure you want to active this account?'
        }
        onConfirm={handleChangeStatus}
        titleButtonConfirm={'Update'}
        maxWidth={'xs'}
      />
    </Grid>
  );
};

export default ProjectInfo;
