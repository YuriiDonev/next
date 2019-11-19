import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';

export default function FormGroupComponent ({ title, type, name, value, onChangeHandler }) {
  return <FormGroup>
    <Label>{title}</Label>
    <Input
      type={type}
      name={name}
      value={value}
      onChange={onChangeHandler}
    />
  </FormGroup>;
}
