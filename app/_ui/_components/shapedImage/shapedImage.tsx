import Image from 'next/image';
import styles from './shapedImage.module.css';
import maskShape from '@public/mask.svg';

type ShapedImageProps = {
    src: string;
    alt: string;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLElement>;

export default function ShapedImage({ src, alt, className, ref, ...inheritedProps }: ShapedImageProps) {
    return (
        <div
            {...inheritedProps}
            ref={ref}
            className={`${styles.maskContainer} ${styles.maskProperties} ${className}`}
            style={{ maskImage: `url(${maskShape.src})` }}
        >
            <Image src={src} alt={alt} className={styles.backgroundImage} />
        </div>
    );
}
