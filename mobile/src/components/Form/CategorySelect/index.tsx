import React from 'react';

import { Container, CategoryTitle, Icon } from './styles';

interface CategorySelectProps {
  title: string;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ title }) => {
  return (
    <Container activeOpacity={0.5}>
      <CategoryTitle>{title}</CategoryTitle>
      <Icon name="chevron-down" />
    </Container>
  );
}

export { CategorySelect };