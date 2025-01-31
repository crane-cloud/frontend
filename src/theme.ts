import { Button, createTheme, TextInput, px } from '@mantine/core';

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'blue',
        variant: 'outline',
      },
    }),
    
  },
});
