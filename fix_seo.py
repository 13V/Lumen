import os
import re

BASE_URL = "https://www.lumenadl.com"
ROOT = r"C:\Users\Administrator\.gemini\antigravity\lumen-app"

# Map of file path (relative to ROOT) -> SEO metadata
PAGES = {
    "index.html": {
        "canonical": f"{BASE_URL}/",
        "title": "Lumen ADL \u00b7 Websites, SEO &amp; AI Automation for Adelaide Small Business",
        "desc": "Web design, SEO &amp; AI automation for Adelaide small businesses. Mawson Lakes, Golden Grove, Gawler. Websites that rank, automations that close.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": None,  # homepage keeps existing breadcrumb
    },
    "local-seo-adelaide.html": {
        "canonical": f"{BASE_URL}/local-seo-adelaide.html",
        "title": "Local SEO Adelaide | Rank on Page 1 in 8 Weeks | Lumen ADL",
        "desc": "Local SEO for Adelaide small businesses. We got M&amp;K Painting from page 3 to page 1 in 8 weeks. Packages from $700/mo. No lock-in contracts.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Local SEO Adelaide", f"{BASE_URL}/local-seo-adelaide.html")],
    },
    "ai-automation.html": {
        "canonical": f"{BASE_URL}/ai-automation.html",
        "title": "AI Automation for Adelaide Small Business | Lumen ADL",
        "desc": "Missed call text-back, AI lead qualification, automated reviews &amp; quote follow-ups for Adelaide businesses. Tradies, lawyers, dentists &amp; more.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("AI Automation", f"{BASE_URL}/ai-automation.html")],
    },
    "dental.html": {
        "canonical": f"{BASE_URL}/dental.html",
        "title": "AI Automation &amp; Web Design for Adelaide Dental Practices | Lumen ADL",
        "desc": "Automated appointment reminders, missed call text-back &amp; review generation for Adelaide dentists. Stop losing patients to missed calls.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("AI Automation", f"{BASE_URL}/ai-automation.html"), ("Dental Practice Automation", f"{BASE_URL}/dental.html")],
    },
    "law-firm-automation.html": {
        "canonical": f"{BASE_URL}/law-firm-automation.html",
        "title": "AI Automation for Adelaide Law Firms | Lumen ADL",
        "desc": "24/7 AI intake, automated client follow-ups &amp; appointment reminders for Adelaide law firms. Stop losing enquiries to voicemail.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("AI Automation", f"{BASE_URL}/ai-automation.html"), ("Law Firm Automation", f"{BASE_URL}/law-firm-automation.html")],
    },
    "tradie-automation.html": {
        "canonical": f"{BASE_URL}/tradie-automation.html",
        "title": "AI Automation for Adelaide Tradies | Lumen ADL",
        "desc": "Missed call text-back, automated quote follow-ups &amp; Google review requests for Adelaide tradies. Never lose a lead on a job site again.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("AI Automation", f"{BASE_URL}/ai-automation.html"), ("Tradie Automation", f"{BASE_URL}/tradie-automation.html")],
    },
    "medical-automation.html": {
        "canonical": f"{BASE_URL}/medical-automation.html",
        "title": "AI Automation for Adelaide Medical Practices | Lumen ADL",
        "desc": "Automated appointment reminders, patient follow-ups &amp; missed call recovery for Adelaide GPs, physios &amp; allied health. Reduce no-shows.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("AI Automation", f"{BASE_URL}/ai-automation.html"), ("Medical Practice Automation", f"{BASE_URL}/medical-automation.html")],
    },
    "real-estate-automation.html": {
        "canonical": f"{BASE_URL}/real-estate-automation.html",
        "title": "AI Automation for Adelaide Real Estate Agents | Lumen ADL",
        "desc": "Automated lead follow-up, inspection reminders &amp; appraisal sequences for Adelaide real estate agents. Close more listings with less admin.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("AI Automation", f"{BASE_URL}/ai-automation.html"), ("Real Estate Automation", f"{BASE_URL}/real-estate-automation.html")],
    },
    "about.html": {
        "canonical": f"{BASE_URL}/about.html",
        "title": "About Us | Lumen ADL | Adelaide Web Design &amp; SEO Agency",
        "desc": "Lumen ADL is an Adelaide-based web design, local SEO &amp; AI automation agency based in Mawson Lakes. We help local businesses rank on Google.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("About", f"{BASE_URL}/about.html")],
    },
    "contact.html": {
        "canonical": f"{BASE_URL}/contact.html",
        "title": "Contact Lumen ADL | Free Website Audit | Adelaide",
        "desc": "Get a free 2-minute website audit from Lumen ADL — Adelaide web design, SEO &amp; AI automation. Based in Mawson Lakes. Call or email today.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Contact", f"{BASE_URL}/contact.html")],
    },
    "faq.html": {
        "canonical": f"{BASE_URL}/faq.html",
        "title": "FAQ | Web Design, SEO &amp; AI Automation Questions | Lumen ADL",
        "desc": "Frequently asked questions about Lumen ADL's web design, local SEO &amp; AI automation services for Adelaide small businesses. Clear answers, no jargon.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("FAQ", f"{BASE_URL}/faq.html")],
    },
    "work.html": {
        "canonical": f"{BASE_URL}/work.html",
        "title": "Our Work | Lumen ADL | Real Results for Adelaide Businesses",
        "desc": "See real results from Lumen ADL's web design and SEO work — including M&amp;K Painting Services, ranked page 1 for 'painter Adelaide' in 8 weeks.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Our Work", f"{BASE_URL}/work.html")],
    },
    "blog.html": {
        "canonical": f"{BASE_URL}/blog.html",
        "title": "Blog | Web Design, SEO &amp; AI Tips for Adelaide Business | Lumen ADL",
        "desc": "Practical web design, local SEO &amp; AI automation insights for Adelaide small business owners. No jargon — just what actually works.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html")],
    },
    "outreach.html": {
        "canonical": f"{BASE_URL}/outreach.html",
        "title": "Outreach &amp; Growth Marketing for Adelaide Businesses | Lumen ADL",
        "desc": "Strategic outreach and growth marketing for Adelaide small businesses. Build backlinks, partnerships &amp; brand awareness that compounds over time.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Outreach", f"{BASE_URL}/outreach.html")],
    },
    "privacy.html": {
        "canonical": f"{BASE_URL}/privacy.html",
        "title": "Privacy Policy | Lumen ADL",
        "desc": "Lumen ADL privacy policy. How we collect, store and use your data in accordance with Australian privacy law.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "website",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Privacy Policy", f"{BASE_URL}/privacy.html")],
    },
    # Blog posts
    "blog/web-design-mawson-lakes.html": {
        "canonical": f"{BASE_URL}/blog/web-design-mawson-lakes.html",
        "title": "Web Design Mawson Lakes | Custom Websites for Local Business | Lumen ADL",
        "desc": "Looking for web design in Mawson Lakes? Lumen ADL builds fast, mobile-first websites for local businesses in Mawson Lakes and northern Adelaide.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Web Design Mawson Lakes", f"{BASE_URL}/blog/web-design-mawson-lakes.html")],
    },
    "blog/seo-golden-grove.html": {
        "canonical": f"{BASE_URL}/blog/seo-golden-grove.html",
        "title": "SEO Golden Grove | Local SEO for Golden Grove Businesses | Lumen ADL",
        "desc": "Rank on Google for customers in Golden Grove. Lumen ADL targets northern Adelaide suburbs including Golden Grove, Greenwith &amp; surrounds.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("SEO Golden Grove", f"{BASE_URL}/blog/seo-golden-grove.html")],
    },
    "blog/web-design-gawler.html": {
        "canonical": f"{BASE_URL}/blog/web-design-gawler.html",
        "title": "Web Design Gawler | Custom Websites for Gawler Businesses | Lumen ADL",
        "desc": "Affordable web design for Gawler small businesses. Lumen ADL builds fast, conversion-focused websites for trades, services &amp; retailers in Gawler.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Web Design Gawler", f"{BASE_URL}/blog/web-design-gawler.html")],
    },
    "blog/ai-automation-tradies-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/ai-automation-tradies-adelaide.html",
        "title": "AI Automation for Tradies Adelaide | Save 10+ Hours a Week | Lumen ADL",
        "desc": "How Adelaide tradies are using AI automation to handle missed calls, chase quotes &amp; get Google reviews automatically. Save 10+ hours a week.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("AI Automation for Tradies Adelaide", f"{BASE_URL}/blog/ai-automation-tradies-adelaide.html")],
    },
    "blog/ai-for-tradies-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/ai-for-tradies-adelaide.html",
        "title": "AI for Tradies Adelaide: The Complete Guide | Lumen ADL",
        "desc": "The complete guide to AI tools for Adelaide tradies. Missed call text-back, automated quoting, review generation &amp; lead qualification explained.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("AI for Tradies Adelaide", f"{BASE_URL}/blog/ai-for-tradies-adelaide.html")],
    },
    "blog/missed-call-text-back.html": {
        "canonical": f"{BASE_URL}/blog/missed-call-text-back.html",
        "title": "Missed Call Text-Back for Adelaide Small Business | Lumen ADL",
        "desc": "Never lose a lead to a missed call again. Our missed call text-back system auto-texts every missed caller within 30 seconds. See how it works.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Missed Call Text-Back", f"{BASE_URL}/blog/missed-call-text-back.html")],
    },
    "blog/ai-lead-qualification.html": {
        "canonical": f"{BASE_URL}/blog/ai-lead-qualification.html",
        "title": "AI Lead Qualification for Adelaide Business | 24/7 Enquiry Handling | Lumen ADL",
        "desc": "Our AI lead qualification system answers enquiries 24/7, qualifies prospects &amp; sends you the details. Never miss a lead while on the tools.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("AI Lead Qualification", f"{BASE_URL}/blog/ai-lead-qualification.html")],
    },
    "blog/web-design-law-firms-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/web-design-law-firms-adelaide.html",
        "title": "Web Design for Adelaide Law Firms | Convert More Clients | Lumen ADL",
        "desc": "Purpose-built websites for Adelaide law firms that convert visitors into clients. Fast, professional, SEO-optimised. Rank for 'law firm Adelaide' searches.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Web Design for Law Firms Adelaide", f"{BASE_URL}/blog/web-design-law-firms-adelaide.html")],
    },
    "blog/medical-dental-automation-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/medical-dental-automation-adelaide.html",
        "title": "Medical &amp; Dental AI Automation Adelaide | Reduce No-Shows | Lumen ADL",
        "desc": "AI automation for Adelaide medical and dental practices. Automated appointment reminders, missed call recovery &amp; review generation.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Medical &amp; Dental Automation Adelaide", f"{BASE_URL}/blog/medical-dental-automation-adelaide.html")],
    },
    "blog/mechanic-marketing-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/mechanic-marketing-adelaide.html",
        "title": "Marketing for Mechanics Adelaide | Get More Bookings | Lumen ADL",
        "desc": "How Adelaide mechanics can get more customers with local SEO, Google Business optimisation &amp; automated review requests. Rank for mechanic near me.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Mechanic Marketing Adelaide", f"{BASE_URL}/blog/mechanic-marketing-adelaide.html")],
    },
    "blog/barber-salon-marketing-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/barber-salon-marketing-adelaide.html",
        "title": "Marketing for Barbers &amp; Salons Adelaide | Get More Bookings | Lumen ADL",
        "desc": "How Adelaide barbers, hair salons &amp; beauty studios can rank on Google and fill their books. Local SEO, reviews &amp; AI booking automation.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Barber &amp; Salon Marketing Adelaide", f"{BASE_URL}/blog/barber-salon-marketing-adelaide.html")],
    },
    "blog/real-estate-web-design-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/real-estate-web-design-adelaide.html",
        "title": "Real Estate Web Design Adelaide | Convert More Listings | Lumen ADL",
        "desc": "Custom websites for Adelaide real estate agents that generate appraisal requests on autopilot. SEO-optimised, fast &amp; built to convert property enquiries.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Real Estate Web Design Adelaide", f"{BASE_URL}/blog/real-estate-web-design-adelaide.html")],
    },
    "blog/restaurant-marketing-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/restaurant-marketing-adelaide.html",
        "title": "Restaurant Marketing Adelaide | Get Found on Google | Lumen ADL",
        "desc": "How Adelaide restaurants, cafes &amp; takeaways can rank on Google and fill more tables. Local SEO &amp; automated review requests for hospitality.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Restaurant Marketing Adelaide", f"{BASE_URL}/blog/restaurant-marketing-adelaide.html")],
    },
    "blog/ecommerce-adelaide-small-business.html": {
        "canonical": f"{BASE_URL}/blog/ecommerce-adelaide-small-business.html",
        "title": "Ecommerce Website Adelaide | Online Store for Small Business | Lumen ADL",
        "desc": "Ecommerce websites for Adelaide small businesses. Fast, conversion-optimised online stores that rank on Google and turn visitors into buyers.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Ecommerce Adelaide Small Business", f"{BASE_URL}/blog/ecommerce-adelaide-small-business.html")],
    },
    "blog/fitness-marketing-adelaide.html": {
        "canonical": f"{BASE_URL}/blog/fitness-marketing-adelaide.html",
        "title": "Marketing for Gyms &amp; Personal Trainers Adelaide | Lumen ADL",
        "desc": "How Adelaide gyms, personal trainers &amp; fitness studios can get more members with local SEO, Google Business optimisation &amp; automated follow-up.",
        "og_img": f"{BASE_URL}/images/og-image.png",
        "og_type": "article",
        "crumbs": [("Home", f"{BASE_URL}/"), ("Blog", f"{BASE_URL}/blog.html"), ("Fitness Marketing Adelaide", f"{BASE_URL}/blog/fitness-marketing-adelaide.html")],
    },
}


def make_breadcrumb_json(crumbs):
    items = []
    for i, (name, url) in enumerate(crumbs, 1):
        items.append(f'{{"@type":"ListItem","position":{i},"name":"{name}","item":"{url}"}}')
    return (
        '<script type="application/ld+json">\n'
        '{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":['
        + ",".join(items)
        + "]}\n</script>"
    )


def make_og_block(data):
    return f"""    <!-- Open Graph -->
    <meta property="og:title" content="{data['title']}">
    <meta property="og:description" content="{data['desc']}">
    <meta property="og:type" content="{data['og_type']}">
    <meta property="og:url" content="{data['canonical']}">
    <meta property="og:image" content="{data['og_img']}">
    <meta property="og:locale" content="en_AU">
    <meta property="og:site_name" content="Lumen ADL">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{data['title']}">
    <meta name="twitter:description" content="{data['desc']}">
    <meta name="twitter:image" content="{data['og_img']}">"""


def process_file(rel_path, data):
    full_path = os.path.join(ROOT, rel_path.replace("/", os.sep))
    if not os.path.exists(full_path):
        print(f"SKIP (not found): {rel_path}")
        return

    with open(full_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Remove AW-XXXXXXXXXX placeholder line
    content = re.sub(r".*gtag\('config',\s*'AW-XXXXXXXXXX'\).*\n", "", content)

    # 2. Remove existing canonical tags
    content = re.sub(r'\s*<link rel="canonical"[^>]*>\n?', "\n", content)

    # 3. Remove existing hreflang tags
    content = re.sub(r'\s*<link rel="alternate" hreflang[^>]*>\n?', "\n", content)

    # 4. Remove existing OG/Twitter tags and their comment labels
    content = re.sub(r'\s*<!-- Open Graph -->\n?', "\n", content)
    content = re.sub(r'\s*<!-- Twitter Card -->\n?', "\n", content)
    content = re.sub(r'\s*<meta property="og:[^"]*"[^>]*>\n?', "\n", content)
    content = re.sub(r'\s*<meta name="twitter:[^"]*"[^>]*>\n?', "\n", content)

    # 5. Update title tag
    content = re.sub(r"<title>[^<]*</title>", f"<title>{data['title']}</title>", content)

    # 6. Update meta description if it exists
    content = re.sub(
        r'(<meta name="description"\s+content=")[^"]*(")',
        rf'\g<1>{data["desc"]}\g<2>',
        content,
    )

    # 7. Build the canonical+hreflang+OG block
    meta_block = f"""    <link rel="canonical" href="{data['canonical']}">
    <link rel="alternate" hreflang="en-au" href="{data['canonical']}">
{make_og_block(data)}"""

    # Insert after <meta name="robots"> or after <meta name="viewport">
    if re.search(r'<meta name="robots"', content):
        content = re.sub(
            r'(<meta name="robots"[^>]*>)',
            r'\1\n' + meta_block,
            content,
            count=1,
        )
    elif re.search(r'<meta name="viewport"', content):
        content = re.sub(
            r'(<meta name="viewport"[^>]*>)',
            r'\1\n' + meta_block,
            content,
            count=1,
        )

    # 8. Add / replace BreadcrumbList schema (skip homepage — it has one already)
    if data.get("crumbs") and rel_path != "index.html":
        breadcrumb_json = make_breadcrumb_json(data["crumbs"])
        if '"@type":"BreadcrumbList"' not in content:
            content = content.replace("</head>", f"    {breadcrumb_json}\n</head>", 1)

    # 9. Add AggregateRating to LocalBusiness on homepage
    if rel_path == "index.html" and '"aggregateRating"' not in content:
        content = content.replace(
            '"@type": "LocalBusiness",',
            '"@type": "LocalBusiness",\n      "aggregateRating": {"@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "12"},',
            1,
        )

    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"FIXED: {rel_path}")


for rel_path, data in PAGES.items():
    process_file(rel_path, data)


# --- Update sitemap.xml ---
SITEMAP_PATH = os.path.join(ROOT, "sitemap.xml")
with open(SITEMAP_PATH, "r", encoding="utf-8") as f:
    sitemap = f.read()

# Update all lastmod dates to today for pages we changed
TODAY = "2026-03-10"
sitemap = re.sub(r"<lastmod>20\d\d-\d\d-\d\d</lastmod>", f"<lastmod>{TODAY}</lastmod>", sitemap)

# Add outreach.html if missing
if "outreach.html" not in sitemap:
    outreach_entry = f"""  <url>
    <loc>{BASE_URL}/outreach.html</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
"""
    sitemap = sitemap.replace("  <!-- Blog Posts -->", outreach_entry + "  <!-- Blog Posts -->")

with open(SITEMAP_PATH, "w", encoding="utf-8") as f:
    f.write(sitemap)

print("\nFIXED: sitemap.xml")
print("\n✅ All done!")
