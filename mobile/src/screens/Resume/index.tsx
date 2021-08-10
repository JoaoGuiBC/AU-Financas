import React, { useEffect, useState } from 'react';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
} from './styles';

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
  totalValue: number;
  percent: string;
  color: string;
}

const Resume: React.FC = () => {
  const [categoriesTotal, setCategoriesTotal] = useState<CategoryData[]>([]);

  const { colors } = useTheme();

  async function loadData() {
    const response = await AsyncStorage.getItem('@aufinancas:transactions');
    const data: TransactionData[] = response ? JSON.parse(response) : [];

    const expenses = data.filter((expense: TransactionData) => expense.type === 'withdraw');

    const totalExpenses = expenses.reduce((acumulator: number, expense: TransactionData) => {
      return acumulator + Number(expense.amount);
    }, 0);

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

        const percent = `${(categorySum / totalExpenses * 100).toFixed(0)}%`;

        totalByCategory.push({
          name: category.name,
          total,
          totalValue: categorySum,
          percent,
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
        <ChartContainer>
          <VictoryPie
            data={categoriesTotal}
            colorScale={categoriesTotal.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: colors.shape
              }
            }}
            labelRadius={60}
            x="percent"
            y="totalValue"
          />
        </ChartContainer>

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