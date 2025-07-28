'use client';

import { Tabs } from '@base-ui-components/react/tabs';
import { ArticleFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import useCookieAllowedServices from '@hooks/useCookieAllowedServices';
import { useIsDesktop } from '@hooks/useIsDesktop';
import { RemoteHtmlWithIframesAndCookieConsentManagement } from '@services/remoteHtml';
import Button from '@ui/components/button';
import { JSX } from 'react';
import styles from './client-components.module.css'

export default function ArticleCommon({
    articleInformation,
}: {
    articleInformation: ArticleFullInformationFieldsFragment;
}) {
    const allowedServices = useCookieAllowedServices();

    return (
        <>
            {articleInformation.texte && (
                <RemoteHtmlWithIframesAndCookieConsentManagement
                    html={articleInformation.texte}
                    allowedThirdPartyServices={allowedServices}
                />
            )}
        </>
    );
}

const DevelopmentAndTimelineSectionsWrapper = ({
    developmentSection,
    timelineSection,
}: {
    developmentSection: JSX.Element;
    timelineSection: JSX.Element;
}) => {
    const isDesktop = useIsDesktop();

    if (isDesktop) {
        return (
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '10.5rem',
                }}
            >
                <div>{timelineSection}</div>
                <div>{developmentSection}</div>
            </div>
        );
    } else {
        return (
            <Tabs.Root defaultValue="developpement">
                <Tabs.List className={styles.tabsList}>
                    <Tabs.Tab value="developpement" render={<Button variant="ghost">Développement</Button>} />
                    <Tabs.Tab value="etapes" render={<Button variant="ghost">Étapes</Button>} />
                </Tabs.List>
                <Tabs.Panel value="developpement">{timelineSection}</Tabs.Panel>
                <Tabs.Panel value="etapes">{developmentSection}</Tabs.Panel>
            </Tabs.Root>
        );
    }
};

export { DevelopmentAndTimelineSectionsWrapper, ArticleCommon };
