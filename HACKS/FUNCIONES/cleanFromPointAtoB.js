function cleanFromPointAtoB(text, a, b) {
    if (text.indexOf(a) > -1 && text.indexOf(b) > -1) {
        let a_b = text.slice(text.indexOf(a), text.indexOf(b));
        text = text.replace(a_b, "").replace(b, "").trim();
    }
    return text;
}