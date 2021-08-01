import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface HighlightCardType {
  type: 'deposit' | 'withdraw' | 'total';
}

export const Container = styled.View<HighlightCardType>`
  background: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape
  };

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
  margin-bottom: 4px;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  elevation: 3;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<HighlightCardType>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_highlight
  };
`;

export const Icon = styled(Feather)<HighlightCardType>`
  font-size: ${RFValue(40)}px;

  ${({ type }) => type === "deposit" && css`
    color: ${({ theme }) => theme.colors.success};
  `};

  ${({ type }) => type === "withdraw" && css`
    color: ${({ theme }) => theme.colors.attention};
  `};

  ${({ type }) => type === "total" && css`
    color: ${({ theme }) => theme.colors.shape};
  `};
`;

export const Content = styled.View``;

export const Amount = styled.Text<HighlightCardType>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_highlight
  };

  margin-top: ${RFValue(38)}px;
`;

export const LastTransaction = styled.Text<HighlightCardType>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text
  };
`;
