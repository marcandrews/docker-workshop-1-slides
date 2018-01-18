// CSS imports
import 'reveal.js/css/theme/beige.css';

// JS imports
import './js/config';

// Conditionally add print stylesheets
if (window.location.search.match( /print-pdf/gi )) {
  require('reveal.js/css/print/pdf.css');
} else {
  require('reveal.js/css/print/paper.css');
}