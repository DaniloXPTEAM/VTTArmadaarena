// ============================================================
// Popula o datalist de criaturas e configura o auto-preenchimento do ND
// ============================================================
function populateCreaturesDatalist(selectedND) {
	var datalist = document.getElementById("ameacasList");
	if (!datalist || typeof AMEACAS_DB === "undefined") return;
	datalist.innerHTML = "";
	AMEACAS_DB.forEach(function (creature) {
		if (selectedND) {
			var creatureNDVal = creature.nd;
			var selectVal = "";
			if (creatureNDVal === "1/4") selectVal = "0.25";
			else if (creatureNDVal === "1/2") selectVal = "0.5";
			else if (creatureNDVal === "S") selectVal = "21";
			else if (creatureNDVal === "S+") selectVal = "22";
			else selectVal = creatureNDVal.toString();
			if (selectVal !== selectedND) return;
		}
		var option = document.createElement("option");
		option.value = creature.nome;
		datalist.appendChild(option);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	populateCreaturesDatalist("");
	var nameInput = document.getElementById("creatureName");
	var ndSelect  = document.getElementById("creatureND");
	if (ndSelect) {
		ndSelect.addEventListener("change", function () {
			populateCreaturesDatalist(ndSelect.value);
		});
	}
	if (nameInput && ndSelect && typeof AMEACAS_DB !== "undefined") {
		nameInput.addEventListener("input", function () {
			var val = nameInput.value.trim();
			var match = AMEACAS_DB.find(function (creature) {
				return creature.nome.toLowerCase() === val.toLowerCase();
			});
			if (match) {
				var ndVal = match.nd;
				var selectVal = "";
				if (ndVal === "1/4") selectVal = "0.25";
				else if (ndVal === "1/2") selectVal = "0.5";
				else if (ndVal === "S") selectVal = "21";
				else if (ndVal === "S+") selectVal = "22";
				else selectVal = ndVal.toString();
				for (var i = 0; i < ndSelect.options.length; i++) {
					if (ndSelect.options[i].value === selectVal) {
						ndSelect.value = selectVal;
						populateCreaturesDatalist(selectVal);
						break;
					}
				}
			}
		});
	}
});

function formatND(val) {
	var num = parseFloat(val);
	if (isNaN(num)) return val;
	if (num === 0.25) return "1/4";
	if (num === 0.5)  return "1/2";
	if (num === 21)   return "S";
	if (num === 22)   return "S+";
	if (num % 1 === 0) return num.toString();
	return num.toFixed(2);
}

function addCreature() {
	var creatureName     = document.getElementById("creatureName").value.trim();
	var creatureND       = parseFloat(document.getElementById("creatureND").value);
	var creatureQuantity = parseInt(document.getElementById("creatureQuantity").value);
	var creatureList     = document.getElementById("creatureList");
	if (isNaN(creatureND) || creatureND <= 0) {
		alert("Por favor, insira um valor válido para o ND da Criatura antes de adicionar.");
		return;
	}
	if (isNaN(creatureQuantity) || creatureQuantity <= 0) creatureQuantity = 1;

	var creatureRow    = document.createElement("tr");
	var nameCell       = document.createElement("td");
	var ndCell         = document.createElement("td");
	var quantityCell   = document.createElement("td");
	var minusCell      = document.createElement("td");
	var plusCell       = document.createElement("td");
	var difficultyCell = document.createElement("td");
	var removeCell     = document.createElement("td");
	var testeCell      = document.createElement("td");

	nameCell.innerHTML = creatureName || "Criatura Sem Nome";
	ndCell.innerHTML   = formatND(creatureND);
	ndCell.dataset.value = creatureND;
	quantityCell.innerHTML = creatureQuantity;

	var minusButton = document.createElement("button");
	minusButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
	minusButton.className = "table-btn table-btn-icon";
	minusButton.onclick = function () {
		var currentQuantity = parseInt(quantityCell.innerHTML);
		if (currentQuantity > 1) {
			quantityCell.innerHTML = currentQuantity - 1;
			updateDifficultyAndND(creatureRow);
			updateTotalND();
			sortTableByND();
		}
	};

	var plusButton = document.createElement("button");
	plusButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
	plusButton.className = "table-btn table-btn-icon";
	plusButton.onclick = function () {
		var currentQuantity = parseInt(quantityCell.innerHTML);
		quantityCell.innerHTML = currentQuantity + 1;
		updateDifficultyAndND(creatureRow);
		updateTotalND();
		sortTableByND();
	};

	minusCell.appendChild(minusButton);
	plusCell.appendChild(plusButton);

	var difficulty = calculateDifficulty(creatureND, creatureQuantity);
	difficultyCell.innerHTML     = formatND(difficulty);
	difficultyCell.dataset.value = difficulty;

	var removeButton = document.createElement("button");
	removeButton.innerHTML = '<i class="fa-solid fa-trash-can" style="margin-right: 4px;"></i><span class="table-btn-text"> Remover</span>';
	removeButton.className = "table-btn table-btn-danger";
	removeButton.onclick = function () {
		creatureList.removeChild(creatureRow);
		updateTotalND();
	};
	removeCell.appendChild(removeButton);

	var testeButton = document.createElement("button");
	testeButton.innerHTML = '<i class="fa-solid fa-dice-d20" style="margin-right: 4px;"></i><span class="table-btn-text"> Rolar</span>';
	testeButton.className = "table-btn table-btn-accent";
	testeButton.onclick = function () {
		rollCreatureTreasure(creatureName, creatureND);
	};
	testeCell.appendChild(testeButton);

	creatureRow.appendChild(nameCell);
	creatureRow.appendChild(ndCell);
	creatureRow.appendChild(quantityCell);
	creatureRow.appendChild(minusCell);
	creatureRow.appendChild(plusCell);
	creatureRow.appendChild(difficultyCell);
	creatureRow.appendChild(removeCell);
	creatureRow.appendChild(testeCell);

	creatureList.appendChild(creatureRow);
	sortTableByND();
	updateTotalND();

	document.getElementById("creatureName").value  = "";
	document.getElementById("creatureND").value    = "";
	populateCreaturesDatalist("");
	document.getElementById("creatureQuantity").value = "1";
}

function resetCreatureQuantity() {
	var el = document.getElementById("creatureQuantity");
	if (el) el.value = 1;
}

function increaseQuantity(row) {
	var quantityCell = row.cells[2];
	quantityCell.innerHTML = parseInt(quantityCell.innerHTML) + 1;
	updateDifficultyAndND(row);
}

function decreaseQuantity(row) {
	var quantityCell = row.cells[2];
	var quantity = parseInt(quantityCell.innerHTML);
	if (quantity > 1) {
		quantityCell.innerHTML = quantity - 1;
		updateDifficultyAndND(row);
	}
}

function updateDifficultyAndND(row) {
	var ndCell         = row.cells[1];
	var quantityCell   = row.cells[2];
	var difficultyCell = row.cells[5];
	var creatureND     = parseFloat(ndCell.dataset.value || ndCell.innerHTML);
	var creatureQuantity = parseInt(quantityCell.innerHTML);
	var difficulty = calculateDifficulty(creatureND, creatureQuantity);
	difficultyCell.innerHTML     = formatND(difficulty);
	difficultyCell.dataset.value = difficulty;
	updateTotalND();
}

function calculateDifficulty(creatureND, creatureQuantity) {
	var difficulty = creatureND;
	var fala = "";
	if (creatureND < 1) {
		difficulty = creatureND * creatureQuantity;
	} else {
		if      (creatureQuantity === 1)                              difficulty = creatureND;
		else if (creatureQuantity <= 3)                               difficulty = creatureND + 2;
		else if (creatureQuantity <= 7)  { difficulty = creatureND + 4;  fala = "Se você quiser rolar menos dados, troque por um bando desse bicho. A luta provavelmente será mais letal."; }
		else if (creatureQuantity <= 15) { difficulty = creatureND + 6;  fala = "Tanto minion é mesmo necessário?"; }
		else if (creatureQuantity <= 31) { difficulty = creatureND + 8;  fala = "Tá doido? Diminui a quantidade de bicho aí, meu! Ninguém merece turno de duas horas!!"; }
		else if (creatureQuantity <= 63) { difficulty = creatureND + 10; fala = "Eu SEI que você não pretende usar isso. Só quer testar a calculadora"; }
		else if (creatureQuantity <= 127){ difficulty = creatureND + 12; fala = "Está tentando ver até onde eu fui nesse cálculo?"; }
		else if (creatureQuantity <= 255){ difficulty = creatureND + 14; fala = "Esse é o último, eu juro!"; }
		else if (creatureQuantity <= 511){ difficulty = creatureND + 16; fala = "Insira o meme dos Simpsons aqui: Pare, ele já está morto!"; }
		else if (creatureQuantity <= 1023){ difficulty = creatureND + 18; fala = "Vírus instalado com sucesso. Seu computador se formatará em 5,4,3,2..."; }
		else { difficulty = creatureND + 20; fala = "Parabéns, você chegou a +20 no ND. Sabe o que significa? NADA. O sistema não reconhece ameaças ac ND 20 então todo seu esforço foi inútil. Está feliz agora?"; }
	}
	if (difficulty < 1 && creatureND !== 0.25 && creatureND !== 0.5) difficulty = Math.floor(difficulty);
	if (difficulty > 22) difficulty = 22;
	var falaElement = document.getElementById("mensagemCriatura");
	if (falaElement) falaElement.innerHTML = fala;
	return difficulty;
}

function updateTotalND() {
	var highestDifficulty = 0;
	var rows = document.getElementById("creatureList").rows;
	var totalND = 0;
	for (var i = 1; i < rows.length; i++) {
		var difficultyCell = rows[i].cells[5];
		var difficulty = parseFloat(difficultyCell.dataset.value || difficultyCell.innerHTML);
		if (isNaN(difficulty)) continue;
		var difference = highestDifficulty - difficulty;
		if (difficulty > highestDifficulty) highestDifficulty = difficulty;
		if      (difference >= 4) totalND += 0;
		else if (difference === 3) totalND += 0.25;
		else if (difference === 2) totalND += 0.5;
		else if (difference === 1) totalND += 1;
		else if (difference === 0) totalND += 2;
	}
	totalND += highestDifficulty;
	if (totalND > 22) totalND = 22;
	document.getElementById("totalND").innerHTML = formatND(totalND);
	var headerBadge = document.getElementById("headerTotalND");
	if (headerBadge) headerBadge.innerHTML = formatND(totalND);
}

function doisDados(funcaoExistente) {
	var resultado1 = funcaoExistente();
	var resultado2 = funcaoExistente();
	return "Escolha entre: " + resultado1 + " ou " + resultado2 + ".";
}

// ============================================================
// MATERIAL ESPECIAL
// ============================================================
function getMaterialEspecial() {
	var materiais = ["aço-rubi", "adamante", "gelo eterno", "madeira Tollon", "matéria vermelha", "mitral"];
	return materiais[Math.floor(Math.random() * 6)];
}

// ============================================================
// TABELAS ATUALIZADAS — baseadas no Excel de tesouros T20
// Inclui: Tormenta20, Ameaças de Arton, Deuses de Arton, Heróis de Arton
// ============================================================

// Seleciona item de uma tabela [[item, peso], ...] com bônus opcional
function rollTabela(tabela, bonus) {
	var total = 0;
	for (var i = 0; i < tabela.length; i++) total += tabela[i][1];
	var roll = Math.floor(Math.random() * total) + 1 + (bonus || 0);
	if (roll > total) roll = total;
	var acc = 0;
	for (var i = 0; i < tabela.length; i++) {
		acc += tabela[i][1];
		if (roll <= acc) return tabela[i][0];
	}
	return tabela[tabela.length - 1][0];
}

// ─────────────── ITENS DIVERSOS (d100) ───────────────
function getDiverso() {
	var tabela = [
		["Ácido", 1], ["Água benta", 1], ["Alaúde élfico", 1], ["Algemas", 1],
		["Baga-de-fogo", 1], ["Bálsamo restaurador", 3], ["Bandana", 1],
		["Bandoleira de poções", 1], ["Bomba", 1], ["Botas reforçadas", 1],
		["Camisa bufante", 1], ["Capa esvoaçante", 1], ["Capa pesada", 1],
		["Casaco longo", 1], ["Chapéu arcano", 1], ["Coleção de livros", 1],
		["Cosmético", 1], ["Dente-de-dragão", 1], ["Enfeite de elmo", 1],
		["Elixir do amor", 1], ["Equipamento de viagem", 1], ["Essência de mana", 3],
		["Estojo de disfarces", 1], ["Farrapos de ermitão", 1], ["Flauta mística", 1],
		["Fogo alquímico", 1], ["Gorro de ervas", 1], ["Líquen lilás", 1],
		["Luneta", 1], ["Luva de pelica", 1], ["Maleta de medicamentos", 1],
		["Manopla", 1], ["Manto eclesiástico", 1], ["Mochila de aventureiro", 1],
		["Musgo púrpura", 1], ["Organizador de pergaminhos", 1], ["Ossos de monstro", 1],
		["Pó de cristal", 1], ["Pó de giz", 1], ["Pó do desaparecimento", 1],
		["Robe místico", 1], ["Saco de sal", 1], ["Sapatos de camurça", 1],
		["Seixo de âmbar", 1], ["Sela", 1], ["Tabardo", 1], ["Traje da corte", 1],
		["Terra de cemitério", 1], ["Veste de seda", 1],
		// Ameaças de Arton
		["Corda de teia", 1], ["Dente de wisphago", 1], ["Bomba de fumaça", 1],
		["Elixir quimérico", 1], ["Éter elemental", 1], ["Óleo de besouro", 1],
		// Deuses de Arton
		["Água benta concentrada", 1], ["Aspersório", 1], ["Patuá", 1],
		["Panfleto de aforismos", 1], ["Texto sagrado", 1], ["Hábito sacerdotal", 1],
		["Manto de alto sacerdote", 1], ["Sandálias", 1], ["Piercing de umbigo", 1],
		["Incenso", 1], ["Santa granada de mão", 1], ["Fitilho consagrado", 1],
		["Pena de anjo", 1],
		// Heróis de Arton
		["Ábaco", 1], ["Ampulheta", 1], ["Astrolábio", 1], ["Bainha adornada", 1],
		["Bússola", 1], ["Diagrama anatômico", 1], ["Estrepes", 1],
		["Lampião de foco", 1], ["Leque", 1], ["Lupa", 1],
		["Mapa (mestre define de qual região)", 1], ["Mecanismo de mola", 1],
		["Mochila discreta", 1], ["Sinete", 1], ["Apito de caça", 1],
		["Baralho marcado", 1], ["Clarim deheoni", 1], ["Pandeiro das estradas", 1],
		["Camisolão", 1], ["Casaca de apetrechos", 1], ["Chapéu emplumado", 1],
		["Elmo leve", 1], ["Elmo pesado", 1], ["Rondel", 1],
		["Sapatos confortáveis", 1], ["Sapatos de salto alto", 1],
		["Ácido concentrado", 1], ["Frasco abissal", 1]
	];
	return rollTabela(tabela);
}

// ─────────────── ARMAS (d100) ───────────────
function getArma() {
	var tabela = [
		["Açoite finntroll",1],["Adaga",1],["Adaga oposta",1],["Agulha de Ahlen",1],
		["Alabarda",1],["Alfange",1],["Arcabuz",1],["Arco curto",1],
		["Arco de guerra",1],["Arco longo",1],["Arco montado",1],["Arpão",1],
		["Azagaia",1],["Bacamarte",1],["Balas (20)",1],["Balestra",1],
		["Bastão lúdico",1],["Besta de mão",1],["Besta de repetição",1],
		["Besta dupla",1],["Besta leve",1],["Besta pesada",1],["Bico de corvo",1],
		["Boleadeira",1],["Bordão",1],["Canhão portátil",1],["Chakram",1],
		["Chicote",1],["Cimitarra",1],["Cinquedea",1],["Clava",1],["Clava-grão",1],
		["Corrente de espinhos",1],["Desmontador",1],["Dirk",1],
		["Espada bastarda",1],["Espada canora",1],["Espada curta",1],
		["Espada de execução",1],["Espada larga",1],["Espada longa",1],
		["Espada vespa",1],["Espada-gadanho",1],["Espadim",1],
		["Flechas (20)",1],["Flechas de caça (20)",1],["Florete",1],["Foice",1],
		["Funda",1],["Gadanho",1],["Garrucha",1],["Gládio",1],["Katana",1],
		["Khopesh",1],["Kimbata",1],["Lança",1],["Lança de falange",1],
		["Lança de fogo",1],["Lança de justa",1],["Lança montada",1],
		["Maça",1],["Maça-estrela",1],["Machadinha",1],["Machado anão",1],
		["Machado de batalha",1],["Machado de guerra",1],["Machado de haste",1],
		["Machado táurico",1],["Malho",1],["Mangual",1],["Marrão",1],
		["Marreta",1],["Martelo de guerra",1],["Martelo leve",1],
		["Martelo longo",1],["Montante",1],["Montante cinético",1],
		["Mordida do diabo",1],["Mosquete",1],["Neko-te",1],["Pedras (20)",1],
		["Picareta",1],["Pique",1],["Pistola",1],["Pistola-punhal",1],
		["Porrete",1],["Presa de serpente",1],["Rapieira",1],["Rede",1],
		["Serrilheira",1],["Shuriken",1],["Sifão cáustico",1],["Tacape",1],
		["Tai-tai",1],["Tan-korak",1],["Tetsubo",1],["Traque",1],
		["Tridente",1],["Virotes (20)",1],["Zarabatana",1]
	];
	return rollTabela(tabela);
}

// ─────────────── ARMADURAS & ESCUDOS (d100) ───────────────
function getArmadura() {
	var tabela = [
		["Armadura de chumbo",2],["Armadura de engenhoqueiro goblin",2],
		["Armadura de folhas",2],["Armadura de hussardo alado",2],
		["Armadura de justa",2],["Armadura de ossos",1],
		["Armadura de pedra",2],["Armadura de quitina",1],
		["Armadura sensual",2],["Brigantina",4],["Broquel",2],["Brunea",4],
		["Colete fora da lei",2],["Armadura Completa",10],["Cota de malha",4],
		["Cota de moedas",2],["Couraça",10],["Armadura de Couro",4],
		["Armadura de Couro batido",6],["Escudo de couro",1],
		["Escudo de vime",1],["Escudo leve",8],["Escudo pesado",8],
		["Escudo torre",2],["Gibão de peles",4],["Loriga segmentada",4],
		["Meia armadura",6],["Sagna",1],["Veste de teia de aranha",1]
	];
	return rollTabela(tabela);
}

// ─────────────── ESOTÉRICOS (d100) ───────────────
function getEsoterico() {
	var tabela = [
		["Afiador solar",3],["Ankh solar",3],["Báculo da retribuição",4],
		["Bolsa de pó",4],["Cajado arcano",4],["Cetro elemental",4],
		["Compasso místico",4],["Contas de oração",4],["Costela de lich",4],
		["Dedo de ente",4],["Estola",4],["Flauta convocadora",4],
		["Frasco purificador",4],["Luva de ferro",4],["Mandala onírica",4],
		["Medalhão afiado",4],["Medalhão de prata",4],["Orbe cristalino",4],
		["Ostensório santificado",4],["Rede de almas",4],["Tomo de guerra",3],
		["Tomo do rancor",3],["Tomo hermético",4],["Turíbulo ungido",4],
		["Varinha arcana",4],["Varinha armamentista",4]
	];
	return rollTabela(tabela);
}

// ─────────────── POÇÕES (d100 + bônus +% opcional) ───────────────
// Itens 101-120 só acessíveis com bonus=20 (+%)
function getPocao(bonus) {
	var tabela = [
		["Abençoar Alimentos (óleo) — T$ 30",1],
		["Área Escorregadia (granada) — T$ 30",1],
		["Arma Mágica (óleo) — T$ 30",2],
		["Poção de Compreensão — T$ 30",1],
		["Poção de Curar Ferimentos (2d8+2 PV) — T$ 30",6],
		["Poção de Disfarce Ilusório — T$ 30",2],
		["Escuridão (óleo) — T$ 30",2],
		["Luz (óleo) — T$ 30",2],
		["Névoa (granada) — T$ 30",1],
		["Poção de Primor Atlético — T$ 30",1],
		["Poção de Sono — T$ 30",1],
		["Poção de Proteção Divina — T$ 30",2],
		["Poção de Resistência a Energia — T$ 30",2],
		["Poção de Suporte Ambiental — T$ 30",1],
		["Tranca Arcana (óleo) — T$ 30",1],
		["Poção de Visão Mística — T$ 30",1],
		["Poção de Vitalidade Fantasma — T$ 30",1],
		["Poção de Armadura Elemental — T$ 30",1],       // Heróis de Arton
		["Poção de Desafio Corajoso — T$ 30",1],
		["Poção de Discrição — T$ 30",1],
		["Poção de Farejar Fortuna — T$ 30",1],
		["Poção de Maaais Klunc — T$ 30",1],
		["Poção de Ossos de Adamante — T$ 30",1],
		["Poção de Punho de Mitral — T$ 30",1],
		["Poção de Magia Dadivosa — T$ 30",1],           // Deuses de Arton
		["Poção de Sigilo de Sszzaas — T$ 30",1],
		["Poção de Sorriso da Fortuna — T$ 30",1],
		["Poção de Toque de Megalokk — T$ 30",1],
		["Poção de Voz da Razão — T$ 30",1],
		["Poção de Escudo da Fé (duração cena) — T$ 120",2],
		["Poção de Alterar Tamanho — T$ 270",2],
		["Poção de Aparência Perfeita — T$ 270",1],
		["Armamento da Natureza (óleo) — T$ 270",1],
		["Bola de Fogo (granada) — T$ 270",4],
		["Poção de Camuflagem Ilusória — T$ 270",1],
		["Poção de Concentração de Combate (duração cena) — T$ 270",1],
		["Poção de Curar Ferimentos (4d8+4 PV) — T$ 270",4],
		["Poção de Físico Divino — T$ 270",2],
		["Poção de Mente Divina — T$ 270",1],
		["Poção de Metamorfose — T$ 270",1],
		["Poção de Purificação — T$ 270",4],
		["Poção de Velocidade — T$ 270",2],
		["Vestimenta da Fé (óleo) — T$ 270",2],
		["Poção de Voz Divina — T$ 270",1],
		["Poção de Orientação (duração cena; role atributo: 1=For 2=Des 3=Con 4=Int 5=Sab 6=Car) — T$ 270",2],
		["Poção de Aura de Morte — T$ 270",1],           // Heróis de Arton
		["Poção de Emular Magia — T$ 270",1],
		["Poção de Punho de Mitral (+2 ataque e ameaça) — T$ 270",1],
		["Poção de Viagem Onírica — T$ 270",1],
		["Couraça de Allihanna (óleo) — T$ 270",1],      // Deuses de Arton
		["Poção de Toque de Megalokk (aprimorado) — T$ 480",1],
		["Arma Mágica (óleo, bônus +3) — T$ 750",2],
		["Poção de Proteção Divina (+4) — T$ 750",2],
		["Poção de Armadura Elemental (4d6 dano) — T$ 750",1],
		["Poção de Curar Ferimentos (7d8+7 PV) — T$ 1.080",6],
		["Poção de Físico Divino (três atributos) — T$ 1.080",2],
		["Poção de Invisibilidade (duração cena) — T$ 1.080",2],
		["Poção de Pele de Pedra — T$ 1.080",2],
		["Poção de Potência Divina — T$ 1.080",1],
		["Poção de Voo — T$ 1.080",1],
		["Poção de Percepção Rubra (+3) — T$ 1.080",1],  // Deuses de Arton
		["Bola de Fogo (granada, 10d6) — T$ 1.470",3],
		// 101-120: só acessíveis com +%
		["Poção de Curar Ferimentos (11d8+11 PV) — T$ 3.000",10],
		["Poção de Pele de Pedra (pele de aço, RD 10) — T$ 3.000",4],
		["Poção de Premonição — T$ 3.000",2],
		["Poção de Viagem Onírica (falar e lançar magias) — T$ 3.000",1],
		["Poção de Potência Divina (Força +6, RD 15) — T$ 6.750",1],
		["Momento de Tormenta (granada, aprimorado) — T$ 6.750",1],
		["Poção de Transformação em Dragão — T$ 28.000",1]
	];
	return rollTabela(tabela, bonus || 0);
}

// ─────────────── RIQUEZAS ───────────────
function getRiquezaMenor(bonus) {
	var tabela = [
		["4d4 (10 T$) — Ex.: ágata, hematita, barril de farinha",25],
		["1d4×10 (25 T$) — Ex.: quartzo rosa, topázio, caixa de tabaco",15],
		["2d4×10 (50 T$) — Ex.: bracelete de ouro trabalhado, estatueta de osso",15],
		["4d6×10 (140 T$) — Ex.: ametista, pérola branca, lingote de prata",15],
		["1d6×100 (350 T$) — Ex.: alexandrita, pérola negra, espada cerimonial de prata",15],
		["2d6×100 (700 T$) — Ex.: pente em forma de dragão com gemas, harpa exótica",10],
		["2d8×100 (900 T$) — Ex.: opala negra, tapa-olho com safira falsa, lingote de ouro",4],
		["4d10×100 (2.200 T$) — Ex.: esmeralda verde, pingente de safira, caixinha de música",1]
	];
	return rollTabela(tabela, bonus || 0);
}

function getRiquezaMedia(bonus) {
	var tabela = [
		["2d4×10 (50 T$) — Ex.: bracelete de ouro trabalhado, estatueta de osso",10],
		["4d6×10 (140 T$) — Ex.: ametista, pérola branca, lingote de prata",20],
		["1d6×100 (350 T$) — Ex.: alexandrita, pérola negra, espada cerimonial de prata",20],
		["2d6×100 (700 T$) — Ex.: pente em forma de dragão com gemas, harpa exótica",15],
		["2d8×100 (900 T$) — Ex.: opala negra, tapa-olho com safira falsa, lingote de ouro",15],
		["4d10×100 (2.200 T$) — Ex.: esmeralda verde, pingente de safira, caixinha de música",10],
		["6d12×100 (3.900 T$) — Ex.: anel de prata e safira, diamante branco",5],
		["2d10×1.000 (11.000 T$) — Ex.: anel de ouro e rubi, diamante vermelho",4],
		["6d8×1.000 (27.000 T$) — Ex.: coroa de ouro com centenas de gemas",1]
	];
	return rollTabela(tabela, bonus || 0);
}

function getRiquezaMaior(bonus) {
	var tabela = [
		["1d6×100 (350 T$) — Ex.: alexandrita, pérola negra, espada cerimonial de prata",5],
		["2d6×100 (700 T$) — Ex.: pente em forma de dragão com gemas, harpa exótica",10],
		["2d8×100 (900 T$) — Ex.: opala negra, tapa-olho com safira falsa, lingote de ouro",10],
		["4d10×100 (2.200 T$) — Ex.: esmeralda verde, pingente de safira, caixinha de música",15],
		["6d12×100 (3.900 T$) — Ex.: anel de prata e safira, diamante branco",20],
		["2d10×1.000 (11.000 T$) — Ex.: anel de ouro e rubi, diamante vermelho",15],
		["6d8×1.000 (27.000 T$) — Ex.: coroa de ouro com centenas de gemas",10],
		["1d10×10.000 (55.000 T$) — Ex.: arca de madeira repleta de lingotes e pedras preciosas",10],
		["4d12×10.000 (260.000 T$) — Uma sala forrada de moedas!",5]
	];
	return rollTabela(tabela, bonus || 0);
}

// ─────────────── MELHORIAS DE ARMAS (d100) ───────────────
function getMelhoriaArma() {
	var tabela = [
		["Atroz¹",10],["Banhada a ouro",2],["Certeira",8],
		["Conduíte",1],   // Deuses de Arton
		["Cravejada de gemas",2],["Cruel",8],["Discreta",2],["Equilibrada",5],
		["Farpada",4],    // Heróis de Arton
		["Guarda",2],     // Heróis de Arton
		["Harmonizada",4],["Incendiária",1],["Injeção alquímica",4],
		["Macabra",2],["Maciça",10],
		["Material especial",10],
		["Mira telescópica",4],["Precisa",8],
		["Pressurizada",2], // Heróis de Arton
		["Pungente¹",10],
		["Usada",1]         // Heróis de Arton
	];
	var result = rollTabela(tabela);
	if (result === "Material especial") result += ": " + getMaterialEspecial();
	return result;
}

// ─────────────── MELHORIAS DE ARMADURAS (d100) ───────────────
function getMelhoriaArmadura() {
	var tabela = [
		["Ajustada",10],
		["Balístico",4],    // Heróis de Arton
		["Banhada a ouro",4],["Cravejada de gemas",4],["Delicada",5],
		["Deslumbrante¹",2], // Heróis de Arton
		["Diligente",2],    // Deuses de Arton
		["Discreta",4],["Espinhos",4],
		["Injetora",4],     // Heróis de Arton
		["Inscrito",4],     // Deuses de Arton
		["Macabra",2],
		["Material especial",10],
		["Polida",5],["Reforçada",20],["Selada",11],["Sob medida¹",5]
	];
	var result = rollTabela(tabela);
	if (result === "Material especial") result += ": " + getMaterialEspecial();
	return result;
}

// ─────────────── MELHORIAS DE ESOTÉRICOS (d100) ───────────────
function getMelhoriaEsoterico() {
	var tabela = [
		["Banhado a ouro",3],["Canalizador",15],
		["Canônico",3],     // Deuses de Arton
		["Cravejado de gemas",3],["Discreto",4],
		["Energético",15],["Harmonizado",15],["Macabro",3],
		["Material especial",9],
		["Poderoso",10],
		["Potencializador¹",10], // Heróis de Arton
		["Vigilante",10]
	];
	var result = rollTabela(tabela);
	if (result === "Material especial") result += ": " + getMaterialEspecial();
	return result;
}

// ─────────────── ENCANTOS DE ARMAS MÁGICAS (d100) ───────────────
function getArmaMagica() {
	var tabela = [
		["Alvorada",1],    // Heróis de Arton
		["Ameaçadora",4],
		["Anátema",1],     // Heróis de Arton
		["Anticriatura",2],["Arremesso",1],["Assassina",1],
		["Brumosa",1],     // Heróis de Arton
		["Caçadora",1],
		["Cantante",1],    // Heróis de Arton
		["Ciclônica",1],   // Heróis de Arton
		["Congelante",4],["Conjuradora",1],["Corrosiva",4],
		["Crescente",2],   // Heróis de Arton
		["Cristalina",1],  // Heróis de Arton
		["Cronal*",1],     // Heróis de Arton — *conta como 2
		["Cuidadora",1],   // Heróis de Arton
		["Dançarina",2],["Defensora",2],["Destruidora",1],
		["Dilacerante",2],["Drenante",1],["Elétrica",4],
		["Energética*",1], // *conta como 2
		["Espreitadora",2],// Heróis de Arton
		["Excruciante",2],["Flamejante",4],["Formidável",8],
		["Frenética",2],   // Heróis de Arton
		["Gárgula",1],["Horrenda",1],["Indignada",1],["Infestada",1], // Heróis
		["Lancinante*",1], // *conta como 2
		["Magnífica*",8],  // *conta como 2
		["Manáfaga",1],    // Heróis de Arton
		["Piedosa",2],["Profana",1],
		["Rebote",1],      // Heróis de Arton
		["Reflexiva",1],   // Heróis de Arton
		["Ressonante",1],  // Heróis de Arton
		["Sagrada",1],["Sanguinária",2],
		["Sepulcral",1],   // Heróis de Arton
		["Sombria",1],     // Heróis de Arton
		["Trovejante",1],["Tumular",1],
		["Vampírica",1],   // Heróis de Arton
		["Veloz",2],["Venenosa",1],
		["Arma específica (role na tabela de Armas Mágicas)",10]
	];
	return rollTabela(tabela);
}

// ─────────────── ENCANTOS DE ARMADURAS MÁGICAS (d100) ───────────────
function getEncantoArmadura() {
	var tabela = [
		["Abascanto",2],["Abençoado",2],
		["Abissal",1],     // Heróis de Arton
		["Acrobático",1],["Alado",2],
		["Ancorada***",1], // Heróis — ***só armaduras
		["Animado**",2],   // **só escudos
		["Anulador*",1],   // *conta como 2
		["Arbóreo",1],     // Heróis de Arton
		["Assustador",2],
		["Astuto",1],      // Heróis de Arton
		["Cáustica",1],["Defensor",10],
		["Densa***",1],    // Heróis — ***só armaduras
		["Égide",1],       // Heróis de Arton
		["Enraizada***",1],// Heróis — ***só armaduras
		["Escorregadio",1],
		["Esmagador**",2], // **só escudos
		["Esmérico",1],    // Heróis de Arton
		["Estígio*",2],    // Heróis — *conta como 2
		["Etéreo",1],      // Heróis de Arton
		["Fantasmagórico",2],["Fortificado",4],["Gélido",1],
		["Geomântico",1],  // Heróis de Arton
		["Guardião*",10],  // *conta como 2
		["Hipnótico",2],["Ilusório",1],["Incandescente",1],["Invulnerável",5],
		["Ligeira***",1],  // Heróis — ***só armaduras
		["Luminescente",2],// Heróis de Arton
		["Opaco",5],
		["Prístino",1],    // Heróis de Arton
		["Protetor",5],
		["Purificador",1], // Heróis de Arton
		["Reanimador",2],  // Heróis de Arton
		["Refletor",2],["Relampejante",1],["Reluzente",1],
		["Replicante",1],  // Heróis de Arton
		["Resiliente",1],  // Heróis de Arton
		["Sombrio",1],
		["Vórtice",1],     // Heróis de Arton
		["Zeloso",1],
		["Armadura/Escudo específico (role na tabela de Armaduras Mágicas)",10]
	];
	return rollTabela(tabela);
}

// ─────────────── ENCANTOS DE ESOTÉRICOS MÁGICOS (d100) ───────────────
function getEncantoEsoterico() {
	var tabela = [
		["Abafador",2],["Bélico",10],["Caridoso",4],["Chocante",4],
		["Clemente",10],["Contido",2],["Embusteiro",2],["Emergencial",2],
		["Encadeado",4],["Escultor",2],["Frugal",2],["Glacial",4],
		["Imperioso",2],
		["Implacável*",2], // *conta como 2
		["Incriminador",2],["Inflamável",7],["Inquisidor",4],["Insistente",4],
		["Khalmyrita",2],
		["Majestoso*",10], // *conta como 2
		["Nímbico",2],
		["Pulverizante*",1],// *conta como 2
		["Retaliador",1],["Sanguessuga",2],["Traiçoeiro",1],["Verdugo",2],
		["Esotérico específico (role na tabela de Esotéricos Mágicos)",10]
	];
	return rollTabela(tabela);
}

// ─────────────── ACESSÓRIOS MENORES (d100) ───────────────
function getItemMenor() {
	var tabela = [
		["Algibeira mordedora (T$ 1.000)",1],["Elixir da mente dividida (T$ 1.500)",1],
		["Papiro das estrelas (T$ 1.500)",1],["Anel do sustento (T$ 3.000)",1],
		["Bainha mágica (T$ 3.000)",3],["Corda da escalada (T$ 3.000)",2],
		["Ferraduras da velocidade (T$ 3.000)",1],
		["Garrafa da fumaça eterna (T$ 3.000)",2],
		["Gema da luminosidade (T$ 3.000)",3],["Manto élfico (T$ 3.000)",3],
		["Mochila de carga (T$ 3.000)",3],
		["Amuleto da visão etérea (T$ 3.000)",2],["Cinturão do trobo (T$ 3.000)",2],
		["Elixir da eternidade (T$ 3.000)",2],["Pérola da nulificação (T$ 3.000)",2],
		["Saco dos ventos silenciosos (T$ 3.000)",2],
		["Brincos da sagacidade (T$ 4.500)",5],["Luvas da delicadeza (T$ 4.500)",5],
		["Manoplas da força do ogro (T$ 4.500)",5],
		["Manto da resistência (T$ 4.500)",4],["Manto do fascínio (T$ 4.500)",5],
		["Pingente da sensatez (T$ 4.500)",5],["Torque do vigor (T$ 4.500)",5],
		["Monóculo da franqueza (T$ 4.500)",1],["Chapéu do disfarce (T$ 6.000)",2],
		["Flauta fantasma (T$ 6.000)",1],["Lanterna da revelação (T$ 6.000)",2],
		["Algibeira provedora (T$ 6.000)",2],["Gaiola dos arcanos (T$ 6.000)",2],
		["Lâmpada da ilusão impecável (T$ 6.000)",2],
		["Pena da criação (T$ 6.000)",2],["Corda da resignação (T$ 7.500)",2],
		["Anel da proteção (T$ 9.000)",5],["Anel do escudo mental (T$ 9.000)",1],
		["Pingente da saúde (T$ 9.000)",1],["Coroa de flores (T$ 9.000)",1],
		["Jarro das profundezas (T$ 9.000)",1],
		["Escrituvaninha consagrada (T$ 9.000)",1],
		["Anel da proteção mental (T$ 9.000)",1],["Berço das fadas (T$ 9.000)",1],
		["Chapéu dos truques infinitos (T$ 9.000)",1],
		["Cinto da leveza graciosa (T$ 9.000)",1],
		["Cristal da voz silenciosa (T$ 9.000)",1],
		["Cristal do tempo célere (T$ 9.000)",1],
		["Ocarina da melodia distante (T$ 9.000)",1],
		["Olhos do corvo (T$ 9.000)",1],
		["Pergaminho da verdade cósmica (T$ 9.000)",1]
	];
	return rollTabela(tabela);
}

// ─────────────── ACESSÓRIOS MÉDIOS (d100) ───────────────
function getItemMedio() {
	var tabela = [
		["Anel de telecinesia (T$ 10.500)",1],["Bola de cristal (T$ 10.500)",1],
		["Caveira maldita (T$ 10.500)",1],["Instrumento da alegria (T$ 10.500)",1],
		["Ampulheta da harmonia temporal (T$ 10.500)",1],
		["Amuleto do amparo (T$ 10.500)",1],
		["Caixa dos ecos perdidos (T$ 10.500)",1],
		["Colar da perseverança (T$ 10.500)",1],["Colar do tirano (T$ 10.500)",1],
		["Óculos da revelação (T$ 10.500)",1],
		["Colar das bolas de fogo (T$ 12.000)",1],
		["Sandálias de Valkaria (T$ 12.000)",1],["Véu diáfano (T$ 13.500)",1],
		["Botas aladas (T$ 15.000)",1],["Botas inquietas (T$ 15.000)",1],
		["Pira póstera (T$ 15.000)",1],["Anel do pacto oneroso (T$ 15.000)",1],
		["Botas do andarilho das sombras (T$ 15.000)",1],
		["Cálice das marés (T$ 15.000)",1],
		["Cinto dos caminhos cruzados (T$ 15.000)",1],
		["Pedra da passagem (T$ 15.000)",1],
		["Pingente da dor partilhada (T$ 15.000)",1],
		["Braceletes de bronze (T$ 16.500)",4],["Capa nebulosa (T$ 16.500)",1],
		["Espelho do outro lado (T$ 18.000)",1],
		["Gema da purificação (T$ 18.000)",2],["Máscara da raposa (T$ 18.000)",2],
		["Anel da energia (T$ 21.000)",4],["Anel da vitalidade (T$ 21.000)",4],
		["Anel de invisibilidade (T$ 21.000)",2],
		["Braçadeiras do arqueiro (T$ 21.000)",2],
		["Brincos de Marah (T$ 21.000)",2],["Faixas do pugilista (T$ 21.000)",2],
		["Manto da aranha (T$ 21.000)",2],["Vassoura voadora (T$ 21.000)",2],
		["Símbolo abençoado (T$ 21.000)",2],["Colar de presas (T$ 21.000)",1],
		["Vestido noturno (T$ 21.000)",1],["Anel da beleza ilusória (T$ 21.000)",1],
		["Bastão do sonhador (T$ 21.000)",1],
		["Colar da fúria monstruosa (T$ 21.000)",1],
		["Coroa da floresta sussurrante (T$ 21.000)",1],
		["Espelho da verdade (T$ 21.000)",1],
		["Instrumentos da celeridade (T$ 22.500)",1],
		["Máscara do predador (T$ 22.500)",1],
		["Frigideira do chef anão (T$ 24.000)",2],
		["Gema da santificação (T$ 24.000)",1],["Cubo armadilha (T$ 25.000)",1],
		["Caldeirão da vida (T$ 25.000)",1],
		["Amuleto da robustez (T$ 25.500)",4],["Botas velozes (T$ 25.500)",2],
		["Cinto da força do gigante (T$ 25.500)",4],
		["Coroa majestosa (T$ 25.500)",4],["Estola da serenidade (T$ 25.500)",4],
		["Manto do morcego (T$ 25.500)",1],
		["Pulseiras da celeridade (T$ 25.500)",4],
		["Tiara da sapiência (T$ 25.500)",4],
		["Argolas místicas (T$ 25.500)",2],
		["Bastão da grande harmonia (T$ 25.500)",1],
		["Coroa da majestade distorcida (T$ 25.500)",1],
		["Bracelete do coração vivaz (T$ 27.000)",1]
	];
	return rollTabela(tabela);
}

// ─────────────── ACESSÓRIOS MAIORES (d100) ───────────────
function getItemMaior() {
	var tabela = [
		["Elmo do teletransporte (T$ 30.000)",2],
		["Gema da telepatia (T$ 30.000)",2],["Gema elemental (T$ 30.000)",2],
		["Manual da saúde corporal (T$ 30.000)",5],
		["Manual do bom exercício (T$ 30.000)",5],
		["Manual dos movimentos precisos (T$ 30.000)",5],
		["Medalhão de Lena (T$ 30.000)",5],["Tomo da compreensão (T$ 30.000)",5],
		["Tomo da liderança e influência (T$ 30.000)",5],
		["Tomo dos grandes pensamentos (T$ 30.000)",5],
		["Anel da chama dançante (T$ 30.000)",3],
		["Chapéu pensador (T$ 30.000)",2],["Cinto da flecha veloz (T$ 30.000)",2],
		["Gema da profanação (T$ 30.000)",2],
		["Tomo da técnica definitiva (T$ 30.000)",3],
		["Tapeçaria da guerra (T$ 35.000)",2],
		["Braceletes da amizade intensa (T$ 36.000)",2],
		["Cilício vivo (T$ 37.000)",1],["Coração corrompido (T$ 45.000)",1],
		["Coração do inverno (T$ 45.000)",2],["Tomo dos companheiros (T$ 45.000)",2],
		["Anel refletor (T$ 51.000)",2],["Cinto do campeão (T$ 51.000)",2],
		["Colar guardião (T$ 51.000)",4],["Estatueta animista (T$ 51.000)",2],
		["Anel da liberdade (T$ 60.000)",2],["Tapete voador (T$ 60.000)",2],
		["Chave dos planos (T$ 60.000)",2],
		["Cinto da desmaterialização (T$ 60.000)",2],
		["Braceletes de ouro (T$ 64.500)",4],
		["Espelho da oposição (T$ 75.000)",2],
		["Robe do arquimago (T$ 90.000)",4],["Ossos dracônicos (T$ 90.000)",2],
		["Orbe das tempestades (T$ 97.500)",2],
		["Braçadeiras da força do colosso (T$ 120.000)",2],
		["Anel da regeneração (T$ 150.000)",2],
		["Espelho do aprisionamento (T$ 150.000)",1]
	];
	return rollTabela(tabela);
}

// ─────────────── EQUIPAMENTO & SUPERIORES ───────────────
// Proporção Excel: 50% arma / 37.5% armadura / 12.5% esotérico
function getEquipamento() {
	var r = Math.random();
	if      (r < 0.5)   return getArma();
	else if (r < 0.875) return getArmadura();
	else                return getEsoterico();
}

function getMelhoria() {
	var r = Math.random();
	if      (r < 0.5)   return getArma()     + " [" + getMelhoriaArma()      + "]";
	else if (r < 0.875) return getArmadura() + " [" + getMelhoriaArmadura()  + "]";
	else                return getEsoterico() + " [" + getMelhoriaEsoterico() + "]";
}

function getMelhoria2() {
	var r = Math.random();
	if (r < 0.5) {
		var m1 = getMelhoriaArma(), m2 = getMelhoriaArma();
		while (m2 === m1) m2 = getMelhoriaArma();
		return getArma() + " [" + m1 + " e " + m2 + "]";
	} else if (r < 0.875) {
		var m1 = getMelhoriaArmadura(), m2 = getMelhoriaArmadura();
		while (m2 === m1) m2 = getMelhoriaArmadura();
		return getArmadura() + " [" + m1 + " e " + m2 + "]";
	} else {
		var m1 = getMelhoriaEsoterico(), m2 = getMelhoriaEsoterico();
		while (m2 === m1) m2 = getMelhoriaEsoterico();
		return getEsoterico() + " [" + m1 + " e " + m2 + "]";
	}
}

function getMelhoria3() {
	var r = Math.random();
	if (r < 0.5) {
		var m1=getMelhoriaArma(),m2=getMelhoriaArma(),m3=getMelhoriaArma();
		while (m2===m1||m3===m1||m3===m2){m2=getMelhoriaArma();m3=getMelhoriaArma();}
		return getArma() + " [" + m1 + ", " + m2 + " e " + m3 + "]";
	} else if (r < 0.875) {
		var m1=getMelhoriaArmadura(),m2=getMelhoriaArmadura(),m3=getMelhoriaArmadura();
		while (m2===m1||m3===m1||m3===m2){m2=getMelhoriaArmadura();m3=getMelhoriaArmadura();}
		return getArmadura() + " [" + m1 + ", " + m2 + " e " + m3 + "]";
	} else {
		var m1=getMelhoriaEsoterico(),m2=getMelhoriaEsoterico(),m3=getMelhoriaEsoterico();
		while (m2===m1||m3===m1||m3===m2){m2=getMelhoriaEsoterico();m3=getMelhoriaEsoterico();}
		return getEsoterico() + " [" + m1 + ", " + m2 + " e " + m3 + "]";
	}
}

function getMelhoria4() {
	var r = Math.random();
	if (r < 0.5) {
		var m1=getMelhoriaArma(),m2=getMelhoriaArma(),m3=getMelhoriaArma(),m4=getMelhoriaArma();
		while(m2===m1||m3===m1||m3===m2||m4===m1||m4===m2||m4===m3){m2=getMelhoriaArma();m3=getMelhoriaArma();m4=getMelhoriaArma();}
		return getArma() + " [" + m1 + ", " + m2 + ", " + m3 + " e " + m4 + "]";
	} else if (r < 0.875) {
		var m1=getMelhoriaArmadura(),m2=getMelhoriaArmadura(),m3=getMelhoriaArmadura(),m4=getMelhoriaArmadura();
		while(m2===m1||m3===m1||m3===m2||m4===m1||m4===m2||m4===m3){m2=getMelhoriaArmadura();m3=getMelhoriaArmadura();m4=getMelhoriaArmadura();}
		return getArmadura() + " [" + m1 + ", " + m2 + ", " + m3 + " e " + m4 + "]";
	} else {
		var m1=getMelhoriaEsoterico(),m2=getMelhoriaEsoterico(),m3=getMelhoriaEsoterico(),m4=getMelhoriaEsoterico();
		while(m2===m1||m3===m1||m3===m2||m4===m1||m4===m2||m4===m3){m2=getMelhoriaEsoterico();m3=getMelhoriaEsoterico();m4=getMelhoriaEsoterico();}
		return getEsoterico() + " [" + m1 + ", " + m2 + ", " + m3 + " e " + m4 + "]";
	}
}

// ─────────────── ITENS MÁGICOS ───────────────
// Proporção do Excel: 1-2) arma, 3) armadura, 4) esotérico, 5-6) acessório
function getMagicoMenor() {
	var d6 = Math.floor(Math.random() * 6) + 1;
	if      (d6 <= 2) return getArma()     + " [" + getArmaMagica()     + "]";
	else if (d6 === 3) return getArmadura() + " [" + getEncantoArmadura() + "]";
	else if (d6 === 4) return getEsoterico() + " [" + getEncantoEsoterico() + "]";
	else               return getItemMenor();
}

function getMagicoMedio() {
	var d6 = Math.floor(Math.random() * 6) + 1;
	if      (d6 <= 2) return getArma()     + " [" + getArmaMagica()     + " + " + getArmaMagica()     + "]";
	else if (d6 === 3) return getArmadura() + " [" + getEncantoArmadura() + " + " + getEncantoArmadura() + "]";
	else if (d6 === 4) return getEsoterico() + " [" + getEncantoEsoterico() + " + " + getEncantoEsoterico() + "]";
	else               return getItemMedio();
}

function getMagicoMaior() {
	var d6 = Math.floor(Math.random() * 6) + 1;
	if      (d6 <= 2) return getArma()     + " [" + getArmaMagica()     + " + " + getArmaMagica()     + " + " + getArmaMagica()     + "]";
	else if (d6 === 3) return getArmadura() + " [" + getEncantoArmadura() + " + " + getEncantoArmadura() + " + " + getEncantoArmadura() + "]";
	else if (d6 === 4) return getEsoterico() + " [" + getEncantoEsoterico() + " + " + getEncantoEsoterico() + " + " + getEncantoEsoterico() + "]";
	else               return getItemMaior();
}

// ============================================================
// ENGINE DE ROLAGEM DE TESOUROS POR ND
// ============================================================
function rollTreasureForND(nd) {
	var tesouro = "";
	var dinheiro = "";
	var outras_coisas = "";
	var mensagem = "";

	var parsedND = parseFloat(nd);
	if (isNaN(parsedND)) parsedND = 0;

	var ndKey = parsedND;
	if      (ndKey < 0.25)              ndKey = 0.25;
	else if (ndKey > 0.25 && ndKey < 0.5)  ndKey = 0.5;
	else if (ndKey > 0.5  && ndKey < 1.0) ndKey = 1.0;
	else if (ndKey > 1.0)                ndKey = Math.floor(ndKey);
	if (ndKey > 22) ndKey = 22;

	if (ndKey === 0.25) {
		if (Math.random() <= 0.3) { tesouro = "Nenhum tesouro"; mensagem = "Nada, o bicho era pobre"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			mensagem = "Tesouro menor";
			if      (dp >= 31 && dp <= 70)  dinheiro = (Math.floor(Math.random()*6)+1)*10  + " TC";
			else if (dp >= 71 && dp <= 95)  dinheiro = (Math.floor(Math.random()*4)+1)*100 + " TC";
			else if (dp >= 96)              dinheiro = (Math.floor(Math.random()*6)+1)*10  + " T$";
			if      (dc >= 51 && dc <= 75)  outras_coisas = getDiverso();
			else if (dc >= 76)              outras_coisas = getEquipamento();
		}
	} else if (ndKey === 0.5) {
		if (Math.random() <= 0.25) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 26 && dp <= 70)  dinheiro = (2*(Math.floor(Math.random()*6)+1)*10)  + " TC";
			else if (dp >= 71 && dp <= 95)  dinheiro = (2*(Math.floor(Math.random()*8)+1)*10)  + " T$";
			else if (dp >= 96)              dinheiro = (Math.floor(Math.random()*4)+1)*100      + " T$";
			if      (dc >= 46 && dc <= 70)  outras_coisas = getDiverso();
			else if (dc >= 71)              outras_coisas = getEquipamento();
		}
	} else if (ndKey === 1) {
		if (Math.random() <= 0.2) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 21 && dp <= 70)  dinheiro = (3*(Math.floor(Math.random()*8)+1)*10)   + " T$";
			else if (dp >= 71 && dp <= 95)  dinheiro = (4*(Math.floor(Math.random()*12)+1)*10)  + " T$";
			else if (dp >= 96)              dinheiro = getRiquezaMenor();
			if      (dc >= 41 && dc <= 65)  outras_coisas = getDiverso();
			else if (dc >= 66 && dc <= 90)  outras_coisas = getEquipamento();
			else if (dc >= 91)              outras_coisas = getPocao();
		}
	} else if (ndKey === 2) {
		if (Math.random() <= 0.15) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 16 && dp <= 55)  dinheiro = (3*(Math.floor(Math.random()*10)+1)*10)  + " T$";
			else if (dp >= 56 && dp <= 85)  dinheiro = (2*(Math.floor(Math.random()*4)+1)*100)  + " T$";
			else if (dp >= 86 && dp <= 95)  dinheiro = ((2*(Math.floor(Math.random()*6)+1)+1)*100) + " T$";
			else if (dp >= 96)              dinheiro = getRiquezaMenor();
			if      (dc >= 31 && dc <= 40)  outras_coisas = getDiverso();
			else if (dc >= 41 && dc <= 70)  outras_coisas = getEquipamento();
			else if (dc >= 71 && dc <= 90)  outras_coisas = getPocao();
			else if (dc >= 91)              outras_coisas = getMelhoria();
		}
	} else if (ndKey === 3) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 20)  dinheiro = (4*(Math.floor(Math.random()*12)+1)*10) + " T$";
			else if (dp >= 21 && dp <= 60)  dinheiro = (Math.floor(Math.random()*4)+1)*100     + " T$";
			else if (dp >= 61 && dp <= 90)  dinheiro = (Math.floor(Math.random()*8)+1)*10      + " TO";
			else if (dp >= 91) {
				var n = Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMenor() + "<br>";
			}
			if      (dc >= 1  && dc <= 25)  outras_coisas = "Nada";
			else if (dc >= 26 && dc <= 35)  outras_coisas = getDiverso();
			else if (dc >= 36 && dc <= 60)  outras_coisas = getEquipamento();
			else if (dc >= 61 && dc <= 85)  outras_coisas = getPocao();
			else if (dc >= 86)              outras_coisas = getMelhoria();
		}
	} else if (ndKey === 4) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 50)  dinheiro = (Math.floor(Math.random()*6)+1)*100  + " T$";
			else if (dp >= 51 && dp <= 80)  dinheiro = (Math.floor(Math.random()*12)+1)*100 + " T$";
			else if (dp >= 81 && dp <= 90)  dinheiro = getRiquezaMenor(20);
			else if (dp >= 91) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMenor(20) + "<br>";
			}
			if      (dc >= 21 && dc <= 30)  outras_coisas = getDiverso();
			else if (dc >= 31 && dc <= 55)  outras_coisas = doisDados(getEquipamento);
			else if (dc >= 56 && dc <= 80)  outras_coisas = getPocao(20);
			else if (dc >= 81)              outras_coisas = doisDados(getMelhoria);
		}
	} else if (ndKey === 5) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 16 && dp <= 65)  dinheiro = (Math.floor(Math.random()*8)+1)*100   + " T$";
			else if (dp >= 66 && dp <= 95)  dinheiro = (Math.floor(Math.random()*3)+1)*40    + " TO";
			else if (dp >= 96)              dinheiro = getRiquezaMedia();
			if      (dc >= 21 && dc <= 70)  outras_coisas = getPocao();
			else if (dc >= 71 && dc <= 90)  outras_coisas = getMelhoria();
			else if (dc >= 91)              outras_coisas = getMelhoria2();
		}
	} else if (ndKey === 6) {
		if (Math.random() <= 0.15) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 16 && dp <= 60)  dinheiro = (Math.floor(Math.random()*6)+1)*100   + " T$";
			else if (dp >= 61 && dp <= 90)  dinheiro = (Math.floor(Math.random()*12)+1)*100  + " T$";
			else if (dp >= 91) {
				var n=Math.floor(Math.random()*3)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMenor() + "<br>";
			}
			if      (dc >= 21 && dc <= 65)  outras_coisas = getPocao(20);
			else if (dc >= 66 && dc <= 95)  outras_coisas = getMelhoria();
			else if (dc >= 96)              outras_coisas = doisDados(getMelhoria2);
		}
	} else if (ndKey === 7) {
		if (Math.random() <= 0.15) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 60)  dinheiro = (4*(Math.floor(Math.random()*8)+1)*100)  + " T$";
			else if (dp >= 61 && dp <= 90)  dinheiro = (4*(Math.floor(Math.random()*12)+1)*10)  + " TO";
			else if (dp >= 91) {
				var n=Math.floor(Math.random()*4)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMenor() + "<br>";
			}
			if (dc >= 21 && dc <= 60) {
				var n=Math.floor(Math.random()*3)+1; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao() + "<br>";
			} else if (dc >= 61 && dc <= 90) {
				outras_coisas = getMelhoria2();
			} else if (dc >= 91) {
				outras_coisas = getMelhoria3();
			}
		}
	} else if (ndKey === 8) {
		if (Math.random() <= 0.15) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 55) dinheiro = (2*(Math.floor(Math.random()*10)+1)*100) + " T$";
			else if (dp >= 56 && dp <= 95) {
				var n=Math.floor(Math.random()*4)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMenor() + "<br>";
			} else if (dp >= 96)           dinheiro = getRiquezaMedia(20);
			if (dc >= 21 && dc <= 75) {
				var n=Math.floor(Math.random()*3)+1; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao() + "<br>";
			} else if (dc >= 76 && dc <= 95) {
				outras_coisas = getMelhoria2();
			} else if (dc >= 96) {
				outras_coisas = doisDados(getMelhoria3);
			}
		}
	} else if (ndKey === 9) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 35) dinheiro = getRiquezaMedia();
			else if (dp >= 36 && dp <= 85) dinheiro = (4*(Math.floor(Math.random()*6)+1)*100) + " T$";
			else if (dp >= 86) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			}
			if      (dc >= 21 && dc <= 70) outras_coisas = getPocao(20);
			else if (dc >= 71 && dc <= 95) outras_coisas = getMelhoria3();
			else if (dc >= 96)             outras_coisas = getMagicoMenor();
		}
	} else if (ndKey === 10) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 30) dinheiro = (4*(Math.floor(Math.random()*6)+1)*100) + " T$";
			else if (dp >= 31 && dp <= 85) dinheiro = (4*(Math.floor(Math.random()*10)+1)*10) + " TO";
			else if (dp >= 86) {
				var n=Math.floor(Math.random()*3)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			}
			if      (dc >= 1  && dc <= 50) outras_coisas = "";
			else if (dc >= 51 && dc <= 75) {
				var n=Math.floor(Math.random()*3)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao() + "<br>";
			} else if (dc >= 76 && dc <= 90) {
				outras_coisas = getMelhoria3();
			} else if (dc >= 91) {
				outras_coisas = getMagicoMenor();
			}
		}
	} else if (ndKey === 11) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 45) dinheiro = (2*(Math.floor(Math.random()*4)+1)*1000) + " T$";
			else if (dp >= 46 && dp <= 85) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			} else if (dp >= 86) dinheiro = (2*(Math.floor(Math.random()*6)+1)*100) + " TO";
			if      (dc >= 1  && dc <= 45) outras_coisas = "";
			else if (dc >= 46 && dc <= 70) {
				var n=Math.floor(Math.random()*4)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao() + "<br>";
			} else if (dc >= 71 && dc <= 90) {
				outras_coisas = getMelhoria3();
			} else if (dc >= 91) {
				outras_coisas = doisDados(getMagicoMenor);
			}
		}
	} else if (ndKey === 12) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 45) dinheiro = getRiquezaMedia(20);
			else if (dp >= 46 && dp <= 80) dinheiro = (2*(Math.floor(Math.random()*6)+1)*1000) + " T$";
			else if (dp >= 81) {
				var n=Math.floor(Math.random()*4)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			}
			if      (dc >= 1  && dc <= 45) outras_coisas = "";
			else if (dc >= 46 && dc <= 70) {
				var n=Math.floor(Math.random()*3)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao(20) + "<br>";
			} else if (dc >= 71 && dc <= 85) {
				outras_coisas = getMelhoria4();
			} else if (dc >= 86) {
				outras_coisas = getMagicoMenor();
			}
		}
	} else if (ndKey === 13) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 45) dinheiro = (4*(Math.floor(Math.random()*4)+1)*1000) + " T$";
			else if (dp >= 46 && dp <= 80) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			} else if (dp >= 81) dinheiro = (4*(Math.floor(Math.random()*6)+1)*100) + " TO";
			if      (dc >= 1  && dc <= 40) outras_coisas = "";
			else if (dc >= 41 && dc <= 65) {
				var n=Math.floor(Math.random()*4)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao(20) + "<br>";
			} else if (dc >= 66 && dc <= 95) {
				outras_coisas = getMelhoria4();
			} else if (dc >= 96) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 14) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if (dp >= 11 && dp <= 45) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			} else if (dp >= 46 && dp <= 80) dinheiro = (3*(Math.floor(Math.random()*6)+1)*1000) + " T$";
			else if (dp >= 81)               dinheiro = getRiquezaMaior();
			if      (dc >= 1  && dc <= 40) outras_coisas = "";
			else if (dc >= 41 && dc <= 65) {
				var n=Math.floor(Math.random()*4)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao(20) + "<br>";
			} else if (dc >= 66 && dc <= 90) {
				outras_coisas = getMelhoria4();
			} else if (dc >= 91) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 15) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if (dp >= 11 && dp <= 45) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			} else if (dp >= 46 && dp <= 80) dinheiro = (2*(Math.floor(Math.random()*10)+1)*1000) + " T$";
			else if   (dp >= 81)             dinheiro = getRiquezaMaior();
			if      (dc >= 1  && dc <= 35) outras_coisas = "";
			else if (dc >= 36 && dc <= 45) {
				var n=Math.floor(Math.random()*6)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao() + "<br>";
			} else if (dc >= 46 && dc <= 85) {
				outras_coisas = doisDados(getMelhoria4);
			} else if (dc >= 86) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 16) {
		if (Math.random() <= 0.1) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 11 && dp <= 40) dinheiro = (3*(Math.floor(Math.random()*6)+1)*1000) + " T$";
			else if (dp >= 41 && dp <= 75) dinheiro = (3*(Math.floor(Math.random()*10)+1)*100) + " TO";
			else if (dp >= 76) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMaior() + "<br>";
			}
			if      (dc >= 1  && dc <= 35) outras_coisas = "";
			else if (dc >= 36 && dc <= 45) {
				var n=Math.floor(Math.random()*6)+2; outras_coisas="";
				for(var i=0;i<n;i++) outras_coisas += getPocao(20) + "<br>";
			} else if (dc >= 46 && dc <= 80) {
				outras_coisas = doisDados(getMelhoria4);
			} else if (dc >= 81) {
				outras_coisas = getMagicoMedio();
			}
		}
	} else if (ndKey === 17) {
		if (Math.random() <= 0.05) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 6  && dp <= 40) dinheiro = (4*(Math.floor(Math.random()*6)+1)*1000) + " T$";
			else if (dp >= 41 && dp <= 75) dinheiro = (2*(Math.floor(Math.random()*2)+2)*1000) + " TO";
			else if (dp >= 76) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMedia() + "<br>";
			}
			if      (dc >= 1  && dc <= 20) outras_coisas = "";
			else if (dc >= 21 && dc <= 40) outras_coisas = getMagicoMenor();
			else if (dc >= 41 && dc <= 80) outras_coisas = getMagicoMedio();
			else if (dc >= 81)             outras_coisas = getMagicoMaior();
		}
	} else if (ndKey === 18) {
		if (Math.random() <= 0.05) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 6  && dp <= 40) dinheiro = (4*(Math.floor(Math.random()*10)+1)*1000) + " T$";
			else if (dp >= 41 && dp <= 75) dinheiro = getRiquezaMaior();
			else if (dp >= 76) {
				var n=Math.floor(Math.random()*3)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMaior() + "<br>";
			}
			if      (dc >= 1  && dc <= 15) outras_coisas = "";
			else if (dc >= 16 && dc <= 40) outras_coisas = doisDados(getMagicoMenor);
			else if (dc >= 41 && dc <= 70) outras_coisas = getMagicoMedio();
			else if (dc >= 71)             outras_coisas = getMagicoMaior();
		}
	} else if (ndKey === 19) {
		if (Math.random() <= 0.05) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 6  && dp <= 40) dinheiro = (4*(Math.floor(Math.random()*12)+1)*1000) + " T$";
			else if (dp >= 41 && dp <= 75) dinheiro = getRiquezaMaior(20);
			else if (dp >= 76)             dinheiro = (Math.floor(Math.random()*12)+1)*1000 + " TO";
			if      (dc >= 1  && dc <= 10) outras_coisas = "";
			else if (dc >= 11 && dc <= 40) outras_coisas = doisDados(getMagicoMenor);
			else if (dc >= 41 && dc <= 60) outras_coisas = doisDados(getMagicoMedio);
			else if (dc >= 61)             outras_coisas = getMagicoMaior();
		}
	} else if (ndKey === 20) {
		if (Math.random() <= 0.05) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 1  && dp <= 5)  dinheiro = "";
			else if (dp >= 6  && dp <= 40) dinheiro = (2*(Math.floor(Math.random()*4)+1)*1000) + " TO";
			else if (dp >= 41 && dp <= 50) {
				var n=Math.floor(Math.random()*3)+1; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMaior() + "<br>";
			} else {
				var n=Math.floor(Math.random()*3)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMaior() + "<br>";
			}
			if      (dc >= 1  && dc <= 5)  outras_coisas = "";
			else if (dc >= 6  && dc <= 40) outras_coisas = doisDados(getMagicoMenor);
			else if (dc >= 41 && dc <= 50) outras_coisas = doisDados(getMagicoMedio);
			else                           outras_coisas = doisDados(getMagicoMaior);
		}
	} else if (ndKey === 21) {
		if (Math.random() <= 0.02) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 1  && dp <= 3)  dinheiro = "";
			else if (dp >= 4  && dp <= 30) dinheiro = ((Math.floor(Math.random()*3)+2)*1000) + " TO";
			else {
				var n=Math.floor(Math.random()*4)+2; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMaior() + "<br>";
			}
			if      (dc >= 1  && dc <= 3)  outras_coisas = "";
			else if (dc >= 4  && dc <= 35) outras_coisas = doisDados(getMagicoMedio);
			else                           outras_coisas = doisDados(getMagicoMaior);
		}
	} else if (ndKey === 22) {
		if (Math.random() <= 0.01) { tesouro = "Nenhum tesouro"; }
		else {
			var dp = Math.floor(Math.random()*100)+1;
			var dc = Math.floor(Math.random()*100)+1;
			if      (dp >= 1  && dp <= 2)  dinheiro = "";
			else if (dp >= 3  && dp <= 20) dinheiro = ((Math.floor(Math.random()*4)+3)*1000) + " TO";
			else {
				var n=Math.floor(Math.random()*5)+3; dinheiro="";
				for(var i=0;i<n;i++) dinheiro += getRiquezaMaior() + "<br>";
			}
			if      (dc >= 1  && dc <= 2)  outras_coisas = "";
			else if (dc >= 3  && dc <= 20) outras_coisas = doisDados(getMagicoMedio) + " e " + getMagicoMaior();
			else                           outras_coisas = doisDados(getMagicoMaior) + " e " + getMagicoMaior();
		}
	}

	if (dinheiro === "")      dinheiro      = "Nenhum dinheiro";
	if (outras_coisas === "") outras_coisas = "Nenhum item especial";

	return { tesouro: tesouro, dinheiro: dinheiro, outrasCoisas: outras_coisas, mensagem: mensagem };
}

function calcTesouro() {
	var totalND = parseFloat(document.getElementById("totalND").innerHTML);
	if (totalND <= 0 || isNaN(totalND)) {
		alert("O valor de totalND não é válido para calcular o tesouro.");
		return;
	}
	var tesouroElement   = document.getElementById("tesouro");
	var mensagem1Element = document.getElementById("mensagem1Tesouro");
	tesouroElement.innerHTML   = "";
	mensagem1Element.innerHTML = "";

	var rolled = rollTreasureForND(totalND);
	var tesouroTexto = "<big><strong>Dinheiro:</big></strong> " + rolled.dinheiro +
	                   "<br><br><strong><big>Outras coisas:</big></strong> " + rolled.outrasCoisas;

	if (rolled.tesouro === "Nenhum tesouro") {
		tesouroTexto = "<b><big><i><span style='color: var(--rubi-primary);'>" + rolled.tesouro + "</span></i></big></b>";
	}
	tesouroElement.innerHTML   = tesouroTexto;
	mensagem1Element.innerHTML = rolled.mensagem ? "<b><i>" + rolled.mensagem + "</b></i>" : "";
}

function rollCreatureTreasure(name, nd) {
	var tesouroElement = document.getElementById("resultadoTesouro");
	if (!tesouroElement) return;
	var rolled    = rollTreasureForND(nd);
	var container = document.createElement("div");
	container.className = "treasure-item-box";
	container.style.border       = "1px solid var(--border-color)";
	container.style.borderRadius = "var(--radius-md)";
	container.style.padding      = "16px";
	container.style.marginBottom = "16px";
	container.style.background   = "var(--bg-dark-panel)";
	container.style.position     = "relative";

	var nameText = name ? " para <strong>" + name + "</strong>" : "";
	var content  = "<p style='margin-bottom:8px;'><b style='color:var(--gold-primary);'>Tesouro" + nameText +
	               " (ND " + formatND(nd) + "):</b></p>";

	if (rolled.tesouro === "Nenhum tesouro") {
		content += "<p><b><big><i><span style='color:var(--rubi-primary);'>Nenhum tesouro</span></i></big></b></p>";
	} else {
		content += "<p style='margin-bottom:8px;'><strong>Dinheiro:</strong> " + rolled.dinheiro + "</p>" +
		           "<p style='margin-bottom:8px;'><strong>Outras coisas:</strong> " + rolled.outrasCoisas + "</p>";
		if (rolled.mensagem) {
			content += "<p style='color:var(--text-secondary);font-style:italic;margin-bottom:8px;'>" + rolled.mensagem + "</p>";
		}
	}
	content += "<button class='btn btn-outline btn-sm' style='height:32px;padding:0 12px;font-size:0.85rem;' " +
	           "onclick='this.parentElement.remove()'><i class='fa-solid fa-trash-can' style='margin-right:4px;'></i>Apagar</button>";
	container.innerHTML = content;

	var testeSpan = document.getElementById("teste");
	if (testeSpan) testeSpan.style.display = "none";
	tesouroElement.appendChild(container);
}

function calcTesouroInd() {
	var creatureList = document.getElementById("creatureList");
	var rows = creatureList.getElementsByTagName("tr");
	for (var i = 1; i < rows.length; i++) {
		var name = rows[i].cells[0].innerHTML;
		var nd   = parseFloat(rows[i].cells[1].dataset.value || rows[i].cells[1].innerHTML);
		rollCreatureTreasure(name, nd);
	}
}

function apagarTesouro(criatura) {
	var tesouroElement = document.getElementById("resultadoTesouro");
	if (tesouroElement && tesouroElement.childNodes[criatura - 1]) {
		tesouroElement.removeChild(tesouroElement.childNodes[criatura - 1]);
	}
}

function sortTableByND() {
	var creatureList = document.getElementById("creatureList");
	var rows = creatureList.getElementsByTagName("tr");
	if (rows.length <= 1) return;
	var headerRow   = rows[0];
	var sortedRows  = Array.from(rows).slice(1);
	sortedRows.sort(function (a, b) {
		var valA = parseFloat(a.getElementsByTagName("td")[1].dataset.value || a.getElementsByTagName("td")[1].innerText);
		var valB = parseFloat(b.getElementsByTagName("td")[1].dataset.value || b.getElementsByTagName("td")[1].innerText);
		if (isNaN(valA)) valA = 0;
		if (isNaN(valB)) valB = 0;
		return valA - valB;
	});
	while (creatureList.firstChild) creatureList.removeChild(creatureList.firstChild);
	creatureList.appendChild(headerRow);
	for (var i = 0; i < sortedRows.length; i++) creatureList.appendChild(sortedRows[i]);
}