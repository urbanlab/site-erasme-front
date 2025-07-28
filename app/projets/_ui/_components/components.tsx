import { RubriqueBasicInformationFieldsFragment } from '@services/graphql/__generated__/graphql';
import { RemoteHtmlRawText } from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './components.module.css';

const RubriquePresentation = ({ rubrique }: { rubrique: RubriqueBasicInformationFieldsFragment }) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage src={rubrique.logo ?? ''} alt="" maskShape="narrow" className={styles.logo} />
            <h1 className={styles.title}>{rubrique.titre}</h1>
            {rubrique.texte && (
                <h5 className={styles.description}>
                    <RemoteHtmlRawText html={rubrique.texte} removeInnerHtmlTags={true} />
                </h5>
            )}
        </div>
    );
};

export { RubriquePresentation };
