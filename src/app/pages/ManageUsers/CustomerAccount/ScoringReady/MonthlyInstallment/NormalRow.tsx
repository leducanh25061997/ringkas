import React from 'react';
interface Props {
  data: {
    parameter: string;
    rowData: string[];
    styles?: any[];
    headerStyle?: any;
    backgroundColor: string;
  };
}
function NormalRow(props: Props) {
  const { parameter, rowData, styles, headerStyle, backgroundColor } =
    props.data;
  return (
    <div className="flex" style={{ backgroundColor: `${backgroundColor}` }}>
      <div
        className="text-[#000] text-[16px] font-medium w-1/4 p-6"
        style={headerStyle ? headerStyle : {}}
      >
        {parameter}
      </div>
      {rowData.map((item, index) => {
        return (
          <div
            className={`text-[#000] font-medium w-1/4 p-6 text-[16px]`}
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
