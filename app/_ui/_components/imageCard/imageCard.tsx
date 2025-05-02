import Arrow from '@ui/elements/arrow';
import styles from './imageCard.module.css';
import Image from 'next/image';

type ImageCardProps = {
    title: string;
    image: string;
    className?: string;
};

export default function ImageCard({ title, image, className }: ImageCardProps) {
    return (
        <div className={`${styles.imageCard} ${className} ${styles.localVariables}`}>
            <Image className={styles.backgroundImage} src={image} alt={`${title} illustrative image`} />

            <div className={styles.titleContainer} />
            {/* title is not a child of titleContainer for display reasons */}
            <h5 className={styles.title}>{title}</h5>

            {/* Conditional styling of the arrow container for responsiveness reasons*/}
            <div className={`${styles.arrowContainer} ${styles.arrowContainerNoHover}`}>
                <Arrow className={styles.arrow} orientation="northeast" size={26}/>
            </div>
            <div className={`${styles.arrowContainer} ${styles.arrowContainerOnHover}`}>
                <p>En savoir plus</p>
                <Arrow className={styles.arrow} orientation="east" size={26}/>
            </div>
        </div>
    );
}
