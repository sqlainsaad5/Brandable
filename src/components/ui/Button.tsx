import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "small";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background hover:bg-accent-hover focus-visible:ring-accent",
  secondary:
    "border border-white/20 text-foreground hover:border-accent hover:text-accent focus-visible:ring-accent",
  ghost:
    "text-foreground hover:bg-white/5 hover:text-accent focus-visible:ring-accent",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-11 px-6 text-sm",
  small: "h-9 px-4 text-xs",
};

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  );
}
