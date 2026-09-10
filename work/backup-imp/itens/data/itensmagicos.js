// itensmagicos.js
// Baseado na Tabela 8-12: Poções (p. 341, Livro Básico Tormenta 20)

const itensMagicosData = {
    "item": [
        // Poções
        { nome: "Poção: Abençoar Alimentos (óleo)", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo mágico que purifica e abençoa alimentos e bebidas, tornando-os nutritivos e seguros para consumo." },
        { nome: "Poção: Área Escorregadia (granada)", preco: "T$ 30", tipo: "Granada", espacos: "0,5", categoria: "Item Mágico", descricao: "Granada que ao explodir cria uma área escorregadia de 3m de raio, dificultando movimento (penalidade em testes de Atletismo)." },
        { nome: "Poção: Arma Mágica (óleo)", preco: "T$ 30", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo que confere +1 em ataques e dano com a arma ungida. Efeito dura uma cena." },
        { nome: "Poção: Compreensão", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que concede compreensão mágica, permitindo entender qualquer linguagem por 1 hora." },
        { nome: "Poção: Curar Ferimentos (2d8+2 PV)", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção de cura que restaura 2d8+2 pontos de vida ao ser consumida." },
        { nome: "Poção: Disfarce Ilusório", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que cria ilusão visual, alterando a aparência do usuário por até 8 horas." },
        { nome: "Poção: Escuridão (óleo)", preco: "T$ 30", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo que ao ser aplicado gera uma zona de escuridão mágica de 6m de raio." },
        { nome: "Poção: Luz (óleo)", preco: "T$ 30", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo que emite luz intensa (como uma tocha mágica) quando aplicado." },
        { nome: "Poção: Névoa (granada)", preco: "T$ 30", tipo: "Granada", espacos: "0,5", categoria: "Item Mágico", descricao: "Granada que cria uma nuvem de névoa de 6m de raio ao explodir, reduzindo visibilidade." },
        { nome: "Poção: Primor Atlético", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que concede +2 em testes de Atletismo e Acrobacia por 1 hora." },
        { nome: "Poção: Proteção Divina", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que fornece +1 na Defesa e +1 em testes de resistência por 1 cena." },
        { nome: "Poção: Resistência a Energia", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que concede resistência 10 contra um tipo de energia escolhido por 1 cena." },
        { nome: "Poção: Sono", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que adormece criaturas em uma área de 6m de raio (Vontade CD 15 evita)." },
        { nome: "Poção: Suporte Ambiental", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que protege contra calor extremo, frio extremo ou falta de ar por 24 horas." },
        { nome: "Poção: Tranca Arcana (óleo)", preco: "T$ 30", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo que fecha e sela magicamente portas ou objetos, impedindo abertura por 1 dia." },
        { nome: "Poção: Visão Mística", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que permite ver magias e auras mágicas em um raio de 18m por 1 hora." },
        { nome: "Poção: Vitalidade Fantasma", preco: "T$ 30", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que concede 10 pontos de vida temporários que duram 1 hora." },
        { nome: "Poção: Escudo da Fé (duração cena)", preco: "T$ 120", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que cria campo de proteção divina, concedendo +2 na Defesa por uma cena completa." },
        { nome: "Poção: Alterar Tamanho", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que permite crescer ou encolher em um passo de tamanho por 1 hora." },
        { nome: "Poção: Aparência Perfeita", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que concede aparência perfeita e carismática, fornecendo +2 em Diplomacia por 1 cena." },
        { nome: "Poção: Armamento da Natureza (óleo)", preco: "T$ 270", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo que imbuí uma arma com poder natural, concedendo +1d6 de dano de impacto adicional." },
        { nome: "Poção: Bola de Fogo (granada)", preco: "T$ 270", tipo: "Granada", espacos: "0,5", categoria: "Item Mágico", descricao: "Granada explosiva que causa 5d6 de dano de fogo em área de 6m (Reflexos CD 15 reduz à metade)." },
        { nome: "Poção: Camuflagem Ilusória", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que cria ilusão visual ocultando o usuário, concedendo +5 em Furtividade por 1 cena." },
        { nome: "Poção: Concentração de Combate (duração cena)", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que melhora foco em combate, concedendo +1 em ataques e +2 na Defesa por uma cena." },
        { nome: "Poção: Curar Ferimentos (4d8+4 PV)", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção de cura potente que restaura 4d8+4 pontos de vida." },
        { nome: "Poção: Físico Divino", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que aumenta um atributo físico (For, Des ou Con) em +2 por uma cena." },
        { nome: "Poção: Mente Divina", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que aumenta um atributo mental (Int, Sab ou Car) em +2 por uma cena." },
        { nome: "Poção: Metamorfose", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que permite assumir a forma de outra criatura humanóide por 1 hora." },
        { nome: "Poção: Purificação", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que remove todos os venenos, doenças e condições negativas do usuário." },
        { nome: "Poção: Velocidade", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que concede uma ação de movimento extra por turno durante uma cena." },
        { nome: "Poção: Vestimenta da Fé (óleo)", preco: "T$ 270", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo que abençoa armaduras com energia divina, concedendo +1 na Defesa." },
        { nome: "Poção: Voz Divina", preco: "T$ 270", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que amplifica a voz, concedendo +2 em Intimidação e Diplomacia por 1 cena." },
        { nome: "Poção: Arma Mágica +3 (óleo)", preco: "T$ 750", tipo: "Óleo", espacos: "0,5", categoria: "Item Mágico", descricao: "Óleo mágico que confere +3 em ataques e dano com a arma ungida. Efeito dura uma cena." },
        { nome: "Poção: Curar Ferimentos (7d8+7 PV)", preco: "T$ 1.080", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção de cura muito potente que restaura 7d8+7 pontos de vida." },
        { nome: "Poção: Físico Divino (três atributos)", preco: "T$ 1.080", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que aumenta os três atributos físicos (For, Des e Con) em +2 cada por uma cena." },
        { nome: "Poção: Invisibilidade (duração cena)", preco: "T$ 1.080", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção que torna o usuário invisível por uma cena completa (ataques quebram o efeito)." },
        { nome: "Poção: Bola de Fogo Aprimorada (granada)", preco: "T$ 1.470", tipo: "Granada", espacos: "0,5", categoria: "Item Mágico", descricao: "Granada explosiva potente que causa 10d6 de dano de fogo em área de 6m (Reflexos CD 18 reduz à metade)." },
        { nome: "Poção: Curar Ferimentos (11d8+11 PV)", preco: "T$ 3.000", tipo: "Poção", espacos: "0,5", categoria: "Item Mágico", descricao: "Poção de cura lendária que restaura 11d8+11 pontos de vida." },

        // Armas Especificas
        { nome: "Azagaia dos Relâmpagos", preco: "T$ 30.000", tipo: "Arma Mágica Maior", espacos: "1", categoria: "Item Mágico", descricao: "Quando arremessada, esta azagaia se transforma em um Relâmpago (8d6 de dano de eletricidade numa linha com alcance médio; CD For ou Des a sua escolha). Quando atinge o fim do alcance ela volta a ser uma azagaia e volta para você no fim do turno." },
        {
            nome: "Espada Baronial",
            preco: "T$ 30.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Esta espada longa de guarda reta fornece +1 em testes de ataque e rolagens de dano. Este bônus aumenta em +1 se você possuir um código de conduta (de honra, do herói...), for devoto de Khalmyr ou for treinado em Nobreza. Os bônus são cumulativos — um personagem com um código de conduta, devoto de Khalmyr e treinado em Nobreza recebe +4 em ataque e dano.",
            imagem: "data/img/espada-baronial.webp"
        },
        {
            nome: "Lâmina da Luz",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "De lâmina prateada e reluzente, esta espada bastarda formidável é concedida a cavaleiros da Luz de honra e virtude comprovadas. Você pode gastar uma ação de movimento e 2 PM para erguer a lâmina da luz acima de sua cabeça. Se fizer isso, ela irradia luz brilhante em alcance médio até o fim da cena. Todos os inimigos dentro da luz ficam ofuscados.",
            imagem: "data/img/lamina-da-luz.webp"
        },
        {
            nome: "Lança Animalesca",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Espinhos e folhas vivas brotam desta lança formidável. Se você usar a habilidade Forma Selvagem, aplica o bônus de +2 em ataque e dano da lança animalesca em suas armas naturais.",
            imagem: "data/img/lanca-animalesca.webp"
        },
        {
            nome: "Maça do Terror",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Esta maça formidável é feita com um osso e um crânio e permite que você lance a magia Amedrontar (CD For ou Car a sua escolha). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM.",
            imagem: "data/img/maca-do-terror.webp"
        },
        {
            nome: "Florete Fugaz",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Este florete formidável tem o cabo e a guarda trabalhados com prata e pedrarias. Quando usa a ação agarrir, você pode gastar 1 PM. Se fizer isso e acertar um crítico no turno, pode fazer um ataque adicional contra a mesma criatura.",
            imagem: "data/img/florete-fugaz.webp"
        },
        {
            nome: "Cajado da Destruição",
            preco: "T$ 60.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Este bordão formidável escuro e reforçado com ponteiras de metal é procurado por conjuradores de batalha. Conta como um cajado arcano. Além dos benefícios desse esotérico, quando você lança uma magia de dano, ela causa +1 ponto de dano por dado.",
            imagem: "data/img/cajado-da-destruicao.webp"
        },
        {
            nome: "Cajado da Vida",
            preco: "T$ 60.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Este bordão formidável branco com runas prateadas é valorizado por curandeiros. Conta como um cajado arcano, mas afeta magias divinas. Além disso, quando você lança uma magia de cura, ela cura +2 pontos de vida por dado.",
            imagem: "data/img/cajado-da-vida.webp"
        },
        {
            nome: "Machado Silvestre",
            preco: "T$ 70.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "O cabo e a lâmina deste machado de batalha formidável são cobertos de gravuras representando plantas e animais selvagens. Quando você usa o machado silvestre em um ambiente ermo e ao ar livre, causa +1d8 de dano e recebe o poder Trespassar. Caso já possua este poder, pode utilizá-lo sem pagar pontos de mana.",
            imagem: "data/img/machado-silvestre.webp"
        },
        {
            nome: "Martelo de Doherimm",
            preco: "T$ 70.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Este martelo de guerra formidável é feito de pedra e aço. Quando empunhado por um anão, adquire o encanto arremesso e aumenta seu dano em +1d8 (ou +2d8 se usado contra criaturas Grandes ou maiores).",
            imagem: "data/img/martelo-de-doherimm.webp"
        },
        {
            nome: "Arco do Poder",
            preco: "T$ 90.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "O arco do poder conta como um arco longo formidável, mas parece apenas o corpo de um arco — não tem corda e não aceita flechas. Contudo, quando você o empunha e faz o gesto de puxar a corda inexistente, o arco cria uma corda e uma flecha de energia dourada. O arco do poder é capaz de ler suas intenções, produzindo diferentes tipos de flechas energéticas a sua escolha: Flecha Normal (3d8 pontos de dano de essência), Flecha Piedosa (4d8 pontos de dano de essência não letal), Flecha Explosiva (3d6 pontos de dano de fogo no alvo e em todas as criaturas adjacentes a ele, Ref CD Des para reduzir à metade), Flecha-Rede (não causa dano, mas deixa a vítima agarrada por uma rede de energia; CD 25 Força ou Acrobacia para se soltar; a rede se dissipa quando a criatura se solta ou no fim da cena).",
            imagem: "data/img/arco-poder.webp"
        },
        {
            nome: "Língua do Deserto",
            preco: "T$ 90.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Esta cimitarra formidável é originária do Deserto da Perdição. Você pode gastar uma ação de movimento e 1 PM para transformar a lâmina dela em chamas até o fim da cena. Nessa condição, o dano da arma aumenta em um passo e passa a ser do tipo fogo. Você pode gastar uma ação de movimento e 2 PM para fazer as chamas brilharem com muita força. Isso deixa os inimigos em alcance curto desprevenidos por uma rodada.",
            imagem: "data/img/lingua-do-deserto.webp"
        },
        {
            nome: "Besta Explosiva",
            preco: "T$ 100.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Esta besta pesada formidável é feita de madeira escurecida, similar a carvão. Quando usa uma besta explosiva, você pode gastar 3 PM para transformar o virote disparado por ela em uma Bola de Fogo. Você pode mirar esta Bola de Fogo em uma criatura ou em um ponto em alcance médio. No primeiro caso, faça um ataque contra o alvo. Se acertar, ele sofre o dano do disparo mais 6d6 de fogo. Além disso, todas as criaturas a até 6m do alvo sofrem 6d6 pontos de dano de fogo (Ref CD Des reduz à metade). Porém, se o ataque errar, o virote se desfaz em uma nuvem de cinzas inofensivas. No segundo caso, ela funciona como a magia de mesmo nome. Nenhum teste de ataque é necessário e todas as criaturas a 6m do ponto escolhido sofrem 6d6 pontos de dano de fogo (Ref reduz à metade).",
            imagem: "data/img/besta-explosiva.webp"
        },
        {
            nome: "Punhal Traidor",
            preco: "T$ 100.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Adaga +4 envenenada; ao atingir, o alvo sofre 1d6 de dano por veneno por rodada (Fortitude CD 18 anula).",
            imagem: "data/img/adaga.webp"
        },
        {
            nome: "Espada Sortuda",
            preco: "T$ 110.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Esta espada curta formidável é cravejada de brilhantes. Você recebe +2 nos testes de resistência e, quando faz um teste, pode gastar 3 PM para rolá-lo novamente. Se possuir o poder Sortudo, em vez disso seu custo diminui em –1 PM.",
            imagem: "data/img/espada-sortuda.webp"
        },
        {
            nome: "Avalanche",
            preco: "T$ 140.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Este machado de guerra de gelo eterno congelante formidável fornece redução de fogo 10. Você pode gastar uma ação padrão e 6 PM para brandi-lo acima de sua cabeça e invocar uma tempestade de gelo que afeta alcance curto ao seu redor. Criaturas na área recebem camuflagem leve e sofrem 3d6 pontos de dano de impacto e 3d6 pontos de frio por rodada. Você não sofre os efeitos nocivos da tempestade (o dano e a chance de falha pela camuflagem) e pode gastar 1 PM no início de cada um de seus turnos para mantê-la.",
            imagem: "data/img/avalanche.webp"
        },
        {
            nome: "Cajado do Poder",
            preco: "T$ 180.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Este bordão defensor magnificent tem cabo reto e liso, com uma joia cintilante na ponta. Conta como um cajado arcano. Além dos benefícios desse esotérico, o custo de suas magias arcanas diminui em –1 PM (cumulativo com Mestre em Escola) e a CD para resistir a elas aumenta em +2 (para um aumento total de +3).",
            imagem: "data/img/cajado-do-poder.webp"
        },
        {
            nome: "Vingadora Sagrada",
            preco: "T$ 200.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "2",
            descricao: "Esta espada longa formidável revela todo o seu poder apenas quando empunhada por um paladino. Se você for um paladino, recebe +5 em testes de ataque e rolagens de dano, o custo de seu Golpe Divino é reduzido em –1 PM e você e seus aliados em alcance curto recebem resistência a magia +5.",
            imagem: "data/img/vingadora-sagrada.webp"
        },
        {
            nome: "Punhal Sszzaazita",
            preco: "T$ 90.000",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            espacos: "1",
            descricao: "Esta adaga assassina formidável venenosa tem lâmina negra e ondulada. Você pode gastar uma ação padrão e 2 PM para transformar o punhal sszzaazita em um objeto inofensivo de tamanho similar, como uma colher ou pena. Nenhuma magia é capaz de detectar essa transformação. Transformar o punhal em arma é uma ação livre.",
            imagem: "data/img/adaga.webp"
        },

        // Armaduras Específicas
        {
            nome: "Cota Élfica",
            preco: "T$ 30.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "2",
            descricao: "Composta de anéis finíssimos, esta cota de malha defensora de mitral parece ser feita de seda. Ela permite que você aplique sua Destreza na Defesa como se fosse uma armadura leve.",
            imagem: "data/img/cota-elfica.webp"
        },
        {
            nome: "Couro de Monstro",
            preco: "T$ 36.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "2",
            descricao: "Usado por chefes bárbaros das Montanhas Sanguinárias, este gibão de peles defensor é feito do couro de monstros, como basiliscos e serpes. Se você usar o poder Ataque Poderoso ou fazer uma investida, recebe um bônus de +2d6 nas rolagens de dano.",
            imagem: "data/img/couro-de-monstro.webp"
        },
        {
            nome: "Escudo do Conjurador",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágica Maior",
            espacos: "1",
            descricao: "Este escudo leve defensor tem uma pequena tira de couro na parte interna, sobre a qual um conjurador pode lançar uma magia. A magia não surte efeito na hora; em vez disso, fica inscrita na tira. A tira pode então ser lida como um pergaminho, descargando a magia em seus alvos/área. Uma vez que a magia seja descarregada, outra pode ser armazenada.",
            imagem: "data/img/escudo-do-conjurador.webp"
        },
        {
            nome: "Loriga do Centurião",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Esta loriga segmentada defensora é dourada com detalhes em vermelho e possui o símbolo de Tauron, antigo Deus da Força, gravado no peitoral. Se estiver liderando uma ou mais criaturas (em termos de jogo, se estiver usando o poder Comandar ou similar), seus ataques corpo a corpo causam +2d6 de fogo.",
            imagem: "data/img/loriga-do-centuriao.webp"
        },
        {
            nome: "Manto da Noite",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "2",
            descricao: "Este couro batido ajustado defensor sombrio é negro com partes metálicas foscas. Quando usa esta armadura, você não sofre penalidade em testes de Furtividade por se mover em seu deslocamento normal e a penalidade que você sofre em testes de Furtividade por atacar diminui para –10.",
            imagem: "data/img/manto-da-noite.webp"
        },
        {
            nome: "Couraça do Comando",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Esta couraça banhada a ouro sob medida defensora irradia uma aura de autoridade. Você recebe +1 em Carisma. Se usar o poder Comandar, o bônus fornecido aumenta para +2.",
            imagem: "data/img/couraca-do-comando.webp"
        },
        {
            nome: "Baluarte Anão",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Esta armadura completa reforçada defensora de adamante fornece proteção sem igual. Se você não se deslocar em seu turno, a RD que ela fornece aumenta para 10 até seu próximo turno.",
            imagem: "data/img/baluarte-anao.webp"
        },
        {
            nome: "Escudo Espinhoso",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágica Maior",
            espacos: "2",
            descricao: "Este escudo pesado defensor é coberto de espinhos. Você pode gastar uma ação de movimento e 2 PM para disparar um espinho em um alvo em alcance curto. O espinho acerta automaticamente e causa 1d10+2 pontos de dano de perfuração.",
            imagem: "data/img/escudo-espinhoso.webp"
        },
        {
            nome: "Escudo do Leão",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágica Maior",
            espacos: "2",
            descricao: "Este escudo pesado defensor é forjado como uma cabeça de leão rugindo. Uma vez por rodada, você pode gastar 2 PM para fazer a cabeça criar vida e morder uma criatura adjacente. A mordida acerta automaticamente e causa 2d6+2 pontos de dano de perfuração.",
            imagem: "data/img/escudo-do-leao.webp"
        },
        {
            nome: "Carapaça Demoníaca",
            preco: "T$ 63.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Esta armadura completa macabra reforçada guardiã é forjada para fazer com que o usuário pareça um demônio — o elmo tem o formato de uma cabeça demoníaca com chifres e o usuário enxerga através da boca aberta e repleta de dentes. Se você for devoto de uma divindade que canaliza apenas energia negativa, os seus ataques corpo a corpo causam +1d8 de dano de trevas.",
            imagem: "data/img/carapaca-demoniaca.webp"
        },
        {
            nome: "Escudo do Eclipse",
            preco: "T$ 70.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágica Maior",
            espacos: "2",
            descricao: "Este escudo pesado defensor é completamente negro e parece absorver a luz. Ele fornece redução de trevas 10 e causa +1d8 de dano de trevas num ataque. Além disso, você pode gastar uma ação de movimento e 2 PM para lançar Escuridão.",
            imagem: "data/img/escudo-do-eclipse.webp"
        },
        {
            nome: "Escudo do Deus do Sol",
            preco: "T$ 140.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágica Maior",
            espacos: "2",
            descricao: "Escudo +5 banhado em luz solar; reflete magias de trevas e causa 3d6 de dano de luz em mortos-vivos adjacentes.",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Escudo de Azgher",
            preco: "T$ 100.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágica Maior",
            espacos: "2",
            descricao: "Este escudo pesado guardião é forjado na forma de um sol estilizado. Você pode gastar uma ação padrão e 10 PM para fazê-lo emitir uma luz brilhante e quente num cone com alcance curto. A luz gera os efeitos da magia Visão da Verdade e causa 6d6 pontos de dano de fogo em todos os seus inimigos (mortos-vivos e criaturas vulneráveis a luz solar sofrem 6d8 pontos de dano). Você pode gastar 1 PM no início de cada um de seus turnos para manter a luz.",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Armadura da Luz",
            preco: "T$ 150.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Esta armadura completa banhada a ouro reforçada guardiã zelosa possui o símbolo de Khalmyr gravado no peitoral. Se você possuir um código de conduta (de honra, do herói...) ou for devoto de uma divindade que canaliza apenas energia positiva, recebe redução de dano igual ao seu Carisma.",
            imagem: "data/img/armadura-da-luz.webp"
        },
        {
            nome: "Couro de Monstro",
            preco: "T$ 36.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "2",
            descricao: "Feita de peles e escamas de bestas mágicas; concede resistência 10 a um tipo de energia.",
            imagem: "data/img/couro-de-monstro.webp"
        },
        {
            nome: "Escudo do Conjurador",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            espacos: "1",
            descricao: "Concede +2 na Defesa e permite ignorar a chance de falha arcana ao conjurar magias com escudo.",
            imagem: "data/img/escudo-do-conjurador.webp"
        },
        {
            nome: "Loriga do Centurião",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Armadura de escamas +3 que concede +2 em testes de Guerra e Intimidação.",
            imagem: "data/img/loriga-do-centuriao.webp"
        },
        {
            nome: "Manto da Noite",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "2",
            descricao: "Manto encantado que funciona como armadura leve +3 e concede invisibilidade em áreas de escuridão.",
            imagem: "data/img/manto-da-noite.webp"
        },
        {
            nome: "Couraça do Comando",
            preco: "T$ 45.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Couraça +3 que concede +2 em testes de Carisma e permite inspirar aliados como uma ação de movimento.",
            imagem: "data/img/couraca-do-comando.webp"
        },
        {
            nome: "Baluarte Anão",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            espacos: "5",
            descricao: "Escudo pesado +3 feito de aço anão; concede RD 5 e vantagem em testes de resistência contra efeitos de empurrão.",
            imagem: "data/img/baluarte-anao.webp"
        },
        {
            nome: "Escudo Espinhoso",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            espacos: "2",
            descricao: "Escudo +3 coberto de espinhos; causa 1d6 de dano de perfuração em quem ataca corpo a corpo.",
            imagem: "data/img/escudo-espinhoso.webp"
        },
        {
            nome: "Escudo do Leão",
            preco: "T$ 50.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            espacos: "2",
            descricao: "Escudo +3 com símbolo de leão; pode rugir uma vez por dia, apavorando inimigos próximos (Vontade CD 20).",
            imagem: "data/img/escudo-do-leao.webp"
        },
        {
            nome: "Carapaça Demoníaca",
            preco: "T$ 63.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Armadura de placas +4 feita de ossos infernais; concede resistência 10 a fogo e +2 em testes de Intimidação.",
            imagem: "data/img/carapaca-demoniaca.webp"
        },
        {
            nome: "Escudo do Eclipse",
            preco: "T$ 70.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            espacos: "2",
            descricao: "Escudo +4 que pode gerar uma área de escuridão mágica uma vez por dia.",
            imagem: "data/img/escudo-do-eclipse.webp"
        },
        {
            nome: "Escudo do Deus do Sol",
            preco: "T$ 140.000",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            espacos: "2",
            descricao: "Escudo +5 banhado em luz solar; reflete magias de trevas e causa 3d6 de dano de luz em mortos-vivos adjacentes.",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Armadura da Luz",
            preco: "T$ 150.000",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            espacos: "5",
            descricao: "Armadura completa +5 que emite luz intensa e concede imunidade a dano de trevas e a cegueira.",
            imagem: "data/img/armadura-da-luz.webp"
        },

        // acessórios Menores

        { nome: "Anel do Sustento", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Você não precisa comer ou beber e precisa dormir apenas duas horas por noite para descansar. Os efeitos do anel só se ativam após uma semana de uso." },
        { nome: "Bainha Mágica", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Esta bainha de couro curtido e prata muda de tamanho para acomodar qualquer arma corpo a corpo. Você pode lançar Arma Mágica em qualquer arma na bainha sem pagar seu custo em PM." },
        { nome: "Corda da Escalada", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Esta corda de 15m é bastante fina, mas forte o suficiente para suportar até seis criaturas Médias (ou 120 espaços). Com um comando (uma ação de movimento), a corda se move em qualquer direção (incluindo para cima) a 3m por rodada, fixando-se firmemente onde você quiser. Ela pode se desamarrar e voltar da mesma forma." },
        { nome: "Ferraduras da Velocidade", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "—", descricao: "Este conjunto de ferraduras pode ser fixado nos cascos de um cavalo (ou outro parceiro montaria, a critério do mestre) para aumentar seu deslocamento em +3m." },
        { nome: "Garrafa da Fumaça Eterna", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Você pode abrir a tampa desta ânfora de metal para lançar a magia Névoa sem pagar seu custo em PM. A fumaça persiste até a garrafa ser tampada. Após isso, dissipa-se no fim da cena (ou após 4 rodadas, sob vento forte, ou 1 rodada, sob um vendaval)." },
        { nome: "Gema da Luminosidade", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Este cristal tem a aparência de um longo prisma. Com um comando, emite luz equivalente a uma tocha ou então um raio brilhante, que deixa uma criatura em alcance curto cega por 1d4 rodadas (Fort CD Car evita)." },
        { nome: "Manto Élfico", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Indistinguível de um manto cinza comum. Entretanto, quando usado com o capuz cobrindo o rosto, fornece +5 em Furtividade." },
        { nome: "Mochila de Carga", preco: "T$ 3.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "0", descricao: "Este item, que parece uma simples mochila de pano, está na verdade ligado a um espaço interdimensional — fazendo com que seja maior por dentro do que por fora. A mochila de carga aumenta sua capacidade de carga em 10 espaços (ela própria não gasta um espaço). Se a mochila for rasgada, os objetos em seu interior são destruídos. Criaturas vivas colocadas no interior da mochila podem sobreviver até 10 minutos, mas depois disso ficarão sem ar." },
        { nome: "Brincos da Sagacidade", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Este par de brincos de safira aguça o raciocínio. Você recebe +1 em Inteligência (somente após um dia de uso)." },
        { nome: "Luvas da Delicadeza", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Estas luvas de tecido fino permitem manipulação delicada. Você recebe +1 em Destreza (somente após um dia de uso)." },
        { nome: "Manoplas da Força do Ogro", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Este par de luvas é feito de couro grosso com rebites de ferro. Você recebe +1 em Força (somente após um dia de uso)." },
        { nome: "Manto da Resistência", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Este manto de tecido grosso e pesado protege seu usuário. Você recebe +2 em testes de resistência." },
        { nome: "Manto do Fascínio", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Este manto de veludo possui bordados de ouro. Você recebe +1 em Carisma (somente após um dia de uso)." },
        { nome: "Torque do Vigor", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "O acabamento deste colar ou bracelete remete a um animal poderoso, como um urso ou lobo. Você recebe +1 em Constituição (somente após um dia de uso)." },
        { nome: "Flauta Fantasma", preco: "T$ 6.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Se for treinado em Atuação, você pode lançar Esculpir Sons (CD Car) sem pagar seu custo em PM." },
        { nome: "Lanterna da Revelação", preco: "T$ 9.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Este item funciona como um lampião normal, mas sua luz revela todas as criaturas e objetos invisíveis no alcance." },
        { nome: "Anel do Escudo Mental", preco: "T$ 9.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Você recebe imunidade a magias de adivinhação." },
        { nome: "Pingente da Saúde", preco: "T$ 9.000", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "O usuário desta joia verde em um cordão de prata recebe imunidade a doenças e venenos. Os efeitos só se ativam após uma semana de uso." },
        { nome: "Pingente da Sensatez", preco: "T$ 4.500", categoria: "Item Mágico", tipo: "Acessório Menor", espacos: "1", descricao: "Esta pequena pérola com uma corrente leve é usada como um colar. Você recebe +1 em Sabedoria (somente após um dia de uso)." },


        // Acessórios Médios

        { nome: "Anel de Telecinesia", preco: "T$ 10.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você pode lançar Telecinesia (CD Int). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM." },
        { nome: "Bola de Cristal", preco: "T$ 10.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Esta pequena esfera revela pessoas e lugares distantes. Olhar através dela é uma ação completa e gera a magia Vidência (CD Sab)." },
        { nome: "Caveira Maldita", preco: "T$ 10.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Esta pedra esculpida em formato de crânio gera o efeito da magia Profanar, com o crânio como ponto de origem. Mortos-vivos e devotos de deuses que canalizam apenas energia negativa na área de efeito recebem +2 em testes e Defesa." },
        { nome: "Botas Aladas", preco: "T$ 15.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você pode gastar 2 PM para fazer asas brotarem dos calcanhares destas botas e receber deslocamento de voo 12m por uma rodada. Você pode gastar 1 PM no início de cada um de seus turnos para manter esse efeito." },
        { nome: "Botas Velozes", preco: "T$ 15.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você recebe +3m em seu deslocamento e pode lançar Velocidade (apenas sobre você mesmo)." },
        { nome: "Anel da Proteção", preco: "T$ 10.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Este anel desvia ataques contra seu usuário. Você recebe +2 de Defesa." },
        { nome: "Braceletes de Bronze", preco: "T$ 15.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Estes braceletes geram um campo de força invisível, porém tangível. Você recebe +4 na Defesa, cumulativo com outros itens mágicos, mas não com armaduras." },
        { nome: "Anel da Energia", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você recebe +5 PM (somente após um dia de uso)." },
        { nome: "Anel da Vitalidade", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você recebe +10 PV (somente após um dia de uso)." },
        { nome: "Manto da Invisibilidade", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Permite ficar invisível por uma cena, até realizar uma ação hostil." },
        { nome: "Braçadeiras do Arqueiro", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você recebe +2 em rolagens de dano com armas de ataque à distância (cumulativo com outros itens)." },
        { nome: "Brincos da Deusa da Paz", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Permitem lançar Curar Ferimentos Leves 3/dia." },
        { nome: "Brincos de Marah", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Este par de brincos brancos é abençoado pela Deusa da Paz. A primeira criatura que o atacar em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá a ação. Se você atacar uma criatura, o efeito dos brincos é cancelado por um dia. Se você possuir Aparência Inofensiva (ou um poder similar) os efeitos acumulam, afetando as duas primeiras criaturas que o atacarem em uma cena." },
        { nome: "Chapéu do Disfarce", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Você pode lançar Disfarce Ilusório (CD Car), com o aprimoramento que inclui odores e sensações e muda o bônus em Enganação para disfarces para +20, sem pagar seu custo em PM. Você não pode usar outros aprimoramentos. Como parte do disfarce, o chapéu pode mudar para um elmo, faixa, tiara, gorro, touca e assim por diante." },
        { nome: "Faixas do Pugilista", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Estas faixas surradas são amarradas nos punhos, nos braços ou na testa. Você recebe +2 em testes de ataque e rolagens de dano com ataques desarmados (cumulativo com outros itens)." },
        { nome: "Manto da Aranha", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Este manto é feito de seda negra com fios de prata bordados. Você recebe deslocamento de escalada igual ao seu deslocamento terrestre, +5 em testes de resistência contra venenos e imunidade a teias mundanas ou mágicas. Além disso, pode lançar Teia (CD Des). Caso já conheça a magia, o custo para lançá-la diminui em –1 PM." },
        { nome: "Vassoura Voadora", preco: "T$ 21.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "—", descricao: "Como um tapete voador, mas pode carregar duas pessoas (ou 40 espaços)." },
        { nome: "Amuleto da Robustez", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Este disco com corrente de ouro é usado como um colar. Você recebe +2 em Constituição (somente após um dia de uso)." },
        { nome: "Cinto da Força do Gigante", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Este cinto largo é feito de couro com rebites de ferro. Você recebe +2 em Força (somente após um dia de uso)." },
        { nome: "Coroa Majestosa", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Esta coroa de ouro possui dezenas de pedras preciosas. Você recebe +2 em Carisma (somente após um dia de uso)." },
        { nome: "Estola da Serenidade", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Esta faixa de pano com inscrições mágicas é usada sobre a nuca, com as duas extremidades caindo na frente do corpo. Você recebe +2 em Sabedoria (somente após um dia de uso)." },
        { nome: "Manto do Morcego", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Este manto marrom escuro ou negro fornece +5 em Furtividade e permite que você fique pendurado de ponta-cabeça no teto, como um morcego. Além disso, você pode gastar uma ação padrão para segurar as pontas do manto e se transformar em um morcego. Seu tamanho muda para Minúsculo e você recebe deslocamento de voo 12m e uma arma natural de mordida (dano 1d4, perfuração). Em outros aspectos, isso funciona como a Forma Selvagem do druida. Você só pode se transformar em morcego à noite ou em ambientes escuros." },
        { nome: "Pulseiras da Celeridade", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Esta pulseira de platina aguça todos os seus movimentos. Você recebe +2 em Destreza (somente após um dia de uso)." },
        { nome: "Tiara da Sapiencia", preco: "T$ 25.500", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Esta tiara delicada possui uma gema que descansa sobre a testa. Você recebe +2 em Inteligência (somente após um dia de uso)." },

        { nome: "Elmo de Teletransporte", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Você pode lançar Salto Dimensional e Teletransporte, mas apenas em você mesmo. Caso já conheça as magias, o custo para lançá-las diminui em –1 PM." },
        { nome: "Gema da Telepatia", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Você pode lançarnCompreensão e Enfeitiçar (CD Car) sem pagar seu custo em PM." },
        { nome: "Gema Elemental", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Você pode lançar Conjurar Elemental sem pagar seu custo em PM." },
        { nome: "Manual da Saúde Corporal", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este tomo volumoso contém exercícios de resistência e dietas saudáveis, mas suas palavras trazem um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Constituição." },
        { nome: "Manual do Bom Exercício", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este tomo volumoso contém exercícios de musculação, mas escondido entre as palavras há um poderoso efeito mágico. Ler o livro leva uma semana e aumenta seu valor de Força em +1 permanentemente (o atributo só pode ser aumentado uma vez com um Manual). Assim que o livro é lido, a magia desaparece de suas páginas e ele se torna um item mundano." },
        { nome: "Manual dos Movimentos Precisos", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este tomo volumoso descreve exercícios de coordenação e equilíbrio, mas mesclado às palavras há um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Destreza." },
        { nome: "Medalhão de Lena", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Quando você é reduzido a 0 ou menos PV, esta joia emite uma explosão de energia positiva que cura 100 PV (antes que você caia). Este poder só se ativa uma vez por dia." },
        { nome: "Medalhão da Deusa da Vida", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Permite usar a magia Curar Ferimentos Graves uma vez por dia." },
        { nome: "Tomo da Compreensão", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este livro volumoso contém ensinamentos para tornar o leitor mais centrado e aguçar sua percepção, mas também possui um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Sabedoria." },
        { nome: "Tomo da Liderança e Influência", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este livro de encadernação luxuosa contém instruções detalhadas para convencer e inspirar os demais, mas as páginas escondem um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Carisma." },
        { nome: "Tomo dos Grandes Pensamentos", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este livro pesado contém exercícios para aprimorar o raciocínio e a memória, mas mesclado às palavras há um poderoso efeito mágico. Funciona como um Manual do Bom Exercício, mas fornece +1 de Inteligência." },
        { nome: "Anel Refletor", preco: "T$ 51.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este aro de platina é poderoso contra conjuradores. Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao seu conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela." },
        { nome: "Cinto do Campeão", preco: "T$ 51.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este cinturão de ouro é cravejado de joias e possui gravuras de gladiadores e pugilistas minotauros. Você recebe +1 em Força e a habilidade Briga (somente após um dia de uso). Caso já a possua, seu dano desarmado será calculado como se você possuísse quatro níveis de lutador a mais (máximo 2d12). Por fim, caso possua o poder Torcida, o bônus que você recebe por ele aumenta para +3. Estes cintos eram dados aos vencedores dos jogos gladiatoriais do Império de Tauron." },
        { nome: "Colar Guardião", preco: "T$ 51.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este diamante lapidado preso em uma corrente de platina deflete ataques contra seu usuário. Você recebe +5 na Defesa." },
        { nome: "Estatueta Animista", preco: "T$ 51.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Esta estatueta de pedra é esculpida na forma de um animal. Quando é atirada no chão e a palavra de comando é proferida, transforma-se no animal correspondente. O animal fornece os benefícios de um parceiro veterano até o fim da cena, quando então volta à sua forma de estatueta. O tipo de parceiro é definido pelo animal: raposa (ajudante), onça (assassino), águia (atirador), lobo (combatente), leão (fortão) ou urso (guardião)." },
        { nome: "Anel da Liberdade", preco: "T$ 64.500", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Forjado em ouro, esteanel é uma relíquia da Igreja de Valkaria. Você fica permanentemente sob efeito de Libertação." },
        { nome: "Tapete Voador", preco: "T$ 64.500", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "2", descricao: "Com um comando, este tapete flutua, fornecendo deslocamento de voo 12m. O tapete tem 3m x 3m e pode carregar seis criaturas Médias (ou 120 espaços). Se você estiver em alcance longo do tapete, pode comandar o voo dele." },
        { nome: "Braceletes de Ouro", preco: "T$ 64.500", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Como braceletes de bronze, mas fornece +8 na Defesa, não cumulativo com braceletes de bronze." },
        { nome: "Espelho da Oposição", preco: "T$ 79.500", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "—", descricao: "Este item lembra um espelho normal com cerca de 1m de comprimento e 1,5m de altura. Pode ser fixado em qualquer superfície e ativado (ou desativado) com um comando. Quando uma criatura observa seu reflexo, o espelho cria uma cópia sua, com as mesmas habilidades e equipamento. A duplicata ataca a criatura original; quando um dos dois é derrotado, a duplicata e seus itens desaparecem." },
        { nome: "Robe do Arquimago", preco: "T$ 79.500", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Este traje pesado alinha-se com as energias arcanas emitidas por seu usuário para gerar um campo protetor. Se você for um conjurador arcano, recebe um bônus na Defesa igual a 5 + o círculo de magia mais alto que puder lançar e um bônus em testes de resistência igual à metade do bônus na Defesa. Assim, um arcanista de 9º nível (capaz de lançar magias de 3º círculo) recebe +8 na Defesa e +4 em testes de resistência." },
        { nome: "Orbe das Tempestades", preco: "T$ 79.500", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Esta esfera de vidro com 20cm de diâmetro contém fumaça e raios em seu interior. Você pode lançar Controlar o Clima e Fúria do Panteão (CD Sab). Caso já conheça as magias, o custo para lançá-las diminui em –1 PM. Além disso, você e todos os seus aliados adjacentes ficam sob efeito de Suporte Ambiental." },
        { nome: "Símbolo Abençoado", preco: "T$ 15.000", categoria: "Item Mágico", tipo: "Acessório Médio", espacos: "1", descricao: "Conta como um símbolo sagrado. Se você for devoto do deus, o custo de suas magias divinas diminui em –1 PM (cumulativo com o poder Símbolo Sagrado Energizado). Apenas devotos desse deus podem fabricar um símbolo abençoado." },
        { nome: "Anel da Regeneração", preco: "T$ 150.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Você recebe Cura Acelerada 5 (somente após um dia de uso)." },
        { nome: "Anel de Invisibilidade", preco: "T$ 30.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "1", descricao: "Ao colocar este anel de prata, você fica sob efeito de Invisibilidade. O efeito termina se você fizer um ataque ou lançar uma magia ofensina, mas você pode tirar e recolocar o anel (uma ação padrão) para que ele volte a funcionar." },
        { nome: "Espelho do Aprisionamento", preco: "T$ 150.000", categoria: "Item Mágico", tipo: "Acessório Maior", espacos: "—", descricao: "Este item de cristal, com 1,5m de altura e moldura de metal, pode ser fixado em qualquer superfície e ativado (ou desativado) com um comando. Qualquer criatura que se aproxime a alcance curto do espelho do aprisionamento e enxergue seu próprio reflexo deve passar em um teste de Reflexos (CD Int) ou será transportada magicamente para um espaço extradimensional dentro do espelho, ficar presa ali. O tamanho da criatura não importa — mas construtos, mortos-vivos e objetos não podem ser transportados. Com um comando, é possível conversar com uma criatura presa no espelho ou libertá-la. Se o espelho for quebrado, todas as criaturas dentro dele são libertadas." },

        // (Itens de Coração de Rubi - Aventura 6)

        {
            nome: "Pingente da Sereia Adormecida",
            preco: "T$ 3.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: "Menor. Uma pérola enorme e brilhante. Seu usuário se torna imune a sono e sua recuperação de PV e PM é sempre confortável. O usuário pode gastar uma ação de movimento e 1 PM para remover uma condição de fadiga (alcance curto).",
            fonte: "Coração de Rubi",
            imagem: "data/img/pingente.webp"
        },
        {
            nome: "Cálices Encantados de Mulk",
            preco: "T$ 7.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Um par de cálices de vidro. Um cálice torna venenoso qualquer líquido (Fortitude CD Int, ou enjoado e 4d12 PV por veneno/rodada por 10 rodadas). O outro cálice transforma líquido em antídoto.",
            fonte: "Coração de Rubi"
        },
        {
            nome: "Adaga do Último Suspiro",
            preco: "T$ 70.000",
            dano: "1d4",
            critico: "19",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Arma específica. É uma adaga formidável (+2), assassina (+2d6) e sanguinária (cura metade do dano). Você pode gastar 2 PM para tocar em um cadáver e ver a última cena vista por esta criatura antes de morrer.",
            fonte: "Coração de Rubi",
            imagem: "data/img/adaga.webp"
        },
        {
            nome: "Manoplas do Mestre Moldador",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Manoplas de couro avermelhado. Permitem que o usuário molde rocha e minérios comuns. Você pode lançar Transmutar Objetos (aprimoramento +3 PM: muda execução para ação completa e duração para permanente). Se já conhece a magia, custo diminui em –1 PM.",
            fonte: "Coração de Rubi"
        },

        // (Itens de Ameaças de Arton)
        {
            nome: "Armadura do Devorador",
            preco: "T$ 54.000",
            espacos: "—",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: "Simbionte (Elmo). Invocar é ação livre (perde 1d4 PV). Funciona como uma armadura completa espinhosa selada sob medida de matéria vermelha (não requer proficiência). Usuário não precisa respirar. Ativa-se como reação ao sofrer dano (Vontade CD 10 + dano evita).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Asas do Devorador",
            preco: "T$ 27.000",
            espacos: "—",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Simbionte (Costas). O hospedeiro pode gastar 2 PM para ativar as Asas e ganhar deslocamento de voo igual ao seu deslocamento em terra (duração sustentada).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/asas.webp"
        },
        {
            nome: "Flagelo do Devorador",
            preco: "T$ 33.000",
            espacos: "—",
            categoria: "Item Mágico",
            tipo: "Escudo Mágico Maior",
            descricao: "Simbionte (Braço). Conta como um escudo leve de matéria vermelha. Permite lançar 'Jato Corrosivo' (como ação de movimento). Se aprender a magia, custo -1 PM.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Mente do Devorador",
            preco: "T$ 34.000",
            espacos: "—",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Simbionte (Cabeça). Concede +1 em Inteligência e Sabedoria (cumulativo). Permite lançar uma magia arcana de encantamento de 1º círculo (escolhida na implantação). Se aprender a magia, custo -1 PM.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Olhos do Devorador",
            preco: "T$ 34.000",
            espacos: "—",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Simbionte (Rosto). Concede +5 em Percepção, visão no escuro (ignora escuridão mágica) e não pode ser flanqueado. Permite lançar 'Visão da Verdade'. Se aprender a magia, custo -1 PM.",
            fonte: "Ameaças de Arton"
        },
        // (Itens de Ameaças de Arton - Mágicos)
        {
            nome: "Chifre de Unicórnio",
            preco: "T$ 120.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Maior. Permite lançar Curar Ferimentos e Purificação (custo -1 PM se já as conhece). Pode lançar Segunda Chance (1x, perde poderes). Pode ser usado como Espada Curta Formidável (+2). Pode ser transformado em 12 doses de 'Pó de Chifre de Unicórnio' (aumenta dados de cura de poções em +2 passos).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Fragmento de Filactério",
            preco: "T$ 90.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Maior. Conta como uma Costela de Lich Poderosa (+20 PM após 1 dia de uso). Não pode ser fabricado.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Grilhão de Descrença",
            preco: "T$ 24.000",
            bonus_defesa: "+11",
            penalidade_armadura: "–4",
            espacos: "5",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Menor",
            descricao: "Armadura completa (+1) reforçada (+1) e selada (+1). Amaldiçoada: não pode ser retirada. Se morrer usando-a, não pode ser ressuscitado e se torna um guerreiro perpétuo. Se a maldição for removida, ganha um encanto aleatório.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Pilão Conspurcado",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Conta como uma Costela de Lich (magias causam +1d6 dano de trevas). Além disso, o custo de suas magias de Encantamento e Necromancia diminui em –1 PM e a CD para resistir a elas aumenta em +2.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Pistola Demoníaca",
            preco: "T$ 72.250",
            dano: "2d6",
            critico: "19/x3",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: ". Pistola formidável (+2) e profana (+1d6 trevas). Está sempre carregada e não precisa de munição. 1/dia (escolha do mestre), o portador deve tentar disparar em uma criatura inteligente aleatória (Vontade CD 25 evita).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/pistola.webp"
        },
        {
            nome: "Uyzrrak Da'ukthra",
            preco: "T$ 78.050",
            dano: "1d12",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: ". Machado de guerra magnífico (+4), aumentado (dano +1 passo), atroz (+2 dano) de adamante (+1 passo). Se empunhado por um duyshidakk, causa +2d8 de dano contra não-duyshidakks e recebe um encanto adicional baseado no Akzath.",
            fonte: "Ameaças de Arton"
        },

        // (Item de Guerra Artoniana)
        {
            nome: "Manto do Viajante",
            preco: "T$ 25.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Manto velho e surrado. Fornece +5 em Sobrevivência e +3m em deslocamento (apenas em ambientes ermos). Permite lançar a magia Primor Atlético (apenas em você mesmo).",
            fonte: "Guerra Artoniana",
            imagem: "data/img/manto-da-resistencia.webp"
        },

        // (Item de Duelo de Dragões)
        {
            nome: "Lança do Guerreiro Dragão",
            preco: "T$ 24.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Lança que canaliza poder dracônico, causando +2d6 de dano de fogo.",
            fonte: "Duelo de Dragões",
            imagem: "data/img/lanca.webp"
        },
        // (Itens de Heróis de Arton - Implantes)
        {
            nome: "Asas (Implante)",
            preco: "T$ 20.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante. Asas monstruosas. Você pode voar com deslocamento igual ao seu deslocamento base mas, enquanto estiver voando dessa forma, fica vulnerável.",
            fonte: "Heróis de Arton",
            imagem: "data/img/asas.webp"
        },
        {
            nome: "Braço de Ogro",
            preco: "T$ 36.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Implante (substitui um braço). Você recebe +2 em Força e, com este braço, seu alcance natural aumenta em +1,5m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Cauda com Ferrão",
            preco: "T$ 27.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante (Cauda). Concede arma natural de ferrão (dano 1d6, crítico x2, perfuração). 1/rodada, pode gastar 1 PM para ataque extra com ferrão. Ao causar dano com ele, pode gastar 1 PM para inocular veneno (1d12 PV).",
            fonte: "Heróis de Arton",
            imagem: "data/img/cauda.webp"
        },
        {
            nome: "Escamas (+2 Defesa)",
            preco: "T$ 12.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante. Escamas de monstros formam uma armadura leve. Fornecem +2 na Defesa. Pode ser enxertado uma segunda vez.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Escamas (Melhoria +5 Defesa)",
            preco: "T$ 12.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante (Requer Escamas +2). O bônus na Defesa totaliza +5.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Garras (Implante)",
            preco: "T$ 27.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante (Mãos). Mãos se transformam em armas naturais de garra (dano 1d6 cada, crítico x2, corte). 1/rodada, pode gastar 1 PM para ataque extra com uma garra (se livre). Pode usá-las para Estilo de Duas Armas.",
            fonte: "Heróis de Arton",
            imagem: "data/img/garras.webp"
        },
        {
            nome: "Olho Anulador",
            preco: "T$ 30.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Implante (Peito). Permite lançar Dissipar Magia (apenas em cone de 9m, usa Vontade no lugar de Misticismo).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Olho Desintegrador",
            preco: "T$ 50.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: "Implante (Costas). Permite lançar a magia Desintegrar (atributo-chave Constituição).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Olho Petrificante",
            preco: "T$ 18.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante (Olho). Concede a habilidade Olhar Atordoante (T20, p. 29). Se já a tiver, a CD aumenta em +2.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Patas de Aranha",
            preco: "T$ 12.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante (Tronco). Concede deslocamento de escalada igual ao seu deslocamento base. Se já tiver, aumenta em +6m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Tentáculo com Garras",
            preco: "T$ 27.000",
            espacos: "-",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Implante. Concede arma natural de tentáculo (dano 1d4, crítico x2, impacto) com alcance +1,5m. 1/rodada, pode gastar 1 PM para ataque extra com o tentáculo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/garras.webp"
        },
        // (Itens de Heróis de Arton - Armas Específicas)
        {
            nome: "Adaga da Bruma",
            preco: "T$ 27.000",
            dano: "1d4",
            critico: "19",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Adaga formidável envolta em névoa que permite se tornar invisível por 1 rodada após um acerto (custo 2 PM).",
            fonte: "Heróis de Arton",
            imagem: "data/img/adaga.webp"
        },
        {
            nome: "Arco das Sombras",
            preco: "T$ 27.000",
            dano: "1d6",
            critico: "x3",
            alcance: "Médio",
            tipo_dano: "Perfuração",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Arco curto sombrio que deixa alvos cegos por 1 rodada ao acertar (custo 2 PM).",
            fonte: "Heróis de Arton",
            imagem: "data/img/arco-curto.webp"
        },
        {
            nome: "Arco do Crepúsculo",
            preco: "T$ 22.500",
            dano: "1d8",
            critico: "x3",
            alcance: "Médio",
            tipo_dano: "Perfuração",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Arco longo formidável que ofusca inimigos por 1d4 rodadas ao acertar (custo 1 PM).",
            fonte: "Heróis de Arton",
            imagem: "data/img/arco-curto.webp"
        },
        {
            nome: "Azagaia Fantasma",
            preco: "T$ 30.000",
            dano: "1d6",
            critico: "x2",
            alcance: "Médio",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Azagaia caçadora de cristal que ignora RD ao acertar (custo 1 PM). Retorna ao usuário.",
            fonte: "Heróis de Arton",
            imagem: "data/img/azagaia.webp"
        },
        {
            nome: "Besta Estelar",
            preco: "T$ 30.000",
            dano: "1d8",
            critico: "19",
            alcance: "Médio",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Besta leve cravejada de gemas que dispara múltiplos virotes (custo 3 PM).",
            fonte: "Heróis de Arton",
            imagem: "data/img/besta-leve.webp"
        },
        {
            nome: "Clava de Lava",
            preco: "T$ 45.000",
            dano: "1d6",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: " Clava maciça (crit +1), flamejante (+1d6 fogo) e formidável (+2). Ao acertar, pode gastar 1 PM para aumentar o dano de fogo para +3d6.",
            fonte: "Heróis de Arton",
            imagem: "data/img/clava.webp"
        },
        {
            nome: "Espada da Tempestade",
            preco: "T$ 45.000",
            dano: "1d8",
            critico: "18",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Espada que canaliza poder de tempestades, causando +1d6 de dano elétrico.",
            fonte: "Heróis de Arton",
            imagem: "data/img/espada-longa.webp"
        },
        {
            nome: "Espada do Guardião",
            preco: "T$ 54.000",
            dano: "1d8",
            critico: "19",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Espada que protege seu portador, concedendo +1 na Defesa e +2 em testes de resistência.",
            fonte: "Heróis de Arton",
            imagem: "data/img/espada-longa.webp"
        },
        {
            nome: "Espada Solar",
            preco: "T$ 45.000",
            dano: "1d10/1d12",
            critico: "19",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Espada que brilha com luz solar intensa, causando +2d6 de dano de luz contra criaturas do mal.",
            fonte: "Heróis de Arton",
            imagem: "data/img/espada-longa.webp"
        },
        {
            nome: "Florete do Vendaval",
            preco: "T$ 27.000",
            dano: "1d6",
            critico: "18",
            alcance: "—",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: ". Florete formidável (+2) de mitral (ágil, -1 espaço). Pode gastar 3 PM para ganhar voo 12m por 2 rodadas. Durante o voo, recebe +5 na Defesa contra ataques à distância.",
            fonte: "Heróis de Arton",
            imagem: "data/img/florete.webp"
        },
        {
            nome: "Lança da Fênix",
            preco: "T$ 100.000",
            dano: "1d6",
            critico: "x2",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Lança que retorna como a fênix após ser arremessada, regenerando dano.",
            fonte: "Heróis de Arton",
            imagem: "data/img/lanca.webp"
        },
        {
            nome: "Machado da Natureza",
            preco: "T$ 22.500",
            dano: "1d8",
            critico: "19",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Machado feito de madeira viva que regenera 1 PV por rodada.",
            fonte: "Heróis de Arton",
            imagem: "data/img/machado-de-batalha.webp"
        },
        {
            nome: "Machado do Abismo",
            preco: "T$ 36.000",
            dano: "1d8",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Machado que canaliza poder das profundezas, causando +1d6 de dano de trevas.",
            fonte: "Heróis de Arton",
            imagem: "data/img/machado-de-batalha.webp"
        },
        {
            nome: "Machado do Vulcão",
            preco: "T$ 54.000",
            dano: "1d12",
            critico: "x4",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Machado que queima como lava, causando +2d6 de dano de fogo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/machado-de-batalha.webp"
        },
        {
            nome: "Martelo da Terra",
            preco: "T$ 33.000",
            dano: "1d8",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Martelo que canaliza poder da terra, causando dano em área ao impactar.",
            fonte: "Heróis de Arton",
            imagem: "data/img/martelo-de-guerra.webp"
        },
        {
            nome: "Martelo do Titã",
            preco: "T$ 22.500",
            dano: "1d8",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Martelo de tamanho imenso que causa +3d6 de dano.",
            fonte: "Heróis de Arton",
            imagem: "data/img/martelo-de-guerra.webp"
        },
        {
            nome: "Punhal das Profundezas",
            preco: "T$ 36.000",
            dano: "1d4",
            critico: "19",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: " Adaga formidável (+2). Quando ataca, pode gastar 1 PM para causar +3d6 de dano de ácido.",
            fonte: "Heróis de Arton",
            imagem: "data/img/adaga.webp"
        },
        // (Itens de Heróis de Arton - Armaduras e Escudos Específicos)
        {
            nome: "Armadura das Sombras Profundas",
            preco: "T$ 40.500",
            bonus_defesa: "+8",
            penalidade_armadura: "0",
            espacos: "5",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: ". Cota de malha (+2) sob medida (penalidade -2) defensora (+2) e sombria (+2 Furtividade, lança Escuridão). Recebe RD luz 10 e pode lançar Invisibilidade (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura do Dragão Ancião",
            preco: "T$ 100.000",
            bonus_defesa: "+14",
            penalidade_armadura: "–5",
            espacos: "5",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: ". Armadura completa (+4) guardiã (+4) e invulnerável (RD 5). Recebe RD eletricidade, fogo e frio 10. Se estiver com menos da metade dos PV, pode usar efeito de item 'Assustador' (T20, p. 338).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura do Inverno Perene",
            preco: "T$ 40.500",
            bonus_defesa: "+7",
            penalidade_armadura: "–4",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: ". Couraça (+2) defensora (+2), gélida (+1d6 frio) de gelo eterno (RD Fogo 5). Habilidade do encanto gélido cura 20 PV (em vez de 10). Pode lançar Área Escorregadia (CD Sab) como ação de movimento (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Cota da Serpente Marinha",
            preco: "T$ 27.000",
            bonus_defesa: "+10",
            penalidade_armadura: "0",
            espacos: "5",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Média",
            descricao: ". Cota de malha (+4) ajustada (penalidade -1) e guardiã (+4). Recebe deslocamento de natação 12m. Pode lançar Sopro das Uivantes (CD Sab) (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/cota-malha.webp"
        },
        {
            nome: "Couraça do Guardião Celeste",
            preco: "T$ 54.000",
            bonus_defesa: "+7",
            penalidade_armadura: "–4",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: ". Couraça (+2) banhada a ouro (+2 Diplomacia), defensora (+2) e protetora (+2 TR). Concede +1 em Carisma (após 1 dia). Efeitos de cura de luz curam +1 PV por dado.",
            fonte: "Heróis de Arton",
            imagem: "data/img/couraca.webp"
        },
        {
            nome: "Escudo da Luz Estelar",
            preco: "T$ 27.000",
            bonus_defesa: "+3",
            penalidade_armadura: "–1",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Média",
            descricao: ". Escudo leve (+1) defensor (+2). Recebe +5 em Percepção. Pode lançar Luz (CD Int) (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Escudo da Ira Vulcânica",
            preco: "T$ 54.000",
            bonus_defesa: "+6",
            penalidade_armadura: "–2",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: ". Escudo pesado (+2) guardião (+4). Fornece RD fogo 10. Permite lançar Explosão de Chamas (Ref CD Car) como ação de movimento (área dobrada se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Escudo da Natureza Viva",
            preco: "T$ 27.000",
            bonus_defesa: "+3",
            penalidade_armadura: "–1",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Média",
            descricao: ". Escudo leve (+1) defensor (+2) de madeira Tollon (resist. magia +2). Recebe +2 em Fortitude. Pode lançar Curar Ferimentos (CD Sab) (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Escudo do Grifo",
            preco: "T$ 27.000",
            bonus_defesa: "+4",
            penalidade_armadura: "–2",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Média",
            descricao: ". Escudo pesado (+2) defensor (+2). Recebe RD 10 contra ataques à distância. Pode lançar Sopro das Uivantes (CD Sab) (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Escudo do Trovão",
            preco: "T$ 54.000",
            bonus_defesa: "+6",
            penalidade_armadura: "0",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: ". Escudo pesado (+2) guardião (+4) de mitral (penalidade -2, -1 espaço). Ao sofrer dano corpo a corpo, pode gastar 2 PM para empurrar inimigos adjacentes 3m (Fort CD Car evita).",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        // (Itens de Heróis de Arton - Esotéricos Específicos)
        {
            nome: "Cajado das Marés",
            preco: "T$ 27.000",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Esotérico Mágico Médio",
            descricao: "Cajado arcano (+1 CD) glacial (+1d6 frio, vulnerável). Recebe deslocamento de natação 9m (+3m se já possuir). Pode gastar (Ação Mov., 2 PM) para empurrar inimigos adjacentes 4,5m (Ref CD Int evita).",
            fonte: "Heróis de Arton",
            imagem: "data/img/cajado-arcano.webp"
        },
        {
            nome: "Cálice Sagrado",
            preco: "T$ 150.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Esotérico Mágico Maior",
            descricao: " O custo de suas magias divinas diminui em –2 PM e todos os efeitos variáveis delas aumentam em +1 por dado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Relógio do Arcanista",
            preco: "T$ 60.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Esotérico Mágico Maior",
            descricao: " Relógio de bolso. Ao lançar magia arcana (execução mov, padrão ou completa), pode gastar +4 PM para lançá-la como ação livre. Se possuir Magia Acelerada, o custo diminui em –2 PM.",
            fonte: "Heróis de Arton",
            imagem: "data/img/arcanista.webp"
        },
        {
            nome: "Varinha MiDeusa da Vidar",
            preco: "T$ 200.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Esotérico Mágico Maior",
            descricao: " Varinha arcana (+1 CD). Aumenta a CD para resistir a suas magias arcanas em +4 (total +5) e aumenta todos os dados de dano de suas magias arcanas em um passo. Se um inimigo passar no TR contra uma magia sua, você perde 1 PV por PM gasto na magia.",
            fonte: "Heróis de Arton",
            imagem: "data/img/varinha-arcana.webp"
        },
        // (Itens de Heróis de Arton - Acessórios Específicos)
        {
            nome: "Algibeira Mordedora",
            preco: "T$ 1.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Bolsa. Quando uma criatura faz punga contra você, sofre 6d6 dano de corte e fica agarrada (Acrobacia CD 20 para soltar).",
            fonte: "Heróis de Arton",
            imagem: "data/img/algibeira.webp"
        },
        {
            nome: "Algibeira Provedora",
            preco: "T$ 6.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Bolsa. Pode gastar ação completa para procurar item mundano (até 1 espaço). Role 1d20: 6+ encontra; 5- falha (perde poderes por 1 dia); 1 natural morde (4d6 dano) e desaparece.",
            fonte: "Heróis de Arton",
            imagem: "data/img/algibeira.webp"
        },
        {
            nome: "Ampulheta da Harmonia Temporal",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "1/dia, pode realizar uma tarefa (de 1 min a 1 hora) como uma ação completa.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Amuleto da Visão Etérea",
            preco: "T$ 3.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Concede resistência a ilusões +5. Pode lançar Visão Mística (como ação livre se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/amuleto.webp"
        },
        {
            nome: "Amuleto do Amparo",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Medalhão. Quando você faz um teste para ajudar, o bônus que fornece aumenta em +2.",
            fonte: "Heróis de Arton",
            imagem: "data/img/amuleto.webp"
        },
        {
            nome: "Anel da Beleza Ilusória",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Concede +5 em perícias baseadas em Carisma (exceto Intimidação). Pode lançar Enfeitiçar (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/anel.webp"
        },
        {
            nome: "Anel da Chama Dançante",
            preco: "T$ 30.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Chama mágica age como um parceiro vigilante veterano. Permite lançar Controlar Fogo (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/anel.webp"
        },
        {
            nome: "Anel da Proteção Mental",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Concede resistência a efeitos mentais +5.",
            fonte: "Heróis de Arton",
            imagem: "data/img/anel.webp"
        },
        {
            nome: "Anel do Pacto Oneroso",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Permite lançar uma magia divina (até 4º círculo) sem custo em PM. Exige realizar uma penitência (definida pelo mestre) antes de usar de novo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/anel.webp"
        },
        {
            nome: "Bastão da Grande Harmonia",
            preco: "T$ 25.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Bastão que equilibra energias mágicas, fornecendo +1 em testes de resistência contra magia.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Bastão do Sonhador",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Bastão que permite comunicação através de sonhos com aliados.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Berço das Fadas",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Saco de dormir. Oferece descanso confortável (mesmo ao relento). Concede efeito da magia Suporte Ambiental enquanto dorme.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Botas do Andarilho das Sombras",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Botas. Concede +5 em Furtividade (em ambientes urbanos ou escuros). 1/dia, pode lançar Salto Dimensional (apenas para uma sombra em alcance).",
            fonte: "Heróis de Arton",
            imagem: "data/img/botas-velozes.webp"
        },
        {
            nome: "Braçadeiras da Força do Colosso",
            preco: "T$ 120.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Braçadeiras. Concede +4 em Força (após 1 dia). 1/cena, pode gastar 5 PM para aumentar o bônus para +8 por 1 rodada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Bracelete do Coração Vivaz",
            preco: "T$ 27.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Bracelete. Fornece +10 PV (após 1 dia). Quando reduzido a 0 PV ou menos, pode gastar 2 PM para curar 2d8+2 PV (luz).",
            fonte: "Heróis de Arton",
            imagem: "data/img/bracelete-bronze.webp"
        },
        {
            nome: "Braceletes da Amizade Intensa",
            preco: "T$ 36.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Par de braceletes. Usuários (em alcance médio) podem se comunicar por telepatia e sentir direção/distância um do outro. Cura mágica ou efeito benéfico em um afeta o outro (em alcance curto).",
            fonte: "Heróis de Arton",
            imagem: "data/img/bracelete-bronze.webp"
        },
        {
            nome: "Caixa dos Ecos Perdidos",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Caixa de madeira. Pode gastar 3 PM para receber +10 em um teste de perícia baseada em Inteligência (relacionada a um evento passado).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Cálice das Marés",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Cálice de prata. Permite lançar Controlar Água (custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Capa Nebulosa",
            preco: "T$ 16.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Capa de névoa. Sempre que estiver sob camuflagem leve (escuridão ou neblina), ela se torna camuflagem total.",
            fonte: "Heróis de Arton",
            imagem: "data/img/capa-esvoacante.webp"
        },
        {
            nome: "Chapéu dos Truques Infinitos",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Cartola. Pode lançar livremente qualquer versão 'truque' de magias de 1º círculo, mesmo que não as conheça.",
            fonte: "Heróis de Arton",
            imagem: "data/img/chapeu-arcano.webp"
        },
        {
            nome: "Chapéu Pensador",
            preco: "T$ 30.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Chapéu. Recebe a habilidade Engenhosidade. Se já a possui, o bônus aumenta em +2.",
            fonte: "Heróis de Arton",
            imagem: "data/img/chapeu-arcano.webp"
        },
        {
            nome: "Chave dos Planos",
            preco: "T$ 60.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Chave. Permite lançar Teletransporte ou Viagem Planar (sem componente material) através de uma porta (requer uma porta no destino).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Cinto da Desmaterialização",
            preco: "T$ 60.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Cinto. Permite lançar Forma Etérea (apenas em você).",
            fonte: "Heróis de Arton",
            imagem: "data/img/cinto-da-forca-do-gigante.webp"
        },
        {
            nome: "Cinto da Flecha Veloz",
            preco: "T$ 30.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Cinto. Recebe a habilidade Ataque Extra (apenas com armas de disparo). Se já a possui, o custo para usá-la com armas de disparo diminui em –1 PM.",
            fonte: "Heróis de Arton",
            imagem: "data/img/cinto-da-forca-do-gigante.webp"
        },
        {
            nome: "Cinto da Leveza Graciosa",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Cinto. Recebe +5 em Acrobacia e está sempre sob efeito básico de Queda Suave.",
            fonte: "Heróis de Arton",
            imagem: "data/img/cinto-da-forca-do-gigante.webp"
        },
        {
            nome: "Cinto dos Caminhos Cruzados",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Cinto. 1/cena, pode gastar (Ação Mov., 3 PM) para trocar de lugar com um aliado em alcance curto.",
            fonte: "Heróis de Arton",
            imagem: "data/img/cinto-da-forca-do-gigante.webp"
        },
        {
            nome: "Cinturão do Trobo",
            preco: "T$ 3.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Cinto. Recebe +5 em testes de Atletismo para erguer peso e sua capacidade de carga aumenta em 5 espaços.",
            fonte: "Heróis de Arton",
            imagem: "data/img/cinto-da-forca-do-gigante.webp"
        },
        {
            nome: "Colar da Fúria Monstruosa",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Colar. Adquire a habilidade Fúria (de Bárbaro). Se já a possui, os bônus em ataque e dano aumentam em +1.",
            fonte: "Heróis de Arton",
            imagem: "data/img/colar-guardiao.webp"
        },
        {
            nome: "Colar da Perseverança",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Colar. Recebe +5 em Vontade e +2 em todos os testes estendidos.",
            fonte: "Heróis de Arton",
            imagem: "data/img/colar-guardiao.webp"
        },
        {
            nome: "Colar do Tirano",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Colar. Conectado a 1d8 coleiras. 1/rodada, pode causar 2d8+2 dano de eletricidade a um escravo. Dano ou efeito nocivo ao usuário também afeta os escravos.",
            fonte: "Heróis de Arton",
            imagem: "data/img/colar-guardiao.webp"
        },
        {
            nome: "Colar das Bolas de Fogo",
            preco: "T$ 12.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Colar com 1d4+1 rubis. Recebe RD fogo 10. Pode lançar Bola de Fogo (CD Int/Car; +2 PM em aprimoramentos se já a conhece). Pode gastar (Ação Mov.) e 1 rubi para aumentar a CD em +2 e o dano em +1 passo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/colar-guardiao.webp"
        },
        {
            nome: "Coração do Inverno",
            preco: "T$ 45.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Cristal. Permite lançar Raio Polar (CD Int/Car; +1 passo de dado se já a conhece).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Corda da Resignação",
            preco: "T$ 7.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Corda. Quando usada para amarrar, a CD para escapar (Acrobacia) aumenta em +20. A vítima fica alquebrada e esmorecida.",
            fonte: "Heróis de Arton",
            imagem: "data/img/corda.webp"
        },
        {
            nome: "Coroa da Floresta Sussurrante",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Tiara. Está sempre sob efeito de Voz Divina. Pode lançar Acalmar Animal e Controlar Plantas (CD Sab; como ação de movimento se já as conhece).",
            fonte: "Heróis de Arton",
            imagem: "data/img/coroa.webp"
        },
        {
            nome: "Coroa da Majestade Distorcida",
            preco: "T$ 25.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Coroa. Recebe +1 Carisma (após 1 dia). Pode lançar Comando (CD Car, +2 CD) como ação de movimento. (Criaturas que passam no TR ficam imunes).",
            fonte: "Heróis de Arton",
            imagem: "data/img/coroa.webp"
        },
        {
            nome: "Cristal da Voz Silenciosa",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Pingente. Permite falar com voz mágica (audível apenas por quem selecionar em alcance curto). Permite lançar magias sem componente verbal.",
            fonte: "Heróis de Arton",
            imagem: "data/img/po-de-cristal.webp"
        },
        {
            nome: "Cristal do Tempo Célere",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Item Mágico de Uso Único",
            descricao: " Cristal (consumível). Quebrar o cristal permite realizar um intervalo entre aventuras no tempo de 1 dia.",
            fonte: "Heróis de Arton",
            imagem: "data/img/po-de-cristal.webp"
        },
        {
            nome: "Elixir da Eternidade",
            preco: "T$ 3.000",
            espacos: "0,5",
            categoria: "Item Mágico",
            tipo: "Item Mágico de Uso Único",
            descricao: " Elixir (Poção). Evita que o usuário envelheça (até o fim da aventura). Recebe resistência a trevas +5 e imunidade a envelhecimento mágico.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Elixir da Mente Dividida",
            preco: "T$ 1.500",
            espacos: "0,5",
            categoria: "Item Mágico",
            tipo: "Item Mágico de Uso Único",
            descricao: " Elixir (Poção). Beber (ação padrão) concede +1 ação de movimento e +1 ação padrão por rodada (não cumulativo) por 1 cena. Causa –5 em testes de perícia (exceto reações) e condição ruim para lançar magias. Causa fadiga por 1 dia após o fim.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Espelho da Verdade",
            preco: "T$ 21.000",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Espelho grande. Revela a forma verdadeira de criaturas/objetos (como Visão da Verdade). Pode ser usado para lançar Vidência (CD +5, alvo também afetado por Visão da Verdade).",
            fonte: "Heróis de Arton",
            imagem: "data/img/espelho.webp"
        },
        {
            nome: "Espelho do Outro Lado",
            preco: "T$ 18.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Espelho pequeno. 1/aventura, pode conversar com sua contraparte espiritual. Role 1d10–3. Se positivo, recebe esse valor em d6 de auxílio (para testes de perícia). Se negativo, o mestre recebe esse valor em d6 de penalidade (para seus testes de perícia).",
            fonte: "Heróis de Arton",
            imagem: "data/img/espelho.webp"
        },
        {
            nome: "Frigideira do Chef Anão",
            preco: "T$ 24.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Instrumento de Ofício (cozinheiro) aprimorado (+5). Pode ser usada como Maça maciça (+1 crit) formidável (+2) de adamante (+1 passo). Pode ser usada como Escudo Pesado defensor (+2) de adamante (RD 2), mas exige duas mãos.",
            fonte: "Heróis de Arton",
            imagem: "data/img/anao.webp"
        },
        {
            nome: "Gaiola dos Arcanos",
            preco: "T$ 6.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Gaiola de prata. Quando uma criatura usa habilidade mágica em 9m, o cristal suga 1 PM (por círculo de magia) ou 2 PM (outras hab.) da criatura.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Gema da Profanação",
            preco: "T$ 30.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Gema. O custo de suas habilidades mágicas que causam dano de trevas diminui em –2 PM.",
            fonte: "Heróis de Arton",
            imagem: "data/img/gema-elemental.webp"
        },
        {
            nome: "Gema da Purificação",
            preco: "T$ 18.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Gema. Pode lançar a magia Purificação. Custo -1 PM se for devoto do Deus de energia positiva e/ou já conhecer a magia (cumulativo).",
            fonte: "Heróis de Arton",
            imagem: "data/img/gema-elemental.webp"
        },
        {
            nome: "Gema da Santificação",
            preco: "T$ 24.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Gema. Área em alcance curto da gema é considerada sob efeito de Consagrar. Se for devoto, pode pagar PM para ativar aprimoramentos (duração 1 cena).",
            fonte: "Heróis de Arton",
            imagem: "data/img/gema-elemental.webp"
        },
        {
            nome: "Instrumentos da Celeridade",
            preco: "T$ 22.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Ferramentas de Ofício aprimoradas (+1). Permite fabricar um item adicional (mesma categoria e tempo) ao mesmo tempo (pague o custo e faça o teste para cada).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Lâmpada da Ilusão Impecável",
            preco: "T$ 6.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Lâmpada de cristal. Pode lançar Criar Ilusão (apenas visual, CD Int; +2 PM em aprimoramentos se já a conhece). A CD para resistir à magia aumenta em +5.",
            fonte: "Heróis de Arton",
            imagem: "data/img/ilusao.webp"
        },
        // (Itens de Heróis de Arton - Acessórios Específicos Finais)
        {
            nome: "Máscara da Raposa",
            preco: "T$ 18.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Máscara. Permite lançar Imagem Espelhada (como ação de movimento e custo -1 PM se já a conhece).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Máscara do Predador",
            preco: "T$ 22.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Máscara. Recebe +5 em Investigação (procurar) e Sobrevivência (rastrear). Recebe a habilidade Marca da Presa (custo -1 PM se já a possui).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Monóculo da Franqueza",
            preco: "T$ 4.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Monóculo. Concede +10 em testes de Intuição para perceber mentiras.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Ocarina da Melodia Distante",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Instrumento musical. Fornece +2 em Atuação (+5 para bardos). O alcance das Músicas de bardo aumenta em um passo (curto->médio, médio->longo).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Óculos da Revelação",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Óculos. Permite lançar a magia Lendas e Histórias.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Olhos do Corvo",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Venda. Fica cego em ambientes iluminados. Em ambientes escuros (mundanos ou mágicos), enxerga normalmente e fica imune a cego e ofuscado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Papiro das Estrelas",
            preco: "T$ 1.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Pergaminho. Fornece +5 em Sobrevivência (orientar-se, rastrear) e Percepção (evitar surpresa nos ermos).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Pedra da Passagem",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Pedra. Pode gastar (Ação Padrão, 3 PM) para criar uma abertura Média em superfície sólida não mágica (RD 8 ou menos). Apenas portas e paredes.",
            fonte: "Heróis de Arton",
            imagem: "data/img/pedras.webp"
        },
        {
            nome: "Pena da Criação",
            preco: "T$ 6.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Ferramenta (Ofício: escriba) aprimorada. 1/cena (Ação Completa), faça um teste de Ofício (escriba) (CD 10) para lançar Conjurar Monstro (básico). A cada 5 pontos acima da CD, recebe +1 PM para aprimoramentos.",
            fonte: "Heróis de Arton",
            imagem: "data/img/pena.webp"
        },
        {
            nome: "Pergaminho da Verdade Cósmica",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Item Mágico de Uso Único",
            descricao: " Pergaminho (consumível). Abrir exige Vontade (CD 40). Falha: debilidade (permanente). Sucesso: lança Intervenção Divina (sem custo de PM). Pergaminho se desfaz.",
            fonte: "Heróis de Arton",
            imagem: "data/img/organizador-de-pergaminhos.webp"
        },
        {
            nome: "Pérola da Nulificação Mágica",
            preco: "T$ 3.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Item Mágico de Uso Único",
            descricao: " Pérola (consumível). Ativar (Ação Mov.) produz efeito básico de Campo Antimagia por 1 cena. Uso único.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Pingente da Dor Partilhada",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Pingente. Quando um aliado em alcance curto se fere, pode gastar 2 PM; o aliado não sofre o dano, mas você perde PV em quantidade igual ao dano (após RD/etc. do aliado).",
            fonte: "Heróis de Arton",
            imagem: "data/img/pingente.webp"
        },
        {
            nome: "Saco dos Ventos Silenciosos",
            preco: "T$ 3.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: " Saco. Permite lançar Criar Elementos (apenas ar), Queda Suave e Suporte Ambiental (apenas contra calor). Se já conhece as magias, custo -1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sandálias da Deusa da Ambição",
            preco: "T$ 12.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: "Sandálias. Permite andar sobre qualquer superfície (ignora terreno difícil, anda sobre líquidos). Recebe +5 em Acrobacia (terreno escorregadio) e Atletismo (escalar).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Tomo da Técnica Definitiva",
            preco: "T$ 30.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Tomo. Estudar (ação entre aventuras). Seu Golpe Pessoal recebe +2 PM em efeitos (não contam no limite e não aumentam o custo). Aplica-se a apenas um Golpe Pessoal.",
            fonte: "Heróis de Arton",
            imagem: "data/img/tomo-hermetico.webp"
        },
        {
            nome: "Tomo dos Companheiros",
            preco: "T$ 45.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Tomo. Pode gastar (Ação Completa, 3 PM) para convocar um parceiro veterano (à escolha), que surge adjacente. Dura até o fim do dia ou até conjurar outro.",
            fonte: "Heróis de Arton",
            imagem: "data/img/tomo-hermetico.webp"
        },

        // (Itens do Deuses de Arton - Itens Litúrgicos 2)
        {
            nome: "Armadura dos Neladriel",
            preco: "T$ 65.000",
            bonus_defesa: "+8",
            penalidade_armadura: "–4",
            espacos: "5",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Maior",
            descricao: "Meia armadura reforçada (+1) guardiã (+4) de mitral (penalidade -2). Conta como armadura leve para Destreza na Defesa e habilidades (como Evasão).",
            fonte: "Deuses de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Varinha da Generosidada Deusa da Magia",
            preco: "T$ 30.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Varinha arcana poderosa (+2 CD) de madeira Tollon. Se devoto da Deusa da Magia: fornece RD 5. Quando lança magia, transfere mana para aliado em alcance curto (1 PM temporário por círculo, máx. custo da magia). 1/dia por aliado.",
            fonte: "Deuses de Arton",
            imagem: "data/img/varinha-arcana.webp"
        },
        {
            nome: "Machado Lamnoriano do Deus dos Goblinóides",
            preco: "T$ 22.500",
            dano: "1d12",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Machado ancestral dos anões que causa +1d6 de dano adicional contra lefeu.",
            fonte: "Deuses de Arton",
            imagem: "data/img/machado-de-batalha.webp"
        },
        {
            nome: "Espada Imaculada Deus da Ressurreição",
            preco: "T$ 45.000",
            dano: "1d8",
            critico: "19",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: " Espada longa precisa (crit +1). Se devoto do Deus da Ressurreição: torna-se formidável (+2). Pode gastar 2 PM (cena) para virar plasma vermelho: ataque +4, dano aumenta 2 passos (fogo não letal) e ignora 20 RD.",
            fonte: "Deuses de Arton",
            imagem: "data/img/espada-longa.webp"
        },
        {
            nome: "Pira Póstera Deus da Ressurreição",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Se devoto do Deus da Ressurreição: +1 Sabedoria (após 1 dia). 1/dia, pode rolar novamente um teste de Iniciativa, Percepção ou resistência.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Botas Inquietas Deusa da Ambição",
            preco: "T$ 15.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Se devoto da Deusa da Ambição: +1 Constituição (após 1 dia) e +5 Fortitude (marcha forçada). Ao fazer investida, recebe 1 PM temporário cumulativo (máx. 3 PM/patamar por dia).",
            fonte: "Deuses de Arton",
            imagem: "data/img/botas-velozes.webp"
        },
        {
            nome: "Mangual Aventureiro Deusa da Ambição",
            preco: "T$ 40.000",
            dano: "1d8",
            critico: "x2",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Média. Mangual certeiro (+1 ataque) e cruel (+1 dano). Se devoto da Deusa da Ambição: torna-se dançarino (flutua) e formidável (+2). Se estiver em lugar inédito, dano aumenta 2 passos.",
            fonte: "Deuses de Arton",
            imagem: "data/img/mangual.webp"
        },
        {
            nome: "Argolas Místicas Deusa da Magia",
            preco: "T$ 25.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Vestuário. Se devoto da Deusa da Magia: ao lançar magia, recebe +2 PM para aprimoramentos (pode exceder limite). Pode ser usada sobre outras roupas.",
            fonte: "Deuses de Arton",
            imagem: "data/img/magia.webp"
        },
        {
            nome: "Maça Monstruosa Deus dos Monstros",
            preco: "T$ 27.000",
            dano: "1d8",
            critico: "x2",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Maça que causa dano devastador, +2d6 de dano adicional.",
            fonte: "Deuses de Arton",
            imagem: "data/img/maca-de-guerra.webp"
        },
        {
            nome: "Alguma Coisa do Deus do Caos...",
            preco: "T$ 54.000",
            dano: "3d8",
            critico: "x2",
            alcance: "—",
            tipo_dano: "Variável",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Média. Forma variável. Se devoto do Deus do Caos: Arma simples (uma mão), formidável (+2), veloz (ataque extra). Dano 3d8 (1d3: 1=corte, 2=impacto, 3=perfuração). Pode gastar 1 PM ao acertar: para cada dado de dano ímpar, rola um dado extra (repetindo se for ímpar).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Jarro das Profundezas Deus dos Mares",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: ". Se devoto do Deus dos Mares: 1 PM cria água salgada; 1 PM cone 6m de água (derruba, Ref CD Sab); 2 PM invoca elemental da água (parceiro destruidor/frio ou guardião veterano) por 1 cena.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Tridente Aquoso Deus dos Mares",
            preco: "T$ 54.000",
            dano: "1d8",
            critico: "x2",
            alcance: "—",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Tridente que controla água, permitindo respirar debaixo d'água.",
            fonte: "Deuses de Arton",
            imagem: "data/img/tridente.webp"
        },
        {
            nome: "Adaga Ofídica Deus da Traição",
            preco: "T$ 36.000",
            dano: "1d4",
            critico: "19",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Média. Adaga cruel (+1 dano). Possui veneno (peçonha concentrada, reposta magicamente). Se devoto do Deus da Traição: torna-se formidável (+2) e ignora imunidade a veneno. Se Patamar Campeão+, veneno vira peçonha potente.",
            fonte: "Deuses de Arton",
            imagem: "data/img/adaga.webp"
        },
        {
            nome: "Bordão Sabichão Deusa do Conhecimento",
            preco: "T$ 72.000",
            dano: "1d6/1d6",
            critico: "x2",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Maior. Bordão maciço (crit +1). Se devoto da Deusa do Conhecimento: torna-se formidável (+2) e piedoso (+1d6 luz). Pode gastar 2 PM para somar Sabedoria a um teste de perícia.",
            fonte: "Deuses de Arton",
            imagem: "data/img/bordao.webp"
        },
        {
            nome: "Escrivaninha Consagrada Deusa do Conhecimento",
            preco: "T$ 9.000",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: ". Se devoto da Deusa do Conhecimento: Estudar 1h dobra bônus de treino em perícia (Int/Sab) por 1 dia. 1/aventura, recebe 1d3 pergaminhos que poderia criar.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Vestido Noturno Deusa da Noite",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Conta como Veste de Seda aprimorada (+1) cravejada de gemas (+2 Enganação). Total +2 Enganação/Reflexos. Se devoto da Deusa da Noite: Pode gastar (Ação Padrão, 5 PM) para ficar invisível (veja magia Invisibilidade) até o fim da cena ou atacar.",
            fonte: "Deuses de Arton"
        },
        // (Itens do Deuses de Arton - Itens Litúrgicos 1)
        {
            nome: "Espada Monástica Deus da Justiça",
            preco: "T$ 54.000",
            dano: "1d8",
            critico: "19",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: " Espada longa certeira (+1 ataque). Se devoto do Deus da Justiça: pode gastar (Ação Mov.) para ler versículo e fazer teste de Religião (CD 20). Sucesso: torna-se formidável (+2). Por 10+: gera efeito Oração. Por 20+: torna-se magnífica (+4). Dura pela cena.",
            fonte: "Deuses de Arton",
            imagem: "data/img/espada-longa.webp"
        },
        {
            nome: "Armadura do Julgamento Deus da Justiça",
            preco: "T$ 54.000",
            bonus_defesa: "+11",
            penalidade_armadura: "–5",
            espacos: "5",
            categoria: "Item Mágico",
            tipo: "Armadura Mágica Média",
            descricao: "Armadura completa polida (+5 Def 1ª rodada) e reforçada (+1). Se devoto do Deus da Justiça: torna-se defensora (+2). Quando criatura ataca, pode gastar 2 PM para deixá-la pasma (1 rodada, 1/cena) e frustrada (Vontade CD Sab reduz para frustrada). Se Patamar Campeão+, torna-se guardiã (+4).",
            fonte: "Deuses de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Caldeirão da Vida Deusa da Vida",
            preco: "T$ 25.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Panela de ferro. Gastando 1h e T$ 5 (Ofício Cozinheiro CD 15), cria comida para 5 pessoas. Comensais recebem +2 em TR por 1 dia (devotos da Deusa da Vida recebem +10 PV temp.). Pode acumular com Prato Especial (+5 CD).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Alabarda da Coragem Deus da Honra",
            preco: "T$ 36.000",
            dano: "1d10",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Corte/Perfuração",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: " Alabarda certeira (+1 ataque) e precisa (crit +1). Se devoto do Deus da Honra: torna-se formidável (+2) e fornece +5 Iniciativa. Se for o primeiro a agir, recebe 2 PM temporários por nível (cena).",
            fonte: "Deuses de Arton",
            imagem: "data/img/alabarda.webp"
        },
        {
            nome: "Katana da Determinação Deus da Honra",
            preco: "T$ 54.000",
            dano: "1d8/1d10",
            critico: "19",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Katana que fortalece a vontade, concedendo +2 em testes de Vontade.",
            fonte: "Deuses de Arton",
            imagem: "data/img/katana.webp"
        },
        {
            nome: "Instrumento da Alegria Deusa da Paz",
            preco: "T$ 10.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Instrumento musical aprimorado (+1). Se treinado em Atuação, pode gastar (Ação Padrão, 1 PM) para dar +2 em perícias para aliados em alcance médio (cena). Se devoto da Deusa da Paz e usar Música, ativa como ação livre.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Véu Diáfano Deusa da Paz",
            preco: "T$ 13.500",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Conta como Veste de Seda aprimorada (+1 Reflexos). Se devoto da Deusa da Paz: fornece +1 Carisma (após 1 dia) e +2 Defesa (cumulativo).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Colar de Presas Deus dos Monstros",
            preco: "T$ 21.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Colar. Fornece +2 Intimidação e -2 Diplomacia. Se devoto do Deus dos Monstros: fornece +2 em ataque e dano com armas naturais.",
            fonte: "Deuses de Arton",
            imagem: "data/img/colar-guardiao.webp"
        },
        {
            nome: "Machado da Bravura Deus da Guerra",
            preco: "T$ 25.000",
            dano: "1d8",
            critico: "x3",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: "Machado que inspira coragem, concedendo +1 em Intimidação aos aliados próximos.",
            fonte: "Deuses de Arton",
            imagem: "data/img/machado-de-batalha.webp"
        },
        {
            nome: "Alfange Dourado Deus do Sol",
            preco: "T$ 36.000",
            dano: "2d6",
            critico: "18",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: " Alfange maciço (crit +1, -2 ataque, 2d6 dano). Se devoto do Deus do Sol: pode gastar (Ação Completa) para sacrificar ouro. Remove penalidade e dá bônus (dia): T$ 10 (+2), T$ 100 (+3), T$ 500 (+4), T$ 1.000 (+5).",
            fonte: "Deuses de Arton",
            imagem: "data/img/alfange.webp"
        },
        {
            nome: "Cimitarra Solar Deus do Sol",
            preco: "T$ 54.000",
            dano: "1d6",
            critico: "18",
            alcance: "—",
            tipo_dano: "Corte",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Maior",
            descricao: "Cimitarra que brilha com luz solar, causando +1d6 de dano de fogo contra lefeu.",
            fonte: "Deuses de Arton",
            imagem: "data/img/cimitarra.webp"
        },
        {
            nome: "Adaga Sorrateira Deus dos Ladrões",
            preco: "T$ 22.500",
            dano: "1d4",
            critico: "19",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Menor",
            descricao: "Adaga. Se devoto do Deus dos Ladrões: torna-se formidável (+2). Na 1ª vez na cena que passar em Enganação ou Furtividade, recebe +5 em um teste à escolha (cena). Se Patamar Campeão+, torna-se magnífica (+4).",
            fonte: "Deuses de Arton",
            imagem: "data/img/adaga.webp"
        },
        {
            nome: "Cubo Armadilha Deus dos Ladrões",
            preco: "T$ 25.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Médio",
            descricao: " Se devoto do Deus dos Ladrões: Pode gastar (Ação Padrão) para armar o cubo em espaço curto (invisível). 1º inimigo a entrar sofre 10d8 corte (Ref CD Int reduz). Dados '1' ou '8' explodem (rolam de novo). Pode ser percebido com Investigação (CD 30 + Int).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Lança da Dominação Deus dos Dragões",
            preco: "T$ 45.000",
            dano: "1d6",
            critico: "x3",
            alcance: "Curto",
            tipo_dano: "Perfuração",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Média",
            descricao: " Lança maciça (crit +1). Se devoto de Kally: +1 ataque/dano e +1d10 dano elemental (ácido/eletricidade/fogo/frio) à escolha. Bônus aumenta +1 a cada nível (máx +6). Se ficar 1 mês longe, bônus cai.",
            fonte: "Deuses de Arton",
            imagem: "data/img/lanca.webp"
        },
        {
            nome: "Ossos Dracônicos Deus dos Dragões",
            preco: "T$ 90.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Acessório de ossos. Fornece +4 Intimidação e -2 Diplomacia. Se devoto de Kally: fornece +2 Força, +2 Carisma e +2 na CD de todas as habilidades.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Cilício Vivo Deus da Tormenta",
            preco: "T$ 37.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Item vestido (cinta com anzóis). Reduz PV máx em 1/nível. Fornece +1 em todos os testes (cumulativo). Se devoto do Deus da Tormenta: bônus +2. Se Patamar Campeão+, aumenta PM máx em +1/nível.",
            fonte: "Deuses de Arton",
            imagem: "data/img/tormenta.webp"
        },
        {
            nome: "Ossos Dracônicos Deus dos Dragões",
            preco: "T$ 90.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Acessório de ossos. Fornece +4 Intimidação e -2 Diplomacia. Se devoto de Kally: fornece +2 Força, +2 Carisma e +2 na CD de todas as habilidades.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Cilício Vivo Deus da Tormenta",
            preco: "T$ 37.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Item vestido (cinta com anzóis). Reduz PV máx em 1/nível. Fornece +1 em todos os testes (cumulativo). Se devoto do Deus da Tormenta: bônus +2. Se Patamar Campeão+, aumenta PM máx em +1/nível.",
            fonte: "Deuses de Arton",
            imagem: "data/img/tormenta.webp"
        },
        {
            nome: "Coração Corrompido Deus da Tormenta",
            preco: "T$ 45.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Baú com coração. Se devoto do Deus da Tormenta sacrificar criatura inteligente, item absorve dano/condições do devoto (até 100 PV e 3 condições). Funciona à distância.",
            fonte: "Deuses de Arton",
            imagem: "data/img/tormenta.webp"
        },
        {
            nome: "Coroa de Flores Deusa da Natureza",
            preco: "T$ 9.000",
            espacos: "1",
            categoria: "Item Mágico",
            tipo: "Acessório Menor",
            descricao: ". Tiara. Se devoto da Deusa da Natureza: +1 Sabedoria (após 1 dia) e magias com efeitos numéricos variáveis recebem +1 por dado.",
            fonte: "Deuses de Arton",
            imagem: "data/img/coroa.webp"
        },
        {
            nome: "Cajado das Matas Deusa da Natureza",
            preco: "T$ 27.000",
            dano: "1d6/1d6",
            critico: "x2",
            alcance: "—",
            tipo_dano: "Impacto",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Arma Mágica Menor",
            descricao: "Bordão. Se devoto da Deusa da Natureza: torna-se formidável (+2) e fornece +2 Defesa ao ar livre (cumulativo). Se Patamar Campeão+, torna-se magnífico (+4).",
            fonte: "Deuses de Arton",
            imagem: "data/img/cajado-arcano.webp"
        },
        {
            nome: "Tapeçaria da Guerra Deus da Guerra",
            preco: "T$ 35.000",
            espacos: "2",
            categoria: "Item Mágico",
            tipo: "Acessório Maior",
            descricao: " Ferramenta de Guerra aprimorada (+2). Se devoto do Deus da Guerra: pode gastar (Ação Completa, CD 20 Guerra). Sucesso: bônus em Guerra aplica a todos os testes de perícia de aliados em alcance curto (cena). Sucesso por 20+: aliados recebem ação padrão extra.",
            fonte: "Deuses de Arton"
        },
        {
            "nome": "Punhal Escarlate",
            "preco": "T$ 41.000",
            "espacos": "1",
            "categoria": "Arma Mágica",
            "tipo": "Arma Específica Média",
            "descricao": "Criada por Hemera, esta adaga formidável causa +1d6 pontos de dano de essência. Além disso, conta como um orbe cristalino.",
            "fonte": "Guia de NPCs",
            "imagem": "data/img/adaga.webp"
        },
        {
            "nome": "Braceletes das Escamas",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Médio",
            "descricao": "Criados por Acteia, estes braceletes de aço escurecido são entalhados de forma a parecer escamas de dragão. Fornecem redução de dano 5 e contam como uma luva de ferro.",
            "fonte": "Guia de NPCs",
            "imagem": "data/img/bracelete-bronze.webp"
        },
        {
            "nome": "Face Dracônica",
            "preco": "T$ 25.000",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Médio",
            "descricao": "Esta máscara dourada, semelhante ao rosto estilizado de um dragão, fortalece o poder arcano do usuário. Fruto do poder de Ilítia, fornece +2 na CD para resistir a suas habilidades mágicas (incluindo magias) e conta como um medalhão de prata.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Presuntador",
            "preco": "T$ 120.000",
            "espacos": "2",
            "categoria": "Arma Mágica",
            "tipo": "Arma Específica Maior",
            "descricao": "Feito de mana solidificado e dado a Klunc como recompensa por um ato especialmente heroico, o Presuntador é um machado de guerra aumentado energético magnífico. Se Klunc ficar inconsciente, o Presuntador continua lutando sozinho, com as mesmas estatísticas que teria se estivesse sendo empunhado. Quando ataca dessa forma, o Presuntador tem Defesa 35, RD 50 e 50 PV.",
            "fonte": "Lendas de Arton"
        },
        {
            "nome": "Armadura de Khalmyr",
            "preco": "T$ 42.000",
            "espacos": "0",
            "categoria": "Armadura Mágica",
            "tipo": "Armadura Específica Média",
            "descricao": "Esta armadura completa sob medida defensora fica armazenada magicamente em uma gargantilha com o símbolo do Deus da Justiça. Enquanto está armazenada dessa forma, a armadura não ocupa nenhum espaço (embora ainda conte como um item vestido) e não impõe nenhuma penalidade ao usuário (como se ele não estivesse de armadura). Ao pronunciar o nome de Khalmyr, o usuário evoca a armadura, que é vestida automaticamente. Devolver a armadura à gargantilha também é uma ação livre.",
            "fonte": "Lendas de Arton",
            "imagem": "data/img/armadura-couro.webp"
        },
        {
            "nome": "Fêmur de Narsogg [Nome Inferido]",
            "preco": "T$ 96.000",
            "espacos": "2",
            "categoria": "Arma Mágica",
            "tipo": "Arma Específica Maior",
            "descricao": "Este montante aumentado macabro maciço formidável tumular foi fabricado a partir do fêmur da irmã de Narsogg. Uma arma única, conta como um cajado arcano. Além dos benefícios desse esotérico, as magias do usuário que causam dano de trevas causam +1 ponto de dano por dado.",
            "fonte": "Lendas de Arton"
        },
        {
            "nome": "Báculo da Fé",
            "preco": "T$ 45.000",
            "espacos": "2",
            "categoria": "Arma Mágica",
            "tipo": "Arma Específica Maior",
            "descricao": "Este bordão banhado a ouro formidável é dedicado a uma divindade específica, que pode ser identificada pelos símbolos em sua empunhadura e extremidades. Quando empunhado por um devoto dessa divindade, causa +1d6 pontos de dano de fogo (para divindades que canalizam energia positiva) ou +1d6 pontos de dano de frio (para divindades que canalizam energia negativa).",
            "fonte": "Lendas de Arton"
        },
        {
            "nome": "Batina Consagrada",
            "preco": "T$ 80.000",
            "espacos": "1",
            "categoria": "Armadura Mágica",
            "tipo": "Armadura Específica Maior",
            "descricao": "Esta armadura acolchoada guardiã refletora é dedicada a uma divindade específica, que pode ser identificada pelos símbolos bordados em seu peito e mangas. Conta como um manto eclesiástico aprimorado e, se vestida por um devoto da divindade à qual é dedicada, fornece redução de dano 5.",
            "fonte": "Lendas de Arton"
        },

        //Dragao Brasil

        {
            "nome": "Arco dos Arautos",
            "preco": "T$ 39.100",
            "espacos": "2",
            "categoria": "Item Mágico",
            "tipo": "Arma Específica Média",
            "descricao": "Arma favorita dos Arautos do Destruidor, este arco longo cruel preciso caçador pode ser encontrado por qualquer aventureiro que vasculhe os equipamentos de um membro desta organização. Você recebe a habilidade Marca da Presa do caçador, mas só pode usá-la com esta arma. Se já possui essa habilidade, em vez disso, o custo para usá-la com esta arma diminui em –1 PM.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/arco-longo.webp"
        },
        {
            "nome": "Chave Mestra",
            "preco": "T$ 25.500",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Médio",
            "descricao": "Uma chave carregada pelos membros do Claviculário como um símbolo sagrado, este item mágico também é capaz de destrancar qualquer coisa, concedendo sucesso automático em testes de Ladinagem para abrir fechaduras. Contudo, se não for usada por um dos membros do Claviculário ou por um devoto de Sszzaas, um efeito mágico sobre seu material é ativado, reduzindo a Chave Mestra a pó após o primeiro uso.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/chave-mestra.webp"
        },
        {
            "nome": "Bilhete de Valluk Delsori",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Item Mágico de Uso Único",
            "descricao": "Este item mágico é concedido apenas àqueles que conseguirem descobrir onde a companhia irá se apresentar e consigam assistir a cinco de suas apresentações seguidas. Rasgar o bilhete (como se faz ao entrar para assistir a um espetáculo) permite que o usuário se transforme em uma das grandes figuras de Arton — como o herói Orion Drake ou a própria Rainha-Imperatriz Shivara I —, mas com uma característica diferente da verdadeira pessoa. Você poderia, por exemplo, se transformar em sir Alenn Toren, mas seu tapa-olho estaria no olho esquerdo, em vez do direito. Este efeito funciona como a magia Disfarce Ilusório, com direito ao aprimoramento que aumenta o bônus de Enganação para +20 e duração de 1 dia.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/bilhete-de-valluk-delsori.webp"
        },
        {
            "nome": "Máscara do Sol Dourado",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Menor",
            "descricao": "Uma máscara amarela com o desenho de um sorriso e dois tibares de ouro no lugar dos olhos, adornados com raios solares em laranja. Enquanto seguir as Obrigações & Restrições de Azgher, as moedas mágicas que substituem os olhos da máscara fornecem +10 em Ladinagem. Contudo, por ser chamativo demais, uma pessoa vestindo este item recebe –2 em Furtividade.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/mascara-do-sol-dourado.webp"
        },
        {
            "nome": "Pingente Rubro",
            "preco": "T$ 3.000",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Menor",
            "descricao": "Este colar de matéria vermelha é estranho e parece estar sempre mudando de forma. Enquanto seguir as Obrigações & Restrições de Aharadak, sendo devoto ou não, você reduz a perda de PM causada por efeitos lefeu e da Tormenta em –1 PM por patamar.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/pingente-rubro.webp"
        },
        {
            "nome": "Âncora Naufragista",
            "preco": "T$ 3.000",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Menor",
            "descricao": "Um colar com pingente em forma de âncora, feito de ferro oxidado. Enquanto seguir as Obrigações & Restrições de Oceano, sempre que oferecer como tributo para a água do mar um item valioso (valor mínimo de T$ 100), você recebe um benefício a sua escolha por 1 dia: deslocamento de natação igual ao terrestre, +5 em Pilotagem, ou resistência a frio e eletricidade 10. Se recuperar o tributo, este item perde os efeitos e evapora.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/ancora-naufragista.webp"
        },
        {
            "nome": "Arma Silente",
            "preco": "T$ 31.000",
            "espacos": "2",
            "categoria": "Item Mágico",
            "tipo": "Arma Específica Menor",
            "descricao": "Uma arma silente é o espólio obtido por aqueles que derrotam um membro da Lança Silente. Este item é uma arma (escolha entre alabarda, azagaia, lança, lança de falange, lança montada, machado de haste ou pique) certeira equilibrada formidável de adamante que fornece +5 em testes de Conhecimento, Guerra e Nobreza cujo objetivo seja perpetuar a guerra.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/arma-silente.webp"
        },
        {
            "nome": "Bússola das Lágrimas",
            "preco": "T$ 3.500",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Menor",
            "descricao": "Desenvolvido por inventores Peregrinos, este item inicialmente rastrearia as Lágrimas de Valkaria, mas suas primeiras versões acabaram alertando para a presença de qualquer magia. Ao empunhar a Bússola das Lágrimas com uma das mãos, você tem sucesso automático em testes de Misticismo para detectar magia e pode fazê-los mesmo que não seja treinado nesta perícia.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/bussola-das-lagrimas.webp"
        },
        {
            "nome": "Corso Sombrio",
            "preco": "T$ 2.500",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Menor",
            "descricao": "De alguma forma, todo integrante do Rastro da Pólvora tem uma dessas cartas de corso entre seus pertences. Enquanto seguir as Obrigações & Restrições de Tenebra, este item funciona como uma carta de corso comum: concede permissão para usar armas de fogo em território do Reinado. Se tais obrigações forem violadas, a carta imediatamente se transforma em um corvo mágico que voa até a autoridade do Reinado mais próxima e denuncia você pelo porte e uso de itens proibidos pelo Vintílogo.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/corso-sombrio.webp"
        }
    ]
};

window.itensMagicosData = itensMagicosData;

// itensmagicos.js
// Baseado na Tabela 8-14: Acessórios Médios (p. 342–343, Livro Básico Tormenta 20)
