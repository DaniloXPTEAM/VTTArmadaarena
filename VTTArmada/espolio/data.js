/* =========================================================
   ESPÓLIO — DADOS DAS TABELAS DE TESOURO (TORMENTA20)
   =========================================================
   Fonte: T20 - Tabela de geração de tesouros (planilha oficial)
   e regras de Buscas (Livro Básico, Cap. 6).

   TESOURO_ND
   Cada entrada representa uma linha da tabela "Tesouro por ND".
   - nd: Nível de Desafio ("1/4", "1/2", "1".."20")
   - dinheiro: lista de [faixa d%, resultado]
   - itens: lista de [faixa d%, resultado]

   Sufixos usados nos resultados (mantidos como no livro):
   - "+%"  -> na rolagem de d% para o tipo de riqueza/poção, +20%
   - "2D"  -> na rolagem do tipo de equipamento/item mágico, role 2d6 e escolha um
   ========================================================= */

var TESOURO_ND = [
  {
    "nd": "1/4",
    "dinheiro": [
      [
        "01-30",
        "—"
      ],
      [
        "31-70",
        "1d6x10 TC"
      ],
      [
        "71-95",
        "1d4x100 TC"
      ],
      [
        "96-100",
        "1d6x10 T$"
      ]
    ],
    "itens": [
      [
        "01-50",
        "—"
      ],
      [
        "51-75",
        "Item diverso"
      ],
      [
        "76-100",
        "Equipamento"
      ]
    ]
  },
  {
    "nd": "1/2",
    "dinheiro": [
      [
        "01-25",
        "—"
      ],
      [
        "26-70",
        "2d6x10 TC"
      ],
      [
        "71-95",
        "2d8x10 T$"
      ],
      [
        "96-100",
        "1d4x100 T$"
      ]
    ],
    "itens": [
      [
        "01-45",
        "—"
      ],
      [
        "46-70",
        "Item diverso"
      ],
      [
        "71-100",
        "Equipamento"
      ]
    ]
  },
  {
    "nd": "1",
    "dinheiro": [
      [
        "01-20",
        "—"
      ],
      [
        "21-70",
        "3d8x10 T$"
      ],
      [
        "71-95",
        "4d12x10 T$"
      ],
      [
        "96-100",
        "1 riqueza menor"
      ]
    ],
    "itens": [
      [
        "01-40",
        "—"
      ],
      [
        "41-65",
        "Item diverso"
      ],
      [
        "66-90",
        "Equipamento"
      ],
      [
        "91-100",
        "1 poção"
      ]
    ]
  },
  {
    "nd": "2",
    "dinheiro": [
      [
        "01-15",
        "—"
      ],
      [
        "16-55",
        "3d10x10 T$"
      ],
      [
        "56-85",
        "2d4x100 T$"
      ],
      [
        "86-95",
        "2d6+1x100 T$"
      ],
      [
        "96-100",
        "1 riqueza menor"
      ]
    ],
    "itens": [
      [
        "01-30",
        "—"
      ],
      [
        "31-40",
        "Item diverso"
      ],
      [
        "41-70",
        "Equipamento"
      ],
      [
        "71-90",
        "1 poção"
      ],
      [
        "91-100",
        "Superior (1 melhoria)"
      ]
    ]
  },
  {
    "nd": "3",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-20",
        "4d12x10 T$"
      ],
      [
        "21-60",
        "1d4x100 T$"
      ],
      [
        "61-90",
        "1d8x10 TO"
      ],
      [
        "91-100",
        "1d3 riquezas menores"
      ]
    ],
    "itens": [
      [
        "01-25",
        "—"
      ],
      [
        "26-35",
        "Item diverso"
      ],
      [
        "36-60",
        "Equipamento"
      ],
      [
        "61-85",
        "1 poção"
      ],
      [
        "86-100",
        "Superior (1 melhoria)"
      ]
    ]
  },
  {
    "nd": "4",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-50",
        "1d6x100 T$"
      ],
      [
        "51-80",
        "1d12x100 T$"
      ],
      [
        "81-90",
        "1 riqueza menor +%"
      ],
      [
        "91-100",
        "1d3 riquezas menores +%"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-30",
        "Item diverso"
      ],
      [
        "31-55",
        "Equipamento 2D"
      ],
      [
        "56-80",
        "1 poção +%"
      ],
      [
        "81-100",
        "Superior (1 melhoria) 2D"
      ]
    ]
  },
  {
    "nd": "5",
    "dinheiro": [
      [
        "01-15",
        "—"
      ],
      [
        "16-65",
        "1d8x100 T$"
      ],
      [
        "66-95",
        "3d4x10 TO"
      ],
      [
        "96-100",
        "1 riqueza média"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-70",
        "1 poção"
      ],
      [
        "71-90",
        "Superior (1 melhoria)"
      ],
      [
        "91-100",
        "Superior (2 melhorias)"
      ]
    ]
  },
  {
    "nd": "6",
    "dinheiro": [
      [
        "01-15",
        "—"
      ],
      [
        "16-60",
        "2d6x100 T$"
      ],
      [
        "61-90",
        "2d10x100 T$"
      ],
      [
        "91-100",
        "1d3+1 riquezas menores"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-65",
        "1 poção +%"
      ],
      [
        "66-95",
        "Superior (1 melhoria)"
      ],
      [
        "96-100",
        "Superior (2 melhorias) 2D"
      ]
    ]
  },
  {
    "nd": "7",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-60",
        "2d8x100 T$"
      ],
      [
        "61-90",
        "2d12x10 TO"
      ],
      [
        "91-100",
        "1d4+1 riquezas menores"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-60",
        "1d3 poções"
      ],
      [
        "61-90",
        "Superior (2 melhorias)"
      ],
      [
        "91-100",
        "Superior (3 melhorias)"
      ]
    ]
  },
  {
    "nd": "8",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-55",
        "2d10x100 T$"
      ],
      [
        "56-95",
        "1d4+1 riquezas menores"
      ],
      [
        "96-100",
        "1 riqueza média+%"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-75",
        "1d3 poções"
      ],
      [
        "76-95",
        "Superior (2 melhorias)"
      ],
      [
        "96-100",
        "Superior (3 melhorias) 2D"
      ]
    ]
  },
  {
    "nd": "9",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-35",
        "1 riqueza média"
      ],
      [
        "36-85",
        "4d6x100 T$"
      ],
      [
        "86-100",
        "1d3 riquezas médias"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-70",
        "1 poção +%"
      ],
      [
        "71-95",
        "Superior (3 melhorias)"
      ],
      [
        "96-100",
        "Mágico (menor)"
      ]
    ]
  },
  {
    "nd": "10",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-30",
        "4d6x100 T$"
      ],
      [
        "31-85",
        "4d10x10 TO"
      ],
      [
        "86-100",
        "1d3+1 riquezas médias"
      ]
    ],
    "itens": [
      [
        "01-50",
        "—"
      ],
      [
        "51-75",
        "1d3+1 poções"
      ],
      [
        "76-90",
        "Superior (3 melhorias)"
      ],
      [
        "91-100",
        "Mágico (menor)"
      ]
    ]
  },
  {
    "nd": "11",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-45",
        "2d4x1.000 T$"
      ],
      [
        "46-85",
        "1d3 riquezas médias"
      ],
      [
        "86-100",
        "2d6x100 TO"
      ]
    ],
    "itens": [
      [
        "01-45",
        "—"
      ],
      [
        "46-70",
        "1d4+1 poções"
      ],
      [
        "71-90",
        "Superior (3 melhorias)"
      ],
      [
        "91-100",
        "Mágico (menor) 2D"
      ]
    ]
  },
  {
    "nd": "12",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-45",
        "1 riqueza média +%"
      ],
      [
        "46-80",
        "2d6x1.000 T$"
      ],
      [
        "81-100",
        "1d4+1 riquezas médias"
      ]
    ],
    "itens": [
      [
        "01-45",
        "—"
      ],
      [
        "46-70",
        "1d3+1 poções +%"
      ],
      [
        "71-85",
        "Superior (4 melhorias)"
      ],
      [
        "86-100",
        "Mágico (menor)"
      ]
    ]
  },
  {
    "nd": "13",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-45",
        "4d4x1.000 T$"
      ],
      [
        "46-80",
        "1d3+1 riquezas médias"
      ],
      [
        "81-100",
        "4d6x100 TO"
      ]
    ],
    "itens": [
      [
        "01-40",
        "—"
      ],
      [
        "41-65",
        "1d4+1 poções +%"
      ],
      [
        "66-95",
        "Superior (4 melhorias)"
      ],
      [
        "96-100",
        "Mágico (médio)"
      ]
    ]
  },
  {
    "nd": "14",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-45",
        "1d3+1 riquezas médias"
      ],
      [
        "46-80",
        "3d6x1.000 T$"
      ],
      [
        "81-100",
        "1 riqueza maior"
      ]
    ],
    "itens": [
      [
        "01-40",
        "—"
      ],
      [
        "41-65",
        "1d4+1 poções +%"
      ],
      [
        "66-90",
        "Superior (4 melhorias)"
      ],
      [
        "91-100",
        "Mágico (médio)"
      ]
    ]
  },
  {
    "nd": "15",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-45",
        "1 riqueza média+%"
      ],
      [
        "46-80",
        "2d10x1.000 T$"
      ],
      [
        "81-100",
        "1d4x1.000 TO"
      ]
    ],
    "itens": [
      [
        "01-35",
        "—"
      ],
      [
        "36-45",
        "1d6+1 poções"
      ],
      [
        "46-85",
        "Superior (4 melhorias) 2D"
      ],
      [
        "86-100",
        "Mágico (médio)"
      ]
    ]
  },
  {
    "nd": "16",
    "dinheiro": [
      [
        "01-10",
        "—"
      ],
      [
        "11-40",
        "3d6x1.000 T$"
      ],
      [
        "41-75",
        "3d10x100 TO"
      ],
      [
        "76-100",
        "1d3 riquezas maiores"
      ]
    ],
    "itens": [
      [
        "01-35",
        "—"
      ],
      [
        "36-45",
        "1d6+1 poções +%"
      ],
      [
        "46-80",
        "Superior (4 melhorias) 2D"
      ],
      [
        "81-100",
        "Mágico (médio)"
      ]
    ]
  },
  {
    "nd": "17",
    "dinheiro": [
      [
        "01-05",
        "—"
      ],
      [
        "06-40",
        "4d6x1.000 T$"
      ],
      [
        "41-75",
        "1d3 riquezas médias +%"
      ],
      [
        "76-100",
        "2d4x1.000 TO"
      ]
    ],
    "itens": [
      [
        "01-20",
        "—"
      ],
      [
        "21-40",
        "Mágico (menor)"
      ],
      [
        "41-80",
        "Mágico (médio)"
      ],
      [
        "81-100",
        "Mágico (maior)"
      ]
    ]
  },
  {
    "nd": "18",
    "dinheiro": [
      [
        "01-05",
        "—"
      ],
      [
        "06-40",
        "4d10x1.000 T$"
      ],
      [
        "41-75",
        "1 riqueza maior"
      ],
      [
        "76-100",
        "1d3+1 riquezas maiores"
      ]
    ],
    "itens": [
      [
        "01-15",
        "—"
      ],
      [
        "16-40",
        "Mágico (menor) 2D"
      ],
      [
        "41-70",
        "Mágico (médio)"
      ],
      [
        "71-100",
        "Mágico (maior)"
      ]
    ]
  },
  {
    "nd": "19",
    "dinheiro": [
      [
        "01-05",
        "—"
      ],
      [
        "06-40",
        "4d12x1.000 T$"
      ],
      [
        "41-75",
        "1 riqueza maior +%"
      ],
      [
        "76-100",
        "1d12x1.000 TO"
      ]
    ],
    "itens": [
      [
        "01-10",
        "—"
      ],
      [
        "11-40",
        "Mágico (menor) 2D"
      ],
      [
        "41-60",
        "Mágico (médio) 2D"
      ],
      [
        "61-100",
        "Mágico (maior)"
      ]
    ]
  },
  {
    "nd": "20",
    "dinheiro": [
      [
        "01-05",
        "—"
      ],
      [
        "06-40",
        "2d4x1.000 TO"
      ],
      [
        "41-75",
        "1d3 riquezas maiores"
      ],
      [
        "76-100",
        "1d3+1 riquezas maiores +%"
      ]
    ],
    "itens": [
      [
        "01-05",
        "—"
      ],
      [
        "06-40",
        "Mágico (menor) 2D"
      ],
      [
        "41-50",
        "Mágico (médio) 2D"
      ],
      [
        "51-100",
        "Mágico (maior) 2D"
      ]
    ]
  }
];


/* =========================================================
   BUSCAS (Livro Básico, Cap. 6 — Buscas)
   ========================================================= */

// Tabela 6-6: Desafios de Buscas (2d12 -> perícia sorteada + exemplo)
var BUSCA_DESAFIOS = {
  2:  { pericia: 'Misticismo',    exemplo: 'Decifrar uma runa' },
  3:  { pericia: 'Adestramento',  exemplo: 'Acalmar uma fera' },
  4:  { pericia: 'Conhecimento',  exemplo: 'Traduzir um texto antigo' },
  5:  { pericia: 'Enganação',     exemplo: 'Participar de uma intriga' },
  6:  { pericia: 'Cura',          exemplo: 'Tratar um veneno' },
  7:  { pericia: 'Iniciativa',    exemplo: 'Perseguir um bandido' },
  8:  { pericia: 'Intimidação',   exemplo: 'Negociar com um criminoso' },
  9:  { pericia: 'Investigação',  exemplo: 'Descobrir uma localização' },
  10: { pericia: 'Reflexos',      exemplo: 'Evitar um desmoronamento' },
  11: { pericia: 'Atletismo',     exemplo: 'Escalar um penhasco' },
  12: { pericia: 'Percepção',     exemplo: 'Evitar uma emboscada' },
  13: { pericia: 'Sobrevivência', exemplo: 'Atravessar os ermos' },
  14: { pericia: 'Fortitude',     exemplo: 'Tolerar clima ruim' },
  15: { pericia: 'Diplomacia',    exemplo: 'Negociar com um mercador' },
  16: { pericia: 'Furtividade',   exemplo: 'Infiltrar-se num lugar' },
  17: { pericia: 'Acrobacia',     exemplo: 'Atravessar uma ravina' },
  18: { pericia: 'Intuição',      exemplo: 'Elucidar um enigma' },
  19: { pericia: 'Vontade',       exemplo: 'Resistir a uma maldição' },
  20: { pericia: 'Luta',          exemplo: 'Defender-se de um monstro' },
  21: { pericia: 'Jogatina',      exemplo: 'Apostar com as fadas' },
  22: { pericia: 'Nobreza',       exemplo: 'Participar de um baile' },
  23: { pericia: 'Religião',      exemplo: 'Entender um presságio' },
  24: { pericia: 'Guerra',        exemplo: 'Atravessar um campo de batalha' }
};

// Tabela 6-7: Consequências de Buscas (sucessos -> castigos/recompensas)
var BUSCA_CONSEQUENCIAS = {
  0: { rotulo: '0 sucessos', castigos: 1, recompensas: 0 },
  1: { rotulo: '1 sucesso',  castigos: 0, recompensas: 0 },
  2: { rotulo: '2 sucessos', castigos: 0, recompensas: 1 },
  3: { rotulo: '3 sucessos', castigos: 0, recompensas: 2 }
};

// Tabela Recompensas & Castigos (1d6)
var BUSCA_TABELA_1D6 = [
  { // 1
    recompensa: { nome: 'Tesouro (riqueza)', desc: 'Você ganha uma riqueza, de acordo com seu nível.', tesouro: 'riqueza' },
    castigo:    { nome: 'Ruína (menor)', desc: 'Perde um quarto do dinheiro inicial do seu nível, em dinheiro ou itens (ou sofre Abalo, se não puder pagar).' }
  },
  { // 2
    recompensa: { nome: 'Favor', desc: 'Um NPC ou organização te deve um favor (ou a promessa de um), que o ajuda por uma cena.' },
    castigo:    { nome: 'Abalo', desc: 'Sua confiança é abalada: pontos de mana máximos −1 por nível de personagem na próxima aventura.' }
  },
  { // 3
    recompensa: { nome: 'Tesouro (item)', desc: 'Você ganha um item, de acordo com seu nível.', tesouro: 'item' },
    castigo:    { nome: 'Complicação', desc: 'Você sofre uma complicação que o afetará em algum momento futuro, a critério do mestre.' }
  },
  { // 4
    recompensa: { nome: 'Informação', desc: 'Você descobre uma informação valiosa relacionada à busca.' },
    castigo:    { nome: 'Ferimento', desc: 'Ferimento severo: pontos de vida máximos −1 por nível de personagem na próxima aventura. Cura não remove este efeito.' }
  },
  { // 5
    recompensa: { nome: 'Tesouro (ambos)', desc: 'Você ganha riqueza e item, de acordo com seu nível.', tesouro: 'ambos' },
    castigo:    { nome: 'Maldição', desc: 'Você sofre o efeito da magia Rogar Maldição na próxima aventura.' }
  },
  { // 6
    recompensa: { nome: 'Poder', desc: 'Você recebe um benefício de treinamento, definido aleatoriamente.' },
    castigo:    { nome: 'Ruína (maior)', desc: 'Perde metade do dinheiro inicial do seu nível, em dinheiro ou itens (ou sofre Abalo, se não puder pagar).' }
  }
];
