import { ButtonVariantType } from '@ui/components/button';
import Link from 'next/link';
import styles from './button.module.css';

type LinkButtonProps = {
    href: string;
    children: React.ReactNode;
    variant: ButtonVariantType;
    onNavigate?: () => void;
    className?: string;
} & React.HTMLAttributes<HTMLElement>;

/**
 * This component is a nextjs `Link` component, but styled as a button, to keep UI consistency.
 * Using this component avoids nesting a `Button` inside a `Link`, which would be a bad practice in terms of accessibility.
 */
export default function LinkButton({
    href,
    children,
    variant,
    onNavigate,
    className,
    ...inheritedProps
}: LinkButtonProps) {
    return (
        <Link
            href={href}
            {...inheritedProps}
            className={`${styles.button} ${className} ${styles[variant]}`}
            onNavigate={onNavigate}
        >
            {children}
        </Link>
    );
}
