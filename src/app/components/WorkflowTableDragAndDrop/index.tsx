import React from 'react';
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
  setItems: (value: any[]) => void;
  renderItem: (item: any, index: number) => JSX.Element[];
  onclick?: React.MouseEventHandler<HTMLDivElement>;
  isAdded?: boolean;
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

export const WorkflowTableDragAndDrop = (props: Props) => {
  const { t } = useTranslation();
  const { header, items, setItems, isAdded, renderItem, onclick } = props;

  const handleDragStart = (event: any, data: any) => {
    const fromBox = JSON.stringify({ id: data.id });
    event.dataTransfer.setData('dragContent', fromBox);
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
    return false;
  };

  const handleDrop = (event: any, data: any, boxes: any, setBoxes: any) => {
    event.preventDefault();
    const fromBox = JSON.parse(event.dataTransfer.getData('dragContent'));
    const toBox = { id: data.id };
    data.id > 0 && swapBoxes(fromBox, toBox, boxes, setBoxes);
    return false;
  };

  const swapBoxes = (fromBox: any, toBox: any, boxes: any, setBoxes: any) => {
    const bx = [...boxes];
    let fromIndex = -1;
    let toIndex = -1;

    bx.forEach((box, index) => {
      if (box.id === fromBox.id) {
        fromIndex = index;
      }
      if (box.id === toBox.id) {
        toIndex = index;
      }
    });

    if (fromIndex !== -1 && toIndex !== -1) {
      const fromRest = bx[fromIndex];
      const toRest = bx[toIndex];
      bx[toIndex] = { id: toBox.id, ...fromRest };
      bx[fromIndex] = { id: fromBox.id, ...toRest };
      setBoxes(bx);
    }
  };
  return (
    <Box>
      <div className="p-4 flex border-b border-b-[#D7E2EE]">
        {header.map((item, index) => (
          <div
            className="ml-4 text-[14px] font-[600] text-[#6B7A99]"
            style={{ width: item.width }}
            key={`header ${index}`}
          >
            {item.title.toUpperCase()}
          </div>
        ))}
      </div>
      {items.map((item, index) => (
        <div
          key={`content ${index}`}
          draggable={index > 0}
          onDragStart={e => {
            handleDragStart(e, item);
          }}
          onDragOver={e => {
            handleDragOver(e);
          }}
          onDrop={data => handleDrop(data, item, items, setItems)}
        >
          <div className="p-4 flex items-center">
            {renderItem(item, index).map((col, colIndex) => (
              <React.Fragment key={colIndex}>{col}</React.Fragment>
            ))}
          </div>
        </div>
      ))}
      {isAdded && (
        <AddMore onClick={onclick}>
          {'+'}
          <span
            style={{ textDecoration: 'underline', fontWeight: '600' }}
          >{`${t(translations.projectManagement.addMore)}`}</span>
        </AddMore>
      )}
    </Box>
  );
};
