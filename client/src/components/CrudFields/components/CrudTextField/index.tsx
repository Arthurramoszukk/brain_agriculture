import React from 'react';
import { Grid, TextField } from '@mui/material';
import { UseFormGetValues, UseFormRegister, Controller } from 'react-hook-form';

interface CrudTextFieldProps {
  readonly register: UseFormRegister<any>;
  readonly model: string;
  readonly getValues?: UseFormGetValues<any>;
  readonly control?: any;
}

export default function CrudTextField({ register, model, getValues, control } : CrudTextFieldProps) {
  const registeredModelFormField = register(model);
  
  return (
    <Grid item xs={4}>
      <Controller
        {...registeredModelFormField }
        name={model}
        control={control}
        defaultValue={(getValues && getValues( model )) ?? ''}
        render={(props) => {
          return (
            <TextField
              {...props.field}
              label={model}
              margin='normal'
              fullWidth
              type={'text'}
              sx={{ mt: 0 }}
              InputLabelProps={{
                shrink: (getValues && !getValues( model )),
              }}
            />
          )
        }}
      />
    </Grid>
  )
}