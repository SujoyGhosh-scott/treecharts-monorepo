import type { Meta, StoryObj } from "@storybook/react";
import { TreeChart } from "../../TreeChart";

const meta: Meta<typeof TreeChart> = {
  title: "6. Advanced Features/Flowchart Examples",
  component: TreeChart,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
# Flowchart Examples

Professional flowchart examples demonstrating how TreeCharts can be used to create 
decision trees, process flows, and workflow diagrams. These examples showcase proper 
flowchart conventions and best practices.

## Flowchart Conventions

TreeCharts supports all standard flowchart symbols:
- **Ellipses/Ovals**: Start and end points
- **Rectangles**: Process steps and actions
- **Diamonds**: Decision points and conditional logic
- **Edge Labels**: Flow conditions and decision outcomes

## Features Demonstrated

- Multiple node shapes with proper semantic meaning
- Edge text for decision conditions (Yes/No, validation outcomes)
- Directional arrows showing process flow
- Color coding for different types of steps
- Professional styling suitable for business documentation
- Complex decision trees with multiple branches

These examples are perfect for:
- Business process documentation
- User journey mapping
- Decision tree analysis
- Workflow visualization
- Standard operating procedures
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TreeChart>;

// User Login Process Flowchart
const loginFlowchartData = {
  value: "Start",
  nodeConfig: {
    type: "ellipse" as const,
    color: "#4CAF50",
    fontColor: "white",
    width: 100,
    height: 50,
    fontSize: 12,
    borderRadius: 25,
  },
  child: [
    {
      value: "Enter Credentials",
      nodeConfig: {
        type: "rectangle" as const,
        color: "#2196F3",
        fontColor: "white",
        width: 140,
        height: 50,
        fontSize: 11,
        borderRadius: 6,
      },
      child: [
        {
          value: "Valid?",
          edgeText: "Submit",
          nodeConfig: {
            type: "diamond" as const,
            color: "#FF9800",
            fontColor: "white",
            width: 100,
            height: 60,
            fontSize: 11,
          },
          child: [
            {
              value: "Dashboard",
              edgeText: "Yes",
              nodeConfig: {
                type: "rectangle" as const,
                color: "#2196F3",
                fontColor: "white",
                width: 120,
                height: 50,
                fontSize: 11,
                borderRadius: 6,
              },
              child: [
                {
                  value: "Success",
                  nodeConfig: {
                    type: "ellipse" as const,
                    color: "#4CAF50",
                    fontColor: "white",
                    width: 100,
                    height: 50,
                    fontSize: 12,
                    borderRadius: 25,
                  },
                  child: [],
                },
              ],
            },
            {
              value: "Show Error",
              edgeText: "No",
              nodeConfig: {
                type: "rectangle" as const,
                color: "#F44336",
                fontColor: "white",
                width: 120,
                height: 50,
                fontSize: 11,
                borderRadius: 6,
              },
              child: [
                {
                  value: "Try Again?",
                  nodeConfig: {
                    type: "diamond" as const,
                    color: "#FF9800",
                    fontColor: "white",
                    width: 100,
                    height: 60,
                    fontSize: 10,
                  },
                  child: [
                    {
                      value: "End",
                      edgeText: "No",
                      nodeConfig: {
                        type: "ellipse" as const,
                        color: "#9E9E9E",
                        fontColor: "white",
                        width: 100,
                        height: 50,
                        fontSize: 12,
                        borderRadius: 25,
                      },
                      child: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const UserLoginFlow: Story = {
  args: {
    data: loginFlowchartData,
    type: "right-angle",
    horizontalGap: 120,
    verticalGap: 80,
    edgeConfig: {
      color: "#666",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 6,
      textSize: 10,
      textColor: "#333",
      textBackgroundColor: "#F5F5F5",
    },
    titleConfig: {
      title: "User Login Flowchart",
      description: "Decision flow for user authentication process",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
A comprehensive user authentication flowchart demonstrating:

**Flowchart Elements:**
- **Ellipses**: Start and end points (Start, Success, End)
- **Rectangles**: Process steps (Enter Credentials, Dashboard, Show Error)
- **Diamonds**: Decision points (Valid?, Try Again?)
- **Edge Labels**: Flow conditions (Submit, Yes, No)

**Features Showcased:**
- Proper flowchart symbol usage following industry standards
- Color-coded nodes: Green for start/success, Blue for processes, Orange for decisions, Red for errors
- Directional arrows showing process flow
- Edge text indicating decision outcomes
- Clean, professional styling suitable for documentation

This example is perfect for documenting user authentication workflows, security processes, or any decision-based user journey.
        `,
      },
    },
  },
};

// E-commerce Order Processing Flowchart
const orderProcessingFlowchartData = {
  value: "Order Received",
  nodeConfig: {
    type: "ellipse" as const,
    color: "#4CAF50",
    fontColor: "white",
    width: 120,
    height: 50,
    fontSize: 11,
    borderRadius: 25,
  },
  child: [
    {
      value: "Check Inventory",
      nodeConfig: {
        type: "rectangle" as const,
        color: "#2196F3",
        fontColor: "white",
        width: 130,
        height: 50,
        fontSize: 11,
        borderRadius: 6,
      },
      child: [
        {
          value: "In Stock?",
          edgeText: "Verify",
          nodeConfig: {
            type: "diamond" as const,
            color: "#FF9800",
            fontColor: "white",
            width: 100,
            height: 60,
            fontSize: 11,
          },
          child: [
            {
              value: "Process Payment",
              edgeText: "Yes",
              nodeConfig: {
                type: "rectangle" as const,
                color: "#2196F3",
                fontColor: "white",
                width: 130,
                height: 50,
                fontSize: 10,
                borderRadius: 6,
              },
              child: [
                {
                  value: "Payment Valid?",
                  nodeConfig: {
                    type: "diamond" as const,
                    color: "#FF9800",
                    fontColor: "white",
                    width: 120,
                    height: 60,
                    fontSize: 10,
                  },
                  child: [
                    {
                      value: "Ship Order",
                      edgeText: "Yes",
                      nodeConfig: {
                        type: "rectangle" as const,
                        color: "#2196F3",
                        fontColor: "white",
                        width: 110,
                        height: 50,
                        fontSize: 11,
                        borderRadius: 6,
                      },
                      child: [
                        {
                          value: "Order Complete",
                          nodeConfig: {
                            type: "ellipse" as const,
                            color: "#4CAF50",
                            fontColor: "white",
                            width: 120,
                            height: 50,
                            fontSize: 10,
                            borderRadius: 25,
                          },
                          child: [],
                        },
                      ],
                    },
                    {
                      value: "Cancel Order",
                      edgeText: "No",
                      nodeConfig: {
                        type: "rectangle" as const,
                        color: "#F44336",
                        fontColor: "white",
                        width: 110,
                        height: 50,
                        fontSize: 11,
                        borderRadius: 6,
                      },
                      child: [
                        {
                          value: "Refund Initiated",
                          nodeConfig: {
                            type: "ellipse" as const,
                            color: "#9E9E9E",
                            fontColor: "white",
                            width: 120,
                            height: 50,
                            fontSize: 10,
                            borderRadius: 25,
                          },
                          child: [],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              value: "Notify Customer",
              edgeText: "No",
              nodeConfig: {
                type: "rectangle" as const,
                color: "#F44336",
                fontColor: "white",
                width: 130,
                height: 50,
                fontSize: 10,
                borderRadius: 6,
              },
              child: [
                {
                  value: "Backorder?",
                  nodeConfig: {
                    type: "diamond" as const,
                    color: "#FF9800",
                    fontColor: "white",
                    width: 100,
                    height: 60,
                    fontSize: 10,
                  },
                  child: [
                    {
                      value: "Wait for Stock",
                      edgeText: "Yes",
                      nodeConfig: {
                        type: "rectangle" as const,
                        color: "#9C27B0",
                        fontColor: "white",
                        width: 120,
                        height: 50,
                        fontSize: 10,
                        borderRadius: 6,
                      },
                      child: [],
                    },
                    {
                      value: "Order Cancelled",
                      edgeText: "No",
                      nodeConfig: {
                        type: "ellipse" as const,
                        color: "#9E9E9E",
                        fontColor: "white",
                        width: 120,
                        height: 50,
                        fontSize: 10,
                        borderRadius: 25,
                      },
                      child: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const EcommerceOrderProcessing: Story = {
  args: {
    data: orderProcessingFlowchartData,
    type: "right-angle",
    horizontalGap: 140,
    verticalGap: 90,
    edgeConfig: {
      color: "#666",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 6,
      textSize: 10,
      textColor: "#333",
      textBackgroundColor: "#F5F5F5",
    },
    titleConfig: {
      title: "E-commerce Order Processing",
      description: "Complete workflow for processing customer orders",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
    width: "100%",
    height: "600px",
  },
  parameters: {
    docs: {
      description: {
        story: `
A comprehensive e-commerce order processing flowchart demonstrating complex business logic:

**Process Flow:**
1. **Order Reception**: Customer places order (Start)
2. **Inventory Check**: System verifies product availability
3. **Payment Processing**: Multiple validation steps
4. **Order Fulfillment**: Shipping and completion tracking
5. **Error Handling**: Backorders, cancellations, and refunds

**Advanced Features:**
- **Multiple Decision Points**: In Stock?, Payment Valid?, Backorder?
- **Complex Branching**: Different paths for success/failure scenarios
- **Business Logic**: Real-world e-commerce considerations
- **Color Coding**: Visual distinction for different process types
  - Green: Start/Success states
  - Blue: Standard processes
  - Orange: Decision points
  - Red: Error/cancellation processes
  - Purple: Special states (backorder)
  - Gray: Terminal states

**Edge Labels:** Clear conditions showing business rules and decision outcomes

This example demonstrates how TreeCharts can handle complex business workflows with multiple decision branches, making it ideal for process documentation, business analysis, and workflow optimization.
        `,
      },
    },
  },
};

// Simple Software Development Process
const developmentProcessData = {
  value: "Start Project",
  nodeConfig: {
    type: "ellipse" as const,
    color: "#4CAF50",
    fontColor: "white",
    width: 110,
    height: 50,
    fontSize: 11,
    borderRadius: 25,
  },
  child: [
    {
      value: "Requirements Gathering",
      nodeConfig: {
        type: "rectangle" as const,
        color: "#2196F3",
        fontColor: "white",
        width: 160,
        height: 50,
        fontSize: 10,
        borderRadius: 6,
      },
      child: [
        {
          value: "Requirements Clear?",
          edgeText: "Review",
          nodeConfig: {
            type: "diamond" as const,
            color: "#FF9800",
            fontColor: "white",
            width: 140,
            height: 60,
            fontSize: 9,
          },
          child: [
            {
              value: "Design System",
              edgeText: "Yes",
              nodeConfig: {
                type: "rectangle" as const,
                color: "#2196F3",
                fontColor: "white",
                width: 120,
                height: 50,
                fontSize: 11,
                borderRadius: 6,
              },
              child: [
                {
                  value: "Implement",
                  nodeConfig: {
                    type: "rectangle" as const,
                    color: "#2196F3",
                    fontColor: "white",
                    width: 100,
                    height: 50,
                    fontSize: 11,
                    borderRadius: 6,
                  },
                  child: [
                    {
                      value: "Test",
                      nodeConfig: {
                        type: "rectangle" as const,
                        color: "#2196F3",
                        fontColor: "white",
                        width: 80,
                        height: 50,
                        fontSize: 11,
                        borderRadius: 6,
                      },
                      child: [
                        {
                          value: "Tests Pass?",
                          nodeConfig: {
                            type: "diamond" as const,
                            color: "#FF9800",
                            fontColor: "white",
                            width: 100,
                            height: 60,
                            fontSize: 10,
                          },
                          child: [
                            {
                              value: "Deploy",
                              edgeText: "Yes",
                              nodeConfig: {
                                type: "rectangle" as const,
                                color: "#2196F3",
                                fontColor: "white",
                                width: 80,
                                height: 50,
                                fontSize: 11,
                                borderRadius: 6,
                              },
                              child: [
                                {
                                  value: "Complete",
                                  nodeConfig: {
                                    type: "ellipse" as const,
                                    color: "#4CAF50",
                                    fontColor: "white",
                                    width: 100,
                                    height: 50,
                                    fontSize: 11,
                                    borderRadius: 25,
                                  },
                                  child: [],
                                },
                              ],
                            },
                            {
                              value: "Fix Bugs",
                              edgeText: "No",
                              nodeConfig: {
                                type: "rectangle" as const,
                                color: "#F44336",
                                fontColor: "white",
                                width: 100,
                                height: 50,
                                fontSize: 11,
                                borderRadius: 6,
                              },
                              child: [],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              value: "Clarify Requirements",
              edgeText: "No",
              nodeConfig: {
                type: "rectangle" as const,
                color: "#F44336",
                fontColor: "white",
                width: 150,
                height: 50,
                fontSize: 10,
                borderRadius: 6,
              },
              child: [],
            },
          ],
        },
      ],
    },
  ],
};

export const SoftwareDevelopmentProcess: Story = {
  args: {
    data: developmentProcessData,
    type: "right-angle",
    horizontalGap: 130,
    verticalGap: 80,
    edgeConfig: {
      color: "#666",
      width: 2,
      showArrows: true,
      arrowDirection: "source-to-target",
      arrowSize: 6,
      textSize: 10,
      textColor: "#333",
      textBackgroundColor: "#F5F5F5",
    },
    titleConfig: {
      title: "Software Development Process",
      description: "Simplified development workflow with quality gates",
      position: {
        horizontal: "center",
        vertical: "top",
      },
    },
    width: "100%",
    height: "500px",
  },
  parameters: {
    docs: {
      description: {
        story: `
A software development process flowchart showing quality gates and iterative feedback:

**Development Stages:**
1. **Project Initiation**: Requirements gathering and validation
2. **Design Phase**: System architecture and design
3. **Implementation**: Code development
4. **Quality Assurance**: Testing and validation
5. **Deployment**: Release to production

**Quality Gates:**
- Requirements validation before design
- Testing validation before deployment
- Iterative feedback loops for improvements

**Feedback Loops:**
- Requirements clarification path
- Bug fixing iteration back to implementation
- Continuous improvement cycle

This example shows how TreeCharts can represent iterative processes with feedback loops, making it perfect for documenting development methodologies, quality processes, and project workflows.
        `,
      },
    },
  },
};
