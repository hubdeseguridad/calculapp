import React from 'react';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTitle({ children }: PageTitleProps) {
  return (
    <div className="page-title">
      <h1 className="--title">
        {children}
      </h1>
    </div>
  );
}