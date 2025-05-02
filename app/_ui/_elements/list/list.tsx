import Link from 'next/link';
import styles from './list.module.css';
import Arrow from '@ui/elements/arrow';

type rowProps = {
    title: string;
    tag?: string;
    date?: string;
    link: string;
    // onClick?: () => void;
};

type RowsProps = {
    rows: rowProps[];
};

export default function List({ rows }: RowsProps) {
    return (
        // <div className={styles.list}>
        <>
            {rows.map((row, index) => {
                return (
                    <div key={index} className={styles.rowFlexContainer}>
                        <p>{row.title}</p>
                        <p>{row.tag}</p>
                        <p>{row.date}</p>
                        <Link href={row.link}>
                            <Arrow orientation="northeast" hoverOrientation="east" size={20} className={styles.arrow} />
                        </Link>
                    </div>
                );
            })}
        </>
        // </div>
    );
}
