import { RemoteHtml } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './components.module.css';

const RubriquePresentation = ({ logo, title }: { logo: string; title: string }) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={logo ?? ''} alt="" maskShape="wide" className={styles.logo} />
            <h1 className={styles.title}>{title}</h1>
        </div>
    );
};

const DescriptionSection = ({ content, title }: { content: string; title?: string }) => {
    return (
        <div>
            {title && <h2>{title}</h2>}
            <RemoteHtml html={content} />
        </div>
    );
};

export { DescriptionSection, RubriquePresentation };
