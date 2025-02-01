import { Button, createTheme } from '@mantine/core';

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
    
  },

  // colors: {
  //   blue: [
  //     "#e1f8ff",
  //     "#cbedff",
  //     "#9ad7ff",
  //     "#64c1ff",
  //     "#3aaefe",
  //     "#20a2fe",
  //     "#099cff",
  //     "#0088e4",
  //     "#0079cd",
  //     "#0068b6"
  //   ]
  // },
});
