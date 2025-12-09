---
title: 'Graph'
description: 'A JSX email component for displaying graphs in your Email template'
slug: graph
type: component
---

<!--@include: @/include/header.md-->

::: tip
This component is wrapper around [QuickChart API](https://quickchart.io/) for generating email compatible charts
:::

<!--@include: @/include/install.md-->

## Usage

Add the graph component to your email template.

```jsx
import { Body, Graph, Html, Section } from 'jsx-email';

const Email = () => {
  return (
    <Html lang="en">
      <Body>
        <Section>
          <Graph
            width={100}
            height={100}
            title="Graph with jsx-email"
            config={{
              type: 'bar',
              data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    data: [10, 6.5, 3, 6, 4, 0.1, 0.5]
                  }
                ]
              }
            }}
          />
        </Section>
      </Body>
    </Html>
  );
};
```

## Component Props

```tsx
config: ChartConfiguration & Record<string, any>;
```

An object that contains the chart configuration settings, combining [ChartConfiguration](https://www.chartjs.org/docs/2.9.4/charts/) properties.

:::tip
You can play around with your chart configuration in this [playground](https://quickchart.io/sandbox)
:::

```tsx
title: string;
```

This is a required string that provides the title of the graph.

```tsx
background?: string;
```

An optional string that sets the background color of the graph.

```tsx
className?: string;
```

This is optional string that applies a custom CSS class to the graph component for additional styling.

```tsx
height?: number;
```

This is an optional number that specifies the height of the graph in pixels.

```tsx
width?: number;
```

This is an optional number that specifies the width of the graph in pixels.
