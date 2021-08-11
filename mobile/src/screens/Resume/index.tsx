import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { VictoryPie } from 'victory-native';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';

import {
  Container,
  Header,
  LoadContainer,
  Title,
  Content,
  SelectMonth,
  SelectMonthButton,
  Icon,
  Month,
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
  const [isCategoryDataLoading, setIsCategoryDataLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [categoriesTotal, setCategoriesTotal] = useState<CategoryData[]>([]);

  const { colors } = useTheme();

  function handleUpdateDate(action: 'next' | 'previous') {
    setIsCategoryDataLoading(true);

    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    const response = await AsyncStorage.getItem('@aufinancas:transactions');
    const data: TransactionData[] = response ? JSON.parse(response) : [];

    const expenses = data.filter((expense: TransactionData) =>
      expense.type === 'withdraw' &&
      new Date(expense.date).getMonth() === selectedDate.getMonth() &&
      new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

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
    setIsCategoryDataLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [selectedDate]);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {
        isCategoryDataLoading ? (
          <LoadContainer>
            <ActivityIndicator color={colors.primary} size="large" />
          </LoadContainer>
        ) : (
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 24,
            }}
          >
            <SelectMonth>
              <SelectMonthButton onPress={() => handleUpdateDate('previous')}>
                <Icon name="chevron-left" />
              </SelectMonthButton>

              <Month>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </Month>

              <SelectMonthButton onPress={() => handleUpdateDate('next')}>
                <Icon name="chevron-right" />
              </SelectMonthButton>
            </SelectMonth>

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
        )}

    </Container>
  );
}

export { Resume };