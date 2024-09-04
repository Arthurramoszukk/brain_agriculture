import React, { useState } from 'react';
import { SubmitHandler, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { CardActions, Grid, TextField } from '@mui/material';
import CrudFields from '../CrudFields';
import LoopIcon from '@mui/icons-material/Loop';
import Layout from '../Layout';
import InternalHeader from '../Layout/components/InternalHeader';
import InternalContent from '../Layout/components/InternalContent';
import ButtonForm from '../ButtonForm';

interface ICreateField {
  readonly name: string,
  readonly type: string,
  readonly mask?: string,
  readonly model?: string,
  readonly placeholder?: string
}

interface CrudCreateProps {
  readonly model: string,
  readonly fields: ICreateField[],
  readonly register: UseFormRegister<any>,
  readonly handleSubmit: any,
  readonly control: any,
  readonly messageSuccess: string,
  readonly title: string,
  readonly setFormValue: UseFormSetValue<any>,
  readonly afterSave?: (params: any) => void,
}

export default function CrudCreate({model, fields, register, handleSubmit, control, messageSuccess, title, setFormValue, afterSave}: CrudCreateProps) {
  const history = useHistory();
  const [loading, setLoading] = useState<number>(0);

  const handleCancelButton = () => {
    history.push(`/${model}`);
  }

  const onSubmit:SubmitHandler<any> = async (params) => {
    console.log(params)
    setLoading(1);
  
    try {
      await fetch('http://localhost:3001/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      setLoading(0);
      alert(messageSuccess);
      if (afterSave) afterSave(params);
      setTimeout(() => history.push(`/${model}`), 1000);
    } catch (error) {
      console.error('Error:', error);
      setLoading(0);
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
                { loading ? 'Salvando' : 'Salvar' }
              </ButtonForm>
            </CardActions>
          
          </form>
        </div>
      </InternalContent>
    </Layout>
  );
}