import styles from './button.module.css';

type ButtonProps = {
    children: React.ReactNode;
    variant: 'filled' | 'ghost' | 'text';
    onClick?: () => void;
    className?: string;
    ref?: React.Ref<HTMLButtonElement>;
} & React.HTMLAttributes<HTMLElement>;

export default function Button({ children, variant, onClick, className, ref, ...inheritedProps }: ButtonProps) {
    return (
        <button
            {...inheritedProps}
            ref={ref}
            className={`${styles.button} ${className} ${styles[variant]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
