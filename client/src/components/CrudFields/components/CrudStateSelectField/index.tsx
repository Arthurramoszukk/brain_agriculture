import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel, Grid, SelectChangeEvent } from '@mui/material';
import locationsData from '../../../../utils/locations.json';

interface State {
  id: number;
  name: string;
}

interface StateSelectFieldProps {
  readonly control: any;
  readonly setValue: any;
  readonly nameState: string;
  readonly onStateChange: (state: string) => void;
}

export default function CrudStateSelectField({ control, setValue, nameState, onStateChange }: StateSelectFieldProps) {
  const [states, setStates] = useState<State[]>([]);

  const listStates = [
    {id: 12, name: "Acre"},
    {id: 27, name: "Alagoas"},
    {id: 16, name: "Amapá"},
    {id: 13, name: "Amazonas"},
    {id: 29, name: "Bahia"},
    {id: 23, name: "Ceará"},
    {id: 53, name: "Distrito Federal"},
    {id: 32, name: "Espírito Santo"},
    {id: 52, name: "Goiás"},
    {id: 21, name: "Maranhão"},
    {id: 51, name: "Mato Grosso"},
    {id: 50, name: "Mato Grosso do Sul"},
    {id: 31, name: "Minas Gerais"},
    {id: 15, name: "Pará"},
    {id: 25, name: "Paraíba"},
    {id: 41, name: "Paraná"},
    {id: 26, name: "Pernambuco"},
    {id: 22, name: "Piauí"},
    {id: 33, name: "Rio de Janeiro"},
    {id: 24, name: "Rio Grande do Norte"},
    {id: 43, name: "Rio Grande do Sul"},
    {id: 11, name: "Rondônia"},
    {id: 14, name: "Roraima"},
    {id: 42, name: "Santa Catarina"},
    {id: 35, name: "São Paulo"},
    {id: 28, name: "Sergipe"},
    {id: 17, name: "Tocantins"}
  ];

  useEffect(() => {
    const data = locationsData;
    setStates(data.states);
  }, []);

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const state = event.target.value as string;
    const stateId = getStateIdByName(state);
    setValue(nameState, state);
    onStateChange(stateId !== null ? stateId.toString() : '');
  };

  const getStateIdByName = (name: string) => {
    const state = listStates.find(state => state.name === name);
    return state ? state.id : null;
  };

  return (
    <Grid item xs={4}>
      <Controller
        name={nameState}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Estado</InputLabel>
            <Select
              {...field}
              onChange={(event) => {
                handleStateChange(event as SelectChangeEvent<string>);
                field.onChange(event);
              }}
              label="Estado"
            >
              {states.map((state) => (
                <MenuItem key={state.id} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />
    </Grid>
  );
}