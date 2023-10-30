import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import arrowDownIcon from 'assets/navbar/arrow-down.svg';
import notiIcon from 'assets/navbar/noti.svg';
import MenuIcon from '@mui/icons-material/Menu';

import { Avatar, Box, Divider, IconButton, Typography } from '@mui/material';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import path from 'app/routes/path';
import logoutIcon from 'assets/images/logoutIcon.svg';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation } from 'react-router';

import { useSafeState } from 'app/hooks/useSafeState';
import { useAuthSlice } from 'app/pages/Login/slice';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import MenuPopover from '../MenuPopover';
import LanguagePopover from '../LanguagePopover';
import { sidebarRef } from '../Sidebar';

const MenuItemStyle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '& .menu_item__icon': {
    width: 29,
    marginRight: 10,
  },
  '& .menu-color': {
    color: '#777777',
    fontWeight: 600,
  },
});

// const RingkasLogo = styled.img`
//   margin-right: 32px;
// `;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
`;

const NotiIcon = styled.div`
  margin-right: 24px;
  border: 0.2px solid #c6d7e0;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Language = styled.div`
  margin-right: 24px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
  margin-right: 16px;
`;

const UserName = styled.span`
  font-weight: 600;
  margin-right: 8px;
`;

export const menuButtonRef = React.createRef<HTMLButtonElement>();

export default function NavBar() {
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const anchorRef = useRef(null);
  const [open, setOpen] = useSafeState<boolean>(false);
  const { t } = useTranslation();
  const { actions } = useAuthSlice();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {}, []);

  const handleLogout = () => {
    setOpen(false);
    dispatch(
      actions.logout('', (err?: any) => {
        if (err) {
          // console.log(err);
        } else {
          window.location.href = path.login;
        }
      }),
    );
  };

  const titleConfig = useMemo(
    () => ({
      [path.customerAccountList]: t(translations.sidebar.customerPipeline),
      [path.developerAccountList]: t(translations.common.developerAccount),
      [path.createDeveloper]: t(
        translations.developerInformation.registerNewDeveloper,
      ),
      [path.createProject]: t(translations.projectManagement.createNewProject),
      [path.project]: t(translations.projectManagement.projectList),
      [path.productList]: t(translations.productInformation.productList),
      [path.createProduct]: t(translations.productManagement.createNewProduct),
      [path.detailProject]: t(translations.projectManagement.projectDetails),
      [path.developerAccountEdit]: 'Update Developer Account', // no need translation
      [path.bankAccountList]: t(translations.bankManagement.bankAccount),
      [path.imgAndVideoList]: t(translations.sidebar.imageAndVideo),
      [path.createHqBankAccount]: t(
        translations.bankManagement.registerNewBank,
      ),
      [path.createBranchBankAccount]: t(
        translations.bankManagement.registerNewBank,
      ),
      [path.updateProject]: t(translations.projectManagement.projectDetails),
      [path.updateProjectTask]: t(
        translations.projectManagement.projectDetails,
      ),
      [path.updateCustomerAccount]: t(
        translations.customerAccountManagement.customerAccount,
      ),
      [path.createCustomerAccount]: t(translations.createCustomer.headerTitle),
      [path.developerAccountEdit]: t(translations.common.developerAccount),
      [path.detailDeveloperAccount]: 'Developer Account Details', // no need translation
      [path.hqBankAccountInformation]: 'Bank Account Details', // no need translation
      [path.detailBankAccount]: 'Bank Account Details', // no need translation
      [path.updateBankBranchAccount]: 'Update Bank Account', // no need translation
      [path.updateHQBankAccount]: 'Update Bank Account', // no need translation
      [path.updateProduct]: t(translations.productManagement.updateProduct),
      [path.productInformation]: t(
        translations.productManagement.detailProduct,
      ),
      [path.detailCustomer]: t(
        translations.customerAccountManagement.customerDetails,
      ),
      [path.partnerAccountList]: t(translations.sidebar.partnerAccount),
      [path.createPartnerAccount]: 'Register Partner Account', // no need translation
      [path.partnerAccountInformation]: 'Partner Details', // no need translation
      [path.updatePartnerAccount]: 'Update Partner Account', // no need translation
      [path.verifyCustomer]: t(translations.common.adminWorkspace),
      [path.partnerDataVerification]: t(translations.common.adminWorkspace),
      [path.bankTasks]: t(
        translations.customerAccountManagement.bankPartnerWorkspace,
      ),
      [path.kprProgram]: t(translations.sidebar.kprProgram),
      [path.createKprProgram]: t(translations.kprProgram.createKprProgram),
      [path.customerScoringReady]: t(translations.common.adminWorkspace),
      [path.employeeAccountList]: t(translations.sidebar.administration),
      [path.createEmployeeAccount]: t(
        translations.employManagement.createNewEmployee,
      ),
      [path.detailEmployeeAccount]: t(
        translations.employManagement.employeeDetails,
      ),
      [path.updateEmployeeAccount]: t(
        translations.employManagement.updateEmployee,
      ),
      [path.employeeAccountListByAdmin]: t(translations.sidebar.administration),
      [path.createEmployeeAccountByAdmin]: t(
        translations.employManagement.createNewEmployee,
      ),
      [path.detailEmployeeAccountByAdmin]: t(
        translations.employManagement.employeeDetails,
      ),
      [path.updateEmployeeAccountByAdmin]: t(
        translations.employManagement.updateEmployee,
      ),
      [path.registerNewPartnerClient]: t(translations.registerNewClient.title),
      [path.registerNewPartnerBankHq]: t(
        translations.registerNewPartnerBankHq.title,
      ),
      [path.registerNewPartnerDeveloper]: t(
        translations.registerNewPartnerDeveloper.title,
      ),
    }),
    [t],
  );

  const getIcon = (name: string) => (
    <img src={name} alt="" style={{ color: 'white' }} />
  );

  const handleToggleSidebar = () => {
    if (!sidebarRef.current) return;
    sidebarRef.current.classList.toggle('hidden');
  };

  const renderTitle = () => {
    const pathPattern = Object.keys(titleConfig).find(item =>
      matchPath(item, location.pathname),
    );
    return pathPattern ? titleConfig[pathPattern] : '';
  };

  return (
    <div className="fixed top-0 left-0 2xl:left-[261px] right-0 bg-white h-[85px] shadow-[0px_1px_4px_rgba(0,0,0,0.05)] px-[31px] flex justify-between items-center text-[#223250] z-[1000]">
      <IconButton
        className="2xl:!hidden"
        sx={{ marginRight: '40px' }}
        onClick={handleToggleSidebar}
        ref={menuButtonRef}
      >
        <MenuIcon />
      </IconButton>
      <Title>{renderTitle()}</Title>
      <Language>
        <LanguagePopover />
      </Language>
      <NotiIcon>
        <img src={notiIcon} alt="" width={24} height={24} />
      </NotiIcon>
      {userInformation?.filePhoto && userInformation?.filePhoto.length > 0 ? (
        <Avatar src={userInformation?.filePhoto[0].url} />
      ) : (
        <UserAvatar></UserAvatar>
      )}
      <UserName>{userInformation?.fullName}</UserName>
      <button onClick={handleOpen} ref={anchorRef}>
        <img src={arrowDownIcon} alt="" width={30} height={30} />
      </button>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            Ringkas
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {userInformation?.fullName}
          </Typography>
        </Box>
        <Divider sx={{ my: 1 }} />

        <Box sx={{ my: 1.5, px: 2.5 }}>
          <MenuItemStyle style={{ cursor: 'pointer' }} onClick={handleLogout}>
            <div className="menu_item__icon menu-color">
              {getIcon(logoutIcon)}
            </div>
            <div className="menu_item__name menu-color">
              {t(translations.common.logout)}
            </div>
          </MenuItemStyle>
        </Box>
      </MenuPopover>
    </div>
  );
}
