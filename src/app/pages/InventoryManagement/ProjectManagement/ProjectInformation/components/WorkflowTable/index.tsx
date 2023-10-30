import { Box, Divider } from '@mui/material';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface HeaderType {
  title: string;
  width: string;
}
interface Props {
  header: HeaderType[];
  items: any[];
  renderItem: (item: any) => JSX.Element[];
}

const AddMore = styled.div`
  height: 3.5rem;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='rgb(0, 156, 224)' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 20px;
  align-self: center;
  line-height: 3.5rem;
  text-align: center;
  cursor: pointer;
  color: #005fb6;
  margin-left: 2rem;
  margin-right: 2rem;
  padding-left: 1rem;
  font-weight: 600;
  margin-top: 1rem;
`;

export const WorkflowTable = (props: Props) => {
  const { t } = useTranslation();
  const { header, items, renderItem } = props;
  return (
    <Box>
      <div className="p-4 flex border-b border-b-[#D7E2EE]">
        {header.map((item, index) => (
          <div
            className="ml-5 text-[16px] text-[#6B7A99]"
            style={{ width: item.width }}
            key={`header ${index}`}
          >
            {item.title.toUpperCase()}
          </div>
        ))}
      </div>
      {items.map((item, index) => (
        <div key={`content ${index}`}>
          <div className="p-4 flex">
            {renderItem(item).map((col, index) => col)}
          </div>
          {index < items.length - 1 && <Divider />}
        </div>
      ))}
    </Box>
  );
};
