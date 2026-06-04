import { getPosts } from '@/src/lib/posts'

export default async function sitemap() {
  const posts = getPosts()

  const postUrls = posts.map((post) => ({
    url: `https://blog.marketinggourmet.com.br/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: 'https://blog.marketinggourmet.com.br',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...postUrls,
  ]
}
