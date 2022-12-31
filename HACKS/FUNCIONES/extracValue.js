
function extractValue(html, selector, regex) {
    const findValue = Array.from(html.querySelectorAll(selector)).filter(e => e.textContent.search(regex) > -1);
    return findValue[0] ? findValue[0].textContent.trim() : undefined;
  }