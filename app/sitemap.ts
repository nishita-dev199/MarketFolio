import type { MetadataRoute } from 'next'
import { SERVICES } from '@/lib/content/services'
import dbConnect from '@/lib/dbConnect'
import Blog from '@/models/Blog'

/** Regenerate on each request so lastModified and any future CMS-driven URLs stay current. */
export const dynamic = 'force-dynamic'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ??
  'https://marketfolio.com'

type SitemapEntry = {
  path: string
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']
  priority: number
}

/** Static marketing pages */
const STATIC_ROUTES: SitemapEntry[] = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()
  await dbConnect()
  const blogs = await Blog.find({}).lean()

  const staticUrls = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: path === '/' ? SITE_URL : `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const serviceUrls: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  const blogUrls: MetadataRoute.Sitemap = (blogs as unknown as { slug: string; date: string }[]).map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticUrls, ...serviceUrls, ...blogUrls]
}
