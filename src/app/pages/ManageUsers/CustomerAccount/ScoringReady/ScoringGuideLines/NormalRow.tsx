import React from 'react';

interface Props {
  data: {
    parameter: string;
    rowData: string[];
    styles?: any[];
    headerStyle?: any;
  };
}
function NormalRow(props: Props) {
  const { parameter, rowData, styles, headerStyle } = props.data;
  return (
    <div className="flex">
      <div
        className="text-[#6B7A99] font-medium w-1/4 px-6 border-r border-r-[#D7E2EE] pt-6"
        style={headerStyle ? headerStyle : {}}
      >
        {parameter}
      </div>
      {rowData.map((item, index) => {
        return (
          <div
            className={`font-medium w-1/4 px-6 border-r border-r-[#D7E2EE] pt-6`}
            style={styles ? styles[index] : {}}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}

export default NormalRow;
