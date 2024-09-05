import React from 'react';
import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface CrudTotalAreaFieldProps {
  readonly control: any;
  readonly model: string;
  readonly value: number;
  readonly onChange: (value: number) => void;
}

export default function CrudTotalAreaField({ control, model, value, onChange }: CrudTotalAreaFieldProps) {
  return (
    <Grid item xs={4}>
      <Controller
        name={model}
        control={control}
        defaultValue={value}
        render={({ field }) => (
          <TextField
            {...field}
            label={model}
            type='number'
            fullWidth
            margin='normal'
            defaultValue={value}
            onChange={(e) => {
              const newValue = parseFloat(e.target.value) || 0;
              onChange(newValue);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </Grid>
  );
}