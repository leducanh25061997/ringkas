import styled from 'styled-components';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import InfoCard from './components/InfoCard';
import ListBank from './components/ListBank';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 32px;
`;

const InfoContainer = styled.div`
  margin-block: 32px;
  display: flex;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function BankAccount() {
  const { t } = useTranslation();
  return (
    <RootContainer>
      <Header>
        <span className="parent-label">
          {t(translations.common.manageUsers)}
        </span>
        <span>{` > ${t(translations.bankManagement.bankAccount)}`}</span>
      </Header>
      <InfoContainer>
        <InfoCard label="Need Verified" value={276} />
        <InfoCard label="Active Account" value={177} />
        <InfoCard label="Verified Account" value={177} />
      </InfoContainer>
      <ListBank />
    </RootContainer>
  );
}
