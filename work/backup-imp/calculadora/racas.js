// ============================================================
//  racas.js — Dados de Raças | Calculadora de Atributos T20
//  Carregue ANTES de script.js no index.html.
//
//  Para adicionar uma raça nova:
//    1. Crie uma entrada em RACE_DATA
//    2. type: 'base' | 'ghanor' | 'ameacas' | 'DHracas' | 'outraRaca'
//    3. bonusMessage: apenas os bônus de atributo (ex: "FOR +2, DES +1")
//    4. racialPowers: [{ name, desc }] — habilidades fixas da raça
//    5. tamanho: 'Minúsculo' | 'Pequeno' | 'Médio' | 'Grande' | null (dinâmico)
// ============================================================

// ── HERANÇAS DE SURAGEL ──────────────────────────────────────
const SURAGEL_HERANCAS = {
    'Al-Gazara': { description: "<b>Herança de Al-Gazara.</b> Devido à presença do puro caos primordial de Nimb em seu sangue, você recebe +1 em um atributo aleatório." },
    'Arbória': { description: "<b>Herança de Arbória.</b> Como parte do Grande Ciclo de Allihanna, você recebe a habilidade Forma Selvagem para uma única forma, escolhida entre Ágil, Sorrateira e Veloz. Caso adquira essa habilidade novamente, o custo dessa forma diminui em –1 PM." },
    'Chacina': { description: "<b>Herança de Chacina.</b> Pela ferocidade de Megalokk, você recebe a habilidade Forma Selvagem para uma única forma, escolhida entre Feroz e Resistente. Caso adquira essa habilidade novamente, o custo dessa forma diminui em –1 PM." },
    'Deathok': { description: "<b>Herança de Deathok.</b> A mudança constante faz parte de sua alma. Você recebe +2 em duas perícias a sua escolha. A cada manhã, você pode trocar essas perícias." },
    'Drashantyr': { description: "<b>Herança de Drashantyr.</b> Graças ao poder elemental dos dragões, você recebe +1 PM e redução de ácido, eletricidade, fogo, frio, luz e trevas 5." },
    'Kundali': { description: "<b>Herança de Kundali.</b> Pelo espírito protetor, mas também opressor, de Tauron, você recebe +2 na Defesa e em testes de manobras de combate." },
    'Magika': { description: "<b>Herança de Magika.</b> Você aprende e pode lançar uma magia arcana de 1º círculo a sua escolha (atributo-chave Inteligência ou Carisma, a sua escolha). Caso aprenda novamente essa magia, seu custo diminui em –1 PM." },
    'Nivenciuén': { description: "<b>Herança de Nivenciuén.</b> Mesmo que o Reino de Glórienn tenha sofrido um destino terrível, a antiga soberania élfica ainda permeia seu sangue. Você recebe +2 em Misticismo e uma habilidade racial dos elfos entre Graça de Glórienn e Sangue Mágico." },
    'Odisseia': { description: "<b>Herança de Odisseia.</b> Sua alma tocada por Valkaria está sempre preparada para problemas! Você recebe +2 em Iniciativa e Percepção, e sua capacidade de carga aumenta em 2 espaços." },
    'Ordine': { description: "<b>Herança de Ordine.</b> As forças da lei e ordem de Khalmyr afetam suas ações. Você recebe +2 em Intuição, em Investigação e em testes sem rolagens de dados (ao escolher 0, 10 ou 20)." },
    'Pelágia': { description: "<b>Herança de Pelágia.</b> Mesmo nas situações mais desesperadoras, seu espírito se mantém plácido e imperturbável como o próprio Oceano. Escolha três perícias. Com elas, você pode gastar 1 PM para escolher 10 em qualquer situação, exceto testes de ataque." },
    'Pyra': { description: "<b>Herança de Pyra.</b> Em algum lugar dentro de você, sempre existe uma segunda chance. Quando faz um teste de resistência ou um teste de atributo para remover uma condição, você pode gastar 2 PM para rolá-lo novamente." },
    'Ramknal': { description: "<b>Herança de Ramknal.</b> Escolha duas perícias entre Acrobacia, Enganação, Furtividade, Jogatina e Ladinagem. Quando faz um teste da perícia escolhida, você pode gastar 2 PM para receber +5 nesse teste." },
    'Serena': { description: "<b>Herança de Serena.</b> Pela proteção de Marah, você recebe +2 na Defesa e em testes de resistência contra oponentes aos quais não tenha causado dano, perda de PV ou condições (exceto enfeitiçado, fascinado e pasmo) nessa cena." },
    'Skerry': { description: "<b>Herança de Skerry.</b> Você carrega a força de criatividade. Quando faz um teste de Ofício, pode gastar 1 PM para ser treinado na perícia em questão ou para rolar dois dados e usar o melhor resultado." },
    'Solaris': { description: "<b>Herança de Solaris.</b> Pelo poder de Azgher, durante o dia você recebe +1 em todos os testes de perícia. Se estiver diretamente sob a luz do sol, esse bônus aumenta para +2." },
    'Sombria': { description: "<b>Herança de Sombria.</b> Pelo poder de Tenebra, durante a noite você recebe +1 em todos os testes de perícia. Se estiver num local sem nenhuma iluminação artificial (como tochas ou magia), esse bônus aumenta para +2." },
    'Sora': { description: "<b>Herança de Sora.</b> Os honrados espíritos ancestrais de Lin-Wu abençoam sua perseverança. Você recebe +2 em Nobreza, Vontade e em testes de perícia estendidos (incluindo contra perigos complexos)." },
    'Terápolis': { description: "<b>Herança de Terápolis.</b> Você recebe +2 em Intuição e Vontade, e pode fazer testes dessas perícias contra ilusões automaticamente, sem precisar interagir com elas." },
    'Venomia': { description: "<b>Herança de Venomia.</b> Ser escorregadio como Sszzaas faz parte de sua natureza, mesmo que você não goste disso. Você recebe +2 em Enganação e em testes para evitar manobras de combate e efeitos de movimento." },
    'Vitalia': { description: "<b>Herança de Vitalia.</b> A força da vida corre intensa em seu sangue. Você recebe +5 PV por patamar e sua recuperação de pontos de vida com descanso aumenta em uma categoria." },
    'Werra': { description: "<b>Herança de Werra.</b> Você possui um conhecimento intuitivo para armas. Você recebe +1 em testes de ataque com armas e proficiência com armas marciais ou com duas armas exóticas." },
};

// Retorna a configuração de poderes "herdáveis" de uma raça para uso em
// Memória Póstuma (Osteon) e Natureza Orgânica (Yidishan).
// - Raças normais: um único poder fixo, escolhido em uma lista (<select>).
// - Raças com variantes raciais (ex: Moreau, cujos poderes dependem da
//   Herança Animal escolhida): poderes de todas as variantes são
//   "achatados" numa lista única de escolha (<select>).
// - Raças com pool dinâmico de mutações/talentos escolhidos via checkbox
//   (ex: Aberrante): usa uma checklist com um limite de seleção próprio,
//   menor que o limite normal da raça original (2 em vez de 4).
function getInheritablePowerConfig(race) {
    if (!race) return null;
    //aqui voce seleciona raças com checkbox

    if (race === RACE_DATA.aberrant) {
        const options = Object.entries(ABERRANT_MUTATIONS).map(([id, m]) => ({
            id, name: m.name, desc: m.desc || ''
        }));
        return options.length ? { type: 'checklist', maxSelect: 2, options } : null;
    }

    if (race === RACE_DATA.moreau) {
        const options = [];
        Object.entries(MOREAU_HERANCAS).forEach(([key, data]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            (data.powers || []).forEach(p => {
                options.push({ name: `${p.name} (${label})`, desc: p.desc, herancaKey: key });
            });
        });
        return options.length ? { type: 'select', options } : null;
    }

    return race.racialPowers && race.racialPowers.length
        ? { type: 'select', options: race.racialPowers }
        : null;
}

function getInheritedTamanho(raceKey, power) {
    if (power?.herancaKey === 'urso') return 'Grande';
    const race = RACE_DATA[raceKey];
    return race?.tamanho || 'Médio';
}

// ── DADOS INTERNOS DE RAÇAS COMPLEXAS ────────────────────────

// Golem: chassi
const GOLEM_CHASSI = {
    mashin: {
        attrs: {}, choiceCount: 2, label: 'Mashin', tamanho: 'Medio',
        img: 'https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUya2ZybGRqOGVkMXZqZ2Z5N2w2cWRnNG5vZ3Rra3Rxamxud2N0dGN4bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/lPuiw5nlcYTeCptRa4/giphy.gif',
        attrDesc: '+1 em dois atributos à sua escolha.',
        powers: [{ name: 'Chassi Mashin', desc: 'Você se torna treinado em duas perícias a sua escolha, e pode substituir uma dessas perícias por uma maravilha mecânica. Você é sempre Médio.' }]
    },
    barro: {
        attrs: { constituicao: 2 }, label: 'Barro', tamanho: null,
        img: 'https://64.media.tumblr.com/80000ca2a312c65036ac51b870d42bb1/tumblr_pgug05Drhh1t77wz1_250.gif',
        attrDesc: 'Constituição +2.',
        powers: [{ name: 'Chassi de Barro', desc: 'Seu deslocamento não é afetado por terreno difícil e passa automaticamente em testes de Acrobacia para espaços apertados. Se ficar sem contato com água por um dia, não recupera PM.' }]
    },
    bronze: {
        attrs: {}, choiceCount: 2, label: 'Bronze', tamanho: null,
        img: 'https://cdna.artstation.com/p/assets/images/images/083/475/918/original/-start-menu-idle-neweyes.gif',
        attrDesc: '+1 em dois atributos à sua escolha.',
        powers: [{ name: 'Chassi de Bronze', desc: 'Seu deslocamento não é reduzido por armaduras pesadas ou carga. Sua armadura não é acoplada; você pode removê-la no tempo normal, mas ela conta no limite de itens.' }]
    },
    carne: {
        attrs: { forca: 1, constituicao: 2, carisma: -1 }, label: 'Carne', tamanho: null,
        img: 'https://media1.tenor.com/m/1o2Q-Xm8BXcAAAAd/cindry-onepiece-cindry-smile.gif',
        attrDesc: 'Força +1, Constituição +2, Carisma −1.',
        powers: [{ name: 'Chassi de Carne', desc: 'Deslocamento 6m (não reduzido por carga/armadura). Imunidade a metamorfose e trevas. Dano de fogo e frio causa lentidão por 1d4 rodadas. Não pode usar fontes Elemental (água ou fogo) ou Vapor.' }]
    },
    espelho: {
        attrs: { carisma: 2, sabedoria: 1, constituicao: -1 }, label: 'Espelhos', tamanho: null,
        img: 'https://i.pinimg.com/originals/1a/00/23/1a0023bdc25ae9d95eab99ddb2855d05.gif',
        attrDesc: 'Carisma +2, Sabedoria +1, Constituição −1.',
        powers: [{ name: 'Chassi de Espelhos', desc: 'Pode gastar 1 PM para copiar uma habilidade de classe usada em alcance curto até o fim do próximo turno (usa Carisma como atributo).' }]
    },
    ferro: {
        attrs: { forca: 1, constituicao: 1 }, label: 'Ferro', tamanho: null,
        img: 'https://i.pinimg.com/originals/a4/eb/c4/a4ebc41676b750606b107bd9c4503851.gif',
        attrDesc: 'Força +1, Constituição +1.',
        powers: [{ name: 'Chassi de Ferro', desc: 'Deslocamento 6m (não reduzido por carga/armadura). Recebe +2 na Defesa, mas possui penalidade de armadura –2.' }]
    },
    gelo: {
        attrs: { constituicao: 2 }, label: 'Gelo Eterno', tamanho: null,
        img: 'https://media1.tenor.com/m/rkcCInlO04YAAAAd/%C3%A9s%C3%B3bater.gif',
        attrDesc: 'Constituição +2.',
        powers: [{ name: 'Chassi de Gelo', desc: 'Deslocamento 6m (não reduzido por carga/armadura). Imunidade a frio, redução de fogo 10. Não pode usar fonte Elemental (fogo) ou Vapor.' }]
    },
    pedra: {
        attrs: { constituicao: 2 }, label: 'Pedra', tamanho: null,
        img: 'https://clan.fastly.steamstatic.com/images/35898811/58ac6a7714698e8ac06774676eb176fde0d1d6ff.gif',
        attrDesc: 'Constituição +2.',
        powers: [{ name: 'Chassi de Pedra', desc: 'Não pode correr e deslocamento 6m (não reduzido por carga/armadura). Recebe redução de corte, fogo e perfuração 5.' }]
    },
    sucata: {
        attrs: { forca: 1, constituicao: 1 }, label: 'Sucata', tamanho: null,
        img: 'https://media.tenor.com/JwY5ZKwkFMQAAAAM/dark-stalkers-mecha.gif',
        attrDesc: 'Força +1, Constituição +1.',
        powers: [{ name: 'Chassi de Sucata', desc: 'Deslocamento 6m (não reduzido por carga/armadura). Cuidados prolongados de Ofício aumentam recuperação de PV em +2 por nível.' }]
    },
    dourado: {
        attrs: { forca: 1, carisma: 2 }, label: 'Inevitável', tamanho: null,
        img: 'https://i.makeagif.com/media/4-07-2022/5_ya8P.gif',
        attrDesc: 'Força +1, Carisma +2.',
        powers: [{ name: 'Chassi Inevitável', desc: 'Você pode gastar 1 PM para marcar uma criatura em alcance curto como culpada. Até o fim da cena, ou até você usar esta habilidade em outra criatura, você sempre sabe onde a criatura culpada está e, uma vez por rodada, um de seus ataques contra essa criatura causa +1d6 pontos de dano de luz.' }]
    },
};

const GOLEM_FONTES = {
    Alquimica: {
        powers: [{ name: 'Fonte Alquímica', desc: 'Ingerir um item alquímico com uma ação padrão recupera 1 PM.' }]
    },
    Elemental: {
        powers: [{ name: 'Fonte Elemental', desc: 'Imunidade ao dano do elemento escolhido (Água, Ar, Fogo ou Terra). Dano mágico desse tipo cura metade do valor em PV.' }]
    },
    Sagrada: {
        powers: [{ name: 'Fonte Sagrada', desc: 'Lança uma magia divina de 1º círculo (Sabedoria). Alguém treinado em Religião pode trocar a magia com um ritual de um dia.' }]
    },
    Vapor: {
        powers: [{ name: 'Fonte a Vapor', desc: 'Imune a fogo. Dano mágico de fogo aumenta deslocamento em 4,5m por uma rodada; frio causa lentidão. Pode soprar jato de vapor (cone 4,5m, 1d6 fogo por PM).' }]
    },
};

const GOLEM_MARAVILHAS = {
    adaptacao: { name: 'Adaptação Elemental', desc: 'Gaste 2 PM para receber RD 10 contra um tipo de dano elemental recebido até o fim da cena.' },
    arma_acoplada: { name: 'Arma Acoplada', desc: 'Arma embutida que pode ser empunhada/guardada como ação livre e não pode ser desarmada.' },
    arma_elemental: { name: 'Arma Elemental', desc: 'Gaste 2 PM para causar +1d6 de dano do seu tipo elemental na arma até o fim da cena. (Req. Fonte Elemental)' },
    mira: { name: 'Auxílio de Mira', desc: 'Ao atacar à distância, pague 1 PM para aumentar a margem de ameaça em +2.' },
    perfeicao: { name: 'Caminho de Perfeição', desc: 'Escolha uma perícia treinada e receba +2 nela.' },
    reparos: { name: 'Canalizar Reparos', desc: 'Como ação completa, cure 5 PV para cada 1 PM gasto.' },
    canhao: { name: 'Canhão Energético', desc: 'Se usar arma de fogo acoplada, gaste 1 PM para +1 dado de dano no próximo ataque. (Req. Arma Acoplada)' },
    dinamo: { name: 'Dínamo de Mana', desc: 'Gaste ação de movimento para reduzir o custo da próxima habilidade em -1 PM.' },
    pernas: { name: 'Pernas Aprimoradas', desc: 'Gaste 2 PM para receber +6m de deslocamento e +5 em Atletismo até o fim da cena.' },
    reservatorio: { name: 'Reservatório Alquímico', desc: 'Armazena 2 preparados alquímicos. Pode usá-los ou consumi-los para recuperar energia. (Req. Fonte Alquímica)' }
};

// Kallyanach: descrição da Herança Dracônica
const KALLYANACH_HERANCA_DESC = 'Você é uma criatura do tipo monstro e recebe redução 5 contra um tipo de dano a sua escolha entre ácido, eletricidade, fogo, frio, luz ou trevas.';

// Kallyanach: bênçãos
const KALLYANACH_BENCAOS = {
    bencaoArmamento: {
        name: 'Armamento Kallyanach',
        desc: 'Ganha uma arma natural (1d6) de cauda (impacto), chifres (perfuração) ou mordida (corte). Pode gastar 1 PM para um ataque extra com ela ao usar a ação agredir.'
    },
    bencaoAsas: {
        name: 'Asas Dracônicas',
        desc: 'Pode gastar 1 PM por rodada para voar (9m). Enquanto voa desta forma, você fica vulnerável.'
    },
    bencaoEscamas: {
        name: 'Escamas Elementais',
        desc: 'Recebe +2 na Defesa e a RD de sua Herança Dracônica aumenta para 10.'
    },
    bencaoMagia: {
        name: 'Prática Arcana',
        desc: 'Aprende uma magia de 1º círculo de dano igual à sua Herança (Inteligência). Se aprender novamente, custo reduz em -1 PM.'
    },
    bencaoSentidos: {
        name: 'Sentidos Dracônicos',
        desc: 'Você recebe faro e visão no escuro.'
    },
    bencaoSopro: {
        name: 'Sopro de Dragão',
        desc: 'Ação padrão e 1 PM: cone de 6m causa 1d12 de dano do seu elemento (Ref CD Con metade). A cada 4 níveis, pode gastar +1 PM para +1d12 de dano.'
    },
};

// Aberrante: mutações
const ABERRANT_MUTATIONS = {
    mutacaoAscetico: {
        attr: 'sabedoria',
        name: 'Ascético',
        desc: 'Recebe +1 em Sabedoria e +3 PM.'
    },
    mutacaoMusculoso: {
        attr: 'forca',
        name: 'Musculoso',
        desc: 'Recebe +1 em Força e +5 de capacidade de carga.'
    },
    mutacaoResistente: {
        attr: 'constituicao',
        name: 'Resistente',
        desc: 'Recebe +1 em Constituição e resistência a magia +2.'
    },
    mutacaoVeloz: {
        attr: 'destreza',
        name: 'Veloz',
        desc: 'Recebe +1 em Destreza e deslocamento +3m.'
    },
    mutacaoMagiaBizarra: {
        name: 'Magia Bizarra',
        desc: 'Pode lançar uma magia arcana de 1º círculo à escolha (Int ou Car). Reaprendizado reduz custo em -1 PM.'
    },
    mutacaoCouroRochoso: {
        name: 'Couro Rochoso',
        desc: 'Você recebe +2 em Defesa.'
    },
    mutacaoMetamorfose: {
        name: 'Metamorfose',
        desc: 'Pode lançar Disfarce Ilusório (atributo-chave Carisma).'
    },
    mutacaoMordida: {
        name: 'Mordida',
        desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com a mordida ao usar a ação agredir.'
    },
    mutacaoSentidosAgucados: {
        name: 'Sentidos Aguçados',
        desc: 'Você recebe visão no escuro e +2 em Percepção.'
    },
    mutacaoVenenoso: {
        name: 'Venenoso',
        desc: 'Resistência a veneno +5. Pode gastar Movimento e 1 PM para envenenar arma (1d12 PV).'
    },
};

// Kobold: talentos
const KOBOLD_TALENTS = {
    amontoados: {
        name: 'Amontoados',
        desc: 'Contam como criatura Grande para espaço e manobras. Podem se organizar em qualquer forma de 4 cubos de 1,5m (mudar de forma é ação de movimento).'
    },
    armadilha: {
        name: 'Armadilha Terrível',
        desc: 'Possuem uma armadilha portátil com uma magia de 1º círculo (alvo ou área). Funciona como engenhoca (Sobrevivência, atributo Sabedoria).'
    },
    diferentao: {
        name: 'Diferentão',
        desc: 'Recebe um poder de outra classe (requisitos de nível de classe consideram nível de personagem –4).'
    },
    ex_familiar: {
        name: 'Ex-Familiar',
        desc: 'Recebe +2 PM e benefícios de um familiar básico de arcanista (usa Carisma se não tiver atributo-chave de conjuração).'
    },
    ousado: {
        name: 'O Ousado',
        desc: '1 PM e Movimento: um membro se afasta (9m) e pode causar 2d4 de dano com ação padrão (aumenta em um passo a cada patamar). Tem 1 PV e retorna ao bando no fim da cena.'
    },
    fundo: {
        name: 'Os do Fundo',
        desc: 'Terceiro braço para empunhar objeto. Se for arma leve, permite um ataque extra por 1 PM ao usar a ação agredir. Req: Organizadinhos.'
    },
    organizadinhos: {
        name: 'Organizadinhos',
        desc: 'Usa Destreza para limite de carga e pode usar um item vestido adicional.'
    },
    oportunistas: {
        name: 'Pestes Oportunistas',
        desc: 'Uma vez por rodada, causa +1d6 de dano em criatura que já sofreu dano nesta rodada (dano aumenta por patamar).'
    },
    explosivos: {
        name: 'Somos Explosivos',
        desc: 'Ação completa e gasto de PV (até o nível): arremessa kobold em alcance curto (área 3m). Dano 1d6 por PV gasto. Se rolar 6, ganha +1d6.'
    },
    enxame: {
        name: 'Tática de Enxame',
        desc: '2 PM (Sustentado): Forma de enxame. Entra no espaço de inimigos, imune a manobras e metade do dano de armas. Não pode fazer ações coordenadas. Req: Amontoados.'
    }
};

// Moreau: heranças (cada animal tem atributo fixo + poderes únicos)
const MOREAU_HERANCAS = {
    coruja: {
        attr: 'sabedoria',
        attrDesc: 'Sabedoria +1, +1 em dois atributos.',
        img: 'https://64.media.tumblr.com/a08e6cc43f776f5465d828c92745732c/3ac762947728a3f4-5a/s540x810/d4a75ccf84342d5841c1993a08b7a219c5fa63e4.gif',
        powers: [
            { name: 'Espreitador', desc: 'Recebe visão no escuro e +2 em Percepção e Vontade.' },
            { name: 'Garras', desc: 'Duas armas naturais (1d6). Pode gastar 1 PM para ataque extra com garra livre ao usar a ação agredir.' },
            { name: 'Sapiência', desc: 'Lança uma magia de 1º círculo de adivinhação (Sabedoria). Se aprender de novo, custo reduz em -1 PM.' }
        ]
    },
    hiena: {
        attr: 'sabedoria',
        attrDesc: 'Sabedoria +1, +1 em dois atributos.',
        img: 'https://media1.tenor.com/m/BtIllWFPLZAAAAAC/hyena-lionking.gif',
        powers: [
            { name: 'Destemor', desc: 'Recebe +2 em rolagens de dano e testes de resistência contra criaturas maiores que você.' },
            { name: 'Faro', desc: 'Olfato apurado. Contra inimigos em alcance curto, não fica desprevenido e camuflagem total cai para 20%.' },
            { name: 'Mordida', desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com mordida ao usar a ação agredir.' }
        ]
    },
    raposa: {
        attr: 'inteligencia',
        attrDesc: 'Inteligência +1, +1 em dois atributos.',
        img: 'https://media1.tenor.com/m/5t3uqVBgquYAAAAC/zootopia-nick-wilde.gif',
        powers: [
            { name: 'Agarra-me se Puderes', desc: 'Deslocamento 12m e visão na penumbra.' },
            { name: 'Esperteza Vulpina', desc: 'Recebe +2 em duas perícias baseadas em Inteligência ou Carisma.' },
            { name: 'Faro', desc: 'Olfato apurado. Contra inimigos em alcance curto, não fica desprevenido e camuflagem total cai para 20%.' }
        ]
    },
    serpente: {
        attr: 'inteligencia',
        attrDesc: 'Inteligência +1, +1 em dois atributos.',
        img: 'https://64.media.tumblr.com/b70b2236cbc05df471b1864b070edbde/tumblr_prxsmgfkzv1r2zjloo4_r1_400.gif',
        powers: [
            { name: 'Arborícola', desc: 'Recebe deslocamento de escalada 6m e +2 em Furtividade.' },
            { name: 'Constritor', desc: 'Recebe +2 em testes para agarrar e no dano contra criaturas que esteja agarrando.' },
            { name: 'Instintos Traiçoeiros', desc: 'Visão no escuro, +2 em Diplomacia e na CD de seus efeitos mentais.' }
        ]
    },
    bufalo: {
        attr: 'forca',
        attrDesc: 'Força +1, +1 em dois atributos.',
        img: 'https://media1.tenor.com/m/xOuqexM1QI0AAAAd/kinnikuman-buffaloman.gif',
        powers: [
            { name: 'Chifres', desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com chifres ao usar a ação agredir.' },
            { name: 'Faro', desc: 'Olfato apurado. Contra inimigos em alcance curto, não fica desprevenido e camuflagem total cai para 20%.' },
            { name: 'Marrada Impressionante', desc: 'Recebe +2 em investidas e empurrar. Usa Força para Intimidação.' }
        ]
    },
    coelho: {
        attr: 'destreza',
        attrDesc: 'Destreza +1, +1 em dois atributos.',
        img: 'https://media.tenor.com/7ghUf4IwTeUAAAAM/zootopia-rabbit.gif',
        powers: [
            { name: 'Patas Ligeiras', desc: 'Deslocamento 12m. Ao correr com Atletismo, não precisa ser em linha reta.' },
            { name: 'Pé de Coelho', desc: 'Gaste 1 PM para rolar 2 dados em testes de perícia de Destreza (exceto ataques).' },
            { name: 'Senso de Preservação', desc: 'Recebe visão na penumbra e +2 em Percepção e Reflexos.' }
        ]
    },
    crocodilo: {
        attr: 'constituicao',
        attrDesc: 'Constituição +1, +1 em dois atributos.',
        img: 'https://i.imgur.com/jQwOTIR.gif',
        powers: [
            { name: 'Mordida Poderosa', desc: 'Arma natural (1d6) e +2 para agarrar. Pode gastar 1 PM para ataque extra com mordida ao usar a ação agredir.' },
            { name: 'Predador Aquático', desc: 'Deslocamento natação 6m. Recebe +1 na Defesa e +2 em Furtividade.' },
            { name: 'Surto Reptiliano', desc: 'Uma vez por cena, gaste 1 PM para uma ação de movimento adicional.' }
        ]
    },
    gato: {
        attr: 'carisma',
        attrDesc: 'Carisma +1, +1 em dois atributos.',
        img: 'https://i.pinimg.com/originals/b3/a6/da/b3a6daffbeef2af9e7203dd480e89000.gif',
        powers: [
            { name: 'As Muitas Vidas de Um Gato', desc: 'Soma Carisma em Acrobacia e estabilização. Reduz dano de queda em 3d6.' },
            { name: 'Garras', desc: 'Duas armas naturais (1d6). Pode gastar 1 PM para ataque extra com garra livre ao usar a ação agredir.' },
            { name: 'Sentidos Felinos', desc: 'Recebe visão na penumbra e +2 em Furtividade e Percepção.' }
        ]
    },
    leao: {
        attr: 'forca',
        attrDesc: 'Força +1, +1 em dois atributos.',
        img: 'https://i.gifer.com/C93F.gif',
        powers: [
            { name: 'Mordida', desc: 'Arma natural (1d8). Pode gastar 1 PM para ataque extra com mordida ao usar a ação agredir.' },
            { name: 'Rugido Imponente', desc: 'Ação de movimento e 1 PM: inimigos em alcance curto sofrem -2 no dano por 1 rodada.' },
            { name: 'Sentidos da Realeza', desc: 'Recebe visão na penumbra e +2 em Intimidação e Percepção.' }
        ]
    },
    lobo: {
        attr: 'carisma',
        attrDesc: 'Carisma +1, +1 em dois atributos.',
        img: 'https://i.makeagif.com/media/4-20-2023/6IDAQU.gif',
        powers: [
            { name: 'Faro', desc: 'Olfato apurado. Contra inimigos em alcance curto, não fica desprevenido e camuflagem total cai para 20%.' },
            { name: 'Mordida', desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com mordida ao usar a ação agredir.' },
            { name: 'Táticas de Matilha', desc: 'Recebe +2 no dano e na margem de ameaça contra oponentes flanqueados.' }
        ]
    },
    urso: {
        attr: 'constituicao',
        attrDesc: 'Constituição +1, +1 em dois atributos.',
        img: 'https://i.pinimg.com/originals/af/73/01/af7301323e8db44ce871878280f61251.gif',
        powers: [
            {
                name: 'Abraço de Urso',
                desc: 'Você é Grande e pode usar Constituição como atributo-chave de Intimidação (em vez de Carisma).'
            },
            {
                name: 'Faro',
                desc: 'Olfato apurado. Contra inimigos em alcance curto, não fica desprevenido e camuflagem total causa apenas 20% de chance de falha.'
            },
            {
                name: 'Mordida',
                desc: 'Arma natural (1d8). Uma vez por rodada, quando usa a ação agredir, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.'
            }
        ]
    },
    morcego: {
        attr: 'destreza',
        attrDesc: 'Destreza +1, +1 em dois atributos.',
        img: 'https://i.makeagif.com/media/8-23-2024/Ioripn.gif',
        powers: [
            { name: 'Asas', desc: 'Paira a 1,5m (9m). Se não usar armadura pesada, gaste 1 PM/rodada para voar (12m). Ocupa espaço de uma categoria maior.' },
            { name: 'Criatura da Noite', desc: 'Recebe visão no escuro e +2 em Furtividade e Percepção.' },
            { name: 'Ecolocalização', desc: 'Gaste 1 PM para receber percepção às cegas em alcance médio por 1 rodada.' }
        ]
    }
};

//Duende
const DUENDE_PRESENTES = {

    presAfinidade: { name: 'Afinidade Elemental', desc: 'Ligação com Água, Fogo ou Vegetação. Ganha magias temáticas e usa Carisma como atributo-chave.' },

    presEncantar: { name: 'Encantar Objetos', desc: 'Movimento e 3 PM: toca item e coloca encanto sem pré-requisito até o fim da cena.' },

    presEnfeiticar: { name: 'Enfeitiçar', desc: 'Pode lançar Enfeitiçar e usar aprimoramentos conforme seu nível (Carisma).' },

    presInvisibilidade: { name: 'Invisibilidade', desc: 'Pode lançar Invisibilidade e usar aprimoramentos conforme seu nível (Carisma).' },

    presLingua: { name: 'Língua da Natureza', desc: '+2 em Adestramento e Sobrevivência. Pode falar com animais e plantas.' },

    presMaldicao: { name: 'Maldição', desc: 'Padrão e 3 PM: alvo em alcance curto sofre efeito permanente (Fort ou Von evita).' },

    presMetamorfose: { name: 'Metamorfose Animal', desc: 'Escolha uma forma selvagem básica do druida (Tormenta20, p. 63). Por uma ação completa e 3 PM, você assume essa forma e ganha seus modificadores, mas mantém a capacidade de falar e lançar magias.' },

    presLaDoQueAqui: { name: 'Mais Lá do Que Aqui', desc: 'Padrão e 2 PM: corpo desaparece parcialmente. Ganha camuflagem leve e +5 em Furtividade.' },

    presSonhos: { name: 'Sonhos Proféticos', desc: 'Uma vez por cena, 3 PM: rola 1d20 e pode substituir o resultado de qualquer criatura em alcance curto pelo seu.' },

    presVelocidade: { name: 'Velocidade do Pensamento', desc: '1º turno, 2 PM: ação padrão adicional, mas pula o turno na 2ª rodada.' },

    presVisao: { name: 'Visão Feérica', desc: 'Visão na penumbra e efeito permanente de Visão Mística (vê invisíveis).' },

    presVoo: { name: 'Voo', desc: 'Paira a 1,5m (Desloc +3m). Gasta 1 PM/rodada para voar (Desloc +6m). Imune a queda.' },

};

// ── RACE_DATA ─────────────────────────────────────────────────
const RACE_DATA = {

    // ── BASE ──────────────────────────────────────────────────

    humano: {
        name: 'Humano/Humana', type: 'base', tamanho: 'Médio', raca: '-',
        attributes: {}, isChoice: true, choiceCount: 3, maxChoicePerAttribute: 1,
        bonusMessage: '+1 em Três Atributos Diferentes',
        racialPowers: [{ name: 'Versátil', desc: 'Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.' }],
        imageUrl: 'https://64.media.tumblr.com/0a01333736d6f587523db771e1ae9a9a/79bc12ca0c1d927b-f2/s540x810/7d7d4d2827c06a1728cedc4a16fe9ba4d7f84888.gif'
    },

    elfo: {
        name: 'Elfo/Elfa',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { inteligencia: 2, destreza: 1, constituicao: -1 },
        isChoice: false,
        bonusMessage: 'Inteligência +2, Destreza +1, Constituição −1',
        racialPowers: [
            {
                name: 'Graça de Glórienn',
                desc: 'Seu deslocamento é 12m (em vez de 9m).'
            },
            {
                name: 'Sangue Mágico',
                desc: 'Você recebe +1 ponto de mana por nível.'
            },
            {
                name: 'Sentidos Élficos',
                desc: 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.'
            }
        ],
        imageUrl: 'https://gifdb.com/images/high/lord-of-the-rings-legolas-fight-83hz9so0rfuayi6h.gif'
    },

    dwarf: {
        name: 'Anão/Anã',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, sabedoria: 1, destreza: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Sabedoria +1, Destreza −1',
        racialPowers: [
            {
                name: 'Conhecimento das Rochas',
                desc: 'Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.'
            },
            {
                name: 'Devagar e Sempre',
                desc: 'Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento nunca é reduzido por uso de armadura ou excesso de carga.'
            },
            {
                name: 'Duro como Pedra',
                desc: 'Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.'
            },
            {
                name: 'Tradição de Heredrimm',
                desc: 'Você é perito nas armas tradicionais anãs. Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/f08b1803103b529b258e210d153fce57/tumblr_myfubf9Z6Z1ru8yv8o6_250.gif'
    },

    dahllan: {
        name: 'Dahllan',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { sabedoria: 2, destreza: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Destreza +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Amiga das Plantas',
                desc: 'Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.'
            },
            {
                name: 'Armadura de Allihanna',
                desc: 'Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.'
            },
            {
                name: 'Empatia Selvagem',
                desc: 'Você pode se comunicar com animais através de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e persuasão com animais. Caso receba esta habilidade novamente, recebe +2 em testes de Adestramento.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/250a3660431e450a2d1bf1006c6a9f22/67343f6f7b018235-b6/s500x750/738b8d3406931195e9fe8178a7079e2303c3efca.gif'
    },

    goblin: {
        name: 'Goblin',
        type: 'base',
        tamanho: 'Pequeno', raca: 'Humanoide',
        attributes: { destreza: 2, inteligencia: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Inteligência +1, Carisma −1',
        racialPowers: [
            {
                name: 'Engenhoso',
                desc: 'Você não sofre penalidades em testes de perícia por não usar ferramentas. Se usar as ferramentas necessárias, recebe +2 no teste de perícia.'
            },
            {
                name: 'Espelunqueiro',
                desc: 'Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.'
            },
            {
                name: 'Peste Esguia',
                desc: 'Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m.'
            },
            {
                name: 'Rato das Ruas',
                desc: 'Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.'
            }
        ],
        imageUrl: 'https://i.redd.it/37rebhpgjag91.gif'
    },

    lefou: {name: 'Lefou',type: 'base',tamanho: 'Médio', raca: 'Monstro',
        attributes: { carisma: -1 },
        isChoice: true,
        choiceCount: 3,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['carisma'],
        bonusMessage: '+1 em três atributos (exceto Carisma), Carisma −1',
        racialPowers: [
            {
                name: 'Cria da Tormenta',
                desc: 'Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.'
            },
            {
                name: 'Deformidade',
                desc: 'Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta. Você pode trocar um desses bônus por um poder da Tormenta a sua escolha.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/97/65/e7/9765e7da233fa1a343c819c988c99bec.gif'
    },

    minotaur: {
        name: 'Minotauro',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 2, constituicao: 1, sabedoria: -1 },
        isChoice: false,
        bonusMessage: 'Força +2, Constituição +1, Sabedoria −1',
        racialPowers: [
            {
                name: 'Chifres',
                desc: 'Você possui uma arma natural de chifres (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.'
            },
            {
                name: 'Couro Rígido',
                desc: 'Você recebe +1 na Defesa.'
            },
            {
                name: 'Faro',
                desc: 'Contra inimigos que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha em alcance curto.'
            },
            {
                name: 'Medo de Altura',
                desc: 'Se estiver adjacente a uma queda de 3m ou mais de altura (como um buraco ou penhasco) você fica abalado.'
            }
        ],
        imageUrl: 'https://24.media.tumblr.com/tumblr_mdb7ptBRgr1rg7hodo1_500.gif'
    },

    qareen: {
        name: 'Qareen',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { carisma: 2, inteligencia: 1, sabedoria: -1 },
        isChoice: false,
        bonusMessage: 'Carisma +2, Inteligência +1, Sabedoria −1',
        racialPowers: [
            {
                name: 'Desejos',
                desc: 'Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.'
            },
            {
                name: 'Resistência Elemental',
                desc: 'Recebe redução 10 a um tipo de dano conforme sua ascendência (Frio, Eletricidade, Fogo, Ácido, Luz ou Trevas).'
            },
            {
                name: 'Tatuagem Mística',
                desc: 'Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.'
            }
        ],
        imageUrl: 'https://giffiles.alphacoders.com/108/108732.gif'
    },

    // ── GOLEM (complexo) ──────────────────────────────────────

    golem: {name: 'Golem',type: 'base',tamanho: null, raca: 'Construto',
        attributes: {},
        isChoice: false,
        bonusMessage: 'Força +1, Carisma −1 (cumulativo com Chassi e Tamanho)',
        racialPowers: [
            {
                name: 'Propósito de Criação',
                desc: 'Você foi construído “pronto” para um propósito específico e não teve uma infância. Você não tem direito a escolher uma origem, mas recebe um poder geral a sua escolha.'
            },
            {
                name: 'Criatura Artificial',
                desc: 'Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos e de veneno. Não precisa respirar, alimentar-se ou dormir. Ofício (artesão) substitui Cura.'
            },
        ],
        imageUrl: 'https://designyoukai.com/wp-content/uploads/2024/02/golem.gif',

        createCustomUi(container) {
            const chassiOpts = Object.entries(GOLEM_CHASSI).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('');
            const maravilhaOpts = Object.entries(GOLEM_MARAVILHAS).map(([k, v]) => `<option value="${k}">${v.name}</option>`).join('');

            container.innerHTML = `
        <div style="margin-bottom:6px">
            <label for="golem-chassi">Chassi:</label>
            <select id="golem-chassi"><option value="">Selecione</option>${chassiOpts}</select>
        </div>
        <div id="mashin-maravilha-container" class="hidden" style="margin-bottom:6px; background: rgba(255,255,255,0.1); padding: 5px; border-radius: 4px;">
            <label class="check"><input type="checkbox" id="golem-use-maravilha"><span>Trocar perícia por Maravilha?</span></label>
            <div id="maravilha-select-wrapper" class="hidden" style="margin-top:5px">
                <select id="golem-maravilha"><option value="">Selecione a Maravilha</option>${maravilhaOpts}</select>
            </div>
        </div>
        <div style="margin-bottom:6px">
            <label for="golem-fonte">Fonte de Energia:</label>
            <select id="golem-fonte">
                <option value="">Selecione</option>
                <option value="Alquimica">Alquímica</option>
                <option value="Elemental">Elemental</option>
                <option value="Sagrada">Sagrada</option>
                <option value="Vapor">Vapor</option>
            </select>
        </div>
        <div id="golem-elemental-options" class="hidden" style="margin-bottom:6px">
            <label for="golem-elemental-type">Tipo Elemental:</label>
            <select id="golem-elemental-type">
                <option value="">Selecione</option>
                <option value="Fogo">Fogo</option>
                <option value="Eletricidade">Ar (Eletricidade)</option>
                <option value="Frio">Água (Frio)</option>
                <option value="Ácido">Terra (Ácido)</option>
            </select>
        </div>
        <div>
            <label for="golem-tamanho">Tamanho:</label>
            <select id="golem-tamanho">
                <option value="">Selecione</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Medio">Médio</option>
                <option value="Grande">Grande</option>
            </select>
        </div>`;

            const chassiSelect = container.querySelector('#golem-chassi');
            const fonteSelect = container.querySelector('#golem-fonte');
            const elementalSelect = container.querySelector('#golem-elemental-type');
            const checkMaravilha = container.querySelector('#golem-use-maravilha');
            const maravilhaWrapper = container.querySelector('#maravilha-select-wrapper');

            const validateOptions = () => {
                const chassi = chassiSelect.value;

                // Interface Mashin
                container.querySelector('#mashin-maravilha-container').classList.toggle('hidden', chassi !== 'mashin');
                if (chassi !== 'mashin') checkMaravilha.checked = false;
                maravilhaWrapper.classList.toggle('hidden', !checkMaravilha.checked);

                // Reset de disables
                Array.from(fonteSelect.options).forEach(opt => opt.disabled = false);
                Array.from(elementalSelect.options).forEach(opt => opt.disabled = false);

                // Travas de Carne (Sem Vapor, Sem Fogo/Frio Elemental)
                if (chassi === 'carne') {
                    fonteSelect.querySelector('option[value="Vapor"]').disabled = true;
                    elementalSelect.querySelector('option[value="Fogo"]').disabled = true;
                    elementalSelect.querySelector('option[value="Frio"]').disabled = true;
                    if (fonteSelect.value === 'Vapor') fonteSelect.value = '';
                }
                // Travas de Gelo Eterno (Sem Vapor, Sem Fogo Elemental)
                if (chassi === 'gelo') {
                    fonteSelect.querySelector('option[value="Vapor"]').disabled = true;
                    elementalSelect.querySelector('option[value="Fogo"]').disabled = true;
                    if (fonteSelect.value === 'Vapor') fonteSelect.value = '';
                }

                updateGolemAttributes();
            };

            chassiSelect.addEventListener('change', validateOptions);
            checkMaravilha.addEventListener('change', validateOptions);
            fonteSelect.addEventListener('change', e => {
                document.getElementById('golem-elemental-options').classList.toggle('hidden', e.target.value !== 'Elemental');
                validateOptions();
            });

            container.querySelectorAll('#golem-elemental-type, #golem-tamanho, #golem-maravilha')
                .forEach(s => s.addEventListener('change', updateGolemAttributes));
        },

        calculateAttributes() {
            const chassiKey = document.getElementById('golem-chassi')?.value || '';
            const fonteKey = document.getElementById('golem-fonte')?.value || '';
            const elemental = document.getElementById('golem-elemental-type')?.value || '';
            const tamanhoEl = document.getElementById('golem-tamanho');
            const chassiData = GOLEM_CHASSI[chassiKey];
            const useMaravilha = document.getElementById('golem-use-maravilha')?.checked;
            const maravilhaKey = document.getElementById('golem-maravilha')?.value || '';

            // Lógica de Imagem
            const table = document.getElementById('attribute-table');
            if (chassiData?.img) {
                table.style.background = `url('${chassiData.img}') no-repeat center center`;
                table.style.backgroundSize = '75% auto';
            } else {
                table.style.background = '';
            }

            // Mashin trava tamanho
            if (chassiKey === 'mashin') {
                tamanhoEl.value = 'Medio';
                tamanhoEl.disabled = true;
            } else {
                tamanhoEl.disabled = false;
            }
            const tamanhoVal = tamanhoEl?.value || '';

            // Atributos base
            const attrs = { forca: 1, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: -1 };
            if (chassiData) {
                Object.entries(chassiData.attrs).forEach(([k, v]) => { attrs[k] = (attrs[k] || 0) + v; });
            }

            if (tamanhoVal === 'Pequeno') attrs.destreza += 1;
            if (tamanhoVal === 'Grande') attrs.destreza -= 1;

            // Mensagem de bônus
            let msg = `<b>Golem Base:</b> Força +1, Carisma −1`;
            if (chassiData) msg += `<br><b>Chassi (${chassiData.label}):</b> ${chassiData.attrDesc}`;
            if (tamanhoVal && tamanhoVal !== 'Medio') msg += `<br><b>Tamanho ${tamanhoVal}:</b> Destreza ${tamanhoVal === 'Pequeno' ? '+1' : '−1'}`;
            if (fonteKey) msg += `<br><b>Fonte:</b> ${fonteKey}${elemental ? ' (' + elemental + ')' : ''}`;
            document.getElementById('bonusMessage').innerHTML = msg;

            // PODERES DINÂMICOS APENAS
            // Não incluímos [...this.racialPowers] aqui para evitar a duplicidade na tela
            const selectedPowers = [];

            if (chassiData?.powers) selectedPowers.push(...chassiData.powers);
            if (fonteKey && GOLEM_FONTES[fonteKey]) selectedPowers.push(...GOLEM_FONTES[fonteKey].powers);

            if (chassiKey === 'mashin' && useMaravilha && maravilhaKey) {
                const maravilhaData = GOLEM_MARAVILHAS[maravilhaKey];
                if (maravilhaData) {
                    selectedPowers.push({
                        name: `Maravilha: ${maravilhaData.name}`,
                        desc: maravilhaData.desc
                    });
                }
            }

            return {
                baseAttributes: attrs,
                isChoice: chassiData?.choiceCount > 0,
                choiceCount: chassiData?.choiceCount || 0,
                maxChoicePerAttribute: 1,
                selectedPowers // Agora contém apenas o que foi escolhido nos menus
            };
        }
    },

    hynne: {
        name: 'Hynne',
        type: 'base',
        tamanho: 'Pequeno', raca: 'Humanoide',
        attributes: { destreza: 2, carisma: 1, forca: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Carisma +1, Força −1',
        racialPowers: [
            {
                name: 'Arremessador',
                desc: 'Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.'
            },
            {
                name: 'Pequeno e Rechonchudo',
                desc: 'Seu tamanho é Pequeno e seu deslocamento é 6m. Você recebe +2 em Enganação e pode usar Destreza como atributo-chave de Atletismo (em vez de Força).'
            },
            {
                name: 'Sorte Salvadora',
                desc: 'Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.'
            }
        ],
        imageUrl: 'https://media.tenor.com/PTIS0o34PD8AAAAM/fuck-you-the-hobbit.gif'
    },

    kliren: {
        name: 'Kliren',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { inteligencia: 2, carisma: 1, forca: -1 },
        isChoice: false,
        bonusMessage: 'Inteligência +2, Carisma +1, Força −1',
        racialPowers: [
            {
                name: 'Híbrido',
                desc: 'Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).'
            },
            {
                name: 'Engenhosidade',
                desc: 'Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque. Caso receba esta habilidade novamente, seu custo é reduzido em –1 PM.'
            },
            {
                name: 'Ossos Frágeis',
                desc: 'Você sofre 1 ponto de dano adicional por dado de dano de impacto.'
            },
            {
                name: 'Vanguardista',
                desc: 'Você recebe proficiência em armas de fogo e +2 em Ofício (um qualquer, a sua escolha).'
            }
        ],
        imageUrl: 'https://static.wikia.nocookie.net/powerlisting/images/e/ec/510.gif'
    },

    medusa: {
        name: 'Medusa',
        type: 'base',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { destreza: 2, carisma: 1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Carisma +1',
        racialPowers: [
            {
                name: 'Cria de Megalokk',
                desc: 'Você é uma criatura do tipo monstro e recebe visão no escuro.'
            },
            {
                name: 'Natureza Venenosa',
                desc: 'Você recebe resistência a veneno +5 e pode gastar uma ação de movimento e 1 PM para envenenar uma arma. A arma causa perda de 1d12 PV no próximo acerto.'
            },
            {
                name: 'Olhar Atordoante',
                desc: 'Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se falhar, fica atordoada por uma rodada (uma vez por cena).'
            }
        ],
        imageUrl: 'https://i0.wp.com/doublesama.com/wp-content/uploads/2018/04/Nadeko-Medusa.gif'
    },

    osteon: {
        name: 'Osteon',
        type: 'base',
        tamanho: 'Médio', raca: 'Mort-Vivo',
        attributes: { constituicao: -1 },
        isChoice: true,
        choiceCount: 3,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['constituicao'],
        bonusMessage: '+1 em três atributos (exceto Constituição), Constituição −1',
        racialPowers: [
            {
                name: 'Armadura Óssea',
                desc: 'Você recebe resistência a corte, frio e perfuração 5.'
            },
            {
                name: 'Natureza Esquelética',
                desc: 'Tipo morto-vivo. Visão no escuro e imunidade a cansaço, efeitos metabólicos, trevas e veneno. Cura mágica causa dano, mas trevas recuperam seus PV.'
            },
            {
                name: 'Preço da Não Vida',
                desc: 'Precisa passar oito horas sob a luz de estrelas ou no subterrâneo para recuperar PV e PM (não afetado por condições de descanso). Caso contrário, sofre efeitos de fome.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/b4/31/39/b431396f88202e330b79ce23fe951bcd.gif',

        createCustomUi(container) {
            const humanoidRaces = Object.entries(RACE_DATA)
                .filter(([key, r]) => r.raca === 'Humanoide' && key !== 'osteon')
                .map(([key, r]) => `<option value="${key}">${r.name}</option>`)
                .join('');

            container.innerHTML = `
            <details class="fold" style="margin-top:12px">
                <summary class="fold-summary">Memória Póstuma <span class="fold-hint">ver descrição</span></summary>
                <div class="fold-body">
                    <p style="margin:0 0 8px">Você se torna treinado em uma perícia ou recebe um poder geral. Alternativamente, pode ser um osteon de outra raça humanoide, ganhando uma habilidade dela e seu tamanho.</p>
                    <label class="check" style="margin-bottom:8px">
                        <input type="checkbox" id="osteon-memoria">
                        <span>Herdar raça humanoide</span>
                    </label>
                    <div id="osteon-race-select" class="hidden" style="margin-bottom:8px">
                        <label for="osteon-race">Raça:</label>
                        <select id="osteon-race">
                            <option value="">Selecione</option>
                            ${humanoidRaces}
                        </select>
                    </div>
                    <div id="osteon-power-select" class="hidden" style="margin-bottom:8px">
                        <label for="osteon-power">Poder Herdado:</label>
                        <select id="osteon-power">
                            <option value="">Selecione</option>
                        </select>
                    </div>
                    <div id="osteon-power-checklist" class="hidden" style="margin-bottom:8px">
                        <label><b>Poderes Herdados</b> <span class="fold-hint">Escolha até 2</span></label>
                        <div id="osteon-mutation-container" class="checklist"></div>
                    </div>
                    <div id="osteon-memoria-info" class="hidden" style="margin-top:8px;padding:10px;background:rgba(0,0,0,0.2);border-radius:6px;font-size:13px;color:var(--text-secondary)"></div>
                </div>
            </details>`;

            const populatePowers = () => {
                const raceKey = document.getElementById('osteon-race')?.value;
                const powerSelect = document.getElementById('osteon-power');
                const selectDiv = document.getElementById('osteon-power-select');
                const checklistDiv = document.getElementById('osteon-power-checklist');
                const checklistContainer = document.getElementById('osteon-mutation-container');
                const race = raceKey ? RACE_DATA[raceKey] : null;
                const config = getInheritablePowerConfig(race);

                powerSelect.innerHTML = '<option value="">Selecione</option>';
                checklistContainer.innerHTML = '';
                selectDiv.classList.add('hidden');
                checklistDiv.classList.add('hidden');

                if (!config) return;

                if (config.type === 'checklist') {
                    checklistContainer.innerHTML = config.options.map(o => `
                        <div class="bencao-item">
                            <label class="check">
                                <input type="checkbox" class="osteon-mut" id="osteon-mut-${o.id}" value="${o.id}">
                                <span>${o.name}</span>
                                <span class="bencao-desc-toggle" data-toggle="${o.id}" title="Ver descrição">?</span>
                            </label>
                            <div class="bencao-desc-body" id="desc-osteon-${o.id}">${o.desc || ''}</div>
                        </div>`).join('');
                    checklistContainer.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const desc = document.getElementById('desc-osteon-' + btn.dataset.toggle);
                            if (desc) desc.classList.toggle('active');
                        });
                    });
                    checklistContainer.querySelectorAll('.osteon-mut').forEach(cb => {
                        cb.addEventListener('change', () => {
                            const count = checklistContainer.querySelectorAll('.osteon-mut:checked').length;
                            if (count > config.maxSelect) {
                                alert(`Você só pode escolher até ${config.maxSelect} poderes!`);
                                cb.checked = false;
                            }
                            updateOsteonAttributes();
                        });
                    });
                    checklistDiv.classList.remove('hidden');
                } else {
                    config.options.forEach((p, i) => {
                        const opt = document.createElement('option');
                        opt.value = i;
                        opt.textContent = p.name;
                        powerSelect.appendChild(opt);
                    });
                    selectDiv.classList.remove('hidden');
                }
            };

            container.querySelector('#osteon-memoria').addEventListener('change', () => {
                const checked = container.querySelector('#osteon-memoria').checked;
                document.getElementById('osteon-race-select').classList.toggle('hidden', !checked);
                document.getElementById('osteon-power-select').classList.add('hidden');
                document.getElementById('osteon-power-checklist').classList.add('hidden');
                updateOsteonAttributes();
            });
            container.querySelector('#osteon-race').addEventListener('change', () => {
                populatePowers();
                updateOsteonAttributes();
            });
            container.querySelector('#osteon-power').addEventListener('change', updateOsteonAttributes);

            updateOsteonAttributes();
        },

        calculateAttributes() {
            const checked = document.getElementById('osteon-memoria')?.checked;
            const raceKey = document.getElementById('osteon-race')?.value;
            const selectedRace = raceKey ? RACE_DATA[raceKey] : null;
            const config = checked && selectedRace ? getInheritablePowerConfig(selectedRace) : null;

            let memoriaPowers;
            let memoriaLabel = null;

            if (config?.type === 'checklist') {
                const selectedIds = Array.from(document.querySelectorAll('.osteon-mut:checked')).map(cb => cb.value);
                const tamanho = getInheritedTamanho(raceKey, null);
                memoriaPowers = selectedIds.length
                    ? selectedIds.map(id => {
                        const opt = config.options.find(o => o.id === id);
                        return {
                            name: `Memória Póstuma (${selectedRace.name})`,
                            desc: `Você herda a habilidade "${opt.name}" da raça ${selectedRace.name} e seu tamanho (${tamanho}). ${opt.desc}`
                        };
                      })
                    : [{
                        name: `Memória Póstuma (${selectedRace.name})`,
                        desc: `Você herda habilidades da raça ${selectedRace.name} e seu tamanho (${tamanho}).`
                      }];
                memoriaLabel = selectedRace.name;
            } else if (config) {
                const powerIndex = document.getElementById('osteon-power')?.value;
                const power = powerIndex !== '' ? config.options[parseInt(powerIndex)] : null;
                const tamanho = getInheritedTamanho(raceKey, power);
                memoriaPowers = [{
                    name: `Memória Póstuma (${selectedRace.name})`,
                    desc: power
                        ? `Você herda a habilidade "${power.name}" da raça ${selectedRace.name} e seu tamanho (${tamanho}). ${power.desc}`
                        : `Você herda uma habilidade da raça ${selectedRace.name} e seu tamanho (${tamanho}).`
                }];
                memoriaLabel = selectedRace.name;
            } else {
                memoriaPowers = [{
                    name: 'Memória Póstuma',
                    desc: 'Você se torna treinado em uma perícia ou recebe um poder geral. Alternativamente, você pode ser um osteon de outra raça, ganhando uma habilidade dela e seu tamanho.'
                }];
            }

            document.getElementById('bonusMessage').innerHTML =
                '+1 em três atributos (exceto Constituição), Constituição −1' +
                (memoriaLabel ? `<br><b>Memória Póstuma:</b> ${memoriaLabel}` : '');

            // Exibe descrição do poder herdado dentro do fold
            const memoriaInfo = document.getElementById('osteon-memoria-info');
            if (memoriaInfo) {
                const memoriaPower = memoriaPowers.find(p => p.name.startsWith('Memória'));
                if (memoriaPower) {
                    memoriaInfo.innerHTML = `<b>${memoriaPower.name}</b><br>${memoriaPower.desc}`;
                    memoriaInfo.classList.remove('hidden');
                } else {
                    memoriaInfo.innerHTML = '';
                    memoriaInfo.classList.add('hidden');
                }
            }

            return {
                baseAttributes: { constituicao: -1 },
                isChoice: true,
                choiceCount: 3,
                maxChoicePerAttribute: 1,
                lockedChoiceAttributes: ['constituicao'],
                selectedPowers: memoriaPowers
            };
        }
    },

    siren: {
        name: 'Sereia/Tritão',
        type: 'base',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: {},
        isChoice: true,
        choiceCount: 3,
        maxChoicePerAttribute: 1,
        bonusMessage: '+1 em três atributos diferentes',
        racialPowers: [
            {
                name: 'Canção dos Mares',
                desc: 'Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma).'
            },
            {
                name: 'Mestre do Tridente',
                desc: 'Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.'
            },
            {
                name: 'Transformação Anfíbia',
                desc: 'Pode respirar debaixo d’água e possui deslocamento de natação 12m. Fora d’água, possui pernas (9m). Precisa de contato diário com água para recuperar PM.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/ee/3e/b1/ee3eb1c7e56d7c6250d11ae048c45ad2.gif'
    },

    silfide: {
        name: 'Sílfide',
        type: 'base',
        tamanho: 'Minúsculo', raca: 'Espírito',
        attributes: { carisma: 2, destreza: 1, forca: -2 },
        isChoice: false,
        bonusMessage: 'Carisma +2, Destreza +1, Força −2',
        racialPowers: [
            {
                name: 'Asas de Borboleta',
                desc: 'Tamanho Minúsculo. Flutua a 1,5m (9m), ignora terreno difícil e imune a queda. Pode gastar 1 PM por rodada para voar com deslocamento de 12m.'
            },
            {
                name: 'Espírito da Natureza',
                desc: 'Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.'
            },
            {
                name: 'Magia das Fadas',
                desc: 'Pode lançar duas magias: Criar Ilusão, Enfeitiçar, Luz ou Sono (atributo-chave Carisma). Se aprender novamente, custo diminui em –1 PM.'
            }
        ],
        imageUrl: 'https://media.tenor.com/0l34BiWLbNIAAAAM/sword-art-online-sao.gif'
    },

    trog: {
        name: 'Trog',
        type: 'base',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { constituicao: 2, forca: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Força +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Reptiliano',
                desc: 'Tipo monstro. Recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.'
            },
            {
                name: 'Mau Cheiro',
                desc: 'Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Criaturas em alcance curto (exceto trogs) devem passar em Fortitude (CD Con) ou ficam enjoadas por 1d6 rodadas.'
            },
            {
                name: 'Mordida',
                desc: 'Você possui uma arma natural de mordida (dano 1d6). Uma vez por rodada, ao usar a ação agredir, pode gastar 1 PM para fazer um ataque extra com a mordida.'
            },
            {
                name: 'Sangue Frio',
                desc: 'Você sofre 1 ponto de dano adicional por cada dado de dano de frio.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/c3/30/72/c330723a6d99c001622f20453df59ea2.gif'
    },

    troguinho: {
        name: 'Trog Anão',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { constituicao: 2, forca: 1, inteligencia: -1, destreza: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Força +1, Inteligência −1, Destreza -1',
        racialPowers: [
            {
                name: 'Quase Anão',
                desc: 'Você é uma criatura do tipo monstro e recebe visão no escuro e +1 PV por nível. Além disso, seu deslocamento é 6m (em vez de 9m), mas não é reduzido por uso de armadura ou excesso de carga.'
            },
            {
                name: 'Mau Cheiro',
                desc: 'Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Criaturas em alcance curto (exceto trogs) devem passar em Fortitude (CD Con) ou ficam enjoadas por 1d6 rodadas.'
            },
            {
                name: 'Mordida',
                desc: 'Você possui uma arma natural de mordida (dano 1d6). Uma vez por rodada, ao usar a ação agredir, pode gastar 1 PM para fazer um ataque extra com a mordida.'
            },
            {
                name: 'Sangue Frio',
                desc: 'Você sofre 1 ponto de dano adicional por cada dado de dano de frio.'
            }
        ],
        imageUrl: 'https://static.wikia.nocookie.net/topstrongest/images/a/a3/Gaa1.gif'
    },

    aggelus: {
        name: 'Suraggel - Aggelus',
        type: 'base',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { sabedoria: 2, carisma: 1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Carisma +1',
        racialPowers: [
            {
                name: 'Herança Divina',
                desc: 'Você é uma criatura do tipo espírito e recebe visão no escuro.'
            },
            {
                name: 'Luz Sagrada',
                desc: 'Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma).'
            }
        ],
        imageUrl: 'https://media.tenor.com/QX9KPv8OO70AAAAM/chainsaw-man-csm.gif',
        createCustomUi: (container) => createSuragelUi(container),
    },

    sulfure: {
        name: 'Suraggel - Sulfure',
        type: 'base',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { destreza: 2, inteligencia: 1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Inteligência +1',
        racialPowers: [
            {
                name: 'Herança Divina',
                desc: 'Você é uma criatura do tipo espírito e recebe visão no escuro.'
            },
            {
                name: 'Sombras Profanas',
                desc: 'Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar a magia Escuridão (como uma magia divina, atributo-chave Inteligência).'
            }
        ],
        imageUrl: 'https://i0.wp.com/drunkenanimeblog.com/wp-content/uploads/2019/08/red-oni.gif?fit=500%2C277&ssl=1',
        createCustomUi: (container) => createSuragelUi(container),
    },

    // ── GHANOR ────────────────────────────────────────────────

    dwarf_ghanor: {
        name: 'Anão/Anã (Ghanor)',
        type: 'ghanor',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, inteligencia: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Inteligência +1, Carisma −1',
        racialPowers: [
            {
                name: 'Busca pela Perfeição',
                desc: 'Recebe +2 em Ofício. Se treinado, fabrica itens superiores com uma melhoria adicional (cumulativo).'
            },
            {
                name: 'Devagar e Sempre',
                desc: 'Deslocamento 6m, mas nunca é reduzido por armadura ou excesso de carga.'
            },
            {
                name: 'Moldado nas Rochas',
                desc: 'Você recebe visão no escuro e +1 ponto de vida por nível.'
            }
        ],
        imageUrl: 'https://i.redd.it/en44m0mkuxtb1.gif'
    },

    elf_ghanor: {
        name: 'Elfo/Elfa (Ghanor)',
        type: 'ghanor',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { sabedoria: 2, destreza: 1, constituicao: -1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Destreza +1, Constituição −1',
        racialPowers: [
            {
                name: 'Armas da Floresta',
                desc: 'Arcos contam como armas simples para você e você recebe +2 em rolagens de dano com eles.'
            },
            {
                name: 'Magia Antiga',
                desc: 'Recebe +1 PM por nível. Usa Sabedoria como atributo-chave de Misticismo e de magias arcanas.'
            },
            {
                name: 'Passo Leve',
                desc: 'Recebe +2 em Furtividade e seu deslocamento é 12m.'
            },
            {
                name: 'Sentidos Élficos',
                desc: 'Você recebe visão na penumbra e +2 em Percepção.'
            },
            {
                name: 'Sentimentos Conflitantes',
                desc: 'Sofre –5 em Diplomacia e Vontade. Consumir turlin anula esta penalidade por uma cena.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/af/00/76/af007620b24912908e302cc539153849.gif'
    },

    giant_ghanor: {
        name: 'Gigante (Ghanor)',
        type: 'ghanor',
        tamanho: 'Grande', raca: 'Humanoide',
        attributes: { forca: 3, constituicao: 2, inteligencia: -2, sabedoria: -1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Força +3, Constituição +2, Inteligência −2, Sabedoria −1, Carisma −1',
        racialPowers: [
            {
                name: 'Grandão',
                desc: 'Tamanho Grande. Soma Força nos PV totais. Pode usar armas normais ou aumentadas, mas armaduras devem ser sob medida.'
            },
            {
                name: 'Primitivo',
                desc: 'Sofre –5 em Diplomacia, Intuição e Ofício e em testes de ataque com armas marciais ou exóticas.'
            }
        ],
        imageUrl: 'https://i.gifer.com/embedded/download/DYL0.gif'
    },

    hobgoblin_ghanor: {
        name: 'Hobgoblin (Ghanor)',
        type: 'ghanor',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 1, destreza: 1, constituicao: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Força +1, Destreza +1, Constituição +1, Carisma −1',
        racialPowers: [
            {
                name: 'Couro Duro',
                desc: 'Recebe redução de dano igual à sua Constituição (limitada pelo seu nível).'
            },
            {
                name: 'Dependência de Liderança',
                desc: 'Nunca age antes do líder escolhido e sofre –1 em perícias se estiver além de alcance médio dele.'
            },
            {
                name: 'Militarista',
                desc: 'Recebe um poder de combate à sua escolha.'
            },
            {
                name: 'Natureza Bestial',
                desc: 'Visão no escuro e usa Constituição para Intimidação (em vez de Carisma).'
            }
        ],
        imageUrl: 'https://i.makeagif.com/media/2-06-2019/7hLGy0.gif'
    },

    halfelf_ghanor: {
        name: 'Meio-Elfo (Ghanor)',
        type: 'ghanor',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { carisma: 2 },
        isChoice: true,
        choiceCount: 1,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['carisma'],
        bonusMessage: 'Carisma +2, +1 em outro atributo',
        racialPowers: [
            {
                name: 'Longa Infância',
                desc: 'Você escolhe uma origem adicional, recebendo o benefício (mas não os itens).'
            },
            {
                name: 'Sentidos Ancestrais',
                desc: 'Você recebe visão na penumbra e +2 em Intuição e Percepção.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/84/88/ae/8488aec8f373c20370f1c47fd5917ae1.gif'
    },

    cambionte: {
        name: 'Cambionte (Ghanor)',
        type: 'ghanor',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { inteligencia: 2, carisma: 2 },
        isChoice: false,
        bonusMessage: 'Inteligência +2, Carisma +2',
        racialPowers: [
            {
                name: 'Língua Pérfida',
                desc: 'Sua ascendência infernal confere a você habilidades mágicas de manipulação. Você pode lançar Enfeitiçar (atributo-chave Carisma).'
            },
            {
                name: 'Estigma',
                desc: 'Crescer com traços demoníacos fez de você alvo de ódio e temor, mas também fez com que aprendesse a se virar. NPCs têm uma atitude inicial em relação a você uma categoria pior. Por outro lado, você recebe +2 em Intimidação e Intuição.'
            },
            {
                name: 'Sangue Infernal',
                desc: 'Você é uma criatura do tipo espírito e recebe visão no escuro.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/73/c1/c1/73c1c1a9718c951628c935633761b7ae.gif'
    },

    nefilim: {
        name: 'Nefilim (Ghanor)',
        type: 'ghanor',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { sabedoria: 2, carisma: 2 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Carisma +2',
        racialPowers: [
            {
                name: 'Obstinação',
                desc: 'Sua natureza carrega a perseverança — e também a inflexibilidade — dos anjos. Você recebe +2 em testes de resistência.'
            },
            {
                name: 'Presença Sagrada',
                desc: 'O sangue celestial correndo em suas veias desperta para a batalha com facilidade, pois esta é a natureza dos anjos. Você pode lançar Arma Espiritual (atributo-chave Sabedoria).'
            },
            {
                name: 'Sangue Celestial',
                desc: 'Você é uma criatura do tipo espírito e recebe visão no escuro.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/2a9d414fd833c4fbcda0a8844e83d4ad/7a78531243008b56-43/s540x810/24b4fd010519bf17d2cc15da16b151b90e7cda10.gif'
    },

    // ── ABERRANTE (complexo) ──────────────────────────────────
    aberrant: {
        name: 'Aberrante (Ghanor)', type: 'ghanor', tamanho: 'Médio', raca: 'Humanoide',
        attributes: {},
        bonusMessage: 'Carisma −2',
        racialPowers: [
            {
                name: 'Mutação',
                desc: 'Escolha quatro mutações da lista a seguir. Quando recebe um novo poder de classe, pode trocar este poder por uma mutação. Cada mutação só pode ser escolhida uma vez.'
            }
        ],
        imageUrl: 'https://media.tenor.com/3IrxSu1aWscAAAAM/resident-evil-resident-evil-2.gif',

        createCustomUi(container) {
            const mutations = Object.entries(ABERRANT_MUTATIONS);
            container.innerHTML = `
            <details class="fold" style="margin-top:12px">
                <summary class="fold-summary">Mutações <span class="fold-hint">Escolha até 4</span></summary>
                <div id="mutation-container" class="checklist fold-body">
                <p style="margin:0 0 8px">Escolha 4 mutações. Você pode escolher outras mutações no lugar de poderes de classe.</p>
                ${mutations.map(([id, m]) => `
                    <div class="bencao-item">
                        <label class="check">
                            <input type="checkbox" id="${id}" name="mutation" value="${id}">
                            <span>${m.name}</span>
                            <span class="bencao-desc-toggle" data-toggle="${id}" title="Ver descrição">?</span>
                        </label>
                        <div class="bencao-desc-body" id="desc-mut-${id}">${m.desc || ''}</div>
                    </div>`).join('')}
                </div>
            </details>`;

            container.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const desc = document.getElementById('desc-mut-' + btn.dataset.toggle);
                    if (desc) desc.classList.toggle('active');
                });
            });

            container.querySelectorAll('input[name="mutation"]').forEach(cb => {
                cb.addEventListener('change', () => {
                    if (container.querySelectorAll('input[name="mutation"]:checked').length > 4) {
                        alert('Você só pode escolher até 4 mutações!');
                        cb.checked = false;
                    }
                    updateAberrantAttributes();
                });
            });
        },

        calculateAttributes() {
            const attrs = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: -2 };
            const selectedPowers = [];

            document.querySelectorAll('input[name="mutation"]:checked').forEach(cb => {
                const m = ABERRANT_MUTATIONS[cb.value];
                if (!m) return;
                if (m.attr) attrs[m.attr] = (attrs[m.attr] || 0) + 1;
                selectedPowers.push({ name: m.name, desc: m.desc || '' });
            });

            // Atualiza bonusMessage com mutações ativas
            const mutNames = selectedPowers.map(p => p.name).join(', ') || 'Nenhuma';
            document.getElementById('bonusMessage').innerHTML = `Carisma −2<br>Mutações: ${mutNames}`;

            return { baseAttributes: attrs, isChoice: false, choiceCount: 0, selectedPowers };
        }
    },

    // ── AMEAÇAS ───────────────────────────────────────────────

    halforc_ameacas: {
        name: 'Meio-Orc (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 2 },
        isChoice: true,
        choiceCount: 1,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['carisma'],
        bonusMessage: 'Força +2, +1 em outro atributo (exceto Carisma)',
        racialPowers: [
            {
                name: 'Adaptável',
                desc: 'Você recebe +2 em Intimidação e se torna treinado em uma perícia a sua escolha.'
            },
            {
                name: 'Criatura das Profundezas',
                desc: 'Você recebe visão no escuro e +2 em Percepção e Sobrevivência realizados no subterrâneo.'
            },
            {
                name: 'Sangue Orc',
                desc: 'Recebe +1 em dano com armas corpo a corpo e de arremesso. É considerado um orc para efeitos de raça.'
            }
        ],
        imageUrl: 'https://gifdb.com/images/high/tiny-tina-wonderland-video-game-orc-witness-me-7anj41yealn074hg.gif'
    },

    orc_ameacas: {
        name: 'Orc (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 2, constituicao: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Força +2, Constituição +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Feroz',
                desc: 'Recebe +2 no dano corpo a corpo e arremesso. Se sofrer dano de um inimigo, o bônus aumenta para +4 até o fim do seu próximo turno.'
            },
            {
                name: 'Habitante das Cavernas',
                desc: 'Visão no escuro e +2 em Percepção e Sobrevivência no subterrâneo. Possui sensibilidade a luz.'
            },
            {
                name: 'Vigor Brutal',
                desc: 'Recebe +2 em Fortitude e soma sua Força no seu total de PV.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/f3/f7/ba/f3f7bac36cdf249f15bd81d7efdd2491.gif'
    },

    tabrachi: {
        name: 'Tabrachi (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, forca: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Força +1, Carisma −1',
        racialPowers: [
            {
                name: 'Batráquio',
                desc: 'Você recebe visão na penumbra e deslocamento de natação igual ao seu deslocamento terrestre.'
            },
            {
                name: 'Linguarudo',
                desc: 'Arma natural (3m, 1d4). +2 para desarmar e derrubar. Pode gastar 1 PM para ataque extra com a língua ao usar a ação agredir.'
            },
            {
                name: 'Saltador',
                desc: 'Você recebe +10 em testes de Atletismo para saltar.'
            }
        ],
        imageUrl: 'https://i.makeagif.com/media/2-06-2016/Z9za8C.gif'
    },

    ogre: {
        name: 'Ogro (Ameaças)',
        type: 'ameacas',
        tamanho: 'Grande', raca: 'Humanoide',
        attributes: { forca: 3, constituicao: 2, inteligencia: -1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Força +3, Constituição +2, Inteligência −1, Carisma −1',
        racialPowers: [
            {
                name: 'Quanto Maior o Tamanho…',
                desc: 'Tipo gigante e tamanho Grande. Você recebe visão na penumbra.'
            },
            {
                name: '… Maior a Porrada!',
                desc: 'Ao fazer um ataque corpo a corpo, pode gastar 1 PM para causar +1d8 de dano do mesmo tipo se acertar.'
            },
            {
                name: 'Camada de Ingenuidade',
                desc: 'Você sofre –5 em Intuição e Vontade.'
            }
        ],
        imageUrl: 'https://media0.giphy.com/media/TIGP3k4gNAqvza2KJK/giphy-downsized.gif'
    },

    bugbear: {
        name: 'Bugbear (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 2, destreza: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Força +2, Destreza +1, Carisma −1',
        racialPowers: [
            {
                name: 'Empunhadura Poderosa',
                desc: 'A penalidade para usar armas de uma categoria de tamanho maior diminui para –2. Caso receba esta habilidade novamente, a penalidade cai para 0.'
            },
            {
                name: 'Saborear Pavor',
                desc: 'Usa Força para Intimidação. Se estiver em alcance curto de uma criatura abalada ou apavorada, recebe bônus no ataque igual à penalidade da condição.'
            },
            {
                name: 'Sentidos de Predador',
                desc: 'Você recebe faro e visão no escuro.'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/qEgRLp9ZG_sAAAAd/grrr-beast-man.gif'
    },

    hobgoblin_ameacas: {
        name: 'Hobgoblin (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, destreza: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Destreza +1, Carisma −1',
        racialPowers: [
            {
                name: 'Arte da Guerra',
                desc: 'Treinado em Guerra e proficiência em armas marciais. Se já for proficiente, recebe +2 em rolagens de dano com elas.'
            },
            {
                name: 'Metalurgia Hobgoblin',
                desc: '+2 em Ofício (armeiro). Se treinado, fabrica itens superiores com uma melhoria. Custo para aplicar melhorias reduzido para 1/4 do preço.'
            },
            {
                name: 'Táticas de Guerrilha',
                desc: 'Você recebe visão no escuro e +2 em Furtividade.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/a8fd66069693d12f2f4ef4372c6a3667/8f857d181fda07ba-c0/s500x750/5eade5b52d6d2b6a510609d01c119354862aaf9b.gif'
    },

    centaur: {
        name: 'Centauro (Ameaças)',
        type: 'ameacas',
        tamanho: 'Grande', raca: 'Humanoide',
        attributes: { sabedoria: 2, forca: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Força +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Avantajado',
                desc: 'Seu tamanho é Grande e seu deslocamento é 12m.'
            },
            {
                name: 'Cascos',
                desc: 'Você possui uma arma natural de cascos (dano 1d8). Uma vez por rodada, ao usar a ação agredir, pode gastar 1 PM para fazer um ataque extra com os cascos.'
            },
            {
                name: 'Ginete Natural',
                desc: 'É considerado montado para investidas e armas. Pode escolher Carga de Cavalaria sem pré-requisitos. Não pode usar montaria e sofre –2 em testes se carregar um cavaleiro.'
            },
            {
                name: 'Medo de Altura',
                desc: 'Se estiver adjacente a uma queda de 3m ou mais (como um buraco ou penhasco), você fica abalado.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/3ec153799fa25e21ad10be5be1a2157a/2c6fb1d5eacdd6bb-63/s540x810/42863302a5dcac125d795eb1e8357b0141c43089.gif'
    },

    gnoll: {
        name: 'Gnoll (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, sabedoria: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Sabedoria +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Faro',
                desc: 'Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total causa apenas 20% de chance de falha.'
            },
            {
                name: 'Mordida',
                desc: 'Arma natural de mordida (dano 1d6). Uma vez por rodada, ao usar a ação agredir, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.'
            },
            {
                name: 'Oportunista',
                desc: 'Recebe +2 no dano contra criaturas que sofreram dano de outras fontes desde seu último turno.'
            },
            {
                name: 'Rendição',
                desc: 'Ganha 1d4 PM temporários se um inimigo se render. Se lutar com menos de 1/4 dos PV e não se render, fica alquebrado.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/747cc66960cd29327e014a9d4d9296b5/97a1d09906c94285-49/s540x810/f00e0f34e4ff2c07ba5e0db91dfc7cecee3810f3.gif'
    },

    // ── KALLYANACH (complexo) ─────────────────────────────────
    kallyanach: {
        name: 'Kallyanach (Ameaças)', type: 'ameacas', tamanho: 'Médio', raca: 'Monstro',
        attributes: {}, isChoice: true, choiceCount: 2, maxChoicePerAttribute: 2,
        bonusMessage: '+2 em um atributo ou +1 em dois atributos',
        racialPowers: [],
        imageUrl: 'https://i.pinimg.com/originals/23/cc/03/23cc03827dd5eb610540f4a03ea88190.gif',

        createCustomUi(container) {
            const tipos = ['Ácido', 'Eletricidade', 'Fogo', 'Frio', 'Luz', 'Trevas'];
            container.innerHTML = `
            <details class="fold" style="margin-top:12px">
                <summary class="fold-summary">Herança Dracônica <span class="fold-hint">ver descrição</span></summary>
                <div class="fold-body" style="margin-bottom:8px">${KALLYANACH_HERANCA_DESC}</div>
            </details>
            <div style="margin-bottom:8px">
                <label for="kallyanach-elemental">Tipo da Herança:</label>
                <select id="kallyanach-elemental">
                    <option value="">Selecione</option>
                    ${tipos.map(t => `<option value="${t}">${t}</option>`).join('')}
                </select>
            </div>
            <details class="fold" style="margin-top:12px">
                <summary class="fold-summary">Bênção de Kallyadranoch <span class="fold-hint">Escolha 2</span></summary>
                <div id="bencao-container" class="checklist fold-body">
                <p style="margin:0 0 8px">Escolha duas bênçãos. Você pode escolher outras dessas bênçãos no lugar de poderes de classe.</p>
                ${Object.entries(KALLYANACH_BENCAOS).map(([id, b]) => `
                    <div class="bencao-item">
                        <label class="check">
                            <input type="checkbox" id="${id}" name="bencao">
                            <span>${b.name}</span>
                            <span class="bencao-desc-toggle" data-toggle="${id}" title="Ver descrição">?</span>
                        </label>
                        <div class="bencao-desc-body" id="desc-kally-${id}">${b.desc || ''}</div>
                    </div>`).join('')}
                </div>
            </details>`;

            container.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const desc = document.getElementById('desc-kally-' + btn.dataset.toggle);
                    if (desc) desc.classList.toggle('active');
                });
            });

            container.querySelector('#kallyanach-elemental').addEventListener('change', () => {
                const tipo = container.querySelector('#kallyanach-elemental').value;
                document.getElementById('bonusMessage').innerHTML =
                    `+2 em um atributo ou +1 em dois atributos${tipo ? `<br><b>Herança:</b> ${tipo}` : ''}`;
                updateAll();
            });

            container.querySelectorAll('input[name="bencao"]').forEach(cb => {
                cb.addEventListener('change', () => {
                    if (container.querySelectorAll('input[name="bencao"]:checked').length > 2) {
                        alert('Você só pode escolher até 2 bênçãos!');
                        cb.checked = false;
                    }
                    updateKallyanachAttributes();
                });
            });
        },

        // Kallyanach não tem calculateAttributes (atributos são puramente de escolha do player)
        // Os poderes são coletados no handleRaceChange via renderRacialPowers customizado.
        // Usamos um getter para montar selectedPowers ao exportar:
        getSelectedPowers() {
            const tipo = document.getElementById('kallyanach-elemental')?.value || '';
            const powers = [];
            if (tipo) powers.push({ name: `Herança Dracônica (${tipo})`, desc: KALLYANACH_HERANCA_DESC });
            document.querySelectorAll('input[name="bencao"]:checked').forEach(cb => {
                const b = KALLYANACH_BENCAOS[cb.id];
                if (b) powers.push({ name: b.name, desc: b.desc || '' });
            });
            return powers;
        }
    },

    kaijin: {
        name: 'Kaijin (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { forca: 2, constituicao: 1, carisma: -2 },
        isChoice: false,
        bonusMessage: 'Força +2, Constituição +1, Carisma −2',
        racialPowers: [
            {
                name: 'Couraça Rubra',
                desc: 'Recebe RD 2. Conta como um poder da Tormenta (exceto para perda de Carisma).'
            },
            {
                name: 'Cria da Tormenta',
                desc: 'Tipo monstro. +5 em resistências contra efeitos de lefeu/Tormenta. Efeitos que não afetam lefou não afetam você.'
            },
            {
                name: 'Disforme',
                desc: 'Itens mundanos devem ser adaptados (1 dia, +50% do custo). Conta como um poder da Tormenta (exceto para perda de Carisma).'
            },
            {
                name: 'Terror Vivo',
                desc: 'Usa Força para Intimidação. Recebe um poder da Tormenta à escolha (não conta para perda de Carisma).'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/RjZXfToDdogAAAAd/momotaros-enter.gif'
    },

    kappa: {
        name: 'Kappa (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { destreza: 2, constituicao: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Constituição +1, Carisma −1',
        racialPowers: [
            {
                name: 'Alma da Água',
                desc: 'Tipo espírito. Possui deslocamento de natação igual ao seu terrestre.'
            },
            {
                name: 'Carapaça Kappa',
                desc: 'Não pode ser flanqueado. Recebe cobertura leve submerso ou caído. Soma Con na Defesa (limitado pelo nível) se não usar armadura pesada (ou +2 se já somar Con).'
            },
            {
                name: 'Cura das Águas',
                desc: 'Pode lançar Curar Ferimentos (Sabedoria). Se aprender de novo, custo reduz em -1 PM. Inutilizada se a água da cabeça for derramada.'
            },
            {
                name: "Tigela D'água",
                desc: 'Se falhar por 5 ou mais contra agarrar, derrubar ou empurrar, derrama a água e fica enjoado até reencher (ação padrão em fonte de água).'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/1751e3f4246c2243e486b7a08ecd4d8a/a4a1b04c43a33ce9-b6/s500x750/6de651f7ce898aec1ca3b8581038df518906ebe0.gif'
    },

    nezumi: {
        name: 'Nezumi (Ameaças)',
        type: 'ameacas',
        tamanho: 'Pequeno', raca: 'Humanoide',
        attributes: { constituicao: 2, destreza: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Destreza +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Empunhadura Poderosa',
                desc: 'Penalidade para usar armas de categoria de tamanho maior diminui para –2. Se ganhar de novo, a penalidade cai para 0.'
            },
            {
                name: 'Pequeno, Mas Não Metade',
                desc: 'Tamanho Pequeno, mas deslocamento 9m. Recebe resistência a medo +5 contra criaturas maiores e +2 em Intimidação.'
            },
            {
                name: 'Roedor',
                desc: 'Arma natural de mordida (1d6). Pode gastar 1 PM para ataque extra. Críticos na mordida avariam a armadura ou aumentam o multiplicador em +1.'
            },
            {
                name: 'Sentidos Murídeos',
                desc: 'Você recebe faro e visão na penumbra.'
            }
        ],
        imageUrl: 'https://media.tenor.com/Ar4yaROS_wUAAAAM/breaking-boards-splinter.gif'
    },

    tengu: {
        name: 'Tengu (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { destreza: 2, inteligencia: 1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Inteligência +1',
        racialPowers: [
            {
                name: 'Asas Desorientadoras',
                desc: 'Se não estiver voando, recebe Finta Aprimorada (ou +5 em Enganação para fintar se já tiver o poder).'
            },
            {
                name: 'Caminhante do Céu',
                desc: 'Paira a 1,5m (9m). Pode gastar 1 PM/rodada para voar (12m). Ao abrir as asas, ocupa espaço de uma categoria de tamanho maior.'
            },
            {
                name: 'Espírito Corvino',
                desc: 'Tipo espírito. Você recebe visão no escuro e +2 em Percepção.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/1ae44c223c951f18f9dc892b001c62b2/tumblr_oz3w5jS2w41wdfs98o1_540.gif'
    },

    minauro: {
        name: 'Minauro (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 1 },
        isChoice: true,
        choiceCount: 2,
        maxChoicePerAttribute: 1,
        bonusMessage: 'Força +1, +1 em dois atributos',
        racialPowers: [
            {
                name: 'Faro',
                desc: 'Contra inimigos em alcance curto que não possa ver, não fica desprevenido e camuflagem total causa apenas 20% de chance de falha.'
            },
            {
                name: 'Mente Aberta',
                desc: 'Você recebe +2 em Diplomacia e Investigação.'
            },
            {
                name: 'Plurivalente',
                desc: 'Você recebe um poder geral à sua escolha.'
            }
        ],
        imageUrl: 'https://i.imgflip.com/a0fxsg.gif'
    },

    // ── KOBOLD (complexo) ─────────────────────────────────────
    kobold: {
        name: 'Kobolds (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { destreza: 2, forca: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Força −1',
        racialPowers: [
            {
                name: 'Enxame Escamoso',
                desc: 'Criatura Média de dois braços. Conta como Pequeno para espaços. Em testes de resistência contra efeitos sem dano e de alvo único, rola 2 dados. Vulnerabilidade a área.'
            },
            {
                name: 'Praga Monstruosa',
                desc: 'Tipo monstro. Visão no escuro e +2 em Sobrevivência.'
            },
            {
                name: 'Sensibilidade a Luz',
                desc: 'Fica ofuscado sob luz do sol ou similar.'
            },
        ],
        imageUrl: 'https://media.tenor.com/iY__m2gWNYwAAAAM/dnd-cartoon-dnd.gif',

        createCustomUi(container) {
            container.innerHTML = `
    <details class="fold" style="margin-top:12px">
        <summary class="fold-summary">Talentos do Bando <span class="fold-hint">Escolha 2</span></summary>
        <div id="talent-container" class="checklist fold-body">
        <p style="margin:0 0 8px">Escolha dois talentos do bando. Você pode escolher outros desses talentos no lugar de poderes de classe.</p>
        ${Object.entries(KOBOLD_TALENTS).map(([id, t]) => `
            <div class="bencao-item" id="wrapper-${id}">
                <label class="check">
                    <input type="checkbox" id="${id}" name="talent" value="${id}">
                    <span>${t.name}</span>
                    <span class="bencao-desc-toggle" data-toggle="${id}" title="Ver descrição">?</span>
                </label>
                <div class="bencao-desc-body" id="desc-kobold-${id}">${t.desc || ''}</div>
            </div>`).join('')}
        </div>
    </details>`;

            container.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const desc = document.getElementById('desc-kobold-' + btn.dataset.toggle);
                    if (desc) desc.classList.toggle('active');
                });
            });

            const checkBoxes = container.querySelectorAll('input[name="talent"]');

            const validateRequirements = () => {
                const selected = Array.from(checkBoxes).filter(cb => cb.checked).map(cb => cb.id);

                // Regras de Dependência
                const dependencies = {
                    'fundo': 'organizadinhos',
                    'enxame': 'amontoados'
                };

                Object.entries(dependencies).forEach(([target, req]) => {
                    const targetEl = container.querySelector(`#${target}`);
                    const wrapperEl = container.querySelector(`#wrapper-${target}`);
                    const hasReq = selected.includes(req);

                    if (!hasReq) {
                        targetEl.checked = false; // Desmarca se o requisito sumir
                        wrapperEl.style.display = 'none'; // Esconde o poder bloqueado
                    } else {
                        wrapperEl.style.display = 'block'; // Mostra se tiver o requisito
                    }
                });

                // Trava de limite (máximo 2)
                if (selected.length > 2) {
                    alert('Você só pode escolher até 2 talentos!');
                    return false;
                }
                return true;
            };

            checkBoxes.forEach(cb => {
                cb.addEventListener('change', (e) => {
                    if (!validateRequirements()) {
                        e.target.checked = false;
                        validateRequirements(); // Revalida para resetar estados
                    }
                    updateKoboldAttributes();
                });
            });

            // Roda uma vez no início para esconder os que tem requisito
            validateRequirements();
        },

        calculateAttributes() {
            const selectedPowers = [];
            document.querySelectorAll('input[name="talent"]:checked').forEach(cb => {
                const t = KOBOLD_TALENTS[cb.value];
                if (t) selectedPowers.push({ name: t.name, desc: t.desc || '' });
            });

            return {
                baseAttributes: this.attributes,
                isChoice: false,
                choiceCount: 0,
                selectedPowers
            };
        }
    },

    harpia: {
        name: 'Harpia (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { destreza: 2, carisma: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Carisma +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Asas de Abutre',
                desc: 'Paira a 1,5m (12m), ignore terreno difícil e imune a queda. Se não usar armadura pesada, pode gastar 1 PM/rodada para voar (18m).'
            },
            {
                name: 'Cria de Masmorra',
                desc: 'Tipo monstro. Recebe visão no escuro e +2 em Intimidação e Sobrevivência.'
            },
            {
                name: 'Grito Aterrorizante',
                desc: 'Ação padrão e 1 PM: criaturas em alcance curto ficam abaladas (Vontade CD Car evita).'
            },
            {
                name: 'Pés Rapinantes',
                desc: 'Pés podem ser mãos ou armas naturais (garras 1d6). Pode gastar 1 PM para ataque extra com garra ou usá-las como armas secundárias.'
            }
        ],
        imageUrl: 'https://images.steamusercontent.com/ugc/862852702977931501/C2CAB11CAE25250FEEF6174FA7E908D62697B3A9/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
    },

    ceratops: {
        name: 'Ceratops (Ameaças)',
        type: 'ameacas',
        tamanho: 'Grande', raca: 'Humanoide',
        attributes: { constituicao: 2, forca: 1, destreza: -1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Força +1, Destreza −1, Inteligência −1',
        racialPowers: [
            {
                name: 'Chifres',
                desc: 'Você possui uma arma natural de chifres (dano 1d8). Uma vez por rodada, ao usar a ação agredir, pode gastar 1 PM para fazer um ataque extra com os chifres.'
            },
            {
                name: 'Paquidérmico',
                desc: 'Seu tamanho é Grande. Você recebe +1 na Defesa e pode usar Força como atributo-chave de Intimidação (em vez de Carisma).'
            },
            {
                name: 'Papel Tribal',
                desc: 'Você é treinado em uma perícia a sua escolha entre Cura, Intimidação, Ofício ou Sobrevivência.'
            },
            {
                name: 'Medo de Altura',
                desc: 'Se estiver adjacente a uma queda de 3m ou mais (como um buraco ou penhasco), você fica abalado.'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/t4csDZj4cpUAAAAd/huh-dinosaurs.gif'
    },

    pteros: {
        name: 'Pteros (Ameaças)',
        type: 'ameacas',
        tamanho: 'Grande', raca: 'Humanoide',
        attributes: { sabedoria: 2, destreza: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Destreza +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Ligação Natural',
                desc: 'Vínculo mental com uma criatura (Int -3+). Comunicação mental em alcance longo e sabe sempre direção/distância dela. Pode trocar no começo de cada aventura.'
            },
            {
                name: 'Mãos Rudimentares',
                desc: 'Itens mundanos devem ser adaptados (1 dia, +50% do custo). Itens iniciais já vêm adaptados.'
            },
            {
                name: 'Pés Rapinantes',
                desc: 'Duas armas naturais de garras (1d6). Pode gastar 1 PM para ataque extra ou usá-las como armas secundárias.'
            },
            {
                name: 'Senhor dos Céus',
                desc: 'Paira a 1,5m (9m). Se não usar armadura pesada, pode gastar 1 PM/rodada para voar (12m). Ocupa espaço de uma categoria maior ao abrir as asas.'
            },
            {
                name: 'Sentidos Rapinantes',
                desc: 'Você recebe visão na penumbra e +2 em Percepção e Sobrevivência.'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/5seA8tx1za0AAAAd/sauron-marvel.gif'
    },

    velocis: {
        name: 'Velocis (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { destreza: 2, sabedoria: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Sabedoria +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Através de Espinheiros',
                desc: 'Recebe RD corte e perfuração 2 e ignora terreno difícil natural.'
            },
            {
                name: 'Sentidos Selvagens',
                desc: 'Recebe +2 em Sobrevivência, visão na penumbra e faro.'
            },
            {
                name: 'Velocista da Planície',
                desc: 'Deslocamento 12m. Usa Destreza para Atletismo e rola dois dados (melhor resultado) para correr ou saltar.'
            }
        ],
        imageUrl: 'https://i.redd.it/gz73bz9g5cne1.gif'
    },

    voracis: {
        name: 'Voracis (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { destreza: 2, constituicao: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Constituição +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Garras',
                desc: 'Duas armas naturais (1d6). Pode gastar 1 PM para ataque extra com garra livre ao usar a ação agredir.'
            },
            {
                name: 'Rainha da Selva',
                desc: 'Deslocamento de escalada 9m, +2 em Atletismo e recupera +1 PV por nível ao descansar.'
            },
            {
                name: 'Sentidos Selvagens',
                desc: 'Recebe +2 em Sobrevivência, visão na penumbra e faro.'
            }
        ],
        imageUrl: 'https://media.tenor.com/17xAoIGD9IMAAAAC/thunder-cats.gif'
    },

    yidishan: {
        name: 'Yidishan (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Construto',
        attributes: { carisma: -2 },
        isChoice: true,
        choiceCount: 3,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['carisma'],
        bonusMessage: '+1 em três atributos (exceto Carisma), Carisma −2',
        racialPowers: [
            {
                name: 'Híbrido Mecânico',
                desc: 'Tipo construto. Imune a cansaço, efeitos metabólicos e veneno. Não respira, come ou dorme. Cura mundana reduzida à metade. Recupera PV/PM fixos por descanso (8h inerte).'
            },
            {
                name: 'Peças Metálicas',
                desc: 'Recebe +2 na Defesa, mas sofre penalidade de armadura de –2.'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/Ohc53jtWsUwAAAAd/dc-cyborg.gif',

        createCustomUi(container) {
            const allRaces = Object.entries(RACE_DATA)
                .filter(([key, r]) => r.raca === 'Humanoide' && key !== 'yidishan')
                .map(([key, r]) => `<option value="${key}">${r.name}</option>`)
                .join('');

            container.innerHTML = `
            <details class="fold" style="margin-top:12px">
                <summary class="fold-summary">Natureza Orgânica <span class="fold-hint">ver descrição</span></summary>
                <div class="fold-body">
                    <p style="margin:0 0 8px">Ganha uma perícia treinada ou um poder geral. Alternativamente, pode ser de outra raça humanoide: ganha uma habilidade dela e seu tamanho.</p>
                    <label class="check" style="margin-bottom:8px">
                        <input type="checkbox" id="yidishan-natureza">
                        <span>Herdar outra raça</span>
                    </label>
                    <div id="yidishan-race-select" class="hidden" style="margin-bottom:8px">
                        <label for="yidishan-race">Raça:</label>
                        <select id="yidishan-race">
                            <option value="">Selecione</option>
                            ${allRaces}
                        </select>
                    </div>
                    <div id="yidishan-power-select" class="hidden" style="margin-bottom:8px">
                        <label for="yidishan-power">Poder Herdado:</label>
                        <select id="yidishan-power">
                            <option value="">Selecione</option>
                        </select>
                    </div>
                    <div id="yidishan-power-checklist" class="hidden" style="margin-bottom:8px">
                        <label><b>Poderes Herdados</b> <span class="fold-hint">Escolha até 2</span></label>
                        <div id="yidishan-mutation-container" class="checklist"></div>
                    </div>
                    <div id="yidishan-natureza-info" class="hidden" style="margin-top:8px;padding:10px;background:rgba(0,0,0,0.2);border-radius:6px;font-size:13px;color:var(--text-secondary)"></div>
                </div>
            </details>`;

            const populatePowers = () => {
                const raceKey = document.getElementById('yidishan-race')?.value;
                const powerSelect = document.getElementById('yidishan-power');
                const selectDiv = document.getElementById('yidishan-power-select');
                const checklistDiv = document.getElementById('yidishan-power-checklist');
                const checklistContainer = document.getElementById('yidishan-mutation-container');
                const race = raceKey ? RACE_DATA[raceKey] : null;
                const config = getInheritablePowerConfig(race);

                powerSelect.innerHTML = '<option value="">Selecione</option>';
                checklistContainer.innerHTML = '';
                selectDiv.classList.add('hidden');
                checklistDiv.classList.add('hidden');

                if (!config) return;

                if (config.type === 'checklist') {
                    checklistContainer.innerHTML = config.options.map(o => `
                        <div class="bencao-item">
                            <label class="check">
                                <input type="checkbox" class="yidishan-mut" id="yidishan-mut-${o.id}" value="${o.id}">
                                <span>${o.name}</span>
                                <span class="bencao-desc-toggle" data-toggle="${o.id}" title="Ver descrição">?</span>
                            </label>
                            <div class="bencao-desc-body" id="desc-yidishan-${o.id}">${o.desc || ''}</div>
                        </div>`).join('');
                    checklistContainer.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                        btn.addEventListener('click', (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const desc = document.getElementById('desc-yidishan-' + btn.dataset.toggle);
                            if (desc) desc.classList.toggle('active');
                        });
                    });
                    checklistContainer.querySelectorAll('.yidishan-mut').forEach(cb => {
                        cb.addEventListener('change', () => {
                            const count = checklistContainer.querySelectorAll('.yidishan-mut:checked').length;
                            if (count > config.maxSelect) {
                                alert(`Você só pode escolher até ${config.maxSelect} poderes!`);
                                cb.checked = false;
                            }
                            updateYidishanAttributes();
                        });
                    });
                    checklistDiv.classList.remove('hidden');
                } else {
                    config.options.forEach((p, i) => {
                        const opt = document.createElement('option');
                        opt.value = i;
                        opt.textContent = p.name;
                        powerSelect.appendChild(opt);
                    });
                    selectDiv.classList.remove('hidden');
                }
            };

            container.querySelector('#yidishan-natureza').addEventListener('change', () => {
                const checked = container.querySelector('#yidishan-natureza').checked;
                document.getElementById('yidishan-race-select').classList.toggle('hidden', !checked);
                document.getElementById('yidishan-power-select').classList.add('hidden');
                document.getElementById('yidishan-power-checklist').classList.add('hidden');
                updateYidishanAttributes();
            });
            container.querySelector('#yidishan-race').addEventListener('change', () => {
                populatePowers();
                updateYidishanAttributes();
            });
            container.querySelector('#yidishan-power').addEventListener('change', updateYidishanAttributes);

            updateYidishanAttributes();
        },

        calculateAttributes() {
            const checked = document.getElementById('yidishan-natureza')?.checked;
            const raceKey = document.getElementById('yidishan-race')?.value;
            const selectedRace = raceKey ? RACE_DATA[raceKey] : null;
            const config = checked && selectedRace ? getInheritablePowerConfig(selectedRace) : null;

            let naturezaPowers;
            let naturezaLabel = null;

            if (config?.type === 'checklist') {
                const selectedIds = Array.from(document.querySelectorAll('.yidishan-mut:checked')).map(cb => cb.value);
                const tamanho = getInheritedTamanho(raceKey, null);
                naturezaPowers = selectedIds.length
                    ? selectedIds.map(id => {
                        const opt = config.options.find(o => o.id === id);
                        return {
                            name: `Natureza Orgânica (${selectedRace.name})`,
                            desc: `Você herda a habilidade "${opt.name}" da raça ${selectedRace.name} e seu tamanho (${tamanho}). ${opt.desc}`
                        };
                      })
                    : [{
                        name: `Natureza Orgânica (${selectedRace.name})`,
                        desc: `Você herda habilidades da raça ${selectedRace.name} e seu tamanho (${tamanho}).`
                      }];
                naturezaLabel = selectedRace.name;
            } else if (config) {
                const powerIndex = document.getElementById('yidishan-power')?.value;
                const power = powerIndex !== '' ? config.options[parseInt(powerIndex)] : null;
                const tamanho = getInheritedTamanho(raceKey, power);
                naturezaPowers = [{
                    name: `Natureza Orgânica (${selectedRace.name})`,
                    desc: power
                        ? `Você herda a habilidade "${power.name}" da raça ${selectedRace.name} e seu tamanho (${tamanho}). ${power.desc}`
                        : `Você herda uma habilidade da raça ${selectedRace.name} e seu tamanho (${tamanho}).`
                }];
                naturezaLabel = selectedRace.name;
            } else {
                naturezaPowers = [{
                    name: 'Natureza Orgânica',
                    desc: 'Ganha uma perícia treinada ou um poder geral. Alternativamente, pode ser de outra raça: ganha uma habilidade e o tamanho dela.'
                }];
            }

            document.getElementById('bonusMessage').innerHTML =
                '+1 em três atributos (exceto Carisma), Carisma −2' +
                (naturezaLabel ? `<br><b>Natureza Orgânica:</b> ${naturezaLabel}` : '');

            // Exibe descrição do poder herdado dentro do fold
            const naturezaInfo = document.getElementById('yidishan-natureza-info');
            if (naturezaInfo) {
                const naturezaPower = naturezaPowers.find(p => p.name.startsWith('Natureza'));
                if (naturezaPower) {
                    naturezaInfo.innerHTML = `<b>${naturezaPower.name}</b><br>${naturezaPower.desc}`;
                    naturezaInfo.classList.remove('hidden');
                } else {
                    naturezaInfo.innerHTML = '';
                    naturezaInfo.classList.add('hidden');
                }
            }

            return {
                baseAttributes: { carisma: -2 },
                isChoice: true,
                choiceCount: 3,
                maxChoicePerAttribute: 1,
                lockedChoiceAttributes: ['carisma'],
                selectedPowers: naturezaPowers
            };
        }
    },

    // ── MOREAU (complexo) ─────────────────────────────────────
    moreau: {
        name: 'Moreau (Ameaças)', type: 'ameacas', tamanho: 'Médio', raca: 'Humanoide',
        attributes: {},
        bonusMessage: 'Selecione uma herança',
        racialPowers: [],
        imageUrl: 'https://i.pinimg.com/originals/b3/a6/da/b3a6daffbeef2af9e7203dd480e89000.gif',

        createCustomUi(container) {
            const opts = Object.entries(MOREAU_HERANCAS)
                .map(([k, v]) => `<option value="${k}">${k.charAt(0).toUpperCase() + k.slice(1)}</option>`).join('');
            container.innerHTML = `
            <div>
                <label for="moreau-heranca">Herança Animal:</label>
                <select id="moreau-heranca">
                    <option value="">Selecione</option>${opts}
                </select>
            </div>`;
            const herancaSelect = container.querySelector('#moreau-heranca');
            herancaSelect.addEventListener('change', updateMoreauAttributes);
            herancaSelect.addEventListener('input', updateMoreauAttributes);
        },

        calculateAttributes() {
            const key = document.getElementById('moreau-heranca')?.value;
            const data = MOREAU_HERANCAS[key];
            const attrs = {};

            const table = document.getElementById('attribute-table');
            if (data) {
                attrs[data.attr] = 1;
                table.style.background = `url('${data.img}') no-repeat center center`;
                table.style.backgroundSize = '75% auto';
                document.getElementById('bonusMessage').innerHTML = data.attrDesc;
            } else {
                table.style.background = '';
                document.getElementById('bonusMessage').innerHTML = 'Selecione uma herança.';
            }

            const selectedPowers = data ? data.powers.map(p => ({ ...p })) : [];
            return { baseAttributes: attrs, isChoice: true, choiceCount: 2, maxChoicePerAttribute: 1, selectedPowers };
        }
    },

    sea_elf: {
        name: 'Elfo do Mar (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { destreza: 2, constituicao: 1, inteligencia: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Constituição +1, Inteligência −1',
        racialPowers: [
            {
                name: 'Arsenal do Oceano',
                desc: 'Proficiência em arpão, rede e tridente e +2 no ataque com elas. Se já for proficiente, elas contam como armas leves para você.'
            },
            {
                name: 'Cria das Águas',
                desc: 'Deslocamento de natação igual ao terrestre e visão na penumbra. Na água, ganha percepção às cegas 18m e +2 na Defesa, Furtividade e Sobrevivência.'
            },
            {
                name: 'Dependência de Água',
                desc: 'Se ficar mais de um dia sem contato com água, não recupera PM com descanso até voltar para a água ou banhar-se.'
            }
        ],
        imageUrl: 'https://giffiles.alphacoders.com/214/214964.gif'
    },

    nagah_macho: {
        name: 'Nagah (Macho - Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { forca: 1, destreza: 1, constituicao: 1 },
        isChoice: false,
        bonusMessage: 'Força +1, Destreza +1, Constituição +1',
        racialPowers: [
            {
                name: 'Cauda',
                desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com a cauda ao usar a ação agredir.'
            },
            {
                name: 'Inocência Dissimulada',
                desc: '+2 em Enganação. Uma vez por cena, pague 2 PM para substituir um teste de perícia por um de Enganação.'
            },
            {
                name: 'Presentes de Sszzaas',
                desc: 'Visão na penumbra, +1 na Defesa e resistência a veneno +5.'
            },
            {
                name: 'Fraquezas Ofídias',
                desc: '+1 de dano por dado de frio e –5 em resistências contra Músicas de Bardo.'
            }
        ],
        imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTZjMDliOTUyMWxlYm9kcDY2MXkwM296YTdyYTFpandvN2l5NHNwZmUzOHozMG1lcSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/jBnYaRTtSG9jbPrDrR/giphy-downsized-medium.gif'
    },

    nagah_femea: {
        name: 'Nagah (Fêmea - Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { inteligencia: 1, sabedoria: 1, carisma: 1 },
        isChoice: false,
        bonusMessage: 'Inteligência +1, Sabedoria +1, Carisma +1',
        racialPowers: [
            {
                name: 'Cauda',
                desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com a cauda ao usar a ação agredir.'
            },
            {
                name: 'Inocência Dissimulada',
                desc: '+2 em Enganação. Uma vez por cena, pague 2 PM para substituir um teste de perícia por um de Enganação.'
            },
            {
                name: 'Presentes de Sszzaas',
                desc: 'Visão na penumbra, +1 na Defesa e resistência a veneno +5.'
            },
            {
                name: 'Fraquezas Ofídias',
                desc: '+1 de dano por dado de frio e –5 em resistências contra Músicas de Bardo.'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/XAgdMWuiaYcAAAAC/snake-wrap-command.gif'
    },

    fintroll: {
        name: 'Fintroll (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { inteligencia: 2, constituicao: 1, forca: -1 },
        isChoice: false,
        bonusMessage: 'Inteligência +2, Constituição +1, Força −1',
        racialPowers: [
            {
                name: 'Corpo Vegetal',
                desc: 'Tipo monstro. Você é imune a atordoamento e metamorfose. Contra magias sem resistência, você tem direito a um teste de Fortitude (CD da magia) para evitar o efeito.'
            },
            {
                name: 'Presença Arcana',
                desc: 'Você recebe +2 em Misticismo e resistência a magia +2.'
            },
            {
                name: 'Regeneração Vegetal',
                desc: 'Uma vez por rodada, pode gastar 1 PM para recuperar 5 PV. Não cura dano de ácido ou fogo.'
            },
            {
                name: 'Intolerância a Luz',
                desc: 'Você possui sensibilidade a luz. Sob luz do sol ou similar, você não consegue ativar sua Regeneração Vegetal.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/95/ea/29/95ea2981d51aaf84d5b7a0a25e3f309e.gif'
    },

    soterrado: {
        name: 'Soterrado (Ameaças)',
        type: 'ameacas',
        tamanho: 'Médio', raca: 'Mort-Vivo',
        attributes: { constituicao: -1 },
        isChoice: true,
        choiceCount: 3,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['constituicao'],
        bonusMessage: '+1 em três atributos (exceto Constituição), Constituição −1',
        racialPowers: [
            {
                name: 'Abraço Gélido',
                desc: 'Você recebe +2 em testes para agarrar. Além disso, seus ataques desarmados e com armas naturais causam 2 pontos de dano de frio extras. Substitui Memória Póstuma.'
            },
            {
                name: 'Esquife de Gelo',
                desc: 'Você recebe redução de corte e perfuração 5 e redução de frio 10. Entretanto, você sofre 1 ponto de dano adicional por dado de dano de fogo. Substitui Armadura Óssea.'
            },
            {
                name: 'Natureza Esquelética',
                desc: 'Tipo morto-vivo. Visão no escuro e imunidade a cansaço, efeitos metabólicos, trevas e veneno. Cura mágica causa dano, mas trevas recuperam seus PV.'
            },
            {
                name: 'Preço da Não Vida',
                desc: 'Precisa passar oito horas sob a luz de estrelas ou no subterrâneo para recuperar PV e PM. Caso contrário, sofre os efeitos de fome.'
            }
        ],
        imageUrl: 'https://i.redd.it/y5i8n0dso9p91.gif'
    },

    // ── HERÓIS DE ARTON ───────────────────────────────────────

    duende: {
        name: 'Duende (Herois de Arton)', type: 'DHracas', tamanho: 'Variável', raca: 'Espírito',
        attributes: {},
        bonusMessage: 'Varia por Natureza e Tamanho',
        // Poderes fixos canônicos (presentes dinâmicos vêm de DUENDE_PRESENTES)
        racialPowers: [
            { name: 'Aversão a Ferro', desc: 'Sofre +1 de dano por dado de ataques de ferro/aço. Sofre 1d6 de dano por rodada se empunhar ou vestir metal.' },
            { name: 'Aversão a Sinos', desc: 'Fica alquebrado e esmorecido se ouvir badalar de sinos (rolar 1d6 em cidades, 1 = ouviu).' },
            { name: 'Tabu', desc: 'Escolha uma perícia (Diplomacia, Iniciativa, Luta ou Percepção) para sofrer –5. Desrespeitar causa fadiga/morte.' }
        ],

        imageUrl: 'https://i.pinimg.com/originals/37/a1/d8/37a1d8584b898130605bc0b2228dbba8.gif',

        natureData: {
            Animal: { isChoice: true, choiceCount: 1, maxChoicePerAttribute: 1, bonusText: 'Pode adicionar +1 em um atributo à sua escolha.', imageUrl: 'https://i.redd.it/z92c1bu4c8251.gif' },
            Vegetal: { isChoice: false, bonusText: 'Natureza Vegetal, Florescer Feérico.', imageUrl: 'https://static.wikia.nocookie.net/powerlisting/images/5/54/Zetsu_mayfly.gif' },
            Mineral: { isChoice: false, bonusText: '', imageUrl: 'https://media1.tenor.com/m/5P1FeRwotGkAAAAd/whomp-mario.gif' }
        },

        createCustomUi(container) {
            const dons = ['Força', 'Destreza', 'Constituição', 'Inteligência', 'Sabedoria', 'Carisma'].map((n, i) => {
                const id = 'don' + ['Forca', 'Destreza', 'Constituicao', 'Inteligencia', 'Sabedoria', 'Carisma'][i];
                return `<label class="check"><input type="checkbox" id="${id}" name="don" value="${id}"><span>${n}</span></label>`;
            }).join('');

            const presentes = [
                { id: 'presAfinidade', name: 'Afinidade Elemental', sub: ['Água', 'Fogo', 'Vegetação'] },
                { id: 'presEncantar', name: 'Encantar Objetos' },
                { id: 'presEnfeiticar', name: 'Enfeitiçar' },
                { id: 'presInvisibilidade', name: 'Invisibilidade' },
                { id: 'presLingua', name: 'Língua da Natureza' },
                { id: 'presMaldicao', name: 'Maldição', sub: ['Apatia Profunda', 'Coração de Geleia', 'Envelhecimento Súbito', 'Loucura do Verão', 'Mil Verrugas', 'Ruína do Corpo', 'Outra (mestre)'] },
                { id: 'presMetamorfose', name: 'Metamorfose Animal' },
                { id: 'presLaDoQueAqui', name: 'Mais Lá do Que Aqui' },
                { id: 'presSonhos', name: 'Sonhos Proféticos' },
                { id: 'presVelocidade', name: 'Velocidade do Pensamento' },
                { id: 'presVisao', name: 'Visão Feérica' },
                { id: 'presVoo', name: 'Voo' },
            ];

            const presHtml = presentes.map(p => {
                const desc = DUENDE_PRESENTES[p.id]?.desc || '';
                return `
            <div class="bencao-item">
                <label class="check" style="display:block">
                    <input type="checkbox" id="${p.id}" name="presente" value="${p.id}"><span>${p.name}</span>
                    <span class="bencao-desc-toggle" data-toggle="${p.id}" title="Ver descrição">?</span>
                </label>
                <div class="bencao-desc-body" id="desc-duende-${p.id}">${desc}</div>
            </div>
            ${p.sub ? `<div style="margin:4px 0 8px 34px"><select id="${p.id}-sub" class="hidden" style="max-width:300px">${p.sub.map(s => `<option value="${s}">${s}</option>`).join('')}</select></div>` : ''}
        `}).join('');

            container.innerHTML = `
        <button id="nimbButton" class="btn-nimb" style="margin-bottom:8px">Sonhos Malucos (Modo Nimb)</button>
        <div style="margin-bottom:8px">
            <label for="duende-natureza"><b>Natureza:</b></label>
            <select id="duende-natureza">
                <option value="Animal">Animal</option>
                <option value="Vegetal">Vegetal</option>
                <option value="Mineral">Mineral</option>
            </select>
        </div>
        <div style="margin-bottom:8px">
            <label for="duende-tamanho"><b>Tamanho:</b></label>
            <select id="duende-tamanho">
                <option value="Minúsculo">Minúsculo</option>
                <option value="Pequeno">Pequeno</option>
                <option value="Medio" selected>Médio</option>
                <option value="Grande">Grande</option>
            </select>
        </div>
        <details class="fold" style="margin-top:8px" id="details-dons">
            <summary class="fold-summary">Dons <span class="fold-hint">Escolha até 2</span></summary>
            <div id="dons-container" class="checklist fold-body">${dons}</div>
        </details>
        <details class="fold" style="margin-top:8px" id="details-presentes">
            <summary class="fold-summary">Presentes de Magia e Caos <span class="fold-hint">Escolha até 3</span></summary>
            <div id="presentes-container" class="checklist fold-body">${presHtml}</div>
        </details>`;

            container.querySelectorAll('.bencao-desc-toggle').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const desc = document.getElementById('desc-duende-' + btn.dataset.toggle);
                    if (desc) desc.classList.toggle('active');
                });
            });

            // Listeners básicos
            const update = () => updateDuendeAttributes();
            container.querySelectorAll('select, input[type="checkbox"]').forEach(el => el.addEventListener('change', update));

            container.querySelector('#presAfinidade').addEventListener('change', e => {
                container.querySelector('#presAfinidade-sub')?.classList.toggle('hidden', !e.target.checked);
            });
            container.querySelector('#presMaldicao').addEventListener('change', e => {
                container.querySelector('#presMaldicao-sub')?.classList.toggle('hidden', !e.target.checked);
            });

            // Travas de quantidade
            container.querySelectorAll('input[name="don"]').forEach(cb => cb.addEventListener('change', () => {
                if (container.querySelectorAll('input[name="don"]:checked').length > 2) { alert('Máximo de 2 Dons!'); cb.checked = false; }
            }));
            container.querySelectorAll('input[name="presente"]').forEach(cb => cb.addEventListener('change', () => {
                if (container.querySelectorAll('input[name="presente"]:checked').length > 3) { alert('Máximo de 3 Presentes!'); cb.checked = false; }
            }));

            // BOTÃO NIMB CORRIGIDO
            container.querySelector('#nimbButton').addEventListener('click', (e) => {
                e.preventDefault();
                const natSelect = container.querySelector('#duende-natureza');
                const tamSelect = container.querySelector('#duende-tamanho');

                // Random Natureza e Tamanho
                natSelect.selectedIndex = Math.floor(Math.random() * natSelect.options.length);
                tamSelect.selectedIndex = Math.floor(Math.random() * tamSelect.options.length);

                // Random Dons
                const donInputs = Array.from(container.querySelectorAll('input[name="don"]'));
                donInputs.forEach(c => c.checked = false);
                donInputs.sort(() => 0.5 - Math.random()).slice(0, 2).forEach(c => c.checked = true);

                // Random Presentes
                const presInputs = Array.from(container.querySelectorAll('input[name="presente"]'));
                presInputs.forEach(c => c.checked = false);
                presInputs.sort(() => 0.5 - Math.random()).slice(0, 3).forEach(c => c.checked = true);

                // Abrir details e atualizar visibilidade de sub-selects
                container.querySelector('#details-dons').open = true;
                container.querySelector('#details-presentes').open = true;
                container.querySelector('#presAfinidade-sub')?.classList.toggle('hidden', !container.querySelector('#presAfinidade').checked);
                container.querySelector('#presMaldicao-sub')?.classList.toggle('hidden', !container.querySelector('#presMaldicao').checked);

                // Desabilitar tudo DEPOIS de processar
                updateDuendeAttributes(); // Roda o calculo primeiro!

                setTimeout(() => {
                    container.querySelectorAll('select, input, button').forEach(el => {
                        if (!el.id.includes('-sub')) el.disabled = true;
                    });
                    alert('Nimb sorriu para você! +2 PM por aceitar o caos.');
                }, 100);
            });
        },

        calculateAttributes() {
            const attrs = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
            const tamEl = document.getElementById('duende-tamanho');
            const natEl = document.getElementById('duende-natureza');
            if (!tamEl || !natEl) return { baseAttributes: attrs, selectedPowers: [] };

            const tamanho = tamEl.value;
            const naturezaKey = natEl.value;

            if (tamanho === 'Minúsculo') attrs.forca -= 1;
            if (tamanho === 'Grande') attrs.destreza -= 1;

            // Bônus de Atributos (Dons)
            document.querySelectorAll('input[name="don"]:checked').forEach(cb => {
                const k = cb.id.replace('don', '').toLowerCase();
                const map = { forca: 'forca', destreza: 'destreza', constituicao: 'constituicao', inteligencia: 'inteligencia', sabedoria: 'sabedoria', carisma: 'carisma' };
                if (map[k]) attrs[map[k]] += 1;
            });

            // Background dinâmico
            const nd = this.natureData[naturezaKey];
            const table = document.getElementById('attribute-table');
            if (table) {
                table.style.background = `url('${nd.imageUrl}') no-repeat center center`;
                table.style.backgroundSize = '75% auto';
            }

            // --- CONSTRUÇÃO DA LISTA DE PODERES (ÚNICA) ---
            // Começamos com os fixos que salvamos em racialPowers
            const finalPowers = [...this.racialPowers];

            // Adiciona os Presentes selecionados buscando no constante global
            document.querySelectorAll('input[name="presente"]:checked').forEach(cb => {
                const info = DUENDE_PRESENTES[cb.id] || DUENDE_PRESENTES[cb.value];
                if (info) {
                    let pName = info.name;
                    const sub = document.getElementById(`${cb.id}-sub`);
                    if (sub && !sub.classList.contains('hidden')) pName += ` (${sub.value})`;
                    finalPowers.push({ name: pName, desc: info.desc });
                }
            });

            // Adiciona poderes de Natureza
            if (naturezaKey === 'Animal') {
                finalPowers.push({ name: 'Natureza Animal', desc: 'Pode adicionar +1 em um atributo à sua escolha.' });
            } else if (naturezaKey === 'Vegetal') {
                finalPowers.push({ name: 'Natureza Vegetal', desc: 'Imune a atordoamento e metamorfose.' });
                finalPowers.push({ name: 'Florescer Feérico', desc: 'Pode gastar PM (limite Con) para curar 2d8 PV por PM.' });
            } else if (naturezaKey === 'Mineral') {
                finalPowers.push({ name: 'Natureza Mineral', desc: 'Imune a metabolismo e RD 5 (Corte, Fogo, Perfuração).' });
            }

            // Atualização da Mensagem de Bônus (Dons aparecem aqui, não nos poderes)
            const donsNomes = Array.from(document.querySelectorAll('input[name="don"]:checked')).map(cb => cb.nextElementSibling.textContent);
            const presNomes = Array.from(document.querySelectorAll('input[name="presente"]:checked')).map(cb => {
                const info = DUENDE_PRESENTES[cb.id] || DUENDE_PRESENTES[cb.value];
                let name = info ? info.name : cb.nextElementSibling.textContent;
                const sub = document.getElementById(`${cb.id}-sub`);
                if (sub && !sub.classList.contains('hidden')) name += ` (${sub.value})`;
                return name;
            });

            // 6. Atualização da Mensagem na Calculadora (Quadro Superior)
            document.getElementById('bonusMessage').innerHTML =
                `<b>${naturezaKey} ${tamanho}</b>`
                + (nd.bonusText ? `<br>${nd.bonusText}` : '')
                + (donsNomes.length ? `<br>Dons: ${donsNomes.join(', ')}` : '')
                + (presNomes.length ? `<br>Presentes: ${presNomes.join(', ')}` : '');

            return {
                baseAttributes: attrs,
                isChoice: nd.isChoice,
                choiceCount: nd.choiceCount || 0,
                maxChoicePerAttribute: 1,
                selectedPowers: finalPowers
            };
        }
    },

    eiradaan: {
        name: 'Eiradaan (Heróis de Arton)',
        type: 'DHracas',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { sabedoria: 2, carisma: 1, forca: -1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Carisma +1, Força −1',
        racialPowers: [
            {
                name: 'Essência Feérica',
                desc: 'Tipo espírito. Visão na penumbra e pode falar com animais livremente.'
            },
            {
                name: 'Magia Instintiva',
                desc: 'Usa Sabedoria para magias arcanas/Misticismo. Ganha +1 PM para aprimoramentos ao lançar magias (não cumulativo).'
            },
            {
                name: 'Sentidos Místicos',
                desc: 'Sempre sob efeito básico da magia Visão Mística.'
            },
            {
                name: 'Canção da Melancolia',
                desc: 'Em testes de Vontade contra efeitos mentais, rola dois dados e usa o pior resultado.'
            }
        ],
        imageUrl: 'https://gamingyeeter.com/wp-content/uploads/2021/11/giphy-2.gif'
    },

    galokk: {
        name: 'Galokk (Heróis de Arton)',
        type: 'DHracas',
        tamanho: 'Grande', raca: 'Humanoide',
        attributes: { forca: 1, constituicao: 1, carisma: -1 },
        isChoice: true,
        choiceCount: 1,
        maxChoicePerAttribute: 1,
        bonusMessage: 'Força +1, Constituição +1, +1 em um atributo, Carisma −1',
        racialPowers: [
            {
                name: 'Força dos Titãs',
                desc: 'Ao acertar ataque corpo a corpo/arremesso, pode gastar 1 PM: se rolar máximo no dado de dano, rola dado extra (limite = Força).'
            },
            {
                name: 'Meio-Gigante',
                desc: 'Tipo gigante e tamanho Grande. Usa Força para Intimidação.'
            },
            {
                name: 'Infância Entre os Pequenos',
                desc: 'Torna-se treinado em uma perícia à sua escolha.'
            }
        ],
        imageUrl: 'https://i.imgur.com/a4iUv3x.gif'
    },

    halfelf_herois: {
        name: 'Meio-Elfo (Heróis de Arton)',
        type: 'DHracas',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { inteligencia: 1 },
        isChoice: true,
        choiceCount: 2,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['constituicao'],
        bonusMessage: 'Inteligência +1, +1 em dois atributos (exceto Constituição)',
        racialPowers: [
            {
                name: 'Ambição Herdada',
                desc: 'Recebe um poder geral ou poder único de origem à sua escolha.'
            },
            {
                name: 'Entre Dois Mundos',
                desc: 'Recebe +1 em perícias baseadas em Carisma.'
            },
            {
                name: 'Sangue Élfico',
                desc: 'Visão na penumbra e +1 PM a cada nível ímpar. É considerado um elfo.'
            }
        ],
        imageUrl: 'https://i.pinimg.com/originals/ce/d5/36/ced536ade0d16ff1e3b15e5ed1ca7247.gif'
    },

    satiro: {
        name: 'Sátiro (Heróis de Arton)',
        type: 'DHracas',
        tamanho: 'Médio', raca: 'Espírito',
        attributes: { carisma: 2, destreza: 1, sabedoria: -1 },
        isChoice: false,
        bonusMessage: 'Carisma +2, Destreza +1, Sabedoria −1',
        racialPowers: [
            {
                name: 'Festeiro Feérico',
                desc: 'Tipo espírito. Visão na penumbra e +2 em Atuação e Fortitude.'
            },
            {
                name: 'Instrumentista Mágico',
                desc: 'Com instrumento, lança Amedrontar, Enfeitiçar, Hipnotismo e Sono (Carisma). Reaprendizado reduz custo em -1 PM.'
            },
            {
                name: 'Marrada',
                desc: 'Arma natural (1d6). Pode gastar 1 PM para ataque extra com a marrada ao usar a ação agredir.'
            },
            {
                name: 'Pernas Caprinas',
                desc: 'Deslocamento 12m e usa Destreza para Atletismo.'
            }
        ],
        imageUrl: 'https://i.imgur.com/NnVps2O.gif'
    },

    // ── OUTRAS ────────────────────────────────────────────────

    nailanandora: {
        name: 'Nailanandora (Duelo de Dragões)',
        type: 'outraRaca',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { destreza: 2, carisma: 1, constituicao: -1 },
        isChoice: false,
        bonusMessage: 'Destreza +2, Carisma +1, Constituição −1',
        racialPowers: [
            {
                name: 'Alma das Nuvens',
                desc: 'Você recebe resistência a encantamento +2.'
            },
            {
                name: 'Asas Emplumadas',
                desc: 'Pode gastar 1 PM por rodada para voar (12m). Enquanto voa, recebe +2 na Defesa e em Reflexos.'
            },
            {
                name: 'Sentidos Élficos',
                desc: 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.'
            }
        ],
        imageUrl: 'https://25.media.tumblr.com/tumblr_m4y08eYarJ1runxsho1_500.gif'
},

};

// Exportar para uso global
window.RACE_DATA = RACE_DATA;
window.SURAGEL_HERANCAS = SURAGEL_HERANCAS;
