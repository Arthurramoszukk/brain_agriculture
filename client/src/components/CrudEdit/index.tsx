import React, { useEffect, useState } from 'react';
import { SubmitHandler, UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { CardActions, Grid, TextField } from '@mui/material';
import LoopIcon from '@mui/icons-material/Loop';
import CrudFields from '../CrudFields';
import ICrudEditParams from './interfaces/ICrudEditParams';
import Layout from '../Layout';
import InternalHeader from '../Layout/components/InternalHeader';
import InternalContent from '../Layout/components/InternalContent';
import ButtonForm from '../ButtonForm';

interface ICreateField {
  readonly name: string,
  readonly type: string,
  readonly model?: string,
}

interface CrudEditProps {
  readonly model: string,
  readonly fields: ICreateField[],
  readonly register: UseFormRegister<any>,
  readonly handleSubmit: any,
  readonly control: any,
  readonly messageSuccess: string,
  readonly title: string,
  readonly setFormValue: UseFormSetValue<any>,
  readonly getValues: UseFormGetValues<any>
}

export default function CrudEdit({model, fields, register, handleSubmit, control, messageSuccess, title, setFormValue, getValues}: CrudEditProps) {
  const history = useHistory();
  const { id } = useParams<ICrudEditParams>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/data/${id}`);
        if (!response.ok) {
          throw new Error('Erro de conexão!');
        }

        const data = await response.json();
        fields.forEach((params) =>{
          setFormValue(params.name, data[params.name]);
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, fields, setFormValue]);

  const handleCancelButton = () => {
    history.push(`/${model}`);
  }

  const onSubmit:SubmitHandler<any> = async (params) => {
    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar os dados.');
      }

      alert('Dados atualizados com sucesso!');
      setTimeout(() => history.push(`/${model}`), 1000);
    } catch (error) {
      console.error('Erro ao atualizar os dados:', error);
    } finally {
      setLoading(false);
    }
  }

  return(
    <Layout marginLayout={true}>
      <InternalHeader title={title} />
      <InternalContent expandButton={false}>
        <div style={{ height: 320, width: '100%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
          
            <Grid container spacing={2}>
              <CrudFields fields={fields} register={register} control={control} setFormValue={setFormValue} />
            </Grid>
    
            <CardActions>                
              <ButtonForm type='cancel' onClick={handleCancelButton}>
                { 'Cancelar' }
              </ButtonForm>
              <ButtonForm type='submit'>
                <LoopIcon className='load-icon' sx={{ display: loading ? 'block' : 'none'}} />
                { loading ? 'Atualizando' : 'Atualizar' }
              </ButtonForm>
            </CardActions>
          
          </form>
        </div>
      </InternalContent>
    </Layout>
  );
}