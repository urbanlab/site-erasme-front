import { parseChiffresClesData } from './_utils';
import styles from './chiffresCles.module.css';

const ChiffresCles = ({
    title,
    chiffresCles,
    splitBy = ' ',
    className,
}: {
    title: string;
    chiffresCles: string;
    splitBy?: string;
    className?: string;
}) => {
    const parsedChiffresCles = parseChiffresClesData(chiffresCles, splitBy);
    return (
        <div className={className}>
            <ul className={`${styles.chiffresClesContainer} ${styles.localVariables}`}>
                <h2>{title}</h2>
                {parsedChiffresCles.map((chiffreCle, index) => {
                    return (
                        <li key={index} className={styles.chiffreCleItem}>
                            <p className={styles.chiffreCleValue}>{chiffreCle.value}</p>
                            <p>{chiffreCle.description}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export { ChiffresCles };
