import { Input } from '@base-ui-components/react';
import styles from './inputField.module.css';

type InputFieldProps = {
    type: 'text' | 'email' | 'password';
    name: string;
    value: string;
    handleValueChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    ref?: React.Ref<HTMLInputElement>;
    required?: boolean;
} & React.HTMLAttributes<HTMLElement>;

export default function InputField({
    type,
    name,
    value,
    handleValueChange,
    placeholder,
    className,
    ref,
    required = false,
    ...inheritedProps
}: InputFieldProps) {
    return (
        <Input
            type={type}
            name={name}
            value={value}
            onValueChange={handleValueChange}
            placeholder={placeholder}
            autoComplete="off"
            spellCheck="false"
            required={required}
            className={`${styles.input} ${className} ${styles[type]}`}
            ref={ref}
            {...inheritedProps}
        />
    );
}
