import { formatCurrency } from 'app/components/CustomTextField';
import { slikDetailsSlice } from 'app/pages/ManageUsers/CustomerAccount/CustomerInformation/SlikDetails/slice/selectors';
import { selectScoringReady } from 'app/pages/ManageUsers/CustomerAccount/ScoringReady/slice/selectors';
import { useSelector } from 'react-redux';
import NonCollapseRow from '../components/NonCollapseRow';
import SpecialCollapseRow from '../components/SpecialCollapseRow';

interface Props {
  predefinedEstimatedMonthlyInstallment?: number;
}

function DBR({ predefinedEstimatedMonthlyInstallment = 0 }: Props) {
  const { assessmentData } = useSelector(selectScoringReady);
  const { data: slikData } = useSelector(slikDetailsSlice);

  const rowData = assessmentData
    ? assessmentData.data.filter(item => item.key === 'DBR')[0]
    : undefined;

  const estimatedMonthlyInstallment = assessmentData
    ? Number(
        assessmentData.data.filter(
          item => item.key === 'Estimated Monthly Installment',
        )[0].values[0] ?? predefinedEstimatedMonthlyInstallment,
      )
    : predefinedEstimatedMonthlyInstallment;

  const income = assessmentData
    ? Number(
        assessmentData.data.filter(item => item.key === 'Monthly Income')[0]
          .values[0],
      )
    : 0;

  const currentDbrData = rowData?.children ? rowData.children[0] : undefined;
  const newEstimatedDbrData = rowData?.children
    ? rowData.children[1]
    : undefined;

  const creditHistory =
    slikData?.creditReport?.contractsHistory?.credit?.grantedCredit || [];

  const activeContracts = creditHistory.filter(
    (item: any) => item.commonData.contractPhase === 'AC',
  );

  const debtData = activeContracts.map(
    (item: any) => item.grantedCredit.currentMonthRealization,
  );

  const renderCurrentDbrDebt = () => {
    if (!activeContracts.length) return '0';

    let currentDBRDebt = '';
    for (const currentMonthRealization of debtData) {
      currentDBRDebt += ` + ${formatCurrency(currentMonthRealization)}`;
    }

    currentDBRDebt = currentDBRDebt.slice(2);

    return currentDBRDebt;
  };

  const renderNewDbrDebt = () => {
    let currentDBRDebt;
    if (!activeContracts.length) {
      currentDBRDebt = '0';
    } else currentDBRDebt = renderCurrentDbrDebt();

    return `${currentDBRDebt} + ${
      estimatedMonthlyInstallment
        ? formatCurrency(estimatedMonthlyInstallment)
        : '0'
    }`;
  };

  const totalDebt = debtData.reduce(
    (partialSum: number, a: number) => partialSum + a,
    0,
  );

  const currentDbr = (
    Math.round(100 * (income ? totalDebt / income : 0) * 100) / 100
  ).toFixed(2);
  const newDbr = (
    Math.round(
      100 *
        (income ? (totalDebt + estimatedMonthlyInstallment) / income : 0) *
        100,
    ) / 100
  ).toFixed(2);

  return (
    <SpecialCollapseRow
      parameter={rowData?.key}
      dataSource={rowData?.dataSource}
      dataType={rowData?.dataType}
      value={`${newDbr}%`}
    >
      <NonCollapseRow
        parameter={currentDbrData?.key}
        dataSource={currentDbrData?.dataSource}
        dataType={currentDbrData?.dataType}
        value={currentDbr}
        className="mt-0"
        isChild
      />
      <div className="border border-[#D7E2EE] rounded-lg flex items-center w-fit p-6 text-[#202A42] mt-6">
        <p className="font-medium whitespace-pre-wrap">Current DBR = </p>
        <div className="min-w-[200px]">
          <p className="border-b border-b-[#202A42] font-medium text-center pb-2">
            Debt
          </p>
          <p className="font-medium text-center pt-2">Income</p>
        </div>
      </div>
      <div className="rounded-lg flex items-center w-fit p-6 pt-0 text-[#202A42] mt-6">
        <p className="font-medium whitespace-pre-wrap">Current DBR = </p>
        <div className="min-w-[200px]">
          <p className="border-b border-b-[#202A42] font-medium text-center pb-2">
            {renderCurrentDbrDebt()}
          </p>
          <p className="font-medium text-center pt-2">
            {income ? formatCurrency(income) : '-'}
          </p>
        </div>
      </div>

      <NonCollapseRow
        parameter={newEstimatedDbrData?.key}
        dataSource={newEstimatedDbrData?.dataSource}
        dataType={newEstimatedDbrData?.dataType}
        value={`${newDbr}`}
        isChild
      />
      <div className="border border-[#D7E2EE] rounded-lg flex items-center w-fit p-6 text-[#202A42] mt-6">
        <p className="font-medium whitespace-pre-wrap">New DBR = </p>
        <div className="min-w-[200px]">
          <p className="border-b border-b-[#202A42] font-medium text-center pb-2">
            Debt
          </p>
          <p className="font-medium text-center pt-2">Income</p>
        </div>
      </div>
      <div className="rounded-lg flex items-center w-fit p-6 pt-0 text-[#202A42] mt-6">
        <p className="font-medium whitespace-pre-wrap">New DBR = </p>
        <div className="min-w-[200px]">
          <p className="border-b border-b-[#202A42] font-medium text-center pb-2">
            {renderNewDbrDebt()}
          </p>
          <p className="font-medium text-center pt-2">
            {income ? formatCurrency(income) : '-'}
          </p>
        </div>
      </div>
    </SpecialCollapseRow>
  );
}

export default DBR;
