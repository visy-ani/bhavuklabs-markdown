import React, { createContext, useContext } from "react";

interface CodeBlockConfig {
  theme: "dark" | "light";
}

const defaultConfig: CodeBlockConfig = {
  theme: "dark",
};

const CodeBlockConfigContext = createContext<CodeBlockConfig>(defaultConfig);

export const CodeBlockProvider: React.FC<{
  config: Partial<CodeBlockConfig>;
  children: React.ReactNode;
}> = ({ config, children }) => {
  const mergedConfig = { ...defaultConfig, ...config };
  return (
    <CodeBlockConfigContext.Provider value={mergedConfig}>
      {children}
    </CodeBlockConfigContext.Provider>
  );
};

export const useCodeBlock = (
  overrideConfig?: Partial<CodeBlockConfig>
): CodeBlockConfig => {
  const contextConfig = useContext(CodeBlockConfigContext);
  if (overrideConfig) {
    return { ...contextConfig, ...overrideConfig };
  }
  return contextConfig;
};
