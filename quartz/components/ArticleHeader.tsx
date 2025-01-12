export default (() => {
  function ArticleHeader({ fileData }: QuartzComponentProps) {
    const { frontmatter } = fileData
    const title = frontmatter.title || "Untitled Article"
    const author = frontmatter.autor || "Unknown Author"

    return (
      <header>
        <h1>{title}</h1>
        <p>By: {author}</p>
      </header>
    )
  }

  return ArticleHeader
}) satisfies QuartzComponentConstructor
