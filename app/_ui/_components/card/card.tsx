import Arrow from '@ui/elements/arrow';
import styles from './card.module.css';

type CardProps = {
    variant: 'filled' | 'ghost';
    title: string;
    date: string;
    body: string;
    onClick?: () => void;
    className?: string;
};

export default function Card({ title, date, body, variant, onClick, className }: CardProps) {
    return (
        <div className={`${styles.card} ${className} ${styles[variant]}`} onClick={onClick}>
            <div className={styles.titleFlexContainer}>
                <h4 className={styles.title}>{title}</h4>
                <Arrow orientation="northeast" hoverOrientation="east" size={70} />
            </div>
            <p>{date}</p>
            <p>{body}</p>
        </div>
    );
}
