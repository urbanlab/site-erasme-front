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

// TODO: VOIR OMMENT TRAVAILLER AVEC DES FRAGMENTS. LE TYPE LISTPROJETQURY VA APPARAITRE DANS
// D'AUTRES ENDROITS ET IL ME FAUDRA BIND EUX AUSSI.
//  EX: PAGE EUIPE -> TYPEQUEEMNT, ÇA SERA UNE REQEUTE 'auteurs' avec le champs RUBRIQUES inclus. Cette partie devra être
// bindé à l'accordion (du coup il faut que ça soit le meme type)
// Ça sera la meme problematique pour le resultate de la recherche!

const LIST_PROJETS = gql(`
    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {
        rubriques(where: [$where], pagination: $pagination, page: $page) {
            pagination{
                ...paginationFields
            }
            result {
                id
                titre
                texte
                date
                articles {
                    ... on ArticlePagination {
                        pagination {
                            ...paginationFields
                        }
                        result {
                            ...articleInformationFields
                        }
                        
                    }
                }
            }
        }
    }
`);

export { ARTICLE, RUBRIQUE_PRESENTATION, LIST_PROJETS, MENTIONS_LEGALES, SERVICES, SIMPLE_ARTICLE };
