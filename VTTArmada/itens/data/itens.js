// itens.js

const itensData = {
    "item": [
        // ---------- MUNIÇÕES (Tabela 3-4) ----------
        {
            "nome": "Balas (20)",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Munição para pistola ou mosquete. Cada disparo consome uma bala. Recarregar uma arma de fogo é uma ação padrão.",
            "imagem": "data/img/balas.webp"
        },
        {
            "nome": "Flechas (20)",
            "preco": "T$ 1",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Munição para arco curto ou arco longo. Recarregar é uma ação livre. Cada flecha custa T$ 0,05.",
            "imagem": "data/img/flechas.webp"
        },
        {
            "nome": "Pedras (20)",
            "preco": "T$ 0,5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Munição para funda. Recarregar é uma ação de movimento. Munição barata e facilmente disponível.",
            "imagem": "data/img/pedras.webp"
        },
        {
            "nome": "Virotes (20)",
            "preco": "T$ 2",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Munição para besta leve (recarregar é ação de movimento) ou besta pesada (recarregar é ação padrão).",
            "imagem": "data/img/virotes.webp"
        },

        // ---------- EQUIPAMENTO DE AVENTURA (Tabela 3-5) ----------
        {
            "nome": "Água benta",
            "preco": "T$ 10",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Frasco de água sagrada que causa 2d10 de dano de luz em mortos-vivos ou abissais em alcance curto (Reflexos CD Sab reduz à metade).",
            "imagem": "data/img/agua-benta.webp"
        },
        {
            "nome": "Algemas",
            "preco": "T$ 15",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Par de algemas para criaturas Médias. Escapar exige Acrobacia (CD 30) ou Força (CD 25).",
            "imagem": "data/img/algemas.webp"
        },
        {
            "nome": "Arpéu",
            "preco": "T$ 5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Gancho de aço amarrado em corda. Prender exige Pontaria (CD 15). Fornece +5 em Atletismo para escalar.",
            "imagem": "data/img/arpeu.webp"
        },
        {
            "nome": "Bandoleira de poções",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Cinto de couro com bolsos que permite sacar itens alquímicos e poções como ação livre.",
            "imagem": "data/img/bandoleira-de-pocoes.webp"
        },
        {
            "nome": "Barraca",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Barraca de lona para duas pessoas. Fornece +2 em testes de Sobrevivência para acampar.",
            "imagem": "data/img/barraca.webp"
        },
        {
            "nome": "Corda",
            "preco": "T$ 1",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Rolo com 10 metros de corda de cânhamo. Arrebentar exige 2 pontos de dano de corte ou Força (CD 20).",
            "imagem": "data/img/corda.webp"
        },
        {
            "nome": "Espelho",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Pequeno espelho com diversas utilidades: observar cantos, fazer sinais de luz, etc.",
            "imagem": "data/img/espelho.webp"
        },
        {
            "nome": "Lampião",
            "preco": "T$ 7",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Lampião que emite luz como uma tocha. Queima óleo e dura 6 horas por frasco.",
            "imagem": "data/img/lampiao.webp"
        },
        {
            "nome": "Mochila",
            "preco": "T$ 2",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Mochila de viagem que aumenta a capacidade de carga em 5 espaços.",
            "imagem": "data/img/mochila.webp"
        },
        {
            "nome": "Mochila de aventureiro",
            "preco": "T$ 50",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Feita de couro resistente, esta mochila é repleta de bolsos. Aumenta sua capacidade de carga em 2 espaços. (p. 161)",
            "imagem": "data/img/mochila-de-aventureiro.webp"
        },
        {
            "nome": "Óleo",
            "preco": "T$ 0,1",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Frasco de óleo que queima em uma tocha por 6 horas.",
            "imagem": "data/img/oleo.webp"
        },
        {
            "nome": "Organizador de pergaminhos",
            "preco": "T$ 25",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Um estojo de madeira ou couro rígido. Se estiver vestindo, pode sacar pergaminhos como uma ação livre. (p. 163)",
            "imagem": "data/img/organizador-de-pergaminhos.webp"
        },
        {
            "nome": "Pé de cabra",
            "preco": "T$ 2",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Esta barra de ferro fornece +5 em testes de Força para abrir portas, janelas e baús fechados. Pode ser usado como clava. (p. 163)",
            "imagem": "data/img/pe-de-cabra.webp"
        },
        {
            "nome": "Saco de dormir",
            "preco": "T$ 1",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Saco de dormir que fornece +2 em testes de Sobrevivência para descansar.",
            "imagem": "data/img/saco-de-dormir.webp"
        },
        {
            "nome": "Símbolo sagrado",
            "preco": "T$ 5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Símbolo de uma divindade. Necessário para lançar magias divinas.",
            "imagem": "data/img/simbolo-sagrado.webp"
        },
        {
            "nome": "Tocha",
            "preco": "T$ 0,1",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Tocha que emite luz como uma lanterna. Dura 1 hora.",
            "imagem": "data/img/tocha.webp"
        },
        {
            "nome": "Vara de madeira (3m)",
            "preco": "T$ 0,2",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Uma haste com 3m de comprimento. Útil para alcançar pontos distantes. (p. 163)",
            "imagem": "data/img/vara-madeira.webp"
        },

        // ---------- FERRAMENTAS (Tabela 3-5) ----------
        {
            "nome": "Alaúde élfico",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Instrumento musical. Permite usar a habilidade Inspiração como uma ação de movimento. (p. 164)",
            "imagem": "data/img/alaude-elfico.webp"
        },
        {
            "nome": "Coleção de livros",
            "preco": "T$ 75",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Fornece +1 em Conhecimento, Guerra, Misticismo, Nobreza ou Religião (definido na compra). (p. 164)",
            "imagem": "data/img/colecao-de-livros.webp"
        },
        {
            "nome": "Equipamento de viagem",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Saco com pederneira, panelas, anzol, etc. Evita penalidade de -5 em testes de Sobrevivência para acampar. (p. 164)",
            "imagem": "data/img/equipamento-de-viagem.webp"
        },
        {
            "nome": "Estojo de disfarces",
            "preco": "T$ 50",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Cosméticos, tintas para cabelo e próteses. Evita penalidade de -5 em testes de Enganação para disfarce. (p. 164)",
            "imagem": "data/img/estojo-de-disfarces.webp"
        },
        {
            "nome": "Flauta mística",
            "preco": "T$ 150",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Instrumento musical. Um bardo que empunhe este item aumenta a CD para resistir às magias lançadas por ele em +1. (p. 164)",
            "imagem": "data/img/flauta-mistica.webp"
        },
        {
            "nome": "Gazua",
            "preco": "T$ 5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Uma barra fina de ferro. Evita penalidade de -5 em testes de Ladinagem para abrir fechaduras. (p. 164)",
            "imagem": "data/img/gazua.webp"
        },
        {
            "nome": "Instrumentos de Ofício",
            "preco": "T$ 30",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Kit para uma perícia de Ofício. Um personagem sem os instrumentos sofre –5 nessa perícia. (p. 164)",
            "imagem": "data/img/instrumentos-de-oficio.webp"
        },
        {
            "nome": "Instrumento musical",
            "preco": "T$ 35",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Um instrumento típico, como um bandolim, flauta ou lira. (p. 164)",
            "imagem": "data/img/instrumento-musical.webp"
        },
        {
            "nome": "Luneta",
            "preco": "T$ 100",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Cilindro metálico com lentes. Fornece +5 em testes de Percepção para observar coisas em alcance longo ou além. (p. 164)",
            "imagem": "data/img/luneta.webp"
        },
        {
            "nome": "Maleta de medicamentos",
            "preco": "T$ 50",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Caixa com ervas, unguentos, bandagens. Evita penalidade de -5 em Cura. (p. 164)",
            "imagem": "data/img/maleta-de-medicamentos.webp"
        },
        {
            "nome": "Sela",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Peça de couro para montaria. Evita penalidade de -5 em testes de Cavalgar. (p. 164)",
            "imagem": "data/img/sela.webp"
        },
        {
            "nome": "Tambor das profundezas",
            "preco": "T$ 80",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Instrumento musical anão. Dobra o alcance da habilidade Inspiração e de qualquer Música de Bardo. (p. 164)",
            "imagem": "data/img/tambor-das-profundezas.webp"
        },

        // ---------- VESTUÁRIO (Tabela 3-5) ----------
        {
            "nome": "Andrajos de aldeão",
            "preco": "T$ 1",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Roupas típicas de camponês. +2 em testes de Investigação para interrogar, mas -2 em perícias de Carisma social. (p. 159)",
            "imagem": "data/img/andrajos-de-aldeao.webp"
        },
        {
            "nome": "Bandana",
            "preco": "T$ 5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Lenço de bandido/pirata. Fornece +1 em Intimidação. (p. 159)",
            "imagem": "data/img/bandana.webp"
        },
        {
            "nome": "Botas reforçadas",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Botas de cano alto. Aumentam seu deslocamento em +1,5m em terreno difícil. (p. 159)",
            "imagem": "data/img/botas-reforcadas.webp"
        },
        {
            "nome": "Camisa bufante",
            "preco": "T$ 25",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Blusa colorida, com mangas e golas longas. Fornece +1 em Atuação. (p. 159)",
            "imagem": "data/img/camisa-bufante.webp"
        },
        {
            "nome": "Capa esvoaçante",
            "preco": "T$ 25",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Capa de seda chamativa. Fornece +1 em Enganação. (p. 159)",
            "imagem": "data/img/capa-esvoacante.webp"
        },
        {
            "nome": "Capa pesada",
            "preco": "T$ 15",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Capa de couro grossa e resistente. Fornece +1 em Fortitude. (p. 159)",
            "imagem": "data/img/capa-pesada.webp"
        },
        {
            "nome": "Casaco longo",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Casaco quente e pesado. Fornece +5 em Fortitude (frio), mas impõe penalidade de armadura de –2. (p. 159)",
            "imagem": "data/img/casaco-longo.webp"
        },
        {
            "nome": "Chapéu arcano",
            "preco": "T$ 50",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Chapéu pontudo. Fornece +1 ponto de mana (apenas Arcanistas). (p. 159)",
            "imagem": "data/img/chapeu-arcano.webp"
        },
        {
            "nome": "Enfeite de elmo",
            "preco": "T$ 15",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Adorno chamativo (plumas, asas, etc). Fornece resistência a medo +2. (p. 159)",
            "imagem": "data/img/enfeite-de-elmo.webp"
        },
        {
            "nome": "Farrapos de ermitão",
            "preco": "T$ 1",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Trapos com plantas. -2 em Diplomacia e Investigação (interrogar), +2 em Adestramento. (p. 159)",
            "imagem": "data/img/farrapos-de-ermitao.webp"
        },
        {
            "nome": "Gorro de ervas",
            "preco": "T$ 75",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Chapéu preenchido com ervas. Fornece +1 em Vontade. (p. 159)",
            "imagem": "data/img/gorro-de-ervas.webp"
        },
        {
            "nome": "Luva de pelica",
            "preco": "T$ 5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Luvas delicadas. Fornecem +1 em Ladinagem. (p. 159)",
            "imagem": "data/img/luva-de-pelica.webp"
        },
        {
            "nome": "Manopla",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "contaComoArma": true,
            "descricao": "Luva metálica. Ataques desarmados causam dano letal. Conta como uma arma para melhorias/encantos. (p. 159)",
            "imagem": "data/img/manopla.webp"
        },
        {
            "nome": "Manto camuflado",
            "preco": "T$ 12",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Manto para terreno específico. Fornece +2 em Furtividade no terreno correto. (p. 159)",
            "imagem": "data/img/manto-camuflado.webp"
        },
        {
            "nome": "Manto eclesiástico",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Manto típico de igrejas e templos. Fornece +1 em Religião. (p. 159)",
            "imagem": "data/img/manto-eclesiastico.webp"
        },
        {
            "nome": "Robe místico",
            "preco": "T$ 50",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Manto longo, adornado com temas arcanos. Fornece +1 em Misticismo. (p. 159)",
            "imagem": "data/img/robe-mistico.webp"
        },
        {
            "nome": "Sapatos de camurça",
            "preco": "T$ 8",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Leves e resistentes. Fornecem +1 em Acrobacia. (p. 159)",
            "imagem": "data/img/sapatos-de-camurca.webp"
        },
        {
            "nome": "Tabardo",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Peça de tecido com heráldica. Fornece +1 em Diplomacia. (p. 159)",
            "imagem": "data/img/tabardo.webp"
        },
        {
            "nome": "Traje da corte",
            "preco": "T$ 100",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Roupas de luxo. Evita penalidade de -5 em perícias de Carisma em ambientes aristocráticos. (p. 159)",
            "imagem": "data/img/traje-da-corte.webp"
        },
        {
            "nome": "Traje de viajante",
            "preco": "T$ 10",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Roupa padrão de aventureiros. Não ocupa espaço. (p. 159)",
            "imagem": "data/img/traje-de-viajante.webp"
        },
        {
            "nome": "Veste de seda",
            "preco": "T$ 25",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Roupa leve e elegante. Fornece +1 em Reflexos. (p. 159)",
            "imagem": "data/img/veste-de-seda.webp"
        },

        // ---------- ITENS ESOTÉRICOS (Tabela 3-5) ----------
        {
            "nome": "Bolsa de pó",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Pó de flores da Pondsmânia. +2 PM para aprimorar magias de encantamento ou ilusão. (p. 161)",
            "imagem": "data/img/bolsa-de-po.webp"
        },
        {
            "nome": "Cajado arcano",
            "preco": "T$ 1.000",
            "espacos": "2",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Cajado com runas. Limite de PM e CD de magias arcanas +1. (Duas mãos). Pode ser usado como bordão. (p. 161)",
            "imagem": "data/img/cajado-arcano.webp"
        },
        {
            "nome": "Cetro elemental",
            "preco": "T$ 750",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Cetro com gema (ácido, eletricidade, fogo ou frio). Magias de dano desse tipo causam +1 dado. (p. 161)",
            "imagem": "data/img/cetro-elemental.webp"
        },
        {
            "nome": "Costela de lich",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Varinha de osso. Magias causam +1d6 dano de trevas. Você não recupera PV por cura mágica. (p. 161)",
            "imagem": "data/img/costela-de-lich.webp"
        },
        {
            "nome": "Dedo de ente",
            "preco": "T$ 200",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Varinha de árvore senciente. Ao gastar 1 PM ou mais, role 1d4. Se 4, recupera 1 PM. (p. 161)",
            "imagem": "data/img/dedo-de-ente.webp"
        },
        {
            "nome": "Luva de ferro",
            "preco": "T$ 150",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Dedais interligados. Bônus de Defesa/Resistência de magias arcanas pessoais +1. (p. 161)",
            "imagem": "data/img/luva-de-ferro.webp"
        },
        {
            "nome": "Medalhão de prata",
            "preco": "T$ 750",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Medalhão com runa. Custo de magias de alcance pessoal diminui em -1 PM. (p. 161)",
            "imagem": "data/img/medalhao-de-prata.webp"
        },
        {
            "nome": "Orbe cristalino",
            "preco": "T$ 750",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Esfera perfeita. Limite de PM para magias arcanas +1. (p. 161)",
            "imagem": "data/img/orbe-cristalina.webp"
        },
        {
            "nome": "Tomo hermético",
            "preco": "T$ 1.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Livro de tratados. CD para resistir a magias arcanas de uma escola específica +2. (p. 161)",
            "imagem": "data/img/tomo-hermetico.webp"
        },
        {
            "nome": "Varinha arcana",
            "preco": "T$ 100",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Varinha com runas. CD para resistir a magias arcanas +1. (p. 161)",
            "imagem": "data/img/varinha-arcana.webp"
        },

        // ---------- ITENS ALQUÍMICOS (PREPARADOS) ----------
        {
            "nome": "Ácido",
            "preco": "T$ 10",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Frasco de vidro. Causa 2d4 de dano de ácido (Reflexos CD Des reduz à metade). (p. 160)",
            "imagem": "data/img/acido.webp"
        },
        {
            "nome": "Bálsamo restaurador",
            "preco": "T$ 10",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Pasta de ervas. Recupera 2d4 PV. (p. 160)",
            "imagem": "data/img/balsamo-restaurador.webp"
        },
        {
            "nome": "Bomba",
            "preco": "T$ 50",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Granada rudimentar. Causa 6d6 de dano de impacto em área de 3m (Reflexos CD Des reduz à metade). (p. 160)",
            "imagem": "data/img/bomba.webp"
        },
        {
            "nome": "Cosmético",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Perfume ou maquiagem. Fornece +2 em testes de perícias baseadas em Carisma até o fim da cena. (p. 160)",
            "imagem": "data/img/cosmetico.webp"
        },
        {
            "nome": "Elixir do amor",
            "preco": "T$ 100",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Humanoide que beba fica enfeitiçado pela primeira criatura que vir (Vontade CD Car anula). Dura 1d3 dias. (p. 160)",
            "imagem": "data/img/elixir-do-amor.webp"
        },
        {
            "nome": "Essência de mana",
            "preco": "T$ 50",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Poção de ervas raras. Recupera 1d4 pontos de mana. (p. 160)",
            "imagem": "data/img/essencia-mana.webp"
        },
        {
            "nome": "Fogo alquímico",
            "preco": "T$ 10",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Frasco de cerâmica. Causa 1d6 de dano de fogo e deixa em chamas (Reflexos CD Des reduz à metade e evita chamas). (p. 160)",
            "imagem": "data/img/fogo-alquimico.webp"
        },
        {
            "nome": "Pó do desaparecimento",
            "preco": "T$ 100",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Cobre criatura ou objeto, tornando-o invisível por 2d6 rodadas. (p. 160)",
            "imagem": "data/img/po-do-desaparecimento.webp"
        },

        // ---------- ITENS ALQUÍMICOS (CATALISADORES) ----------

        {
            "nome": "Baga-de-fogo",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Adiciona +1d6 de dano de fogo a magias. (p. 160)",
            "imagem": "data/img/baga-de-fogo.webp"
        },
        {
            "nome": "Dente-de-dragão",
            "preco": "T$ 45",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Aumenta o dano de magias em um dado do mesmo tipo. (p. 160)",
            "imagem": "data/img/dente-de-dragao.webp"
        },
        {
            "nome": "Essência abissal",
            "preco": "T$ 150",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Aumenta os dados de dano de magias de fogo em uma categoria (ex: d6 para d8). (p. 160)",
            "imagem": "data/img/essencia-abissal.webp"
        },
        {
            "nome": "Líquen lilás",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Adiciona +1d6 de dano de frio a magias. (p. 160)",
            "imagem": "data/img/liquen-lilas.webp"
        },
        {
            "nome": "Musgo púrpura",
            "preco": "T$ 45",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Fornece +2 na CD de magias de ilusão. (p. 160)",
            "imagem": "data/img/musgo-purpura.webp"
        },
        {
            "nome": "Ossos de monstro",
            "preco": "T$ 45",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Fornece +2 na CD de magias de necromancia. (p. 160)",
            "imagem": "data/img/ossos-de-monstro.webp"
        },
        {
            "nome": "Pó de cristal",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Diminui o custo de magias de encantamento em –1 PM. (p. 160)",
            "imagem": "data/img/po-de-cristal.webp"
        },
        {
            "nome": "Pó de giz",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Diminui o custo de magias de convocação em –1 PM. (p. 160)",
            "imagem": "data/img/po-de-giz.webp"
        },
        {
            "nome": "Ramo verdejante",
            "preco": "T$ 45",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Aumenta a cura de magias em +1 PV por dado. (p. 160)"
        },
        {
            "nome": "Saco de sal",
            "preco": "T$ 45",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Fornece +2 na CD de magias de abjuração. (p. 160)",
            "imagem": "data/img/saco-de-sal.webp"
        },
        {
            "nome": "Seixo de âmbar",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Diminui o custo de magias de transmutação em –1 PM. (p. 160)",
            "imagem": "data/img/seixo-de-ambar.webp"
        },
        {
            "nome": "Terra de cemitério",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Preparados",
            "descricao": "Adiciona +1d6 de dano de trevas a magias. (p. 160)",
            "imagem": "data/img/terra-de-cemiterio.webp"
        },
        {
            nome: "Corrosivo Mineral",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Aumenta os dados de dano de magias de ácido em uma categoria (máx. d12).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/acido.webp"
        },
        {
            nome: "Gelo Extremo",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Aumenta os dados de dano de magias de frio em uma categoria (máx. d12).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/gelo-eterno.webp"
        },
        {
            nome: "Pedaço de Língua",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Fornece +1 na CD dos testes de Fortitude para resistir a suas magias.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Raio Cristalizado",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Aumenta os dados de dano de magias de eletricidade em uma categoria (máx. d12).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Cristal Reflexivo",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Quando lança uma magia de adivinhação, você recebe +1 na Defesa pela duração da magia.",
            fonte: "Heróis de Arton",
            imagem: "data/img/po-de-cristal.webp"
        },
        {
            nome: "Essência Fantasmal",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "A magia ignora 5 pontos da RD de todas as criaturas afetadas.",
            fonte: "Heróis de Arton",
            imagem: "data/img/essencia-mana.webp"
        },
        {
            nome: "Noz Saltadora",
            preco: "T$ 90",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Após lançar a magia, pode se teletransportar para um espaço desocupado em 4,5m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Presa do Deus da Trapaça",
            preco: "T$ 45",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Você recebe 25% de chance de ignorar ataques e efeitos (incluindo de área) por 1 rodada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Água Benta (Catalisador)",
            preco: "T$ 10",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Abissais e mortos-vivos afetados por magia divina sofrem –2 em TR e +2 dados de dano.",
            fonte: "Deuses de Arton",
            imagem: "data/img/agua-benta.webp"
        },
        {
            nome: "Favo de Mel",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Ao lançar magia divina, remove condição 'cansado' de um alvo. Pode usar múltiplos favos para múltiplos alvos na mesma magia.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Fitilho Consagrado",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Amarrado ao pulso (não ocupa mão). Pode gastar para receber +1 PM para aprimoramento em magia divina.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Flor de Orlyn",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Ao lançar cura em uma criatura, uma 2ª criatura no alcance recupera PV igual à metade do efeito.",
            fonte: "Deuses de Arton",
            imagem: "data/img/balsamo-restaurador.webp"
        },
        {
            nome: "Frasco de Luz",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Fornece +2 na CD de magias de luz.",
            fonte: "Deuses de Arton",
            imagem: "data/img/essencia-mana.webp"
        },
        {
            nome: "Lantejoula",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Diminui o custo de magias de ilusão em –1 PM.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Pena de Anjo",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Alvos de magia divina recuperam 1d8 PV (além do efeito).",
            fonte: "Deuses de Arton",
            imagem: "data/img/pena.webp"
        },
        {
            nome: "Pedra de Sombras",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Reduz em –1 PM o custo de magias de trevas.",
            fonte: "Deuses de Arton",
            imagem: "data/img/pedras.webp"
        },
        {
            nome: "Vela Eclesiástica",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Catalisador",
            descricao: "Magia divina sustentada não conta no limite de sustentadas. Deve ser empunhada por toda a duração (é consumida). Limite de 1 magia extra.",
            fonte: "Deuses de Arton"
        },



        // ---------- ITENS ALQUÍMICOS (VENENOS) ----------
        {
            "nome": "Beladona",
            "preco": "T$ 1.500",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Ingestão. Vítima fica paralisada (lenta) por 3 rodadas (Fort CD Int+5 anula/reduz). (p. 161)",
            "imagem": "data/img/veneno.webp"
        },
        {
            "nome": "Bruma sonolenta",
            "preco": "T$ 150",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Inalação. Vítima fica inconsciente (enjoada por 1 rodada) (Fort CD Int anula/reduz). (p. 161)"
        },
        {
            "nome": "Cicuta",
            "preco": "T$ 60",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Ingestão. Perde 1d12 PV por rodada durante 3 rodadas (Fort CD Int reduz para 1d12 PV). (p. 161)",
            "imagem": "data/img/veneno.webp"
        },
        {
            "nome": "Essência de sombra",
            "preco": "T$ 100",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Contato. Vítima fica debilitada (fraca) (Fort CD Int anula/reduz). (p. 161)",
            "imagem": "data/img/essencia-mana.webp"
        },
        {
            "nome": "Névoa tóxica",
            "preco": "T$ 30",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Inalação. Perde 1d12 PV por rodada durante 3 rodadas (Fort CD Int reduz para 1d12 PV). (p. 161)",
            "imagem": "data/img/nevoa.webp"
        },
        {
            "nome": "Peçonha comum",
            "preco": "T$ 15",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Contato. Perde 1d12 PV (Fort CD Int anula). (p. 161)",
            "imagem": "data/img/veneno.webp"
        },
        {
            "nome": "Peçonha concentrada",
            "preco": "T$ 90",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Contato. Perde 1d12 PV por rodada durante 3 rodadas (Fort CD Int reduz para 1d12 PV). (p. 161)",
            "imagem": "data/img/veneno.webp"
        },
        {
            "nome": "Peçonha potente",
            "preco": "T$ 600",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Contato. Perde 2d12 PV por rodada durante 3 rodadas (Fort CD Int reduz para 2d12 PV). (p. 161)",
            "imagem": "data/img/veneno.webp"
        },
        {
            "nome": "Pó de lich",
            "preco": "T$ 3.000",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Ingestão. Perde 4d12 PV por rodada durante 5 rodadas (Fort CD Int+5 reduz para 4d12 PV). (p. 161)",
            "imagem": "data/img/po-do-desaparecimento.webp"
        },
        {
            "nome": "Riso de Deus do Caos",
            "preco": "T$ 150",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Inalação. Vítima fica confusa (lenta por 1 rodada) (Fort CD Int anula/reduz). (p. 161)"
        },
        {
            nome: "Esporos de Cogumelo",
            preco: "T$ 75",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Inalação. Vítima fica paralisada (lenta) por 1 rodada (Fort CD Int anula), depois imune por 1 cena.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Peçonha Anciã",
            preco: "T$ 1.800",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Contato. Perde 3d12 PV por rodada (3 rodadas). Ignora imunidade a venenos (perde 3d12 PV). Fort CD Int reduz à metade/nega.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/veneno.webp"
        },
        {
            nome: "Peçonha Irritante",
            preco: "T$ 10",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Contato. Perde 1d6 PV (sem TR).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/veneno.webp"
        },
        {
            nome: "Veneno Batráquio",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Contato. Perde 1d12 PV e fica enjoado por 1 rodada (perde 1d6 PV). Fort CD Int reduz à metade/nega.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/veneno.webp"
        },
        {
            nome: "Peçonha Flamejante",
            preco: "Variável",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Contato. Perde 1d12 PV e fica em chamas durante 3 rodadas (perde 1d12 PV).",
            fonte: "Duelo de Dragões",
            imagem: "data/img/veneno.webp"
        },
        {
            nome: "Bolor Hemorrágico",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Contato. Vítima fica sangrando e a CD para remover essa condição aumenta em +5 (fica sangrando). Fort CD Int anula.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Fumaça Onírica",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Inalação. Vítima fica fascinada por 3 rodadas (ofuscada por 1 rodada). Apenas 1/cena. Vontade CD Int anula.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Gás Moroso",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Inalação. Vítima fica vulnerável (vulnerável por 1 rodada). Fort CD Int anula.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Seiva Necrótica",
            preco: "T$ 120",
            espacos: "0,5",
            categoria: "Item Geral",
            "tipo": "Venenos",
            descricao: "Contato. Perde 2d6 PV por rodada (3 rodadas) (perde 2d6 PV). PV perdidos só podem ser recuperados com efeitos mágicos de luz. Fort CD Int reduz à metade/nega.",
            fonte: "Heróis de Arton"
        },


        // ---------- ALIMENTAÇÃO  ----------
        {
            nome: "Baga Celeste Cozida",
            preco: "T$ 15",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Todo dano de queda que você sofre é reduzido em −1d6.",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Cozido de Pimenta",
            preco: "T$ 10",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Fornece +1 em Fortitude (cumulativo com bônus de outros itens).",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Manjar de Sombras",
            preco: "T$ 20",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Você ignora os próximos 10 pontos de dano de trevas que sofrer.",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },

        {
            "nome": "Batata Valkariana",
            "preco": "T$ 2",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": " Fornece +1d6 num único teste a sua escolha até o fim do dia. (p. 163)"
        },
        {
            "nome": "Gorad quente",
            "preco": "T$ 18",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": " Fornece +2 PM temporários. (p. 163)",
            "imagem": "data/img/gorad-quente.webp"
        },
        {
            "nome": "Macarrão de Yuvalin",
            "preco": "T$ 6",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": " Fornece +5 PV temporários. (p. 163)",
            "imagem": "data/img/prato-aventureiro.webp"
        },
        {
            "nome": "Prato do aventureiro",
            "preco": "T$ 1",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": " Aumenta a recuperação de PV em +1 por nível na próxima noite de sono. (p. 163)",
            "imagem": "data/img/prato-aventureiro.webp"
        },
        {
            "nome": "Ração de viagem (por dia)",
            "preco": "T$ 0,5",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": "Alimentos conservados que alimentam uma pessoa por um dia. (p. 163)",
            "imagem": "data/img/racao-viagem.webp"
        },
        {
            "nome": "Refeição comum",
            "preco": "T$ 0,3",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": "Refeição típica em taverna (pão, queijo, cozido, bebida). (p. 163)",
            "imagem": "data/img/refeicao-comum.webp"
        },
        {
            "nome": "Sopa de peixe",
            "preco": "T$ 1",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Básico",
            "descricao": " Aumenta a recuperação de PM em +1 por nível na próxima noite de sono. (p. 163)",
            "imagem": "data/img/sopa-peixe.webp"
        },

        {
            nome: "Banquete de Canceronte",
            preco: "T$ 36",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Você recebe 1d4+1 dados de auxílio (d6 com Mestre Cuca) para gastar em testes de perícia.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Coc-au-Triz",
            preco: "T$ 54",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Ao consumir, escolha uma habilidade com custo em PM. Seu custo diminui em –1 PM.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Cozido de Serpe",
            preco: "T$ 12",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Requer teste estendido de Ofício (cozinheiro) (CD 20, 3 sucessos). Se passar, fornece +1 em todos os testes de perícia. Se falhar, é envenenado.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Gorlogg Ensopado",
            preco: "T$ 6",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Em sua próxima noite de sono, aumenta a recuperação de PV e PM em +1 por nível.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/gorlogg.webp"
        },
        {
            nome: "Omelete Monstruosa",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Você recebe +2 em rolagens de dano e –2 em testes de Sabedoria. Com ovos de dragão, muda para +5 e –5.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Sashimi de Kraken",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Você recebe +2 em Diplomacia (cumulativo) e 5 PM temporários.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Macarrão de Caravana",
            preco: "T$ 5",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Recebe +2 em testes de Fortitude contra marcha forçada e em testes contra o perigo complexo jornada pelos ermos.",
            fonte: "Atlas de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Assado Deheoni",
            preco: "T$ 10",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Até o fim do dia, você pode rolar novamente um único teste recém realizado (exceto testes de ataque), mas deve ficar com o segundo resultado.",
            fonte: "Atlas de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Buquê de Thantalla",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Efeitos que recuperem seus pontos de mana recuperam 1 PM a mais.",
            fonte: "Atlas de Arton"
        },
        {
            nome: "Bolo de Linhaça",
            preco: "T$ 5",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. O acolhedor e reconfortante bolo dos pequenos. Concede +2 em Atletismo e Iniciativa.",
            fonte: "Duelo de Dragões",
            imagem: "data/img/prato-aventureiro.webp"
        },

        {
            nome: "Treckodimm",
            preco: "T$ 10",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Prato especial. Doce de mel, farinha de grão-de-bico e polpa de treckod. Fornece resistência a cansaço +2.",
            fonte: "Duelo de Dragões"
        },
        {
            nome: "Abraço da Noite",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Tenebra). Até o fim do dia, pode usar Carícia Sombria 1 vez (se já tem, causa 4d6). Funciona em mortos-vivos.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Assado de Entranhas",
            preco: "T$ 2",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Megalokk). Até o fim do dia, pode invocar instintos para receber +1 dano corpo a corpo por uma cena.",
            fonte: "Deuses de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Bênção dos Mares",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Oceano). Até o fim do dia, pode invocar poder para receber deslocamento de natação igual ao seu deslocamento (ou +3m se já tem) por uma cena.",
            fonte: "Deuses de Arton",
            imagem: "data/img/bencao.webp"
        },
        {
            nome: "Bolinho de Jade",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Lin-Wu). Até o fim do dia, pode usar Kiai Divino 1 vez (se já tem, usa 1x sem custo de PM).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Bombas de Saber",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Tanna-Toh). 1/dia, ao fazer um teste de perícia, pode receber benefícios de ser treinado nela para esse teste.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Caldo de Lena",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Lena). Quando recebe cura mágica de luz, recupera +2 PV.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Coragem de Sangue",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Arsenal). 1/dia, quando faz a ação agredir, pode executar um ataque extra.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Deleite Mágico",
            preco: "T$ 18",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Wynna). Ao consumir, escolha uma magia de 1º círculo. Até o fim do dia, pode lançá-la 1 vez (sem aprimoramentos, custo 2 PM, atrb. Sabedoria).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Frescor de Nimb",
            preco: "T$ 1",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Nimb). Ao ingerir, escolha um deus aleatoriamente. Recebe o benefício do prato desse deus (se cair Deus do Caos, role 2x).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Joia do Deserto",
            preco: "T$ 5",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Azgher). 1/dia, arma de corte causa +1d6 fogo (+2d6 vs mortos-vivos). Dura 3 acertos ou fim da cena.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Justos de Khalmyr",
            preco: "T$ 2",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Khalmyr). Até o fim do dia, ao fazer um teste de perícia, pode escolher 10 (em vez de rolar).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Justos Virtuosos",
            preco: "T$ 6",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Sszzaas). 1/dia, quando inimigo em alcance curto usa habilidade, você pode ser afetado como se fosse aliado dele.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Manjar da Paz",
            preco: "T$ 7",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Marah). 1/dia, quando criatura em alcance curto ataca, você pode forçá-la a rolar 2 dados e usar o pior.",
            fonte: "Deuses de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Ouro de Dragão",
            preco: "T$ 6",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Kallyadranoch). 1/dia, pode receber +1 em testes de ataque por uma cena.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Ovos de Raposa",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Hynnin). 1/dia, pode rolar novamente um teste de Enganação ou Ladinagem recém-feito.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Pão de Thwor",
            preco: "T$ 1",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Thwor). 1/dia, pode rolar novamente um teste de Fortitude ou perícia baseada em Força.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Presente da Terra",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Allihanna). Pode ser fabricado com Sobrevivência. 1/dia, pode rolar novamente teste de Adestramento ou Sobrevivência.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Renascer Gentil",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Thyatis). A primeira vez no dia em que seus PV forem reduzidos a 0 ou menos, ficam em 1.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Suflê Rubro",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Aharadak). Início de cena de ação: role 1d6. Ímpar: fascinado na 1ª rodada. Par: +5 em um teste de perícia até fim do próximo turno.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Tesouro de Valkaria",
            preco: "T$ 2",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais Divinos",
            descricao: "(Só pode ser preparado por devotos de Valkaria). 1/dia, recebe +5 em um teste de resistência contra efeitos de movimento.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Assado de Carnes",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em rolagens de dano corpo a corpo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Balinhas",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em rolagens de dano de magias.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Banquete dos Heróis",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +1 em um atributo a sua escolha (não oferece PV/PM/perícias adicionais).",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Bolo de Cenoura",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Fornece +2 em testes de Percepção.",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Bolo do Panteão",
            preco: "T$ 200",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Escolha uma habilidade. Seu custo diminui em –1 PM (mínimo 1).",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Ensopado Reforçado",
            preco: "T$ 12",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +20 PV temporários, mas seu deslocamento diminui em –1,5m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estrogonofe",
            preco: "T$ 18",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em testes de Vontade.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Futomaki",
            preco: "T$ 12",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em testes de Diplomacia.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Gorvelã",
            preco: "T$ 90",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Fornece +5 PM temporários.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Javali do Bosque Enevoado",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 na Defesa.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Manjar dos Titãs",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +1d4 em testes de perícias baseadas em Força, Destreza ou Constituição.",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Ovo de Monstro Frito",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +10 PV temporários.",
            fonte: "Heróis de Arton",
            imagem: "data/img/ovo.webp"
        },
        {
            nome: "Pão de Queijo",
            preco: "T$ 10",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em testes de Fortitude.",
            fonte: "Heróis de Arton",
            imagem: "data/img/queijo.webp"
        },
        {
            nome: "Pavão Celestial",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +1d4 em testes de perícias baseadas em Inteligência, Sabedoria ou Carisma.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Pizza",
            preco: "T$ 6",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +1 em todos os testes de resistência.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Porco Deheoni",
            preco: "T$ 36",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +1 em testes de ataque corpo a corpo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/porco.webp"
        },
        {
            nome: "Salada de Salistick",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Aumenta seu deslocamento em +1,5m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Salada Élfica",
            preco: "T$ 4",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Fornece +1 em testes de ataque à distância.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Salada Imperial",
            preco: "T$ 6",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Fornece +2 em testes de Iniciativa.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sashimi",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em rolagens de dano à distância.",
            fonte: "Heróis de Arton",
            imagem: "data/img/prato-aventureiro.webp"
        },
        {
            nome: "Sopa de Cogumelos",
            preco: "T$ 6",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Recebe +2 em testes de Misticismo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/sopa-peixe.webp"
        },
        {
            nome: "Torta de Maçã",
            preco: "T$ 2",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Pratos Especiais",
            descricao: "Fornece resistência a veneno +5.",
            fonte: "Heróis de Arton",
            imagem: "data/img/maca-de-guerra.webp"
        },
        // Bebidas
        {
            nome: "Licor de Lágrimas",
            preco: "T$ 8",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 15). Fornece +5 em Vontade, mas se falhar em algum teste de Vontade pela duração do prato, fica esmorecido.",
            fonte: "Duelo de Dragões"
        },

        {
            nome: "Baba de Troll",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (não alcoólica). Fornece +1d4 em um teste a sua escolha até o fim do dia.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Barba Queimada",
            preco: "T$ 45",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 20). Cerveja anã. Fornece redução de dano 2.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Cerveja Deheoni",
            preco: "T$ 15",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 15). Bebida comum no Reinado. Fornece +1 em testes de resistência.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Dilínio",
            preco: "T$ 600",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 20). Destilado raro. Seu limite de gasto de PM aumenta em +1. Não pode ser fabricado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Grogue Negro",
            preco: "T$ 15",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 15). Rum pirata. Quando você usa Audácia, o bônus fornecido pelo poder aumenta em +1.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Grogue Rubro",
            preco: "T$ 45",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 20). Variação picante do Grogue Negro. Você pode usar Audácia para testes de ataque.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Hidromel Uivante",
            preco: "T$ 21",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 20). Fabricada nas montanhas geladas. Fornece +2 em rolagens de dano corpo a corpo.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Licor Feérico",
            preco: "T$ 450",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 25). De aparência enevoada. Escolha uma habilidade; seu custo para ativar diminui em –1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sidra Ahleniense",
            preco: "T$ 45",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 15). Bebida doce. Fornece +2 em testes de perícias originalmente baseadas em Carisma.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Vinho Pruss",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 15). Batizado em homenagem ao Rei-Imperador Thormy. Fornece 3 PM temporários.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Vinho Élfico",
            preco: "T$ 90",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida (alcoólica, CD 20). Aguça a mente, fornecendo +1 na CD para resistir a suas habilidades.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Algravia",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Bebidas",
            descricao: "Bebida alcoólica. Fornece +1 em perícias de Carisma (cumulativo com outros itens e doses). Cada dose além da 1ª exige Fort (CD 15 + 5/dose) ou fica enjoado.",
            fonte: "Ameaças de Arton"
        },

        // ---------- ANIMAIS E VEÍCULOS (Tabela 3-5) ----------
        {
            "nome": "Alforje",
            "preco": "T$ 30",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Sacos de couro para sela. Permitem que uma montaria carregue até 10 espaços. (p. 163)"
        },
        {
            "nome": "Falcão",
            "preco": "T$ 150",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Um falcão é um parceiro especial (perseguidor) que fornece os benefícios a seguir. Iniciante: uma vez por cena, você pode gastar uma ação de movimento e fazer um teste de Adestramento (CD 10). Se passar, o falcão concede a você +1 em testes de ataque, Percepção e Sobrevivência até o fim da cena. Para cada 10 pontos pelos quais o resultado de seu teste passar a CD, esse bônus aumenta em +1. Veterano: você pode usar Sentidos Aguçados. Mestre: uma vez por rodada, você pode gastar 1 PM para fazer uma criatura em alcance médio ficar cega por 1d4 rodadas (Ref CD Car evita)",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Cão de caça",
            "preco": "T$ 150",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Parceiro perseguidor (iniciante) ou montaria (Pequeno/Minúsculo). (p. 163)",
            "imagem": "data/img/cao.webp"
        },
        {
            "nome": "Cavalo",
            "preco": "T$ 75",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Parceiro montaria (iniciante). Deslocamento 12m, +1 ação de movimento (deslocar). (p. 163)",
            "imagem": "data/img/cavalo.webp"
        },
        {
            "nome": "Cavalo de guerra",
            "preco": "T$ 400",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Montaria (parceiro iniciante). Não se assusta em combate. (p. 163)",
            "imagem": "data/img/cavalo.webp"
        },
        {
            "nome": "Pônei",
            "preco": "T$ 5",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Montaria (iniciante) para raças Pequenas. (p. 163)",
            "imagem": "data/img/ponei.webp"
        },
        {
            "nome": "Pônei de guerra",
            "preco": "T$ 30",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Montaria (iniciante) para raças Pequenas. Não se assusta em combate. (p. 163)",
            "imagem": "data/img/ponei.webp"
        },
        {
            "nome": "Trobo",
            "preco": "T$ 60",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Animal",
            "descricao": "Ave-touro. Montaria (iniciante). Deslocamento 9m, +1 ação de movimento (deslocar), +1 em testes de resistência. (p. 163)",
            "imagem": "data/img/trobo.webp"
        },
        {
            "nome": "Balão goblin",
            "preco": "T$ 200",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Veículo",
            "descricao": "Engenho voador. Deslocamento voo 12m, 100 PV, Defesa 5. Carrega 160 espaços. (p. 163)",
            "imagem": "data/img/balao-goblin.webp"
        },
        {
            "nome": "Carroça",
            "preco": "T$ 150",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Veículo",
            "descricao": "Veículo terrestre puxado por 2 cavalos ou 1 trobo. Deslocamento 9m, 50 PV, Defesa 8. Carrega 80 espaços. (p. 163)",
            "imagem": "data/img/carroca.webp"
        },
        {
            "nome": "Carruagem",
            "preco": "T$ 500",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Veículo",
            "descricao": "Similar à carroça, mas com cabine fechada (cobertura leve). (p. 163)",
            "imagem": "data/img/carruagem.webp"
        },
        {
            "nome": "Canoa",
            "preco": "T$ 70",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Veículo",
            "descricao": "Embarcação simples de tronco de árvore. Mesmas estatísticas de carroça, mas com deslocamento de natação. (p. 163)",
            "imagem": "data/img/canoa.webp"
        },
        {
            "nome": "Veleiro",
            "preco": "T$ 10.000",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Veículo",
            "descricao": "Navio de viagem com três mastros. (p. 163)",
            "imagem": "data/img/veleiro.webp"
        },
        // (Itens de Ameaças de Arton)
        {
            nome: "Caixa de Voz",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Este complexo mecanismo tem 1d4 cargas: quando usa uma habilidade de bardo ou nobre com alcance curto ou médio, você pode gastar uma carga para aumentar seu alcance em um passo. Não pode ser fabricado.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Corda de Teia",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Feita de teia de aranha gigante, esta corda de 10m funciona como uma corda normal, mas é mais resistente. Arrebentá-la exige 5 pontos de dano de corte ou um teste de Força (CD 28).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/corda.webp"
        },
        {
            nome: "Dente de Wisphago",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Pode ser vestido como um amuleto. Quando faz um teste de resistência contra uma magia arcana, você pode gastar o amuleto para rolar novamente esse teste com um bônus de +2. Uma vez ativado, o amuleto se desfaz. Não pode ser fabricado.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Gema de Força",
            preco: "",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Esta gema tem 1d4 cargas. Empunhando a gema, você pode gastar uma ação padrão e uma carga para produzir um domo semelhante ao efeito básico da magia Campo de Força. Alternativamente, pode usar uma carga para reduzir o custo de Campo de Força em –2 PM. Não pode ser fabricada.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/gema-elemental.webp"
        },
        {
            nome: "Garra Feroz",
            preco: "T$ 60",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            contaComoArma: true,
            descricao: "Estas pinças de insetos gigantes, presas com tiras de couro, funcionam como uma manopla, mas seus benefícios também se aplicam a uma garra ou a uma arma natural.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/garra.webp"
        },
        {
            nome: "Manto do Mantor",
            preco: "T$ 450",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Feito a partir do couro de um mantor. Na escuridão completa fornece camuflagem total, mesmo contra criaturas que vejam no escuro.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/manto-da-resistencia.webp"
        },
        {
            nome: "Manto Pesado",
            preco: "T$ 10",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Estas vestes pesadas com um grande capuz oferecem proteção contra o sol. Você recebe imunidade a condição ofuscado e não é considerado sob luz solar.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/manto-da-resistencia.webp"
        },
        {
            nome: "Sombreiro",
            preco: "T$ 10",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Tipo de chapéu com abas muito largas. Fornece resistência a efeitos de sentidos +2.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Traje Selako",
            preco: "T$ 90",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Feito com couro de selako. Você recebe +2 em testes de Atletismo para nadar e +3m em seu deslocamento de natação.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Ankh Solar",
            preco: "T$ 450",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Pode ser usado como arma leve simples (dano 1d6, crítico 19, corte). Suas magias com TR recebem aprimoramento: '+2 PM: criaturas que falham na resistência não podem recuperar PV por 1 rodada.'",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Tomo de Guerra",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Quando lança uma magia de evocação, você recebe +1 PM para gastar em aprimoramentos.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/tomo-hermetico.webp"
        },
        {
            nome: "Tomo do Rancor",
            preco: "T$ 750",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Suas magias de dano recebem o aprimoramento: '+2 PM: além do normal, a magia causa +2d8+2 pontos de dano (corte, impacto ou perfuração).'",
            fonte: "Ameaças de Arton",
            imagem: "data/img/tomo-hermetico.webp"
        },
        {
            nome: "Bálsamo de Drogadora",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Aplicar é uma ação completa e cura 4d6+4 PV.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/balsamo-restaurador.webp"
        },
        {
            nome: "Bomba de Fumaça",
            preco: "T$ 15",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Segue as regras da bomba, mas cria uma nuvem de fumaça com 6m de raio (camuflagem leve a 1,5m, total a 3m) por 1 cena.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/bomba-fumaca.webp"
        },
        {
            nome: "Elixir Quimérico",
            preco: "T$ 120",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Beber (ação padrão) concede arma natural de mordida (1d6, crit x2) por 1 cena. Pode gastar 1 PM para ataque extra com a mordida. Se já possui mordida, dano aumenta em um passo.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Éter Elemental",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Aplicar (ação padrão) em arma ou 20 munições. Causa +1d4 de dano do tipo elemental (ácido, eletricidade, fogo, frio) até o fim da cena.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Isca Putrefata",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Arremessar (ação padrão, alcance médio). Gruda no alvo (Ref CD Des evita) por 1d6 rodadas. Mortos-vivos não inteligentes em alcance curto são atraídos (Von CD Des evita) e ficam fascinados ou atacam o alvo.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Lágrima Pétrea",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Aplicar (ação padrão) ou arremessar (alcance curto). Remove todos os efeitos de metamorfose (Ref CD Des evita).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Óleo de Baleia",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Aplicar (ação padrão) em arma ou munição para ignorar penalidades de combate submerso até o fim da cena.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/fogo-alquimico.webp"
        },
        {
            nome: "Óleo de Besouro",
            preco: "T$ 50",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Arremessar (ação de movimento para acender, padrão para arremessar, alcance curto). Criaturas a 3m sofrem 4d6 dano de fogo e ficam em chamas (Ref CD Des reduz à metade e evita chamas).",
            fonte: "Ameaças de Arton",
            imagem: "data/img/fogo-alquimico.webp"
        },
        {
            nome: "Pó Azul",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado alquímico. Inalar (ação completa) recupera 2d4 PM.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/po-do-desaparecimento.webp"
        },
        {
            nome: "Bulette (Animal)",
            preco: "T$ 500",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Capivara (Animal)",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante) para personagens Pequenos e Minúsculos.",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Corcel do Deserto (Animal)",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Dromedário (Animal)",
            preco: "T$ 75",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Elefante (Animal)",
            preco: "T$ 1.500",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Hiena (Animal)",
            preco: "T$ 220",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro especial (iniciante) ou montaria (Pequeno/Minúsculo).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Leão (Animal)",
            preco: "T$ 800",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Rinoceronte (Animal)",
            preco: "T$ 600",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        {
            nome: "Urso Pardo (Animal)",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Parceiro montaria (iniciante).",
            fonte: "Ameaças de Arton"
        },
        // (Itens do Atlas de Arton)

        // (Itens de Guerra Artoniana)
        {
            nome: "Prosciutto Del Mare",
            preco: "T$ 12.000",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Embarcação de três velas, típica para viagens, própria para rios e alto-mar. Veículo Enorme, tripulação 5/30, deslocamento flutuar 12m, Defesa 12, 280 PV, RD 5.",
            fonte: "Guerra Artoniana"
        },
        {
            nome: "Caronte",
            preco: "T$ 25.000",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Navio de Draco Mandíbula. Madeira reforçada, três mastros, 2 canhões. Veículo Enorme, tripulação 10/40, deslocamento flutuar 9m (15m em alto mar), Defesa 14, 350 PV, RD 10.",
            fonte: "Guerra Artoniana"
        },
        {
            nome: "Navio Que Nós Compramos Barato",
            preco: "T$ 1.500",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Embarcação pequena e velha, um mastro e alguns remos. Impõe –2 nos testes de Pilotagem. Veículo Grande, tripulação 1/10, deslocamento flutuar 9m, Defesa 10, 100 PV, RD 5.",
            fonte: "Guerra Artoniana"
        },

        // (Item de Duelo de Dragões)

        // (Itens de Heróis de Arton - Munições)
        {
            "nome": "Bola de Ferro (1)",
            "preco": "T$ 5",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Munição para canhão portátil. Vendida individualmente.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Flechas Assobiadoras (20)",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Simulam o canto de um pássaro. Permite fazer uma finta contra qualquer alvo dentro do alcance da arma (normalmente, apenas alcance curto).",
            "fonte": "Heróis de Arton",
            "imagem": "data/img/flechas.webp"
        },
        {
            "nome": "Flechas de Caça (20)",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Possuem cabeças chatas e pesadas. Esta munição causa dano de impacto não letal.",
            "fonte": "Heróis de Arton",
            "imagem": "data/img/flechas.webp"
        },
        {
            "nome": "Flechas Pesadas (20)",
            "preco": "T$ 10",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Versões de ponta mais pesada e afiada. Você sofre –2 em testes de ataque com estas flechas, mas ignora 5 pontos da RD dos alvos.",
            "fonte": "Heróis de Arton",
            "imagem": "data/img/flechas.webp"
        },
        {
            "nome": "Virotes Pesados (20)",
            "preco": "T$ 20",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Versões de ponta mais pesada e afiada. Você sofre –2 em testes de ataque com estes virotes, mas ignora 5 pontos da RD dos alvos.",
            "fonte": "Heróis de Arton",
            "imagem": "data/img/virotes.webp"
        },

        // (Itens de Heróis de Arton - Equipamento de Aventura)
        {
            nome: "Ábaco",
            preco: "T$ 45",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Requer treino em Conhecimento. Se fizer teste de Ofício para sustento, recebe TO em vez de T$. Se possuir Poder Monetário, limite de TO/dia +2.",
            fonte: "Heróis de Arton",
            imagem: "data/img/instrumento-musical-exotico.webp"
        },
        {
            nome: "Ampulheta",
            preco: "T$ 45",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Mede uma hora. Quando escolhe 10 em Ofício (alquimista), considera o resultado do d20 como 12.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Aparelho de Chá",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Conjunto de xícaras, pires e bule. 1/cena, recebe +1d4 em um teste de Diplomacia ou Enganação com alguém que esteja tomando chá com você.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Armação para Mochila",
            preco: "T$ 50",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Estrutura de metal. Uma mochila de aventureiro encaixada nela aumenta a capacidade de carga em 6 espaços (em vez de 2). A ação para sacar itens dela aumenta em um passo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/mochila.webp"
        },
        {
            nome: "Asas do Texugo",
            preco: "T$ 200",
            espacos: "2",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Mochila com asas retráteis. Requer ação de movimento para estender (ocupa espaço de criatura 1 categoria maior). Permite voar (desl. 12m) por 1 rodada (+1 rodada/5 pontos acima de CD 15 em Atletismo para saltar). Ao fim, plana (Queda Suave). Causa vulnerabilidade e condição ruim para magias (ignora com Pilotagem).",
            fonte: "Heróis de Arton",
            imagem: "data/img/asas.webp"
        },
        {
            nome: "Astrolábio",
            preco: "T$ 90",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Instrumento de navegação. Permite usar Conhecimento em vez de Sobrevivência para orientar-se.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Bainha Adornada",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Coberta de ornamentos. Permite que você use armas como parte de um Traje da Corte, sem chamar atenção.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Bússola",
            preco: "T$ 45",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Instrumento de navegação que aponta para o norte. Quando faz um teste de Sobrevivência para orientar-se, rola 2 dados e usa o melhor.",
            fonte: "Heróis de Arton",
            imagem: "data/img/bussola.webp"
        },
        {
            nome: "Dente Falso",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Minúsculo frasco disfarçado de dente. Carrega 1 preparado alquímico consumível ou poção sem ocupar espaços. Permite ingerir o item como ação de movimento. É perdido após o uso.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Diagrama Anatômico",
            preco: "T$ 75",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Pergaminho com esquemas de corpos humanoides. Quando usa Ataque Furtivo, você recebe +1 na margem de ameaça.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Espelho Refletor",
            preco: "T$ 45",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Pequeno espelho. Pode gastar ação de movimento para teste de Ladinagem oposto (Reflexos) contra criatura em alcance curto. Se vencer, ela fica desprevenida contra seu próximo ataque (até fim do próximo turno). 1/cena.",
            fonte: "Heróis de Arton",
            imagem: "data/img/espelho.webp"
        },
        {
            nome: "Estetoscópio",
            preco: "T$ 60",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Pode gastar ação padrão para teste de Investigação para ajudar a si mesmo (+2) em um teste de Cura, ou de Ladinagem (abrir fechadura ou sabotar) no próximo turno.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estrepes (bolsa para 3m)",
            preco: "T$ 5",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Cobre um quadrado de 3m (ação padrão). Causa 1d4 dano de perfuração em quem pisa na área. A criatura fica lenta até o fim do próximo turno dela.",
            fonte: "Heróis de Arton",
            imagem: "data/img/terra-de-cemiterio.webp"
        },
        {
            nome: "Favor da Pessoa Amada",
            preco: "—",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Conquistado, não comprado. Item pessoal (mecha de cabelo, lenço, etc.). Fornece +2 PM (cumulativo com outros itens). Para de funcionar se houver desavença.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Lampião de Foco",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Lanterna sofisticada. Funciona como um lampião, mas concentra a luz em um cone de 24m.",
            fonte: "Heróis de Arton",
            imagem: "data/img/lampiao.webp"
        },
        {
            nome: "Leque",
            preco: "T$ 3",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "1/cena, quando faz um teste de Vontade, você pode se abanar para usar seu Carisma em vez de Sabedoria nesse teste.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Livro de Métodos Anti-Deus do Caos",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Contém métodos de estatística e probabilidade. Pode gastar 1 minuto e 1 PM para substituir testes de Jogatina por testes de Conhecimento até o fim da cena.",
            fonte: "Heróis de Arton",
            imagem: "data/img/grimorio.webp"
        },
        {
            nome: "Lupa",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Lente de aumento. Quando faz um teste de Investigação para procurar, pode rolar 2 dados e usar o melhor.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mapa",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Mapa de uma região específica. Fornece +5 em testes de Sobrevivência para orientar-se nessa região.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mecanismo de Mola",
            preco: "T$ 25",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Preso ao antebraço. Pode manter 1 arma leve (ocultável). Permite sacar essa arma como ação livre e ela recebe a qualidade 'Surpreendente' para esse ataque.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mochila Discreta",
            preco: "T$ 20",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Possui compartimento oculto (1 espaço). Recebe +5 em Ladinagem para ocultar esses itens. Deve ser vestida (não ocupa espaço de carga).",
            fonte: "Heróis de Arton",
            imagem: "data/img/mochila.webp"
        },
        {
            nome: "Prancheta",
            preco: "T$ 5",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Tabuleta de madeira com pergaminho. Carregar uma lhe confere aparência de autoridade. Você pode fazer testes de Nobreza para etiqueta mesmo sem ser treinado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sinete",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Estojo com cera e carimbo com símbolo pessoal. Reduz em –1 PM o custo de habilidades como Autoridade Feudal e Favor.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Caixa de Voz",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Mecanismo com 1d4 cargas. Pode gastar 1 carga para aumentar o alcance de uma habilidade de bardo ou nobre em um passo. Não pode ser fabricado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Gema de Força",
            preco: "",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Gema com 1d4 cargas. Pode gastar 1 ação padrão e 1 carga para criar o efeito básico de Campo de Força. Pode gastar 1 carga para reduzir o custo de Campo de Força em –2 PM. Não pode ser fabricada.",
            fonte: "Heróis de Arton",
            imagem: "data/img/gema-elemental.webp"
        },
        {
            nome: "Apito de Caça",
            preco: "T$ 6",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Fornece +1 em Adestramento. Permite usar 'Manejar Animal' com parceiro não inteligente (Int -4 ou -5) como ação livre (1/rodada).",
            fonte: "Heróis de Arton",
            imagem: "data/img/apito.webp"
        },
        {
            nome: "Baralho Marcado",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Recebe +2 em testes de Jogatina com cartas. Se rolar 1 natural, você é descoberto.",
            fonte: "Heróis de Arton",
            imagem: "data/img/baralho.webp"
        },
        {
            nome: "Cinto de Utilidades",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Cinturão de couro cheio de bolsos. Se estiver vestindo, pode sacar e guardar engenhocas como uma ação livre.",
            fonte: "Heróis de Arton",
            imagem: "data/img/cinto-da-forca-do-gigante.webp"
        },
        {
            nome: "Espelho Cirúrgico",
            preco: "T$ 12",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Haste com espelho articulado. Se estiver usando, você não sofre a penalidade de –5 em testes de Cura em si mesmo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/espelho.webp"
        },
        {
            nome: "Estandarte",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Precisa ser empunhado com uma mão. Seus capangas recebem +1 na Defesa e em rolagens de dano.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estandarte Portátil",
            preco: "T$ 20",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Como Estandarte, mas usado nas costas ou na sela (mãos livres). Impõe penalidade de armadura –2 (se nas costas) ou conta como item vestido (na montaria).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Molde Pré-Fabricado",
            preco: "T$ 500",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Conjunto de peças (um para cada escola de magia). Diminui o tempo de fabricação de uma engenhoca (da escola do molde) para três dias.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Clarim Deheoni",
            preco: "T$ 150",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Criaturas a sua escolha sob efeito de sua Inspiração recebem +1 em testes de resistência.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Cítara Heptatônica",
            preco: "T$ 250",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Criaturas a sua escolha sob efeito de sua Inspiração recebem +2 na CD da primeira habilidade mágica que usarem.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Cornamusa de Doherimm",
            preco: "T$ 750",
            espacos: "2",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. É vestida (não empunhada). Custo de Inspiração -1 PM, mas sofre –2 na Defesa.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Flauta Sar-Allan",
            preco: "T$ 150",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Concede +5 no teste de Atuação para Música de bardo, mas apenas contra criaturas reptilianas.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Gaita de Foles",
            preco: "T$ 500",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Ao usar Inspiração, teste Atuação (CD 20 + PMs gastos). Se passar, bônus +1. Se falhar, habilidade falha.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Lira de Casco de Tartaruga",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Suas Músicas e magias de bardo de cura recuperam +1 PV por dado de cura.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Marionetes",
            preco: "T$ 90",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical (visual). Recebe +2 no teste oposto de Atuação para Música: Balada Fascinante e Fascinar em Massa, e na CD de Manipular e Manipular em Massa.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Pandeiro das Estradas",
            preco: "T$ 200",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Pode gastar uma ação de movimento (em vez de padrão) para manter a concentração em uma Música de bardo.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Tamborete Marcial",
            preco: "T$ 80",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Criaturas a sua escolha sob efeito de sua Inspiração recebem +3m em deslocamento.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Trombeta Tapistana",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Quando você usa Inspiração, cada criatura a sua escolha sob efeito recebe uma ação de movimento extra no próximo turno.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Violino Soprano",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Cada criatura a sua escolha sob efeito de sua Inspiração recebe +1d4 em seu próximo teste de perícia (exceto testes de ataque).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Avental de Forja",
            preco: "T$ 75",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Avental grosso de couro. Se estiver usando, pode perder 1d6 PV para receber +1 em um teste de Ofício (cumulativo).",
            fonte: "Heróis de Arton",
            imagem: "data/img/avental.webp"
        },
        {
            nome: "Camisolão",
            preco: "T$ 12",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Roupa de dormir confortável. Dormir com um camisolão (e nenhum outro item vestido) transforma condições de descanso confortáveis em luxuosas.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Capa com Dragonas",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Capa elegante com ombreiras. Enquanto você estiver vestindo esta capa, sua armadura conta como um traje da corte.",
            fonte: "Heróis de Arton",
            imagem: "data/img/capa-esvoacante.webp"
        },
        {
            nome: "Casaca de Apetrechos",
            preco: "T$ 75",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Casacão pesado. Aumenta sua capacidade de carga em 4 espaços (ela própria não gasta espaço). Impõe penalidade de armadura de –2 e não pode ser usada com armadura.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Chapéu Emplumado",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Na primeira rodada de um combate, pode gastar uma ação de movimento para saudar seus inimigos. Se fizer, recebe 1 PM temporário.",
            fonte: "Heróis de Arton",
            imagem: "data/img/chapeu-arcano.webp"
        },
        {
            nome: "Elmo Leve",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Capuz de couro ou capacete aberto. Fornece fortificação 25%, mas impõe –2 em Iniciativa e Percepção (ignora penalidade se proficiente em armadura pesada).",
            fonte: "Heróis de Arton",
            imagem: "data/img/enfeite-de-elmo.webp"
        },
        {
            nome: "Elmo Pesado",
            preco: "T$ 200",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Coifa ou capacete fechado. Fornece fortificação 50%, mas impõe –5 em Iniciativa e Percepção (reduz para –2 se proficiente em armadura pesada).",
            fonte: "Heróis de Arton",
            imagem: "data/img/enfeite-de-elmo.webp"
        },
        {
            nome: "Jaqueta de Couro",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Você recebe +1 em testes de Investigação para interrogar e gasta apenas metade do dinheiro (arredondado para cima) neles.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Luva de Falcoaria",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Luva que recobre o antebraço. Concede +2 em testes de Adestramento com pássaros e criaturas semelhantes.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Luva Magnética",
            preco: "T$ 20",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Luva com ímãs nas pontas dos dedos. A vítima de um teste de Ladinagem para punga sofre –5 no teste de Percepção para notar.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Máscara Bucal",
            preco: "T$ 3",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Pano que cobre nariz e boca. Quem vê o usuário deve passar em Percepção (CD 25) para ser capaz de descrevê-lo mais tarde.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Máscara Completa",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Cobre totalmente o rosto. Escolha uma perícia baseada em Carisma; a máscara concede +1 em testes dessa perícia (Intimidação, Atuação, etc.).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Máscara de Baile",
            preco: "T$ 25",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Tapa a região dos olhos. 1/cena, em situação social apropriada, pode colocar/trocar a máscara para repetir um teste de Diplomacia ou Enganação.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Máscara de Soldador",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Chapa metálica com visor escuro. Quando faz um teste de Ofício, pode fazer um teste de Percepção para ajudar a si mesmo (+2).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Monóculo",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Lente corretiva e símbolo de empáfia. Quando você usa a habilidade Orgulho em um teste de Vontade, o bônus fornecido por ela aumenta em +2.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Óculos de Aeronauta",
            preco: "T$ 15",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Proteção para os olhos. Fornece +1 em Pilotagem (cumulativo).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Palmar",
            preco: "T$ 12",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Pequenas pranchas que recobrem as mãos (impede de empunhar itens). Quando passa em um teste de Atletismo (natação), avança seu deslocamento inteiro.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Peruca",
            preco: "T$ 20",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Permite que um personagem com Carisma < 0 seja considerado como Carisma 0 para perícias (exceto Adestramento) por uma cena. Custa T$ 10 para manter/pentear.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Rondel",
            preco: "T$ 150",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Dois discos de aço costurados na armadura. Aumentam o bônus na Defesa da armadura em +1, mas impõem –2 em testes de ataque (ignora penalidade se proficiente em armadura pesada).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Roupão Elegante",
            preco: "T$ 150",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Traje refinado. Recebe +5 em Diplomacia dentro de sua base/domínio. Não funciona se estiver vestindo armadura ou item com bônus de For/Des/Con.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Rufo",
            preco: "T$ 25",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Gola adornada. Se você usar um traje da corte com um rufo, o traje passa a fornecer +1 em Diplomacia (cumulativo).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sapatos Confortáveis",
            preco: "T$ 6",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Ignora o primeiro teste de Fortitude para marcha forçada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sapatos de Salto Alto",
            preco: "T$ 18",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Deslocamento –1,5m e falha automática em marcha forçada. 1/cena, pode usar poder Atraente (ação completa) contra uma criatura (bônus +5 se já tiver o poder).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Veste Acolchoada",
            preco: "T$ 60",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Traje estofado usado sob armadura. Aumenta a penalidade de armadura em –2, mas reduz o multiplicador de crítico de ataques sofridos em –1 (mín. x2).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Compasso Místico",
            preco: "T$ 600",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Quando lança uma magia com efeito em área, você pode excluir um alvo da área afetada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Flauta Convocadora",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Quando lança uma magia que conjura capangas, você conjura um capanga adicional do mesmo tipo.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mandala Onírica",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Quando ao menos um inimigo falha no teste de Vontade de uma de suas magias, você recebe 1 PM temporário (limitado pelo custo da magia).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Varinha Armamentista",
            preco: "T$ 600",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Aumenta o bônus de dano fornecido pelo poder Arcano de Batalha em +2.",
            fonte: "Heróis de Arton",
            imagem: "data/img/varinha-arcana.webp"
        },
        {
            nome: "Ácido Concentrado",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Como ácido, mas o alvo sofre 4d8 de dano de ácido e fica vulnerável até o fim da cena (Reflexos CD Des reduz à metade e evita a condição).",
            fonte: "Heróis de Arton",
            imagem: "data/img/acido.webp"
        },
        {
            nome: "Analgésico",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Usar (ação padrão) role 2d4. Este é o máximo de PM que pode gastar. Até o fim da cena, sempre que sofrer dano, pode gastar 1 PM para reduzir esse dano em 5 (até o máximo rolado).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estalinho Gury",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Arremessar (ação padrão, alcance curto). Criaturas a 3m sofrem 4d6 de dano de impacto e ficam surdas (Fortitude CD Des reduz à metade e evita a condição).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Extrato de Gelo Eterno",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Usar (ação padrão, alcance curto). Alvo sofre 2d12 de dano de frio e fica lento por 1 rodada (Reflexos CD Des reduz à metade e evita a condição).",
            fonte: "Heróis de Arton",
            imagem: "data/img/gelo-eterno.webp"
        },
        {
            nome: "Extrato de Oxxdon",
            preco: "T$ 180",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Arremessar (ação padrão, alcance curto, área 1,5m²). Objetos não mágicos de metal na área são destruídos e criaturas de metal ficam fatigadas (Fortitude CD Des evita).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Frasco Abissal",
            preco: "T$ 300",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Arremessar (ação padrão, alcance curto). Criaturas a 3m sofrem 6d6 de dano de fogo e ficam em chamas (Reflexos CD Des reduz à metade e evita a condição). Chamas mais fortes (2d6 de dano, CD 20 para apagar).",
            fonte: "Heróis de Arton",
            imagem: "data/img/essencia-mana.webp"
        },
        {
            nome: "Pó de Cinza",
            preco: "T$ 5",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Lubrificante. Fornece +5 em um teste de Ladinagem para abrir fechaduras ou sabotar (cumulativo com outros itens).",
            fonte: "Heróis de Arton",
            imagem: "data/img/po-do-desaparecimento.webp"
        },
        {
            nome: "Pó do Aparecimento",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Usar (ação padrão, alcance curto). Criaturas invisíveis a 3m do ponto deixam de estar invisíveis (passam a ter camuflagem leve).",
            fonte: "Heróis de Arton",
            imagem: "data/img/po-do-desaparecimento.webp"
        },
        {
            nome: "Visco Persistente",
            preco: "T$ 25",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Usar (ação padrão, alcance curto). Alvo sofre 4d4 de dano de ácido e fica enredado (Fortitude CD Des reduz à metade e evita a condição).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Aparatos (Geral)",
            preco: "Variável",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparatos são itens de inventor para modificar engenhocas. Acoplar exige 1 hora. Aumentam a CD de ativação (+2 para 1 aparato, +5 para 2).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Captador de Luz",
            preco: "T$ 450",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Toda cura de luz da engenhoca aumenta em +1 por dado. Funciona apenas com engenhocas de cura de luz.",
            fonte: "Heróis de Arton",
            imagem: "data/img/luz.webp"
        },
        {
            nome: "Comutador",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Diminui o custo total dos aprimoramentos da engenhoca em –1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Conversor-Alimentador",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Comporta 3 doses de essência de mana (ou similar). Permite gastar um preparado que forneça PM para pagar o custo de aprimoramentos da engenhoca.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Engenho de Automação",
            preco: "T$ 600",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Permite que uma engenhoca (de magia sustentada) não conte no seu limite de magias sustentadas (limite de 1 engenhoca assim). Pré-req: Conversor-Alimentador.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Espera para Melhorias",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Permite instalar melhorias de outros itens na engenhoca (ex: engenhoca de Armadura Arcana pode receber melhorias de armadura). Cada 'Espera' permite 1 melhoria.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estabilizador",
            preco: "T$ 900",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Aumenta a CD para resistir ao efeito da engenhoca em +2.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estimulador de Sobrecarga",
            preco: "T$ 750",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Aumenta o dano provocado pela engenhoca em +1 dado. Funciona apenas em engenhocas que causam dano.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Gatilho de Corda",
            preco: "T$ 1.500",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Permite ativar uma engenhoca (de ação padrão) com uma ação de movimento. Após o uso, deve-se gastar uma ação completa para dar corda.",
            fonte: "Heróis de Arton",
            imagem: "data/img/corda.webp"
        },
        {
            nome: "Giroscópio",
            preco: "T$ 450",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Você não aplica sua penalidade de armadura (de armadura) nos testes de ativação da engenhoca.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Ligação de Convergência",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Acoplado a 2 engenhocas, que contam como 1 para seu limite. Apenas uma delas pode ser ativada por cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Remontagem de Portabilidade",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Permite que a engenhoca seja 'desmontada' e unida a um item de vestuário. Ela não ocupa espaço e conta como vestida (sem contar no limite). Limite de 1.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sequenciador de Ativação",
            preco: "T$ 600",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Acoplado a 3 engenhocas. 1/cena (ação completa), ativa o sequenciador. No início de seus próximos 3 turnos, uma das engenhocas é ativada (ação livre). Falha no teste de ativação interrompe a sequência.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sistema de Refrigeração",
            preco: "T$ 900",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. 1/dia (ação completa, 1 PM), reduz a CD de ativação da engenhoca em –5.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Supressor de Segurança",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. 1/cena, a engenhoca não enguiça com uma falha no teste de ativação (ela não ativa, mas a CD não aumenta).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Transformador Místico",
            preco: "T$ 600",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Aparato. Permite acoplar um item esotérico à engenhoca, que fornece seus benefícios à magia simulada por ela (sem precisar ser empunhado).",
            fonte: "Heróis de Arton"
        },

        // (Itens de Heróis de Arton - Animais, Veículos, Serviços)
        {
            nome: "Armadura de Montaria Leve",
            preco: "T$ 600",
            espacos: "2",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Deve ser vestida pela montaria. Aumenta um bônus numérico fornecido por ela em +1 (se fixo) ou em um passo (se rolado).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura de Montaria Pesada",
            preco: "T$ 3.000",
            espacos: "5",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Como a armadura leve, mas aumenta o bônus em +2 ou em dois passos. Diminui o deslocamento da montaria em –3m. Montarias voadoras não podem usar.",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Arreios Namalkahnianos",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Contam como um item vestido do animal. Aumentam o deslocamento de um veículo de tração animal em +3m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Caparazão",
            preco: "T$ 75",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Cobertura de tecido decorado. Uma montaria vestindo um caparazão fornece +1 em Diplomacia e Intimidação.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Estribos",
            preco: "T$ 60",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Apoios para os pés. Deve ser vestido pela montaria. Quando você faz uma investida montada, causa +1d8 pontos de dano.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Ornamento",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Animal",
            descricao: "Adorno para montarias. 1/cena, se estiver montado e treinado em Cavalgar, pode se exibir (ação) para receber +1d4 em um teste de perícia baseada em Carisma.",
            fonte: "Heróis de Arton"
        },
        // (Itens de Heróis de Arton - Veículos com Descrições)
        {
            nome: "Barcaça",
            preco: "T$ 3.000",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Navio pequeno (Enorme), 1 mastro, remos. Tripulação 10 (+ piloto). Desl. natação 6m, Defesa 10 (+ Des piloto), 120 PV, RD 5. Carrega 15 criaturas Médias ou 300 espaços.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Biga de Guerra",
            preco: "T$ 250",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Carroça blindada (Grande) puxada por 2 cavalos. Desl. 12m, Defesa 12 (+ Des piloto), 75 PV, RD 5. Carrega 2 criaturas Médias (40 espaços) e fornece cobertura leve. Permite investidas montadas e ignora penalidade de arremesso em movimento.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Dirigível Goblin",
            preco: "T$ 1.200",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Versão maior do balão goblin (Enorme). Desl. voo 12m, Defesa 5 (+ Des piloto), 180 PV. Carrega 16 criaturas Médias ou 320 espaços. Segue regras de queda e reparos do balão goblin.",
            fonte: "Heróis de Arton",
            imagem: "data/img/goblin.webp"
        },
        {
            nome: "Jangada",
            preco: "T$ 60",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Plataforma flutuante (Grande) com mastro e leme. Tripulação 1 (+ piloto). Desl. natação 9m, Defesa 6 (+ Des piloto), 50 PV, RD 5. Carrega 4 criaturas Médias ou 80 espaços.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Veleiro (Heróis de Arton)",
            preco: "T$ 10.000",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Veículo",
            descricao: "Navio de viagem (Colossal) com 3 mastros. Tripulação 30 (+ piloto, navegador, capitão). Desl. natação 12m, 220 PV, RD 5. Carrega 60 criaturas Médias ou 1.200 espaços.",
            fonte: "Heróis de Arton",
            imagem: "data/img/veleiro.webp"
        },
        {
            nome: "Banho Quente",
            preco: "T$ 10",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Você recebe +1d6 em seu próximo teste de resistência feito até o fim do próximo dia (cumulativo).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Bigode Encerado",
            preco: "T$ 20",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "1/cena, a primeira criatura inteligente que usar um efeito de Vontade contra você deve fazer um teste de Vontade (CD Car). Se falhar, perde a ação. Dura 1 dia.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Instrução Marcial",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Role 1d4; você recebe o resultado em d4 de auxílio para gastar em testes de ataque até o fim da aventura.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maquiagem Profissional",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Quando faz seu primeiro teste de Diplomacia para mudar atitude em cada cena, rola 2 dados e usa o melhor. Dura 1 dia.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Alquimista de Batalha",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Destruidor) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Aprendiz de Guilda",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro iniciante (Ajudante - Conhecimento, Ofício) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Aprendiz de Mago",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro iniciante (Magivocador) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Arauto",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Ajudante - Diplomacia, Intuição, Nobreza) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Arqueiros (Capangas)",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Capangas veteranos (Unidade de arqueiros) por uma cena. Requer treino em Guerra.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Bando de Aldeões (Capangas)",
            preco: "T$ 90",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Capangas iniciantes (Turba de camponeses) por uma cena. Requer treino em Guerra.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Batedor",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Vigilante) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Besteiro",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro iniciante (Atirador) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Bibliotecário Místico",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Adepto) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Conselheiro",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Ajudante - Conhecimento, Misticismo, Nobreza) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Guarda-Costas",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro iniciante (Guardião) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Herbalista",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro iniciante (Médico) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Homem de Armas",
            preco: "T$ 30",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro iniciante (Fortão) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Irregulares (Capangas)",
            preco: "T$ 300",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Capangas veteranos (Pelotão de infantaria) por uma cena. Requer treino em Guerra.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Matador",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Assassino) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Mercenário: Sombra",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Parceiro veterano (Ajudante - Enganação, Furtividade, Investigação) por uma cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Ópera",
            preco: "T$ 200",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Se for treinado em Atuação ou Conhecimento, seu total de PM aumenta em +1d4 até o fim da aventura.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Sarau Informativo",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Role 1d4; você recebe o resultado em d4 de auxílio para gastar em testes de Conhecimento ou Nobreza até o fim da aventura.",
            fonte: "Heróis de Arton"
        },
        // (Itens de Deuses de Arton - Equipamento de Aventura)
        {
            nome: "Água Benta Concentrada",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Funciona como água benta, mas causa 4d10 de dano.",
            fonte: "Deuses de Arton",
            imagem: "data/img/agua-benta.webp"
        },
        {
            nome: "Amuleto do Deus da Justiça",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Amuleto em forma de balança. Ao fazer um teste de perícia, pode fazer Sabedoria (CD 10). Se passar, pode escolher 10 no teste. Uso único.",
            fonte: "Deuses de Arton",
            imagem: "data/img/amuleto.webp"
        },
        {
            nome: "Amuleto de Deus do Caos",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Amuleto em forma de dado. Ao fazer um teste de perícia, pode fazer Inteligência (CD 10). Se falhar no teste de Inteligência, pode rolar novamente o teste de perícia (melhor resultado). Uso único.",
            fonte: "Deuses de Arton",
            imagem: "data/img/amuleto.webp"
        },
        {
            nome: "Apanhador de Sonhos",
            preco: "T$ 40",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Estrutura de madeira e penas. Recebe +2 em testes de resistência quando estiver dormindo.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Aspersório",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Maça perfurada (reservatório). Pode gastar ação padrão para dispersar água benta em cone de 4,5m (CD +2). Armazena 3 doses.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Cajado de Pastor",
            preco: "T$ 12",
            espacos: "2",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Cajado com ponta curva. Se rezar uma Missa com ele, participantes recebem +5 PV e +1 PM temporários (cumulativo).",
            fonte: "Deuses de Arton",
            imagem: "data/img/cajado-arcano.webp"
        },
        {
            nome: "Cálice Consagrado",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Se devoto da divindade do cálice: usar para beber/aplicar poção aumenta efeito em +1 dado. Exige ação de movimento para encher.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Colar do Suplicante",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Se devoto da divindade do colar: 1/dia, pode gastar (Ação Mov.) e 1 conta para recuperar 1 PM. Tem 10 contas.",
            fonte: "Deuses de Arton",
            imagem: "data/img/colar-guardiao.webp"
        },
        {
            nome: "Emblema Religioso",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Se devoto da divindade do emblema: pode gastar (Ação Mov., 1 PM) para receber benefícios de treino em Religião por 1 teste (cena).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Férula",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Cajado luxuoso. Efeito de Canalizar Energia aumenta em +1d6. Pode ser usada como Maça.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Panfleto de Aforismos",
            preco: "T$ 60",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Se devoto da divindade do panfleto: se estiver debilitado, enjoado, exausto, fatigado, fraco ou vulnerável, pode gastar (Ação Completa, 1 PM) para remover uma condição.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Patuá",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Saco com ervas. Se tiver uma devoção, recebe RD 2/mundano e resistência a magia +1.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Texto Sagrado",
            preco: "T$ 60",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Equipamento de Aventura",
            descricao: "Se devoto da divindade do texto: se estiver abalado, alquebrado, apavorado, esmorecido ou frustrado, pode gastar (Ação Completa, 1 PM) para remover uma condição.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Trombeta do Cruzado",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Ferramenta",
            descricao: "Instrumento musical. Se devoto: quando usa Inspiração, aliados recebem +1 ataque contra inimigos devotos de deus diferente.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Anel Eclesiástico",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Se for clérigo ou frade: +1 em Diplomacia e Intimidação.",
            fonte: "Deuses de Arton",
            imagem: "data/img/anel.webp"
        },
        {
            nome: "Carcaça do Predador Primal",
            preco: "T$ 150",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Capa de pele. Quando adquire forma selvagem, bônus na Defesa da forma aumenta em +1.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Garras do Predador Primal",
            preco: "T$ 300",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Colar/braceletes de garras. Quando adquire forma selvagem, recebe +1 dano com armas naturais.",
            fonte: "Deuses de Arton",
            imagem: "data/img/garras.webp"
        },
        {
            nome: "Hábito Monástico",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Roupa simples. +2 Vontade contra efeitos mentais e +2 CD da magia Tranquilidade. Impõe -2 em Carisma contra ricos/nobres.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Hábito Sacerdotal",
            preco: "T$ 30",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Batina. Concede +2 em perícias de Carisma com devotos da mesma divindade.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Manto de Alto Sacerdote",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Se tiver Autoridade Eclesiástica: recebe +1 PM por patamar acima de iniciante (após 1 dia).",
            fonte: "Deuses de Arton",
            imagem: "data/img/manto-da-resistencia.webp"
        },
        {
            nome: "Penas do Predador Primal",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Capa de penas. Quando adquire forma selvagem, recebe +2 Atletismo e +3m deslocamento nessa forma.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Piercing de Umbigo",
            preco: "T$ 50",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Joia. Se estiver sem armadura (ou com armadura sensual), CD de habilidades de enfeitiçar/fascinar/pasmar aumenta em +1.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Sandálias",
            preco: "T$ 9",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Impõe -2 em testes de resistência a clima e derrubar. Se for conjurador divino: +1 PM.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Tonsura",
            preco: "T$ 3",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Corte de cabelo. Impõe -5 Intimidação. Permite usar Aparência Inofensiva (se já tem, usa contra as 2 primeiras criaturas/cena). Conta como item vestido.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Túnica do Virtuoso",
            preco: "T$ 25",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Vestuário",
            descricao: "Túnica simples. Conta como uma Virtude Paladinesca para cálculo de PM adicionais (após 1 dia).",
            fonte: "Deuses de Arton"
        },

        // (Itens de Deuses de Arton - Esotéricos)
        {
            nome: "Afiador Solar",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Pedra de amolar. Quando lança magia que dá dados de dano adicionais a uma arma alvo, pode mudar o tipo desse dano extra para luz.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Báculo da Retribuição",
            preco: "T$ 200",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Bastão longo. Quando gasta 1+ PM em cura de luz, role 1d4. Se 4, recupera 1 PM de cada criatura curada (além do normal).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Contas de Oração",
            preco: "T$ 500",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Aumenta seu limite de PM para magias divinas em +1.",
            fonte: "Deuses de Arton",
            imagem: "data/img/oracao.webp"
        },
        {
            nome: "Estola",
            preco: "T$ 150",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Faixa vestida (não empunhada). Escolha uma magia divina. A CD para resistir a essa magia aumenta em +2.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Frasco Purificador",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Contém 10 doses. Ao lançar magia em criatura, pode gastar doses (limite Sabedoria) para curar 1d4 PV por dose. Apenas devotos de energia positiva.",
            fonte: "Deuses de Arton",
            imagem: "data/img/essencia-mana.webp"
        },
        {
            nome: "Medalhão Afiado",
            preco: "T$ 900",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Quando lança magia que dá bônus de ataque, ela também fornece +1 na margem de ameaça.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Ostensório Santificado",
            preco: "T$ 750",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Escolha uma magia. Seu custo diminui em –1 PM, mas somente se for lançada em devotos do seu deus.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Rede de Almas",
            preco: "T$ 600",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Apenas devotos de energia negativa. Ao lançar magia divina de trevas, recebe 1 PV temporário cumulativo por cada resultado máximo nos dados de dano.",
            fonte: "Deuses de Arton",
            imagem: "data/img/rede.webp"
        },
        {
            nome: "Turíbulo Ungido",
            preco: "T$ 100",
            espacos: "1",
            categoria: "Item Geral",
            tipo: "Esotérico",
            descricao: "Incensário. Aumenta a área de suas magias em +1,5m.",
            fonte: "Deuses de Arton"
        },

        // (Itens de Deuses de Arton - Alquímicos)
        {
            nome: "Granada Redentora",
            preco: "T$ 60",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado. Arremessar (ação padrão, alcance curto). Criaturas a 3m recuperam 6d4 PV (luz). Apenas devotos de energia positiva podem fabricar.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Incenso",
            preco: "T$ 12",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado. Se gasto como parte de uma Missa, cada participante recebe 2 PM temporários (cumulativo).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Lucidílico",
            preco: "T$ 30",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado. Beber (ação padrão). No início de cada turno, role 1d. Ímpar: perde 1 PM. Par: ganha ação movimento extra. 3 pares seguidos: ganha ação padrão extra. Dura pela cena ou até zerar PM.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Santa Granada de Mão",
            preco: "T$ 150",
            espacos: "0,5",
            categoria: "Item Geral",
            tipo: "Preparados",
            descricao: "Preparado. Arremessar (ação mov. acender + padrão, alcance curto). Mortos-vivos e abissais a 3m sofrem 6d12 dano de luz (Ref CD Sab reduz). Apenas devotos de energia positiva podem fabricar.",
            fonte: "Deuses de Arton"
        },

        // (Itens de Deuses de Arton - Serviços)
        {
            nome: "Casamento (Serviço)",
            preco: "T$ 150",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Cria reserva conjunta de 3 PM entre os cônjuges (se em alcance curto).",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Cerimônia Religiosa (Serviço)",
            preco: "T$ 20",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Assistir em templo da sua divindade fornece +1 Religião e Vontade e +2 PM até fim da aventura.",
            fonte: "Deuses de Arton"
        },
        {
            nome: "Sacramento (Serviço)",
            preco: "T$ 50",
            espacos: "—",
            categoria: "Item Geral",
            tipo: "Serviço",
            descricao: "Escolha uma magia divina de 1º círculo. Até o fim da aventura, pode lançá-la 1 vez (sem aprimoramentos, custo 2 PM, atrb. Sabedoria). Apenas devotos.",
            fonte: "Deuses de Arton"
        },
        {
            "nome": "Vitarium (Item Vestido)",
            "preco": "T$ 4.500",
            "espacos": "—",
            "categoria": "Vestuário",
            "tipo": "Material",
            "descricao": "Uma pedra bruta pode ser usada como um item vestido (como um pingente) que fornece redução de dano 2 contra trevas.",
            "fonte": "Só Aventuras"
        },

        //Dragao Brasil

        {
            "nome": "Alma de Dragão",
            "preco": "T$ 250",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Item Esotérico",
            "descricao": "Uma pedra translúcida, no formato de uma escama de dragão e do tamanho de um punho fechado. Quando sofrer dano de um dos tipos a seguir, você pode reduzir o dano sofrido em um dado como uma reação. Então este item deixa de ser translúcido e armazena a energia do dano, tomando a aparência de uma pedra preciosa: diamante (luz), esmeralda (ácido), ônix (trevas), rubi (fogo), safira (frio) ou topázio (eletricidade). Quando lança uma magia que causa dano do tipo da pedra preciosa enquanto tiver uma energia armazenada, você pode descarregar essa energia como uma ação livre para aumentar o dano em um dado do mesmo tipo. Após descarregar a energia, a pedra volta a ser translúcida e precisa armazenar energia outra vez antes de ser usada novamente.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/alma-de-dragao.webp"
        },
        {
            "nome": "Cítola da Paz",
            "preco": "T$ 175",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Feita de madeira de qualidade, com cordas douradas e encantada por um devoto de Marah, esta cítola conta como um instrumento musical. Enquanto seguir as Obrigações & Restrições de Marah, sua Inspiração e suas músicas de bardo custam –1 PM e você recebe um bônus de +5 em testes de perícia para mudar atitude.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/citola-da-paz.webp"
        },
        {
            "nome": "Rosário da Vida",
            "preco": "T$ 750",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Item Esotérico",
            "descricao": "Este item costuma ser usado por Parteiras das Mandíbulas para aumentar o efeito de suas magias de cura. Quando empunhado por alguém que siga as Obrigações & Restrições de Lena, este rosário aumenta o número de PV recuperados por efeitos de cura mágica de luz em um dado do mesmo tipo por patamar de personagem (1 dado no 1º patamar, 2 dados no 2º patamar e assim por diante).",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/rosario-da-vida.webp"
        },
        {
            "nome": "Bomba de Tinta",
            "preco": "T$ 35",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Preparado Alquímico",
            "descricao": "Segue as mesmas regras da bomba comum, mas, em vez de causar dano, afeta uma esfera com 6m de raio que fica sob efeito simulado da magia Área Escorregadia até o fim da cena. Criaturas dentro dessa área durante a explosão também ficam lentas (Reflexos CD Des evita); elas podem gastar uma ação de movimento para fazer um teste de Força (CD Des) para se recuperar da condição.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/bomba-de-tinta.webp"
        },

        // (Serviços de Vectora - Dragão Brasil)
        {
            "nome": "Aeronauta Goblin (Serviço)",
            "preco": "T$ 10",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Transporte aéreo por balões e dirigíveis goblins. Barato, porém lento e arriscado: a fila leva horas (os personagens perdem uma rodada de exploração em Vectora). Um jogador rola 1d6; em 1 ou 2, ocorre um acidente — todos no veículo sofrem 8d6 de dano de impacto e precisam voltar para a fila. T$ 10 por pessoa.",
            "fonte": "Dragão Brasil",
            "imagem": "data/img/balao-goblin.webp"
        },
        {
            "nome": "Carona Alada (Serviço)",
            "preco": "T$ 100",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Transporte com ginetes de grifos, tapetes voadores e outras montarias ou itens capazes de voar. Mais rápido e seguro que os balões, porém mais caro e assustador. Teste de Vontade (CD 25); em caso de falha, fica abalado por um dia. T$ 100 por pessoa.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Teletransporte (Serviço)",
            "preco": "T$ 300",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Transporte luxuoso, instantâneo e totalmente seguro, porém enjoativo para quem não está acostumado. Personagens não treinados em Misticismo fazem teste de Fortitude (CD 20); em caso de falha, ficam fatigados por um dia. T$ 300 por pessoa.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Estadia em Vectora (Serviço)",
            "preco": "T$ 10",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Taxa diária para não residentes da cidade voadora. Os visitantes devem comprar papéis de viagem em postos da Milícia ou estalagens certificadas; à noite, patrulheiros fiscalizam hospedarias, tavernas e casas noturnas. Evitar a fiscalização exige Enganação ou Furtividade (CD 25). Apanhado sem os papéis: paga a taxa no ato, mais uma multa de T$ 300. Sem o dinheiro, tem os bens apreendidos e é despachado à superfície em um balão goblin (se não cair antes...). T$ 10 por dia.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Guia Urbano (Serviço)",
            "preco": "T$ 30",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Guia local que faz testes de Investigação e Sobrevivência em Vectora no seu lugar, com bônus +15. Aumenta em um passo o dado da rolagem de encontros aleatórios. T$ 30/dia.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Mapa da Cidade",
            "preco": "T$ 30",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Mapa detalhado da cidade voadora. Fornece +2 em testes de Investigação e Sobrevivência em Vectora.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Passeio de Balão (Serviço)",
            "preco": "T$ 150",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Voo panorâmico oferecido pelo goblin Glong e seu javali de guarda Tuk-tuk, no quiosque do Voo de Balão. Você descobre todos os pontos de interesse de um setor à sua escolha.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Poção Batizada (Serviço)",
            "preco": "T$ (preço da poção)",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Poção de até 3º círculo misturada com bebida alcoólica (a dose é por conta da casa). Ao beber, recebe PM para gastar em aprimoramentos da magia gerada, mas faz teste de Fortitude. Em falha, fica embriagado (–2 em testes de Destreza e Carisma); se já estava embriagado, fica bebum (desprevenido, –5 em testes de Destreza e Carisma); se já estava bebum, cai inconsciente. Condições duram até o fim do dia. Dose pequena: 1d4+1 PM, CD 25. Dose grande: 2d4+2 PM, CD 35.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Pijama Hynne",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Conjunto de calça e camisa fofas e aconchegantes. Dormir com o pijama hynne e nenhum outro item vestido fornece +1 PM temporário por patamar no dia seguinte.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Hospedagem Divina (Serviço)",
            "preco": "T$ 2.000",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Hospedagem no Reino dos Deuses: quartos imensos, mobília suntuosa, banquetes exuberantes e batalhão de servos. Conta como descanso luxuoso e fornece +10% de XP por uma aventura (ou por um mês). Sem XP, recebe um benefício do próximo nível por uma aventura (ou por um mês).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Festival de Música (Serviço)",
            "preco": "T$ 200",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Até o fim desta aventura (ou por um mês), você recebe um poder de Música para o qual cumpra os pré-requisitos ou aumenta em +2 a CD para resistir a todos os seus poderes de Música (à sua escolha).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Escultura",
            "preco": "T$ 6.000",
            "espacos": "20",
            "categoria": "Item Geral",
            "descricao": "Obra de arte que eleva a alma. Fornece +2 PM (somente um dia após adquiri-la). Você não precisa carregá-la consigo, mas ela deve estar em um lugar que considere lar — ainda que apenas seu acampamento ou uma estalagem onde se hospede com frequência.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Escultura Pessoal",
            "preco": "T$ 20.000",
            "espacos": "20",
            "categoria": "Item Geral",
            "descricao": "Estátua de você mesmo, feita sob encomenda. Fornece +5 PM (somente um dia após adquiri-la). Conectada à sua alma, permite redirecionar para ela um efeito nocivo que recém o afetou — fazer isso destrói a estátua. Zentura nunca faz mais de uma escultura pessoal para a mesma pessoa.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Consulta na Biblioteca das Respostas (Serviço)",
            "preco": "T$ 250",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Teste de Investigação com +5 para receber uma informação sobre um assunto à sua escolha. A CD varia conforme a complexidade (veja a perícia Conhecimento, T20, p. 117). A informação é escolhida pelo mestre.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Festa na Dança de Marah (Serviço)",
            "preco": "T$ 600",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Festejar nesta taverna o deixa extremamente amável. Uma vez até o fim desta aventura (ou por um mês), você pode gastar uma ação padrão para melhorar em um passo a categoria de atitude de um NPC com quem esteja interagindo.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Noite no Teatro (Serviço)",
            "preco": "T$ 300",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Assistir a uma peça ensina a modelar expressões, falas e trejeitos. Role 1d4; recebe esse resultado em d4 de auxílio. Até o fim da aventura, em testes de perícia baseados em Carisma, você pode gastar 1d4 e somar o resultado (cumulativo com bônus de outros itens).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Figurino Teatral",
            "preco": "T$ 3.600",
            "espacos": "1",
            "categoria": "Item Mágico",
            "tipo": "Acessório Menor",
            "descricao": "Roupa encantada que muda de aparência conforme o que você tenta fazer. Se for treinado em Atuação e Enganação, uma vez por cena fornece +5 em um teste de perícia qualquer.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Audiência com Lorde Vectorius (Serviço)",
            "preco": "T$ 5.000",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Audiência com o arquimago nos guichês do castelo. Após pagar, faça um teste de perícia à sua escolha (com relação ao que disse): contra CD 40 para convencê-lo; depois contra CD 50 (perícia diferente); e, por fim, um teste oposto ao arquimago (+46). Vencendo o último, Vectorius o aconselha sobre qualquer dilema; a critério do mestre, isso pode torná-lo treinado em uma perícia ou dar um poder sem pré-requisitos. Falhar em qualquer teste encerra a audiência.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Rito da Troca Vital (Serviço)",
            "preco": "T$ 600 (menor) / T$ 1.500 (maior)",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Ritual da dahllan Lyris: o praticante oferece vigor ao solo e recebe energia espiritual. Menor: perde 2d4 PV e ganha 1d4+2 PM permanentemente. Maior: perde 2d8 PV e ganha 2d4+4 PM.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Comprar Criatura (Serviço)",
            "preco": "T$ 600 (iniciante) / T$ 3.000 (veterano) / T$ 15.000 (mestre)",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Criaturas à venda no Empório das Garras. Qualquer personagem pode comprar criaturas iniciantes, mas apenas treinados em Adestramento podem comprar criaturas veteranas ou mestras. Todas contam como parceiros e seguem as regras de Tormenta20, p. 260 (incluindo o limite de parceiros).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Treinar Criatura (Serviço)",
            "preco": "T$ 3.000",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Tibbo treina um parceiro animal ou monstro que você possua e ensina um truque novo. A criatura passa a fornecer o bônus de um tipo de parceiro iniciante (ajudante, combatente, fortão, guardião ou perseguidor), além de seus bônus normais. Uma mesma criatura só pode ser treinada uma vez por Tibbo.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Tratamento Monstruoso (Serviço)",
            "preco": "T$ 1.500",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Tratamento temporário (injeção de sangue de monstro, implante de escamas etc.) que concede um benefício à sua escolha por uma aventura (ou um mês): +2 em Força, Destreza ou Constituição; deslocamento de escalada ou natação igual ao base; arma natural de cauda com espinhos (1d6, crítico x2, impacto e perfuração — uma vez por rodada, gastando 1 PM ao agredir com outra arma, faz um ataque extra com a cauda); redução de dano 2; ou redução de dano 10 contra um tipo de dano específico.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Armadilha Comum",
            "preco": "T$ 150",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Permite usar um poder de Armadilha do caçador, escolhido na compra (Tormenta20, p. 50).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Armadilha Rara",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Permite usar uma das armadilhas do armadilheiro, escolhida na compra (Heróis de Arton, p. 117).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Peça Letal",
            "preco": "T$ 90",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Pode ser usada na preparação de uma armadilha para aumentar em +2 a CD dela e em +1 por dado o dano.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Leitura na Ampulheta (Serviço)",
            "preco": "T$ 300",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Você procura um livro de um assunto de seu interesse (Conhecimento, Guerra, Misticismo, Nobreza ou Religião) e rola 1d4. Resultado 1: perde a próxima ação de exploração. Resultado 2: não recebe benefício nem perde nada. Resultado 3 ou 4: recebe +1 permanente na perícia escolhida (não cumulativo).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Instante Engarrafado",
            "preco": "T$ 1.200",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Frasco com uma névoa espiralante que pulsa com todas as cores — um pouco de tempo. Usar é uma ação padrão. Você recebe uma ação padrão adicional na rodada em que usa e na seguinte.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Relógio da Memória",
            "preco": "T$ 900",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Pequeno relógio de bolso enferrujado que grava o que você fez. Se fizer uma ação igual a outra já feita na mesma cena (mesma arma, mesma magia...) que exija rolagens, pode gastá-lo para repetir uma rolagem da ação anterior (ataque, dano da magia etc.).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Bússola do Desejo",
            "preco": "T$ 600",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Pequena bússola de bronze. Na compra, escolha uma pessoa ou objeto que já tenha visto pessoalmente; o item aponta o caminho até o alvo. O efeito dura por uma aventura (ou um mês), quando se esvai para sempre.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Clarividência (Serviço)",
            "preco": "T$ 150",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Por alguns tibares, Vessara vê seu futuro. Role 1d10–3. Positivo: escolha uma cena até o fim da aventura (ou do mês) em que recebe o número rolado em d6 de auxílio (pode gastar até 2d6 por teste de perícia) — descreva a previsão e tente torná-la real. Negativo: o mestre define a cena e pode usar os dados como penalidade. Zero: nada acontece.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Espelho do Futuro",
            "preco": "T$ 350",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Espelho de mão que permite rolar novamente um teste recém-realizado que não tenha sido uma falha crítica. Fazer isso quebra o espelho. Apenas um espelho do futuro pode ser usado por cena.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Orbe da Visão Remota",
            "preco": "T$ 150",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Esfera de cristal do tamanho de uma maçã. Ação completa: olhe para dentro e escolha um ponto em alcance longo (mesmo sem linha de visão). Por uma rodada, enxerga como se estivesse nesse ponto.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Areia de Halak-Tûr",
            "preco": "T$ 600",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Frasco com areia carregada da energia dos portais do Deserto da Perdição. Ação padrão: quebre o vidro e despeje a areia sob os pés de uma criatura em alcance curto. O alvo se teletransporta para qualquer ponto desocupado em alcance longo que você veja; involuntários têm direito a Reflexos (CD Des).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Chave Dimensional",
            "preco": "T$ 1.000",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Chave de bronze que, girada no ar (ação padrão), cria uma porta em pleno ar. Por uma rodada, qualquer criatura pode cruzá-la para um bolsão dimensional como uma gruta vazia e escura. O bolsão dura algumas horas (dá para dormir) e então se desfaz, devolvendo todos ao espaço da porta. É possível empurrar alguém pela porta à força (manobra empurrar; a criatura ainda rola Reflexos CD For para se segurar no batente).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Mapa Planar",
            "preco": "T$ 300",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Catalisador",
            "descricao": "Pergaminho rasgado que mostra caminhos entre Arton e outros planos. Ao lançar uma magia de convocação olhando para essas rotas, a CD aumenta em +2 e os efeitos numéricos variáveis em +1 por dado.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Viagem Rápida (Serviço)",
            "preco": "T$ 800",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Harrun Vol prepara uma das portas de sua loja para levar você a qualquer lugar em Arton ou em um reino divino que não esteja protegido por magia.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Cabelo de Fada",
            "preco": "T$ 600",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Catalisador",
            "descricao": "Diminui o custo da magia em –1d4 PM e permite usar aprimoramentos para os quais você não cumpre os pré-requisitos.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Cinzas de Pergaminho Ancestral",
            "preco": "T$ 600",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Catalisador",
            "descricao": "Guarda ecos de magias esquecidas. Permite lançar uma segunda magia como uma ação livre.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Fragmento de Mana Condensada",
            "preco": "T$ 900",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Catalisador",
            "descricao": "Brilha como um pequeno sol. Fornece 5 PM para usar em aprimoramentos; esses PM podem ultrapassar o seu limite.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Nuvem Engarrafada",
            "preco": "T$ 300",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Catalisador",
            "descricao": "Fornece deslocamento de voo de 12m por 1d4 rodadas.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Pó de Estrela Cadente",
            "preco": "T$ 1.200",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Catalisador",
            "descricao": "Extremamente raro e caro, traz o poder do éter para suas magias. Fornece +2 na CD da magia, aumenta todos os dados dela em um passo e todos os efeitos numéricos variáveis em +1 por dado.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Cirurgia de Aprimoramento (Serviço)",
            "preco": "T$ 1.000",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Lyasis aprimora golens e outros construtos. Você recebe +2 em uma perícia à sua escolha, mas perde 2 PV permanentemente. Pode fazer mais de uma cirurgia, mas apenas para perícias diferentes.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Comprar Construto (Serviço)",
            "preco": "T$ 600 (iniciante) / T$ 3.000 (veterano) / T$ 15.000 (mestre)",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Lyasis oferece construtos programados para ajudar e proteger. Qualquer personagem pode comprar construtos iniciantes, mas apenas treinados em Ofício (artesanato) podem comprar veteranos ou mestres. Todos contam como parceiros (Tormenta20, p. 260, incluindo o limite). Mecanosservo ajudante: parceiro ajudante. Mecanosservo guardião: iniciante +2 Defesa; veterano +2 Defesa e gastando 1 PM ao sofrer dano, RD 5; mestre +4 Defesa e gastando 2 PM ao sofrer dano, RD 10.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Reagente Instável",
            "preco": "T$ 120",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Ao ativar uma engenhoca, pode ser usado como parte da ativação. Aumenta qualquer efeito numérico variável dela em +1 por dado ou a CD para resistir em +2 (à sua escolha), mas aumenta a CD para ativá-la em +5.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Autoforja (Serviço)",
            "preco": "T$ 1/10 do preço do item",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Aluguel da autoforja que reduz o tempo de fabricação de um item para poucas horas (a ação de exploração já gasta na Oficina). Você ainda passa no teste de perícia e gasta a matéria-prima — só o tempo é reduzido. Só pode ser usada uma vez por visita a Vectora (quebra após o uso).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Noite no Vapor & Café (Serviço)",
            "preco": "T$ 200",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Você passa a noite conversando com inventores e tomando bebidas energéticas. No dia seguinte acorda com uma ideia genial: pode fabricar uma engenhoca que, ao ser ativada, também gera o efeito de uma magia de 1º círculo. Porém, perde permanentemente 1 PV e 1 PM.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Essência de Medo",
            "preco": "T$ 300",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Frasco com névoa escura e espiralante. Ação padrão: atire em qualquer ponto em alcance curto. Criaturas a até 3m ficam apavoradas por 1d4+1 rodadas e então abaladas pela cena (Von CD Des diminui para abaladas pela cena).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Maldição Física Engarrafada",
            "preco": "T$ 360",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Garrafa metálica enferrujada. Abri-la (ação padrão) libera uma maldição em forma de uivo agonizante sobre uma criatura em alcance curto. Ela fica debilitada por 1 semana (Von CD Car reduz para fraca por 1d4 rodadas).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Maldição Mental Engarrafada",
            "preco": "T$ 360",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Como a maldição física, mas a criatura fica esmorecida por 1 semana (Fort CD Car reduz para frustrada por 1d4 rodadas).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Pergaminho Sombrio",
            "preco": "T$ (preço do pergaminho)",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Equipamento de Aventura",
            "descricao": "Maelkir vende pergaminhos de qualquer magia de trevas de até 3º círculo pelo preço normal. A fabricação nefasta faz os efeitos numéricos variáveis aumentarem em +1 por dado. Disponível apenas no submundo de Vectora — nem todos têm acesso.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Venenos Potentes",
            "preco": "T$ (preço do veneno)",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Venenos",
            "descricao": "Maelkir vende qualquer veneno conhecido (e alguns desconhecidos) em versões ainda mais letais: preço normal, mas com +2 na CD. Disponível apenas no submundo de Vectora — nem todos têm acesso.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Noite de Wyrt",
            "preco": "T$ (aposta)",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Jogo de azar com cartas e dados, proibido para não nobres no Reinado, mas permitido para todos na Véu Escarlate. Disponível apenas no submundo de Vectora — nem todos têm acesso. Pague a aposta e faça um teste de Jogatina. Salão comunal: aposta 3d6 x T$ 10, CD 1d10+20. Área privativa: aposta 3d6 x T$ 10, CD 2d10+20. Sucesso: lucra a aposta. Passar por 10+: lucra 4x a aposta. Blefar (Enganação CD 20): +2 na Jogatina (+1 a cada 5 acima da CD), falha –5. Trapacear (Ladinagem CD 25): +10 na Jogatina; Percepção oposta pode notar a trapaça (jogo acaba e briga começa).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Noite de Prazeres (Serviço)",
            "preco": "T$ 150",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Na Véu Escarlate, o \"amor\" está à venda. Disponível apenas no submundo de Vectora — nem todos têm acesso. Algumas horas de carícias lascivas fornecem 2d6 PM temporários.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Passagem para o Submundo (Serviço)",
            "preco": "T$ (suborno 3d10 x T$ 10)",
            "espacos": "—",
            "categoria": "Item Geral",
            "tipo": "Serviço",
            "descricao": "Acesso ao Mercado das Profundezas, no submundo de Vectora. Observando atentamente os movimentos das pessoas, você descobre uma entrada (alçapão sob um tapete, passagem secreta no escritório de um mestre de guilda etc.). Atravessá-la pode exigir teste de Furtividade ou Intimidação (CD 30), suborno (3d10 x T$ 10) ou outra ideia que o mestre aprove.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Amuleto do Abutre",
            "preco": "T$ —",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este pingente de ouro em formato de abutre é um poderoso amuleto arcano, cuja origem sombria é cercada de mistério. Sabe-se que ele surgiu na mesma época em que Ferren Asloth realizou seu famigerado ritual e que é um dos mais poderosos itens do Arquilich Ferren Asloth. Capaz de conceder habilidades arcanas incríveis fornece ao usuário +50 PM (somente após um dia de uso), aumenta em +5 a CD para resistir a suas magias arcanas e permite utilizar a habilidade Conhecimento Sequestrado (CD Int, veja p. 294). Tamanho poder, entretanto, não passa de uma armadilha. Em sua obsessão pela vida eterna, Ferren aprisionou uma pequena parte de sua essência neste amuleto, fazendo com que ele funcione como um segundo filactério. No início de cada dia em que estiver usando o amuleto, o portador deve fazer um teste de Vontade (CD 20 + 1 por dia adicional). Se falhar, começa a ter pensamentos cruéis, que o incentivam a buscar mais poder a qualquer custo. Se falhar uma segunda vez, torna-se dependente do amuleto e não consegue mais removê-lo por vontade própria (e fica agressivo caso outra pessoa tente fazê-lo). Por fim, se falhar uma terceira vez, sua alma é destruída. Quando isso acontecer, se Ferren estiver destruído, o fragmento de sua alma armazenado no amuleto se apossa do corpo do portador, trazendo o Arquilich de volta à existência. O portador passa automaticamente no teste de Vontade sempre que tiver matado um conjurador arcano no dia anterior.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Chifre de Unicórnio",
            "preco": "T$ 120.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Um chifre de unicórnio é um poderoso item mágico de cura. Se estiver empunhando o chifre, você pode lançar Curar Ferimentos e Purificação; caso já conheça essas magias, seu custo diminui em –1 PM, cumulativo com outras reduções. Ele também pode ser usado para lançar a magia Segunda Chance, mas perde todos os poderes após isso. Por fim, ele pode ser empunhado como uma espada curta formidável. Mesmo sem seus poderes, o chifre pode ser transformado em 12 doses de pó de chifre, um poderoso ingrediente para preparados e poções. Misturar uma dose desse pó aos ingredientes de um preparado ou poção aumenta cada dado de cura do efeito do item em dois passos (até um máximo de d12). Ainda que o simples ato de portar um chifre de unicórnio não seja necessariamente maligno, muitos devotos, sobretudo de Allihanna e Marah, poderão questionar a origem do chifre. Chifres de unicórnio não podem ser fabricados, e são obtidos apenas de um unicórnio morto. Acessório maior, preço T$ 120.000.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Dardo",
            "preco": "T$ 2",
            "espacos": "0,05",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Um pacote de munição contém 20 dardos,",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Pilão Conspurcado",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este pequeno pilão de madeira de aparência sinistra é decorado com símbolos místicos entalhados e fragmentos de ossos encravados. Conta como uma costela de lich. Além dos benefícios desse esotérico, o custo de suas magias de encantamento e necromancia lançadas pela varinha diminui em –1 PM e a CD para resistir a elas aumenta em +2. Acessório médio, preço T$ 21.000.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Fragmento de Filactério",
            "preco": "T$ 90.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Mesmo após a destruição do filactério de um lich, uma parte do poder mágico da criatura pode permanecer, geralmente em seu maior fragmento. Um fragmento de filactério conta como uma costela de lich poderosa que fornece +20 PM (somente após um dia de uso). Um fragmento só pode ser obtido de um filactério estilhaçado e não pode ser fabricado. Acessório maior, preço T$ 90.000.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Treckod",
            "preco": "T$ 50",
            "espacos": "10",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Essa fruta é a base da alimentação dos sckharjagar. É um fruto amargo e polpudo de coloração vermelha, com suco viscoso de gosto forte. Estrangeiros muitas vezes sequer percebem o treckod como comestível, já que ele cresce envolto por uma casca grossa, áspera e seca. A textura lembra casca de árvore, mas seus padrões lembram vagamente escamas de répteis. Consumir um treckod inteiro substitui uma refeição e, enquanto está na casca, o fruto pode ser armazenado por meses sem estragar. Dentro de Sckharshantallas, não costuma ser vendido, apenas distribuído para todos os habitantes. Fora do reino é extremamente raro, apreciado por nobres e aventureiros endinheirados e obtido apenas via contrabando. Um único fruto pode alcançar o valor de T$ 50. Contrabandistas de treckod costumam ser executados sem chance de perdão.",
            "fonte": "Atlas de Arton"
        },
        {
            "nome": "Anel com símbolo da família",
            "preco": "T$ 200",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Anel com símbolo da família (T$ 200).",
            "fonte": "Atlas de Arton"
        },
        {
            "nome": "Item artístico de origem cultural indefinida",
            "preco": "T$ 100",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "1 Item artístico de origem cultural indefinida",
            "fonte": "Atlas de Arton"
        },
        {
            "nome": "Títulos de terras expirados",
            "preco": "T$ —",
            "espacos": "0,5",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Títulos de terras expirados (+2 em Diplomacia com nobres e burocratas).",
            "fonte": "Atlas de Arton"
        },
        {
            "nome": "Tranqueiras resgatadas do mar",
            "preco": "T$ 200",
            "espacos": "2",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Tranqueiras resgatadas do mar (2 espaços, valor de venda T$ 100)",
            "fonte": "Atlas de Arton"
        },
        {
            "nome": "Tatuagem Mística",
            "preco": "T$ 1.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Os tatuadores tamalus de Khubar podem criar tatuagens especiais com Ofício (tatuador). Essas tatuagens podem ter um entre três benefícios: +1 na Defesa, resistência a magia +2 ou a habilidade de lançar uma magia de 1o círculo (atributochave Sabedoria). Tatuagens precisam estar visíveis para funcionarem e, quando expostas, ocupam o espaço de um item vestido. Cada tatuagem custa T$ 1.000 x sua quantidade de tatuagens místicas (a primeira custa T$ 1.000, a segunda custa T$ 2.000 e assim progressivamente).",
            "fonte": "Atlas de Arton"
        },
        {
            "nome": "Véu do Desejo",
            "preco": "T$ —",
            "espacos": "0",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Este manto branco de tecido leve concede +5 em Atuação, em testes de resistência e na CD para resistir a suas habilidades, e fornece redução de dano 10. Artefato.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Amuleto de Khalmyr",
            "preco": "T$ 30",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Material",
            "descricao": "Este amuleto em formato de balança não é usado apenas por devotos de Khalmyr — todos os artonianos podem se beneficiar dele. Contudo, por não ser mágico, dizem que apenas os chatos mais previsíveis o utilizam... Quando faz um teste de perícia, você pode fazer um teste de Sabedoria (CD 10). Se passar, pode escolher 10 para esse teste de perícia (em vez de usar o valor rolado no d20). Uma vez que você use este efeito em um teste, o amuleto perde seus “poderes”, tornando-se inútil",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Vestido Noturno",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este vestido negro possui pequenos diamantes costurados em seu tecido, que cintilam como as estrelas do céu noturno. Conta como uma veste de seda aprimorada cravejada de gemas, fornecendo +2 em Enganação e Reflexos. Se você for um devoto de Tenebra e vestir este item, pode gastar uma ação padrão e 5 PM para ficar invisível até o fim da cena (recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques). Esse efeito termina se você fizer uma ação hostil direta contra uma criatura (para mais detalhes, veja a magia Invisibilidade).",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Escrivaninha Consagrada",
            "preco": "T$ 9.000",
            "espacos": "2",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta caixa de madeira repleta de dobradiças possui o símbolo de Tanna-Toh pintado na tampa. Ela pode ser aberta e desdobrada para virar uma escrivaninha portátil, útil para aventureiros que querem ter um espaço para ler e escrever mesmo nos ermos. Se você for um devoto da Deusa do Conhecimento e usar a escrivaninha consagrada para estudar por 1 hora, dobra seu bônus de treinamento em uma perícia baseada em Int ou Sab a sua escolha por 1 dia. Além disso, caso possa fabricar pergaminhos, uma vez por aventura recebe 1d3 pergaminhos que poderia ter criado. Considere que você escreveu esses pergaminhos durante seu tempo livre.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Ossos de Dracônicos (Devoto)",
            "preco": "T$ 90.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este item possui a forma de um acessório — como um colar, máscara, colete ou par de brincos — feito de ossos especialmente densos e duros. Qualquer um que toque nos ossos dracônicos sente que eles emanam uma tênue energia — calor, frio, estática ou outra, conforme a natureza do dragão a partir do qual foram feitos. A energia é desconfortável, mas não a ponto de causar dano ou impor qualquer penalidade. Se forem vestidos, os ossos dracônicos fornecem +4 em Intimidação e –2 em Diplomacia. Se forem vestidos por um devoto de Kallyadranoch, emprestam o poder armazenado neles, fornecendo também +2 em Força, +2 em Carisma e +2 na CD de todas as habilidades do devoto.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Anel Eclesiático",
            "preco": "T$ 50",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Este anel é um símbolo da autoridade de um sacerdote. Pessoas comuns tendem a se impressionar com estes anéis, até mesmo se ajoelhando para beijá-los na mão de seus portadores. Se for um clérigo ou frade e estiver vestindo um anel eclesiástico, você recebe +1 em Diplomacia e Intimidação.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Robe Professoral",
            "preco": "T$ —",
            "espacos": "0",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Este robe de aparência comum e desgastada fornece +10 na Defesa, +5 em testes de resistência e redução de dano 10. Artefato",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Varinha da Generosidade",
            "preco": "T$ 30.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta varinha arcana poderosa de madeira Tollon tem várias runas que emanam um brilho púrpura quando encontram a luz da lua. Se você for um devoto de Wynna, a varinha gera um campo de força que fornece redução de dano 5. Além disso, sempre que você lança uma magia, a mana usada na conjuração flui através da varinha para um aliado em alcance curto a sua escolha. Esse aliado recebe 1 PM temporário por círculo da magia lançada (limitado pelo total de PM gastos na magia). Cada aliado só pode receber mana de uma varinha da generosidade uma vez por dia.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Colar de Presas (Devoto)",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este adereço é feito com dentes e garras de monstros unidos por tendões. Se for vestido, fornece +2 em Intimidação, mas impõe –2 em Diplomacia. Mais do que isso, carrega em seu âmago o instinto brutal das feras e, se você for um devoto de Megalokk, fornece também +2 em testes de ataque e rolagens de dano com armas naturais.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Amuleto de Nimb",
            "preco": "T$ 30",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Material",
            "descricao": "Este amuleto em formato de dado não é usado apenas por devotos de Nimb — todos os artonianos podem se beneficiar dele. Contudo, por não ser mágico, dizem que apenas os chatos mais previsíveis o utilizam... Quando faz um teste de perícia, você pode fazer um teste de Inteligência (CD 10). Se fizer o teste de Inteligência e falhar nele, pode rolar novamente o teste de perícia e usar o melhor resultado. Uma vez que você use este efeito em um teste, o amuleto perde seus “poderes”, tornando-se inútil.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Panfleto de Aforismo",
            "preco": "T$ 60",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Às vezes as religiões artonianas contam com tomos de fácil leitura, sem conteúdo pesado — apenas citações motivadoras, conselhos simples, dicas de exercícios de respiração e pequenos excertos que ajudam o fiel a relaxar. Cada panfleto de aforismos é específico de um deus e só funciona com seus devotos. Se estiver debilitado, enjoado, exausto, fatigado, fraco ou vulnerável, você pode gastar uma ação completa e 1 PM para remover uma dessas condições.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Véu Diáfano (Devoto)",
            "preco": "T$ 13.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Esta roupa leve e semitransparente conta como uma veste de seda aprimorada. Se você for um devoto de Marah, o véu diáfano torna sua aparência misteriosa e sedutora, fornecendo +1 em Carisma (apenas após 1 dia de uso) e +2 na Defesa (cumulativo com outros bônus de itens).",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Coroa de flores",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Este adereço é feito com ramos verdejantes e flores brancas, rosas, amarelas e lilases e, abençoado pela magia da natureza, permanece sempre vistoso. Se você for um devoto de Allihanna e vestir a coroa de flores, recebe +1 em Sabedoria (apenas após 1 dia de uso) e suas magias com efeitos numéricos variáveis recebem um bônus de +1 por dado (por exemplo, Curar Ferimentos lançada para curar 4d8+4 PV irá curar 4d8+8 PV)",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Ossos Dracônicos",
            "preco": "T$ 90.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este item possui a forma de um acessório — como um colar, máscara, colete ou par de brincos — feito de ossos especialmente densos e duros. Qualquer um que toque nos ossos dracônicos sente que eles emanam uma tênue energia — calor, frio, estática ou outra, conforme a natureza do dragão a partir do qual foram feitos. A energia é desconfortável, mas não a ponto de causar dano ou impor qualquer penalidade. Se forem vestidos, os ossos dracônicos fornecem +4 em Intimidação e –2 em Diplomacia. Se forem vestidos por um devoto de Kallyadranoch, emprestam o poder armazenado neles, fornecendo também +2 em Força, +2 em Carisma e +2 na CD de todas as habilidades do devoto.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Caldeirão da Vida",
            "preco": "T$ 25.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Esta grande panela de ferro é abençoada com o poder de Lena, e permite preparar refeições únicas. Para isso, você precisa gastar 1 hora, T$ 5 e fazer um teste de Ofício (cozinheiro) contra CD 15. Se você passar, faz comida suficiente para até 5 criaturas Médias ou Pequenas (uma criatura Minúscula come o equivalente à metade de uma criatura Média, uma criatura Grande ou Enorme come o dobro e uma criatura Colossal come o quádruplo). Todos que se alimentarem dela recebem +2 nos testes de resistência por um dia e, se forem devotos de Lena, recebem também 10 PV temporários. Também é possível preparar um prato especial no caldeirão. Nesse caso, faça um único teste de Ofício (cozinheiro) com a CD do prato especial +5 e some o custo da comida do caldeirão ao do prato especial. Se você passar, os benefícios do prato se acumulam com os da comida do caldeirão.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Argolas Místicas",
            "preco": "T$ 25.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta peculiar peça de vestuário consiste de tiras de couro cru conectadas por pequenas argolas metálicas. O conjunto é costurado, tratado com óleos alquímicos e abençoado por louvores a Wynna. Teria sido criada por arcanistas élficos da antiga Lenórienn inspirados por visões da própria Deusa da Magia, que usaria uma indumentária parecida. Seja qual for sua origem, as argolas místicas geram um efeito espantoso. Quando um devoto de Wynna lança uma magia, a energia flui pelas tiras (que funcionam como canais) em direção às argolas (que funcionam como um tipo de ímã místico), acumulando-se nelas. Normalmente, quando um arcanista conjura um feitiço, quantidades residuais da mana canalizada se dissipam na natureza. As argolas impedem isso, potencializando o esforço do conjurador. Em termos de regras, se você estiver vestindo as argolas místicas, for um devoto de Wynna e lançar uma magia, recebe +2 PM para gastar em aprimoramentos. Esses PM podem ultrapassar o limite de gasto de mana do devoto. As argolas podem ser usadas sobre outras roupas (respeitando-se o limite de quatro itens vestidos), mas sabe-se de pelo menos uma famosa arquimaga élfica que vestia apenas elas. Na época, ninguém acreditava quando a elfa explicava a função da peça, mas talvez ela estivesse falando a verdade o tempo inteiro.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Benção das Marés",
            "preco": "T$ 4",
            "espacos": "0",
            "categoria": "Item Geral",
            "tipo": "Alimento",
            "descricao": "Este festival de ostras se tornou uma lenda entre as gentes do mar. Dizem que, em momentos de grande aflição, o próprio deus envia estes presentes para restaurar a força de quem depende do mar. Até o fim do dia, você pode invocar o poder do Deus dos Mares para adquirir deslocamento de natação, igual ao seu deslocamento, por uma cena (se já possuir esse deslocamento, em vez disso ele aumenta em +3m). Oceano.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Coragem de Sange",
            "preco": "T$ 4",
            "espacos": "0",
            "categoria": "Item Geral",
            "tipo": "Alimento",
            "descricao": "Açúcar para energia, especiarias com propriedades fortificantes e vinho para coragem são misturados em uma receita de gosto forte e pungente, servida em chamas, que desperta o instinto de luta. Uma vez até o fim do dia, quando faz a ação agredir, você pode executar um ataque extra. Arsenal.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Tapeçaria de guerra",
            "preco": "T$ 35.000",
            "espacos": "2",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Esta tapeçaria velha e manchada de sangue mostra um campo de batalha, com imagens representando terreno, tropas e objetivos. Analisar a tapeçaria aguça a sua percepção estratégica — ela funciona como uma ferramenta aprimorada, fornecendo +2 em Guerra. Se você for um devoto de Arsenal, estiver em combate e gastar uma ação completa para analisar a tapeçaria, a magia do item se revela, com as imagens se movendo para representar a batalha na qual você está. Como parte da ação completa, você faz um teste de Guerra (CD 20). Se você passar, o bônus em Guerra se estende para todos os testes de perícia, seus e de seus aliados em alcance curto, até o fim da cena. Se passar por 20 ou mais (ou seja, se somar 40 ou mais no teste de Guerra), você e seus aliados em alcance curto recebem uma ação padrão adicional, cada um em seu próximo turno (apenas uma vez por cena). Analisar a tapeçaria requer as duas mãos.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Cubo Armadilha",
            "preco": "T$ 25.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Este pequeno cubo de metal possui diversos botões em sua superfície, mas se você apertá-los nada acontece… Exceto se você for um devoto de Hyninn. Um devoto da Trapaça pode gastar uma ação padrão para apertar os botões e escolher um espaço desocupado em alcance curto. O cubo então flutua até esse espaço e desaparece, ficando invisível e intangível. O primeiro inimigo que entrar nesse espaço é atingido por diversas serras e lâminas que surgem do nada, sofrendo 10d8 pontos de dano de corte (Ref CD Int reduz à metade). Para cada dado de dano que rolar um resultado mínimo ou máximo (ou seja, “1” ou “8”), role 1d8 extra, repetindo o processo a cada resultado mínimo ou máximo. O cubo então reaparece e flutua para seu dono (se ele estiver até alcance longo) ou fica parado no chão (se ele estiver mais longe do que isso). Uma criatura que veja o cubo armadilha sendo ativado pode simplesmente evitar o espaço para onde ele foi, de modo que este item funciona melhor quando usado com preparação. Além disso, uma criatura que procure por armadilhas tem direito a um teste de Investigação (CD 30 + Int do usuário). Se passar, percebe a forma etérea do cubo e pode passar por ele sem ativá-lo (embora não consiga desarmá-lo ou pegá-lo). Se passar e for devota de Hyninn, o cubo reaparece e flutua para ela, adotando-a como nova dona!",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Belo Presente",
            "preco": "T$ —",
            "espacos": "0",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "A adaga empregada pelo Avatar de Wynna é mais um símbolo — e um poderoso amplificador mágico — do que uma arma. Ela conta como um orbe cristalino e uma varinha arcana, e permite que você sustente até três magias ao mesmo tempo. Além disso, ela armazena 20 PM (que são totalmente recuperados ao amanhecer) que podem ser usados apenas para sustentar habilidades mágicas. Artefato",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Instrumento da Alegria",
            "preco": "T$ 10.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Um instrumento musical comum, como um bandolim, flauta ou tambor, aprimorado (+1 em Atuação). Se você for treinado em Atuação e estiver empunhando o instrumento da alegria, pode gastar uma ação padrão e 1 PM para tocar uma música envolvente, que fornece +2 em testes de perícia para você e seus aliados em alcance médio até o fim da cena (cumulativo com outros bônus de itens). Se você for devoto de Marah e usar um poder de Música, pode ativar o efeito do item com uma ação livre.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Cilíco Vivo - Aharadak",
            "preco": "T$ 37.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta cinta de couro possui anzóis enferrujados e afiados. Para usar o cilício vivo, você deve amarrá-lo em sua coxa ou braço (ele conta como um item vestido), de forma a cravar os anzóis em sua carne. O cilício então bebe de seu sangue, adquirindo uma consistência úmida e pulsante. Isso reduz seus PV máximos em 1 por nível. Porém, a dor constante o mantém vigilante, fornecendo um bônus de +1 em todos os seus testes (cumulativo com outros bônus de itens). Se você for um devoto de Aharadak, o bônus aumenta para +2. Se for um devoto de Aharadak de patamar campeão ou superior, o cilício vivo também aumenta seus PM máximos em +1 por nível.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Jarro das Profundezas",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este vaso de madrepérola é coberto de imagens de animais marítimos. Se você for um devoto do Oceano e estiver empunhando o jarro das profundezas, pode gastar uma ação padrão e PM para gerar alguns efeitos. Por 1 PM, cria 2 litros de água salgada. Essa água não pode ser bebida pela maioria dos seres, mas serve para cumprir suas Obrigações & Restrições de se manter em contato com o mar. Também por 1 PM, dispara uma onda de água que se derrama em um cone de 6m à sua frente e derruba quaisquer criaturas na área (Ref CD Sab evita). Por fim, por 2 PM você invoca um elemental da água que atua como um parceiro destruidor (dano de frio) ou guardião veterano até o fim da cena.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Vestido Noturno (Devoto)",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este vestido negro possui pequenos diamantes costurados em seu tecido, que cintilam como as estrelas do céu noturno. Conta como uma veste de seda aprimorada cravejada de gemas, fornecendo +2 em Enganação e Reflexos. Se você for um devoto de Tenebra e vestir este item, pode gastar uma ação padrão e 5 PM para ficar invisível até o fim da cena (recebe camuflagem total e +10 em testes de Furtividade contra ouvir, e criaturas que não possam vê-lo ficam desprevenidas contra seus ataques). Esse efeito termina se você fizer uma ação hostil direta contra uma criatura (para mais detalhes, veja a magia Invisibilidade).",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Véu Diáfano",
            "preco": "T$ 13.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Vestuário",
            "descricao": "Esta roupa leve e semitransparente conta como uma veste de seda aprimorada. Se você for um devoto de Marah, o véu diáfano torna sua aparência misteriosa e sedutora, fornecendo +1 em Carisma (apenas após 1 dia de uso) e +2 na Defesa (cumulativo com outros bônus de itens).",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Coração Corrompido",
            "preco": "T$ 45.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Este pequeno baú de madeira esconde um coração cinzento e ressequido. Se um devoto de Aharadak matar uma criatura inteligente e derramar um pouco do sangue dela no coração, ele volta à “vida”, ficando vermelho e pulsante. Enquanto o coração corrompido estiver vivo, qualquer dano ou condição causado ao devoto será absorvido pelo item. O coração pode absorver até 100 pontos de dano e três condições. Quando isso acontecer, volta ao seu estado “morto”... até um novo sacrifício ser feito. O devoto não precisa estar em posse do coração para o efeito funcionar, apenas saber onde ele está. Isso significa que o devoto pode deixar o item escondido, mas, claro, quanto mais longe ele estiver, mais difícil será “revivê-lo” se necessário.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Pira Póstera",
            "preco": "T$ 15.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta pequena bacia de cerâmica negra possui linhas rajadas vermelhas. Se você for um devoto de Thyatis e estiver em posse da pira póstera, recebe +1 em Sabedoria (apenas após 1 dia de posse). Além disso, uma vez por dia pode enchê-la de água e olhar dentro dela para ter visões de possíveis perigos futuros. Uma vez até o fim do dia, quando faz um teste de Iniciativa, Percepção ou de resistência, você pode rolar novamente esse teste.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Gemas Eternas",
            "preco": "T$ —",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta joia é formada por uma correntinha de mitral, adornada por safiras, esmeraldas, rubis e diamantes que emitem luz própria, brilhando com todas as cores do arco-íris. A beleza das Gemas Eternas só é rivalizada por seu poder. O usuário recebe +2 em Carisma, +5 na Defesa e 1 ponto de mana extra por nível (após um dia de uso). Se possuir a capacidade de lançar magias arcanas, a CD de suas magias aumenta em +2. Artefato.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Coroa Imperial",
            "preco": "T$ —",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Símbolo do trono do Reinado, esta coroa é usada pelos Reis-Imperadores há séculos. Ao longo das gerações, foi imbuída pela força de cada um dos monarcas que a usou, até se tornar um artefato capaz de auxiliar o regente na tarefa de guiar a humanidade. O usuário da Coroa Imperial recebe +2 em Sabedoria e Carisma (cumulativo com outros itens), aplica seu Carisma na Defesa e em testes de resistência e recebe imunidade a encantamento. Como um artefato, a Coroa Imperial não pode ser danificada por meios mundanos. A única maneira de destruí-la é roubá-la e escondê-la em uma masmorra. Se nenhum herói resgatar a Coroa dentro de um ano e um dia, ela será reduzida a pó. Artefato.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Coroa de Allihanna",
            "preco": "T$ —",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este artefato, criado pela própria Deusa da Natureza, tem a aparência de uma coroa de madeira e vinhas. Concede For +3, Con +3 e redução de dano 20.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Braceletes das Escamas",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Criados por Acteia, estes braceletes de aço escurecido são entalhados de forma a parecer escamas de dragão. Fornecem redução de dano 5 e contam como uma Luva de Ferro. Acessório médio.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Anel da Felicidade de Vallen",
            "preco": "T$ —",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este anel foi criado pelos diabretes negociantes a partir da felicidade de Vallen Allond. Foi concedido a Crânio Negro por motivos que apenas os diabretes conhecem — mas que, de forma geral, podem ser resumidos a sadismo e desejo de destruição. O anel da felicidade de Vallen fornece cura acelerada 10 (somente após um dia de uso) que recupera até perda de vida. Além disso, se o usuário for morto enquanto estiver usando o anel e continuar com ele, irá recuperar 1 ponto de vida por dia e, quando chegar a PV positivos, será ressuscitado. Sendo feito a partir da felicidade de Vallen Allond, o anel tem um efeito colateral: o usuário é assaltado por visões desse aventureiro e sente compulsão de protegêlo, estar perto dele ou garantir sua felicidade. É claro que, para um usuário insano, os conceitos de “proteger” e “garantir a felicidade” tornam-se bem distorcidos… O anel também influencia o comportamento do usuário (tornando-o um pouco mais semelhante a Vallen). Artefato.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Face Dracônica",
            "preco": "T$ 25.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta máscara dourada, semelhante ao rosto estilizado de um dragão, fortalece o poder arcano do usuário. Fruto do poder de Ilítia, fornece +2 na CD para resistir a suas habilidades mágicas (incluindo magias) e conta como um Medalhão de Prata. Acessório médio.",
            "fonte": "Guia de NPCs"
        },
        {
            "nome": "Elixir da eternidade",
            "preco": "T$ 3.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este elixir dourado, guardado em uma ampola de vidro de alta qualidade, é capaz de preservar a vitalidade de uma criatura viva por um longo período. Quando ingerido, evita que o usuário envelheça. Até o fim da aventura, você recebe resistencia a trevas +5, torna-se imune a efeitos mágicos de envelhecimento e, se estiver usando a regra opcional de idades variadas (p. 288), ignora todas as suas complicações de idade.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Colar da perseverança",
            "preco": "T$ 10.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este colar de âmbar proporciona ao usuário um aumento considerável em sua determinação. Você recebe +5 em Vontade e +2 em todos os testes estendidos.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Máscara do predador",
            "preco": "T$ 22.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta máscara metálica rústica amplifica os sentidos do caçador, facilitando o rastreio de sua presa. Você recebe +5 em testes de Investigação para procurar e em testes de Sobrevivência para rastrear. Você também recebe a habilidade Marca da Presa do caçador. Se já a possui, o custo para usá-la diminui em –1 PM (essa redução não conta para suas habilidades baseadas no total de PM gastos em Marca da Presa).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cinturão do trobo",
            "preco": "T$ 3.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este cinto de couro resistente aumenta a força do usuário para erguer peso. Você recebe +5 em testes de Atletismo para erguer peso e sua capacidade de carga aumenta em 5 espaços.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Anel da chama dançante",
            "preco": "T$ 30.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Um anel de ouro com uma pequena chama mágica viva que nunca se apaga. A chama mágica — na verdade um pequeno elemental — atua como um parceiro vigilante veterano e permite que você lance Controlar Fogo (se já puder lançar essa magia, seu custo diminui em –1 PM).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Gema da profanação",
            "preco": "T$ 30.000",
            "espacos": "0",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta gema preciosa foi abençoada por uma ou mais divindades malignas do Panteão, tipicamente Aharadak, Arsenal, Kallyadranoch e outras que canalizam energia negativa. O custo de suas habilidades mágicas que causam dano de trevas diminui em –2 PM.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cinto da desmaterialização",
            "preco": "T$ 60.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este cinto feito de couro e metal possui um fecho especial que permite ao usuário desmaterializar seu corpo por um curto período. Você pode lançar Forma Etérea, mas apenas em você mesmo.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Gema da santificação",
            "preco": "T$ 24.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta gema preciosa foi abençoada por uma ou mais divindades benignas do Panteão, tipicamente Azgher, Khalmyr, Lena e outras que canalizam energia positiva. Toda a área em alcance curto da gema é considerada sob efeito da magia Consagrar. Se for devoto de uma dessas divindades, você pode também pagar PM para ativar seus aprimoramentos por uma cena.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Colar das bolas de fogo",
            "preco": "T$ 12.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este colar de ouro possui cinco pequenos rubis incrustados (ou 1d4+1 rubis, se for encontrado num tesouro). Você recebe redução de fogo 10 e pode lançar Bola de Fogo (CD Int ou Car; se já puder lançar essa magia, você recebe 2 PM para gastar em aprimoramentos dela). Quando lança Bola de Fogo, você pode gastar uma ação de movimento para arrancar e quebrar um dos rubis. Se fizer isso, aumenta a CD para resistir a magia em +2 e todos os dados de dano dela em um passo (ambos os efeitos são cumulativos com bônus de outros itens). Se quebrar todos os rubis, o colar perde seus poderes.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Capa nebulosa",
            "preco": "T$ 16.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Feita com finos fios de névoa mágica, esta capa permite ao usuário desaparecer em nevoeiros ou escuridão, como se fizesse parte da névoa ou das trevas. Sempre que você estiver sob camuflagem leve por escuridão ou neblina, essa camuflagem se torna total.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Flechas de Caça",
            "preco": "T$ 10",
            "espacos": "0,05",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Estas flechas possuem cabeças chatas e pesadas, criadas para atordoar presas pequenas em vez de destruí-las completamente, como outros tipos de flechas fariam. Uma flecha de caça causa dano de impacto não letal.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Monóculo da franqueza",
            "preco": "T$ 4.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta lente emoldurada em prata revela intenções e pensamentos ocultos. Observando alguém em alcance curto através do monóculo, o usuário recebe uma leitura superficial de sua mente, discernindo mentiras ou intenções escusas. Você recebe +10 em testes de Intuição para perceber mentiras",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Papiro das estrelas",
            "preco": "T$ 1.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Um pergaminho preto que parece conter constelações em sua superfície. Desenrolado, projeta um mapa celeste mágico que revela localizações ocultas, caminhos seguros ou perigos iminentes. Fornece +5 em testes de Sobrevivência para orientar-se e rastrear, e em testes de Percepção para evitar ser surpreendido por inimigos nos ermos",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Braceletes da amizade intensa",
            "preco": "T$ 36.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Estes dois braceletes de prata são gravados com símbolos antigos de união e lealdade. Quando colocados (cada um numa pessoa diferente), estabelecem uma ligação poderosa entre seus usuários. Em alcance médio, ambos podem se comunicar por telepatia — podendo ver, ouvir e sentir tudo que o outro vê, ouve e sente. Também podem sempre sentir em que direção e distância o outro está. Por fim, quando um usuário recebe cura mágica ou outro efeito mágico benéfico, o outro também é afetado se estiver em alcance curto. O preço do item é pelo par!",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Braçadeiras da força do colosso",
            "preco": "T$ 120.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Estas braçadeiras de ferro negro são incrivelmente pesadas, mas fornecem um aumento massivo na força física do portador. Você recebe +4 em Força (somente após um dia de uso). Além disso, uma vez por cena, pode gastar 5 PM para aumentar esse bônus para +8 por 1 rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Chapéu dos truques infinitos",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta cartola ornamentada com estrelas e luas permite conjurar uma variedade de efeitos mágicos menores. Você pode lançar livremente qualquer versão truque de qualquer magia de 1º círculo que ofereça esse aprimoramento, mesmo que não a conheça.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Caixa dos ecos perdidos",
            "preco": "T$ 10.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta caixa de madeira pequena e simples não aparenta nada especial, sem adereços ou ornamentos. No entanto, quando é aberta, liberta ecos do passado: seus muitos compartimentos contêm partes de memórias antigas, diálogos e fatos históricos. Você pode gastar 3 PM para receber um bônus de +10 em um teste de perícia baseada em Inteligência que, a critério do mestre, se relacione a um evento passado.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Relógio do Arcanista",
            "preco": "T$ 60.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Este relógio de bolso com corpo de prata possui símbolos arcanos no lugar de números em seu mostrador, e permite manipular o tempo necessário para lançar magias arcanas. Quando lança uma magia arcana com execução de movimento, padrão ou completa, você pode gastar +4 PM para lançá-la como uma ação livre. Se você possuir o poder Magia Acelerada, em vez disso o custo para usá-lo diminui em –2 PM.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Chave dos planos",
            "preco": "T$ 60.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta pequena chave de metal parece comum à primeira vista, mas é capaz de abrir portas para lugares distantes. Inserida na fechadura de uma porta comum, permite que você lance Teletransporte ou Viagem Planar, sem necessidade de componente material, desde que também exista uma porta de qualquer tipo no local de chegada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Frigideira do chef anão",
            "preco": "T$ 24.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta enorme frigideira de adamante, gravada com runas dos anões, é amplamente utilizada pelos maiores chefs de Doherimm. É um instrumento de Ofício (cozinheiro) que fornece +5 nessa perícia. Também pode ser usada como uma maça maciça formidável de adamante ou, em situações de emergência, como um escudo pesado defensor de adamante que, por não ter suportes próprios, exige as duas mãos.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cristal da voz silenciosa",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Usado como pingente junto à garganta, este cristal permite ao usuário falar com uma voz mágica, audível apenas para as pessoas que ele selecionar, em alcance curto. Além de muito útil para comunicações secretas, o cristal também permite lançar magias sem necessidade de falar.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Estrepes",
            "preco": "T$ 5",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Tesouro",
            "descricao": "Pequenas peças de metal com pontas afiadas. Você pode gastar uma ação padrão para cobrir com estrepes um quadrado de até 3m de lado adjacente a você. Eles causam 1d4 pontos de dano de perfuração em qualquer criatura que pise na área. Uma criatura que sofra dano dos estrepes fica lenta até o fim do próximo turno dela.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Bracelete do Coração Vivaz",
            "preco": "T$ 27.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este bracelete de ouro adornado com um coração fornece +10 PV (somente após um dia de uso). Além disso, quando você é reduzido a 0 PV ou menos, pode gastar 2 PM para curar 2d8+2 PV por luz.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Corda da resignação",
            "preco": "T$ 7.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta corda feita de fibras mágicas possui um feitiço de aprisionamento. Quando é usada para amarrar alguém, a CD do teste de Acrobacia para escapar aumenta em +20. Além disso, uma vítima amarrada tem sua força de vontade drenada, e fica alquebrada e esmorecida.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Anel do pacto oneroso",
            "preco": "T$ 15.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este anel de platina contém inscrições sobre um acordo com uma entidade poderosa — talvez um espírito ancestral, um Dragão-Real ou mesmo um deus do Panteão. O anel permite lançar uma magia divina de até 4º círculo a sua escolha, sem custo em PM. Contudo, para cada utilização, você deve realizar uma penitência ou busca determinada pelo mestre. Você não pode lançar uma nova magia até que a penitência pela magia anterior tenha sido cumprida.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Algibeira mordedora",
            "preco": "T$ 1.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Possivelmente concebida por algum arcanista cansado de ser furtado por punguistas, esta bolsa transforma sua abertura em uma bocarra de dentes atrozes, travando mandíbulas poderosas na mão do infeliz que tenta acessar seu conteúdo sem permissão. Quando uma criatura faz um teste de Ladinagem para punga contra você, sofre 6d6 pontos de dano de corte e fica agarrada pela algibeira. Para se soltar, a criatura precisa gastar uma ação padrão e passar em um teste de Acrobacia (CD do item) — você pode liberar a criatura proferindo uma palavra de comando (uma ação livre).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Saco dos ventos silenciosos",
            "preco": "T$ 3.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este saco de algodão cru parece conter uma brisa constante. Quando aberto, libera um vento silencioso que pode ser usado para purificar ambientes, suavizar quedas ou aliviar calor extremo. Você pode lançar Criar Elementos (apenas ar), Queda Suave e Suporte Ambiental (apenas contra calor). Se já puder lançar qualquer dessas magias, seu custo diminui em –1 PM",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Tamborete Tapistana",
            "preco": "T$ 300",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Ferramenta",
            "descricao": "Usado por incontáveis exércitos ao longo dos séculos, este instrumento produz um som que qualquer guerreiro reconhece — o som da peleja! Quando você usa Inspiração, cada criatura a sua escolha sob efeito dessa habilidade recebe uma ação de movimento extra em seu próximo turno.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Bastão do sonhador",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este bastão longo e esquelético possui uma gema cintilante na ponta e permite que você entre nos sonhos de uma pessoa adormecida. Em termos de jogo, você pode lançar Sonho. Se já puder lançar essa magia, uma vez por mês pode entregar um item para a pessoa ou roubar um item de posse dela. No primeiro caso, quando a pessoa acordar, estará com o item na vida real. No segundo, você precisa fazer um teste de Vontade oposto contra a pessoa. Se você vencer, quando sair do sonho estará com o item dela.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cinto dos caminhos cruzados",
            "preco": "T$ 15.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este cinto de couro possui fivelas de metal intrincadas que brilham com energia mágica. Uma vez por cena, você pode gastar uma ação de movimento e 3 PM para trocar de lugar com um aliado em alcance curto — vocês dois se teletransportam para onde o outro está.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Chapéu pensador",
            "preco": "T$ 30.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este estranhíssimo “chapéu” na verdade tem o formato triangular de um telhado, com uma chaminé no topo, onde está alojado um ninho de pássaros ruidosos — que dizem ser raros animais planares sagrados de Tanna-Toh. Você recebe a habilidade Engenhosidade (Tormenta20, p. 68); caso já possua essa habilidade, o bônus fornecido por ela aumenta em +2.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Anel da beleza ilusória",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este anel de ouro contém uma gema que reflete a luz de maneira incomum. Enquanto estiver vestindo este anel, você apa- renta ser mais belo — não apenas conforme os padrões estéticos de seu povo ou raça, mas também de acordo com as preferências de cada observador. Você recebe +5 em testes de perícias baseadas em Carisma, exceto Intimidação, e pode lançar Enfeitiçar. Se já puder lançar essa magia, seu custo diminui em –1 PM.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Coroa da majestade distorcida",
            "preco": "T$ 25.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta coroa de prata escura é adornada com pedras de obsidiana. Usada por alguns monarcas, permite exercer uma aura de autoridade inquestionável. Você recebe +1 de Carisma (somente após um dia de uso) e pode lançar Comando (CD Car) como uma ação de movimento e com um bônus de +2 na CD. Contudo, aqueles que passam em seu teste de resistência uma única vez não podem mais ser afetados — talvez explicando algumas prisões ou banimentos sem motivo aparente...",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Coroa da floresta sussurrante",
            "preco": "T$ 21.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta tiara feita de galhos e folhas sempre verdes tem pequenas flores que se abrem ao toque. Ao vesti-la, você é considerado sob efeito da magia Voz Divina e pode lançar Acalmar Animal e Controlar Plantas (CD Sab; se já puder lançar uma dessas magias, pode lançá-la como uma ação de movimento).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Bastão da grande harmonia",
            "preco": "T$ 25.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este bastão de madeira de carvalho é gravado com símbolos antigos e irregulares que irradiam uma energia suave. Você pode gastar uma ação padrão e 3 PM para gerar um pulso de energia tranquilizante em um raio de 9m. Outras criaturas nessa área devem fazer um teste de Vontade (CD Sab); aquelas que falharem largam quaisquer armas que estejam empunhando e ficam pasmas por 1 rodada (apenas uma vez por cena). Além disso, você pode lançar Guardião Divino. Se já puder lançar essa magia, seu custo diminui em –1 PM.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Pingente da dor partilhada",
            "preco": "T$ 15.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta joia delicada, feita de prata escurecida, é ornamentada com um pequeno rubi em formato de lágrima, pulsando suavemente no ritmo do coração de seu portador. Quando um aliado em alcance curto se fere, você pode gastar 2 PM. Se fizer isso, o aliado não sofre o dano, mas você perde PV em quantidade igual ao dano que ele teria sofrido (após quaisquer efeitos que reduzam dano que seu aliado possua ou use, como RD ou Durão)",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Máscara da raposa",
            "preco": "T$ 18.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta máscara de marfim ornada com linhas em vermelho vivo é muitas vezes vista em representações recentes de Hyninn. Usando-a, você parece estar em vários lugares, e em nenhum. Você pode lançar Imagem Espelhada (se já puder lançar essa magia, pode lançá-la como uma ação de movimento e seu custo diminui em –1 PM)",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Lâmpada da ilusão impecável",
            "preco": "T$ 6.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta lâmpada de cristal contém uma chama dourada que nunca apaga. Quando sua cobertura é removida, ela projeta ilusões perfeitamente detalhadas de qualquer coisa que o usuário deseje — você pode lançar a magia Criar Ilusão, mas apenas para efeitos visuais (CD Int; se já puder lançar essa magia, recebe 2 PM para gastar em aprimoramentos dela). Contudo, a perfeição absoluta das imagens aumenta a CD para resistir à magia em +5.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Tomo dos companheiros",
            "preco": "T$ 45.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Diz-se que este livro volumoso veio da própria Biblioteca de Tanna-Toh, em seu reino divino. De tão poderosas suas histórias, os personagens às vezes escapam para a vida real. Você pode gastar uma ação completa e 3 PM para ler um trecho do livro e convocar um parceiro veterano de um tipo a sua escolha, que surge em um espaço desocupado adjacente. O parceiro dura até o fim do dia ou até você conjurar outro parceiro com o tomo.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Anel da proteção mental",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este anel de platina contém uma pequena pedra lunar que brilha suavemente. Você recebe resistência a efeitos mentais +5.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cristal do tempo célere",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este cristal azulado contém em seu interior uma pequena porção de gás mágico que afeta a passagem do tempo. Quando o cristal é quebrado, pode acelerar o tempo dentro de um aposento. Em termos de jogo, gastar o cristal permite um intervalo entre aventuras no tempo de 1 dia.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Flechas Assobiadoras",
            "preco": "T$ 20",
            "espacos": "0,05",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Estas flechas simulam o canto de um pássaro quando disparadas. Artesãos élficos criavam flechas que faziam sons específicos, reconhecidos por suas sentinelas. Por exemplo, o crocitar de um falcão indicava um ataque, enquanto que o chiado de uma coruja significava um avanço furtivo. Um grupo pode usar estas flechas para se comunicar à distância (ainda que de forma rudimentar). Além disso, o som distrativo desta flecha permite que ela seja usada para fazer uma finta contra qualquer alvo dentro do alcance dela (normalmente, uma finta só pode ser feita contra alvos em alcance curto).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Elixir da mente dividida",
            "preco": "T$ 1.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este elixir de cor verde esmeralda permite ao usuário dividir sua consciência em duas partes. Quando ingerido, permite executar uma ação de movimento e uma ação padrão adicionais por rodada (esse efeito não se acumula com outros efeitos mágicos que concedem ações adicionais) até o fim da cena. Contudo, enquanto sua mente está dividida, você perde a capacidade de se focar plenamente em qualquer tarefa: sofre uma penalidade de –5 em testes de perícia (exceto testes feitos como reação) e é considerado em condição ruim para lançar magias (Tormenta20, p. 170). Além disso, quando o efeito acaba, você fica fatigado por 1 dia.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Espelho da verdade",
            "preco": "T$ 21.000",
            "espacos": "10",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este grande espelho é emoldurado em ferro e adornado com figuras de celestiais combatendo abissais. A imagem de qualquer criatura ou objeto refletida no espelho revela sua forma verdadeira, como a magia Visão da Verdade — sendo assim um item muitas vezes encontrado em locais de alta segurança. O espelho também pode ser utilizado por um conjurador como a superfície reflexiva para lançar Vidência, aumentando a CD dessa magia em +5 e estendendo seu efeito de Visão da Verdade ao alvo observado.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Algibeira provedora",
            "preco": "T$ 6.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta bolsa de couro parece normal à primeira vista, mas tem uma conexão planar com o Reino de Nimb. Você pode gastar uma ação completa para enfiar sua mão na algibeira e procurar por um item mundano não superior que ocupe até 1 espaço. Role 1d20. Se rolar 6 ou mais, você encontra o item. Ele dura até se afastar a mais de 9m de você ou até você procurar outro item. Se rolar 5 ou menos, você sai de mãos vazias e a algibeira perde seus poderes por 1 dia. Se rolar 1 natural, a algibeira cria dentes, lhe dá uma mordida (causando 4d6 pontos de dano de corte) e desaparece em uma nuvem de purpurina!",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Colar do tirano",
            "preco": "T$ 10.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este item cruel é fabricado por abissais e usado por escravagistas. Cada colar tem conexão planar com uma ou mais coleiras (tipicamente 1d8) destinadas a prisioneiros escravizados. Uma vez por rodada, o usuário do colar do tirano pode causar 2d8+2 pontos de dano de eletricidade a um escravo encoleirado. Tentativas mundanas de remover a coleira causam o mesmo dano — apenas efeitos como Dissipar Magia permitem destrancá-las. Além disso, qualquer dano ou efeito nocivo causado ao usuário do colar também afeta todos os escravos encoleirados.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cinto da leveza graciosa",
            "preco": "T$ 9.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este cinto mágico reduz o peso do usuário, tornando-o mais ágil e permitindo saltos mais altos e movimentos mais suaves. Você recebe +5 em Acrobacia e está sempre sob o efeito básico de Queda Suave.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Ampulheta da harmonia temporal",
            "preco": "T$ 10.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Uma ampulheta dourada com areia prateada que parece flutuar em ciclos irregulares. Quando invertida, permite que você manipule levemente o fluxo do tempo ao redor, desacelerando ou acelerando pequenos eventos. Uma vez por dia, você pode realizar uma tarefa que normalmente consome de 1 minuto a 1 hora como uma ação completa.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cálice Sagrado",
            "preco": "T$ 150.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Esotérico",
            "descricao": "Este cálice pode ser luxuoso ou humilde — de ouro e adornado com gemas, ou de barro e feitio rústico —, conforme a divindade à qual foi consagrado. O custo de suas magias divinas diminui em –2 PM e todos os efeitos variáveis delas aumentam em +1 por dado.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Pena da criação",
            "preco": "T$ 6.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Esta pena, que brilha em tom roxo escuro, pertencia a um malafex — tipo de corvo mágico sagrado de Nimb. Conta como instrumentos de Ofício (escriba) aprimorado. Uma vez por cena, você pode gastar uma ação completa para desenhar um monstro em um pergaminho ou outra superfície que aceite tinta. Faça um teste de Ofício (escriba) com CD 10. Se passar, você lança o efeito básico de Conjurar Monstro sem gastar PM. Para cada 5 pontos pelos quais o resultado do teste exceder a CD, você recebe +1 PM para gastar em aprimoramentos. Você pode usar esse efeito mesmo sem ser treinado no Ofício apropriado (mas talvez o monstro invocado seja um pouco… esquisito).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Cálice das marés",
            "preco": "T$ 15.500",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Este cálice de prata oferece ao portador o poder de comandar as águas. Você pode lançar Controlar Água (se já puder lançar essa magia, seu custo diminui em –1 PM).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Botas do andarilho das sombras",
            "preco": "T$ 15.000",
            "espacos": "1",
            "categoria": "Item Geral",
            "tipo": "Acessório",
            "descricao": "Estas botas de couro escuro são incrivelmente silenciosas, permitindo ao usuário se mover sem emitir sons. Você recebe +5 em testes de Furtividade realizados em ambientes urbanos ou escuros. Além disso, uma vez por dia, você pode lançar Salto Dimensional — mas apenas se existir no destino uma sombra de tamanho suficiente para sua passagem.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Virotes Pesados",
            "preco": "T$ 20",
            "espacos": "0,05",
            "categoria": "Item Geral",
            "tipo": "Munição",
            "descricao": "Estas munições são versões de ponta mais pesada e afiada das flechas ou virotes normais. Você sofre –2 em testes de ataque com estas flechas, mas ignora 5 pontos da RD dos alvos.",
            "fonte": "Heróis de Arton"
        }
    ]
};

// Publica a variável para o script.js

window.itensData = itensData;


