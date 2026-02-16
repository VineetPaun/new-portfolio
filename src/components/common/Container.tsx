import React from 'react';

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Container({ children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`animate-fade-in-blur container mx-auto max-w-3xl px-4 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default Container;
