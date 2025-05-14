import Image from 'next/image';
import styles from './shapedImage.module.css';
import maskMedium from '@public/mask-medium.svg';
import maskWide from '@public/mask-wide.svg';
import maskNarrow from '@public/mask-narrow.svg';

type ShapedImageProps = {
    src: string;
    alt: string;
    maskShape: 'narrow' | 'medium' | 'wide';
    className?: string;
    width?: number;
    height?: number;
    ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLElement>;

const maskShapeMapping = {
    narrow: { url: maskNarrow.src },
    medium: { url: maskMedium.src },
    wide: { url: maskWide.src },
};

export default function ShapedImage({
    src,
    alt,
    maskShape,
    width,
    height,
    className,
    ref,
    ...inheritedProps
}: ShapedImageProps) {
    return (
        <div
            {...inheritedProps}
            ref={ref}
            className={`${styles.maskContainer} ${styles.maskProperties} ${className}`}
            style={{ maskImage: `url(${maskShapeMapping[maskShape].url})` }}
        >
            <Image src={src} alt={alt} className={styles.backgroundImage} width={width} height={height} />
        </div>
    );
}
