// ============================================================
//  VARIANTES DE CLASSE — DRAGÃO BRASIL
// ------------------------------------------------------------
//  Fonte: revista Dragão Brasil (Arcanista-Sentinela, Caçador-
//  Miragem, Clérigo-Cruzado, Ladino-Capanga, Nobre-Comandante).
//  Transcrito e reorganizado a partir do material do usuário.
//
//  `classesDbVariantsMeta`: dados de cabeçalho de cada variante
//  (PV inicial/por nível, PM, perícias, proficiências, sinopse).
//
//  `classesDbPowers`: habilidades da variante no MESMO formato de
//  `data.js` (type/class/subType/pathReq/req/name/desc), então
//  plugam direto no motor de renderização de Classes existente.
// ============================================================

const classesDbVariantsMeta = [
  {
    classId: "arcanista",
    variantSlug: "sentinela",
    variantName: "Sentinela",
    source: "Dragão Brasil",
    flavor: "Combatente arcano que une espada e feitiçaria, recusando-se a ficar na retaguarda. Canaliza poder arcano em sua lâmina para reforçar defesas, ditar o fluxo do duelo e desferir golpes precisos na linha de frente.",
    pvInicial: 12,
    pvPorNivel: 4,
    pm: 5,
    skills: "Luta (For) e Misticismo (Int) mais 2 a sua escolha entre Conhecimento (Int), Diplomacia (Car), Enganação (Car), Guerra (Int), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Nobreza (Int), Ofício (Int), Percepção (Sab) e Vontade (Sab).",
    proficiencias: "Armas marciais."
  },
  {
    classId: "cacador",
    variantSlug: "miragem",
    variantName: "Miragem",
    source: "Dragão Brasil",
    flavor: "Guerreiro de elite praticante da Dança da Areia ferani. Combina velocidade acrobática, mobilidade e técnicas de guerrilha para desorientar inimigos e desferir ataques imprevisíveis.",
    pvInicial: 16,
    pvPorNivel: 4,
    pm: 3,
    skills: "Luta (For) ou Pontaria (Des), Sobrevivência (Des), mais 4 a sua escolha entre Acrobacia (Des), Atletismo (For), Fortitude (Con), Furtividade (Des), Guerra (Int), Iniciativa (Des), Intimidação (Car), Luta (For), Ofício (Int), Percepção (Sab), Pontaria (Des) e Reflexos (Dex).",
    proficiencias: "Armas marciais e escudos."
  },
  {
    classId: "clerigo",
    variantSlug: "cruzado",
    variantName: "Cruzado",
    source: "Dragão Brasil",
    flavor: "Sacerdote de postura marcial inabalável que encara a fé como uma missão de combate. Empunha armas sagradas concedidas pelos deuses para proteger santuários, defender dogmas e enfrentar o perigo na linha de frente.",
    pvInicial: 16,
    pvPorNivel: 4,
    pm: 5,
    skills: "Luta (For) ou Pontaria (Des) e Religião (Sab) mais 2 a sua escolha entre Conhecimento (Int), Cura (Sab), Diplomacia (Car), Fortitude (Con), Iniciativa (Des), Intuição (Sab), Luta (For), Misticismo (Int), Nobreza (Int), Ofício (Int), Percepção (Sab), Pontaria (Des) e Vontade (Sab).",
    proficiencias: "Armas marciais, armaduras pesadas e escudos."
  },
  {
    classId: "ladino",
    variantSlug: "capanga",
    variantName: "Capanga",
    source: "Dragão Brasil",
    flavor: "Ladino que trocou a sutileza pela força bruta do submundo urbano. Acostumado ao trabalho pesado de cobranças e intimidações, resolve conflitos com punhos pesados, lealdade férrea aos aliados e pragmatismo impiedoso.",
    pvInicial: 12,
    pvPorNivel: 3,
    pm: 4,
    skills: "Ladinagem (Des) e Enganação (Des), mais 6 a sua escolha entre Acrobacia (Des), Atletismo (For), Atuação (Car), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Furtividade (Des), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Jogatina (Car), Luta (For), Ofício (Int), Percepção (Sab), Pilotagem (Des), Pontaria (Des) e Reflexos (Des).",
    proficiencias: "Nenhuma."
  },
  {
    classId: "nobre",
    variantSlug: "comandante",
    variantName: "Comandante",
    source: "Dragão Brasil",
    flavor: "Líder marcial que conduz seus aliados na vanguarda do campo de batalha, comandando pelo exemplo. Usa carisma e táticas militares para coordenar manobras, manter a disciplina e levar o grupo à vitória.",
    pvInicial: 16,
    pvPorNivel: 4,
    pm: 3,
    skills: "Intimidação (Car), Guerra (Int) e Vontade (Sab) mais 3 a sua escolha entre Adestramento (Car), Atuação (Car), Cavalgar (Des), Conhecimento (Int), Diplomacia (Car), Enganação (Car), Fortitude (Con), Iniciativa (Des), Intimidação (Car), Intuição (Sab), Investigação (Int), Jogatina (Car), Luta (For), Nobreza (Int), Ofício (Int), Percepção (Sab) e Pontaria (Des).",
    proficiencias: "Armas marciais, armaduras pesadas e escudos."
  }
];

const classesDbPowers = [
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 1",
    name: "Caminho do Sentinela",
    desc: "Você lança magias misturando combate e feitiçaria. Para lançar uma magia em combate, você deve empunhar uma arma com a qual seja proficiente com uma mão (e gesticular com a outra) ou fazer um teste de Misticismo (CD 20 + o custo em PM da magia; se falhar, a magia não funciona, mas você gasta os PM mesmo assim). Fora de combate, deve pelo menos estar com uma das mãos sobre esta arma (por exemplo: segurando no cabo de uma espada embainhada) ou precisa fazer o mesmo teste. Você não precisa fazer testes de Misticismo para lançar magias arcanas se estiver usando uma armadura leve, e também recebe uma armadura leve como seu equipamento inicial no 1º nível. Seu atributo-chave para lançar magias é Inteligência."
  },
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 1",
    name: "Gladiomancia",
    desc: "Você pode gastar uma ação de movimento e 2 PM para evocar palavras de poder mágico e imbuir essência arcana em uma arma corpo a corpo leve ou ágil que esteja empunhando. Enquanto empunhar esta arma ou até o fim da cena (o que acontecer primeiro), você pode somar sua Inteligência em vez de Destreza na Defesa. Além disso, você usa Inteligência em testes de Luta, em vez de Força, e pode somar sua Inteligência em rolagens de dano usando esta arma (limitado pelo seu nível)."
  },
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 1",
    name: "Magias",
    desc: "Você pode lançar magias arcanas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2º círculo no 5º nível, 3º círculo no 9º nível e assim por diante). Você começa com três magias de 1º círculo. A cada nível, aprende uma magia de qualquer círculo que possa lançar. Seu atributo-chave para lançar magias é definido pelo seu Caminho (veja acima) e você soma o bônus do atributo-chave no seu total de PM."
  },
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 2",
    name: "Poder de Arcanista",
    desc: "A partir do 2º nível, você recebe esta habilidade como o arcanista básico."
  },
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 3",
    name: "Mago de Combate",
    desc: "Quando faz um ataque usando uma arma sob efeito de Gladiomancia, você soma o círculo máximo de magias que pode lançar à rolagem de dano. Além disso, a mão da arma é considerada livre para lançar magias."
  },
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 8",
    name: "Ataque Extra",
    desc: "A partir do 8º nível, quando usa a ação agredir, você pode gastar 2 PM para realizar um ataque adicional uma vez por rodada."
  },
  {
    type: "class",
    class: "arcanista",
    subType: "ability",
    pathReq: "sentinela",
    req: "Nível 20",
    name: "Mestre Arcano-combatente",
    desc: "No 20º nível, você pode usar Gladiomancia como ação livre. Enquanto empunhar uma arma sob o efeito de Gladiomancia, suas habilidades de sentinela (incluindo magias) têm seu custo em PM reduzido pela metade (após aplicar aprimoramentos e quaisquer outros efeitos que reduzam custo).*"
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 1",
    name: "Dança da Areia",
    desc: "Você pode gastar 2 PM para iniciar uma dança da areia. Enquanto executa essa dança, você recebe um bônus de +1d4 em suas rolagens de dano contra alvos em alcance curto. A cada quatro níveis, você pode gastar +1 PM para aumentar o dado de bônus de dano em um passo (de 1d4 para 1d6, por exemplo). A dança termina ao final da cena ou se você passar uma rodada sem percorrer pelo menos 6m sem passar pelo mesmo espaço duas vezes. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel"
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 1",
    name: "Rastreador",
    desc: "Você recebe +2 em Sobrevivência. Além disso, pode se mover com seu deslocamento normal enquanto rastreia sem sofrer penalidades no teste de Sobrevivência."
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 2",
    name: "Poder de Caçador",
    desc: "No 2º nível, e a cada nível seguinte, você escolhe um dos poderes de caçador, mas não pode escolher os poderes Escaramuça e Escaramuça Superior."
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 3",
    name: "Explorador",
    desc: "No 3º nível, escolha um tipo de terreno entre aquático, ártico, colina, deserto, floresta, montanha, pântano, planície, subterrâneo ou urbano. A partir do 11º nível, você também pode escolher área de Tormenta. Quando estiver no tipo de terreno escolhido, você soma sua Sabedoria (mínimo +1) na Defesa e nos testes de Acrobacia, Atletismo, Furtividade, Percepção e Sobrevivência. A cada quatro níveis, escolha outro tipo de terreno para receber o bônus ou aumente o bônus em um tipo de terreno já escolhido em +2."
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 5",
    name: "Caminho do Explorador",
    desc: "No 5º nível, você pode atravessar terrenos difíceis sem sofrer redução em seu deslocamento e a CD para rastrear você aumenta em +10. Esta habilidade só funciona em terrenos nos quais você tenha a habilidade Explorador."
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 7",
    name: "Cortina de Poeira",
    desc: "No 7º nível, você usa sua velocidade para criar uma nuvem de terra ou outros detritos para obscurecer a visão de seus inimigos. Quando usa Dança da Areia, você pode gastar +2 PM para receber camuflagem enquanto sua dança estiver ativa"
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 9",
    name: "Passo do Deserto",
    desc: "A partir do 9º nível, se estiver sob areia, terra ou outro tipo de terreno que não seja rocha sólida (ou o equivalente), uma vez por rodada você pode gastar 3 PM e se teleportar para qualquer outro ponto em alcance curto sobre o mesmo tipo de terreno.*"
  },
  {
    type: "class",
    class: "cacador",
    subType: "ability",
    pathReq: "miragem",
    req: "Nível 20",
    name: "Mestre do Deserto",
    desc: "No 20º nível, enquanto estiver usando Dança da Areia, quando sofre dano você pode gastar 1 PM para receber RD 20 contra esse dano. Além disso, quando usa a ação agredir durante uma Dança da Areia, você pode gastar 1 PM para fazer um ataque adicional.<br><br>Fonte DB #211"
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 1",
    name: "Devoto Fiel",
    desc: "Você se torna devoto de um deus maior. Veja as regras de devotos. Ao contrário de devotos normais, você recebe dois poderes concedidos por se tornar devoto, em vez de apenas um.<br><br>Você não pode escolher ser um clérigo de Lena, Marah, Sszzaas, Wynna ou um clérigo do Panteão."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 1",
    name: "Magias",
    desc: "Você pode lançar magias divinas de 1º círculo. A cada quatro níveis, pode lançar magias de um círculo maior (2° círculo no 5° nível, 3° círculo no 9° nível e assim por diante).<br><br>Você começa com três magias de 1° círculo. A cada nível, aprende uma magia de qualquer círculo que possa lançar.<br><br>Seu atributo-chave para lançar magias é Sabedoria e você soma sua Sabedoria no seu total de PM."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 1",
    name: "Presente dos Deuses",
    desc: "Você começa o jogo com uma arma superior com uma melhoria (exceto material especial) com preço total de até T$ 500. Preferencialmente, este item deve ser a arma preferida do seu deus, mas pode ser outra, de acordo com o mestre.<br><br>Nos níveis 5, 8 e 11, esse item recebe, respectivamente, uma segunda, terceira e quarta melhorias à sua escolha. Nos níveis 9, 14 e 18, esse item recebe, respectivamente, um, dois e três encantos à sua escolha.<br><br>Seu presente dos deuses funciona como a versão mundana da arma, mas ele não ocupa espaços no inventário pois você deve gastar uma ação de movimento e 2 PM para invocá-lo com um brilho de luz dourada — efeito que dura até o fim da cena, quando o item desaparece e volta para o mundo divino de onde veio."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 2",
    name: "Alma Guerreira",
    desc: "No 2º nível, quando invoca seu presente dos deuses em um combate, você recebe uma quantidade de pontos de vida temporários igual a seu nível + sua Sabedoria."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 2",
    name: "Poder de Clérigo",
    desc: "A partir do 2º nível, você recebe esta habilidade como o clérigo básico."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 3",
    name: "Fé Inabalável",
    desc: "No 3º nível, enquanto estiver empunhando seu presente dos deuses, você não fica inconsciente por estar com 0 PV ou menos (você ainda morre se chegar a um valor negativo igual à metade de seus pontos de vida máximos)."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 10",
    name: "Oração Marcial",
    desc: "No 10º nível, você pode, uma vez por dia, gastar uma hora e 5 PM para rezar ao seu deus e pedir orientação em combate; então escolha um poder de clérigo, de guerreiro ou de combate cujos pré-requisitos cumpra. Você recebe os benefícios desse poder até o próximo dia."
  },
  {
    type: "class",
    class: "clerigo",
    subType: "ability",
    pathReq: "cruzado",
    req: "Nível 20",
    name: "Guerreiro Santificado",
    desc: "No 20º nível, você torna-se tão formidável em combate quanto seus aliados combatentes. Você pode usar Ataque Especial como se fosse um guerreiro de 20º nível. Além disso, se usar essa habilidade em um ataque feito com o seu presente dos deuses, o custo para usá-la é reduzido em –1 PM.*"
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 1",
    name: "Ataque Furtivo Brutal",
    desc: "Você sabe aproveitar a distração do inimigo para atingir seus pontos vitais. Uma vez por rodada, quando atinge uma criatura desprevenida com um ataque corpo a corpo, ou uma criatura que esteja flanqueando, você causa 1d8 pontos de dano extra. A cada dois níveis, esse dano aumenta em +1d8. Uma criatura imune a acertos críticos também é imune a ataques furtivos."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 2",
    name: "Evasão",
    desc: "A partir do 2º nível como o ladino básico, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano algum se passar. Você ainda sofre dano normal se falhar no teste de Reflexos. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 2",
    name: "Poder de Ladino",
    desc: "A partir do 2º nível, você recebe esta habilidade como o ladino básico."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 1",
    name: "Rápido e Rasteiro",
    desc: "No 3º nível, você recebe +2 em Iniciativa, Defesa e em rolagens de dano na primeira rodada de cada combate. Esse bônus aumenta para +4 no 7º nível e para +6 no 15º nível."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 4",
    name: "Cara Feia",
    desc: "No 4º nível, você recebe +5 em testes de resistência contra efeitos de Medo e em testes de Vontade para resistir a intimidações."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 6",
    name: "Flanquear Aprimorado",
    desc: "No 6º nível, o bônus que você recebe contra oponentes flanqueados aumenta para +4 (em vez de +2)."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 8",
    name: "Olhos nas Costas",
    desc: "A partir do 8º nível, você consegue lutar contra diversos inimigos como se fossem apenas um. Você não pode ser flanqueado."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 10",
    name: "Evasão Aprimorada",
    desc: "No 10º nível, quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano algum se passar e sofre apenas metade do dano se falhar. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver de armadura pesada ou na condição imóvel."
  },
  {
    type: "class",
    class: "ladino",
    subType: "ability",
    pathReq: "capanga",
    req: "Nível 20",
    name: "Debulhar Inimigos",
    desc: "No 20º nível, você já perdeu a paciência com inimigos cheios de truques ou que são resistentes às suas habilidades. Seus ataques furtivos ignoram imunidades de criaturas a acertos críticos. Além disso, você pode gastar 5 PM quando faz um ataque para usar seu ataque furtivo mesmo que o alvo não esteja desprevenido ou que você não o esteja flanqueando."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 1",
    name: "Autoconfiança",
    desc: "Você pode usar seu Carisma em vez de Destreza na Defesa (mas continua não podendo somar um atributo na Defesa quando usa armadura pesada)."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 1",
    name: "Coordenar",
    desc: "No início de um combate, role 1d20 por patamar (1d20 para iniciante, 2d20 para veterano e assim por diante) e anote os resultados. Uma vez por rodada, você pode gastar 1 PM para substituir a rolagem do teste de um aliado em alcance curto por um desses seus resultados. Após substituir uma rolagem, o resultado é perdido. Além disso, você aprende e pode lançar Comando (atributo-chave Carisma). Esta não é uma habilidade mágica e provém de sua capacidade de impor suas vontades em outras criaturas."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 1",
    name: "Direcionar",
    desc: "Você pode gastar a ação do direcionamento e 1 PM para fazer um teste de Guerra (CD 15). Se passar, você usa um direcionamento em um aliado em alcance curto. Para cada 10 pontos acima da CD, você afeta um alvo adicional. Você começa com 2 direcionamentos (veja a seguir). A cada quatro níveis, aprende um direcionamento adicional à sua escolha.<br><br>Aguenta Firme! (padrão). Você encoraja seus aliados a continuar lutando. Os alvos recebem pontos de vida temporários iguais ao seu nível + seu Carisma. Carga! (completa). Você coordena seus aliados em um avanço conjunto. Faça uma investida. Se acertar e causar dano, alvos deste direcionamento podem usar uma reação para movimentar-se o equivalente a uma ação de movimento, mas devem terminar este movimento em uma posição mais próxima da criatura atingida pela sua investida. Em Frente! (reação). Você sabe liderar seus aliados em combates. Após os testes de Iniciativa, mas antes do primeiro turno do combate, você pode usar este direcionamento para deslocar os alvos em até 6m. Encontrem Eles! (movimento). Você alerta seus companheiros sobre ameaças nas sombras. Até o fim do seu próximo turno, os alvos recebem +2 em testes de Percepção e Intuição. Lutem! (padrão). Você incentiva seus aliados ao ataque. Alvos deste direcionamento podem usar uma reação para fazer um ataque contra um inimigo. O inimigo precisa estar dentro do alcance do aliado afetado por este poder Parede de Escudos! (reação). Você reúne seus aliados em uma barreira protetora de escudos. Quando um aliado adjacente sofrer um ataque, você pode usar este direcionamento para coordenar os alvos para protegê-lo, concedendo um bônus na Defesa do aliado protegido igual a 1 + a quantidade de alvos deste direcionamento. Peguem-no Vivo! (movimento). Você pede que seus aliados derrubem os inimigos sem matá-los. Até o fim do seu próximo turno, você e os alvos deste direcionamento não sofrem a penalidade de –5 em testes de ataque para causar dano não letal. Para o Chão! (reação). Você avisa seus aliados de um perigo iminente. Até o início do seu próximo turno, os alvos recebem um bônus em testes de resistência igual ao seu Carisma. Saiam Dessa! (movimento). Você dá um grito rápido, torcendo para dispersar a névoa que nubla os pensamentos dos seus aliados. Este direcionamento remove uma condição mental que estava afetando os alvos. Para cada 10 pontos acima da CD, você pode, em vez de afetar um alvo adicional, remover uma condição adicional. Vão, vão, vão! (padrão). Você lidera seu grupo para atacar uma ameaça em comum. Escolha um inimigo em alcance curto. Até o fim do seu próximo turno, você e os alvos deste direcionamento recebem +2 em testes de ataque e rolagens de dano contra este inimigo."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 2",
    name: "Palavras Afiadas",
    desc: "No 2º nível, você pode gastar uma ação padrão e 1 PM para fazer um teste de Diplomacia ou Intimidação oposto ao teste de Vontade de uma criatura inteligente (Int –3 ou maior) em alcance curto. Se vencer, você causa 2d6 pontos de dano psíquico não letal à criatura. Se perder, causa metade deste dano. Se a criatura for reduzida a 0 ou menos PV, em vez de cair inconsciente, ela se rende (se você usou Diplomacia) ou fica apavorada e foge de você da maneira mais eficiente possível (se usou Intimidação). A cada quatro níveis, você pode gastar +1 PM para aumentar o dano (veja a tabela da classe)."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 2",
    name: "Poder de Nobre",
    desc: "A partir do 2º nível, você recebe esta habilidade como o nobre básico."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 3",
    name: "Replanejar",
    desc: "No 3º nível, você consegue reorganizar seus planos e aliados caso tudo dê errado. Uma vez por cena, quando um oponente em alcance curto acerta um ataque em um de seus aliados, ou quando um de seus aliados falhar em um teste de resistência, você pode gastar 2 PM para fazer o oponente repetir o teste de ataque (escolhendo o pior entre os dois resultados) ou para fazer o aliado repetir o teste de resistência (escolhendo o melhor entre os dois resultados)."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 4",
    name: "Gritar Ordens",
    desc: "A partir do 4º nível, você pode gastar uma quantidade de PM a sua escolha (limitado pelo seu Carisma). Até o início de seu próximo turno, todos os seus aliados em alcance curto recebem um bônus nos testes de perícia igual à quantidade de PM que você gastou."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 5",
    name: "Presença de Liderança",
    desc: "A partir do 5º nível, você pode gastar 1 PM para seus aliados em alcance curto receberem +2 em testes de perícias baseadas em Carisma até o fim da cena. Além disso, você recebe +2 em testes de Intimidação."
  },
  {
    type: "class",
    class: "nobre",
    subType: "ability",
    pathReq: "comandante",
    req: "Nível 20",
    name: "Líder Nato",
    desc: "No 20º nível, você já liderou seu grupo por tanto tempo que aprendeu a comandá-lo com um aceno, uma única palavra ou com o menor gesto de mão. Uma vez por rodada, você pode usar Direcionar como ação livre, sem precisar fazer um teste e sem custo em PM. Além disso, uma criatura que seja reduzida a 0 PV por Palavras Afiadas não sofre este dano; em vez disso, passa a lutar ao seu lado pelo resto da cena."
  }
];
