import styles from './arrow.module.css';

const ArrowIcon = ({size}: {size?: number}) => (
    <svg
        width={size ?? '80%'}
        height={size ?? '80%'}
        viewBox="0 0 33 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M2.3284 15.7842L26.9246 15.8589" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.6621 2.19922L29.4238 15.6639L15.0904 29.249" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

type Orientation = 'northeast' | 'southwest' | 'northwest' | 'southeast' | 'north' | 'south' | 'east' | 'west';

type ArrowProps = {
    orientation: Orientation;
    hoverOrientation?: Orientation;
    className?: string;
    size?: number;
};

export default function Arrow({ orientation, hoverOrientation, size, className }: ArrowProps) {
    const arrowRotation = (orientation: Orientation) => {
        switch (orientation) {
            case 'north':
                return 'rotate(-90deg)';
            case 'south':
                return 'rotate(90deg)';
            case 'east':
                return 'rotate(0deg)';
            case 'west':
                return 'rotate(180deg)';
            case 'northeast':
                return 'rotate(-45deg)';
            case 'northwest':
                return 'rotate(-135deg)';
            case 'southeast':
                return 'rotate(45deg)';
            case 'southwest':
                return 'rotate(135deg)';
            default:
                return 'rotate(0deg)';
        }
    };

    const arrowOrientationStyle: React.CSSProperties = {
        ['--orientation' as string]: arrowRotation(orientation),
        ['--hover-orientation' as string]: arrowRotation(hoverOrientation || orientation),
    };

    return (
        <div className={`${styles.arrow} ${className}`} style={arrowOrientationStyle}>
            <ArrowIcon size={size} />
        </div>
    );
}
