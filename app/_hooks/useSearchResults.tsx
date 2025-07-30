'use client';

import { useSuspenseQuery } from '@apollo/client/react/hooks/useSuspenseQuery';
import { FragmentType, getFragmentData } from '@services/graphql/__generated__/fragment-masking';
import {
    ArticleBasicInformationFieldsFragment,
    ArticleBasicInformationFieldsFragmentDoc,
    ListProjetsFieldsFragment,
    ListProjetsFieldsFragmentDoc,
} from '@services/graphql/__generated__/graphql';
import { SEARCH } from '@services/graphql/queries';
import { useEffect, useState } from 'react';

type SearchResults = {
    articles: ArticleBasicInformationFieldsFragment[];
    projets: ListProjetsFieldsFragment[];
};

export function useSearchResults({ searchInput }: { searchInput: string }) {
    const [searchResults, setSearchResults] = useState<SearchResults>({
        articles: [],
        projets: [],
    });

    const { data } = useSuspenseQuery(SEARCH, {
        variables: {
            texte: searchInput,
            where: `statut="publie"`,
            generalOrderBy: [`date_DESC`],
            articlesInRubriqueOrderBy: [`date_DESC`],
            withAuteurs: false,
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

            const projets = getFragmentData(
                ListProjetsFieldsFragmentDoc,
                data.recherche?.result?.filter(item => item?.__typename === 'Rubrique') as FragmentType<
                    typeof ListProjetsFieldsFragmentDoc
                >[]
            );

            setSearchResults({ articles: articles, projets: projets });
        };

        searchQuery();

        //clean-up function
        return () => {};
    }, [data.recherche?.result]);

    return { ...searchResults };
}
