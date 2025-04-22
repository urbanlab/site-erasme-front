import styles from './button.module.css';

type ButtonProps = {
    children: React.ReactNode;
    variant: 'filled' | 'ghost' | 'text';
    onClick?: () => void;
    className?: string;
};

export default function Button({ children, variant, onClick, className }: ButtonProps) {
    return (
        <button className={`${styles.button} ${className} ${styles[variant]}`} onClick={onClick}>
            {children}
        </button>
    );
}
