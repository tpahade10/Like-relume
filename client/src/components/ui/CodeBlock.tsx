import React from "react";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="bg-muted p-4 rounded text-xs overflow-x-auto border">
      <code>{code}</code>
    </pre>
  );
}
