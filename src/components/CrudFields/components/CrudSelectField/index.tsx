import React, { useEffect, useState } from 'react';
import { Controller, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel, Grid, SelectChangeEvent } from '@mui/material';
import locationsData from '../../../../utils/locations.json';

interface State {
  [key: string]: string;
}

interface City {
  state_id: number;
  id: number;
  name: string;
}

interface Locations {
  states: State;
  cities: City[];
}

interface CrudSelectFieldProps {
  readonly control: any;
  readonly register: UseFormRegister<any>;
  readonly setValue: UseFormSetValue<any>;
  readonly nameState: string;
  readonly nameCity: string;
}

export default function CrudSelectField({ control, register, setValue, nameState, nameCity }: CrudSelectFieldProps) {
  const [states, setStates] = useState<State>({});
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');

  useEffect(() => {
    const data = locationsData as Locations;
    setStates(data.states);
    setCities(data.cities);
  }, []);

  const filteredCities = cities.filter(city => city.state_id.toString() === selectedState);

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const state = event.target.value as string;
    setSelectedState(state);
    setSelectedCity('');
    setValue(nameState, state);
    setValue(nameCity, '');
  };

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    const city = event.target.value as string;
    setSelectedCity(city);
    setValue(nameCity, city);
  };

  return (
    <>
      <Grid item xs={4}>
        <Controller
          name={nameState}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                {...field}
                value={selectedState}
                onChange={(event) => {
                  handleStateChange(event as SelectChangeEvent<string>);
                  field.onChange(event);
                }}
                label="Estado"
              >
                {Object.entries(states).map(([id, name]) => (
                  <MenuItem key={id} value={id}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Grid>
      <Grid item xs={4}>
        <Controller
          name={nameCity}
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel>Cidade</InputLabel>
              <Select
                {...field}
                value={selectedCity}
                onChange={(event) => {
                  handleCityChange(event as SelectChangeEvent<string>);
                  field.onChange(event);
                }}
                label="Cidade"
                disabled={!selectedState}
              >
                {filteredCities.map(city => (
                  <MenuItem key={city.id} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      </Grid>
    </>
  );
}