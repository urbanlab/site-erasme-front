import { ArticleFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import { RemoteHtml } from '@services/remoteHtml';

const ArticleSection = ({
    article,
    className,
}: {
    article: ArticleFullInformationFieldsFragment;
    className?: { container?: string; title?: string; content?: string };
}) => {
    return (
        <div className={className?.container}>
            <h2 className={className?.title}>{article.titre}</h2>
            {article.texte && <RemoteHtml className={className?.content} html={article.texte} />}
        </div>
    );
};

export { ArticleSection };
