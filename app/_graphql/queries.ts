import { gql } from './__generated__';
import './fragments';

const SERVICES = gql(`
    query Services($id: Int!) {
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

const MENTIONS_LEGALES = gql(`
    query MentionsLegales($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            logo
            texte
        }
    }
`);

const SIMPLE_ARTICLE = gql(`
    query SimpleArticle($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            logo
            texte
        }
    } 
`);

const ARTICLE = gql(`
    query Article($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            date
            date_modif
            logo
            texte

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
            titre
            texte
            logo
        }
    }
`);

const LIST_PROJETS = gql(`
    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {
        rubriques(where: [$where], pagination: $pagination, page: $page) {
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
    query Search($texte: String!, $pagination: Int = 10, $page: Int = 1) {
        recherche(texte: $texte, pagination: $pagination, page: $page) {
            result {
                
                ...on Rubrique {
                    ...listProjetsFields
                }
                ...on Article {
                    # ...articleInformationFields
                    titre
                    __typename
                }
            }
        }
    }`);

export { ARTICLE, RUBRIQUE_PRESENTATION, LIST_PROJETS, MENTIONS_LEGALES, SERVICES, SIMPLE_ARTICLE, SEARCH };
