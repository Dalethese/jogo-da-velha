const form = document.querySelector("#names-inputs form")

const clickAreas = document.querySelectorAll(".table-game span")

const tableGame = []
clickAreas.forEach((area) => tableGame.push(area))

let player1 = document.querySelector("#player1")
let player2 = document.querySelector("#player2")
let playerTitle = document.querySelector("#playerTitle")

const topLine = tableGame.slice(0, 3),
  middleLine = tableGame.slice(3, 6),
  bottomLine = tableGame.slice(6, 9),
  leftDiagonal = [tableGame[0], tableGame[4], tableGame[8]],
  rightDiagonal = [tableGame[2], tableGame[4], tableGame[6]],
  leftColumn = [tableGame[0], tableGame[3], tableGame[6]],
  middleColumn = [tableGame[1], tableGame[4], tableGame[7]],
  rightColumn = [tableGame[2], tableGame[5], tableGame[8]]

let velha = 0

function createFigs() {
  const xFig = document.createElement("img")
  xFig.src = "./assets/X.svg"

  const oFig = document.createElement("img")
  oFig.src = "./assets/O.svg"

  const figures = [xFig, oFig]

  return figures
}

function findX(line) {
  let equals = 0
  line.filter((area) => {
    if (area.childElementCount !== 0) {
      if (area.childNodes[0].src.includes("X.svg")) {
        equals++
      }
    }
  })
  return equals
}
function findO(line) {
  let equals = 0
  line.filter((area) => {
    if (area.childElementCount !== 0) {
      if (area.childNodes[0].src.includes("O.svg")) {
        equals++
      }
    }
  })
  return equals
}

function checkWinner(clickArea) {

  // check X
  let TopEquals = findX(topLine),
    middleEquals = findX(middleLine),
    bottomEquals = findX(bottomLine),
    leftDiagonalEquals = findX(leftDiagonal),
    rightDiagonalEquals = findX(rightDiagonal),
    leftColumnEquals = findX(leftColumn),
    middleColumnEquals = findX(middleColumn),
    rightColumnEquals = findX(rightColumn)

  if (
    TopEquals === 3 ||
    middleEquals === 3 ||
    bottomEquals === 3 ||
    leftDiagonalEquals === 3 ||
    rightDiagonalEquals === 3 ||
    leftColumnEquals === 3 ||
    middleColumnEquals === 3 ||
    rightColumnEquals === 3
  ) {
    playerTitle.textContent = `Vitória de ${player1.value}`
    return
  }

    TopEquals = findO(topLine),
    middleEquals = findO(middleLine),
    bottomEquals = findO(bottomLine),
    leftDiagonalEquals = findO(leftDiagonal),
    rightDiagonalEquals = findO(rightDiagonal),
    leftColumnEquals = findO(leftColumn),
    middleColumnEquals = findO(middleColumn),
    rightColumnEquals = findO(rightColumn)

  if (
    TopEquals === 3 ||
    middleEquals === 3 ||
    bottomEquals === 3 ||
    leftDiagonalEquals === 3 ||
    rightDiagonalEquals === 3 ||
    leftColumnEquals === 3 ||
    middleColumnEquals === 3 ||
    rightColumnEquals === 3
  ) {
    playerTitle.textContent = `Vitória de ${player2.value}`
    return
  }

   checkDraw()
}

function checkDraw() {
  for (area of clickAreas) {
    if (area.childElementCount != 0) velha++
  }

  if (velha === 45) {
    playerTitle.textContent = "VELHA"
  }
}

function game(clickArea) {
  // criando os elementos com as imagens
  const xFig = createFigs()[0]
  const oFig = createFigs()[1]

  // checando se o campo está vazio
  if (clickArea.childElementCount == 0) {
    // identificando qual o jogador da vez
    if (playerTitle.textContent === player1.value) {
      clickArea.appendChild(xFig)

      // trocando o nome do jogador
      playerTitle.textContent = player2.value

      checkWinner(clickArea)

      return
    }
    if (playerTitle.textContent === player2.value) {
      clickArea.appendChild(oFig)

      playerTitle.textContent = player1.value

      checkWinner(clickArea)
      return
    }
  }
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault()

  const loadPage = document.querySelector("#intro")
  const gamePage = document.querySelector(".game")

  if (player1.value === "" || player2.value === "") {
    return
  }
  loadPage.classList.add("playing")
  gamePage.classList.remove("load")

  playerTitle.textContent = player1.value

  const playing = clickAreas.forEach((clickArea) => {
    clickArea.addEventListener("click", () => {
      game(clickArea)
    })
  })

  const reset = document.querySelector("#reset")
  reset.addEventListener("click", () => {
    playerTitle.textContent = player1.value
    velha = 0
    clickAreas.forEach((area) => {
      area.textContent = ""
    })
  })

  const exit = document.querySelector("#exit")
  exit.addEventListener("click", (ev) => {
    player1.value = ""
    player2.value = ""

    loadPage.classList.remove("playing")
    gamePage.classList.add("load")
  })
})
