import { gql } from './__generated__';

const ARTICLE = gql(`
    query Article($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            slug
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

export { ARTICLE, RUBRIQUE_PRESENTATION };
