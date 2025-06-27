import { HttpLink } from '@apollo/client';
import { registerApolloClient, ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            // this needs to be an absolute url, as relative urls cannot be used in SSR
            uri: `${process.env.BACKEND_BASE_URL}/${process.env.GRAPHQL_ENDPOINT}`,
            fetchOptions: {
                // you can pass additional options that should be passed to `fetch` here,
                // e.g. Next.js-related `fetch` options regarding caching and revalidation
                // see https://nextjs.org/docs/app/api-reference/functions/fetch#fetchurl-options

                next: {
                    revalidate: 300, //revalidate server cache every X seconds
                },
            },
            headers: {
                'X-Auth-Token': process.env.GRAPHQL_TOKEN ?? '',
            },
        }),
    });
});
