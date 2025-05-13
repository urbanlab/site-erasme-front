/**
 * This is used to load .env variables outside the Next.js runtime.
 * see: https://nextjs.org/docs/app/guides/environment-variables#loading-environment-variables-with-nextenv
 * Used by codegen.ts to load .env variables.
*/
import { loadEnvConfig } from '@next/env'

const projectDir = process.cwd()
loadEnvConfig(projectDir)