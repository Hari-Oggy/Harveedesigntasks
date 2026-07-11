import * as React from "react";

export interface StudentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const StudentCard = React.forwardRef<HTMLDivElement, StudentCardProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div ref={ref} className={className} {...props}>
        {children}
      </div>
    );
  }
);

StudentCard.displayName = "StudentCard";
