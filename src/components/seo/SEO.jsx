import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

const siteUrl = 'https://hocico.com.co'
const defaultTitle = 'Hocico Pet Shop - Alimentos, Accesorios y Snacks para tu Mascota'
const defaultDescription = 'Tu tienda online de alimentos, snacks y accesorios para perros y gatas. Envíos a Mosquera, Madrid y Funza.'
const defaultImage = '/og-image.jpg'
const twitterHandle = '@hocico_petshop'

export default function SEO({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  url = siteUrl,
  type = 'website',
  noindex = false,
  nofollow = false,
  canonical,
  structuredData,
  product,
  breadcrumbs,
}) {
  const location = useLocation()
  const fullUrl = canonical || `${siteUrl}${location.pathname}${location.search}`
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  const jsonLd = []

  if (type === 'product' && product) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      sku: product.sku,
      brand: {
        '@type': 'Brand',
        name: product.brand,
      },
      image: product.images.map(img => img.startsWith('http') ? img : `${siteUrl}${img}`),
      offers: {
        '@type': 'Offer',
        url: fullUrl,
        priceCurrency: product.currency,
        price: product.price,
        availability: product.availability,
        seller: {
          '@type': 'Organization',
          name: 'Hocico Pet Shop',
        },
      },
      ...(product.rating && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount || 0,
        },
      }),
    })
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`,
      })),
    })
  }

  if (structuredData) {
    const data = Array.isArray(structuredData) ? structuredData : [structuredData]
    jsonLd.push(...data)
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Hocico Pet Shop',
    url: siteUrl,
    logo: `${siteUrl}/assets/images/Logo.webp`,
    sameAs: [
      'https://facebook.com/hocico_petshop',
      'https://instagram.com/hocico_petshop',
      'https://twitter.com/hocico_petshop',
      'https://youtube.com/hocico_petshop',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+57-313-3245600',
      contactType: 'customer service',
      availableLanguage: ['Spanish'],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Hocico Pet Shop',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/buscar?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={fullUrl} />

      {noindex && <meta name="robots" content="noindex" />}
      {nofollow && <meta name="robots" content="nofollow" />}
      {noindex && nofollow && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Hocico Pet Shop" />
      <meta property="og:locale" content="es_CO" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {jsonLd.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </Helmet>
  )
}