import { DocumentFullInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import { RemoteHtml, RemoteHtmlRawText } from '@services/remoteHtml';
import Carousel from '@ui/client-components/carousel';
import styles from './components.module.css';
import ShapedImage from '@ui/components/shapedImage';

const RubriquePresentation = ({
    logo,
    title,
    description,
    className,
}: {
    logo: string;
    title: string;
    description?: string;
    className?: string;
}) => {
    return (
        <div className={`${styles.presentationContainer} ${className}`}>
            <ShapedImage src={logo ? logo : ''} alt="" maskShape="wide" className={styles.logo} />
            <h1 className={styles.title}>{title}</h1>
            {description && <RemoteHtmlRawText html={description} className={styles.description} />}
        </div>
    );
};

const ArticleSection = ({
    title,
    content,
    images,
    imagesOnTheLeft,
    className,
}: {
    title: string;
    content: string;
    images?: DocumentFullInformationFieldsFragment[];
    imagesOnTheLeft?: boolean;
    className?: string;
}) => {
    return (
        <div className={`${styles.articleContainer} ${imagesOnTheLeft ? styles.imagesOnTheLeft : ''} ${className}`}>
            <h2 className={styles.title}>{title}</h2>
            <RemoteHtml html={content ?? ''} className={styles.content} />
            {images && <Carousel images={images} className={styles.images} />}
        </div>
    );
};

export { RubriquePresentation, ArticleSection };
