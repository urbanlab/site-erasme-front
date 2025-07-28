import { ArticleFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import { RemoteHtmlRawText } from '@services/remoteHtml';
import Arrow from '@ui/components/arrow';
import { dateFormat } from '@utils';
import Link from 'next/link';
import styles from './articleCard.module.css';

type ArticleCardProps = {
    article: ArticleFullInformationFieldsFragment;
    variant: 'spotlight' | 'archive';
    textLength?: number;
    className?: string;
};

export default function ArticleCard({ article, variant, textLength, className }: ArticleCardProps) {
    return (
        <Link href={`/${article?.id}`} className={`${styles.card} ${className} ${styles[variant]}`}>
            <h4 className={styles.title}>{article?.titre}</h4>
            <Arrow
                className={styles.arrow}
                orientation={variant === 'spotlight' ? 'northeast' : 'southwest'}
                size={70}
            />
            {article?.date && <p className={styles.date}>{dateFormat(article.date)}</p>}
            {article?.texte && (
                <RemoteHtmlRawText html={article.texte} textReturnLength={textLength} className={styles.body} />
            )}
        </Link>
    );
}
