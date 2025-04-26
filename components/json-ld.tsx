export function WebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CruxHire AI',
    description: 'AI-powered interview preparation platform',
    url: 'https://cruxhire.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cruxhire.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}

export function BlogPostJsonLd({ post }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author.name
    },
    datePublished: post.date,
    image: post.image,
    articleBody: post.content
  }
}
