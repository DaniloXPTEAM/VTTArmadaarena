// ============================================================
//  CLASSES DE TORMENTA20 — dados-base
// ------------------------------------------------------------
//  Cada classe tem: id, name, source, desc, attribute, pv, pm, skills.
//  `pv` e `pm` são os valores de progressão POR NÍVEL (regra T20:
//  PV inicial = pv-base + CON, ganha +pv a cada nível seguinte;
//  PM segue o mesmo princípio com o atributo-chave).
//  `variants` lista os nomes de variante de classe conhecidos,
//  com a fonte e um link de referência (ainda faltam os poderes
//  de classe por nível de cada classe/variante — próxima etapa).
// ============================================================

const classesData = [
  {
    id: 'arcanista',
    name: 'Arcanista',
    source: 'T20',
    desc: 'Um conjurador de magias arcanas, por meio de estudo, um foco ou dom natural.',
    attribute: 'Inteligência ou Carisma',
    pv: 8,
    pm: 6,
    skills: 'Misticismo e Vontade, mais 2',
    skillsFull: 'Misticismo (Int) e Vontade (Sab), mais 2 a sua escolha entre Conhecimento (Int), Diplomacia (Car), Enganação (Car), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Nobreza (Int), Ofício (Int) e Percepção (Sab).',
    proficiencies: 'Nenhuma.',
    variants: [
      { name: 'Necromante', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Arcanista_-_Necromante_(Her%C3%B3is)' },
      { name: 'Sentinela', source: 'Dragão Brasil', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Arcanista_-_Sentinela_(Drag%C3%A3o_Brasil)' }
    ]
  },
  {
    id: 'barbaro',
    name: 'Bárbaro',
    source: 'T20',
    desc: 'Um combatente primitivo, que usa fúria e instintos para destruir seus inimigos.',
    attribute: 'Força',
    pv: 24,
    pm: 3,
    skills: 'Fortitude e Luta, mais 4',
    skillsFull: 'Fortitude (Con) e Luta (For), mais 4 a sua escolha entre Adestramento (Car), Atletismo (For), Cavalgar (Des), Iniciativa (Des), Intimidação (Car), Ofício (Int), Percepção (Sab), Pontaria (Des), Sobrevivência (Sab) e Vontade (Sab).',
    proficiencies: 'Armas marciais e escudos.',
    variants: [
      { name: 'Machado de Pedra', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/B%C3%A1rbaro_-_Machado_de_Pedra_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'bardo',
    name: 'Bardo',
    source: 'T20',
    desc: 'Um artista errante e faz-tudo versátil, sempre com a solução certa para cada ocasião.',
    attribute: 'Carisma',
    pv: 12,
    pm: 4,
    skills: 'Atuação e Reflexos, mais 6',
    skillsFull: 'Atuação (Car) e Reflexos (Des), mais 6 a sua escolha entre Acrobacia (Des), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Enganação (Car), Furtividade (Des), Iniciativa (Des), Intuição (Sab), Investigação (Int), Jogatina (Car), Ladinagem (Des), Luta (For), Misticismo (Int), Nobreza (Int), Percepção (Sab), Pontaria (Des) e Vontade (Sab).',
    proficiencies: 'Armas marciais.',
    variants: [
      { name: 'Magimarcialista', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Bardo_-_Magimarcialista_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'bucaneiro',
    name: 'Bucaneiro',
    source: 'T20',
    desc: 'Um navegador inconsequente e galante, sempre em busca de ouro ou emoção.',
    attribute: 'Destreza',
    pv: 16,
    pm: 3,
    skills: 'Luta ou Pontaria, Reflexos, mais 4',
    skillsFull: 'Luta (For) ou Pontaria (Des), Reflexos (Des), mais 4 a sua escolha entre Acrobacia (Des), Atletismo (For), Atuação (Car), Enganação (Car), Fortitude (Con), Furtividade (Des), Iniciativa (Des), Intimidação (Car), Jogatina (Car), Luta (For), Ofício (Int), Percepção (Sab), Pilotagem (Des) e Pontaria (Des).',
    proficiencies: 'Armas marciais.',
    variants: [
      { name: 'Duelista', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Bucaneiro_-_Duelista_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'cacador',
    name: 'Caçador',
    source: 'T20',
    desc: 'Um exterminador de monstros e mestre da sobrevivência em áreas selvagens.',
    attribute: 'Força ou Destreza',
    pv: 16,
    pm: 4,
    skills: 'Luta ou Pontaria, Sobrevivência, mais 6',
    skillsFull: 'Luta (For) ou Pontaria (Des), Sobrevivência (Sab), mais 6 a sua escolha entre Adestramento (Car), Atletismo (For), Cavalgar (Des), Cura (Sab), Fortitude (Con), Furtividade (Des), Iniciativa (Des), Investigação (Int), Luta (For), Ofício (Int), Percepção (Sab), Pontaria (Des) e Reflexos (Des).',
    proficiencies: 'Armas marciais e escudos.',
    variants: [
      { name: 'Miragem', source: 'Dragão Brasil', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Ca%C3%A7ador_-_Miragem_(Drag%C3%A3o_Brasil)' },
      { name: 'Seteiro', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Ca%C3%A7ador_-_Seteiro_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'cavaleiro',
    name: 'Cavaleiro',
    source: 'T20',
    desc: 'Um combatente honrado, especializado em suportar dano e proteger os outros.',
    attribute: 'Força',
    pv: 20,
    pm: 3,
    skills: 'Fortitude e Luta, mais 2',
    skillsFull: 'Fortitude (Con) e Luta (For), mais 2 a sua escolha entre Adestramento (Car), Atletismo (For), Cavalgar (Des), Diplomacia (Car), Guerra (Int), Iniciativa (Des), Intimidação (Car), Nobreza (Int), Percepção (Sab) e Vontade (Sab).',
    proficiencies: 'Armas marciais, armaduras pesadas e escudos.',
    variants: [
      { name: 'Vassalo', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Cavaleiro_-_Vassalo_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'clerigo',
    name: 'Clérigo',
    source: 'T20',
    desc: 'Servo de um dos deuses de Arton, usa poderes divinos para defender seus ideais.',
    attribute: 'Sabedoria',
    pv: 16,
    pm: 5,
    skills: 'Religião e Vontade, mais 2',
    skillsFull: 'Religião (Sab) e Vontade (Sab), mais 2 a sua escolha entre Conhecimento (Int), Cura (Sab), Diplomacia (Car), Fortitude (Con), Iniciativa (Des), Intuição (Sab), Luta (For), Misticismo (Int), Nobreza (Int), Ofício (Int) e Percepção (Sab).',
    proficiencies: 'Armaduras pesadas e escudos.',
    variants: [
      { name: 'Cruzado', source: 'Dragão Brasil', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Cl%C3%A9rigo_-_Cruzado_(Drag%C3%A3o_Brasil)' },
      { name: 'Usurpador', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Cl%C3%A9rigo_-_Usurpador_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'druida',
    name: 'Druida',
    source: 'T20',
    desc: 'Guardião do mundo natural e devoto das forças selvagens, naturais ou monstruosas.',
    attribute: 'Sabedoria',
    pv: 16,
    pm: 4,
    skills: 'Sobrevivência e Vontade, mais 4',
    skillsFull: 'Sobrevivência (Sab) e Vontade (Sab), mais 4 a sua escolha entre Adestramento (Car), Atletismo (For), Cavalgar (Des), Conhecimento (Int), Cura (Sab), Fortitude (Con), Iniciativa (Des), Intuição (Sab), Luta (For), Misticismo (Int), Ofício (Int), Percepção (Sab) e Religião (Sab).',
    proficiencies: 'Escudos.',
    variants: [
      { name: 'Ermitão', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Druida_-_Ermit%C3%A3o_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'guerreiro',
    name: 'Guerreiro',
    source: 'T20',
    desc: 'O especialista supremo em técnicas de combate com armas.',
    attribute: 'Força ou Destreza',
    pv: 20,
    pm: 3,
    skills: 'Luta ou Pontaria, Fortitude, mais 2',
    skillsFull: 'Luta (For) ou Pontaria (Des), Fortitude (Con), mais 2 a sua escolha entre Adestramento (Car), Atletismo (For), Cavalgar (Des), Guerra (Int), Iniciativa (Des), Intimidação (Car), Luta (For), Ofício (Int), Percepção (Sab), Pontaria (Des) e Reflexos (Des).',
    proficiencies: 'Armas marciais, armaduras pesadas e escudos.',
    variants: [
      { name: 'Inovador', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Guerreiro_-_Inovador_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'inventor',
    name: 'Inventor',
    source: 'T20',
    desc: 'Um ferreiro, alquimista ou engenhoqueiro, especializado em fabricar e usar itens.',
    attribute: 'Inteligência',
    pv: 12,
    pm: 4,
    skills: 'Ofício e Vontade, mais 4',
    skillsFull: 'Ofício (Int) e Vontade (Sab), mais 4 a sua escolha entre Conhecimento (Int), Cura (Sab), Diplomacia (Car), Fortitude (Con), Iniciativa (Des), Investigação (Int), Luta (For), Misticismo (Int), Ofício (Int), Pilotagem (Des), Percepção (Sab) e Pontaria (Des).',
    proficiencies: 'Nenhuma.',
    variants: [
      { name: 'Alquimista', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Inventor_-_Alquimista_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'ladino',
    name: 'Ladino',
    source: 'T20',
    desc: 'Aventureiro cheio de truques, confiando mais em agilidade e esperteza que em força bruta.',
    attribute: 'Destreza ou Inteligência',
    pv: 12,
    pm: 4,
    skills: 'Ladinagem e Reflexos, mais 8',
    skillsFull: 'Ladinagem (Des) e Reflexos (Des), mais 8 a sua escolha entre Acrobacia (Des), Atletismo (For), Atuação (Car), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Enganação (Car), Furtividade (Des), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Jogatina (Car), Luta (For), Ofício (Int), Percepção (Sab), Pilotagem (Des) e Pontaria (Des).',
    proficiencies: 'Nenhuma.',
    variants: [
      { name: 'Capanga', source: 'Dragão Brasil', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Ladino_-_Capanga_(Drag%C3%A3o_Brasil)' },
      { name: 'Ventanista', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Ladino_-_Ventanista_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'lutador',
    name: 'Lutador',
    source: 'T20',
    desc: 'Um especialista em combate desarmado rústico e durão.',
    attribute: 'Força',
    pv: 20,
    pm: 3,
    skills: 'Fortitude e Luta, mais 4',
    skillsFull: 'Fortitude (Con) e Luta (For), mais 4 a sua escolha entre Acrobacia (Des), Adestramento (Car), Atletismo (For), Enganação (Car), Furtividade (Des), Iniciativa (Des), Intimidação (Car), Ofício (Int), Percepção (Sab), Pontaria (Des) e Reflexos (Des).',
    proficiencies: 'Nenhuma.',
    variants: [
      { name: 'Atleta', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Lutador_-_Atleta_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'mistico',
    name: 'Místico',
    source: 'Dragão Brasil',
    desc: 'Conjuradores especializados que dominam as forças primordiais por meio de uma magia extremamente específica.',
    attribute: 'Sabedoria',
    pv: 16,
    pm: 4,
    skills: 'Misticismo e Vontade, mais 4',
    skillsFull: 'Misticismo (Int) e Vontade (Sab), mais 4 a sua escolha entre Acrobacia (Des), Atletismo (For), Conhecimento (Int), Cura (Sab), Diplomacia (Car), Fortitude (Con), Iniciativa (Des), Luta (For), Ofício (Int), Percepção (Sab), Pontaria (Des) e Reflexos (Des).',
    proficiencies: 'Armas marciais.',
    variants: []
  },
  {
    id: 'nobre',
    name: 'Nobre',
    source: 'T20',
    desc: 'Um membro da alta sociedade cujas principais armas são as palavras e o orgulho.',
    attribute: 'Carisma',
    pv: 16,
    pm: 4,
    skills: 'Diplomacia ou Intimidação, Vontade, mais 4',
    skillsFull: 'Diplomacia (Car) ou Intimidação (Car), Vontade (Sab), mais 4 a sua escolha entre Adestramento (Car), Atuação (Car), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Enganação (Car), Fortitude (Con), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Jogatina (Car), Luta (For), Nobreza (Int), Ofício (Int), Percepção (Sab) e Pontaria (Des).',
    proficiencies: 'Armas marciais, armaduras pesadas e escudos.',
    variants: [
      { name: 'Burguês', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Nobre_-_Burgu%C3%AAs_(Her%C3%B3is)' },
      { name: 'Comandante', source: 'Dragão Brasil', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Nobre_-_Comandante_(Drag%C3%A3o_Brasil)' }
    ]
  },
  {
    id: 'paladino',
    name: 'Paladino',
    source: 'T20',
    desc: 'Um campeão do bem e da ordem, o perfeito soldado dos deuses.',
    attribute: 'Força e Carisma',
    pv: 20,
    pm: 3,
    skills: 'Luta e Vontade, mais 2',
    skillsFull: 'Luta (For) e Vontade (Sab), mais 2 a sua escolha entre Adestramento (Car), Atletismo (For), Cavalgar (Des), Cura (Sab), Diplomacia (Car), Fortitude (Con), Guerra (Int), Iniciativa (Des), Intuição (Sab), Nobreza (Int), Percepção (Sab) e Religião (Sab).',
    proficiencies: 'Armas marciais, armaduras pesadas e escudos.',
    variants: [
      { name: 'Santo', source: 'Heróis de Arton', url: 'https://tormenta-collab.fandom.com/pt-br/wiki/Paladino_-_Santo_(Her%C3%B3is)' }
    ]
  },
  {
    id: 'samurai',
    name: 'Samurai',
    source: 'Dragão Brasil',
    desc: 'Elite guerreira de Tamura, equipado com armas poderosas e uma honra inabalável.',
    attribute: 'Força e Sabedoria',
    pv: 20,
    pm: 5,
    skills: 'Luta e Vontade, mais 2',
    skillsFull: 'Luta (For) e Vontade (Sab), mais 2 a sua escolha entre Acrobacia (Des), Adestramento (Car), Atletismo (For), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Fortitude (Con), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Nobreza (Int), Ofício (Int), Percepção (Sab) e Pontaria (Des).',
    proficiencies: 'Armas marciais e armaduras pesadas.',
    variants: []
  },
  {
    id: 'soldado',
    name: 'Soldado',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'O especialista supremo em todas as formas e técnicas de combate.',
    attribute: 'Força ou Destreza',
    pv: 20,
    pm: 3,
    skills: 'Luta e Vontade, mais 2',
    skillsFull: 'Luta (For) e Vontade (Sab), mais 2 a sua escolha entre Acrobacia (Des), Adestramento (Car), Atletismo (For), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Fortitude (Con), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Nobreza (Int), Ofício (Int), Percepção (Sab) e Pontaria (Des).',
    proficiencies: 'Armas marciais e escudos.',
    variants: []
  },
  {
    id: 'frade',
    name: 'Frade',
    source: 'T20',
    desc: 'Um devoto guerreiro que combina fé e força física para combater o mal.',
    attribute: 'Força e Sabedoria',
    pv: 20,
    pm: 3,
    skills: 'Religião e Vontade, mais 4',
    skillsFull: 'Religião (Sab) e Vontade (Sab), mais 4 a sua escolha entre Adestramento (Car), Atuação (Car), Conhecimento (Int), Cura (Sab), Diplomacia (Car), Fortitude (Con), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Misticismo (Int), Ofício (Int), Percepção (Sab) e Nobreza (Int).',
    proficiencies: 'Nenhuma.',
    variants: []
  },
  {
    id: 'treinador',
    name: 'Treinador',
    source: 'T20',
    desc: 'Um especialista em treinar e comandar criaturas e aliados em combate.',
    attribute: 'Carisma',
    pv: 12,
    pm: 4,
    skills: 'Adestramento e Vontade, mais 4',
    skillsFull: 'Adestramento (Car) e Vontade (Sab), mais 4 a sua escolha entre Atletismo (For), Cavalgar (Des), Diplomacia (Car), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Luta (For), Ofício (Int), Percepção (Sab), Pontaria (Des), Reflexos (Des), Religião (Sab) e Sobrevivência (Sab).',
    proficiencies: 'Nenhuma.',
    variants: []
  }

  // Próxima etapa: adicionar `powersByLevel` (poderes de classe por nível,
  // 1-20) a cada classe e variante acima.
];
