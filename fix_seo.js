const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.lumenadl.com';
const ROOT = path.join(__dirname);

const PAGES = {
    'index.html': {
        canonical: `${BASE_URL}/`,
        title: 'Lumen ADL · Websites, SEO &amp; AI Automation for Adelaide Small Business',
        desc: 'Web design, SEO &amp; AI automation for Adelaide small businesses. Mawson Lakes, Golden Grove, Gawler. Websites that rank, automations that close.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: null,
    },
    'local-seo-adelaide.html': {
        canonical: `${BASE_URL}/local-seo-adelaide.html`,
        title: 'Local SEO Adelaide | Rank on Page 1 in 8 Weeks | Lumen ADL',
        desc: 'Local SEO for Adelaide small businesses. We got M&amp;K Painting from page 3 to page 1 in 8 weeks. Packages from $700/mo. No lock-in contracts.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['Local SEO Adelaide', `${BASE_URL}/local-seo-adelaide.html`]],
    },
    'ai-automation.html': {
        canonical: `${BASE_URL}/ai-automation.html`,
        title: 'AI Automation for Adelaide Small Business | Lumen ADL',
        desc: 'Missed call text-back, AI lead qualification, automated reviews &amp; quote follow-ups for Adelaide businesses. Tradies, lawyers, dentists &amp; more.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['AI Automation', `${BASE_URL}/ai-automation.html`]],
    },
    'dental.html': {
        canonical: `${BASE_URL}/dental.html`,
        title: 'AI Automation &amp; Web Design for Adelaide Dental Practices | Lumen ADL',
        desc: 'Automated appointment reminders, missed call text-back &amp; review generation for Adelaide dentists. Stop losing patients to missed calls.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['AI Automation', `${BASE_URL}/ai-automation.html`], ['Dental Practice Automation', `${BASE_URL}/dental.html`]],
    },
    'law-firm-automation.html': {
        canonical: `${BASE_URL}/law-firm-automation.html`,
        title: 'AI Automation for Adelaide Law Firms | Lumen ADL',
        desc: '24/7 AI intake, automated client follow-ups &amp; appointment reminders for Adelaide law firms. Stop losing enquiries to voicemail.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['AI Automation', `${BASE_URL}/ai-automation.html`], ['Law Firm Automation', `${BASE_URL}/law-firm-automation.html`]],
    },
    'tradie-automation.html': {
        canonical: `${BASE_URL}/tradie-automation.html`,
        title: 'AI Automation for Adelaide Tradies | Lumen ADL',
        desc: 'Missed call text-back, automated quote follow-ups &amp; Google review requests for Adelaide tradies. Never lose a lead on a job site again.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['AI Automation', `${BASE_URL}/ai-automation.html`], ['Tradie Automation', `${BASE_URL}/tradie-automation.html`]],
    },
    'medical-automation.html': {
        canonical: `${BASE_URL}/medical-automation.html`,
        title: 'AI Automation for Adelaide Medical Practices | Lumen ADL',
        desc: 'Automated appointment reminders, patient follow-ups &amp; missed call recovery for Adelaide GPs, physios &amp; allied health. Reduce no-shows.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['AI Automation', `${BASE_URL}/ai-automation.html`], ['Medical Practice Automation', `${BASE_URL}/medical-automation.html`]],
    },
    'real-estate-automation.html': {
        canonical: `${BASE_URL}/real-estate-automation.html`,
        title: 'AI Automation for Adelaide Real Estate Agents | Lumen ADL',
        desc: 'Automated lead follow-up, inspection reminders &amp; appraisal sequences for Adelaide real estate agents. Close more listings with less admin.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['AI Automation', `${BASE_URL}/ai-automation.html`], ['Real Estate Automation', `${BASE_URL}/real-estate-automation.html`]],
    },
    'about.html': {
        canonical: `${BASE_URL}/about.html`,
        title: 'About Us | Lumen ADL | Adelaide Web Design &amp; SEO Agency',
        desc: 'Lumen ADL is an Adelaide-based web design, local SEO &amp; AI automation agency based in Mawson Lakes. We help local businesses rank on Google.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['About', `${BASE_URL}/about.html`]],
    },
    'contact.html': {
        canonical: `${BASE_URL}/contact.html`,
        title: 'Contact Lumen ADL | Free Website Audit | Adelaide',
        desc: 'Get a free 2-minute website audit from Lumen ADL — Adelaide web design, SEO &amp; AI automation. Based in Mawson Lakes. Call or email today.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['Contact', `${BASE_URL}/contact.html`]],
    },
    'faq.html': {
        canonical: `${BASE_URL}/faq.html`,
        title: 'FAQ | Web Design, SEO &amp; AI Automation Questions | Lumen ADL',
        desc: "Frequently asked questions about Lumen ADL's web design, local SEO &amp; AI automation services for Adelaide small businesses. No jargon.",
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['FAQ', `${BASE_URL}/faq.html`]],
    },
    'work.html': {
        canonical: `${BASE_URL}/work.html`,
        title: 'Our Work | Lumen ADL | Real Results for Adelaide Businesses',
        desc: "See real results from Lumen ADL's web design and SEO work — including M&amp;K Painting Services, ranked page 1 for painter Adelaide in 8 weeks.",
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['Our Work', `${BASE_URL}/work.html`]],
    },
    'blog.html': {
        canonical: `${BASE_URL}/blog.html`,
        title: 'Blog | Web Design, SEO &amp; AI Tips for Adelaide Business | Lumen ADL',
        desc: 'Practical web design, local SEO &amp; AI automation insights for Adelaide small business owners. No jargon — just what actually works.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`]],
    },
    'outreach.html': {
        canonical: `${BASE_URL}/outreach.html`,
        title: 'Outreach &amp; Growth Marketing for Adelaide Businesses | Lumen ADL',
        desc: 'Strategic outreach and growth marketing for Adelaide small businesses. Build backlinks, partnerships &amp; brand awareness that compounds over time.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['Outreach', `${BASE_URL}/outreach.html`]],
    },
    'privacy.html': {
        canonical: `${BASE_URL}/privacy.html`,
        title: 'Privacy Policy | Lumen ADL',
        desc: 'Lumen ADL privacy policy. How we collect, store and use your data in accordance with Australian privacy law.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'website',
        crumbs: [['Home', `${BASE_URL}/`], ['Privacy Policy', `${BASE_URL}/privacy.html`]],
    },
    'blog/web-design-mawson-lakes.html': {
        canonical: `${BASE_URL}/blog/web-design-mawson-lakes.html`,
        title: 'Web Design Mawson Lakes | Custom Websites for Local Business | Lumen ADL',
        desc: 'Looking for web design in Mawson Lakes? Lumen ADL builds fast, mobile-first websites for local businesses in Mawson Lakes and northern Adelaide.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Web Design Mawson Lakes', `${BASE_URL}/blog/web-design-mawson-lakes.html`]],
    },
    'blog/seo-golden-grove.html': {
        canonical: `${BASE_URL}/blog/seo-golden-grove.html`,
        title: 'SEO Golden Grove | Local SEO for Golden Grove Businesses | Lumen ADL',
        desc: 'Rank on Google for customers in Golden Grove. Lumen ADL targets northern Adelaide suburbs including Golden Grove, Greenwith &amp; surrounds.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['SEO Golden Grove', `${BASE_URL}/blog/seo-golden-grove.html`]],
    },
    'blog/web-design-gawler.html': {
        canonical: `${BASE_URL}/blog/web-design-gawler.html`,
        title: 'Web Design Gawler | Custom Websites for Gawler Businesses | Lumen ADL',
        desc: 'Affordable web design for Gawler small businesses. Fast, conversion-focused websites for trades, services &amp; retailers in Gawler and surrounds.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Web Design Gawler', `${BASE_URL}/blog/web-design-gawler.html`]],
    },
    'blog/ai-automation-tradies-adelaide.html': {
        canonical: `${BASE_URL}/blog/ai-automation-tradies-adelaide.html`,
        title: 'AI Automation for Tradies Adelaide | Save 10+ Hours a Week | Lumen ADL',
        desc: 'How Adelaide tradies are using AI automation to handle missed calls, chase quotes &amp; get Google reviews automatically. Save 10+ hours a week.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['AI Automation for Tradies Adelaide', `${BASE_URL}/blog/ai-automation-tradies-adelaide.html`]],
    },
    'blog/ai-for-tradies-adelaide.html': {
        canonical: `${BASE_URL}/blog/ai-for-tradies-adelaide.html`,
        title: 'AI for Tradies Adelaide: The Complete Guide | Lumen ADL',
        desc: 'The complete guide to AI tools for Adelaide tradies. Missed call text-back, automated quoting, review generation &amp; lead qualification explained.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['AI for Tradies Adelaide', `${BASE_URL}/blog/ai-for-tradies-adelaide.html`]],
    },
    'blog/missed-call-text-back.html': {
        canonical: `${BASE_URL}/blog/missed-call-text-back.html`,
        title: 'Missed Call Text-Back for Adelaide Small Business | Lumen ADL',
        desc: 'Never lose a lead to a missed call again. Our missed call text-back system auto-texts every missed caller within 30 seconds.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Missed Call Text-Back', `${BASE_URL}/blog/missed-call-text-back.html`]],
    },
    'blog/ai-lead-qualification.html': {
        canonical: `${BASE_URL}/blog/ai-lead-qualification.html`,
        title: 'AI Lead Qualification for Adelaide Business | 24/7 Enquiry Handling | Lumen ADL',
        desc: 'Our AI lead qualification system answers enquiries 24/7, qualifies prospects &amp; sends you the details. Never miss a lead while on the tools.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['AI Lead Qualification', `${BASE_URL}/blog/ai-lead-qualification.html`]],
    },
    'blog/web-design-law-firms-adelaide.html': {
        canonical: `${BASE_URL}/blog/web-design-law-firms-adelaide.html`,
        title: 'Web Design for Adelaide Law Firms | Convert More Clients | Lumen ADL',
        desc: 'Purpose-built websites for Adelaide law firms that convert visitors into clients. Fast, professional, SEO-optimised. Rank on Google for law firm searches.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Web Design for Law Firms Adelaide', `${BASE_URL}/blog/web-design-law-firms-adelaide.html`]],
    },
    'blog/medical-dental-automation-adelaide.html': {
        canonical: `${BASE_URL}/blog/medical-dental-automation-adelaide.html`,
        title: 'Medical &amp; Dental AI Automation Adelaide | Reduce No-Shows | Lumen ADL',
        desc: 'AI automation for Adelaide medical and dental practices. Automated appointment reminders, missed call recovery &amp; review generation.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Medical &amp; Dental Automation Adelaide', `${BASE_URL}/blog/medical-dental-automation-adelaide.html`]],
    },
    'blog/mechanic-marketing-adelaide.html': {
        canonical: `${BASE_URL}/blog/mechanic-marketing-adelaide.html`,
        title: 'Marketing for Mechanics Adelaide | Get More Bookings | Lumen ADL',
        desc: 'How Adelaide mechanics can get more customers with local SEO, Google Business optimisation &amp; automated review requests.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Mechanic Marketing Adelaide', `${BASE_URL}/blog/mechanic-marketing-adelaide.html`]],
    },
    'blog/barber-salon-marketing-adelaide.html': {
        canonical: `${BASE_URL}/blog/barber-salon-marketing-adelaide.html`,
        title: 'Marketing for Barbers &amp; Salons Adelaide | Get More Bookings | Lumen ADL',
        desc: 'How Adelaide barbers, hair salons &amp; beauty studios can rank on Google and fill their books. Local SEO, reviews &amp; AI booking automation.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Barber &amp; Salon Marketing Adelaide', `${BASE_URL}/blog/barber-salon-marketing-adelaide.html`]],
    },
    'blog/real-estate-web-design-adelaide.html': {
        canonical: `${BASE_URL}/blog/real-estate-web-design-adelaide.html`,
        title: 'Real Estate Web Design Adelaide | Convert More Listings | Lumen ADL',
        desc: 'Custom websites for Adelaide real estate agents that generate appraisal requests on autopilot. SEO-optimised, fast &amp; built to convert.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Real Estate Web Design Adelaide', `${BASE_URL}/blog/real-estate-web-design-adelaide.html`]],
    },
    'blog/restaurant-marketing-adelaide.html': {
        canonical: `${BASE_URL}/blog/restaurant-marketing-adelaide.html`,
        title: 'Restaurant Marketing Adelaide | Get Found on Google | Lumen ADL',
        desc: 'How Adelaide restaurants, cafes &amp; takeaways can rank on Google and fill more tables. Local SEO &amp; automated review requests for hospitality.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Restaurant Marketing Adelaide', `${BASE_URL}/blog/restaurant-marketing-adelaide.html`]],
    },
    'blog/ecommerce-adelaide-small-business.html': {
        canonical: `${BASE_URL}/blog/ecommerce-adelaide-small-business.html`,
        title: 'Ecommerce Website Adelaide | Online Store for Small Business | Lumen ADL',
        desc: 'Ecommerce websites for Adelaide small businesses. Fast, conversion-optimised online stores that rank on Google and turn visitors into buyers.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Ecommerce Adelaide Small Business', `${BASE_URL}/blog/ecommerce-adelaide-small-business.html`]],
    },
    'blog/fitness-marketing-adelaide.html': {
        canonical: `${BASE_URL}/blog/fitness-marketing-adelaide.html`,
        title: 'Marketing for Gyms &amp; Personal Trainers Adelaide | Lumen ADL',
        desc: 'How Adelaide gyms, personal trainers &amp; fitness studios can get more members with local SEO, Google Business optimisation &amp; automated follow-up.',
        ogImg: `${BASE_URL}/images/og-image.png`,
        ogType: 'article',
        crumbs: [['Home', `${BASE_URL}/`], ['Blog', `${BASE_URL}/blog.html`], ['Fitness Marketing Adelaide', `${BASE_URL}/blog/fitness-marketing-adelaide.html`]],
    },
};

function makeBreadcrumbScript(crumbs) {
    const items = crumbs.map(([name, url], i) =>
        `{"@type":"ListItem","position":${i + 1},"name":"${name}","item":"${url}"}`
    ).join(',');
    return `    <script type="application/ld+json">\n{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[${items}]}\n    </script>`;
}

function makeMetaBlock(data) {
    return `    <link rel="canonical" href="${data.canonical}">
    <link rel="alternate" hreflang="en-au" href="${data.canonical}">
    <!-- Open Graph -->
    <meta property="og:title" content="${data.title}">
    <meta property="og:description" content="${data.desc}">
    <meta property="og:type" content="${data.ogType}">
    <meta property="og:url" content="${data.canonical}">
    <meta property="og:image" content="${data.ogImg}">
    <meta property="og:locale" content="en_AU">
    <meta property="og:site_name" content="Lumen ADL">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${data.title}">
    <meta name="twitter:description" content="${data.desc}">
    <meta name="twitter:image" content="${data.ogImg}">`;
}

let fixed = 0;

for (const [relPath, data] of Object.entries(PAGES)) {
    const fullPath = path.join(ROOT, relPath.replace(/\//g, path.sep));
    if (!fs.existsSync(fullPath)) {
        console.log(`SKIP (not found): ${relPath}`);
        continue;
    }

    let content = fs.readFileSync(fullPath, 'utf8');

    // 1. Remove AW-XXXXXXXXXX placeholder line
    content = content.replace(/.*gtag\('config',\s*'AW-XXXXXXXXXX'\).*\n/g, '');

    // 2. Remove existing canonical tags
    content = content.replace(/\s*<link rel="canonical"[^>]*>\n?/g, '\n');

    // 3. Remove existing hreflang tags
    content = content.replace(/\s*<link rel="alternate" hreflang[^>]*>\n?/g, '\n');

    // 4. Remove existing OG/Twitter meta tags and their comment markers
    content = content.replace(/\s*<!-- Open Graph -->\n?/g, '\n');
    content = content.replace(/\s*<!-- Twitter Card -->\n?/g, '\n');
    content = content.replace(/\s*<meta property="og:[^"]*"[^>]*>\n?/g, '\n');
    content = content.replace(/\s*<meta name="twitter:[^"]*"[^>]*>\n?/g, '\n');

    // 5. Update title tag
    content = content.replace(/<title>[^<]*<\/title>/, `<title>${data.title}</title>`);

    // 6. Update meta description
    content = content.replace(
        /(<meta name="description"\s+content=")[^"]*(")/,
        `$1${data.desc}$2`
    );

    // 7. Insert canonical + hreflang + OG block
    const metaBlock = makeMetaBlock(data);
    if (/<meta name="robots"/.test(content)) {
        content = content.replace(/(<meta name="robots"[^>]*>)/, `$1\n${metaBlock}`);
    } else if (/<meta name="viewport"/.test(content)) {
        content = content.replace(/(<meta name="viewport"[^>]*>)/, `$1\n${metaBlock}`);
    }

    // 8. Add BreadcrumbList schema (skip homepage)
    if (data.crumbs && relPath !== 'index.html') {
        if (!content.includes('"@type":"BreadcrumbList"')) {
            const breadcrumbTag = makeBreadcrumbScript(data.crumbs);
            content = content.replace('</head>', `${breadcrumbTag}\n</head>`);
        }
    }

    // 9. Add AggregateRating to LocalBusiness on homepage
    if (relPath === 'index.html' && !content.includes('"aggregateRating"')) {
        content = content.replace(
            '"@type": "LocalBusiness",',
            '"@type": "LocalBusiness",\n      "aggregateRating": {"@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "12"},'
        );
    }

    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`FIXED: ${relPath}`);
    fixed++;
}

// --- Update sitemap.xml ---
const sitemapPath = path.join(ROOT, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

const TODAY = '2026-03-10';
sitemap = sitemap.replace(/<lastmod>20\d\d-\d\d-\d\d<\/lastmod>/g, `<lastmod>${TODAY}</lastmod>`);

if (!sitemap.includes('outreach.html')) {
    const outreachEntry = `  <url>
    <loc>${BASE_URL}/outreach.html</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    sitemap = sitemap.replace('  <!-- Blog Posts -->', outreachEntry + '  <!-- Blog Posts -->');
}

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('\nFIXED: sitemap.xml');
console.log(`\n✅ All done! Fixed ${fixed} pages.`);
