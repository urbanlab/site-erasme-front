import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import {
    ArticleBasicInformationFieldsFragmentDoc,
    ArticleFullInformationFieldsFragmentDoc,
    AuteurBasicInformationFieldsFragmentDoc,
    AuteurFullInformationFieldsFragmentDoc,
    ListProjetsFieldsFragmentDoc,
    MotBasicInformationFieldsFragmentDoc,
    MotsAndGroupeMotsFieldsFragmentDoc,
    PrototypeInformationFieldsFragmentDoc,
    RubriqueBasicInformationFieldsFragmentDoc,
    RubriqueFullInformationFieldsFragmentDoc,
} from '@services/graphql/__generated__/graphql';
import {
    ACTIVE_AUTHORS,
    ALL_PROJECTS_AND_NESTED_COLLECTIONS,
    ARTICLE,
    ARTICLE_AND_PROTOTYPE,
    AUTEUR,
    GROUPE_MOTS_WITH_MOTS,
    HOMEPAGE,
    MOT,
    RUBRIQUE_PRESENTATION,
    RUBRIQUE_WITH_ARTICLES,
} from '@services/graphql/queries';
import { getClient } from '@services/apollo/apolloClient';

const getRubriqueWithArticles = async (
    id: number,
    withRubriqueFullInformation: boolean = false,
    withArticleFullInformation: boolean = false
) => {
    const { data } = await getClient().query({
        query: RUBRIQUE_WITH_ARTICLES,
        variables: {
            id: id,
            withRubriqueFullInformation: withRubriqueFullInformation,
            withArticleFullInformation: withArticleFullInformation,
        },
    });

    const rubriqueBasicInformation = getFragmentData(
        RubriqueBasicInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueBasicInformationFieldsFragmentDoc>
    );

    const rubriqueFullInformation = getFragmentData(
        RubriqueFullInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueFullInformationFieldsFragmentDoc>
    );

    const articlesFullInformation =
        getFragmentData(
            ArticleFullInformationFieldsFragmentDoc,
            data.getRubrique?.articles?.result as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>[]
        ) ?? [];

    const articlesBasicInformation =
        getFragmentData(
            ArticleBasicInformationFieldsFragmentDoc,
            data.getRubrique?.articles?.result as FragmentType<typeof ArticleBasicInformationFieldsFragmentDoc>[]
        ) ?? [];

    return { rubriqueBasicInformation, rubriqueFullInformation, articlesBasicInformation, articlesFullInformation };
};

const getArticle = async (id: number) => {
    const { data } = await getClient().query({
        query: ARTICLE,
        variables: { id: id },
    });

    const article = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    return { article };
};

const getRubrique = async (id: number, withRubriqueFullInformation: boolean = false) => {
    const { data } = await getClient().query({
        query: RUBRIQUE_PRESENTATION,
        variables: { id: id, withRubriqueFullInformation: withRubriqueFullInformation },
    });

    const rubriqueBasicInformation = getFragmentData(
        RubriqueBasicInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueBasicInformationFieldsFragmentDoc>
    );

    const rubriqueFullInformation = getFragmentData(
        RubriqueFullInformationFieldsFragmentDoc,
        data.getRubrique as FragmentType<typeof RubriqueFullInformationFieldsFragmentDoc>
    );

    return { rubriqueBasicInformation, rubriqueFullInformation };
};

const getAuteur = async (id: number) => {
    const { data } = await getClient().query({
        query: AUTEUR,
        variables: { id: id },
    });

    const auteur = getFragmentData(
        AuteurFullInformationFieldsFragmentDoc,
        data.getAuteur as FragmentType<typeof AuteurFullInformationFieldsFragmentDoc>
    );

    return { auteur };
};

const getMot = async (id: number) => {
    const { data } = await getClient().query({
        query: MOT,
        variables: { id: id },
    });

    const mot = getFragmentData(
        MotBasicInformationFieldsFragmentDoc,
        data.getMot as FragmentType<typeof MotBasicInformationFieldsFragmentDoc>
    );

    return { mot };
};

const getActiveAuteurs = async () => {
    const { data } = await getClient().query({
        query: ACTIVE_AUTHORS,
        variables: { idRubriqueEquipe: parseInt(process.env.SPIP_RUBRIQUE_EQUIPE_ID ?? '') },
    });

    const activeAuteurs =
        data.getRubrique?.articles?.result?.map(article => {
            const auteur = getFragmentData(
                AuteurBasicInformationFieldsFragmentDoc,
                article?.auteurs?.result?.at(0) as FragmentType<typeof AuteurBasicInformationFieldsFragmentDoc>
            );

            return auteur;
        }) ?? [];

    return { activeAuteurs };
};

const getAllProjets = async (withAuteurs: boolean = false) => {
    const { data } = await getClient().query({
        query: ALL_PROJECTS_AND_NESTED_COLLECTIONS,
        variables: {
            whereRubriques: [`id_parent=${process.env.SPIP_RUBRIQUE_PROJETS_ID}`],
            rubriquesOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
            withAuteurs: withAuteurs,
        },
    });

    const projets = getFragmentData(
        ListProjetsFieldsFragmentDoc,
        data?.rubriques?.result as FragmentType<typeof ListProjetsFieldsFragmentDoc>[]
    );

    return { projets };
};

const getGroupeMotsWithMots = async (id: number) => {
    const { data } = await getClient().query({
        query: GROUPE_MOTS_WITH_MOTS,
        variables: { idGroupeMots: id },
    });

    const groupeMotsWithMots = getFragmentData(
        MotsAndGroupeMotsFieldsFragmentDoc,
        data?.getGroupe_mots?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );

    return { groupeMotsWithMots };
};

const getPageArticleOrPrototype = async (id: number) => {
    const { data } = await getClient().query({
        query: ARTICLE_AND_PROTOTYPE,
        variables: { id: id },
    });

    const articleFields = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    const prototypeFields = getFragmentData(
        PrototypeInformationFieldsFragmentDoc,
        data.getArticle as FragmentType<typeof PrototypeInformationFieldsFragmentDoc>
    );

    const auteurs = getFragmentData(
        AuteurBasicInformationFieldsFragmentDoc,
        data.getArticle?.auteurs?.result as FragmentType<typeof AuteurBasicInformationFieldsFragmentDoc>[]
    );

    const motsAndGroupeMots = getFragmentData(
        MotsAndGroupeMotsFieldsFragmentDoc,
        data.getArticle?.mots?.result as FragmentType<typeof MotsAndGroupeMotsFieldsFragmentDoc>[]
    );

    const rubriqueParentLogo = data.getArticle?.rubrique?.logo;

    return { articleFields, prototypeFields, auteurs, motsAndGroupeMots, rubriqueParentLogo };
};

const getHomepage = async () => {
    const { data } = await getClient().query({
        query: HOMEPAGE,
        variables: {
            idMotActus: parseInt(process.env.SPIP_MOT_ACTUS_ID ?? ''),
            idRubriqueServices: parseInt(process.env.SPIP_RUBRIQUE_SERVICES_ID ?? ''),
            idArticleMission: parseInt(process.env.SPIP_RUBRIQUE_HOMEPAGE_ARTICLE_MISSION_ID ?? ''),
            idArticlePresentationErasme: parseInt(
                process.env.SPIP_RUBRIQUE_HOMEPAGE_ARTICLE_PRESENTATION_ERASME_ID ?? ''
            ),
        },
    });

    const presentationErasmeArticle = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.presentationErasme as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    const missionArticle = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.mission as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>
    );

    const enCeMomentArticles = getFragmentData(
        ArticleFullInformationFieldsFragmentDoc,
        data.getMot?.articles?.result as FragmentType<typeof ArticleFullInformationFieldsFragmentDoc>[]
    );

    const servicesArticles = getFragmentData(
        ArticleBasicInformationFieldsFragmentDoc,
        data.getRubrique?.articles?.result as FragmentType<typeof ArticleBasicInformationFieldsFragmentDoc>[]
    );

    // Get a list of existing articles IDs for the archive section
    const archiveArticleIdList: string[] = data.articles?.result?.map(article => article?.id ?? '') ?? [];

    return { presentationErasmeArticle, missionArticle, enCeMomentArticles, servicesArticles, archiveArticleIdList };
};

export {
    getActiveAuteurs,
    getAllProjets,
    getArticle,
    getAuteur,
    getGroupeMotsWithMots,
    getHomepage,
    getMot,
    getPageArticleOrPrototype,
    getRubrique,
    getRubriqueWithArticles,
};
