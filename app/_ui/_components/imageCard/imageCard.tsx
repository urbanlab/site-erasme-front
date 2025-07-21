import Arrow from '@ui/elements/arrow';
import Image from 'next/image';
import styles from './imageCard.module.css';

type ImageCardProps = {
    title: string;
    image: string;
    className?: string;
};

export default function ImageCard({ title, image, className }: ImageCardProps) {
    return (
        <div
            className={`${className} ${styles.localVariables}`}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr'
            }}
        >
            <div
                className={styles.imageContainer}
            >
                <Image
                    src={image}
                    fill
                    alt=''
                    sizes="(max-width: 90rem) 66vw, 100vw"
                    className={styles.coverImage}
                />
                <div className={styles.imageCardWrapper}>
                    <span className={`${styles.title} ${styles.overlay}`}>{title}</span>

                    <div className={`${styles.savoirPlus} ${styles.overlay}`}>
                        <span className={styles.onHoverOnly}>En savoir plus</span>
                        <Arrow className={styles.arrow} orientation="northeast" size={30} />
                    </div>
                </div>



            </div>
        </div>



    );
}
