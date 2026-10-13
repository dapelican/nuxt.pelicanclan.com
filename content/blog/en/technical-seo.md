---
meta_title: "35 SEO technical requirements and features"
meta_description: "35 SEO technical requirements and features for every website"
locale: en
visibility: private
category: SEO
slug: technical-seo
created_at: 2024-11-13
updated_at: 2024-11-25
---

# 35 SEO technical requirements and features

## Introduction

### How did I make this list?

No need to say that I didn't invent the wheel with this. 90% of the technical requirements are good practices that can be found in [Google official resources](/seo-resources). I was also inspired by the following resources:

- Clay Cazier's [SEO requirements for a new website platform](https://searchengineland.com/seo-requirements-new-website-platform-254237?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2016-07-27 - Search Engine Land). This article is probably the best article on technical SEO I found, as it is really about technical SEO. Logically, many of the features listed by Clay Cazier are in my article. However, I was bothered by the lack of grouping between the features. I also felt that some features were too specific (feature 19 about AngularJS) and some were repetitive. The distinction between Platform SEO requirements and Platform SEO near-requirements wasn't relevant to me.
- Matthew Howells-Barby's [How We Increased Organic Traffic by Over 50% Using Technical SEO Updates](https://blog.hubspot.com/marketing/technical-seo?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (2016-01-29 - HubSpot). This article is an interesting case study that shows how important are the technical features for SEO. The article focuses on several features that are in my list: 404 pages, pagination, structured data, customizable text zones, hreflang and XML sitemap. The article also covers language meta tags, which, I think, are not necessary and should be replaced by a lang attribute in the HTML opening tag of the document.

### Who is this list for?

The added-value of this list depends on the type of website you use it for.

1. For custom-developed websites, this list is a gold mine (or at least I hope it is!). You have an updated overview of what needs to be done to make an SEO-friendly website. Web developers, this list is really for you.

2. For websites based on CMS platforms, the majority of the technical features listed below should already be integrated in the CMS core code, even though it is not always the case. And if there are not, it is not always possible to implement them without interfering with the core of the CMS, which is not recommended. However, the list can be useful to compare CMS software regarding their SEO friendliness.

If you work in SEO, this checklist is also a solid basis to perform **technical SEO audits**. A technical SEO audit is not about spotting pages with missing meta descriptions. Technical SEO audits are really about checking the presence of technical requirements on a website.

## The list

A SEO-friendly website needs to have specific technical requirements in its core. I listed 35 features or mega-features into 6 different groups.

### 1. Crawlability and indexability

1. The main XML sitemap is accessible at the root of the domain.
2. The XML sitemap(s) include all "to be indexed" pages.
3. The XML sitemap(s) exclude all "not to be indexed" pages.
4. If appropriate, the XML sitemap(s) include links to images.
5. The robots.txt file is accessible at the root of the domain.
6. The robots.txt file lists all "disallow/not to be indexed" pages.
7. The link to the main XML sitemap is in the robots.txt file.
8. Each page type of your website has structured data in JSON-LD format.
9. Each page type of your website has valid HTML code, validated on [https://validator.w3.org/](https://validator.w3.org/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
10. Each page type of your website has valid CSS code, validated on [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
11. Your website has a 404 page with a proper 404 HTTP status code.
12. All "not to be indexed" pages include a "noindex" meta tag.
13. For websites translated in 2 or more languages, all pages have hreflang attributes with appropriate regions/languages codes.

### 2. URLs

1. All pages of your website are in HTTPS.
2. All versions of your domain have an automatic 301 redirection to your primary domain.
3. When the URL of a page has changed, the old URL has a 301 redirect to the new URL.
4. All URLs should be unique and clean.
5. A page can only be accessed through 1 unique URL (no duplicate pages).
6. URLs of generic pages should be paginated, especially generic pages with infinite scroll.

### 3. Content

1. Each page has a customizable title tag, with an optimal length of **50 to 60 characters**.
2. Each page has a customizable meta description tag, with an optimal **length of 50 to 160 characters**.
3. Each page has customizable text zones at the top of the page, with customizable headings (h1 to h4).
4. Each image has customizable information: you can choose the name of the file (as it appears in the URL), the title tag (name of the image) and the alt tag.

### 4. Loading performance

1. The images of your website are optimized (compressed).
2. The HTML, CSS and JavaScript code used by your website is minified (code minification).
3. The JavaScript code used by your website is split into bundles (code splitting).
4. Your website uses premium hosting.
5. You serve cached content of your website with reverse proxy servers and/or a content delivery network (CDN).
6. Your website is fast on mobiles (smartphones).

### 5. User experience

1. Your website fits all screens (desktops, tablets, smartphones), with ideally responsive web design (RWS).
2. Your website has a custom (well designed) 404 page.
3. Your website does not have broken links (no 404 pages).
4. Your website has a high definition favicon.

### 6. Social

1. Every public pages of your website have open graph metadata.
2. Every public pages of your website have complementary Twitter Cards tags.

## Further exploration

### Crawlability and indexability

Crawlability and indexability are at the heart of how search engines work, so it is not surprising to put this section as the first one on my list.

### Not to index pages

There are mainly 2 reasons to prevent a page from being indexed:

1. For security and privacy reasons: the page is only intended for one or several users. For example, the private back-office pages of an e-commerce website.
2. For quality reasons: the content of a page is of low quality, due to poor or duplicate content.

If you need to prevent a page from being indexed by search engines or de-index one that has already been inexed, you should read this: [Block search indexing with 'noindex'](https://developers.google.com/search/docs/crawling-indexing/block-indexing?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### One or several XML sitemaps?

There is no preference related to having a unique or several XML sitemaps for a website. But if a website has or can have a lot of pages, multiple sitemaps are the way to go. The only requirement is to create a sitemap index file, listing all sitemaps of the website. You can learn more about this here: [Split up your large sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### JSON-LD structured data

For JSON-LD structured data, you should read:

- [Understand how structured data works](https://developers.google.com/search/docs/advanced/structured-data/intro-structured-data?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Explore the search gallery](https://developers.google.com/search/docs/advanced/structured-data/search-gallery?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Full Hierarchy of structured data available](https://schema.org/docs/full.html?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}. This page lists all the possible data that can be structured with JSON-LD. Depending on what information you want to put on a page, you have to find what data can be structured. The more data you can structure on a page, the better it is to help indexation for search engines.

### Search-engine friendly code

Search-engine friendly code is standard HTML and CSS. To make sure your code is valid, you can use the W3C validation tools:

- [The W3C Markup Validation Service](https://validator.w3.org/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [CSS Validation Service](https://jigsaw.w3.org/css-validator/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

For JavaScript-related topics:

- [How Does Google Handle Javascript When Crawling, Rendering & Indexing Pages](https://www.hobo-web.co.uk/javascript-seo/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [The Ultimate Guide to JavaScript SEO](https://www.onely.com/blog/ultimate-guide-javascript-seo/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [The Basics of JavaScript Framework SEO](https://builtvisible.com/javascript-framework-seo/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

Finally, here are some guidelines from Google regarding JavaScript:

- [Understand the JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### 404 page

A 404 page is necessary to indicate to users and search engines that a URL is no longer valid. However, search engines hate 404 pages, as it signals broken links. The fewer, the better for SEO.

404 pages generally appear in 2 cases:

1. A page is deleted or a URL is changed. This scenario can be avoided by redirecting the non-valid URL to a valid one (301 redirect).
2. An external website is linking to a page that never existed. A 301 redirect can also be put in place in this case.

For the user, the best thing is to have a customized (and if possible original) 404 page. You can find some inspiration on these websites:

- [Dribble](https://dribbble.com/tags/404?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Awwwards](https://www.awwwards.com/awwwards/collections/404-error-page/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Muz.li](https://medium.muz.li/404-page-inspiration-de4ec8618693?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [bonjour404.fr](http://www.bonjour404.fr/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"} (404 pages in English and French).

### hreflang attribute

If you want to have different languages for a website, there are 3 recommendended options:

1. One top level domain name per language.
2. One sub-domain name per language, with the same top level domain name. This is what Wikipedia is doing.
3. One subdirectory per language with the same top level domain name.

You can read more about this in these articles:

- [Tell Google about localized versions of your page](https://developers.google.com/search/docs/advanced/crawling/localized-versions?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Managing multi-regional and multilingual sites](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### Primary domain

Your primary domain should start with https and I recommend to keep the www. So, your primary domain should start with *https://www*.

### Change of URLs

Please note that you should avoid changing URLs. Search engines like stability, and especially don't like change of URLs.

### Clean URL

A clean URL is a URL made of words that humans can easily read and understand. The authorized characters are the following:

- the 26 lowercase letters from a to z.
- the 10 digits from 0 to 9.
- The dash punctuation mark (-).

### Duplicate content

If you stick to the rule "1 page = 1 unique URL", canonical URL tags are useless within the same website. If you have pages accessible by selecting filters (facets), tags or categories, make sure that those filters, tags and categories are always ordered in the same way in the URL. If there is no systematic order set, canonical tags are needed.

### URLs - Infinite scroll

Should you use infinite scroll or not? Even though there isn't a definitive answer to this question, we can state that:

- Infinite scroll seems to offer better user experience (except if you're trying to reach the footer).
- As stated in the list, pagination is the safest way to go in terms of SEO.

However, if you do want to use infinite scroll, please refer to these articles:

- [Infinite scroll search-friendly recommendations](https://developers.google.com/search/blog/2014/02/infinite-scroll-search-friendly?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [SEO Friendly Pagination: A Complete Best Practices Guide](https://www.searchenginejournal.com/technical-seo/pagination/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### Optimized images

To know more about images:

- [Image file formats: everything you've ever wanted to know](https://99designs.com/blog/tips/image-file-types/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Differences Between File Formats (RAW, DNG, TIFF, GIF, PNG, JPEG)](https://www.photoup.net/learn/differences-between-file-formats-raw-dng-tiff-gif-png-jpeg?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [How to optimize images for web and performance](https://kinsta.com/blog/optimize-images-for-web/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Appendix: Image format support and usage](https://cloudinary.com/documentation/image_optimization?utm_source=pelicanclan.com&utm_medium=article#appendix_image_format_support_and_usage){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### AMP version for public content pages

Yeah, I know. AMP is quite controversial and I can understand the reluctance of using it:

- [Why AMP is bad for your site and for the Web](https://medium.com/@danbuben/why-amp-is-bad-for-your-site-and-for-the-web-e4d060a4ff31?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [A letter about Google AMP](http://ampletter.org/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

Also, AMP might not work for your website. Kinsta published a nice article about this: [Google AMP Case Study – Leads Dropped by 59% (How to Disable It)](https://kinsta.com/blog/disable-google-amp/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### User experience and performance

User experience and performance are vast and complex issues. I recommend to start with these Google resources to get an overview of these subjects:

- [Basics of UX](https://web.dev/ux-basics/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Why does speed matter?](https://web.dev/why-speed-matters/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}

### A website compatible with all devices

There are 3 technical options for cross-device compatibility:

1. Responsive Web Design.
2. Dynamic serving.
3. Separte URLs.

Google's stand on this is adamant: [Responsive Web Design is the way to go](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.

### Open graph metadata and Twitter Cards

You can refer to these sources for implementation:

- [The Open Graph protocol](http://ogp.me/?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
- [Optimize Tweets with Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started?utm_source=pelicanclan.com&utm_medium=article){target="_blank" rel="noopener noreferrer" class="text-primary"}.
