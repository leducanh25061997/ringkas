import { Box, Typography } from '@mui/material';
import { translations } from 'locales/translations';
import { memo } from 'react';
import EditIcon from 'assets/icons/edit-icon.svg';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import path from 'app/routes/path';
import { useSelector, shallowEqual } from 'react-redux';
import moment from 'moment';
import { selectEmployeeAccountList } from '../../slice/selectors';
import { EmployeeType, RoleNameText } from 'types/EmployeeAccountManagement';

interface HeaderType {
  title: string;
  width: string;
}

interface Props {}

export const EmployeeDetailsSummary = memo((props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const { employeeAccountInfo } = useSelector(
    selectEmployeeAccountList,
    shallowEqual,
  );

  const updateEmployeeAccount = () => {
    navigate(`${path.employeeAccountList}/edit/${id}`);
  };

  const header: HeaderType[] = [
    {
      title: t(translations.common.fullName),
      width: '15%',
    },
    {
      title: t(translations.common.email),
      width: '20%',
    },
    {
      title: t(translations.developerInformation.phoneNumber),
      width: '15%',
    },
    {
      title: t(translations.employManagement.employType),
      width: '15%',
    },
    {
      title: t(translations.projectManagement.project),
      width: '15%',
    },
    {
      title: `${t(translations.employManagement.roleName)}`,
      width: '15%',
    },
    {
      title: t(translations.common.createdDate),
      width: '15%',
    },
  ];

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        margin: '0px 24px 24px 24px',
        borderRadius: '12px',
        py: 4,
        paddingLeft: '2rem',
        paddingRight: '4rem',
      }}
    >
      <div className="flex">
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '20px', color: '#223250' }}
        >
          {t(translations.employManagement.employeeDetailsSummary)}
        </Typography>
        <img
          onClick={updateEmployeeAccount}
          className="cursor-pointer ml-2"
          src={EditIcon}
          alt="edit icon"
        />
      </div>
      <Typography
        sx={{ fontWeight: 'bold', fontSize: '18px', color: '#223250', mt: 2 }}
      >
        {t(translations.employManagement.employeeInfo)}
      </Typography>
      <Box mt={1}>
        <div className="py-4 flex">
          {header.map((item, index) => (
            <div
              className="text-[14px] text-[#6B7A99] font-semibold pr-4"
              style={{ width: item.width }}
              key={`header ${index}`}
            >
              {item.title.toUpperCase()}
            </div>
          ))}
        </div>
        <div>
          <div className="flex text-[#223250] text-[16px] font-[500]">
            <div className="w-[15%] text-[#223250] text-[16px] font-[500] pr-4">
              {employeeAccountInfo?.fullName || '-'}
            </div>
            <div
              className="w-[20%] text-[#223250] text-[16px] font-[500] pr-4"
              style={{ wordBreak: 'break-word' }}
            >
              {employeeAccountInfo?.email || '-'}
            </div>
            <div className="w-[15%] text-[#223250] text-[16px] font-[500] pr-4">
              {employeeAccountInfo?.phone || '-'}
            </div>
            <div className="w-[15%] text-[#223250] text-[16px] font-[500] pr-4">
              {employeeAccountInfo?.type === EmployeeType.PROJECT_LEVEL
                ? t(translations.employManagement.projectLevel)
                : t(translations.employManagement.headQuarterLevel)}
            </div>
            <div className="w-[15%] text-[#223250] text-[16px] font-[500] pr-4">
              {employeeAccountInfo?.project?.name || '-'}
            </div>
            <div className="w-[15%] text-[#223250] text-[16px] font-[500] pr-4">
              {t(
                RoleNameText[
                  employeeAccountInfo?.roleName as keyof typeof RoleNameText
                ],
              )}
            </div>
            <div className="w-[15%] text-[#223250] text-[16px] font-[500] pr-4">
              {employeeAccountInfo?.createdDate
                ? moment
                    .unix(employeeAccountInfo?.createdDate / 1000)
                    .format('DD/MM/YYYY')
                : '-'}
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
});
