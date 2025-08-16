# BhavukLabs Markdown

A powerful, flexible React markdown rendering library with hierarchical parsing and beautiful theming.

## Features

- 🎯 **Hierarchical Parsing**: Properly nested heading structure with children
- 🎨 **Beautiful Themes**: Light/dark themes with extensive customization
- 💻 **Code Highlighting**: Syntax highlighting with copy functionality
- 📱 **Responsive Design**: Mobile-first responsive layouts
- ⚡ **Performance**: Optimized rendering with React hooks
- 🔧 **TypeScript**: Full TypeScript support with comprehensive types
- 🎪 **Interactive Elements**: Copy buttons, AI integration, hover states

## Installation

```bash
npm install bhavuklabs-markdown
# or
yarn add bhavuklabs-markdown
# or
pnpm add bhavuklabs-markdown
```

## Quick Start

```tsx
import { MarkdownRenderer, useMarkdownParser } from 'bhavuklabs-markdown';

function App() {
  const markdown = `
# Welcome to My Blog

This is a **bold** statement with *italic* text and \`inline code\`.

## Features

- Beautiful syntax highlighting
- Responsive design
- Dark/light themes

\`\`\`javascript
function hello() {
  console.log("Hello, world!");
}
\`\`\`
  `;

  const nodes = useMarkdownParser(markdown);

  return (
    <MarkdownRenderer 
      nodes={nodes} 
      theme="dark"
      onAskAI={(payload) => console.log('AI request:', payload)}
    />
  );
}
```

## API Reference

### `useMarkdownParser(markdown: string)`

Parses markdown text into a hierarchical structure.

**Parameters:**
- `markdown` - The markdown string to parse

**Returns:** `MarkdownNode[]` - Array of parsed markdown nodes

### `MarkdownRenderer`

Main component for rendering parsed markdown.

**Props:**
- `nodes` - Array of markdown nodes from the parser
- `theme?` - "light" | "dark" (default: "light")
- `customTheme?` - Custom CSS variables object
- `onAskAI?` - Callback for AI integration

### Individual Components

You can also use individual components:

```tsx
import { 
  HeadingComponent, 
  ParagraphComponent, 
  ListComponent, 
  CodeBlockComponent 
} from 'bhavuklabs-markdown';
```

## Theming

### Built-in Themes

```tsx
<MarkdownRenderer nodes={nodes} theme="dark" />
```

### Custom Themes

```tsx
const customTheme = {
  '--heading-color': '#ff6b6b',
  '--paragraph-color': '#4ecdc4',
  '--cb-bg': '#2c3e50',
  '--cb-border': '#3498db',
};

<MarkdownRenderer 
  nodes={nodes} 
  customTheme={customTheme} 
/>
```

## Advanced Usage

### AI Integration

```tsx
<MarkdownRenderer 
  nodes={nodes}
  onAskAI={({ filename, code }) => {
    // Handle AI requests for code blocks
    console.log(`AI request for ${filename}:`, code);
  }}
/>
```

### Custom Styling

The library uses CSS custom properties for easy theming. Key variables include:

- `--heading-color-light` / `--heading-color-dark`
- `--paragraph-color-light` / `--paragraph-color-dark`
- `--cb-bg` (code block background)
- `--cb-border` (code block border)
- `--list-text-color`

## License

ISC