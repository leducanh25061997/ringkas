import { TextField } from '@mui/material';
import editIcon from 'assets/icons/edit.svg';
import { Control, Controller, FieldValues } from 'react-hook-form';
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

const RootStyle = styled('div')({
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
    padding: '0 1rem',
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
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  name: string;
  control: Control<FieldValues, any>;
  disabled?: boolean;
}

const EditableValue = (props: Props) => {
  const { isEdit, value, setIsEdit, onChange, disabled, name, control } = props;

  const handleOpenEdit = (name: string) => {
    setIsEdit({
      label: name,
      isEdit: true,
    });
  };

  return isEdit?.label === name && isEdit.isEdit && !disabled ? (
    <RootStyle>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextField
              aria-describedby="my-helper-text"
              fullWidth
              value={value}
              onChange={onChange}
              onBlur={() => {
                setIsEdit({
                  label: name,
                  isEdit: false,
                });
              }}
            />
          );
        }}
      />
    </RootStyle>
  ) : (
    <>
      <Value>{value}</Value>
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
    </>
  );
};

export default EditableValue;
