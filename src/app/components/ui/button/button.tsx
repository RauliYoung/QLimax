import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import "@/app/components/ui/button/button.scss";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'submit';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonClass = `button-base ${variant} ${size} ${className}`;
    return <Comp className={buttonClass} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };

