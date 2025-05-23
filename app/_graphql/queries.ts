import { gql } from './__generated__';

const MENTIONS_LEGALES = gql(`
    query MentionsLegales($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            logo
            texte
        }
    }`);

const ARTICLE = gql(`
    query Article($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            date
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

const LIST_PROJETS = gql(`
    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {
        rubriques(where: [$where], pagination: $pagination, page: $page) {
            result {
                id
                titre
                texte

                articles {
                    result {
                        id
                        titre
                        date
                        date_modif
                    }
                }
            }
        }
    }
`);

export { ARTICLE, RUBRIQUE_PRESENTATION, LIST_PROJETS };
