(function() {
    var out = {};  
    var selector = document.querySelector('div[class="tile-more-results-container"]:not(div[style="display: none;"])> button');
    selector ? (selector.click(), out.has_next_page = true) : out.has_next_page = false;
    out.wait = true;
    return out;
  })();