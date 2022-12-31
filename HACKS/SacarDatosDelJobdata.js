//sacar datos del jobdata
for (const a of full_html.querySelectorAll("li, p, a")) {
    if (
        a.textContent.search(/experience|Experience/) > -1 &&
        a.textContent.search(/\d/g) > -1 &&
        a.textContent.length < 100
    ) {
        job.experience_required = a.textContent.split(":").pop().trim();
    }
}