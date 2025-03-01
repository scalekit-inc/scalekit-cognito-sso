import React from 'react';

interface CenteredLayoutProps {
  children: React.ReactNode;
}

export default function CenteredLayout({ children }: CenteredLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4">
      {children}
    </div>
  );
}
