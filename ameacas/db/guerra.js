const GUERRA_DB = [
    {
        "nome": "Defeituoso Menor",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/4",
        "iniciativa": "+4",
        "percepcao": "+1",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "13",
        "fort": "+1",
        "ref": "+3",
        "von": "–1",
        "defesaObs": "normal",
        "pv": "5",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "2",
            "con": "1",
            "int": "0",
            "sab": "–1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d4+3",
                "desc": ""
            },
            {
                "nome": "Mordiscar",
                "tipo": "Corpo a Corpo",
                "bonus": "—",
                "dano": "+1d6",
                "desc": "Ao acertar seus dois ataques de garra, o defeituoso menor aplica uma mordida sobre a parte ferida, causando +1d6 pontos de dano."
            }
        ],
        "habilidades": [],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Pirata",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/2",
        "iniciativa": "+6",
        "percepcao": "+2",
        "percepcaoObs": "normal",
        "defesa": "14",
        "fort": "+2",
        "ref": "+5",
        "von": "+1",
        "defesaObs": "normal",
        "pv": "8",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "0",
            "con": "1",
            "int": "0",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Cimitarra",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d6+6",
                "desc": "crítico 18"
            }
        ],
        "habilidades": [],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+6"
            },
            {
                "nome": "Atletismo",
                "valor": "+4"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Cimitarra",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Aprendiz do \"Clã da Lótus\"",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/2",
        "iniciativa": "+4",
        "percepcao": "+1",
        "percepcaoObs": "normal",
        "defesa": "14",
        "fort": "+1",
        "ref": "+3",
        "von": "–1",
        "defesaObs": "normal",
        "pv": "6",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "2",
            "con": "1",
            "int": "0",
            "sab": "–1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada curta",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d6+3",
                "desc": ""
            }
        ],
        "habilidades": [],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Espada curta",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Capanga Blasanov",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/4",
        "iniciativa": "+4",
        "percepcao": "+3",
        "percepcaoObs": "normal",
        "defesa": "16",
        "fort": "+8",
        "ref": "+6",
        "von": "+2",
        "defesaObs": "normal",
        "pv": "12",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "1",
            "int": "0",
            "sab": "0",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Tacape",
                "tipo": "Corpo a Corpo",
                "bonus": "+11",
                "dano": "1d10+6",
                "desc": "Ímp eto Agressor O capanga Blasanov recebe +1d10 na rolagem de dano de seu primeiro ataque na cena."
            }
        ],
        "habilidades": [],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+7"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+2"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Tacape",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Bossk/Vassk",
        "tipo": "Humanoide (orc) Médio",
        "nd": "2",
        "iniciativa": "+5",
        "percepcao": "+2 (+4 em subterrâneo)",
        "percepcaoObs": "normal",
        "defesa": "18",
        "fort": "+13",
        "ref": "+7",
        "von": "+2",
        "defesaObs": "normal",
        "pv": "75",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "4",
            "int": "–1",
            "sab": "0",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Machado de guerra",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d12+4, x3",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d6+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Duas Mentes",
                "desc": "Bossk/Vassk faz uma ação padrão adicional em cada um de seus turnos. Além disso, quando faz um teste de Vontade, rola dois dados e escolhe o melhor."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura de couro, machado de guerra",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Cão Teravith",
        "tipo": "Animal Grande",
        "nd": "2",
        "iniciativa": "+4",
        "percepcao": "+7",
        "percepcaoObs": "faro, visão na penumbra",
        "defesa": "18",
        "fort": "+13",
        "ref": "+6",
        "von": "+4",
        "defesaObs": "normal",
        "pv": "77",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "1",
            "con": "6",
            "int": "–3",
            "sab": "2",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d12+11",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar",
                "desc": "(Livre) Se o cão teravith acerta um ataque de mordida, pode fazer a manobra derrubar (teste +17)."
            },
            {
                "nome": "Latido Atordoante",
                "desc": "(Movimento) O cão usa seu poderoso latido para atordoar suas presas. Inimigos do cão em um raio de 9m ficam atordoados por 1 rodada (Von CD 17 evita). Uma criatura só pode ser atordoada por esta habilidade uma vez por cena."
            }
        ],
        "pericias": [
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Goblin de Sombreiro",
        "tipo": "Humanoide (goblin) Pequeno",
        "nd": "2",
        "iniciativa": "+9",
        "percepcao": "+3",
        "percepcaoObs": "visão no escuro",
        "defesa": "18",
        "fort": "+9",
        "ref": "+11",
        "von": "+4",
        "defesaObs": "imunidade a fascinado e ofuscado, resistência a condições de sentidos +2",
        "pv": "16",
        "desl": "9m (6q), escalada 9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "–1",
            "des": "4",
            "con": "2",
            "int": "0",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas adagas",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d4+4, 19",
                "desc": ""
            },
            {
                "nome": "Traque",
                "tipo": "À Distância",
                "bonus": "+14",
                "dano": "2d6+4, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "desc": "+1d6."
            },
            {
                "nome": "Sombreiro",
                "desc": "Quando o goblin de sombreiro ataca pela primeira vez em um combate, sua vítima é considerada desprevenida contra esse ataque."
            },
            {
                "nome": "Valentão",
                "desc": "O goblin recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, enredados, flanqueados ou indefesos."
            }
        ],
        "pericias": [
            {
                "nome": "Enganação",
                "valor": "+5"
            },
            {
                "nome": "Furtividade",
                "valor": "+10"
            }
        ],
        "tesouro": "Metade mais sombreiro",
        "equipamento": "Adaga x2, balas x20, traque",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Jadão",
        "tipo": "Humanoide (humano) Médio",
        "nd": "2",
        "iniciativa": "+5",
        "percepcao": "+4",
        "percepcaoObs": "normal",
        "defesa": "24",
        "fort": "+14",
        "ref": "+9",
        "von": "+5",
        "defesaObs": "redução de dano 5",
        "pv": "105",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "1",
            "con": "4",
            "int": "0",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d12+15, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Peito Nu",
                "desc": "Jadão ignora o primeiro efeito nocivo contra ele em cada cena, seja um ataque, magia ou outra habilidade."
            },
            {
                "nome": "Varrer",
                "desc": "(Livre) Uma vez por rodada, quando Jadão faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Espada bastarda aumentada certeira",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Katrina",
        "tipo": "Humanoide (humana) Médio",
        "nd": "2",
        "iniciativa": "+7",
        "percepcao": "+3",
        "percepcaoObs": "normal",
        "defesa": "18",
        "fort": "+7",
        "ref": "+14",
        "von": "+1",
        "defesaObs": "evasão",
        "pv": "46",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "4",
            "con": "2",
            "int": "2",
            "sab": "–1",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Pistola-florete",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d8+4, 19",
                "desc": ""
            },
            {
                "nome": "Pistola-florete",
                "tipo": "À Distância",
                "bonus": "+10",
                "dano": "2d6+6, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Audácia",
                "desc": "(Reação) Uma vez por rodada, Katrina soma seu Carisma em um teste de perícia (exceto em ataque)."
            },
            {
                "nome": "Carta de Corso",
                "desc": "Katrina recebeu a ajuda de nobres corruptos para obter autorização para portar armas de fogo."
            },
            {
                "nome": "Cobrir de Pólvora",
                "desc": "(Movimento) Katrina joga um punhado de pólvora em um alvo em alcance curto. Até o fim da cena, o próximo ataque contra esse alvo causa +1d6 pontos de dano de fogo e o deixa em chamas."
            },
            {
                "nome": "Estampido Ensurdecedor",
                "desc": "Quando Katrina dispara com sua pistola-florete (à distância ou em corpo a corpo), todas as criaturas adjacentes a ela ficam abaladas e surdas (Fort CD 18 reduz a duração para 1 rodada)."
            },
            {
                "nome": "Pistola-Florete",
                "desc": "Quando ataca em corpo a corpo com sua pistola-florete, Katrina pode disparar sua bala para causar +2d6 pontos de dano de perfuração."
            },
            {
                "nome": "Pistoleira Veloz",
                "desc": "Katrina não sofre a penalidade padrão de –5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo e pode recarregar sua pistola-florete como uma ação de movimento."
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
        "tesouro": "Padrão",
        "equipamento": "Balas x20, capa esvoaçante, pistola-florete",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Pistoleiro",
        "tipo": "Humanoide (humano) Médio",
        "nd": "2",
        "iniciativa": "+8",
        "percepcao": "+4",
        "percepcaoObs": "normal",
        "defesa": "18",
        "fort": "+6",
        "ref": "+12",
        "von": "+4",
        "defesaObs": "normal",
        "pv": "63",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "3",
            "con": "2",
            "int": "0",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d4+5, 19",
                "desc": ""
            },
            {
                "nome": "Pistola",
                "tipo": "À Distância",
                "bonus": "+12",
                "dano": "2d6+10, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "desc": "+1d6."
            },
            {
                "nome": "Dispa ro Preciso",
                "desc": "O pistoleiro pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
            },
            {
                "nome": "Saque Rápido",
                "desc": "O pistoleiro pode sacar ou guardar itens como uma ação livre e recarregar sua pistola como uma ação de movimento."
            }
        ],
        "pericias": [
            {
                "nome": "Cavalgar",
                "valor": "+8"
            },
            {
                "nome": "Jogatina",
                "valor": "+5"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Adaga, balas x20, pistola",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Lady Alyssa",
        "tipo": "Humanoide (elfa) Médio",
        "nd": "3",
        "iniciativa": "+9",
        "percepcao": "+9",
        "percepcaoObs": "visão na penumbra",
        "defesa": "23",
        "fort": "+7",
        "ref": "+15",
        "von": "+5",
        "defesaObs": "imunidade a encantamento",
        "pv": "95",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "4",
            "con": "1",
            "int": "1",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Arco élfico x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d6+4",
                "desc": ""
            },
            {
                "nome": "Arco élfico x2",
                "tipo": "À Distância",
                "bonus": "+14",
                "dano": "1d8+6, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Acrobata Felina",
                "desc": "Alyssa pode escolher 10 em testes de Acrobacia e Atletismo e não sofre redução em seu deslocamento quando usa essas perícias para se mover."
            },
            {
                "nome": "Dispa ro Preciso",
                "desc": "Alyssa não sofre penalidades em ataques à distância contra alvos engajados em combate corpo a corpo."
            },
            {
                "nome": "Perseguidora Implacável",
                "desc": "Sempre que usa uma ação completa para seguir uma presa em uma perseguição, Alyssa pode fazer um único ataque no final de seu deslocamento, desde que o alvo esteja no alcance de sua arma."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+9"
            },
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Cavalgar",
                "valor": "+7"
            },
            {
                "nome": "Enganação",
                "valor": "+4"
            },
            {
                "nome": "Furtividade",
                "valor": "+7"
            },
            {
                "nome": "Guerra",
                "valor": "+4"
            },
            {
                "nome": "Intimidação",
                "valor": "+4"
            },
            {
                "fonte": "Guerra Artoniana"
            },
        ],
    },
    {
        "nome": "Bando de Defeituosos Menores",
        "tipo": "Humanoide (variado) Enorme",
        "nd": "4",
        "iniciativa": "+6",
        "percepcao": "+3",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "23",
        "fort": "+10",
        "ref": "+15",
        "von": "+5",
        "defesaObs": "normal",
        "pv": "150",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "2",
            "con": "1",
            "int": "0",
            "sab": "–1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Garras x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d4+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Dilacerar",
                "desc": "Ao acertar seus dois ataques de garra, o bando de defeituosos menores aplica uma mordida sobre a parte ferida, causando +1d6 pontos de dano."
            },
            {
                "nome": "Bando",
                "desc": "Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área. Um personagem com o poder Trespassar que acerte a criatura pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+2"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },

    {
        "nome": "Grupo de Assalto",
        "tipo": "Humanoide (humano purista) Grande",
        "nd": "4",
        "iniciativa": "+5",
        "percepcao": "+5",
        "percepcaoObs": "normal",
        "defesa": "24",
        "fort": "+12",
        "ref": "+6",
        "von": "+3",
        "defesaObs": "normal",
        "pv": "100",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "3",
            "int": "0",
            "sab": "–1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+21",
                "dano": "1d10+9, 19",
                "desc": ""
            },
            {
                "nome": "Besta pesada",
                "tipo": "À Distância",
                "bonus": "+19",
                "dano": "1d12+4, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Coesão",
                "desc": "Enquanto tiver mais da metade de seus PV, o grupo de assalto recebe +5 em testes de resistência."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Besta pesada, escudo pesado, espada bastarda, meia armadura, virotes x10 (2d4 de cada)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Soldado Purista Veterano",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "4",
        "iniciativa": "+6",
        "percepcao": "+4",
        "percepcaoObs": "normal",
        "defesa": "24",
        "fort": "+14",
        "ref": "+8",
        "von": "+6",
        "defesaObs": "normal",
        "pv": "30",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "4",
            "int": "0",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "1d12+15, 19",
                "desc": ""
            },
            {
                "nome": "Besta pesada",
                "tipo": "À Distância",
                "bonus": "+16",
                "dano": "1d12+10, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Lutar em Formação",
                "desc": "Se o soldado veterano estiver adjacente a um aliado que também possua este poder, recebe +2 em testes de ataque e Defesa."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Besta pesada, escudo pesado, espada bastarda aumentada, meia armadura reforçada, virotes x10",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Krozzyn, Caçador Monstruoso",
        "tipo": "Humanoide (monstro purista) Médio",
        "nd": "5",
        "iniciativa": "+9",
        "percepcao": "+7",
        "percepcaoObs": "normal",
        "defesa": "24",
        "fort": "+13",
        "ref": "+15",
        "von": "+7",
        "defesaObs": "imunidade a medo, redução de dano 5",
        "pv": "180",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "4",
            "int": "0",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Desarmado",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d4+12",
                "desc": ""
            },
            {
                "nome": "Garra",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d8+12, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Inimigo de Todos",
                "desc": "(Movimento) Krozzyn analisa uma criatura humanoide não humana em alcance curto. Até o fim da cena, ou até usar esta habilidade em outra criatura, ele recebe +4 em testes de perícia e +1d12 nas rolagens de dano contra essa criatura, e seus ataques contra ela recebem +1 na margem de ameaça."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+9"
            },
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Enganação",
                "valor": "+13"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Intimidação",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Lady Alyssa, Experiente",
        "tipo": "Humanoide (elfa) Médio",
        "nd": "5",
        "iniciativa": "+11",
        "percepcao": "+10",
        "percepcaoObs": "visão na penumbra",
        "defesa": "26",
        "fort": "+9",
        "ref": "+17",
        "von": "+7",
        "defesaObs": "imunidade a encantamento",
        "pv": "170",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "5",
            "con": "1",
            "int": "1",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Arco élfico x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+19",
                "dano": "1d6+5",
                "desc": ""
            },
            {
                "nome": "Arco élfico x2",
                "tipo": "À Distância",
                "bonus": "+19",
                "dano": "1d8+12, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Acrobata Felina",
                "desc": "Alyssa pode escolher 10 em testes de Atletismo e Acrobacia, além de manter seu deslocamento normal quando usa essas perícias para se mover."
            },
            {
                "nome": "Dispa ro Preciso",
                "desc": "Alyssa não sofre penalidades em ataques à distância contra alvos engajados em combate corpo a corpo."
            },
            {
                "nome": "Perseguidora Implacável",
                "desc": "Sempre que usa uma ação completa para seguir uma presa em uma perseguição, Alyssa pode fazer um único ataque no final de seu deslocamento, desde que o alvo esteja no alcance de sua arma."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+11"
            },
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Cavalgar",
                "valor": "+9"
            },
            {
                "nome": "Enganação",
                "valor": "+5"
            },
            {
                "nome": "Furtividade",
                "valor": "+9"
            },
            {
                "nome": "Guerra",
                "valor": "+5"
            },
            {
                "nome": "Intimidação",
                "valor": "+5"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+5"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Adaga, arco élfico de madeira Tollon (veja quadro na Aventura 2), colar de teletransporte, couraça sob medida, flechas x20",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Lorde Wynborn",
        "tipo": "Humanoide (humano) Médio",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+6",
        "percepcaoObs": "normal",
        "defesa": "25",
        "fort": "+10",
        "ref": "+7",
        "von": "+16",
        "defesaObs": "normal",
        "pv": "135",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "3",
            "int": "2",
            "sab": "0",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d8+10",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Chama r Reforços",
                "desc": "(Padrão) Lorde Wynborn invoca 1d4 guardas palacianos que surgem em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada do Lorde. Recarga: 1d4 rodadas."
            },
            {
                "nome": "Gritar Ordens",
                "desc": "(Padrão) Os aliados em alcance médio do Lorde recebem +2 em testes de perícia até o fim da rodada."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+7"
            },
            {
                "nome": "Diplomacia",
                "valor": "+9"
            },
            {
                "nome": "Intimidação",
                "valor": "+9"
            },
            {
                "nome": "Intuição",
                "valor": "+7"
            },
            {
                "nome": "Nobreza",
                "valor": "+8"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Cota de malha, escudo pesado, espada longa certeira",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Makhs Venn",
        "tipo": "Humanoide (humano) Médio",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+4",
        "percepcaoObs": "normal",
        "defesa": "25",
        "fort": "+11",
        "ref": "+15",
        "von": "+10",
        "defesaObs": "evasão",
        "pv": "210",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "4",
            "con": "3",
            "int": "1",
            "sab": "3",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Desarmado x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "2d8+12",
                "desc": ""
            },
            {
                "nome": "Adaga x3",
                "tipo": "À Distância",
                "bonus": "+13",
                "dano": "1d4+12, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque de Chi",
                "desc": "Os ataques desarmados de Venn ignoram 10 pontos de redução de dano dos alvos."
            },
            {
                "nome": "ND 4",
                "desc": ""
            },
            {
                "nome": "ND 5",
                "desc": ""
            },
            {
                "nome": "Pilão Giga ntotáurico",
                "desc": "(Livre) Uma vez por rodada, se agarrar uma criatura, Venn pode tentar derrubá-la (teste +16). Se for derrubada, a criatura sofre 4d8+12 pontos de dano de impacto e fica caída."
            },
            {
                "nome": "Técnica de Rua",
                "desc": "(Reação) Uma vez por rodada, se passar em um teste de manobra de combate contra uma criatura, Venn pode fazer um ataque desarmado contra ela."
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
                "nome": "Atuação",
                "valor": "+8"
            },
            {
                "nome": "Cura",
                "valor": "+8"
            },
            {
                "nome": "Enganação",
                "valor": "+8"
            },
            {
                "nome": "Ofício (alquimista)",
                "valor": "+5"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Adaga x3",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Mestre do \"Clã da Lótus\"",
        "tipo": "Humanoide (humano) Médio",
        "nd": "5",
        "iniciativa": "+12",
        "percepcao": "+3",
        "percepcaoObs": "normal",
        "defesa": "25",
        "fort": "+17",
        "ref": "+7",
        "von": "+13",
        "defesaObs": "evasão",
        "pv": "200",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "3",
            "int": "1",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Desarmado x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "1d10+10, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aproveitador",
                "desc": "(Reação) Quando executa uma manobra de combate com sucesso, o mestre marcial do \"Clã da Lótus\" faz um ataque desarmado contra o alvo dessa manobra."
            },
            {
                "nome": "Artista Marcial",
                "desc": "O mestre marcial recebe +5 em testes de manobra de combate."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+10"
            },
            {
                "nome": "Nobreza",
                "valor": "+5"
            },
            {
                "nome": "Religião",
                "valor": "+5"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sahuagin Capitão",
        "tipo": "Humanoide (sahuagin) Médio",
        "nd": "5",
        "iniciativa": "+9",
        "percepcao": "+5",
        "percepcaoObs": "visão no escuro",
        "defesa": "23",
        "fort": "+11",
        "ref": "+16",
        "von": "+5",
        "defesaObs": "sensibilidade a luz",
        "pv": "152",
        "desl": "9m (6q), natação 15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "2",
            "int": "0",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "1d10+12, 19",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d4+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Afinidade com Tubarões",
                "desc": "O sahuagin pode se comunicar telepaticamente com tubarões em alcance médio."
            },
            {
                "nome": "Corpo Salino",
                "desc": "Se for totalmente submerso em água doce, o sahuagin fica fatigado (Fort CD 15 evita)."
            },
            {
                "nome": "Forma de Tubarão",
                "desc": "(Completa) O sahuagin adquire uma forma híbrida de tubarão. Ele se torna Grande, recebe faro e +3 em Força e na Defesa, e seus ataques se tornam espada longa +21 (1d10+15) e mordida +18 (2d4+11). Nessa forma, ele sempre ataca o oponente atualmente com a maior quantidade de dano sofrido."
            },
            {
                "nome": "Frenesi",
                "desc": "(Livre) Quando acerta um ataque de mordida, o sahuagin entra em frenesi até o fim da cena. Neste estado, ele recebe +2 em testes de ataque e rolagens de dano."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+4"
            },
            {
                "nome": "Atletismo",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Espada longa",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sir Walton Bronze",
        "tipo": "Humanoide (humano) Médio",
        "nd": "5",
        "iniciativa": "+5",
        "percepcao": "+7",
        "percepcaoObs": "normal",
        "defesa": "32",
        "fort": "+15",
        "ref": "+6",
        "von": "+14",
        "defesaObs": "redução de dano 5",
        "pv": "135",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "4",
            "int": "1",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "2d8+12, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Cavaleiro Veterano",
                "desc": "(Reação) Uma vez por rodada, quando é alvo de um ataque corpo a corpo, Sir Walthon Bronze pode fazer um teste de Cavalgar oposto ao ataque. Se vencer, ele evita o dano e pode fazer um ataque corpo a corpo contra o atacante."
            },
            {
                "nome": "Corcel de Guerra",
                "desc": "Sir Walthon tem um corcel de guerra. Enquanto estiver montado, seu deslocamento muda para 12m e ele recebe +1d8 em rolagens de dano corpo a corpo."
            },
            {
                "nome": "Investida Montada",
                "desc": "Quando faz uma investida montada, Sir Walthon causa +4d8 pontos de dano e pode continuar se movendo após o ataque, até o limite de seu deslocamento."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Cavalgar",
                "valor": "+17"
            },
            {
                "nome": "Diplomacia",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa, cavalo de guerra, escudo pesado reforçado, espada longa pungente, poção de Curar Ferimentos (5d8+5)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Ginete de Serpe",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "6",
        "iniciativa": "+10",
        "percepcao": "+9",
        "percepcaoObs": "normal",
        "defesa": "26",
        "fort": "+11",
        "ref": "+17",
        "von": "+7",
        "defesaObs": "evasão",
        "pv": "170",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Lança montada",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d8+14, x3, mais veneno",
                "desc": "Veneno Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fortitude CD 22 reduz a duração para 1 rodada)."
            },
            {
                "nome": "Besta pesada",
                "tipo": "À Distância",
                "bonus": "+20",
                "dano": "1d12+14",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ás Voador",
                "desc": "Se o ginete de serpe tiver percorrido pelo menos 6m voando, ele recebe +5 na Defesa e em testes de ataque até o início de sua próxima rodada."
            },
            {
                "nome": "Carga Aérea",
                "desc": "(Completa) Quando faz uma investida montada, o ginete causa +4d8 pontos de dano e, se fizer um acerto crítico, o alvo fica caído. Além disso, ele pode continuar se movendo após o ataque, até o limite de seu deslocamento."
            },
            {
                "nome": "Esquiva Montada",
                "desc": "(Reação) Uma vez por rodada, quando estiver montado e for alvo de um ataque corpo a corpo, o ginete pode fazer um teste de Cavalgar e reduzir o resultado desse teste do dano sofrido."
            },
            {
                "nome": "Ginete Alado",
                "desc": "O ginete possui um serpe (veja Tormenta20, p. 293) como parceiro montaria Grande. Enquanto estiver montado, seu deslocamento muda para voo 12m (8q) e recebe +1d8 em rolagens de dano corpo a corpo."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+8"
            },
            {
                "nome": "Cavalgar",
                "valor": "+10"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa, besta pesada, lança montada, sela aprimorada",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Ginete Purista",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "6",
        "iniciativa": "+10",
        "percepcao": "+5",
        "percepcaoObs": "normal",
        "defesa": "26",
        "fort": "+17",
        "ref": "+12",
        "von": "+7",
        "defesaObs": "normal",
        "pv": "64",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "3",
            "con": "2",
            "int": "0",
            "sab": "0",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Lança montada",
                "tipo": "Corpo a Corpo",
                "bonus": "+22",
                "dano": "1d8+16, x3",
                "desc": ""
            },
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+22",
                "dano": "1d10+16",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Carga de Cavalaria",
                "desc": "(Completa) Quando realiza uma investida montada, o ginete purista causa +3d8 pontos de dano (ou +4d8, se estiver atacando com a lança montada). Além disso, ele pode continuar se movendo após o ataque, até o limite de seu deslocamento."
            },
            {
                "nome": "Esquiva Montada",
                "desc": "(Reação) Uma vez por rodada, quando estiver montado e for alvo de um ataque corpo a corpo, o ginete purista pode fazer um teste de Cavalgar e reduzir o resultado desse teste do dano sofrido."
            },
            {
                "nome": "Fincado no Solo",
                "desc": "(Movimento) O ginete firma sua base no chão, tornando-se um baluarte defensivo. Até o final da cena, ou até ele se mover, o ginete recebe +5 na Defesa, RD 5 e 10 pontos de vida temporários. Ele só pode usar esta habilidade se estiver desmontado e sobre o solo."
            },
            {
                "nome": "Ginete Puro",
                "desc": "O ginete possui um cavalo de guerra, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento muda para 12m (8q) e ele recebe +1d8 em rolagens de dano corpo a corpo."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+8"
            },
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Cavalgar",
                "valor": "+11"
            },
            {
                "nome": "Guerra",
                "valor": "+5"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Espada bastarda, lança montada, meia armadura, sela aprimorada",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Izumo, o Impiedoso",
        "tipo": "Humanoide (humano) Médio",
        "nd": "6",
        "iniciativa": "+10",
        "percepcao": "+10",
        "percepcaoObs": "normal",
        "defesa": "27",
        "fort": "+8",
        "ref": "+16",
        "von": "+10",
        "defesaObs": "evasão",
        "pv": "220",
        "desl": "9m (6q)",
        "pm": "58",
        "atributos": {
            "for": "2",
            "des": "6",
            "con": "2",
            "int": "4",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas katanas",
                "tipo": "Corpo a Corpo",
                "bonus": "+19",
                "dano": "2d10+19, 19",
                "desc": "Ataque Furtivo +2d6."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Reflexo",
                "desc": "(Reação) Uma vez por rodada, Izumo pode fazer um ataque corpo a corpo contra um alvo em seu alcance natural que esteja desprevenido ou que se mova voluntariamente para fora desse alcance."
            },
            {
                "nome": "Shinobi Imp revésivel",
                "desc": "Uma vez por rodada, quando faz um ataque, Izumo rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Magias",
                "desc": "Como um bruxo de 8º nível (CD 24). Seu foco arcano é sua katana."
            },
            {
                "nome": "Primor Atlético",
                "desc": "(Movimento, 2 PM) Izumo salta e pousa em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura neste turno, ele recebe os benefícios e penalidades de uma investida e causa um dado extra de dano do mesmo tipo com esse ataque."
            },
            {
                "nome": "Resistência a Energia",
                "desc": "(Padrão, 6 PM) Até o fim da cena, criaturas escolhidas em alcance curto recebem redução de dano 10 contra ácido, eletricidade, fogo, frio, luz ou trevas, à escolha de Izumo."
            },
            {
                "nome": "Soco de Arsenal",
                "desc": "(Padrão, 4 PM) O alcance natural de Izumo aumenta para 4,5m até o fim da cena."
            },
            {
                "nome": "Velocidade",
                "desc": "(Padrão, 3 PM, sustentada) Izumo pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            },
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Enganação",
                "valor": "+10"
            },
            {
                "nome": "Furtividade",
                "valor": "+14"
            },
            {
                "nome": "Misticismo",
                "valor": "+14"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+9"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Katana x2",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Lady Alyssa, com Mosquete",
        "tipo": "Humanoide (elfa) Médio",
        "nd": "6",
        "iniciativa": "+12",
        "percepcao": "+12",
        "percepcaoObs": "visão na penumbra",
        "defesa": "29",
        "fort": "+10",
        "ref": "+18",
        "von": "+8",
        "defesaObs": "imunidade a encantamento",
        "pv": "210",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "5",
            "con": "1",
            "int": "1",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Adaga x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+22",
                "dano": "1d4+10, 19",
                "desc": ""
            },
            {
                "nome": "Mosquete",
                "tipo": "À Distância",
                "bonus": "+22",
                "dano": "2d8+12, 19/x3, mais 3d6 perfuração",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Acrobata Felina",
                "desc": "Alyssa pode escolher 10 em testes de Atletismo e Acrobacia, além de manter seu deslocamento normal quando usa essas perícias para se mover."
            },
            {
                "nome": "Atiradora Nata",
                "desc": "Alyssa não sofre penalidades em ataques à distância contra alvos engajados em combate corpo a corpo e pode recarregar armas de fogo com uma ação de movimento."
            },
            {
                "nome": "Perseguidora Implacável",
                "desc": "Sempre que usa uma ação completa para seguir uma presa em uma perseguição, Alyssa pode fazer um único ataque no final de seu deslocamento, desde que o alvo esteja no alcance de sua arma."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+12"
            },
            {
                "nome": "Atletismo",
                "valor": "+10"
            },
            {
                "nome": "Cavalgar",
                "valor": "+10"
            },
            {
                "nome": "Enganação",
                "valor": "+6"
            },
            {
                "nome": "Furtividade",
                "valor": "+10"
            },
            {
                "nome": "Guerra",
                "valor": "+6"
            },
            {
                "nome": "Intimidação",
                "valor": "+6"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Adaga, arco élfico de madeira Tollon (veja quadro na Aventura 2), balas x20, colar de teletransporte, couraça sob medida, flechas x20, mosquete",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Makhs/Tarkhs Venn",
        "tipo": "Humanoide (humano) Médio",
        "nd": "6",
        "iniciativa": "+10",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "27",
        "fort": "+11",
        "ref": "+16",
        "von": "+10",
        "defesaObs": "evasão",
        "pv": "222",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "4",
            "con": "3",
            "int": "1",
            "sab": "3",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Desarmado x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+19",
                "dano": "2d8+19",
                "desc": ""
            },
            {
                "nome": "Adaga x3",
                "tipo": "À Distância",
                "bonus": "+17",
                "dano": "1d4+17, 19, mais veneno",
                "desc": "Veneno Lágrima do carrasco (veja p. 82)."
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque de Chi",
                "desc": "Os ataques desarmados de Venn ignoram 10 pontos de redução de dano dos alvos."
            },
            {
                "nome": "Pilão Gigantotesco",
                "desc": "(Livre) Uma vez por rodada, se agarrar uma criatura, Venn pode tentar derrubá-la (teste +24). Se for derrubada, a criatura sofre 4d8+12 pontos de dano de impacto."
            },
            {
                "nome": "Técnica de Rua",
                "desc": "(Reação) Uma vez por rodada, se passar em um teste de manobra de combate contra uma criatura, Venn pode fazer um ataque desarmado contra ela."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Atletismo",
                "valor": "+14"
            },
            {
                "nome": "Atuação",
                "valor": "+9"
            },
            {
                "nome": "Cura",
                "valor": "+9"
            },
            {
                "nome": "Enganação",
                "valor": "+9"
            },
            {
                "nome": "Ofício (alquimista)",
                "valor": "+6"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Adaga x3",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sir Thuranald",
        "tipo": "Morto-vivo Grande",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+8",
        "percepcaoObs": "visão no escuro",
        "defesa": "28",
        "fort": "+19",
        "ref": "+5",
        "von": "+13",
        "defesaObs": "redução de corte, frio e perfuração 5",
        "pv": "250",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "0",
            "con": "4",
            "int": "–4",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+22",
                "dano": "2d6+20, 19",
                "desc": ""
            },
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+22",
                "dano": "1d6+20",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Assustar",
                "desc": "(Movimento) Sir Thuranald manifesta sua raiva e angústia. Cada criatura em alcance curto capaz devê-lo fica abalada (Von CD 22 evita). Se falhar no teste de Vontade por 5 ou mais, a criatura fica apavorada por 1 rodada e depois abalada e, se falhar por 10 ou mais, também envelhece 2d4 anos. Medo."
            },
            {
                "nome": "Bloqueio Espectral",
                "desc": "(Reação) Uma vez por rodada, quando sofre dano de um ataque, Sir Thuranald recebe redução 20 contra esse dano."
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Espada bastarda",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Coronel Reggar Wortric",
        "tipo": "Humanoide (humano) Grande",
        "nd": "7",
        "iniciativa": "+14",
        "percepcao": "+10",
        "percepcaoObs": "visão no escuro",
        "defesa": "27",
        "fort": "+17",
        "ref": "+13",
        "von": "+15",
        "defesaObs": "imunidade a doenças, efeitos mentais, frio, medo, surpreendido e veneno, maior que a morte, não pode ser flanqueado, redução de corte, impacto e perfuração 10, vulnerabilidade à fogo",
        "pv": "330",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "7",
            "con": "7",
            "int": "3",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Doutrinadora",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "4d8+10, 19/x3, mais 1d6 frio",
                "desc": ""
            },
            {
                "nome": "Ataque desarmado",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d8+10 letal, mais 1d6 frio",
                "desc": ""
            },
            {
                "nome": "Doutrinadora",
                "tipo": "À Distância",
                "bonus": "+27",
                "dano": "4d8+10, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Até o Fim!",
                "desc": "Quando o Coronel Reggar Wortric é reduzido a 100 PV ou menos, entra em um frenesi de combate. Ele recebe +5 em testes de ataque e rolagens de dano e seu deslocamento muda para 18m (12q). Entretanto, perde suas reduções de dano."
            },
            {
                "nome": "Eles não São Humanos!",
                "desc": "Wortric recebe +5 em testes de ataque e rolagens de dano contra não humanos."
            },
            {
                "nome": "Mestre Tático",
                "desc": "(Reação) Quando acerta um ataque corpo a corpo com sua espada em uma criatura de tamanho igual ou menor que o seu, Wortric a empurra até 12m para qualquer direção em linha reta. A criatura sofre 2d6 pontos de dano de impacto e, se houver outra criatura no trajeto, o movimento é interrompido e ambas ficam caídas."
            },
            {
                "nome": "Pata do Leopardo",
                "desc": "(Reação) Quando acerta um ataque desarmado, Wortric ignora quaisquer reduções de dano do alvo."
            },
            {
                "nome": "Soldado Universal",
                "desc": "(Reação) Uma vez por rodada, quando é alvo de um ataque ou habilidade, Wortric faz um ataque contra a criatura que o realizou, mas perde suas reduções de dano por 1 rodada."
            },
            {
                "nome": "Braço das Uivantes",
                "desc": "Caso seja convencido a remover sua prótese (veja o quadro \"As Armas de Reggar Wortric\"), Wortric sofre as seguintes penalidades: –2 em testes de ataque e rolagens de dano; –5 na Defesa; Perde suas reduções de dano; Deixa de causar dano de frio e de ser imune a ele; Por fim, passa a fazer apenas um ataque por turno."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+14"
            },
            {
                "nome": "Atletismo",
                "valor": "+17"
            },
            {
                "nome": "Guerra",
                "valor": "+17"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            },
            {
                "nome": "Ofício (pintor)",
                "valor": "+10"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Braço das Uivantes, cinto do campeão, Doutrinadora (veja o quadro ao lado)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Grupo de Assalto Veterano",
        "tipo": "Humanoide (humano purista) Grande",
        "nd": "7",
        "iniciativa": "+9",
        "percepcao": "+9",
        "percepcaoObs": "normal",
        "defesa": "28",
        "fort": "+16",
        "ref": "+10",
        "von": "+8",
        "defesaObs": "normal",
        "pv": "150",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "4",
            "int": "0",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "2d12+20, 19",
                "desc": ""
            },
            {
                "nome": "Besta pesada",
                "tipo": "À Distância",
                "bonus": "+28",
                "dano": "2d12+20, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Coesão",
                "desc": "Enquanto tiver mais da metade de seus PV, o grupo de assalto recebe +5 em testes de resistência."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Besta pesada, escudo leve, espada bastarda aumentada, meia armadura reforçada, virotes x10 (2d4 de cada)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Klunc",
        "tipo": "Humanoide (humano) Grande",
        "nd": "7",
        "iniciativa": "+9",
        "percepcao": "+9",
        "percepcaoObs": "normal",
        "defesa": "32",
        "fort": "+20",
        "ref": "+8",
        "von": "+10",
        "defesaObs": "redução de dano 5",
        "pv": "250",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "0",
            "con": "5",
            "int": "–3",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Presuntador I x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "3d6+20, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Klunc Mais Klunc",
                "desc": "(Movimento) Klunc se torna Enorme até o fim da cena (essa mudança afeta seu equipamento). Ele recebe Força +5 e seu ataque se torna +32 (4d6+25, x3)."
            },
            {
                "nome": "Klunc não Morre",
                "desc": "(Reação) Uma vez por cena, Klunc pode ignorar um dano recém sofrido."
            },
            {
                "nome": "Klunc Quebra",
                "desc": "Klunc recebe +5 em testes de ataque para quebrar e causa +2d8 pontos de dano em objetos."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Couraça reforçada, Presuntador I (machado de guerra aumentado magnífico)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Nargom Mandíbula",
        "tipo": "Humanoide (humano) Médio",
        "nd": "7",
        "iniciativa": "+17",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "31",
        "fort": "+8",
        "ref": "+19",
        "von": "+14",
        "defesaObs": "evasão, esquiva sobrenatural",
        "pv": "125",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "6",
            "con": "3",
            "int": "3",
            "sab": "2",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Florete x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "1d6+12, 17",
                "desc": "Ataque Furtivo +2d6."
            },
            {
                "nome": "Duas pistolas",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "2d6+12, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Audácia",
                "desc": "(Reação) Uma vez por cena, quando faz um teste de perícia, Nargom soma seu Carisma nesse teste."
            },
            {
                "nome": "Finta Aprimorada",
                "desc": "Nargom pode fintar como uma ação de movimento."
            },
            {
                "nome": "Língua Veloz",
                "desc": "Nargom sofre uma penalidade de apenas –5 para mentiras muito implausíveis, em vez de –10."
            },
            {
                "nome": "Mestre da Escapada",
                "desc": "(Reação) Nargom ignora o efeito nocivo de um ataque ou habilidade. Recarga (fintar um inimigo)."
            },
            {
                "nome": "Pistoleiro Experiente",
                "desc": "Nargom pode recarregar suas duas armas de fogo como uma ação de movimento e, quando ataca com uma arma de fogo, não sofre a penalidade padrão de –5 em testes de ataque contra oponentes envolvidos em combate corpo a corpo."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+15"
            },
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Diplomacia",
                "valor": "+15"
            },
            {
                "nome": "Enganação",
                "valor": "+20"
            },
            {
                "nome": "Furtividade",
                "valor": "+13"
            },
            {
                "nome": "Investigação",
                "valor": "+12"
            },
            {
                "nome": "Ofício (marinheiro)",
                "valor": "+10"
            },
            {
                "nome": "Pilotagem",
                "valor": "+13"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Capa esvoaçante aprimorada, florete atroz preciso, pistolas x2",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Povo-Escorpião",
        "tipo": "Monstro Grande",
        "nd": "7",
        "iniciativa": "+9",
        "percepcao": "+7",
        "percepcaoObs": "visão no escuro",
        "defesa": "30",
        "fort": "+19",
        "ref": "+14",
        "von": "+8",
        "defesaObs": "fortificação 50%, imunidade a veneno",
        "pv": "58",
        "desl": "12m (8q), escalada 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "3",
            "int": "0",
            "sab": "0",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Alabarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+10, x3",
                "desc": ""
            },
            {
                "nome": "Pinças",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+10",
                "desc": "Agarrar Aprimorado Pinças (teste +27)."
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "1d10+10 mais veneno",
                "desc": "Veneno Peçonha concentrada (perde 2d12 pontos de vida por rodada durante 3 rodadas, Fort CD 24 reduz a duração para uma rodada)."
            }
        ],
        "habilidades": [
            {
                "nome": "Pressionar",
                "desc": "(Livre) No início de cada um de seus turnos, o povo-escorpião causa 4d6+10 pontos de dano de corte na criatura que estiver agarrando com suas pinças. Sempre que rolar o resultado máximo em um desses dados de dano, o povo-escorpião rola um dado extra, repetindo o processo a cada resultado máximo."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+12"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Alabarda aumentada",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Arqueira da Mantícora",
        "tipo": "Monstro (medusa) Médio",
        "nd": "8",
        "iniciativa": "+11",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "32",
        "fort": "+15",
        "ref": "+20",
        "von": "+9",
        "defesaObs": "evasão, resistência a medo e veneno +5",
        "pv": "60",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "2",
            "int": "–1",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Arco longo x2",
                "tipo": "À Distância",
                "bonus": "+27",
                "dano": "2d8+18, x3, mais veneno",
                "desc": "Veneno Peçonha concentrada (perde 2d12 pontos de vida durante 3 rodadas, Fort CD 26 reduz a duração para 1 rodada)."
            }
        ],
        "habilidades": [
            {
                "nome": "Inescrupulosa",
                "desc": "A arqueira da Mantícora recebe +2 em testes de ataque e +2d6 em rolagens de dano contra criaturas flanqueadas, sob efeito de alguma condição ou que sigam algum código de conduta."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Arco longo, couraça, flechas x20",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Golem de Reconhecimento",
        "tipo": "Construto Grande",
        "nd": "8",
        "iniciativa": "+11",
        "percepcao": "+14",
        "percepcaoObs": "visão no escuro",
        "defesa": "26",
        "fort": "+11",
        "ref": "+17",
        "von": "+7",
        "defesaObs": "imunidade a eletricidade, redução de dano 10",
        "pv": "180",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "8",
            "des": "5",
            "con": "4",
            "int": "0",
            "sab": "5",
            "car": "–4"
        },
        "ataques": [
            {
                "nome": "Pancada x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d10+10",
                "desc": ""
            },
            {
                "nome": "Besta embutida x2",
                "tipo": "À Distância",
                "bonus": "+20",
                "dano": "2d8+10, 19, alcance médio",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Sensor de Caça",
                "desc": "(Movimento) O golem de reconhecimento analisa um inimigo em alcance curto. Até o fim da cena, ele recebe +5 em testes de ataque e Percepção, e +2d8 nas rolagens de dano, contra essa criatura. Esses bônus são dobrados se o alvo for um humanoide. Recarga (reduzir o alvo a 0 PV ou menos)."
            }
        ],
        "pericias": [
            {
                "nome": "Sobrevivência",
                "valor": "+13"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Kasumi",
        "tipo": "Humanoide (humana) Médio",
        "nd": "8",
        "iniciativa": "+17",
        "percepcao": "+12",
        "percepcaoObs": "normal",
        "defesa": "33",
        "fort": "+15",
        "ref": "+15",
        "von": "+15",
        "defesaObs": "evasão, redução de impacto e psíquico 5, resistência a efeitos mentais, efeitos de movimento e medo +5",
        "pv": "245",
        "desl": "18m (12q), ignora terreno difícil",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "4",
            "con": "4",
            "int": "1",
            "sab": "4",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Desarmado x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "2d6+20, 19/x3",
                "desc": "Os ataques desarmados de Kasumi são armas mágicas."
            }
        ],
        "habilidades": [
            {
                "nome": "Bloqueio Desarmado",
                "desc": "(Reação) Uma vez por rodada, quando é atingida por um ataque, Kasumi faz uma rolagem de dano corpo a corpo e subtrai o resultado dessa rolagem do dano causado pelo ataque. Se reduzir o dano do ataque a 0, ela pode imediatamente fazer um ataque desarmado contra o atacante."
            },
            {
                "nome": "Investida Vendaval",
                "desc": "(Completa) Kasumi faz uma investida. Se acertar o ataque, ela pode continuar seu deslocamento e atacar outro inimigo em qualquer direção, repetindo o processo até errar um ataque ou percorrer uma distância total igual ao dobro do seu deslocamento. Recarga (fazer um acerto crítico)."
            },
            {
                "nome": "Quebramento",
                "desc": "(Padrão) Kasumi faz um ataque desarmado que ignora até 10 pontos da RD do alvo e causa dano dobrado. Uma criatura atingida tem sua armadura avariada (–5 na Defesa) ou, se não estiver de armadura, fica debilitada."
            },
            {
                "nome": "Sexto Sentido",
                "desc": "Quando falha em um teste de Percepção, Kasumi pode repetir esse teste imediatamente usando Intuição. Além disso, pode usar essa perícia para detectar magia como se fosse Misticismo (veja Tormenta20, p. 121)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+17"
            },
            {
                "nome": "Atletismo",
                "valor": "+18"
            },
            {
                "nome": "Conhecimento",
                "valor": "+9"
            },
            {
                "nome": "Cura",
                "valor": "+12"
            },
            {
                "nome": "Intuição",
                "valor": "+12"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Faixas do pugilista",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Mercenário da Mantícora",
        "tipo": "Humanoide (humano) Médio",
        "nd": "8",
        "iniciativa": "+10",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "32",
        "fort": "+15",
        "ref": "+20",
        "von": "+9",
        "defesaObs": "resistência a medo e veneno +5",
        "pv": "60",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "2",
            "int": "–1",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d8+22, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Inescrupuloso",
                "desc": "O mercenário da Mantícora recebe +2 em testes de ataque e +2d6 em rolagens de dano contra criaturas flanqueadas, sob efeito de alguma condição ou que sigam algum código de conduta."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Brunea, escudo pesado, espada longa",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sacerdote Finntroll Renegado",
        "tipo": "Monstro (finntroll) Médio",
        "nd": "8",
        "iniciativa": "+10",
        "percepcao": "+10",
        "percepcaoObs": "visão no escuro",
        "defesa": "31",
        "fort": "+15",
        "ref": "+10",
        "von": "+21",
        "defesaObs": "normal",
        "pv": "218",
        "desl": "9m (6q)",
        "pm": "59",
        "atributos": {
            "for": "0",
            "des": "2",
            "con": "5",
            "int": "2",
            "sab": "5",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Açoite finntroll",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "1d8+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Urro Divino",
                "desc": "(Livre, 1 PM) Quando faz um ataque ou lança uma magia, o sacerdote finntroll renegado soma sua Constituição à rolagem de dano desse ataque ou magia."
            },
            {
                "nome": "Magias",
                "desc": "Como um clérigo de Megalokk de 10º nível (CD 24, limite de PM 10)."
            },
            {
                "nome": "Curar Ferimentos",
                "desc": "(Padrão, 9 PM) Uma criatura adjacente cura 10d8+10 PV ou criaturas escolhidas em alcance curto curam 5d8+5."
            },
            {
                "nome": "Comando",
                "desc": "(Padrão, 4 PM) No início do seu próximo turno, duas criaturas em alcance curto largam os itens que estão segurando e não podem pegá-los novamente até o início de seu turno seguinte (Von evita)."
            },
            {
                "nome": "Enxame de Pestes",
                "desc": "(Completa, 8 PM, sustentada) Dois enxames de ratos surgem em alcance médio e ocupam um quadrado de 1,5m cada. No fim de cada um dos turnos do sacerdote, cada enxame causa 2d12 pontos de dano de corte a qualquer criatura em seu espaço (Fort reduz à metade). O sacerdote pode gastar uma ação de movimento para mover cada enxame 12m."
            },
            {
                "nome": "Miasma Mefítico",
                "desc": "(Padrão, 10 PM) Uma nuvem de 6m de raio se forma em alcance médio. Criaturas na área sofrem 7d6 pontos de dano de trevas e ficam enjoadas por 1 rodada (Fort reduz o dano à metade e evita a condição)."
            },
            {
                "nome": "Pele de Pedra",
                "desc": "(Padrão, 6 PM) O renegado recebe redução de dano 5 até o fim da cena."
            },
            {
                "nome": "Perdição",
                "desc": "(Padrão, 5 PM) Criaturas escolhidas em alcance curto sofrem –3 em testes de ataque e rolagens de dano até o fim da cena."
            },
            {
                "nome": "Profanar",
                "desc": "(Padrão, 1 PM) Uma esfera de 9m em alcance longo se enche com energia negativa por 1 dia. Dentro dela, todo dano de trevas é maximizado."
            }
        ],
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+12"
            },
            {
                "nome": "Religião",
                "valor": "+14"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Açoite finntroll, símbolo sagrado de Megalokk, terra de cemitério",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Agente do Graath Veterano",
        "tipo": "Humanoide (humano) Médio",
        "nd": "9",
        "iniciativa": "+10",
        "percepcao": "+9",
        "percepcaoObs": "normal",
        "defesa": "32",
        "fort": "+10",
        "ref": "+15",
        "von": "+20",
        "defesaObs": "imunidade a medo, redução de trevas 5, resistência a magia +2",
        "pv": "240",
        "desl": "9m (6q)",
        "pm": "59",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "3",
            "int": "5",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "3d6+22, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Inescrupuloso",
                "desc": "O agente do Graath veterano recebe +2 em testes de ataque e +4d6 em rolagens de dano contra criaturas flanqueadas, sob efeito de alguma condição ou que sigam algum código de conduta (como Código de Honra ou Código do Herói)."
            },
            {
                "nome": "Magias",
                "desc": "Como um mago de 8º nível (CD 26, limite de PM 13)."
            },
            {
                "nome": "Adaga Mental",
                "desc": "(Padrão, 13 PM) Uma criatura em alcance curto sofre 8d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena."
            },
            {
                "nome": "Relâmpago",
                "desc": "(Padrão, 13 PM) O agente causa 16d6 pontos de dano de eletricidade em todas as criaturas em uma linha de 30m (Ref reduz à metade)."
            },
            {
                "nome": "Seta Infalível de Talude",
                "desc": "(Padrão, 7 PM) O agente projeta 5 lanças de energia distribuídas em até 5 criaturas em alcance médio. Cada lança causa 1d8+1 pontos de dano de essência."
            }
        ],
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+13"
            },
            {
                "nome": "Intuição",
                "valor": "+13"
            },
            {
                "nome": "Misticismo",
                "valor": "+15"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Espada longa",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Companhia Blindada",
        "tipo": "Humanoide (humano purista) Grande",
        "nd": "9",
        "iniciativa": "+9",
        "percepcao": "+9",
        "percepcaoObs": "normal",
        "defesa": "36",
        "fort": "+17",
        "ref": "+8",
        "von": "+16",
        "defesaObs": "redução de dano 5/mágico",
        "pv": "375",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "4",
            "int": "1",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Martelo de guerra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "2d8+12, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Empurrão",
                "desc": "(Movimento) A companhia blindada usa a manobra empurrar (teste +32) contra um alvo adjacente, mas não pode se mover junto com ele e sofre –5 na Defesa até o início de seu próximo turno."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            },
            {
                "nome": "Prontidão",
                "desc": "(Reação) Sempre que um inimigo entra ou sai por conta própria do alcance pessoal da companhia, ela pode fazer um ataque contra essa criatura. Se acertar, além de causar dano, deixa o alvo imóvel até o início de seu próximo turno."
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa, escudo pesado, martelo de guerra (1d6 de cada), poção de Curar Ferimentos (2d8+2) x2d6",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Capitão Espinha",
        "tipo": "Humanoide (humano) Médio",
        "nd": "10",
        "iniciativa": "+20",
        "percepcao": "+12",
        "percepcaoObs": "normal",
        "defesa": "36",
        "fort": "+14",
        "ref": "+20",
        "von": "+11",
        "defesaObs": "evasão aprimorada, imunidade a medo, redução de dano 5",
        "pv": "410",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "8",
            "con": "3",
            "int": "1",
            "sab": "0",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Florete x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "3d6+22, 18, mais veneno",
                "desc": "Veneno Perde 3d12 pontos de vida por rodada, durante três rodadas (Fort CD 28 reduz para uma rodada)."
            },
            {
                "nome": "Duas pistolas",
                "tipo": "À Distância",
                "bonus": "+30",
                "dano": "3d8+12, 15/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "À Queima-Roupa",
                "desc": "Sempre que faz um ataque de pistola contra um oponente adjacente, Espinha recebe um bônus de +5 em seu teste de ataque e +2 na margem de ameaça. Se errar, o ataque ainda causa metade do dano."
            },
            {
                "nome": "Contragolpe Audaz",
                "desc": "(Reação) Uma vez por rodada, quando é atingido por um ataque corpo a corpo, Espinha pode fazer um ataque com seu florete contra o agressor. Se atingir o inimigo, além de causar dano, o dano sofrido por Espinha é reduzido em um valor igual ao resultado do teste de ataque dele."
            },
            {
                "nome": "Balançar o Navio",
                "desc": "(Completa) Espinha sacode seu navio violentamente. Cada inimigo na embarcação sofre 2d6 pontos de dano de impacto e fica caído (Ref CD 28 evita)."
            },
            {
                "nome": "Disparo Preciso",
                "desc": "Espinha pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
            },
            {
                "nome": "Injeção Alquímica",
                "desc": "Cada pistola de Espinha possui uma dose de veneno, que é disparada no primeiro tiro a cada combate."
            },
            {
                "nome": "Saque Rápido",
                "desc": "Espinha pode sacar ou guardar itens como uma ação livre e recarregar suas duas pistolas como uma ação de movimento."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+19"
            },
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+15"
            },
            {
                "nome": "Pilotagem",
                "valor": "+18"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Balas x20, casaco de capitão pirata, florete, pistola atroz e precisa x2",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Coronel Dietrich Kranz",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "10",
        "iniciativa": "+11",
        "percepcao": "+7",
        "percepcaoObs": "normal",
        "defesa": "36",
        "fort": "+10",
        "ref": "+16",
        "von": "+22",
        "defesaObs": "imunidade a medo, redução de dano 10",
        "pv": "360",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "2",
            "int": "4",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "2d12+20, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "A melhor defesa...",
                "desc": "(Reação) Uma vez por rodada, quando é atingido por ataque, Kranz faz um teste ataque e reduz o valor desse teste do dano sofrido."
            },
            {
                "nome": "...é não ser atingido!",
                "desc": "(Reação) Sempre que é atingido por um ataque, Kranz pode se mover 1,5m para longe do inimigo."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            },
            {
                "nome": "Ordenar",
                "desc": "(Movimento) Kranz dá ordens aos seus comandados. Todos os aliados dele em alcance curto recebem +3 em testes de ataque e rolagens de dano em seu próximo ataque."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+13"
            },
            {
                "nome": "Diplomacia",
                "valor": "+13"
            },
            {
                "nome": "Enganação",
                "valor": "+13"
            },
            {
                "nome": "Guerra",
                "valor": "+16"
            },
            {
                "nome": "Intuição",
                "valor": "+11"
            },
            {
                "nome": "Nobreza",
                "valor": "+13"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Armadura completa reforçada e selada, espada bastarda pungente e atroz",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Coronel Henrik Zuraw",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "10",
        "iniciativa": "+13",
        "percepcao": "+9",
        "percepcaoObs": "normal",
        "defesa": "34",
        "fort": "+22",
        "ref": "+10",
        "von": "+16",
        "defesaObs": "redução de dano 10",
        "pv": "440",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "4",
            "con": "4",
            "int": "3",
            "sab": "0",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Lança montada",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "5d8+25, x3",
                "desc": ""
            },
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "4d8+25, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Carga Dupla",
                "desc": "(Completa) O Coronel Henrik Zuraw faz uma investida e ataca com sua lança montada e sua espada bastarda. Os dois ataques recebem o bônus da investida e podem ser feitos contra quaisquer inimigos em alcance."
            },
            {
                "nome": "Comandar",
                "desc": "(Padrão) Os aliados em alcance médio do coronel recebem +4 em testes de ataque e rolagens de dano até o fim da rodada."
            },
            {
                "nome": "Lanceiro",
                "desc": "O coronel recebe +1d8 em rolagens de dano com lanças (já contabilizado) e pode usar armas alongadas para atacar inimigos adjacentes."
            },
            {
                "nome": "Investida Poderosa",
                "desc": "Cada ataque em investida do coronel causa +4d8 pontos de dano."
            },
            {
                "nome": "Montaria Pura",
                "desc": "O coronel possui um cavalo de guerra, um parceiro montaria Grande. Enquanto estiver montado, seu deslocamento muda para 12m (8q), recebe +1d8 em rolagens de dano corpo a corpo e uma ação de movimento extra (apenas para se deslocar)."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "pericias": [
            {
                "nome": "Cavalgar",
                "valor": "+18"
            },
            {
                "nome": "Guerra",
                "valor": "+17"
            },
            {
                "nome": "Nobreza",
                "valor": "+12"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa, escudo pesado reforçado, espada bastarda aumentada de adamante, lança montada aumentada de adamante",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Gigante Bicéfalo",
        "tipo": "Humanoide (gigante) Enorme",
        "nd": "10",
        "iniciativa": "+9",
        "percepcao": "+8 (+10 em subterrâneo)",
        "percepcaoObs": "sensibilidade à luz, visão no escuro",
        "defesa": "34",
        "fort": "+22",
        "ref": "+15",
        "von": "+9",
        "defesaObs": "normal",
        "pv": "372",
        "desl": "15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "9",
            "des": "2",
            "con": "4",
            "int": "–2",
            "sab": "0",
            "car": "–3"
        },
        "ataques": [
            {
                "nome": "Tacape x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "1d12+18",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "1d6+18",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Duas Mentes",
                "desc": "O gigante faz uma ação padrão adicional por rodada. Além disso, quando faz um teste de Vontade, rola dois dados e escolhe o melhor resultado."
            },
            {
                "nome": "Duas Frentes",
                "desc": "Para o combate dos personagens ao lado de Lothar, a atenção do gigante bicéfalo estará dividida. Nesse caso, para os personagens, o gigante terá apenas 186 pontos de vida, Defesa 24, não poderá usufruir da habilidade Duas Mentes e só realiza um ataque de tacape."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+20"
            },
            {
                "nome": "Intimidação",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Tacape macabro x2",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Leonn Jäger",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "10",
        "iniciativa": "+18",
        "percepcao": "+16",
        "percepcaoObs": "normal",
        "defesa": "36",
        "fort": "+22",
        "ref": "+11",
        "von": "+17",
        "defesaObs": "imunidade a medo",
        "pv": "410",
        "desl": "9m (6q)",
        "pm": "68",
        "atributos": {
            "for": "5",
            "des": "3",
            "con": "4",
            "int": "5",
            "sab": "0",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "3d8+15, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            },
            {
                "nome": "Vendaval da Pureza",
                "desc": "(Completa, 10 PM) Leonn Jäger faz um ataque giratório com sua espada, atingindo todos em um raio de 3m. Ele faz uma única rolagem de ataque e compara com a Defesa de cada criatura na área. Criaturas atingidas sofrem 6d8+20 pontos de dano de corte mais 3d8 pontos de dano de trevas e não podem recuperar PV por uma rodada."
            },
            {
                "nome": "Capitão da Ordem Magibélica",
                "desc": "Leonn Jäger lança magias como um arcanista de 10º nível (CD 29). Ele pode lançar magias arcanas de armadura sem precisar de testes de Misticismo."
            },
            {
                "nome": "Concentração de Combate",
                "desc": "(Padrão, 3 PM) Até o final da cena, sempre que faz um ataque, Leonn Jäger rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Crânio Voador",
                "desc": "(Padrão, 9 PM) Um crânio de energia negativa causa 7d8+7 pontos de dano de trevas em uma criatura em alcance médio e deixa o alvo e todas as criaturas a 3m dele abaladas (Fort reduz à metade e evita a condição)."
            },
            {
                "nome": "Velocidade",
                "desc": "(Padrão, 3 PM, sustentada) Leonn Jäger pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Guerra",
                "valor": "+16"
            },
            {
                "nome": "Intimidação",
                "valor": "+18"
            },
            {
                "nome": "Misticismo",
                "valor": "+20"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Armadura completa reforçada, espada bastarda pungente de adamante",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sargento-Mor Ivan Zogarov",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "10",
        "iniciativa": "+17",
        "percepcao": "+10",
        "percepcaoObs": "normal",
        "defesa": "35",
        "fort": "+15",
        "ref": "+21",
        "von": "+9",
        "defesaObs": "imunidade a atordoamento, redução de dano 10",
        "pv": "370",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "6",
            "con": "3",
            "int": "4",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Espada bastarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "2d10+30, 18",
                "desc": ""
            },
            {
                "nome": "Soco de ferro",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "2d12+25, x4",
                "desc": "Agarrar Aprimorado (Livre) Soco de ferro (teste +30)."
            }
        ],
        "habilidades": [
            {
                "nome": "Investida de Ferro",
                "desc": "(Completa) O Sargento-mor Ivan Zogarov faz uma investida e ataca com sua espada bastarda e seu soco de ferro. Os dois ataques recebem o bônus de +2 da investida, e podem ser feitos contra quaisquer alvos em alcance."
            },
            {
                "nome": "Estripar",
                "desc": "Zogarov pode fazer ataques com a espada bastarda contra inimigos agarrados como se fosse uma arma leve, e causa +4d6 pontos de dano com esta arma contra criaturas agarradas."
            },
            {
                "nome": "Frenesi de Sangue",
                "desc": "Quando reduz os PV de um inimigo a 0 ou menos, Zogarov recebe um bônus cumulativo de +2 em testes de ataque e de resistência, em rolagens de dano e na margem de ameaça de seus ataques, até o fim da cena."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            },
            {
                "nome": "Uivo Psicopata",
                "desc": "Quando reduz os PV de um inimigo a 0 ou menos, Zogarov uiva de prazer. Ele recupera 40 PV e todos os inimigos a até 18m que possam ouvi-lo ficam atordoados por 1 rodada (Von CD 28 evita e a criatura não pode mais ser afetada por esta habilidade por um dia)."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+16"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa, braço metálico, espada bastarda pungente precisa de adamante",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Turba Linchadora",
        "tipo": "Humanoide (humano) Enorme",
        "nd": "10",
        "iniciativa": "+9",
        "percepcao": "+11",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "30",
        "fort": "+15",
        "ref": "+10",
        "von": "+20",
        "defesaObs": "normal",
        "pv": "200",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "1",
            "int": "–1",
            "sab": "0",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Bordão x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+33",
                "dano": "6d6+10 mais 1d6 fogo",
                "desc": "Queimem Todos Uma criatura que sofra dano de fogo da turba linchadora fica em chamas."
            }
        ],
        "habilidades": [
            {
                "nome": "Bando",
                "desc": "Se um ataque do bando exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área."
            },
            {
                "nome": "Queimem Todos",
                "desc": "Uma criatura que sofrer dano de fogo da turba linchadora fica em chamas."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+9"
            },
            {
                "nome": "Ofício (fazendeiro)",
                "valor": "+9"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Typhonn, Sacerdote Sahuagin",
        "tipo": "Humanoide (sahuagin) Médio",
        "nd": "Agora 10",
        "iniciativa": "+11",
        "percepcao": "+14",
        "percepcaoObs": "visão no escuro",
        "defesa": "32",
        "fort": "+9",
        "ref": "+16",
        "von": "+22",
        "defesaObs": "sensibilidade a luz",
        "pv": "252",
        "desl": "9m (6q), natação 15m (10q)",
        "pm": "65",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "2",
            "int": "1",
            "sab": "5",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Cajado",
                "tipo": "Corpo a Corpo",
                "bonus": "+29",
                "dano": "2d8+10"
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+25",
                "dano": "2d6+5"
            }
        ],
        "habilidades": [
            {
                "nome": "Afinidade com Tubarões",
                "desc": "Typhonn pode se comunicar telepaticamente com tubarões em alcance médio."
            },
            {
                "nome": "Corpo Salino",
                "desc": "Se for totalmente submerso em água doce, Typhonn fica fatigado (Fort CD 15 evita)."
            },
            {
                "nome": "Forma de Tubarão",
                "desc": "(Completa) Typhonn adquire uma forma híbrida de tubarão. Ele se torna Grande, recebe faro e +4 em Força e na Defesa, e seus ataques se tornam cajado de coral +33 (2d8+14) e mordida +29 (2d6+9). Mesmo nessa forma Typhonn consegue se controlar para escolher os alvos de suas ações e conjurar magias."
            },
            {
                "nome": "Investida Tempestade",
                "desc": "Quando fizer uma investida, Typhonn pode gastar 2PM para cobrir seu corpo com eletricidade. Se fizer isso, seu ataque causa +2d8 pontos de dano de eletricidade. Além disso, criaturas adjacentes ao caminho que ele percorrer na investida sofrem 2d8 pontos de dano de eletricidade e ficam ofuscadas por 1 rodada (Ref CD 26 reduz à metade e evita a condição)."
            },
            {
                "nome": "Moreia Amiga",
                "desc": "Uma vez por cena, se estiver em um território aquático, Typhonn pode invocar uma moreia gigante para protegê-lo em combate. A criatura surge em um espaço aquático desocupado em alcance curto e age a partir da próxima rodada de Typhonn. Ela tem deslocamento de natação 18m (12q), ataque de mordida +20 (3d8+8, 19, perfuração), For 6, Des 4, Defesa 20 e 80 PV e falha automaticamente em qualquer teste oposto ou de resistência. Ela foge automaticamente quando é reduzida a 0 PV ou menos."
            }
        ],
        "magias": "Como um clérigo de Benthos de 10º nível (CD 28).• Arma Espiritual (Padrão, 9 PM) Até o fim da cena, Typhonn recebe +2 na Defesa e, duas vezes por rodada, quando sofre um ataque corpo a corpo, pode usar uma reação para causar 2d6 pontos de dano de perfuração no atacante.• Despedaçar (Padrão, 5 PM) Um alvo em alcance curto sofre 3d8+6 pontos de dano de impacto, ou o dobro sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena.• Escudo da Fé (Reação, 1 PM) Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa por 1 turno.• Oração (Padrão, 3 PM, sustentada) Typhonn e seus aliados em alcance curto recebem +2 em testes de perícia e rolagens de dano, e todos seus inimigos em alcance curto sofrem –2 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias.",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+10"
            },
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Misticismo",
                "valor": "+10"
            },
            {
                "nome": "Religião",
                "valor": "+14"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Cajado",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Harghan Trozik",
        "tipo": "Humanoide (humano) Médio",
        "nd": "11",
        "iniciativa": "+16",
        "percepcao": "+10",
        "percepcaoObs": "normal",
        "defesa": "32",
        "fort": "+22",
        "ref": "+10",
        "von": "+16",
        "defesaObs": "imunidade a medo, redução de dano 10",
        "pv": "380",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "7",
            "con": "4",
            "int": "4",
            "sab": "1",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d12+30, 18"
            },
            {
                "nome": "Ataque desarmado",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d6+30"
            }
        ],
        "habilidades": [
            {
                "nome": "Aggrair Aprimorado",
                "desc": "(Livre) Ataque desarmado (teste +34)."
            },
            {
                "nome": "Ataque Furtivo",
                "desc": "+6d6."
            },
            {
                "nome": "Submissão Impiedosa",
                "desc": "Harghan pode atacar inimigos agarrados com sua espada bastarda como se ela fosse uma arma leve. Criaturas feridas dessa forma ficam sangrando."
            },
            {
                "nome": "Varrer",
                "desc": "(Livre) Uma vez por rodada, quando Harghan faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
            },
            {
                "nome": "Voz de Comando",
                "desc": "(Movimento) Harghan grita ordens que afetam todas as criaturas em um raio de 9m. Seus aliados recebem +2 em testes de perícia e rolagens de dano até o fim da cena e seus inimigos ficam pasmos por 1 rodada (Von CD 31 evita; uma criatura só pode ficar pasma por esta habilidade uma vez por dia)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+16"
            },
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Cavalgar",
                "valor": "+16"
            },
            {
                "nome": "Enganação",
                "valor": "+12"
            },
            {
                "nome": "Guerra",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+14"
            },
            {
                "nome": "Nobreza",
                "valor": "+13"
            }
        ],
        "equipamento": "Couraça reforçada, espada bastarda pungente precisa",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Senhor Porrada",
        "tipo": "Humanoide (meio-orc) Médio",
        "nd": "11",
        "iniciativa": "+9",
        "percepcao": "+11",
        "percepcaoObs": "visão no escuro",
        "defesa": "41",
        "fort": "+24",
        "ref": "+18",
        "von": "+11",
        "defesaObs": "imunidade a medo",
        "pv": "650",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "0",
            "con": "6",
            "int": "–1",
            "sab": "2",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Martelo de guerra x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "3d10+50, x4"
            }
        ],
        "habilidades": [
            {
                "nome": "Duro de Dar",
                "desc": "(Reação) Uma vez por cena, quando sofre dano de um ataque ou uma habilidade que reduziria seus PV a 0 ou menos, Sr. Porrada ignora esse dano."
            },
            {
                "nome": "Porrada Avassaladora",
                "desc": "(Livre) Quando acerta um ataque de martelo, Sr. Porrada arremessa a vítima 1d6 x 1,5m em uma direção à escolha dele (Fort CD 31 evita). A vítima fica caída e, se atingir algum obstáculo, sofre 1d6 pontos de dano de impacto para cada 1,5m que foi arremessada."
            },
            {
                "nome": "Porrada Progressiva",
                "desc": "(Livre) Quando reduz os pontos de vida de um oponente a 0 ou menos, Sr. Porrada recebe um bônus cumulativo de +1d10 em rolagens de dano até o fim da cena."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+15"
            }
        ],
        "equipamento": "Armadura completa reforçada, martelo de guerra maciço de adamante, símbolo sagrado de Keenn",
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sargento-mor Ivan Zogarov",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "11",
        "iniciativa": "+21",
        "percepcao": "+14",
        "percepcaoObs": "normal",
        "defesa": "41",
        "fort": "+18",
        "ref": "+24",
        "von": "+11",
        "defesaObs": "imunidade a atordoamento, redução de dano 10",
        "pv": "510",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "7",
            "con": "3",
            "int": "4",
            "sab": "1",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "2d10+35, 18"
            },
            {
                "nome": "Soco de ferro",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "2d12+30, x4"
            }
        ],
        "habilidades": [
            {
                "nome": "Aggrair Aprimorado",
                "desc": "(Livre) Soco de ferro (teste +36)."
            },
            {
                "nome": "Investida de Ferro",
                "desc": "(Completa) Ivan Zogarov faz uma investida e faz seus dois ataques de espada bastarda e seu ataque de soco de ferro. Os três ataques recebem o bônus de +2 da investida e podem ser feitos contra qualquer alvo no alcance."
            },
            {
                "nome": "Estripar",
                "desc": "Zogarov pode fazer ataques com a espada bastarda contra inimigos agarrados como se fosse uma arma leve, e causa +4d6 pontos de dano com esta arma contra criaturas agarradas."
            },
            {
                "nome": "Frenesi de Sangue",
                "desc": "Quando reduz os PV de um inimigo a 0 ou menos, Zogarov recebe um bônus cumulativo de +2 em testes de ataque e de resistência, em rolagens de dano e na margem de ameaça de seus ataques, até o fim da cena."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            },
            {
                "nome": "Uivo Psicopata",
                "desc": "Quando reduz os PV de um inimigo a 0 ou menos, Zogarov uiva de prazer. Ele recupera 40 PV e todos os inimigos a até 18m que possam ouvi-lo ficam atordoados por 1 rodada (Von CD 31 evita e a criatura não pode mais ser afetada por esta habilidade por um dia)."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+13"
            },
            {
                "nome": "Intimidação",
                "valor": "+15"
            }
        ],
        "equipamento": "Armadura completa de adamante, braço metálico (veja p. 164), espada bastarda pungente precisa de adamante",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Sargento-mor Sazin Kozar",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "11",
        "iniciativa": "+13",
        "percepcao": "+10",
        "percepcaoObs": "normal",
        "defesa": "41",
        "fort": "+24",
        "ref": "+18",
        "von": "+11",
        "defesaObs": "redução de dano 10",
        "pv": "360",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "4",
            "con": "4",
            "int": "3",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "4d12+18, x2"
            }
        ],
        "habilidades": [
            {
                "nome": "Berrar Ordens",
                "desc": "(Movimento) Sargento-mor Sazin Kozar dá ordens a todos os puristas de ND inferior em um raio de 9m. Eles recebem +2 em testes de ataque e rolagens de dano até o fim da rodada."
            },
            {
                "nome": "Espa dachim Puro",
                "desc": "(Reação) Uma vez por rodada, quando é atingido por um ataque corpo a corpo, Sazin pode fazer um teste de ataque com sua espada bastarda e reduzir o resultado desse teste do dano sofrido pelo ataque."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja página 166."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Guerra",
                "valor": "+14"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            }
        ],
        "equipamento": "Armadura completa, escudo pesado, espada bastarda pungente e formidável",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Ahik Gravardes",
        "tipo": "Humanoide (humano) Médio",
        "nd": "12",
        "iniciativa": "+14",
        "percepcao": "+14",
        "percepcaoObs": "visão no escuro",
        "defesa": "41",
        "fort": "+17",
        "ref": "+20",
        "von": "+27",
        "defesaObs": "imunidade a adivinhação e necromancia, redução de dano 5",
        "pv": "370",
        "pm": "80",
        "desl": "6m (4q)",
        "atributos": {
            "for": "3",
            "des": "4",
            "con": "3",
            "int": "4",
            "sab": "1",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Florete x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d6+20, 18"
            }
        ],
        "habilidades": [
            {
                "nome": "Cavaleiro Conjurador",
                "desc": "(Livre) Uma vez por rodada, quando faz a ação agredir, Ahik Gravardes lança uma magia com tempo de conjuração de uma ação padrão ou menor."
            },
            {
                "nome": "Campo de Força",
                "desc": "(Reação, 4 PM) Quando sofre dano, Ahik recebe RD 30 contra esse dano."
            },
            {
                "nome": "Concentração de Combate",
                "desc": "(Padrão, 3 PM) Até o fim da cena, Ahik rola dois dados e usa o melhor resultado em testes de ataque."
            },
            {
                "nome": "Muralha Elemental",
                "desc": "(Padrão, 9 PM) Uma muralha de fogo de até 30m de comprimento e 3m de altura se eleva da terra em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos do arcano. Atravessar a muralha causa 12d8 pontos de dano de fogo."
            },
            {
                "nome": "Sopro das Uivantes",
                "desc": "(Padrão, 9 PM) Criaturas em um cone de 9m sofrem 10d6 pontos de dano de frio e, se forem Médias ou menores, ficam caídas e são empurradas 6m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre +2d6 pontos de dano de impacto (Fort reduz à metade e evita a condição e o empurrão)."
            },
            {
                "nome": "Toque Chocante",
                "desc": "(Padrão, 11 PM) Ahik faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 10d8+10 pontos de dano de eletricidade."
            }
        ],
        "magias": "Como um mago de 15º nível (CD 35, limite de PM 15). Ahik pode lançar magias arcanas de armadura pesada sem precisar de testes de Misticismo.",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+14"
            },
            {
                "nome": "Furtividade",
                "valor": "+14"
            },
            {
                "nome": "Misticismo",
                "valor": "+14"
            }
        ],
        "equipamento": "Anel do escudo mental, florete preciso, meia armadura, símbolo sagrado de Wynna",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Assassino do Graath",
        "tipo": "Humanoide (humano) Médio",
        "nd": "12",
        "iniciativa": "+19",
        "percepcao": "+12",
        "percepcaoObs": "normal",
        "defesa": "41",
        "fort": "+19",
        "ref": "+25",
        "von": "+13",
        "defesaObs": "evasão, imunidade a medo, redução de trevas 10, resistência a veneno e magia +5",
        "pv": "550",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "7",
            "con": "2",
            "int": "2",
            "sab": "2",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Duas cimitarras",
                "tipo": "Corpo a Corpo",
                "bonus": "+34",
                "dano": "2d10+20, 15/x3, mais veneno"
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "desc": "+6d6."
            },
            {
                "nome": "Cortar Mana",
                "desc": "Quando causa dano em corpo a corpo em uma criatura, o assassino do Graath também faz a vítima perder 1 PM. Para cada 1 PM que fizer uma criatura perder dessa forma, o assassino recebe um bônus cumulativo de +1 em testes de ataque e rolagens de dano até o fim da cena. Caso a criatura atingida possa lançar magias, a perda de PM e o bônus recebido pelo assassino são dobrados."
            },
            {
                "nome": "Retalhar",
                "desc": "(Reação) Se acertar os dois ataques de cimitarra em uma mesma criatura na mesma rodada, o assassino pode fazer um ataque adicional de cimitarra contra essa criatura."
            },
            {
                "nome": "Veneno Peçonha Potente",
                "desc": "Veneno que perde 2d12 pontos de vida por rodada durante 3 rodadas, Fort CD 33 reduz a duração para 1 rodada."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+16"
            },
            {
                "nome": "Enganação",
                "valor": "+15"
            },
            {
                "nome": "Furtividade",
                "valor": "+19"
            },
            {
                "nome": "Intimidação",
                "valor": "+15"
            },
            {
                "nome": "Ladinagem",
                "valor": "+19"
            }
        ],
        "equipamento": "Cimitarra precisa x2, gazua, veneno de peçonha potente",
        "tesouro": "Padrão",
        "tesouro": "Padrão, mais 1d4 engrenagens (CD 28 para extrair, cada engrenagem vale T$ 1.000 para fabricar engenhocas)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Assassino Espinha",
        "tipo": "Humanoide (humano) Médio",
        "nd": "12",
        "iniciativa": "+21",
        "percepcao": "+13",
        "percepcaoObs": "normal",
        "defesa": "46",
        "fort": "+18",
        "ref": "+26",
        "von": "+14",
        "defesaObs": "evasão aprimorada, imunidade a medo",
        "pv": "390",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "8",
            "con": "3",
            "int": "1",
            "sab": "0",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Florete x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+33",
                "dano": "4d6+35, 17, mais veneno"
            },
            {
                "nome": "Duas pistolas",
                "tipo": "À Distância",
                "bonus": "+37",
                "dano": "4d8+25, 15/x3"
            }
        ],
        "habilidades": [
            {
                "nome": "À Queima-Roupa",
                "desc": "Quando faz um ataque de pistola contra um oponente adjacente, Espinha recebe um bônus de +5 em seu teste de ataque e +2 na margem de ameaça. Se errar, o ataque ainda causa metade do dano."
            },
            {
                "nome": "Balançar o Navio",
                "desc": "(Completa) Espinha faz um teste de Pilotagem oposto ao teste de Acrobacia de seus inimigos a bordo de seu navio. Se Espinha vencer, os inimigos sofrem 4d6 pontos de dano de impacto e ficam caídos."
            },
            {
                "nome": "Contragolpe Audaz",
                "desc": "(Reação) Uma vez por rodada, quando é atingido por um ataque, Espinha pode fazer um ataque com seu florete contra o agressor. Se atingir o inimigo, além de causar dano, o dano sofrido por Espinha é reduzido em um valor igual ao resultado do teste de ataque dele."
            },
            {
                "nome": "Disparo Preciso",
                "desc": "Espinha pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
            },
            {
                "nome": "Injeção Alquímica",
                "desc": "Cada pistola de Espinha possui uma carga de veneno, que é disparada no primeiro tiro de cada pistola em cada combate."
            },
            {
                "nome": "Saque Rápido",
                "desc": "Espinha pode sacar ou guardar itens como uma ação livre e recarregar suas duas pistolas como uma ação de movimento."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+20"
            },
            {
                "nome": "Atletismo",
                "valor": "+14"
            },
            {
                "nome": "Enganação",
                "valor": "+18"
            },
            {
                "nome": "Intimidação",
                "valor": "+18"
            },
            {
                "nome": "Pilotagem",
                "valor": "+22"
            }
        ],
        "equipamento": "Balas x20, casaco de capitão pirata, florete de mitral, pistola atroz, certeira e precisa x2",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Diligência Dracônica",
        "tipo": "Construto Colossal",
        "nd": "12",
        "iniciativa": "+8",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "41",
        "fort": "+26",
        "ref": "+12",
        "von": "+20",
        "defesaObs": "imunidade a trevas, redução de dano 10",
        "pv": "540",
        "desl": "voo 15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "0",
            "con": "10",
            "int": "–",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d10+25, 18"
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Aterradora",
                "desc": "Uma criatura que comece seu turno em alcance longo da Diligência Dracônica fica abalada (Von CD 33 evita e a criatura não pode mais ser abalada por esta habilidade até o fim da cena)."
            },
            {
                "nome": "Canhões",
                "desc": "(Livre) Uma vez por rodada, a Diligência dispara seus canhões em uma criatura em alcance longo. O alvo sofre 8d12 pontos de dano de impacto (Ref CD 33 reduz à metade) e criaturas adjacentes a ele sofrem metade desse dano (Ref CD 33 evita)."
            },
            {
                "nome": "Sopro",
                "desc": "(Completa) Todas as criaturas em um cone de 24m sofrem 6d12 pontos de dano de trevas e ficam enjoadas por 1d4 rodadas (Ref CD 33 reduz à metade e evita a condição). Recarga (padrão)."
            }
        ],
        "pericias": [],
        "tesouro": "Padrão, mais 1d4 engrenagens (CD 28 para extrair, cada engrenagem vale T$ 1.000 para fabricar engenhocas)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Equidna Helicoide",
        "tipo": "Construto Colossal",
        "nd": "12",
        "iniciativa": "+8",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "41",
        "fort": "+28",
        "ref": "+22",
        "von": "+14",
        "defesaObs": "imunidade a eletricidade, redução de dano 10",
        "pv": "540",
        "desl": "voo 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "0",
            "con": "10",
            "int": "–",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Hélices",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "10d6+30 corte, x3"
            }
        ],
        "habilidades": [
            {
                "nome": "Canhões Elétricos",
                "desc": "(Livre) Uma vez por rodada, a Equidna Helicoide dispara dois relâmpagos. Cada um atinge uma linha de 90m diferente; criaturas nessas áreas sofrem 8d6 pontos de dano de eletricidade (Ref CD 33 reduz à metade)."
            },
            {
                "nome": "Hélices Hipnóticas",
                "desc": "Uma vez por rodada, quando a Equidna acerta um ataque corpo a corpo, todas as criaturas capazes de vê-la ficam fascinadas (Von CD 33 evita)."
            },
            {
                "nome": "Turbilhão de Hélices",
                "desc": "O ataque de hélices da Equidna atinge todas as criaturas ao seu redor. Ela faz um teste de ataque e compara o resultado com a Defesa de cada criatura adjacente. Ela faz uma rolagem de dano e aplique-a em cada criatura atingida."
            }
        ],
        "pericias": [],
        "tesouro": "Padrão, mais 1d4 engrenagens (CD 28 para extrair; cada engrenagem conta como T$ 1.000 em matéria-prima para fabricar engenhocas)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Escolta de Guardas de Elite",
        "tipo": "Humanoide (humano) Grande",
        "nd": "12",
        "iniciativa": "+13",
        "percepcao": "+15",
        "percepcaoObs": "normal",
        "defesa": "41",
        "fort": "+26",
        "ref": "+12",
        "von": "+20",
        "defesaObs": "imunidade a desprevenido e surpreendido, redução de dano 10",
        "pv": "160",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "3",
            "con": "6",
            "int": "1",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "[Bando] Alabarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+38",
                "dano": "4d12+40, x3"
            }
        ],
        "habilidades": [
            {
                "nome": "Anticipa Perigo",
                "desc": "Aliados adjacentes à escolta de guardas de elite recebem imunidade a desprevenido e surpreendido."
            },
            {
                "nome": "Golpe Punitivo",
                "desc": "A escolta recebe +5 na margem de ameaça contra criaturas que tenham atacado ela ou seu protegido desde seu último turno."
            },
            {
                "nome": "Protegido",
                "desc": "A criatura que a escolta estiver defendendo no momento é seu protegido. Enquanto estiver adjacente à escolta, o protegido usa os melhores valores de Defesa e testes de resistência entre os seus e os da escolta."
            },
            {
                "nome": "Retaliar",
                "desc": "(Reação) Uma vez por rodada, quando a escolta ou seu protegido sofre um ataque corpo a corpo, a escolta ataca a criatura que desferiu esse ataque."
            },
            {
                "nome": "Zelosos",
                "desc": "(Reação) Uma vez por rodada, se um aliado adjacente for alvo de um ataque, a escolta pode se tornar o alvo do ataque, que é resolvido normalmente."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+16"
            },
            {
                "nome": "Intuição",
                "valor": "+15"
            }
        ],
        "equipamento": "Espada bastarda, armadura completa (1d6 de cada)",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Falange de Kazymir",
        "tipo": "Morto-vivo (bando) Grande",
        "nd": "12",
        "iniciativa": "+14",
        "percepcao": "+8",
        "percepcaoObs": "visão no escuro",
        "defesa": "36",
        "fort": "+13",
        "ref": "+20",
        "von": "+25",
        "defesaObs": "redução de corte, frio e perfuração 5, redução de dano 5",
        "pv": "360",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "4",
            "con": "2",
            "int": "–",
            "sab": "0",
            "car": "–5"
        },
        "ataques": [
            {
                "nome": "[Bando] Espada bastarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+38",
                "dano": "4d10+40, 19 mais 4d8 trevas"
            }
        ],
        "habilidades": [
            {
                "nome": "Formação Diamante",
                "desc": "Quando usa a ação agredir, a Falange de Kazymir faz um ataque adicional de espada bastarda contra cada criatura que a estiver flanqueando e que ela não tenha atacado neste turno."
            }
        ],
        "pericias": [],
        "equipamento": "Armadura completa, escudo pesado, espada bastarda (1d8 cada)",
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Gárgula Abascanta",
        "tipo": "Construto Médio",
        "nd": "12",
        "iniciativa": "+13",
        "percepcao": "+17",
        "percepcaoObs": "visão no escuro",
        "defesa": "44",
        "fort": "+26",
        "ref": "+20",
        "von": "+12",
        "defesaObs": "evasão, imunidade a ilusão e petrificado, redução de dano 5, resistência a magia +2",
        "pv": "580",
        "desl": "12m (8q), voo 18m (12q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "3",
            "con": "4",
            "int": "–2",
            "sab": "2",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "4d6+26"
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "desc": "+5d6."
            },
            {
                "nome": "Imobilidade",
                "desc": "Uma gárgula pode permanecer completamente imóvel. Se ela estiver assim, um personagem deve passar num teste de Percepção (CD 35) para perceber que ela é uma criatura e não uma estátua."
            },
            {
                "nome": "Mil Olhos",
                "desc": "A gárgula abascanta não pode ser flanqueada, é capaz de ver criaturas sob invisibilidade mágica e passa automaticamente em testes de Misticismo para detectar e identificar magias."
            },
            {
                "nome": "Olhar Abascanto",
                "desc": "(Movimento) A gárgula lança Dissipar Magia. Para cada PM no custo das magias que dissipar dessa forma, ela ganha 5 PV temporários. Recarga (movimento)."
            }
        ],
        "pericias": [
            {
                "nome": "Misticismo",
                "valor": "+18"
            }
        ],
        "equipamento": "Nenhum",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Horda Mycotann",
        "tipo": "Monstro (mycotann) Enorme",
        "nd": "12",
        "iniciativa": "+14",
        "percepcao": "+17",
        "percepcaoObs": "visão no escuro",
        "defesa": "33",
        "fort": "+23",
        "ref": "+14",
        "von": "+13",
        "defesaObs": "natureza vegetal",
        "pv": "612",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "–4",
            "con": "3",
            "int": "1",
            "sab": "0",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Enxame",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "8d12 impacto"
            }
        ],
        "habilidades": [
            {
                "nome": "Esporos",
                "desc": "(Padrão) A horda dispara esporos em uma nuvem de 3m de raio em alcance médio. Criaturas na área ficam paralisadas por 1d4 rodadas (apenas uma vez por cena) e perdem 6d6 PV (Fort CD 32 reduz à metade e evita a condição)."
            },
            {
                "nome": "Véu de Esporos",
                "desc": "Uma criatura que comece seu turno dentro do espaço ocupado pela horda fica enjoada e enredada (Fort CD 32 evita). Veneno."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+22"
            }
        ],
        "equipamento": "Nenhum",
        "tesouro": "2d4 doses de esporos de cogumelo (CD 27 para extrair; estes esporos contêm um veneno que causa uma breve, mas perigosa, paralisia. Inalação, vítima fica paralisada (lenta) por 1 rodada, depois imune a paralisia por este veneno pela cena.",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Mantícora de Estimação",
        "tipo": "Monstro Enorme",
        "nd": "12",
        "iniciativa": "+13",
        "percepcao": "+15",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "41",
        "fort": "+25",
        "ref": "+13",
        "von": "+20",
        "defesaObs": "normal",
        "pv": "585",
        "desl": "9m (6q), voo 18m (12q)",
        "pm": "0",
        "atributos": {
            "for": "8",
            "des": "2",
            "con": "5",
            "int": "–3",
            "sab": "3",
            "car": "–3"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "3d10+25"
            },
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+36",
                "dano": "2d8+25"
            }
        ],
        "habilidades": [
            {
                "nome": "Bote",
                "desc": "(Completa) A mantícora de estimação faz uma investida e ataca com sua mordida e suas duas garras. Os três ataques recebem o bônus de +2 da investida, mas devem ser feitos contra o mesmo alvo."
            },
            {
                "nome": "Crueldade",
                "desc": "Se acertar seus dois ataques de garra no mesmo turno, a mantícora pode fazer outros dois ataques com garras, com uma penalidade de –5 em cada ataque adicional."
            },
            {
                "nome": "Espinhos",
                "desc": "(Movimento) A mantícora dispara 2d4 espinhos de sua cauda. Cada espinho atinge uma criatura em alcance médio, causando 2d8+8 pontos de dano de perfuração (Ref CD 35 reduz à metade). Recarga (movimento)."
            }
        ],
        "pericias": [],
        "equipamento": "Nenhum",
        "tesouro": "Padrão mais espinhos (CD 27 para extrair, valem T$ 200 para fabricar flechas superiores)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Corvo de Krauser",
        "tipo": "Construto Colossal",
        "nd": "13",
        "iniciativa": "+14",
        "percepcao": "+12",
        "percepcaoObs": "normal",
        "defesa": "44",
        "fort": "+26",
        "ref": "+20",
        "von": "+13",
        "defesaObs": "cura acelerada 10, redução de dano 5, resistência a magia +2",
        "pv": "600",
        "desl": "voo 15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "4",
            "con": "10",
            "int": "–",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "6d6+10"
            },
            {
                "nome": "Dois canhões",
                "tipo": "À Distância",
                "bonus": "+37",
                "dano": "4d8+10 impacto, 19/x3, alcance longo"
            }
        ],
        "habilidades": [
            {
                "nome": "Brilhantismo Bélico",
                "desc": "Quando faz um ataque, o Corvo de Krauser rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Goblins Consertadores",
                "desc": "Goblins engenhoqueiros rastejam por dentro da aeronave, o que fornece ao Corvo cura acelerada 10. Por estarem dentro da estrutura, eles são imunes a dano, mas ainda podem ser afetados por efeitos mentais. Eles têm Vontade +2 (mas recebem a resistência a magia da aeronave) e, se forem afetados por qualquer condição, a cura acelerada deixa de funcionar."
            },
            {
                "nome": "Saraivada",
                "desc": "(Completa) O Corvo dispara todos os seus canhões. Todas as criaturas em alcance médio sofrem 10d12 pontos de dano de impacto (Ref CD 35 reduz à metade). Recarga (padrão)."
            },
            {
                "nome": "Tiro Livre",
                "desc": "(Livre) Uma vez por rodada, o Corvo faz dois ataques de canhão."
            }
        ],
        "pericias": [],
        "equipamento": "Nenhum",
        "tesouro": "Padrão, mais 1d4 engrenagens (CD 29 para extrair, cada engrenagem vale T$ 1.000 para fabricar engenhocas)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Ingram Brassbones",
        "tipo": "Humanoide (anão) Médio",
        "nd": "13",
        "iniciativa": "+17",
        "percepcao": "+12",
        "percepcaoObs": "visão no escuro",
        "defesa": "41",
        "fort": "+20",
        "ref": "+26",
        "von": "+13",
        "defesaObs": "evasão, redução de dano 5",
        "pv": "420",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "5",
            "con": "5",
            "int": "4",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Adaga x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "1d4+8, 18"
            },
            {
                "nome": "Mosquete x2",
                "tipo": "À Distância",
                "bonus": "+35",
                "dano": "3d8+22, 18/x3, alcance longo"
            },
            {
                "nome": "Pistola x2",
                "tipo": "À Distância",
                "bonus": "+35",
                "dano": "2d8+22, 17/x3, alcance médio"
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "desc": "+2d6. Quando Ingram ataca com uma arma de fogo, seu ataque furtivo tem o alcance dessa arma."
            },
            {
                "nome": "Disparo Preciso",
                "desc": "Ingram pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem a penalidade padrão de –5 no teste de ataque."
            },
            {
                "nome": "Mestre de Armeria",
                "desc": "Ingram pode fabricar armas superiores com até 4 melhorias, e pode criar e fabricar armas de fogo exclusivas (veja Heróis de Arton)."
            },
            {
                "nome": "Precisão Brutal",
                "desc": "Uma criatura atingida por um acerto crítico ou ataque furtivo de arma de fogo de Ingram fica vulnerável e sangrando (Fort CD 32 evita)."
            },
            {
                "nome": "Saque Rápido",
                "desc": "Ingram pode sacar ou guardar itens como uma ação livre e recarregar armas de fogo como uma ação de movimento (ou livre, se a arma tiver sido fabricada por ele)."
            },
            {
                "nome": "Um Tiro, Uma Morte",
                "desc": "(Movimento) Até o fim do turno, Ingram recebe +2 em testes de ataque e na margem de ameaça com ataques de arma de fogo e cada dado de dano desses ataques aumenta em um passo."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+15"
            },
            {
                "nome": "Atletismo",
                "valor": "+11"
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
                "valor": "+17"
            },
            {
                "nome": "Ofício (alquimista)",
                "valor": "+16"
            },
            {
                "nome": "Ofício (armeiro)",
                "valor": "+21"
            },
            {
                "nome": "Ofício (artesão)",
                "valor": "+16"
            }
        ],
        "equipamento": "Adaga atroz precisa pungente, balas x20, gazua aprimorada, mosquete preciso de adamante com mira telescópica, pistola cruel precisa de mitral, três instrumentos de Ofício (alquimista, armeiro e artesão) aprimorados",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Khand Bierhoff III",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "13",
        "iniciativa": "+13",
        "percepcao": "+13",
        "percepcaoObs": "normal",
        "defesa": "42",
        "fort": "+13",
        "ref": "+26",
        "von": "+20",
        "defesaObs": "resistência a magia +5",
        "pv": "420",
        "desl": "6m (4q)",
        "pm": "99",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "3",
            "int": "8",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+31",
                "dano": "1d4+2, 19"
            }
        ],
        "habilidades": [
            {
                "nome": "Conjurador Magibélico",
                "desc": "Khand Bierhoff III pode lançar magias vestindo armaduras pesadas sem precisar de testes de Misticismo. Além disso, sempre que faz um teste de Misticismo, ele rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Magia Acelerada",
                "desc": "(Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Khand muda a execução dela para livre."
            },
            {
                "nome": "Magias Devastadoras",
                "desc": "As magias de Khand Bierhoff III que causam dano têm cada um de seus dados de dano aumentados em um passo (já contabilizado) e ignoram até 10 pontos de redução de dano."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            }
        ],
        "magias": "Como um mago de 13º nível (CD 37).• Açoite Flamejante (Movimento, 7 PM, sustentada) Um açoite de fogo surge na mão de Khand. Ele pode gastar uma ação padrão para açoitar uma criatura em alcance curto, que sofre 6d8 pontos de dano de fogo e fica em chamas e enredada enquanto estiver em chamas (Ref reduz à metade e evita as condições).• Campo de Força (Reação, 7 PM) Quando sofre dano, o Khand recebe RD 50 contra esse dano.• Desintegrar (Padrão, 10 PM) Khand dispara um raio fino e esverdeado que causa 10d12 pontos de dano de essência. Se o alvo passar em um teste de Fortitude, em vez disso sofre 2d12 pontos de dano. Independentemente do resultado do teste de resistência, se os PV do alvo forem reduzidos a 0 ou menos, ele será completamente desintegrado, restando apenas pó.• Muralha Elemental (Padrão, 9 PM) Uma muralha de fogo de até 30m de comprimento e 3m de altura se eleva da terra em alcance médio. Um lado da muralha emite ondas de calor, que causam 2d8 pontos de dano de fogo em criaturas a até 6m quando a magia é lançada e no início dos turnos do arcano. Atravessar a muralha causa 12d8 pontos de dano de fogo.• Relâmpago (Padrão, 9 PM) Khand lança um relâmpago em cada criatura escolhida em alcance médio, causando 10d8 pontos de dano de eletricidade (Ref reduz à metade).• Sopro das Uivantes (Padrão, 9 PM) Criaturas em um cone de 9m sofrem 10d8 pontos de dano de frio e, se forem Médias ou menores, ficam caídas e são empurradas 6m na direção oposta. Se houver uma parede ou outro objeto sólido (mas não uma criatura) no caminho, a criatura para de se mover, mas sofre +2d6 pontos de dano de impacto (Fort reduz à metade e evita a condição e o empurrão).• Velocidade (Padrão, 3 PM, sustentada) Khand pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias.",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+18"
            },
            {
                "nome": "Guerra",
                "valor": "+18"
            },
            {
                "nome": "Misticismo",
                "valor": "+20"
            }
        ],
        "equipamento": "Adaga, armadura completa reforçada, tomo de guerra",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Tanaloom",
        "tipo": "Espírito (elemental) Enorme",
        "nd": "13",
        "iniciativa": "+10",
        "percepcao": "+12",
        "percepcaoObs": "visão no escuro",
        "defesa": "44",
        "fort": "+26",
        "ref": "+20",
        "von": "+13",
        "defesaObs": "imunidade a acertos críticos, ácido, atordoado, caído, cansaço, efeitos de metabolismo e paralisia, redução de dano 15/impacto, vulnerabilidade a eletricidade",
        "pv": "650",
        "desl": "15m (10q), escalar 15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "12",
            "des": "0",
            "con": "9",
            "int": "–2",
            "sab": "2",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Duas pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "4d12+49"
            },
            {
                "nome": "Flechas ácidas x6",
                "tipo": "À Distância",
                "bonus": "+34",
                "dano": "3d6+10 ácido, x3, alcance médio"
            }
        ],
        "habilidades": [
            {
                "nome": "Golpe Esmagador",
                "desc": "(Livre) Quando o tanaloom acerta um ataque de pancada, pode usar a manobra derrubar (teste +42). Criaturas derrubadas dessa forma precisam gastar uma ação padrão em vez de movimento para se levantar e não podem usar Acrobacia para se levantar como ação livre, pois ficam presas ao chão."
            },
            {
                "nome": "Metamorfismo Rochoso",
                "desc": "(Movimento) O tanaloom deforma seu corpo para passar por espaços estreitos, suficientes para criaturas Médias ou maiores, percorrendo até metade do seu deslocamento."
            },
            {
                "nome": "Monólito",
                "desc": "Um tanaloom pode permanecer imóvel. Se estiver assim, um personagem deve passar num teste de Percepção (CD 40) para perceber que ele é uma criatura."
            },
            {
                "nome": "Rolo Compressor",
                "desc": "O tanaloom pode passar por espaços ocupados por criaturas Grandes ou menores. Se fizer isso, causa 2d10 pontos de dano de impacto em cada criatura nos espaços que atravessar. Uma criatura só pode sofrer dano dessa habilidade uma vez por rodada."
            }
        ],
        "pericias": [],
        "equipamento": "Nenhum",
        "tesouro": "2d4 doses de éter elemental (ácido) (CD 28 para extrair; uma dose é suficiente para cobrir uma arma corpo a corpo ou 20 munições; aplicá-la gasta uma ação padrão, concedendo +1d4 de dano de ácido ao item até o fim da cena; múltiplas doses não são cumulativas)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Thuvalinn Letra Fria",
        "tipo": "Humanoide (anão) Médio",
        "nd": "13",
        "iniciativa": "+13",
        "percepcao": "+17",
        "percepcaoObs": "visão no escuro",
        "defesa": "42",
        "fort": "+20",
        "ref": "+13",
        "von": "+26",
        "defesaObs": "imunidade a medo, redução de dano 10",
        "pv": "470",
        "desl": "6m (4q)",
        "pm": "72",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "7",
            "int": "2",
            "sab": "7",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada longa x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "6d10+30"
            }
        ],
        "habilidades": [
            {
                "nome": "Magia Acelerada",
                "desc": "(Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Thuvalinn Letra Fria muda a execução dela para livre."
            }
        ],
        "magias": "Como um clérigo de Khalmyr de 15º nível (CD 37, limite de 15 PM).• Arma Espiritual (Padrão, 14 PM) Até o fim da cena, duas vezes por rodada, quando sofre um ataque corpo a corpo, Thuvalinn pode usar uma reação para causar 6d6 pontos de dano de impacto no atacante.• Curar Ferimentos (Padrão, 10 PM) Uma criatura adjacente cura 11d8+11 PV.• Perdição (Padrão, 7 PM) Criaturas escolhidas em alcance curto recebem –4 em testes de ataque e rolagens de dano até o fim da cena.• Raio Solar (Padrão, 15 PM) Criaturas em uma linha de 30m sofrem 10d8 pontos de dano de luz (ou 10d12, se forem mortos-vivos) e ficam ofuscadas por 1 rodada (Ref reduz à metade e evita a condição).",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+12"
            },
            {
                "nome": "Intimidação",
                "valor": "+11"
            },
            {
                "nome": "Misticismo",
                "valor": "+12"
            },
            {
                "nome": "Religião",
                "valor": "+19"
            }
        ],
        "equipamento": "Espada longa, meia armadura, símbolo sagrado de Khalmyr",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Entessombra",
        "tipo": "Morto-vivo Enorme",
        "nd": "14",
        "iniciativa": "+10",
        "percepcao": "+14",
        "percepcaoObs": "visão no escuro",
        "defesa": "46",
        "fort": "+28",
        "ref": "+12",
        "von": "+24",
        "defesaObs": "fortificação 25%, incorpóreo, redução de dano 20/luz, vulnerabilidade a fogo",
        "pv": "690",
        "desl": "9m (6q), sem redução por terreno difícil",
        "pm": "0",
        "atributos": {
            "for": "9",
            "des": "–1",
            "con": "5",
            "int": "0",
            "sab": "3",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Duas pancadas gélidas",
                "tipo": "Corpo a Corpo",
                "bonus": "+39",
                "dano": "4d8+20 frio mais 4d8+20 trevas"
            }
        ],
        "habilidades": [
            {
                "nome": "Drenar Vitalidade",
                "desc": "Uma criatura viva atingida por uma pancada gélida do entessombra deve fazer um teste de Fortitude (CD 38). Se falhar, fica fraca e o entessombra recebe 30 PV temporários cumulativos."
            },
            {
                "nome": "Pastor dos Mortos",
                "desc": "(Completa) O entessombra invoca mãos espectrais que se projetam do chão em um raio de 30m. Quando esta habilidade é usada, e no início de cada turno do ente, todas as criaturas na área em contato com o solo sofrem 4d8 pontos de dano de corte e 4d8 pontos de dano de trevas e ficam enredadas por 1 rodada (Ref CD 38 reduz à metade e evita a condição). As mãos permanecem na área até o fim da cena, ou até o entessombra usar esta habilidade novamente. Recarga (movimento)."
            },
            {
                "nome": "Travessia Sombria",
                "desc": "(Completa) O entessombra percorre até o dobro do seu deslocamento. Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atravessadas desta forma sofrem 4d8+10 pontos de dano de frio, mais 4d8+10 pontos de dano de trevas, e ficam abaladas (Ref CD 38 reduz à metade e evita a condição). Recarga (movimento)."
            },
            {
                "nome": "Fraqueza Solar",
                "desc": "Enquanto estiver exposto à luz solar natural, o entessombra fica debilitado."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5 (+15 em florestas)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+19"
            }
        ],
        "equipamento": "Nenhum",
        "tesouro": "Padrão mais 1 dose de terra de cemitério (CD 29 para extrair)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Lorde General Klinsmann",
        "tipo": "Humanoide (humano purista) Médio",
        "nd": "14",
        "iniciativa": "+14",
        "percepcao": "+8",
        "percepcaoObs": "normal",
        "defesa": "44",
        "fort": "+14",
        "ref": "+22",
        "von": "+28",
        "defesaObs": "redução de dano 10",
        "pv": "455",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "3",
            "con": "3",
            "int": "5",
            "sab": "1",
            "car": "8"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+35",
                "dano": "2d12+25, 19"
            }
        ],
        "habilidades": [
            {
                "nome": "Humilhar e Ofender",
                "desc": "(Movimento) Klinsmann insulta um inimigo em alcance curto que possa ver. A criatura sofre 10d8 pontos de dano psíquico e fica frustrada (Von CD 40 reduz à metade e evita a condição). A condição é cumulativa (uma criatura frustrada fica esmorecida)."
            },
            {
                "nome": "NÃO! NÃO! NÃO!",
                "desc": "(Reação) Klinsmann dá um chilique. Quando um aliado de Klinsmann em alcance curto falha em um teste, Klinsmann faz esse aliado rolar o teste novamente. O aliado usa o resultado novo, mesmo se for pior. Recarga (acertar um ataque em um inimigo)."
            },
            {
                "nome": "Ódio Puro",
                "desc": "Veja a página 164."
            },
            {
                "nome": "Olhar de Desprezo",
                "desc": "(Reação) Uma vez por turno, quando um inimigo tenta usar uma ação hostil contra Klinsmann, ele faz um teste de Intimidação oposto à Vontade do agressor. Se Klinsmann vencer o teste oposto, o inimigo perde a ação."
            },
            {
                "nome": "Ordens do General",
                "desc": "(Completa) Klinsmann dá ordens aos seus comandados. Todos os aliados de Klinsmann em alcance curto recebem um bônus de +8 em testes de ataque e rolagens de dano até o fim da cena."
            }
        ],
        "pericias": [
            {
                "nome": "Cavalgar",
                "valor": "+14"
            },
            {
                "nome": "Conhecimento",
                "valor": "+16"
            },
            {
                "nome": "Diplomacia",
                "valor": "+19"
            },
            {
                "nome": "Enganação",
                "valor": "+21"
            },
            {
                "nome": "Guerra",
                "valor": "+22"
            },
            {
                "nome": "Intimidação",
                "valor": "+24"
            },
            {
                "nome": "Intuição",
                "valor": "+12"
            },
            {
                "nome": "Nobreza",
                "valor": "+16"
            }
        ],
        "equipamento": "Armadura completa de adamante, espada bastarda de adamante",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Paollus",
        "tipo": "Humanoide (meio-elfo) Médio",
        "nd": "14",
        "iniciativa": "+21",
        "percepcao": "+16",
        "percepcaoObs": "visão na penumbra",
        "defesa": "45",
        "fort": "+26",
        "ref": "+22",
        "von": "+16",
        "defesaObs": "esquiva sobrenatural",
        "pv": "420",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "5",
            "con": "3",
            "int": "3",
            "sab": "3",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+38",
                "dano": "2d8+40, 19/x3"
            },
            {
                "nome": "Balestra explosiva x2",
                "tipo": "À Distância",
                "bonus": "+38",
                "dano": "2d12+40, 18/x3 mais 6d6 fogo"
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "desc": "+7d8."
            },
            {
                "nome": "Irmãos Mais Novos",
                "desc": "(Movimento) Paollus assobia e invoca 2d6+3 capangas da irmandade, que saem de becos, bueiros ou do topo de telhados e surgem em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada de Paollus, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d8+19 pontos de dano de corte em uma criatura adjacente. Os capangas têm For 4, Des 3, Defesa 19, 1 PV e falham automaticamente em qualquer teste oposto ou de resistência. Recarga (reduzir um inimigo a 0 ou menos PV)."
            },
            {
                "nome": "Oferta Irrecusável",
                "desc": "(Completa) Com um olhar, Paollus pode descobrir o que uma pessoa mais teme e então usar isso para chantageá-la. Ele pode usar esta habilidade contra qualquer criatura em alcance curto que possa escutá-lo e compreendê-lo. Ao usá-la, Paollus faz um teste de Intimidação (+26) oposto pelo teste de Vontade da vítima. Se ele vencer, pode dar uma ordem qualquer a essa pessoa. Essa ordem será uma oferta irrecusável e a pessoa irá cumpri-la da melhor maneira que puder. Mesmo ordens extremas podem ser dadas — uma pessoa pode preferir morrer a ver sua família ser assassinada pela irmandade! No entanto, ordens extremas fornecem um bônus de +5 no teste de Vontade da vítima. Esta habilidade só pode ser usada uma vez por dia e dura uma semana ou até a criatura executar a ordem (o que vier primeiro)."
            },
            {
                "nome": "Quebrar Pernas",
                "desc": "(Padrão) Paollus faz um ataque desarmado que causa dano dobrado e, se acertar, deixa a vítima debilitada e lenta por uma semana (Fort CD 40 evita as condições)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+16"
            },
            {
                "nome": "Atletismo",
                "valor": "+18"
            },
            {
                "nome": "Enganação",
                "valor": "+16"
            },
            {
                "nome": "Furtividade",
                "valor": "+16"
            },
            {
                "nome": "Intimidação",
                "valor": "+26"
            },
            {
                "nome": "Intuição",
                "valor": "+14"
            },
            {
                "nome": "Investigação",
                "valor": "+16"
            }
        ],
        "equipamento": "Anel de proteção, balestra explosiva, virotes de adamante x20",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "ARQUEMIS-A",
        "tipo": "Construto Colossal",
        "nd": "15",
        "iniciativa": "+8",
        "percepcao": "+9",
        "percepcaoObs": "visão no escuro",
        "defesa": "49",
        "fort": "+31",
        "ref": "+19",
        "von": "+20",
        "defesaObs": "cura acelerada 30, imunidade a atordoamento e movimento, redução de dano 15, resistência a magia +5",
        "pv": "815",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "15",
            "des": "–1",
            "con": "10",
            "int": "–",
            "sab": "–5",
            "car": "–5"
        },
        "ataques": [
            {
                "nome": "Duas espadas colossais",
                "tipo": "Corpo a Corpo",
                "bonus": "+44",
                "dano": "5d12+30, 19"
            }
        ],
        "habilidades": [
            {
                "nome": "Blindagem Arcana",
                "desc": "O ARQUEMIS-A começa o combate envolto em um escudo arcano com 200 PV. Todo o dano mágico sofrido pelo colosso é aplicado primeiramente a este escudo."
            },
            {
                "nome": "Prisioneiros Consertadores",
                "desc": "Goblins e anões escravizados perambulam por dentro dos dutos do ARQUEMIS-A fazendo reparos, sendo a fonte da cura acelerada do construto. Por estarem dentro da máquina, são imunes a dano, mas ainda podem ser afetados por efeitos mentais. Eles possuem Vontade +6 (e recebem a resistência a magia do colosso) e, se forem afetados por qualquer condição, a cura acelerada deixa de funcionar. O mesmo acontece se o grupo libertar estes prisioneiros na cena 9."
            },
            {
                "nome": "Irrefreável",
                "desc": "(Movimento) O ARQUEMIS-A sempre percorre seu deslocamento padrão, passando por qualquer criatura Grande ou menor em seu caminho. Uma criatura atropelada dessa forma sofre 4d8 pontos de dano de impacto (Ref CD 40 reduz à metade)."
            },
            {
                "nome": "Pisão",
                "desc": "(Movimento) O ARQUEMIS-A ergue uma de suas pernas e pisa em cima de uma criatura Grande ou menor, causando 8d8 pontos de dano de impacto (Ref CD 40 reduz à metade). Uma criatura que seja reduzida a 0 ou menos PV por esta habilidade deve fazer um teste de Fortitude (CD 40); se falhar, a criatura morre esmagada automaticamente."
            },
            {
                "nome": "Varrer",
                "desc": "(Livre) Uma vez por rodada, quando o ARQUEMIS-A faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode realizar um ataque adicional contra outra criatura dentro do seu alcance."
            }
        ],
        "pericias": [],
        "equipamento": "Nenhum",
        "tesouro": "1d10 destroços (CD 34 para extrair, cada destroço vale $ 1.000 para fabricar engenhocas)",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Rark Cascos Sangrentos",
        "tipo": "Humanoide (centauro) Grande",
        "nd": "16",
        "iniciativa": "+16",
        "percepcao": "+22",
        "percepcaoObs": "normal",
        "defesa": "56",
        "fort": "+24",
        "ref": "+16",
        "von": "+30",
        "defesaObs": "fortificação 50%, imunidade a medo, redução de dano 15",
        "pv": "825",
        "desl": "12m (8q)",
        "pm": "88",
        "atributos": {
            "for": "6",
            "des": "2",
            "con": "6",
            "int": "2",
            "sab": "8",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Ódio",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "4d12+40, x4 mais 1d8 trevas"
            },
            {
                "nome": "Violência",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "4d12+40, x4 mais 1d8 trevas"
            },
            {
                "nome": "Cascos",
                "tipo": "Corpo a Corpo",
                "bonus": "+46",
                "dano": "4d8+40"
            }
        ],
        "habilidades": [
            {
                "nome": "Assustar",
                "desc": "(Movimento, 2 PM) Rark Cascos Sangrentos gera uma onda de medo que deixa todos os inimigos em alcance curto abalados (Von CD 42 evita)."
            },
            {
                "nome": "Ira Coletiva",
                "desc": "(Padrão, 10 PM, sustentada) Rark causa um frenesi em aliados em alcance curto. Essas criaturas recebem +5 em testes de ataque e rolagens de dano corpo a corpo e redução de dano 10, mas não podem fazer nenhuma ação que exija calma e concentração (como usar a perícia Furtividade ou lançar magias)."
            },
            {
                "nome": "Voz dos Monstros",
                "desc": "Rark está sempre sob efeito da magia Voz Divina, apenas para falar com monstros."
            },
            {
                "nome": "Medo de Altura",
                "desc": "Se estiver adjacente a uma queda de 3m ou mais de altura, o centauro fica abalado."
            }
        ],
        "magias": "Como um clérigo de Megalokk de 15º nível (CD 42).• Amedrontar (Padrão, 10 PM) Criaturas à escolha de Rark em alcance curto ficam apavoradas por 1d4+1 rodadas e depois abaladas (Von reduz para abalada por 1d4 rodadas). Um personagem que já esteja abalado fica apavorado.• Pele de Pedra (Padrão, 6 PM) Rark recebe redução de dano 5 até o fim da cena.• Perdição (Padrão, 7 PM) Criaturas escolhidas em alcance curto sofrem –4 em testes de ataque e rolagens de dano até o fim da cena.• Poeira da Podridão (Padrão, 14 PM) Criaturas em uma nuvem de 6m de raio em alcance médio começam a definhar e apodrecer. Quando a magia é lançada, e no início de seus turnos até o fim da cena, criaturas na área sofrem 6d8+24 pontos de dano de trevas e não podem recuperar PV por uma rodada (Fort reduz à metade e evita a restrição de cura).• Terremoto (Padrão, 10 PM) Fendas se abrem no chão em uma esfera de 30m em alcance longo. Cada criatura na área precisa rolar um dado; em um resultado ímpar, uma fenda se abre sob ela e ela precisa fazer um teste de Reflexos; se falhar, cai na fenda. A criatura pode escapar gastando uma ação completa e passando em um teste de Atletismo. No início do próximo turno de Rark as fendas se fecham, matando todos que estejam dentro delas.",
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+17"
            },
            {
                "nome": "Atletismo",
                "valor": "+20"
            },
            {
                "nome": "Intimidação",
                "valor": "+27"
            },
            {
                "nome": "Religião",
                "valor": "+22"
            }
        ],
        "equipamento": "Muralha, Ódio, símbolo sagrado de Megalokk, Violência",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Amrynn Arquinavegante",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "17",
        "iniciativa": "+19",
        "percepcao": "+18",
        "percepcaoObs": "visão na penumbra",
        "defesa": "50",
        "fort": "+17",
        "ref": "+24",
        "von": "+30",
        "defesaObs": "imunidade a atordoamento, efeitos mentais e encantamento",
        "pv": "550",
        "desl": "12m (8q)",
        "pm": "144",
        "atributos": {
            "for": "2",
            "des": "4",
            "con": "2",
            "int": "8",
            "sab": "4",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+40",
                "dano": "1d4+2, 19"
            }
        ],
        "habilidades": [
            {
                "nome": "Arcanismo Ancestral",
                "desc": "(Livre) Amrynn lança uma magia, pagando seu custo normal. Só pode usar esta habilidade uma vez por rodada."
            },
            {
                "nome": "Atemporal",
                "desc": "Quando faz um teste de Misticismo ou de resistência contra magias, Amrynn pode rolar dois dados e usar o melhor resultado."
            }
        ],
        "magias": "Como um mago de 17º nível (CD 48, limite de PM 25).• Campo de Força (Reação, 10 PM) Quando sofre dano, Amrynn recebe RD 70 contra esse dano.• Crânio Voador de Vladislav (Padrão, 19 PM) Quatro crânios de energia negativa causam, cada um, 8d8+8 pontos de dano de trevas em quatro criaturas em alcance médio e deixam os alvos e todas as criaturas a 3m deles abaladas (Fort reduz à metade e evita a condição).• Erupção Glacial (Padrão, 18 PM) Estacas de gelo irrompem em um quadrado de 6m de lado em alcance médio. Criaturas na área sofrem 12d6+4 pontos de dano de frio e 12d6+4 pontos de dano de corte e ficam caídas (Ref evita o dano de corte e a condição).• Flecha Ácida (Padrão, 16 PM) Amrynn dispara um projétil em uma criatura ou objeto em alcance médio. O alvo sofre 9d6+8 pontos de dano de ácido e fica coberto por muco corrosivo que causa 7d6 pontos de dano de ácido no início de cada um dos seus dois próximos turnos. Além disso, se o alvo estiver usando armadura ou escudo, o muco corrói o item, reduzindo seu bônus na Defesa em 2 pontos permanentemente (Ref reduz à metade e evita o muco).• Lança Ígnea de Aleph (Padrão, 15 PM) Amrynn dispara um projétil de magma contra um alvo em alcance médio, que sofre 7d6+4 pontos de dano de fogo e 7d6+4 pontos de dano de perfuração e fica em chamas. As chamas causam 5d6 pontos de dano por rodada, em vez do dano normal (Ref reduz à metade e evita a condição).• Mão Poderosa (Padrão, 18 PM) Cria uma mão flutuante Grande que se posiciona entre Amrynn e um oponente à sua escolha, fornecendo cobertura (+5 na Defesa) contra esse oponente. Com uma ação de movimento, Amrynn pode comandar a mão para que lhe proteja de outro oponente ou para realizar uma ação entre agarrar (teste +42), esmagar um oponente agarrado (6d6+30 pontos de dano de impacto) ou empurrar (teste +42).• Relâmpago (Padrão, 20 PM) Amrynn lança um relâmpago em cada criatura escolhida em alcance médio, causando 20d6+8 pontos de dano de eletricidade (Ref reduz à metade).",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+22"
            },
            {
                "nome": "Misticismo",
                "valor": "+26"
            }
        ],
        "equipamento": "Adaga, tomo de guerra",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Maryx Corta-Sangue",
        "tipo": "Humanoide (hobgoblin) Média",
        "nd": "17",
        "iniciativa": "+24",
        "percepcao": "+18",
        "percepcaoObs": "visão no escuro",
        "defesa": "54",
        "fort": "+24",
        "ref": "+30",
        "von": "+17",
        "defesaObs": "evasão, resistência a medo +5",
        "pv": "660",
        "desl": "9m (6q), ignora terreno difícil natural",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "8",
            "con": "7",
            "int": "1",
            "sab": "4",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Kum'shrak x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "4d8+28, 19/x3 mais veneno"
            },
            {
                "nome": "Foice x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "4d6+28, x4"
            },
            {
                "nome": "Adaga x2",
                "tipo": "À Distância",
                "bonus": "+44",
                "dano": "2d4+15"
            }
        ],
        "habilidades": [
            {
                "nome": "Camuflagem da Caçadora",
                "desc": "Quando Maryx está sob camuflagem, seus inimigos aplicam a chance de erro por camuflagem a qualquer efeito contra ela (não apenas ataques). Isso protege apenas Maryx, não outros alvos ou criaturas na área do efeito."
            },
            {
                "nome": "Eclipse",
                "desc": "Durante os eventos da ascensão do Ayrrak, Maryx cavalgava Eclipse, um warg montaria especial. Enquanto Maryx está montada, seu deslocamento se torna 12m, ela recebe uma ação de movimento extra por turno (apenas para se deslocar), +2d6 em rolagens de dano corpo a corpo e, uma vez por rodada, quando acerta um ataque corpo a corpo, pode fazer a manobra derrubar como uma ação livre (teste +49). Eclipse carrega os equipamentos de Maryx entranhados em seu pelo, fazendo com que ela nunca fique sem munição."
            },
            {
                "nome": "Emboscar",
                "desc": "(Livre) Maryx executa uma ação padrão adicional em seu turno. Ela só pode usar esta habilidade na primeira rodada de um combate."
            },
            {
                "nome": "Granadeira Veterana",
                "desc": "Maryx pode arremessar bombas e outros preparados alquímicos em alcance médio e pode arremessar dois desses itens com a mesma ação padrão."
            },
            {
                "nome": "Marca da Presa",
                "desc": "(Livre) Uma vez por rodada, Maryx analisa uma criatura em alcance longo. Até o fim da cena, ela recebe +5 em testes de perícia, +5 na margem de ameaça e +2d10 em rolagens de dano contra essa criatura (o bônus em dano é dobrado contra criaturas desprevenidas, e os bônus totais são dobrados contra elfos e humanos)."
            },
            {
                "nome": "Predadora Alfa",
                "desc": "(Movimento) Maryx faz um teste de Furtividade oposto à Percepção de uma criatura em alcance curto. Se passar, \"surge\" adjacente ao alvo e é considerada invisível contra ele até o início de seu próximo turno."
            },
            {
                "nome": "Saque Rápido",
                "desc": "Maryx pode sacar e guardar itens como uma ação livre."
            },
            {
                "nome": "Terror de Lamnor",
                "desc": "Maryx pode se mover com seu deslocamento normal enquanto usa Furtividade sem sofrer penalidades no teste de perícia e pode se esconder mesmo sem cobertura ou camuflagem, sumindo em plena vista."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+15"
            },
            {
                "nome": "Atletismo",
                "valor": "+21"
            },
            {
                "nome": "Furtividade",
                "valor": "+24"
            },
            {
                "nome": "Intimidação",
                "valor": "+15"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+20"
            }
        ],
        "equipamento": "Adaga x6, bomba x2, bomba de fumaça x2, couro batido reforçado sob medida, foice maciça, kum'shrak equilibrado peçonhento preciso. A CD para resistir às bombas de Maryx é 44.",
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Mizra",
        "tipo": "Monstro (finntroll) Médio",
        "nd": "17",
        "iniciativa": "+22",
        "percepcao": "+22",
        "percepcaoObs": "visão no escuro",
        "defesa": "51",
        "fort": "+24",
        "ref": "+17",
        "von": "+30",
        "defesaObs": "imunidade a magia de adivinhação e encantamento, resistência a magia +2",
        "pv": "750",
        "desl": "9m (6q)",
        "pm": "91",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "3",
            "int": "3",
            "sab": "5",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Maça x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+45",
                "dano": "4d8+20 mais 4d6 ácido"
            }
        ],
        "habilidades": [
            {
                "nome": "Arrogância Divina",
                "desc": "Mizra se considera a representação suprema da obra dos deuses. Criaturas que falhem em testes de resistência contra suas magias ficam frustradas."
            },
            {
                "nome": "Magia Acelerada",
                "desc": "(Livre, +4 PM) Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, Mizra muda a execução dela para livre."
            },
            {
                "nome": "Revoada Rastinante",
                "desc": "(Movimento) Uma vez por cena, Mizra invoca uma revoada de harpias que surge em um espaço desocupado em alcance médio. A revoada age no início da próxima rodada de Mizra, tem deslocamento de voo 18m, pode ocupar o espaço ocupado por outras criaturas e pode gastar uma ação padrão para causar 4d12+10 pontos de dano de corte em todas as criaturas em seu espaço. Criaturas que sofram dano da revoada são consideradas em condição terrível para lançar magias por 1 rodada. A revoada é Grande, tem For 2, Des 4, 90 PV, Defesa 32, evasão e usa os valores de Mizra com –5 para qualquer teste oposto ou de resistência."
            },
            {
                "nome": "Voz dos Monstros",
                "desc": "Mizra pode falar com todos os monstros inteligentes e não inteligentes."
            }
        ],
        "magias": "Como uma clériga de Megalokk de 18º nível (CD 46, limite de PM 18).• Curar Ferimentos (Padrão, 17 PM) Uma criatura adjacente cura 18d8+18 PV.• Físico Divino (Padrão, 10 PM) Uma criatura tocada recebe +4 em Força.• Fúria do Panteão (Padrão, 15 PM) Cria uma nuvem de tempestade que ocupa um cubo de 90m. Os ventos tornam ataques à distância impossíveis e fazem a área contar como condição terrível para lançar magia. Além disso, inimigos na área têm a visibilidade reduzida (como na magia Névoa). Uma vez por rodada, Mizra pode gastar uma ação de movimento para gerar uma nevasca (inimigos sofrem 10d6 pontos de dano de frio; Fort CD 46 reduz à metade; área se torna terreno difícil); raios (até 6 inimigos sofrem 10d8 pontos de dano de eletricidade; Ref CD 46 reduz à metade) ou siroco (inimigos sofrem 10d6 pontos de dano, metade corte, metade fogo, e ficam sangrando; Fort CD 46 reduz o dano à metade e evita a condição).• Pele de Pedra (Padrão, 10 PM) Uma criatura adjacente é transformada em uma estátua de pedra sem consciência por 1d4 rodadas (Fort evita).• Perdição (Padrão, 9 PM) Criaturas escolhidas em alcance curto sofrem –5 em testes de ataque e rolagens de dano.",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+19"
            },
            {
                "nome": "Intimidação",
                "valor": "+19"
            },
            {
                "nome": "Misticismo",
                "valor": "+19"
            },
            {
                "nome": "Religião",
                "valor": "+21"
            }
        ],
        "equipamento": "Maça atroz formidável, manto pesado, símbolo sagrado de Megalokk",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Oook-Gak",
        "tipo": "Monstro Grande",
        "nd": "17",
        "iniciativa": "+22",
        "percepcao": "+19",
        "percepcaoObs": "faro, visão na penumbra",
        "defesa": "54",
        "fort": "+28",
        "ref": "+28",
        "von": "+15",
        "defesaObs": "evasão, imunidade a frio, redução de dano 10",
        "pv": "1010",
        "desl": "12m (8q), escalada 9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "12",
            "des": "6",
            "con": "6",
            "int": "1",
            "sab": "3",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Quatro pancadas",
                "tipo": "Corpo a Corpo",
                "bonus": "+50",
                "dano": "4d12+30, x3"
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado",
                "desc": "(Livre) Se Oook-Gak acerta um ataque de pancada, pode fazer a manobra agarrar (teste +56)."
            },
            {
                "nome": "Chuva de Punhos",
                "desc": "Se Oook-Gak acerta os quatro ataques de pancada em um mesmo alvo na mesma rodada, causa mais 8d12+30 pontos de dano."
            },
            {
                "nome": "Golpe Versátil",
                "desc": "Oook-Gak recebe +4 em testes de manobras de combate."
            },
            {
                "nome": "Olhar Congelante",
                "desc": "(Movimento) Oook-Gak dispara um raio de frio de seus olhos. Uma criatura em alcance médio sofre 10d8+10 pontos de dano de frio e fica lenta (Fort CD 44 reduz à metade e evita a condição). Recarga (movimento)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+22"
            },
            {
                "nome": "Atletismo",
                "valor": "+28"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+19"
            }
        ],
        "equipamento": "Nenhum",
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Optix",
        "tipo": "Monstro (fantasma de aço) Médio",
        "nd": "17",
        "iniciativa": "+20",
        "percepcao": "+15",
        "percepcaoObs": "visão no escuro",
        "defesa": "54",
        "fort": "+23",
        "ref": "+31",
        "von": "+17",
        "defesaObs": "imunidade a atordoamento, cansaço, encantamento, metabolismo, paralisia e veneno, redução de dano 20/adamante, redução de fogo, frio e impacto 10, vulnerabilidade a ácido",
        "pv": "1000",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "4",
            "con": "7",
            "int": "3",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Espada da Galáxia x4",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "6d12+30, 17"
            }
        ],
        "habilidades": [
            {
                "nome": "Contragolpe Montado",
                "desc": "(Reação) Uma vez por rodada, quando Optix é alvo de um ataque corpo a corpo, seu selako do vazio tenta abocanhar o atacante (teste +30, dano 4d12+10 corte, crítico 18). Se o selaco acertar o ataque, o alvo fica sangrando."
            },
            {
                "nome": "Detonação Final",
                "desc": "(Completa) Se for reduzido a 0 PV ou menos e estiver armado com sua Espada da Galáxia, Optix enterra a lâmina em seu próprio ventre para evitar ser capturado. Isso gera uma explosão que consome o Fantasma de Aço e sua espada, causando o efeito da magia Desintegrar (CD 44) em todas as criaturas e objetos em um raio de 90m."
            },
            {
                "nome": "Ginete de Selako do Vazio",
                "desc": "Optix possui um selako do vazio, um parceiro montaria Enorme. Enquanto estiver montado, seu deslocamento muda para natação 18m (que pode ser usado no éter divino) e, uma vez por rodada, ele recebe +2d12 em uma rolagem de dano corpo a corpo e deixa o alvo sangrando (Fort CD 44 evita a condição)."
            },
            {
                "nome": "Invisibilidade Natural",
                "desc": "(Movimento) Optix se torna invisível. Nessa condição, recebe camuflagem total e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques. Ele pode se manter invisível indefinidamente e não perde sua invisibilidade se fizer alguma ação hostil contra uma criatura. Entretanto, sempre que sofre dano, deve fazer um teste de Vontade (CD igual ao dano sofrido). Se falhar, se torna visível. Recarga (movimento)."
            },
            {
                "nome": "Raio de Luz",
                "desc": "(Movimento) Optix dispara luz concentrada em uma esfera de 3m de raio em alcance médio. Criaturas nessa área sofrem 6d6+30 pontos de dano de fogo e ficam em chamas (Ref CD 44 reduz à metade e evita as chamas)."
            },
            {
                "nome": "Resiliência",
                "desc": "Optix não fica inconsciente quando é reduzido a 0 PV ou menos e só morre quando é reduzido a –500 PV."
            },
            {
                "nome": "Sentidos Especiais",
                "desc": "Optix pode enxergar em escuridão total, mesmo mágica, pode ver criaturas e objetos invisíveis e não pode ser flanqueado. Entretanto, ele não percebe sons e odores, falhando automaticamente em testes de Percepção para ouvir e perceber cheiros."
            },
            {
                "nome": "Vulnerabilidade a Água",
                "desc": "Se for exposto a água, Optix sofre os mesmos efeitos de ser exposto a uma quantidade equivalente de ácido."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+24"
            },
            {
                "nome": "Cavalgar",
                "valor": "+20"
            },
            {
                "nome": "Furtividade",
                "valor": "+20"
            }
        ],
        "equipamento": "Espada da Galáxia",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Horda Zumbi",
        "tipo": "Morto-vivo Colossal",
        "nd": "18",
        "iniciativa": "+15",
        "percepcao": "+15",
        "percepcaoObs": "visão no escuro",
        "defesa": "55",
        "fort": "+31",
        "ref": "+26",
        "von": "+19",
        "defesaObs": "normal",
        "pv": "500",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "–1",
            "con": "3",
            "int": "–",
            "sab": "–1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "[Bando] Duas mordidas",
                "tipo": "Corpo a Corpo",
                "bonus": "+52",
                "dano": "8d12+30"
            }
        ],
        "habilidades": [
            {
                "nome": "Bocas Oportunistas",
                "desc": "(Reação) Sempre que uma criatura dentro do alcance natural da horda zumbi erra um ataque contra ela, a horda faz um ataque de mordida contra essa criatura."
            },
            {
                "nome": "Muitas Mordidas",
                "desc": "(Completa) A horda faz dois ataques de mordida contra cada inimigo ao seu redor. Para cada ataque, ela faz um único teste contra a Defesa de cada inimigo em seu alcance natural e faz uma única rolagem de dano que é aplicada a cada inimigo atingido."
            },
            {
                "nome": "Fraqueza Zumbi",
                "desc": "A horda sofre o dobro de dano de acertos críticos ou de ataques feitos contra seus cérebros (Defesa 65)."
            }
        ],
        "pericias": [],
        "equipamento": "Nenhum",
        "tesouro": "Nenhum",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Vurix",
        "tipo": "Humanoide (povo-lagarto) Enorme",
        "nd": "18",
        "iniciativa": "+11",
        "percepcao": "+18",
        "percepcaoObs": "visão no escuro",
        "defesa": "49",
        "fort": "+30",
        "ref": "+24",
        "von": "+17",
        "defesaObs": "evasão, imunidade a atordoamento e efeitos mentais, vulnerabilidade a frio",
        "pv": "1010",
        "desl": "9m (6q), natação 9m (6q)",
        "pm": "67",
        "atributos": {
            "for": "7",
            "des": "3",
            "con": "5",
            "int": "0",
            "sab": "3",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Lança montada x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+51",
                "dano": "2d12+30"
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+49",
                "dano": "2d8+30, 18"
            }
        ],
        "habilidades": [
            {
                "nome": "Escamas Protetoras",
                "desc": "(Reação) Uma vez por rodada, quando sofre dano, Vurix reduz esse dano à metade."
            },
            {
                "nome": "Investida do Pântano",
                "desc": "(Completa) Vurix faz uma investida com sua lança montada. Seu deslocamento durante essa investida ignora terreno difícil natural e, se acertar o ataque, ele causa +4d12 pontos de dano."
            },
            {
                "nome": "Hidra de Combate",
                "desc": "No início de cada turno de Vurix, as cabeças de sua montaria hidra mordem e cospem ácido em um raio de 30m. Todos os inimigos de Vurix nessa área sofrem 6d6+6 pontos de dano de corte e 6d6+6 pontos de dano de ácido (Ref CD 47 reduz à metade)."
            },
            {
                "nome": "Invocar a Tribo",
                "desc": "(Movimento) Vurix invoca 2d6+1 guerreiros-lagarto em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada de Vurix, têm deslocamento 9m (normal e de natação) e podem gastar uma ação padrão para causar 2d12+6 pontos de dano de corte em uma criatura adjacente. Os guerreiros têm For 3, Des 1, Defesa 34, 1 PV e evasão e usam os valores de Vurix com –5 para qualquer teste oposto ou de resistência. Vurix pode invocar um total de 30 guerreiros-lagarto por cena."
            }
        ],
        "magias": "Como uma druida de 16º nível (CD 44, limite de PM 16). Vurix pode lançar uma de suas magias por rodada como uma ação livre.• Campo de Força (Reação, 4 PM) Quando sofre dano, Vurix recebe redução de dano 30 contra este dano.• Curar Ferimentos (Padrão, 9 PM) Uma criatura em alcance curto cura 10d8+10 pontos de vida.• Dissipar Magia (Padrão, 3 PM) Vurix escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.• Relâmpago (Padrão, 9 PM) Vurix lança um relâmpago em cada criatura escolhida em alcance médio, causando 10d6 pontos de dano de eletricidade (Ref reduz à metade).",
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+20"
            },
            {
                "nome": "Guerra",
                "valor": "+15"
            },
            {
                "nome": "Intimidação",
                "valor": "+20"
            },
            {
                "nome": "Misticismo",
                "valor": "+15"
            },
            {
                "nome": "Religião",
                "valor": "+18"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+18"
            }
        ],
        "equipamento": "Lança montada atroz formidável, símbolo sagrado de Allihanna",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "General Supremo Hermann Von Krauser",
        "tipo": "Humanoide (humano) Médio",
        "nd": "19",
        "iniciativa": "+25",
        "percepcao": "+21",
        "percepcaoObs": "normal",
        "defesa": "61",
        "fort": "+27",
        "ref": "+20",
        "von": "+35",
        "defesaObs": "resistência a magia +5",
        "pv": "650",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "6",
            "con": "7",
            "int": "6",
            "sab": "6",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+55",
                "dano": "4d10+40, 17/x3"
            },
            {
                "nome": "Pistola-tambor x2",
                "tipo": "À Distância",
                "bonus": "+55",
                "dano": "4d8+40, 15/x3 mais 4d8 contra humanoides não humanos"
            }
        ],
        "habilidades": [
            {
                "nome": "Gerador de Campo de Força",
                "desc": "Hermann Von Krauser possui um engenho mecanomágico que o protege constantemente. No início de cada rodada, esse engenho gera um campo de força que absorve os 150 primeiros pontos de dano sofridos por Von Krauser na rodada."
            },
            {
                "nome": "Ordem Inquestionável",
                "desc": "(Livre) Uma vez por rodada, Von Krauser profere uma ordem da lista a seguir a uma criatura inteligente em alcance médio. Se o alvo falhar no teste de resistência (Von CD 50), deve obedecer à ordem em seu próximo turno da melhor maneira possível.• Ataque: o alvo ataca outra criatura à escolha de Von Krauser, usando suas melhores habilidades para isso.• Fuja: o alvo gasta seu turno se afastando de Von Krauser (usando todas as suas ações).• Submeta-se: o alvo solta quaisquer itens que esteja empunhando e fica pasmo.• Venha: o alvo gasta o turno se aproximando de Von Krauser (usando todas as ações dele para isso)."
            },
            {
                "nome": "Plano de Contingência",
                "desc": "(Reação) Se Von Krauser for afetado por um efeito mental, de movimento, de metamorfose ou de morte instantânea, ele anula esse efeito. Efeitos de morte instantânea incluem aqueles que reduzem seus PV a 0 ou menos instantaneamente (como Assassino Fantasmagórico), que aprisionam ou destroem seu corpo ou alma (como Buraco Negro e Roubar a Alma) e similares. O mestre tem a palavra final se um efeito é ou não de morte instantânea. Recarga (padrão)."
            },
            {
                "nome": "Táticas Supremas",
                "desc": "(Movimento) Von Krauser grita ordens para seus aliados em alcance médio. Eles recebem +5 em testes de perícia, +1d8+5 em rolagens de dano e +2 na Defesa até o fim da cena."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+21"
            },
            {
                "nome": "Diplomacia",
                "valor": "+21"
            },
            {
                "nome": "Enganação",
                "valor": "+21"
            },
            {
                "nome": "Guerra",
                "valor": "+31 (+36 com o mapa bélico)"
            },
            {
                "nome": "Intimidação",
                "valor": "+21"
            },
            {
                "nome": "Intuição",
                "valor": "+21"
            },
            {
                "nome": "Nobreza",
                "valor": "+21"
            },
            {
                "nome": "Pilotagem",
                "valor": "+15"
            }
        ],
        "equipamento": "Anel da liberdade, armadura completa sob medida abascanta, espada bastarda de adamante maciça magnífica veloz, mapa bélico, pistola-tambor de mitral precisa anti-humanoides caçadora magnífica",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Krazag",
        "tipo": "Monstro Enorme",
        "nd": "19",
        "iniciativa": "+15",
        "percepcao": "+18",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesa": "55",
        "fort": "+32",
        "ref": "+19",
        "von": "+26",
        "defesaObs": "redução de dano 10",
        "pv": "1150",
        "desl": "6m (4q), escalada 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "0",
            "con": "7",
            "int": "3",
            "sab": "1",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Alabarda",
                "tipo": "Corpo a Corpo",
                "bonus": "+52",
                "dano": "4d8+30, 19/x3"
            },
            {
                "nome": "Duas pinças",
                "tipo": "Corpo a Corpo",
                "bonus": "+50",
                "dano": "4d10+30, x3"
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+50",
                "dano": "4d12+30/x3 mais veneno"
            }
        ],
        "habilidades": [
            {
                "nome": "Dilacerar",
                "desc": "Se Krazag acerta os dois ataques de pinça em uma mesma criatura na mesma rodada, causa mais 6d10+30 pontos de dano."
            },
            {
                "nome": "A Mim!",
                "desc": "(Movimento) Krazag invoca 1d4+1 homens-escorpiões (veja \"Guarda Pessoal\") que surgem em espaços desocupados em alcance médio. Eles agem a partir da próxima rodada de Krazag. Recarga (fazer um acerto crítico)."
            },
            {
                "nome": "Guarda Pessoal",
                "desc": "Krazag está sempre acompanhado por seis homens-escorpiões, que começam o combate em espaços livres em alcance curto dele. Os homens-escorpiões agem na mesma rodada de Krazag, têm deslocamento 12m (normal e escalada) e podem gastar uma ação padrão para causar 2d8+15 pontos de dano de perfuração em uma criatura adjacente. Eles são Grandes, têm For 7, Des 2, Defesa 40, 1 PV e evasão e usam os valores de Krazag com –5 para qualquer teste oposto ou de resistência."
            },
            {
                "nome": "Proteja-me!",
                "desc": "(Reação) Uma vez por rodada, quando é atingido por um ataque, Krazag escolhe um de seus vários escravos para sofrer todos os efeitos deste ataque em seu lugar. Um personagem que esteja ciente dessa habilidade pode aceitar uma penalidade de –5 em seu teste de ataque para impedir Krazag de usar essa habilidade contra esse ataque."
            },
            {
                "nome": "Veneno",
                "desc": "Fica debilitado e perde 4d12 pontos de vida por rodada durante 3 rodadas (Fort CD 52 reduz para 1 rodada)."
            }
        ],
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+20"
            },
            {
                "nome": "Jogatina",
                "valor": "+18"
            }
        ],
        "equipamento": "Alabarda precisa, pungente, dilacerante, aumentada",
        "tesouro": "Triplo",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Shivara das Trevas",
        "tipo": "Morto-vivo (vampira) Média",
        "nd": "19",
        "iniciativa": "+22",
        "percepcao": "+22",
        "percepcaoObs": "normal",
        "defesa": "50",
        "fort": "+29",
        "ref": "+26",
        "von": "+29",
        "defesaObs": "cura acelerada 50, imunidade a encantamento, RD 20/luz, resistência a magia +5",
        "pv": "850",
        "desl": "9m (6q), escalar 9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "5",
            "con": "5",
            "int": "4",
            "sab": "5",
            "car": "9"
        },
        "ataques": [
            {
                "nome": "Lâmina de sangue x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+57",
                "dano": "4d12+45, 18/x3 mais 2d8 trevas"
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+55",
                "dano": "4d8+40"
            },
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+55",
                "dano": "4d6+40, 19"
            }
        ],
        "habilidades": [
            {
                "nome": "Dominação Vampírica",
                "desc": "(Padrão) Shivara sussurra palavras de controle para um humanoide em alcance curto. A vítima fica confusa, enfeitiçada ou fascinada até o final da cena ou perde suas memórias da última hora, à escolha de Shivara (Von CD 48 evita). Uma criatura só pode ser alvo desta habilidade uma vez por cena."
            },
            {
                "nome": "Drenar Sangue",
                "desc": "(Movimento) Shivara drena sangue de uma criatura viva que esteja agarrando; ela causa 10d8 pontos de dano de perfuração e recupera a mesma quantidade de PV. Uma criatura morta por Shivara desta forma se erguerá como um vampiro na próxima noite e deverá vencer um teste de Vontade oposto contra Shivara ou ficará sob o controle dela até que ela a liberte ou seja destruída."
            },
            {
                "nome": "Forma de Loba",
                "desc": "(Padrão) Shivara se transforma em uma loba. Ela recebe +5 em testes de manobra e seu deslocamento muda para 15m (10q). Seu equipamento é absorvido e suas outras estatísticas não são alteradas. A transformação dura quanto tempo ela desejar."
            },
            {
                "nome": "Orgulho",
                "desc": "(Reação) Uma vez por cena, quando faz um teste de perícia, Shivara soma o dobro de seu Carisma (+18) nesse teste."
            },
            {
                "nome": "Presença Aristocrática",
                "desc": "(Reação) Quando uma criatura com um valor de Inteligência tenta machucar Shivara, essa criatura deve fazer um teste de Vontade (CD 48). Se falhar, não conseguirá machucá-la e perderá a ação. Shivara só pode usar esta habilidade uma vez por criatura na mesma cena."
            },
            {
                "nome": "Soberana Sombria",
                "desc": "(Movimento) A voz de Shivara inspira aliados e apavora inimigos. Quando usa esta habilidade, ela escolhe uma das opções a seguir. Esta habilidade só pode afetar uma mesma criatura uma vez por dia.• Assombro. Todos os inimigos em alcance médio fazem um teste de Vontade (CD 48). Aqueles que falharem ficam abalados. Aqueles que falharem por 5 ou mais ficam paralisados por 1d4 rodadas e então abalados.• Devoção. Até o fim da cena, todos os aliados em alcance médio recebem +5 em testes de perícia e 2d6 pontos de mana temporários."
            },
            {
                "nome": "Sensibilidade ao Sol",
                "desc": "Quando exposta a luz solar direta, Shivara fica ofuscada e perde 6d6 PV por rodada."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+22"
            },
            {
                "nome": "Cavalgar",
                "valor": "+20"
            },
            {
                "nome": "Diplomacia",
                "valor": "+29"
            },
            {
                "nome": "Guerra",
                "valor": "+19"
            },
            {
                "nome": "Intimidação",
                "valor": "+29"
            },
            {
                "nome": "Intuição",
                "valor": "+20"
            },
            {
                "nome": "Nobreza",
                "valor": "+24"
            }
        ],
        "equipamento": "Lâmina de sangue (espada bastarda pungente maciça, drenante, sanguinária e tumular de mitral)",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Avatar de Nimb",
        "tipo": "Espírito Médio",
        "nd": "20",
        "iniciativa": "+28",
        "percepcao": "+28",
        "percepcaoObs": "normal",
        "defesa": "60",
        "fort": "+21",
        "ref": "+27",
        "von": "+33",
        "defesaObs": "imunidade a efeitos mentais e de adivinhação, encantamento e metamorfose, maior que a morte (p. 118), redução de dano 20",
        "pv": "1111",
        "desl": "voo 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "10",
            "con": "8",
            "int": "17",
            "sab": "3d6",
            "car": "12"
        },
        "ataques": [
            {
                "nome": "Golpe Caótico",
                "tipo": "Corpo a Corpo",
                "bonus": "+50",
                "dano": "4d12+30"
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Caótica Derradeira",
                "desc": "O avatar emana uma aura de caos capaz de distorcer seus inimigos. No início do turno do avatar, criaturas à sua escolha em alcance médio perdem 8d6 pontos de vida. Sempre que o avatar rola o valor máximo em algum dado, o dano aumenta em +1d6."
            },
            {
                "nome": "Centelha Divina",
                "desc": "O avatar pode lançar qualquer magia divina como um clérigo de 20º nível sem gastar PM (CD 49, limite de PM 20). Sempre que uma criatura rola 1 em um teste de resistência contra uma magia dele, fica confusa."
            },
            {
                "nome": "\"Eu movo as peças!\"",
                "desc": "No começo de seu turno, o avatar rola 1d6 e criaturas à sua escolha em alcance médio se movem um número de quadrados igual ao resultado da rolagem em uma direção também à sua escolha."
            },
            {
                "nome": "Misticais Dados Frumiosos",
                "desc": "(Padrão) O avatar faz alguma coisa que gera um efeito inesperado. Role 1d6 e use o efeito correspondente entre os descritos a seguir. 1) Role mais duas vezes. 2) Um apito de trem ressoa. Inimigos em alcance médio sofrem 10d12 pontos de dano de impacto e ficam surdos (Fort CD 49 reduz à metade e evita a condição). 3) O avatar pega a linha de pensamento de alguém e desfere um golpe com ela. Inimigos em uma linha de 15m sofrem 12d10 pontos de dano psíquico e ficam confusos (Von CD 49 reduz à metade e evita a condição). 4) Um animal fofinho se materializa em pleno ar e abraça o avatar, que recupera 100 PV e cura uma condição. 5) Um dragão de duas cabeças sai de uma das mangas do avatar e sopra tibares em um cone de 18m. Cada criatura na área sofre 10d12 pontos de dano de fogo e 10d12 pontos de dano de impacto e recebe uma quantidade de tibares igual ao dano causado (Ref CD 49 reduz o dano e a quantidade de tibares à metade). 6) Todos os efeitos de 2 a 5 ocorrem ao mesmo tempo."
            },
            {
                "nome": "Ódio ao Previsível",
                "desc": "Sempre que uma criatura em alcance médio executa a mesma ação de sua rodada anterior, sofre 5d20 pontos de dano mental e não pode mais executar aquela ação até o fim da cena (Von CD 49 reduz à metade e evita a restrição de ações)."
            },
            {
                "nome": "Ou Não",
                "desc": "(Reação) Todos os eventos da última rodada são desfeitos (como se nunca tivessem ocorrido) e a cena retorna para o início do turno anterior do avatar. Ele pode usar esta habilidade uma vez por cena."
            }
        ],
        "pericias": [
            {
                "nome": "Jogatina",
                "valor": "+38"
            },
            {
                "nome": "Mais 1d12 perícias",
                "valor": "+12 em cada"
            }
        ],
        "equipamento": "Nenhum",
        "tesouro": "Padrão",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "Conselho Finntroll",
        "tipo": "Monstro (finntroll) Grande",
        "nd": "20",
        "iniciativa": "+21",
        "percepcao": "+22",
        "percepcaoObs": "visão no escuro",
        "defesa": "50",
        "fort": "+24",
        "ref": "+24",
        "von": "+34",
        "defesaObs": "imunidade a veneno, maior que a morte (p. 118), redução de dano 30",
        "pv": "1200",
        "desl": "9m (6q)",
        "pm": "160",
        "atributos": {
            "for": "–1",
            "des": "3",
            "con": "3",
            "int": "10",
            "sab": "4",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "[Bando] Açoite finntroll",
                "tipo": "Corpo a Corpo",
                "bonus": "+45",
                "dano": "2d8+10"
            }
        ],
        "habilidades": [
            {
                "nome": "Conjurar Trolloides",
                "desc": "(Padrão, 5 PM) O Conselho invoca 2d6+1 trolloides em espaços desocupados em alcance curto. Os trolloides têm deslocamento 9m, For 7, Des 2, Defesa 30, 1 PV, são imunes a dano, exceto de ácido ou fogo, e veneno, e falham automaticamente em qualquer teste de resistência ou oposto. Eles não agem sem receber uma ordem. A partir de seu próximo turno, o Conselho pode gastar uma ação de movimento para dar um dos seguintes comandos a qualquer número de trolloides. Recarga (todos os trolloides serem destruídos).• Andar. Cada trolloide se move até 9m (6q).• Canalizar. A próxima magia que o Conselho lança tem como ponto de origem um trolloide à sua escolha, que é destruído após a magia ser lançada.• Esmagar. Cada trolloide causa 6d12 pontos de dano de impacto a uma criatura adjacente (Ref CD 45 reduz à metade).• Proteger. Cada trolloide adjacente ao Conselho fornece +2 nos testes de resistência e de manobras de combate dele neste turno."
            },
            {
                "nome": "Fluxo de Mana",
                "desc": "O Conselho Finntroll pode sustentar dois efeitos simultaneamente com apenas uma ação livre (mas pagando o custo de cada um)."
            },
            {
                "nome": "Senhores do Subterrâneo",
                "desc": "No fim do turno de cada personagem, o Conselho pode usar uma das habilidades abaixo como uma reação.• Esporos das Profundezas. Criaturas em alcance médio perdem 4d12 PV e ficam fracas (Fort CD 51 reduz à metade e evita a condição; este é um efeito de veneno).• Fonte Curativa. O Conselho cura 50 PV.• Linhas de Mana. A CD das magias do Conselho aumenta em +2 até o fim de seu próximo turno.• Mutação Biomante. Um trolloide em alcance curto fica ainda maior e mais forte, com os músculos inchados de forma não natural. Ele pode rolar novamente qualquer resultado 1 ou 2 de suas rolagens de dano.• Onda Gélida. Criaturas escolhidas em alcance médio sofrem 6d8 pontos de dano de frio (Fort CD 51 reduz à metade)."
            },
            {
                "nome": "Servidão Arcana",
                "desc": "Quando o Conselho lança uma magia, todas as criaturas em alcance médio sofrem dano de essência igual ao dobro dos pontos de mana gastos na magia (Fort CD 51 reduz à metade). Para cada criatura que falhar nesse teste, o Conselho recupera 3 PM (limitado ao custo da magia)."
            }
        ],
        "magias": "Como um mago de 20º nível (CD 51, limite de PM 30).• Controlar a Gravidade (Padrão, 10 PM, sustentada) O Conselho controla os efeitos da gravidade em um cubo de 12m em alcance médio (veja Tormenta20, p. 186).• Dissipar Magia (Padrão, 3 PM) O Conselho escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas.• Marionete (Padrão, 10 PM, sustentada) O Conselho controla as ações físicas de uma criatura em alcance médio. Ao sofrer a magia, e no início de cada um de seus turnos, a vítima faz um teste de Fortitude. Se passar, anula a magia.• Raio do Enfraquecimento (Padrão, 8 PM) Criaturas escolhidas em alcance curto ficam exaustas (Fort muda para fatigado).• Toque da Morte (Padrão, 25 PM) Criaturas escolhidas em alcance curto sofrem 10d8+20 pontos de dano de trevas. Um alvo com menos da metade de seus PV em vez disso deve fazer um teste de Fortitude. Se passar, sofre o dano normal; se falhar, seus PV são reduzidos a –10.",
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+26"
            },
            {
                "nome": "Intimidação",
                "valor": "+21"
            },
            {
                "nome": "Misticismo",
                "valor": "+26"
            }
        ],
        "equipamento": "Nenhum",
        "tesouro": "Triplo",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "General Supremo Hermann Von Krauser (aventura 20)",
        "tipo": "Humanoide (humano) Médio",
        "nd": "20",
        "iniciativa": "+26",
        "percepcao": "+22",
        "percepcaoObs": "normal",
        "defesa": "65",
        "fort": "+28",
        "ref": "+21",
        "von": "+36",
        "defesaObs": "resistência a magia +5",
        "pv": "750",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "7",
            "des": "6",
            "con": "7",
            "int": "6",
            "sab": "6",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Espada bastarda x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+59",
                "dano": "4d10+45, 17/x3"
            },
            {
                "nome": "Pistola-tambor x3",
                "tipo": "À Distância",
                "bonus": "+59",
                "dano": "4d8+45, 15/x3 mais 4d8 contra humanoides não humanos"
            }
        ],
        "habilidades": [
            {
                "nome": "Gerador de Campo de Força",
                "desc": "Hermann Von Krauser possui um engenho mecanomágico que o protege constantemente. No início de cada rodada, esse engenho gera um campo de força que absorve os 150 primeiros pontos de dano sofridos por Von Krauser na rodada."
            },
            {
                "nome": "Ordem Inquestionável",
                "desc": "(Livre) Uma vez por rodada, Von Krauser profere uma ordem da lista a seguir a uma criatura inteligente em alcance médio. Se o alvo falhar no teste de resistência (Von CD 51), deve obedecer à ordem em seu próximo turno da melhor maneira possível.• Ataque: o alvo ataca outra criatura à escolha de Von Krauser, usando suas melhores habilidades para isso.• Fuja: o alvo gasta seu turno se afastando de Von Krauser (usando todas as suas ações).• Submeta-se: o alvo solta quaisquer itens que esteja empunhando e fica pasmo.• Venha: o alvo gasta o turno se aproximando de Von Krauser (usando todas as ações dele para isso)."
            },
            {
                "nome": "Plano de Contingência",
                "desc": "(Reação) Se Von Krauser for afetado por um efeito mental, de movimento, de metamorfose ou de morte instantânea, ele anula esse efeito. Recarga (padrão)."
            },
            {
                "nome": "Segunda Fase",
                "desc": "Se o General Supremo iniciar seu turno com 250 PV ou menos, gasta uma ação completa para tocar em uma das medalhas em seu peito. Isso gera uma explosão na sala e invoca Shorder, uma armadura artefato que Von Krauser passa a usar. Pela explosão, todos os personagens sofrem 12d6 pontos de dano e ficam caídos e atordoados por uma rodada (Ref CD 45 reduz o dano à metade e evita a queda; Fort CD 45 evita o atordoamento). Por invocar Shorder, o General Supremo recupera 500 PV e passa a usar o conjunto de estatísticas \"General Supremo Von Krauser (com Shorder)\"."
            },
            {
                "nome": "Técnicas Supremas",
                "desc": "(Movimento) Von Krauser usa uma técnica de luta desenvolvida por ele mesmo.• Agressiva: Von Krauser faz um ataque corpo a corpo ou à distância.• Defensiva: Von Krauser recebe camuflagem total contra um ataque realizado até o início de seu próximo turno."
            },
            {
                "nome": "Táticas Supremas",
                "desc": "(Movimento) Von Krauser grita ordens para seus aliados em alcance médio. Eles recebem +5 em testes de perícia, +1d8+5 em rolagens de dano e +2 na Defesa até o fim da cena."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+22"
            },
            {
                "nome": "Diplomacia",
                "valor": "+22"
            },
            {
                "nome": "Enganação",
                "valor": "+22"
            },
            {
                "nome": "Guerra",
                "valor": "+32"
            },
            {
                "nome": "Intimidação",
                "valor": "+22"
            },
            {
                "nome": "Intuição",
                "valor": "+22"
            },
            {
                "nome": "Nobreza",
                "valor": "+22"
            },
            {
                "nome": "Pilotagem",
                "valor": "+16"
            }
        ],
        "equipamento": "Anel da liberdade, armadura completa sob medida abascanta, espada bastarda de adamante maciça magnífica veloz, pistola-tambor de mitral precisa anti-humanoides caçadora magnífica",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    },
    {
        "nome": "General Supremo Von Krauser (com Shorder)",
        "tipo": "Humanoide (humano) Grande",
        "nd": "20",
        "iniciativa": "+26",
        "percepcao": "+22",
        "percepcaoObs": "visão no escuro",
        "defesa": "65",
        "fort": "+28",
        "ref": "+21",
        "von": "+36",
        "defesaObs": "redução de dano 30, resistência a magia +5",
        "pv": "750",
        "desl": "9m (6q), ignora terreno difícil",
        "pm": "0",
        "atributos": {
            "for": "10",
            "des": "6",
            "con": "7",
            "int": "6",
            "sab": "6",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Maças embutidas x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+63",
                "dano": "4d12+50"
            }
        ],
        "habilidades": [
            {
                "nome": "Atropelamento",
                "desc": "(Completa) Von Krauser percorre até 18m (12q). Ele pode passar pelo espaço ocupado de quaisquer inimigos menores que ele, mas não pode passar duas vezes pelo mesmo espaço. Criaturas atropeladas dessa forma sofrem 2d12+50 pontos de dano de impacto e ficam caídas (Ref CD 51 reduz à metade e evita a condição)."
            },
            {
                "nome": "Feixe de Energia",
                "desc": "(Movimento) Von Krauser dispara um raio em uma criatura em alcance longo. O alvo sofre 10d12 pontos de dano de essência (Ref CD 51 reduz à metade)."
            },
            {
                "nome": "Maças Embutidas",
                "desc": "Os dois braços de Shorder terminam em maças que não podem ser desarmadas nem destruídas e atingem alvos incorpóreos como se fossem corpóreos."
            },
            {
                "nome": "Magnetismo",
                "desc": "(Livre) Uma vez por rodada, Von Krauser pode puxar uma criatura em alcance médio até 9m em sua direção (Fort CD 51 evita)."
            },
            {
                "nome": "Sobrecarga",
                "desc": "(Livre) Von Krauser faz uma ação padrão adicional em seu turno. Recarga (fazer um acerto crítico)."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+22"
            },
            {
                "nome": "Diplomacia",
                "valor": "+22"
            },
            {
                "nome": "Enganação",
                "valor": "+22"
            },
            {
                "nome": "Guerra",
                "valor": "+32"
            },
            {
                "nome": "Intimidação",
                "valor": "+22"
            },
            {
                "nome": "Intuição",
                "valor": "+22"
            },
            {
                "nome": "Nobreza",
                "valor": "+22"
            },
            {
                "nome": "Pilotagem",
                "valor": "+16"
            }
        ],
        "equipamento": "Shorder (recupera 500 PVs ao invocar)",
        "tesouro": "Dobro",
        "fonte": "Guerra Artoniana"
    }
];
