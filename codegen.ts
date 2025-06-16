import { CodegenConfig } from '@graphql-codegen/cli';
import './loadEnvConfig';

const config: CodegenConfig = {
    schema: {
        [`${process.env.BACKEND_BASE_URL}/${process.env.GRAPHQL_ENDPOINT}`]: {
            headers: {
                'X-Auth-Token': process.env.GRAPHQL_TOKEN ?? '',
            },
        },
    },
    documents: ['**/queries.ts', '**/fragments.ts'],
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
