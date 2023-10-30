import React from 'react';
import styled from 'styled-components';

interface Button {
  title: string;
  onClick: () => void;
}

interface Props {
  buttonGroup: Button[];
}

const ButtonStyle = styled.p`
  color: #005fc5;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`;

const GroupButtonAction = (props: Props) => {
  const { buttonGroup } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
      {buttonGroup.map((item: Button, idx: number) => {
        return (
          <ButtonStyle
            key={idx}
            style={{
              cursor: 'pointer',
              padding: idx > 0 ? '0 20px' : '0 20px 0 0',
              borderRight:
                idx === buttonGroup.length - 1 ? 'none' : '3px solid #005FC5',
            }}
            onClick={item.onClick}
          >
            {item.title}
          </ButtonStyle>
        );
      })}
    </div>
  );
};

export default GroupButtonAction;
