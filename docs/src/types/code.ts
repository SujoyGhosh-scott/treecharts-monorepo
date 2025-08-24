export interface CodeExample {
  title: string;
  description: string;
  id: string;
  codes: {
    javascript?: string;
    react?: string;
    angular?: string;
    vue?: string;
  };
  outputImage?: string;
  highlightLines?: {
    [framework: string]: number[];
  };
}

export interface CodeDisplayProps {
  example: CodeExample;
  showOutput?: boolean;
  defaultTab?: "javascript" | "react" | "angular" | "vue";
}
