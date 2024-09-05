import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CrudAgricultureAreaFieldProps {
  readonly control: any;
  readonly name: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export default function CrudAgricultureAreaField({ control, name, value, onChange }: CrudAgricultureAreaFieldProps) {
  return (
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
  );
}