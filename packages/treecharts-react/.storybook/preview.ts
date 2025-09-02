import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      description: {
        component:
          "TreeCharts React component library for creating interactive tree visualizations.",
      },
    },
  },
  argTypes: {
    className: {
      control: "text",
      description: "CSS class name for the container",
    },
    width: {
      control: "text",
      description: "Container width (number or string with units)",
    },
    height: {
      control: "text",
      description: "Container height (number or string with units)",
    },
    onRender: {
      action: "rendered",
      description: "Callback fired when the chart is rendered",
    },
    onUpdate: {
      action: "updated",
      description: "Callback fired when the chart data is updated",
    },
  },
};

export default preview;
