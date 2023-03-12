window.onload = () => {
  let tiles = document.querySelectorAll(".colors__item")
  function updateColors() {
    tiles.forEach((tile, i) => {
      if (tile.dataset.type !== "lock") {
        let color = chroma.random()
        let text = tile.querySelector("h2")
        let button_lock = tile.querySelector(".item-colors__lock")
        setLuminanceColor(text, color)
        setLuminanceColor(button_lock, color)
        text.textContent = color
        tile.style.background = color
      } else {}
    })
  }
  updateColors()

  function setLuminanceColor(text, color) {
    const luminance = chroma(color).luminance()
    let lumColor = luminance > 0.5 ? "black" : "white"
    text.style.color = lumColor
    text.classList.add(lumColor)
  }
  
  function copyToClickboard(text) {
    return navigator.clipboard.writeText(text);
  }

  document.addEventListener('keydown', e => {
    if (e.code == "Space") {
      updateColors()
    }
  })
  document.addEventListener('click', e => {
    if (e.target.classList.contains('item-colors__lock')) {
      e.target.classList.toggle("_icon-lock")
      tiles.forEach((tile) => {
        if (tile.querySelector('.item-colors__lock').classList.contains('_icon-lock')) {
          tile.setAttribute("data-type", "lock")
        } else {
          tile.removeAttribute("data-type")
        }
      }) 
    } else if (e.target.tagName.toLowerCase() == 'h2') {
      copyToClickboard(e.target.textContent)
      e.target.classList.add('copyed')
      setTimeout(() => {
        e.target.classList.remove("copyed")
      }, 500);
    }
  })
}