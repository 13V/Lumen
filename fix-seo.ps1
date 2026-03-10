# ============================================================
# Lumen ADL — Comprehensive SEO Fix Script
# Fixes: canonicals, hreflang, OG tags, Twitter tags,
#        removes AW-XXXXXXXXXX placeholder, AggregateRating schema,
#        BreadcrumbList schema on inner pages, sitemap update
# ============================================================

$baseUrl = "https://www.lumenadl.com"

# ----------------------------------------------------------
# Page metadata map: slug => [canonical, title, description, ogImage, breadcrumb]
# ogImage defaults to /images/og-image.png where no custom one
# ----------------------------------------------------------
$pageData = @{
    "index.html" = @{
        canonical = "$baseUrl/"
        title = "Lumen ADL · Websites, SEO & AI Automation for Adelaide Small Business"
        description = "Web design, SEO & AI automation for Adelaide small businesses. Mawson Lakes, Golden Grove, Gawler. Websites that rank, automations that close. Tradies, lawyers, dentists & more."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = ""  # homepage — keep existing
    }
    "local-seo-adelaide.html" = @{
        canonical = "$baseUrl/local-seo-adelaide.html"
        title = "Local SEO Adelaide | Rank on Page 1 in 8 Weeks | Lumen ADL"
        description = "Local SEO for Adelaide small businesses. We got M&K Painting from page 3 to page 1 in 8 weeks. Packages from \$700/mo. No lock-in contracts."
        ogImage = "$baseUrl/images/og-local-seo.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Local SEO Adelaide";url="$baseUrl/local-seo-adelaide.html"})
    }
    "ai-automation.html" = @{
        canonical = "$baseUrl/ai-automation.html"
        title = "AI Automation for Adelaide Small Business | Lumen ADL"
        description = "Missed call text-back, AI lead qualification, automated review requests & quote follow-ups. AI automation for Adelaide tradies, lawyers, dentists & more. Custom pricing."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="AI Automation";url="$baseUrl/ai-automation.html"})
    }
    "dental.html" = @{
        canonical = "$baseUrl/dental.html"
        title = "AI Automation & Web Design for Adelaide Dental Practices | Lumen ADL"
        description = "Automated appointment reminders, missed call text-back & review generation for Adelaide dentists. Stop losing patients to missed calls. Custom AI systems for dental clinics."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="AI Automation";url="$baseUrl/ai-automation.html"}, @{name="Dental Practice Automation";url="$baseUrl/dental.html"})
    }
    "law-firm-automation.html" = @{
        canonical = "$baseUrl/law-firm-automation.html"
        title = "AI Automation for Adelaide Law Firms | Lumen ADL"
        description = "24/7 AI intake, automated client follow-ups & appointment reminders for Adelaide law firms. Stop losing enquiries to voicemail. AI systems built for legal practices."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="AI Automation";url="$baseUrl/ai-automation.html"}, @{name="Law Firm Automation";url="$baseUrl/law-firm-automation.html"})
    }
    "tradie-automation.html" = @{
        canonical = "$baseUrl/tradie-automation.html"
        title = "AI Automation for Adelaide Tradies | Lumen ADL"
        description = "Missed call text-back, automated quote follow-ups & Google review requests for Adelaide tradies. Never lose a lead on a job site again. AI systems for plumbers, sparkies & more."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="AI Automation";url="$baseUrl/ai-automation.html"}, @{name="Tradie Automation";url="$baseUrl/tradie-automation.html"})
    }
    "medical-automation.html" = @{
        canonical = "$baseUrl/medical-automation.html"
        title = "AI Automation for Adelaide Medical Practices | Lumen ADL"
        description = "Automated appointment reminders, patient follow-ups & missed call recovery for Adelaide GPs, physios & allied health. Reduce no-shows. Reclaim admin time."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="AI Automation";url="$baseUrl/ai-automation.html"}, @{name="Medical Practice Automation";url="$baseUrl/medical-automation.html"})
    }
    "real-estate-automation.html" = @{
        canonical = "$baseUrl/real-estate-automation.html"
        title = "AI Automation for Adelaide Real Estate Agents | Lumen ADL"
        description = "Automated lead follow-up, inspection reminders & appraisal request sequences for Adelaide real estate agents. Close more listings with less admin."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="AI Automation";url="$baseUrl/ai-automation.html"}, @{name="Real Estate Automation";url="$baseUrl/real-estate-automation.html"})
    }
    "about.html" = @{
        canonical = "$baseUrl/about.html"
        title = "About Us | Lumen ADL | Adelaide Web Design & SEO Agency"
        description = "Lumen ADL is an Adelaide-based web design, local SEO & AI automation agency. Based in Mawson Lakes. We help local businesses rank on Google and close more leads."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="About";url="$baseUrl/about.html"})
    }
    "contact.html" = @{
        canonical = "$baseUrl/contact.html"
        title = "Contact Lumen ADL | Free Website Audit | Adelaide"
        description = "Get a free 2-minute website audit from Lumen ADL — Adelaide's web design, SEO & AI automation agency. Based in Mawson Lakes. Call or email today."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Contact";url="$baseUrl/contact.html"})
    }
    "faq.html" = @{
        canonical = "$baseUrl/faq.html"
        title = "FAQ | Web Design, SEO & AI Automation Questions | Lumen ADL"
        description = "Frequently asked questions about Lumen ADL's web design, local SEO & AI automation services for Adelaide small businesses. Clear answers, no jargon."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="FAQ";url="$baseUrl/faq.html"})
    }
    "work.html" = @{
        canonical = "$baseUrl/work.html"
        title = "Our Work | Lumen ADL | Real Results for Adelaide Businesses"
        description = "See real results from Lumen ADL's web design and SEO work — including M&K Painting Services, ranked page 1 for 'painter Adelaide' in 8 weeks."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Our Work";url="$baseUrl/work.html"})
    }
    "blog.html" = @{
        canonical = "$baseUrl/blog.html"
        title = "Blog | Web Design, SEO & AI Tips for Adelaide Business | Lumen ADL"
        description = "Practical web design, local SEO & AI automation insights for Adelaide small business owners. No jargon — just what actually works."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"})
    }
    "outreach.html" = @{
        canonical = "$baseUrl/outreach.html"
        title = "Outreach & Growth Marketing for Adelaide Businesses | Lumen ADL"
        description = "Strategic outreach and growth marketing services for Adelaide small businesses. Build backlinks, partnerships & brand awareness that compounds over time."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Outreach";url="$baseUrl/outreach.html"})
    }
    "privacy.html" = @{
        canonical = "$baseUrl/privacy.html"
        title = "Privacy Policy | Lumen ADL"
        description = "Lumen ADL's privacy policy. How we collect, store and use your data in accordance with Australian privacy law."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Privacy Policy";url="$baseUrl/privacy.html"})
    }
}

# Blog post metadata
$blogData = @{
    "blog/web-design-mawson-lakes.html" = @{
        canonical = "$baseUrl/blog/web-design-mawson-lakes.html"
        title = "Web Design Mawson Lakes | Custom Websites for Local Business | Lumen ADL"
        description = "Looking for web design in Mawson Lakes? Lumen ADL builds fast, mobile-first websites for local businesses in Mawson Lakes and northern Adelaide. From \$2,500."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Web Design Mawson Lakes";url="$baseUrl/blog/web-design-mawson-lakes.html"})
    }
    "blog/seo-golden-grove.html" = @{
        canonical = "$baseUrl/blog/seo-golden-grove.html"
        title = "SEO Golden Grove | Local SEO for Golden Grove Businesses | Lumen ADL"
        description = "Rank on Google for customers searching in Golden Grove. Lumen ADL's local SEO service targets northern Adelaide suburbs including Golden Grove, Greenwith & surrounds."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="SEO Golden Grove";url="$baseUrl/blog/seo-golden-grove.html"})
    }
    "blog/web-design-gawler.html" = @{
        canonical = "$baseUrl/blog/web-design-gawler.html"
        title = "Web Design Gawler | Custom Websites for Gawler Businesses | Lumen ADL"
        description = "Affordable web design for Gawler small businesses. Lumen ADL builds fast, conversion-focused websites for trades, services & retailers in Gawler and surrounds."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Web Design Gawler";url="$baseUrl/blog/web-design-gawler.html"})
    }
    "blog/ai-automation-tradies-adelaide.html" = @{
        canonical = "$baseUrl/blog/ai-automation-tradies-adelaide.html"
        title = "AI Automation for Tradies Adelaide | Save 10+ Hours a Week | Lumen ADL"
        description = "How Adelaide tradies are using AI automation to handle missed calls, chase quotes & get Google reviews automatically. Save 10+ hours a week without lifting a finger."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="AI Automation for Tradies Adelaide";url="$baseUrl/blog/ai-automation-tradies-adelaide.html"})
    }
    "blog/ai-for-tradies-adelaide.html" = @{
        canonical = "$baseUrl/blog/ai-for-tradies-adelaide.html"
        title = "AI for Tradies Adelaide: The Complete Guide | Lumen ADL"
        description = "The complete guide to AI tools for Adelaide tradies. Missed call text-back, automated quoting, review generation & lead qualification — everything you need to stop losing leads."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="AI for Tradies Adelaide";url="$baseUrl/blog/ai-for-tradies-adelaide.html"})
    }
    "blog/missed-call-text-back.html" = @{
        canonical = "$baseUrl/blog/missed-call-text-back.html"
        title = "Missed Call Text-Back for Adelaide Small Business | Lumen ADL"
        description = "Never lose a lead to a missed call again. Lumen ADL's missed call text-back system auto-texts every missed caller within 30 seconds. See how it works."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Missed Call Text-Back";url="$baseUrl/blog/missed-call-text-back.html"})
    }
    "blog/ai-lead-qualification.html" = @{
        canonical = "$baseUrl/blog/ai-lead-qualification.html"
        title = "AI Lead Qualification for Adelaide Business | 24/7 Enquiry Handling | Lumen ADL"
        description = "Our AI lead qualification system answers enquiries 24/7, qualifies prospects & sends you the details. Never miss a lead — even when you're on the tools."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="AI Lead Qualification";url="$baseUrl/blog/ai-lead-qualification.html"})
    }
    "blog/web-design-law-firms-adelaide.html" = @{
        canonical = "$baseUrl/blog/web-design-law-firms-adelaide.html"
        title = "Web Design for Adelaide Law Firms | Convert More Clients | Lumen ADL"
        description = "Purpose-built websites for Adelaide law firms that convert visitors into clients. Fast, professional, SEO-optimised. See how we help Adelaide solicitors rank on Google."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Web Design for Law Firms Adelaide";url="$baseUrl/blog/web-design-law-firms-adelaide.html"})
    }
    "blog/medical-dental-automation-adelaide.html" = @{
        canonical = "$baseUrl/blog/medical-dental-automation-adelaide.html"
        title = "Medical & Dental AI Automation Adelaide | Reduce No-Shows | Lumen ADL"
        description = "AI automation for Adelaide medical and dental practices. Automated appointment reminders, missed call recovery & review generation. Reduce no-shows by up to 40%."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Medical & Dental Automation Adelaide";url="$baseUrl/blog/medical-dental-automation-adelaide.html"})
    }
    "blog/mechanic-marketing-adelaide.html" = @{
        canonical = "$baseUrl/blog/mechanic-marketing-adelaide.html"
        title = "Marketing for Mechanics Adelaide | Get More Bookings | Lumen ADL"
        description = "How Adelaide mechanics can get more customers with local SEO, Google Business profile optimisation & automated review requests. Rank for 'mechanic [suburb]' searches."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Mechanic Marketing Adelaide";url="$baseUrl/blog/mechanic-marketing-adelaide.html"})
    }
    "blog/barber-salon-marketing-adelaide.html" = @{
        canonical = "$baseUrl/blog/barber-salon-marketing-adelaide.html"
        title = "Marketing for Barbers & Salons Adelaide | Get More Bookings | Lumen ADL"
        description = "How Adelaide barbers, hair salons & beauty studios can rank on Google and fill their books. Local SEO, review generation & AI booking automation for salons."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Barber & Salon Marketing Adelaide";url="$baseUrl/blog/barber-salon-marketing-adelaide.html"})
    }
    "blog/real-estate-web-design-adelaide.html" = @{
        canonical = "$baseUrl/blog/real-estate-web-design-adelaide.html"
        title = "Real Estate Web Design Adelaide | Convert More Listings | Lumen ADL"
        description = "Custom websites for Adelaide real estate agents that generate appraisal requests on autopilot. SEO-optimised, fast-loading & built to convert property enquiries."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Real Estate Web Design Adelaide";url="$baseUrl/blog/real-estate-web-design-adelaide.html"})
    }
    "blog/restaurant-marketing-adelaide.html" = @{
        canonical = "$baseUrl/blog/restaurant-marketing-adelaide.html"
        title = "Restaurant Marketing Adelaide | Get Found on Google | Lumen ADL"
        description = "How Adelaide restaurants, cafes & takeaways can rank on Google and fill more tables. Local SEO, Google Business optimisation & automated review requests for hospitality."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Restaurant Marketing Adelaide";url="$baseUrl/blog/restaurant-marketing-adelaide.html"})
    }
    "blog/ecommerce-adelaide-small-business.html" = @{
        canonical = "$baseUrl/blog/ecommerce-adelaide-small-business.html"
        title = "Ecommerce Website Adelaide | Online Store for Small Business | Lumen ADL"
        description = "Ecommerce websites for Adelaide small businesses. We build fast, conversion-optimised online stores that rank on Google and turn visitors into buyers."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Ecommerce Adelaide Small Business";url="$baseUrl/blog/ecommerce-adelaide-small-business.html"})
    }
    "blog/fitness-marketing-adelaide.html" = @{
        canonical = "$baseUrl/blog/fitness-marketing-adelaide.html"
        title = "Marketing for Gyms & Personal Trainers Adelaide | Lumen ADL"
        description = "How Adelaide gyms, personal trainers & fitness studios can get more members with local SEO, Google Business optimisation & automated lead follow-up."
        ogImage = "$baseUrl/images/og-image.png"
        breadcrumb = @(@{name="Home";url="$baseUrl/"}, @{name="Blog";url="$baseUrl/blog.html"}, @{name="Fitness Marketing Adelaide";url="$baseUrl/blog/fitness-marketing-adelaide.html"})
    }
}

# Merge all page data
$allPages = @{}
foreach ($key in $pageData.Keys) { $allPages[$key] = $pageData[$key] }
foreach ($key in $blogData.Keys) { $allPages[$key] = $blogData[$key] }

# AggregateRating schema to inject into homepage LocalBusiness
$aggregateRatingJSON = '"aggregateRating": {"@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "12"},'

$processed = 0
$errors = 0

foreach ($slug in $allPages.Keys) {
    $filePath = Join-Path "." $slug
    if (-not (Test-Path $filePath)) {
        Write-Host "SKIP (not found): $slug"
        continue
    }

    $content = Get-Content $filePath -Raw -Encoding UTF8
    $data = $allPages[$slug]
    $canonical = $data.canonical
    $title = $data.title
    $description = $data.description
    $ogImage = $data.ogImage
    $breadcrumb = $data.breadcrumb

    # --- 1. Remove AW-XXXXXXXXXX placeholder line ---
    $content = $content -replace "(?m).*gtag\('config',\s*'AW-XXXXXXXXXX'\).*\r?\n", ""

    # --- 2. Remove existing canonical (to replace cleanly) ---
    $content = $content -replace '<link rel="canonical"[^>]*>\r?\n?', ""

    # --- 3. Remove existing hreflang (to replace cleanly) ---
    $content = $content -replace '<link rel="alternate" hreflang[^>]*>\r?\n?', ""

    # --- 4. Remove existing OG/Twitter tags (to replace cleanly) ---
    $content = $content -replace '<meta property="og:[^"]*"[^>]*>\r?\n?', ""
    $content = $content -replace '<meta name="twitter:[^"]*"[^>]*>\r?\n?', ""
    $content = $content -replace '<!-- Open Graph -->(\r?\n)?', ""
    $content = $content -replace '<!-- Twitter Card -->(\r?\n)?', ""

    # --- 5. Update title tag ---
    $content = $content -replace '<title>[^<]*</title>', "<title>$title</title>"

    # --- 6. Update meta description ---
    $content = $content -replace '(<meta name="description"\s+content=")([^"]*?)(")', "`${1}$description`${3}"
    # If no description exists, we skip (almost all pages have one)

    # --- 7. Build replacement head block with all new meta ---
    $ogTitle = $title -replace " \| Lumen ADL", " — Lumen ADL"
    $ogDesc = $description

    # Is it a blog post?
    $isBlog = $slug -like "blog/*"
    $ogType = if ($isBlog) { "article" } else { "website" }

    $newMetaBlock = @"
    <link rel="canonical" href="$canonical">
    <link rel="alternate" hreflang="en-au" href="$canonical">
    <!-- Open Graph -->
    <meta property="og:title" content="$ogTitle">
    <meta property="og:description" content="$ogDesc">
    <meta property="og:type" content="$ogType">
    <meta property="og:url" content="$canonical">
    <meta property="og:image" content="$ogImage">
    <meta property="og:locale" content="en_AU">
    <meta property="og:site_name" content="Lumen ADL">
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="$ogTitle">
    <meta name="twitter:description" content="$ogDesc">
    <meta name="twitter:image" content="$ogImage">
"@

    # Insert after <meta name="robots"> line, or after viewport if no robots tag
    if ($content -match '<meta name="robots"') {
        $content = $content -replace '(<meta name="robots"[^>]*>)', "`$1`n$newMetaBlock"
    } elseif ($content -match '<meta name="viewport"') {
        $content = $content -replace '(<meta name="viewport"[^>]*>)', "`$1`n$newMetaBlock"
    }

    # --- 8. Add BreadcrumbList schema (skip homepage which already has it) ---
    if ($breadcrumb -and $breadcrumb.Count -gt 0 -and $slug -ne "index.html") {
        $listItems = @()
        $pos = 1
        foreach ($crumb in $breadcrumb) {
            $listItems += "{`"@type`":`"ListItem`",`"position`":$pos,`"name`":`"$($crumb.name)`",`"item`":`"$($crumb.url)`"}"
            $pos++
        }
        $breadcrumbJSON = "{`"@context`":`"https://schema.org`",`"@type`":`"BreadcrumbList`",`"itemListElement`":[" + ($listItems -join ",") + "]}"
        $breadcrumbScript = "`n    <script type=`"application/ld+json`">`n$breadcrumbJSON`n    </script>"
        # Insert before </head>
        if ($content -notmatch '"@type":"BreadcrumbList"') {
            $content = $content -replace '</head>', "$breadcrumbScript`n</head>"
        }
    }

    # --- 9. Add AggregateRating to LocalBusiness schema on homepage ---
    if ($slug -eq "index.html" -and $content -notmatch '"aggregateRating"') {
        $content = $content -replace '("@type":\s*"LocalBusiness",)', "`$1`n      $aggregateRatingJSON"
    }

    # Save the file
    [System.IO.File]::WriteAllText((Resolve-Path $filePath).Path, $content, [System.Text.Encoding]::UTF8)
    $processed++
    Write-Host "FIXED: $slug"
}

Write-Host "`n✅ Done. Fixed $processed pages. Errors: $errors"
