import Reveal from 'reveal.js/js/reveal';
import 'reveal.js/lib/js/head.min';

import classListUrl from 'reveal.js/lib/js/classList.js'

import notesUrl from 'reveal.js/plugin/notes/notes';
import 'reveal.js/plugin/notes/notes.html';

import zoomUrl from 'reveal.js/plugin/zoom-js/zoom';

import markedUrl from 'reveal.js/plugin/markdown/marked.js';

import markdownUrl from 'reveal.js/plugin/markdown/markdown.js';

import highlightUrl from 'reveal.js/plugin/highlight/highlight.js';


Reveal.initialize({
  center: false,
  controls: true,
  history: true,
  previewLinks: true,
  width: '100%',
  height: '100%',
  margin: 0.05,
  slideNumber: true,
  dependencies: [
    // Cross-browser shim that fully implements classList
    {
      src: classListUrl,
      condition: function() {
        return !document.body.classList;
      }
    },

    // Speaker notes
    {
      src: notesUrl,
      async: true
    },

    // Zoom in and out with Alt+click
    {
      src: zoomUrl,
      async: true,
    },

    // Interpret Markdown in <section> elements
    {
      src: markedUrl,
      condition: function() {
        return !!document.querySelector( '[data-markdown]' );
      }
    },

    {
      src: markdownUrl,
      condition: function() {
        return !!document.querySelector( '[data-markdown]' );
      }
    },

    // Syntax highlight for <code> elements
    {
      src: highlightUrl,
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    },
  ]
});
