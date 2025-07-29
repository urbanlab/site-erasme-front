import styles from './backdrop.module.css';

type BackdropProps = {
    onClick?: () => void;
    className?: string;
};

export default function Backdrop({ onClick, className }: BackdropProps) {
    return <div className={`${styles.backdrop} ${className}`} onClick={onClick} />;
}
