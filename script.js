window.onload = () => {
  let tiles = document.querySelectorAll(".colors__item")
  function updateColors() {
    tiles.forEach((tile) => {
      if (tile.dataset.type !== "lock") {
        let color = getRandomColor()
        tile.querySelector(".colors-item__hex-code").textContent = color
        tile.style.background = color
      } else {}
    })
  }
  updateColors()

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  document.addEventListener('keydown', e => {
    if (e.code == "Space") {
      updateColors()
    }
  })
  document.addEventListener('click', e => {
    if (e.target.classList.contains('colors__lock')) {
      e.target.classList.toggle("_icon-lock")
    }
    tiles.forEach((tile) => {
      if (tile.querySelector('.colors__lock').classList.contains('_icon-lock')) {
        tile.setAttribute("data-type", "lock")
      } else {
        tile.removeAttribute("data-type")
      }
    })
  })
}