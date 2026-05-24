document.addEventListener("shopify:section:load", (evt) => {
  // Load and evaluate section specific scripts immediately.
  evt.target.querySelectorAll("script[src]").forEach((script) => {
    const s = document.createElement("script");
    s.src = script.src;
    document.body.appendChild(s);
  });
});
.subheading,
.section-subheading,
h6.subheading {
  color: #004E89 !important;
}
