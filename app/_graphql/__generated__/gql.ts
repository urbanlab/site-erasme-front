/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n    fragment paginationFields on Pagination {\n        currentPage\n        totalPages\n        hasNextPage\n        hasPreviousPage\n    }\n": typeof types.PaginationFieldsFragmentDoc,
    "\n    fragment articleInformationFields on Article {\n        id\n        titre\n        date\n        date_modif\n    }\n": typeof types.ArticleInformationFieldsFragmentDoc,
    "\n    fragment listProjetsFields on Rubrique{\n        id\n        titre\n        texte\n        date\n        articles {\n            ... on ArticlePagination {\n                pagination {\n                    ...paginationFields\n                }\n                result {\n                    ...articleInformationFields\n                }\n                \n            }\n        }\n    }\n": typeof types.ListProjetsFieldsFragmentDoc,
    "\n    fragment motsAndGroupMotsFromArticleFields on MotPagination {\n        result{\n            id\n            titre\n            groupe {\n                id\n                titre\n            }\n        }\n    }    \n": typeof types.MotsAndGroupMotsFromArticleFieldsFragmentDoc,
    "\n    fragment documentsFromArticleFields on DocumentPagination {\n        result {\n            id\n            alt\n            hauteur\n            largeur\n            fichier\n        }\n    }\n": typeof types.DocumentsFromArticleFieldsFragmentDoc,
    "\n    query Services($id: Int!) {\n        getRubrique(id: $id) {\n            logo\n            articles {\n                result {\n                    id\n                    titre\n                    texte\n                }\n            }\n        }\n    }\n": typeof types.ServicesDocument,
    "\n    query MentionsLegales($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    }\n": typeof types.MentionsLegalesDocument,
    "\n    query SimpleArticle($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    } \n": typeof types.SimpleArticleDocument,
    "\n    query Article($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            date\n            date_modif\n            logo\n            texte\n\n            #Prototypes\n            description_title\n            description\n            description_title_second\n            description_second\n            chiffres_cles\n            description_lateral_title\n            description_lateral\n            developpement\n            # descr_tech_technique\n\n            #We want to fetch all 'mots'\n            mots(pagination: 100) {\n                ...motsAndGroupMotsFromArticleFields\n            }\n\n            #We want to fetch all 'documents' (images)\n            documents (pagination: 100) {\n                ...documentsFromArticleFields\n            }\n\n            auteurs {\n                result {\n                    id\n                    titre\n                }  \n            }\n            \n            rubrique {\n                logo\n            }\n        }\n    }\n": typeof types.ArticleDocument,
    "\n    query RubriquePresentation($id: Int!) {\n        getRubrique(id: $id) {\n            titre\n            texte\n            logo\n        }\n    }\n": typeof types.RubriquePresentationDocument,
    "\n    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {\n        rubriques(where: [$where], pagination: $pagination, page: $page) {\n            pagination {\n                ...paginationFields\n            }\n            result {\n                ...listProjetsFields\n            }\n        }\n    }\n": typeof types.ListProjetsDocument,
    "\n    query Search($texte: String!, $pagination: Int = 10, $page: Int = 1) {\n        recherche(texte: $texte, pagination: $pagination, page: $page) {\n            result {\n                \n                ...on Rubrique {\n                    ...listProjetsFields\n                }\n                ...on Article {\n                    # ...articleInformationFields\n                    titre\n                    __typename\n                }\n            }\n        }\n    }": typeof types.SearchDocument,
};
const documents: Documents = {
    "\n    fragment paginationFields on Pagination {\n        currentPage\n        totalPages\n        hasNextPage\n        hasPreviousPage\n    }\n": types.PaginationFieldsFragmentDoc,
    "\n    fragment articleInformationFields on Article {\n        id\n        titre\n        date\n        date_modif\n    }\n": types.ArticleInformationFieldsFragmentDoc,
    "\n    fragment listProjetsFields on Rubrique{\n        id\n        titre\n        texte\n        date\n        articles {\n            ... on ArticlePagination {\n                pagination {\n                    ...paginationFields\n                }\n                result {\n                    ...articleInformationFields\n                }\n                \n            }\n        }\n    }\n": types.ListProjetsFieldsFragmentDoc,
    "\n    fragment motsAndGroupMotsFromArticleFields on MotPagination {\n        result{\n            id\n            titre\n            groupe {\n                id\n                titre\n            }\n        }\n    }    \n": types.MotsAndGroupMotsFromArticleFieldsFragmentDoc,
    "\n    fragment documentsFromArticleFields on DocumentPagination {\n        result {\n            id\n            alt\n            hauteur\n            largeur\n            fichier\n        }\n    }\n": types.DocumentsFromArticleFieldsFragmentDoc,
    "\n    query Services($id: Int!) {\n        getRubrique(id: $id) {\n            logo\n            articles {\n                result {\n                    id\n                    titre\n                    texte\n                }\n            }\n        }\n    }\n": types.ServicesDocument,
    "\n    query MentionsLegales($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    }\n": types.MentionsLegalesDocument,
    "\n    query SimpleArticle($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    } \n": types.SimpleArticleDocument,
    "\n    query Article($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            date\n            date_modif\n            logo\n            texte\n\n            #Prototypes\n            description_title\n            description\n            description_title_second\n            description_second\n            chiffres_cles\n            description_lateral_title\n            description_lateral\n            developpement\n            # descr_tech_technique\n\n            #We want to fetch all 'mots'\n            mots(pagination: 100) {\n                ...motsAndGroupMotsFromArticleFields\n            }\n\n            #We want to fetch all 'documents' (images)\n            documents (pagination: 100) {\n                ...documentsFromArticleFields\n            }\n\n            auteurs {\n                result {\n                    id\n                    titre\n                }  \n            }\n            \n            rubrique {\n                logo\n            }\n        }\n    }\n": types.ArticleDocument,
    "\n    query RubriquePresentation($id: Int!) {\n        getRubrique(id: $id) {\n            titre\n            texte\n            logo\n        }\n    }\n": types.RubriquePresentationDocument,
    "\n    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {\n        rubriques(where: [$where], pagination: $pagination, page: $page) {\n            pagination {\n                ...paginationFields\n            }\n            result {\n                ...listProjetsFields\n            }\n        }\n    }\n": types.ListProjetsDocument,
    "\n    query Search($texte: String!, $pagination: Int = 10, $page: Int = 1) {\n        recherche(texte: $texte, pagination: $pagination, page: $page) {\n            result {\n                \n                ...on Rubrique {\n                    ...listProjetsFields\n                }\n                ...on Article {\n                    # ...articleInformationFields\n                    titre\n                    __typename\n                }\n            }\n        }\n    }": types.SearchDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment paginationFields on Pagination {\n        currentPage\n        totalPages\n        hasNextPage\n        hasPreviousPage\n    }\n"): (typeof documents)["\n    fragment paginationFields on Pagination {\n        currentPage\n        totalPages\n        hasNextPage\n        hasPreviousPage\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment articleInformationFields on Article {\n        id\n        titre\n        date\n        date_modif\n    }\n"): (typeof documents)["\n    fragment articleInformationFields on Article {\n        id\n        titre\n        date\n        date_modif\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment listProjetsFields on Rubrique{\n        id\n        titre\n        texte\n        date\n        articles {\n            ... on ArticlePagination {\n                pagination {\n                    ...paginationFields\n                }\n                result {\n                    ...articleInformationFields\n                }\n                \n            }\n        }\n    }\n"): (typeof documents)["\n    fragment listProjetsFields on Rubrique{\n        id\n        titre\n        texte\n        date\n        articles {\n            ... on ArticlePagination {\n                pagination {\n                    ...paginationFields\n                }\n                result {\n                    ...articleInformationFields\n                }\n                \n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment motsAndGroupMotsFromArticleFields on MotPagination {\n        result{\n            id\n            titre\n            groupe {\n                id\n                titre\n            }\n        }\n    }    \n"): (typeof documents)["\n    fragment motsAndGroupMotsFromArticleFields on MotPagination {\n        result{\n            id\n            titre\n            groupe {\n                id\n                titre\n            }\n        }\n    }    \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    fragment documentsFromArticleFields on DocumentPagination {\n        result {\n            id\n            alt\n            hauteur\n            largeur\n            fichier\n        }\n    }\n"): (typeof documents)["\n    fragment documentsFromArticleFields on DocumentPagination {\n        result {\n            id\n            alt\n            hauteur\n            largeur\n            fichier\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Services($id: Int!) {\n        getRubrique(id: $id) {\n            logo\n            articles {\n                result {\n                    id\n                    titre\n                    texte\n                }\n            }\n        }\n    }\n"): (typeof documents)["\n    query Services($id: Int!) {\n        getRubrique(id: $id) {\n            logo\n            articles {\n                result {\n                    id\n                    titre\n                    texte\n                }\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query MentionsLegales($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    }\n"): (typeof documents)["\n    query MentionsLegales($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query SimpleArticle($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    } \n"): (typeof documents)["\n    query SimpleArticle($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            logo\n            texte\n        }\n    } \n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Article($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            date\n            date_modif\n            logo\n            texte\n\n            #Prototypes\n            description_title\n            description\n            description_title_second\n            description_second\n            chiffres_cles\n            description_lateral_title\n            description_lateral\n            developpement\n            # descr_tech_technique\n\n            #We want to fetch all 'mots'\n            mots(pagination: 100) {\n                ...motsAndGroupMotsFromArticleFields\n            }\n\n            #We want to fetch all 'documents' (images)\n            documents (pagination: 100) {\n                ...documentsFromArticleFields\n            }\n\n            auteurs {\n                result {\n                    id\n                    titre\n                }  \n            }\n            \n            rubrique {\n                logo\n            }\n        }\n    }\n"): (typeof documents)["\n    query Article($id: Int!) {\n        getArticle(id: $id) {\n            id\n            titre\n            date\n            date_modif\n            logo\n            texte\n\n            #Prototypes\n            description_title\n            description\n            description_title_second\n            description_second\n            chiffres_cles\n            description_lateral_title\n            description_lateral\n            developpement\n            # descr_tech_technique\n\n            #We want to fetch all 'mots'\n            mots(pagination: 100) {\n                ...motsAndGroupMotsFromArticleFields\n            }\n\n            #We want to fetch all 'documents' (images)\n            documents (pagination: 100) {\n                ...documentsFromArticleFields\n            }\n\n            auteurs {\n                result {\n                    id\n                    titre\n                }  \n            }\n            \n            rubrique {\n                logo\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query RubriquePresentation($id: Int!) {\n        getRubrique(id: $id) {\n            titre\n            texte\n            logo\n        }\n    }\n"): (typeof documents)["\n    query RubriquePresentation($id: Int!) {\n        getRubrique(id: $id) {\n            titre\n            texte\n            logo\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {\n        rubriques(where: [$where], pagination: $pagination, page: $page) {\n            pagination {\n                ...paginationFields\n            }\n            result {\n                ...listProjetsFields\n            }\n        }\n    }\n"): (typeof documents)["\n    query ListProjets($where: String!, $pagination: Int = 10, $page: Int = 1) {\n        rubriques(where: [$where], pagination: $pagination, page: $page) {\n            pagination {\n                ...paginationFields\n            }\n            result {\n                ...listProjetsFields\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query Search($texte: String!, $pagination: Int = 10, $page: Int = 1) {\n        recherche(texte: $texte, pagination: $pagination, page: $page) {\n            result {\n                \n                ...on Rubrique {\n                    ...listProjetsFields\n                }\n                ...on Article {\n                    # ...articleInformationFields\n                    titre\n                    __typename\n                }\n            }\n        }\n    }"): (typeof documents)["\n    query Search($texte: String!, $pagination: Int = 10, $page: Int = 1) {\n        recherche(texte: $texte, pagination: $pagination, page: $page) {\n            result {\n                \n                ...on Rubrique {\n                    ...listProjetsFields\n                }\n                ...on Article {\n                    # ...articleInformationFields\n                    titre\n                    __typename\n                }\n            }\n        }\n    }"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;