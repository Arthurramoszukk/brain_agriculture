import React from 'react';
import { Grid, TextField, FormHelperText } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CrudVegetationAreaFieldProps {
  readonly control: any;
  readonly name: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
  readonly error: string;
}

export default function CrudVegetationAreaField({ control, name, value, onChange, error }: CrudVegetationAreaFieldProps) {
  return (
    <>
      <Grid item xs={4}>
        <Controller
          name={name}
          control={control}
          defaultValue={value}
          render={({ field }) => (
            <TextField
              {...field}
              label={name}
              type='number'
              fullWidth
              margin='normal'
              onChange={(e) => {
                const newValue = parseFloat(e.target.value) || 0;
                onChange(newValue);
                field.onChange(newValue);
              }}
              value={value}
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