import React from "react";
import { BsIcon } from "./BsIcon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: "search" | string;
  containerClassName?: string;
}

export const BsInput = ({ icon, containerClassName = "", className = "", ...props }: InputProps) => {
  return (
    <div className={`relative ${containerClassName}`}>
      {icon === "search" && (
        <BsIcon
          name="search"
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-bs-muted"
        />
      )}
      <input
        className={`w-full h-[38px] bg-bs-bg dark:bg-bs-dark2 border border-transparent rounded-[40px] ${
          icon ? "pl-[47px]" : "px-[16px]"
        } pr-[16px] text-[16px] text-bs-text font-[Poppins] placeholder-bs-muted focus:outline-none focus:border-bs-primary transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const BsButton = ({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-bs-primary text-white hover:bg-bs-primary/90",
    secondary: "bg-bs-bg dark:bg-bs-dark2 text-bs-text hover:bg-bs-bg/80 dark:hover:bg-bs-dark3",
    outline: "bg-white dark:bg-transparent border border-bs-bg dark:border-bs-primary text-bs-muted dark:text-bs-primary hover:border-bs-primary hover:text-bs-primary",
    ghost: "bg-transparent text-bs-muted hover:bg-bs-bg dark:hover:bg-bs-dark2 hover:text-bs-primary",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-[4px] font-medium transition-all font-[Poppins] ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};