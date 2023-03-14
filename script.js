window.onload = () => {
  let tiles = document.querySelectorAll(".colors__item")
  let colors = []
  function updateColors(page_init) {
    colors = page_init ? getColorsFromHash() : []
    tiles.forEach((tile, i) => {
      let color = page_init
        ? colors[i]
          ? colors[i]
          : chroma.random()
        : chroma.random()
      let text = tile.querySelector("h2")
      let button_lock = tile.querySelector(".item-colors__lock")
      if (tile.dataset.type !== "lock") {
        setLuminanceColor(text, color)
        setLuminanceColor(button_lock, color)
        text.textContent = color
        tile.style.background = color
        if (!page_init) {
          colors.push(color.toString())
        }
      } else {
        if (!page_init) {
          colors.push(text.textContent)
        }
      }
    })

    if(page_init) {
      tiles.forEach((tile) => {
      if (tile.querySelector('.item-colors__lock').classList.contains('_icon-lock')) {
        tile.setAttribute("data-type", "lock")
      } else {
        tile.removeAttribute("data-type")
      }
    })
    }
    setColorsHash()
    setLocksHash()
  }
  
  function setColorsHash() {
    let hash = ''
    location.hash = ''
    hash += colors.map((color) => color.substring(1)).join("-")
    location.hash = hash
  }

  function setLocksHash() {
    let locks = []
    document
      .querySelectorAll(".item-colors__lock")
      .forEach((e) => locks.push(e))
    locks = locks.map((lock) => (lock.classList.contains("_icon-lock") ? 1 : 0))
    if (location.hash.length > 1 && !location.hash.includes('=')) {
      location.hash += "=" + locks.join("-")
    } else if (location.hash.length > 1) {
      let hashWithoutLocks = location.hash.substring(0, location.hash.length - locks.length*2)
      location.hash = hashWithoutLocks
      location.hash += "=" + locks.join("-")
    }
  }

  function setLuminanceColor(text, color) {
    const luminance = chroma(color).luminance()
    let lumColor = luminance > 0.5 ? "black" : "white"
    text.style.color = lumColor
    text.classList.remove("black")
    text.classList.remove("white")
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
      setLocksHash()
    } else if (e.target.tagName.toLowerCase() == 'h2') {
      copyToClickboard(e.target.textContent)
      e.target.classList.add('copyed')
      setTimeout(() => {
        e.target.classList.remove("copyed")
      }, 500);
    }
  })

  function getColorsFromHash() {
    if (location.hash.length > 1) {
      let indexBefLocks = Infinity
      if (location.hash.includes('=')) {
        indexBefLocks = location.hash.indexOf('=')
      }
      return location.hash
        .substring(1, indexBefLocks)
        .split("-")
        .map((color) => "#" + color)
    }
    return []
  }

  function getLocksFromHash() {
    if (location.hash.length > 1 && location.hash.includes('=')) {
      let indexBefLocks = location.hash.indexOf("=")
      let locksHash = location.hash.substring(indexBefLocks+1, Infinity).split('-')
      let locks = document.querySelectorAll(".item-colors__lock");
      locks.forEach((lock, i) => +locksHash[i] ? lock.classList.add("_icon-lock") : false)
    }
  }
  getLocksFromHash()
  updateColors(true)
}