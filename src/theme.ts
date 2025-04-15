import { Button, Card, createTheme, Text, TextInput } from '@mantine/core';
import { returnObject } from './utils/helpers';

export const theme = createTheme({
  // blue: '#008AC1',

  primaryColor: 'blue',
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'blue',
        variant: 'outline',
      },
    }),
    Text: Text.extend({
      defaultProps: {
        size: 'md',
      },
      styles: {
        root: {
          margin: 0,
          padding: 0,
        },
      },
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          input: (props: any) => ({
            ...returnObject(props.variant === 'outline', {
              border: '1px solid var(--mantine-color-gray-5)',
            }),
          }),
        },
      },
    }),
    Card: Card.extend({
      defaultProps: {
        styles: {
          root: {
            backgroundColor: `light-dark(
              var(--mantine-color-default-hover),
              var(--mantine-color-gray-9)
            )`,
          },
        },
      },
    }),
  },

});
