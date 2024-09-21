import React from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, variant = "primary", ...props }: ButtonProps) => {
  return (
    <button {...props} className={`${variant} button`}>
      {children}
    </button>
  );
};

export default Button;
