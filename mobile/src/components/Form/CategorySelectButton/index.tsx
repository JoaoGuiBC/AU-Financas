import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, CategoryTitle, Icon } from './styles';

interface CategorySelectButtonProps extends TouchableOpacityProps {
  title: string;
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({
  title,
  ...rest
}) => {
  return (
    <Container activeOpacity={0.5} {...rest}>
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down" />
    </Container>
  );
}

export { CategorySelectButton };