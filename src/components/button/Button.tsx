"use client";

import { cn } from "@/utils/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
}

const Button = ({
  children,
  disabled = false,
  variant = "default",
  type = "button",
  fullWidth = false,
  className,
}: ButtonProps) => {
  const baseStyles = cn(
    `flex center justify-center items-center w-[120px] h-[52px] rounded-lg px-[24px] py-[14px] ${fullWidth && "w-full"}`,
  );

  const variants = {
    default: cn("bg-white", "border border-gray-200"),
    primary: cn("bg-primary"),
  };

  const contentStyles = cn(
    `flex items-center justify-center w-full h-full gap-1.5 ${variant === "default" ? "text-black" : "text-white"}`,
  );

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      disabled={disabled}
      type={type ?? "button"}
    >
      <div className={contentStyles}>{children}</div>
    </button>
  );
};

export default Button;
