import { CodegenConfig } from '@graphql-codegen/cli';
import './loadEnvConfig';

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_ENDPOINT,
    documents: ['**/queries.ts'],
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
