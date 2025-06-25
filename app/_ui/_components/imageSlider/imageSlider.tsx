'use client';

import styles from './imageSlider.module.css';
import { useState } from 'react';
import Image from 'next/image';
import { DocumentsFromArticleFieldsFragment } from '@graphql/__generated__/graphql';

type ImageSliderProps = {
    images: DocumentsFromArticleFieldsFragment | null | undefined;
    className?: string;
    ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLElement>;

export default function ImageSlider({ images, className, ref, ...inheritedProps }: ImageSliderProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || !images.result || images.result.length === 0) return;

    const nextImage = () => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % (images?.result?.length ?? 1));
    };

    const prevImage = () => {
        setCurrentIndex(prevIndex => (prevIndex === 0 ? (images?.result?.length ?? 0) - 1 : prevIndex - 1));
    };

    const oi = images?.result?.at(currentIndex);

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
                className={styles.imageContainer}
                style={{
                    position: 'relative',
                    minHeight: '300px', // Ensure a minimum height for the image container
                }}
            >
                <button className={styles.prevButton} onClick={prevImage}>
                    &lt;
                </button>
                <Image
                onClick={nextImage}
                    src={oi?.fichier ?? ''}
                    // width={oi?.largeur ?? '300'}
                    // height={oi?.hauteur ?? '300'}
                    fill
                    sizes="(max-width: 90rem) 66vw, 50vw"
                    alt={`Slide ${currentIndex + 1}`}
                    className={styles.image}
                    style={{
                        objectFit: 'cover',
                    }}
                    priority={currentIndex === 0} // Load the first image with priority
                />
                <button className={styles.nextButton} onClick={nextImage}>
                    &gt;
                </button>
            </div>
        </div>
    );
}
