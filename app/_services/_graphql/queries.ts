import { gql } from './__generated__';
import './fragments';

const ARTICLE = gql(`
    query Article($id: Int!) {
        getArticle(id: $id) {
            ...articleFullInformationFields
        }
    }
`);

const ARTICLE_AND_PROTOTYPE = gql(`
    query ArticleAndPrototype($id: Int!) {
        getArticle(id: $id) {
            ...articleFullInformationFields
            
            ...prototypeInformationFields

            #We want to fetch all 'mots'
            mots(pagination: 100) {
                result {
                    ...motsAndGroupeMotsFields
                }
            }

            auteurs {
                result {
                    ...auteurBasicInformationFields
                }  
            }
            
            rubrique {
                logo
            }
        }
    }
`);

const RUBRIQUE_PRESENTATION = gql(`
    query RubriquePresentation($id: Int!) {
        getRubrique(id: $id) {
            ...rubriqueBasicInformationFields
        }
    }
`);

const RUBRIQUE_WITH_ARTICLES = gql(`
    query RubriqueWithArticles(
            $id: Int!,
            $articleFullInformation: Boolean! = false
        ) {
        getRubrique(id: $id) {
            ...rubriqueBasicInformationFields

            articles(pagination: 500) {
                result {
                    ...articleFullInformationFields @include(if: $articleFullInformation)
                    ...articleBasicInformationFields @skip(if: $articleFullInformation)
                }
            }
        }
    }
`);

const MOT = gql(`
    query Mot($id: Int!) {
        getMot(id: $id) {
            ...motBasicInformationFields
        }
    }
`);

const AUTEUR = gql(`
    query Auteur($id: Int!) {
        getAuteur(id: $id) {
            ...auteurFullInformationFields
        }
    }
`);

/**
 * The current implementation of the search endpoint doesn't give the option to pre-filter
 * which category (article, rubrique..) to search for. We are obligated to fetch all the categories
 * each time.
 * To make sure all the items are included in the response, we use a high 'pagination' value.
 * The filters are applied later, by the search hook function.
 */
const SEARCH = gql(`
    query Search(
            $texte: String!, 
            $generalOrderBy: [String!],
            $articlesInRubriqueOrderBy: [String!], 
            $pagination: Int = 5000, 
            $page: Int = 1, 
            $where: String!,
            $withAuteurs: Boolean = false,
            $whereAuteurs: [String!]) {
        recherche(texte: $texte, orderby: $generalOrderBy, pagination: $pagination, page: $page, where: $where) {
            result {
                ...on Rubrique {
                    ...listProjetsFields
                }
                ...on Article {
                    ...articleBasicInformationFields
                }
                ...on Document {
                    ...documentBasicInformationFields
                }
            }
        }
    }
`);

/**
 * This is a workaround for the current graphql SPIP endpoint.
 *
 * We are not able to filter on nested relationships, i.e:
 *  It is not possible to use `where: [articles.isprotoype=on]`
 *  to get only the `rubriques` having articles that satisfy the filter.
 *
 * Hence, all the filtering will be done on the frontend side. For this, we need
 * to have the complete list of `projects`/`articles` and their associated `mots`
 * when reaching the page in order to be able to use the predefined filters.
 *
 * If you want to include information from a specific author (typically for `equipe/[id]` page),
 * make sure to set `$withAuteurs` to `true` and to pass an `$idAuteur` parameter as well.
 *
 * To make sure all the items are included in the response, we use a high 'pagination' value.
 *
 * For performance reasons, the query should be done on server side components.
 */
const ALL_PROJECTS_AND_NESTED_COLLECTIONS = gql(`
    query AllProjectsAndNestedCollections(
            $whereRubriques: [String!],
            $rubriquesOrderBy: [String!],
            $articlesInRubriqueOrderBy: [String!],
            $withAuteurs: Boolean = false,
            $pagination: Int = 5000,
            $page: Int = 1
        ) {
        rubriques(where: $whereRubriques, orderby: $rubriquesOrderBy, pagination: $pagination, page: $page) {
            pagination {
                ...paginationFields
            }
            result {
                ...listProjetsFields
            }
        }
    }
`);

const ACTIVE_AUTHORS = gql(`
    query ActiveAuthors(
        $idRubriqueEquipe: Int!
    ) {
        getRubrique(id: $idRubriqueEquipe) {
            id
            titre
            texte
            logo

            articles(pagination: 100) {
                result {
                    id
                    auteurs {
                        result {
                            ...auteurBasicInformationFields
                        }
                    }
                }
            }
        }
    }
`);

const GROUPE_MOTS_WITH_MOTS = gql(`
    query MotsFromGroupeMots(
        $idGroupeMots: Int!
    ){
        getGroupe_mots(id: $idGroupeMots){
            id
            titre

            mots(pagination: 500) {
                result {
                    ...motsAndGroupeMotsFields
                }
            }
        }
    }
`);

const HOMEPAGE = gql(`
    query Homepage(
        $idMotActus: Int!,
        $numberOfActus: Int = 4
        $idRubriqueServices: Int!
    ){
        getMot(id: $idMotActus) {
            id
            articles(orderby: ["date_DESC"], pagination: $numberOfActus) {
                result{
                    ...articleFullInformationFields
                }
            }
        }
        articles(pagination: 5000) {
            result {
                id
            }
        }
        getRubrique(id: $idRubriqueServices) {
            id
            articles {
                result {
                    ...articleBasicInformationFields
                }
            }
        }
    }
`);

export {
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
    SEARCH,
};
