'use client';

import { usePathname, useRouter } from 'next/navigation';

import styles from './navigateBack.module.css';
import { useIsDesktop } from '@hooks/useIsDesktop';
import Button from '@ui/elements/button';

export default function NavigateBackButton({className}: {className?: string}) {
    const router = useRouter();
    const pathname = usePathname();

    const isDesktop = useIsDesktop();

    // Do not render on mobile
    if (!isDesktop) return;

    // Do not render on homepage
    if (pathname == '/') return;

    return (
        <Button
            variant="no-style"
            onClick={() => router.back()}
            className={`${styles.navigateBack} ${className}`}
            style={{ display: 'flex' }}
        >
            <span>{`<`}</span>
            <span className={styles.linkStyle}>Retour</span>
        </Button>
    );
}
