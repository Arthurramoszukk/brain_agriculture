import React, { useEffect, useState } from 'react';
import { useHookstate } from '@hookstate/core';
import { useHistory } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import { DataGrid, GridRenderCellParams  } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Visibility from '@mui/icons-material/Visibility';
import Layout from '../Layout';
import InternalHeader from '../Layout/components/InternalHeader';
import InternalContent from '../Layout/components/InternalContent';
import ButtonRound from '../RoundButton';
import { ConfirmDialog } from '../ConfirmDialog';

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

export default function CrudIndex({ model, title } : ICrudIndex) {
  const history = useHistory();
  const [rows, setRows] = useState<Array<any>>([]);
  const [rowId, setRowId] = useState<any>();
  const openDialog = useHookstate(false);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.05 },
    { field: 'Nome da Fazenda', headerName: 'Fazenda', flex: 0.40 },
    { field: 'Nome do produtor', headerName: 'Produtor', flex: 0.35 },
    { field: 'Área total da Fazendasdasdsa em ha', headerName: 'Área Total', flex: 0.15 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Ações',
      flex: 0.1,
      renderCell: (params: GridRenderCellParams ) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button
            color="primary"
            onClick={() => handleEdit(params.row.id)}
          >
            <EditIcon />
          </Button>
          <Button
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon />
          </Button>
        </div>
      ),
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/data');
        if (!response.ok) {
          throw new Error('Erro de conexão!');
        }
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error('Erro:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateClick = () => {
    history.push(`/${model}/create`);
  };

  function handleEdit(id: number) {
    history.push(`/${model}/edit/${id}`)
  };

  function handleDelete(id: number) {
    handleDialogOpen();
    setRowId(id);
  };

  const handleDialogOpen = () => {
    openDialog.set(true)
  };

  const handleDialogClose = () => {
    openDialog.set(false)
  };

  const handleDialogCloseFunction = async () => {
    if (rowId === undefined) return;
    try {
      const response = await fetch(`http://localhost:3001/data/${rowId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro de conexão!');
      }
      setRows(rows.filter(row => row.id !== rowId));
      handleDialogClose();
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
    }
  };

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
          />
          <ConfirmDialog handleAgree={handleDialogCloseFunction} handleClose={handleDialogClose} open={openDialog} title={'Confirmar'} content={'Confirmar remoção?'} /> 
        </div>
      </InternalContent>
    </Layout>
  );
}