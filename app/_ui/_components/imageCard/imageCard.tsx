import Arrow from '@ui/components/arrow';
import Image from 'next/image';
import styles from './imageCard.module.css';
import Link from 'next/link';

const CardContent = ({ image, title }: { image: string; title: string }) => {
    return (
        <>
            <Image src={image} fill alt="" sizes="(max-width: 90rem) 66vw, 100vw" className={styles.cardImage} />
            <div className={styles.cardTexts}>
                <span className={`${styles.title} ${styles.overlay}`}>{title}</span>

                <div className={`${styles.savoirPlus} ${styles.overlay}`}>
                    <span className={styles.onHoverOnly}>En savoir plus</span>
                    <Arrow className={styles.arrow} orientation="northeast" size={30} />
                </div>
            </div>
        </>
    );
};

type ImageCardProps = {
    title: string;
    image: string;
    link: string;
    isInternalLink: boolean;
    className?: string;
};

export default function ImageCard({ title, image, link, isInternalLink, className }: ImageCardProps) {
    return (
        <div
            className={`${className} ${styles.localVariables}`}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr',
            }}
        >
            {isInternalLink ? (
                <Link href={link} className={styles.cardWrapper}>
                    <CardContent image={image} title={title} />
                </Link>
            ) : (
                <a href={link} target='_blank' className={styles.cardWrapper}>
                    <CardContent image={image} title={title} />
                </a>
            )}
        </div>
    );
}
