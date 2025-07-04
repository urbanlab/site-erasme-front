'use client';

import { useSuspenseQuery } from '@apollo/client/react/hooks/useSuspenseQuery';
import { FragmentType, getFragmentData } from '@graphql/__generated__/fragment-masking';
import {
    ArticleBasicInformationFieldsFragment,
    ArticleBasicInformationFieldsFragmentDoc,
    ListProjetsFieldsFragment,
    ListProjetsFieldsFragmentDoc,
    SearchQuery
} from '@graphql/__generated__/graphql';
import { SEARCH } from '@graphql/queries';
import { useEffect, useState } from 'react';

type SearchResults = {
    articles: ArticleBasicInformationFieldsFragment[];
    rubriques: ListProjetsFieldsFragment[];
};

export function useSearchResults({ searchInput }: { searchInput: string }) {
    const [searchResults, setSearchResults] = useState<SearchResults>({ articles: [], rubriques: [] });

    const { data } = useSuspenseQuery<SearchQuery>(SEARCH, {
        variables: {
            texte: searchInput,
            where: `statut="publie"`,
            generalOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
        },
    });
    useEffect(() => {
        const searchQuery = () => {
            const articles = getFragmentData(
                ArticleBasicInformationFieldsFragmentDoc,
                data.recherche?.result?.filter(item => item?.__typename === 'Article') as FragmentType<
                    typeof ArticleBasicInformationFieldsFragmentDoc
                >[]
            );

            const rubriques = getFragmentData(
                ListProjetsFieldsFragmentDoc,
                data.recherche?.result?.filter(item => item?.__typename === 'Rubrique') as FragmentType<
                    typeof ListProjetsFieldsFragmentDoc
                >[]
            );

            setSearchResults({ articles: articles, rubriques: rubriques });
        };

        searchQuery();

        //clean-up function
        return () => {};
    }, [data.recherche?.result]);

    return { ...searchResults };
}
