import { gql } from './__generated__';

const COLLECTIONS = gql(`
    query getCollections {
        getCollections
    }
`);

const ARTICLE = gql(`
    query Article($id: Int!) {
        getArticle(id: $id) {
            id
            titre
            slug
        }
    }
`);

export { ARTICLE, COLLECTIONS };
