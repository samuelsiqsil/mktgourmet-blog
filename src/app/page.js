import Link from 'next/link'
import { getPosts } from '@/src/lib/posts'
import Image from 'next/image'

export default async function BlogPage({
  searchParams,
}) {
  const posts = getPosts()

  const params = await searchParams

  const selectedCategory = params.category

  const search =
    params.search?.toLowerCase() || ''

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      !selectedCategory ||
      post.frontmatter.categories?.includes(
        selectedCategory
      )

    const matchesSearch =
      !search ||
      post.frontmatter.title
        .toLowerCase()
        .includes(search) ||
      post.frontmatter.categories?.some(
        (category) =>
          category
            .toLowerCase()
            .includes(search)
      ) ||
      post.content
        .toLowerCase()
        .includes(search)

    return (
      matchesCategory && matchesSearch
    )
  })

  const categories = [
    ...new Set(
      posts.flatMap(
        (post) =>
          post.frontmatter.categories || []
      )
    ),
  ]

  const sortedPosts = [...filteredPosts].sort(
    (a, b) =>
      new Date(b.frontmatter.date) -
      new Date(a.frontmatter.date)
  )

  const featuredPosts = posts
    .filter(
      (post) => post.frontmatter.featured
    )
    .sort(
      (a, b) =>
        a.frontmatter.featuredOrder -
        b.frontmatter.featuredOrder
    )
    .slice(0, 3)

  return (
    <main className="max-w-[1368px] mx-auto py-8 lg:py-10 px-4">

      {/* Título */}
      <h1 className="text-4xl sm:text-5xl font-bold mb-3 mx-auto w-fit text-center leading-tight">
        Marketing Gourmet: Estratégias para Restaurantes Venderem Mais
      </h1>

      <p className="mx-auto max-w-2xl text-center text-base sm:text-lg lg:text-2xl text-[#D1D5DB] leading-relaxed">
  Como lotar seu restaurante com{' '}
  <span className="text-[#4ADE80] font-bold">
    marketing digital
  </span>
</p>

      {/* Search e navegação */}
      <div className="flex relative flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 mt-12">

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href={
              search
                ? `?search=${search}`
                : '.'
            }
            className={`transition-colors hover:text-green-400 text-sm sm:text-base ${
              !selectedCategory
                ? 'text-green-400'
                : 'text-white'
            }`}
          >
            Todos
          </Link>

          {categories.map((category) => (
            <Link
              key={category}
              href={`?category=${category}${
                search ? `&search=${search}` : ''
              }`}
              className={`transition-colors hover:text-green-400 text-sm sm:text-base ${
                selectedCategory === category
                  ? 'text-green-400'
                  : 'text-white'
              }`}
            >
              {category}
            </Link>
          ))}
        </div>

        <form
          action="/"
          className="flex w-full lg:w-[420px] rounded-full border border-[#17B75247] px-4 py-3"
        >
          {selectedCategory && (
            <input
              type="hidden"
              name="category"
              value={selectedCategory}
            />
          )}

          <input
            type="text"
            name="search"
            placeholder="Pesquisar..."
            defaultValue={search}
            className="outline-none bg-transparent w-full text-sm sm:text-base"
          />
        </form>
      </div>

      {/* Posts em destaque */}
      <section className="flex flex-col lg:grid lg:grid-cols-3 gap-6 mb-20">

        {/* Post principal */}
        {featuredPosts[0] && (
          <article className="lg:col-span-2 h-full group">
            <Link
              href={`/blog/${featuredPosts[0].slug}`}
            >
              <div className="relative h-full overflow-hidden rounded-3xl min-h-[260px] sm:min-h-[360px] lg:min-h-[520px] border border-white/5 transition-all duration-500 group-hover:border-[#4ADE80]/30 group-hover:shadow-[0_20px_60px_rgba(74,222,128,0.08)]">

                <Image
                  src={
                    featuredPosts[0]
                      .frontmatter.cover
                  }
                  alt={
                    featuredPosts[0]
                      .frontmatter.title
                  }
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] to-black/30" />

                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 z-10">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-xl leading-tight transition-colors duration-300 group-hover:text-[#4ADE80]">
                    {
                      featuredPosts[0]
                        .frontmatter.title
                    }
                  </h2>

                  <div className="text-[#4ADE80] flex items-center pt-4 text-sm sm:text-base">
                    <div>Ler artigo</div>

                    <svg
                      className="mt-[2px] ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
            </Link>
          </article>
        )}

        {/* Posts laterais */}
        <div className="flex flex-col gap-6">
          {featuredPosts
            .slice(1, 3)
            .map((post) => (
              <article
                key={post.slug}
                className="flex-1 group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                >
                  <div className="relative overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[260px] border border-white/5 transition-all duration-500 group-hover:border-[#4ADE80]/30 group-hover:shadow-[0_20px_60px_rgba(74,222,128,0.08)]">

                    <Image
                      src={post.frontmatter.cover}
                      alt={post.frontmatter.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#12181F] to-black/30" />

                    <div className="absolute bottom-5 left-5 z-10">
                      <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight transition-colors duration-300 group-hover:text-[#4ADE80]">
                        {
                          post.frontmatter.title
                        }
                      </h2>

                      <div className="text-[#4ADE80] flex items-center pt-2 text-sm">
                        <div>Ler artigo</div>

                        <svg
                          className="mt-[2px] ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
                </Link>
              </article>
            ))}
        </div>
      </section>

      {/* Posts Recentes */}
      <section className="pt-8 lg:pt-15">
        <div className="w-full flex flex-col">
          <h2 className="text-3xl lg:text-4xl">
            Posts Recentes
          </h2>

          <div className="w-full h-[1px] bg-[#39393980] mt-6 mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedPosts
            .slice(0, 4)
            .map((post) => (
              <article
                key={post.slug}
                className="group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                >
                  <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F293750] transition-all duration-500 group-hover:border-[#4ADE80]/30 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(74,222,128,0.08)]">

                    <div className="relative overflow-hidden rounded-t-3xl">
                      <Image
                        src={
                          post.frontmatter.cover
                        }
                        alt={
                          post.frontmatter.title
                        }
                        width={800}
                        height={500}
                        className="w-full h-[220px] sm:h-[260px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-20" />
                    </div>

                    <div className="px-5 pb-5">
                      <h2 className="text-lg sm:text-xl font-semibold text-white py-3 transition-colors duration-300 group-hover:text-[#4ADE80]">
                        {
                          post.frontmatter.title
                        }
                      </h2>

                      <p className="pb-4 text-[#D1D5DB] text-sm h-fit">
                        {
                          post.frontmatter
                            .description
                        }
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.frontmatter.categories?.map(
                          (category) => (
                            <p
                              key={category}
                              className="text-xs sm:text-sm px-3 py-[2px] text-[#4ADE80] bg-[#16A34A40] rounded-full border border-[#16A34A]"
                            >
                              {category}
                            </p>
                          )
                        )}
                      </div>

                      <div className="flex pt-5 text-sm items-center justify-between">
                        <p className="text-gray-400 text-sm pt-[6px]">
                          {
                            post.frontmatter.date
                          }
                        </p>

                        <div className="text-[#4ADE80] flex items-center text-sm">
                          <div>Ler artigo</div>

                          <svg
                            className="mt-[2px] ml-2 transition-transform duration-300 group-hover:translate-x-1"
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

      {/* Mais Posts */}
      <section className="pt-15">
        <div className="w-full flex flex-col">
          <h2 className="text-3xl lg:text-4xl">
            Mais Posts
          </h2>

          <div className="w-full h-[1px] bg-[#39393980] mt-6 mb-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts
            .slice(0, 6)
            .map((post) => (
              <article
                key={post.slug}
                className="group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                >
                  <div className="overflow-hidden rounded-3xl border border-white/5 bg-[#1F293750] transition-all duration-500 group-hover:border-[#4ADE80]/30 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_rgba(74,222,128,0.08)]">

                    <div className="relative overflow-hidden rounded-t-3xl">
                      <Image
                        src={
                          post.frontmatter.cover
                        }
                        alt={
                          post.frontmatter.title
                        }
                        width={800}
                        height={500}
                        className="w-full h-[220px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/40 transition-opacity duration-500 group-hover:opacity-20" />
                    </div>

                    <div className="px-5 pb-5">
                      <h2 className="text-lg sm:text-xl font-semibold text-white py-3 transition-colors duration-300 group-hover:text-[#4ADE80]">
                        {
                          post.frontmatter.title
                        }
                      </h2>

                      <p className="pb-4 text-[#D1D5DB] text-sm leading-relaxed">
                        {
                          post.frontmatter
                            .description
                        }
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {post.frontmatter.categories?.map(
                          (category) => (
                            <p
                              key={category}
                              className="text-xs sm:text-sm px-3 py-[2px] text-[#4ADE80] bg-[#16A34A40] rounded-full border border-[#16A34A]"
                            >
                              {category}
                            </p>
                          )
                        )}
                      </div>

                      <div className="flex pt-5 text-sm items-center justify-between">
                        <p className="text-gray-400 text-xs sm:text-sm">
                          {
                            post.frontmatter.date
                          }
                        </p>

                        <div className="text-[#4ADE80] flex items-center text-sm">
                          <div>Ler artigo</div>

                          <svg
                            className="mt-[2px] ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
    </main>
  )
}
