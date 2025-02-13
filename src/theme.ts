import { Button, createTheme, Text, TextInput } from '@mantine/core';

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
    }),
    TextInput: TextInput.extend({
      defaultProps: {
        styles: {
          input: {
            border: '1px solid var(--mantine-color-gray-5)',
          },
        },
      },
    }),

   
  },
});
