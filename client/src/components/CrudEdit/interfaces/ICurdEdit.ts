import { FieldValues } from "react-hook-form";
import { Control, UseFormHandleSubmit, UseFormRegister } from "react-hook-form/dist/types/form";

export default interface ICrudEdit{
  readonly model: string,
  readonly field: Array<object>,
  readonly register: UseFormRegister<FieldValues>, 
  readonly handleSubmit: UseFormHandleSubmit<FieldValues>, 
  readonly control: Control<FieldValues>,
  readonly title: string,
}