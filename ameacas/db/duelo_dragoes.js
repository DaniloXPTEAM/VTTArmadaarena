const DUELO_DRAGOES_DB = [
    {
        "nome": "Glop de Gelo",
        "tipo": "Monstro Médio",
        "nd": "1/2",
        "iniciativa": "+0",
        "percepcao": "+0",
        "percepcaoObs": "percepção às cegas",
        "defesa": "14",
        "fort": "+6",
        "ref": "+3",
        "von": "–5",
        "defesaObs": "imunidade a frio, vulnerabilidade a fogo",
        "pv": "15",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "0",
            "con": "2",
            "int": "—",
            "sab": "–5",
            "car": "–5"
        },
        "ataques": [
            {
                "nome": "Pancada",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6 mais 2d6 frio",
                "desc": ""
            }
        ],
        "habilidades": [],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Saqueador das Uivantes (Machadinhas)",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/4",
        "iniciativa": "+2",
        "percepcao": "+1",
        "percepcaoObs": "",
        "defesa": "10",
        "fort": "+2",
        "ref": "+2",
        "von": "–1",
        "defesaObs": "",
        "pv": "4",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "2",
            "con": "2",
            "int": "–1",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Machadinha x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6+2, x3",
                "desc": ""
            },
            {
                "nome": "Machadinha x2",
                "tipo": "À Distância",
                "bonus": "+7",
                "dano": "1d6+2, x3",
                "desc": ""
            }
        ],
        "habilidades": [],
        "pericias": [],
        "tesouro": "Metade",
        "equipamento": "Gibão de peles, machadinha x4",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Saqueador das Uivantes (Escudo)",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/4",
        "iniciativa": "+0",
        "percepcao": "+1",
        "percepcaoObs": "",
        "defesa": "12",
        "fort": "+2",
        "ref": "–1",
        "von": "+0",
        "defesaObs": "",
        "pv": "6",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "2",
            "con": "2",
            "int": "–1",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Lança",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6+3",
                "desc": ""
            },
            {
                "nome": "Lança",
                "tipo": "À Distância",
                "bonus": "+7",
                "dano": "1d6+3",
                "desc": ""
            }
        ],
        "habilidades": [],
        "pericias": [],
        "tesouro": "Metade",
        "equipamento": "Escudo pesado, gibão de peles, lança x2",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kallyagrai do Frio Inferior",
        "tipo": "Espírito Médio",
        "nd": "1",
        "iniciativa": "+3",
        "percepcao": "+1",
        "percepcaoObs": "visão no escuro",
        "defesa": "16",
        "fort": "+11",
        "ref": "+5",
        "von": "+0",
        "defesaObs": "imunidade a frio, vulnerabilidade a fogo",
        "pv": "36",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "5",
            "int": "–2",
            "sab": "1",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Garras x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d8+3",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d10+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Caminhada Ártica",
                "tipo": "Qualidade",
                "desc": "O kallyagrai ignora terreno difícil em terreno ártico ou em outros terrenos quando o solo está coberto de neve ou gelo."
            },
            {
                "nome": "Forma de Névoa (Completa)",
                "tipo": "Habilidade",
                "desc": "O kallyagrai se transforma em uma pequena nuvem gélida. Nessa forma, seu deslocamento se torna voo 6m, ele recebe imunidade a dano não mágico de corte, impacto e perfuração, e pode passar por qualquer fresta por onde ar poderia passar, mas não pode carregar itens (ao se transformar, ele larga quaisquer objetos que esteja segurando). Além disso, nessa forma ele pode ocupar o mesmo espaço que outras criaturas, e qualquer criatura que comece seu próprio turno no mesmo espaço que ele sofre 1d8 pontos de dano de frio (Fort CD 14 evita). Recarga (devorar o coração de um humanoide)."
            },
            {
                "nome": "Sopro Gelido (Padrão)",
                "tipo": "Habilidade",
                "desc": "O kallyagrai sopra ar gélido em um cone de 9m, causando 3d8 pontos de dano de frio (Fort CD 14 reduz à metade). Criaturas de tamanho Médio ou menor que falhem na resistência ficam caídas e são empurradas 6m na direção oposta. Recarga (movimento)."
            }
        ],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Carcaju",
        "tipo": "Animal Pequeno",
        "nd": "1",
        "iniciativa": "+6",
        "percepcao": "+5",
        "percepcaoObs": "visão na penumbra",
        "defesa": "15",
        "fort": "+10",
        "ref": "+5",
        "von": "+0",
        "defesaObs": "evasão",
        "pv": "26",
        "desl": "12m (8q), escalar 9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "2",
            "con": "3",
            "int": "–4",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Duas garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d4+2, 18",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ferocidade",
                "tipo": "Qualidade",
                "desc": "Quando sofre dano, o carcaju recebe +2 em testes de ataque e rolagens de dano até o fim de seu próximo turno."
            },
            {
                "nome": "Resiliência",
                "tipo": "Qualidade",
                "desc": "O carcaju não fica inconsciente quando é reduzido a 0 PV ou menos. Quando é reduzido a –13 PV, morre — ou fica inconsciente no caso de dano não letal."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Intimidação",
                "valor": "+4"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+8"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Capanga",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1/2",
        "iniciativa": "+3",
        "percepcao": "+2",
        "percepcaoObs": "",
        "defesa": "13",
        "fort": "+5",
        "ref": "+3",
        "von": "+0",
        "defesaObs": "",
        "pv": "7",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "1",
            "int": "–1",
            "sab": "0",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Tacape",
                "tipo": "Corpo a Corpo",
                "bonus": "+10",
                "dano": "1d10+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ímpeto Agressor",
                "tipo": "Qualidade",
                "desc": "O capanga recebe +1d10 na rolagem de dano de seu primeiro ataque na cena."
            }
        ],
        "pericias": [],
        "tesouro": "Metade",
        "equipamento": "Tacape",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Golem de Nor",
        "tipo": "Construto Médio",
        "nd": "1",
        "iniciativa": "+3",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "17",
        "fort": "+11",
        "ref": "–1",
        "von": "+5",
        "defesaObs": "imunidade a frio, redução de fogo 10",
        "pv": "35",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "0",
            "con": "3",
            "int": "—",
            "sab": "0",
            "car": "–5"
        },
        "ataques": [
            {
                "nome": "Espada longa",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d8+8, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Escudo de Gelo (Padrão)",
                "tipo": "Habilidade",
                "desc": "Uma vez por cena, o golem de Nor recebe 25 PV temporários. Se uma criatura acertar um ataque corpo a corpo contra o golem enquanto ele tiver estes PV temporários, ela fica enredada (Fort CD 14 evita)."
            }
        ],
        "pericias": [],
        "tesouro": "Nenhum",
        "equipamento": "Escudo pesado, espada longa",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Thalassa",
        "tipo": "Humanoide (sereia) Médio",
        "nd": "5",
        "iniciativa": "+12",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "24",
        "fort": "+5",
        "ref": "+11",
        "von": "+17",
        "defesaObs": "redução de frio 30",
        "pv": "200",
        "desl": "9m (6q)",
        "pm": "25",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "3",
            "int": "2",
            "sab": "2",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Tridente certeiro x2",
                "tipo": "Corpo a Corpo ou À Distância",
                "bonus": "+17",
                "dano": "1d8+5 mais 2d10 frio, 18",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Armas Árticas (Movimento)",
                "tipo": "Habilidade",
                "desc": "Thalassa pode criar uma arma simples ou marcial de uma mão com uma melhoria, feita de gelo. A arma dura até o final da cena, conta como uma arma mágica e causa 2d10 pontos de dano adicionais de frio, além de seu dano normal."
            },
            {
                "nome": "Magia Gélida",
                "tipo": "Qualidade",
                "desc": "Thalassa soma seu Carisma no dano de magias que causem dano de frio (já contabilizado)."
            },
            {
                "nome": "Durona (Reação)",
                "tipo": "Habilidade",
                "desc": "Sempre que sofre dano, Thalassa pode reduzir esse dano à metade. Recarga (fazer um acerto crítico com o tridente ou outra arma ártica)."
            },
            {
                "nome": "Especialista em Conchas",
                "tipo": "Qualidade",
                "desc": "Thalassa sempre pode escolher 10 quando joga conchas e recebe +4 em seus testes de Jogatina quando faz isso."
            },
            {
                "nome": "Mestra de Tridentes",
                "tipo": "Qualidade",
                "desc": "Thalassa recebe um bônus de +2 em ataques e na margem de ameaça com tridentes (já contabilizado)."
            },
            {
                "nome": "Magia Ártica",
                "tipo": "Habilidade",
                "desc": "Como uma barda de 5º nível (CD 20). Curar Ferimentos (Padrão, 5 PM): Uma criatura adjacente cura 6d8+6 PV. Dardo Gélido (Padrão, 5 PM): Uma criatura em alcance curto sofre 6d6+5 pontos de dano de frio e fica lenta por 1 rodada (Ref reduz à metade e evita a condição). Sopro das Uivantes (Padrão, 4 PM): Criaturas em um cone de 9m sofrem 6d6+5 pontos de dano de frio e, se forem Médias ou menores, ficam caídas e são empurradas 6m na direção oposta."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+7"
            },
            {
                "nome": "Jogatina",
                "valor": "+9 (+13 com conchas)"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Tridente certeiro",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Lobo Branco",
        "tipo": "Animal Médio",
        "nd": "1/2",
        "iniciativa": "+5",
        "percepcao": "+6",
        "percepcaoObs": "faro, visão na penumbra",
        "defesa": "14",
        "fort": "+6",
        "ref": "+3",
        "von": "+1",
        "defesaObs": "",
        "pv": "14",
        "desl": "15m (10q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "3",
            "con": "3",
            "int": "–4",
            "sab": "2",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6+5",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Derrubar (Livre)",
                "tipo": "Habilidade",
                "desc": "Se o lobo acertar um ataque de mordida, pode fazer a manobra derrubar (teste +7)."
            },
            {
                "nome": "Táticas de Alcateia",
                "tipo": "Qualidade",
                "desc": "Quando flanqueia um inimigo, o lobo recebe +2 no teste de ataque e na rolagem de dano (além do bônus normal por flanquear, para um total de +4 no ataque e +2 no dano)."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+5 (+10 na neve)"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+6"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Cultista de Kallyadranoch",
        "tipo": "Humanoide Médio",
        "nd": "1/2",
        "iniciativa": "+4",
        "percepcao": "+2",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "13",
        "fort": "+3",
        "ref": "+0",
        "von": "+5",
        "defesaObs": "",
        "pv": "6",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "2",
            "con": "1",
            "int": "0",
            "sab": "0",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Adaga cruel x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d4+3, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Sopro de Dragão (Padrão)",
                "tipo": "Habilidade",
                "desc": "Criaturas em um cone de 6m sofrem 2d10 pontos de dano de frio, e ficam lentas por 1d4 rodadas (Ref CD 13 reduz à metade e evita a condição). Recarga (um outro cultista ser reduzido a 0 PV)."
            }
        ],
        "pericias": [],
        "tesouro": "Padrão",
        "equipamento": "Adaga cruel, armadura de couro",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Cerise",
        "tipo": "Monstro (kallyanach) Médio",
        "nd": "3",
        "iniciativa": "+4",
        "percepcao": "+7",
        "percepcaoObs": "visão no escuro",
        "defesa": "19",
        "fort": "+10",
        "ref": "+3",
        "von": "+14",
        "defesaObs": "redução de frio 10",
        "pv": "60",
        "desl": "9m (6q)",
        "pm": "29",
        "atributos": {
            "for": "1",
            "des": "1",
            "con": "2",
            "int": "1",
            "sab": "4",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+13",
                "dano": "1d8+3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura de Medo (Livre, 2 PM)",
                "tipo": "Habilidade",
                "desc": "Cerise gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrarem na aura ficam abalados até o fim da cena (Von CD 19 evita e a criatura fica imune a esta habilidade por um dia)."
            },
            {
                "nome": "Servos do Dragão (Completa, 2 PM)",
                "tipo": "Habilidade",
                "desc": "Cerise invoca 2d4+1 kobolds, que surgem em espaços desocupados em alcance curto. Quando são invocados, e no início de cada turno da acólita, cada kobold pode se mover 9m ou causar 1d6–1 pontos de dano de corte em uma criatura adjacente. Os kobolds têm For –1, Des 4, 1 PV, Defesa 12 e falham automaticamente em testes opostos e de resistência."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como um clérigo de Kallyadranoch de 5º nível (CD 19). Comando (Padrão, 2 PM): Cerise ordena a uma criatura em alcance curto que se ajoelhe. A criatura fica caída e não pode se levantar até o começo de seu próximo turno (Von evita). Escudo da Fé (Reação, 1 PM): Uma criatura em alcance curto recebe +2 na Defesa por 1 turno. Perdição (Padrão, 3 PM): Criaturas escolhidas em alcance curto sofrem –2 em testes de ataque e rolagens de dano até o fim da cena. Sopro das Uivantes (Padrão, 3 PM): Criaturas em um cone de 9m sofrem 4d6 pontos de dano de frio e, se forem Médias ou menores, ficam caídas e são empurradas 6m na direção oposta."
            }
        ],
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+9"
            },
            {
                "nome": "Misticismo",
                "valor": "+4"
            },
            {
                "nome": "Religião",
                "valor": "+9"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Gibão de peles, símbolo sagrado de Kallyadranoch",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Hip Higgarin",
        "tipo": "Humanoide (hynne) Pequeno",
        "nd": "5",
        "iniciativa": "+9",
        "percepcao": "+8",
        "percepcaoObs": "",
        "defesa": "27",
        "fort": "+5",
        "ref": "+17",
        "von": "+11",
        "defesaObs": "",
        "pv": "140",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "5",
            "con": "2",
            "int": "2",
            "sab": "4",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Machadinha precisa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d6+7 corte, 19/x3",
                "desc": ""
            },
            {
                "nome": "Bola de neve x4",
                "tipo": "À Distância",
                "bonus": "+17",
                "dano": "2d6+4 frio, alcance médio",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Campeão de Arremesso",
                "tipo": "Qualidade",
                "desc": "Hip guarda e saca bolas de neve e armas de arremesso como uma ação livre, e o alcance de seus ataques com essas armas aumenta em uma categoria (já contabilizado). Ele também pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque."
            },
            {
                "nome": "Saraivada Congelante",
                "tipo": "Qualidade",
                "desc": "Uma criatura atingida na mesma rodada por duas ou mais bolas de neve arremessadas por Hip fica lenta por 1 rodada (Fort CD 20 evita)."
            },
            {
                "nome": "Sorte Salvadora",
                "tipo": "Qualidade",
                "desc": "Uma vez por cena, quando faz um teste de resistência, Hip pode rolar este teste novamente."
            },
            {
                "nome": "Mira Apurada (Movimento)",
                "tipo": "Habilidade",
                "desc": "Hip recebe +2 na margem de ameaça e +1 no multiplicador de crítico com bolas de neve e armas de arremesso até o fim do turno."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+9"
            },
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Diplomacia",
                "valor": "+10"
            },
            {
                "nome": "Enganação",
                "valor": "+10"
            },
            {
                "nome": "Furtividade",
                "valor": "+11"
            },
            {
                "nome": "Ladinagem",
                "valor": "+9"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+8"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Armadura de couro defensora, machadinha precisa",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kallyagrai do Frio Superior",
        "tipo": "Espírito Grande",
        "nd": "3",
        "iniciativa": "+1",
        "percepcao": "+5",
        "percepcaoObs": "visão no escuro",
        "defesa": "22",
        "fort": "+15",
        "ref": "+10",
        "von": "+2",
        "defesaObs": "imunidade a frio, vulnerabilidade a fogo",
        "pv": "100",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "1",
            "con": "5",
            "int": "–2",
            "sab": "2",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Garras x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d10+5",
                "desc": ""
            },
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d12+8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Caminhada Ártica",
                "tipo": "Qualidade",
                "desc": "O kallyagrai do frio superior ignora terreno difícil em terreno ártico ou em outros terrenos quando o solo está coberto de neve ou gelo."
            },
            {
                "nome": "Forma de Névoa (Completa)",
                "tipo": "Habilidade",
                "desc": "O kallyagrai se transforma em uma pequena nuvem gélida. Nessa forma, seu deslocamento se torna voo 6m, ele recebe imunidade a dano não mágico de corte, impacto e perfuração, e pode passar por qualquer fresta por onde ar poderia passar, mas não pode carregar itens. Além disso, nessa forma ele pode ocupar o mesmo espaço que outras criaturas e qualquer criatura que comece seu próprio turno no mesmo espaço que ele sofre 3d8 pontos de dano de frio (Fort CD 17 evita). Recarga (devorar o coração de um humanoide)."
            },
            {
                "nome": "Sopro Gelido (Padrão)",
                "tipo": "Habilidade",
                "desc": "O kallyagrai sopra ar gélido em um cone de 9m, causando 4d10 pontos de dano de frio (Fort CD 17 reduz à metade). Criaturas de tamanho Grande ou menor que falhem na resistência ficam caídas e são empurradas 6m na direção oposta. Recarga (movimento)."
            }
        ],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kobold Corajoso",
        "tipo": "Monstro (kobold) Pequeno",
        "nd": "1",
        "iniciativa": "+4",
        "percepcao": "+0",
        "percepcaoObs": "sensibilidade a luz, visão no escuro",
        "defesa": "15",
        "fort": "+0",
        "ref": "+5",
        "von": "+11",
        "defesaObs": "resistência a medo +2",
        "pv": "45",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "3",
            "con": "2",
            "int": "–1",
            "sab": "0",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Cimitarra cruel precisa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d6+4, 17",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aqui Tem Coragem (Reação)",
                "tipo": "Habilidade",
                "desc": "Quando o kobold corajoso fizer um acerto crítico, pode fazer um ataque com sua cimitarra."
            },
            {
                "nome": "Pequeno, Mas Ruim",
                "tipo": "Qualidade",
                "desc": "Quando faz uma investida, o kobold não sofre penalidade na Defesa e não precisa percorrer uma linha reta."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+4"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Brunea, cimitarra cruel precisa, escudo grande",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Borr",
        "tipo": "Humanoide (humano) Médio",
        "nd": "1",
        "iniciativa": "+0",
        "percepcao": "+0",
        "percepcaoObs": "",
        "defesa": "14",
        "fort": "+6",
        "ref": "+3",
        "von": "–1",
        "defesaObs": "",
        "pv": "70",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "0",
            "con": "2",
            "int": "0",
            "sab": "0",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado x2",
                "tipo": "Corpo a Corpo",
                "bonus": "",
                "dano": "1d6+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Dá Uma Cabeçada Nele",
                "tipo": "Qualidade",
                "desc": "Quando Borr faz um acerto crítico, seus compatriotas gritam para que ele dê uma cabeçada em seus inimigos. Ele faz um ataque desarmado como uma ação livre e, caso acerte, a vítima fica atordoada por 1 rodada (Fort CD 14 evita a condição)."
            },
            {
                "nome": "Vaidoso",
                "tipo": "Qualidade",
                "desc": "Se alguma criatura em alcance curto de Borr tiver ofendido sua aparência, principalmente falando de sua calvície, ele escolhe essa criatura como alvo de seus ataques e recebe +2 nos testes de ataque e nas rolagens de dano contra ela."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Intimidação",
                "valor": "+4"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+3"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Gibão de peles, machado de batalha",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Minotauro da Manada Adolescente",
        "tipo": "Humanoide (minotauro) Médio",
        "nd": "1/2",
        "iniciativa": "+10",
        "percepcao": "+8",
        "percepcaoObs": "faro",
        "defesa": "13",
        "fort": "+5",
        "ref": "+0",
        "von": "+0",
        "defesaObs": "",
        "pv": "6",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "0",
            "con": "1",
            "int": "–2",
            "sab": "–2",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Clava",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d8+3",
                "desc": ""
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d4+2",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Paus e Pedras",
                "tipo": "Qualidade",
                "desc": "O minotauro adolescente pode empunhar clavas com as duas mãos, como se fosse uma arma versátil, aumentando seu dano em um passo (já incluso). Além disso, o minotauro adolescente pode arremessar pedras em alcance curto, usando as duas mãos. Um alvo atingido por uma pedra deve fazer um teste de Reflexos (CD 13) ou fica caído."
            },
            {
                "nome": "Furor da Juventude (Reação)",
                "tipo": "Habilidade",
                "desc": "Quando reduz um inimigo a zero pontos de vida ou faz um acerto crítico, um minotauro da manada adolescente pode se mover metade do seu deslocamento."
            },
            {
                "nome": "Valentão",
                "tipo": "Qualidade",
                "desc": "O minotauro recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos."
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
        "tesouro": "Nenhum",
        "equipamento": "Clava, gibão de peles",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Frisiano",
        "tipo": "Humanoide (minauro) Médio",
        "nd": "1",
        "iniciativa": "+6",
        "percepcao": "+2",
        "percepcaoObs": "faro",
        "defesa": "14",
        "fort": "+0",
        "ref": "+11",
        "von": "+5",
        "defesaObs": "",
        "pv": "25",
        "desl": "9m (6q)",
        "pm": "12",
        "atributos": {
            "for": "3",
            "des": "2",
            "con": "2",
            "int": "2",
            "sab": "0",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d4+2, 19",
                "desc": ""
            },
            {
                "nome": "Chifres",
                "tipo": "Corpo a Corpo",
                "bonus": "+7",
                "dano": "1d6+2",
                "desc": ""
            },
            {
                "nome": "Adaga",
                "tipo": "À Distância",
                "bonus": "+10",
                "dano": "1d4+2, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo +2d6",
                "tipo": "Qualidade",
                "desc": "Uma vez por rodada, causa +2d6 pontos de dano com ataques corpo a corpo ou à distância em alcance curto contra alvos desprevenidos ou que esteja flanqueando."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como um bardo de 3º nível (CD 16). Adaga Mental (Padrão, 3 PM): Uma criatura em alcance curto sofre 3d6 pontos de dano psíquico e fica atordoada por 1 rodada (Von reduz o dano à metade e evita a condição). Uma criatura só pode ser atordoada por esta magia uma vez por cena. Amedrontar (Padrão, 3 PM): Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas). Invisibilidade (Padrão, 3 PM): Frisiano fica invisível por 1 rodada ou até realizar uma ação hostil. Ele recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques. Leque Cromático (Padrão, 3 PM): Animais e humanoides em um cone de 4,5m ficam atordoados por 1 rodada (apenas uma vez por cena, Von evita), ofuscadas e vulneráveis."
            },
            {
                "nome": "Velocidade Ladina (2 PM)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, Frisiano executa uma ação de movimento adicional em seu turno."
            }
        ],
        "pericias": [
            {
                "nome": "Enganação",
                "valor": "+4"
            },
            {
                "nome": "Furtividade",
                "valor": "+4"
            },
            {
                "nome": "Ladinagem",
                "valor": "+4"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Adaga x2, armadura de couro",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Serpe Branca",
        "tipo": "Monstro Grande",
        "nd": "4",
        "iniciativa": "+6",
        "percepcao": "+5",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "23",
        "fort": "+16",
        "ref": "+10",
        "von": "+4",
        "defesaObs": "imunidade a paralisia, redução de frio 20, vulnerabilidade a fogo",
        "pv": "140",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "5",
            "int": "–2",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+10",
                "desc": ""
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d8+5 e veneno",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado (Livre)",
                "tipo": "Habilidade",
                "desc": "Se a serpe branca acertar um ataque de mordida, pode fazer a manobra agarrar (teste +16)."
            },
            {
                "nome": "Aperto Gelado",
                "tipo": "Qualidade",
                "desc": "Uma vítima agarrada pela serpe branca fica lenta por uma rodada (Fort CD 18 evita)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fort CD 20 reduz a duração para uma rodada)."
            }
        ],
        "pericias": [],
        "tesouro": "1d4 doses de peçonha concentrada (CD 20 para extrair)",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Mineiros Bêbados",
        "tipo": "Humanoide (bando, humano) Grande",
        "nd": "2",
        "iniciativa": "–1",
        "percepcao": "–2",
        "percepcaoObs": "",
        "defesa": "19",
        "fort": "+13",
        "ref": "+0",
        "von": "+5",
        "defesaObs": "",
        "pv": "70",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "0",
            "con": "2",
            "int": "0",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "[bando] Pancadaria",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "5d6+1",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Bando",
                "tipo": "Qualidade",
                "desc": "Se um ataque do bando de mineiros bêbados exceder a Defesa do inimigo por 10 ou mais, ele causa o dobro do dano. Se um ataque do bando errar, ele ainda assim causa metade do dano. Um bando é imune a manobras de combate e efeitos que afetam apenas uma criatura e não causam dano, mas tem vulnerabilidade a dano de área (sofre 50% a mais de dano). Um personagem com o poder Trespassar que acerte a criatura pode usá-lo para fazer um ataque adicional contra ela (mas apenas uma vez por turno)."
            },
            {
                "nome": "Bêbados De Cair",
                "tipo": "Qualidade",
                "desc": "O bando sofre –2 em testes de perícias baseadas em Destreza e Sabedoria (já contabilizado)."
            }
        ],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Durgalinn Trança-Castanha",
        "tipo": "Humanoide (anão) Médio",
        "nd": "4",
        "iniciativa": "+2",
        "percepcao": "+5",
        "percepcaoObs": "+7 no subterrâneo, visão no escuro",
        "defesa": "23",
        "fort": "+16",
        "ref": "+4",
        "von": "+10",
        "defesaObs": "resistência a encantamento +2",
        "pv": "143",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "–1",
            "con": "5",
            "int": "0",
            "sab": "2",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Machado anão x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+16",
                "dano": "1d10+6, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Motivação Bruta (Movimento)",
                "tipo": "Habilidade",
                "desc": "Durgalinn concede 2d6 PV temporários para um aliado em alcance curto que possa vê-lo e ouvi-lo. Uma criatura só pode se beneficiar dessa habilidade uma vez por cena."
            },
            {
                "nome": "Aproveite a Brecha (Reação)",
                "tipo": "Habilidade",
                "desc": "Quando um aliado em alcance médio faz um acerto crítico, Durgalinn usa sua reação para fazer outro aliado em alcance médio realizar um ataque contra o mesmo alvo."
            }
        ],
        "pericias": [
            {
                "nome": "Diplomacia",
                "valor": "+9"
            },
            {
                "nome": "Intimidação",
                "valor": "+9"
            },
            {
                "nome": "Guerra",
                "valor": "+6"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Escudo pesado, machado anão, meia armadura",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Dame Lia",
        "tipo": "Monstro (medusa) Médio",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "27",
        "fort": "+6",
        "ref": "+12",
        "von": "+18",
        "defesaObs": "resistência a veneno +5",
        "pv": "244",
        "desl": "6m (4q)",
        "pm": "18",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "4",
            "int": "0",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Mangual certeiro x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+18",
                "dano": "2d8+10 mais veneno",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Baluarte (Reação, 1 PM)",
                "tipo": "Habilidade",
                "desc": "Quando Dame Lia sofre um ataque ou faz um teste de resistência, ela recebe +2 na Defesa e nos testes de resistência até o início do seu próximo turno."
            },
            {
                "nome": "Duelo (Livre, 2 PM)",
                "tipo": "Habilidade",
                "desc": "Lia recebe +2 em testes de ataque e rolagens de dano contra um oponente a sua escolha em alcance curto. Este bônus dura até o fim da cena ou até ela atacar outro oponente."
            },
            {
                "nome": "Nascida na Sela",
                "tipo": "Qualidade",
                "desc": "Lia passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano, e não sofre penalidades para atacar à distância enquanto montada. Além disso, quando faz uma investida montada, ela pode fazer dois ataques com seu mangual, causa +2d8 pontos de dano em cada um deles e pode continuar se movendo depois do ataque."
            },
            {
                "nome": "Olhar Atordoante (Movimento, 1 PM)",
                "tipo": "Habilidade",
                "desc": "Uma criatura em alcance curto fica atordoada por 1 rodada (apenas uma vez por cena; Fort CD 22 evita)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Perde 1d12 pontos de vida."
            },
            {
                "nome": "Víbora (Parceiro Veterano)",
                "tipo": "Qualidade",
                "desc": "Dame Lia cavalga Víbora, um cavalo de guerra. Enquanto estiver montada, seu deslocamento se torna 15m, ela recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 nos testes de ataque corpo a corpo. Voar é Viver: Enquanto Lia está montada em Víbora, a égua desenvolve um par de asas mágicas brilhantes, concedendo deslocamento de voo 18m e resistência mental +5."
            }
        ],
        "pericias": [
            {
                "nome": "Adestramento",
                "valor": "+12"
            },
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Cavalgar",
                "valor": "+12"
            },
            {
                "nome": "Diplomacia",
                "valor": "+9"
            },
            {
                "nome": "Guerra",
                "valor": "+4"
            },
            {
                "nome": "Nobreza",
                "valor": "+4"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Escudo pesado, mangual certeiro, armadura completa",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Ogra Escravizada",
        "tipo": "Humanoide (gigante) Grande",
        "nd": "4",
        "iniciativa": "+3",
        "percepcao": "+1",
        "percepcaoObs": "visão na penumbra",
        "defesa": "23",
        "fort": "+16",
        "ref": "+10",
        "von": "+0",
        "defesaObs": "resistência a mental +2",
        "pv": "126",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "1",
            "con": "4",
            "int": "–1",
            "sab": "0",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Porrete",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d8+12",
                "desc": ""
            }
        ],
        "habilidades": [],
        "pericias": [],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Sir Aegoron",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "13",
        "iniciativa": "+18",
        "percepcao": "+13",
        "percepcaoObs": "visão no escuro",
        "defesa": "44",
        "fort": "+26",
        "ref": "+26",
        "von": "+13",
        "defesaObs": "resistência a encantamento e paralisia +5, redução de dano 10",
        "pv": "650",
        "desl": "6m (4q), voo 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "5",
            "con": "3",
            "int": "0",
            "sab": "1",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Cimitarra ameaçadora precisa de mitral x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+37",
                "dano": "4d8+25, 13",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Cavaleiro Cerúleo",
                "tipo": "Qualidade",
                "desc": "Aegoron passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano, e não sofre penalidades para atacar à distância enquanto montado. Além disso, quando faz uma investida montada, ele pode fazer três ataques com sua cimitarra, causando +2d8 pontos de dano em cada um deles e podendo continuar se movendo depois do ataque."
            },
            {
                "nome": "Céu É Tudo Aquilo Acima do Chão (Movimento)",
                "tipo": "Habilidade",
                "desc": "Aegoron pode fazer um teste de Acrobacia com CD igual à Defesa de um inimigo em alcance curto. Caso tenha sucesso, até o final da rodada, todos os seus ataques contra esse inimigo recebem os benefícios de uma investida, sem que precise usar a ação investida. Recarga (movimento)."
            },
            {
                "nome": "Proteger Sempre",
                "tipo": "Qualidade",
                "desc": "Quando Aegoron encerra seu turno a até 1,5m de quaisquer aliados, esses aliados recebem +2 na Defesa e em Reflexos por uma rodada."
            },
            {
                "nome": "Vendaval",
                "tipo": "Qualidade",
                "desc": "Aegoron cavalga Vendaval, um cavalo de guerra. Enquanto estiver montado, seu deslocamento se torna 15m, ele recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 nos testes de ataque corpo a corpo."
            },
            {
                "nome": "Voar é Viver",
                "tipo": "Qualidade",
                "desc": "Enquanto Sir Aegoron está montado em Vendaval, o cavalo desenvolve um par de asas mágicas brilhantes, concedendo deslocamento de voo 18m e resistência a mental +5."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+18"
            },
            {
                "nome": "Atletismo",
                "valor": "+18"
            },
            {
                "nome": "Cavalgar",
                "valor": "+22"
            },
            {
                "nome": "Diplomacia",
                "valor": "+15"
            },
            {
                "nome": "Guerra",
                "valor": "+12"
            },
            {
                "nome": "Ofício",
                "valor": "+20"
            },
            {
                "nome": "Nobreza",
                "valor": "+12"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa defensora sob medida de mitral, cimitarra ameaçadora precisa de mitral, escudo pesado defensor sob medida de mitral",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Cavaleiro Iniciante",
        "tipo": "Humanoide (humano) Médio",
        "nd": "3",
        "iniciativa": "+3",
        "percepcao": "+3",
        "percepcaoObs": "",
        "defesa": "22",
        "fort": "+16",
        "ref": "+3",
        "von": "+8",
        "defesaObs": "resistência a medo +2",
        "pv": "100",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "3",
            "int": "0",
            "sab": "1",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+12",
                "dano": "1d8+6, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Cavaleiro Iniciante",
                "tipo": "Qualidade",
                "desc": "O cavaleiro iniciante passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano, e não sofre penalidades para atacar à distância enquanto montado."
            },
            {
                "nome": "Corcel de Batalha",
                "tipo": "Qualidade",
                "desc": "O cavaleiro cavalga um cavalo de guerra. Enquanto ele estiver montado, seu deslocamento se torna 15m, ele recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 nos testes de ataque corpo a corpo."
            },
            {
                "nome": "Duelo (Livre)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, o cavaleiro escolhe um oponente em alcance curto e recebe +2 em testes de ataque e rolagens de dano contra ele até o fim da cena ou até atacar outro oponente."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Cavalgar",
                "valor": "+4"
            },
            {
                "nome": "Diplomacia",
                "valor": "+6"
            },
            {
                "nome": "Guerra",
                "valor": "+3"
            },
            {
                "nome": "Nobreza",
                "valor": "+3"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Cavalo de guerra, escudo pesado, espada longa, meia armadura",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Dennis Stramm",
        "tipo": "Humanoide (humano) Médio",
        "nd": "7",
        "iniciativa": "+8",
        "percepcao": "+8",
        "percepcaoObs": "",
        "defesa": "31",
        "fort": "+20",
        "ref": "+7",
        "von": "+14",
        "defesaObs": "resistência a medo +6",
        "pv": "280",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "1",
            "con": "6",
            "int": "0",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada longa x3",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "3d8+6, 19",
                "desc": ""
            },
            {
                "nome": "Besta leve",
                "tipo": "À Distância",
                "bonus": "+20",
                "dano": "2d8, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Durão (Reação)",
                "tipo": "Habilidade",
                "desc": "Quando sofre dano, Dennis Stramm reduz esse dano à metade. Recarga (fazer um acerto crítico)."
            },
            {
                "nome": "Instruir (Movimento)",
                "tipo": "Habilidade",
                "desc": "Dennis faz um teste de Guerra para ajudar o próximo teste de ataque, feito em até uma rodada, de um aliado em alcance curto que possa ouvi-lo."
            }
        ],
        "pericias": [
            {
                "nome": "Guerra",
                "valor": "+22"
            },
            {
                "nome": "Intimidação",
                "valor": "+18"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura completa, besta leve, escudo pesado, espada longa",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Hanalendariana",
        "tipo": "Humanoide (elfo) Médio",
        "nd": "17",
        "iniciativa": "+22",
        "percepcao": "+16",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesa": "55",
        "fort": "+20",
        "ref": "+17",
        "von": "+24",
        "defesaObs": "cura acelerada 5, imunidade a efeitos de atordoamento, cansaço, dano de eletricidade, metamorfose e paralisia, resistência a magia +5",
        "pv": "1.000",
        "desl": "12m (8q), voo 24m (16q)",
        "pm": "0",
        "atributos": {
            "for": "2",
            "des": "8",
            "con": "4",
            "int": "2",
            "sab": "2",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Espada enigma de mitral precisa elétrica magnífica x4",
                "tipo": "Corpo a Corpo",
                "bonus": "+47",
                "dano": "6d6+10, 15, mais 4d6 eletricidade, alcance 3m",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Asas da Tempestade (Padrão)",
                "tipo": "Habilidade",
                "desc": "Todas as criaturas em alcance curto sofrem 6d6 pontos de dano de impacto e ficam caídas devido aos ventos fortes (Ref CD 44 reduz à metade e evita a condição). Recarga (passar uma rodada sem voar)."
            },
            {
                "nome": "Mestra dos Enigmas",
                "tipo": "Qualidade",
                "desc": "Hana passa automaticamente em testes de Conhecimento para mudar a forma de uma espada enigma. Ela pode mudar as formas como uma ação livre e, quando a arremessa em forma de lua crescente, a arma retorna para a sua mão imediatamente depois do ataque."
            },
            {
                "nome": "Reflexos Perfeitos (Reação)",
                "tipo": "Habilidade",
                "desc": "Quando sofre dano de um ataque corpo a corpo, Hana evita esse dano e faz com que o atacante seja considerado desprevenido contra o próximo ataque dela, desde que feito em até 1 rodada. Recarga (fazer um acerto crítico)."
            },
            {
                "nome": "Relâmpago e Trovão",
                "tipo": "Qualidade",
                "desc": "Quando Hana faz um acerto crítico com sua espada enigma, a vítima fica atordoada por uma rodada (Fort CD 44 evita) e um raio é disparado da vítima até outro inimigo em alcance curto. Esse inimigo sofre 8d6 pontos de dano de eletricidade (Ref CD 44 reduz à metade)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+20"
            },
            {
                "nome": "Conhecimento",
                "valor": "+21"
            },
            {
                "nome": "Diplomacia",
                "valor": "+18"
            },
            {
                "nome": "Furtividade",
                "valor": "+20"
            },
            {
                "nome": "Intuição",
                "valor": "+16"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+16"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Anel da regeneração, couraça de mitral defensora, espada enigma de mitral precisa elétrica magnífica",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kallyagrai do Veneno Inferior",
        "tipo": "Espírito Médio",
        "nd": "1",
        "iniciativa": "+7",
        "percepcao": "+1",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesa": "17",
        "fort": "+5",
        "ref": "+11",
        "von": "+0",
        "defesaObs": "imunidade a veneno",
        "pv": "35",
        "desl": "12m (8q), escalada 6m (4q), natação 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "5",
            "con": "3",
            "int": "0",
            "sab": "1",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Garras x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "1d8",
                "desc": ""
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+9",
                "dano": "2d8",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Venenosa",
                "tipo": "Qualidade",
                "desc": "Criaturas que comecem seus turnos a 1,5m do kallyagrai do veneno inferior perdem 1d12 pontos de vida por veneno e ficam fracas (Fort CD 14 reduz a perda de vida à metade e evita a condição)."
            },
            {
                "nome": "Cuspe Pegajoso (Padrão)",
                "tipo": "Habilidade",
                "desc": "Uma criatura em alcance curto fica enredada por 1d4 rodadas (Ref CD 14 evita)."
            },
            {
                "nome": "Explosão de Esporos (Padrão)",
                "tipo": "Habilidade",
                "desc": "Todas as criaturas em alcance curto do kallyagrai perdem 2d12 pontos de vida por veneno e ficam fracas (Fort CD 14 reduz a perda de vida à metade e evita a condição). Recarga (usar uma ação completa para devorar o coração de um humanoide)."
            },
            {
                "nome": "Fim Tóxico",
                "tipo": "Qualidade",
                "desc": "Quando um kallyagrai é reduzido a 0 PV, seu corpo explode em uma nuvem venenosa. Criaturas em um raio de 9m perdem 2d12 pontos de vida por veneno e ficam fracas (Fort CD 14 reduz a perda de vida à metade e evita a condição)."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+9"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kallyagrai do Veneno Superior",
        "tipo": "Espírito Médio",
        "nd": "6",
        "iniciativa": "+12",
        "percepcao": "+6",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesa": "28",
        "fort": "+12",
        "ref": "+18",
        "von": "+6",
        "defesaObs": "imunidade a veneno",
        "pv": "220",
        "desl": "12m (8q), escalada 6m (4q), natação 6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "0",
            "des": "5",
            "con": "3",
            "int": "0",
            "sab": "1",
            "car": "–2"
        },
        "ataques": [
            {
                "nome": "Garras x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d8+7",
                "desc": ""
            },
            {
                "nome": "Cauda",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "4d8+7",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Venenosa",
                "tipo": "Qualidade",
                "desc": "Criaturas que comecem seus turnos a 1,5m do kallyagrai do veneno superior perdem 4d12 pontos de vida por veneno e ficam fracas (Fort CD 22 reduz a perda de vida à metade e evita a condição)."
            },
            {
                "nome": "Cuspe Pegajoso (Padrão)",
                "tipo": "Habilidade",
                "desc": "Uma criatura em alcance curto fica enredada por 1d4 rodadas (Ref CD 22 evita)."
            },
            {
                "nome": "Explosão de Esporos (Padrão)",
                "tipo": "Habilidade",
                "desc": "Todas as criaturas em alcance curto do kallyagrai perdem 6d12 pontos de vida por veneno e ficam fracas (Fort CD 22 reduz a perda de vida à metade e evita a condição). Recarga (usar uma ação padrão para devorar o coração de um humanoide)."
            },
            {
                "nome": "Derrubar (Livre)",
                "tipo": "Habilidade",
                "desc": "Se o kallyagrai acerta um ataque de cauda, pode fazer a manobra derrubar (teste +20)."
            },
            {
                "nome": "Fim Tóxico",
                "tipo": "Qualidade",
                "desc": "Quando um kallyagrai é reduzido a 0 PV, seu corpo explode em uma nuvem venenosa. Criaturas em um raio de 9m ao redor dele perdem 6d12 pontos de vida por veneno e ficam fracas (Fort CD 22 reduz a perda de vida à metade e evita a condição)."
            },
            {
                "nome": "Traiçoeiro",
                "tipo": "Qualidade",
                "desc": "O kallyagrai recebe +5 em testes de manobra com sua cauda contra criaturas envenenadas e não sofre redução em seu deslocamento por manter uma criatura agarrada com sua cauda."
            }
        ],
        "pericias": [
            {
                "nome": "Furtividade",
                "valor": "+12"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Serpe Jovem",
        "tipo": "Monstro Médio",
        "nd": "3",
        "iniciativa": "+5",
        "percepcao": "+5",
        "percepcaoObs": "faro, visão no escuro",
        "defesa": "20",
        "fort": "+9",
        "ref": "+15",
        "von": "+3",
        "defesaObs": "imunidade a paralisia",
        "pv": "120",
        "desl": "9m (6q), voo 18m (12q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "4",
            "int": "–2",
            "sab": "1",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Mordida",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+5",
                "desc": ""
            },
            {
                "nome": "Ferrão",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d8+5 mais veneno",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Agarrar Aprimorado (Livre)",
                "tipo": "Habilidade",
                "desc": "Mordida (teste +14)."
            },
            {
                "nome": "Veneno",
                "tipo": "Qualidade",
                "desc": "Peçonha concentrada (perde 1d12 pontos de vida por rodada durante 3 rodadas, Fort CD 17 reduz a duração para uma rodada)."
            }
        ],
        "pericias": [],
        "tesouro": "1d4 doses de peçonha concentrada (CD 18 para extrair)",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Uriel D'ohr Vousharr",
        "tipo": "Monstro (kallyanach) Médio",
        "nd": "6",
        "iniciativa": "+7",
        "percepcao": "+6",
        "percepcaoObs": "visão no escuro",
        "defesa": "23",
        "fort": "+12",
        "ref": "+6",
        "von": "+18",
        "defesaObs": "imunidade a veneno, redução de trevas 10",
        "pv": "250",
        "desl": "9m (6q), voo 18m (12q)",
        "pm": "42",
        "atributos": {
            "for": "4",
            "des": "2",
            "con": "4",
            "int": "2",
            "sab": "1",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Lança do guerreiro dragão",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d6+6 mais 2d6 trevas",
                "desc": ""
            },
            {
                "nome": "Lança do guerreiro dragão",
                "tipo": "À Distância",
                "bonus": "+20",
                "dano": "2d6+6 mais 2d6 trevas",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Contramágica Superior (Reação)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, quando vê uma magia ser lançada, Uriel faz uma contramágica. Se usar Dissipar Magia para isso, ele rola dois dados e usa o melhor resultado."
            },
            {
                "nome": "Dracomancia",
                "tipo": "Qualidade",
                "desc": "Quando lança uma magia ou usa Raio Arcano, Uriel recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno."
            },
            {
                "nome": "Lanceiro Místico",
                "tipo": "Qualidade",
                "desc": "Quando usa a ação agredir para atacar em corpo a corpo com a lança do guerreiro dragão, Uriel pode usar seu Raio Arcano, ou lançar uma magia com tempo de conjuração de uma ação padrão ou menor, como parte dessa ação. Além disso, ele soma seu Carisma nas rolagens de dano quando lança magias ou usa seu Raio Arcano (já contabilizado)."
            },
            {
                "nome": "Presença Aterradora (Padrão, 1 PM)",
                "tipo": "Habilidade",
                "desc": "Uriel faz um teste de Intimidação oposto à Vontade de criaturas em alcance curto. Aquelas que falharem no teste ficam abaladas até o fim da cena; se falharem por 10 ou mais também ficam apavoradas por 1 rodada."
            },
            {
                "nome": "Raio Arcano (Padrão, 1 PM)",
                "tipo": "Habilidade",
                "desc": "Uma criatura em alcance médio sofre 2d12+6 pontos de dano de trevas e não pode curar PV por uma rodada (Ref CD 24 reduz à metade e evita a restrição de cura)."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como um feiticeiro de 6º nível (CD 25). Armadura Arcana (Padrão, 3 PM): Uriel recebe +5 na Defesa por um dia. Crânio Voador de Vladislav (Padrão, 3 PM): Um crânio de energia negativa causa 4d8+6 pontos de dano de trevas em uma criatura em alcance médio e deixa o alvo e todas as criaturas a 3m dele abaladas (Fort reduz à metade e evita a condição). Campo de Força (Reação, 4 PM): Quando sofre dano, Uriel recebe redução de dano 30 contra este dano. Dissipar Magia (Padrão, 3 PM): Uriel escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas. Toque Vampírico (Padrão, 5 PM): Uriel faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 6d6+8 pontos de dano de trevas (Fort reduz à metade) e recupera pontos de vida iguais à metade do dano de trevas causado."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Intimidação",
                "valor": "+11"
            },
            {
                "nome": "Misticismo",
                "valor": "+9"
            }
        ],
        "tesouro": "Triplo",
        "equipamento": "Lança do guerreiro dragão",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Acácia",
        "tipo": "Humanoide (dahllan) Média",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+3",
        "percepcaoObs": "",
        "defesa": "24",
        "fort": "+17",
        "ref": "+11",
        "von": "+6",
        "defesaObs": "resistência a efeitos mentais e a medo",
        "pv": "205",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "3",
            "con": "3",
            "int": "0",
            "sab": "1",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Ataque desarmado x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "2d6+13, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Amiga das Plantas",
                "tipo": "Qualidade",
                "desc": "Uma vez por cena, Acácia pode lançar a magia Controlar Plantas (CD 20)."
            },
            {
                "nome": "Armadura de Allihanna (Movimento)",
                "tipo": "Habilidade",
                "desc": "Acácia transforma sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena."
            },
            {
                "nome": "Até Acertar",
                "tipo": "Qualidade",
                "desc": "Se Acácia errar um ataque desarmado, recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano desarmado contra o mesmo oponente. Os bônus terminam quando acertar um ataque ou no fim da cena, o que vier primeiro."
            },
            {
                "nome": "Punhos de Adamante",
                "tipo": "Qualidade",
                "desc": "Os ataques desarmados de Acácia ignoram 10 pontos de redução de dano."
            },
            {
                "nome": "Valentona",
                "tipo": "Qualidade",
                "desc": "Acácia recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+10"
            },
            {
                "nome": "Intimidação",
                "valor": "+10"
            },
            {
                "nome": "Pilotagem",
                "valor": "+7"
            }
        ],
        "tesouro": "Padrão",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Alvolis",
        "tipo": "Espírito (aggelus) Médio",
        "nd": "5",
        "iniciativa": "+7",
        "percepcao": "+3",
        "percepcaoObs": "visão no escuro",
        "defesa": "22",
        "fort": "+5",
        "ref": "+11",
        "von": "+17",
        "defesaObs": "resistência a efeitos mentais e a medo +5",
        "pv": "145",
        "desl": "9m (6q)",
        "pm": "25",
        "atributos": {
            "for": "–1",
            "des": "2",
            "con": "1",
            "int": "4",
            "sab": "2",
            "car": "5"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+15",
                "dano": "1d4+4, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Inspiração (Movimento, 3 PM)",
                "tipo": "Habilidade",
                "desc": "Alvolis inspira a si mesmo e a todos os seus aliados em alcance curto com a música de sua harpa, concedendo +2 em testes de perícia até o fim da cena."
            },
            {
                "nome": "Luz Sagrada",
                "tipo": "Qualidade",
                "desc": "Alvolis pode lançar Luz como uma magia divina (CD 22)."
            },
            {
                "nome": "Pesquisa Abençoada",
                "tipo": "Qualidade",
                "desc": "Se passar uma hora pesquisando livros e anotações, Alvolis pode rolar novamente um teste de perícia baseada em Inteligência ou Sabedoria que tenha feito desde a última cena. Se tiver acesso a mais livros, recebe um bônus no teste: +2 para uma coleção particular ou biblioteca pequena e +5 para a biblioteca de um templo ou universidade."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como um bardo de 5º nível (CD 22). Bola de Fogo (Padrão, 5 PM): Alvolis causa 8d6 pontos de dano de fogo em todas as criaturas em um raio de 6m em alcance médio (Ref reduz à metade). Campo de Força (Reação, 4 PM): Quando sofre dano, Alvolis recebe redução de dano 30 contra este dano. Despedaçar (Padrão, 5 PM): Um alvo em alcance curto sofre 3d8+6 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Explosão de Chamas (Padrão, 3 PM): Criaturas em um cone de 6m sofrem 3d6 pontos de dano de fogo e ficam em chamas (Ref reduz dano à metade e evita a condição). Sussurros Insanos (Padrão, 3 PM): Palavras desconexas proferidas por Alvolis deixam um humanoide em alcance curto confuso (Von evita a condição)."
            }
        ],
        "pericias": [
            {
                "nome": "Atuação",
                "valor": "+9"
            },
            {
                "nome": "Conhecimento",
                "valor": "+10"
            },
            {
                "nome": "Diplomacia",
                "valor": "+9"
            },
            {
                "nome": "Intuição",
                "valor": "+8"
            },
            {
                "nome": "Investigação",
                "valor": "+10"
            },
            {
                "nome": "Misticismo",
                "valor": "+10"
            },
            {
                "nome": "Nobreza",
                "valor": "+10"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Adaga certeira, armadura de couro reforçada ajustada, harpa angelical aprimorada",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Ária / Aranzirius",
        "tipo": "Monstro (dragão) Médio",
        "nd": "8",
        "iniciativa": "+11",
        "percepcao": "+11",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesa": "31",
        "fort": "+21",
        "ref": "+8",
        "von": "+15",
        "defesaObs": "imunidade a atordoamento, cansaço, eletricidade, metamorfose e paralisia, RD 5, resistência a magia +2, vulnerabilidade a ácido",
        "pv": "320",
        "desl": "9m (6q)",
        "pm": "54",
        "atributos": {
            "for": "7",
            "des": "2",
            "con": "6",
            "int": "2",
            "sab": "2",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Florete x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+7, 17/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Fintar (Movimento)",
                "tipo": "Habilidade",
                "desc": "Ária faz um teste de Enganação oposto ao teste de Reflexos de uma criatura em alcance curto. Se passar, a criatura fica desprevenida contra o próximo ataque de Ária, mas apenas até o fim de seu próximo turno."
            },
            {
                "nome": "Forma Dracônica",
                "tipo": "Qualidade",
                "desc": "Quando Ária é reduzida a 0 PV, se transforma em Aranzirius, a sua forma dracônica verdadeira, com PV e PM restaurados. Nesta forma, Ária se torna uma criatura Grande e perde seu ataque de florete, mas recebe: Deslocamento 12m (8q), natação 24m (16q). Corpo a Corpo Mordida +24 (3d6+30, 19) e duas garras +24 (1d8+10, 19). Sopro (Padrão): Todas as criaturas em uma linha de 12m sofrem 6d12 pontos de dano de eletricidade e ficam ofuscadas por 1d4 rodadas (Ref CD 28 reduz à metade e evita a condição). Cada vez que rolar o valor máximo em um dado de dano do sopro, rola um dado extra e some ao dano total dessa habilidade. Recarga (movimento)."
            },
            {
                "nome": "Magia de Combate",
                "tipo": "Qualidade",
                "desc": "Quando Ária lança uma magia, pode fazer dois ataques com seu florete."
            },
            {
                "nome": "Metamorfose Dracônica",
                "tipo": "Qualidade",
                "desc": "Ária pode se transformar em outras criaturas, como a magia Metamorfose (mas sem limitação para tamanhos menores que o seu). Se morta, reverte à sua forma original."
            },
            {
                "nome": "Petreaoxina",
                "tipo": "Qualidade",
                "desc": "Quando usa a magia Relâmpago, Ária pode gastar 1 PM para, uma vez por cena, deixar um alvo inconsciente por 1d6 dias."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como uma feiticeira de 8º nível (CD 28). Armadura Arcana (Reação, 8 PM): Ária recebe +8 na Defesa contra o próximo ataque que sofrer. Campo de Força (Reação, 4 PM): Quando sofre dano, Ária recebe redução de dano 30 contra este dano. Dissipar Magia (Padrão, 3 PM): Ária escolhe uma criatura, objeto ou esfera de 3m em alcance médio e faz um teste de Misticismo. Todas as magias nesse alvo com CD igual ou menor que o resultado do teste são dissipadas. Relâmpago (Padrão, 5 PM): Ária causa 8d6 pontos de dano de eletricidade em todas as criaturas em uma linha de 30m (Ref reduz à metade). Toque Chocante (Padrão, 8 PM): Ária faz um ataque corpo a corpo. Se acertar, além do dano normal, causa 7d8+7 pontos de dano de eletricidade. Velocidade (Padrão, 3 PM, sustentada): Ária pode executar uma ação padrão adicional por turno, que não pode ser usada para lançar magias."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+12"
            },
            {
                "nome": "Diplomacia",
                "valor": "+16"
            },
            {
                "nome": "Enganação",
                "valor": "+20"
            },
            {
                "nome": "Furtividade",
                "valor": "+20"
            },
            {
                "nome": "Ladinagem",
                "valor": "+20"
            },
            {
                "nome": "Misticismo",
                "valor": "+12"
            }
        ],
        "tesouro": "Dobro, 2 peças de couro de dragão (CD 22 para extrair)",
        "equipamento": "Armadura de couro, florete maciço de mitral",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Bárbaro Púrpura",
        "tipo": "Humanoide (humano) Médio",
        "nd": "2",
        "iniciativa": "+3",
        "percepcao": "+3",
        "percepcaoObs": "",
        "defesa": "15",
        "fort": "+12",
        "ref": "+7",
        "von": "+3",
        "defesaObs": "",
        "pv": "21",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "0",
            "con": "2",
            "int": "–1",
            "sab": "0",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Machado de guerra",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d12+8, x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Fúria Púrpura (Movimento)",
                "tipo": "Habilidade",
                "desc": "O bárbaro púrpura recebe 10 PV temporários e +2 em testes de ataque e rolagens de dano até o final da cena. Se passar uma rodada sem fazer um ataque ou ser alvo de uma habilidade ofensiva, a fúria se encerra. Recarga (fazer um acerto crítico)."
            }
        ],
        "pericias": [
            {
                "nome": "Sobrevivência",
                "valor": "+7"
            }
        ],
        "tesouro": "Metade",
        "equipamento": "Gibão de peles, machado de guerra",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Capitão Tabalinn",
        "tipo": "Humanoide (anão) Médio",
        "nd": "8",
        "iniciativa": "+12",
        "percepcao": "+8",
        "percepcaoObs": "+10 no subterrâneo, visão no escuro",
        "defesa": "31",
        "fort": "+20",
        "ref": "+14",
        "von": "+7",
        "defesaObs": "",
        "pv": "360",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "3",
            "des": "4",
            "con": "4",
            "int": "0",
            "sab": "0",
            "car": "3"
        },
        "ataques": [
            {
                "nome": "Machadinha x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+26",
                "dano": "3d8+20, x4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Coragem Ribeirinha",
                "tipo": "Qualidade",
                "desc": "Quando Tabalinn faz um acerto crítico ou reduz um inimigo a 0 PV, ele recebe 20 PV temporários, além de +2 em seus testes de ataque e rolagens de dano até o fim da cena."
            },
            {
                "nome": "Investida Acrobática (Completa)",
                "tipo": "Habilidade",
                "desc": "Tabalinn faz uma investida. Ele não precisa se mover em linha reta e pode fazer seus dois ataques de machadinha contra o alvo. Como parte dessa investida, ele faz um teste oposto de Acrobacia contra Reflexos do alvo. Se passar, Tabalinn recebe +5 na rolagem de dano de cada ataque dessa investida."
            },
            {
                "nome": "Mestre das Águas",
                "tipo": "Qualidade",
                "desc": "Tabalinn pode escolher 10 em testes de Pilotagem independente da situação."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+12"
            },
            {
                "nome": "Diplomacia",
                "valor": "+11"
            },
            {
                "nome": "Intimidação",
                "valor": "+10"
            },
            {
                "nome": "Pilotagem",
                "valor": "+12"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Armadura de couro reforçada ajustada, machadinhas de adamante maciça x2",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Veskaranda",
        "tipo": "Humanoide (meio-orc) Médio",
        "nd": "6",
        "iniciativa": "+6",
        "percepcao": "+4",
        "percepcaoObs": "+6 no subterrâneo, visão no escuro",
        "defesa": "26",
        "fort": "+19",
        "ref": "+10",
        "von": "+7",
        "defesaObs": "",
        "pv": "250",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "5",
            "des": "2",
            "con": "4",
            "int": "1",
            "sab": "0",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Espada longa x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+20",
                "dano": "2d8+14, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "Uma vez por rodada, quando atinge uma criatura desprevenida com um ataque corpo a corpo ou em alcance curto, ou uma criatura que esteja flanqueando, Veskaranda causa 3d6 pontos de dano extra."
            },
            {
                "nome": "Cutucar Vespeiro (Padrão)",
                "tipo": "Habilidade",
                "desc": "Veskaranda grita ordens para seus aliados em alcance médio. Eles recebem +5 em testes de ataque e +1d10 de dano por 1 rodada."
            },
            {
                "nome": "Ferrão da Vespa (Reação)",
                "tipo": "Habilidade",
                "desc": "Quando Veskaranda acerta um ataque furtivo, o alvo fica enjoado por 1 rodada (Fort CD 22 evita). Recarga (usar Cutucar Vespeiro)."
            }
        ],
        "pericias": [
            {
                "nome": "Conhecimento",
                "valor": "+7"
            },
            {
                "nome": "Intimidação",
                "valor": "+7"
            },
            {
                "nome": "Guerra",
                "valor": "+7"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+8"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Couraça, espada longa",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Trina",
        "tipo": "Humanoide (sereia) Médio",
        "nd": "7",
        "iniciativa": "+15",
        "percepcao": "+13",
        "percepcaoObs": "",
        "defesa": "29",
        "fort": "+7",
        "ref": "+20",
        "von": "+20",
        "defesaObs": "",
        "pv": "195",
        "desl": "9m (6q), natação 12m (8q)",
        "pm": "34",
        "atributos": {
            "for": "0",
            "des": "4",
            "con": "2",
            "int": "2",
            "sab": "2",
            "car": "6"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+22",
                "dano": "4d4+17, 19",
                "desc": ""
            },
            {
                "nome": "Adaga",
                "tipo": "À Distância",
                "bonus": "+22",
                "dano": "4d4+17, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo",
                "tipo": "Qualidade",
                "desc": "Uma vez por rodada, quando atinge uma criatura desprevenida com um ataque corpo a corpo ou em alcance curto, ou uma criatura que esteja flanqueando, Trina causa 10d6 pontos de dano extra."
            },
            {
                "nome": "Ambição Obstinada (3 PM)",
                "tipo": "Habilidade",
                "desc": "Trina rola novamente um teste recém realizado (apenas uma vez por teste)."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como uma barda de 7º nível (CD 26). Amedrontar (Padrão, 3 PM): Um animal ou humanoide em alcance curto fica apavorado por 1d4+1 rodadas e depois abalado (Von reduz para abalado por 1d4 rodadas). Despedaçar (Padrão, 7 PM): Um alvo em alcance curto sofre 4d8+8 pontos de dano de impacto se for uma criatura, ou o dobro disso sem aplicar RD se for um construto ou um objeto mundano Pequeno, e fica atordoado (Fort reduz à metade e evita a condição). Uma criatura só pode ficar atordoada por esta magia uma vez por cena."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+13"
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
                "nome": "Guerra",
                "valor": "+8"
            },
            {
                "nome": "Intimidação",
                "valor": "+11"
            }
        ],
        "tesouro": "Dobro",
        "equipamento": "Adaga atroz",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Zakkrad",
        "tipo": "Humanoide (hobgoblin) Médio",
        "nd": "7",
        "iniciativa": "+15",
        "percepcao": "+10",
        "percepcaoObs": "visão no escuro",
        "defesa": "31",
        "fort": "+13",
        "ref": "+20",
        "von": "+10",
        "defesaObs": "resistência a medo +5, redução de dano 5",
        "pv": "285",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "6",
            "con": "4",
            "int": "1",
            "sab": "3",
            "car": "–1"
        },
        "ataques": [
            {
                "nome": "Pistola-punhal x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "2d6+20, 17",
                "desc": ""
            },
            {
                "nome": "Pistola-punhal",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "3d6+20, 19/x3",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Apertar o Gatilho",
                "tipo": "Qualidade",
                "desc": "Quando ataca em corpo a corpo com sua pistola-punhal, Zakkrad pode disparar sua bala para causar +3d6 pontos de dano de perfuração. Esse dano é multiplicado em acertos críticos."
            },
            {
                "nome": "Correntes da Guerra (Reação)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, quando é alvo de um ataque corpo a corpo, Zakkrad faz um teste de ataque oposto ao resultado desse ataque. Se vencer, ele bloqueia o golpe com as correntes do braço, evitando o dano, e usa a manobra derrubar (teste +24) contra o atacante."
            },
            {
                "nome": "Encontrar Brecha (Reação)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, quando uma criatura a até 1,5m de Zakkrad fica desprevenida ou se move voluntariamente para fora desse alcance, ele faz um ataque corpo a corpo contra ela."
            },
            {
                "nome": "Mãos Firmes",
                "tipo": "Qualidade",
                "desc": "Zakkrad não sofre a penalidade padrão de –5 em ataques por disparar contra oponentes envolvidos em combate corpo a corpo, e pode sacar ou guardar itens, além de recarregar suas armas de fogo, como uma ação livre."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+13"
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
                "nome": "Guerra",
                "valor": "+8"
            },
            {
                "nome": "Intimidação",
                "valor": "+11"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Pistola-punhal certeira precisa",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Clériga de Kallyadranoch",
        "tipo": "Humanoide (humano) Médio",
        "nd": "8",
        "iniciativa": "+9",
        "percepcao": "+14",
        "percepcaoObs": "",
        "defesa": "29",
        "fort": "+15",
        "ref": "+8",
        "von": "+21",
        "defesaObs": "",
        "pv": "224",
        "desl": "9m (6q)",
        "pm": "51",
        "atributos": {
            "for": "1",
            "des": "1",
            "con": "3",
            "int": "1",
            "sab": "6",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Maça x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "1d8+17",
                "desc": ""
            },
            {
                "nome": "Azagaia",
                "tipo": "À Distância",
                "bonus": "+24",
                "dano": "1d6+17",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura de Medo (Livre, 2 PM)",
                "tipo": "Habilidade",
                "desc": "A clériga de Kallyadranoch gera uma aura de medo de 9m de raio que dura até o fim da cena. Todos os inimigos que entrarem na aura ficam abalados até o fim da cena (Von CD 28 evita e a criatura fica imune a esta habilidade por um dia)."
            },
            {
                "nome": "Magia Acelerada (Livre, +4 PM)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, quando lança uma magia com execução de ação completa ou menor, a clériga muda a execução dela para livre."
            },
            {
                "nome": "Servos do Dragão (Completa, 2 PM)",
                "tipo": "Habilidade",
                "desc": "A clériga invoca 2d4+1 kobolds em espaços desocupados em alcance curto. Eles agem a partir da próxima rodada da clériga, têm deslocamento 9m e podem gastar uma ação padrão para causar 1d6–1 pontos de dano de corte em uma criatura adjacente. Os kobolds têm For –1, Des 4, Defesa 12 e 1 PV, falham automaticamente em qualquer teste oposto ou de resistência e desaparecem quando mortos ou ao fim da cena."
            },
            {
                "nome": "Magias",
                "tipo": "Habilidade",
                "desc": "Como um clérigo de Kallyadranoch de 9º nível (CD 28). Coluna de Chamas (Padrão, 9 PM): Um cilindro de fogo sagrado com 3m de raio e 30m de altura desce dos céus em alcance longo, causando 9d6 pontos de dano de fogo mais 6d6 pontos de dano de luz nas criaturas e objetos livres na área. Comando (Padrão, 4 PM): No início do seu próximo turno, duas criaturas em alcance curto ficam caídas e não podem levantar-se até o início do seu turno seguinte (Von evita). Controlar Fogo (Padrão, 3 PM): O clérigo chameja qualquer número de armas e ataques desarmados escolhidos em alcance curto. Até o fim da cena, essas armas causam +1d6 pontos de dano de fogo. Escudo da Fé (Reação, 1 PM): Quando uma criatura em alcance curto sofre um ataque, ela recebe +2 na Defesa por 1 turno. Oração (Padrão, 7 PM, sustentada): O clérigo e seus aliados em alcance curto recebem +3 em testes de perícia e rolagens de dano, e todos seus inimigos em alcance curto sofrem –3 em testes de perícia e rolagens de dano. Esse efeito é cumulativo com outras magias. Proteção Divina (Reação, 3 PM): Por uma rodada, uma criatura em alcance curto recebe +5 no próximo teste de resistência que fizer."
            }
        ],
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+12"
            },
            {
                "nome": "Misticismo",
                "valor": "+9"
            },
            {
                "nome": "Religião",
                "valor": "+16"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Azagaia x2, couraça, maça, símbolo sagrado de Kallyadranoch",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kallyagrai do Fogo Inferior",
        "tipo": "Espírito Médio",
        "nd": "3",
        "iniciativa": "+6",
        "percepcao": "+2",
        "percepcaoObs": "visão no escuro",
        "defesa": "21",
        "fort": "+9",
        "ref": "+3",
        "von": "+15",
        "defesaObs": "imunidade a fogo",
        "pv": "105",
        "desl": "9m (6q)",
        "pm": "0",
        "atributos": {
            "for": "4",
            "des": "0",
            "con": "4",
            "int": "0",
            "sab": "2",
            "car": "0"
        },
        "ataques": [
            {
                "nome": "Chicote de chamas x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6 fogo, alcance 4,5m",
                "desc": ""
            },
            {
                "nome": "Garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "1d6+4",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Ardente",
                "tipo": "Qualidade",
                "desc": "Criaturas que comecem seus turnos a 1,5m do kallyagrai do fogo inferior sofrem 2d6 pontos de dano de fogo (Ref CD 17 reduz o dano à metade)."
            },
            {
                "nome": "Chicote de Chamas",
                "tipo": "Qualidade",
                "desc": "O kallyagrai pode usar seu chicote para derrubar ou agarrar seus inimigos (bônus +16). Se o kallyagrai tiver um oponente agarrado pelo chicote, pode usar uma ação de movimento para arrastá-lo até 1,5m de si. Um oponente agarrado pelo chicote sofre 1d6 pontos de dano de fogo no começo de cada turno do kallyagrai. O kallyagrai só pode agarrar um oponente por vez e, enquanto tem um oponente agarrado, não pode atacar com seu chicote."
            },
            {
                "nome": "Sopro de Chamas (Padrão)",
                "tipo": "Habilidade",
                "desc": "Todas as criaturas em cone de 9m a partir do kallyagrai sofrem 6d6 pontos de dano de fogo (Ref CD 17 reduz o dano à metade). Recarga (devorar o coração de um humanoide)."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+9"
            },
            {
                "nome": "Intimidação",
                "valor": "+10"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kallyagrai do Fogo Superior",
        "tipo": "Espírito Grande",
        "nd": "7",
        "iniciativa": "+10",
        "percepcao": "+12",
        "percepcaoObs": "visão no escuro",
        "defesa": "31",
        "fort": "+14",
        "ref": "+7",
        "von": "+20",
        "defesaObs": "imunidade a fogo",
        "pv": "280",
        "desl": "12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "6",
            "des": "0",
            "con": "6",
            "int": "0",
            "sab": "2",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Chicote de chamas x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+24",
                "dano": "4d6+2 fogo, alcance 6m",
                "desc": ""
            },
            {
                "nome": "Garras",
                "tipo": "Corpo a Corpo",
                "bonus": "+14",
                "dano": "2d6+6",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Ardente",
                "tipo": "Qualidade",
                "desc": "Criaturas que comecem seus turnos a 1,5m do kallyagrai do fogo superior sofrem 4d6 pontos de dano por fogo (Ref CD 24 reduz o dano à metade)."
            },
            {
                "nome": "Chicote de Chamas",
                "tipo": "Qualidade",
                "desc": "O kallyagrai pode usar seu chicote para derrubar ou agarrar seus inimigos (bônus +27). Se o kallyagrai tiver um oponente agarrado pelo chicote, pode usar uma ação de movimento para arrastá-lo até 1,5m de si. Um oponente agarrado pelo chicote sofre 2d6 pontos de dano por fogo no começo de cada turno do kallyagrai. O kallyagrai só pode agarrar um oponente por vez e, enquanto tem um oponente agarrado, não pode atacar com seu chicote."
            },
            {
                "nome": "Sopro de Chamas (Padrão)",
                "tipo": "Habilidade",
                "desc": "Todas as criaturas em cone de 9m a partir do kallyagrai sofrem 12d6 pontos de dano por fogo (Ref CD 24 reduz o dano à metade). Recarga (devorar o coração de um humanoide)."
            },
            {
                "nome": "Urro de Comando",
                "tipo": "Habilidade",
                "desc": "Todos os aliados do kallyagrai no alcance curto que possam ouvi-lo ganham uma ação de movimento. Recarga (fazer um acerto crítico)."
            }
        ],
        "pericias": [
            {
                "nome": "Atletismo",
                "valor": "+16"
            },
            {
                "nome": "Intimidação",
                "valor": "+12"
            }
        ],
        "tesouro": "Nenhum",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Kann'drazu",
        "tipo": "Morto-vivo Enorme",
        "nd": "10",
        "iniciativa": "+12",
        "percepcao": "+15",
        "percepcaoObs": "percepção às cegas, visão no escuro",
        "defesa": "36",
        "fort": "+22",
        "ref": "+10",
        "von": "+16",
        "defesaObs": "incorpóreo, imunidade a trevas e fogo, redução de dano 10, resistência a magia +3, vulnerabilidade a luz",
        "pv": "500",
        "desl": "voo 12m (8q)",
        "pm": "0",
        "atributos": {
            "for": "—",
            "des": "3",
            "con": "8",
            "int": "4",
            "sab": "4",
            "car": "4"
        },
        "ataques": [
            {
                "nome": "Mordida espectral",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "4d12 trevas, x3",
                "desc": ""
            },
            {
                "nome": "Duas garras espectrais",
                "tipo": "Corpo a Corpo",
                "bonus": "+30",
                "dano": "4d10+8 trevas, 18",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Aura Aterradora",
                "tipo": "Qualidade",
                "desc": "Vontade CD 30 evita."
            },
            {
                "nome": "Olhar Fantasmagórico (Livre)",
                "tipo": "Habilidade",
                "desc": "Uma vez por rodada, depois de fazer uma ação agredir, Kann'drazu pode focar seu olhar em uma criatura em alcance curto que não tenha sido alvo de seus ataques. A criatura sofre 3d6 pontos de dano de fogo, 3d10 pontos de dano psíquico e fica abalada por 1d4 rodadas (Von CD 30 reduz à metade e evita a condição). Medo."
            },
            {
                "nome": "Sopro Espectral (Padrão)",
                "tipo": "Habilidade",
                "desc": "Criaturas em uma linha de 18m sofrem 6d6 pontos de dano de fogo, 3d12 pontos de dano de trevas e ficam abaladas por 1d4 rodadas (Ref CD 30 reduz à metade e evita a condição). Recarga (movimento)."
            }
        ],
        "pericias": [
            {
                "nome": "Intimidação",
                "valor": "+13"
            },
            {
                "nome": "Misticismo",
                "valor": "+13"
            }
        ],
        "tesouro": "Dobro",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Mari Labareda",
        "tipo": "Humanoide (qareen) Médio",
        "nd": "9",
        "iniciativa": "+10",
        "percepcao": "+10",
        "percepcaoObs": "",
        "defesa": "34",
        "fort": "+21",
        "ref": "+16",
        "von": "+9",
        "defesaObs": "redução de fogo 10, imunidade a magias de adivinhação e efeitos de medo",
        "pv": "360",
        "desl": "6m (4q)",
        "pm": "27",
        "atributos": {
            "for": "7",
            "des": "2",
            "con": "3",
            "int": "0",
            "sab": "2",
            "car": "2"
        },
        "ataques": [
            {
                "nome": "Alabarda maciça pungente formidável x2",
                "tipo": "Corpo a Corpo",
                "bonus": "+27",
                "dano": "4d10+10, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Danificar as Asas",
                "tipo": "Habilidade",
                "desc": "Quando faz um ataque, Mari pode gastar 5 PM para machucar as asas, pernas ou qualquer outro membro locomotor do seu alvo. Se ela acertar o ataque, o alvo fica fraco e lento até o fim da cena. Se errar, porém, o alvo fica imune a esse poder até o fim da cena."
            },
            {
                "nome": "Destemor Inflamado",
                "tipo": "Qualidade",
                "desc": "Mari é imune a efeitos de medo, mas faz testes de resistência contra eles normalmente. Se passar, recebe +3 em testes de perícia e rolagens de dano por 1 rodada."
            },
            {
                "nome": "Entortar Escamas",
                "tipo": "Qualidade",
                "desc": "Quando Mari faz um acerto crítico, além dos efeitos normais, ela danifica as defesas. A criatura sofre –3 na Defesa e sua redução de dano diminui em 10."
            },
            {
                "nome": "Tatuagem Mística",
                "tipo": "Qualidade",
                "desc": "Mari pode lançar a magia Primor Atlético. Ela frequentemente usa um aprimoramento para, ao custo de 2 PM e uma ação de movimento, saltar muito alto e pousar em alcance corpo a corpo de uma criatura em alcance curto. Se fizer um ataque corpo a corpo contra essa criatura neste turno, recebe os benefícios e penalidades de uma investida e sua alabarda causa dois dados extras de dano do mesmo tipo durante este ataque."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+8"
            },
            {
                "nome": "Atletismo",
                "valor": "+15"
            },
            {
                "nome": "Furtividade",
                "valor": "+8"
            },
            {
                "nome": "Intimidação",
                "valor": "+10"
            },
            {
                "nome": "Sobrevivência",
                "valor": "+10"
            }
        ],
        "tesouro": "Padrão",
        "equipamento": "Alabarda maciça pungente formidável, anel do escudo mental, escama da honra, loriga segmentada reforçada sob medida selada",
        "fonte": "Duelo de Dragões"
    },
    {
        "nome": "Sorriso",
        "tipo": "Humanoide (hynne) Pequeno",
        "nd": "4",
        "iniciativa": "+5",
        "percepcao": "+3",
        "percepcaoObs": "",
        "defesa": "22",
        "fort": "+5",
        "ref": "+15",
        "von": "+10",
        "defesaObs": "resistência a medo +5, redução de psíquico 20",
        "pv": "28",
        "desl": "6m (4q)",
        "pm": "0",
        "atributos": {
            "for": "1",
            "des": "2",
            "con": "2",
            "int": "0",
            "sab": "1",
            "car": "1"
        },
        "ataques": [
            {
                "nome": "Adaga",
                "tipo": "Corpo a Corpo",
                "bonus": "+17",
                "dano": "1d4+10, 19",
                "desc": ""
            }
        ],
        "habilidades": [
            {
                "nome": "Ataque Furtivo +6d6",
                "tipo": "Qualidade",
                "desc": "Uma vez por rodada, quando atinge uma criatura desprevenida com um ataque corpo a corpo ou em alcance curto, ou uma criatura que esteja flanqueando, Sorriso causa 6d6 pontos de dano extra."
            },
            {
                "nome": "Sorte Salvadora",
                "tipo": "Qualidade",
                "desc": "Quando faz um teste de resistência, Sorriso pode rolar este teste novamente. Recarga (fazer um acerto crítico)."
            }
        ],
        "pericias": [
            {
                "nome": "Acrobacia",
                "valor": "+6"
            },
            {
                "nome": "Atletismo",
                "valor": "+6"
            },
            {
                "nome": "Furtividade",
                "valor": "+6"
            }
        ],
        "tesouro": "Nenhum",
        "equipamento": "Armadura de couro, adaga",
        "fonte": "Duelo de Dragões"
    }
];

if (typeof module !== "undefined") module.exports = DUELO_DRAGOES_DB;
