import { useParams } from 'react-router';
import CustomerData from './CustomerData';
import PropertyDetails from './PropertyDetails';
import CustomerSummary from 'app/pages/ManageUsers/CustomerAccount/CustomerInformation/CustomerDetails/CustomerSummary';
import KprApplication from './KprApplication';
import CustomerDocument from './CustomerDocument';
import KprPreference from './KprPreference';
import DeveloperDocuments from './DeveloperDocuments';

import { Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useKprSlice } from 'app/pages/ManageUsers/CustomerAccount/KprRegister/slice';
import { selectKprReady } from 'app/pages/ManageUsers/CustomerAccount/KprRegister/slice/selectors';
import { useBankTaskSlice } from '../Task/slice';

const KprDetails = () => {
  const params = useParams();
  const { id } = params;
  const kprActions = useKprSlice().actions;
  const { kpr } = useSelector(selectKprReady);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    const params = {
      id,
      categories: 'KPR',
      page: 0,
      size: 9999999,
    };
    // @ts-ignore
    dispatch(kprActions.getKpr(params));
  }, [id]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <CustomerData />
      </Grid>
      <Grid item xs={6}>
        <PropertyDetails />
      </Grid>
      <Grid item xs={6}>
        <KprApplication kpr={kpr} />
      </Grid>
      <Grid item xs={6}>
        <CustomerDocument />
      </Grid>
      <Grid item xs={6}>
        <KprPreference />
      </Grid>
      <Grid item xs={6}>
        <DeveloperDocuments />
      </Grid>
      <Grid item xs={12}>
        <CustomerSummary />
      </Grid>
    </Grid>
  );
};

export default KprDetails;
