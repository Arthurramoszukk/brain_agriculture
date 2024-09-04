import React, { useState } from 'react';
import { Control, UseFormGetValues, UseFormSetValue, UseFormRegister } from "react-hook-form/dist/types/form";
import CrudTextField from './components/CrudTextField';
import CrudSelectField from './components/CrudSelectField';
import CrudAreaField from './components/CrudAreaField';
import CrudMultiField from './components/CrudMultiField';

interface ICrudGeneratorFields{
  readonly fields: Array<Object>,
  readonly register: UseFormRegister<any>,
  readonly control?: Control,
  readonly getValues?: UseFormGetValues<any>,
  readonly setFormValue: UseFormSetValue<any>,
}

export default function CrudFields({ fields, register, control, getValues, setFormValue }: ICrudGeneratorFields) {
  function createFields(param: any, index: any) {
    if (param.type == 'string') {
      return <CrudTextField key={index} getValues={ getValues } register={register} model={param.name} control={control} mask={param.mask} placeholder={param.placeholder} />
    } else if (param.type == 'select') {
      return <CrudSelectField key={index} control={control} register={register} setValue={setFormValue} nameState="Estato" nameCity="Cidade" />
    } else if (param.type == 'number') {
      return <CrudAreaField key={index} control={control} register={register} nameTotalArea={'Área total da Fazendasdasdsa em ha'} nameAgricultureArea={'Área de agricultura em ha'} nameVegetationArea={'Área de vegetação em ha'} />
    } else {
      return <CrudMultiField key={index} getValues={ getValues } control={control}  register={register} model={param.name} />
    }
  }

  return(
    <>
      {fields.map(createFields)}
    </>
  );
}