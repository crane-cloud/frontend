import { Grid } from "@mantine/core";
import React from "react";
/**
 * Responsive grid layout component that adapts child elements into columns
 * @component
 * @param columns - Number of columns to display on large screens (lg breakpoint)
 * @param children - Child elements to be arranged in the grid
 * @example
 * <GridLayout columns={3}>
 *   <Card1 />
 *   <Card2 />
 *   <Card3 />
 * </GridLayout>
 */

export const GridLayout = ({
  columns,
  children,
}: {
  columns: number;
  children: React.ReactNode;
}) => {
  return (
    <Grid
      breakpoints={{
        xs: "100px",
        sm: "200px",
        md: "300px",
        lg: "450px",
        xl: "500px",
      }}
    >
      {React.Children.map(children, (child) => (
        <Grid.Col
          span={{
            base: 12,
            md: 12,
            lg: 12 / columns,
          }}
        >
          {child}
        </Grid.Col>
      ))}
    </Grid>
  );
};
