'use client';

import { Dialog } from '@base-ui-components/react/dialog';
import { DocumentFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import Backdrop from '@ui/components/backdrop';
import { useState } from 'react';
import styles from './carousel.module.css';
import CarouselBase from './carouselBase';

export default function Carousel({
    images,
    className,
}: {
    images: DocumentFullInformationFieldsFragment[];
    className?: string;
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<number>(1);

    const handleImageClick = (clickedImage: number) => {
        setActiveImage(clickedImage);
        setDialogOpen(true);
    };

    return (
        <>
            <CarouselBase images={images} handleImageClick={handleImageClick} className={className} />

            <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen} dismissible>
                <Dialog.Portal>
                    <Dialog.Backdrop
                        render={<Backdrop className={styles.backdrop} onClick={() => setDialogOpen(false)} />}
                    />
                    <Dialog.Popup className={`${styles.dialogPopup} ${styles.dialogOverlay}`}>
                        <CarouselBase images={images} handleImageClick={() => null} isDialog firstImage={activeImage} />
                    </Dialog.Popup>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
