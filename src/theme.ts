import { Button, Card, createTheme, Text, TextInput } from "@mantine/core";
import { returnObject } from "./utils/helpers";

export const theme = createTheme({
  // blue: '#008AC1',
  fontFamily: "var(--font-family)",
  fontSizes: {
    xs: "0.7rem",
    sm: "0.8rem",
    md: "0.9rem",
    lg: "1rem",
    xl: "1.1rem",
  },
  primaryColor: "blue",
  components: {
    Button: Button.extend({
      defaultProps: {
        color: "blue",
        variant: "outline",
        radius: "md",
      },
    }),
    Text: Text.extend({
      defaultProps: {
        size: "md",
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
            ...returnObject(props.variant === "outline", {
              border: "1px solid var(--mantine-color-gray-5)",
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
