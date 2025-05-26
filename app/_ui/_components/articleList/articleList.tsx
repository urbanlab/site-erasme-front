import { Article, ArticlePagination, Maybe } from '@graphql/__generated__/graphql';
import Arrow from '@ui/elements/arrow';
import Tag from '@ui/elements/tag';
import { dateFormat } from '@utils/dateUtils';
import Link from 'next/link';
import styles from './articleList.module.css';

export default function ArticleList({ result }: ArticlePagination) {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <ul>
                {result?.map((article: Maybe<Article>) => {
                    return (
                        <li key={article?.id}>
                            <Link href={`/projets/${article?.id}`} className={styles.item}>
                                <p className={styles.title}>{article?.titre}</p>
                                <div className={`${styles.conditionalDisplay} ${styles.desktopFields}`}>
                                    {/* TODO: update tag value */}
                                    <Tag className={styles.tag} value={'project'} size='small'/>
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
