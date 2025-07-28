'use client';

import Arrow from '@ui/components/arrow';
import Button from './button';

export default function ToTopButton({ className }: { className?: string }) {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className={className}
            style={{
                display: 'flex',
                alignItems: 'center',
                columnGap: '8px',
                fontSize: 'var(--font-size-default-body)',
            }}
        >
            <Arrow orientation="north" size={14} />
            Haut de page
        </Button>
    );
}
