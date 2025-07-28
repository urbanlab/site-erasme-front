import { ArticleBasicInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import Arrow from '@ui/components/arrow';
import Tag from '@ui/components/tag';
import { dateFormat } from '@utils';
import Link from 'next/link';
import styles from './articleList.module.css';

export default function ArticleList({
    articles,
    handleNavigation,
    isTagStyle = false,
    className,
}: {
    articles: ArticleBasicInformationFieldsFragment[];
    handleNavigation?: () => void;
    isTagStyle?: boolean;
    className?: string;
}) {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables} ${className}`}>
            <ul>
                {articles?.map(article => {
                    const tag = article.isprototype === '1' ? 'prototype' : 'article';

                    return (
                        <li key={article?.id}>
                            <Link href={`/${article?.id}`} className={styles.item} onNavigate={handleNavigation}>
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
