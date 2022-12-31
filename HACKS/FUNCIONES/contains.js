function Contains(elementos, texto) {
    let result = ''
    elementos.forEach((a) => {
      if (a.textContent.includes(texto)) result = a.textContent.split(texto).pop().trim()
    })
    return result
  }