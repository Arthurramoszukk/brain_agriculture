import React from 'react';
import { useForm } from 'react-hook-form';
import CrudCreate from '../../../components/CrudCreate';
import IFarm from '../interfaces/IFarm';

export default function Create() {
  const {register, handleSubmit, control, setValue:setFormValue } = useForm<IFarm>();

  const fields = [
    { name: 'CPF ou CNPJ', type: 'string' },
    { name: 'Nome do produtor', type: 'string' },
    { name: 'Nome da Fazenda', type: 'string' },
    { name: 'Estado', type: 'select' }, 
    { name: 'Cidade', type: 'select' },      
    { name: 'Culturas plantadas', type: 'multi' },
    { name: 'Área total da Fazenda em ha', type: 'number' },
    { name: 'Área de agricultura em ha', type: 'number' },
    { name: 'Área de vegetação em ha', type: 'number' },
  ];

  return (
    <CrudCreate 
      model={'entry-farms'} 
      fields={fields} 
      register={register} 
      handleSubmit={handleSubmit} 
      control={control} 
      messageSuccess={'Sucesso! Fazenda adicionada.'}  
      title={'Adicionar Fazenda'}
      setFormValue={setFormValue}
    />
  );
}