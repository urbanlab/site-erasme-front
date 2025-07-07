import { ArticleFullInformationFieldsFragment } from '@graphql/__generated__/graphql';
import RemoteHtml from '@services/remoteHtml';
import Arrow from '@ui/elements/arrow';
import { dateFormat } from '@utils/dateUtils';
import styles from './articleCard.module.css';
import Link from 'next/link';

type ArticleCardProps = {
    article: ArticleFullInformationFieldsFragment;
    variant: 'filled' | 'ghost';
    textLength?: number;
    className?: string;
};

export default function ArticleCard({ article, variant, textLength, className }: ArticleCardProps) {
    return (
        <Link href={`/projets/${article.id}`} className={`${styles.card} ${className} ${styles[variant]}`}>
            <h4 className={styles.title}>{article.titre}</h4>
            <Arrow className={styles.arrow} orientation="northeast" size={70} key={article.id} />
            <p className={styles.date}>{dateFormat(article.date)}</p>
            {article.texte && (
                <RemoteHtml html={article.texte} returnOnlyText textReturnLength={textLength} className={styles.body} />
            )}
        </Link>
    );
}
