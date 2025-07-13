'use client';

import { ArticleFullInformationFieldsFragment } from '@graphql/__generated__/graphql';
import useCookieAllowedServices from '@hooks/useCookieAllowedServices';
import { RemoteHtmlWithIframesAndCookieConsentManagement } from '@services/remoteHtml';

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
