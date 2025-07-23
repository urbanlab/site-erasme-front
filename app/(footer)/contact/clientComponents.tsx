'use client';

import { Tabs } from '@base-ui-components/react/tabs';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { JSX } from 'react';
import styles from './page.module.css';
import Button from '@ui/elements/button';

const AddessesWrapper = ({
    urbanLabSection,
    bureauxAdministratifsSection,
    className,
}: {
    urbanLabSection: JSX.Element;
    bureauxAdministratifsSection: JSX.Element;
    className?: string;
}) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return (
            <div className={`${styles.desktopWrapper} ${className}`}>
                <div className={styles.twoColumnContainer}>{urbanLabSection}</div>
                <div className={styles.twoColumnContainer}>{bureauxAdministratifsSection}</div>
            </div>
        );
    } else {
        return (
            <Tabs.Root defaultValue="urbanLab" className={className}>
                <Tabs.List className={styles.tabsList}>
                    <Tabs.Tab value="urbanLab" render={<Button variant="ghost">UrbanLab</Button>} />
                    <Tabs.Tab value="administratif" render={<Button variant="ghost">Administratif</Button>} />
                </Tabs.List>
                <Tabs.Panel value="urbanLab">{urbanLabSection}</Tabs.Panel>
                <Tabs.Panel value="administratif">{bureauxAdministratifsSection}</Tabs.Panel>
            </Tabs.Root>
        );
    }
};

export { AddessesWrapper };
