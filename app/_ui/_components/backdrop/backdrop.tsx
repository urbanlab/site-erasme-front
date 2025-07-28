import styles from './backdrop.module.css';

type BackdropProps = {
    onClick?: () => void;
};

export default function Backdrop({ onClick }: BackdropProps) {
    return <div className={styles.backdrop} onClick={onClick} />;
}
