import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:8880/spip.php?action=graphql', //TODO: add to env
    documents: ['**/queries.tsx'],
    generates: {
        'app/_graphql/__generated__/': {
            preset: 'client',
            presetConfig: {
                gqlTagName: 'gql', //changes the default tag from graphql to gql
            },
            plugins: [],
        },
    },
};

export default config;