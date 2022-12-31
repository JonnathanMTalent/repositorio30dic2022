(function() {
    var out = {};
    var next_page_selector = 'ul[class="pagination"] li[class="active"]'; //selector to identify the next button
    let condition = document.querySelector('span[class="paginationLabel"]').textContent.trim().split('–').pop().replaceAll(' ', '').split('of');
    var clickable_elem = document.querySelector(next_page_selector).nextElementSibling.querySelector('a');
    //stop condition
    if (condition[0] == condition[1]) {
        out["has_next_page"] = false;
    } else if (clickable_elem) {
        //go to next page
        clickable_elem.click();
        out["has_next_page"] = true;
    } else {
        //try again
        out["has_next_page"] = true;
    }
    out.waitFor = 'tr[class="data-row clickable"]';
    return out;
})();