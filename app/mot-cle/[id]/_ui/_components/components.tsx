import ShapedImage from '@ui/components/shapedImage';
import styles from './components.module.css';
import { MotBasicInformationFieldsFragment } from '@services/graphql/__generated__/graphql';

const MotClePresentation = async ({
    keywordInformation,
}: {
    keywordInformation: MotBasicInformationFieldsFragment;
}) => {
    return (
        <div className={styles.presentationContainer}>
            <ShapedImage
                src={keywordInformation.logo ?? ''}
                alt="photo du partenaire"
                maskShape="wide"
                className={styles.logo}
            />
            <h1 className={styles.title}>{keywordInformation.titre}</h1>
        </div>
    );
};

export { MotClePresentation };
