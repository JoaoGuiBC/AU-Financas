import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
  return (
    <Container {...rest} activeOpacity={0.8}>
      <Title>{title}</Title>
    </Container>
  );
}

export { Button };