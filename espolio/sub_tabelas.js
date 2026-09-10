/* =========================================================
   ESPÓLIO — SUB-TABELAS DE TESOURO
   Funções copiadas/reaproveitadas de calculadoraND_Tormenta
   (baseadas no Excel de tesouros T20 + expansões de Arton).
   ========================================================= */

// Seleciona item de uma tabela [[item, peso], ...] com bônus opcional
function rollTabela(tabela, bonus) {
	var total = 0;
	for (var i = 0; i < tabela.length; i++) total += tabela[i][1];
	var roll = Math.floor(Math.random() * total) + 1 + (bonus || 0);
	if (roll > total) roll = total;
	var acc = 0;
	for (var i = 0; i < tabela.length; i++) {
		acc += tabela[i][1];
		if (roll <= acc) {
			registrarRolagem('sub-tabela → ' + tabela[i][0], roll);
			return tabela[i][0];
		}
	}
	registrarRolagem('sub-tabela → ' + tabela[tabela.length - 1][0], roll);
	return tabela[tabela.length - 1][0];
}

// ─────────────── ITENS ESPECÍFICOS (d100) ───────────────
// Tabelas extraídas do xlsx oficial de tesouros T20.

var ARMAS_ESPECIFICAS = [
	["Adaga da bruma",2],
	["Adaga ofídica",1],
	["Adaga sorrateira",1],
	["Alabarda da coragem",1],
	["Alfange dourado",1],
	["Alguma coisa de Nimb...",1],
	["Arco das sombras",3],
	["Arco do crepúsculo",2],
	["Arco do poder",3],
	["Avalanche",3],
	["Azagaia dos relâmpagos",3],
	["Azagaia fantasma",2],
	["Besta estelar",3],
	["Besta explosiva",3],
	["Bordão sabichão",1],
	["Cajado das matas",1],
	["Cimitarra solar",1],
	["Clava de lava",2],
	["Espada baronial",3],
	["Espada da tempestade",2],
	["Espada do guardião",3],
	["Espada imaculada",1],
	["Espada monástica",1],
	["Espada solar",2],
	["Espada sortuda",3],
	["Florete do vendaval",2],
	["Florete fugaz",3],
	["Katana da determinação",1],
	["Lâmina da luz",3],
	["Lança animalesca",3],
	["Lança da dominação",1],
	["Lança da fênix",2],
	["Língua do deserto",3],
	["Maça do terror",3],
	["Maça monstruosa",1],
	["Machado da bravura",1],
	["Machado da natureza",2],
	["Machado do abismo",2],
	["Machado do vulcão",3],
	["Machado lamnoriano",1],
	["Machado silvestre",3],
	["Mangual aventureiro",1],
	["Martelo da terra",2],
	["Martelo de Doherimm",3],
	["Martelo do titã",2],
	["Punhal das profundezas",2],
	["Punhal sszzaazita",3],
	["Tridente aquoso",1],
	["Vingadora sagrada",3]
];

var ARMADURAS_ESPECIFICAS = [
	["Armadura da luz",4],
	["Armadura das sombras profundas",4],
	["Armadura do dragão ancião",4],
	["Armadura do inverno perene",4],
	["Armadura do julgamento",2],
	["Baluarte anão",4],
	["Carapaça demoníaca",4],
	["Cota da serpente marinha",4],
	["Cota élfica",10],
	["Couraça do comando",4],
	["Couraça do guardião celeste",4],
	["Couro de monstro",4],
	["Escudo da ira vulcânica",4],
	["Escudo da luz estelar",4],
	["Escudo da natureza viva",4],
	["Escudo de Azgher",4],
	["Escudo do conjurador",4],
	["Escudo do eclipse",4],
	["Escudo do grifo",4],
	["Escudo do leão",6],
	["Escudo do trovão",4],
	["Escudo espinhoso",4],
	["Loriga do centurião",4],
	["Manto da noite",2]
];

var ESOTERICOS_ESPECIFICOS = [
	["Cajado da destruição",20],
	["Cajado da vida",20],
	["Cajado das marés",5],
	["Cajado do poder",15],
	["Cálice sagrado",15],
	["Relógio do arcanista",10],
	["Varinha da generosidade",10],
	["Varinha milenar",5]
];

// Rola numa tabela de encantos; quando cai na faixa "específico",
// resolve de fato na tabela de itens específicos correspondente (tipo).
// tipo: 'arma', 'armadura' ou 'esoterico'
function rollTabelaComEspecifico(tabela, tipo) {
	var resultado = rollTabela(tabela);
	if (resultado.indexOf('específ') >= 0) {
		var tabelaEsp = tipo === 'arma' ? ARMAS_ESPECIFICAS :
		                tipo === 'armadura' ? ARMADURAS_ESPECIFICAS :
		                ESOTERICOS_ESPECIFICOS;
		resultado = '🏆 ' + rollTabela(tabelaEsp);
	}
	return resultado;
}

// Escolha entre dois resultados
function doisDados(funcaoExistente) {
	var resultado1 = funcaoExistente();
	var resultado2 = funcaoExistente();
	return "Escolha entre: " + resultado1 + " ou " + resultado2 + ".";
}

// ─────────────── MATERIAL ESPECIAL ───────────────
function getMaterialEspecial() {
	var materiais = ["aço-rubi", "adamante", "gelo eterno", "madeira Tollon", "matéria vermelha", "mitral"];
	return materiais[Math.floor(Math.random() * 6)];
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
		["Poção de Armadura Elemental — T$ 30",1],
		["Poção de Desafio Corajoso — T$ 30",1],
		["Poção de Discrição — T$ 30",1],
		["Poção de Farejar Fortuna — T$ 30",1],
		["Poção de Maaais Klunc — T$ 30",1],
		["Poção de Ossos de Adamante — T$ 30",1],
		["Poção de Punho de Mitral — T$ 30",1],
		["Poção de Magia Dadivosa — T$ 30",1],
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
		["Poção de Aura de Morte — T$ 270",1],
		["Poção de Emular Magia — T$ 270",1],
		["Poção de Punho de Mitral (+2 ataque e ameaça) — T$ 270",1],
		["Poção de Viagem Onírica — T$ 270",1],
		["Couraça de Allihanna (óleo) — T$ 270",1],
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
		["Poção de Percepção Rubra (+3) — T$ 1.080",1],
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
		["2d6×100 (700 T$) — Ex.: pente de dragão com gemas, harpa exótica",10],
		["2d8×100 (900 T$) — Ex.: opala negra, tapa-olho com safira falsa, lingote de ouro",4],
		["4d10×100 (2.200 T$) — Ex.: esmeralda verde, pingente de safira, caixinha de música",1]
	];
	return rollTabela(tabela, bonus || 0);
}

function getRiquezaMedia(bonus) {
	var tabela = [
		["2d4×10 (50 T$) — Ex.: bracelete de ouro, estatueta de osso",10],
		["4d6×10 (140 T$) — Ex.: ametista, pérola branca, lingote de prata",20],
		["1d6×100 (350 T$) — Ex.: alexandrita, pérola negra, espada cerimonial de prata",20],
		["2d6×100 (700 T$) — Ex.: pente de dragão com gemas, harpa exótica",15],
		["2d8×100 (900 T$) — Ex.: opala negra, tapa-olho com safira falsa, lingote de ouro",15],
		["4d10×100 (2.200 T$) — Ex.: esmeralda verde, pingente safira, caixinha de música",10],
		["6d12×100 (3.900 T$) — Ex.: anel de prata e safira, diamante branco",5],
		["2d10×1.000 (11.000 T$) — Ex.: anel de ouro e rubi, diamante vermelho",4],
		["6d8×1.000 (27.000 T$) — Ex.: coroa de ouro com centenas de gemas",1]
	];
	return rollTabela(tabela, bonus || 0);
}

function getRiquezaMaior(bonus) {
	var tabela = [
		["1d6×100 (350 T$) — Ex.: alexandrita, pérola negra, espada cerimonial de prata",5],
		["2d6×100 (700 T$) — Ex.: pente de dragão com gemas, harpa exótica",10],
		["2d8×100 (900 T$) — Ex.: opala negra, tapa-olho com safira falsa, lingote de ouro",10],
		["4d10×100 (2.200 T$) — Ex.: esmeralda, pingente de safira, caixinha de música",15],
		["6d12×100 (3.900 T$) — Ex.: anel de prata e safira, diamante branco",20],
		["2d10×1.000 (11.000 T$) — Ex.: anel de ouro e rubi, diamante vermelho",15],
		["6d8×1.000 (27.000 T$) — Ex.: coroa de ouro com centenas de gemas",10],
		["1d10×10.000 (55.000 T$) — Ex.: arca de madeira repleta de moedas",10],
		["4d12×10.000 (260.000 T$) — Uma sala forrada de moedas!",5]
	];
	return rollTabela(tabela, bonus || 0);
}

// ─────────────── MELHORIAS DE ARMAS (d100) ───────────────
function getMelhoriaArma() {
	var tabela = [
		["Atroz¹",10],["Banhada a ouro",2],["Certeira",8],
		["Conduíte",1],
		["Cravejada de gemas",2],["Cruel",8],["Discreta",2],["Equilibrada",5],
		["Farpada",4],
		["Guarda",2],
		["Harmonizada",4],["Incendiária",1],["Injeção alquímica",4],
		["Macabra",2],["Maciça",10],
		["Material especial",10],
		["Mira telescópica",4],["Precisa",8],
		["Pressurizada",2],
		["Pungente¹",10],
		["Usada",1]
	];
	var result = rollTabela(tabela);
	if (result === "Material especial") result += ": " + getMaterialEspecial();
	return result;
}

// ─────────────── MELHORIAS DE ARMADURAS (d100) ───────────────
function getMelhoriaArmadura() {
	var tabela = [
		["Ajustada",10],
		["Balístico",4],
		["Banhada a ouro",4],["Cravejada de gemas",4],["Delicada",5],
		["Deslumbrante¹",2],
		["Diligente",2],
		["Discreta",4],["Espinhos",4],
		["Injetora",4],
		["Inscrito",4],
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
		["Canônico",3],
		["Cravejado de gemas",3],["Discreto",4],
		["Energético",15],["Harmonizado",15],["Macabro",3],
		["Material especial",9],
		["Poderoso",10],
		["Potencializador¹",10],
		["Vigilante",10]
	];
	var result = rollTabela(tabela);
	if (result === "Material especial") result += ": " + getMaterialEspecial();
	return result;
}

// ─────────────── ENCANTOS DE ARMAS MÁGICAS (d100) ───────────────
function getArmaMagica() {
	var tabela = [
		["Alvorada",1],
		["Ameaçadora",4],
		["Anátema",1],
		["Anticriatura",2],["Arremesso",1],["Assassina",1],
		["Brumosa",1],
		["Caçadora",1],
		["Cantante",1],
		["Ciclônica",1],
		["Congelante",4],["Conjuradora",1],["Corrosiva",4],
		["Crescente",2],
		["Cristalina",1],
		["Cronal*",1],
		["Cuidadora",1],
		["Dançarina",2],["Defensora",2],["Destruidora",1],
		["Dilacerante",2],["Drenante",1],["Elétrica",4],
		["Energética*",1],
		["Espreitadora",2],
		["Excruciante",2],["Flamejante",4],["Formidável",8],
		["Frenética",2],
		["Gárgula",1],["Horrenda",1],["Indignada",1],["Infestada",1],
		["Lancinante*",1],
		["Magnífica*",8],
		["Manáfaga",1],
		["Piedosa",2],["Profana",1],
		["Rebote",1],
		["Reflexiva",1],
		["Ressonante",1],
		["Sagrada",1],["Sanguinária",2],
		["Sepulcral",1],
		["Sombria",1],
		["Trovejante",1],["Tumular",1],
		["Vampírica",1],
		["Veloz",2],["Venenosa",1],
		["Arma específica (role na tabela de Armas Mágicas)",10]
	];
	return rollTabelaComEspecifico(tabela, 'arma');
}

// ─────────────── ENCANTOS DE ARMADURAS MÁGICAS (d100) ───────────────
function getEncantoArmadura() {
	var tabela = [
		["Abascanto",2],["Abençoado",2],
		["Abissal",1],
		["Acrobático",1],["Alado",2],
		["Ancorada*",1],
		["Animado**",2],
		["Anulador***",1],
		["Arbóreo",1],
		["Assustador",2],
		["Astuto",1],
		["Cáustica",1],["Defensor",10],
		["Densa*",1],
		["Égide",1],
		["Enraizada*",1],
		["Escorregadio",1],
		["Esmagador**",2],
		["Esmérico",1],
		["Estígio***",2],
		["Etéreo",1],
		["Fantasmagórico",2],["Fortificado",4],["Gélido",1],
		["Geomântico",1],
		["Guardião***",10],
		["Hipnótico",2],["Ilusório",1],["Incandescente",1],["Invulnerável",5],
		["Ligeira*",1],
		["Luminescente",2],
		["Opaco",5],
		["Prístino",1],
		["Protetor",5],
		["Purificador",1],
		["Reanimador",2],
		["Refletor",2],["Relampejante",1],["Reluzente",1],
		["Replicante",1],
		["Resiliente",1],
		["Sombrio",1],
		["Vórtice",1],
		["Zeloso",1],
		["Armadura/Escudo específico (role na tabela de Armaduras Mágicas)",10]
	];
	return rollTabelaComEspecifico(tabela, 'armadura');
}

// ─────────────── ENCANTOS DE ESOTÉRICOS MÁGICOS (d100) ───────────────
function getEncantoEsoterico() {
	var tabela = [
		["Abafador",2],["Bélico",10],["Caridoso",4],["Chocante",4],
		["Clemente",10],["Contido",2],["Embusteiro",2],["Emergencial",2],
		["Encadeado",4],["Escultor",2],["Frugal",2],["Glacial",4],
		["Imperioso",2],
		["Implacável*",2],
		["Incriminador",2],["Inflamável",7],["Inquisidor",4],["Insistente",4],
		["Khalmyrita",2],
		["Majestoso*",10],
		["Nímbico",2],
		["Pulverizante*",1],
		["Retaliador",1],["Sanguessuga",2],["Traiçoeiro",1],["Verdugo",2],
		["Esotérico específico (role na tabela de Esotéricos Mágicos)",10]
	];
	return rollTabelaComEspecifico(tabela, 'esoterico');
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
		["Escrivaninha consagrada (T$ 9.000)",1],
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
		["Colar guardião (T$ 51.000)",4],["estatueta animista (T$ 51.000)",2],
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
function getEquipamento() {
	var r = Math.random();
	if      (r < 0.5)   return getArma();
	else if (r < 0.875) return getArmadura();
	else                return getEsoterico();
}

function getMelhoria() {
	var r = Math.random();
	if      (r < 0.5)   return getArma()      + " [" + getMelhoriaArma()      + "]";
	else if (r < 0.875) return getArmadura()  + " [" + getMelhoriaArmadura()  + "]";
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