import path, { permissionPathConfig } from 'app/routes/path';
import styled from 'styled-components';

import InventoryIcon from 'app/components/Sidebar/icons/InventoryIcon';
import ManageUserIcon from 'app/components/Sidebar/icons/ManageUserIcon';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { shallowEqual, useSelector } from 'react-redux';
import MenuItem from './MenuItem';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 24px;
`;

const config = [
  {
    label: 'common.manageUsers',
    path: path.manageUsers,
    Icon: ManageUserIcon,
    children: [
      {
        label: 'sidebar.customerPipeline',
        path: path.customerAccountList,
      },
      {
        label: 'sidebar.partnerAccount',
        path: path.partnerAccountList,
      },
      {
        label: 'sidebar.administration',
        path: path.employeeAccountList,
      },
    ],
  },
  {
    label: 'sidebar.bankProgram',
    path: path.bankProgram,
    Icon: InventoryIcon,
    children: [
      {
        label: 'sidebar.kprProgram',
        path: path.kprProgram,
      },
      {
        label: 'sidebar.kprRequirement',
        path: path.kprRequirement,
      },
      {
        label: 'sidebar.kprDetail',
        path: path.kprDetail,
      },
    ],
  },
  {
    label: 'sidebar.inventoryManagement',
    path: path.inventoryManagement,
    Icon: InventoryIcon,
    children: [
      {
        label: 'sidebar.manageProject',
        path: path.project,
      },
      {
        label: 'sidebar.manageProduct',
        path: path.productList,
      },
      {
        label: 'sidebar.imageAndVideo',
        path: path.imgAndVideoList,
      },
    ],
  },
];

export default function SidebarMenu() {
  const { userInformation } = useSelector(selectAuth, shallowEqual);

  return (
    <MenuContainer>
      {userInformation
        ? config.map(item => {
            const menuChildren = [];

            if (item.children) {
              for (const child of item.children) {
                if (
                  userInformation.permissions.includes(
                    permissionPathConfig[child.path],
                  )
                )
                  menuChildren.push(child);
              }
            }
            if (!menuChildren.length) return null;

            return (
              <div key={item.label}>
                <MenuItem item={item} menuChildren={menuChildren} />
              </div>
            );
          })
        : null}
    </MenuContainer>
  );
}
