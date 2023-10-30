import { Box, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DeveloperTaskForm } from 'types/CustomerManagement';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowTopIcon from '@mui/icons-material/KeyboardArrowUp';

interface HeaderType {
  title: string;
  width: string;
}
interface Props {
  header: HeaderType[];
  items?: DeveloperTaskForm[];
  renderItem: (item: DeveloperTaskForm) => JSX.Element[];
  isDivider?: boolean;
  sortItem?: () => void;
  direction: 'ascending' | 'descending' | 'none';
}

export const WorkspaceTable = (props: Props) => {
  const { t } = useTranslation();
  const { header, items, renderItem, isDivider, sortItem, direction } = props;
  return (
    <Box>
      <div className="p-4 flex border-b border-b-[#D7E2EE]">
        {header.map((item, index) => (
          <div
            className="ml-4 flex"
            style={{ width: item.width }}
            key={`header ${index}`}
          >
            <p className="text-[14px] text-[#6B7A99] font-semibold">
              {item.title.toUpperCase()}
            </p>
            {direction === 'ascending' && index === 0 && (
              <KeyboardArrowDownIcon
                className="cursor-pointer mt-[-3px]"
                onClick={e => sortItem && sortItem()}
                sx={{ color: '#6B7A99' }}
              />
            )}
            {direction === 'descending' && index === 0 && (
              <KeyboardArrowTopIcon
                className="cursor-pointer mt-[-3px]"
                onClick={e => sortItem && sortItem()}
                sx={{ color: '#6B7A99' }}
              />
            )}
          </div>
        ))}
      </div>
      {items &&
        items.map((item, index) => (
          <div key={`content ${index}`}>
            <div className="p-4 flex">
              {renderItem(item).map((col, index) => col)}
            </div>
            {index < items.length - 1 && isDivider && <Divider />}
          </div>
        ))}
    </Box>
  );
};
