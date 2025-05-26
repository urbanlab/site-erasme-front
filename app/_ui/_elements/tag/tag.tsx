import styles from './tag.module.css';

type TagSize = 'small' | 'default';

type TagProps = {
    value: string;
    size?: TagSize;
    className?: string;
};

export default function Tag({ value, size = 'default', className }: TagProps) {
    return <div className={`${styles.tag} ${styles[size]} ${className}`}>{value}</div>;
}
