import { ArticleFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import styles from './components.module.css';
import { RemoteHtml } from '@services/remoteHtml';

const ServicesSection = ({
    articles,
    className,
}: {
    articles: ArticleFullInformationFieldsFragment[];
    className?: string;
}) => {
    return (
        <ul className={`${styles.servicesContainer} ${styles.localVariables} ${className}`}>
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
    );
};

export { ServicesSection };
