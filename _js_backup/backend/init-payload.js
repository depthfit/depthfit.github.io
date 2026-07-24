const fs = require('fs');
const path = require('path');

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + '\n');
};

write('payload.config.ts', `
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { Users } from './collections/Users'
import { Posts } from './collections/Posts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Users, Posts],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'secret-key',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({ client: { url: process.env.DATABASE_URI || 'file:./payload.db' } }),
})
`);

write('collections/Users.ts', `
import type { CollectionConfig } from 'payload'
export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: [],
}
`);

write('collections/Posts.ts', `
import type { CollectionConfig } from 'payload'
export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'content', type: 'richText' },
  ],
}
`);

write('next.config.mjs', `
import { withPayload } from '@payloadcms/next/withPayload'
/** @type {import('next').NextConfig} */
const nextConfig = {}
export default withPayload(nextConfig)
`);

write('app/(payload)/api/[...slug]/route.ts', `
import config from '@/payload.config'
import { REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_DELETE } from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const OPTIONS = REST_OPTIONS(config)
`);

write('app/(payload)/admin/[[...segments]]/page.tsx', `
import type { Metadata } from 'next'
import config from '@/payload.config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = { params: Promise<{ segments: string[] }>; searchParams: Promise<{ [key: string]: string | string[] }> }

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> => generatePageMetadata({ config, params, searchParams })
const Page = ({ params, searchParams }: Args) => RootPage({ config, params, searchParams, importMap })
export default Page
`);

write('app/(payload)/admin/[[...segments]]/not-found.tsx', `
import config from '@/payload.config'
import { NotFoundPage } from '@payloadcms/next/views'
import { importMap } from '../importMap'
const NotFound = () => NotFoundPage({ config, importMap })
export default NotFound
`);

write('app/(payload)/layout.tsx', `
import config from '@/payload.config'
import '@payloadcms/next/css'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap'

const Layout = ({ children }: { children: React.ReactNode }) => (
  <RootLayout config={config} importMap={importMap}>{children}</RootLayout>
)
export default Layout
`);

write('app/(payload)/admin/importMap.js', `export const importMap = {}`);

console.log('Payload CMS files created successfully!');
