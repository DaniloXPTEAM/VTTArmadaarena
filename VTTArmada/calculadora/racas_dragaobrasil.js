// ============================================================
//  racas_dragaobrasil.js — Dados de Raças (Dragão Brasil)
//  Extensão de racas.js | Calculadora de Atributos / Compêndio T20
//
//  Carregue DEPOIS de racas.js no index.html:
//    <script src="racas.js"></script>
//    <script src="racas_dragaobrasil.js"></script>
//    <script src="script.js"></script>
//
//  Este arquivo NÃO substitui racas.js — ele define RACE_DATA_DRAGAOBRASIL
//  separadamente e, no final, mescla essas raças em window.RACE_DATA
//  (criando-o do zero se racas.js não tiver sido carregado antes).
//
//  Conteúdo (fonte: Raças_DB_T20.docx):
//    - Vampiro                (raça nova, tipo morto-vivo)
//    - Anão da Superfície     (variante de Anão/Anã)
//    - Elfo-do-Gelo           (variante de Elfo/Elfa)
//    - Elfo-Sombrio           (variante de Elfo/Elfa)
//    - Feérico                (variante de Humano/Humana)
//    - Medusa Dracônica       (variante de Medusa)
//    - Teju                   (variante de Tabrachi)
//
//  Para adicionar uma raça nova aqui:
//    1. Crie uma entrada em RACE_DATA_DRAGAOBRASIL
//    2. type: 'dragaobrasil'
//    3. bonusMessage: apenas os bônus de atributo (ex: "FOR +2, DES +1")
//    4. racialPowers: [{ name, desc }] — habilidades fixas da raça
//    5. tamanho: 'Minúsculo' | 'Pequeno' | 'Médio' | 'Grande' | null (dinâmico)
//
//  imageUrl foi deixado em branco ('') em todas as entradas — preencha
//  com a arte/gif que preferir para cada raça.
// ============================================================

// ── BÊNÇÃOS VAMPÍRICAS ───────────────────────────────────────
// Escolha 1 no nível inicial (racialPowers.Bênção Vampírica); bênçãos
// adicionais podem ser adquiridas depois no lugar de poderes de classe.
const VAMPIRO_BENCAOS = {
    curaAcelerada: {
        name: 'Cura Acelerada',
        desc: 'No início de cada um dos seus turnos, pode gastar 1 PM para recuperar 5 PV. A partir do 5º nível, pode escolher esta bênção uma segunda vez para aumentar a cura para 10 PV por PM gasto.'
    },
    dominacaoVampirica: {
        name: 'Dominação Vampírica',
        desc: 'Gasta uma ação completa e 3 PM para sussurrar palavras de controle a um humanoide em alcance curto. O alvo fica confuso, enfeitiçado ou fascinado até o final da cena, ou perde as memórias da última hora, à sua escolha (Vontade CD Car evita). Uma criatura só pode ser alvo uma vez por cena. Pré-requisito: Presença Majestosa.'
    },
    drenarSangue: {
        name: 'Drenar Sangue',
        desc: 'Gasta uma ação padrão para drenar sangue de uma criatura viva que esteja agarrando: causa 2d6 de dano de perfuração por patamar e recupera a mesma quantidade de PV. Conta como se alimentar.'
    },
    formaDeLobo: {
        name: 'Forma de Lobo',
        desc: 'Gasta uma ação padrão e 3 PM para se transformar em um lobo (como o efeito básico de Forma Selvagem Feroz). Torna-se Médio (se já não for), recebe +3m de deslocamento e uma mordida de 1d6 (ou aumenta o dano de uma mordida existente em um passo).'
    },
    formaDeMorcego: {
        name: 'Forma de Morcego',
        desc: 'Gasta uma ação padrão e 3 PM para se transformar em um morcego: torna-se Minúsculo (+5 em Furtividade, −5 em manobras) e recebe deslocamento de voo 12m. O equipamento é absorvido e retorna ao normalizar. Dura o quanto desejar, mas termina se atacar, lançar magia ou sofrer dano.'
    },
    garras: {
        name: 'Garras',
        desc: 'Suas mãos são duas armas naturais de garras (dano 1d6, crítico ×2, corte). Uma vez por rodada, ao usar a ação agredir, pode gastar 1 PM para um ataque corpo a corpo extra com uma garra livre. Também pode usá-las como arma secundária em habilidades que exijam uma (como Estilo de Duas Armas).'
    },
    mantoDasSombras: {
        name: 'Manto das Sombras',
        desc: 'Pode lançar Invisibilidade, mas apenas em si mesmo. Caso aprenda novamente essa magia, seu custo diminui em −1 PM.'
    },
    passoVampirico: {
        name: 'Passo Vampírico',
        desc: 'Recebe +3m de deslocamento e deslocamento de escalada igual ao seu deslocamento padrão.'
    },
    presencaMajestosa: {
        name: 'Presença Majestosa',
        desc: 'Recebe a habilidade Presença Aristocrática. Se já possuir essa habilidade, seu custo diminui em −1 PM e a CD para resistir a ela aumenta em +2.'
    },
    resilienciaSombria: {
        name: 'Resiliência Sombria',
        desc: 'Recebe redução de dano 5/luz. Pré-requisito: Presença Majestosa, 5º nível de personagem.'
    }
};

// ── BÊNÇÃO DAS FADAS (Feérico) ───────────────────────────────
// Escolha 4 no nível inicial (racialPowers.Bênção das Fadas); cada bênção
// só pode ser escolhida uma vez. Ao receber um novo poder de classe, pode
// trocá-lo por uma bênção adicional da lista.
const FEERICO_BENCAOS = {
    ardilosoComoUmaCobra: {
        name: 'Ardiloso Como uma Cobra',
        desc: 'Pode lançar Disfarce Ilusório (atributo-chave Carisma).'
    },
    duroComoPedra: {
        name: 'Duro Como Pedra',
        desc: 'Recebe +1 em Constituição e resistência a magia +2.',
        attr: 'constituicao'
    },
    falanteComoUmGrilo: {
        name: 'Falante Como um Grilo',
        desc: 'Recebe +2 em Adestramento e Sobrevivência, e pode falar com animais e plantas (como o efeito da magia Voz Divina).'
    },
    forteComoUmTouro: {
        name: 'Forte Como um Touro',
        desc: 'Recebe +1 em Força e +5 de capacidade de carga.',
        attr: 'forca'
    },
    magicoComoUmaBorboleta: {
        name: 'Mágico Como uma Borboleta',
        desc: 'Pode lançar uma magia arcana de 1º círculo à sua escolha (atributo-chave Carisma). Se aprender novamente essa magia, seu custo diminui em −1 PM.'
    },
    raivosoComoUmCarcaju: {
        name: 'Raivoso Como um Carcaju',
        desc: 'Possui uma arma natural de mordida (dano 1d6, crítico ×2, perfuração). Uma vez por rodada, ao usar a ação agredir com outra arma corpo a corpo, pode gastar 1 PM para um ataque extra com a mordida.'
    },
    rapidoComoUmCoelho: {
        name: 'Rápido Como um Coelho',
        desc: 'Recebe +1 em Destreza e deslocamento +3m.',
        attr: 'destreza'
    },
    sabioComoUmaCoruja: {
        name: 'Sábio Como uma Coruja',
        desc: 'Recebe +1 em Sabedoria e +3 PM.',
        attr: 'sabedoria'
    },
    sagazComoUmFalcao: {
        name: 'Sagaz Como um Falcão',
        desc: 'Recebe visão na penumbra e fica permanentemente sob efeito da magia Visão Mística, com o aprimoramento de enxergar criaturas e objetos invisíveis.'
    }
};

// ── RAÇAS (DRAGÃO BRASIL) ─────────────────────────────────────
const RACE_DATA_DRAGAOBRASIL = {

    vampiro: {
        name: 'Vampiro',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: 'Morto-Vivo',
        attributes: { carisma: 1, constituicao: -1 },
        isChoice: true,
        choiceCount: 2,
        maxChoicePerAttribute: 1,
        lockedChoiceAttributes: ['constituicao'],
        bonusMessage: 'Carisma +1, +1 em dois atributos diferentes (exceto Constituição), Constituição −1',
        racialPowers: [
            {
                name: 'Natureza Não Viva',
                desc: 'Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno. Não precisa respirar, alimentar-se ou dormir. Efeitos mágicos de cura de luz causam dano a você, você não se beneficia de itens da categoria alimentação, e dano de trevas recupera seus PV.'
            },
            {
                name: 'Perda da Humanidade',
                desc: 'Você sofre três fraquezas vampíricas que se agravam a cada bênção vampírica adquirida:<br>* <b>Chamado das Trevas:</b> precisa repousar 8 horas sob a terra ou sofre −1 em perícias por bênção possuída até fazê-lo.<br>* <b>Sede de Sangue:</b> precisa consumir ao menos uma dose de sangue por semana, sofrendo os efeitos de fome caso contrário; o intervalo diminui um dia a cada bênção além da primeira.<br>* <b>Sensibilidade ao Sol:</b> fica ofuscado sob luz solar direta e perde 1d6 PV por bênção possuída a cada rodada exposto.'
            },
            {
                name: 'Dieta de Sangue',
                desc: 'Precisa consumir 1 dose de sangue por semana (1 litro ou 2d6 PV drenados de ser vivo). Tipos de sangue:<br>* <b>Animal:</b> abundante, mas menos nutritivo; vampiro fica fraco até ingerir sangue de outro tipo.<br>* <b>Espírito:</b> o mais valioso; +2 PM por patamar da criatura e +2 na CD de habilidades mágicas por 1 dia.<br>* <b>Humanoide:</b> alimento tradicional, sem penalidades nem bônus.<br>* <b>Monstro:</b> +1 em Força mas −2 em perícias de Carisma (exceto Intimidação) por 1 dia.<br><br>Drenar sangue suficiente de humanoide ou monstro para matá-lo cria um vampiro que deve vencer Vontade oposto ou ficará sob seu controle.'
            }
        ],
        imageUrl: 'https://media.tenor.com/Gz9oFSMBgHEAAAAM/alucard-hellsing.gif'
    },

    anaoSuperficie: {
        name: 'Anão da Superfície',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, inteligencia: 1, destreza: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Inteligência +1, Destreza −1',
        racialPowers: [
            {
                name: 'Somente o Necessário',
                desc: 'Uma vez por sessão de jogo, pode gastar uma ação completa e 1 PM para encontrar em seus equipamentos um item de valor equivalente a T$ 1d10 + seu nível. Também pode usar este poder para encontrar materiais de fabricação, mas o valor deve ser equivalente a T$ 1d6 + seu nível.'
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
        imageUrl: 'https://media.tenor.com/JlNMYAZ81AkAAAAM/senshi-senshi-of-izganda.gif'
    },

    elfoGelo: {
        name: 'Elfo-do-Gelo',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { sabedoria: 2, destreza: 1, constituicao: -1 },
        isChoice: false,
        bonusMessage: 'Sabedoria +2, Destreza +1, Constituição −1',
        racialPowers: [
            {
                name: 'Graça de Glórienn',
                desc: 'Seu deslocamento é 12m (em vez de 9m).'
            },
            {
                name: 'Herança Gélida',
                desc: 'Você recebe redução de dano de frio 10 e resistência a frio +5.'
            },
            {
                name: 'Sentidos Élficos',
                desc: 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.'
            }
        ],
        imageUrl: 'https://media1.tenor.com/m/PWv08bRvS4sAAAAd/solo-leveling.gif'
    },

    elfoSombrio: {
        name: 'Elfo-Sombrio',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { inteligencia: 2, destreza: 1, constituicao: -1 },
        isChoice: false,
        bonusMessage: 'Inteligência +2, Destreza +1, Constituição −1',
        racialPowers: [
            {
                name: 'Sentidos Élficos',
                desc: 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.'
            },
            {
                name: 'Arsenal de Tenebra',
                desc: 'Você recebe proficiência em florete, gadanho e mosquete, e +2 em testes de ataque com essas armas. Se receber proficiência em uma delas novamente, pode considerá-la uma arma leve.'
            },
            {
                name: 'Manto das Sombras',
                desc: 'Pode lançar Invisibilidade, mas apenas em si mesmo. Caso aprenda novamente essa magia, seu custo diminui em −1 PM.'
            },
            {
                name: 'Sensibilidade ao Sol',
                desc: 'Quando exposto à luz solar direta, você fica ofuscado e, a cada rodada, perde 2d6 PV por patamar de personagem.'
            }
        ],
        imageUrl: 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGk2Ymx5OWNjY3U3d2ptNnR6OWx0dm9seDBjMHIydml6OGZuaGZ6OSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QmKD87Y245tuMMvD7T/giphy.gif'
    },

    feerico: {
        name: 'Feérico',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: '-',
        attributes: {},
        bonusMessage: '+1 em Três Atributos Diferentes',
        racialPowers: [
            {
                name: 'Bênção das Fadas',
                desc: 'Escolha quatro bênçãos da lista de bênçãos feéricas disponíveis (cada uma só pode ser escolhida uma vez). Ao receber um novo poder de classe, pode trocá-lo por uma bênção adicional.'
            }
        ],
        imageUrl: 'https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUycDZhNnE3b2NraDIzem90azV2c3JxcGt1OXEzc2VxbmRtaWp4Y24xMCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/LURDTf4W7Er0KVbuH7/giphy.gif',

        calculateAttributes() {
            const attrs = { forca: 0, destreza: 0, constituicao: 0, inteligencia: 0, sabedoria: 0, carisma: 0 };
            const selectedPowers = [];

            document.querySelectorAll('.feerico-bencao:checked').forEach(cb => {
                const key = cb.dataset.key;
                const bencao = FEERICO_BENCAOS[key];
                if (!bencao) return;
                if (bencao.attr) attrs[bencao.attr] = (attrs[bencao.attr] || 0) + 1;
                selectedPowers.push({ name: bencao.name, desc: bencao.desc || '' });
            });

            const bencaoNames = selectedPowers.map(p => p.name).join(', ') || 'Nenhuma';
            document.getElementById('bonusMessage').innerHTML = `Bênçãos: ${bencaoNames}`;

            return { baseAttributes: attrs, isChoice: false, choiceCount: 0, selectedPowers };
        }
    },

    medusaDraconica: {
        name: 'Medusa Dracônica',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: 'Monstro',
        attributes: { inteligencia: 2, carisma: 1 },
        isChoice: false,
        bonusMessage: 'Inteligência +2, Carisma +1',
        racialPowers: [
            {
                name: 'Cria de Megalokk',
                desc: 'Você é uma criatura do tipo monstro e recebe visão no escuro.'
            },
            {
                name: 'Natureza Elemental',
                desc: 'Escolha um tipo de dano entre ácido, eletricidade, fogo ou frio: você recebe RD 5 desse tipo. Também pode gastar uma ação de movimento e 1 PM para encantar uma arma que esteja usando, causando +1d12 de dano do tipo escolhido, até acertar um ataque ou até o fim da cena.'
            },
            {
                name: 'Olhar Místico',
                desc: 'Pode lançar uma magia de 1º círculo à sua escolha, da energia correspondente à sua Natureza Elemental. Caso aprenda novamente essa magia, seu custo diminui em −1 PM. Não pode conjurá-la se estiver cego ou em condição semelhante.'
            }
        ],
        imageUrl: 'https://64.media.tumblr.com/9cb335cbb0b9f0c41073f720b77d0d48/3d9ec350545f656d-cd/s400x600/a4ab05b23fddf849388b9fb06f17dc828648f1d7.gifv'
    },

    teju: {
        name: 'Teju',
        type: 'dragaobrasil',
        tamanho: 'Médio', raca: 'Humanoide',
        attributes: { constituicao: 2, forca: 1, carisma: -1 },
        isChoice: false,
        bonusMessage: 'Constituição +2, Força +1, Carisma −1',
        racialPowers: [
            {
                name: 'Linguarudo',
                desc: 'Arma natural (alcance 3m, dano 1d4). Recebe +2 para desarmar e derrubar com ela. Pode gastar 1 PM para um ataque extra com a língua ao usar a ação agredir.'
            },
            {
                name: 'Mecanismo de Defesa',
                desc: 'Ao ser alvo de um acerto crítico (ou de um efeito capaz de decepar um de seus membros), pode gastar 3 PM para descolar o membro do corpo e reduzir o dano sofrido à metade. Um membro perdido dessa forma leva 2d6 dias para crescer novamente e, a critério do mestre, pode causar uma complicação que reflita a falta desse membro até lá.'
            },
            {
                name: 'Urodelo',
                desc: 'Você recebe visão na penumbra e deslocamento de escalada igual ao seu deslocamento terrestre.'
            }
        ],
        imageUrl: 'https://media.tenor.com/OOcL19tPURMAAAAM/the-lizard-marvel.gif'
    }

};

// ── EXPORTAÇÃO / MESCLAGEM COM O RACE_DATA GLOBAL ────────────
// Se racas.js já foi carregado, essas raças são adicionadas ao mesmo
// RACE_DATA global (usado pela Calculadora e pelo Compêndio de Raças).
// Se este arquivo for carregado sozinho, cria-se um RACE_DATA só com
// as raças do Dragão Brasil.
window.RACE_DATA = Object.assign(window.RACE_DATA || {}, RACE_DATA_DRAGAOBRASIL);
window.VAMPIRO_BENCAOS = VAMPIRO_BENCAOS;
window.FEERICO_BENCAOS = FEERICO_BENCAOS;
