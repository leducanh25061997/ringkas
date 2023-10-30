import Spinner from 'app/components/Spinner';
import path from 'app/routes/path';
import backIcon from 'assets/icons/back-blue.svg';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { showError, showSuccess } from 'utils/commonFunction';
import { useSlikDetailsSlice } from '../CustomerInformation/SlikDetails/slice';
import Header from './Header';
import HousePrice from './HousePrice';
import RingkasAssessment from './RingkasAssessment';
import RingkasRecommendation from './RingkasRecommendation';
import { useScoringReadySlice } from './slice';
import { selectScoringReady } from './slice/selectors';

function ScoringReady() {
  const navigate = useNavigate();
  const handleBackToListCustomer = () => navigate(-1);

  const { kycStatus, loading } = useSelector(selectScoringReady);
  const formMethods = useForm();

  const slikActions = useSlikDetailsSlice().actions;
  const { actions } = useScoringReadySlice();

  const dispatch = useDispatch();

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;
    dispatch(actions.getScoringData(id));
    dispatch(slikActions.getSlikDetails(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const getValues = (value?: string | number) => {
    return value === undefined ? [] : [value.toString()];
  };

  const handleVerify = () => {
    formMethods.handleSubmit(values => {
      const data = {
        recommended: values.recommendedValue,
        note:
          values.recommendedValue === true
            ? values.recommendedNote
            : values.notRecommendedNote,
        dbr: values.dbr,
        housePriceSuggestion: values.housePriceSuggestion,
        monthlyPaymentSuggestion: values.monthlyPaymentSuggestion,
        assessments: [
          {
            key: 'Interest Rate',
            values: [
              formMethods.getValues('Interest Rate')?.toString() || null,
            ],
          },

          {
            key: 'Characteristic',
            children: [
              {
                key: 'Honesty, Openness & Cooperation',
                values: getValues(values['Honesty, Openness & Cooperation']),
              },
            ],
          },
        ],
      };
      dispatch(
        actions.updateAssessment(
          { applicationId: id, data },
          () => {
            navigate(path.customerAccountList);
            showSuccess('Data is being processed');
          },
          showError,
        ),
      );
    })();
  };

  if (kycStatus?.applicationStatus !== 'PRE_SCORING_READY' || loading)
    return (
      <div className="w-full">
        <div className="w-full min-h-[calc(100vh-85px)] p-8">
          <div className="mb-6 flex items-center">
            <div
              className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
              onClick={handleBackToListCustomer}
            >
              <img
                src={backIcon}
                width={16}
                height={16}
                className="mr-2"
                alt=""
              />
              <p className="font-semibold">Back</p>
            </div>
            <Header />
          </div>
          {loading && (
            <div className="flex h-[300px] items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </div>
    );

  return (
    <FormProvider {...formMethods}>
      <div className="w-full">
        <div className="w-full min-h-[calc(100vh-85px)] p-8">
          <div className="mb-6 flex items-center">
            <div
              className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
              onClick={handleBackToListCustomer}
            >
              <img
                src={backIcon}
                width={16}
                height={16}
                className="mr-2"
                alt=""
              />
              <p className="font-semibold">Back</p>
            </div>
            <Header />
          </div>
          <HousePrice />
          <RingkasAssessment />
          <RingkasRecommendation />
        </div>
        <div className="bg-white flex justify-end pr-8 h-[80px] items-center">
          <button
            className="px-[46px] py-[10px] text-white font-semibold leading-7 bg-[#005FC5] rounded-lg"
            type="button"
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </div>
    </FormProvider>
  );
}

export default ScoringReady;
