import { gql } from './__generated__';
import './fragments';

const SERVICES_RUBRIQUE = gql(`
    query ServicesRubrique($id: Int!) {
        getRubrique(id: $id) {
            logo
            articles {
                result {
                    id
                    titre
                    texte
                }
            }
        }
    }
`);

const ARTICLE_BASIC = gql(`
    query ArticleBasic($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            texte
            logo
        }
    }
`);

const ARTICLE_AND_PROTOTYPE = gql(`
    query ArticleAndPrototype($id: Int!) {
        getArticle(id: $id) {
            ...articleInformationFields
            
            logo
            texte

            isprototype
            #Prototypes
            description_title
            description
            description_title_second
            description_second
            chiffres_cles
            description_lateral_title
            description_lateral
            developpement
            # descr_tech_technique

            #We want to fetch all 'mots'
            mots(pagination: 100) {
                ...motsAndGroupMotsFromArticleFields
            }

            #We want to fetch all 'documents' (images)
            documents (pagination: 100) {
                ...documentsFromArticleFields
            }

            auteurs {
                result {
                    id
                    titre
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
            id
            titre
            texte
            logo
        }
    }
`);

const LIST_PROJETS = gql(`
    query ListProjets(
            $where: [String!],
            $rubriquesOrderBy: [String!],
            $articlesInRubriqueOrderBy: [String!],
            $pagination: Int = 10,
            $page: Int = 1) {
        rubriques(where: $where, orderby: $rubriquesOrderBy, pagination: $pagination, page: $page) {
            pagination {
                ...paginationFields
            }
            result {
                ...listProjetsFields
            }
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
    query Search($texte: String!, $generalOrderBy: [String!], $articlesInRubriqueOrderBy: [String!], $pagination: Int = 5000, $page: Int = 1, $where: String!) {
        recherche(texte: $texte, orderby: $generalOrderBy, pagination: $pagination, page: $page, where: $where) {
            result {
                ...on Rubrique {
                    ...listProjetsFields
                }
                ...on Article {
                    ...articleInformationFields
                }
            }
        }
    }`);


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
 * To make sure all the items are included in the response, we use a high 'pagination' value.
 * 
 * For performance reasons, the query should be done on server side components.
 */
const ALL_PROJECTS_AND_NESTED_COLLECTIONS = gql(`
    query AllProjectsAndNestedCollections(
            $where: [String!],
            $rubriquesOrderBy: [String!],
            $articlesInRubriqueOrderBy: [String!],
            $pagination: Int = 5000,
            $page: Int = 1) {
        rubriques(where: $where, orderby: $rubriquesOrderBy, pagination: $pagination, page: $page) {
            pagination {
                ...paginationFields
            }
            result {
                ...listProjetsFields
            }
        }
    }
`);

export { ARTICLE_AND_PROTOTYPE, RUBRIQUE_PRESENTATION, LIST_PROJETS, ARTICLE_BASIC, SERVICES_RUBRIQUE, SEARCH, ALL_PROJECTS_AND_NESTED_COLLECTIONS };
