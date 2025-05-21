import styles from './tag.module.css';

type TagProps = {
    value: string;
    className?: string;
};

export default function Tag({ value, className }: TagProps) {
    return <div className={`${styles.tag} ${className}`}>{value}</div>;
}
