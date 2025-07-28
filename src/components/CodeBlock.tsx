import "../styles/CodeBlock.css";

interface CodeBlockProps {
  filename: string;
  code: string;
}

export const CodeBlockComponent = ({ filename, code }: CodeBlockProps) => (
  <div className="codeBlock">
    <div className="codeBlockHeader">
      <div className="codeBlockFilename">{filename}</div>
      <div className="codeBlockCopy">copy</div>
    </div>
    <pre className="codeBlockPre">{code}</pre>
  </div>
);
