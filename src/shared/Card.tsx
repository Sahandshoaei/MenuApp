

import {
  HTMLAttributes,
} from "react";

type CardProps =
  HTMLAttributes<HTMLDivElement> & {
    className?: string;
  };

const Card = ({
  children,
  className,
  ...props
}: CardProps) => {
  return (
    <div
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;