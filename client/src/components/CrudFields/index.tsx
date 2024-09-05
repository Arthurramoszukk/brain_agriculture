import React, { useState, useEffect } from 'react';
import { Control, UseFormGetValues, UseFormSetValue, UseFormRegister } from "react-hook-form/dist/types/form";
import CrudTextField from './components/CrudTextField';
import CrudMultiField from './components/CrudMultiField';
import CrudStateSelectField from './components/CrudStateSelectField';
import CrudCitySelectField from './components/CrudCitySelectField';
import CrudTotalAreaField from './components/CrudTotalAreaField';
import CrudAgricultureAreaField from './components/CrudAgricultureAreaField';
import CrudVegetationAreaField from './components/CrudVegetationAreaField';

interface ICrudGeneratorFields{
  readonly fields: Array<Object>,
  readonly register: UseFormRegister<any>,
  readonly control?: Control,
  readonly getValues?: UseFormGetValues<any>,
  readonly setFormValue: UseFormSetValue<any>,
}

export default function CrudFields({ fields, register, control, getValues, setFormValue }: ICrudGeneratorFields) {
  const [selectedState, setSelectedState] = React.useState<string>('');
  const [totalArea, setTotalArea] = useState<number>(0);
  const [agricultureArea, setAgricultureArea] = useState<number>(0);
  const [vegetationArea, setVegetationArea] = useState<number>(0);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    console.log("entrou", control)
    if (getValues) {
      const initialTotalArea = parseFloat(getValues('Área total da Fazenda em ha')) || 0;
      const initialAgricultureArea = parseFloat(getValues('Área de agricultura em ha')) || 0;
      const initialVegetationArea = parseFloat(getValues('Área de vegetação em ha')) || 0;

      setTotalArea(initialTotalArea);
      setAgricultureArea(initialAgricultureArea);
      setVegetationArea(initialVegetationArea);

      validateAreas(initialTotalArea, initialAgricultureArea, initialVegetationArea);
    }
  }, [getValues]);

  function validateAreas(total: number, agriculture: number, vegetation: number) {
    if (agriculture + vegetation > total) {
      setError('A soma da área de agricultura e da área de vegetação não pode ultrapassar a área total da fazenda.');
    } else {
      setError('');
    }
  }

  function handleTotalAreaChange(value: number) {
    setTotalArea(value);
    validateAreas(value, agricultureArea, vegetationArea);
    setFormValue('Área total da Fazenda em ha', value);
  }

  function handleAgricultureAreaChange(value: number) {
    setAgricultureArea(value);
    validateAreas(totalArea, value, vegetationArea);
    setFormValue('Área de agricultura em ha', value);
  }

  function handleVegetationAreaChange(value: number) {
    setVegetationArea(value);
    validateAreas(totalArea, agricultureArea, value);
    setFormValue('Área de vegetação em ha', value);
  }

  function createFields(param: any, index: any) {
    if (param.type == 'string') {
      return <CrudTextField key={index} getValues={ getValues } register={register} model={param.name} control={control} mask={param.mask} placeholder={param.placeholder} />
    } else if (param.type == 'select') {
      if (param.name == 'Estado') {
        return <CrudStateSelectField key={index} control={control} setValue={setFormValue} nameState={param.name} onStateChange={setSelectedState} />
      } else {
        return <CrudCitySelectField key={index} control={control} setValue={setFormValue} nameCity={param.name} selectedState={selectedState} />
      }
    } else if (param.type == 'number') {
      if (param.name === 'Área total da Fazenda em ha') {
        return <CrudTotalAreaField key={index} control={control} model={param.name} value={totalArea} onChange={handleTotalAreaChange} />;
      } else if (param.name === 'Área de agricultura em ha') {
        return <CrudAgricultureAreaField key={index} control={control} name={param.name} value={agricultureArea} onChange={handleAgricultureAreaChange} />;
      } else if (param.name === 'Área de vegetação em ha') {
        return <CrudVegetationAreaField key={index} control={control} name={param.name} value={vegetationArea} onChange={handleVegetationAreaChange} error={error} />;
      } 
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