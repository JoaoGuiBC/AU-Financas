import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';

import { Container, Error } from './styles';

interface HookFormInput extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

const HookFormInput: React.FC<HookFormInput> = ({ control, name, error, ...rest }) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}

export { HookFormInput };