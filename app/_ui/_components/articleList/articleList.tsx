import { ArticleFullInformationFieldsFragment } from '@graphql/__generated__/graphql';
import Arrow from '@ui/elements/arrow';
import Tag from '@ui/elements/tag';
import { dateFormat } from '@utils/dateUtils';
import Link from 'next/link';
import styles from './articleList.module.css';

export default function ArticleList({
    articles,
    handleNavigation,
    isTagStyle = false,
}: {
    articles: ArticleFullInformationFieldsFragment[];
    handleNavigation?: () => void;
    isTagStyle?: boolean;
}) {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ul>
                {articles?.map(article => {
                    const tag = article.isprototype === '1' ? 'prototype' : 'article';

                    return (
                        <li key={article?.id}>
                            <Link
                                href={`/projets/${article?.id}`}
                                className={styles.item}
                                onNavigate={handleNavigation}
                            >
                                <p className={styles.title}>{article?.titre}</p>
                                <div className={`${styles.conditionalDisplay} ${styles.desktopFields}`}>
                                    {isTagStyle ? (
                                        <Tag className={styles.tag} value={tag} size="small" />
                                    ) : (
                                        <p>{tag}</p>
                                    )}
                                    <p className={styles.date}>{dateFormat(article?.date)}</p>
                                    <Arrow className={styles.arrow} orientation="northeast" size={28} />
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
