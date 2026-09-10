// ============================================================
//  ORIGENS — Data File
//  Formato:
//    type: 'normal' → usuário escolhe `chooseCount` benefícios
//    type: 'atlas'  → benefícios automáticos (sem escolha)
// ============================================================

const origensData = [

  // ──────────────────────────────────────────────────────────
  //  ORIGENS NORMAIS (T20)
  // ──────────────────────────────────────────────────────────
  {
    id: 'acolito',
    name: 'Acólito',
    type: 'normal',
    source: 'T20',
    desc: `Neste mundo agraciado com tantos deuses e igrejas, muitos ingressam cedo em alguma ordem religiosa — o que, dependendo de quem é seu deus padroeiro, pode ser motivo de admiração ou repulsa. Talvez você tenha ouvido o chamado da fé, seguiu a tradição espiritual de sua família, ou apenas foi abandonado quando pequeno às portas de um templo ou mosteiro. Tenha ou não se tornado um devoto, suas lembranças são carregadas de orações, evangelhos e outros ensinamentos.`,
    items: 'Símbolo sagrado, traje de sacerdote.',
    chooseCount: 2,
    // Cada benefício tem: type ('skill' ou 'power'), name, desc (opcional para skills)
    // Para poderes do data.js, o desc é buscado automaticamente; para únicos, coloque desc + unique:true
    benefits: [
      {
        type: 'skill',
        name: 'Cura',
        desc: 'Você é treinado em Cura.'
      },
      {
        type: 'skill',
        name: 'Religião',
        desc: 'Você é treinado em Religião.'
      },
      {
        type: 'skill',
        name: 'Vontade',
        desc: 'Você é treinado em Vontade.'
      },
      {
        type: 'power',
        name: 'Medicina'
        // desc será buscado em powersData pelo nome
      },
      {
        type: 'power',
        name: 'Membro da Igreja',
        desc: 'Você consegue hospedagem confortável e informação em qualquer templo de sua divindade, para você e seus aliados.',
        unique: true  // poder exclusivo desta origem, não está em powersData
      },
      {
        type: 'power',
        name: 'Vontade de Ferro'
        // desc será buscado em powersData pelo nome
      },

    ]
  },

  {
    id: 'amigo-dos-animais',
    name: 'Amigo dos Animais',
    type: 'normal',
    source: 'T20',
    desc: 'Você pode ter sido cavalariço no estábulo de um castelo, criador de gado em uma fazenda, ginete do Reino dos Cavalos ou mesmo tratador em um zoológico ou circo. Desde criança você tem facilidade em lidar com animais, sempre conversou com eles e sentiu ser capaz de compreendê-los.',
    items: 'Cão de caça, cavalo, pônei ou trobo (escolha um).',
    chooseCount: 2,
    benefits: [
      {
        type: 'skill',
        name: 'Adestramento'
      },
      {
        type: 'skill',
        name: 'Cavalgar'
      },
      {
        type: 'power',
        name: 'Amigo Especial',
        unique: true,
        desc: 'Você recebe +5 em testes de Adestramento com animais. Além disso, possui um animal de estimação que o auxilia (parceiro que fornece +2 em uma perícia a sua escolha, exceto Luta ou Pontaria, e não conta no limite de parceiros).'
      }
    ]
  },

  // --- Continuação das ORIGENS NORMAIS (T20) ---

  {
    id: 'amnesico',
    name: 'Amnésico',
    type: 'normal',
    source: 'T20',
    desc: 'Você perdeu a maior parte da memória. Sabe apenas o próprio nome, ou nem isso. Você não sabe como recebeu seu treinamento; apenas tem uma intuição sobre aquilo que consegue fazer.',
    items: 'Um ou mais itens (somando até T$ 500) que podem ser uma pista misteriosa do seu passado.',
    chooseCount: 2, // Caso especial: mestre escolhe
    benefits: [
      {
        type: 'power',
        name: 'Lembranças Graduais',
        unique: true,
        desc: 'Você pode fazer um teste de Sabedoria (CD 10) para reconhecer pessoas, criaturas ou lugares do seu passado.'
      },
      {
        type: 'special',
        name: 'Escolha do Mestre',
        desc: 'Você recebe uma perícia e um poder escolhidos pelo mestre.'
      }
    ]
  },

  {
    id: 'aristocrata',
    name: 'Aristocrata',
    type: 'normal',
    source: 'T20',
    desc: 'Você nasceu na nobreza. Recebeu educação sofisticada em assuntos acadêmicos, política mercantil ou torneios de cavalaria.',
    items: 'Joia de família (T$ 300), traje da corte.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Diplomacia' },
      { type: 'skill', name: 'Enganação' },
      { type: 'skill', name: 'Nobreza' },
      { type: 'power', name: 'Comandar' },
      {
        type: 'power',
        name: 'Sangue Azul',
        unique: true,
        desc: 'Você tem influência política suficiente para ser tratado com leniência pela guarda ou conseguir audiências nobres.'
      }
    ]
  },

  {
    id: 'artesao',
    name: 'Artesão',
    type: 'normal',
    source: 'T20',
    desc: 'Alfaiate, marceneiro ou armeiro. Você foi treinado para fabricar itens importantes no mundo civilizado.',
    items: 'Instrumentos de ofício, um item que você possa fabricar de até T$ 50.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Ofício' },
      { type: 'skill', name: 'Vontade' },
      { type: 'power', name: 'Sortudo' },
      {
        type: 'power',
        name: 'Frutos do Trabalho',
        unique: true,
        desc: 'No início de cada aventura, recebe itens gerais que possa fabricar no valor total de T$ 50 (aumenta por patamar).'
      }
    ]
  },

  {
    id: 'artista',
    name: 'Artista',
    type: 'normal',
    source: 'T20',
    desc: 'Você possui talento e produz entretenimento, alimento para o coração e a alma, seja por música, atuação ou dança.',
    items: 'Estojo de disfarces ou um instrumento musical.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atuação' },
      { type: 'skill', name: 'Enganação' },
      { type: 'power', name: 'Atraente' },
      { type: 'power', name: 'Sortudo' },
      { type: 'power', name: 'Torcida' },
      {
        type: 'power',
        name: 'Dom Artístico',
        unique: true,
        desc: 'Recebe +2 em testes de Atuação e o dobro de tibares em apresentações.'
      }
    ]
  },

  {
    id: 'assistente-de-laboratorio',
    name: 'Assistente de Laboratório',
    type: 'normal',
    source: 'T20',
    desc: 'Ajudante de alquimista ou mago. Exposição prolongada a substâncias perigosas talvez tenha despertado suas habilidades.',
    items: 'Instrumentos de Ofício (alquimista).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Ofício (alquimista)' },
      { type: 'skill', name: 'Misticismo' },
      { type: 'power', name: 'Venefício' },
      { type: 'power', name: 'Poder da Tormenta', powerPicker: { types: ['tormenta'], count: 1 } },
      {
        type: 'power',
        name: 'Esse Cheiro...',
        unique: true,
        desc: '+2 em Fortitude e detecta automaticamente itens alquímicos em alcance curto.'
      }
    ]
  },

  {
    id: 'batedor',
    name: 'Batedor',
    type: 'normal',
    source: 'T20',
    desc: 'Seja conduzindo caravanas ou rastreando inimigos, você aprendeu a achar caminhos e guiar outros com segurança.',
    items: 'Barraca, equipamento de viagem, arma simples ou marcial de ataque à distância.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Furtividade' },
      { type: 'skill', name: 'Percepção' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Estilo de Disparo' },
      { type: 'power', name: 'Sentidos Aguçados' },
      {
        type: 'power',
        name: 'À Prova de Tudo',
        unique: true,
        desc: 'Não sofre penalidade em deslocamento e Sobrevivência por clima ruim ou terreno difícil natural.'
      }
    ]
  },

  {
    id: 'capanga',
    name: 'Capanga',
    type: 'normal',
    source: 'T20',
    desc: 'Trabalhou como músculos para algum bandido ou guilda. Você sabe como erguer alguém pelo tornozelo até as moedas caírem.',
    items: 'Tatuagem ou adereço de gangue (+1 Intimidação), arma simples corpo a corpo.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Luta' },
      { type: 'skill', name: 'Intimidação' },
      { type: 'power', name: 'Poder de Combate', powerPicker: { types: ['combat'], count: 1 } },
      {
        type: 'power',
        name: 'Confissão',
        unique: true,
        desc: 'Pode usar Intimidação para interrogar sem custo e em um minuto.'
      }
    ]
  },

  {
    id: 'charlatao',
    name: 'Charlatão',
    type: 'normal',
    source: 'T20',
    desc: 'Talento para resolver problemas com conversa. Você percebe o que as pessoas querem ou temem e usa palavras como espadas.',
    items: 'Estojo de disfarces, joia falsificada (T$ 100 aparente).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Enganação' },
      { type: 'skill', name: 'Jogatina' },
      { type: 'power', name: 'Aparência Inofensiva' },
      { type: 'power', name: 'Sortudo' },
      {
        type: 'power',
        name: 'Alpinista Social',
        unique: true,
        desc: 'Pode substituir testes de Diplomacia por testes de Enganação.'
      }
    ]
  },

  {
    id: 'circense',
    name: 'Circense',
    type: 'normal',
    source: 'T20',
    desc: 'Treinamento com acrobacia, malabarismo ou mágica. Aptidões que se mostram úteis em suas aventuras.',
    items: 'Três bolas coloridas para malabarismo (+1 em Atuação).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Acrobacia' },
      { type: 'skill', name: 'Atuação' },
      { type: 'skill', name: 'Reflexos' },
      { type: 'power', name: 'Acrobático' },
      { type: 'power', name: 'Torcida' },
      {
        type: 'power',
        name: 'Truque de Mágica',
        unique: true,
        desc: 'Pode lançar Explosão de Chamas, Hipnotismo e Queda Suave com o aprimoramento Truque (prestidigitação).'
      }
    ]
  },

  {
    id: 'criminoso',
    name: 'Criminoso',
    type: 'normal',
    source: 'T20',
    desc: 'Furtava bolsas, trapaceava em jogos ou emboscava viajantes. Tornar-se aventureiro é o passo seguinte para roubar tesouros de dragões.',
    items: 'Estojo de disfarces ou gazua.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Enganação' },
      { type: 'skill', name: 'Furtividade' },
      { type: 'skill', name: 'Ladinagem' },
      { type: 'power', name: 'Venefício' },
      {
        type: 'power',
        name: 'Punguista',
        unique: true,
        desc: 'Usa Ladinagem para sustento em um dia. Se passar, recebe o dobro; se falhar, problemas com a lei.'
      }
    ]
  },

  {
    id: 'curandeiro',
    name: 'Curandeiro',
    type: 'normal',
    source: 'T20',
    desc: 'Ajudante de curandeiro de vila ou estudo formal em medicina. Treinado em tratar doenças e lesões sem magia.',
    items: 'Bálsamo restaurador (x2), maleta de medicamentos.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Cura' },
      { type: 'skill', name: 'Vontade' },
      { type: 'power', name: 'Medicina' },
      { type: 'power', name: 'Venefício' },
      {
        type: 'power',
        name: 'Médico de Campo',
        unique: true,
        desc: 'Soma sua Sabedoria aos PV restaurados por habilidades e itens mundanos de cura.'
      }
    ]
  },
  // --- Continuação das ORIGENS NORMAIS (T20) ---

  {
    id: 'eremita',
    name: 'Eremita',
    type: 'normal',
    source: 'T20',
    desc: 'Você passou parte da vida isolado, afastado da sociedade, seja por um chamado dos deuses, para meditar ou por praticar artes proibidas. A vida simples o tornou forte de corpo e espírito.',
    items: 'Barraca, kit de medicamentos.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Misticismo' },
      { type: 'skill', name: 'Religião' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Lobo Solitário' },
      {
        type: 'power',
        name: 'Busca Interior',
        unique: true,
        desc: 'Pode gastar 1 PM para meditar sozinho e receber uma dica do mestre sobre um mistério.'
      }
    ]
  },

  {
    id: 'escravo',
    name: 'Escravo',
    type: 'normal',
    source: 'T20',
    desc: 'Seja por nascimento, derrota em guerra ou captura, você conheceu a falta de liberdade. Encontrou uma chance de escapar ou recebeu a alforria, e agora busca seu próprio destino.',
    items: 'Algemas, uma ferramenta pesada (estatísticas de maça).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atletismo' },
      { type: 'skill', name: 'Fortitude' },
      { type: 'skill', name: 'Furtividade' },
      { type: 'power', name: 'Vitalidade' },
      {
        type: 'power',
        name: 'Desejo de Liberdade',
        unique: true,
        desc: 'Recebe +5 em testes contra a manobra agarrar e efeitos de movimento.'
      }
    ]
  },

  {
    id: 'estudioso',
    name: 'Estudioso',
    type: 'normal',
    source: 'T20',
    desc: 'Longos anos gastos em meio a livros e pergaminhos. Da engenharia à geopolítica, você é um mestre dos campos teóricos e agora busca vivenciar o que aprendeu.',
    items: 'Coleção de livros (+1 em Conhecimento, Guerra, Misticismo ou Nobreza).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Conhecimento' },
      { type: 'skill', name: 'Guerra' },
      { type: 'skill', name: 'Misticismo' },
      { type: 'power', name: 'Aparência Inofensiva' },
      {
        type: 'power',
        name: 'Palpite Fundamentado',
        unique: true,
        desc: 'Pode gastar 2 PM para substituir um teste de Inteligência ou Sabedoria por Conhecimento.'
      }
    ]
  },

  {
    id: 'fazendeiro',
    name: 'Fazendeiro',
    type: 'normal',
    source: 'T20',
    desc: 'Cultivando a terra ou criando animais, você viveu em contato com a natureza. O fim dessa vida tranquila pode ter sido uma tragédia ou o chamado da aventura.',
    items: 'Carroça, ferramenta agrícola (estatísticas de lança), 10 rações, animal não combativo.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Adestramento' },
      { type: 'skill', name: 'Cavalgar' },
      { type: 'skill', name: 'Ofício' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Ginete' },
      {
        type: 'power',
        name: 'Água no Feijão',
        unique: true,
        desc: 'Não sofre penalidade de -5 e não gasta matéria-prima extra para fabricar pratos para cinco pessoas.'
      }
    ]
  },

  {
    id: 'forasteiro',
    name: 'Forasteiro',
    type: 'normal',
    source: 'T20',
    desc: 'Você veio de longe e sua cultura é exótica no Reinado. Seja de tribos perdidas ou de outros mundos, você traz hábitos e soluções inesperadas.',
    items: 'Equipamento de viagem, instrumento musical exótico (+1 Carisma), traje estrangeiro.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Cavalgar' },
      { type: 'skill', name: 'Pilotagem' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Lobo Solitário' },
      {
        type: 'power',
        name: 'Cultura Exótica',
        unique: true,
        desc: 'Pode gastar 1 PM para ignorar o requerimento de treinamento de uma perícia para um teste.'
      }
    ]
  },

  {
    id: 'gladiador',
    name: 'Gladiador',
    type: 'normal',
    source: 'T20',
    desc: 'Das arenas e aplausos para as estradas. Você usou sua sede de fama ou seu treinamento de torneios para sobreviver a combates brutais sob os olhos da multidão.',
    items: 'Uma arma marcial ou exótica, item sem valor de um admirador.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atuação' },
      { type: 'skill', name: 'Luta' },
      { type: 'power', name: 'Atraente' },
      { type: 'power', name: 'Torcida' },
      { type: 'power', name: 'Poder de Combate', powerPicker: { types: ['combat'], count: 1 } },
      {
        type: 'power',
        name: 'Pão e Circo',
        unique: true,
        desc: 'Pode escolher causar dano não letal sem sofrer a penalidade de -5.'
      }
    ]
  },

  {
    id: 'guarda',
    name: 'Guarda',
    type: 'normal',
    source: 'T20',
    desc: 'Agente da lei em vilas ou cidades. Rondas tediosas e recolher bêbados lhe deram um treino básico em investigação e combate.',
    items: 'Apito, insígnia da milícia, uma arma marcial.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Investigação' },
      { type: 'skill', name: 'Luta' },
      { type: 'skill', name: 'Percepção' },
      { type: 'power', name: 'Investigador' },
      { type: 'power', name: 'Poder de Combate', powerPicker: { types: ['combat'], count: 1 } },
      {
        type: 'power',
        name: 'Detetive',
        unique: true,
        desc: 'Pode gastar 1 PM para substituir testes de Percepção e Intuição por Investigação até o fim da cena.'
      }
    ]
  },

  {
    id: 'herdeiro',
    name: 'Herdeiro',
    type: 'normal',
    source: 'T20',
    desc: 'Filho de uma importante linhagem ou personalidade. De você se espera que siga a tradição, mas talvez você queira trilhar seu próprio caminho.',
    items: 'Símbolo de sua herança (anel de sinete ou manto cerimonial).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Misticismo' },
      { type: 'skill', name: 'Nobreza' },
      { type: 'skill', name: 'Ofício' },
      { type: 'power', name: 'Comandar' },
      {
        type: 'power',
        name: 'Herança',
        unique: true,
        desc: 'Você herdou um item de preço de até T$ 1.000. Pode ser escolhido duas vezes para um item de até T$ 2.000.'
      },
      {
        type: 'power',
        name: 'Herança',
        unique: true,
        desc: 'Você herdou um item de preço de até T$ 1.000. Pode ser escolhido duas vezes para um item de até T$ 2.000.'
      }
    ]
  },

  {
    id: 'heroi-campones',
    name: 'Herói Camponês',
    type: 'normal',
    source: 'T20',
    desc: 'O campeão local amado pelo povo. Você empunhou o forcado para defender sua vila e agora está destinado a feitos maiores.',
    items: 'Instrumentos de ofício ou arma simples, traje de plebeu.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Adestramento' },
      { type: 'skill', name: 'Ofício' },
      { type: 'power', name: 'Sortudo' },
      { type: 'power', name: 'Surto Heroico' },
      { type: 'power', name: 'Torcida' },
      {
        type: 'power',
        name: 'Coração Heroico',
        unique: true,
        desc: 'Recebe +3 PM iniciais e +3 PM adicionais a cada novo patamar alcançado.'
      }
    ]
  },
  // --- Continuação das ORIGENS NORMAIS (T20) ---

  {
    id: 'marujo',
    name: 'Marujo',
    type: 'normal',
    source: 'T20',
    desc: 'Tripulante de embarcações, desde barcos pesqueiros até naves vivas que viajam entre mundos. Habituado ao Mar Negro ou ao Rio dos Deuses.',
    items: 'T$ 2d6, corda.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atletismo' },
      { type: 'skill', name: 'Jogatina' },
      { type: 'skill', name: 'Pilotagem' },
      { type: 'power', name: 'Acrobático' },
      {
        type: 'power',
        name: 'Passagem de Navio',
        unique: true,
        desc: 'Consegue transporte marítimo gratuito para o grupo, desde que todos trabalhem durante a viagem.'
      }
    ]
  },

  {
    id: 'mateiro',
    name: 'Mateiro',
    type: 'normal',
    source: 'T20',
    desc: 'Criado em comunidades que obtêm sustento através da caça. Para quem flecha cervos, combater ogros e dragões é o passo seguinte.',
    items: 'Arco curto, barraca, equipamento de viagem, 20 flechas.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atletismo' },
      { type: 'skill', name: 'Furtividade' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Lobo Solitário' },
      { type: 'power', name: 'Sentidos Aguçados' },
      {
        type: 'power',
        name: 'Vendedor de Carcaças',
        unique: true,
        desc: 'Extrai recursos de criaturas em um minuto (em vez de uma hora) e recebe +5 no teste.'
      }
    ]
  },

  {
    id: 'membro-de-guilda',
    name: 'Membro de Guilda',
    type: 'normal',
    source: 'T20',
    desc: 'Membro de uma associação de artesãos, magos ou criminosos. A guilda forneceu treino e espera utilidade em troca.',
    items: 'Gazua ou instrumentos de ofício.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Diplomacia' },
      { type: 'skill', name: 'Enganação' },
      { type: 'skill', name: 'Misticismo' },
      { type: 'skill', name: 'Ofício' },
      { type: 'power', name: 'Foco em Perícia' },
      {
        type: 'power',
        name: 'Rede de Contatos',
        unique: true,
        desc: 'Graças à influência da guilda, pode usar Diplomacia para interrogar sem custo.'
      }
    ]
  },

  {
    id: 'mercador',
    name: 'Mercador',
    type: 'normal',
    source: 'T20',
    desc: 'Atuou como comerciante em tendas urbanas ou caravanas. Reuniu recursos e contatos em anos de negociações.',
    items: 'Carroça, trobo, mercadorias para vender (T$ 100).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Diplomacia' },
      { type: 'skill', name: 'Intuição' },
      { type: 'skill', name: 'Ofício' },
      { type: 'power', name: 'Proficiência' },
      { type: 'power', name: 'Sortudo' },
      {
        type: 'power',
        name: 'Negociação',
        unique: true,
        desc: 'Você pode vender itens 10% mais caro (não cumulativo com barganha).'
      }
    ]
  },

  {
    id: 'minerador',
    name: 'Minerador',
    type: 'normal',
    source: 'T20',
    desc: 'Mergulhou nas profundezas atrás de metais e gemas. A escuridão dos subterrâneos trouxe bens e conhecimento sobre túneis.',
    items: 'Gemas preciosas (T$ 100), picareta.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atletismo' },
      { type: 'skill', name: 'Fortitude' },
      { type: 'skill', name: 'Ofício (minerador)' },
      { type: 'power', name: 'Ataque Poderoso' },
      { type: 'power', name: 'Sentidos Aguçados' },
      {
        type: 'power',
        name: 'Escavador',
        unique: true,
        desc: 'Proficiente em picaretas, +1 de dano com elas e ignora terreno difícil em masmorras.'
      }
    ]
  },

  {
    id: 'nomade',
    name: 'Nômade',
    type: 'normal',
    source: 'T20',
    desc: 'Habituado às estradas e sem laços com nenhuma terra. Sua família viajava em caravanas ou peregrinações constantes.',
    items: 'Bordão, equipamento de viagem.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Cavalgar' },
      { type: 'skill', name: 'Pilotagem' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Lobo Solitário' },
      { type: 'power', name: 'Sentidos Aguçados' },
      {
        type: 'power',
        name: 'Mochileiro',
        unique: true,
        desc: 'Seu limite de carga aumenta em 5 espaços.'
      }
    ]
  },

  {
    id: 'pivete',
    name: 'Pivete',
    type: 'normal',
    source: 'T20',
    desc: 'Criança de rua que aprendeu cedo a sobreviver pedindo esmolas ou cumprindo tarefas para bandidos em grandes cidades.',
    items: 'Gazua, traje de plebeu, um animal urbano.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Furtividade' },
      { type: 'skill', name: 'Iniciativa' },
      { type: 'skill', name: 'Ladinagem' },
      { type: 'power', name: 'Acrobático' },
      { type: 'power', name: 'Aparência Inofensiva' },
      {
        type: 'power',
        name: 'Quebra-Galho',
        unique: true,
        desc: 'Em cidades, compra qualquer item mundano não superior por metade do preço.'
      }
    ]
  },

  {
    id: 'refugiado',
    name: 'Refugiado',
    type: 'normal',
    source: 'T20',
    desc: 'Sobrevivente de grandes tragédias, como a queda de Lennórienn ou a destruição do Império de Jade. Privações o tornaram tenaz.',
    items: 'Item estrangeiro (até T$ 100).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Fortitude' },
      { type: 'skill', name: 'Reflexos' },
      { type: 'skill', name: 'Vontade' },
      { type: 'power', name: 'Vontade de Ferro' },
      {
        type: 'power',
        name: 'Estoico',
        unique: true,
        desc: 'Sua condição de descanso é uma categoria acima do padrão pela situação (normal em condições ruins, confortável em condições normais e luxuosa em condições confortáveis ou melhores).'
      }
    ]
  },

  {
    id: 'seguidor',
    name: 'Seguidor',
    type: 'normal',
    source: 'T20',
    desc: 'Escudeiro, garoto de recados ou criado. Acompanhou um herói de verdade e adquiriu aprendizado valioso antes de seguir seu caminho.',
    items: 'Item recebido de seu mestre (até T$ 100).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Adestramento' },
      { type: 'skill', name: 'Ofício' },
      { type: 'power', name: 'Proficiência' },
      { type: 'power', name: 'Surto Heroico' },
      {
        type: 'power',
        name: 'Antigo Mestre',
        unique: true,
        desc: 'Uma vez por aventura, seu mestre surge para ajudar como um aliado mestre por uma cena.'
      }
    ]
  },

  {
    id: 'selvagem',
    name: 'Selvagem',
    type: 'normal',
    source: 'T20',
    desc: 'Nascido em tribos ou criado por animais em regiões remotas. Pode nem mesmo ter nascido de pais humanoides.',
    items: 'Arma simples, pequeno animal de estimação.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Percepção' },
      { type: 'skill', name: 'Reflexos' },
      { type: 'skill', name: 'Sobrevivência' },
      { type: 'power', name: 'Lobo Solitário' },
      { type: 'power', name: 'Vitalidade' },
      {
        type: 'power',
        name: 'Vida Rústica',
        unique: true,
        desc: 'Imune a efeitos prejudiciais de itens ingeríveis e recuperação de PV/PM nunca é inferior ao seu nível.'
      }
    ]
  },

  {
    id: 'soldado',
    name: 'Soldado',
    type: 'normal',
    source: 'T20',
    desc: 'Alistado em grandes exércitos, como de Deheon ou da Supremacia Purista. Recebeu treinamento rígido em combate.',
    items: 'Arma marcial, uniforme militar, insígnia.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Fortitude' },
      { type: 'skill', name: 'Guerra' },
      { type: 'skill', name: 'Luta' },
      { type: 'skill', name: 'Pontaria' },
      { type: 'power', name: 'Poder de Combate', powerPicker: { types: ['combat'], count: 1 } },
      {
        type: 'power',
        name: 'Influência Militar',
        unique: true,
        desc: 'Pode conseguir hospedagem e informações para o grupo em acampamentos militares.'
      }
    ]
  },

  {
    id: 'taverneiro',
    name: 'Taverneiro',
    type: 'normal',
    source: 'T20',
    desc: 'Dono, filho ou empregado em um local frequentado por aventureiros. Você ouviu grandes histórias e trocou socos em brigas enquanto limpava canecas sujas.',
    items: 'Rolo de macarrão ou martelo de carne (clava), panela, avental, caneca e pano sujo.',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Diplomacia' },
      { type: 'skill', name: 'Jogatina' },
      { type: 'skill', name: 'Ofício (cozinheiro)' },
      { type: 'power', name: 'Proficiência' },
      { type: 'power', name: 'Vitalidade' },
      {
        type: 'power',
        name: 'Gororoba',
        unique: true,
        desc: 'Você não sofre a penalidade de –5 para fabricar um prato especial adicional.'
      }
    ]
  },

  {
    id: 'trabalhador',
    name: 'Trabalhador',
    type: 'normal',
    source: 'T20',
    desc: 'Trabalho braçal pesado desde jovem. De carregar sacas a puxar arados, a vida de aventureiro pareceu muito mais atraente que a servidão.',
    items: 'Uma ferramenta pesada (estatísticas de maça ou lança).',
    chooseCount: 2,
    benefits: [
      { type: 'skill', name: 'Atletismo' },
      { type: 'skill', name: 'Fortitude' },
      { type: 'power', name: 'Atlético' },
      {
        type: 'power',
        name: 'Esforçado',
        unique: true,
        desc: 'Recebe +2 em todos os testes de perícias estendidos (incluindo perigos complexos).'
      }
    ]
  },

  // ──────────────────────────────────────────────────────────
  //  ORIGENS DO ATLAS
  // ──────────────────────────────────────────────────────────
  {
    id: 'agricultor-sambur',
    name: 'Agricultor Sambur',
    type: 'atlas',
    source: 'Atlas',
    region: 'Sambúrdia',
    desc: 'Você trabalhou nos campos férteis das Repúblicas Livres, onde aprendeu muito sobre animais, a natureza e o trabalho duro.',
    items: 'Uma ferramenta agrícola (mesmas estatísticas de uma lança), T$ 100 (um presente de despedida da sua família).',
    // Treinos automáticos em perícias (sem escolha)
    autoTraining: ['Adestramento', 'Sobrevivência'],
    // Benefício especial único da origem
    uniqueBenefit: {
      name: 'Trabalho da Terra',
      desc: 'Uma vez por cena, pode gastar 1 PM para receber +1d6 em um teste de perícia.'
    }
  },

  {
    id: 'amazona-hippion',
    name: 'Amazona de Hippion',
    type: 'atlas',
    source: 'Atlas',
    region: 'Deheon / Namalkah',
    desc: 'Você é uma das orgulhosas amazonas de Hippion, um dos povos nativos de Arton Norte.',
    items: 'Arma simples ou marcial, cavalo de guerra.',
    autoTraining: ['Cavalgar'],
    uniqueBenefit: {
      name: 'Filha de Hippion',
      desc: 'Se não estiver usando armadura pesada, soma seu Carisma nos PM, limitado pelo seu nível (apenas após um dia).'
    }
  },
  // ──────────────────────────────────────────────────────────
  //  ORIGENS DO ATLAS
  // ──────────────────────────────────────────────────────────

  {
    id: 'amoque-purpura',
    name: 'Amoque Púrpura',
    type: 'atlas',
    source: 'Atlas',
    region: 'Ermos Púrpuras',
    desc: 'Raiva compele os golpes de guerreiros por todo o mundo, mas nos Ermos Púrpuras a prática é refinada ao limite.',
    items: 'Uma arma simples, um estandarte da sua tribo.',
    autoTraining: ['Intimidação'],
    uniqueBenefit: {
      name: 'Fúria Púrpura',
      desc: 'Quando sob efeito de Fúria, Fúria Divina ou Poder Oculto, recebe +2 em rolagens de dano.'
    }
  },

  {
    id: 'anao-de-armas',
    name: 'Anão de Armas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Doherimm',
    desc: 'Você foi treinado pela Guilda dos Armeiros, tendo aprendido a fabricar — e usar — armas anãs.',
    items: 'Uma arma marcial tradicional anã, instrumentos de Ofício (armeiro).',
    autoTraining: ['Ofício (armeiro)'],
    uniqueBenefit: {
      name: 'Treino de Doherimm',
      desc: 'Recebe +2 em rolagens de dano com armas tradicionais anãs (machados, martelos, marretas e picaretas).'
    }
  },

  {
    id: 'andarilho-ubaneri',
    name: 'Andarilho Ubaneri',
    type: 'atlas',
    source: 'Atlas',
    region: 'Ubani',
    desc: 'Praticante de técnicas de lança e escudo, você conquistou a amizade de um alikunhá, um elemental guardião.',
    items: 'Escudo pesado, lança.',
    autoTraining: [], // Ganha proficiência e parceiro
    uniqueBenefit: {
      name: 'Amigo Alikunhá',
      desc: 'Recebe um alikunhá (parceiro iniciante que não conta no limite) e proficiência com escudos (se já tiver, bônus na Defesa do escudo aumenta em +1).'
    }
  },

  {
    id: 'aprendiz-de-dragoeiro',
    name: 'Aprendiz de Dragoeiro',
    type: 'atlas',
    source: 'Atlas',
    region: 'Sckharshantallas',
    desc: 'Técnicas aprendidas para enfrentar dragões e outras feras colossais nas terras do Rei dos Dragões.',
    items: 'Uma arma simples ou marcial, troféu de caça, um treckod.',
    autoTraining: [], // Bônus fixos
    uniqueBenefit: {
      name: 'Táticas Anti-Fera',
      desc: '+2 na Defesa contra criaturas maiores que você e +2 em Reflexos. Se passar em teste de Reflexos, ataques contra a fonte do efeito causam +1d8 de dano até o fim da cena.'
    }
  },

  {
    id: 'aprendiz-de-drogadora',
    name: 'Aprendiz de Drogadora',
    type: 'atlas',
    source: 'Atlas',
    region: 'Galrasia',
    desc: 'Discípula de uma dragoa drogadora, estudando as artes de cura e alquimia na ilha perdida.',
    items: 'Bálsamo restaurador (x2), poção de curar ferimentos (x2), maleta de medicamentos.',
    autoTraining: ['Cura', 'Ofício (alquimista)'],
    uniqueBenefit: {
      name: 'Preparo Corporal',
      desc: 'Gasta apenas 1/4 do preço dos itens em matérias-primas para fabricar preparados alquímicos e poções.'
    }
  },

  {
    id: 'aristocrata-daizenshi',
    name: 'Aristocrata Dai’zenshi',
    type: 'atlas',
    source: 'Atlas',
    region: 'Tamu-ra',
    desc: 'Nobre tamuraniano, descendente de grandes clãs ou vassalo samurai, visto como exemplo de honra.',
    items: 'Traje da corte, katana superior com uma melhoria.',
    autoTraining: ['Nobreza'],
    uniqueBenefit: {
      name: 'Exemplo de Honra',
      desc: 'Ao completar descanso, se não usou Enganação, Furtividade ou Ladinagem desde o último descanso, ganha +1 PM temporário para cada dois níveis.'
    }
  },

  {
    id: 'armeiro-armado',
    name: 'Armeiro Armado',
    type: 'atlas',
    source: 'Atlas',
    region: 'Zakharov',
    desc: 'Mestre do ofício mais respeitado do Reino das Armas. Suas criações são obras de arte letais.',
    items: 'Uma arma marcial, instrumentos de Ofício (armeiro).',
    autoTraining: ['Ofício (armeiro)'],
    uniqueBenefit: {
      name: 'Ferreiro de Zakharov',
      desc: 'Pode fabricar armas com uma melhoria. Se tiver outra habilidade de armas superiores, gasta 1/4 do preço das melhorias.'
    }
  },

  {
    id: 'aspirante-a-heroi',
    name: 'Aspirante a Herói',
    type: 'atlas',
    source: 'Atlas',
    region: 'Deheon',
    desc: 'Nascido com o potencial para ser protagonista das canções épicas dos bardos.',
    items: 'Essência de mana, mochila de aventureiro.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Potencial Heroico',
      desc: 'Você recebe +1 em um atributo a sua escolha.'
    }
  },

  {
    id: 'assistente-forense',
    name: 'Assistente Forense',
    type: 'atlas',
    source: 'Atlas',
    region: 'Salistick',
    desc: 'Contato com a ciência mais avançada para detecção e solução de crimes.',
    items: 'Lupa (+1 em Investigação).',
    autoTraining: ['Investigação'],
    uniqueBenefit: {
      name: 'Dedução Científica',
      desc: 'Usa Investigação para necropsia, identificar itens alquímicos e rastrear. Além disso, pode identificar criaturas em uma cena de crime ou equivalente mesmo que elas não estejam mais presentes. Isso funciona como um teste de identificar criatura, com uma penalidade de –1 para cada dia decorrido. Se passar, além do normal, você identifica a raça da criatura.'
    }
  },

  {
    id: 'bandoleiro-da-fortaleza',
    name: 'Bandoleiro da Fortaleza',
    type: 'atlas',
    source: 'Atlas',
    region: 'Khalifor',
    desc: 'Esgueirando-se pelos becos da cidade-fortaleza, você viu o pior que humanos e duyshidakk oferecem.',
    items: 'Adaga, gazua, manto camuflado (urbano).',
    autoTraining: ['Furtividade', 'Intimidação'],
    uniqueBenefit: {
      name: 'Coração de Muralha',
      desc: 'Recebe resistência a medo +5.'
    }
  },

  {
    id: 'barao-arruinado',
    name: 'Barão Arruinado',
    type: 'atlas',
    source: 'Atlas',
    region: 'Trebuck',
    desc: 'Destinado a ser senhor de um feudo, seu título se perdeu, ensinando-o a lidar com os revezes.',
    items: 'Anel de família (T$ 200), títulos de terras expirados, traje de corte.',
    autoTraining: ['Nobreza'],
    uniqueBenefit: {
      name: 'Resiliência Nobre',
      desc: 'Sempre que falha em teste com consequência negativa, recebe +2 em testes da mesma perícia até o fim da cena.'
    }
  },

  {
    id: 'catador-da-cidade-velha',
    name: 'Catador da Cidade Velha',
    type: 'atlas',
    source: 'Atlas',
    region: 'Nova Malpetrim',
    desc: 'Você cresceu vasculhando as ruínas inundadas da Velha Malpetrim em busca de segredos e do sustento diário.',
    items: 'Luneta, luvas de pelica, tranqueiras resgatadas do mar (T$ 100).',
    autoTraining: ['Fortitude', 'Percepção'],
    uniqueBenefit: {
      name: 'Fôlego das Profundezas',
      desc: 'Pode gastar 1 PM para receber deslocamento de natação igual ao básico (ou +3m se já tiver) por uma cena. Dobra o tempo que pode segurar a respiração.'
    }
  },

  {
    id: 'cativo-das-fadas',
    name: 'Cativo das Fadas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Pondsmânia',
    desc: 'Levado para a Pondsmânia ainda bebê, sua infância foi permeada de brincadeiras bizarras e jogos feéricos.',
    items: 'Corda, rações de viagem (x10), essência de mana.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Toque Feérico',
      desc: 'Recebe resistência a espíritos e magia +2 e +1 PV por nível de personagem.'
    }
  },

  {
    id: 'competidor-do-circuito',
    name: 'Competidor do Circuito',
    type: 'atlas',
    source: 'Atlas',
    region: 'Trebuck',
    desc: 'Você percorreu o Circuito de Torneios de Trebuck como aspirante, usando o que aprendeu nas arenas em suas aventuras.',
    items: 'Uma arma marcial, T$ 100.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Vibrar da Multidão',
      desc: 'Recebe o poder Torcida. Enquanto sob efeito deste poder, recuperar 1 PM sempre que reduzir um inimigo a 0 PV com ataque corpo a corpo.'
    }
  },

  {
    id: 'cosmopolita',
    name: 'Cosmopolita',
    type: 'atlas',
    source: 'Atlas',
    region: 'Valkaria',
    desc: 'Tendo crescido na maior cidade de Arton, você já viu de tudo e está preparado para quase qualquer situação.',
    items: 'Equipamento de viagem, traje de viajante, item artístico (T$ 100).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Versatilidade Urbana',
      desc: 'Ganha um poder geral ou de classe (cumprindo requisitos). Pode trocar esse poder por outro após um descanso (uma vez por aventura).'
    }
  },

  {
    id: 'cria-da-favela',
    name: 'Cria da Favela',
    type: 'atlas',
    source: 'Atlas',
    region: 'Valkaria',
    desc: 'A Favela dos Goblins o tornou resistente e incansável diante das injustiças e dificuldades.',
    items: 'Andrajos de aldeão, corda, vara de madeira.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Resistência da Favela',
      desc: 'Recebe +1 em Constituição e sua recuperação de descanso é sempre pelo menos normal, independente das condições.'
    }
  },

  {
    id: 'cria-das-estradas',
    name: 'Cria das Estradas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Arton',
    desc: 'Cresceu entre as trilhas do mundo, acostumado a viajar e superar as mais variadas adversidades.',
    items: 'Barraca, Equipamento de Viagem, Mochila de Aventureiro.',
    autoTraining: ['Fortitude', 'Sobrevivência'],
    uniqueBenefit: {
      name: 'Passo Longo',
      desc: 'Uma vez por cena, pode ignorar todas as penalidades numéricas por condições e habilidades por uma rodada.'
    }
  },

  {
    id: 'criado-pelas-voracis',
    name: 'Criado pelas Voracis',
    type: 'atlas',
    source: 'Atlas',
    region: 'Galrasia',
    desc: 'Adotado por dragoas-caçadoras, você foi criado de acordo com as tradições e valores selvagens dessas predadoras.',
    items: 'Uma arma simples, armadura leve e lança.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Instinto Voraz',
      desc: 'Recebe +2 na Defesa, +2 em Sobrevivência e +3m em seu deslocamento.'
    }
  },

  {
    id: 'de-outro-mundo',
    name: 'De Outro Mundo',
    type: 'atlas',
    source: 'Atlas',
    region: 'Éter Divino / Outros',
    desc: 'Você veio de outro mundo ou realidade através de portais, tempestades planares ou tecnologia desconhecida.',
    items: 'Trajes exóticos, item de T$ 100 do mundo natal.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Tecnologia/Habilidade Estranha',
      desc: 'Ganha uma magia de 1º círculo (atributo à escolha). Se for tecnologia, usa um item (RD 10) que aumenta o limite de PM em +2.'
    }
  },

  {
    id: 'descendente-colleniano',
    name: 'Descendente Colleniano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Ahlen',
    desc: 'Sua linhagem possui olhos de cores exóticas e poderes mágicos ligados à visão, herança do antigo reino de Collen.',
    items: 'Arma simples, estojo de disfarces, ração de viagem (x5).',
    autoTraining: ['Percepção'],
    uniqueBenefit: {
      name: 'Olhar de Collen',
      desc: 'Pode lançar Visão Mística. Se aprender a magia novamente, o custo diminui em –1 PM.'
    }
  },

  {
    id: 'desertor-da-supremacia',
    name: 'Desertor da Supremacia',
    type: 'atlas',
    source: 'Atlas',
    region: 'Supremacia Purista',
    desc: 'Treinado pelos batalhões puristas, você decidiu que não podia ficar neutro frente às atrocidades da Supremacia.',
    items: 'Brunea raspada, escudo pesado, espada bastarda, rações (x10).',
    autoTraining: ['Guerra'],
    uniqueBenefit: {
      name: 'Treino de Batalhão',
      desc: 'Ganha proficiência com espadas bastardas e escudos. Com ambos empunhados, recebe +2 em testes de ataque.'
    }
  },

  {
    id: 'duplo-feerico',
    name: 'Duplo Feérico',
    type: 'atlas',
    source: 'Atlas',
    region: 'Pondsmânia',
    desc: 'Você é a cópia feita por uma fada de alguém que já existe em Arton. Uma duplicata com as mesmas capacidades.',
    items: 'Essência de mana, marca física única.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Cópia Incompleta',
      desc: '• Ganha uma habilidade de 1º nível de outra classe (Magias dá apenas 1 magia e +1 PM).\n\n• Encontrando-se Consigo Mesmo: Se encontrar sua versão original, deve passar em Vontade (CD seu Car) ou entrar em frenesi homicida contra ela. O sobrevivente herda memórias e uma perícia do morto, mas perde 1 de Carisma permanentemente.'
    }
  },

  {
    id: 'duyshidakk-infiltrado',
    name: 'Duyshidakk Infiltrado',
    type: 'atlas',
    source: 'Atlas',
    region: 'Tyrondir',
    desc: 'Viveu entre o povo do Reinado por muito tempo, mas mantém-se secretamente devotado ao Mundo Como Deve Ser.',
    items: 'Arma marcial, peças sobressalentes (T$ 100).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Espião da Aliança',
      desc: 'Recebe +2 em Fortitude e Vontade e pode usar Sabedoria para testes de Enganação.'
    }
  },

  {
    id: 'emissario-ubaneri',
    name: 'Emissário Ubaneri',
    type: 'atlas',
    source: 'Atlas',
    region: 'Ubani',
    desc: 'Preparado para percorrer terras distantes, você nunca está só, acompanhado por um alikunhá, um pequeno pedaço de Ubani.',
    items: 'Essência de mana, mochila de aventureiro.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Voz da Savana',
      desc: '• Recebe um alikunhá (parceiro iniciante que não conta no limite).\n• Pode usar Sabedoria como atributo-chave de Misticismo.'
    }
  },

  {
    id: 'escudeiro-da-luz',
    name: 'Escudeiro da Luz',
    type: 'atlas',
    source: 'Atlas',
    region: 'Bielefeld',
    desc: 'Serviu a um nobre cavaleiro da Ordem da Luz, aprendendo os valores da nobreza e da justiça.',
    items: 'Cota de malha ou escudo pesado, enfeite de elmo da Ordem.',
    autoTraining: ['Nobreza'],
    uniqueBenefit: {
      name: 'Treino da Ordem',
      desc: 'Recebe +2 na Defesa e +3 PM.'
    }
  },

  {
    id: 'escudeiro-solitario',
    name: 'Escudeiro Solitário',
    type: 'atlas',
    source: 'Atlas',
    region: 'Bielefeld',
    desc: 'Escudeiro de um Cavaleiro Solitário, habituado a subterfúgios e traições para ajudar os verdadeiros heróis.',
    items: 'Cota de malha, escudo pesado, enfeite de elmo.',
    autoTraining: ['Enganação', 'Ladinagem'],
    uniqueBenefit: {
      name: 'Subterfúgio de Bielefeld',
      desc: '• +10 em Enganação para se disfarçar como Cavaleiro da Luz.\n• Se tiver Código de Honra, atacar pelas costas não o viola.'
    }
  },

  {
    id: 'estandarte-vivo',
    name: 'Estandarte Vivo',
    type: 'atlas',
    source: 'Atlas',
    region: 'Ermos Púrpuras',
    desc: 'Sua tribo foi extinta, mas você permanece como a prova viva e o estandarte de que seu povo existiu.',
    items: 'Arma simples ou marcial, gibão de peles, fragmento do estandarte (+1 Vontade se vestido).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Legado Púrpura',
      desc: 'Recebe +2 em Sobrevivência e um poder de combate ou da Tormenta à sua escolha.',
      powerPicker: { types: ['combat', 'tormenta'], count: 1 }
    }
  },

  {
    id: 'estudante-da-academia',
    name: 'Estudante da Academia',
    type: 'atlas',
    source: 'Atlas',
    region: 'Academia Arcana',
    desc: 'Frequentou a lendária Academia Arcana, aprendendo os fundamentos do lançamento de magias.',
    items: 'Coleção de livros, essência de mana (x2).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Fundamentos Arcanos',
      desc: '• Aprende e lança uma magia arcana de 1º nível (Carisma).\n• Pode usar Misticismo sem ser treinado (se for treinado, recebe +2).'
    }
  },

  {
    id: 'estudante-do-colegio-real',
    name: 'Estudante do Colégio Real',
    type: 'atlas',
    source: 'Atlas',
    region: 'Salistick',
    desc: 'Estudou no Colégio Real de Médicos, priorizando o rigor científico e o ceticismo em relação aos deuses.',
    items: 'Bálsamo restaurador (x3), maleta de medicamentos.',
    autoTraining: ['Cura'],
    uniqueBenefit: {
      name: 'Medicina Avançada',
      desc: '• Seus efeitos de cura recuperam +2 PV por dado.\n• Perde o benefício se tornar-se devoto.'
    }
  },

  {
    id: 'explorador-de-ruinas',
    name: 'Explorador de Ruínas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Tyrondir',
    desc: 'Vasculhou as riquezas que sobreviveram à queda de Tyrondir e à passagem da Flecha de Fogo.',
    items: 'Mochila de aventureiro, tocha, vara de madeira (3m).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Saqueador de Tyrondir',
      desc: 'Recebe +2 em Ladinagem, Percepção e Reflexos e +3m em seu deslocamento.'
    }
  },

  {
    id: 'filhote-da-revoada',
    name: 'Filhote da Revoada',
    type: 'atlas',
    source: 'Atlas',
    region: 'Lamnor',
    desc: 'Cresceu entre os engenhos voadores da Revoada Carnívora, aprendendo duras lições entre voos e quedas.',
    items: 'Instrumentos de Ofício (artesão), T$ 100.',
    autoTraining: ['Acrobacia', 'Pilotagem'],
    uniqueBenefit: {
      name: 'Experiência Aérea',
      desc: 'Pode gastar 1 PM em testes de Acrobacia ou Pilotagem para rolar um dado adicional e usar o melhor resultado.'
    }
  },

  {
    id: 'futura-lenda',
    name: 'Futura Lenda',
    type: 'atlas',
    source: 'Atlas',
    region: 'Nova Malpetrim',
    desc: 'Batizado com nome de herói em uma cidade de heróis, seu único objetivo é superar as lendas que o cercam.',
    items: 'Uma arma simples ou marcial com nome pomposo, gibão de peles, essência de mana (x2).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Início Promissor',
      desc: 'Escolha um dos poderes de sua classe normalmente disponíveis a partir do 2º nível. Você recebe esse poder.'
    }
  },
  // --- Continuação das ORIGENS DO ATLAS ---

  {
    id: 'ginete-de-tumarkhan',
    name: 'Ginete de Tumarkhân',
    type: 'atlas',
    source: 'Atlas',
    region: 'Khubar',
    desc: 'Você estabeleceu um elo com um lagarto tumarkhân, a montaria tradicional do seu povo, que o acompanha em suas viagens.',
    items: 'Bálsamo restaurador, sela.',
    autoTraining: ['Cavalgar'],
    uniqueBenefit: {
      name: 'Elo Tumarkhân',
      desc: '• Possui um parceiro tumarkhân iniciante (+2 em Adestramento e Cavalgar).\n• Pode acumular este parceiro com habilidades de Montaria ou Montaria Sagrada.'
    }
  },

  {
    id: 'grumete-pirata',
    name: 'Grumete Pirata',
    type: 'atlas',
    source: 'Atlas',
    region: 'Três Mares',
    desc: 'Serviu como aprendiz em uma embarcação pirata por paixão ou necessidade, ganhando pernas do mar permanentes.',
    items: 'Adaga, corda, tatuagem de tripulação (+1 em Intimidação).',
    autoTraining: ['Acrobacia', 'Atletismo', 'Reflexos'],
    uniqueBenefit: {
      name: 'Pernas de Mar',
      desc: 'Ao se equilibrar, escalar ou nadar, só cai ou afunda se falhar no teste por 10 ou mais (em vez de 5).'
    }
  },

  {
    id: 'guardiao-glacial',
    name: 'Guardião Glacial',
    type: 'atlas',
    source: 'Atlas',
    region: 'Uivantes',
    desc: 'Treinado para proteger e sobreviver nas inclementes Montanhas Uivantes, aprendendo a afastar intrometidos.',
    items: 'Casaco longo, cavalo glacial.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Sangue Gelado',
      desc: '• Recebe redução de frio 5.\n• Proficiência em arco longo e machado de batalha (se já tiver, recebe +2 no dano com eles).'
    }
  },

  {
    id: 'iniciado-dos-caca-monstros',
    name: 'Iniciado dos Caça-Monstros',
    type: 'atlas',
    source: 'Atlas',
    region: 'Sanguinárias',
    desc: 'Membro da Guilda dos Caça-Monstros, capaz de identificar feras rapidamente e atingir seus pontos fracos.',
    items: 'Arma simples ou marcial, gibão de peles.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Conhecimento de Campo',
      desc: '• Identifica criaturas com ação de movimento.\n• Ao acertar não-humanoides, pode gastar 1 PM para causar +1d8 de dano.'
    }
  },

  {
    id: 'insurgente-tapistano',
    name: 'Insurgente Tapistano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Império de Tauron',
    desc: 'Parte da resistência que luta para punir os antigos escravagistas após a queda do Deus da Força.',
    items: 'Amuleto da resistência, arma simples.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Fibra Rebelde',
      desc: '• Recebe +1 em Fortitude, Reflexos e Vontade.\n• Recebe +3 PV no 1º nível e +1 PV por nível seguinte.'
    }
  },

  {
    id: 'irmao-sem-esporas',
    name: 'Irmão sem Esporas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Namalkah',
    desc: 'Cresceu junto de um cavalo que considera seu verdadeiro irmão, criando um elo inquebrável.',
    items: 'Bálsamo restaurador, sela.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Elo Fraternal',
      desc: '• Possui um cavalo de guerra parceiro iniciante (+1 em Ataque e Reflexos).\n• Pode acumular este parceiro com habilidades de Montaria ou Montaria Sagrada.'
    }
  },

  {
    id: 'legionario',
    name: 'Legionário',
    type: 'atlas',
    source: 'Atlas',
    region: 'Império de Tauron',
    desc: 'Serviu nas legiões de Tapista, dominando o uso do gládio e do escudo em formação de combate.',
    items: 'Brunea da legião, escudo pesado, gládio, rações (x10).',
    autoTraining: ['Guerra'],
    uniqueBenefit: {
      name: 'Treino de Legião',
      desc: '• Proficiência com gládios e escudos.\n• Se usar ambos, recebe +1 na margem de ameaça e +1 na Defesa.'
    }
  },

  {
    id: 'lenhador-de-tollon',
    name: 'Lenhador de Tollon',
    type: 'atlas',
    source: 'Atlas',
    region: 'Tollon',
    desc: 'Criado nas florestas de Tollon, as árvores imponentes foram seu sustento e sua morada.',
    items: 'Um item superior de madeira tollon.',
    autoTraining: ['Ofício (artesão)'],
    uniqueBenefit: {
      name: 'Mestre da Madeira',
      desc: '• +5 em perícias (exceto ataque) ligadas a madeira.\n• Proficiência com machadinha/machado de batalha (se já tiver, +2 no dano).'
    }
  },

  {
    id: 'liricista-de-lenorienn',
    name: 'Liricista de Lenórienn',
    type: 'atlas',
    source: 'Atlas',
    region: 'Lamnor',
    desc: 'Inspirado pelas tradições do antigo Reino Élfico, você transforma sua magia em uma expressão artística.',
    items: 'Alaúde élfico, réplica de peça artística élfica.',
    autoTraining: ['Atuação'],
    uniqueBenefit: {
      name: 'Arte Élfica',
      desc: '• Recebe +2 em Atuação.\n• Pode usar Carisma como atributo-chave de Misticismo.'
    }
  },

  {
    id: 'membro-do-principado',
    name: 'Membro do Principado',
    type: 'atlas',
    source: 'Atlas',
    region: 'Sambúrdia',
    desc: 'Parte do Principado Mercante, uma das organizações mais poderosas das Repúblicas Livres.',
    items: 'Carroça, mercadorias sortidas (T$ 400).',
    autoTraining: ['Diplomacia', 'Intuição'],
    uniqueBenefit: {
      name: 'Contatos Mercantis',
      desc: '• Ao chegar em uma cidade nova, pode fazer teste de Diplomacia (CD 20).\n• Se passar, recebe 10% de desconto em todos os itens comprados no local (cumulativo com barganha).'
    }
  },

  {
    id: 'nitamuriano',
    name: 'Nitamuriano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Valkaria',
    desc: 'Criado na maior comunidade tamuriana fora do Império de Jade, misturando tradições deheoni e tamuranianas.',
    items: 'Arco longo ou katana, camisa bufante ou traje de seda.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Tradição Híbrida',
      desc: '• Proficiência em katana e arco longo (se já tiver, +2 no dano).\n• Ao falhar em teste de Sabedoria, pode gastar 2 PM para refazer o teste (uma vez por teste).'
    }
  },

  {
    id: 'nobre-zakharoviano',
    name: 'Nobre Zakharoviano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Zakharov',
    desc: 'Descendente de tradicionais famílias de armeiros, ostentando com orgulho uma obra-prima de sua linhagem.',
    items: 'Traje da corte.',
    autoTraining: ['Ofício (armeiro)'],
    uniqueBenefit: {
      name: 'Herança de Aço',
      desc: '• Recebe uma arma superior com uma melhoria (exceto material especial).\n• Portando esta arma, recebe +2 PM por patamar (após um dia de posse).'
    }
  },

  {
    id: 'nomade-sar-allan',
    name: 'Nômade Sar-Allan',
    type: 'atlas',
    source: 'Atlas',
    region: 'Halak-Tûr',
    desc: 'Cresceu entre os Sar-Allan, aprendendo a resistir aos rigores e predadores do deserto.',
    items: 'Arma simples ou marcial, corcel do deserto ou dromedário, manto camuflado (deserto).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Sobrevivência no Deserto',
      desc: 'Recebe +2 em Fortitude e Sobrevivência e nas rolagens de dano com alfanges, arcos curtos e cimitarras.'
    }
  },

  {
    id: 'pescador-parrudo',
    name: 'Pescador Parrudo',
    type: 'atlas',
    source: 'Atlas',
    region: 'Khubar',
    desc: 'Anos pescando nas águas profundas de Khubar deixaram seu corpo forte e extremamente resistente.',
    items: 'Vara de pesca, peixes raros salteados (T$ 50).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Corpo Atlântico',
      desc: '• Recebe +2 em Atletismo, Fortitude e Sobrevivência e +3 PV.\n• Ao nadar com Atletismo, avança seu deslocamento total (em vez de metade).'
    }
  },

  {
    id: 'plebeu-arcano',
    name: 'Plebeu Arcano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Wynlla',
    desc: 'Crescer em Wynlla o deixou acostumado aos aspectos místicos de Arton desde cedo.',
    items: 'Bandoleira de poções, gorro de ervas, poção arcana de 1° círculo.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Resiliência Mística',
      desc: '• Recebe +2 PM.\n• Uma vez por rodada, se falhar contra um efeito mágico, pode gastar 1 PM para rolar o teste novamente.'
    }
  },

  {
    id: 'prisioneiro-das-catacumbas',
    name: 'Prisioneiro das Catacumbas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Leverick',
    desc: 'Escapou por pouco das Catacumbas de Leverick após ter o azar de abrir a porta errada.',
    items: 'Uma arma marcial de um aventureiro morto.',
    autoTraining: ['Percepção', 'Reflexos'],
    uniqueBenefit: {
      name: 'Instinto de Fuga',
      desc: 'Recebe resistência a armadilhas e efeitos de movimento +5.'
    }
  },

  {
    id: 'procurado-vivo-ou-morto',
    name: 'Procurado: Vivo ou Morto',
    type: 'atlas',
    source: 'Atlas',
    region: 'Smokestone',
    desc: 'Um pistoleiro infame cuja cabeça está a prêmio. Caçado por mercenários, sua fama o precede.',
    items: 'Pistola, balas cruéis (20).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Fama Infame',
      desc: '• Proficiência com armas de fogo.\n• +5 em Intimidação e –5 em Diplomacia contra quem conhece sua fama.\n• Perigo: O grupo será atacado por caçadores de recompensa uma vez por aventura.'
    }
  },

  {
    id: 'profeta-do-akzath',
    name: 'Profeta do Akzath',
    type: 'atlas',
    source: 'Atlas',
    region: 'Lamnor',
    desc: 'Conhecedor da verdade sobre o tempo e o destino através do diagrama sagrado do Akzath.',
    items: 'Arma simples ou marcial, bordão, pergaminho com diagrama do Akzath.',
    autoTraining: ['Religião'],
    uniqueBenefit: {
      name: 'Fúria Profética',
      desc: 'Pode lançar magias mesmo sob o efeito de Fúria Divina.'
    }
  },
  // --- Finalização das ORIGENS DO ATLAS ---

  {
    id: 'querido-filho',
    name: 'Querido Filho',
    type: 'atlas',
    source: 'Atlas',
    region: 'Aslothia',
    desc: 'Por escolha ou destino, você abraçou a dádiva das trevas durante sua juventude em Aslothia.',
    items: 'Essência de sombra, manto camuflado (urbano).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Dádiva das Trevas',
      desc: '• Recebe redução de frio e trevas 5 e visão no escuro.\n• Se já tiver visão no escuro, recebe +2 em Percepção.'
    }
  },

  {
    id: 'rebelde-agitador',
    name: 'Rebelde Agitador',
    type: 'atlas',
    source: 'Atlas',
    region: 'Sckharshantallas',
    desc: 'Membro de grupos rebeldes que jamais desistiu de tentar depor o Dragão-Rei Sckhar.',
    items: 'Arma simples ou marcial, panfleto revolucionário, T$ 6d12.',
    autoTraining: ['Iniciativa'],
    uniqueBenefit: {
      name: 'Voz da Revolução',
      desc: '• Uma vez por aventura, pode gastar um dia para convencer pessoas (Diplomacia CD 10).\n• Cada sucesso gera um parceiro iniciante temporário que não conta no limite.'
    }
  },

  {
    id: 'receptador-das-nuvens',
    name: 'Receptador das Nuvens',
    type: 'atlas',
    source: 'Atlas',
    region: 'Vectora',
    desc: 'Cresceu entre bazares e becos do Mercado nas Nuvens, conhecendo diversos mercadores e contatos.',
    items: 'Mercadorias raras e variadas (T$ 300).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Aparatos de Vectora',
      desc: '• Pode gastar 1 dia para obter um aparato mágico (item de 1 espaço).\n• O aparato permite lançar uma magia de 1º círculo (Inteligência). Limite de 2 aparatos.'
    }
  },

  {
    id: 'recruta-arcano',
    name: 'Recruta Arcano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Wynlla',
    desc: 'Serviu entre os Magos de Batalha de Wynlla e agora aplica seu treino militar em aventuras.',
    items: 'Essência de mana (x2), varinha arcana.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Treino de Mago de Batalha',
      desc: '• A CD para resistir às suas magias arcanas aumenta em +1.\n• Suas magias arcanas causam +1 ponto de dano.'
    }
  },

  {
    id: 'recruta-da-fenix',
    name: 'Recruta da Fênix',
    type: 'atlas',
    source: 'Atlas',
    region: 'Triunphus',
    desc: 'Iniciou o treinamento para combater a Horda Moóck montado em grifos, sobrevivendo ao rigor da cidade.',
    items: 'Arma marcial, brunea, grifo iniciante.',
    autoTraining: ['Cavalgar'],
    uniqueBenefit: {
      name: 'Resiliência da Fênix',
      desc: '• Recebe +1 PV por nível e redução de fogo 5.'
    }
  },

  {
    id: 'sabio-matematico',
    name: 'Sábio Matemático',
    type: 'atlas',
    source: 'Atlas',
    region: 'Halak-Tûr',
    desc: 'Estudou equações complexas e usa o poder da matemática para prever resultados e resolver problemas.',
    items: 'Coleção de livros, luneta.',
    autoTraining: ['Conhecimento'],
    uniqueBenefit: {
      name: 'Cálculo Probabilístico',
      desc: '• Aprende e lança Concentração de Combate e Orientação.\n• Estes efeitos são matemáticos (não-mágicos) e não contam como magia.'
    }
  },

  {
    id: 'selvagem-sanguinario',
    name: 'Selvagem Sanguinário',
    type: 'atlas',
    source: 'Atlas',
    region: 'Sanguinárias',
    desc: 'Criado no lugar mais brutal de Arton, sobreviveu com base na determinação e força bruta.',
    items: 'Arma marcial, gibão de peles.',
    autoTraining: ['Sobrevivência'],
    uniqueBenefit: {
      name: 'Vigor das Montanhas',
      desc: '• Se não estiver de armadura pesada, recebe +1 no dano corpo a corpo e RD 1.'
    }
  },

  {
    id: 'sucateiro-de-batalhas',
    name: 'Sucateiro de Batalhas',
    type: 'atlas',
    source: 'Atlas',
    region: 'Conflagração do Aço',
    desc: 'Especialista em pilhar armas e itens abandonados em campos de batalha frequentes.',
    items: 'Arma, escudo, armadura, itens de cura e T$ 4d6.',
    autoTraining: ['Guerra', 'Investigação'],
    uniqueBenefit: {
      name: 'Olho para o Espólio',
      desc: 'Ao rolar tesouros por ND, você pode rolar novamente o resultado para cada tipo de tesouro.'
    }
  },

  {
    id: 'tamalu',
    name: 'Tamalu',
    type: 'atlas',
    source: 'Atlas',
    region: 'Khubar',
    desc: 'Membro da casta política de Khubar, portador de tatuagens místicas que narram sua história.',
    items: 'Traje da corte.',
    autoTraining: ['Diplomacia', 'Nobreza'],
    uniqueBenefit: {
      name: 'Tatuagem Mística',
      desc: '• Recebe uma tatuagem (+1 Defesa, +2 Res. Magia ou 1 Magia de 1º Círculo).\n• Tatuagens ocupam espaço de item vestido e o custo aumenta por quantidade.'
    }
  },

  {
    id: 'tocado-pela-dama-altiva',
    name: 'Tocado pela Dama Altiva',
    type: 'atlas',
    source: 'Atlas',
    region: 'Moreania',
    desc: 'Agraciado pela Mãe Natureza, você entende as vozes da floresta e invoca auxílio animal.',
    items: 'Bordão, rações de viagem (x5).',
    autoTraining: ['Adestramento'],
    uniqueBenefit: {
      name: 'Chamado da Natureza',
      desc: '• Pode gastar 1 PM para convocar um animal minúsculo (auxílio de +2 em uma perícia).\n• Limite de animais igual à Sabedoria.'
    }
  },

  {
    id: 'tocado-pelo-indomavel',
    name: 'Tocado pelo Indomável',
    type: 'atlas',
    source: 'Atlas',
    region: 'Moreania',
    desc: 'Agraciado com a ferocidade dos monstros, você possui uma natureza selvagem difícil de conter.',
    items: 'Trapos surrados, carcaça de couro (gibão de peles).',
    autoTraining: ['Atletismo'],
    uniqueBenefit: {
      name: 'Fúria Primal',
      desc: 'Recebe +2 em rolagens de dano com armas naturais e ataques desarmados.'
    }
  },

  {
    id: 'tradicionalista-svalano',
    name: 'Tradicionalista Svalano',
    type: 'atlas',
    source: 'Atlas',
    region: 'Svalas',
    desc: 'Herdeiro da tradição oral de Svalas, você carrega a história de um reino honrado e livre.',
    items: 'Arma simples ou marcial, corda, mochila, vara.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Tradição Oral',
      desc: '• Usa Sabedoria para Conhecimento e Nobreza (pode testar sem treino).\n• Recebe +1 em Fortitude e Vontade.'
    }
  },

  {
    id: 'trapaceiro-ahleniense',
    name: 'Trapaceiro Ahleniense',
    type: 'atlas',
    source: 'Atlas',
    region: 'Ahlen',
    desc: 'Mestre da malandragem no Reino da Intriga, você aprendeu cedo como não ser o otário.',
    items: 'Essência de sombra, gazua, estojo de disfarces.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Malandragem de Ahlen',
      desc: '• Recebe +2 em Enganação e Furtividade.\n• Pode usar Carisma como atributo-chave de Ladinagem.'
    }
  },

  {
    id: 'turista-da-academia',
    name: 'Turista da Academia',
    type: 'atlas',
    source: 'Atlas',
    region: 'Academia Arcana',
    desc: 'Assistiu algumas aulas na Academia Arcana. Não é um arcanista, mas sabe enjambrar truques.',
    items: 'Três pergaminhos de magia Arcana de 1º Círculo.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Ouvinte Arcano',
      desc: '• Recebe resistência a magia +2.\n• Pode ativar pergaminhos de 1º círculo arcano como se conhecesse as magias.'
    }
  },

  {
    id: 'um-com-os-kami',
    name: 'Um com os Kami',
    type: 'atlas',
    source: 'Atlas',
    region: 'Tamu-ra',
    desc: 'Capaz de perceber os espíritos divinos de Tamu-ra, você é tratado por eles como um amigo fiel.',
    items: 'Bálsamo restaurador, essência de mana.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Amigo dos Espíritos',
      desc: '• Usa Sabedoria para Misticismo.\n• Acompanhado por um kami (parceiro que vê invisíveis e torna ataques mágicos).\n• Pode gastar 1 PM para manipular objetos à distância.'
    }
  },
  // ──────────────────────────────────────────────────────────
  //  ORIGENS DE HERÓIS DE ARTON
  // ──────────────────────────────────────────────────────────

  {
    id: 'bacharel',
    name: 'Bacharel',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Treinado para argumentar, questionar e debater, você defende vítimas e acusa criminosos usando jurisprudência e filosofia.',
    items: 'Tabardo com o símbolo de Khalmyr, uma coleção de livros a sua escolha.',
    autoTraining: ['Conhecimento', 'Diplomacia', 'Nobreza'],
    uniqueBenefit: {
      name: 'Língua de Prata',
      desc: '• Uma vez por cena, pode usar Diplomacia para mudar atitude como uma ação livre.'
    }
  },

  {
    id: 'boticario',
    name: 'Boticário',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Aprendiz de especialista em ervas e misturas alquímicas, capaz de curar doenças ou fabricar elixires e venenos.',
    items: 'Bálsamo restaurador, instrumentos de Ofício (alquimista), maleta de medicamentos.',
    autoTraining: ['Cura', 'Ofício (alquimista)'],
    uniqueBenefit: {
      name: 'Alquimia Prática',
      desc: '• Pode fabricar poções de duas fórmulas de 1º círculo à sua escolha, como se tivesse o poder Alquimista Iniciado.'
    }
  },
  // --- Continuação das ORIGENS DE HERÓIS DE ARTON ---

  {
    id: 'cacador-de-ratos',
    name: 'Caçador de Ratos',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Especialista em livrar porões de infestações de pestes usando armadilhas, venenos ou clavas.',
    items: 'Clava, um gato (parceiro perseguidor iniciante), T$ 50.',
    autoTraining: ['Furtividade', 'Investigação', 'Sobrevivência'],
    uniqueBenefit: {
      name: 'Dedetizador',
      desc: '• Recebe +2 em testes de perícias contra criaturas de duas categorias de tamanho menor que a sua (mínimo Minúsculas).'
    }
  },

  {
    id: 'cao-de-briga',
    name: 'Cão de Briga',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Lutador de torneios clandestinos e sangrentos em tavernas e galpões escuros do submundo.',
    items: 'Manoplas ou uma arma marcial.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Fúria do Submundo',
      desc: '• Na primeira vez a cada cena em que faz a ação agredir, você pode fazer um ataque extra.'
    }
  },

  {
    id: 'carcereiro',
    name: 'Carcereiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Vigiou desde ladrões comuns até bruxos e monstros em calabouços perigosos.',
    items: 'Algemas, lampião, uma arma de até T$ 500.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Sentinela das Grades',
      desc: '• Recebe +2 em testes contra efeitos mentais, Enganação, Furtividade e Intimidação.'
    }
  },

  {
    id: 'carpinteiro-de-guilda',
    name: 'Carpinteiro de Guilda',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Artesão versátil treinado para construir desde mobílias até navios e fortalezas.',
    items: 'Instrumentos de Ofício (carpinteiro), uma arma de corte.',
    autoTraining: ['Ofício (artesão)'],
    uniqueBenefit: {
      name: 'Mestre da Madeira',
      desc: '• Recebe redução de corte 2.\n• Em suas mãos, armas de corte ignoram 5 pontos de redução de dano do alvo.'
    }
  },

  {
    id: 'catador-da-catastrofe',
    name: 'Catador da Catástrofe',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Sobrevivente de eventos cataclísmicos que aprendeu a vasculhar ruínas em busca de sustento.',
    items: 'Dois equipamentos de aventura de até T$ 150 cada.',
    autoTraining: ['Fortitude', 'Percepção'],
    uniqueBenefit: {
      name: 'Olho para o Lixo',
      desc: '• No início de cada aventura, pode fazer Percepção (CD 15 + metade do nível).\n• Se passar, encontra um tesouro (dinheiro ou item) correspondente ao seu ND.'
    }
  },

  {
    id: 'chef-hynne',
    name: 'Chef Hynne',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Mantém viva a tradição gastronômica de Hongari, preparando pratos que revitalizam o espírito.',
    items: 'Cutelo (foice), instrumentos de cozinheiro aprimorados.',
    autoTraining: ['Ofício (cozinheiro)'],
    uniqueBenefit: {
      name: 'Banquete de Hongari',
      desc: '• Quando prepara um prato especial, seu benefício dura mais 1 dia (ou permite um segundo uso diário do efeito).'
    }
  },

  {
    id: 'cirurgiao-barbeiro',
    name: 'Cirurgião-Barbeiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Realizava procedimentos médicos rudimentares e amputações onde clérigos não estavam por perto.',
    items: 'Dente falso, instrumentos de barbeiro, maleta de medicamentos.',
    autoTraining: ['Cura', 'Ofício (barbeiro)'],
    uniqueBenefit: {
      name: 'Cura Pragmática',
      desc: '• Pode gastar ação completa e 2 PM para remover condições (abalado, paralisado, etc) de aliado adjacente.\n• O alvo perde 1d6 PV no processo.'
    }
  },

  {
    id: 'citadino-abastado',
    name: 'Citadino Abastado',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Nascido em família rica e educada, buscando provar seu valor além do ouro dos pais.',
    items: 'Item (arma, armadura, etc) no valor de até T$ 500.',
    autoTraining: ['Nobreza', 'Ofício'],
    uniqueBenefit: {
      name: 'Educação Privilegiada',
      desc: '• Em cidades grandes, pode gastar T$ 10 x nível para aprender um conhecimento local.\n• Escolhe um poder de combate, destino ou classe (cumprindo requisito e autorizado pelo mestre) para usar por uma cena ou usar esse poder novamente.'
    }
  },

  {
    id: 'cocheiro',
    name: 'Cocheiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Conduzia veículos pelos ermos enfrentando bandidos e predadores para proteger passageiros.',
    items: 'Cavalo ou trobo, carroça.',
    autoTraining: ['Adestramento', 'Pilotagem'],
    uniqueBenefit: {
      name: 'Mestre das Rédeas',
      desc: '• Conduzindo veículo, você e o veículo recebem +2 na Defesa e em testes de resistência.'
    }
  },

  {
    id: 'construtor',
    name: 'Construtor',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Labutou erguendo casas, castelos e muralhas antes da destruição bater à sua porta.',
    items: 'Instrumentos de pedreiro ou ferramenta pesada.',
    autoTraining: ['Fortitude', 'Ofício (pedreiro)'],
    uniqueBenefit: {
      name: 'Análise Estrutural',
      desc: '• Pode pagar 2 PM para que você ou um aliado ignore 5 pontos de RD de uma criatura ou objeto por uma cena.'
    }
  },

  {
    id: 'contrabandista',
    name: 'Contrabandista',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Atravessava o continente sob disfarce transportando cargas proibidas e perigosas.',
    items: 'Arma de fogo ou 10 doses de veneno (até T$ 500).',
    autoTraining: ['Enganação', 'Ladinagem'],
    uniqueBenefit: {
      name: 'Carga Oculta',
      desc: '• +5 em Ladinagem para ocultar itens.\n• Capacidade de carga aumenta em 2 espaços.'
    }
  },

  {
    id: 'coureiro',
    name: 'Coureiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Artesão especializado em tratar peles de animais e monstros para criar equipamentos.',
    items: 'Faca de corte, instrumentos de coureiro, T$ 100 em itens alquímicos.',
    autoTraining: ['Fortitude', 'Ofício (coureiro)'],
    uniqueBenefit: {
      name: 'Reforço de Couro',
      desc: '• Pode gastar 10 min e T$ 10 para aumentar a Defesa de armadura de couro em +1 e reduzir penalidade em –2 por um dia.'
    }
  },

  {
    id: 'escriba',
    name: 'Escriba',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Dedicado à preservação de textos e disseminação da cultura através de manuscritos.',
    items: 'Instrumentos de escriba, organizador de pergaminhos, coleção de livros.',
    autoTraining: ['Conhecimento', 'Ofício (escriba)'],
    uniqueBenefit: {
      name: 'Sabedoria Transcrita',
      desc: '• Recebe o poder de bardo Lendas e Histórias.\n• Se já tiver o poder, recebe +5 ao rolar novamente o teste do efeito.'
    }
  },

  {
    id: 'espiao',
    name: 'Espião',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'No passado, sua lealdade pertencia secretamente a algum patrono poderoso, enviando relatórios sobre segredos e atividades alheias.',
    items: 'Estojo de disfarces, gazua, luneta, três doses de cosmético.',
    autoTraining: ['Enganação', 'Ladinagem'],
    uniqueBenefit: {
      name: 'Agente Infiltrado',
      desc: '• Escolha uma de suas perícias (exceto Luta ou Pontaria): você pode usar Carisma como atributo-chave dela.'
    }
  },

  {
    id: 'ferreiro-guerreiro',
    name: 'Ferreiro Guerreiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Você forjava o aço que decidia batalhas. De ferraduras a espadas de aço-rubi, suas mãos moldaram a guerra.',
    items: 'Instrumentos de armeiro, martelo leve.',
    autoTraining: ['Ofício (armeiro)'],
    uniqueBenefit: {
      name: 'Martelo de Forja',
      desc: '• Recebe +2 em rolagens de dano com martelos e marretas de qualquer tipo.'
    }
  },

  {
    id: 'freira',
    name: 'Freira',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Dedicada ao serviço espiritual e caridade, você protegia os vulneráveis em conventos ou abadias fortificadas.',
    items: 'Maleta de medicamentos, manto eclesiástico, símbolo sagrado.',
    autoTraining: ['Cura'],
    uniqueBenefit: {
      name: 'Vocação Caritativa',
      desc: '• Pode gastar 1 PM para aumentar o bônus da ação Ajudar em +1d4.\n• Pode gastar 1 PM para aumentar um efeito de cura em +1 dado.'
    }
  },

  {
    id: 'goradista',
    name: 'Goradista',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Mestre na arte dos doces de Tragematum, você utiliza o lendário gorad para revigorar aqueles que provam suas iguarias.',
    items: 'Instrumentos de cozinheiro, T$ 36 em ingredientes para gorad quente.',
    autoTraining: ['Ofício (cozinheiro)'],
    uniqueBenefit: {
      name: 'Cobertura de Gorad',
      desc: '• Ao preparar prato especial, pode gastar T$ 10 extras para adicionar gorad.\n• O prato fornece 2 PM temporários por patamar do comensal (além dos bônus normais).'
    }
  },

  {
    id: 'insciente',
    name: 'Insciente',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Nascido no Reino da Magia sem a capacidade de conjurar, você aprendeu a sobreviver confiando apenas no próprio aço e instinto.',
    items: 'Uma arma simples ou ferramenta de até T$ 100.',
    autoTraining: ['Sobrevivência'],
    uniqueBenefit: {
      name: 'Resiliência Antimagia',
      desc: '• Recebe resistência a magia +5.'
    }
  },

  {
    id: 'interrogador',
    name: 'Interrogador',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Serviu a poderes malignos em atos que assombram seus sonhos. Hoje, busca redenção protegendo os reinos.',
    items: 'Itens somando T$ 100 que pertenciam a antigas vítimas.',
    autoTraining: ['Intimidação', 'Investigação'],
    uniqueBenefit: {
      name: 'Onde Mais Dói',
      desc: '• Recebe +1 na margem de ameaça contra criaturas feridas (PV abaixo do total).'
    }
  },

  {
    id: 'ladrao-de-tumulos',
    name: 'Ladrão de Túmulos',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Saqueador de campos de batalha e sepulturas consagradas, habituado a lidar com os mortos e seus espólios.',
    items: 'Pá (lança), pé de cabra.',
    autoTraining: ['Ladinagem', 'Sobrevivência'],
    uniqueBenefit: {
      name: 'Piliar Cadáveres',
      desc: '• +2 na Defesa e perícias contra mortos-vivos.\n• Recebe redução de trevas 5 (ou recupera +1 PV por dado de trevas se for morto-vivo).'
    }
  },

  {
    id: 'menestrel',
    name: 'Menestrel',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Alegrava tavernas e cortes com sua música até que as histórias de aventura o inspiraram a buscar sua própria lenda.',
    items: 'Um instrumento musical de até T$ 35.',
    autoTraining: ['Atuação'],
    uniqueBenefit: {
      name: 'Dom Musical',
      desc: '• Recebe um poder de Música de bardo (Balada Fascinante, Canção Assustadora ou Melodia Curativa).'
    }
  },

  {
    id: 'mensageiro',
    name: 'Mensageiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Transportava informações vitais entre reinos, enfrentando perigos e terrenos traiçoeiros para entregar sua mensagem.',
    items: 'Cavalo com sela, mochila de aventureiro, traje de viajante.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Passo Veloz',
      desc: '• Recebe +3m em seu deslocamento.\n• Recebe +2 em todos os seus testes de resistência.'
    }
  },
  // --- Finalização das ORIGENS DE HERÓIS DE ARTON ---

  {
    id: 'naufrago',
    name: 'Náufrago',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Sobrevivente de um desastre marítimo, isolado em terras remotas onde aprendeu a obter sustento e evitar predadores com quase nenhum recurso.',
    items: 'Arco curto, 20 flechas, uma bola com uma cara pintada e nome de gente.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Instinto de Sobrevivência',
      desc: '• Recebe +5 PV e +2 PM.\n• Uma vez por cena, pode gastar 2 PM para receber até o fim da cena: treinamento em uma perícia, proficiência (arma/armadura/escudo) ou usar uma ferramenta no lugar de outra.'
    }
  },

  {
    id: 'padeiro',
    name: 'Padeiro',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Acordava antes do sol para alimentar a comunidade com pães e tortas, até que uma encomenda "especial" o forçou a fugir.',
    items: 'Instrumentos de Ofício (cozinheiro), rolo de massa (clava).',
    autoTraining: ['Ofício (cozinheiro)'],
    uniqueBenefit: {
      name: 'Braços de Padeiro',
      desc: '• Recebe +1 em rolagens de dano com armas de impacto.\n• Pode substituir testes de Atletismo por testes de Ofício (cozinheiro).'
    }
  },

  {
    id: 'pedinte',
    name: 'Pedinte',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Sobrevivia às margens da sociedade, ouvindo segredos nos becos e aprendendo a valorizar cada migalha de recurso.',
    items: 'Andrajos, 1 bálsamo restaurador e 1 essência de mana.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Economia de Rua',
      desc: '• Recebe +2 em Enganação e Furtividade.\n• Ao usar alimento ou poção: pode rolar o efeito 2x e usar o melhor OU dividir o item com um aliado adjacente (ambos recebem o benefício gastando apenas um item).'
    }
  },

  {
    id: 'pescador',
    name: 'Pescador',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Habituado às longas horas de paciência nas águas, sua calma acabou quando monstros ou piratas destruíram seu sustento.',
    items: 'Bolsa cheia de minhocas, instrumentos de pescador.',
    autoTraining: ['Ofício (pescador)', 'Sobrevivência'],
    uniqueBenefit: {
      name: 'Paciência de Pescador',
      desc: '• Recebe +2 em Iniciativa.\n• Sempre que prepara uma ação, recebe +2 em testes para executá-la.'
    }
  },

  {
    id: 'servo',
    name: 'Servo',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Atendia nobres e magos em palácios, sendo muitas vezes o primeiro a perceber intrigas e perigos iminentes.',
    items: 'Balde e vassoura (bordão), tabardo de seu patrono.',
    autoTraining: ['Diplomacia', 'Ofício (serviçal)'],
    uniqueBenefit: {
      name: 'Olhar de Criado',
      desc: '• Recebe +2 em Diplomacia e Enganação contra alvos de status superior.\n• Pode substituir testes de Nobreza por testes de Ofício (serviçal).'
    }
  },

  {
    id: 'suporte-de-tropas',
    name: 'Suporte de Tropas',
    type: 'herois',
    source: 'Heróis de Arton',
    desc: 'Acompanhava exércitos e aventureiros cuidando da logística e espólios, até decidir que era hora de lutar na linha de frente.',
    items: 'Equipamento de viagem, instrumentos de ofício, maleta de medicamentos.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Apoio de Campo',
      desc: '• O bônus fornecido ao Ajudar aumenta em +2.\n• Quando flanqueia um inimigo, o bônus de ataque para você e aliados aumenta para +4.'
    }
  },

  // ──────────────────────────────────────────────────────────
  //  OUTRAS FONTES (revistas, livros menores etc.)
  // ──────────────────────────────────────────────────────────

  // === Libertação de Valkaria ===
  {
    id: 'criacao-dos-deuses',
    name: 'Criação dos Deuses',
    type: 'outras',
    source: 'Libertação de Valkaria',
    desc: 'Você foi criado por um dos deuses maiores de Arton, mas deixou seu plano natal muito cedo. Talvez tenha sido um dos poucos escolhidos enviados em uma missão divina, ou tenha escapado de seu lar por um motivo qualquer.',
    items: 'Uma lembrança de seu plano natal (funciona como um símbolo sagrado do deus escolhido).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Escolhido dos Deuses',
      desc: 'Escolha um deus maior. Você se torna um espírito (retendo características do tipo original) e recebe redução de dano 5 conforme o tipo de energia do deus. Recebe o poder Escolhido dos Deuses para a divindade escolhida.',
      linkedPower: 'Escolhido dos Deuses'  // ← referência para buscar as variantes em powersData
    }
  },

  {
    id: 'herdeiro-libertacao',
    name: 'Herdeiro da Libertação',
    type: 'outras',
    source: 'Libertação de Valkaria',
    desc: 'Você é um dos raros seres nascidos em Candeh\'ssa, a cidade planar criada para dar suporte aos Libertadores. Uma vaga no grupo desses heróis pode estar disponível — desbravar o Labirinto, afinal, não é tarefa fácil.',
    items: 'Essência de mana, mochila de aventureiro, uma lembrança da cidade planar (½ espaço, T$ 100).',
    autoTraining: ['(Perícia à sua escolha)'],
    uniqueBenefit: {
      name: 'Filho de Candeh\'ssa',
      desc: 'Pode gastar uma ação de movimento e 1 PM para se mover até o dobro do seu deslocamento, ignorando terreno difícil e espaços ocupados por inimigos. Uma vez a cada tempo entre aventuras, pode visitar Candeh\'ssa como pelo efeito da magia Viagem Planar.'
    }
  },

  // ──────────────────────────────────────────────────────────
  //  A LENDA DE RUFF GHANOR
  // ──────────────────────────────────────────────────────────

  {
    id: 'acolito-ghanor',
    name: 'Acólito (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'De humildes mosteiros no campo a opulentas igrejas no centro de grandes cidades, os templos de Ghanor e dos Sete Reinos recebem jovens candidatos de todas as origens. Tenha ou não se tornado um sacerdote, suas lembranças são carregadas de orações e outros ensinamentos espirituais.',
    items: 'Essência de mana, símbolo sagrado.',
    autoTraining: ['Religião'],
    uniqueBenefit: {
      name: 'Chamado da Fé',
      desc: 'Recebe +1 ponto de mana por nível. Além disso, consegue hospedagem gratuita em qualquer templo de sua religião, para você e seus aliados.'
    }
  },

  {
    id: 'aristocrata-ghanor',
    name: 'Aristocrata (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Você nasceu na nobreza ou em uma família mercantil influente de um dos Sete Reinos. Recebeu educação refinada e está acostumado com o protocolo das cortes.',
    items: 'Traje da corte, joia de família (T$ 100).',
    autoTraining: ['Diplomacia', 'Nobreza'],
    uniqueBenefit: {
      name: 'Berço de Ouro',
      desc: '• Você recebe +2 em Diplomacia e Nobreza.\n• Uma vez por aventura, pode requisitar um favor simples de um contato influente sem custo.'
    }
  },

  {
    id: 'artifice-ghanor',
    name: 'Artífice (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Seja em uma oficina de ferreiro ou em um ateliê de alfaiate, você aprendeu a transformar matéria-prima em itens úteis e belos.',
    items: 'Instrumentos de Ofício, um item que possa fabricar (até T$ 50).',
    autoTraining: ['Ofício'],
    uniqueBenefit: {
      name: 'Mãos de Mestre',
      desc: '• Recebe +2 em testes de Ofício.\n• Quando fabrica um item, o tempo necessário é reduzido pela metade.'
    }
  },

  {
    id: 'barbaro-ghanor',
    name: 'Bárbaro (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Você veio das Terras Selvagens ou de tribos isoladas que não reconhecem a autoridade dos Sete Reinos, confiando apenas em sua força.',
    items: 'Arma simples ou marcial, troféu de caça.',
    autoTraining: ['Sobrevivência', 'Fortitude'],
    uniqueBenefit: {
      name: 'Vigor Selvagem',
      desc: '• Recebe +2 PV e +2 em testes de Fortitude.\n• Você não sofre penalidade em deslocamento por terreno difícil natural.'
    }
  },

  {
    id: 'criminoso-ghanor',
    name: 'Criminoso (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Nos becos das cidades ou nas estradas infestadas de salteadores, você aprendeu que as leis dos homens não garantem o almoço de amanhã.',
    items: 'Gazua, adaga, um item "achado" (T$ 50).',
    autoTraining: ['Ladinagem', 'Enganação'],
    uniqueBenefit: {
      name: 'Gíria das Ruas',
      desc: '• Recebe +2 em Ladinagem e Enganação.\n• Pode usar Ladinagem para obter informações em tavernas e guetos (substituindo Investigação).'
    }
  },

  {
    id: 'erudito-ghanor',
    name: 'Erudito (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Passou anos estudando em bibliotecas ou como aprendiz de um mestre sábio, acumulando conhecimento sobre a história e o mundo.',
    items: 'Coleção de livros, pena e tinta.',
    autoTraining: ['Conhecimento', 'Guerra'],
    uniqueBenefit: {
      name: 'Mente Analítica',
      desc: '• Recebe +2 em Conhecimento.\n• Uma vez por cena, pode gastar 1 PM para somar sua Inteligência em um teste de perícia baseada em Sabedoria ou Carisma.'
    }
  },

  {
    id: 'ermitao-ghanor',
    name: 'Ermitão (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Você viveu isolado da civilização por escolha própria ou exílio, aprendendo a ler os sinais da natureza e a bastar-se sozinho.',
    items: 'Cajado, barraca, ervas medicinais.',
    autoTraining: ['Percepção', 'Sobrevivência'],
    uniqueBenefit: {
      name: 'Paz Interior',
      desc: '• Recebe +2 em Vontade.\n• Quando faz um teste de Percepção ou Sobrevivência, pode rolar dois dados e escolher o melhor.'
    }
  },

  // --- Continuação: A LENDA DE RUFF GHANOR ---

  {
    id: 'campones-ghanor',
    name: 'Camponês (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Você passou a juventude em uma fazenda idílica antes de abandoná-la. Humilde por fora, mas com o coração de um verdadeiro herói.',
    items: 'Uma ferramenta agrícola (lança), rações de viagem (x10).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Coração Heroico',
      desc: '• Recebe +3 pontos de mana.\n• Pode gastar 1 PM para receber +1d4 em qualquer teste de perícia.'
    }
  },

  {
    id: 'crianca-da-guerra-ghanor',
    name: 'Criança da Guerra (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Cresceu em acampamentos militares e fortificações, acompanhando o treinamento de soldados em tempos de paz e guerra.',
    items: 'Uma arma marcial com insígnia militar.',
    autoTraining: ['Iniciativa'],
    uniqueBenefit: {
      name: 'Nascido no Campo de Batalha',
      desc: '• Recebe um poder de combate à sua escolha.',
      powerPicker: { types: ['combat'], count: 1 }
    }
  },

  {
    id: 'discipulo-arcano-ghanor',
    name: 'Discípulo Arcano (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Praticou as artes arcanas na mata com eremitas ou em ordens formais, ganhando compreensão profunda da magia.',
    items: 'Essência de mana (x2).',
    autoTraining: ['Misticismo'],
    uniqueBenefit: {
      name: 'Mestria Arcana',
      desc: '• A CD para resistir às suas magias arcanas aumenta em +1.'
    }
  },

  {
    id: 'escravo-ghanor',
    name: 'Escravo (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Privado de sua liberdade em minas ou cortes distantes, as provações horríveis o tornaram mais resoluto e resistente.',
    items: 'Algemas, uma ferramenta pesada (maça).',
    autoTraining: ['Fortitude'],
    uniqueBenefit: {
      name: 'Vigor das Correntes',
      desc: '• Recebe +3 PV no 1º nível e +1 PV por nível seguinte.'
    }
  },

  {
    id: 'escudeiro-ghanor',
    name: 'Escudeiro (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Serviu como ajudante de um cavaleiro, cuidando da retaguarda e presenciando atos de nobreza e coragem.',
    items: 'Cota de malha ou escudo pesado e elmo pesado (equipamentos usados).',
    autoTraining: ['Percepção'],
    uniqueBenefit: {
      name: 'Proteção do Escudeiro',
      desc: '• Recebe +2 na Defesa.'
    }
  },

  {
    id: 'estudioso-ghanor',
    name: 'Estudioso (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Criado entre livros e mapas, estudou desde a engenharia anã até a política dos Sete Reinos.',
    items: 'Bálsamo restaurador, essência de mana.',
    autoTraining: ['Conhecimento'],
    uniqueBenefit: {
      name: 'Aplicação Teórica',
      desc: '• Uma vez por cena, pode gastar 2 PM para substituir um teste de perícia por um teste de Conhecimento.'
    }
  },

  {
    id: 'grumete-ghanor',
    name: 'Grumete (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Aprendiz de marujo que passou horas limpando conveses e subindo em cordames sob o sol e a chuva.',
    items: 'Corda, 2d6 PP.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Equilíbrio Marítimo',
      desc: '• Recebe +2 em Acrobacia e Atletismo.\n• Ao se equilibrar ou escalar, não fica desprevenido e seu deslocamento não é reduzido.'
    }
  },

  {
    id: 'herdeiro-ghanor',
    name: 'Herdeiro (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Pertence a uma linhagem tradicional de onde se espera que você siga os passos e o ofício da família.',
    items: 'Herança de família (item normal ou superior de até 1.000 PP).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Nome da Família',
      desc: '• Recebe +3 PV e um poder geral à sua escolha.'
    }
  },

  {
    id: 'isolado-ghanor',
    name: 'Isolado (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Criado afastado da sociedade por segredo ou sobrevivência, você teve uma infância reclusa e aprendeu coisas que poucos de sua idade sabem.',
    items: 'Equipamento de viagem, rações de viagem (x5).',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Aprendizado Exótico',
      desc: '• Recebe +3 PM.\n• Recebe um poder geral à sua escolha.',
    }
  },

  {
    id: 'mascote-da-guarda-ghanor',
    name: 'Mascote da Guarda (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Criado entre guardas e milicianos, você cresceu ouvindo histórias de guarnições e aprendeu cedo a se defender.',
    items: 'Arma marcial com a insígnia da guarda.',
    autoTraining: ['Atletismo'],
    uniqueBenefit: {
      name: 'Treino da Guarnição',
      desc: '• Recebe +2 em testes de ataque.'
    }
  },

  {
    id: 'membro-de-gangue-ghanor',
    name: 'Membro de Gangue (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Cresceu em um ambiente de crime e brutalidade, onde a violência era a língua principal e a sobrevivência dependia de agir primeiro.',
    items: 'Uma arma simples corpo a corpo.',
    autoTraining: ['Intimidação'],
    uniqueBenefit: {
      name: 'Bater Primeiro',
      desc: '• Recebe uma ação padrão extra no seu primeiro turno de cada cena de ação.'
    }
  },

  {
    id: 'nomade-ghanor',
    name: 'Nômade (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Com os pés na estrada desde sempre, você nunca fincou raízes, viajando com caravanas ou fugindo de desastres.',
    items: 'Bordão, equipamento de viagem.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Passo Estradeiro',
      desc: '• Recebe +2 em Atletismo e Sobrevivência.\n• Não sofre penalidade em deslocamento por terreno difícil natural.'
    }
  },

  {
    id: 'orfao-ghanor',
    name: 'Órfão (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Criança de rua que aprendeu a sobreviver furtando bolsas e correndo da guarda pelos muros da cidade.',
    items: 'Adaga.',
    autoTraining: ['Atletismo'],
    uniqueBenefit: {
      name: 'Agilidade Urbana',
      desc: '• Recebe +3m em seu deslocamento.'
    }
  },

  {
    id: 'predestinado-ghanor',
    name: 'Predestinado (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Sua criação foi determinada por uma profecia ou marca de nascença que traçou seu destino antes mesmo de você nascer.',
    items: 'Um item de até 100 PP, tatuagem ou objeto relacionado ao destino.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Marcado pelo Destino',
      desc: '• Recebe +1 em um atributo à sua escolha.'
    }
  },

  {
    id: 'rato-ghanor',
    name: 'Rato (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Recrutado cedo por bandos criminosos, você foi um jovem ladrão ensinado a furtar e rastejar por espaços onde adultos não passariam.',
    items: 'Ferramentas de ladrão.',
    autoTraining: ['Furtividade', 'Ladinagem'],
    uniqueBenefit: {
      name: 'Agilidade das Sarjetas',
      desc: '• Você é treinado em Furtividade e Ladinagem.'
    }
  },

  {
    id: 'receptaculo-ghanor',
    name: 'Receptáculo (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Você recebeu de uma criatura sobrenatural uma fagulha de magia, tornando-se uma marca viva de forças místicas.',
    items: 'Essência de mana, marca de nascença ou tatuagem mística.',
    autoTraining: [],
    uniqueBenefit: {
      name: 'Fagulha Mística',
      desc: '• Pode lançar uma magia de 1º círculo à sua escolha (atributo-chave Carisma), pagando o custo normal em PM.'
    }
  },

  {
    id: 'refugiado-ghanor',
    name: 'Refugiado (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Sobrevivente de vilas massacres ou pragas, as privações o tornaram um sobrevivente embrutecido e tenaz.',
    items: 'Um item da terra natal (até 100 PP).',
    autoTraining: ['Vontade'],
    uniqueBenefit: {
      name: 'Sobrevivência Tenaz',
      desc: '• Sua condição de descanso é sempre uma categoria acima do padrão (Ex: Ruim vira Normal).'
    }
  },

  {
    id: 'selvagem-ghanor',
    name: 'Selvagem (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Criado em uma tribo primitiva em rotina de violência, você aprendeu a sobreviver nos ermos usando força bruta.',
    items: 'Uma arma simples.',
    autoTraining: ['Sobrevivência'],
    uniqueBenefit: {
      name: 'Brutalidade Primitiva',
      desc: '• Recebe +2 em rolagens de dano corpo a corpo.'
    }
  },

  {
    id: 'servical-ghanor',
    name: 'Serviçal (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Trabalhou em castelos ou mansões, tornando-se uma pessoa educada e extremamente atenta a sutilezas.',
    items: 'Carta de recomendação (veste da corte), 4d6 PP.',
    autoTraining: ['Diplomacia', 'Intuição'],
    uniqueBenefit: {
      name: 'Etiqueta de Palácio',
      desc: '• Você é treinado em Diplomacia e Intuição.'
    }
  },

  {
    id: 'trapaceiro-ghanor',
    name: 'Trapaceiro (Ghanor)',
    type: 'outras',
    source: 'A Lenda de Ruff Ghanor',
    desc: 'Compensou a falta de força com a velocidade das palavras, transformando a lábia em sua ferramenta mais poderosa.',
    items: 'Estojo de disfarces.',
    autoTraining: ['Enganação'],
    uniqueBenefit: {
      name: 'Língua de Serpente',
      desc: '• Pode substituir testes de Diplomacia por testes de Enganação.'
    }
  }

];
