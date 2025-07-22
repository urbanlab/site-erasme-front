'use client';

import chevronIcon from '@public/chevron-up-icon.svg';
import Button from '@ui/elements/button';
import Image from 'next/image';
import { useState } from 'react';
import styles from './carousel.module.css';
import { DocumentFullInformationFieldsFragment } from '@graphql/__generated__/graphql';

export default function Carousel({
    images,
    className,
}: {
    images: DocumentFullInformationFieldsFragment[];
    className?: string;
}) {
    const [activeImage, setActiveImage] = useState<number>(1);
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
                <Image
                    onLoad={handleLoadEnd}
                    src={images[activeImage - 1].fichier ?? ''}
                    fill
                    alt={images[activeImage - 1].alt ?? ''}
                    className={`${styles.image} ${isTransition ? styles.imageTransition : ''}`}
                />

                <div className={`${styles.commandsWrapper} ${styles.overlay}`}>
                    <Button variant="no-style" className={styles.previousImage} onClick={handlePreviousImage}>
                        <Image src={chevronIcon} alt="dernier image" />
                    </Button>

                    <span className={`${styles.counter} ${styles.overlay}`}>{`${activeImage}/${images.length}`}</span>

                    <Button variant="no-style" className={styles.nextImage} onClick={handleNextImage}>
                        <Image src={chevronIcon} alt="prochain image" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
