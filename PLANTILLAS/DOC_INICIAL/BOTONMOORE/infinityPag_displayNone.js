(function() {
    var out = {};
    var next_page_selector = 'button[id="tile-more-results"]';
    var clickable_elem = document.querySelector(next_page_selector);
    if(document.querySelector('div[class="tile-more-results-container"]').getAttribute('style')){
    out["has_next_page"] = false;
    } else{
    clickable_elem.click();
    out["has_next_page"] = true;
    }
    //out.waitFor = 'tr[id*="requisitionListInterface.ID7222.row"]';
    //out.pic = true;
    //out.html = true;
    out.wait=true;
    return out;
    })();