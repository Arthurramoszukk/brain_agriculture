import React from 'react';
import { useForm } from 'react-hook-form';
import CrudCreate from '../../../components/CrudCreate';

interface IFarm {
  readonly id: number;
  readonly doc: string;
  readonly nomeProdutor: string;
  readonly nomeFazenda: string;
  readonly estato: number;
  readonly cidade: number;
  readonly culturas: Array<String>[];
  readonly areaTotal: number;
  readonly areaAgro: number;
  readonly areaVeg: number;
}

export default function Create() {
  const {register, handleSubmit, control, setValue } = useForm<IFarm>();
  const fields = [
      { name: 'CPF ou CNPJ', type: 'string', mask: '999.999.999-99' },
      { name: 'Nome do produtor', type: 'string' },
      { name: 'Nome da Fazenda', type: 'string' },
      { name: 'Estado e Cidade', type: 'select' },      
      { name: 'Culturas plantadas', type: 'multi' },
      { name: 'Área', type: 'number' },
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
      setFormValue={setValue}
    />
  );
}