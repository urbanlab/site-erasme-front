import { Input } from '@base-ui-components/react';
import styles from './inputField.module.css';

type InputFieldProps = {
    type: 'text' | 'email' | 'password';
    name: string;
    value?: string;
    placeholder?: string;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
    required?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function InputField({ type, name, value, placeholder, className, ref, required = false, ...inheritedProps }: InputFieldProps) {
    return (
        <Input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            className={`${styles.input} ${className} ${styles[type]}`}
            ref={ref}
            {...inheritedProps}
            required={required}
        />
    );
}
