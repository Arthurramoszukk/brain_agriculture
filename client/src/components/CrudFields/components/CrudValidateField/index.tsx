import React, { useState } from 'react';
import { Grid, TextField, FormHelperText } from '@mui/material';
import { UseFormGetValues, UseFormRegister, Controller } from 'react-hook-form';
import { cpf, cnpj } from 'cpf-cnpj-validator';

interface CrudValidadeFieldProps {
  readonly register: UseFormRegister<any>;
  readonly model: string;
  readonly getValues?: UseFormGetValues<any>;
  readonly control?: any;
}

export default function CrudValidateField({ register, model,getValues, control }: CrudValidadeFieldProps) {
  const [error, setError] = useState<string | null>(null);

  const handleValidation = (value: string) => {
    const trimmedValue = value.replace(/\D/g, '');
    if (trimmedValue.length === 11) {
      if (!cpf.isValid(trimmedValue)) {
        setError('CPF inválido');
      } else {
        setError(null);
      }
    } else if (trimmedValue.length === 14) {
      if (!cnpj.isValid(trimmedValue)) {
        setError('CNPJ inválido');
      } else {
        setError(null);
      }
    } else {
      setError('Número inválido');
    }
  };

  const registeredModelFormField = register(model);

  return (
    <Grid item xs={4}>
      <Controller
        {...registeredModelFormField}
        name={model}
        control={control}
        defaultValue={(getValues && getValues(model)) ?? ''}
        render={({ field }) => (
          <>
            <TextField
              {...field}
              label={model}
              margin='normal'
              fullWidth
              type={'text'}
              sx={{ mt: 0 }}
              InputLabelProps={{
                shrink: Boolean(field.value),
              }}
              inputProps={{ maxLength: 14 }}
              onChange={(e) => {
                field.onChange(e);
                handleValidation(e.target.value);
              }}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
          </>
        )}
      />
    </Grid>
  );
}