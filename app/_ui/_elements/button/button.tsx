import styles from './button.module.css';

export type ButtonVariantType = 'filled' | 'ghost' | 'text';

type ButtonProps = {
    children: React.ReactNode;
    variant: ButtonVariantType;
    onClick?: () => void;
    className?: string;
    ref?: React.Ref<HTMLButtonElement>;
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & React.HTMLAttributes<HTMLElement>;

export default function Button({
    children,
    variant,
    onClick,
    className,
    ref,
    type = 'button',
    ...inheritedProps
}: ButtonProps) {
    return (
        <button
            {...inheritedProps}
            ref={ref}
            className={`${styles.button} ${className} ${styles[variant]}`}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}
