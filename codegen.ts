import { CodegenConfig } from '@graphql-codegen/cli';
import './loadEnvConfig';

const config: CodegenConfig = {
    schema: {
        [`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/${process.env.GRAPHQL_ENDPOINT}`]: {
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
                //Changes the default tag from graphql to gql
                gqlTagName: 'gql',

                //Changes the default fragment helper function name from useFragement to getFragmentData, since it's not a React hook.
                //See https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#the-usefragment-helper
                fragmentMasking: { unmaskFunctionName: 'getFragmentData' },
            },
            plugins: [],
        },
    },
};

export default config;
