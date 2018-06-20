const dependencies = [
  { src: "//cdn.socket.io/socket.io-1.3.5.js", async: true }
];

if (process.env.REVEAL_JS_SECRET) {
  dependencies.push({
    src: "vendor/reveal.js/plugin/multiplex/master.js",
    async: true
  });
  dependencies.push({
    src: "vendor/reveal.js/plugin/notes/notes.js",
    async: true
  });
} else {
  dependencies.push({
    src: "vendor/reveal.js/plugin/multiplex/client.js",
    async: true
  });
}

Reveal.initialize({
  center: false,
  controls: true,
  history: true,
  previewLinks: true,

  // The "normal" size of the presentation, aspect ratio will be preserved
  // when the presentation is scaled to fit different resolutions. Can be
  // specified using percentage units.
  width: 1600,
  height: 900,

  // Factor of the display size that should remain empty around the content
  margin: 0.1,

  // Bounds for smallest/largest possible scale to apply to content
  minScale: 0.2,
  maxScale: 1.5,

  slideNumber: true,
  transition: "concave",

  multiplex: {
    secret: process.env.REVEAL_JS_SECRET,
    id: "07d081935af260a2",
    url: "https://reveal-js-multiplex-ccjbegmaii.now.sh"
  },

  dependencies: dependencies
});
