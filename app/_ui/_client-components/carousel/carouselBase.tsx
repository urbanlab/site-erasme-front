'use client';

import chevronIcon from '@public/chevron-up-icon.svg';
import fallbackImage from '@public/hero-img.svg';
import { DocumentFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import Button from '@ui/components/button';
import Image from 'next/image';
import { useState } from 'react';
import styles from './carousel.module.css';

const ImageDialog = ({
    src,
    alt,
    width,
    height,
    className,
    ref,
    ...inheritedProps
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLElement>) => {
    return (
        <div
            {...inheritedProps}
            ref={ref}
            className={className}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
            }}
        >
            <div
                className={styles.dialogImageContainer}
                style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gridTemplateRows: '1fr',
                    alignItems: 'center',
                }}
            >
                <Image
                    src={(src !== '' ? src : fallbackImage) ?? fallbackImage}
                    height={height}
                    width={width}
                    alt={alt}
                    style={{
                        objectFit: 'contain',
                        position: 'relative',
                        maxHeight: '80vh',
                        maxWidth: '80vw',
                    }}
                />
            </div>
        </div>
    );
};

export default function CarouselBase({
    images,
    handleImageClick,
    firstImage,
    isDialog = false,
    className,
}: {
    images: DocumentFullInformationFieldsFragment[];
    handleImageClick: (clickedImage: number) => void;
    firstImage?: number;
    isDialog?: boolean;
    className?: string;
}) {
    const [activeImage, setActiveImage] = useState<number>(firstImage && firstImage <= images.length ? firstImage : 1);
    const [isTransition, setIsTransition] = useState<boolean>(true);

    const handlePreviousImage = () => {
        setIsTransition(true);
        setActiveImage(lastActiveImage => (lastActiveImage === 1 ? images.length : lastActiveImage - 1));
    };

    const handleNextImage = () => {
        setIsTransition(true);
        setActiveImage(lastActiveImage => (lastActiveImage < images.length ? lastActiveImage + 1 : 1));
    };

    const handleLoadEnd = () => {
        setIsTransition(false);
    };

    return (
        <div
            className={`${className} ${styles.localVariables}`}
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gridTemplateRows: '1fr',
            }}
        >
            <div className={styles.imagesWrapper}>
                {isDialog ? (
                    <ImageDialog
                        onLoad={handleLoadEnd}
                        src={images[activeImage - 1].fichier ?? ''}
                        height={images[activeImage - 1].hauteur ?? 500}
                        width={images[activeImage - 1].largeur ?? 500}
                        className={`${styles.image} ${isTransition ? styles.imageTransition : ''}`}
                        alt=""
                    />
                ) : (
                    <Image
                        onLoad={handleLoadEnd}
                        src={images[activeImage - 1].fichier ?? ''}
                        fill
                        alt={images[activeImage - 1].alt ?? ''}
                        className={`${styles.image} ${styles.imageBorder} ${isTransition ? styles.imageTransition : ''}`}
                        style={{ objectFit: 'cover' }}
                        onClick={() => handleImageClick(activeImage)}
                    />
                )}

                {images.length > 1 && (
                    <div className={`${styles.commandsWrapper} ${styles.overlay}`}>
                        <Button variant="no-style" className={styles.previousImage} onClick={handlePreviousImage}>
                            <Image src={chevronIcon} alt="dernier image" />
                        </Button>

                        <span
                            className={`${styles.counter} ${styles.overlay}`}
                        >{`${activeImage}/${images.length}`}</span>

                        <Button variant="no-style" className={styles.nextImage} onClick={handleNextImage}>
                            <Image src={chevronIcon} alt="prochain image" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
