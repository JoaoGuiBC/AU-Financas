import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, CategoryTitle, Icon } from './styles';

interface CategorySelectButtonProps extends RectButtonProps {
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