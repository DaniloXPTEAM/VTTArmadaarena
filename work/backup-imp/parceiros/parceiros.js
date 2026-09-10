var parceirosData = [
  {
    "name": "Adepto",
    "category": "parceiro",
    "source": "t20",
    "desc": "Um conjurador capaz de ajudá-lo a lançar suas magias.",
    "tiers": {
      "iniciante": "o custo para lançar suas magias de 1º círculo diminui –1 PM.",
      "veterano": "como acima, mas também reduz o custo de suas magias de 2º círculo.",
      "mestre": "como acima, e esta redução se torna cumulativa com outras reduções."
    }
  },
  {
    name: "Ajudante",
    category: "parceiro",
    source: "t20",
    desc: "Um bardo, nobre ou sábio que ajuda com palavras firmes ou encorajadoras.",
    tiers: {
      iniciante: "você recebe +2 em duas perícias.",
      veterano: "muda para +2 em três perícias.",
      mestre: "muda para +4 em três perícias. As perícias são definidas pelo parceiro. Um ajudante não pode fornecer bônus em Luta ou Pontaria."
    }
  },
  {
    name: "Assassino",
    category: "parceiro",
    source: "t20",
    desc: "Um ladino ou outro tipo furtivo e letal.",
    tiers: {
      iniciante: "você pode usar a habilidade Ataque Furtivo +1d6. Se já possui a habilidade, o bônus é cumulativo.",
      veterano: "além do Ataque Furtivo, fornece bônus por flanquear contra um inimigo por rodada.",
      mestre: "muda o dano do Ataque Furtivo para +2d6. Note que, além de fornecer +2 em testes de ataque corpo a corpo, o bônus por flanquear facilita que o personagem use seu Ataque Furtivo."
    }
  },
  {
    name: "Atirador",
    category: "parceiro",
    source: "t20",
    desc: "Um arqueiro, besteiro ou outro combatente à distância.",
    tiers: {
      iniciante: "uma vez por rodada, você recebe +1d6 em uma rolagem de dano à distância.",
      veterano: "muda para +1d10.",
      mestre: "muda para +2d8."
    }
  },
  {
    name: "Combatente",
    category: "parceiro",
    source: "t20",
    desc: "Um bucaneiro, guerreiro, paladino ou animal de caça.",
    tiers: {
      iniciante: "+2 em testes de ataque.",
      veterano: "muda para +3 em testes de ataque.",
      mestre: "muda para +4 em testes de ataque e, uma vez por rodada, você pode gastar 5 PM para fazer um ataque extra."
    }
  },
  {
    name: "Destruidor",
    category: "parceiro",
    source: "t20",
    desc: "Um arcanista ou inventor.",
    tiers: {
      iniciante: "uma vez por rodada, como uma ação livre, você pode gastar 1 PM para causar 2d6 pontos de dano de ácido, eletricidade, fogo ou frio (de acordo com o parceiro) em um alvo em alcance curto.",
      veterano: "como acima, mas você também pode gastar 2 PM para causar 4d6 pontos de dano.",
      mestre: "como acima, mas você também pode gastar 4 PM para causar 6d6 pontos de dano em uma área de 6m de raio em alcance médio."
    }
  },

  {
    name: "Fortão",
    category: "parceiro",
    source: "t20",
    desc: "Um bárbaro, lutador ou outro tipo que bate primeiro e pensa depois.",
    tiers: {
      iniciante: "uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.",
      veterano: "muda para +1d12.",
      mestre: "muda para +3d6."
    }
  },
  {
    name: "Guardião",
    category: "parceiro",
    source: "t20",
    desc: "Um cavaleiro, cão de guarda ou outro NPC cuja função primária é proteger.",
    tiers: {
      iniciante: "você recebe +2 na Defesa.",
      veterano: "muda para +3.",
      mestre: "muda para +4 na Defesa e +2 em testes de resistência."
    }
  },
  {
    name: "Magivocador",
    category: "parceiro",
    source: "t20",
    desc: "Um conjurador especializado em magias ofensivas.",
    tiers: {
      iniciante: "o dano de suas magias aumenta em +1 dado do mesmo tipo.",
      veterano: "como acima, e a CD para resistir a suas magias aumenta em +1.",
      mestre: "como acima, mas dobra os bônus (para um total de +2 dados de dano e +2 na CD)."
    }
  },
  {
    name: "Médico",
    category: "parceiro",
    source: "t20",
    desc: "Um clérigo, druida, herbalista ou outro NPC com capacidades curativas.",
    tiers: {
      iniciante: "uma vez por rodada você pode gastar 1 PM para curar 1d8+1 PV de uma criatura adjacente.",
      veterano: "como acima, mas você pode gastar 3 PM para curar 3d8+3 PV ou remover uma condição prejudicial (como abalado ou fatigado).",
      mestre: "como acima, mas você também pode gastar 5 PM para curar 6d8+6 PV."
    }
  },
  {
    name: "Perseguidor",
    category: "parceiro",
    source: "t20",
    desc: "Um caçador, animal farejador ou outro especialista em localizar alvos.",
    tiers: {
      iniciante: "+2 em Percepção e Sobrevivência.",
      veterano: "você pode usar Sentidos Aguçados.",
      mestre: "você pode usar Percepção às Cegas."
    }
  },
  {
    name: "Vigilante",
    category: "parceiro",
    source: "t20",
    desc: "Um vigia ou animal de guarda, sempre atento aos arredores.",
    tiers: {
      iniciante: "+2 em Percepção e Iniciativa.",
      veterano: "você pode usar Esquiva Sobrenatural.",
      mestre: "você pode usar Olhos nas Costas."
    }
  },

  {
    "name": "Allaraz",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Ajudante/Protetor elemental (Luz).",
    "tiers": {
      "iniciante": "concede ao Amo a habilidade de aprender e lançar uma magia de 1º círculo das escolas de Ilusão ou Evocação (definida pelo gênio, usa Carisma).",
      "veterano": "faculta ao Amo conjurar a magia Campo de Força.",
      "mestre": "uma vez por rodada, permite ao Amo pagar 4 PM para curar 5d8+5 PV em qualquer criatura localizada em alcance curto."
    }
  },
  {
    "name": "Borboleta (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "A CD dos testes de Vontade para resistir a suas magias aumenta em +1.",
    "tiers": null
  },
  {
    "name": "Cobra (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "A CD dos testes de Fortitude para resistir a suas magias aumenta em +1.",
    "tiers": null
  },
  {
    "name": "Coruja (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Quando lança uma magia com alcance de toque, você pode pagar 1 PM para aumentar seu alcance para curto.",
    "tiers": null
  },
  {
    "name": "Corvo (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Quando faz um teste de Misticismo ou Vontade, você pode pagar 1 PM para rolar dois dados e usar o melhor resultado.",
    "tiers": null
  },
  {
    "name": "Falcão (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Você não pode ser surpreendido e nunca fica desprevenido.",
    "tiers": null
  },
  {
    "name": "Gato (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Você recebe visão no escuro e +2 em Furtividade.",
    "tiers": null
  },
  {
    "name": "Lagarto (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "A CD dos testes de Reflexos para resistir a suas magias aumenta em +1.",
    "tiers": null
  },
  {
    "name": "Morcego (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Você adquire percepção às cegas em alcance curto.",
    "tiers": null
  },
  {
    "name": "Rato (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Você pode usar seu atributo-chave em Fortitude, no lugar de Constituição.",
    "tiers": null
  },
  {
    "name": "Sapo (Familiar)",
    "category": "familiar",
    "source": "t20",
    "desc": "Você soma seu atributo-chave ao seu total de pontos de vida (cumulativo).",
    "tiers": null
  },

  {
    "name": "Aquin'ne",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Um aquin'ne familiar concede deslocamento de natação 9m e permite lançar magias e respirar debaixo d'água.",
    "tiers": null
  },
  {
    "name": "Asa-Assassina",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Permite que o dono gaste 1 PM ao causar dano de corte ou perfuração para deixar a vítima sangrando.",
    "tiers": null
  },
  {
    "name": "Cavalo (Montaria)",
    "category": "montaria",
    "source": "t20",
    "desc": "A montaria mais comum do Reinado (Grande). Estas estatísticas também se aplicam a pôneis (tamanho Médio).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "como acima, mas seu deslocamento muda para 15m e você recebe +2 em ataques corpo a corpo.",
      "mestre": "como acima, mas você recebe uma segunda ação de movimento extra por turno (novamente, apenas para se deslocar)."
    }
  },
  {
    "name": "Cão de Caça (Montaria)",
    "category": "montaria",
    "source": "t20",
    "desc": "Cães de porte adequado são montarias comuns para personagens Pequenos ou Minúsculos (Médio ou Pequeno).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m, você pode usar faro e recebe uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "como acima, mas seu deslocamento muda para 12m e você recebe +2 na Defesa.",
      "mestre": "como acima; além disso, uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre."
    }
  },
  {
    "name": "Lobo-das-cavernas (Montaria)",
    "category": "montaria",
    "source": "t20",
    "desc": "Primos primitivos e maiores dos lobos comuns, usados por goblinoides e aventureiros selvagens (Grande). Estas estatísticas também se aplicam a lobos comuns (tamanho Médio).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "como acima, mas seu deslocamento muda para 15m e, uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo.",
      "mestre": "como acima; além disso, uma vez por rodada, quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre."
    }
  },
  {
    "name": "Grifo (Montaria)",
    "category": "montaria",
    "source": "t20",
    "desc": "Esta fera majestosa é muito cobiçada por heróis (Grande).",
    "tiers": {
      "iniciante": "uma vez por rodada, você recebe +1d8 em uma rolagem de dano corpo a corpo (um grifo iniciante é um filhote e não pode ser usado como montaria).",
      "veterano": "como acima, mas pode ser usado como montaria, mudando seu deslocamento para voo 18m.",
      "mestre": "como acima, mas você recebe uma ação de movimento extra por turno (apenas para se deslocar)."
    }
  },
  {
    "name": "Gorlogg (Montaria)",
    "category": "montaria",
    "source": "t20",
    "desc": "Esta besta primitiva é usada como montaria pelos mais selvagens (Grande).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo.",
      "veterano": "como acima, mas o bônus em rolagens de dano corpo a corpo muda para +1d10.",
      "mestre": "seu deslocamento muda para 15m e o bônus em rolagens de dano corpo a corpo muda para +2d8."
    }
  },
  {
    "name": "Trobo (Montaria)",
    "category": "montaria",
    "source": "t20",
    "desc": "Usados como animais de carga e tração, trobos também servem como montarias (Grande).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m e você recebe uma ação de movimento extra por turno (apenas para se deslocar) e +1 em testes de resistência.",
      "veterano": "como acima, mas seu deslocamento muda para 12m e o bônus em testes de resistência muda para +2.",
      "mestre": "como acima, mas o bônus em testes de resistência muda para +5."
    }
  },
  {
    "name": "Aspecto de Allihanna",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Companheiro animal veterano (segue apenas devotos de Allihanna). Fornece os benefícios de dois tipos de parceiro simultaneamente, escolhidos entre os disponíveis para companheiros animais (Tormenta20, p. 62). Uma vez por rodada, o dono pode gastar uma ação de movimento e 2 PM para alterar livremente os tipos escolhidos.",
    "tiers": null
  },
  {
    "name": "Aspecto de Kallyadranoch",
    "category": "montaria",
    "source": "deuses",
    "desc": "Montaria Grande (caso considere o cavaleiro digno). Opera mecanicamente sob as diretrizes de um parceiro dragão jovem mestre (veja p. 141).",
    "tiers": null
  },
  {
    "name": "Aspecto de Khalmyr",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Especial/Defensor (apoia apenas heróis dignos e livres de crimes). Fornece +3 de bônus fixo na Defesa do dono, além de conceder imunidade total contra acertos críticos e efeitos de medo.",
    "tiers": null
  },
  {
    "name": "Aspecto de Lin-Wu",
    "category": "montaria",
    "source": "deuses",
    "desc": "Montaria Grande (revogado se o dono quebrar os códigos de conduta). Seu deslocamento muda para voo 24m, concede +2 em Nobreza e Vontade para o cavaleiro e projeta passivamente a aura da habilidade Conduta Honrosa.",
    "tiers": null
  },
  {
    "name": "Aspecto de Marah",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Especial/Doutrinador (revogado se o dono quebrar as Obrigações de Marah). Fornece +2 em Atuação e Diplomacia e na CD de suas habilidades pacíficas que imponham as condições enfeitiçado, fascinado ou pasmo. Permite o uso de Músicas de bardo sem a necessidade de empunhar instrumentos.",
    "tiers": null
  },
  {
    "name": "Aspecto de Valkaria",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Especial/Duelista (revogado se violar as Obrigações de Valkaria). Fornece +2 em Acrobacia e em testes opostos e salvamentos contra efeitos de movimento. Concede ao dono o uso da habilidade Bloqueio Contundente (sucesso na reação esquiva o golpe e causa contra-ataque igual ao dano básico de sua arma).",
    "tiers": null
  },
  {
    "name": "Baleote",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "muito jovem para ser montado, mas permite gastar 1 PM para causar 2d6 de eletricidade em uma linha de 9m.",
      "veterano": "serve como montaria com deslocamento de 9m (voo 12m).",
      "mestre": "deslocamento de voo muda para 15m e permite gastar 4 PM para causar 6d6 de eletricidade em linha de 9m."
    }
  },
  {
    "name": "Bogum",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Companheiro animal (exclusivo de druidas).",
    "tiers": {
      "iniciante": "elo mental (como familiar de arcanista) e concede +2 em Percepção e Sobrevivência.",
      "veterano": "uma vez por rodada, concede +1d6 de ácido em rolagens de dano.",
      "mestre": "fornece também o benefício de um Dedo de Ente."
    }
  },
  {
    "name": "Brontotério",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você ganha +1 de bônus na Defesa.",
      "veterano": "o bônus de Defesa aumenta para +2 e você ganha uma ação de movimento extra por turno (restrita a se deslocar).",
      "mestre": "concede ao cavaleiro redução de dano 5."
    }
  },
  {
    "name": "Brucutu",
    "category": "parceiro",
    "source": "jornada",
    "desc": "Ajudante/Carregador (impõe penalidade de –2 em Diplomacia para o mestre).",
    "tiers": {
      "iniciante": "expande o inventário do dono em 2 espaços de itens e concede +1d6 pontos de dano corpo a corpo uma vez por rodada.",
      "veterano": "capacidade de carga aumenta para 5 espaços e o dano bônus corpo a corpo sobe para +1d8.",
      "mestre": "capacidade de carga vai para 10 espaços e o bônus de dano na rodada passa a ser de +1d10."
    }
  },
  {
    "name": "Búfalo-de-Guerra",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "deslocamento muda para 9m e o limite de carga do cavaleiro aumenta em 5 espaços. Uma vez por rodada, em investidas montadas, concede +1d8 em uma rolagem de dano corpo a corpo.",
      "veterano": "deslocamento muda para 12m e passa a ignorar terreno difícil.",
      "mestre": "bônus de dano corpo a corpo na investida muda para +2d8 e concede uma ação de movimento extra por turno (apenas para se deslocar)."
    }
  },
  {
    "name": "Bulette",
    "category": "montaria",
    "source": "ameacas",
    "desc": "O bulette é um parceiro montaria (Grande) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m (escavação 6m) e, uma vez por rodada, você recebe +1d6 em uma rolagem de dano corpo a corpo.",
      "veterano": "o bônus em rolagens de dano muda para +1d10.",
      "mestre": "o deslocamento de escavação muda para 12m e o bônus em rolagens de dano muda para +2d8."
    }
  },
  {
    "name": "Cão de Kally",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Fortão especial.",
    "tiers": {
      "iniciante": "uma vez por rodada, adiciona +1d6 de dano de fogo em um ataque corpo a corpo.",
      "veterano": "bônus muda para +2d6.",
      "mestre": "além dos bônus, uma vez por rodada pode gastar 2 PM para soltar um sopro em cone de 6m causando 4d6 de fogo."
    }
  },
  {
    "name": "Capivara",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Média.",
    "tiers": {
      "iniciante": "deslocamento muda para 9m (natação 12m) e concede uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "permite ao dono usar Aparência Inofensiva (se já a possuir, a CD aumenta em +2).",
      "mestre": "uma vez por rodada, concede +1d6 em uma rolagem de dano."
    }
  },
  {
    "name": "Carcaju",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Especial (fortão).",
    "tiers": {
      "iniciante": "uma vez por rodada, concede +1d6 em uma rolagem de dano corpo a corpo do mestre. Se o dado bônus resultar em 6, permite rolar +1d6 extra e somá-lo (limite de uma explosão).",
      "veterano": "expande a margem de ameaça com armas corpo a corpo do dono em +1.",
      "mestre": "quando sofre dano, o dono recebe +2 em testes de ataque e jogadas de dano até o fim do seu próximo turno."
    }
  },
  {
    "name": "Besta de Carga",
    "category": "parceiro",
    "source": "Ameaças de Arton",
    "desc": "Um animal capaz de carregar peso, como um boi, burro ou mula.",
    "tiers": {
      "iniciante": "pode carregar 10 espaços de itens.",
      "veterano": "pode carregar 15 espaços.",
      "mestre": "pode carregar 20 espaços de itens."
    }
  },
  {
    "name": "Cavalo de Namalkah",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande (exige missão/aventura para provar merecimento).",
    "tiers": {
      "iniciante": "deslocamento muda para 15m e concede uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "deslocamento vai para 18m e você ganha +2 em testes de ataque corpo a corpo.",
      "mestre": "concede uma segunda ação de movimento extra por turno (apenas para deslocar) e, uma vez por rodada, +2d6 em uma rolagem de dano corpo a corpo."
    }
  },
  {
    "name": "Cavalo Esqueleto",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "você recebe +2 em Intimidação e na CD de seus efeitos de medo.",
      "mestre": "você recebe uma segunda ação de movimento extra por turno (apenas para se deslocar) e o alcance de seus efeitos de medo aumenta em um passo (de curto para médio, ou de médio para longo)."
    }
  },
  {
    "name": "Chibi-Kabuto",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Um chibi-kabuto como familiar aumenta em +1 o bônus na Defesa que o dono recebe por suas magias.",
    "tiers": null
  },
  {
    "name": "Cocatriz",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Adepto especial.",
    "tiers": {
      "iniciante": "reduz em -1 PM o custo de habilidades mágicas do dono que causem condições de movimento.",
      "veterano": "a CD para resistir a essas habilidades aumenta em +2.",
      "mestre": "a redução de custo de PM torna-se cumulativa com outras reduções de custo."
    }
  },
  {
    "name": "Cocatriz-Real",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento fixo muda para 12m e você ignora terreno difícil.",
      "veterano": "uma vez por rodada, ao acertar um ataque corpo a corpo, pode deixar a vítima lenta (Fort CD Força do dono evita).",
      "mestre": "o deslocamento de voo também muda para 12m, mantendo a obrigação de pousar ao fim do movimento."
    }
  },
  {
    "name": "Corcel de Comando",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande (utiliza a perícia Pilotagem no lugar de Cavalgar).",
    "tiers": {
      "iniciante": "deslocamento muda para 12m e ignora penalidades de terreno difícil.",
      "veterano": "permite ao cavaleiro conjurar o efeito básico de Campo de Força (se já conhecer, reduz o custo em -1 PM).",
      "mestre": "habilidades baseadas em som (como Músicas de bardo) aumentam o alcance em um passo (curto para médio; médio para longo)."
    }
  },
  {
    "name": "Corcel de Kally",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "desl muda para 12m, +1d6 de dano corpo a corpo uma vez por rodada.",
      "veterano": "dano muda para +1d8, desl e voo mudam para 12m.",
      "mestre": "desl e voo mudam para 18m; uma vez por rodada pode gastar 2 PM para soprar cone de 6m causando 3d8 de fogo (Ref CD Car metade)."
    }
  },
  {
    "name": "Corcel do Deserto",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você ignora terreno difícil natural.",
      "veterano": "uma vez por rodada, permite gastar 1 PM para causar 2d6 de impacto em criatura adjacente.",
      "mestre": "seu deslocamento muda para 15m e concede +5 em testes para resistir a efeitos de clima, calor e frio."
    }
  },
  {
    "name": "Dai-Kabuto",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "desl muda para 9m, recebe +2 em agarrar/derrubar e uma ação de movimento extra por turno (apenas deslocar).",
      "veterano": "adquire deslocamento de voo 6m.",
      "mestre": "bônus de agarrar expande para todas as manobras e ganha +2 na Defesa."
    }
  },
  {
    "name": "Deinonico",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Média.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e expande em +1 a margem de ameaça de suas armas corpo a corpo.",
      "veterano": "garante +5 em testes de Atletismo para saltar e uma ação de movimento extra por turno (apenas para se deslocar).",
      "mestre": "deslocamento vai para 15m e o bônus na margem de ameaça corpo a corpo sobe para +2."
    }
  },
  {
    "name": "Diabrete",
    "category": "familiar",
    "source": "deuses",
    "desc": "Se adotado por um conjurador, concede +1 PM extra livre para ser gasto em aprimoramentos exclusivamente quando o mestre conjura magias das escolas de Ilusão ou efeitos de Veneno.",
    "tiers": null
  },
  {
    "name": "Dragão Adulto da Tirania",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Dragões jovens de qualquer tipo podem servir como um parceiro montaria (Grande) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m (normal e de voo) e, uma vez por rodada, você pode gastar 1 PM para causar 2d6 pontos de dano da energia do dragão em uma criatura em alcance médio.",
      "veterano": "você recebe também uma ação de movimento extra por turno (apenas para se deslocar) e pode gastar 2 PM para causar 4d6 pontos de dano.",
      "mestre": "seu deslocamento muda para 18m e você pode gastar 5 PM e uma ação de movimento para usar a habilidade Sopro (de acordo com o dragão jovem). Dragões, mesmo os jovens, são criaturas orgulhosas e de personalidade forte. Assim, para se tornar o cavaleiro de um dragão, um personagem precisa primeiro conquistar sua amizade e, sobretudo, seu respeito!"
    }
  },
  {
    "name": "Dragão Adulto dos Segredos",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Dragões jovens de qualquer tipo podem servir como um parceiro montaria (Grande) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m (normal e de voo) e, uma vez por rodada, você pode gastar 1 PM para causar 2d6 pontos de dano da energia do dragão em uma criatura em alcance médio.",
      "veterano": "você recebe também uma ação de movimento extra por turno (apenas para se deslocar) e pode gastar 2 PM para causar 4d6 pontos de dano.",
      "mestre": "seu deslocamento muda para 18m e você pode gastar 5 PM e uma ação de movimento para usar a habilidade Sopro (de acordo com o dragão jovem). Dragões, mesmo os jovens, são criaturas orgulhosas e de personalidade forte. Assim, para se tornar o cavaleiro de um dragão, um personagem precisa primeiro conquistar sua amizade e, sobretudo, seu respeito!"
    }
  },
  {
    "name": "Dragão Filhote do Bosque",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Dragões filhotes de qualquer tipo podem ser invocados como familiares. Entretanto, isso exige obter um ovo de dragão. (Dragões filhotes são muito bestiais, e transformar um filhote já chocado em familiar é quase impossível). Se tiver um dragão filhote como familiar, suas magias que causam dano do mesmo tipo que o sopro do dragão têm a CD aumentada em +2 e custam –1 PM (cumulativo com outras reduções).",
    "tiers": null
  },
  {
    "name": "Dragão Filhote dos Rios",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Dragões filhotes de qualquer tipo podem ser invocados como familiares. Entretanto, isso exige obter um ovo de dragão. (Dragões filhotes são muito bestiais, e transformar um filhote já chocado em familiar é quase impossível). Se tiver um dragão filhote como familiar, suas magias que causam dano do mesmo tipo que o sopro do dragão têm a CD aumentada em +2 e custam –1 PM (cumulativo com outras reduções).",
    "tiers": null
  },
  {
    "name": "Dragão Jovem da Proteção",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Dragões jovens de qualquer tipo podem servir como um parceiro montaria (Grande) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m (normal e de voo) e, uma vez por rodada, você pode gastar 1 PM para causar 2d6 pontos de dano da energia do dragão em uma criatura em alcance médio.",
      "veterano": "você recebe também uma ação de movimento extra por turno (apenas para se deslocar) e pode gastar 2 PM para causar 4d6 pontos de dano.",
      "mestre": "seu deslocamento muda para 18m e você pode gastar 5 PM e uma ação de movimento para usar a habilidade Sopro (de acordo com o dragão jovem). Dragões, mesmo os jovens, são criaturas orgulhosas e de personalidade forte. Assim, para se tornar o cavaleiro de um dragão, um personagem precisa primeiro conquistar sua amizade e, sobretudo, seu respeito!"
    }
  },
  {
    "name": "Dragão Jovem do Ocaso",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Dragões jovens de qualquer tipo podem servir como um parceiro montaria (Grande) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m (normal e de voo) e, uma vez por rodada, você pode gastar 1 PM para causar 2d6 pontos de dano da energia do dragão em uma criatura em alcance médio.",
      "veterano": "você recebe também uma ação de movimento extra por turno (apenas para se deslocar) e pode gastar 2 PM para causar 4d6 pontos de dano.",
      "mestre": "seu deslocamento muda para 18m e você pode gastar 5 PM e uma ação de movimento para usar a habilidade Sopro (de acordo com o dragão jovem). Dragões, mesmo os jovens, são criaturas orgulhosas e de personalidade forte. Assim, para se tornar o cavaleiro de um dragão, um personagem precisa primeiro conquistar sua amizade e, sobretudo, seu respeito!"
    }
  },
  {
    "name": "Dragonete",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Familiar/Ajudante especial.",
    "tiers": {
      "iniciante": "reduz o custo de todas as magias das escolas de Encantamento e Ilusão em –1 PM.",
      "veterano": "aumenta o alcance de magias de Encantamento e Ilusão em um passo (curto para médio, médio para longo).",
      "mestre": "a redução de custo de PM para Encantamento e Ilusão vira cumulativa com qualquer outra redução externa e o dono passa a usufruir continuamente do efeito básico da magia Visão Mística."
    }
  },
  {
    "name": "Dromedário",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "deslocamento muda para 12m e ignora terreno difícil natural em desertos.",
      "veterano": "ganha +2 em Percepção e Sobrevivência (dobrado em desertos) e, uma vez por rodada, pode gastar 1 PM para causar 1d4+3 de impacto em alcance curto.",
      "mestre": "ganha uma ação de movimento extra por turno (apenas para deslocar) e +5 em testes contra efeitos de clima."
    }
  },
  {
    "name": "Eiradaan Nobre",
    "category": "montaria",
    "source": "deuses",
    "desc": "Montaria Grande (Gamo Celestial).",
    "tiers": {
      "iniciante": "o deslocamento do dono muda para 12m e ele passa a ignorar terrenos difíceis.",
      "veterano": "o gamo projeta asas e concede deslocamento de voo de 12m.",
      "mestre": "permite gastar uma ação completa e 10 PM para transportar o gamo e o cavaleiro para o Plano Etéreo (idêntico ao efeito de Forma Etérea sustentada). O efeito se dissipa na hora se o cavaleiro desmontar."
    }
  },
  {
    "name": "Elefante",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme.",
    "tiers": {
      "iniciante": "deslocamento muda para 12m e ignora terreno difícil.",
      "veterano": "permite ao dono sacar um item ou coletar objeto solto em alcance de 4,5m como ação livre.",
      "mestre": "+5 em testes de manobra para atropelar e, uma vez por rodada se vencer um atropelamento, pode pagar 1 PM para realizar um ataque contra a vítima."
    }
  },
  {
    "name": "Elemental do Veneno Médio",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Assassino especial. Fornece exatamente os mesmos benefícios mecânicos e progressões de custo em PM de um Elemental do Veneno Pequeno.",
    "tiers": null
  },
  {
    "name": "Elemental do Veneno Pequeno",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Assassino especial.",
    "tiers": {
      "iniciante": "adiciona +2 na CD dos venenos do dono. Uma vez por rodada, gasta 1 PM para envenenar uma arma (próximo acerto causa perda de 1d12 PV).",
      "veterano": "permite pagar 3 PM para aplicar veneno que drena 2d12 PV.",
      "mestre": "venenos do dono ignoram imunidade a veneno e permite pagar 5 PM para infligir perda de 3d12 PV."
    }
  },
  {
    "name": "Escudeiro",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Fortão especial.",
    "tiers": {
      "iniciante": "pode empunhar o escudeiro como uma lança e um escudo pesado na mesma mão. Permite atacar com a lança sem perder o bônus de Defesa do escudo, mas impede de atacar com ambos na mesma rodada.",
      "veterano": "recebe uma melhoria de arma ou escudo (exceto material especial).",
      "mestre": "recebe uma segunda melhoria de arma ou escudo (pode ser aprimorado magicamente com encantos)."
    }
  },
  {
    "name": "Estirge",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Um estirge pode ser invocado como familiar, mas isso requer uma ova de estirge. Um estirge familiar permite que você receba 1 PV temporário cumulativo (até o limite de seu nível) sempre que causa dano a uma criatura viva com uma magia.",
    "tiers": null
  },
  {
    "name": "Falcão",
    "category": "parceiro",
    "source": "jornada",
    "desc": "Especial (perseguidor).",
    "tiers": {
      "iniciante": "uma vez por cena, o dono gasta ação de movimento e testa Adestramento CD 10; sucesso dá +1 em ataques, Percepção e Sobrevivência até o fim da cena, bônus este que aumenta em +1 para cada 10 pontos pelos quais superou a CD.",
      "veterano": "concede o uso da habilidade Sentidos Aguçados para o dono.",
      "mestre": "uma vez por rodada, permite gastar 1 PM para deixar uma criatura em alcance médio cega por 1d4 rodadas (Ref nega por CD baseada em Carisma do dono)."
    }
  },
  {
    "name": "Fofo",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Guardião especial.",
    "tiers": {
      "iniciante": "fornece redução de dano 1.",
      "veterano": "a RD aumenta para 2 e permite vestir um item que ocupe 1 espaço ou menos sem contar no limite de itens vestidos.",
      "mestre": "a RD aumenta para 3."
    }
  },
  {
    "name": "Galhada Fêmea",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e permite ao dono gastar ação padrão e 1 PM para se curar em 1d8+1 PV.",
      "veterano": "permite gastar ação padrão e 3 PM para recuperar 3d8+3 PV ou expurgar uma condição de doença, fadiga, paralisia ou veneno ativa.",
      "mestre": "concede uma ação de movimento extra por turno (apenas para deslocar) e expande a cura opcional para 6d8+6 PV gastando ação padrão e 5 PM."
    }
  },
  {
    "name": "Galhada Macho",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e concede +2 em Sobrevivência para o dono.",
      "veterano": "seus ataques marciais contam como mágicos e adiciona +1d8 em um dano corpo a corpo por rodada (bônus dobra contra mortos-vivos).",
      "mestre": "bônus de dano na rodada vira +1d10 e confere uma ação de movimento extra por turno (apenas para se deslocar)."
    }
  },
  {
    "name": "Gambá",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Vigilante especial.",
    "tiers": {
      "iniciante": "fornece +2 em Iniciativa e Percepção.",
      "veterano": "permite gastar uma ação de movimento e 1 PM para deixar uma criatura em alcance curto enjoada por 1d4 rodadas (Fort CD Sab evita).",
      "mestre": "o bônus nas perícias aumenta para +5."
    }
  },
  {
    "name": "Gizzehi",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Ajudante elemental (Fogo).",
    "tiers": {
      "iniciante": "os ataques corpo a corpo do Amo passam a infligir a condição chamas mágicas nos alvos afetados.",
      "veterano": "quando o Amo aplica a condição chamas, o dano por rodada dela sobe para 1d8.",
      "mestre": "inimigos incendiados pelo Amo passam a requerer o gasto de uma ação completa (em vez de ação padrão) para tentarem abafar e apagar o fogo."
    }
  },
  {
    "name": "Gorlogg",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e concede +1d6 em uma rolagem de dano corpo a corpo por rodada.",
      "veterano": "o bônus de dano na rodada muda para +1d10.",
      "mestre": "deslocamento vai para 15m e o bônus de dano corpo a corpo na rodada muda para +2d8."
    }
  },
  {
    "name": "Gorlogg Alfa",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande. Como parceiro do jogador, fornece exatamente as mesmas estatísticas e progressões de bônus de um Gorlogg padrão.",
    "tiers": null
  },
  {
    "name": "Hiena",
    "category": "montaria",
    "source": "ameacas",
    "desc": "A hiena é um parceiro especial (perseguidor) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "+2 em Furtividade e Sobrevivência.",
      "veterano": "você pode usar Oportunismo. Se possuir esse poder, em vez disso seu custo diminui em –1 PM.",
      "mestre": "você pode usar Sentidos Aguçados. Alternativamente, uma hiena pode ser uma montaria Média com as estatísticas de um hienodonte (a seguir)."
    }
  },
  {
    "name": "Hienodonte",
    "category": "montaria",
    "source": "ameacas",
    "desc": "O hienodonte é um parceiro montaria (Grande) que fornece os benefícios a seguir.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "você pode usar Oportunismo. Se possuir esse poder, em vez disso seu custo diminui em –1 PM.",
      "mestre": "quando acerta um ataque corpo a corpo, você pode fazer a manobra derrubar como uma ação livre."
    }
  },
  {
    "name": "Hippossauro",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "deslocamento muda para 12m e fornece +2 de bônus em Diplomacia (se hippossauro macho) ou em Furtividade (esquadra com hippossauro fêmea).",
      "veterano": "deslocamento muda para 15m e, uma vez por rodada, concede +1d8 em uma rolagem de dano corpo a corpo.",
      "mestre": "o bônus na perícia selecionada sobe para +4 e o cavaleiro ganha uma ação de movimento extra por turno (apenas para se deslocar)."
    }
  },
  {
    "name": "Homúnculo",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Fornece +1 PM extra para gastar exclusivamente em aprimoramentos sempre que o dono lançar uma magia de transmutação ou veneno.",
    "tiers": null
  },
  {
    "name": "Jairuan",
    "category": "montaria",
    "source": "deuses",
    "desc": "Ajudante/Montaria elemental (Ar).",
    "tiers": {
      "iniciante": "permite ao Amo aprender e conjurar uma magia de 1º círculo das escolas de Encantamento ou Ilusão (definida pelo gênio, usa Carisma).",
      "veterano": "altera o deslocamento do Amo para 12m (normal e de voo).",
      "mestre": "deslocamento terrestre e de voo do Amo sobe para 18m e, ao voar, permite carregar uma criatura Média ou menor sem sofrer penalidades de carga."
    }
  },
  {
    "name": "Kemooz",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Ajudante elemental (Terra).",
    "tiers": {
      "iniciante": "uma vez por rodada, o Amo cria cubo de terra de 1,5m em espaço desocupado a até 9m. O cubo tem RD 5 e 30 PV, durando até o fim da cena ou acumular 4 cubos.",
      "veterano": "concede bônus fixo de +2 na Defesa do Amo.",
      "mestre": "concede ao Amo a capacidade de conjurar a magia Controlar Terra (atributo-chave Carisma)."
    }
  },
  {
    "name": "Kill’Bone",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Perseguidor especial.",
    "tiers": {
      "iniciante": "fornece faro e, uma vez por rodada, +1d6 em uma rolagem de dano corpo a corpo (dobrado contra finntroll e trolls).",
      "veterano": "bônus de dano vira +1d8 e concede +2 em testes de perícia contra finntroll e trolls.",
      "mestre": "bônus de dano vira +1d10 e o dono não pode ser flanqueado."
    }
  },
  {
    "name": "Ko-Kabuto",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Guardião especial.",
    "tiers": {
      "iniciante": "fornece visão na penumbra e +1 na Defesa.",
      "veterano": "uma vez por rodada concede +1d8 em jogadas de dano corpo a corpo.",
      "mestre": "bônus na Defesa muda para +2 e o bônus de dano vai para +1d10. Pode servir de montaria Pequena com os dados do Dai-Kabuto."
    }
  },
  {
    "name": "Kobold Patrulheiro",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Combatente aliado.",
    "tiers": {
      "iniciante": "garante +1 em testes de ataque e rolagens de dano ao flanquear (+3 total no ataque).",
      "veterano": "bônus de flanco aumenta para +2.",
      "mestre": "o dono do parceiro pode flanquear mesmo criaturas imunes a flanco."
    }
  },
  {
    "name": "Leão",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e, uma vez por rodada, concede +1d6 em rolagens de dano corpo a corpo.",
      "veterano": "o bônus em rolagens de dano corpo a corpo do parceiro dobra quando você realiza uma investida.",
      "mestre": "seu deslocamento muda para 15m e o bônus fixo de dano corpo a corpo passa para +1d10."
    }
  },
  {
    "name": "Luminar",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Elemental da Luz especial.",
    "tiers": {
      "iniciante": "uma vez por rodada, o dono pode gastar 1 PM para curar 2d4 PV por luz ou causar 2d4 pontos de dano não letal de luz em um alvo curto.",
      "veterano": "como anterior, e pode gastar 2 PM para conceder +2 em testes de ataque e resistência para si e aliados em alcance curto por 1 rodada.",
      "mestre": "como anterior, mas permite gastar 3 PM para curar 6d4 PV ou causar 6d4 pontos de dano não letal de luz."
    }
  },
  {
    "name": "Malafex",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Ajudante especial (apenas devotos de Nimb).",
    "tiers": {
      "iniciante": "permite usar Sorte dos Loucos. Se já possuir o poder, o custo dele cai para 1d4 PM.",
      "veterano": "permite aplicar Sorte dos Loucos em aliados curtos (se falhar, o aliado perde os PM).",
      "mestre": "quando um inimigo curto faz um teste, pode gastar 2 PM para forçar rerolagem; se ele ainda passar, você perde 1d6 PM (ou 1d4 se tiver Sorte dos Loucos)."
    }
  },
  {
    "name": "Mamute",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme. Como montaria do jogador, fornece exatamente os mesmos bônus, progressões e regras mecânicas descritas para o Elefante (p. 216).",
    "tiers": null
  },
  {
    "name": "Pakk",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Um pakk familiar permite que você lance Explosão de Chamas. Caso aprenda novamente essa magia, seu custo diminui em –1 PM.",
    "tiers": null
  },
  {
    "name": "Pantera",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Assassino especial.",
    "tiers": {
      "iniciante": "uma vez por rodada, ao infligir dano com ataque corpo a corpo, pode deixar o alvo sob sangramento.",
      "veterano": "adiciona +2 na CD dos testes de primeiros socorros/cura para remover o sangramento provocado por você.",
      "mestre": "os sangramentos que você provoca passam a exigir dois sucessos em testes para serem totalmente estancados."
    }
  },
  {
    "name": "Pégaso",
    "category": "montaria",
    "source": "deuses",
    "desc": "Montaria Grande (aceita apenas devotos de deuses que possuam paladinos).",
    "tiers": {
      "iniciante": "você recebe +2 em Intuição e seu deslocamento muda para 15m (ainda não consegue voar montado).",
      "veterano": "como anterior, mas seu deslocamento muda para voo 15m e você recebe +2 em Vontade.",
      "mestre": "você recebe uma ação de movimento extra por turno (apenas para se deslocar) e +2 em testes de ataque."
    }
  },
  {
    "name": "Pégaso de Khalmyr",
    "category": "montaria",
    "source": "deuses",
    "desc": "Montaria Grande Mestre (aceita apenas devotos de Khalmyr ou heróis julgados dignos). Seu deslocamento muda para 18m (voo 36m), concede ao cavaleiro uma ação de movimento extra por turno (apenas para se deslocar) e permite lançar a magia Círculo da Justiça (se já a conhecer, reduz seu custo em –1 PM).",
    "tiers": null
  },
  {
    "name": "Perdigueiro Troll",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Especial (perseguidor).",
    "tiers": {
      "iniciante": "fornece +2 em testes de Percepção e Sobrevivência para o dono.",
      "veterano": "concede +2 em testes para agarrar e derrubar, e permite ao dono manter uma criatura Grande ou menor agarrada sem ocupar as mãos.",
      "mestre": "altera os bônus das perícias e manobras para +5 e, uma vez por rodada, quando o dono acerta um ataque corpo a corpo, permite iniciar a manobra agarrar como uma reação."
    }
  },
  {
    "name": "Pilly",
    "category": "parceiro",
    "source": "deuses",
    "desc": "Ajudante mágico celestial.",
    "tiers": {
      "iniciante": "reduz o custo de magias divinas da escola de Encantamento lançadas pelo mestre em -1 PM.",
      "veterano": "herda o bônus anterior e concede deslocamento de voo de 9m para o dono.",
      "mestre": "herda o voo e altera a redução de custo de PM para magias divinas de Encantamento para –2 PM."
    }
  },
  {
    "name": "Platan",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para natação 9m e concede ao cavaleiro uma ação de movimento extra por turno (restrita a se deslocar).",
      "veterano": "uma vez por rodada, permite gastar 1 PM para infligir 2d6 de impacto em um alvo curto.",
      "mestre": "velocidade de natação muda para 15m e permite pagar 4 PM para causar 6d6 de impacto em alcance curto."
    }
  },
  {
    "name": "Rinoceronte",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe +2 em testes de ataque durante investidas.",
      "veterano": "concede o uso do poder Carga de Cavalaria (se já possuir, o dano extra de investida aumenta em +1d8).",
      "mestre": "seus ataques em investidas ignoram 10 pontos de redução de dano (RD) do alvo."
    }
  },
  {
    "name": "Rinoceronte Lanoso",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe +2 em testes de ataque em investidas.",
      "veterano": "concede o uso de Carga de Cavalaria (se já possuir, o bônus de dano de investida ganha +1d8).",
      "mestre": "o deslocamento do cavaleiro e da montaria deixa de ser afetado por superfícies de gelo ou neve."
    }
  },
  {
    "name": "Sapo Atroz",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Parceiro especial.",
    "tiers": {
      "iniciante": "deslocamento muda para 9m (normal e natação), +1 ação de movimento extra por turno (apenas para se deslocar), +5 em Atletismo para saltar.",
      "veterano": "+2 em testes para derrubar e desarmar.",
      "mestre": "+10 em Atletismo e, uma vez por rodada, pode gastar 1 PM para fazer manobra desarmar ou derrubar contra um alvo a até 3m."
    }
  },
  {
    "name": "Selako",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "deslocamento muda para natação 15m e adiciona +1d6 em uma rolagem de dano corpo a corpo por rodada.",
      "veterano": "o bônus de dano na rodada sobe para +2d6.",
      "mestre": "deslocamento de natação vai para 18m e, ao desferir o bônus de dano do parceiro em um ataque, deixa o alvo sob a condição sangrando."
    }
  },
  {
    "name": "Stagh",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Concede +1 na CD das magias de frio lançadas pelo seu mestre/conjurador.",
    "tiers": null
  },
  {
    "name": "T'Peel",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Um t'peel familiar pode carregar 2 espaços de itens e permite que você lance Queda Suave.",
    "tiers": null
  },
  {
    "name": "Tatu-Montanha",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m (terrestre e natação) e você recebe uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "fornece +1 na Defesa e redução de ácido 5.",
      "mestre": "altera os bônus para +2 na Defesa e redução de ácido 10."
    }
  },
  {
    "name": "Tentacute",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Uma vez por rodada, pode ser comandado para sacar, guardar ou coletar um item solto Pequeno ou menor (1 espaço ou menos) que esteja em alcance curto.",
    "tiers": null
  },
  {
    "name": "Terrier",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Um terrier familiar concede redução de dano 2/impacto.",
    "tiers": null
  },
  {
    "name": "Tigre",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você ganha +5 de bônus em Iniciativa.",
      "veterano": "fornece +5 em testes de ataque e jogadas de dano com armas durante a primeira rodada do combate.",
      "mestre": "seu deslocamento muda para 15m e você recebe uma ação de movimento extra por turno (restrita a se deslocar)."
    }
  },
  {
    "name": "Trobo",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Besta de carga (ver p. 416) ou Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m, concede uma ação de movimento extra por turno (apenas para se deslocar) e +1 em testes de resistência.",
      "veterano": "seu deslocamento muda para 12m e o bônus em testes de resistência passa para +2.",
      "mestre": "o bônus em testes de resistência aumenta para +5."
    }
  },
  {
    "name": "Tumarkhân",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e expande o limite de carga do cavaleiro em +5 espaços.",
      "veterano": "concede uma ação de movimento extra por turno (restrita exclusivamente a se deslocar)."
    }
  },
  {
    "name": "Tuntram",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m e garante +2 em testes de ataque para derrubar e empurrar.",
      "veterano": "fornece cobertura leve contra ataques à distância e uma ação de movimento extra por rodada (apenas para se deslocar).",
      "mestre": "+2 em ataques para atropelar, impedindo inimigos de saírem do caminho voluntariamente (ainda rolam teste oposto). Atropelar com sucesso permite pagar 1 PM para embutir um ataque extra."
    }
  },
  {
    "name": "Unicórnio",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande (critério de aceitação sob avaliação do mestre).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e concede uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "seu deslocamento muda para 15m e permite lançar a magia Purificação (se já a conhecer, o custo cai em -1 PM).",
      "mestre": "cada dado de seus efeitos mágicos de cura aumenta em um passo (até o limite de d12)."
    }
  },
  {
    "name": "Urso das Cavernas",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Enorme.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você adquire redução de dano 2.",
      "veterano": "uma vez por rodada, após acertar golpe corpo a corpo, faz manobra agarrar livre sem ocupar mãos (só mantém um alvo por vez).",
      "mestre": "eleva a redução de dano concedida para 5."
    }
  },
  {
    "name": "Urso das Neves",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e você recebe redução de frio 5.",
      "veterano": "seu deslocamento muda para 12m (normal e de natação) e a redução de frio aumenta para 10.",
      "mestre": "a redução de frio concedida ao cavaleiro aumenta para 20."
    }
  },
  {
    "name": "Urso Panda",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Média.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 9m, concede +2 em testes de Diplomacia e garante uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "permite ao dono usar a habilidade Rolamento Defensivo (caso o dono já possua esse poder por classe, o custo dele cai em -1 PM).",
      "mestre": "permite ao dono usar Aparência Inofensiva (se já a tiver, a CD para resistir a ela sobe em +2)."
    }
  },
  {
    "name": "Urso Pardo",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande.",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e, uma vez por rodada, concede +1d6 em rolagens de dano corpo a corpo.",
      "veterano": "uma vez por rodada, ao acertar um ataque corpo a corpo, você pode realizar a manobra agarrar como ação livre (sem ocupar as mãos, limite de um alvo preso por vez).",
      "mestre": "altera o bônus de dano extra corpo a corpo para +1d10."
    }
  },
  {
    "name": "Velocis Caçador",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Média (baseado na progressão racial Velocis).",
    "tiers": {
      "iniciante": "deslocamento muda para 12m e expande em +1 a margem de ameaça corpo a corpo do cavaleiro.",
      "veterano": "concede +5 em saltos de Atletismo e uma ação de movimento extra por turno (apenas para deslocar).",
      "mestre": "deslocamento vai para 15m e o bônus de margem de ameaça corpo a corpo passa para +2."
    }
  },
  {
    "name": "Verilêmur",
    "category": "parceiro",
    "source": "ameacas",
    "desc": "Vigilante especial (apenas devotos de Khalmyr).",
    "tiers": {
      "iniciante": "permite conjurar Círculo da Justiça (atributo Sabedoria); se já a conhecer, o custo cai em -1 PM.",
      "veterano": "ao falhar em teste de resistência contra magia, pode gastar 2 PM para refazer o teste (uma vez por teste).",
      "mestre": "a CD para resistir ao seu Círculo da Justiça aumenta em +5."
    }
  },
  {
    "name": "Warg",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Montaria Grande (não aplica penalidades de Furtividade por tamanho).",
    "tiers": {
      "iniciante": "seu deslocamento muda para 12m e concede uma ação de movimento extra por turno (apenas para se deslocar).",
      "veterano": "você recebe +2 em Furtividade e adquire Ataque Furtivo +2d6 (acumula com fontes pré-existentes).",
      "mestre": "uma vez por rodada, ao acertar ataque corpo a corpo, você pode executar a manobra derrubar como ação livre."
    }
  },
  {
    "name": "Yazzu",
    "category": "montaria",
    "source": "deuses",
    "desc": "Ajudante elemental (Água).",
    "tiers": {
      "iniciante": "concede +2 de bônus em testes contra manobras de combate e efeitos de movimento para o Amo.",
      "veterano": "uma vez por rodada, o Amo gasta ação de movimento e 4 PM para criar onda cúbica de 4,5m curta; criaturas nela sofrem 4d4 de impacto e caem.",
      "mestre": "bônus contra manobras e movimentos sobe para +4 e o dano da onda da montaria/parceiro sobe para 4d6."
    }
  },
  {
    "name": "Troll Montaria (Adestrável)",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Se o cavaleiro for derrotado e o troll sobreviver, um herói treinado em Adestramento pode domá-lo. Vira parceiro montaria Grande.",
    "tiers": {
      "iniciante": "desl vira 12m e concede +1d8 em um dano corpo a corpo por rodada.",
      "veterano": "bônus de dano vai para +1d10 e dá +2 em testes de agarrar/derrubar.",
      "mestre": "bônus de dano vira +2d8 e o bônus de manobras sobe para +5."
    }
  },
  {
    "name": "Dragão Bicéfalo (Familiar)",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Dragões filhotes podem ser invocados como familiares (exige ovo de dragão). Magias que causam dano do mesmo tipo que o sopro do dragão têm CD aumentada em +2 e custam –1 PM.",
    "tiers": null
  },
  {
    "name": "Dragão Bicéfalo (Montaria)",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Dragões adultos podem servir como parceiro montaria (Enorme).",
    "tiers": {
      "iniciante": "deslocamento 12m (normal e voo), 2 PM por rodada para causar 3d6 pontos de dano da energia do dragão.",
      "veterano": "+1 ação de movimento por turno, 3 PM para causar 6d6 pontos de dano.",
      "mestre": "deslocamento 24m, 8 PM + ação de movimento para usar Sopro."
    }
  },
  {
    "name": "Dragão Feral (Familiar)",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Dragões filhotes podem ser invocados como familiares (exige ovo de dragão). Magias que causam dano do mesmo tipo que o sopro do dragão têm CD aumentada em +2 e custam –1 PM.",
    "tiers": null
  },
  {
    "name": "Dragão Feral (Montaria)",
    "category": "montaria",
    "source": "ameacas",
    "desc": "Dragões adultos podem servir como parceiro montaria (Enorme).",
    "tiers": {
      "iniciante": "deslocamento 12m (normal e voo), 2 PM por rodada para causar 3d6 pontos de dano da energia do dragão.",
      "veterano": "+1 ação de movimento por turno, 3 PM para causar 6d6 pontos de dano.",
      "mestre": "deslocamento 24m, 8 PM + ação de movimento para usar Sopro."
    }
  },
  {
    "name": "Dragão Filhote (Familiar)",
    "category": "familiar",
    "source": "ameacas",
    "desc": "Dragões filhotes podem ser invocados como familiares (exige ovo de dragão). Magias que causam dano do mesmo tipo que o sopro do dragão têm CD aumentada em +2 e custam –1 PM.",
    "tiers": null
  },
  {
    "name": "Dragão Filhote (Montaria)",
    "category": "montaria",
    "source": "amecas",
    "desc": "Dragões jovens podem servir como parceiro montaria (Grande).",
    "tiers": {
      "iniciante": "deslocamento 12m (normal e voo), 1 PM por rodada para causar 2d6 pontos de dano da energia do dragão.",
      "veterano": "+1 ação de movimento por turno, 2 PM para causar 4d6 pontos de dano.",
      "mestre": "deslocamento 18m, 5 PM + ação de movimento para usar Sopro."
    }
  },
  {
    "name": "Companheiro Aberrante",
    "category": "parceiro",
    "source": "Heróis de Arton",
    "desc": "Um de seus companheiros animais que recebe o tipo aberrante. Pré-requisitos: druida de Aharadak, Companheiro Animal, 6º nível de druida.",
    "tiers": {
      "iniciante": "uma vez por rodada, você pode gastar 1 PM para disparar um pulso mental contra uma criatura em alcance curto; ela sofre 2d6 pontos de dano psíquico ou perde 1d4 PM, a sua escolha.",
      "veterano": "você também pode gastar 2 PM para causar 4d6 pontos de dano ou fazer a criatura perder 2d4 PM.",
      "mestre": "você também pode gastar 4 PM para causar 6d6 pontos de dano ou fazer a criatura perder 3d4 PM."
    }
  },
  {
    "name": "Reabilitador",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Um juiz com treinamento especial para espalhar a justiça de Khalmyr por meio da Casa dos Desgarrados (pode ser contratado por T$ 1.000 e acompanha o grupo até o fim da aventura).",
    "especial": "Durante uma cena à escolha dos jogadores, ele faz todos os modificadores serem iguais à média dos modificadores de todas as criaturas presentes. No final da cena, ele se despede do grupo."
  },
  {
    "name": "Allihennali",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Estes espíritos feéricos lembram uma pequena esfera de luz com quatro asas finas de inseto.",
    "tiers": {
      "iniciante": "uma vez por rodada, você pode gastar 1 PM para curar 2d6 PV de uma criatura em alcance curto.",
      "veterano": "como acima, mas também reduz o custo de magias que geram efeitos mágicos de cura em –2 PM.",
      "mestre": "como acima, mas você também pode gastar 3 PM para curar 6d6 PV."
    },
  },
  {
    "name": "Guaxininjas",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Não se sabe ao certo se é possível treinar guaxinins comuns para desempenharem o papel de guaxininjas, mas acredita-se que eles seriam um parceiro capanga especial.",
    "especial": "Uma vez por aventura, você pode gastar uma ação de movimento e 2 PM para fazer um assovio e invocar 1d4+1 guaxininjas capangas em espaços desocupados em alcance curto — eles surgem de um beco próximo, por trás de uma pedra ou de maneiras igualmente furtivas. Guaxininjas têm deslocamento 9m, Defesa 17, dano 1d4 de corte cada e Ataque Furtivo +1d6. Eles desaparecem quando morrem ou no fim da cena."

  },
  {
    "name": "Coruja Conselheira",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Uma coruja sábia que voa ao redor de você piando dicas úteis. Ajudante.",
    "tiers": {
      "iniciante": "no início de cada cena, você recebe 1d4 de dados de auxílio. Ao realizar um teste de perícia, pode gastar um ou mais desses dados e adicionar o resultado deles como bônus no teste.",
      "veterano": "como acima, mas você recebe 2d4.",
      "mestre": "como acima, mas você recebe 3d6."
    }
  },
  {
    "name": "Glop de Guarda",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Este pingo verde fica na sua frente, absorvendo ataques contra você. Guardião.",
    "tiers": {
      "iniciante": "você recebe redução de dano 1.",
      "veterano": "muda para redução de dano 2 e, sempre que uma criatura adjacente a você o atacar, ela sofre 1d6 de dano de ácido.",
      "mestre": "muda para redução de dano 3 e 2d6 de dano de ácido. Além disso, quando sofre dano, você pode fazer o glop absorvê-lo: sofre apenas metade do dano, mas o glop se divide em vários glopinhos e não pode mais ajudá-lo até a próxima cena, quando cresce de volta ao tamanho normal."
    }
  },
  {
    "name": "Mecanosservo Ajudante",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Autômato pequeno e prestativo que funciona como um parceiro ajudante.",
    "tiers": {
      "iniciante": "você recebe +2 em duas perícias.",
      "veterano": "muda para +2 em três perícias.",
      "mestre": "muda para +4 em três perícias. As perícias são definidas pelo parceiro. Um ajudante não pode fornecer bônus em Luta ou Pontaria."
    }
  },
  {
    "name": "Mecanosservo Guardião",
    "category": "parceiro",
    "source": "dragaobrasil",
    "desc": "Autômato robusto, programado para se colocar entre seu proprietário e o perigo. Guardião.",
    "tiers": {
      "iniciante": "você recebe +2 na Defesa.",
      "veterano": "como acima e, quando sofre dano, você pode gastar 1 PM para receber RD 5 contra este dano.",
      "mestre": "você recebe +4 na Defesa e, quando sofre dano, pode gastar 2 PM para receber RD 10 contra este dano."
    }
  },
  {
    "name": "Bando Duyshidakk",
    "category": "capanga",
    "source": "herois",
    "desc": "Um grupo de combatentes duyshidakk.",
    "tiers": {
      "iniciante": "cinco duyshidakk (deslocamento 9m, Defesa 15, dano 1d6+1 de corte cada).",
      "veterano": "o grupo aumenta para seis duyshidakk infantes.",
      "mestre": "o grupo aumenta para sete duyshidakk e o dano deles se torna 2d4+2."
    }
  },
  {
    "name": "Esqueletos Animados",
    "category": "capanga",
    "source": "herois",
    "desc": "Um punhado de esqueletos de várias criaturas, reanimados como mortos-vivos sem mente.",
    "tiers": {
      "iniciante": "quatro esqueletos (deslocamento 9m, Defesa 18, dano 1d6+1 de corte cada).",
      "veterano": "o grupo aumenta para cinco esqueletos e eles recebem redução de corte, frio e perfuração 5.",
      "mestre": "o grupo aumenta para seis esqueletos e o dano deles se torna 1d8+2."
    }
  },
  {
    "name": "Pelotão de Infantaria",
    "category": "capanga",
    "source": "herois",
    "desc": "Um grupo de soldados com treinamento e equipamento básicos.",
    "tiers": {
      "iniciante": "quatro infantes (deslocamento 9m, Defesa 16, dano 2d4+1 de corte cada).",
      "veterano": "o grupo aumenta para cinco infantes.",
      "mestre": "o grupo aumenta para seis infantes e a Defesa deles aumenta para 18."
    }
  },
  {
    "name": "Tripulação",
    "category": "capanga",
    "source": "herois",
    "desc": "Uma equipe de tripulantes acostumados a operar as mais diversas embarcações, e a lutar em sua defesa.",
    "tiers": {
      "iniciante": "quatro tripulantes (deslocamento 9m, Defesa 14, dano 1d6 de corte cada; fornecem +1 em Pilotagem).",
      "veterano": "a equipe aumenta para cinco tripulantes e o bônus em Pilotagem aumenta para +2.",
      "mestre": "a equipe aumenta para seis tripulantes, o dano deles se torna 1d8 e o bônus em Pilotagem aumenta para +5."
    }
  },
  {
    "name": "Turba de Camponeses",
    "category": "capanga",
    "source": "herois",
    "desc": "Um grupo de camponeses. Numerosos, mas sem treinamento ou equipamento.",
    "tiers": {
      "iniciante": "seis camponeses (deslocamento 9m, Defesa 10, dano 1d6 de perfuração cada).",
      "veterano": "o grupo aumenta para oito camponeses.",
      "mestre": "o grupo aumenta para dez camponeses e o dano deles se torna 1d6+1."
    }
  },
  {
    "name": "Unidade de Arqueiros",
    "category": "capanga",
    "source": "herois",
    "desc": "Um grupamento de arqueiros com treinamento e equipamento básicos. Ao contrário de outros capangas, eles podem causar dano a inimigos em alcance curto que não tenham cobertura.",
    "tiers": {
      "iniciante": "quatro arqueiros (deslocamento 9m, Defesa 14, dano 1d6 de perfuração cada).",
      "veterano": "o grupo aumenta para cinco arqueiros.",
      "mestre": "o grupo aumenta para seis arqueiros e o dano deles se torna 1d8."
    }
  }
];
