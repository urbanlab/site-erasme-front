import { RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

export default async function Prototypes() {
    const { data } = await query({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUES_PROTOTYPES_ID ?? '') },
    });

    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            {/* PRESENTATION SECTION */}
            <div className={styles.presentationContainer}>
                <ShapedImage
                    src={data.getRubrique?.logo ?? heroImage}
                    alt=""
                    maskShape="narrow"
                    className={styles.presentationImage}
                    width={1920} //TODO: get value from API
                    height={621} //TODO: get value from API
                />
                <div className={styles.presentationTextContainer}>
                    <h1>{data?.getRubrique?.titre}</h1>
                    {data?.getRubrique?.texte && (
                        <h5>
                            <RemoteHtml html={data.getRubrique.texte} />
                        </h5>
                    )}
                </div>
            </div>

            <div className={styles.contentContainer}></div>
        </div>
    );
}
