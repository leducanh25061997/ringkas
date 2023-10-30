import React from 'react';
interface Props {
  label: string;
  value: string | number;
}
function ItemRow({ label, value }: Props) {
  return (
    <div className="flex leading-5 mb-6">
      <p className="font-medium text-[#6B7A99] w-[45%]">{label}</p>
      <p className="font-medium text-[#202A42] w-[55%]">{value ?? '-'}</p>
    </div>
  );
}

export default ItemRow;
