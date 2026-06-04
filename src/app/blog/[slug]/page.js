import { getPostBySlug, getPosts } from '@/src/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
})

// METADATA DINÂMICO
export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  const title = post.frontmatter.title
  const description = post.frontmatter.description
  const cover = post.frontmatter.cover

  return {
    title: title,
    description: description,
    keywords: [
      'marketing digital para restaurantes',
      'como aumentar vendas do restaurante',
      'como atrair clientes para restaurante',
      'marketing para restaurante',
      'agência de marketing para restaurantes',
      'marketing gourmet',
      'agência de marketing para restaurantes brasília',
      'como vender mais no restaurante',
      'aumentar vendas no iFood',
      'google meu negócio restaurante',
    ],
    authors: [{ name: 'Marketing Gourmet', url: 'https://marketinggourmet.com.br' }],
    creator: 'Marketing Gourmet',
    publisher: 'Marketing Gourmet',
    alternates: {
      canonical: `https://blog.marketinggourmet.com.br/blog/${slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://blog.marketinggourmet.com.br/blog/${slug}`,
      siteName: 'Blog Marketing Gourmet',
      images: [
        {
          url: cover,
          width: 1400,
          height: 700,
          alt: title,
        },
      ],
      locale: 'pt_BR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [cover],
    },
  }
}

export default async function PostPage({
  params,
}) {
  const { slug } = await params

  const post = getPostBySlug(slug)

  const posts = getPosts()

  const relatedPosts = posts
    .filter((relatedPost) => {
      // remove o post atual
      if (
        relatedPost.frontmatter.title ===
        post.frontmatter.title
      ) {
        return false
      }

      // verifica categorias iguais
      return relatedPost.frontmatter.categories?.some(
        (category) =>
          post.frontmatter.categories?.includes(
            category
          )
      )
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date) -
        new Date(a.frontmatter.date)
    )

    const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.frontmatter.title,
  description: post.frontmatter.description,
  image: post.frontmatter.cover,
  datePublished: post.frontmatter.date,
  author: {
    '@type': 'Organization',
    name: 'Marketing Gourmet',
    url: 'https://marketinggourmet.com.br',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Marketing Gourmet',
    url: 'https://marketinggourmet.com.br',
    logo: {
      '@type': 'ImageObject',
      url: 'https://marketinggourmet.com.br/logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://blog.marketinggourmet.com.br/blog/${slug}`,
  },
}
  return (
    // Título imagem e conteúdo
    <main className="max-w-[1368px] mx-auto py-20 px-5">
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl pb-15 mx-auto w-fit">
          {post.frontmatter.title}
        </h1>

        <div className="mb-10 overflow-hidden rounded-3xl">
          <Image
            src={post.frontmatter.cover}
            alt={post.frontmatter.title}
            width={1400}
            height={700}
            className="w-full h-[400px] object-cover"
            priority
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex w-full justify-between items-center">
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.categories?.map(
                (category) => (
                  <p
                    key={category}
                    className="text-sm px-3 py-[1px] text-[#4ADE80] bg-[#16A34A40] rounded-full border border-[#16A34A]"
                  >
                    {category}
                  </p>
                )
              )}
            </div>

            <p className='text-gray-600'>
              {post.frontmatter.date}
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#39393980] mt-6 mb-10"></div>
        </div>

        <MDXRemote
          source={post.content}
          components={{
            h2: (props) => (
              <h2
                className={`${inter.className} font-bold my-5 text-[20px]`}
                {...props}
              />
            ),

            a: (props) => (
              <a
                className={`inline text-green-400 hover:underline`}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
          }}
        />
      </div>

      {/* Posts Relacionados */}
{relatedPosts.length > 0 && (
  <section className="pt-25">
    <div className="w-full flex flex-col">
      <h2 className="text-4xl">
        Posts Relacionados
      </h2>

      <div className="w-full h-[1px] bg-[#39393980] mt-8 mb-8"></div>
    </div>

    <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6">
      {relatedPosts
        .slice(0, 6)
        .map((relatedPost) => (
          <article
            key={relatedPost.slug}
            className="group"
          >
            <Link
              href={`/blog/${relatedPost.slug}`}
            >
              <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F293750] transition-all duration-500 group-hover:border-[#4ADE80]/30 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(74,222,128,0.08)]">

                <div className="relative overflow-hidden rounded-t-3xl">
                  <Image
                    src={
                      relatedPost.frontmatter
                        .cover
                    }
                    alt={
                      relatedPost.frontmatter
                        .title
                    }
                    width={800}
                    height={500}
                    className="w-full h-[240px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-20" />
                </div>

                <div className="px-5 pb-4">
                  <h2 className="text-xl font-semibold text-white py-3 transition-colors duration-300 group-hover:text-[#4ADE80]">
                    {
                      relatedPost
                        .frontmatter.title
                    }
                  </h2>

                  <p className="pb-3 text-[#D1D5DB] text-sm lg:h-17">
                    {
                      relatedPost
                        .frontmatter
                        .description
                    }
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {relatedPost.frontmatter.categories?.map(
                      (category) => (
                        <p
                          key={category}
                          className="text-sm px-3 py-[1px] text-[#4ADE80] bg-[#16A34A40] rounded-full border border-[#16A34A]"
                        >
                          {category}
                        </p>
                      )
                    )}
                  </div>

                  <div className="flex pt-5 text-sm items-center justify-between">
                    <p className="text-gray-600">
                      {
                        relatedPost
                          .frontmatter.date
                      }
                    </p>

                    <div className="text-[#4ADE80] flex items-center">
                      <div>Ler artigo</div>

                      <svg
                        className="mt-[3px] ml-2 transition-transform duration-300 group-hover:translate-x-1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12H19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="M13 6L19 12L13 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
    </div>
  </section>
)}
    </main>
  )
}
