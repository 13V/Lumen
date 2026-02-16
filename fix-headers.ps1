# Standard header for root pages
$rootHeader = @'
    <header class="header">
        <div class="container">
            <a href="/" class="logo"><img src="images/lumen-icon.png" alt="Lumen logo" class="logo-icon">Lumen</a>
            <button class="menu-toggle" id="menuToggle" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav" id="mainNav">
                <a href="/work.html">Work</a>
                <a href="/blog.html">Blog</a>
                <a href="/faq.html">FAQ</a>
                <a href="/about.html">About</a>
                <a href="tel:+61421276482" class="nav-phone">&#128222; 0421 276 482</a>
                <a href="/contact.html" class="nav-cta">Get in touch</a>
            </nav>
        </div>
    </header>
'@

# Standard header for blog pages (../ paths)
$blogHeader = @'
    <header class="header">
        <div class="container">
            <a href="/" class="logo"><img src="../images/lumen-icon.png" alt="Lumen logo" class="logo-icon">Lumen</a>
            <button class="menu-toggle" id="menuToggle" aria-label="Open menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <nav class="nav" id="mainNav">
                <a href="/work.html">Work</a>
                <a href="/blog.html">Blog</a>
                <a href="/faq.html">FAQ</a>
                <a href="/about.html">About</a>
                <a href="tel:+61421276482" class="nav-phone">&#128222; 0421 276 482</a>
                <a href="/contact.html" class="nav-cta">Get in touch</a>
            </nav>
        </div>
    </header>
'@

# Fix root pages
$rootPages = @("about.html", "contact.html", "faq.html", "work.html", "privacy.html", "blog.html")
foreach($page in $rootPages) {
    $path = "C:\Users\Administrator\.openclaw\lumen-agency\$page"
    if(!(Test-Path $path)) { continue }
    $content = Get-Content $path -Raw
    
    # Remove inline <style> blocks that contain nav/header/menu-toggle styles
    $content = $content -replace '(?s)<style>\s*\.menu-toggle\s*\{.*?</style>\s*', ''
    $content = $content -replace '(?s)<style>\s*@media[^<]*\.nav[^<]*</style>\s*', ''
    
    # Replace header block - match various patterns
    # Pattern 1: <header class="header">...</header>
    $content = $content -replace '(?s)<header class="header">.*?</header>', $rootHeader
    # Pattern 2: <nav class="nav"> as top-level nav (blog listing page)
    # Only if no header was found
    if($content -notmatch '<header class="header">') {
        $content = $content -replace '(?s)<!-- Navigation -->\s*<nav class="nav">.*?</nav>', $rootHeader
    }
    
    Set-Content $path -Value $content -NoNewline
    echo "Fixed root: $page"
}

# Fix blog pages
$blogPages = Get-ChildItem "C:\Users\Administrator\.openclaw\lumen-agency\blog\*.html" -Name
foreach($page in $blogPages) {
    $path = "C:\Users\Administrator\.openclaw\lumen-agency\blog\$page"
    $content = Get-Content $path -Raw
    
    # Remove inline <style> blocks for nav
    $content = $content -replace '(?s)\s*<style>\s*@media\s*\(max-width:\s*768px\)\s*\{\s*\.nav\s+\.container.*?</style>', ''
    
    # Replace nav block
    $content = $content -replace '(?s)<!-- Navigation -->\s*<nav class="nav">.*?</nav>', $blogHeader
    
    Set-Content $path -Value $content -NoNewline
    echo "Fixed blog: $page"
}
