import { Input } from '@base-ui-components/react';
import styles from './inputField.module.css';

type InputFieldProps = {
    type: 'text' | 'email' | 'password';
    placeholder?: string;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
} & React.HTMLAttributes<HTMLElement>;

export default function InputField({ type, placeholder, className, ref, ...inheritedProps }: InputFieldProps) {
    return (
        <Input
            {...inheritedProps}
            ref={ref}
            className={`${styles.input} ${className} ${styles[type]}`}
            type={type}
            placeholder={placeholder}
        />
    );
}
