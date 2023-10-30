import { TextField } from '@mui/material';
import editIcon from 'assets/icons/edit.svg';
import styled from 'styled-components';

const Value = styled('div')({
  fontSize: '16px',
  color: '#202A42',
  lineHeight: '30px',
  fontWeight: 500,
  '&.active': {
    fontWeight: '700!important',
  },
});

const InputStyle = styled('div')({
  width: '80px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: 'white!important',
    height: '35px',
    width: 'max-content',
  },
  '& .MuiInputBase-root': {
    borderBottomColor: 'unset',
    borderRadius: '8px',
    border: '1px solid #C3CAD9',
    width: 'auto',
  },
  '& .MuiInputBase-root:before': {
    right: 'unset',
    content: '""',
    border: 'unset',
    '&.focus': {
      border: 'unset',
    },
  },
  '& .MuiInput-root:after': {
    border: 'unset!important',
  },
  '& .MuiInput-root:before': {
    border: 'unset!important',
  },
});

interface IsEdit {
  label: string;
  isEdit: boolean;
}

interface Props {
  isEdit?: IsEdit;
  setIsEdit: (value: IsEdit) => void;
  value: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  name: string;
  disabled?: boolean;
}

const EditableValueByPercent = (props: Props) => {
  const { isEdit, value, setIsEdit, disabled, onChange, name } = props;

  const handleOpenEdit = (name: string) => {
    setIsEdit({
      label: name,
      isEdit: true,
    });
  };

  return isEdit?.label === name && isEdit.isEdit && !disabled ? (
    <InputStyle>
      <TextField
        aria-describedby="my-helper-text"
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        onBlur={() => {
          setIsEdit({
            label: name,
            isEdit: false,
          });
        }}
      />
    </InputStyle>
  ) : (
    <div className="flex">
      <Value>{value.split('%').join('')}</Value>
      {!disabled && (
        <img
          className="ml-3 cursor-pointer"
          alt=""
          width={20}
          height={20}
          src={editIcon}
          onClick={() => {
            handleOpenEdit(name);
          }}
        />
      )}
    </div>
  );
};

export default EditableValueByPercent;
