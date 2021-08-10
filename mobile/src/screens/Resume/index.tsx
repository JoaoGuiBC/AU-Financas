import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
} from './styles';
import { useState } from 'react';

interface TransactionData {
  type: 'deposit' | 'withdraw';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  name: string;
  total: string;
  color: string;
}

const Resume: React.FC = () => {
  const [categoriesTotal, setCategoriesTotal] = useState<CategoryData[]>([]);

  async function loadData() {
    const response = await AsyncStorage.getItem('@aufinancas:transactions');
    const data: TransactionData[] = response ? JSON.parse(response) : [];

    const expenses = data.filter((expense: TransactionData) => expense.type === 'withdraw');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach(expense => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount)
        }
      });

      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        totalByCategory.push({
          name: category.name,
          total,
          color: category.color,
        });
      }
    });

    setCategoriesTotal(totalByCategory);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content contentContainerStyle={{ flex: 1, padding: 24 }}>
        {
          categoriesTotal.map(category => (
            <HistoryCard
              key={category.name}
              title={category.name}
              amount={category.total}
              color={category.color}
            />
          ))
        }
      </Content>

    </Container>
  );
}

export { Resume };