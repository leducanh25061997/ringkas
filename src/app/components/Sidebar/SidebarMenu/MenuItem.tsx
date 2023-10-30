import { Collapse } from '@mui/material';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuItemParent = styled.a`
  display: flex;
  align-items: center;
  height: 48px;
  border-radius: 8px;
  background-color: #8d96b0;
  padding-inline: 12px;
  margin-bottom: 8px;
  &.active {
    background-color: #005fc5;
    span {
      font-weight: 600;
      color: white;
    }
  }
  .menu-icon {
    margin-right: 6px;
    width: 30px;
    height: 30px;
    object-fit: contain;
  }
  span {
    font-weight: 600;
    color: #ffffff;
    letter-spacing: -0.01em;
  }
`;

const MenuChildrenContainer = styled(Collapse)`
  display: flex;
  flex-direction: column;
`;
const MenuItemChild = styled(Link)`
  color: #535763 !important;
  padding-inline: 12px;
  margin-bottom: 8px;
  height: 48px;
  display: flex;
  align-items: center;
  span {
    font-weight: 600;
  }
  &.active {
    color: #005fc5 !important;
  }
`;

interface Props {
  item: {
    label: string;
    path: string;
    Icon: React.ElementType;
  };
  menuChildren: {
    label: string;
    path: string;
  }[];
}

function MenuItem({ item, menuChildren }: Props) {
  const location = useLocation();
  const { t } = useTranslation();

  const [_, setOpenMenu] = useState(false);

  useEffect(() => {
    if (location.pathname.includes(item.path)) setOpenMenu(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const handleExpandMenu = () => {
    setOpenMenu(prev => !prev);
  };

  return (
    <div>
      <MenuItemParent
        className={classNames({
          active: location.pathname.includes(item.path),
        })}
        onClick={handleExpandMenu}
      >
        <item.Icon
          className="menu-icon"
          active={location.pathname.includes(item.path)}
        />
        <span>{t(item.label)}</span>
        {/* <div className="bg-white rounded-[4px] text-black w-5 h-5 flex items-center justify-center text-[10px] leading-3 ml-[auto] font-semibold">
          2
        </div> */}
      </MenuItemParent>
      <MenuChildrenContainer timeout="auto" in={true}>
        {menuChildren.map(child => (
          <MenuItemChild
            to={child.path}
            className={classNames({
              active: location.pathname.includes(child.path),
            })}
            key={child.label}
          >
            <span>{t(child.label)}</span>
            {/* <div className="bg-[#005FC5] rounded-[4px] text-white w-5 h-5 flex items-center justify-center text-[10px] leading-3 ml-[auto] font-semibold">
              2
            </div> */}
          </MenuItemChild>
        ))}
      </MenuChildrenContainer>
    </div>
  );
}

export default MenuItem;
