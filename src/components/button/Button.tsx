"use client";
import { MouseEventHandler } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  scheme?: "default" | "primary";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
}

const Button = () => {
  return <button>{}</button>;
};

export default Button;
