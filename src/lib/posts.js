import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content')

export function getPosts() {
  const files = fs.readdirSync(postsDirectory)

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')

    const fullPath = path.join(postsDirectory, filename)

    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data,
      content,
    }
  })

  return posts
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)

  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)

  return {
    frontmatter: data,
    content,
  }
}