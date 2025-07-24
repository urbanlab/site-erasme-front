import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ArticleFullInformationFieldsFragmentDoc,
    RubriqueBasicInformationFieldsFragmentDoc,
} from '@graphql/__generated__/graphql';
import { DYNAMIC_PAGE } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { getClient } from '@services/apollo/apolloClient';
import { RemoteHtml } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

export default async function Services() {
    const { data } = await getClient().query({
        query: DYNAMIC_PAGE,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUE_SERVICES_ID ?? '') },
    });

    const rubrique = getFragmentData(
        RubriqueBasicInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueBasicInformationFieldsFragmentDoc>
    );

    const articles = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getRubrique?.articles?.result as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>[]
    );

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ShapedImage
                className={styles.logo}
                alt="logo rubrique"
                maskShape="wide"
                src={rubrique.logo ?? heroImage}
            />
            <ul className={styles.servicesContainer}>
                {articles.map(service => {
                    return (
                        <li
                            key={service?.id}
                            className={styles.service}
                            id={service?.titre ?? ''}
                            style={{
                                /**
                                 * This is a workaround.
                                 * This behavior should be fixed by Next.js on the upcoming versions.
                                 *
                                 * For now, when navigating to an ID using Next Link, the sticky header (the navbar in this case)
                                 * stays upfront. The '0' position for the anchor is considered on the top of the page,
                                 * and not on the bottom of the navbar.
                                 * The 'scrollMarginTop' property defines an offset from the top of the page.
                                 * Here, the value corresponds to an estimation of the navbar's height on desktop.
                                 */
                                scrollMarginTop: '7.5rem',
                            }}
                        >
                            <h1 className={styles.title}>{service?.titre}</h1>
                            {service?.texte && <RemoteHtml html={service.texte} className={styles.content} />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
