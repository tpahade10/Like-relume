import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import CodeBlock from "@/components/ui/CodeBlock";
import { Button } from "@/components/ui/button";

interface ShowCodeModalProps {
  code: string;
  trigger?: React.ReactNode;
}

export default function ShowCodeModal({ code, trigger }: ShowCodeModalProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* {trigger || <Button variant="outline">Show Code</Button>} */}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Component Code</DialogTitle>
          <DialogDescription>Copy and use this code directly in your project.</DialogDescription>
        </DialogHeader>
        <CodeBlock code={code} />
        <Button className="mt-2 w-full" onClick={handleCopy} variant="secondary">Copy to Clipboard</Button>
      </DialogContent>
    </Dialog>
  );
}
