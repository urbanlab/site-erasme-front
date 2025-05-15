import { LIST_PROJETS, RUBRIQUE_PRESENTATION } from '@graphql/queries';
import heroImage from '@public/hero-img.svg';
import { query } from '@services/apollo/apolloClient';
import RemoteHtml from '@services/remoteHtml';
import ShapedImage from '@ui/components/shapedImage';
import styles from './page.module.css';

const RubriquePresentation = async () => {
    const { data } = await query({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: parseInt(process.env.SPIP_RUBRIQUES_PROJETS_ID ?? '') },
    });

    return (
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
    );
};

const ListProjets = async () => {
    const { data } = await query({
        query: LIST_PROJETS,
        variables: { where: `id_parent=${process.env.SPIP_RUBRIQUES_PROJETS_ID}` },
    });
    return (
        <ul>
            {data.rubriques?.result?.map(projet => {
                return <li key={projet?.id}>{projet?.titre}</li>;
            })}
        </ul>
    );
};

export default async function Projets() {
    return (
        <div className={`${styles.mainContainer} ${styles.localVariables}`}>
            <RubriquePresentation />

            <ListProjets />
        </div>
    );
}
