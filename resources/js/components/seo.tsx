import { Head } from '@inertiajs/react';

export interface SeoProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    noindex?: boolean;
    schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export default function Seo({
    title,
    description,
    canonical,
    ogImage = '/icon/CodLexa_icon.png',
    ogType = 'website',
    noindex = false,
    schema,
}: SeoProps) {
    const fullCanonical =
        typeof window !== 'undefined'
            ? canonical || window.location.href.split('?')[0]
            : canonical;

    const fullImageUrl =
        typeof window !== 'undefined' && ogImage && !ogImage.startsWith('http')
            ? `${window.location.origin}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`
            : ogImage;

    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            {fullCanonical && <link rel="canonical" href={fullCanonical} />}

            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta
                    name="robots"
                    content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
                />
            )}

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="CODLEXA" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            {fullCanonical && <meta property="og:url" content={fullCanonical} />}
            {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            {fullImageUrl && <meta name="twitter:image" content={fullImageUrl} />}

            {/* JSON-LD Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Head>
    );
}

