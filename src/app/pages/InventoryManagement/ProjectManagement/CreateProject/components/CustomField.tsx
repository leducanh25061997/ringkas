import { Button } from '@mui/material';
import styled from 'styled-components';
import DeleteIcon from 'assets/icons/delete-icon.svg';
import EditIcon from 'assets/icons/edit-icon.svg';

interface Props {
  text: string;
  handleEdit: (value: number) => void;
  handleDelete: (value: number) => void;
  id: number;
}

const EditData = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #d7e2ee;
  height: 60px;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 16px;
  background: white;
`;

export const CustomField = (props: Props) => {
  const { text, id, handleEdit, handleDelete } = props;
  return (
    <EditData>
      <div>{text}</div>
      <div style={{ alignSelf: 'center' }}>
        <Button onClick={e => handleEdit(id)}>
          <img src={EditIcon} alt="edit icon" />
        </Button>
        <Button onClick={e => handleDelete(id)}>
          <img src={DeleteIcon} alt="delete icon" />
        </Button>
      </div>
    </EditData>
  );
};
