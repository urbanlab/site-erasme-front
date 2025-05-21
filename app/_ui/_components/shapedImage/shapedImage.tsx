import maskCorner from '@public/mask-corner.svg';
import maskNarrow from '@public/mask-narrow.svg';
import maskWide from '@public/mask-wide.svg';
import Image from 'next/image';

type MaskShapeType = 'narrow' | 'wide' | 'corner';

type ShapedImageProps = {
    src: string;
    alt: string;
    maskShape: MaskShapeType;
    className?: string;
    width?: number;
    height?: number;
    ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLElement>;

const maskShapeMapping: Record<MaskShapeType, { src: string }> = {
    narrow: { src: maskNarrow.src },
    wide: { src: maskWide.src },
    corner: { src: maskCorner.src },
};

export default function ShapedImage({
    src,
    alt,
    maskShape,
    className,
    ref,
    ...inheritedProps
}: ShapedImageProps) {
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
                style={{
                    position: 'relative',
                    minHeight: '200px',
                }}
            >
                <Image
                    src={src}
                    fill
                    alt={alt}
                    sizes="(max-width: 90rem) 66vw, 100vw"
                    style={{
                        maskImage: `url(${maskShapeMapping[maskShape].src})`,
                        maskPosition: 'center',
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        objectFit: 'cover',
                    }}
                />
            </div>
        </div>
    );
}
