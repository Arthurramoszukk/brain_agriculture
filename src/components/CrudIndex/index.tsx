import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import Layout from '../Layout';
import InternalHeader from '../Layout/components/InternalHeader';
import InternalContent from '../Layout/components/InternalContent';
import ButtonRound from '../RoundButton';

interface ICrudIndex {
  readonly model: string,
  readonly title: string,
  readonly exceptColumns?: Array<string>,
  readonly forceShowColumns?: Array<string>,
  readonly aliasLabel?: AliasLabelProps[],
}

type AliasLabelProps = {
  readonly column: string;
  readonly label: string;
}

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'firstName', headerName: 'First name', width: 150 },
  { field: 'lastName', headerName: 'Last name', width: 150 },
  { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  { field: 'fullName', headerName: 'Full name', description: 'This column has a value getter.', width: 160, 
    valueGetter: (params: any) => `${params.row.firstName || ''} ${params.row.lastName || ''}`, 
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export default function CrudIndex({ model, title } : ICrudIndex) {
  const history = useHistory();
  const handleCreateClick = () => {
    history.push(`/${model}/create`);
  }

  return (
    <Layout marginLayout={true}>
      <InternalHeader title={title} action={
          <ButtonRound onClick={handleCreateClick}>
            <AddIcon color="primary" />
          </ButtonRound>
        } 
      />
      <InternalContent expandButton={false}>
        <Typography variant="body2" color="text.secondary"></Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid 
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        </div>
      </InternalContent>
    </Layout>
  );
}