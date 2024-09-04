import React from 'react';
import { Grid, TextField } from '@mui/material';
import { UseFormGetValues, UseFormRegister, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

interface CrudTextFieldProps {
  readonly register: UseFormRegister<any>;
  readonly model: string;
  readonly mask?: any | undefined;
  readonly getValues?: UseFormGetValues<any>;
  readonly passwd?: boolean;
  readonly control?: any;
  readonly placeholder?: string;
}

export default function CrudTextField(props: CrudTextFieldProps) {
  const { register, model, mask, getValues, passwd = false, control, placeholder } = props;
  const registeredModelFormField = register(model);
  
  return (
    <Grid item xs={4}>
      { mask ?
        <Controller
          {...registeredModelFormField }
          name={model}
          control={control}
          defaultValue={(getValues && getValues( model )) ?? ''}
          render={(props) => {
            return (
              <InputMask 
                {...props.field}
                mask={`${mask}`}
                value={props.field.value}
                maskChar="_"
              >
                <TextField 
                  fullWidth
                  label={model}
                  margin='normal'
                  defaultValue={(getValues && getValues( model )) ?? ''}
                  sx={{ mt: 0 }}
                  InputLabelProps={{
                    shrink: (props.field.value ?? ''),
                  }}
                />
              </InputMask> 
            )}
          }
        />
        :
        <TextField
          {...registeredModelFormField }
          label={model}
          margin='normal'
          fullWidth
          type={passwd ? 'password' : 'text'}
          defaultValue={(getValues && getValues( model )) ?? ''}
          sx={{ mt: 0 }}
          InputLabelProps={{
            shrink: (getValues && !getValues( model )),
          }}
        />
      }
    </Grid>
  )
}