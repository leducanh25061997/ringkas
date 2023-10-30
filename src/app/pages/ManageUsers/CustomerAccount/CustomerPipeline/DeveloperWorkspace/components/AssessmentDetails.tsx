import { Box, styled } from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import classNames from 'classnames';
import DocumentTooltip from './DocumentTooltip';

const Title = styled('div')({
  fontWeight: 'bold',
  fontSize: '17px',
  color: '#202A42',
});

interface HeaderType {
  title: string;
  width: string;
}

interface Props {}

const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return n.replace(thousands, '.');
};

export const AssessmentDetails = memo((props: Props) => {
  const { t } = useTranslation();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [items, setItems] = useState([
    {
      id: 1,
      parameter: {
        label: 'Loan to Value',
        isCollapse: false,
        children: [
          {
            parameter: {
              label: 'Total Asset',
              value: 2000000000,
            },
            dataSource: {
              label: 'Officer Update',
            },
          },
          {
            parameter: {
              label: 'Total Liability',
              value: 1529000000,
            },
            dataSource: {
              label: 'Ringkas Database',
            },
          },
        ],
      },
      dataSource: {
        label: '',
      },
      value: {
        label: '76.45%',
      },
      weight: {
        label: '5%',
      },
      score: [
        {
          label: 'Enough',
          status: true,
        },
        {
          label: 'Good',
          status: false,
        },
        {
          label: 'Very Good',
          status: false,
        },
      ],
    },
    {
      id: 2,
      parameter: {
        label: 'Tenor',
      },
      dataSource: {
        label: 'KPR Preference',
      },
      value: {
        label: '25 Years',
      },
      weight: {
        label: '5%',
      },
      score: [
        {
          label: 'Enough',
          status: false,
        },
        {
          label: 'Good',
          status: true,
        },
        {
          label: 'Very Good',
          status: false,
        },
      ],
    },
    {
      id: 3,
      parameter: {
        label: 'Property Status',
      },
      dataSource: {
        label: 'Officer Update',
      },
      value: {
        label: 'Ready Stock',
      },
      weight: {
        label: '5%',
      },
      score: [
        {
          label: 'Enough',
          status: false,
        },
        {
          label: 'Good',
          status: true,
        },
      ],
    },
    {
      id: 4,
      parameter: {
        label: 'Certificate Type',
      },
      dataSource: {
        label: 'Officer Update',
      },
      value: {
        label: 'Induk',
      },
      weight: {
        label: '5%',
      },
      score: [
        {
          label: 'Enough',
          status: false,
        },
        {
          label: 'Good',
          status: true,
        },
      ],
    },
    {
      id: 5,
      parameter: {
        label: 'Characteristic',
        isCollapse: false,
        children: [
          {
            id: 1,
            parameter: {
              label: 'eKYC',
            },
            dataSource: {
              label: 'Ringkas Database',
            },
            value: {
              label: 'Verified',
            },
            weight: {
              label: '10%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
              ],
            },
          },
          {
            id: 2,
            parameter: {
              label: 'Honesty, Openness & Cooperation',
            },
            dataSource: {
              label: 'Officer Update',
            },
            value: {
              label: 'Customer is so cooperative in confirming all KPR data',
            },
            weight: {
              label: '5%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
                {
                  label: 'Good',
                  status: false,
                },
                {
                  label: 'Very Good',
                  status: false,
                },
              ],
            },
          },
          {
            id: 3,
            parameter: {
              label: 'Collectability',
            },
            dataSource: {
              label: 'SLIK',
            },
            value: {
              label: 'Good',
            },
            weight: {
              label: '15%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
                {
                  label: 'Good',
                  status: false,
                },
                {
                  label: 'Very Good',
                  status: false,
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 7,
      parameter: {
        label: 'Qualitative',
        isCollapse: false,
        children: [
          {
            id: 1,
            parameter: {
              label: 'Minimum Age',
            },
            dataSource: {
              label: 'RingKas Database',
            },
            value: {
              label: '28 years old',
            },
            weight: {
              label: '8.333%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
                {
                  label: 'Good',
                  status: false,
                },
                {
                  label: 'Very Good',
                  status: false,
                },
              ],
            },
          },
          {
            id: 2,
            parameter: {
              label: 'Working Period',
            },
            dataSource: {
              label: 'Ringkas Database',
            },
            value: {
              label: '5 years',
            },
            weight: {
              label: '8.3333%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
                {
                  label: 'Good',
                  status: false,
                },
                {
                  label: 'Very Good',
                  status: false,
                },
              ],
            },
          },
          {
            parameter: {
              label: 'Company Type of Employment',
            },
            dataSource: {
              label: 'Ringkas Database',
            },
            value: {
              label: 'PT',
            },
            weight: {
              label: '8.333%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
                {
                  label: 'Good',
                  status: false,
                },
                {
                  label: 'Very Good',
                  status: false,
                },
              ],
            },
          },
        ],
      },
    },
    {
      id: 8,
      parameter: {
        label: 'Quantitative',
        isCollapse: false,
        children: [
          {
            id: 1,
            parameter: {
              label: 'Kelengkapan Dokumen Gaji atau THP',
            },
            dataSource: {
              label: 'Ringkas Database',
            },
            value: {
              label: 'Submitted',
            },
            weight: {
              label: '12.5%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: true,
                },
                {
                  label: 'Good',
                  status: false,
                },
                {
                  label: 'Very Good',
                  status: false,
                },
              ],
            },
          },
          {
            id: 2,
            parameter: {
              label: 'DBR',
              isCollapse: false,
              children: [
                {
                  parameter: {
                    label: 'Total Obligation/Month',
                    value: 15000000,
                  },
                  dataSource: {
                    label: 'SLIK',
                  },
                },
                {
                  parameter: {
                    label: 'Net Income/Month',
                    value: 35000000,
                  },
                  dataSource: {
                    label: 'Ringkas Database',
                  },
                },
              ],
            },
            dataSource: {
              label: '',
            },
            value: {
              label: '42.85%',
            },
            weight: {
              label: '12.5%',
            },
            score: {
              label: '',
              children: [
                {
                  label: 'Enough',
                  status: false,
                },
                {
                  label: 'Good',
                  status: true,
                },
              ],
            },
          },
        ],
      },
    },
  ]);

  const header: HeaderType[] = [
    {
      title: t(translations.developerWorkspace.parameter),
      width: '35%',
    },
    {
      title: t(translations.developerWorkspace.dataSource),
      width: '35%',
    },
    {
      title: t(translations.developerWorkspace.value),
      width: '30%',
    },
    // {
    //   title: t(translations.developerWorkspace.weight),
    //   width: '15%',
    // },
    // {
    //   title: t(translations.developerWorkspace.score),
    //   width: '25%',
    // },
  ];

  const handleCollapsePr = (index: number) => {
    const newTask: any[] = [];
    items.map((item: any, i: number) => {
      const newItem = item;
      if (index === item.id) {
        newItem.parameter.isCollapse = !item.parameter?.isCollapse;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  const handleCollapseChild = (index: number, id: number) => {
    const newTask: any[] = [];
    items.map((item: any) => {
      const newItem = item;
      const newChild: any[] = [];
      if (index === item.id) {
        item.parameter.children.map((data: any) => {
          const newData = data;
          if (id === data.id) {
            newData.parameter.isCollapse = !newData?.parameter?.isCollapse;
          }
          newChild.push(newData);
        });
        newItem.parameter.children = newChild;
      }
      newTask.push(newItem);
    });
    setItems(newTask);
    setIsChange(!isChange);
  };

  const renderItem = (item: any) => {
    return [
      <div className="ml-4 w-[35%] text-[#202A42] text-[16px]">
        <div className="flex">
          {item?.parameter?.children &&
            item?.parameter?.children.length > 0 &&
            (item?.parameter?.isCollapse ? (
              <KeyboardArrowRightIcon
                className="cursor-pointer"
                onClick={e => handleCollapsePr(item.id)}
                sx={{ color: '#6B7A99' }}
              />
            ) : (
              <KeyboardArrowDownIcon
                className="cursor-pointer"
                onClick={e => handleCollapsePr(item.id)}
                sx={{ color: '#6B7A99' }}
              />
            ))}
          <span className="ml-2 text-[#6B7A99] font-medium text-[16px]">
            {item?.parameter?.label}
          </span>
        </div>
        <div>
          <div
            className={classNames('border-l-2 border-[#D7E2EE] ml-[11px]', {
              'h-[80px]':
                item?.parameter?.children &&
                item?.parameter?.children.length > 0 &&
                item?.parameter?.children[1]?.parameter?.children,
              hidden: item?.parameter?.isCollapse,
            })}
          >
            {item?.parameter?.children &&
              item?.parameter?.children.map((data: any, idx: number) =>
                data?.parameter?.children ? (
                  <div className="pt-2" key={idx}>
                    <div>
                      <div className="block pt-4 pl-2s">
                        {data?.parameter?.children &&
                          data?.parameter?.children.length > 0 &&
                          (data?.parameter?.isCollapse ? (
                            <KeyboardArrowRightIcon
                              className="cursor-pointer"
                              onClick={e =>
                                handleCollapseChild(item.id, data.id)
                              }
                              sx={{ color: '#6B7A99' }}
                            />
                          ) : (
                            <KeyboardArrowDownIcon
                              className="cursor-pointer"
                              onClick={e =>
                                handleCollapseChild(item.id, data.id)
                              }
                              sx={{ color: '#6B7A99' }}
                            />
                          ))}
                        <span className="text-[#6B7A99] font-medium text-[16px] pl-4 pt-4">
                          {data?.parameter?.label}
                        </span>
                      </div>
                      <div
                        className={classNames(
                          'border-l-2 border-[#D7E2EE] ml-[11px] ',
                          {
                            hidden: data?.parameter?.isCollapse,
                          },
                        )}
                      >
                        {data?.parameter?.children &&
                          data?.parameter?.children.map(
                            (value: any, index: number) => (
                              <div className="pt-2 h-[60px]" key={index}>
                                <div className="text-[#6B7A99] font-medium text-[16px] pl-4 pt-4 flex">
                                  {value?.parameter?.label}
                                  {index === 0 && (
                                    <DocumentTooltip
                                      title={t(
                                        translations.projectManagement.specific,
                                      )}
                                      content={'Dokumen untuk pihak tertenku'}
                                    />
                                  )}
                                </div>
                                <div className="text-[#202A42] font-medium text-[16px] pl-4">
                                  {value?.parameter?.value && (
                                    <div className="flex">
                                      <p className="text-[#202A42] font-medium text-[16px]">
                                        Rp
                                      </p>
                                      <p className="ml-4 text-[#202A42] font-medium text-[16px]">
                                        {formatCurrency(
                                          value?.parameter?.value.toString(),
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ),
                          )}
                      </div>
                      <div className="text-[#202A42] font-medium text-[16px] pl-4">
                        {data?.parameter?.value && (
                          <div className="flex">
                            <p className="text-[#202A42] font-medium text-[16px]">
                              Rp
                            </p>
                            <p className="ml-4 text-[#202A42] font-medium text-[16px]">
                              {formatCurrency(
                                data?.parameter?.value.toString(),
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="pt-2 h-[60px]">
                    <div className="text-[#6B7A99] font-medium text-[16px] pl-4 pt-4">
                      {data?.parameter?.label}
                    </div>
                    <div className="pl-4">
                      {data?.parameter?.value && (
                        <div className="flex">
                          <p className="text-[#202A42] font-medium text-[16px]">
                            Rp
                          </p>
                          <p className="ml-4 text-[#202A42] font-medium text-[16px]">
                            {formatCurrency(data?.parameter?.value.toString())}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>
      </div>,
      <div className="ml-4 w-[35%] text-[#202A42] text-[16px]">
        <div className="text-[#6B7A99] font-medium text-[16px]">
          {item?.dataSource?.label}
        </div>
        {item?.parameter?.children &&
          item?.parameter?.children.map((data: any, idx: number) => (
            <div
              key={idx}
              className={classNames({
                hidden: item?.parameter?.isCollapse,
              })}
            >
              <div className="h-[60px] pt-8">
                <div className="text-[#6B7A99] font-medium text-[16px] pt-4">
                  {data?.dataSource?.label}
                </div>
                <div className="text-[#202A42] font-medium text-[16px]">
                  {data?.dataSource?.value}
                </div>
              </div>
              {data.parameter.children &&
                data.parameter.children.map((value: any, idx: number) => (
                  <div
                    key={idx}
                    className={classNames('"h-[60px] pt-5', {
                      hidden: data?.parameter?.isCollapse,
                    })}
                  >
                    <div className="text-[#6B7A99] font-medium text-[16px] pt-4">
                      {value?.dataSource?.label}
                    </div>
                    <div className="text-[#202A42] font-medium text-[16px]">
                      {value?.dataSource?.value}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>,
      <div className="ml-4 w-[30%] text-[#202A42] text-[16px]">
        <div className="text-[#202A42] font-medium text-[16px]">
          {item?.value?.label}
        </div>
        {item?.parameter?.children &&
          item?.parameter?.children.map((data: any, idx: number) => (
            <div
              key={idx}
              className={classNames('h-[60px]', {
                'pt-8': true,
                hidden: item?.parameter?.isCollapse,
              })}
            >
              <div className="text-[#202A42] font-medium text-[16px] pt-4">
                {data?.value?.label}
              </div>
              <div className="text-[#202A42] font-medium text-[16px] pl-4">
                {data?.value?.value}
              </div>
            </div>
          ))}
      </div>,
      // <div className="ml-4 w-[15%] text-[#202A42] text-[16px]">
      //   <div className="text-[#202A42] font-medium text-[16px]">
      //     {item?.weight?.label}
      //   </div>
      //   {item?.parameter?.children &&
      //     item?.parameter?.children.map((data: any) => (
      //       <div
      //         className={classNames('h-[60px]', {
      //           'pt-8': true,
      //           hidden: item?.parameter.isCollapse,
      //         })}
      //       >
      //         <div className="text-[#202A42] font-medium text-[16px] pt-4">
      //           {data?.weight?.label}
      //         </div>
      //         <div className="text-[#202A42] font-medium text-[16px] pl-4">
      //           {data?.weight?.value}
      //         </div>
      //       </div>
      //     ))}
      // </div>,
      // <div className="ml-4 w-[25%] text-[#202A42] text-[16px] mt-[-10px]">
      //   <div className="flex">
      //     {item?.score &&
      //       item?.score.map((data: any) => (
      //         <FormControlLabel
      //           control={
      //             <RootCheckbox>
      //               <Checkbox
      //                 onChange={e => {
      //                   const getData: boolean = e.target.value === 'true';
      //                   // e.target.value && onChangeMandatory(item.id, !getData);
      //                 }}
      //                 value={data?.status}
      //                 checked={data?.status}
      //               />
      //             </RootCheckbox>
      //           }
      //           label={data?.label}
      //         />
      //       ))}
      //   </div>
      //   {item?.parameter?.children &&
      //     item?.parameter?.children.map((data: any) => (
      //       <div
      //         className={classNames('h-[60px] pt-12', {
      //           hidden: item?.parameter?.isCollapse,
      //         })}
      //       >
      //         {data?.score?.children &&
      //           data?.score?.children.map((value: any) => (
      //             <FormControlLabel
      //               control={
      //                 <RootCheckbox>
      //                   <Checkbox
      //                     onChange={e => {
      //                       const getData: boolean = e.target.value === 'true';
      //                       // e.target.value && onChangeMandatory(item.id, !getData);
      //                     }}
      //                     value={value?.status}
      //                     checked={value?.status}
      //                   />
      //                 </RootCheckbox>
      //               }
      //               label={value?.label}
      //             />
      //           ))}
      //       </div>
      //     ))}
      // </div>,
    ];
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        pt: 2,
        paddingBottom: '50px',
        width: '100%',
      }}
    >
      <div className="p-4 flex border-b border-b-[#D7E2EE]">
        {header.map((item, index) => (
          <div
            className="ml-4 text-[14px] text-[#6B7A99] font-semibold"
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
        </div>
      ))}
    </Box>
  );
});
