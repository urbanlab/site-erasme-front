'use client';

import chevronIcon from '@public/chevron-up-icon.svg';
import Button from '@ui/elements/button';
import Image from 'next/image';
import { useState } from 'react';
import styles from './carousel.module.css';

export default function Carousel({ images, className }: { images: string[], className?: string }) {
    const [activeImage, setActiveImage] = useState<number>(1);

    const handlePreviousImage = () => {
        setActiveImage(lastActiveImage => lastActiveImage === 1 ? images.length : lastActiveImage - 1)
    }

    const handleNextImage = () => {
        setActiveImage(lastActiveImage => lastActiveImage < images.length ? lastActiveImage + 1 : 1)
    }

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
                className={styles.imagesWrapper}
            >
                <Image
                    src={images[activeImage - 1]}
                    fill
                    alt=''
                    sizes="(max-width: 90rem) 66vw, 100vw"
                    className={styles.image}
                />

                <div className={`${styles.commandsWrapper} ${styles.overlay}`}>
                    <Button variant='no-style' className={styles.previousImage} onClick={handlePreviousImage}>
                        <Image src={chevronIcon} alt='dernier image' />
                    </Button>

                    <span className={`${styles.counter} ${styles.overlay}`}>{`${activeImage}/${images.length}`}</span>

                    <Button variant='no-style' className={styles.nextImage} onClick={handleNextImage}>
                        <Image src={chevronIcon} alt='prochain image' />
                    </Button>
                </div>
            </div>

        </div>
    )
}