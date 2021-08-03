import React from 'react';
import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';

import { Container, Title } from './styles';

interface ButtonProps extends TouchableWithoutFeedbackProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, ...rest }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container {...rest} activeOpacity={0.8}>
        <Title>{title}</Title>
      </Container>
    </TouchableWithoutFeedback>
  );
}

export { Button };