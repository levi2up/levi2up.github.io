var saveGame = localStorage.getItem('pieCookerSave')
var gameData = {
  pie: 0,
  piePerClick: 1,
  piePerClickCost: 10,
  lastTick = Date.now()
}

function cookPie() {
  gameData.pie += gameData.piePerClick
  document.getElementById("pieCooked").innerHTML = gameData.pie + " Pies Cooked"
}

function buyPiePerClick() {
  if (gameData.pie >= gameData.piePerClickCost) {
    gameData.pie -= gameData.piePerClickCost
    gameData.piePerClick += 1
    gameData.piePerClickCost *= 2
    document.getElementById("pieCooked").innerHTML = gameData.pie + " Pies Cooked"
    document.getElementById("perClickUpgrade").innerHTML = "Upgrade Oven (Currently Level " + format(gameData.piePerClick, scientific) + ") Cost: " + gameData.piePerClickCost + " Pie"
  }
}

var mainGameLoop = window.setInterval(function() {
  diff = Date.now() - gameData.lastTick;
  gameData.lastTick = Date.now() // Don't forget to update lastTick.
  gameData.pie += gameData.piePerClick * (diff / 1000) // divide diff by how often (ms) mainGameLoop is ran
  document.getElementById("pieCooked").innerHTML = gameData.pie + " Pies Cooked"
}, 1000)

var saveGameLoop = window.setInterval(function() {
  localStorage.setItem("pieCookerSave", JSON.stringify(gameData))
}, 15000)

var savegame = JSON.parse(localStorage.getItem("pieCookerSave"))
if (savegame !== null) {
  gameData = savegame
}

function format(number, type) {
	let exponent = Math.floor(Math.log10(number))
	let mantissa = number / Math.pow(10, exponent)
	if (exponent < 3) return number.toFixed(1)
	if (type == "scientific") return mantissa.toFixed(2) + "e" + exponent
	if (type == "engineering") return (Math.pow(10, exponent % 3) * mantissa).toFixed(2) + "e" + (Math.floor(exponent / 3) * 3)
}

if (typeof saveGame.pie !== "undefined") gameData.pie = saveGame.pie;
if (typeof saveGame.piePerClick !== "undefined") gameData.piePerClick = saveGame.piePerClick;
if (typeof saveGame.piePerClickCost !== "undefined") gameData.piePerClickCost = saveGame.piePerClickCost;
if (typeof saveGame.lastTick !== "undefined") gameData.lastTick = saveGame.lastTick;
