import React, { useEffect, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { MenuItem, Select, FormControl, InputLabel, Grid, SelectChangeEvent } from '@mui/material';
import locationsData from '../../../../utils/locations.json';

interface City {
  state_id: number;
  id: number;
  name: string;
}

interface CitySelectFieldProps {
  readonly control: any;
  readonly setValue: any;
  readonly nameCity: string;
  readonly selectedState: string;
}

export default function CrudCitySelectField({ control, setValue, nameCity, selectedState }: CitySelectFieldProps) {
  const [cities, setCities] = useState<City[]>([]);
  const currentCity = useWatch({ name: nameCity, control });

  useEffect(() => {
    const data = locationsData;
    setCities(data.cities);
  }, []);

  useEffect(() => {
    if (selectedState && cities.length > 0) {
      const defaultCity = cities.find(city => city.state_id.toString() === selectedState)?.name || '';
      setValue(nameCity, defaultCity);
    }
  }, [selectedState, cities, nameCity, setValue]);

  const filteredCities = cities.filter(city => city.state_id.toString() === selectedState);

  const handleCityChange = (event: SelectChangeEvent<string>) => {
    const city = event.target.value as string;
    setValue(nameCity, city);
  };

  return (
    <Grid item xs={4}>
      <Controller
        name={nameCity}
        control={control}
        defaultValue={currentCity || ''}
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel>Cidade</InputLabel>
            <Select
              {...field}
              value={currentCity || ''}
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
  );
}