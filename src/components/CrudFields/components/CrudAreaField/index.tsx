import React, { useState } from 'react';
import { Grid, TextField, FormHelperText } from '@mui/material';
import { UseFormGetValues, UseFormRegister, Controller } from 'react-hook-form';

interface CrudAreaFieldProps {
  readonly register: UseFormRegister<any>;
  readonly control: any;
  readonly nameTotalArea: string;
  readonly nameAgricultureArea: string;
  readonly nameVegetationArea: string;
  readonly getTotalValues?: UseFormGetValues<any>;
  readonly getAgroValues?: UseFormGetValues<any>;
  readonly getVegValues?: UseFormGetValues<any>;
}

export default function CrudAreaField(props: CrudAreaFieldProps) {
  const { register, control, nameTotalArea, nameAgricultureArea, nameVegetationArea, getTotalValues, getAgroValues, getVegValues } = props;

  // Set initial values to 0 if no values are provided
  const totalInitialValue = getTotalValues ? parseFloat(getTotalValues(nameTotalArea)) || 0 : 0;
  const agricultureInitialValue = getAgroValues ? parseFloat(getAgroValues(nameAgricultureArea)) || 0 : 0;
  const vegetationInitialValue = getVegValues ? parseFloat(getVegValues(nameVegetationArea)) || 0 : 0;

  const [totalArea, setTotalArea] = useState<number>(totalInitialValue);
  const [agricultureArea, setAgricultureArea] = useState<number>(agricultureInitialValue);
  const [vegetationArea, setVegetationArea] = useState<number>(vegetationInitialValue);
  const [error, setError] = useState<string>('');

  const handleTotalAreaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(event.target.value) || 0;
    setTotalArea(value);
    validateAreas(value, agricultureArea, vegetationArea);
  };

  const handleAgricultureAreaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(event.target.value) || 0;
    setAgricultureArea(value);
    validateAreas(totalArea, value, vegetationArea);
  };

  const handleVegetationAreaChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = parseFloat(event.target.value) || 0;
    setVegetationArea(value);
    validateAreas(totalArea, agricultureArea, value);
  };

  const validateAreas = (total: number, agriculture: number, vegetation: number) => {
    if (agriculture + vegetation > total) {
      setError('A soma da área de agricultura e da área de vegetação não pode ultrapassar a área total da fazenda.');
    } else {
      setError('');
    }
  };

  return (
    <>
      <Grid item xs={4}>
        <Controller
          name={nameTotalArea}
          control={control}
          defaultValue={totalArea}
          render={({ field }) => (
            <TextField
              {...field}
              label={nameTotalArea}
              type='number'
              fullWidth
              margin='normal'
              sx={{ mt: 0 }}
              onChange={(e) => {
                handleTotalAreaChange(e);
                field.onChange(parseFloat(e.target.value) || 0);
              }}
              value={totalArea}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name={nameAgricultureArea}
          control={control}
          defaultValue={agricultureArea}
          render={({ field }) => (
            <TextField
              {...field}
              label={nameAgricultureArea}
              type='number'
              fullWidth
              margin='normal'
              sx={{ mt: 0 }}
              onChange={(e) => {
                handleAgricultureAreaChange(e);
                field.onChange(parseFloat(e.target.value) || 0);
              }}
              value={agricultureArea}
            />
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name={nameVegetationArea}
          control={control}
          defaultValue={vegetationArea}
          render={({ field }) => (
            <TextField
              {...field}
              label={nameVegetationArea}
              type='number'
              fullWidth
              margin='normal'
              sx={{ mt: 0 }}
              onChange={(e) => {
                handleVegetationAreaChange(e);
                field.onChange(parseFloat(e.target.value) || 0);
              }}
              value={vegetationArea}
            />
          )}
        />
      </Grid>
      {error && (
        <Grid item xs={12}>
          <FormHelperText error>{error}</FormHelperText>
        </Grid>
      )}
    </>
  );
}