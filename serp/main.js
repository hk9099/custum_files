// Import the "GoogleSERP" and "GoogleNojsSERP" classes from the "serp-parser" library
import { GoogleSERP, GoogleNojsSERP } from 'serp-parser';

// Use the "GoogleSERP" parser for HTML from headless browser
const parser = new GoogleSERP(html);
console.dir(parser.serp);

// Use the "GoogleNojsSERP" parser for HTML from no-js-enabled requests
fetch('https://www.google.com/search?q=google')
    .then(response => response.text())
    .then(html => {
        const noJsParser = new GoogleNojsSERP(html);
        console.dir(noJsParser.serp);
    })
    .catch(error => console.error(error));
