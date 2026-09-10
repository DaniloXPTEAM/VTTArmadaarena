// ============================================================
//  CLASSES BASE — DRAGÃO BRASIL / A LENDA DE RUFF GHANOR
// ------------------------------------------------------------
//  Místico e Samurai (Dragão Brasil) e Soldado (A Lenda de Ruff
//  Ghanor) são classes completas próprias (não variantes de uma
//  classe do livro básico). Transcrito e reorganizado a partir
//  do material do usuário.
//
//  Mesmo formato de `data.js`/`classes-db-data.js`
//  (type/class/subType/pathReq/req/name/desc), com pathReq:
//  '<classe>-base' para habilidades fixas por nível e 'all'
//  para o pool de poderes selecionáveis — plugam direto no
//  motor de renderização de Classes existente.
// ============================================================

const classesDbBasePowers = [
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 1",
    name: "Afinidade",
    desc: "Escolha um elemento entre água, ar, fogo, luz, terra e trevas. Uma vez feita, essa escolha não pode ser mudada. Para cada círculo de magia que pode lançar, você recebe redução 5 contra o tipo de dano associado ao elemento escolhido (veja o quadro). Além disso, quando lança uma magia que causa dano de um tipo associado a outro elemento, você pode gastar 1 PM para transformar esse dano no tipo associado ao seu elemento. Por fim, cada elemento adiciona uma perícia à sua lista de perícias de classe.<br><br><strong>Regras adicionais (Ditames, Elementos e Manifestações Elementais):</strong><br>Ditames O místico expande suas magias conhecidas através de ditames, conjuntos temáticos fechados de conhecimento mágico. Ele não tem acesso a poderes como Conhecimento Mágico do arcanista e precisa seguir padrões e tradições estabelecidos há muito tempo e passados de geração a geração. Quando você adquire um poder de ditame, se já conhece uma das magias fornecidas pelo poder, pode trocá-la por outra magia de mesmo círculo, desde que essa magia seja de uma de suas escolas permitidas. Quando você lança uma magia aprendida. por meio de um poder de ditame, se estiver em contato com uma expressão natural do seu elemento de volume equivalente a uma criatura Média, o custo dessa magia é reduzido em -1 PM. Os Seis Elementos Elementos	Energia	Escola de Magia	Perícia Água	Frio	Encantamento	Diplomacia (Car) Ar	Eletricidade	Ilusão	Enganação (Car) Fogo	Fogo	Transmutação	Acrobacia (Des) Luz	Luz	Abjuração	Cura (Sab) Terra	Ácido	Convocação	Investigação (Int) Trevas	Trevas	Necromacia	Intimidação (Car) Manifestações Elementais Manifestações elementais são pequenos espíritos ligados a um tipo de energia elemental, Um místico que tenha realizado o ritual apropriado, pode se conectar a uma dessas manifestações e invocá-la em seu auxílio, Em termos de regras, manifestações elementais são parceiros que usam as regras a seguir. Para usar uma manifestação elemental você precisa primeiro gastar uma ação de movimento e 2 PM para evocá-la. Para isso, você precisa de acesso a uma expressão natural do elemento correspondente, Uma manifestação evocada desaparece no fim da cena. Em seu turno, você pode dar uma ordem para a manifestação usando uma ação de movimento. As ações que cada manifestação pode executar são apresentadas em sua descrição. Se a ação tiver um custo em PM, ele deve ser pago por você. Para outros usos criativos do parceiro, caso a manifestação precise realizar um teste, considere um modificador igual ao círculo máximo de magias que você pode lançar. Quando ela faz um teste, você pode gastar uma quantidade de PM limitada por sua Sabedoria. Para cada PM gasto, a manifestação recebe +2 nesse teste. Se a situação for condizente com a natureza do parceiro (como pedir que uma manifestação da água apague um incêndio ou que uma manifestação da terra erga algo pesado), ela recebe +5 nesse teste. Água Bolha. O elemental envolve seu corpo como uma bolha de água. Você recebe +4 na Defesa e pode respirar normalmente sob a água por uma rodada. Empurrão Hidráulico (2 PM). O elemental dispara um jato de água pressurizado em um alvo em alcance curto. O alvo sofre 3d6 pontos de dano de impacto e fica caído (Fortitude CD Sab reduz o dano à metade e evita a condição). Surfar. Uma criatura em alcance curto recebe deslocamento de natação 12m por uma rodada. Ar Barreira Eólica. Você recebe camuflagem contra ataques à distância e +2 em Reflexos por uma rodada. Conduzir ao Solo. Ao contrário de outras ações do elemental, esta é uma reação; você pode lançar Queda Suave, mas apenas em você mesmo. Planar (2 PM). Uma criatura em alcance curto recebe deslocamento de voo 12m por uma rodada. Fogo Aura de Calor. Até sua próxima rodada, inimigos que terminarem seus turnos adjacentes a você sofrem 2d6+2 pontos de dano de fogo. Chicote de Chamas (2 PM). O elemental acerta uma criatura em alcance curto com um jato de chamas que causa 4d6 pontos de dano de fogo (Reflexos CD Sab reduz à metade). Ladareda Propulsora. Uma criatura em alcance curto recebe +10 em testes de Atletismo para correr e saltar por uma rodada. Luz Brilhar. Emite luz como uma tocha. Uma criatura dentro do alcance curto fica ofuscada por 1 rodada (Vontade CD Sab nega). Curar (2 PM). Uma criatura dentro do alcance curto cura 4d8 pontos de vida. Cegar. Uma criatura dentro do alcance curto fica cega por 1 rodada (Vontade CD Sab nega) Terra Arremesso de Rocha (2 PM). O elemental arremessa um pedregulho contra um alvo em alcance médio, causando 5d6 pontos de dano de impacto (Reflexos CD Sab evita). Muralha. Você recebe redução de corte, impacto e perfuração 10 por uma rodada. Tunelar. Uma criatura dentro do alcance curto recebe deslocamento de escalada (12m) ou escavar (9m) por uma rodada. Trevas Manto de Sombras. Uma criatura dentro do alcance curto recebe +10 em testes de Furtividade para se esconder por 1 rodada. Tentáculo Obscuro (2 PM). O elemental agarra uma criatura dentro do alcance médio com seu tentáculo. Faça um teste de Misticismo para agarrar, com um bônus igual ao círculo máximo de magias que pode lançar. Apavorar. Uma criatura dentro do alcance curto fica abalada (Vontade CD Sab nega)"
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 1",
    name: "Ataque Elemental",
    desc: "Quando faz um ataque corpo a corpo, você pode gastar uma quantidade de PM limitada pelo círculo máximo de magia que pode lançar para infundir à arma com energia elemental. Para cada PM gasto, O ataque causa + 1d8 pontos de dano do tipo associado a sua Afinidade."
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 1",
    name: "Magias",
    desc: "Você pode lançar magias arcanas de 1º circulo de evocação, de uma segunda escola definida por sua Afinidade e de uma terceira escola à sua escolha (uma vez feita, essa escolha não pode ser mudada). À medida que sobe de nível, pode lançar magias de círculos maiores (2º círculo no 6º nível, 3º círculo no 10º nível e 4º circulo no 14º nível). Você começa com Criar Elementos e duas outras magias de 1º círculo a sua escolha. A cada nível par (2º, 4º etc), aprende uma magia de qualquer círculo e escola que possa lançar. Você pode lançar essas magias vestindo armaduras leves sem precisar de testes de Misticismo. Seu atributo-chave para lançar magias é Sabedoria e você soma sua Sabedoria no seu total de PM."
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 2",
    name: "Língua Primordial",
    desc: "No 2º nível, você pode se comunicar com espíritos ligados ao elemento de sua Afinidade, como o efeito básico da magia Voz Divina, e recebe +5 em testes de Carisma e de perícias originalmente baseadas em Carisma com essas criaturas, O mestre define exatamente quais criaturas se encaixam nessa descrição mas, como regra geral, qualquer criatura do tipo espírito com imunidade ao tipo de dano associado à sua Afinidade é considerada ligada ao seu elemento."
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 3",
    name: "Tradição Oral",
    desc: "No 3º nível, você recebe +2 em Misticismo. Esse bônus aumenta para +4 no 9º nível e para +6 no 13º nível."
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 4",
    name: "Sexto Sentido",
    desc: "No 4º nível, você soma sua Sabedoria, limitada pelo seu nível, à sua Defesa. Esta habilidade exige liberdade de movimentos; você não pode usa-la se estiver de armadura pesada ou na condição imóvel."
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 6",
    name: "Afinidade Evoluída",
    desc: "No 6º nível, À, escolha uma das seguintes opções. Afinidade Concentrada. Você recebe +2 na CD de suas habilidades de místico e em testes de ataque usando Ataque Elemental. Afinidade Expandida. Escolha um segundo elemento para sua habilidade Afinidade. Você se torna treinado na perícia relacionada a este segundo elemento e recebe todos os benefícios de Afinidade relativos a ele, incluindo redução de dano e acesso a sua escola associada."
  },
  {
    type: "class",
    class: "mistico",
    subType: "ability",
    pathReq: "mistico-base",
    req: "Nível 20",
    name: "Comunhão Suprema",
    desc: "No 20º nível, você desenvolve uma comunhão perfeita com seu elemento. Você se torna imune ao tipo de dano da sua Afinidade e o custo em PM de suas magias que causem dano desse tipo ou façam parte da escola associada é reduzido à metade (após aplicar aprimoramentos e quaisquer outros efeitos que reduzam custo)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Absorver Elemento",
    desc: "Uma vez por cena, quando está em contato com uma expressão natural do seu elemento, você pode gastar uma ação de movimento para absorver energia mágica. Você adquire uma quantidade de PMs temporários igual ao círculo máximo de magias que pode lançar. Esses PMs duram por uma cena e não são cumulativos."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "12º nível de místico, Afinidade Expandida",
    name: "Afinidade Maior",
    desc: "Você escolhe um terceiro elemento para sua habilidade Afinidade."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (terra)",
    name: "Andar pelas Paredes",
    desc: "Você recebe deslocamento de escalada igual ao seu deslocamento terrestre. Você não fica desprevenido enquanto escala desse modo."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "4º nível de místico, Afinidade (terra)",
    name: "Armadura Rochosa",
    desc: "Você pode gastar uma ação de movimento e 2 PM para moldar uma esfera de terra ou rocha que fica orbitando ao seu redor. Para cada círculo de magia além do 1º que puder lançar, você pode gastar +2 PM para moldar mais uma dessas esferas. Quando sofre dano, você pode gastar 1 esfera para receber RD 30 contra esse dano. Você também pode gastar uma ação de movimento e 1 esfera para causar 4d6 + Sabedoria pontos de dano de impacto em uma criatura em alcance curto (Ret CD Sab reduz à metade). As esferas permanecem ao seu redor até o fim da cena ou até serem usadas. Você precisa ter acesso a uma expressão de seu elemento para usar este poder."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Aumento de Atributo",
    desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (luz)",
    name: "Auréola Celeste",
    desc: "Quando lança uma magia de abjuração ou que causa dano de luz, você pode gastar uma ação de movimento e PM para evocar uma auréola sobre a cabeça de um aliado em alcance curto. A auréola concede 5 PV temporários por PM gasto e +1 em testes de resistência e dura até o fim da cena ou até que os PV temporários sejam perdidos."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6° nível de místico",
    name: "Contramágica Elemental",
    desc: "Você aprende Dissipar Magia e soma sua Sabedoria em testes de Misticismo para usar usá-la contra magias do elemento ou da escola associada a sua Afinidade."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Corpo Elemental",
    desc: "Uma vez por cena, você pode gastar uma ação de movimento para fortalecer seu físico com energia elemental. Você recebe 5 PV temporários para cada círculo de magias que pode lançar, ou o dobro disso se estiver em contato com uma expressão natural do seu elemento. Esses PV duram por uma cena."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "18º nível de místico, dois poderes de ditame",
    name: "Ditame Absoluto",
    desc: "Você aprende uma magia de 5º circulo a sua escolha de qualquer escola que possa lançar. Além disso, recebe acesso ao 5º círculo de magias para todos os efeitos, exceto para magias que pode aprender."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (água)",
    name: "Ditame da Chuva",
    desc: "Você aprende a magia Área Escorregadia. No 6º nível, aprende Tempestade Divina e no 10º nível aprende Controlar Água."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (luz)",
    name: "Ditame da Cura",
    desc: "Você aprende a magia Curar Ferimentos. No 6º nível, aprende Purificação e no 10º nível aprende Sopro da Salvação."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (fogo ou luz)",
    name: "Ditame da Manhã",
    desc: "Você aprende a magia Luz com todos os seus aprimoramentos, como se fosse um conjurador arcano e divino. No 6º nível, aprende Raio Solar e, no 10º nível, aprende Coluna de Chamas."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (terra)",
    name: "Ditame da Montanha",
    desc: "Você aprende a magia Primor Atlético. No 10º nível, aprende Controlar Terra é no 14º nível aprende Terremoto."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Ditame da Profecia",
    desc: "Você aprende a magia Augúrio. No 10º nível, aprende Lendas & Histórias e Vidência. Se lançar Augúrio em contato com uma expressão natural do seu elemento de tamanho Grande ou maior, não há chance de falha."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (água ou ar)",
    name: "Ditame das Brumas",
    desc: "Você aprende a magia Névoa. No 6º nível, aprende Camuflagem Ilusória e Miasma Mefítico."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (fogo)",
    name: "Ditame das Chamas",
    desc: "Você aprende a magia Explosão de Chamas. No 6º nível, aprende Controlar Fogo e no 10º nível aprende Lança Ígnea de Aleph."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (trevas)",
    name: "Ditame do Breu",
    desc: "Você aprende a magia Escuridão, No 10º nível, aprende Anular a Luz é Manto de Sombras."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (luz ou trevas)",
    name: "Ditame do Crepúsculo",
    desc: "Você aprende as magias Consagrar e Profanar e, no 6º nível, aprende Crânio Voador de Vladislav."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "treinado em Luta",
    name: "Ditame do Espadachim",
    desc: "Você aprende a magia Concentração de Combate. No 6º nível, aprende Velocidade e, no 10º nível, aprende Transformação de Guerra."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Ditame dos Portais",
    desc: "Você aprende Salto Dimensional. No 10º nível, aprende Teletransporte e, no 14º nível, aprende Viagem Planar."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (ar)",
    name: "Ditame dos Ventos",
    desc: "Você aprende a magia Queda Suave. No 6º nível, aprende Controlar Ar e, no 14º nível, aprende Controlar o Clima."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Disparo Elemental",
    name: "Disparo em Linha",
    desc: "Quando usa Disparo Elemental, você pode gastar 2 PM para atingir vários alvos alinhados. Faça um ataque à distância e compare-o com a Defesa de cada inimigo em uma linha de 9m e então faça uma única rolagem de dano e aplique o resultado a cada alvo atingido."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "treinado em Pontaria",
    name: "Disparo Elemental",
    desc: "Você pode usar seu Ataque Elemental com armas de ataque à distância."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "10º nível de místico, treinado em Luta",
    name: "Elementalismo Marcial",
    desc: "Quando usa Ataque Elemental, você pode gastar 2 PM para lançar uma magia que tenha tempo de execução de uma ação padrão ou menor, como uma ação livre."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Elemento Penetrante",
    desc: "Quando causa dano do tipo da sua Afinidade, você pode gastar uma quantidade de PM limitada pelo círculo máximo de magias que pode lançar. Para cada PM gasto dessa forma, você ignora até 10 pontos da redução de dano dos alvos."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Elemento Poderoso",
    desc: "A CD para resistir a suas habilidades de místico aumenta em +2."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (água ou ar)",
    name: "Empuxo",
    desc: "Você pode caminhar sobre água e fluidos similares e ganha deslocamento de natação igual ao seu deslocamento terrestre."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (terra)",
    name: "Escavador",
    desc: "Você recebe deslocamento de escavação igual a seu deslocamento terrestre."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (terra)",
    name: "Estabilidade Terrena",
    desc: "Você recebe um bônus igual ao circulo máximo de magias que pode lançar em testes para resistir a manobras de combate e a efeitos de movimento."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Escudo Elemental",
    desc: "Quando usa Ataque Elemental, para cada PM gasto você recebe + 1 na Defesa e em testes de resistência por 1 rodada."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Flagelo Elemental",
    desc: "Quando usa Ataque Elemental você aumenta seu multiplicador de crítico em +1."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (fogo)",
    name: "Golpe Ardente",
    desc: "Quando você usa Ataque Elemental é acerta o ataque, o alvo fica em chamas (Reflexos CD Sab evita)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (ar)",
    name: "Golpe Cortante",
    desc: "Quando você usa Ataque Elemental e acerta o ataque, o alvo fica sangrando (Reflexos CD Sab evita)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (água)",
    name: "Golpe Congelante",
    desc: "Quando você usa Ataque Elemental e acerta o ataque, o alvo fica lento por 1 rodada (Reflexos CD Sab evita)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (ar, fogo ou luz)",
    name: "Golpe Ofuscante",
    desc: "Quando você usa Ataque Elemental e acerta o ataque, o alvo fica cego por 1 rodada (Reflexos CD Sab evita)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (água, terra ou trevas)",
    name: "Golpe Pujante",
    desc: "Quando você usa Ataque Elemental e acerta o ataque, o alvo fica caído (Reflexos CD Sab evita)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (água)",
    name: "Hidratação",
    desc: "Quando lança uma magia de encantamento ou que cause dano de frio, você pode gastar PM para se hidratar. Para cada PM que gastar, você cura 5 PV."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (ar)",
    name: "Oito Nuvens",
    desc: "Quando lança uma magia de ilusão ou que cause dano de eletricidade, você pode usar uma ação de movimento e gastar até 8 PM para ser rodeado por nuvens até o final da cena. Para cada PM gasto, você recebe uma nuvem, que concede + 1 na Defesa. Além disso, se tiver pelo menos cinco nuvens, você recebe camuflagem. Sempre que um ataque contra você errar, uma nuvem é dissipada e o bônus na Defesa diminui em 1."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Pacto Elemental",
    name: "Pacto Cooperativo",
    desc: "Uma vez por rodada, você pode dar uma ordem para sua manifestação elemental como uma ação livre. Além disso, sua manifestação fornece bônus por flanquear contra um inimigo por rodada."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "6º nível de místico",
    name: "Pacto Elemental",
    desc: "Através de um ritual místico, você cria um vínculo mágico com uma manifestação elemental do mesmo tipo de sua Afinidade (veja o quadro)."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Pacto Elemental,",
    name: "Pacto Mágico",
    desc: "Você pode gastar uma ação de movimento para pedir que sua manifestação elemental busque uma magia em seu lugar. Você escolhe a magia quando faz o pedido, e pode pedir magias arcanas ou divinas, de qualquer escola, de um círculo ao qual tenha acesso. Uma vez ordenada, sua manifestação parte em busca da magia; encontrá-la demora um número de rodadas igual a 1d4 + o círculo da magia. Esse tempo aumenta em 2 rodadas se a magia for divina, e em 2 rodadas se for de uma escola à qual você não tem acesso. Ao final desse período, faça um teste de Misticismo (CD 15 + o círculo da magia; a cada novo pedido no mesmo dia aumenta a CD do teste em +5). Se você passar, a manifestação retorna e você aprende a magia por um dia. Se falhar, o parceiro se perde e só retorna no dia seguinte."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "3º nível de místico",
    name: "Perícia Mística",
    desc: "Você aplica seu bônus de Tradição Oral à perícia extra recebida por sua Afinidade."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (ar ou fogo)",
    name: "Propulsão",
    desc: "Você pode gastar 1 PM para adquirir deslocamento de voo 12m por uma rodada, mas cai se não encerrar seu movimento em uma superfície que sustente seu peso. No 10° nível, você aprende Voo."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (trevas)",
    name: "Resistência Tenebrosa",
    desc: "Quando faz um teste de resistência, você pode gastar 1 PM para receber um bônus igual ao circulo máximo de magia que pode lançar."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (fogo)",
    name: "Supernova",
    desc: "Quando lança uma magia que causa dano de fogo, você pode gastar pontos de vida para deixar as chamas mais intensas. Para cada 5 PV que gastar (conta como perda de vida), você aumenta o dano da magia em + 1d12."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Sustento Primordial",
    desc: "Quando descansa em uma área ocupada pela expressão natural de seu elemento, suas condições de descanso melhoram em um passo."
  },
  {
    type: "class",
    class: "mistico",
    subType: "power",
    pathReq: "all",
    req: "Afinidade (trevas)",
    name: "Visão Noturna",
    desc: "Você recebe +2 em Percepção e visão no escuro. Se você já possui visão no escuro, seu alcance aumenta em um passo (de curto para médio, de médio para longo)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 1",
    name: "Arma Ancestral",
    desc: "Você recebe proficiência em Katana e começa o jogo com uma arma ancestral, uma katana superior com uma melhoria com preço total de até T$ 500. Nos níveis 4, 6 e 8, sua arma ancestral recebe uma nova melhoria à sua escolha. Nas mãos de qualquer outra pessoa, sua arma ancestral funciona como uma arma normal (sem benefícios por melhorias ou encantamentos). Se perder sua arma ancestral, você perde todos os seus PM e só pode recuperá-los no dia seguinte. Você pode reforjar uma arma ancestral perdida ou destruída com uma semana de trabalho e o gasto de tibares em valor igual ao preço básico da arma."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 1",
    name: "Código do Samurai",
    desc: "Você deve sempre manter sua palavra e nunca pode recusar um pedido de ajuda de alguém inocente. Além disso, nunca pode mentir, trapacear ou roubar. Se violar o código, você perde todos os seus PM e só pode recuperá-los a partir do próximo dia."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 1",
    name: "Grito de Kiai",
    desc: "Quando faz um ataque corpo à corpo, você pode gastar 2 PM para rolar dois dados e usar o melhor resultado, Se acertar esse ataque, você recebe + 1d4 na rolagem de dano. Esse dano extra é multiplicado em caso de acerto crítico. A cada quatro níveis, o bônus de dano aumenta conforme indicado na tabela da classe."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 3",
    name: "Olhar Assustador",
    desc: "No 3º nível, você recebe +1 em Intimidação e Intuição. A cada seis níveis, esse bônus aumenta em +1."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 10",
    name: "Arma Espiritual",
    desc: "No 10º nível, sua arma ancestral se torna uma arma mágica com um encanto à sua escolha. Nos níveis 12 e 14 ela recebe um novo encanto a sua escolha."
  },
  {
    type: "class",
    class: "samurai",
    subType: "ability",
    pathReq: "samurai-base",
    req: "Nível 20",
    name: "Shogun",
    desc: "No 20° nível, o multiplicador de crítico da sua arma ancestral aumenta em dois. Além disso, recupera uma quantidade de pontos de vida igual a esse dano extra."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Arma Ancestral Adicional",
    desc: "Você recebe uma arma ancestral adicional de um tipo à sua escolha. Esta arma segue a mesma progressão de melhorias e encantos de sua primeira arma ancestral, mas você pode escolher benefícios diferentes para ela."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "5º nível de samurai",
    name: "Arma Reverberante",
    desc: "Quando usa Grito de Kiai para atacar com sua arma ancestral, você pode gastar +1 PM para aumentar o bônus de dano em +1 dado do mesmo tipo concedido por seu grito."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "6º nível de samurai",
    name: "Arma Veloz",
    desc: "Uma vez por rodada, quando usa a ação agredir com sua arma ancestral, você pode gastar 2 PM para realizar um ataque adicional com essa mesma arma."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Ataque Disciplinado",
    desc: "Quando ataca com sua arma ancestral, você soma sua Sabedoria nas rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Aumento de Atributo",
    desc: "Você recebe + 1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Con 1",
    name: "Avalanche das Três Mãos",
    desc: "Se estiver usando sua arma ancestral com as duas mãos, você soma sua Constituição nas rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Corte da Correnteza",
    desc: "Se estiver usando sua arma ancestral em corpo a corpo em uma das mãos e nada na outra, você recebe +2 na margem de ameaça e causa + 1d6 pontos de dano com acertos críticos."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Daisho",
    desc: "Você recebe proficiência com wakizashi e recebe uma dessas armas como uma arma ancestral adicional. Esta arma segue a mesma progressão de melhorias e encantos de sua primeira arma ancestral, mas você pode escolher benefícios diferentes para ela."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Despertar Ancestral",
    desc: "A sintonia entre um samurai e sua arma ancestral cresce conforme ela é utilizada, concedendo-lhe a habilidade de invocar poderes mágicos a partir de suas melhorias ou encantamentos. Escolha uma das opções a seguir; você pode escolher Despertar Ancestral novamente, escolhendo uma nova opção como um novo poder, mas não mais de uma vez por patamar."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Des 2",
    name: "Dois Céus",
    desc: "Se estiver empunhando sua arma ancestral e uma segunda arma (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre -2 em todos os testes de ataque até o seu próximo turno. Se possuir Estilo de Duas Armas, quando usa Grito de Kiai você pode gastar +1 PM para aplicar seu efeito a ambas as armas."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Emblema do Império de Jade",
    desc: "Você soma sua Sabedoria em Diplomacia, Guerra é Nobreza."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Vontade",
    name: "Equilíbrio Interior",
    desc: "Quando rola um 1 natural em um teste, você pode rolar novamente o dado. Você só pode usar este poder uma vez por teste."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Espírito Incisivo",
    desc: "Você recebe + 1 no multiplicador de critico em ataques com sua arma ancestral."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "12º nível de samurai",
    name: "Honra dos Ancestrais",
    desc: "O nome de sua família invoca a honra e tradição de seus antepassados. Uma vez por cena, você pode gastar uma ação de movimento para fazer um teste de Diplomacia, Intimidação ou Nobreza (CD) 10) e impressionar os presentes. Se passar, você recebe +1 em todos os seus testes de perícias baseadas em Carisma até o fim da cena. Esse bônus aumenta em +1 para cada 5 pontos pelos quais o resultado do teste exceder à CD (+2 para um resultado 15, +3 para 20 e assim por diante). Como alternativa, você pode aplicar esse bônus em seu próximo teste de ataque nesta cena."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Honra Inabalável",
    desc: "Você soma sua Sabedoria em seu total de pontos de vida e se torna imune a efeitos de medo. Este poder não elimina fobias raciais (como o medo de altura dos minotauros)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Iniciativa",
    name: "laijutsu",
    desc: "Você soma sua Sabedoria em Iniciativa e pode sacar ou guardar armas como uma ação livre (em vez de ação de movimento). Além disso, quando faz um teste de Iniciativa para agir, para cada 10 pontos no resultado de seu teste, você recebe +1 em testes de ataque e rolagens de dano com arma na primeira rodada de combate."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Serenidade dos Kami",
    name: "Ira Gentil",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, você soma seu bônus de Olhar Assustador em testes de ataque e rolagens de dano com sua arma ancestral."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Intimidação",
    name: "Kiai Assustador",
    desc: "Quando usa Grito de Kiai, você pode pagar 1 PM. Se acertar o ataque, todos os oponentes em alcance curto ficam abalados por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Kiai Estremecedor",
    desc: "Quando usa Grito de Kiai, você pode pagar 1 PM. Se acertar o ataque, todos os oponentes em alcance curto do alvo do ataque ficam caídos (Fortitude CD Sab evita)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Serenidade dos Kami",
    name: "Limiar da Tempestade",
    desc: "Quando faz um ataque, você pode gastar todos os PV temporários fornecidos por Serenidade dos Kami. Se fizer isso, você recebe um bônus na rolagem de dano deste ataque igual à metade dos PV gastos."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "treinado em Pontaria",
    name: "Kyudo",
    desc: "Você pode usar Grito de Kiai com ataques à distância. Quando usa uma arma de ataque à distância, pode usar sua Sabedoria em vez de Destreza nos testes de ataque (e, caso possua o poder Estilo de Disparo, nas rolagens de dano)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "8º nível de samurai, treinado em Ofício (caligrafo)",
    name: "Meditação Artistica",
    desc: "Você pode gastar 1 hora e 5 PM escrevendo um pequeno poema enquanto medita sobre os desafios por vir. Você recebe 5d6 dados de concentração. Pelas próximas 24 horas, sempre que for realizar um teste de perícia, você pode gastar um desses d6 e adicionar o resultado rolado como um bônus no teste."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Avalanche das Três Mãos, Serenidade dos Kami",
    name: "Montanha Serena",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, você soma sua Constituição em testes de manobra e na CD para resistir às suas habilidades de samurai."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Dois Céus, Serenidade dos Kami",
    name: "Nuvem Serena",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, o dano de sua arma ancestral aumenta em um passo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Corte da Correnteza, Serenidade dos Kami",
    name: "Rio Sereno",
    desc: "Enquanto tiver pontos de vida temporários fornecidos por Serenidade dos Kami, seu deslocamento aumenta em +3m e não é reduzido por terreno difícil natural."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Ronin",
    desc: "Você não precisa mais seguir seu Código do Samurai. Além disso, você pode trocar sua katana por outro tipo de arma, e não está limitado a katanas como sua arma ancestral."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Serenidade dos Kami",
    desc: "Você pode gastar uma ação de movimento e 3 PM para receber uma quantidade de PV temporários igual ao seu nível + sua sabedoria. Se usar este poder na primeira rodada de um combate, você não precisa gastar PM."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral profana ou sagrada",
    name: "Acima do Bem e do Mal",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 2 PM para aplicar o dano adicional do seu encanto profano ou sagrado contra qualquer criatura."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral dançarina",
    name: "Ancestral Dançarino",
    desc: "Quando usa o efeito de dançarina de sua arma ancestral, você pode gastar 2 PM para invocar um espírito ancestral para empunhar a arma. O espírito permanece enquanto dançarina for sustentada, não conta para seu limite de parceiros e é de um parceiro veterano fortão e guardião."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral macabra",
    name: "Aspecto Assustador",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para assumir um aspecto assustador. Se acertar o ataque, o alvo fica abalado (Vont CD Sab evita)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral banhada em ouro",
    name: "Aspecto Dourado",
    desc: "Você pode gastar 1 PM para substituir um teste de resistência por um teste de Diplomacia."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral cravejada de gemas",
    name: "Aspecto Opulento",
    desc: "Uma vez por rodada, você pode gastar 1 PM para fintar como uma ação de movimento (ou livre, se tiver Finta Aprimorada)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral cruel",
    name: "Avalanche Súbita",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para desferir um golpe atordoante. Se acertar o ataque, o alvo fica atordoado por uma rodada (Fort CD Sab evita; uma criatura só pode ser atordoada por esta habilidade uma vez por cena). Se sua arma ancestral for atroz, a CD para resistir a este poder aumenta em +2."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral energética",
    name: "Cortar Magia",
    desc: "Enquanto empunha sua arma ancestral, você pode usar Dissipar Magia com o modificador de contramágica, mas apenas em magias que tenham você como alvo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral precisa",
    name: "Corte do Vácuo",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM projetar uma onda de energia. O alcance desse ataque se torna curto e todo o dano causado se torna de essência."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral maciça",
    name: "Cortador de Cavalos",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para causar um dado de dano extra do mesmo tipo da arma."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral congelante, corrosiva, elétrica, flamejante ou tumular",
    name: "Dança dos Elementos",
    desc: "Quando usa sua arma ancestral para causar dano por frio, ácido, eletricidade, fogo ou trevas, você pode gastar 1 PM para aumentar cada dado de dano em um passo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral excruciante",
    name: "Dor Infinita",
    desc: "Quando acerta um construto ou morto-vivo, você pode gastar 2 PM para aplicar nele o efeito de seu encanto excruciante."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral injeção alquímica",
    name: "Engenhosidade Alquímica",
    desc: "Quando usa injeção alquímica, você pode gastar 1 PM para aumentar o dano do preparado em um dado do mesmo tipo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral defensora",
    name: "Escudo Ancestral",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 2 PM para escolher um aliado adjacente. Esse aliado recebe +5 na Defesa por uma rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de mitral",
    name: "Essência Fluida",
    desc: "Quando obtém um acerto crítico com sua arma ancestral, você pode gastar 1 PM para se mover até o seu deslocamento."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de gelo eterno",
    name: "Essência Gélida",
    desc: "Quando faz um teste de Iniciativa, você pode gastar 1 PM para receber redução contra frio igual ao seu nível + sua Sabedoria até o fim da cena."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de adamante",
    name: "Essência Invencível",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 1 PM para aumentar o dano desse ataque em um passo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de matéria vermelha, Ronin",
    name: "Essência Lefeu",
    desc: "Se estiver empunhando sua arma ancestral, você pode gastar 3 PM para somar sua Sabedoria nos testes de ataque e Reflexos e na Defesa por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de lanajuste",
    name: "Essência Marinha",
    desc: "Você soma sua Sabedoria em Atletismo e, quando faz um teste de Atletismo para nadar, pode gastar 1 PM para rolar dois dados e usar o melhor resultado."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de prata",
    name: "Essência Prateada",
    desc: "Quando acerta um ataque com sua arma ancestral, você pode gastar 1 PM. Se fizer isso, o alvo perde cura acelerada por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de casco de monstro",
    name: "Essência Monstruosa",
    desc: "Quando faz um acerto crítico com sua arma ancestral, você pode gastar 1 PM para receber uma quantidade de PV temporários igual à metade do seu nível + Sabedoria."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de aço-rubi",
    name: "Essência Rubi",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 1 PM para ignorar toda a redução de dano do alvo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral de madeira tollon",
    name: "Essência Virente",
    desc: "Se estiver empunhando sua arma ancestral, você pode gastar 1 PM para receber resistência a magia igual a sua Sabedoria por 1 rodada."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral drenante",
    name: "Fulgor Púrpura",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar uma quantidade de PV temporários limitada pela sua Sabedoria. Para cada 2 PV gastos, seu ataque causa +1d8 pontos de dano de essência."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral penetrante*",
    name: "Golpe Fantasma",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 1 PM para ignorar as imunidades do alvo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral destruidora",
    name: "Instinto Destruidor",
    desc: "Você recebe +2 em testes de manobra para quebrar. Sempre que reduz um item a 0 PV com essa manobra, você recupera 1 PM."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral piedosa",
    name: "Lâmina Invertida",
    desc: "Você pode ativar ou desativar o encantamento piedosa sem gastar PM."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral sanguinária",
    name: "Lâmina Sedenta",
    desc: "Quando faz um ataque contra um alvo sangrando, você pode gastar 2 PM para receber +5 no teste de ataque e na rolagem de dano."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral harmonizada",
    name: "Mistério Nebuloso",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 1 PM para obter camuflagem leve por um turno."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral assassina, Ronin",
    name: "Nada Além de Um Assassino",
    desc: "Você recebe a habilidade Ataque Furtivo +1d6. Você pode escolher este poder várias vezes (mas apenas uma vez por patamar) e seus efeitos se acumulam."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral dilacerante ou lancinante",
    name: "Paradoxo Absoluto",
    desc: "Quando faz um acerto crítico, você pode gastar 2 PM. Se fizer isso, soma sua Sabedoria na rolagem de dano (cumulativo com outros efeitos que somam este atributo). Se sua arma for lancinante, em vez disso você soma o dobro da Sabedoria."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral veloz",
    name: "Paradoxo da Celeridade",
    desc: "Uma vez por rodada, quando faz um acerto crítico com sua arma ancestral, você pode gastar 2 PM para fazer um ataque adicional contra o mesmo inimigo."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral anticriatura",
    name: "Paradoxo da Extinção",
    desc: "Quando faz um acerto crítico com sua arma ancestral, você pode gastar 2 PM para multiplicar o dano adicional causado pelo encanto anticriatura."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral caçadora",
    name: "Paradoxo da Extremidade",
    desc: "Uma vez por rodada, quando faz um acerto crítico com sua arma ancestral, você pode gastar 2 PM para fazer outro ataque contra uma criatura adjacente."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral ameaçadora",
    name: "Paradoxo do Gume",
    desc: "Quando faz um ataque corpo a corpo com sua arma ancestral, você pode gastar 2 PM para somar sua Sabedoria na margem de ameaça."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral conjuradora",
    name: "Paradoxo da Magia",
    desc: "Quando faz um acerto crítico com sua arma ancestral em um ataque em que tenha descarregado uma magia armazenada na arma, você pode gastar uma quantidade de PM igual ao círculo da magia para recuperá-la (ela volta a ser guardada na arma)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral venenosa",
    name: "Paradoxo Viperino",
    desc: "Quando faz um acerto crítico com sua arma ancestral, você pode gastar 1 PM para ignorar imunidade ou resistência a veneno da criatura atingida."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral formidável ou magnífica",
    name: "Perfeição Marcial",
    desc: "Você pode usar uma ação de movimento e 2 PM para somar seu bônus de Olhar Assustador no próximo teste de ataque e, caso acerte, na rolagem de dano com sua arma ancestral. Caso a arma seja magnífica, esse bônus é dobrado."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral mira telescópica",
    name: "Tiro Perfeito",
    desc: "Quando faz um ataque a distância com sua arma ancestral, você pode gastar 1 PM para ignorar camuflagem e cobertura."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral trovejante",
    name: "Trovão Incessante",
    desc: "Quando faz um acerto crítico, você pode gastar 2 PM para ativar o encanto trovejante, mesmo que já o tenha usado nessa cena."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral equilibrada",
    name: "Roda Fluvial",
    desc: "Quando faz um ataque com sua arma ancestral, você pode gastar 2 PM para fazer uma manobra de combate como uma ação livre."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — 10° nível de samurai, arma ancestral de arremesso",
    name: "Venha Cá",
    desc: "Quando faz um ataque corpo a corpo com uma arma ancestral de arremesso, você pode gastar 2 PM para arrastar o inimigo até o espaço vazio mais próximo a 1,5m de você (Ref CD Sab)."
  },
  {
    type: "class",
    class: "samurai",
    subType: "power",
    pathReq: "all",
    req: "Despertar Ancestral — arma ancestral certeira",
    name: "Voo da Andorinha",
    desc: "Uma vez por rodada, quando um inimigo erra um ataque corpo a corpo contra você, você pode gastar 1 PM para fazer um ataque contra ele usando sua arma ancestral. Se a arma for pungente, você recebe +2 nesse teste de ataque."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 1",
    name: "Ataque Disciplinado",
    desc: "Quando faz um ataque, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado. Se acertar esse ataque, você recebe +1d6 na rolagem de dano. A cada quatro níveis, você pode gastar +1 PM para aumentar o número de dados de dano extras (veja a tabela da classe)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 3",
    name: "Estratégia de Defesa",
    desc: "No 3º nível, escolha entre Infantaria Leve ou Tropa de Choque. Infantaria Leve. Você recebe +2 na Defesa. Esse bônus aumenta em +2 a cada quatro níveis. Você não pode usar esta habilidade se estiver imóvel ou usando armadura pesada. Tropa de Choque. Você recebe proficiência com armaduras pesadas. Quando usa armadura pesada, você recebe redução de dano 2. Esta redução de dano aumenta em +2 a cada quatro níveis."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 6",
    name: "Ataque Extra",
    desc: "A partir do 6º nível, quando usa a ação agredir, você pode gastar 2 PM para realizar um ataque adicional uma vez por rodada."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 10",
    name: "Supremacia Marcial",
    desc: "A partir do 10º nível, sempre que você faz um ataque e reduz os pontos de vida de um inimigo a 0 ou menos, você recebe 2 pontos de mana temporários (cumulativos). Você pode ganhar um máximo de PM temporários por cena igual ao seu nível. Esses pontos temporários desaparecem no fim da cena."
  },
  {
    type: "class",
    class: "soldado",
    subType: "ability",
    pathReq: "soldado-base",
    req: "Nível 20",
    name: "Mestre da Batalha",
    desc: "No 20º nível, o dano adicional causado por seu Ataque Disciplinado também é multiplicado em caso de acerto crítico. Além disso, quando acerta um ataque disciplinado, você recupera uma quantidade de pontos de vida igual ao dano extra causado por ele."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Des 2",
    name: "Ambidestria",
    desc: "Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma. Se fizer isso, sofre –2 em todos os testes de ataque até seu próximo turno."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Alabardeiro",
    desc: "Quando ataca um inimigo com uma arma alongada, você pode gastar 1 PM para fazer um ataque adicional contra um inimigo adjacente ao alvo original, se houver. Você pode atacar este segundo inimigo mesmo que ele esteja fora de seu alcance natural, mas não se ele estiver atrás de cobertura total."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Sab 1",
    name: "Arqueiro",
    desc: "Se estiver usando uma arma de ataque à distância, você soma sua Sabedoria em rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Des 1",
    name: "Ataque Reflexo",
    desc: "Se um alvo em alcance de seus ataques corpo a corpo ficar desprevenido ou se mover voluntariamente para fora do seu alcance, você pode gastar 1 PM para fazer um ataque corpo a corpo contra esse alvo (apenas uma vez por alvo a cada rodada)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Aumento de Atributo",
    desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Bater e Correr",
    desc: "Quando faz uma investida, você pode continuar se movendo após o ataque, até o limite de seu deslocamento. Se gastar 2 PM, pode fazer uma investida sobre terreno difícil e sem sofrer a penalidade de Defesa."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "For 1",
    name: "Destruidor",
    desc: "Quando causa dano com uma arma corpo a corpo de duas mãos, você pode rolar novamente qualquer resultado 1 ou 2 da rolagem de dano da arma."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "5º nível de soldado",
    name: "Disciplina Superior",
    desc: "O dado de dano que você rola por Ataque Disciplinado aumenta para d8."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Especialista em Armadura, Especialização em Arma",
    name: "Equipamento Padrão",
    desc: "Se estiver empunhando uma arma com a qual tenha o poder Especialização em Arma, e usando uma armadura com a qual tenha o poder Especialista em Armadura, os benefícios desses dois poderes são dobrados."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Int 1",
    name: "Esgrimista",
    desc: "Quando usa uma arma corpo a corpo leve ou ágil, você soma sua Inteligência em rolagens de dano (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Especialista em Armadura",
    desc: "Escolha uma armadura. Se estiver usando esta armadura, você recebe +1 na Defesa e redução de dano 1. Você pode escolher este poder outras vezes para armaduras diferentes."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Especialização em Arma",
    desc: "Escolha uma arma. Você recebe +2 em rolagens de dano com a arma escolhida. Você pode escolher este poder outras vezes para armas diferentes."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Golpe de Raspão",
    desc: "Uma vez por rodada, quando erra um ataque, você pode gastar 2 PM. Se fizer isso, causa metade do dano que o ataque causaria (ignorando efeitos que se aplicariam caso o ataque acertasse)."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Golpe Demolidor",
    desc: "Quando usa a manobra  quebrar ou ataca um objeto, você pode gastar 2 PM para ignorar a RD dele."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "treinado em Luta",
    name: "Golpe Oportunista",
    desc: "Quando usa a ação agredir e acerta um ataque, você pode pagar 1 PM para fazer um ataque desarmado extra contra o mesmo oponente."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Ímpeto",
    desc: "Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Lutador de Taverna",
    desc: "Seus ataques desarmados causam 1d6 pontos de dano. Quando faz um ataque desarmado, pode gastar 2 PM. Se fizer isso e acertar o ataque, o inimigo deve fazer um teste de Fortitude (CD For). Se ele falhar, fica atordoado por uma rodada. Você só pode usar este poder uma vez por cena contra uma mesma criatura."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "Especialização em Arma com a arma escolhida, 12º nível de soldado",
    name: "Mestre em Arma",
    desc: "Escolha uma arma. Com esta arma, seu dano aumenta em um passo e você pode gastar 2 PM para rolar novamente um teste de ataque recém realizado."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "treinado em Guerra, 10º nível de soldado",
    name: "Planejamento Marcial",
    desc: "Uma vez por dia, você pode gastar uma hora e 3 PM para escolher um poder de soldado ou de combate cujos pré-requisitos cumpra. Você recebe os benefícios desse poder até o próximo dia."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Precisão Disciplinada",
    desc: "Quando usa Ataque Disciplinado, você pode gastar 1 PM para aumentar a margem de ameaça do ataque em +2 ou para ignorar 10 pontos de redução de dano."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Solidez",
    desc: "Se estiver usando um escudo, você aplica o bônus na Defesa recebido pelo escudo em testes de resistência."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: "6º nível de soldado",
    name: "Tornado de Dor",
    desc: "Você pode gastar uma ação padrão e 2 PM para desferir uma série de golpes giratórios. Faça um ataque corpo a corpo e compare-o com a Defesa de cada inimigo adjacente. Então faça uma rolagem de dano com um bônus cumulativo de +2 para cada acerto e aplique-a em cada inimigo atingido."
  },
  {
    type: "class",
    class: "soldado",
    subType: "power",
    pathReq: "all",
    req: null,
    name: "Valentão",
    desc: "Você recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos"
  }
];
