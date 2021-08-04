import React from 'react';

import { categories } from '../../utils/categories';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface TransactionCardData {
  type: 'deposit' | 'withdraw';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData
}

const TransactionCard: React.FC<TransactionCardProps> = ({ data }) => {
  const [category] = categories.filter(item => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'withdraw' && '- '}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}

export { TransactionCard, TransactionCardData };