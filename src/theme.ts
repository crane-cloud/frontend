import { Button, Card, createTheme, Text, TextInput } from '@mantine/core';
import { returnObject } from './utils/helpers';

export const theme = createTheme({
  // blue: '#008AC1',
  // colors: {
  //   gray: [
  //     "#f5f5f5",
  //     "#e7e7e7",
  //     "#cdcdcd",
  //     "#b2b2b2",
  //     "#9a9a9a",
  //     "#8b8b8b",
  //     "#848484",
  //     "#717171",
  //     "#656565",
  //     "#575757",
  //   ],
  // },

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
              var(--mantine-color-white),
              var(--mantine-color-gray-9)
            )`,
          },
        },
      },
    }),
    
  },

});
