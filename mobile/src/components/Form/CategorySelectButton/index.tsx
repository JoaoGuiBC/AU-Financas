import React from 'react';

import { Container, CategoryTitle, Icon } from './styles';

interface CategorySelectButtonProps {
  title: string;
}

const CategorySelectButton: React.FC<CategorySelectButtonProps> = ({ title }) => {
  return (
    <Container activeOpacity={0.5}>
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down" />
    </Container>
  );
}

export { CategorySelectButton };