import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Grid } from '@mui/material';
import { UseFormGetValues, UseFormRegister, Controller } from 'react-hook-form';

interface CrudMultiFieldProps {
  readonly register: UseFormRegister<any>;
  readonly model: string;
  readonly options?: string[];
  readonly getValues?: UseFormGetValues<any>;
  readonly control?: any;
}

export default function CrudMultiField(props: CrudMultiFieldProps) {
  const { register, model, getValues, control } = props;
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const registeredModelFormField = register(model);

  const listOptions = [
    { key: 1, value: 1, label: 'Soja' },
    { key: 2, value: 2, label: 'Milho' },
    { key: 3, value: 3, label: 'Algodão' },
    { key: 4, value: 4, label: 'Café' },
    { key: 5, value: 5, label: 'Cana de Açúcar' }
  ]

  useEffect(() => {
    if (getValues) {
      const values = getValues(model) || [];
      setSelectedItems(values);
    }
  }, [getValues, model]);

  return (
    <Grid item xs={4}>
      <Controller
        {...registeredModelFormField }
        name={model}
        control={control}
        defaultValue={selectedItems}
        render={({ field }) => (
          <Autocomplete
            {...field}
            multiple
            options={listOptions}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onChange={(event, newValue) => {
              field.onChange(newValue.map(item => item.value)); // Atualiza o campo com os valores selecionados
              setSelectedItems(newValue); // Atualiza o estado local com os itens selecionados
            }}
            value={listOptions.filter(option => field.value.includes(option.value))} // Filtra as opções selecionadas
            renderInput={(params) => (
              <TextField
                {...params}
                label={model}
                margin="normal"
                variant="outlined"
                fullWidth
                sx={{ mt: 0 }}
              />
            )}
          />
        )}
      />
    </Grid>
  );
}