/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Format : AAAA-MM-JJ HH:MM:SS */
  Date: { input: any; output: any; }
};

/** Un objet Article */
export type Article = Objet & {
  __typename?: 'Article';
  accepter_forum?: Maybe<Scalars['String']['output']>;
  auteurs?: Maybe<AuteurPagination>;
  chapo?: Maybe<Scalars['String']['output']>;
  chiffres_cles?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  date_modif?: Maybe<Scalars['Date']['output']>;
  date_redac?: Maybe<Scalars['Date']['output']>;
  descr_tech_depot?: Maybe<Scalars['String']['output']>;
  descr_tech_devices?: Maybe<Scalars['String']['output']>;
  descr_tech_framework?: Maybe<Scalars['String']['output']>;
  descr_tech_licence?: Maybe<Scalars['String']['output']>;
  descr_tech_technique?: Maybe<Scalars['String']['output']>;
  descriptif?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  description_lateral?: Maybe<Scalars['String']['output']>;
  description_lateral_title?: Maybe<Scalars['String']['output']>;
  description_second?: Maybe<Scalars['String']['output']>;
  description_third?: Maybe<Scalars['String']['output']>;
  description_title?: Maybe<Scalars['String']['output']>;
  description_title_second?: Maybe<Scalars['String']['output']>;
  description_title_third?: Maybe<Scalars['String']['output']>;
  developpement?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<DocumentPagination>;
  export?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  information_communaute_utilisateurs?: Maybe<Scalars['String']['output']>;
  information_entreprises?: Maybe<Scalars['String']['output']>;
  information_mailing?: Maybe<Scalars['String']['output']>;
  information_site_web?: Maybe<Scalars['String']['output']>;
  isprototype?: Maybe<Scalars['String']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  langue_choisie?: Maybe<Scalars['String']['output']>;
  linked_rub?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  media?: Maybe<Scalars['String']['output']>;
  mots?: Maybe<MotPagination>;
  points?: Maybe<Scalars['Int']['output']>;
  popularite?: Maybe<Scalars['Float']['output']>;
  ps?: Maybe<Scalars['String']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  referers?: Maybe<Scalars['Int']['output']>;
  rubrique?: Maybe<Rubrique>;
  secteur?: Maybe<Rubrique>;
  slug?: Maybe<Scalars['String']['output']>;
  soustitre?: Maybe<Scalars['String']['output']>;
  statut?: Maybe<Scalars['String']['output']>;
  surtitre?: Maybe<Scalars['String']['output']>;
  texte?: Maybe<Scalars['String']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  trad?: Maybe<Article>;
  typeCollection?: Maybe<Collection>;
  url_site?: Maybe<Scalars['String']['output']>;
  virtuel?: Maybe<Scalars['String']['output']>;
  visites?: Maybe<Scalars['Int']['output']>;
};


/** Un objet Article */
export type ArticleAuteursArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Article */
export type ArticleDocumentsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Article */
export type ArticleMotsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type ArticlePagination = ObjetPagination & {
  __typename?: 'ArticlePagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Article>>>;
};

/** Un objet Auteur */
export type Auteur = Objet & {
  __typename?: 'Auteur';
  alea_actuel?: Maybe<Scalars['String']['output']>;
  alea_futur?: Maybe<Scalars['String']['output']>;
  articles?: Maybe<ArticlePagination>;
  auteur_compte_linkedin?: Maybe<Scalars['String']['output']>;
  auteur_compte_twitter?: Maybe<Scalars['String']['output']>;
  backup_cles?: Maybe<Scalars['String']['output']>;
  cookie_oubli?: Maybe<Scalars['String']['output']>;
  descriptif?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<DocumentPagination>;
  email?: Maybe<Scalars['String']['output']>;
  en_ligne?: Maybe<Scalars['Date']['output']>;
  htpass?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  imessage?: Maybe<Scalars['String']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  login?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  low_sec?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  pass?: Maybe<Scalars['String']['output']>;
  pgp?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  prefs?: Maybe<Scalars['String']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  rubriques?: Maybe<RubriquePagination>;
  slug?: Maybe<Scalars['String']['output']>;
  source?: Maybe<Scalars['String']['output']>;
  statut?: Maybe<Scalars['String']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  typeCollection?: Maybe<Collection>;
  url_site?: Maybe<Scalars['String']['output']>;
  webmestre?: Maybe<Scalars['String']['output']>;
};


/** Un objet Auteur */
export type AuteurArticlesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Auteur */
export type AuteurDocumentsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Auteur */
export type AuteurRubriquesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type AuteurPagination = ObjetPagination & {
  __typename?: 'AuteurPagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Auteur>>>;
};

/** Énumération des collections disponibles */
export enum Collection {
  Articles = 'ARTICLES',
  Auteurs = 'AUTEURS',
  Documents = 'DOCUMENTS',
  GroupesMots = 'GROUPES_MOTS',
  Mots = 'MOTS',
  Rubriques = 'RUBRIQUES'
}

/** Un objet Document */
export type Document = Objet & {
  __typename?: 'Document';
  alt?: Maybe<Scalars['String']['output']>;
  brise?: Maybe<Scalars['String']['output']>;
  credits?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  date_publication?: Maybe<Scalars['Date']['output']>;
  descriptif?: Maybe<Scalars['String']['output']>;
  distant?: Maybe<Scalars['String']['output']>;
  duree?: Maybe<Scalars['Int']['output']>;
  extension?: Maybe<Scalars['String']['output']>;
  fichier?: Maybe<Scalars['String']['output']>;
  hauteur?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  largeur?: Maybe<Scalars['Int']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  media?: Maybe<Scalars['String']['output']>;
  mode?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  statut?: Maybe<Scalars['String']['output']>;
  taille?: Maybe<Scalars['Int']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  typeCollection?: Maybe<Collection>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type DocumentPagination = ObjetPagination & {
  __typename?: 'DocumentPagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Document>>>;
};

/** Un objet Groupe_mots */
export type Groupe_Mots = Objet & {
  __typename?: 'Groupe_mots';
  comite?: Maybe<Scalars['String']['output']>;
  descriptif?: Maybe<Scalars['String']['output']>;
  forum?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  minirezo?: Maybe<Scalars['String']['output']>;
  mots?: Maybe<MotPagination>;
  obligatoire?: Maybe<Scalars['String']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  tables_liees?: Maybe<Scalars['String']['output']>;
  texte?: Maybe<Scalars['String']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  typeCollection?: Maybe<Collection>;
  unseul?: Maybe<Scalars['String']['output']>;
};


/** Un objet Groupe_mots */
export type Groupe_MotsMotsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type Groupe_MotsPagination = ObjetPagination & {
  __typename?: 'Groupe_motsPagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Groupe_Mots>>>;
};

/** Métas autorisées */
export type MetaList = {
  __typename?: 'MetaList';
  adresse_site?: Maybe<Scalars['String']['output']>;
  descriptif_site?: Maybe<Scalars['String']['output']>;
  nom_site?: Maybe<Scalars['String']['output']>;
  slogan_site?: Maybe<Scalars['String']['output']>;
};

/** Un objet Mot */
export type Mot = Objet & {
  __typename?: 'Mot';
  articles?: Maybe<ArticlePagination>;
  descriptif?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<DocumentPagination>;
  groupe?: Maybe<Groupe_Mots>;
  id?: Maybe<Scalars['ID']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  rubriques?: Maybe<RubriquePagination>;
  slug?: Maybe<Scalars['String']['output']>;
  texte?: Maybe<Scalars['String']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  typeCollection?: Maybe<Collection>;
};


/** Un objet Mot */
export type MotArticlesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Mot */
export type MotDocumentsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Mot */
export type MotRubriquesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type MotPagination = ObjetPagination & {
  __typename?: 'MotPagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Mot>>>;
};

/** Un objet */
export type Objet = {
  descriptif?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  points?: Maybe<Scalars['Int']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  typeCollection?: Maybe<Collection>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type ObjetPagination = {
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Objet>>>;
};

/** Représente la page courante et le nombre de pages */
export type Pagination = {
  __typename?: 'Pagination';
  currentPage: Scalars['Int']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

/** Liste des requêtes disponibles */
export type Query = {
  __typename?: 'Query';
  /** Retourne une collection d'objets Article */
  articles?: Maybe<ArticlePagination>;
  /** Retourne une collection d'objets Auteur */
  auteurs?: Maybe<AuteurPagination>;
  /** Retourne une collection d'objets Document */
  documents?: Maybe<DocumentPagination>;
  /** Retourne un objet Article */
  getArticle?: Maybe<Article>;
  /** Retourne un objet Auteur */
  getAuteur?: Maybe<Auteur>;
  /** Retourne la liste des collections disponibles */
  getCollections: Array<Maybe<Collection>>;
  /** Retourne un objet Document */
  getDocument?: Maybe<Document>;
  /** Retourne un objet Groupe_mots */
  getGroupe_mots?: Maybe<Groupe_Mots>;
  /** Retourne les métas autorisées */
  getMetas: MetaList;
  /** Retourne un objet Mot */
  getMot?: Maybe<Mot>;
  /** Retourne un objet Rubrique */
  getRubrique?: Maybe<Rubrique>;
  /** Retourne une collection d'objets Groupe_mots */
  groupes_mots?: Maybe<Groupe_MotsPagination>;
  /** Retourne une collection d'objets Mot */
  mots?: Maybe<MotPagination>;
  /** Résultats de recherche sur les objets */
  recherche: RecherchePagination;
  /** Retourne une collection d'objets Rubrique */
  rubriques?: Maybe<RubriquePagination>;
};


/** Liste des requêtes disponibles */
export type QueryArticlesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Liste des requêtes disponibles */
export type QueryAuteursArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Liste des requêtes disponibles */
export type QueryDocumentsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Liste des requêtes disponibles */
export type QueryGetArticleArgs = {
  id: Scalars['Int']['input'];
};


/** Liste des requêtes disponibles */
export type QueryGetAuteurArgs = {
  id: Scalars['Int']['input'];
};


/** Liste des requêtes disponibles */
export type QueryGetDocumentArgs = {
  id: Scalars['Int']['input'];
};


/** Liste des requêtes disponibles */
export type QueryGetGroupe_MotsArgs = {
  id: Scalars['Int']['input'];
};


/** Liste des requêtes disponibles */
export type QueryGetMotArgs = {
  id: Scalars['Int']['input'];
};


/** Liste des requêtes disponibles */
export type QueryGetRubriqueArgs = {
  id: Scalars['Int']['input'];
};


/** Liste des requêtes disponibles */
export type QueryGroupes_MotsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Liste des requêtes disponibles */
export type QueryMotsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Liste des requêtes disponibles */
export type QueryRechercheArgs = {
  lang?: Scalars['String']['input'];
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  texte?: Scalars['String']['input'];
  where?: Scalars['String']['input'];
};


/** Liste des requêtes disponibles */
export type QueryRubriquesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};

/** Résultats de recherche */
export type RecherchePagination = {
  __typename?: 'RecherchePagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<SearchResult>>>;
};

/** Un objet Rubrique */
export type Rubrique = Objet & {
  __typename?: 'Rubrique';
  articles?: Maybe<ArticlePagination>;
  auteurs?: Maybe<AuteurPagination>;
  couleur_tab?: Maybe<Scalars['String']['output']>;
  date?: Maybe<Scalars['Date']['output']>;
  date_tmp?: Maybe<Scalars['Date']['output']>;
  descriptif?: Maybe<Scalars['String']['output']>;
  documents?: Maybe<DocumentPagination>;
  id?: Maybe<Scalars['ID']['output']>;
  lang?: Maybe<Scalars['String']['output']>;
  langue_choisie?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  maj?: Maybe<Scalars['Date']['output']>;
  mots?: Maybe<MotPagination>;
  ordre_menu?: Maybe<Scalars['String']['output']>;
  parent?: Maybe<Rubrique>;
  points?: Maybe<Scalars['Int']['output']>;
  profondeur?: Maybe<Scalars['Int']['output']>;
  rang?: Maybe<Scalars['Int']['output']>;
  rubriques?: Maybe<RubriquePagination>;
  secteur?: Maybe<Rubrique>;
  slug?: Maybe<Scalars['String']['output']>;
  statut?: Maybe<Scalars['String']['output']>;
  statut_tmp?: Maybe<Scalars['String']['output']>;
  texte?: Maybe<Scalars['String']['output']>;
  titre?: Maybe<Scalars['String']['output']>;
  typeCollection?: Maybe<Collection>;
};


/** Un objet Rubrique */
export type RubriqueArticlesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Rubrique */
export type RubriqueAuteursArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Rubrique */
export type RubriqueDocumentsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Rubrique */
export type RubriqueMotsArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};


/** Un objet Rubrique */
export type RubriqueRubriquesArgs = {
  orderby?: Array<Scalars['String']['input']>;
  page?: Scalars['Int']['input'];
  pagination?: Scalars['Int']['input'];
  where?: Array<Scalars['String']['input']>;
};

/** Résultats d'une liste d'objets et de sa pagination */
export type RubriquePagination = ObjetPagination & {
  __typename?: 'RubriquePagination';
  pagination?: Maybe<Pagination>;
  result?: Maybe<Array<Maybe<Rubrique>>>;
};

/** Type UNION permettant de retourner n'importe quel type d'objet */
export type SearchResult = Article | Auteur | Document | Groupe_Mots | Mot | Rubrique;

export type PaginationFieldsFragment = { __typename?: 'Pagination', currentPage: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean, totalItems: number } & { ' $fragmentName'?: 'PaginationFieldsFragment' };

export type ArticleInformationFieldsFragment = { __typename?: 'Article', id?: string | null, titre?: string | null, date?: any | null, date_modif?: any | null, isprototype?: string | null } & { ' $fragmentName'?: 'ArticleInformationFieldsFragment' };

export type ListProjetsFieldsFragment = { __typename?: 'Rubrique', id?: string | null, titre?: string | null, texte?: string | null, date?: any | null, articles?: { __typename?: 'ArticlePagination', pagination?: (
      { __typename?: 'Pagination' }
      & { ' $fragmentRefs'?: { 'PaginationFieldsFragment': PaginationFieldsFragment } }
    ) | null, result?: Array<(
      { __typename?: 'Article', mots?: { __typename?: 'MotPagination', result?: Array<(
          { __typename?: 'Mot' }
          & { ' $fragmentRefs'?: { 'MotFieldsFragment': MotFieldsFragment } }
        ) | null> | null } | null }
      & { ' $fragmentRefs'?: { 'ArticleInformationFieldsFragment': ArticleInformationFieldsFragment } }
    ) | null> | null } | null } & { ' $fragmentName'?: 'ListProjetsFieldsFragment' };

export type MotFieldsFragment = { __typename?: 'Mot', id?: string | null, titre?: string | null } & { ' $fragmentName'?: 'MotFieldsFragment' };

export type MotsAndGroupMotsFromArticleFieldsFragment = { __typename?: 'MotPagination', result?: Array<{ __typename?: 'Mot', id?: string | null, titre?: string | null, groupe?: { __typename?: 'Groupe_mots', id?: string | null, titre?: string | null } | null } | null> | null } & { ' $fragmentName'?: 'MotsAndGroupMotsFromArticleFieldsFragment' };

export type DocumentsFromArticleFieldsFragment = { __typename?: 'DocumentPagination', result?: Array<{ __typename?: 'Document', id?: string | null, alt?: string | null, hauteur?: number | null, largeur?: number | null, fichier?: string | null } | null> | null } & { ' $fragmentName'?: 'DocumentsFromArticleFieldsFragment' };

export type ServicesRubriqueQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ServicesRubriqueQuery = { __typename?: 'Query', getRubrique?: { __typename?: 'Rubrique', logo?: string | null, articles?: { __typename?: 'ArticlePagination', result?: Array<{ __typename?: 'Article', id?: string | null, titre?: string | null, texte?: string | null } | null> | null } | null } | null };

export type ArticleBasicQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ArticleBasicQuery = { __typename?: 'Query', getArticle?: { __typename?: 'Article', id?: string | null, titre?: string | null, texte?: string | null, logo?: string | null } | null };

export type ArticleAndPrototypeQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ArticleAndPrototypeQuery = { __typename?: 'Query', getArticle?: (
    { __typename?: 'Article', logo?: string | null, texte?: string | null, isprototype?: string | null, description_title?: string | null, description?: string | null, description_title_second?: string | null, description_second?: string | null, chiffres_cles?: string | null, description_lateral_title?: string | null, description_lateral?: string | null, developpement?: string | null, mots?: (
      { __typename?: 'MotPagination' }
      & { ' $fragmentRefs'?: { 'MotsAndGroupMotsFromArticleFieldsFragment': MotsAndGroupMotsFromArticleFieldsFragment } }
    ) | null, documents?: (
      { __typename?: 'DocumentPagination' }
      & { ' $fragmentRefs'?: { 'DocumentsFromArticleFieldsFragment': DocumentsFromArticleFieldsFragment } }
    ) | null, auteurs?: { __typename?: 'AuteurPagination', result?: Array<{ __typename?: 'Auteur', id?: string | null, titre?: string | null } | null> | null } | null, rubrique?: { __typename?: 'Rubrique', logo?: string | null } | null }
    & { ' $fragmentRefs'?: { 'ArticleInformationFieldsFragment': ArticleInformationFieldsFragment } }
  ) | null };

export type RubriquePresentationQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RubriquePresentationQuery = { __typename?: 'Query', getRubrique?: { __typename?: 'Rubrique', id?: string | null, titre?: string | null, texte?: string | null, logo?: string | null } | null };

export type SearchQueryVariables = Exact<{
  texte: Scalars['String']['input'];
  generalOrderBy?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  articlesInRubriqueOrderBy?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  pagination?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  where: Scalars['String']['input'];
  whereMots?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type SearchQuery = { __typename?: 'Query', recherche: { __typename?: 'RecherchePagination', result?: Array<(
      { __typename?: 'Article' }
      & { ' $fragmentRefs'?: { 'ArticleInformationFieldsFragment': ArticleInformationFieldsFragment } }
    ) | { __typename?: 'Auteur' } | { __typename?: 'Document' } | { __typename?: 'Groupe_mots' } | { __typename?: 'Mot' } | (
      { __typename?: 'Rubrique' }
      & { ' $fragmentRefs'?: { 'ListProjetsFieldsFragment': ListProjetsFieldsFragment } }
    ) | null> | null } };

export type AllProjectsAndNestedCollectionsQueryVariables = Exact<{
  whereRubriques?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  rubriquesOrderBy?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  articlesInRubriqueOrderBy?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  whereMots?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  pagination?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AllProjectsAndNestedCollectionsQuery = { __typename?: 'Query', rubriques?: { __typename?: 'RubriquePagination', pagination?: (
      { __typename?: 'Pagination' }
      & { ' $fragmentRefs'?: { 'PaginationFieldsFragment': PaginationFieldsFragment } }
    ) | null, result?: Array<(
      { __typename?: 'Rubrique' }
      & { ' $fragmentRefs'?: { 'ListProjetsFieldsFragment': ListProjetsFieldsFragment } }
    ) | null> | null } | null, mots?: { __typename?: 'MotPagination', result?: Array<(
      { __typename?: 'Mot' }
      & { ' $fragmentRefs'?: { 'MotFieldsFragment': MotFieldsFragment } }
    ) | null> | null } | null };

export const PaginationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"paginationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}}]} as unknown as DocumentNode<PaginationFieldsFragment, unknown>;
export const ArticleInformationFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleInformationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"date_modif"}},{"kind":"Field","name":{"kind":"Name","value":"isprototype"}}]}}]} as unknown as DocumentNode<ArticleInformationFieldsFragment, unknown>;
export const MotFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"motFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}}]} as unknown as DocumentNode<MotFieldsFragment, unknown>;
export const ListProjetsFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"listProjetsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rubrique"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderby"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articlesInRubriqueOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArticlePagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"paginationFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleInformationFields"}},{"kind":"Field","name":{"kind":"Name","value":"mots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereMots"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"motFields"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"paginationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleInformationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"date_modif"}},{"kind":"Field","name":{"kind":"Name","value":"isprototype"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"motFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}}]} as unknown as DocumentNode<ListProjetsFieldsFragment, unknown>;
export const MotsAndGroupMotsFromArticleFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"motsAndGroupMotsFromArticleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MotPagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"groupe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}}]}}]}}]} as unknown as DocumentNode<MotsAndGroupMotsFromArticleFieldsFragment, unknown>;
export const DocumentsFromArticleFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"documentsFromArticleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentPagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"hauteur"}},{"kind":"Field","name":{"kind":"Name","value":"largeur"}},{"kind":"Field","name":{"kind":"Name","value":"fichier"}}]}}]}}]} as unknown as DocumentNode<DocumentsFromArticleFieldsFragment, unknown>;
export const ServicesRubriqueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ServicesRubrique"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRubrique"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ServicesRubriqueQuery, ServicesRubriqueQueryVariables>;
export const ArticleBasicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleBasic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<ArticleBasicQuery, ArticleBasicQueryVariables>;
export const ArticleAndPrototypeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArticleAndPrototype"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleInformationFields"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}},{"kind":"Field","name":{"kind":"Name","value":"isprototype"}},{"kind":"Field","name":{"kind":"Name","value":"description_title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"description_title_second"}},{"kind":"Field","name":{"kind":"Name","value":"description_second"}},{"kind":"Field","name":{"kind":"Name","value":"chiffres_cles"}},{"kind":"Field","name":{"kind":"Name","value":"description_lateral_title"}},{"kind":"Field","name":{"kind":"Name","value":"description_lateral"}},{"kind":"Field","name":{"kind":"Name","value":"developpement"}},{"kind":"Field","name":{"kind":"Name","value":"mots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"motsAndGroupMotsFromArticleFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"documents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"documentsFromArticleFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"auteurs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"rubrique"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleInformationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"date_modif"}},{"kind":"Field","name":{"kind":"Name","value":"isprototype"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"motsAndGroupMotsFromArticleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MotPagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"groupe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"documentsFromArticleFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"DocumentPagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"alt"}},{"kind":"Field","name":{"kind":"Name","value":"hauteur"}},{"kind":"Field","name":{"kind":"Name","value":"largeur"}},{"kind":"Field","name":{"kind":"Name","value":"fichier"}}]}}]}}]} as unknown as DocumentNode<ArticleAndPrototypeQuery, ArticleAndPrototypeQueryVariables>;
export const RubriquePresentationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RubriquePresentation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getRubrique"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}},{"kind":"Field","name":{"kind":"Name","value":"logo"}}]}}]}}]} as unknown as DocumentNode<RubriquePresentationQuery, RubriquePresentationQueryVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"texte"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"generalOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articlesInRubriqueOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"5000"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whereMots"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recherche"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"texte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"texte"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderby"},"value":{"kind":"Variable","name":{"kind":"Name","value":"generalOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rubrique"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"listProjetsFields"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleInformationFields"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"paginationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleInformationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"date_modif"}},{"kind":"Field","name":{"kind":"Name","value":"isprototype"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"motFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"listProjetsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rubrique"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderby"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articlesInRubriqueOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArticlePagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"paginationFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleInformationFields"}},{"kind":"Field","name":{"kind":"Name","value":"mots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereMots"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"motFields"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const AllProjectsAndNestedCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AllProjectsAndNestedCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whereRubriques"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rubriquesOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articlesInRubriqueOrderBy"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"whereMots"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"5000"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rubriques"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereRubriques"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderby"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rubriquesOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"paginationFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"listProjetsFields"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"mots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereMots"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"motFields"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"paginationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Pagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalPages"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"totalItems"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"articleInformationFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Article"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"date_modif"}},{"kind":"Field","name":{"kind":"Name","value":"isprototype"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"motFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Mot"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"listProjetsFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Rubrique"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"titre"}},{"kind":"Field","name":{"kind":"Name","value":"texte"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"articles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderby"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articlesInRubriqueOrderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArticlePagination"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"paginationFields"}}]}},{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"articleInformationFields"}},{"kind":"Field","name":{"kind":"Name","value":"mots"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"whereMots"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"motFields"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllProjectsAndNestedCollectionsQuery, AllProjectsAndNestedCollectionsQueryVariables>;