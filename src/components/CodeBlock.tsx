import React, { useState } from "react";
import type { ReactNode, CSSProperties } from "react";
import { Highlight } from "prism-react-renderer";
import type { Language, Token } from "prism-react-renderer";
import { Copy, Check, Sparkles } from "lucide-react";
import "../styles/CodeBlock.css";

interface CustomTheme {
  [key: string]: string;
}

interface CodeBlockProps {
  filename: string;
  code: string;
  language?: Language;
  theme?: "light" | "dark";
  showLineNumbers?: boolean;
  showAskAIButton?: boolean;
  askAIIcon?: ReactNode;
  askAITooltipText?: string;
  customTheme?: CustomTheme;
  onAskAI?: (payload: { filename: string; code: string }) => void;
}

export const CodeBlockComponent = ({
  filename,
  code,
  language = "typescript",
  theme = "light",
  showLineNumbers = false,
  showAskAIButton = false,
  askAIIcon,
  askAITooltipText = "Ask AI",
  customTheme,
  onAskAI,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fail silently or add error handling here
    }
  };

  const handleAskAI = () => {
    if (onAskAI) {
      onAskAI({ filename, code });
    }
  };

  const customThemeStyle: CSSProperties | undefined = customTheme
    ? Object.fromEntries(Object.entries(customTheme).map(([k, v]) => [k, v]))
    : undefined;

  return (
    <div
      className="codeBlock"
      data-theme={customTheme ? undefined : theme}
      style={customThemeStyle}
      tabIndex={0}
      aria-label={`Code block: ${filename}`}
    >
      <div className="codeBlockHeader">
        <div className="codeBlockFilename">{filename}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="codeBlockCopy"
            onClick={handleCopy}
            type="button"
            aria-label={copied ? "Copied!" : "Copy code"}
          >
            <span className="tooltip">
              {copied ? (
                <Check size={16} strokeWidth={3} style={{ color: "green" }} />
              ) : (
                <Copy size={16} />
              )}
              <span className="tooltipText">
                {copied ? "Copied!" : "Copy"}
              </span>
            </span>
          </button>
          {showAskAIButton && (
            <button
              className="codeBlockCopy"
              onClick={handleAskAI}
              type="button"
              aria-label={askAITooltipText}
              style={{ padding: "6px 8px" }}
            >
              <span className="tooltip">
                {askAIIcon ?? <Sparkles size={16} />}
                <span className="tooltipText">{askAITooltipText}</span>
              </span>
            </button>
          )}
        </div>
      </div>

      <Highlight code={code} language={language}>
        {({
          className,
          style,
          tokens,
          getLineProps,
          getTokenProps,
        }: {
          className: string;
          style: React.CSSProperties;
          tokens: Array<
            Array<{
              types: string[];
              content: string;
              empty?: boolean;
            }>
          >;
          getLineProps: (input: { line: Token[]; key: number }) => React.HTMLAttributes<HTMLSpanElement>;
          getTokenProps: (input: { token: Token; key: number }) => React.HTMLAttributes<HTMLSpanElement>;
        }) => (
          <pre className={`${className} codeBlockPre`} style={style}>
            <code className="codeBlockCode">
              {tokens.map((line, i) => (
                <span
                  key={i}
                  {...getLineProps({ line, key: i })}
                  className="codeBlockLine"
                >
                  {showLineNumbers && (
                    <span className="lineNumber">{i + 1}</span>
                  )}
                  <span className="lineContent">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </span>
                  {"\n"}
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  );
};
