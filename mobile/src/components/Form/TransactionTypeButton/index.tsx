import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import {
  Container,
  Icon,
  Title,
} from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  title: string;
  type: 'deposit' | 'withdraw';
  isActive: boolean;
}

const icons = {
  deposit: 'arrow-up-circle',
  withdraw: 'arrow-down-circle',
}

const TransactionTypeButton: React.FC<TransactionTypeButtonProps> = ({
  title,
  type,
  isActive,
  ...rest
}) => {
  return (
    <Container activeOpacity={0.5} type={type} isActive={isActive} {...rest}>
      <Icon name={icons[type]} type={type} />
      <Title>{title}</Title>
    </Container>
  );
}

export { TransactionTypeButton };