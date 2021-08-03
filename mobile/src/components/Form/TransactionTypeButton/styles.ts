import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

interface IconType {
  type: 'deposit' | 'withdraw';
}

interface ContainerProps {
  isActive: boolean;
  type: 'deposit' | 'withdraw';
}

export const Container = styled(RectButton)<ContainerProps>`
  width: 48%;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 5px;

  padding: 16px;

  ${({ theme, isActive, type }) => isActive && type === 'withdraw' && css`
    background: ${theme.colors.attention_light}
  `};
  
  ${({ theme, isActive, type }) => isActive && type === 'deposit' && css`
    background: ${theme.colors.success_light}
  `};
`;

export const Icon = styled(Feather)<IconType>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'deposit' ? theme.colors.success : theme.colors.attention
  };
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;