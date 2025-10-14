import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
}

export function PageContainer({ children, title }: PageContainerProps) {
  return (
    <section className="w-full py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-[1400px] w-full mx-auto">
        {title && <h1 className="text-3xl font-bold mb-8">{title}</h1>}
        {children}
      </div>
    </section>
  );
} 