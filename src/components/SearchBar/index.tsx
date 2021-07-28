import React from 'react';
import { TextInputProps } from 'react-native';
import { useTheme } from 'styled-components';

import {
  Container,
  Input,
  Icon
} from './styles';

export function SearchBar(props: TextInputProps) {
  const theme = useTheme();

  return (
    <Container>
      <Input
        {...props}
        placeholderTextColor={theme.colors.text}
      />
      <Icon name="search" />
    </Container>
  )
}