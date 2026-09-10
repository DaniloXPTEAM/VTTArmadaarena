const JORNADAS_DB = [
  {
    "nome": "Cavaleiro Sem Cabeça",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 10,
    "tipo": "Morto-vivo 8, médio",
    "iniciativa": "+9",
    "percepcao": "+8",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+10",
    "ref": "+9",
    "von": "+8",
    "defesaObs": "resistência a corte, fogo e perfuração 5, vulnerabilidade a frio",
    "pv": "48",
    "desl": "6m (4q)",
    "pm": "8",
    "atributos": {
      "for": "+5",
      "des": "+1",
      "con": "+2",
      "int": "0",
      "sab": "0",
      "car": "+3"
    },
    "ataques": [
      {
        "nome": "Montante",
        "tipo": "Corpo a Corpo",
        "bonus": "+13",
        "dano": "2d6+5, 19",
        "desc": "Corpo a Corpo Montante +13 (2d6+5, 19)"
      }
    ],
    "habilidades": [
      {
        "nome": "Apavorar",
        "tipo": "Padrão, 2 PM",
        "desc": "O comandante faz um teste de Intimidação oposto pela Vontade de todas as criaturas a escolha dele em Alcance Médio. Criaturas que falhem ficam Abaladas pelo resto da cena; criaturas que falhem por 10 ou mais ficam Apavoradas por 1d4 rodadas e Abaladas pelo resto da cena."
      },
      {
        "nome": "Desprezo pelo Medo",
        "tipo": "",
        "desc": "O comandante sofre metade do dano de ataques e efeitos de criaturas Abaladas ou Apavoradas."
      },
      {
        "nome": "Gritar Ordens",
        "tipo": "Livre, 1 PM+",
        "desc": "O comandante pode gastar até 4 PM. Até o início do próximo turno dele, todos os aliados em alcance curto recebem um bônus nos testes de perícia igual à quantidade de PM que ele gastou."
      }
    ],
    "pericias": [
      {
        "nome": "Intimidação",
        "valor": "+11"
      }
    ],
    "tesouro": "Padrão",
    "equipamento": "Meia-armadura, montante."
  },
  {
    "nome": "Comandante Sem Cabeça",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 11,
    "tipo": "Morto-vivo 8, médio",
    "iniciativa": "+9",
    "percepcao": "+8",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+10",
    "ref": "+9",
    "von": "+8",
    "defesaObs": "resistência a corte, fogo e perfuração 5, vulnerabilidade a frio",
    "pv": "48",
    "desl": "6m (4q)",
    "pm": "8",
    "atributos": {
      "for": "+5",
      "des": "+1",
      "con": "+2",
      "int": "0",
      "sab": "0",
      "car": "+3"
    },
    "ataques": [
      {
        "nome": "Montante",
        "tipo": "Corpo a Corpo",
        "bonus": "+13",
        "dano": "2d6+5",
        "desc": "crítico 19"
      }
    ],
    "habilidades": [
      {
        "nome": "Apavorar",
        "tipo": "Padrão, 2 PM",
        "desc": "O comandante faz um teste de Intimidação oposto pela Vontade de todas as criaturas a escolha dele em Alcance Médio. Criaturas que falhem ficam Abaladas pelo resto da cena; criaturas que falhem por 10 ou mais ficam Apavoradas por 1d4 rodadas e Abaladas pelo resto da cena."
      },
      {
        "nome": "Desprezo pelo Medo",
        "desc": "O comandante sofre metade do dano de ataques e efeitos de criaturas Abaladas ou Apavoradas."
      },
      {
        "nome": "Gritar Ordens",
        "tipo": "Livre, 1 PM+",
        "desc": "O comandante pode gastar até 4 PM. Até o início do próximo turno dele, todos os aliados em alcance curto recebem um bônus nos testes de perícia igual à quantidade de PM que ele gastou."
      }
    ],
    "pericias": [
      {
        "nome": "Intimidação",
        "valor": "+11"
      }
    ],
    "equipamento": "Meia-armadura, montante."
  },
  {
    "nome": "Corneteiros Amaldiçoados",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 11,
    "tipo": "Morto-vivo 1, médio",
    "iniciativa": "+0",
    "percepcao": "+0",
    "percepcaoObs": "visão no escuro",
    "defesa": "12",
    "fort": "+3",
    "ref": "+0",
    "von": "+0",
    "defesaObs": "resistência a corte, frio e perfuração 5",
    "pv": "6",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+1",
      "des": "-1",
      "con": "+2",
      "int": "—",
      "sab": "-1",
      "car": "+2"
    },
    "ataques": [
      {
        "nome": "Garra",
        "tipo": "Corpo a Corpo",
        "bonus": "+3",
        "dano": "1d4+1"
      }
    ],
    "habilidades": [
      {
        "nome": "Cacofonia Infernal",
        "tipo": "Padrão",
        "desc": "Todos os personagens a alcance Curto do corneteiro devem fazer um teste de Vontade (CD 12). Se falharem, devem fazer todo o possível para atacar o Corneteiro nessa rodada."
      }
    ],
    "equipamento": "Couro batido, corneta."
  },
  {
    "nome": "Efígie Animada",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 13,
    "tipo": "Construto 5, Grande",
    "iniciativa": "+4",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "17",
    "fort": "+8",
    "ref": "+4",
    "von": "+2",
    "defesaObs": "resistência a dano 5",
    "pv": "45",
    "desl": "9m (6q)",
    "ataques": [
      {
        "nome": "Corpo a Corpo",
        "tipo": "2 pancadas",
        "bonus": "+12",
        "dano": "1d8+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Imobilidade",
        "desc": "Uma efígie animada pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua."
      }
    ],
    "atributos": {
      "for": "+6",
      "des": "0",
      "con": "+4",
      "int": "-",
      "sab": "0",
      "car": "-5"
    },
    "tesouro": "Nenhum",
    "equipamento": "A tiara possui RD 5 e 15 PVs. Um teste de Intuição ou Misticismo CD 20 revelará que ela exerce algum tipo de controle sobre o mago. Para destruí-la, devem usar a manobra Quebrar (Tormenta20, p. 220) contra o mago."
  },
  {
    "nome": "Andrew, o Azul",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 14,
    "tipo": "Osteon 6, Médio",
    "iniciativa": "+7",
    "percepcao": "+3",
    "percepcaoObs": "visão no escuro",
    "defesa": "18",
    "fort": "+5",
    "ref": "+5",
    "von": "+5",
    "defesaObs": "resistência a corte, frio e perfuração 5",
    "pv": "30",
    "desl": "9m (6q)",
    "pm": "22",
    "atributos": {
      "for": "0",
      "des": "+2",
      "con": "+1",
      "int": "+4",
      "sab": "0",
      "car": "+1"
    },
    "ataques": [
      {
        "nome": "Raio Arcano",
        "tipo": "Padrão",
        "dano": "2d6+4 pontos de essência",
        "desc": "O alvo pode fazer um teste de Reflexos (CD 17) para reduzir o dano à metade."
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "Magias",
        "desc": "1º — Armadura Arcana (já contabilizado nas estatísticas acima), Seta Infalível de Talude; 2º — Conjurar Mortos-Vivos, Dissipar Magia. CD 17."
      }
    ],
    "pericias": [
      {
        "nome": "Misticismo",
        "valor": "+9"
      }
    ],
    "tesouro": "Dobro"
  },
  {
    "nome": "Pequena Chama",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 16,
    "tipo": "Espírito 2, pequeno",
    "iniciativa": "+4",
    "percepcao": "+0",
    "percepcaoObs": "percepção às cegas",
    "defesa": "13",
    "fort": "+3",
    "ref": "+4",
    "von": "+0",
    "defesaObs": "imunidade a fogo, vulnerabilidade a frio",
    "pv": "8",
    "desl": "9m (6q)",
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "Corpo a Corpo",
        "bonus": "+3",
        "dano": "1d6 de fogo"
      }
    ],
    "habilidades": [
      {
        "nome": "Incendiário",
        "desc": "No início de cada turno, todas as criaturas adjacentes à Pequena Chama sofrem 1d6 pontos de dano de fogo e devem realizar um teste de Reflexos CD 10. Se falharem, ficam em chamas (Tormenta20, p. 393)."
      }
    ],
    "atributos": {
      "for": "0",
      "des": "+1",
      "con": "0",
      "int": "-4",
      "sab": "-3",
      "car": "-3"
    },
    "tesouro": "Nenhum"
  },
  {
    "nome": "Nahtia, filha do vulcão",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 17,
    "tipo": "Humana 7, média",
    "iniciativa": "+8",
    "percepcao": "+6",
    "defesa": "16",
    "fort": "+6",
    "ref": "+8",
    "von": "+6",
    "defesaObs": "resistência a fogo 10",
    "pv": "35",
    "desl": "9m (6q)",
    "pm": "10",
    "atributos": {
      "for": "0",
      "des": "+5",
      "con": "+3",
      "int": "0",
      "sab": "+3",
      "car": "+2"
    },
    "ataques": [
      {
        "nome": "Ataque Desarmado",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d6+5"
      },
      {
        "nome": "Disparo Elemental",
        "tipo": "A Distância",
        "bonus": "+12",
        "dano": "1d6 de fogo",
        "desc": "Alvo deve realizar um teste de Reflexos CD 10; se falhar, fica em chamas."
      }
    ],
    "habilidades": [
      {
        "nome": "Defesa Elemental",
        "tipo": "Reação, 2 PM",
        "desc": "Nahtia bloqueia parte do ataque criando uma barreira de pedras. Sempre que sofre dano, Nahtia pode gastar 2 PM para reduzi-lo à metade."
      },
      {
        "nome": "Moldar a Terra",
        "tipo": "Completa, 3 PM",
        "desc": "Nahtia controla o solo ao seu redor, podendo amolecer, modelar ou solidificar um quadrado de 9m de lado, em alcance curto. Amolecer cria terreno difícil na área selecionada. Modelar permite criar um objeto simples de tamanho Enorme ou menor (porém sem mecanismos ou partes móveis), como uma parede, que pode oferecer cobertura total. Solidificar prende todas criaturas na área selecionada, deixando-as agarradas, mas estas podem se soltar com uma ação padrão e um teste bem-sucedido de Acrobacia ou Atletismo CD 16."
      }
    ],
    "equipamento": "Nenhum"
  },
  {
    "nome": "Bando de Camponeses",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 20,
    "tipo": "Humanoide Grande",
    "iniciativa": "+0",
    "percepcao": "+3",
    "defesa": "10",
    "fort": "+3",
    "ref": "+0",
    "von": "+1",
    "pv": "15",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+1",
      "des": "0",
      "con": "+1",
      "int": "0",
      "sab": "+1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Clava",
        "tipo": "Corpo a Corpo",
        "bonus": "+11",
        "dano": "2d6+2"
      }
    ],
    "habilidades": [
      {
        "nome": "Ataque em Bando",
        "desc": "Se um ataque do bando de camponeses exceder a Defesa do inimigo por 10 ou mais, ela causa o dobro do dano. Se um ataque errar, ele ainda assim causa metade do dano."
      },
      {
        "nome": "Forma Coletiva",
        "desc": "O bando de camponeses é imune a efeitos que afetam apenas uma criatura e não causam dano, como a magia Raio do Enfraquecimento, mas sofre 50% a mais de dano de efeitos de área, como uma Bola de Fogo. Um personagem com o poder Trespassar que acerte o bando pode fazer um ataque adicional."
      }
    ],
    "pericias": [
      {
        "nome": "Adestramento",
        "valor": "+2"
      },
      {
        "nome": "Ofício (fazendeiro)",
        "valor": "+2"
      }
    ],
    "equipamento": "Clava",
    "tesouro": "Nenhuma"
  },
  {
    "nome": "Sir Robert Perish",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 20,
    "tipo": "Humano Médio",
    "iniciativa": "+4",
    "percepcao": "+3",
    "defesa": "20",
    "fort": "+8",
    "ref": "+3",
    "von": "+3",
    "pv": "15",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+4",
      "des": "+1",
      "con": "+3",
      "int": "-1",
      "sab": "0",
      "car": "+2"
    },
    "ataques": [
      {
        "nome": "Espada Longa",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "1d8+4",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Escudo de Integridade",
        "desc": "Até o fim da cena, Sir Perish e todos seus aliados adjacentes recebem um bônus de +2 na Defesa."
      }
    ],
    "equipamento": "Escudo pesado, espada longa certeira, meia armadura, medalha de Khalmyr"
  },
  {
    "nome": "Quadro Animado",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 23,
    "tipo": "Construto Pequeno",
    "iniciativa": "+0",
    "percepcao": "+0",
    "percepcaoObs": "Se estiver completamente imóvel, uma personagem deve passar num teste de Percepção CD 35 para perceber que é uma criatura e não um quadro.",
    "defesa": "10",
    "fort": "+3",
    "ref": "-1",
    "von": "-4",
    "pv": "8",
    "desl": "3m (2q), escalada 3m (2q)",
    "atributos": {
      "for": "+1",
      "des": "-2",
      "con": "0",
      "int": "—",
      "sab": "-5",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "Corpo a Corpo",
        "bonus": "+5",
        "dano": "1d4+1",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Agarrar Aprimorado",
        "tipo": "livre",
        "desc": "Se o quadro animado acerta um ataque de pancada, pode fazer a manobra agarrar (bônus +6)."
      },
      {
        "nome": "Imobilidade",
        "tipo": "passiva",
        "desc": "Um quadro animado pode permanecer completamente imóvel, dificultando sua detecção (ver Percepção)."
      }
    ]
  },
  {
    "nome": "Gaspard Galuff",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 23,
    "tipo": "Humano Médio",
    "iniciativa": "+5",
    "percepcao": "+4",
    "defesa": "17",
    "fort": "+4",
    "ref": "+7",
    "von": "+4",
    "pv": "24",
    "desl": "9m (6q)",
    "atributos": {
      "for": "0",
      "des": "+2",
      "con": "+1",
      "int": "+1",
      "sab": "+1",
      "car": "+5"
    },
    "ataques": [
      {
        "nome": "Florete",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d6+5",
        "desc": "18"
      }
    ],
    "habilidades": [
      {
        "nome": "Desprezo",
        "tipo": "passiva",
        "desc": "Gaspard recebe +2 na Defesa e em testes de perícia contra criaturas inteligentes com Carisma menor que o dele."
      }
    ],
    "pericias": [
      {
        "nome": "Diplomacia",
        "valor": "+10"
      },
      {
        "nome": "Enganação",
        "valor": "+10"
      },
      {
        "nome": "Intuição",
        "valor": "+6"
      },
      {
        "nome": "Nobreza",
        "valor": "+6"
      }
    ],
    "equipamento": "Florete pungente, traje da corte e máscara do disfarce (idêntico à um chapéu do disfarce, mas o objeto sempre assume a forma de uma máscara)"
  },
  {
    "nome": "Sargento Sasha Heighel",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 23,
    "tipo": "Humana Média",
    "iniciativa": "+6",
    "percepcao": "+4",
    "defesa": "29",
    "fort": "+7",
    "ref": "+4",
    "von": "+4",
    "pv": "30",
    "desl": "9m (6q)",
    "pm": "10",
    "atributos": {
      "for": "+4",
      "des": "+1",
      "con": "+2",
      "int": "+4",
      "sab": "+1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Orgulho (espada bastarda formidável)",
        "tipo": "Corpo a Corpo",
        "bonus": "+11",
        "dano": "1d12+6",
        "desc": "19."
      },
      {
        "nome": "Preconceito (mangual veloz)",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d8+4",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Armas Conjuradas",
        "tipo": "livre, 2 PM",
        "desc": "Sasha invoca uma das armas abaixo, diretamente em suas mãos. A arma invocada dura pela cena ou até ser largada. • Orgulho (espada bastarda formidável) Ataque +11, dano 1d12+6, 19. • Preconceito (mangual veloz) Ataque +9, dano 1d8+4. Quando usar a ação atacar com esta arma, Sasha pode gastar 2 PM para realizar um ataque adicional com ela."
      }
    ],
    "equipamento": "Couraça reforçada, máscara elegante, trajes da corte"
  },
  {
    "nome": "Guardião de Portal",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 25,
    "tipo": "Construto Grande",
    "iniciativa": "+0",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+10",
    "ref": "+1",
    "von": "+3",
    "defesaObs": "imunidade a condições mentais e de medo, resistência a dano 5",
    "pv": "50",
    "desl": "3m (2q), escalada 3m (2q)",
    "atributos": {
      "for": "+6",
      "des": "-2",
      "con": "+5",
      "int": "—",
      "sab": "0",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Corpo a Corpo",
        "tipo": "2 pancadas",
        "bonus": "+11",
        "dano": "1d8+6",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Base sólida",
        "desc": "Um guardião de portal recebe +5 em testes para resistir a efeitos, como magias ou manobras, que tentem movê‑lo ou derrubá‑lo."
      },
      {
        "nome": "Golpe Atordoante",
        "desc": "Uma criatura que sofra dano da pancada do guardião de portal fica atordoada por uma rodada (Fortitude CD 20 evita)."
      }
    ],
    "tesouro": "Nenhum, mas o metal dele pode ser usado como um material especial para fabricar uma armadura pesada que fornece RD 2."
  },
  {
    "nome": "Tropa de Soldados Minotauros",
    "nd": "ND 2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 29,
    "tipo": "Minotauro Grande",
    "iniciativa": "+2",
    "percepcao": "+3",
    "percepcaoObs": "faro",
    "defesa": "16",
    "fort": "+5",
    "ref": "+2",
    "von": "+0",
    "pv": "40",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+3",
      "des": "+1",
      "con": "+2",
      "int": "-1",
      "sab": "-1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Espada curta",
        "tipo": "corpo a corpo",
        "bonus": "+16",
        "dano": "2d6+6",
        "desc": "19"
      },
      {
        "nome": "Chifres",
        "tipo": "corpo a corpo",
        "bonus": "+16",
        "dano": "2d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Ataque em Bando",
        "desc": "Se um ataque da tropa exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque errar, ainda causa metade do dano."
      },
      {
        "nome": "Forma Coletiva",
        "desc": "A tropa é imune a efeitos que afetam apenas uma criatura e não causam dano, como a magia Raio do Enfraquecimento, mas sofrem 50% a mais de dano de efeitos em área, como Bola de Fogo. Um personagem com o poder Trespassar que acerte a tropa pode fazer um ataque adicional contra ela."
      },
      {
        "nome": "Medo de Altura",
        "desc": "Se estiverem adjacentes a uma queda de 3m ou mais de altura (como um buraco ou penhasco), ficam abalados."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+5"
      }
    ],
    "equipamento": "Couro batido, escudo leve, espada curta.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Soldado Minotauro",
    "nd": "ND 1/3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 29,
    "tipo": "Minotauro Médio",
    "iniciativa": "+2",
    "percepcao": "+3",
    "percepcaoObs": "faro",
    "defesa": "16",
    "fort": "+5",
    "ref": "+2",
    "von": "+0",
    "pv": "8",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+3",
      "des": "+1",
      "con": "+2",
      "int": "-1",
      "sab": "-1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Espada curta",
        "tipo": "corpo a corpo",
        "bonus": "+6",
        "dano": "1d6+3",
        "desc": "19"
      },
      {
        "nome": "Chifres",
        "tipo": "corpo a corpo",
        "bonus": "+6",
        "dano": "1d6+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Medo de Altura",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o soldado minotauro fica abalado."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+5"
      }
    ],
    "equipamento": "Couro batido, escudo leve, espada curta.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Arqueiro Élfico",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 29,
    "tipo": "Elfo Médio",
    "iniciativa": "+3",
    "percepcao": "+5",
    "percepcaoObs": "visão na penumbra",
    "defesa": "15",
    "fort": "+2",
    "ref": "+5",
    "von": "+1",
    "pv": "6",
    "desl": "12m (6q)",
    "ataques": [
      {
        "nome": "Arco longo",
        "tipo": "à distância",
        "bonus": "+5",
        "dano": "1d8+1",
        "desc": "x3, alcance médio"
      }
    ],
    "atributos": {
      "for": "+1",
      "des": "+2",
      "con": "+1",
      "int": "+1",
      "sab": "0",
      "car": "-1"
    },
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+5"
      }
    ],
    "tesouro": "Nenhum.",
    "equipamento": "Arco longo, couro batido, flechas x30."
  },
  {
    "nome": "Centurião Favonius",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 30,
    "tipo": "Minotauro Médio",
    "iniciativa": "+4",
    "percepcao": "+7",
    "percepcaoObs": "faro",
    "defesa": "20",
    "fort": "+9",
    "ref": "+4",
    "von": "+2",
    "pv": "28",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+4",
      "des": "+1",
      "con": "+2",
      "int": "-1",
      "sab": "-1",
      "car": "+1"
    },
    "ataques": [
      {
        "nome": "Espada curta",
        "tipo": "corpo a corpo",
        "bonus": "+13",
        "dano": "1d6+4",
        "desc": "19"
      },
      {
        "nome": "Chifres",
        "tipo": "corpo a corpo",
        "bonus": "+11",
        "dano": "1d6+4",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Medo de Altura",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), centurião Favonius fica abalado."
      },
      {
        "nome": "Ordens (movimento)",
        "desc": "Favonius pode gritar ordens para seus aliados em alcance médio. Estes recebem +1 em testes de perícia até o fim da cena."
      }
    ],
    "equipamento": "Couraça banhada a ouro reforçada, escudo pesado, espada curta pungente, insígnia de família.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Cavaleiro Outonal",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 32,
    "tipo": "Espírito Médio",
    "iniciativa": "+4",
    "percepcao": "+6",
    "percepcaoObs": "visão no escuro",
    "defesa": "22",
    "fort": "+9",
    "ref": "+9",
    "von": "+14",
    "defesaObs": "imunidade a medo e sangramento",
    "pv": "85",
    "desl": "9m (6q)",
    "atributos": {
      "for": "+6",
      "des": "+1",
      "con": "+5",
      "int": "0",
      "sab": "+1",
      "car": "+2"
    },
    "ataques": [
      {
        "nome": "Montante",
        "tipo": "corpo a corpo",
        "bonus": "+14",
        "dano": "2d6+13",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Inimigo da Covardia",
        "desc": "O cavaleiro outonal recebe RD 5 e +2 em testes de ataque e rolagens de dano contra oponentes sob efeito de alguma condição de medo."
      },
      {
        "nome": "Testar Bravura",
        "tipo": "(Padrão)",
        "desc": "O cavaleiro outonal emite um brado assustador que dura até o fim da cena. Qualquer criatura que entre em alcance curto do cavaleiro outonal, ou inicie seu turno neste alcance, fica apavorada por 1d4 rodadas e depois abalada até o fim da cena (Vontade CD 17 reduz o efeito para abalado por 1d4 rodadas e faz com que a criatura não possa mais ser afetada por esta habilidade até o fim da cena)."
      },
      {
        "nome": "Varrer",
        "tipo": "(Livre)",
        "desc": "Uma vez por rodada, quando o cavaleiro outonal faz um ataque corpo a corpo e reduz os pontos de vida do alvo a 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
      }
    ],
    "pericias": [
      {
        "nome": "Cavalgar",
        "valor": "+11"
      }
    ],
    "equipamento": "Armadura completa reforçada e selada, montante atroz.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Feo-Wila",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 33,
    "tipo": "Sílfide Minúscula",
    "iniciativa": "+6",
    "percepcao": "+11",
    "percepcaoObs": "visão na penumbra",
    "defesa": "14",
    "fort": "+4",
    "ref": "+5",
    "von": "+15",
    "pv": "35",
    "desl": "9m (6q), voo 12m (8q)",
    "pm": "41",
    "atributos": {
      "for": "-1",
      "des": "+2",
      "con": "+1",
      "int": "0",
      "sab": "0",
      "car": "+5"
    },
    "ataques": [
      {
        "nome": "Adaga",
        "tipo": "Corpo a corpo",
        "bonus": "+5",
        "dano": "1d3+2, 19"
      }
    ],
    "habilidades": [
      {
        "nome": "Animar Decoração",
        "tipo": "Completa, 3 PM",
        "desc": "Feo-Wila anima dois objetos que funcionam como aliados iniciantes, cada um de um tipo diferente a escolha dela, entre fortão, guardião ou montaria (cavalo). A combinação mais comum é um guardião (+2 em Defesa) e um fortão (+1d8 em rolagens de dano corpo a corpo). Os objetos animados permanecem até o fim da cena ou até serem sacrificados."
      },
      {
        "nome": "Sacrificar Servo",
        "tipo": "Reação",
        "desc": "Quando sofre dano, a fada pode sacrificar um de seus objetos animados pela habilidade Animar Decoração para reduzir esse dano a 0."
      },
      {
        "nome": "Magias",
        "tipo": "Conjurador (5º nível)",
        "desc": "Feo-Wila lança magias como um conjurador arcano de 5º nível (CD 17, 19 para encantamento e ilusão)."
      },
      {
        "nome": "Adaga Mental",
        "tipo": "Padrão, 5 PM",
        "desc": "Uma criatura em alcance curto sofre 4d6 pontos de dano mental e fica pasma por uma rodada (Von CD 19 reduz o dano à metade e evita a condição pasmo e a criatura não pode mais ficar pasma por esta magia até o fim da cena)."
      },
      {
        "nome": "Imagem Espelhada",
        "tipo": "Livre, 5 PM",
        "desc": "Feo-Wila cria três cópias ilusórias e recebe +6 na Defesa, mas cada vez que um ataque contra ela erra, uma das imagens desaparece e o bônus na Defesa diminui em 2."
      },
      {
        "nome": "Sono",
        "tipo": "Padrão, 5 PM",
        "desc": "Criaturas de 5º nível ou menos em um quadrado com 3m de lado à distância curta ficam inconscientes e caídas (Von CD 19 muda para fatigadas por uma rodada)."
      },
      {
        "nome": "Outras Magias",
        "tipo": "—",
        "desc": "1º — Conjurar Monstro, Criar Ilusão*, Disfarce Ilusório*, Hipnotismo*; 2º — Marca da Obediência*."
      }
    ],
    "pericias": [
      {
        "nome": "Conhecimento",
        "valor": "+3"
      },
      {
        "nome": "Enganação",
        "valor": "+11"
      },
      {
        "nome": "Misticismo",
        "valor": "+11"
      }
    ],
    "equipamento": "Adaga banhada a ouro e cravejada de gemas, essência de mana."
  },
  {
    "nome": "Elfo Saqueador",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 35,
    "tipo": "Elfo Médio",
    "iniciativa": "+5",
    "percepcao": "+4",
    "percepcaoObs": "visão na penumbra",
    "defesa": "15",
    "fort": "+0",
    "ref": "+3",
    "von": "+0",
    "pv": "6",
    "desl": "12m (8q)",
    "atributos": {
      "for": "+1",
      "des": "+3",
      "con": "0",
      "int": "0",
      "sab": "0",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Arco Curto",
        "tipo": "À distância",
        "bonus": "+6",
        "dano": "1d6+3",
        "desc": "x3"
      }
    ],
    "habilidades": [
      {
        "nome": "Arqueiro Experiente",
        "tipo": "",
        "desc": "O elfo saqueador não sofre a penalidade de –5 em testes de ataque por atacar oponentes envolvidos em combate corpo a corpo."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+5"
      }
    ],
    "equipamento": "Arco curto, armadura de couro.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Faelyrin",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 35,
    "tipo": "Elfo Médio",
    "iniciativa": "+9",
    "percepcao": "+7",
    "percepcaoObs": "visão na penumbra",
    "defesa": "21",
    "fort": "+5",
    "ref": "+13",
    "von": "+4",
    "pv": "64",
    "desl": "12m (8q)",
    "atributos": {
      "for": "+1",
      "des": "+6",
      "con": "+2",
      "int": "+2",
      "sab": "+2",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Cimitarra certeira x2",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+6",
        "desc": "18"
      }
    ],
    "habilidades": [
      {
        "nome": "Esgrima Élfica",
        "tipo": "reação",
        "desc": "Uma vez por rodada, quando é atingido por um ataque corpo a corpo, Faelyrin pode fazer um teste de ataque com um bônus de +2. Se o resultado for maior que o teste de ataque que o acertou, o ataque é evitado e Faelyrin pode efetuar um ataque corpo a corpo contra seu oponente."
      }
    ],
    "equipamento": "Cimitarra certeira x2, couraça ajustada.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Oficial Klaus",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 39,
    "tipo": "Humano Médio",
    "iniciativa": "+5",
    "percepcao": "+0",
    "defesa": "19",
    "fort": "+0",
    "ref": "+5",
    "von": "+10",
    "pv": "35",
    "desl": "6m (4q)",
    "atributos": {
      "for": "+3",
      "des": "+2",
      "con": "+2",
      "int": "-1",
      "sab": "-1",
      "car": "+2"
    },
    "ataques": [
      {
        "nome": "Espada bastarda",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "1d10+3",
        "desc": "19"
      },
      {
        "nome": "Besta leve",
        "tipo": "À distância",
        "bonus": "+9",
        "dano": "1d8+7",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Tiro Desleal",
        "desc": "Klaus não sofre penalidade em ataques à distância contra alvos envolvidos em combate corpo a corpo com seus aliados. Além disso, uma criatura atingida por um disparo da besta leve de Klaus fica lenta e fraca por uma rodada (Fortitude CD 16 evita) devido a um veneno que ele aplica em suas flechas."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+8"
      },
      {
        "nome": "Intuição",
        "valor": "+2"
      }
    ],
    "equipamento": "Besta leve, escudo leve, espada bastarda, meia armadura, virotes envenenados x10"
  },
  {
    "nome": "Javaporco Gigante",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 41,
    "tipo": "Animal Grande",
    "iniciativa": "+2",
    "percepcao": "+3",
    "percepcaoObs": "faro visão na penumbra",
    "defesa": "16",
    "fort": "+10",
    "ref": "+5",
    "von": "+2",
    "pv": "32",
    "desl": "12m (8q)",
    "atributos": {
      "for": "+3",
      "des": "0",
      "con": "+4",
      "int": "-4",
      "sab": "+1",
      "car": "-3"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corPo a corPo",
        "bonus": "+8",
        "dano": "1d8+8"
      }
    ],
    "habilidades": [
      {
        "nome": "retalIação feroz",
        "desc": "Se o javaporco sofrer dano, ele recebe +2 em testes de ataque e rolagens de dano até o fim de seu próximo turno."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+2"
      }
    ],
    "tesouro": "Nenhum"
  },
  {
    "nome": "Madhallaidh de Allihanna",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 42,
    "tipo": "Elfa Média",
    "iniciativa": "+5",
    "percepcao": "+8",
    "percepcaoObs": "visão na penumbra",
    "defesa": "21",
    "fort": "+2",
    "ref": "+7",
    "von": "+13",
    "pv": "48",
    "desl": "12m (8q)",
    "pm": "23",
    "atributos": {
      "for": "+2",
      "des": "+4",
      "con": "+2",
      "int": "+1",
      "sab": "+5",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Lança",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+10"
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "desc": "Madhallaidh lança magias como uma druida de 4º nível (CD 17)."
      },
      {
        "nome": "Controlar Plantas",
        "desc": "Controlar Plantas (Padrão, 2 PM) Plantas se enroscam nas criaturas dentro de um quadrado com 9m de lado, tornando-as enredadas e imóveis. Além disso, a área é considerada terreno difícil, e no início dos turnos de Madhallaidh a vegetação tenta enredar novamente qualquer criatura em sua área. Reflexos evita que fique enredado e imóvel, e se libertar requer uma ação padrão e um teste de Acrobacia ou Atletismo."
      },
      {
        "nome": "Despedaçar",
        "desc": "Despedaçar (Padrão, 3 PM) Esta magia emite um som alto e agudo, causando 2d8+4 pontos de dano de impacto contra uma criatura a alcance curto. Construtos sofrem o dobro do dano e objetos inanimados são destruídos. Fortitude reduz o dano à metade e Reflexos anula o efeito contra objetos."
      },
      {
        "nome": "Outras Magias",
        "desc": "Outras Magias 1ª — Curar Ferimentos, Escudo da Fé ( já contabilizado)."
      }
    ],
    "pericias": [
      {
        "nome": "Religião",
        "valor": "+11"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+8"
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Haggar",
    "nd": "ND 2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 42,
    "tipo": "Mestre da caça",
    "iniciativa": "+7",
    "percepcao": "+7",
    "defesa": "19",
    "fort": "+9",
    "ref": "+13",
    "von": "+2",
    "pv": "72",
    "desl": "9m (6q)",
    "ataques": [
      {
        "nome": "Duas machadinhas",
        "tipo": "corPo a corPo",
        "bonus": "+12",
        "dano": "(1d6+6, x3)"
      },
      {
        "nome": "Arco longo",
        "tipo": "À DIstâncIa",
        "bonus": "+14",
        "dano": "(1d8+14, x3)"
      }
    ],
    "habilidades": [
      {
        "nome": "bater com tuDo",
        "tipo": "comPleta",
        "desc": "Haggar executa seus dois ataques com machadinha, troca de armas e executa um terceiro ataque com seu arco longo, sem sofrer penalidade por fazer um ataque a distância contra um alvo envolvido em combate corpo a corpo. Ele não pode usar esta habilidade novamente até gastar uma ação de movimento para trocar suas armas novamente."
      },
      {
        "nome": "marca Da Presa",
        "tipo": "movImento",
        "desc": "Haggar analisa uma criatura em alcance curto. Até o final da cena, ele recebe +1d4 em rolagens de dano contra essa criatura. Ele só pode ter uma presa marcada desta forma por vez."
      },
      {
        "nome": "Aliado Veterano",
        "tipo": "",
        "desc": "Um caçador experiente, Haggar ensinou gerações dos jovens locais. Como aliado, ele concede +2 em Percepção e Sobrevivência, e a habilidade de caçador Marca da Presa. Caso o personagem já a possua, seu dano progride em um grau (veja a progressão desta habilidade no caçador)."
      }
    ],
    "pericias": [
      {
        "nome": "Sobrevivência",
        "valor": "+10"
      }
    ],
    "equipamento": "Tiro Certo (arco longo pungente), couro batido reforçado, duas machadinhas.",
    "tesouro": "Padrão",
    "atributos": {
      "for": "+3",
      "des": "0",
      "con": "+4",
      "int": "-4",
      "sab": "+1",
      "car": "-3"
    }
  },
  {
    "nome": "Bando de Cães da Cólera",
    "nd": "ND 4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 44,
    "tipo": "Espírito (bando) Grande",
    "iniciativa": "+8",
    "percepcao": "+8",
    "percepcaoObs": "faro",
    "defesa": "15",
    "fort": "+8",
    "ref": "+8",
    "von": "+5",
    "pv": "50",
    "desl": "12m (8q)",
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corPo a corPo",
        "bonus": "+12",
        "dano": "2d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Ataque em Bando",
        "desc": "Se um ataque dos cães da cólera exceder a Defesa do inimigo por 10 ou mais, causa o dobro do dano (inclusive bônus numéricos e dados extras). Se um ataque errar, ainda assim causa metade do dano."
      },
      {
        "nome": "forma coletIva",
        "desc": "O bando de cães da cólera é imune a efeitos que afetam apenas uma criatura e não causam dano, como a magia Raio do Enfraquecimento, mas sofre 50% a mais de dano de efeitos de área, como uma Bola de Fogo. Um personagem com o poder Trespassar que acertá-los pode usar este poder uma vez por turno, pagando seu custo normal."
      },
      {
        "nome": "InvIsIbIlIDaDe",
        "tipo": "movImento",
        "desc": "Os cães da cólera tornam-se completamente invisíveis. Eles recebem camuflagem total, +10, em testes de Furtividade contra ouvir e criaturas que não possam vê-los ficam desprevenidas contra seus ataques. Este efeito termina se fizerem uma ação hostil contra uma criatura, como a ação agredir. Recarga (padrão)."
      }
    ],
    "atributos": {
      "for": "3",
      "des": "2",
      "con": "2",
      "int": "-3",
      "sab": "2",
      "car": "-1"
    },
    "tesouro": "Nenhum."
  },
  {
    "nome": "Hesti, Chama-Viva",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 45,
    "tipo": "Espírito Pequeno",
    "iniciativa": "+7",
    "percepcao": "+4",
    "defesa": "24",
    "fort": "+10",
    "ref": "+16",
    "von": "+5",
    "defesaObs": "imunidade a fogo, vulnerabilidade a frio",
    "pv": "70",
    "desl": "3m (2q)",
    "ataques": [
      {
        "nome": "Duas labaredas",
        "tipo": "corpo a corpo",
        "bonus": "+14",
        "dano": "2d6+10 fogo"
      }
    ],
    "habilidades": [
      {
        "nome": "Agarrar aprimorado",
        "desc": "Se acertar uma criatura com uma de suas labaredas, Hesti poderá fazer uma manobra de agarrar como uma ação livre (teste +16)."
      },
      {
        "nome": "Aura de calor",
        "desc": "No início de cada turno de Hesti, todas as criaturas a até 9m sofrem 2d6 pontos de dano de fogo. Além disso, Hesti tem camuflagem contra todos os ataques."
      }
    ],
    "atributos": {
      "for": "0",
      "des": "3",
      "con": "3",
      "int": "-1",
      "sab": "0",
      "car": "2"
    },
    "tesouro": "Nenhum"
  },
  {
    "nome": "Carvão Animado",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 45,
    "tipo": "Construto Minúsculo",
    "iniciativa": "-1",
    "percepcao": "+4",
    "percepcaoObs": "percepção às cegas",
    "defesa": "11",
    "fort": "+6",
    "ref": "-1",
    "von": "+3",
    "defesaObs": "redução de dano 2, vulnerabilidade a fogo",
    "pv": "7",
    "desl": "1,5m (1q)",
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+10"
      }
    ],
    "atributos": {
      "for": "1",
      "des": "-3",
      "con": "4",
      "int": "–",
      "sab": "2",
      "car": "-4"
    },
    "habilidades": [
      {
        "nome": "PeganDo fogo",
        "desc": "Caso sofra dano de fogo, o carvão animado entra em combustão, queimando a si mesmo e todos ao seu redor. Criaturas adjacentes à criatura ficam em chamas (Reflexos CD 13 evita a condição)."
      }
    ],
    "tesouro": "Nenhum"
  },
  {
    "nome": "Esfera Alquímica",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 47,
    "tipo": "Monstro Grande",
    "iniciativa": "+0",
    "percepcao": "+3",
    "defesa": "19",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "imunidade à críticos e ácido",
    "pv": "63",
    "desl": "6m (4q)",
    "percepcaoObs": "percepção às cegas",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "4",
      "int": "–",
      "sab": "1",
      "car": "–4"
    },
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "2d6+5, mais 1d6 de ácido"
      }
    ],
    "habilidades": [
      {
        "nome": "Composição Perigosa",
        "tipo": "PADRÃO",
        "desc": "No interior da esfera existem poções flutuando que a criatura, após anos de exposição, é capaz de utilizar em combate. • Granada de Área Escorregadia. Criaturas adjacentes à esfera ficam caídas (Reflexos CD 16 evita). Pelo resto da cena, criaturas que se movam na área adjacente à esfera devem fazer um teste de Acrobacia (CD 10) para não cair novamente. • Granada de Explosão de Chamas. Cria um cone de chamas de 6m. Criaturas na área sofrem 3d6 pontos de dano de fogo (Reflexos CD 16 reduz o dano à metade). • Poção de Curar Ferimentos. A esfera alquímica recupera 3d8+3 pontos de vida."
      },
      {
        "nome": "Corpo Corrosivo",
        "desc": "Feito de um material instável e quase líquido, a esfera alquímica pode entrar no espaço ocupado por outras criaturas. No fim do turno dela, causa 1d6 pontos de dano de ácido a qualquer um que esteja em seu espaço, automaticamente. Além disso, quando ela está parada, se torna difícil de ser vista, recebendo um bônus de +10 em seus testes de Furtividade para ser percebida fora de combate."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+4"
      }
    ],
    "tesouro": "Padrão, mais 1d3 poções."
  },
  {
    "nome": "Magatixa",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 47,
    "tipo": "Monstro Minúsculo",
    "iniciativa": "+9",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "13",
    "fort": "+0",
    "ref": "+3",
    "von": "-2",
    "pv": "6",
    "desl": "12m (8q), escalada 12m (8q)",
    "atributos": {
      "for": "-3",
      "des": "5",
      "con": "1",
      "int": "1",
      "sab": "0",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Crista",
        "tipo": "corpo a corpo",
        "bonus": "+7",
        "dano": "1d4+3",
        "desc": "19, corte"
      }
    ],
    "habilidades": [
      {
        "nome": "Devoradora de Magia",
        "tipo": "completa",
        "desc": "Magatixas são conhecidas por entrar em bolsas de aventureiros e comer pergaminhos mágicos, devorar itens alquímicos ou beber poções. A magatixa pode consumir uma poção, pergaminho ou preparado alquímico de uma criatura adjacente."
      },
      {
        "nome": "Flato Disruptivo",
        "tipo": "livre",
        "desc": "A magatixa solta um flato capaz de tirar a concentração de usuários de magia. Toda vez que alguém for lançar uma magia à alcance curto da magatixa, deve fazer um teste de Vontade contra CD 15 + custo em PM da magia. Se falhar, a magia é perdida, mas os PM são gastos mesmo assim."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+7"
      },
      {
        "nome": "Misticismo",
        "valor": "+10"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+4"
      }
    ],
    "tesouro": "Dobro (sempre itens alquímicos)"
  },
  {
    "nome": "Canceronte de Guarda",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 50,
    "tipo": "Animal Grande",
    "iniciativa": "+3",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "22",
    "fort": "+13",
    "ref": "+2",
    "von": "+7",
    "defesaObs": "redução de dano 5/impacto",
    "pv": "50",
    "desl": "6m (4q), natação 12m (8q)",
    "atributos": {
      "for": "4",
      "des": "0",
      "con": "4",
      "int": "-5",
      "sab": "1",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Duas pinças",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d10+5"
      }
    ],
    "habilidades": [
      {
        "nome": "agarrar aprimorado",
        "tipo": "livre",
        "desc": "Se o canceronte acertar um ataque de pinça, pode fazer a manobra agarrar (teste +14)."
      }
    ],
    "tesouro": "Nenhum, mas sua carne pode ser vendida por T$ 100 ou usada de matéria-prima para uma grande refeição que pode ser dividida pelo grupo, fornecendo +2 PV temporários a todos."
  },
  {
    "nome": "Capitão Rothger",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 51,
    "tipo": "Humanoide (tritão) Médio",
    "iniciativa": "+12",
    "percepcao": "+9",
    "defesa": "19",
    "fort": "+8",
    "ref": "+11",
    "von": "+3",
    "pv": "70",
    "desl": "9m (6q), natação 12m (8q)",
    "atributos": {
      "for": "5",
      "des": "4",
      "con": "2",
      "int": "-1",
      "sab": "1",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Machado de guerra",
        "tipo": "corpo a corpo",
        "bonus": "+14",
        "dano": "1d12+13",
        "desc": "x4"
      }
    ],
    "habilidades": [
      {
        "nome": "Assustar",
        "tipo": "Padrão",
        "desc": "O capitão Rothger faz um teste de Intimidação oposto pela Vontade de uma criatura em alcance curto. Se o resultado for maior que a Vontade da criatura, ela fica abalada pelo resto da cena, e se passar por 10 pontos ou mais, a criatura fica apavorada por uma rodada e abalada pelo resto da cena."
      },
      {
        "nome": "Grito Despedaçador",
        "tipo": "Padrão",
        "desc": "Um alvo em alcance curto sofre 1d8+2 pontos de dano de impacto e fica atordoado (Fortitude CD 16 reduz o dano à metade e evita a condição)."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+12"
      },
      {
        "nome": "Atletismo",
        "valor": "+8"
      },
      {
        "nome": "Intimidação",
        "valor": "+11"
      },
      {
        "nome": "Pilotagem",
        "valor": "+12"
      }
    ],
    "equipamento": "Couro batido, machado de guerra cruel",
    "tesouro": "Padrão"
  },
  {
    "nome": "Legionário Inexperiente",
    "nd": "ND 1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 53,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+0",
    "percepcao": "+1",
    "percepcaoObs": "faro",
    "defesa": "13",
    "fort": "+5",
    "ref": "–1",
    "von": "+3",
    "pv": "8",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "2",
      "int": "0",
      "sab": "–1",
      "car": "–1"
    },
    "ataques": [
      {
        "nome": "Chifres",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+3"
      },
      {
        "nome": "Lança",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+3"
      },
      {
        "nome": "Azagaia",
        "tipo": "distância",
        "bonus": "+7",
        "dano": "1d6"
      }
    ],
    "habilidades": [
      {
        "nome": "falange (movImento)",
        "tipo": "movimento",
        "desc": "Se o legionário inexperiente estiver usando um escudo e adjacente a um aliado com esta habilidade, ele pode formar uma falange com esse aliado. Enquanto estiverem adjacentes um ao outro, os participantes da falange recebem +2 na Defesa e em testes de resistência."
      }
    ],
    "equipamento": "Couro batido, escudo leve e lança.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Decúria de Legionários Inexperientes",
    "nd": "ND 4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 53,
    "tipo": "Humanoide (minotauro) Grande",
    "iniciativa": "+2",
    "percepcao": "+3",
    "percepcaoObs": "faro",
    "defesa": "13",
    "fort": "+7",
    "ref": "+1",
    "von": "+5",
    "pv": "40",
    "desl": "9m (6q)",
    "atributos": {
      "for": "2",
      "des": "1",
      "con": "2",
      "int": "0",
      "sab": "0",
      "car": "–1"
    },
    "ataques": [
      {
        "nome": "Maça",
        "tipo": "corpo a corpo",
        "bonus": "+6",
        "dano": "1d8+2"
      }
    ],
    "habilidades": [
      {
        "nome": "ataque em banDo",
        "tipo": "grupo",
        "desc": "Se um ataque da decúria exceder a Defesa do inimigo por 10 ou mais, causa o dobro do dano (inclusive bônus numéricos e dados extras). Se um ataque da decúria errar, ela ainda assim causa metade do dano."
      },
      {
        "nome": "banDo",
        "tipo": "grupo",
        "desc": "10 legionários inexperientes."
      },
      {
        "nome": "falange (movImento)",
        "tipo": "movimento",
        "desc": "Se a decúria estiver usando escudo, pode formar uma falange consigo mesma e com aliados adjacentes com esta habilidade. Enquanto estiver em falange, recebem +2 na Defesa e em testes de resistência."
      }
    ]
  },
  {
    "nome": "Secundus Enfurecido",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 54,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+3",
    "percepcao": "+0",
    "percepcaoObs": "faro",
    "defesa": "16",
    "fort": "+11",
    "ref": "+5",
    "von": "+0",
    "pv": "60",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "1",
      "con": "2",
      "int": "2",
      "sab": "0",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Ataque desarmado",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+4",
        "desc": "x2"
      },
      {
        "nome": "Chifres",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+4"
      }
    ],
    "habilidades": [
      {
        "nome": "Marrada Potente",
        "tipo": "livre",
        "desc": "Se Secundus acerta um ataque com chifres, faz a manobra empurrar (teste +11)."
      },
      {
        "nome": "Punhos Desnorteantes",
        "desc": "Quando Secundus acerta um ataque desarmado, a vítima deste fica enjoada por uma rodada (Fortitude CD 14 evita). Se passar no teste, fica imune a essa habilidade por um dia."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Turba de Foliões Zumbis",
    "tipo": "Morto-vivo (bando) Grande",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 56,
    "iniciativa": "+1",
    "percepcao": "+1",
    "percepcaoObs": "visão no escuro",
    "defesa": "11",
    "fort": "+5",
    "ref": "+1",
    "von": "+1",
    "defesaObs": "",
    "pv": "100",
    "desl": "6m (4q)",
    "pm": "0",
    "atributos": {
      "for": "3",
      "des": "-1",
      "con": "3",
      "int": "-",
      "sab": "-1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "[Bando] Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+17",
        "dano": "2d6+12",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Bando",
        "tipo": "Qualidade",
        "desc": "A turba é formada por um grupo de zumbis. Se um ataque da turba exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque da turba errar, ele ainda assim causa metade do dano. A turba é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Um personagem com o poder Trespassar que acerte a turba pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
      },
      {
        "nome": "Fraqueza Zumbi",
        "tipo": "Qualidade",
        "desc": "A turba zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seus cérebros (Defesa 21)."
      },
      {
        "nome": "Mortos Muito Loucos",
        "desc": "Apesar de possuírem inteligência nula, os zumbis foliões não são imunes a efeitos mentais, e sofrem –5 em testes de resistência contra Músicas de Bardo."
      },
      {
        "nome": "Um de Nós! (Movimento)",
        "desc": "Se os zumbis começarem seu turno adjacentes a uma criatura morta, o absorverão para sua massa, ganhando +10 PV."
      }
    ],
    "pericias": [],
    "tesouro": "Nenhum"
  },
  {
    "nome": "Bando de Guardas",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 59,
    "tipo": "Humanoide (humano) Grande (lacaio)",
    "iniciativa": "+6",
    "percepcao": "+5",
    "defesa": "15",
    "fort": "+7",
    "ref": "+4",
    "von": "+3",
    "pv": "40",
    "desl": "9m (6q)",
    "atributos": {
      "for": "2",
      "des": "1",
      "con": "2",
      "int": "0",
      "sab": "0",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Maça",
        "tipo": "corpo a corpo",
        "bonus": "+17",
        "dano": "2d8+10",
        "desc": null
      }
    ],
    "habilidades": [
      {
        "nome": "Ataque em Bando",
        "tipo": "especial",
        "desc": "Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano."
      },
      {
        "nome": "Forma Coletiva",
        "tipo": "especial",
        "desc": "O bando é imune a efeitos que afetam apenas uma criatura e não causam dano, como a magia raio do enfraquecimento, mas sofre 50% a mais de dano de efeitos de área, como uma bola de fogo. Um personagem com o poder Trespassar que acerte um bando pode fazer um ataque adicional."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+7"
      }
    ],
    "equipamento": "Apito, couro batido, maça (1d8 de cada).",
    "tesouro": "nenhum"
  },
  {
    "nome": "Golem-Réplica",
    "nd": "8",
    "fonte": "Breves Jornadas",
    "paginaPdf": 59,
    "tipo": "Construto Médio (especialista)",
    "iniciativa": "+14",
    "percepcao": "+11",
    "percepcaoObs": "visão no escuro",
    "defesa": "31",
    "defesaObs": "imunidade a veneno, redução de dano 5",
    "fort": "+8",
    "ref": "+21",
    "von": "+15",
    "pv": "224",
    "desl": "9m (6q)",
    "atributos": {
      "for": "4",
      "des": "4",
      "con": "2",
      "int": "3",
      "sab": "1",
      "car": "6"
    },
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "corpo a corpo",
        "bonus": "+22",
        "dano": "1d8+15",
        "desc": "mais veneno"
      }
    ],
    "habilidades": [
      {
        "nome": "Ataque furtivo",
        "tipo": "especial",
        "desc": "Uma vez por rodada, o golem-réplica causa +2d8 pontos de dano com ataques corpo a corpo, contra alvos desprevenidos ou que estejam flanqueandos."
      },
      {
        "nome": "Falsa inocência",
        "tipo": "especial",
        "desc": "Na primeira rodada do combate, todos inimigos do golem ficam surpreendidos."
      },
      {
        "nome": "Finta Aprimorada",
        "tipo": "especial (livre)",
        "desc": "Uma vez por rodada, o golem faz uma finta como ação livre."
      },
      {
        "nome": "Impostor",
        "tipo": "especial",
        "desc": "O golem substitui testes de perícias baseadas em Car, Int ou Sab por Enganação."
      },
      {
        "nome": "Veneno (Peçonha concentrada)",
        "tipo": "veneno",
        "desc": "Perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 28 reduz a duração para uma rodada."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+19"
      }
    ],
    "tesouro": "Dobro"
  },
  {
    "nome": "Lester, alquimista de guerra",
    "nd": "ND 1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 62,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+3",
    "percepcao": "+1",
    "defesa": "14",
    "fort": "+7",
    "ref": "+11",
    "von": "+0",
    "pv": "30",
    "desl": "9m (6q)",
    "atributos": {
      "for": "0",
      "des": "3",
      "con": "1",
      "int": "4",
      "sab": "-1",
      "car": "1"
    },
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+5"
      },
      {
        "nome": "Misticismo",
        "valor": "+8"
      },
      {
        "nome": "Ofício (Alquimia)",
        "valor": "+8"
      }
    ],
    "ataques": [
      {
        "nome": "Besta leve",
        "tipo": "distância",
        "bonus": "+5",
        "dano": "1d8",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Leque Cromático",
        "tipo": "",
        "desc": "Um cone de 4,5m surge, deixando animais e humanoides no interior atordoados por 1 rodada e ofuscados e vulneráveis pela cena (Vontade anula o atordoamento). Uma criatura só pode ser atordoada dessa forma uma vez por cena."
      },
      {
        "nome": "Névoa",
        "tipo": "",
        "desc": "Uma nuvem verde cáustica e espessa, com 6m de raio e 6m de altura, faz com que criaturas a até 1,5m tenham camuflagem leve e criaturas a partir de 3m tenham camuflagem total. Além disso, todas as criaturas no interior sofrem 2d4 pontos de dano de ácido."
      },
      {
        "nome": "Ódio Puro",
        "tipo": "",
        "desc": "Lester recebe +5 em Vontade quando está seguindo ordens de um purista com ND maior e +2 em rolagens de dano contra humanoides não humanos."
      },
      {
        "nome": "Alquimista Veterano",
        "tipo": "",
        "desc": "Todos os itens alquímicos usados por Lester têm CD 16 para resistir e ele aplica bálsamos restauradores com uma ação de movimento, em vez de uma ação completa."
      },
      {
        "nome": "Granadas Arcanas",
        "tipo": "movimento",
        "desc": "Lester arremessa uma de suas granadas em alcance curto, causando efeitos a partir do ponto que ela atinge (CD 16 para resistir): Área Escorregadia (granada cobre um quadrado de 3m; criaturas na área caem; nas rodadas seguintes criaturas que tentem se movimentar pela área devem fazer Acrobacia CD 15) e Explosão de Chamas (cria um cone de 6m; criaturas na área sofrem 3d6 pontos de dano de fogo; Reflexos reduz o dano à metade e evita a condição; criaturas podem ficar em chamas)."
      }
    ],
    "equipamento": "Ácido x2, bálsamo restaurador x4, bandoleira de poções, besta leve, fogo alquímico x2, máscara de boticário aprimorada (fornece +2 em Fortitude), pó do desaparecimento x2 e virotes x10.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Ngarka",
    "nd": "ND 1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 62,
    "tipo": "Humanoide (bugbear) Médio",
    "iniciativa": "+4",
    "percepcao": "+3",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "16",
    "fort": "+11",
    "ref": "+4",
    "von": "+0",
    "defesaObs": "resistência a medo +2",
    "pv": "35",
    "desl": "9m (6q)",
    "atributos": {
      "for": "5",
      "des": "2",
      "con": "3",
      "int": "-1",
      "sab": "+1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Montante",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "3d6+5",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Êxtase no Medo",
        "tipo": "",
        "desc": "Ngarka sofre metade do dano de criaturas sob algum efeito de medo."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+7"
      },
      {
        "nome": "Furtividade",
        "valor": "+4"
      },
      {
        "nome": "Intimidação",
        "valor": "+7"
      }
    ],
    "equipamento": "Bálsamo restaurador x2, couraça, montante aumentada.",
    "tesouro": "Metade."
  },
  {
    "nome": "Guardião Espectral",
    "nd": "ND 3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 62,
    "tipo": "Espírito Médio",
    "iniciativa": "+4",
    "percepcao": "+3",
    "percepcaoObs": "percepção às cegas, visão no escuro",
    "defesa": "21",
    "fort": "+9",
    "ref": "+3",
    "von": "+15",
    "pv": "105",
    "desl": "9m (6q)",
    "atributos": {
      "for": "6",
      "des": "2",
      "con": "2",
      "int": "-1",
      "sab": "1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Relíquia Fantasmagórica",
        "tipo": "corpo a corpo",
        "bonus": "+14",
        "dano": "3d6+12",
        "desc": "corte, 19"
      }
    ],
    "habilidades": [
      {
        "nome": "Entre Planos",
        "tipo": "movimento",
        "desc": "O guardião se torna incorpóreo. Caso sofra dano por algum efeito mágico, deixa de ser incorpóreo. Recarga (sofrer dano mundano)."
      },
      {
        "nome": "Relíquia Fantasmagórica (propriedade)",
        "tipo": "",
        "desc": "A lâmina projetada da antiga relíquia é capaz de causar dano contra inimigos incorpóreos quando o guardião está em sua forma física, e contra criaturas físicas quando ele está na forma incorpórea."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Greng",
    "nd": "ND 1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 62,
    "tipo": "Humanoide (hobgoblin) Médio",
    "iniciativa": "+4",
    "percepcao": "+1",
    "defesa": "12",
    "fort": "+7",
    "ref": "+X",
    "von": "+9",
    "pv": "20",
    "desl": "9m (6q)",
    "pm": "22",
    "ataques": [
      {
        "nome": "Espada curta",
        "tipo": "corpo a corpo",
        "bonus": "+4",
        "dano": "1d6+2",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Greng lança magias como um arcanista de 3º nível (CD 16)."
      },
      {
        "nome": "Adaga Mental",
        "tipo": "Padrão, 3 PM",
        "desc": "Uma criatura em alcance curto sofre 3d6 pontos de dano psíquico e fica atordoada por uma rodada (Vontade reduz o dano à metade e evita a condição). Uma criatura só pode ficar atordoada por essa magia uma vez por cena."
      },
      {
        "nome": "Amedrontar",
        "tipo": "Padrão, 3 PM",
        "desc": "Um humanoide em alcance curto fica apavorado por 1d4+1 rodadas, e depois abalado pela cena (Vontade muda para abalado por 1d4 rodadas)."
      }
    ],
    "atributos": {
      "for": "0",
      "des": "2",
      "con": "2",
      "int": "4",
      "sab": "-1",
      "car": "-1"
    }
  },
  {
    "nome": "Anão Infectado",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 65,
    "tipo": "Monstro Médio",
    "iniciativa": "+3",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+15",
    "ref": "+4",
    "von": "+6",
    "defesaObs": "cura acelerada 10/ácido ou fogo",
    "pv": "70",
    "desl": "6m (4q)",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "5",
      "int": "–3",
      "sab": "0",
      "car": "–2"
    },
    "ataques": [
      {
        "nome": "Duas garras",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+4"
      }
    ],
    "habilidades": [
      {
        "nome": "Dilacerar",
        "desc": "Se o anão infectado acerta dois ataques de garra em uma mesma criatura na mesma rodada, causa mais 2d6+4 pontos de dano."
      }
    ],
    "tesouro": "Padrão."
  },
  {
    "nome": "Kalshar, Filho de Kally",
    "nd": "ND 2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 68,
    "tipo": "Humanoide (kobold) Pequeno",
    "iniciativa": "+5",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "14",
    "fort": "+2",
    "ref": "+7",
    "von": "+13",
    "pv": "45",
    "pm": "16",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "2",
      "con": "1",
      "int": "0",
      "sab": "2",
      "car": "3"
    },
    "ataques": [
      {
        "nome": "Lança",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "1d6+5 mais 1d6 de fogo"
      }
    ],
    "habilidades": [
      {
        "nome": "Aura de medo",
        "tipo": "movimento",
        "desc": "Até o fim da cena, criaturas que comecem o turno em alcance curto de Kalshar ficam abaladas (Vontade CD 18 evita). Criaturas que passem no teste ficam imunes a esta habilidade por um dia."
      },
      {
        "nome": "Peste oportunista",
        "desc": "Os ataques de Kalshar causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
      },
      {
        "nome": "Magias",
        "desc": "Kalshar lança magias como um conjurador de 2º nível (CD 18).\n• Explosão de Chamas (Padrão, 2 PM) Cria um cone de 6m, e as criaturas na área sofrem 2d6 pontos de dano de fogo e ficam em chamas (Reflexos reduz o dano à metade e evita a condição).\n• Imagem Espelhada (Padrão, 1 PM) Kalshar cria três cópias ilusórias até o fim da cena, que fornecem +6 na Defesa dele. Cada vez que um ataque contra o kobold erra, uma cópia desaparece, reduzindo o bônus em 2.\n• Vitalidade Fantasma (Padrão, 1 PM) Kalshar recebe 2d10 pontos de vida temporários."
      },
      {
        "nome": "Sensibilidade A luz",
        "desc": "Quando exposto à luz do sol ou similar, Kalshar fica ofuscado."
      }
    ],
    "pericias": [
      {
        "nome": "Intimidação",
        "valor": "+6"
      },
      {
        "nome": "Misticismo",
        "valor": "+3"
      },
      {
        "nome": "Religião",
        "valor": "+5"
      }
    ],
    "equipamento": "Lança cruel, símbolo sagrado de Kallyadranoch.",
    "tesouro": "Dobro."
  },
  {
    "nome": "Kobold Patrulheiro",
    "nd": "ND 1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 68,
    "tipo": "Humanoide (kobold) Pequeno",
    "iniciativa": "+4",
    "percepcao": "+0",
    "percepcaoObs": "visão no escuro",
    "defesa": "14",
    "fort": "+3",
    "ref": "+5",
    "von": "+0",
    "pv": "6",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "2",
      "con": "0",
      "int": "-1",
      "sab": "0",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Lança",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d6+1"
      },
      {
        "nome": "Funda",
        "tipo": "À distância",
        "bonus": "+9",
        "dano": "1d2+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Peste oportunista",
        "desc": "Os ataques do kobold patrulheiro causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
      },
      {
        "nome": "Sensibilidade A luz",
        "desc": "Quando exposto à luz do sol ou similar, o kobold fica ofuscado."
      }
    ],
    "equipamento": "Armadura de couro, balas x10, funda, lança.",
    "tesouro": "Metade."
  },
  {
    "nome": "Estátua Solar",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 71,
    "tipo": "Construto Médio",
    "iniciativa": "+3",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "18",
    "fort": "+11",
    "ref": "+0",
    "von": "+5",
    "defesaObs": "redução de dano 5",
    "pv": "35",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "1",
      "con": "3",
      "int": "—",
      "sab": "3",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Cimitarra",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+5",
        "desc": "18, mais 1d6 fogo e 1d6 contra mortos-vivos."
      }
    ],
    "habilidades": [
      {
        "nome": "Face Solar",
        "tipo": "Movimento",
        "desc": "Todas as criaturas em alcance curto da estátua ficam ofuscadas por uma rodada (Reflexos CD 14 evita). Uma criatura que falhe duas vezes seguidas no teste de resistência fica cega até o fim da cena. Uma criatura pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada."
      }
    ],
    "tesouro": "Cimitarra banhada a ouro."
  },
  {
    "nome": "Falcão Fatídico",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 74,
    "tipo": "Monstro Médio",
    "iniciativa": "+8",
    "percepcao": "+7",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+6",
    "ref": "+13",
    "von": "+8",
    "pv": "72",
    "desl": "3m (2q), voo 18m (12q)",
    "atributos": {
      "for": "1",
      "des": "3",
      "con": "1",
      "int": "-5",
      "sab": "2",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d8+6"
      },
      {
        "nome": "Garras",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Cópia temporal",
        "tipo": "Padrão",
        "desc": "Uma vez por dia, o falcão fatídico pode tentar invocar outro falcão fatídico (na verdade uma cópia de si mesmo, vinda de outro momento no tempo), com 50% de chance de sucesso. Cada cópia, por sua vez, pode tentar invocar outra cópia, e assim por diante. Todas as cópias desaparecem ao fim da cena. Se um falcão fatídico for morto, todas as cópias que surgiram a partir dele caem mortas também. Observe que as cópias não contam para propósitos de determinar os pontos de experiência e o tesouro do encontro."
      },
      {
        "nome": "vibração temporal",
        "desc": "Qualquer ataque ou ação hostil realizada contra o falcão fatídico tem 50% de chance de não afetá-lo."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+11"
      }
    ],
    "tesouro": "Metade."
  },
  {
    "nome": "Prado Verdejante",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 74,
    "tipo": "Humanoide (elfo) Médio",
    "iniciativa": "+6",
    "percepcao": "+7",
    "percepcaoObs": "visão na penumbra",
    "defesa": "17",
    "fort": "+0",
    "ref": "+5",
    "von": "+11",
    "pv": "20",
    "desl": "12m (8q)",
    "pm": "12",
    "atributos": {
      "for": "0",
      "des": "4",
      "con": "0",
      "int": "1",
      "sab": "3",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Arco longo",
        "tipo": "À distância",
        "bonus": "+5",
        "dano": "1d8+6, x3"
      }
    ],
    "habilidades": [
      {
        "nome": "Voz da grande loba",
        "desc": "Prado Verdejante pode falar com animais (como o efeito da magia Voz Divina)."
      },
      {
        "nome": "Controlar Plantas",
        "tipo": "Padrão, 2 PM",
        "desc": "Cria uma área quadrada de 9m de lado, até o final da cena, criaturas em seu interior ficam enredadas e imóveis (Reflexos anula). É possível se soltar com uma ação padrão e um teste de Acrobacia ou Atletismo."
      },
      {
        "nome": "Cura Ferimentos",
        "tipo": "Padrão, 2 PM",
        "desc": "Recupera 3d8+3 pontos de vida de uma criatura tocada."
      },
      {
        "nome": "Santuário",
        "tipo": "Padrão, 1 PM",
        "desc": "Prado Verdejante toca uma criatura. Qualquer outra criatura que tente fazer uma ação hostil contra o alvo da magia, perde a ação e não pode tentar novamente até o fim da cena (Vontade anula). Se o alvo realizar ações hostis, a magia é dissipada."
      }
    ],
    "pericias": [
      {
        "nome": "Adestramento",
        "valor": "+5"
      },
      {
        "nome": "Cura",
        "valor": "+5"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+7"
      }
    ],
    "equipamento": "Arco longo, flechas x20, gibão de peles, símbolo sagrado de Allihanna.",
    "tesouro": "Metade."
  },
  {
    "nome": "Alcateia",
    "nd": "ND 3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 74,
    "tipo": "Animal Grande (bando)",
    "iniciativa": "+6",
    "percepcao": "+7",
    "percepcaoObs": "faro, visão na penumbra",
    "defesa": "21",
    "fort": "+15",
    "ref": "+9",
    "von": "+5",
    "defesaObs": "forma coletiva",
    "pv": "40",
    "desl": "15m (10q)",
    "atributos": {
      "for": "3",
      "des": "3",
      "con": "3",
      "int": "-4",
      "sab": "2",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Duas mordidas",
        "tipo": "Corpo a Corpo (bando)",
        "bonus": "+14",
        "dano": "(1d6+10)"
      }
    ],
    "habilidades": [
      {
        "nome": "derrubar",
        "tipo": "livre",
        "desc": "Se a alcateia acertar um ataque de mordida, pode fazer a manobra derrubar (teste +16)."
      },
      {
        "nome": "Todos Contra Um",
        "tipo": "",
        "desc": "A matilha recebe +5 nas rolagens de dano contra criaturas caídas."
      }
    ]
  },
  {
    "nome": "Soldados Minotauros",
    "tipo": "Humanoide (minotauro) Médio",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 77,
    "iniciativa": "+4",
    "percepcao": "+3",
    "percepcaoObs": "",
    "defesa": "15",
    "fort": "+5",
    "ref": "+2",
    "von": "+1",
    "defesaObs": "",
    "pv": "8",
    "desl": "9m (6q)",
    "pm": "0",
    "atributos": {
      "for": "2",
      "des": "1",
      "con": "2",
      "int": "0",
      "sab": "0",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Maça",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "1d8+5",
        "desc": ""
      },
      {
        "nome": "Chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "1d6+2",
        "desc": ""
      }
    ],
    "habilidades": [],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+5"
      }
    ],
    "tesouro": "Nenhum",
    "equipamento": "Apito, couro batido, maça"
  },
  {
    "nome": "Maximus Caius Terceiro",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 77,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+6",
    "percepcao": "+6",
    "percepcaoObs": "faro",
    "defesa": "17",
    "fort": "+5",
    "ref": "+7",
    "von": "+12",
    "defesaObs": "imunidade a efeitos mentais",
    "pv": "49",
    "desl": "9m (6q)",
    "pm": "28",
    "atributos": {
      "for": "2",
      "des": "0",
      "con": "2",
      "int": "-1",
      "sab": "2",
      "car": "3"
    },
    "ataques": [
      {
        "nome": "Gládio",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "1d6+5",
        "desc": "19/x3"
      },
      {
        "nome": "chifres",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "1d6+5",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Bênção do gatuno",
        "tipo": "Livre",
        "desc": "Uma vez por cena, Maximus pode lançar uma magia como ação livre, pagando seu custo normal."
      },
      {
        "nome": "Forma de macaco",
        "tipo": "Completa, 2 Pm",
        "desc": "Maximus se transforma em um macaco. Ele adquire tamanho minúsculo (+5 em Furtividade e –5 em testes de manobra) e recebe deslocamento de escalar 9m. Seu equipamento desaparece (e ele perde seus benefícios) até voltar ao normal, mas suas outras estatísticas não são alteradas. A transformação dura indefinidamente, mas termina caso faça um ataque, lance uma magia ou sofra dano."
      },
      {
        "nome": "Malandragem divina",
        "tipo": "Livre, 1 Pm",
        "desc": "Quando faz um teste de perícia, Maximus usa Enganação no lugar da perícia original."
      },
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Maximus lança magias como um clérigo de Hyninn de 5º nível (CD 18)."
      },
      {
        "nome": "Arma Espiritual",
        "tipo": "Padrão, 4 PM",
        "desc": "Maximus recebe +2 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar automaticamente 2d6 pontos de dano de corte no atacante."
      },
      {
        "nome": "Comando",
        "tipo": "Padrão, 4 PM",
        "desc": "Maximus dá uma ordem irresistível a duas criaturas em alcance curto capazes de ouvir (Von anula)."
      },
      {
        "nome": "Curar Ferimentos",
        "tipo": "Padrão, 5 PM",
        "desc": "Uma criatura adjacente cura 6d8+6 PV."
      },
      {
        "nome": "Medroso",
        "tipo": "",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura, Maximus fica abalado. Além disso, quando faz um teste para resistir um efeito de medo, Maximus rola dois dados e fica com o menor."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+13"
      },
      {
        "nome": "Furtividade",
        "valor": "+3"
      },
      {
        "nome": "Religião",
        "valor": "+5"
      }
    ],
    "equipamento": "Couro batido, gládio, símbolo sagrado de Tauron (Hyninn)."
  },
  {
    "nome": "Carter Timont",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 80,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+7",
    "percepcao": "+6",
    "defesa": "19",
    "fort": "+4",
    "ref": "+11",
    "von": "+7",
    "defesaObs": "evasão aprimorada",
    "pv": "70",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "4",
      "con": "1",
      "int": "1",
      "sab": "3",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Chicote",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d3+7",
        "desc": ""
      },
      {
        "nome": "Cimitarra",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+7",
        "desc": "18 (crítico)"
      }
    ],
    "habilidades": [
      {
        "nome": "Chicotada Astuta",
        "tipo": "livre",
        "desc": "Se Carter acerta um ataque de chicote, pode fazer a manobra desarmar ou derrubar (teste +21)."
      },
      {
        "nome": "Mestre de Manobras",
        "tipo": "passiva",
        "desc": "Carter recebe +5 em testes de manobras (já contabilizado)."
      },
      {
        "nome": "Ódio Pelos Mortos",
        "tipo": "passiva",
        "desc": "Sempre que faz um teste contra ou relacionado a mortos-vivos (incluindo testes de ataque), Carter rola dois dados e usa o melhor resultado."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+4"
      },
      {
        "nome": "Acrobacia",
        "valor": "+7"
      },
      {
        "nome": "Investigação",
        "valor": "+4"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+6"
      }
    ],
    "equipamento": "Água benta x4, chicote equilibrado, cimitarra, couro batido reforçado, tocha x3",
    "tesouro": "Padrão"
  },
  {
    "nome": "Grakko Timont",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 80,
    "tipo": "Humanoide (goblin) Pequeno",
    "iniciativa": "+7",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "18",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "redução de ácido e fogo 5",
    "pv": "49",
    "desl": "9m (6q), escalada 9m (6q)",
    "atributos": {
      "for": "0",
      "des": "4",
      "con": "2",
      "int": "3",
      "sab": "-1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Azagaia",
        "tipo": "à distância",
        "bonus": "+16",
        "dano": "1d6+8",
        "desc": "mais 1d6 fogo contra mortos-vivos"
      },
      {
        "nome": "Alfange",
        "tipo": "corpo a corpo",
        "bonus": "+17",
        "dano": "1d10+13",
        "desc": "18; mais 1d6 fogo contra mortos-vivos"
      }
    ],
    "habilidades": [
      {
        "nome": "Granadas à Granel",
        "tipo": "Padrão",
        "desc": "Grakko arremessa uma granada em alcance médio. Se não tiver recebido uma ordem, quando acertar uma granada em um alvo, role 1d4 e use um dos efeitos abaixo. A CD para resistir as granadas de Grakko é 18."
      }
    ]
  },
  {
    "nome": "Subhi de Azgher",
    "nd": "5",
    "fonte": "Breves Jornadas",
    "paginaPdf": 80,
    "tipo": "Espírito (Aggelus) Médio",
    "iniciativa": "+7",
    "percepcao": "+5",
    "defesa": "24",
    "fort": "+5",
    "ref": "+11",
    "von": "+17",
    "defesaObs": "redução de fogo 10",
    "pv": "200",
    "desl": "9m (6q)",
    "ataques": [
      {
        "nome": "Alfange",
        "tipo": "corpo a corpo",
        "bonus": "+17",
        "dano": "1d10+13",
        "desc": "18; mais 1d6 fogo contra mortos-vivos"
      },
      {
        "nome": "Azagaia",
        "tipo": "à distância",
        "bonus": "+16",
        "dano": "1d6+8",
        "desc": "mais 1d6 fogo contra mortos-vivos"
      }
    ],
    "habilidades": [
      {
        "nome": "Aura de Calor",
        "tipo": "movimento",
        "desc": "Subhi emana uma aura flamejante até o fim da cena. Criaturas que comecem seu turno em alcance curto de Subhi sofrem 4d8 pontos de dano de fogo."
      },
      {
        "nome": "Fulgor Solar",
        "tipo": "reação",
        "desc": "Quando é alvo de um ataque corpo a corpo, Subhi produz um clarão que deixa o atacante ofuscado por uma rodada."
      }
    ],
    "atributos": {
      "for": "4",
      "des": "3",
      "con": "2",
      "int": "-1",
      "sab": "1",
      "car": "2"
    },
    "equipamento": "Água benta x6, alfange certeiro, azagaia x5, couraça banhada a ouro",
    "tesouro": "Metade"
  },
  {
    "nome": "Turba de Assaltantes",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 80,
    "tipo": "Humanoide (humano) Grande",
    "iniciativa": "+5",
    "percepcao": "+4",
    "defesa": "23",
    "fort": "+13",
    "ref": "+11",
    "von": "+6",
    "pv": "35",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "1",
      "con": "1",
      "int": "0",
      "sab": "0",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Lança x2",
        "tipo": "corpo a corpo",
        "bonus": "+17",
        "dano": "1d6+5",
        "desc": "[Bando]"
      },
      {
        "nome": "Azagaia",
        "tipo": "à distância",
        "bonus": "+17",
        "dano": "1d6+5",
        "desc": "[Bando]"
      }
    ],
    "habilidades": [
      {
        "nome": "Arremesso de Emboscada",
        "tipo": "geral",
        "desc": "A turba de assaltantes saca azagaias e faz um ataque à distância com ela. Essa habilidade só pode ser usada uma vez no primeiro turno do combate."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+7"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+4"
      }
    ],
    "equipamento": "Azagaia x20, escudo leve x8, lança x10",
    "tesouro": "Padrão"
  },
  {
    "nome": "Leillian Timont",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 80,
    "tipo": "Humanoide (elfa) Médio",
    "iniciativa": "+5",
    "percepcao": "+6",
    "percepcaoObs": "visão na penumbra",
    "defesa": "12",
    "fort": "+2",
    "ref": "+9",
    "von": "+11",
    "pv": "40",
    "desl": "12m (8q)",
    "ataques": [
      {
        "nome": "Bordão",
        "tipo": "corpo a corpo",
        "bonus": "+7",
        "dano": "1d6"
      }
    ],
    "atributos": {
      "for": "0",
      "des": "2",
      "con": "-1",
      "int": "2",
      "sab": "1",
      "car": "4"
    },
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "talento",
        "desc": "Leillian lança magias como uma feiticeira de 4º nível (CD 21)."
      },
      {
        "nome": "Explosão de Chamas",
        "tipo": "Padrão, 3 PM",
        "desc": "Criaturas em um cone de 6m sofrem 3d6 pontos de dano de fogo e ficam em chamas (Reflexos reduz o dano à metade e evita a condição)."
      },
      {
        "nome": "Imagem Espelhada",
        "tipo": "Padrão, 1 PM",
        "desc": "Três cópias ilusórias de Leillian surgem, concedendo a ela +6 na Defesa até o fim da cena. Cada vez que um ataque errar a elfa, uma das cópias desaparece e o bônus na Defesa diminui em 2."
      },
      {
        "nome": "Luz",
        "tipo": "Padrão, 1 PM",
        "desc": "Uma criatura em alcance curto fica ofuscada."
      },
      {
        "nome": "Toque Chocante",
        "tipo": "Padrão, 3 PM",
        "desc": "Uma criatura adjacente sofre 4d8+4 pontos de dano de eletricidade (Fortitude reduz à metade)."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+7"
      },
      {
        "nome": "Misticismo",
        "valor": "+5"
      }
    ],
    "equipamento": "Cajado arcano, essência de mana x3",
    "tesouro": "Metade"
  },
  {
    "nome": "Ponthus, druida do Oceano",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 83,
    "tipo": "Humanoide (elfo-do-mar) Médio",
    "iniciativa": "+8",
    "percepcao": "+7",
    "percepcaoObs": "percepção às cegas embaixo d’água, visão na penumbra",
    "defesa": "17",
    "fort": "+3",
    "ref": "+8",
    "von": "+11",
    "pv": "50",
    "desl": "9m (6q), natação 9m (6q)",
    "pm": "24",
    "ataques": [
      {
        "nome": "Pinça do canceronte",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "1d8+13, x3"
      }
    ],
    "habilidades": [
      {
        "nome": "Dependência de Água",
        "tipo": "passiva",
        "desc": "Se ficar um dia sem contato com água, Ponthus não recupera PM até voltar para a água."
      },
      {
        "nome": "Magias (como um druida de Oceano de 4º nível)",
        "tipo": "informativa",
        "desc": "CD 18, limite de PM 4."
      },
      {
        "nome": "Curar Ferimentos",
        "tipo": "Padrão, 4 PM",
        "desc": "Uma criatura em alcance curto cura 5d8+5 pontos de vida."
      },
      {
        "nome": "Despedaçar",
        "tipo": "Padrão, 3 PM",
        "desc": "Um alvo em alcance curto sofre 2d8+4 pontos de dano de impacto, ou o dobro sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena."
      },
      {
        "nome": "Escudo da Fé",
        "tipo": "Reação, 3 PM",
        "desc": "Quando uma criatura em alcance curto sofre um ataque, ela recebe +3 na Defesa por 1 turno."
      },
      {
        "nome": "Suporte Ambiental",
        "tipo": "Padrão, 1 PM",
        "desc": "Uma criatura adjacente fica imune por um dia aos efeitos de calor e frio extremos, pode respirar na água e não sufoca em fumaça densa."
      }
    ],
    "atributos": {
      "for": "2",
      "des": "3",
      "con": "2",
      "int": "-1",
      "sab": "4",
      "car": "2"
    },
    "pericias": [
      {
        "nome": "Adestramento",
        "valor": "+5"
      },
      {
        "nome": "Cura",
        "valor": "+7"
      },
      {
        "nome": "Religião",
        "valor": "+7"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+7 (+9 embaixo d’água)"
      }
    ],
    "equipamento": "Essência de mana x2, gibão de peles, Pinça do canceronte e (tridente atroz), símbolo sagrado do Oceano",
    "tesouro": "Padrão"
  },
  {
    "nome": "Capitão Corrompido",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 86,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+4",
    "percepcao": "+3",
    "percepcaoObs": "visão no escuro",
    "defesa": "18",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "resistência a magia divina +5",
    "pv": "80",
    "desl": "6m (4q)",
    "atributos": {
      "for": "5",
      "des": "1",
      "con": "3",
      "int": "0",
      "sab": "–2",
      "car": "–2"
    },
    "ataques": [
      {
        "nome": "Alabarda grotesca",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "1d10+5",
        "desc": "x3, mais 1d6 de matéria vermelha"
      }
    ],
    "habilidades": [
      {
        "nome": "alabarda grotesca",
        "desc": "Criada a partir do corpo do capitão, esta arma orgânica é feita de matéria vermelha. Além disso, é capaz de se estender, permitindo ataques corpo a corpo contra criaturas em alcance curto."
      },
      {
        "nome": "ataque reflexo (reação)",
        "desc": "Uma vez por rodada, o capitão pode fazer um ataque corpo a corpo contra um alvo adjacente que esteja desprevenido ou que se mova para fora do seu alcance."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+8"
      },
      {
        "nome": "Intimidação",
        "valor": "+3"
      }
    ],
    "equipamento": "Apito, cota de malha, maça, símbolo sagrado de Aharadak"
  },
  {
    "nome": "Sarelyn",
    "nd": "5",
    "fonte": "Breves Jornadas",
    "paginaPdf": 86,
    "tipo": "Humanoide (elfa) Média",
    "iniciativa": "+11",
    "percepcao": "+10",
    "percepcaoObs": "visão na penumbra",
    "defesa": "22",
    "fort": "+5",
    "ref": "+17",
    "von": "+11",
    "defesaObs": "evasão",
    "pv": "135",
    "desl": "12m (8q)",
    "atributos": {
      "for": "–1",
      "des": "5",
      "con": "1",
      "int": "3",
      "sab": "2",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Espada curta x2",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+10",
        "desc": "19"
      },
      {
        "nome": "Duas pistolas",
        "tipo": "À Distância",
        "bonus": "+15",
        "dano": "2d6+15",
        "desc": "18/x3"
      }
    ],
    "habilidades": [
      {
        "nome": "ataque furtivo",
        "desc": "+3d6."
      },
      {
        "nome": "inabalável",
        "desc": "Sarelyn nunca fica surpreendida. Quando faz um teste de resistência, rola dois dados e usa o melhor resultado."
      },
      {
        "nome": "matar ou morrer (movimento)",
        "desc": "Sarelyn assume uma postura de tudo ou nada, e seu próximo ataque contra um alvo em alcance curto feito nessa rodada é considerado um ataque furtivo. Entretanto, ela fica desprevenida por uma rodada."
      },
      {
        "nome": "pistoleira veloz",
        "desc": "Sarelyn não sofre a penalidade padrão de –5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo, e pode recarregar sua arma de fogo com uma ação de movimento."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+9"
      },
      {
        "nome": "Enganação",
        "valor": "+8"
      },
      {
        "nome": "Furtividade",
        "valor": "+11"
      }
    ],
    "equipamento": "Balas x20, couro batido, espada curta, pistola x2"
  },
  {
    "nome": "Gabora, Ninja-Pesadelo",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 89,
    "tipo": "Monstro (kaijin) Médio",
    "iniciativa": "+9",
    "percepcao": "+6",
    "percepcaoObs": "visão no escuro",
    "defesa": "14",
    "fort": "+10",
    "ref": "+13",
    "von": "+4",
    "defesaObs": "evasão, redução de dano 2",
    "pv": "74",
    "desl": "12m (8q)",
    "pm": "20",
    "atributos": {
      "for": "1",
      "des": "4",
      "con": "1",
      "int": "2",
      "sab": "1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Espada curta x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d6+4",
        "desc": "crítico 19"
      },
      {
        "nome": "Besta leve",
        "tipo": "À distância",
        "bonus": "+12",
        "dano": "1d8+8",
        "desc": "crítico 19"
      }
    ],
    "habilidades": [
      {
        "nome": "Ataque Furtivo",
        "tipo": "Especial",
        "desc": "+2d6"
      },
      {
        "nome": "Truques ninja",
        "tipo": "Magia",
        "desc": "Gabora pode lançar as seguintes magias simuladas como um conjurador arcano de 5º nível (CD 19):\n• Amedrontar (Padrão, 3 PM) — Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas).\n• Explosão de Chamas (Padrão, 4 PM) — Gabora causa 5d6+6 pontos de dano de fogo a criaturas em um cone de 6m (Ref reduz à metade).\n• Imagem Espelhada (Padrão, 3 PM) — Gabora cria 3 cópias ilusórias de si mesma que fornecem +6 na Defesa. Cada vez que um ataque contra ela erra, uma das imagens desaparece e o bônus na Defesa diminui em 2. Quando uma cópia é destruída, a criatura que a destruiu fica ofuscada por 1 rodada.\n• Teia (Padrão, 4 PM) — Gabora cria um cubo de terreno difícil de 6m em alcance curto. Criaturas na área, ou que comecem seu turno em seu interior, ficam enredadas e imóveis (Ref evita). Uma criatura pode se libertar com uma ação padrão e um teste de Acrobacia ou Atletismo."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+7"
      },
      {
        "nome": "Furtividade",
        "valor": "+9"
      },
      {
        "nome": "Intimidação",
        "valor": "+6"
      },
      {
        "nome": "Ladinagem",
        "valor": "+7"
      }
    ],
    "equipamento": "Espada curta certeira, gazua, manto camuflado aprimorado."
  },
  {
    "nome": "Recruta do Clã do Lótus",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 89,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+5",
    "percepcao": "+1",
    "defesa": "13",
    "fort": "+3",
    "ref": "+5",
    "von": "+0",
    "defesaObs": "evasão",
    "pv": "6",
    "desl": "9m (6q)",
    "atributos": {
      "for": "0",
      "des": "3",
      "con": "0",
      "int": "0",
      "sab": "-1",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Clava",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "1d6+1"
      },
      {
        "nome": "Pistola",
        "tipo": "À distância",
        "bonus": "+9",
        "dano": "2d6",
        "desc": "19/x3; ataque furtivo +1d6"
      }
    ],
    "habilidades": [
      {
        "nome": "Saque Rápido",
        "tipo": "Habilidade",
        "desc": "O recruta pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+5"
      },
      {
        "nome": "Furtividade",
        "valor": "+5"
      },
      {
        "nome": "Intimidação",
        "valor": "+5"
      }
    ],
    "equipamento": "Armadura acolchoada, balas x20, clava, pistola."
  },
  {
    "nome": "Kazan Shaku, Samurai do Vulcão",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 89,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+6",
    "percepcao": "+5",
    "defesa": "23",
    "fort": "+14",
    "ref": "+4",
    "von": "+12",
    "defesaObs": "imunidade a fogo, vulnerabilidade a frio",
    "pv": "140",
    "desl": "6m (4q)",
    "atributos": {
      "for": "5",
      "des": "2",
      "con": "3",
      "int": "0",
      "sab": "1",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Nodachi",
        "tipo": "Corpo a Corpo",
        "bonus": "+16",
        "dano": "2d6+10",
        "desc": "crítico 19; mais 1d6 fogo"
      }
    ],
    "habilidades": [
      {
        "nome": "Aura de Calor",
        "tipo": "Aura",
        "desc": "Criaturas que comecem seu turno adjacentes à Shaku ficam em chamas. Shaku pode desativar essa habilidade com uma ação livre."
      },
      {
        "nome": "Olhar Apavorante",
        "tipo": "Livre",
        "desc": "Uma vez por rodada, Shaku encara um inimigo em alcance curto, que fica apavorado por 1 rodada e então abalado (Von CD 18 reduz para abalado por 1 rodada). O alvo fica imune a esta habilidade até o fim da cena."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+9"
      },
      {
        "nome": "Intimidação",
        "valor": "+7"
      }
    ],
    "equipamento": "Nodachi (montante), meia armadura."
  },
  {
    "nome": "Mercenário Bêbado",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 97,
    "tipo": "Humanoide (humano) Médio (lacaio)",
    "iniciativa": "+2",
    "percepcao": "+2",
    "defesa": "14",
    "fort": "+5",
    "ref": "+3",
    "von": "+0",
    "pv": "8",
    "desl": "6m (4q)",
    "atributos": {
      "for": "2",
      "des": "0",
      "con": "2",
      "int": "–1",
      "sab": "0",
      "car": "–1"
    },
    "ataques": [
      {
        "nome": "Espada longa",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d8+7",
        "desc": "19."
      },
      {
        "nome": "Arco Longo",
        "tipo": "à distância",
        "bonus": "+9",
        "dano": "1d8",
        "desc": "x3"
      }
    ],
    "habilidades": [
      {
        "nome": "Estupor Alcoólico",
        "tipo": "Especial",
        "desc": "Devido à noite de gandaia, sempre que fizer um teste o mercenário rola dois dados e usa o pior. Se ele gastar uma ação completa, passa a rolar um dado normalmente."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+4"
      }
    ],
    "equipamento": "Arco longo, cota de malha, espada longa, flechas x20."
  },
  {
    "nome": "Tudere",
    "nd": "11",
    "fonte": "Breves Jornadas",
    "paginaPdf": 112,
    "tipo": "Morto-vivo Médio",
    "iniciativa": "+15",
    "percepcao": "+13",
    "percepcaoObs": "visão no escuro",
    "defesa": "45",
    "fort": "+12",
    "ref": "+26",
    "von": "+20",
    "defesaObs": "cura acelerada 10, redução de dano 10/luz",
    "pv": "550",
    "desl": "18m (12q), escalar 18m (12q)",
    "pm": "0",
    "atributos": {
      "for": "2",
      "des": "1",
      "con": "0",
      "int": "—",
      "sab": "0",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Espada longa x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+36",
        "dano": "2d8+25, 17 mais 2d10 trevas",
        "desc": ""
      },
      {
        "nome": "Garra",
        "tipo": "Corpo a Corpo",
        "bonus": "+36",
        "dano": "2d6+25 mais 2d10 trevas",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Dominação Vampírica (Padrão)",
        "tipo": "Habilidade",
        "desc": "Humanoides em alcance curto ficam confusos, enfeitiçados ou fascinados até o fim da cena (Von CD 29 evita). Uma vez por cena por alvo."
      },
      {
        "nome": "Drenar Sangue (Padrão)",
        "tipo": "Habilidade",
        "desc": "Drena 6d6 perfuração de criatura viva que esteja agarrando e cura PV iguais. Criatura morta vira vampiro na próxima noite."
      },
      {
        "nome": "Forma de Morcego (Padrão)",
        "tipo": "Habilidade",
        "desc": "Transforma-se em morcego. Minúsculo (+5 Furtividade, -5 manobra). Voo 12m. Equipamento absorvido. Termina se atacar, lançar magia ou sofrer dano."
      },
      {
        "nome": "Presença Majestosa (Reação)",
        "tipo": "Habilidade",
        "desc": "Quando uma criatura ataca o vampiro, deve passar em Von CD 29 ou não consegue machucá-lo e perde a ação."
      },
      {
        "nome": "Sensibilidade ao Sol",
        "tipo": "Qualidade",
        "desc": "Em luz solar direta, fica ofuscado e perde 6d6 PV por rodada."
      },
      {
        "nome": "Enfraquecido (Condições Permanentes)",
        "tipo": "Qualidade",
        "desc": "O tempo que Tudere passou selado o deixou fraco e vulnerável, sofrendo condições permanentes e severa redução em seus atributos (refletido em sua ficha)."
      }
    ],
    "pericias": [
      {
        "nome": "Diplomacia",
        "valor": "+16"
      },
      {
        "nome": "Enganação",
        "valor": "+16"
      },
      {
        "nome": "Furtividade",
        "valor": "+25"
      },
      {
        "nome": "Nobreza",
        "valor": "+13"
      }
    ],
    "tesouro": "Dobro",
    "equipamento": "Armadura completa delicada de mitral, espada longa precisa de mitral"
  },
  {
    "nome": "Carruagem de Comando Danificada",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 120,
    "tipo": "Construto Enorme",
    "iniciativa": "+6",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "17",
    "fort": "+11",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "redução de corte, impacto e perfuração 5",
    "pv": "99",
    "desl": "15m (10q), sem redução por terreno difícil",
    "atributos": {
      "for": "6",
      "des": "2",
      "con": "6",
      "int": "—",
      "sab": "0",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "2d8+10"
      }
    ],
    "habilidades": [
      {
        "nome": "Cúpula de Proteção",
        "tipo": "",
        "desc": "O piloto da carruagem de comando está protegido por uma cúpula protetora (como o efeito básico da magia Campo de Força). Se o campo for destruído, a carruagem usa sua próxima ação de movimento para refazê-lo."
      },
      {
        "nome": "Evacuação de Emergência (Completa)",
        "tipo": "",
        "desc": "Se a carruagem inicia seu turno com 20 PV ou menos, o piloto é alvo da magia Teletransporte com o aprimoramento de santuário, sem custo em PM. Em seguida, a carruagem começa a emitir um alarme agudo e fica imóvel por 2 turnos — no fim do segundo turno, ela explode, causando 3d6 pontos de dano de fogo e 3d6 pontos de dano de perfuração em todas as criaturas em alcance curto (Ref CD 20 reduz à metade). Uma palavra de comando pode impedir a explosão."
      },
      {
        "nome": "Pernas Mecânicas",
        "tipo": "",
        "desc": "A carruagem recebe +5 em testes para resistir às manobras derrubar e empurrar."
      },
      {
        "nome": "Piloto",
        "tipo": "",
        "desc": "Uma carruagem é mais eficiente quando controlada por um piloto. Pilotar exige uma ação de movimento do piloto a cada rodada e permite que a carruagem use os valores de Iniciativa, Reflexos e ataque do piloto ou os seus, os que forem maiores. O piloto é considerado uma ameaça adicional para efeitos de ND."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+14"
      }
    ],
    "tesouro": "Gema de força (esta gema tem 1d4 cargas, e a empunhando você pode gastar uma ação padrão e uma carga para produzir um domo semelhante ao efeito básico da magia Campo de Força. Alternativamente, quando lança essa magia, você pode empunhá-la e usar uma carga para reduzir seu custo em –2 PM. Não pode ser fabricado. T$ 100, 1 espaço)."
  },
  {
    "nome": "Dracnídea Cáustica",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 149,
    "tipo": "Monstro Grande",
    "iniciativa": "+6",
    "percepcao": "+2",
    "percepcaoObs": "visão no escuro",
    "defesa": "16",
    "fort": "+5",
    "ref": "+11",
    "von": "+0",
    "defesaObs": "imunidade a ácido, flanquear, paralisia, surpreendido e à magia Teia",
    "pv": "35",
    "desl": "12m (8q), escalar 12m (8q)",
    "atributos": {
      "for": "5",
      "des": "4",
      "con": "2",
      "int": "-5",
      "sab": "0",
      "car": "-4"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "2d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "tece-ácido",
        "tipo": "Padrão",
        "desc": "A dracnídea dispara uma teia de ácido em uma área de 3m de lado em alcance curto. Criaturas na área sofrem 1d6 pontos de dano de ácido e ficam enredadas (Ref CD 14 reduz o dano à metade e evita a condição). Enquanto estiverem enredadas, sofrem mais 1d6 de dano de ácido no início do turno da dracnídea. Uma criatura pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20) ou cortando a teia (cada espaço de 1,5m de teia tem 15 PV e RD 5). A dracnídea também pode usar a teia para cobrir uma área quadrada de 6m de lado. Uma criatura que entre na área fica enredada e uma criatura que comece seu turno na área sofre 1d6 pontos de dano de ácido. A dracnídea pode andar na própria teia sem se enredar. Ela percebe automaticamente qualquer criatura em sua teia, como se tivesse percepção às cegas."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+9"
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Líder dos Ladrões de Túmulos",
    "nd": "ND 1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 155,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+5",
    "percepcao": "+1",
    "defesa": "10",
    "fort": "+5",
    "ref": "+8",
    "von": "+3",
    "defesaObs": "evasão",
    "pv": "30",
    "desl": "9m (6q)",
    "ataques": [
      {
        "nome": "Pá",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d8+4",
        "desc": ""
      },
      {
        "nome": "Pistola",
        "tipo": "à distância",
        "bonus": "+7",
        "dano": "2d6",
        "desc": "19/x3"
      }
    ],
    "habilidades": [
      {
        "nome": "Pancada na cabeça",
        "tipo": "habilidade",
        "desc": "Uma criatura atingida por um ataque furtivo do ladrão de túmulos fica inconsciente e caída ou, se estiver envolvida em combate ou outra situação perigosa, fica exausta por 1 rodada, depois fatigada (em ambos os casos, Fort 14 reduz para fatigada por 1d4 rodadas)."
      }
    ],
    "atributos": {
      "for": "2",
      "des": "3",
      "con": "1",
      "int": "1",
      "sab": "–1",
      "car": "0"
    },
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+7"
      },
      {
        "nome": "Intimidação",
        "valor": "+4"
      },
      {
        "nome": "Ladinagem",
        "valor": "+9"
      }
    ],
    "equipamento": "Armadura de couro, balas x20, casaco longo, equipamento de viagem, gazua aprimorada, pá (possui as características de uma maça), pistola"
  },
  {
    "nome": "Aprendiz de Necromante",
    "nd": "ND 2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 155,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+5",
    "percepcao": "+3",
    "defesa": "12",
    "fort": "+2",
    "ref": "+7",
    "von": "+13",
    "pv": "33",
    "desl": "9m (6q)",
    "pm": "18",
    "ataques": [
      {
        "nome": "Adaga",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "1d4",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Ergam-se!",
        "tipo": "completa",
        "desc": "O aprendiz de necromante conjura seis mortos-vivos em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do aprendiz, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d6+2 pontos de dano de trevas em uma criatura adjacente. Os mortos-vivos têm For 2, Des 2, Defesa 18, 1 PV e as habilidades de mortos-vivos (veja Tormenta20, p. 284), falham automaticamente em qualquer teste oposto e desaparecem quando mortos ou ao fim da cena."
      },
      {
        "nome": "Sacrificar servo (reação)",
        "tipo": "reação",
        "desc": "Uma vez por rodada, quando sofre dano, o aprendiz sacrifica um de seus mortos-vivos conjurados para reduzir esse dano a 0."
      },
      {
        "nome": "Magias",
        "tipo": "magia",
        "desc": "Como um mago de 2º nível (CD 18, 20 para necromancia*)."
      },
      {
        "nome": "Amedrontar",
        "tipo": "magia",
        "desc": "Um animal ou humanoide em alcance curto fica apavorado por 1 rodada e depois abalado (Von muda para abalado por 1d4 rodadas)."
      },
      {
        "nome": "Armadura Arcana",
        "tipo": "magia",
        "desc": "O necromante recebe +5 na Defesa por um dia."
      }
    ],
    "atributos": {
      "for": "0",
      "des": "2",
      "con": "1",
      "int": "4",
      "sab": "0",
      "car": "–1"
    },
    "pericias": [
      {
        "nome": "Conhecimento",
        "valor": "+7"
      },
      {
        "nome": "Misticismo",
        "valor": "+9"
      }
    ],
    "equipamento": "Adaga, essência de mana",
    "tesouro": "Padrão"
  },
  {
    "nome": "Lursh-Lyin Predador",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 168,
    "tipo": "Monstro Médio",
    "iniciativa": "+5",
    "percepcao": "+3",
    "percepcaoObs": "percepção às cegas (apenas dentro d’água), visão no escuro",
    "defesa": "15",
    "fort": "+6",
    "ref": "+6",
    "von": "+4",
    "pv": "16",
    "desl": "9m (6q), natação 12m (8q)",
    "atributos": {
      "for": "3",
      "des": "2",
      "con": "1",
      "int": "-1",
      "sab": "1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+11",
        "dano": "1d6+3"
      },
      {
        "nome": "Garras",
        "tipo": "corpo a corpo",
        "bonus": "+11",
        "dano": "1d4+3",
        "desc": "duas garras"
      }
    ],
    "habilidades": [
      {
        "nome": "Frenesi sangrento",
        "desc": "Sempre que causa dano com sua mordida, o lursh-lyin recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano até o fim da cena."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+7"
      },
      {
        "nome": "Furtividade",
        "valor": "+4 (+9 dentro d’água)"
      }
    ],
    "tesouro": "Padrão"
  },
  {
    "nome": "Escamas Vivas Inexperiente",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 183,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+2",
    "percepcao": "0",
    "defesa": "13",
    "fort": "+3",
    "ref": "+0",
    "von": "+5",
    "pv": "6",
    "desl": "9m (6q)",
    "ataques": [
      {
        "nome": "Lança",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+2",
        "desc": "x2"
      },
      {
        "nome": "Lança",
        "tipo": "à distância",
        "bonus": "+9",
        "dano": "1d6+2"
      }
    ],
    "habilidades": [
      {
        "nome": "Sopro de Dragão",
        "tipo": "Padrão",
        "desc": "Criaturas em um cone de 6m sofrem 2d6 pontos de dano de fogo, e ficam em chamas (Ref CD 13 reduz à metade e evita a condição). Recarga (um outro escama viva ser reduzido a 0 PV)."
      }
    ],
    "atributos": {
      "for": "1",
      "des": "2",
      "con": "1",
      "int": "0",
      "sab": "0",
      "car": "2"
    },
    "equipamento": "Lança cruel, armadura de couro.",
    "tesouro": "Padrão"
  },
  {
    "nome": "Quintus",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 183,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+3",
    "percepcao": "+1",
    "percepcaoObs": "faro",
    "defesa": "20",
    "fort": "+13",
    "ref": "+2",
    "von": "+7",
    "pv": "60",
    "desl": "6m (4q)",
    "ataques": [
      {
        "nome": "Gládio",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+5",
        "desc": "19/x3, corte"
      },
      {
        "nome": "Chifres",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d6+5"
      },
      {
        "nome": "Lança",
        "tipo": "à distância",
        "bonus": "+9",
        "dano": "1d6+5"
      }
    ],
    "habilidades": [
      {
        "nome": "Golpe esmagador",
        "tipo": "livre",
        "desc": "Quando Quintus acerta um ataque de chifres, pode usar a manobra derrubar (teste +17)."
      },
      {
        "nome": "Ignorar os covardes",
        "desc": "Quintus sofre metade do dano de ataques e efeitos de criaturas abaladas ou apavoradas."
      },
      {
        "nome": "Medo de altura",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), Quintus fica abalado."
      },
      {
        "nome": "Prontidão",
        "tipo": "reação",
        "desc": "Sempre que um inimigo entra ou sai por conta própria do alcance pessoal de Quintus, o minotauro pode fazer um ataque adicional contra essa criatura. Se acertar, além de causar dano, deixa o alvo imóvel até o início de seu próximo turno."
      }
    ],
    "atributos": {
      "for": "4",
      "des": "0",
      "con": "3",
      "int": "1",
      "sab": "−1",
      "car": "0"
    },
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+8"
      },
      {
        "nome": "Intimidação",
        "valor": "+5"
      }
    ],
    "equipamento": "Escudo pesado, gládio, lança, loriga segmentada.",
    "tesouro": "Padrão"
  },
  {
    "nome": "Sarriel de Marah",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 206,
    "tipo": "Espírito (aggelus) Médio",
    "iniciativa": "+3",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "15",
    "fort": "+2",
    "ref": "+7",
    "von": "+13",
    "pv": "49",
    "desl": "9m (6q)",
    "atributos": {
      "for": "-1",
      "des": "2",
      "con": "0",
      "int": "0",
      "sab": "3",
      "car": "4"
    },
    "habilidades": [
      {
        "nome": "Amor encarnado",
        "type": "",
        "tipo": "",
        "desc": "Quando faz um teste de perícia baseada em Carisma, Sarriel rola dois dados e usa o melhor resultado."
      },
      {
        "nome": "Aura pacífica",
        "type": "",
        "tipo": "",
        "desc": "Sarriel emana uma aura de calmaria de 9m de raio. Criaturas nessa área sofrem –5 em testes de ataque e rolagens de dano."
      },
      {
        "nome": "Dominar sentimentos",
        "tipo": "padrão",
        "desc": "Sarriel fala e gesticula para uma criatura inteligente (Int –3 ou maior) em alcance curto. O alvo fica enfeitiçado ou fascinado até o final da cena, à escolha de Sarriel (Von CD 18 evita e deixa imune a esta habilidade até o fim da cena)."
      }
    ],
    "pericias": [
      {
        "nome": "Atuação",
        "valor": "+7"
      },
      {
        "nome": "Cura",
        "valor": "+6"
      },
      {
        "nome": "Diplomacia",
        "valor": "+7"
      }
    ]
  },
  {
    "nome": "Suplicante",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 206,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+0",
    "percepcao": "+3",
    "defesa": "10",
    "fort": "+3",
    "ref": "+0",
    "von": "+1",
    "defesaObs": "imunidade a medo",
    "pv": "3",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "0",
      "con": "1",
      "int": "0",
      "sab": "1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Ataque desarmado",
        "tipo": "corpo a corpo",
        "bonus": "+5",
        "dano": "1d3+1, não letal"
      }
    ],
    "habilidades": [
      {
        "nome": "Abraço apertado",
        "tipo": "livre",
        "desc": "Se o suplicante acerta um ataque desarmado, pode fazer a manobra agarrar (teste +7)."
      },
      {
        "nome": "Culpa acachapante",
        "tipo": "",
        "desc": "Se uma criatura reduz o suplicante a 0 PV ou menos com dano letal, ela fica abalada e alquebrada até o dia seguinte (Von CD 12 muda a duração para 1 rodada)."
      }
    ]
  },
  {
    "nome": "Edmond Gillern",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 206,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+2",
    "percepcao": "+2",
    "defesa": "16",
    "fort": "+11",
    "ref": "+5",
    "von": "+0",
    "pv": "35",
    "desl": "9m (6q)",
    "atributos": {
      "for": "2",
      "des": "0",
      "con": "2",
      "int": "1",
      "sab": "0",
      "car": "3"
    },
    "ataques": [
      {
        "nome": "Espada longa",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d8+10, 19"
      }
    ],
    "habilidades": [
      {
        "nome": "Interpor-se",
        "tipo": "reação",
        "desc": "Se estiver adjacente a Sarriel quando ele sofre dano, Edmond sofre todo o dano que Sarriel sofreria."
      }
    ],
    "pericias": [
      {
        "nome": "Diplomacia",
        "valor": "+5"
      },
      {
        "nome": "Nobreza",
        "valor": "+3"
      },
      {
        "nome": "Guerra",
        "valor": "+3"
      }
    ],
    "equipamento": "Escudo pesado reforçado, espada longa certeira."
  },
  {
    "nome": "Grumete-Piranha",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 221,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+5",
    "percepcao": "+3",
    "defesa": "12",
    "fort": "+1",
    "ref": "+4",
    "von": "+3",
    "pv": "6",
    "desl": "9m (6q)",
    "atributos": {
      "for": "2",
      "des": "2",
      "con": "2",
      "int": "−1",
      "sab": "0",
      "car": "−1"
    },
    "ataques": [
      {
        "nome": "Duas adagas",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "1d4+4",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Dentes afiados",
        "desc": "Uma vez por rodada, quando uma criatura adjacente erra um ataque contra o grumete-piranha por 5 ou mais, sofre 1d4+4 pontos de dano de corte."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+4"
      },
      {
        "nome": "Atletismo",
        "valor": "+5"
      }
    ],
    "equipamento": "Adaga x2"
  },
  {
    "nome": "Patrulha Purista",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 221,
    "tipo": "Humanoide (humano) Grande",
    "iniciativa": "+3",
    "percepcao": "+0",
    "defesa": "21",
    "fort": "+15",
    "ref": "+8",
    "von": "+4",
    "pv": "27",
    "desl": "6m (4q)",
    "ataques": [
      {
        "nome": "Alabarda",
        "tipo": "corpo a corpo",
        "bonus": "+15",
        "dano": "2d10+14",
        "desc": "x3"
      }
    ],
    "habilidades": [
      {
        "nome": "Bando",
        "desc": "Se um ataque da patrulha purista exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque da patrulha errar, ela ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área. Um personagem com o poder Trespassar que acerte a criatura pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
      },
      {
        "nome": "Ódio Puro",
        "desc": "Os puristas recebem +5 em testes de Vontade quando estão seguindo ordens de um superior e +2 em rolagens de dano contra humanoides não humanos."
      }
    ],
    "equipamento": "Alabarda x10, cota de malha x10",
    "atributos": {
      "for": "2",
      "des": "2",
      "con": "2",
      "int": "-1",
      "sab": "0",
      "car": "-1"
    }
  },
  {
    "nome": "Ferani Saqueador",
    "nd": "½",
    "fonte": "Breves Jornadas",
    "paginaPdf": 234,
    "tipo": "Humanoide (trog) Médio",
    "iniciativa": "+5",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "14",
    "fort": "+4",
    "ref": "+4",
    "von": "+0",
    "pv": "6",
    "desl": "9m (6q), escavação 6m (4q)",
    "atributos": {
      "for": "3",
      "des": "–1",
      "con": "2",
      "int": "—",
      "sab": "–1",
      "car": "–5"
    },
    "ataques": [
      {
        "nome": "Lança",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+2",
        "desc": ""
      },
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+9",
        "dano": "1d6+2",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Dança da Areia",
        "desc": "Se o ferani tiver se deslocado pelo menos 6m sem passar pelo mesmo espaço duas vezes, ele recebe +1d4 em suas rolagens de dano contra alvos em alcance curto até o fim do seu turno."
      },
      {
        "nome": "Mau Cheiro (PADRÃO)",
        "desc": "O ferani expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 13 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
      },
      {
        "nome": "Sangue Frio",
        "desc": "O ferani sofre 1 ponto de dano adicional por dado de dano de frio."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+10"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+4"
      }
    ],
    "equipamento": "Lança"
  },
  {
    "nome": "Camponês",
    "nd": "¼",
    "fonte": "Breves Jornadas",
    "paginaPdf": 240,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+0",
    "percepcao": "+3",
    "defesa": "10",
    "fort": "+2",
    "ref": "+0",
    "von": "–1",
    "pv": "3",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "0",
      "con": "1",
      "int": "0",
      "sab": "1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Bordão",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "1d6+5"
      }
    ],
    "pericias": [
      {
        "nome": "Adestramento",
        "valor": "+2"
      },
      {
        "nome": "Ofício (fazendeiro)",
        "valor": "+2"
      }
    ],
    "equipamento": "Bordão.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Mercenários Inexperientes",
    "tipo": "Humanoide (humano) Grande",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 240,
    "iniciativa": "+1",
    "percepcao": "+1",
    "defesa": "18",
    "fort": "+12",
    "ref": "+7",
    "von": "+3",
    "pv": "14",
    "desl": "9m (6q)",
    "atributos": {
      "for": "2",
      "des": "0",
      "con": "2",
      "int": "-1",
      "sab": "0",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Lança x2",
        "tipo": "corpo a corpo",
        "bonus": "+14",
        "dano": "2d6+5"
      }
    ],
    "habilidades": [
      {
        "nome": "Bando",
        "tipo": "",
        "desc": "Se um dos mercenários inexperientes exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Um personagem com o poder Trespassar que acerte os mercenários pode usá-lo para fazer um ataque adicional contra eles (mas apenas uma vez por turno)."
      },
      {
        "nome": "Finta Coletiva (Padrão)",
        "tipo": "",
        "desc": "Os mercenários inexperientes fazem um único teste para fintar (Tormenta20, p. 119) contra todas as criaturas em alcance curto (teste +10). As que falharem ficam desprevenidas contra o próximo ataque dos mercenários até o fim do próximo turno deles."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+5"
      }
    ],
    "equipamento": "Armadura acolchoada x10, lanças x10.",
    "tesouro": "Nenhum"
  },
  {
    "nome": "Lobisomem Aldeão",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 241,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+5",
    "percepcao": "+5",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "19",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "cura acelerada 20/prata",
    "pv": "70",
    "desl": "12m (8q)",
    "atributos": {
      "for": "3",
      "des": "1",
      "con": "2",
      "int": "-1",
      "sab": "1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Duas garras",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "2d6+6"
      },
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Derrubar",
        "tipo": "Livre",
        "desc": "Se o lobisomem acerta um ataque de mordida, pode fazer a manobra derrubar (teste +12)."
      },
      {
        "nome": "Líder da Matilha",
        "desc": "A categoria de atitude inicial de cães e lobos com o lobisomem bárbaro é melhorada em um passo e ele pode usar Adestramento para mudar atitude e persuasão com essas criaturas (veja Tormenta20, p. 118)."
      },
      {
        "nome": "Maldição da Licantropia",
        "desc": "Um humanoide atingido pela mordida do lobisomem sofre a maldição licantropia (Fort CD 16 evita)."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Soldado Vampírico",
    "nd": "6",
    "fonte": "Breves Jornadas",
    "paginaPdf": 241,
    "tipo": "Morto-vivo Médio",
    "iniciativa": "+9",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "26",
    "fort": "+12",
    "ref": "+17",
    "von": "+7",
    "defesaObs": "cura acelerada 10, redução de dano 5/ luz",
    "pv": "50",
    "desl": "15m (10q), escalar 15m (10q)",
    "atributos": {
      "for": "5",
      "des": "4",
      "con": "2",
      "int": "-3",
      "sab": "0",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Espada longa x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+22",
        "dano": "1d10+10, 19 mais 1d10 trevas"
      },
      {
        "nome": "Garro/garra",
        "tipo": "Corpo a Corpo",
        "bonus": "+22",
        "dano": "1d8+10 mais 1d10 trevas"
      }
    ],
    "habilidades": [
      {
        "nome": "Agarrar Aprimorado",
        "tipo": "Livre",
        "desc": "Garra (teste +24)."
      },
      {
        "nome": "Drenar Sangue",
        "tipo": "Padrão",
        "desc": "O soldado vampírico drena sangue de uma criatura viva que esteja agarrando; ele causa 6d6 pontos de dano de perfuração e recupera a mesma quantidade de PV."
      },
      {
        "nome": "Sensibilidade ao Sol",
        "desc": "Quando exposto à luz solar direta, o soldado vampírico fica ofuscado e perde 6d6 PV por rodada."
      }
    ],
    "tesouro": "Nenhum.",
    "equipamento": "Espada longa, meia armadura."
  },
  {
    "nome": "Cultista do Devorador",
    "nd": "½",
    "fonte": "Breves Jornadas",
    "paginaPdf": 255,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+2",
    "percepcao": "+3",
    "defesa": "13",
    "fort": "+5",
    "ref": "+3",
    "von": "+0",
    "pv": "6",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "0",
      "con": "1",
      "int": "0",
      "sab": "1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Adaga",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d4+3",
        "desc": "19"
      }
    ],
    "habilidades": [
      {
        "nome": "Anatomia Anômala",
        "tipo": "",
        "desc": "O cultista tem 25% de chance de ignorar dano adicional de um acerto crítico ou ataque furtivo."
      }
    ],
    "equipamento": "Adaga",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Rhayrivel Enfraquecido",
    "nd": "ND 5",
    "fonte": "Breves Jornadas",
    "paginaPdf": 263,
    "tipo": "Espírito (abissal) Médio",
    "iniciativa": "+6",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "24",
    "fort": "+16",
    "ref": "+12",
    "von": "+5",
    "defesaObs": "imunidade a ácido e veneno, redução de dano 5, redução de fogo e frio 10",
    "pv": "200",
    "desl": "9m (6q)",
    "atributos": {
      "for": "4",
      "des": "2",
      "con": "3",
      "int": "-1",
      "sab": "1",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Pancada x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+17",
        "dano": "2d8+6"
      },
      {
        "nome": "Correntes Farpadas",
        "tipo": "Padrão",
        "dano": "4d8+13",
        "desc": "O rhayrivel projeta suas correntes contra uma criatura em alcance curto. A vítima sofre 4d8+13 pontos de dano de corte, fica sangrando e é acometida por uma dor profunda, que causa uma penalidade de –5 em testes de perícia até o fim da cena (Fort CD 20 reduz à metade, evita o sangramento e a penalidade). Um efeito capaz de remover uma condição de fadiga remove a dor e a penalidade."
      }
    ],
    "habilidades": [
      {
        "nome": "Sadismo",
        "tipo": "Habilidade",
        "desc": "O rhayrivel recebe +5 em testes de ataque e rolagens de dano contra criaturas que estejam sangrando."
      }
    ],
    "pericias": [
      {
        "nome": "Intimidação",
        "valor": "+12"
      }
    ],
    "tesouro": "Padrão."
  },
  {
    "nome": "Enxame de Morcegos Sombrios",
    "nd": "ND 4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 263,
    "tipo": "Animal Grande",
    "iniciativa": "+8",
    "percepcao": "+7",
    "percepcaoObs": "faro, percepção às cegas",
    "defesa": "22",
    "fort": "+10",
    "ref": "+15",
    "von": "+5",
    "pv": "28",
    "desl": "4,5m (3q), voo 12m (8q)",
    "atributos": {
      "for": "-3",
      "des": "4",
      "con": "2",
      "int": "-5",
      "sab": "3",
      "car": "-2"
    },
    "habilidades": [
      {
        "nome": "Beber Sangue",
        "tipo": "Habilidade",
        "desc": "Para cada ponto de vida que o enxame causar a uma criatura, ele ganha 1 PV temporário."
      },
      {
        "nome": "Doença",
        "tipo": "Habilidade",
        "desc": "Uma criatura que sofre dano do enxame é exposta à doença moléstia demoníaca. Um personagem que passe no teste de Fortitude não pode mais ser infectado naquele mesmo dia."
      },
      {
        "nome": "Enxame",
        "tipo": "Habilidade",
        "desc": "Os morcegos sombrios são um aglomerado que age em conjunto. Eles podem entrar no espaço ocupado por um personagem e, no fim de seu turno, causa 6d8 pontos de dano de perfuração e doença a qualquer personagem em seu espaço, automaticamente. O enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área. Além disso, sofre apenas metade do dano de ataques com armas. Estar dentro do enxame conta como condição ruim para lançar magias."
      }
    ],
    "pericias": [],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Autômato de Segurança",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 270,
    "tipo": "Construto Médio",
    "iniciativa": "+1",
    "percepcao": "+2",
    "percepcaoObs": "visão no escuro",
    "defesa": "16",
    "fort": "+11",
    "ref": "+5",
    "von": "+0",
    "defesaObs": "redução de dano 2",
    "pv": "35",
    "desl": "6m (4q)",
    "atributos": {
      "for": "3",
      "des": "-1",
      "con": "3",
      "int": "—",
      "sab": "0",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Duas pancadas",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d8+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Engrenagens Soltas",
        "desc": "Quando sofre um acerto crítico ou se for atingido em pontos frágeis (Defesa 21), o autômato de segurança tomba como uma pilha de sucata. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos."
      },
      {
        "nome": "Golpe Atordoante",
        "desc": "Uma criatura que sofra dano da pancada do autômato de segurança fica atordoada (Fort CD 14 evita). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena."
      }
    ],
    "tesouro": "Pilha de sucata (vale T$ 100 para fabricar engenhocas)."
  },
  {
    "nome": "Empalhado Corvo",
    "nd": "¼",
    "fonte": "Breves Jornadas",
    "paginaPdf": 276,
    "tipo": "Morto-vivo Minúsculo",
    "iniciativa": "+6",
    "percepcao": "+3",
    "percepcaoObs": "visão no escuro",
    "defesa": "11",
    "fort": "-2",
    "ref": "+3",
    "von": "+0",
    "defesaObs": "redução de frio, impacto e perfuração 5",
    "pv": "7",
    "desl": "Deslocamento 3m (2q), voo 12m (8q)",
    "atributos": {
      "for": "-4",
      "des": "2",
      "con": "1",
      "int": "—",
      "sab": "1",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+6",
        "dano": "1d4+2 mais 1d6 trevas"
      }
    ],
    "habilidades": [
      {
        "nome": "Obra de Taxidermia",
        "desc": "Um empalhado corvo pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Cura ou Percepção (CD 25) para perceber que ele é um morto-vivo e não um animal inanimado."
      },
      {
        "nome": "Sangrar Palha",
        "desc": "O multiplicador de crítico de ataques com armas de corte contra o empalhado aumenta em +1."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+4"
      },
      {
        "nome": "Furtividade",
        "valor": "+9"
      }
    ],
    "tesouro": "Nenhum"
  },
  {
    "nome": "Iniciado Ceifeiro",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 277,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+4",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "14",
    "fort": "+0",
    "ref": "+5",
    "von": "+11",
    "pv": "25",
    "desl": "9m (6q)",
    "pm": "7",
    "atributos": {
      "for": "1",
      "des": "2",
      "con": "1",
      "int": "-1",
      "sab": "2",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Gadanho",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "2d4+5, x4, mais 1d6 trevas",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Dividir a Dor",
        "tipo": "Reação, 1 PM",
        "desc": "Uma vez por rodada, quando sofre dano, o iniciado sacrifica um de seus empalhados corvos em alcance curto para reduzir esse dano a 0."
      },
      {
        "nome": "Prazer Sombrio",
        "tipo": "",
        "desc": "Quando causa ou sofre dano, o iniciado ceifeiro recebe redução de dano 1 e recupera 1 ponto de mana. A redução de dano é cumulativa, até um máximo de RD 5, mas volta a zero se o iniciado passar 1 rodada sem causar ou sofrer dano."
      },
      {
        "nome": "Magias",
        "tipo": "Como um clérigo de 1º nível (CD 16)",
        "desc": "Arma Espiritual (Padrão, 1 PM) Uma vez por rodada, quando sofre um ataque corpo a corpo, o iniciado pode usar uma reação para causar 2d6 pontos de dano de corte no atacante.\nInfligir Ferimentos (Padrão, 1 PM) Uma criatura adjacente sofre 2d8+2 pontos de dano de trevas (Fortitude reduz à metade).\nPerdição (Padrão, 1 PM) Criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena."
      }
    ],
    "pericias": [
      {
        "nome": "Cura",
        "valor": "+4"
      },
      {
        "nome": "Misticismo",
        "valor": "+1"
      },
      {
        "nome": "Religião",
        "valor": "+4"
      }
    ],
    "equipamento": "Armadura de couro, gadanho cruel.",
    "tesouro": "Padrão"
  },
  {
    "nome": "Primus, centurião de outrora",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 277,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+0",
    "percepcao": "−1",
    "percepcaoObs": "faro",
    "defesa": "17",
    "fort": "+11",
    "ref": "+0",
    "von": "+5",
    "pv": "40",
    "desl": "6m (4q)",
    "atributos": {
      "for": "4",
      "des": "-2",
      "con": "3",
      "int": "3",
      "sab": "2",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Lança",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d6+4",
        "desc": ""
      },
      {
        "nome": "Chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d6+4",
        "desc": ""
      },
      {
        "nome": "Azagaia",
        "tipo": "À Distância",
        "bonus": "+2",
        "dano": "1d6",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "Derrubar",
        "tipo": "Livre",
        "desc": "Chifres (teste +14)."
      },
      {
        "nome": "Distraído",
        "tipo": "",
        "desc": "Primus sofre –2 para resistir a testes de fintar."
      },
      {
        "nome": "Medo de Altura",
        "tipo": "",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), Primus fica abalado."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+8"
      },
      {
        "nome": "Guerra",
        "valor": "+5"
      }
    ],
    "equipamento": "Azagaia x2, lança, loriga segmentada.",
    "tesouro": "Nenhum"
  },
  {
    "nome": "Espectro do Pesadelo",
    "nd": "5",
    "fonte": "Breves Jornadas",
    "paginaPdf": 284,
    "tipo": "Espírito Grande",
    "iniciativa": "+7",
    "percepcao": "+8",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "24",
    "fort": "+17",
    "ref": "+11",
    "von": "+5",
    "defesaObs": "imunidade a efeitos de medo, mentais e trevas, redução de dano 5/luz, vulnerabilidade a luz",
    "pv": "200",
    "desl": "15m (10q)",
    "atributos": {
      "for": "6",
      "des": "3",
      "con": "4",
      "int": "-2",
      "sab": "2",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Cascos x2",
        "tipo": "corpo a corpo",
        "bonus": "+17",
        "dano": "2d6+5, mais 2d8 trevas"
      }
    ],
    "habilidades": [
      {
        "nome": "DEVORAR SONHOS",
        "tipo": "COMPLETA",
        "desc": "O espectro do pesadelo devora os sonhos de todas as criaturas em alcance curto. As vítimas perdem 1d4+1 PM (Von CD 20 reduz a perda à metade); para cada PM que as vítimas perderem dessa forma, o espectro recebe 5 PV temporários cumulativos. Se uma das criaturas afetadas estiver dormindo, a perda de PM é dobrada. Recarga (completa)."
      },
      {
        "nome": "RELINCHO ATERRADOR",
        "tipo": "PADRÃO",
        "desc": "Todas as criaturas em alcance curto ficam apavoradas por 1d4+1 rodadas e então abaladas (Von CD 20 muda para abalados por 1d4+1 rodadas a criatura fica imune a essa habilidade até o fim da cena)."
      },
      {
        "nome": "SEMI-INCORPÓREO",
        "desc": "O espectro do pesadelo tem 25% de chance de ignorar ataques e efeitos (incluindo de área) contra ele. Efeitos de luz ou mágicos ignoram essa habilidade."
      },
      {
        "nome": "TERROR ENCARNADO",
        "desc": "O espectro recebe +2 em testes de ataque e +1d8 de dano de trevas contra criaturas abaladas."
      },
      {
        "nome": "VULNERABILIDADE À LUZ DO DIA",
        "desc": "Um espectro exposto a luz solar natural fica debilitado."
      }
    ]
  },
  {
    "nome": "Come-Sonhos",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 284,
    "tipo": "Espírito Minúsculo",
    "iniciativa": "+6",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "18",
    "fort": "+3",
    "ref": "+12",
    "von": "+7",
    "defesaObs": "imunidade a efeitos mentais, dano psíquico e medo, redução de dano 5/mitral",
    "pv": "14",
    "desl": "9m (6q)",
    "atributos": {
      "for": "-3",
      "des": "3",
      "con": "2",
      "int": "0",
      "sab": "2",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+14",
        "dano": "4d4+4 mais 2d6 psíquico"
      }
    ],
    "habilidades": [
      {
        "nome": "DEVORAR SONHOS",
        "tipo": "PADRÃO",
        "desc": "O come-sonhos devora os sonhos de uma criatura em alcance curto. A vítima perde 1d4+1 PM (Von CD 16 reduz a perda à metade); para cada PM que a vítima perder dessa forma, o come-sonhos recebe 5 PV temporários cumulativos. Se o come-sonhos usar esta habilidade em uma criatura que esteja dormindo, a perda de PM é dobrada. Recarga (causar dano psíquico com sua mordida)."
      },
      {
        "nome": "ÊXTASE ONÍRICO",
        "desc": "Se fosse sofrer dano psíquico, em vez disso o come-sonhos cura PV em quantidade igual ao dano que sofreria."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+13"
      },
      {
        "nome": "Intuição",
        "valor": "+7"
      }
    ]
  },
  {
    "nome": "Enxame de Armas",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 291,
    "tipo": "Construto Grande",
    "iniciativa": "+6",
    "percepcao": "+4",
    "percepcaoObs": "às cegas",
    "defesa": "22",
    "fort": "+15",
    "ref": "+10",
    "von": "+5",
    "defesaObs": "redução de dano 5",
    "pv": "140",
    "desl": "voo 9m (6q)",
    "atributos": {
      "for": "4",
      "des": "2",
      "con": "2",
      "int": "––",
      "sab": "0",
      "car": "–5"
    },
    "habilidades": [
      {
        "nome": "Enxame",
        "desc": "O enxame de armas é um aglomerado de objetos animados que agem em conjunto. Ele pode entrar no espaço ocupado por um personagem e, no fim de seu turno, causa 1d10 pontos de dano de corte, 1d6 pontos de dano de perfuração e 1d8 pontos de dano de impacto a qualquer personagem em seu espaço, automaticamente. O enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Além disso, sofre apenas metade do dano de ataques com armas. Estar dentro do enxame conta como condição ruim para lançar magias."
      },
      {
        "nome": "Aparar",
        "tipo": "Reação",
        "desc": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, o enxame de arma pode fazer um teste de ataque e subtrair seu resultado do dano causado pelo ataque (teste +16)."
      }
    ],
    "tesouro": "Dobro (apenas armas)."
  },
  {
    "nome": "Oxxdon",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 291,
    "tipo": "Monstro Médio",
    "iniciativa": "+7",
    "percepcao": "+4",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "20",
    "fort": "+7",
    "ref": "+13",
    "von": "+2",
    "pv": "72",
    "desl": "12m (8q)",
    "atributos": {
      "for": "0",
      "des": "4",
      "con": "2",
      "int": "–4",
      "sab": "1",
      "car": "–1"
    },
    "ataques": [
      {
        "nome": "Antena",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "desc": "ferrugem"
      },
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+12",
        "dano": "1d8+10"
      }
    ],
    "habilidades": [
      {
        "nome": "Ferrugem",
        "desc": "A antena do oxxdon destrói automaticamente qualquer objeto de metal atingido. Uma arma de metal que cause dano a um oxxdon também é destruída imediatamente (itens mágicos têm direito a um teste de Fortitude contra CD 16 para evitar). Contra criaturas de metal (como golens), a antena deixa o alvo fatigado, então exausto, então paralisado (mesmo que seja imune a estas condições; Fort CD 16 evita). Remover cada uma destas condições da criatura exige uma hora de trabalho, o gasto de T$ 50 em materiais e passar em um teste de Ofício (artesão) contra CD 20."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Tropa de Mortos",
    "nd": "5",
    "fonte": "Breves Jornadas",
    "paginaPdf": 292,
    "tipo": "Morto-vivo Grande",
    "iniciativa": "+9",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "24",
    "fort": "+6",
    "ref": "+11",
    "von": "+16",
    "defesaObs": "redução de corte, frio e perfuração 5",
    "pv": "40",
    "desl": "9m (6q)",
    "atributos": {
      "for": "5",
      "des": "3",
      "con": "0",
      "int": "—",
      "sab": "0",
      "car": "–5"
    },
    "ataques": [
      {
        "nome": "Espada longa x2",
        "tipo": "CORPO A CORPO",
        "bonus": "+20",
        "dano": "4d8+18, 19",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "BANDO",
        "tipo": "",
        "desc": "A tropa de mortos é formada por um grupo de esqueletos. Se um ataque da tropa exceder a Defesa do Inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque da tropa errar, ele ainda causa metade do dano. A falange é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Um personagem com poder Trespassar que acerte a tropa pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
      }
    ],
    "equipamento": "Escudo pesado, espada longa.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Inumano",
    "nd": "6",
    "fonte": "Breves Jornadas",
    "paginaPdf": 292,
    "tipo": "Morto-vivo Médio",
    "iniciativa": "+7",
    "percepcao": "+6",
    "percepcaoObs": "visão no escuro",
    "defesa": "26",
    "fort": "+17",
    "ref": "+12",
    "von": "+7",
    "defesaObs": "imunidade a frio",
    "pv": "48",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "2",
      "con": "1",
      "int": "0",
      "sab": "1",
      "car": "−1"
    },
    "ataques": [
      {
        "nome": "Espada longa x2",
        "tipo": "CORPO A CORPO",
        "bonus": "+24",
        "dano": "2d8+9, 19, mais 2d12 trevas",
        "desc": ""
      },
      {
        "nome": "Azagaia",
        "tipo": "À DISTÂNCIA",
        "bonus": "+24",
        "dano": "2d6+9, mais 2d12 trevas",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "DRENAR ENERGIA",
        "tipo": "",
        "desc": "Uma criatura viva que sofra dano de trevas do inumano combatente sofre uma penalidade cumulativa de −1 em testes de perícia (Fort CD 22 evita). Se acumular uma penalidade igual ou maior que seu próprio nível, a criatura morre e se transforma em um inumano sob controle do mestre. Esta penalidade pode ser removida de uma criatura viva com descanso ou com efeitos mágicos capazes de remover qualquer condição de metabolismo (cada dia de descanso ou efeito mágico diminui a penalidade em 1)."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+8"
      },
      {
        "nome": "Furtividade",
        "valor": "+4"
      },
      {
        "nome": "Guerra",
        "valor": "+5"
      },
      {
        "nome": "Intimidação",
        "valor": "+6"
      }
    ],
    "equipamento": "Azagaia x3, escudo pesado, espada longa, meia armadura.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Enxame cáustico",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 299,
    "tipo": "Animal Grande",
    "iniciativa": "+3",
    "percepcao": "+2",
    "percepcaoObs": "visão no escuro",
    "defesa": "23",
    "fort": "+16",
    "ref": "+4",
    "von": "+10",
    "defesaObs": "imunidade a ácido",
    "pv": "140",
    "desl": "9m (6q), escavação 6m (4q)",
    "habilidades": [
      {
        "nome": "Enxame",
        "tipo": "",
        "desc": "O enxame cáustico age em conjunto. Ele pode entrar no espaço ocupado por um personagem e, no fim de seu turno, causa 3d8 pontos de dano de ácido a qualquer personagem em seu espaço automaticamente. O enxame é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas sofre 50% a mais de dano de efeitos de área, como Bola de Fogo. Além disso, sofre apenas metade do dano de ataques com armas. Estar dentro do enxame conta como condição ruim para lançar magias."
      }
    ],
    "atributos": {
      "for": "-1",
      "des": "3",
      "con": "2",
      "int": "-1",
      "sab": "1",
      "car": "-2"
    }
  },
  {
    "nome": "ANKTHYR",
    "nd": "8",
    "fonte": "Breves Jornadas",
    "paginaPdf": 300,
    "tipo": "Animal Grande",
    "iniciativa": "+10",
    "percepcao": "+8",
    "percepcaoObs": "visão no escuro",
    "defesa": "33",
    "fort": "+21",
    "ref": "+8",
    "von": "+15",
    "defesaObs": "redução de ácido 5, redução de dano 5",
    "pv": "308",
    "desl": "12m (8q), escavação 6m (4q)",
    "atributos": {
      "for": "5",
      "des": "2",
      "con": "4",
      "int": "-5",
      "sab": "0",
      "car": "-3"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a corpo",
        "bonus": "+26",
        "dano": "4d12+24 mais 4d8 ácido"
      },
      {
        "nome": "Agarrar Aprimorado",
        "tipo": "Mordida",
        "bonus": "+28"
      },
      {
        "nome": "Cuspe Ácido",
        "tipo": "Padrão",
        "dano": "6d8+6 ácido",
        "desc": "A vítima fica coberta por um muco corrosivo (Ref CD 26 reduz à metade e evita o muco). Uma criatura coberta pelo muco sofre mais 3d8+3 pontos de dano de ácido no início dos seus dois próximos turnos. Recarga (movimento)."
      }
    ],
    "habilidades": [
      {
        "nome": "Espreitador Subterrâneo",
        "tipo": "Padrão",
        "desc": "Se estiver completamente soterrado, o ankthyr pode emergir do solo e atacar uma criatura a até 4,5m do seu ponto de saída. Se fizer isso, ele recebe +2 no teste de ataque e causa +1d12 pontos de dano."
      },
      {
        "nome": "Sentido Sísmico",
        "desc": "O ankthyr tem percepção às cegas em alcance médio, mas apenas para criaturas e objetos em contato com a mesma superfície que ele."
      }
    ]
  },
  {
    "nome": "Defensor Rochoso Desperto",
    "nd": "8",
    "fonte": "Breves Jornadas",
    "paginaPdf": 307,
    "tipo": "Construto Médio",
    "iniciativa": "+8",
    "percepcao": "+8",
    "percepcaoObs": "visão no escuro",
    "defesa": "33",
    "fort": "+20",
    "ref": "+9",
    "von": "+15",
    "defesaObs": "imunidade a atordoado e petrificado, redução de dano 10",
    "pv": "320",
    "desl": "6m (4q)",
    "atributos": {
      "for": "6",
      "des": "0",
      "con": "3",
      "int": "—",
      "sab": "0",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Duas pancadas",
        "tipo": "corpo a corpo",
        "bonus": "+26",
        "dano": "4d8+19, x3",
        "desc": ""
      }
    ],
    "habilidades": [
      {
        "nome": "IMOBILIDADE",
        "tipo": "",
        "desc": "Um defensor rochoso pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ele é uma criatura e não uma estátua."
      },
      {
        "nome": "NATUREZA ABASCANTA",
        "tipo": "",
        "desc": "O defensor tem 50% de chance de ignorar um efeito mágico (como se fosse imune a ele), com exceção da magia Despedaçar."
      },
      {
        "nome": "PANCADA ATORDOANTE",
        "tipo": "",
        "desc": "Uma criatura que sofra dano da pancada do defensor rochoso desperto fica atordoada (Fort CD 26 evita). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Revoada de Serpes",
    "nd": "8",
    "fonte": "Breves Jornadas",
    "paginaPdf": 308,
    "tipo": "Monstro Enorme",
    "iniciativa": "+9",
    "percepcao": "+9",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "33",
    "fort": "+15",
    "ref": "+21",
    "von": "+8",
    "defesaObs": "imunidade a paralisia",
    "pv": "320",
    "desl": "9m (6q), voo 18m (12q)",
    "atributos": {
      "for": "7",
      "des": "1",
      "con": "6",
      "int": "-2",
      "sab": "1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+26",
        "dano": "2d6+12"
      },
      {
        "nome": "Ferrão",
        "tipo": "corpo a corpo",
        "bonus": "+26",
        "dano": "1d8+12",
        "desc": "mais veneno"
      }
    ],
    "habilidades": [
      {
        "nome": "Agarrar Aprimorado",
        "tipo": "livre",
        "desc": "Mordida +31."
      },
      {
        "nome": "Veneno",
        "tipo": "Peçonha concentrada",
        "desc": "perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 26 reduz a duração para uma rodada."
      }
    ],
    "tesouro": "8d4 doses de peçonha concentrada (CD 23 para extrair)."
  },
  {
    "nome": "Basilisco Ancestral",
    "nd": "9",
    "fonte": "Breves Jornadas",
    "paginaPdf": 308,
    "tipo": "Monstro Enorme",
    "iniciativa": "+10",
    "percepcao": "+9",
    "percepcaoObs": "visão no escuro",
    "defesa": "33",
    "fort": "+21",
    "ref": "+14",
    "von": "+10",
    "defesaObs": "imunidade a metamorfose, redução de dano 10, resistência a veneno +10",
    "pv": "370",
    "desl": "9m (6q), natação 9m (6q)",
    "atributos": {
      "for": "6",
      "des": "2",
      "con": "5",
      "int": "-4",
      "sab": "3",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "corpo a corpo",
        "bonus": "+27",
        "dano": "4d8+25",
        "desc": "mais veneno"
      }
    ],
    "habilidades": [
      {
        "nome": "Olhar Petrificante",
        "tipo": "",
        "desc": "No início de seu turno, cada personagem em alcance curto do basilisco deve fazer um teste de Reflexos (CD 28). Se passar, desvia o olhar. Se falhar, fica lento. Se já estiver lento, fica petrificado permanentemente. Um personagem pode fechar os olhos como uma reação para ficar imune a esta habilidade, mas sofrerá os efeitos de estar cego por uma rodada. Efeitos que removem paralisia revertem a petrificação. Metamorfose."
      },
      {
        "nome": "Sopro",
        "tipo": "",
        "desc": "Todas as criaturas em um cone de 9m perdem 3d12 pontos de vida e ficam envenenadas, perdendo 3d12 PV, por 3 rodadas (Fort CD 28 reduz a perda de vida à metade e evita a condição). Recarga (movimento)."
      },
      {
        "nome": "Veneno",
        "tipo": "Peçonha potente",
        "desc": "perde 2d12 pontos de vida por rodada durante 3 rodadas, Fort CD 28 reduz a duração para uma rodada."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+10"
      }
    ],
    "tesouro": "2d4 doses de peçonha potente (CD 24 para extrair), couro de basilisco (CD 24 para extrair, conta como T$ 2.000 como matéria-prima para fabricar uma armadura super)."
  },
  {
    "nome": "Presa do Grande Basilisco",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 308,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+5",
    "percepcao": "+5",
    "defesa": "20",
    "fort": "+9",
    "ref": "+4",
    "von": "+14",
    "pv": "21",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "2",
      "con": "3",
      "int": "1",
      "sab": "2",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Machado de batalha",
        "tipo": "corpo a corpo",
        "bonus": "+10",
        "dano": "1d8+5",
        "desc": "mais veneno"
      }
    ],
    "habilidades": [
      {
        "nome": "Ódio Sórdido",
        "tipo": "",
        "desc": "O presa do Grande Basilisco recebe +2 em testes de ataque e +1d6 em rolagens de dano contra criaturas flanqueadas ou sob efeito de alguma condição."
      },
      {
        "nome": "Vitalidade Peçonhenta",
        "tipo": "",
        "desc": "Quando sofre perda de pontos de vida por causa de um efeito de veneno, em vez disso o presa recupera 1d12 PV."
      },
      {
        "nome": "Veneno",
        "tipo": "Peçonha concentrada",
        "desc": "perde 1d12 pontos de vida durante 3 rodadas, Fort CD 19 reduz a duração para 1 rodada."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+3"
      },
      {
        "nome": "Intimidação",
        "valor": "+2"
      }
    ],
    "tesouro": "Padrão."
  },
  {
    "nome": "Terrier",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 126,
    "tipo": "Espírito (elemental) Pequeno",
    "iniciativa": "+0",
    "percepcao": "+3",
    "percepcaoObs": "visão no escuro",
    "defesa": "16",
    "fort": "+11",
    "ref": "+0",
    "von": "+5",
    "defesaObs": "imunidade a acertos críticos, ácido, atordoado, cansaço, efeitos de metabolismo e paralisia, redução de dano 5/impacto, vulnerabilidade a eletricidade",
    "pv": "35",
    "desl": "6m (4q)",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "3",
      "int": "-3",
      "sab": "1",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "2d6+8"
      }
    ],
    "habilidades": [
      {
        "nome": "Pedra-Punho",
        "tipo": "Padrão",
        "desc": "O terrier dispara pedras do tamanho de um punho humano em criaturas à sua escolha em alcance curto. Cada criatura sofre 1d6+4 pontos de dano de impacto e fica atordoada por 1 rodada (Fort CD 16 reduz à metade e evita a condição). Uma criatura que passe no teste de resistência não pode mais ser atordoada por esta habilidade até o fim da cena. Recarga (movimento)."
      },
      {
        "nome": "Pedregoso",
        "tipo": "",
        "desc": "Um terrier pode permanecer completamente imóvel. Se ele estiver assim, um personagem deve passar num teste de Percepção (CD 30) para perceber que ele é uma criatura e não um monte de pedras."
      },
      {
        "nome": "Familiar",
        "tipo": "",
        "desc": "Um terrier familiar concede redução de dano 2/impacto."
      }
    ],
    "tesouro": "1 dose de éter elemental (ácido) (CD 16 para extrair)."
  },
  {
    "nome": "Pakk",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 127,
    "tipo": "Espírito (elemental) Minúsculo",
    "iniciativa": "+7",
    "percepcao": "+2",
    "percepcaoObs": "visão no escuro",
    "defesa": "15",
    "fort": "+5",
    "ref": "+10",
    "von": "+1",
    "defesaObs": "imunidade a acertos críticos, atordoado, cansaço, efeitos de metabolismo, fogo e paralisia, vulnerabilidade a frio",
    "pv": "9",
    "desl": "voo 12m (8q)",
    "atributos": {
      "for": "0",
      "des": "5",
      "con": "1",
      "int": "-1",
      "sab": "2",
      "car": "3"
    },
    "ataques": [
      {
        "nome": "Queimadura",
        "tipo": "Corpo a Corpo",
        "bonus": "+11",
        "dano": "4d6 fogo"
      }
    ],
    "habilidades": [
      {
        "nome": "Arco de Chamas",
        "tipo": "Padrão",
        "desc": "O pakk projeta chamas em um cone de 6m. Criaturas nessa área sofrem 3d6 pontos de dano de fogo (Ref CD 14 reduz à metade). Recarga (movimento)."
      },
      {
        "nome": "Labareda Viva",
        "tipo": "",
        "desc": "No início de cada turno do pakk, todas as criaturas em alcance curto sofrem 1d4 pontos de dano de fogo."
      }
    ],
    "tesouro": "1 dose de éter elemental (fogo) (CD 16 para extrair)."
  },
  {
    "nome": "Motor Elemental",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 127,
    "tipo": "Construto Grande",
    "iniciativa": "+1",
    "percepcao": "+1",
    "percepcaoObs": "percepção às cegas",
    "defesa": "17",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "pv": "49",
    "desl": "9m (6q)",
    "atributos": {
      "for": "4",
      "des": "-1",
      "con": "3",
      "int": "—",
      "sab": "0",
      "car": "-3"
    },
    "ataques": [
      {
        "nome": "Duas pancadas",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "1d6+10"
      }
    ],
    "habilidades": [
      {
        "nome": "Forma Elemental",
        "tipo": "Livre",
        "desc": "No início de seu turno, o motor elemental muda de uma das formas elementais abaixo para outra. O construto não pode mudar para uma forma já assumida, até ter mudado para todas as outras. Forma da Água: imunidade a frio e vulnerabilidade a fogo, ataques corpo a corpo causam +1d6 de frio e o halo elemental causa dano de frio. Forma do Ar: imunidade a eletricidade e vulnerabilidade a ácido, ataques corpo a corpo causam +1d6 de eletricidade e o halo elemental causa dano de eletricidade. Forma do Fogo: imunidade a fogo e vulnerabilidade a frio, ataques corpo a corpo causam +1d6 de fogo e o halo elemental causa dano de fogo. Forma da Luz: imunidade a luz e vulnerabilidade a trevas, ataques corpo a corpo causam +1d6 de luz e o halo elemental causa dano de luz. Forma da Terra: imunidade a ácido e vulnerabilidade a eletricidade, ataques corpo a corpo causam +1d6 de ácido e o halo elemental causa dano de ácido. Forma das Trevas: imunidade a trevas e vulnerabilidade a luz, ataques corpo a corpo causam +1d6 de trevas e o halo elemental causa dano de trevas."
      },
      {
        "nome": "Halo Elemental",
        "tipo": "",
        "desc": "Criaturas que comecem o turno em alcance curto do motor elemental sofrem 1d6 pontos de dano de acordo com a forma elemental. Além disso, uma criatura que sofra dano sofre um efeito adicional conforme o tipo de dano: ácido, vulnerável por 1 rodada; eletricidade, ofuscado por 1 rodada; fogo, fica em chamas; frio, lento por 1 rodada; luz, cego por 1 rodada; trevas, enjoado por 1 rodada (Ref CD 18 reduz o dano à metade e evita a condição)."
      }
    ],
    "tesouro": "Padrão, mais ferro elemental (CD 17 para extrair, reduz em 1 PM o custo para fabricar um item com o encanto congelante, corrosiva, elétrica, flamejante ou tumular)."
  },
  {
    "nome": "Recruta Legionário",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 103,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+2",
    "percepcao": "+1",
    "percepcaoObs": "faro",
    "defesa": "15",
    "fort": "+5",
    "ref": "+0",
    "von": "+3",
    "pv": "9",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "2",
      "int": "0",
      "sab": "-1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Lança e chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "1d6+3 e 1d6+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Medo de Altura",
        "tipo": "",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), o recruta fica abalado."
      }
    ],
    "equipamento": "Couro batido, escudo leve, lança.",
    "tesouro": "Metade."
  },
  {
    "nome": "Decúria de Recrutas",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 103,
    "tipo": "Humanoide (minotauro) Grande",
    "iniciativa": "+2",
    "percepcao": "+1",
    "percepcaoObs": "faro",
    "defesa": "22",
    "fort": "+5",
    "ref": "+0",
    "von": "+3",
    "pv": "25",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "2",
      "int": "0",
      "sab": "-1",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "[Bando] Lanças e chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+14",
        "dano": "1d6+3 e 1d6+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Medo de Altura",
        "tipo": "",
        "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco), a decúria fica abalada."
      }
    ],
    "equipamento": "Couro batido, escudo leve, lança.",
    "tesouro": "Metade."
  },
  {
    "nome": "Magnus de Tauron",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 104,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+4",
    "percepcao": "+4",
    "percepcaoObs": "faro",
    "defesa": "26",
    "fort": "+16",
    "ref": "+4",
    "von": "+10",
    "pv": "130",
    "desl": "6m (4q)",
    "atributos": {
      "for": "4",
      "des": "0",
      "con": "3",
      "int": "0",
      "sab": "0",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Machado de guerra e chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+16",
        "dano": "3d6+6 (x3) e 1d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "Ordens",
        "tipo": "Movimento",
        "desc": "Magnus grita ordens para seus aliados em alcance médio. Eles recebem +2 em testes de perícia até o fim da cena."
      },
      {
        "nome": "Tremer a Terra",
        "tipo": "Movimento",
        "desc": "Todas as criaturas em alcance curto de Magnus ficam caídas (Fort CD 18 evita)."
      },
      {
        "nome": "Varrer",
        "tipo": "Livre",
        "desc": "Uma vez por rodada, quando Magnus faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+12"
      },
      {
        "nome": "Guerra",
        "valor": "+7"
      },
      {
        "nome": "Religião",
        "valor": "+6"
      }
    ],
    "equipamento": "Loriga segmentada reforçada, machado de guerra aumentado cruel, símbolo sagrado de Tauron.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Lobo Solitário",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 133,
    "tipo": "Animal Médio",
    "iniciativa": "+5",
    "percepcao": "+4",
    "percepcaoObs": "faro, visão na penumbra",
    "defesa": "15",
    "fort": "+11",
    "ref": "+6",
    "von": "+2",
    "pv": "43",
    "atributos": {
      "for": "4",
      "des": "3",
      "con": "3",
      "int": "-4",
      "sab": "0",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+7",
        "dano": "2d6+8"
      }
    ],
    "habilidades": [
      {
        "nome": "Derrubar",
        "tipo": "Livre",
        "desc": "Mordida (teste +9)."
      },
      {
        "nome": "Escaramuça Lupina",
        "tipo": "",
        "desc": "Quando se move 6m ou mais, o lobo recebe +2 na Defesa e +1d6 nas rolagens de dano de ataques corpo a corpo até o fim do próximo turno dele."
      }
    ],
    "pericias": [
      {
        "nome": "Sobrevivência",
        "valor": "+4"
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Bandido Atormentado",
    "nd": "1/4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 133,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+4",
    "percepcao": "+6",
    "percepcaoObs": "visão no escuro",
    "defesa": "15",
    "fort": "+1",
    "ref": "+3",
    "von": "-1",
    "defesaObs": "imunidade a acertos críticos e flanquear",
    "pv": "5",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "2",
      "con": "1",
      "int": "-1",
      "sab": "-1",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Clava",
        "tipo": "Corpo a Corpo",
        "bonus": "+5",
        "dano": "1d6+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Desapego à Vida",
        "tipo": "",
        "desc": "O bandido atormentado não fica inconsciente quando é reduzido a 0 PV ou menos, e só morre quando é reduzido a –10 PV."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+6"
      }
    ],
    "equipamento": "Clava.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Kashtrrak, Acólito de Aharadak",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 134,
    "tipo": "Monstro (lefou) Médio",
    "iniciativa": "+5",
    "percepcao": "+8",
    "percepcaoObs": "visão no escuro",
    "defesa": "16",
    "fort": "+7",
    "ref": "+2",
    "von": "+13",
    "defesaObs": "imunidade a efeitos mentais e de medo, resistência à magia divina +5",
    "pv": "49",
    "desl": "9m (6q)",
    "pm": "12",
    "atributos": {
      "for": "2",
      "des": "2",
      "con": "2",
      "int": "-2",
      "sab": "2",
      "car": "-3"
    },
    "ataques": [
      {
        "nome": "Cutelo de Aharadak",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "1d6+2, mais 1d6 de matéria vermelha e sangramento"
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como um clérigo de Aharadak de 2º nível (CD 18). Arma Espiritual (Padrão, 2 PM): até o fim da cena, Kashtrrak recebe +1 na Defesa e, uma vez por rodada, quando sofre um ataque corpo a corpo, causa 2d6 pontos de dano de corte no atacante como uma reação. Infligir Ferimentos (Padrão, 2 PM): uma criatura adjacente sofre 2d8+2 pontos de dano de trevas e fica fraca (Fort reduz à metade e evita a condição). Perdição (Padrão, 1 PM): criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena."
      }
    ],
    "pericias": [
      {
        "nome": "Intimidação",
        "valor": "+5"
      },
      {
        "nome": "Religião",
        "valor": "+5"
      },
      {
        "nome": "Sobrevivência",
        "valor": "+5"
      }
    ],
    "equipamento": "Armadura de couro, símbolo sagrado de Aharadak e Cutelo de Aharadak (espada curta atroz sanguinária de matéria vermelha; para quem não for lefou, devoto de Aharadak ou possuir três poderes da Tormenta, sua presença em alcance curto causa terríveis pesadelos — Vontade CD 20 ou acorda alquebrado por um dia).",
    "tesouro": "Metade."
  },
  {
    "nome": "Bandido Ligeiro",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 161,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+4",
    "percepcao": "+1",
    "defesa": "15",
    "fort": "+3",
    "ref": "+5",
    "von": "+0",
    "pv": "9",
    "desl": "9m (6q)",
    "atributos": {
      "for": "1",
      "des": "2",
      "con": "1",
      "int": "0",
      "sab": "-1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Clava",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d6+5"
      },
      {
        "nome": "Funda",
        "tipo": "À Distância",
        "bonus": "+9",
        "dano": "1d6+1"
      }
    ],
    "habilidades": [],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+6"
      }
    ],
    "equipamento": "Clava, funda, pedras x20.",
    "tesouro": "Metade."
  },
  {
    "nome": "Trog Encrenqueiro",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 161,
    "tipo": "Monstro (trog) Médio",
    "iniciativa": "+1",
    "percepcao": "+5",
    "percepcaoObs": "visão no escuro",
    "defesa": "19",
    "fort": "+11",
    "ref": "+0",
    "von": "+5",
    "pv": "35",
    "desl": "9m (6q)",
    "atributos": {
      "for": "5",
      "des": "1",
      "con": "5",
      "int": "-2",
      "sab": "0",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Duas garras e mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "1d6+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Gosto Por Tripas",
        "tipo": "",
        "desc": "O trog encrenqueiro recebe +2 em rolagens de dano contra criaturas em que já tenha causado dano na cena."
      },
      {
        "nome": "Mau Cheiro",
        "tipo": "Padrão",
        "desc": "O trog expele um gás fétido. Todas as criaturas (exceto trogs) em alcance curto ficam enjoadas por 1d6 rodadas (Fort CD 14 evita). Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia. Veneno."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+8"
      },
      {
        "nome": "Intimidação",
        "valor": "+3"
      }
    ],
    "tesouro": "Metade."
  },
  {
    "nome": "Kobold Bruto",
    "nd": "4",
    "fonte": "Breves Jornadas",
    "paginaPdf": 213,
    "tipo": "Monstro (kobold) Grande",
    "iniciativa": "+5",
    "percepcao": "+2",
    "percepcaoObs": "visão no escuro",
    "defesa": "23",
    "fort": "+16",
    "ref": "+10",
    "von": "+2",
    "pv": "120",
    "desl": "9m (6q)",
    "atributos": {
      "for": "6",
      "des": "1",
      "con": "4",
      "int": "-3",
      "sab": "-2",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Tacape",
        "tipo": "Corpo a Corpo",
        "bonus": "+16",
        "dano": "1d12+18"
      }
    ],
    "habilidades": [
      {
        "nome": "Escamas de Kally",
        "tipo": "",
        "desc": "Todo dano que o kobold bruto sofre é reduzido à metade."
      },
      {
        "nome": "Peste Oportunista",
        "tipo": "",
        "desc": "Os ataques do kobold causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
      },
      {
        "nome": "Cabecinha",
        "tipo": "",
        "desc": "A habilidade Escamas de Kally não se aplica a acertos críticos e ataques contra a cabeça diminuta do kobold (Defesa 33)."
      },
      {
        "nome": "Sensibilidade a Luz",
        "tipo": "",
        "desc": "Quando exposto à luz do sol ou similar, o kobold bruto fica ofuscado."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+10"
      }
    ],
    "equipamento": "Tacape aumentado.",
    "tesouro": "Metade."
  },
  {
    "nome": "Groko de Kallyadranoch",
    "nd": "3",
    "fonte": "Breves Jornadas",
    "paginaPdf": 213,
    "tipo": "Monstro (kobold) Pequeno",
    "iniciativa": "+5",
    "percepcao": "+6",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+3",
    "ref": "+9",
    "von": "+15",
    "defesaObs": "resistência a magia +1",
    "pv": "69",
    "desl": "9m (6q)",
    "pm": "15",
    "atributos": {
      "for": "0",
      "des": "2",
      "con": "1",
      "int": "-1",
      "sab": "3",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Lança e mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d8+3 e 1d4+3"
      },
      {
        "nome": "Funda",
        "tipo": "À Distância",
        "bonus": "+12",
        "dano": "1d6+3"
      }
    ],
    "habilidades": [
      {
        "nome": "Aura de Medo",
        "tipo": "Livre, 2 PM",
        "desc": "Groko gera uma aura de medo de 9m de raio e duração cena. Todos os inimigos que entram na aura ficam abalados até o fim da cena (Von CD 19 evita) e a criatura não pode mais ser abalada por esta habilidade por um dia."
      },
      {
        "nome": "Peste Oportunista",
        "tipo": "",
        "desc": "Os ataques de Groko causam +1d4 pontos de dano contra inimigos que já sofreram dano na rodada."
      },
      {
        "nome": "Símbolo Sagrado Energizado",
        "tipo": "Movimento, 1 PM",
        "desc": "Groko energiza seu símbolo sagrado. Até o fim da cena, ele emite uma luz avermelhada que ilumina como uma tocha e, enquanto estiver sendo empunhado por Groko, reduz o custo de magias divinas em –1 PM."
      },
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como um clérigo de Kallyadranoch de 3º nível (CD 19). Curar Ferimentos (Padrão, 3 PM): uma criatura adjacente cura 4d8+4 PV. Escudo da Fé (Reação, 1 PM): quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa até seu próximo turno. Perdição (Padrão, 1 PM): criaturas escolhidas em alcance curto sofrem –1 em testes de ataque e rolagens de dano até o fim da cena."
      },
      {
        "nome": "Sensibilidade a Luz",
        "tipo": "",
        "desc": "Quando exposto à luz do sol ou similar, Groko fica ofuscado."
      }
    ],
    "pericias": [
      {
        "nome": "Cura",
        "valor": "+6"
      },
      {
        "nome": "Furtividade",
        "valor": "+9"
      },
      {
        "nome": "Misticismo",
        "valor": "+2"
      },
      {
        "nome": "Religião",
        "valor": "+6"
      }
    ],
    "equipamento": "Andrajos, bálsamo restaurador, funda, gadanho, pedras x20, símbolo sagrado de Kallyadranoch.",
    "tesouro": "Metade."
  },
  {
    "nome": "Claudius",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 174,
    "tipo": "Humanoide (minotauro) Médio",
    "iniciativa": "+0",
    "percepcao": "+0",
    "percepcaoObs": "faro",
    "defesa": "16",
    "fort": "+5",
    "ref": "+0",
    "von": "+0",
    "pv": "23",
    "desl": "9m (6q)",
    "atributos": {
      "for": "4",
      "des": "0",
      "con": "3",
      "int": "1",
      "sab": "0",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Machado de batalha e chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+6",
        "dano": "1d8+4 e 1d6+4"
      }
    ],
    "habilidades": [],
    "equipamento": "Couro batido, escudo leve, machado de batalha.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Dortharamm",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 174,
    "tipo": "Humanoide (anão) Médio",
    "iniciativa": "-1",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "15",
    "fort": "+5",
    "ref": "+0",
    "von": "+7",
    "pv": "20",
    "desl": "6m (4q)",
    "pm": "9",
    "atributos": {
      "for": "2",
      "des": "-1",
      "con": "2",
      "int": "0",
      "sab": "4",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Maça",
        "tipo": "Corpo a Corpo",
        "bonus": "+4",
        "dano": "1d8+2"
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como um clérigo de Khalmyr de 1º nível (CD 14). Benção (Padrão, 1 PM): seus aliados em alcance curto recebem +1 em testes de ataque e rolagens de dano. Curar Ferimentos (Padrão, 1 PM): uma criatura adjacente recupera 2d8+2 PV."
      }
    ],
    "pericias": [
      {
        "nome": "Religião",
        "valor": "+6"
      }
    ],
    "equipamento": "Brunea, escudo leve, maça, símbolo sagrado de Khalmyr.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Jirp",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 174,
    "tipo": "Humanoide (goblin) Pequeno",
    "iniciativa": "+6",
    "percepcao": "-1",
    "percepcaoObs": "visão no escuro",
    "defesa": "16",
    "fort": "+4",
    "ref": "+4",
    "von": "-1",
    "pv": "14",
    "desl": "9m (6q), escalada 9m (6q)",
    "atributos": {
      "for": "-1",
      "des": "4",
      "con": "2",
      "int": "5",
      "sab": "-1",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Besta leve",
        "tipo": "À Distância",
        "bonus": "+4",
        "dano": "1d8 (19)"
      }
    ],
    "habilidades": [
      {
        "nome": "Saque Rápido",
        "tipo": "",
        "desc": "Jirp pode sacar ou guardar itens ou recarregar sua besta leve como uma ação livre."
      }
    ],
    "pericias": [
      {
        "nome": "Ofício (alquimia)",
        "valor": "+7"
      }
    ],
    "equipamento": "Armadura de couro, ácido x5, besta leve, fogo alquímico x5, virotes x20.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Symelle",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 175,
    "tipo": "Humanoide (elfo) Médio",
    "iniciativa": "+6",
    "percepcao": "+0",
    "percepcaoObs": "visão na penumbra",
    "defesa": "14",
    "fort": "+0",
    "ref": "+6",
    "von": "+2",
    "pv": "8",
    "desl": "12m (8q)",
    "pm": "12",
    "atributos": {
      "for": "0",
      "des": "4",
      "con": "0",
      "int": "5",
      "sab": "0",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Arco longo",
        "tipo": "À Distância",
        "bonus": "+6",
        "dano": "1d8+4 (x3)"
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como uma maga de 1º nível (CD 15). Área Escorregadia (Padrão, 1 PM): até o fim da cena, criaturas em um quadrado de 3m de lado em alcance curto ficam caídas (Ref evita). Criaturas que se movimentem na área ficam caídas (Acrobacia CD 10 evita). Seta Infalível de Talude (Padrão, 1 PM): projeta duas setas de energia distribuídas em até duas criaturas em alcance médio. Cada seta causa 1d4+1 pontos de dano de essência."
      }
    ],
    "pericias": [
      {
        "nome": "Misticismo",
        "valor": "+7"
      }
    ],
    "equipamento": "Arco longo, flechas x20, grimório.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Felken",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 175,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+4",
    "percepcao": "+2",
    "defesa": "17",
    "fort": "+6",
    "ref": "+3",
    "von": "+0",
    "pv": "20",
    "desl": "6m (4q)",
    "atributos": {
      "for": "3",
      "des": "2",
      "con": "2",
      "int": "0",
      "sab": "0",
      "car": "2"
    },
    "ataques": [
      {
        "nome": "Espada bastarda",
        "tipo": "Corpo a Corpo",
        "bonus": "+8",
        "dano": "1d8+5 (19)"
      }
    ],
    "habilidades": [
      {
        "nome": "Gritar Ordens",
        "tipo": "Padrão",
        "desc": "Felken grita ordens para seus aliados em alcance curto. Eles recebem +1 em testes de perícia até o fim da cena."
      },
      {
        "nome": "Ódio Puro",
        "tipo": "",
        "desc": "Como um purista, Felken recebe +5 em testes de Vontade quando está seguindo ordens de um superior (qualquer purista com ND maior) e +2 em rolagens de dano contra humanoides não humanos."
      }
    ],
    "pericias": [
      {
        "nome": "Enganação",
        "valor": "+4"
      },
      {
        "nome": "Guerra",
        "valor": "+2"
      }
    ],
    "equipamento": "Cota de malha, escudo leve, espada bastarda.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Reinner",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 176,
    "tipo": "Humanoide (humano) Médio",
    "iniciativa": "+2",
    "percepcao": "+5",
    "defesa": "16",
    "fort": "+3",
    "ref": "-1",
    "von": "+6",
    "defesaObs": "imunidade a medo",
    "pv": "15",
    "desl": "6m (4q)",
    "pm": "8",
    "atributos": {
      "for": "2",
      "des": "0",
      "con": "3",
      "int": "1",
      "sab": "3",
      "car": "-1"
    },
    "ataques": [
      {
        "nome": "Martelo de guerra",
        "tipo": "Corpo a Corpo",
        "bonus": "+5",
        "dano": "1d8+5 (x3)"
      }
    ],
    "habilidades": [
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como um clérigo de Arsenal de 1º nível (CD 13). Arma Mágica (Padrão, 1 PM): até o fim da cena, uma arma adjacente se torna mágica, fornecendo +1 nos testes de ataque e rolagens de dano. Benção (Padrão, 1 PM): aliados em alcance curto recebem +1 em testes de ataque e rolagens de dano até o fim da cena."
      }
    ],
    "pericias": [
      {
        "nome": "Misticismo",
        "valor": "+3"
      },
      {
        "nome": "Religião",
        "valor": "+5"
      }
    ],
    "equipamento": "Brunea, escudo leve, martelo de guerra, símbolo sagrado de Arsenal.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Trorokya",
    "nd": "1/2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 176,
    "tipo": "Monstro (finntroll) Médio",
    "iniciativa": "+3",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "12",
    "fort": "+0",
    "ref": "+3",
    "von": "+6",
    "defesaObs": "cura acelerada 5/ácido ou fogo, resistência a magia +2",
    "pv": "11",
    "desl": "9m (6q)",
    "pm": "11",
    "atributos": {
      "for": "-1",
      "des": "1",
      "con": "1",
      "int": "5",
      "sab": "2",
      "car": "-1"
    },
    "ataques": [],
    "habilidades": [
      {
        "nome": "Natureza Vegetal",
        "tipo": "",
        "desc": "Trorokya é imune a atordoamento e metamorfose, mas é afetada por efeitos que afetem plantas monstruosas. No caso de magias sem teste de resistência, ela tem direito a um teste de Fortitude (CD da magia) para evitar o efeito."
      },
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como uma bruxa de 1º nível (CD 15). Seu foco arcano é uma varinha. Adaga Mental (Padrão, 1 PM): uma criatura em alcance curto sofre 2d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena. Raio do Enfraquecimento (Padrão, 1 PM): uma criatura escolhida em alcance curto fica fatigada (Fort muda para vulnerável)."
      },
      {
        "nome": "Sensibilidade a Luz",
        "tipo": "",
        "desc": "Quando Trorokya exposta à luz do sol ou similar, ela fica ofuscada."
      }
    ],
    "equipamento": "Varinha.",
    "tesouro": "Nenhum."
  },
  {
    "nome": "Frenesi Rubro",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 176,
    "tipo": "Monstro (lefou) Médio",
    "iniciativa": "+3",
    "percepcao": "+1",
    "defesa": "15",
    "fort": "+10",
    "ref": "+5",
    "von": "+1",
    "pv": "20",
    "desl": "9m (6q)",
    "atributos": {
      "for": "4",
      "des": "1",
      "con": "1",
      "int": "-1",
      "sab": "-1",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+13",
        "dano": "1d6+11 (x3)"
      }
    ],
    "habilidades": [
      {
        "nome": "Frenesi Insano",
        "tipo": "",
        "desc": "Quando causa ou sofre dano, Frenesi Rubro recebe um bônus cumulativo de +1 em testes de ataque e rolagens de dano até o fim da cena."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Asa-Assassina",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 185,
    "tipo": "Animal Minúsculo (lacaio)",
    "iniciativa": "+8",
    "percepcao": "+4",
    "percepcaoObs": "visão na penumbra",
    "defesa": "15",
    "fort": "+3",
    "ref": "+10",
    "von": "+3",
    "pv": "10",
    "desl": "3m (2q), voo 12m (8q)",
    "atributos": {
      "for": "-3",
      "des": "4",
      "con": "1",
      "int": "-4",
      "sab": "2",
      "car": "-4"
    },
    "ataques": [
      {
        "nome": "Asa afiada",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "2d4+6 corte (17/x3)"
      }
    ],
    "habilidades": [
      {
        "nome": "Asas Mortais",
        "tipo": "",
        "desc": "Quando faz um acerto crítico em uma criatura, a asa-assassina tenta decepar a cabeça dela. A vítima fica inconsciente e sangrando (Fort CD 16 evita ambos). Este sangramento é cumulativo com aquele causado por ser reduzido a 0 PV ou menos; trate cada um separadamente. A critério do mestre, algumas criaturas, como certos construtos, mortos-vivos ou monstros com nenhuma ou várias cabeças, podem ser imunes a esta habilidade."
      },
      {
        "nome": "Mergulho",
        "tipo": "",
        "desc": "Quando faz uma investida alada, a asa-assassina pode continuar se movendo depois do ataque. Ela deve se mover em linha reta e seu movimento máximo ainda é o dobro do seu deslocamento."
      },
      {
        "nome": "Familiar",
        "tipo": "",
        "desc": "Uma asa-assassina familiar permite que você gaste 1 PM quando causa dano de corte ou perfuração a uma criatura para deixá-la sangrando."
      },
      {
        "nome": "Parceiro",
        "tipo": "",
        "desc": "Uma asa-assassina é um parceiro especial (assassino) que fornece os benefícios a seguir. Iniciante: uma vez por rodada, quando causa dano com um ataque, você pode deixar a vítima sangrando. Veterano: a perda de PV pelo sangramento aumenta para 1d8. Mestre: a perda de PV aumenta para 2d8."
      }
    ],
    "tesouro": "Asas afiadas (CD 16 para extrair, vale T$ 100 para fabricar uma arma de corte superior)."
  },
  {
    "nome": "Glop",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 185,
    "tipo": "Monstro Grande (solo)",
    "iniciativa": "+2",
    "percepcao": "-1",
    "percepcaoObs": "percepção às cegas",
    "defesa": "17",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "imunidade a ácido",
    "pv": "70",
    "desl": "9m (6q)",
    "atributos": {
      "for": "2",
      "des": "-1",
      "con": "2",
      "int": "—",
      "sab": "-3",
      "car": "-3"
    },
    "ataques": [
      {
        "nome": "Pancada",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "2d6+2 mais 2d6 ácido"
      }
    ],
    "habilidades": [
      {
        "nome": "Glops Filhinhos",
        "tipo": "",
        "desc": "A mamãe glop está sempre acompanhada por 1d4 glops, que a protegem instintivamente. Esses glops, assim como aqueles gerados pela Meiose Glópica, não rendem pontos de experiência."
      },
      {
        "nome": "Meiose Glópica",
        "tipo": "Livre",
        "desc": "Quando ameaçada, a mamãe pode gerar outros glops filhinhos para protegê-la. No início de cada turno da mamãe, role um dado. Em um resultado par, um glop surge num espaço adjacente a ela. Ele age normalmente, no turno da mamãe, a partir da próxima rodada."
      }
    ],
    "tesouro": "Padrão."
  },
  {
    "nome": "Bandido Nezumi",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 196,
    "tipo": "Humanoide (nezumi) Pequeno",
    "iniciativa": "+3",
    "percepcao": "+4",
    "percepcaoObs": "faro, visão na penumbra",
    "defesa": "15",
    "fort": "+11",
    "ref": "+5",
    "von": "+0",
    "defesaObs": "resistência a medo de criaturas maiores +5",
    "pv": "35",
    "desl": "9m (6q)",
    "atributos": {
      "for": "3",
      "des": "1",
      "con": "1",
      "int": "-1",
      "sab": "0",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Machado de guerra e mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+9",
        "dano": "3d6+3 (x3) e 1d6+1 (19/x3)"
      }
    ],
    "habilidades": [],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+5"
      },
      {
        "nome": "Intimidação",
        "valor": "+2"
      }
    ],
    "equipamento": "Machado grande aumentado.",
    "tesouro": "Metade."
  },
  {
    "nome": "Kappa Negociante",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 197,
    "tipo": "Espírito (kappa) Médio",
    "iniciativa": "+5",
    "percepcao": "+0",
    "defesa": "17",
    "fort": "+0",
    "ref": "+5",
    "von": "+11",
    "defesaObs": "não pode ser flanqueado",
    "pv": "25",
    "desl": "9m (6q), natação 9m (6q)",
    "atributos": {
      "for": "0",
      "des": "3",
      "con": "2",
      "int": "1",
      "sab": "0",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Ataque desarmado x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+5",
        "dano": "1d6+4"
      }
    ],
    "habilidades": [
      {
        "nome": "Carapaça Kappa",
        "tipo": "",
        "desc": "O kappa negociante recebe cobertura leve quando está caído ou submerso."
      },
      {
        "nome": "Cura das Águas",
        "tipo": "Padrão",
        "desc": "Uma vez por cena, o kappa pode lançar Curar Ferimentos para curar 2d8+2 PV de uma criatura. Ele não pode usar esta habilidade se a água de sua cabeça estiver derramada."
      },
      {
        "nome": "Duro de Enrolar",
        "tipo": "",
        "desc": "O kappa negociante recebe +5 em Vontade para testes de barganha."
      },
      {
        "nome": "Tigela D'Água",
        "tipo": "",
        "desc": "Quando falha por 5 ou mais em um teste para evitar ser agarrado, derrubado ou empurrado, o kappa derrama a água de sua cabeça. Ele fica enjoado até encher a tigela novamente (o que exige uma fonte de água e uma ação padrão)."
      }
    ],
    "pericias": [
      {
        "nome": "Diplomacia",
        "valor": "+5"
      }
    ],
    "tesouro": "Dobro."
  },
  {
    "nome": "Mulher-Aranha Jovem",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 197,
    "tipo": "Espírito Grande",
    "iniciativa": "+7",
    "percepcao": "+7",
    "percepcaoObs": "visão no escuro",
    "defesa": "17",
    "fort": "+2",
    "ref": "+7",
    "von": "+13",
    "pv": "49",
    "desl": "12m (8q), escalar 12m (8q)",
    "pm": "28",
    "atributos": {
      "for": "1",
      "des": "4",
      "con": "1",
      "int": "1",
      "sab": "2",
      "car": "4"
    },
    "ataques": [
      {
        "nome": "Duas garras",
        "tipo": "Corpo a Corpo",
        "bonus": "+10",
        "dano": "1d6+5"
      }
    ],
    "habilidades": [
      {
        "nome": "Teia",
        "tipo": "Padrão",
        "desc": "A mulher-aranha dispara teia em um quadrado de 3m de lado em alcance curto. Criaturas na área ficam enredadas (Ref CD 18 evita). Uma criatura enredada pode se soltar com uma ação completa e um teste de Força ou Acrobacia (CD 20) ou cortando a teia (cada espaço de 1,5m de teia tem 5 PV e RD 5). Fogo queima a teia em duas rodadas (e liberta as criaturas), mas causa 1d6 pontos de dano de fogo por rodada a todas as criaturas nela. A mulher-aranha também pode usar a teia para cobrir uma área quadrada com 6m de lado. Por sua semitransparência, a teia é difícil de ver (Percepção CD 20). Uma criatura que entre na área fica enredada. A mulher-aranha pode andar na própria teia sem se enredar. Ela percebe automaticamente (como se tivesse percepção às cegas) qualquer criatura na teia."
      },
      {
        "nome": "Magias",
        "tipo": "",
        "desc": "Como um feiticeiro de 2º nível (CD 18, 20 para encantamento). Disfarce Ilusório (Padrão, 1 PM): até o fim da cena, a mulher-aranha muda a própria aparência, incluindo seu equipamento, e ainda os odores e as sensações que transmite. Isso afeta altura, peso, tom de pele, cor de cabelo, timbre de voz etc. Ela recebe +10 em testes de Enganação para disfarce (Von desacredita). Enfeitiçar (Padrão, 1 PM): um humanoide em alcance curto fica enfeitiçado (Von evita)."
      }
    ],
    "pericias": [
      {
        "nome": "Diplomacia",
        "valor": "+9"
      },
      {
        "nome": "Enganação",
        "valor": "+9"
      }
    ],
    "tesouro": "Padrão."
  },
  {
    "nome": "Sandura Ninteles, Raposa Bucaneira",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 227,
    "tipo": "Humanoide (moreau) Médio",
    "iniciativa": "+7",
    "percepcao": "+3",
    "percepcaoObs": "faro, visão na penumbra",
    "defesa": "18",
    "fort": "+7",
    "ref": "+14",
    "von": "+1",
    "defesaObs": "evasão",
    "pv": "46",
    "desl": "12m (8q)",
    "atributos": {
      "for": "0",
      "des": "4",
      "con": "2",
      "int": "2",
      "sab": "-1",
      "car": "3"
    },
    "ataques": [
      {
        "nome": "Pistola-punhal",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d6+4 (19)"
      },
      {
        "nome": "Pistola-punhal",
        "tipo": "À Distância",
        "bonus": "+10",
        "dano": "2d6+6 (19/x3, alcance curto)"
      }
    ],
    "habilidades": [
      {
        "nome": "Audácia",
        "tipo": "",
        "desc": "Uma vez por rodada, a bucaneira soma seu Carisma em um teste de perícia (exceto em ataque)."
      },
      {
        "nome": "Cobrir de Pólvora",
        "tipo": "Movimento",
        "desc": "A bucaneira joga um punhado de pólvora em um alvo em alcance curto. Até o fim da cena, o próximo ataque contra este alvo causa +1d6 pontos de dano de fogo e o deixa em chamas."
      },
      {
        "nome": "Estampido Ensurdecedor",
        "tipo": "",
        "desc": "Quando a bucaneira dispara com sua pistola-punhal (à distância ou em corpo a corpo), todas as criaturas adjacentes a ela ficam abaladas e surdas (Fort CD 18 reduz a duração para 1 rodada)."
      },
      {
        "nome": "Pistola-Punhal",
        "tipo": "",
        "desc": "Quando ataca em corpo a corpo com sua pistola-punhal, a raposa bucaneira pode disparar sua bala para causar +2d6 pontos de dano de perfuração."
      },
      {
        "nome": "Pistoleira Veloz",
        "tipo": "",
        "desc": "A bucaneira não sofre a penalidade padrão de –5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo, e pode recarregar sua pistola-punhal como uma ação de movimento."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+7"
      },
      {
        "nome": "Atletismo",
        "valor": "+3"
      },
      {
        "nome": "Enganação",
        "valor": "+9"
      },
      {
        "nome": "Intimidação",
        "valor": "+6"
      },
      {
        "nome": "Nobreza",
        "valor": "+7"
      }
    ],
    "equipamento": "Balas x20, capa esvoaçante, pistola-punhal.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Selako",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 248,
    "tipo": "Animal Grande",
    "iniciativa": "+7",
    "percepcao": "+4",
    "percepcaoObs": "faro, percepção às cegas",
    "defesa": "18",
    "fort": "+12",
    "ref": "+7",
    "von": "+2",
    "pv": "90",
    "desl": "natação 18m (12q)",
    "atributos": {
      "for": "4",
      "des": "3",
      "con": "3",
      "int": "-4",
      "sab": "2",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "2d8+7 (19/x3)"
      }
    ],
    "habilidades": [
      {
        "nome": "Bote de Mandíbula",
        "tipo": "Completa",
        "desc": "O selako faz uma investida contra uma criatura. Se acertar esse ataque, ele causa +2d6 pontos de dano e a vítima fica sangrando."
      },
      {
        "nome": "Faro do Caçador",
        "tipo": "",
        "desc": "O selako não fica desprevenido contra inimigos que estejam sangrando."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+6"
      }
    ],
    "tesouro": ""
  },
  {
    "nome": "Zumbi Peçonha",
    "nd": "1",
    "fonte": "Breves Jornadas",
    "paginaPdf": 234,
    "tipo": "Morto-vivo Médio",
    "iniciativa": "-1",
    "percepcao": "-1",
    "percepcaoObs": "visão no escuro",
    "defesa": "15",
    "fort": "+9",
    "ref": "+1",
    "von": "+6",
    "pv": "21",
    "desl": "6m (4q)",
    "atributos": {
      "for": "3",
      "des": "-1",
      "con": "2",
      "int": "—",
      "sab": "-1",
      "car": "-5"
    },
    "ataques": [
      {
        "nome": "Mordida",
        "tipo": "Corpo a Corpo",
        "bonus": "+11",
        "dano": "1d6+9 mais veneno, alcance 3m"
      }
    ],
    "habilidades": [
      {
        "nome": "Bote Oculto",
        "tipo": "",
        "desc": "O alvo do primeiro ataque do zumbi em uma cena é considerado desprevenido."
      },
      {
        "nome": "Fraqueza Zumbi",
        "tipo": "",
        "desc": "O zumbi sofre o dobro de dano de acertos críticos ou de ataques feitos contra seu cérebro (Defesa 25)."
      },
      {
        "nome": "Veneno",
        "tipo": "",
        "desc": "Atordoado por 1 rodada e fraco (Fort CD 14 reduz para fraco por 1 rodada)."
      }
    ],
    "tesouro": "Nenhum."
  },
  {
    "nome": "Elemental do Veneno Pequeno",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 234,
    "tipo": "Espírito (elemental) Pequeno",
    "iniciativa": "+3",
    "percepcao": "+5",
    "percepcaoObs": "percepção às cegas",
    "defesa": "17",
    "fort": "+13",
    "ref": "+2",
    "von": "+7",
    "defesaObs": "imunidade a acertos críticos, atordoado, caído, efeitos de metabolismo, paralisia e veneno",
    "pv": "49",
    "desl": "voo 6m (4q)",
    "atributos": {
      "for": "-3",
      "des": "0",
      "con": "2",
      "int": "-3",
      "sab": "2",
      "car": "-4"
    },
    "ataques": [
      {
        "nome": "Pústula asquerosa",
        "tipo": "À Distância",
        "bonus": "+12",
        "dano": "enjoado por 1d4 rodadas, alcance médio"
      }
    ],
    "habilidades": [
      {
        "nome": "Corpo Nocivo",
        "tipo": "",
        "desc": "Quando o elemental do veneno pequeno sofre dano por um ataque corpo a corpo, o atacante perde 1d6 pontos de vida por veneno, a menos que esteja usando uma arma alongada."
      },
      {
        "nome": "Existência Insalubre",
        "tipo": "",
        "desc": "O elemental ignora imunidade a veneno."
      },
      {
        "nome": "Fumos Tóxicos",
        "tipo": "Livre",
        "desc": "Uma vez por rodada, o elemental emite uma nuvem de veneno corrosivo. Criaturas em um raio de 9m ao redor dele perdem 1d12 pontos de vida por veneno e ficam vulneráveis (Fort CD 18 reduz a perda de vida à metade e evita a condição)."
      }
    ],
    "tesouro": "1d4 doses de peçonha irritante (Sobrevivência ou Ofício relacionado CD 17 para extrair)."
  },
  {
    "nome": "Tácitus, Líder Mercenário",
    "nd": "2",
    "fonte": "Breves Jornadas",
    "paginaPdf": 240,
    "tipo": "Morto-vivo (osteon) Médio",
    "iniciativa": "+3",
    "percepcao": "+3",
    "percepcaoObs": "visão no escuro",
    "defesa": "20",
    "fort": "+13",
    "ref": "+7",
    "von": "+2",
    "defesaObs": "redução de corte, frio e perfuração 5, resistência a magia arcana e medo +5",
    "pv": "65",
    "desl": "6m (4q)",
    "atributos": {
      "for": "3",
      "des": "0",
      "con": "2",
      "int": "0",
      "sab": "0",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Espada curta e chifres",
        "tipo": "Corpo a Corpo",
        "bonus": "+12",
        "dano": "1d6+6 (19) e 1d6+6"
      }
    ],
    "habilidades": [
      {
        "nome": "\"De Pé, Preguiçoso!\"",
        "tipo": "Movimento",
        "desc": "Tácitus reanima um aliado vivo com 0 ou menos PV em alcance curto. O aliado acorda estável e com 2d6 PV. Uma criatura só pode ser reanimada por esta habilidade uma vez por cena."
      },
      {
        "nome": "Inescrupuloso",
        "tipo": "",
        "desc": "Tácitus recebe +2 em testes de ataque e +1d6 em rolagens de dano contra criaturas flanqueadas, sob efeito de alguma condição ou que sigam algum código de conduta (como o Código de Honra ou Código do Herói)."
      },
      {
        "nome": "Monte de Ossos",
        "tipo": "",
        "desc": "Quando sofre um acerto crítico, Tácitus se desfaz em uma pilha de ossos. Ele fica caído e vulnerável, falha automaticamente em testes de Reflexos e precisa gastar uma ação de movimento para se remontar e encerrar estes efeitos."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+7"
      },
      {
        "nome": "Intimidação",
        "valor": "+4"
      },
      {
        "nome": "Intuição",
        "valor": "+3 (+5 contra conjuradores arcanos)"
      }
    ],
    "equipamento": "Escudo leve, espada curta, loriga segmentada.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Sacerdote Caído",
    "nd": "5",
    "fonte": "Breves Jornadas",
    "paginaPdf": 241,
    "tipo": "Humanoide (bugbear) Médio",
    "iniciativa": "+6",
    "percepcao": "+6",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "23",
    "fort": "+11",
    "ref": "+6",
    "von": "+16",
    "defesaObs": "resistência a medo +2",
    "pv": "45",
    "desl": "6m (4q)",
    "pm": "22",
    "atributos": {
      "for": "3",
      "des": "2",
      "con": "2",
      "int": "-1",
      "sab": "2",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Foice negra x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+20",
        "dano": "2d8+13 (x3) mais 1d12 trevas"
      }
    ],
    "habilidades": [
      {
        "nome": "Êxtase no Medo",
        "tipo": "",
        "desc": "O sacerdote caído sofre metade do dano de criaturas sob algum efeito de medo."
      },
      {
        "nome": "Refestelar-se em Sangue",
        "tipo": "Reação",
        "desc": "Quando faz um acerto crítico ou reduz uma criatura a 0 PV ou menos, o sacerdote recupera 5 PM."
      },
      {
        "nome": "Foice Negra",
        "tipo": "",
        "desc": "Enquanto estiver empunhando esta arma, o sacerdote caído pode lançar as magias abaixo como um clérigo de 6º nível (CD 20). Nas mãos de qualquer outra criatura, ela é uma foice comum.<br>• <strong>Toque Vampírico</strong> (Padrão, 5 PM): O sacerdote caído faz um ataque corpo a corpo. Se acertar, além do seu dano normal, causa 6d6 pontos de dano de trevas (Fort reduz à metade) e recupera pontos de vida iguais a metade do dano de trevas causado.<br>• <strong>Vitalidade Fantasma</strong> (Padrão, 6 PM): Criaturas vivas em uma esfera com 6m de raio centrada no sacerdote sofrem 1d10 pontos de dano de trevas (Fort reduz à metade). O sacerdote recebe PV temporários iguais ao dano total causado."
      }
    ],
    "pericias": [
      {
        "nome": "Furtividade",
        "valor": "+6"
      },
      {
        "nome": "Intimidação",
        "valor": "+7"
      },
      {
        "nome": "Religião",
        "valor": "+4"
      }
    ],
    "equipamento": "Brunea, foice.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Três Goblins em um Gorlogg",
    "nd": "7",
    "fonte": "Breves Jornadas",
    "paginaPdf": 242,
    "tipo": "Animal Grande",
    "iniciativa": "+4",
    "percepcao": "+4",
    "percepcaoObs": "visão no escuro",
    "defesa": "30",
    "fort": "+20",
    "ref": "+14",
    "von": "+7",
    "pv": "300",
    "desl": "12m (8q)",
    "atributos": {
      "for": "6",
      "des": "5",
      "con": "6",
      "int": "-4",
      "sab": "2",
      "car": "-2"
    },
    "ataques": [
      {
        "nome": "Mordida x2",
        "tipo": "Corpo a Corpo",
        "bonus": "+24",
        "dano": "3d8+16 (x4)"
      },
      {
        "nome": "Funda x3",
        "tipo": "À Distância",
        "bonus": "+20",
        "dano": "2d4+10"
      }
    ],
    "habilidades": [
      {
        "nome": "Agarrar Aprimorado",
        "tipo": "Livre",
        "desc": "Mordida (Teste +26)."
      },
      {
        "nome": "Lançamento de Bombas",
        "tipo": "Completa",
        "desc": "Os goblins lançam bombas em um ponto em alcance curto. Criaturas a até 3m desse ponto sofrem 12d6 pontos de dano de impacto (Ref CD 22 reduz à metade). Recarga (padrão)."
      },
      {
        "nome": "Vai, Vai, Vai!",
        "tipo": "",
        "desc": "Os três goblins em um gorlogg podem fazer uma ação de movimento adicional por turno, apenas para se deslocar, se não tiverem usado o ataque de mordida."
      },
      {
        "nome": "Os Três Goblins",
        "tipo": "",
        "desc": "Os goblins sabem evitar serem acertados na garupa do gorlogg, sendo imunes a dano até que o gorlogg seja derrotado, mas ainda podem ser afetados por efeitos mentais. Eles possuem Vontade +5 e, se forem afetados por qualquer condição mental, a criatura inteira (gorlogg mais goblins) fica confusa e imóvel por 1d4 rodadas."
      }
    ],
    "pericias": [
      {
        "nome": "Atletismo",
        "valor": "+13"
      },
      {
        "nome": "Cavalgar",
        "valor": "+13"
      }
    ],
    "tesouro": "Metade."
  },
  {
    "nome": "Arzak",
    "nd": "8",
    "fonte": "Breves Jornadas",
    "paginaPdf": 243,
    "tipo": "Humanoide (hobgoblin) Médio",
    "iniciativa": "+13",
    "percepcao": "+10",
    "percepcaoObs": "visão no escuro",
    "defesa": "31",
    "fort": "+15",
    "ref": "+21",
    "von": "+8",
    "defesaObs": "evasão aprimorada",
    "pv": "250",
    "desl": "9m (6q)",
    "atributos": {
      "for": "5",
      "des": "5",
      "con": "5",
      "int": "2",
      "sab": "2",
      "car": "0"
    },
    "ataques": [
      {
        "nome": "Kum’shrak* x3",
        "tipo": "Corpo a Corpo",
        "bonus": "+24",
        "dano": "1d8+10 corte (x3) mais sangrando"
      },
      {
        "nome": "Adaga x2",
        "tipo": "À Distância",
        "bonus": "+22",
        "dano": "1d4+8"
      }
    ],
    "habilidades": [
      {
        "nome": "Assassinar",
        "tipo": "Movimento",
        "desc": "Arzak analisa uma criatura em alcance curto. Em seu primeiro Ataque Furtivo que causar dano a ela até o fim do seu próximo turno, ele dobra os dados de dano do Ataque Furtivo."
      },
      {
        "nome": "Ataque Furtivo",
        "tipo": "+6d6",
        "desc": "Quando atinge um alvo desprevenido ou que esteja flanqueando, Arzak causa +6d6 pontos de dano extra."
      },
      {
        "nome": "Manobras Evasivas",
        "tipo": "Reação",
        "desc": "Uma vez por rodada, quando faz um teste de resistência, Arzak substitui este teste por um teste de Cavalgar."
      },
      {
        "nome": "Sangrento",
        "tipo": "",
        "desc": "Enquanto estiver montado, o deslocamento de Arzak se torna 12m, ele recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2d6 em seu ataque furtivo (já contabilizado)."
      },
      {
        "nome": "Um com as Sombras",
        "tipo": "",
        "desc": "Arzak nunca fica surpreendido ou flanqueado e não sofre penalidades por se mover com seu deslocamento normal enquanto usa Furtividade."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+13"
      },
      {
        "nome": "Atletismo",
        "valor": "+13"
      },
      {
        "nome": "Cavalgar",
        "valor": "+13"
      },
      {
        "nome": "Furtividade",
        "valor": "+15"
      },
      {
        "nome": "Intimidação",
        "valor": "+10"
      },
      {
        "nome": "Ladinagem",
        "valor": "+13"
      }
    ],
    "equipamento": "Adaga x6, couro batido ajustado, kum’shrak* eviscerador.",
    "tesouro": "Padrão."
  },
  {
    "nome": "Gaardak",
    "nd": "8",
    "fonte": "Breves Jornadas",
    "paginaPdf": 244,
    "tipo": "Humanoide (bugbear) Médio",
    "iniciativa": "+12",
    "percepcao": "+9",
    "percepcaoObs": "faro, visão no escuro",
    "defesa": "33",
    "fort": "+15",
    "ref": "+20",
    "von": "+10",
    "defesaObs": "resistência a medo +2",
    "pv": "320",
    "desl": "12m (8q), escavação 6m (4q), natação 6m (4q)",
    "atributos": {
      "for": "5",
      "des": "4",
      "con": "3",
      "int": "-1",
      "sab": "1",
      "car": "1"
    },
    "ataques": [
      {
        "nome": "Ataque desarmado x3",
        "tipo": "Corpo a Corpo",
        "bonus": "+24",
        "dano": "2d8+8"
      },
      {
        "nome": "Duas azagaias",
        "tipo": "À Distância",
        "bonus": "+26",
        "dano": "3d6+10"
      }
    ],
    "habilidades": [
      {
        "nome": "Arremesso Devastador",
        "tipo": "Livre",
        "desc": "Se acertar uma criatura com o ataque de azagaia, Gaardak pode fazer uma manobra derrubar ou empurrar (teste +28) contra a criatura atingida."
      },
      {
        "nome": "Êxtase no Medo",
        "tipo": "",
        "desc": "Gaardak sofre metade do dano de criaturas sob algum efeito de medo."
      },
      {
        "nome": "Fluxo de Movimento",
        "tipo": "",
        "desc": "Gaardak pode intercalar sua ação de movimento com uma ação padrão, podendo mover-se parte de seu deslocamento antes da ação, e o restante após."
      },
      {
        "nome": "Lento Demais!",
        "tipo": "Reação",
        "desc": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, Gaardak pode fazer um teste de ataque oposto ao resultado deste ataque. Se vencer, ele evita o dano e pode fazer um ataque corpo a corpo contra o atacante."
      },
      {
        "nome": "Poderio Muscular",
        "tipo": "Padrão",
        "desc": "Gaardak pode modificar seus limites físicos, recebendo deslocamento +9m e +10 em testes de Atletismo. Após o fim da cena, o bugbear fica fraco até o dia seguinte."
      }
    ],
    "pericias": [
      {
        "nome": "Acrobacia",
        "valor": "+12"
      },
      {
        "nome": "Atletismo",
        "valor": "+13"
      },
      {
        "nome": "Intimidação",
        "valor": "+13"
      }
    ],
    "equipamento": "Azagaia x10, gibão de peles.",
    "tesouro": "Padrão."
  }
];

if (typeof module !== "undefined") module.exports = JORNADAS_DB;
