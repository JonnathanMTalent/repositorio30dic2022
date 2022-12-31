(function() {
    var out = {};
    var iframeDocument = document.querySelector('iframe[id="icims_content_iframe"]').contentWindow.document;
    var next_page_selector = 'div.iCIMS_Paginator_Bottom a.glyph'; //selector to identify the next button
    var clickable_elem = iframeDocument.querySelectorAll(next_page_selector)[1];
    var atributo = clickable_elem.getAttribute('class');
   // document.querySelectorAll('div.iCIMS_Paginator_Bottom a.glyph')[1].click();
    //stop condition
    if (atributo=='glyph invisible') {
        //last page
        out["has_next_page"] = false;
    } else {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    }
    out.waitFor = "a.jobdetail";
    return out;
})();