// armaduras.js

const armadurasData = {
    "armadura": [
        // ---------- ARMADURAS LEVES ----------
        {
            "nome": "Armadura acolchoada",
            "preco": "T$ 5",
            "bonus_defesa": "+1",
            "penalidade_armadura": "0",
            "espacos": "2",
            "categoria": "Armadura",
            "tipo": "Armadura Leve",
            "descricao": "Túnica almofadada que oferece +1 na Defesa sem penalidade de armadura. Ocupa 2 espaços. A mais leve das armaduras, ideal para personagens que precisam de mobilidade.",
            "imagem": "data/img/armadura-acolchoada.webp"
        },
        {
            "nome": "Armadura de couro",
            "preco": "T$ 20",
            "bonus_defesa": "+2",
            "penalidade_armadura": "0",
            "espacos": "2",
            "categoria": "Armadura",
            "tipo": "Armadura Leve",
            "descricao": "Peitoral de couro curtido em óleo fervente que oferece +2 na Defesa sem penalidade de armadura. Ocupa 2 espaços. Confortável e acessível.",
            "imagem": "data/img/armadura-couro.webp"
        },
        {
            "nome": "Couro batido",
            "preco": "T$ 35",
            "bonus_defesa": "+3",
            "penalidade_armadura": "–1",
            "espacos": "2",
            "categoria": "Armadura",
            "tipo": "Armadura Leve",
            "descricao": "Versão pesada da armadura de couro, reforçada com rebites de metal, que oferece +3 na Defesa com penalidade de –1 na armadura. Ocupa 2 espaços.",
            "imagem": "data/img/couro-batido.webp"
        },
        {
            "nome": "Gibão de peles",
            "preco": "T$ 25",
            "bonus_defesa": "+4",
            "penalidade_armadura": "–3",
            "espacos": "2",
            "categoria": "Armadura",
            "tipo": "Armadura Leve",
            "descricao": "Armadura feita de várias camadas de peles e couro de animais que oferece +4 na Defesa com penalidade de –3 na armadura. Ocupa 2 espaços. Favorita de bárbaros.",
            "imagem": "data/img/gibao-peles.webp"
        },
        {
            "nome": "Couraça",
            "preco": "T$ 500",
            "bonus_defesa": "+5",
            "penalidade_armadura": "–4",
            "espacos": "2",
            "categoria": "Armadura",
            "tipo": "Armadura Leve",
            "descricao": "Placa metálica que protege peito e costas, oferecendo +5 na Defesa com penalidade de –4 na armadura. Ocupa 2 espaços. A mais robusta das armaduras leves.",
            "imagem": "data/img/couraca.webp"
        },
        // ---------- ARMADURAS PESADAS ----------
        {
            "nome": "Brunea",
            "preco": "T$ 50",
            "bonus_defesa": "+5",
            "penalidade_armadura": "–2",
            "espacos": "5",
            "categoria": "Armadura",
            "tipo": "Armadura Pesada",
            "descricao": "Colete de couro coberto com plaquetas de metal sobrepostas que oferece +5 na Defesa com penalidade de –2 na armadura. Ocupa 5 espaços. A mais utilizada no Reinado.",
            "imagem": "data/img/brunea.webp"
        },
        {
            "nome": "Cota de malha",
            "preco": "T$ 150",
            "bonus_defesa": "+6",
            "penalidade_armadura": "–2",
            "espacos": "5",
            "categoria": "Armadura",
            "tipo": "Armadura Pesada",
            "descricao": "Veste longa de anéis metálicos interligados que oferece +6 na Defesa com penalidade de –2 na armadura. Ocupa 5 espaços. Flexível e resistente.",
            "imagem": "data/img/cota-malha.webp"
        },
        {
            "nome": "Loriga segmentada",
            "preco": "T$ 250",
            "bonus_defesa": "+7",
            "penalidade_armadura": "–3",
            "espacos": "5",
            "categoria": "Armadura",
            "tipo": "Armadura Pesada",
            "descricao": "Armadura composta por tiras horizontais de metal que oferece +7 na Defesa com penalidade de –3 na armadura. Ocupa 5 espaços. Muito utilizada por legionários.",
            "imagem": "data/img/loriga-segmentada.webp"
        },
        {
            "nome": "Meia armadura",
            "preco": "T$ 600",
            "bonus_defesa": "+8",
            "penalidade_armadura": "–4",
            "espacos": "5",
            "categoria": "Armadura",
            "tipo": "Armadura Pesada",
            "descricao": "Cota de malha reforçada com placas de metal que oferece +8 na Defesa com penalidade de –4 na armadura. Ocupa 5 espaços.",
            "imagem": "data/img/meia-armadura.webp"
        },
        {
            "nome": "Armadura completa",
            "preco": "T$ 3.000",
            "bonus_defesa": "+10",
            "penalidade_armadura": "–5",
            "espacos": "5",
            "categoria": "Armadura",
            "tipo": "Armadura Pesada",
            "descricao": "Placas de metal forjadas e encaixadas que oferecem +10 na Defesa com penalidade de –5 na armadura. Ocupa 5 espaços. Precisa ser feita sob medida. A mais forte e pesada das armaduras.",
            "imagem": "data/img/armadura-completa.webp"
        },
        // ---------- ESCUDOS ----------
        {
            "nome": "Escudo leve",
            "preco": "T$ 5",
            "bonus_defesa": "+1",
            "penalidade_armadura": "–1",
            "espacos": "1",
            "categoria": "Escudo",
            "tipo": "Escudo Leve",
            "descricao": "Escudo de madeira amarrado no antebraço que oferece +1 na Defesa com penalidade de –1 na armadura. Ocupa 1 espaço. Deixa a mão livre.",
            "imagem": "data/img/escudo-leve.webp"
        },
        {
            "nome": "Escudo pesado",
            "preco": "T$ 15",
            "bonus_defesa": "+2",
            "penalidade_armadura": "–2",
            "espacos": "2",
            "categoria": "Escudo",
            "tipo": "Escudo Pesado",
            "descricao": "Escudo de aço preso ao antebraço que oferece +2 na Defesa com penalidade de –2 na armadura. Ocupa 2 espaços. Ocupa uma mão ao ser empunhado.",
            "imagem": "data/img/escudo-pesado.webp"
        },

        // (Itens de Ameaças de Arton)
        {
            nome: "Armadura de Ossos",
            preco: "T$ 120",
            bonus_defesa: "+3",
            penalidade_armadura: "–2",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Armadura sinistra feita de ossos que oferece +3 na Defesa com penalidade de –2 na armadura. Ocupa 2 espaços. Fornece +1 em Intimidação e na CD de efeitos de medo.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/gibao-peles.webp"
        },
        {
            nome: "Veste de Teia de Aranha",
            preco: "T$ 3.000",
            bonus_defesa: "+4",
            penalidade_armadura: "0",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Veste feita com teia de aranha gigante que oferece +4 na Defesa sem penalidade de armadura. Ocupa 2 espaços. Fornece +5 em Furtividade. Não pode receber melhoria material especial.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/teia.webp"
        },
        {
            nome: "Armadura de Quitina",
            preco: "T$ 350",
            bonus_defesa: "+7",
            penalidade_armadura: "–3",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Feita com carapaças de grandes insetos, esta armadura dos povos-trovão é mais leve que suas contrapartes metálicas. Embora seja uma armadura pesada, não reduz o deslocamento do usuário.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Escudo de Couro",
            preco: "T$ 3",
            bonus_defesa: "+1",
            penalidade_armadura: "–1",
            espacos: "1",
            categoria: "Escudo",
            tipo: "Escudo Leve",
            descricao: "Feito com uma armação de madeira esticando uma membrana de couro. Contra ataques à distância, o bônus na Defesa do escudo aumenta em +2. É muito leve para ser usado como arma.",
            fonte: "Ameaças de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        // (Itens de Heróis de Arton)
        {
            nome: "Armadura Sensual",
            preco: "T$ 55",
            bonus_defesa: "+1",
            penalidade_armadura: "0",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Permite usar o poder Atraente. Se já o tiver, o bônus aumenta para +5. Pode não ser apropriada em certas situações sociais.",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura de Folhas",
            preco: "T$ 75",
            bonus_defesa: "+2",
            penalidade_armadura: "0",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Feita de folhas preparadas. Se for treinado em Sobrevivência, você recebe +2 PM (somente após 1 dia de uso).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura de Engenhoqueiro Goblin",
            preco: "T$ 85",
            bonus_defesa: "+3",
            penalidade_armadura: "–2 a –10",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Pode levar até 2 espaços de itens na armadura. Pode levar +8 espaços (total 10), mas a penalidade aumenta em –1 por espaço extra (até –10). Penalidade não se aplica a testes para ativar engenhocas. Causa –5 em Furtividade. Não pode ter penalidade reduzida.",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Cota de Moedas",
            preco: "T$ 350",
            bonus_defesa: "+4",
            penalidade_armadura: "–3",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Feita de tibares entrelaçados. Você recebe +2 em Diplomacia (cumulativo com melhorias). Pode impor –2 em Diplomacia contra certos grupos.",
            fonte: "Heróis de Arton",
            imagem: "data/img/cota-malha.webp"
        },
        {
            nome: "Colete Fora da Lei",
            preco: "T$ 750",
            bonus_defesa: "+5",
            penalidade_armadura: "–5",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Colete metálico com ranhuras. Contra armas de disparo, o bônus na Defesa aumenta em +2.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Veste de Teia de Aranha",
            preco: "T$ 3.000",
            bonus_defesa: "+4",
            penalidade_armadura: "0",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Veste feita com teia de aranha gigante que oferece +4 na Defesa sem penalidade de armadura. Ocupa 2 espaços. Fornece +5 em Furtividade. Não pode receber melhoria material especial.",
            fonte: "Heróis de Arton",
            imagem: "data/img/teia.webp"
        },
        {
            nome: "Armadura de Ossos",
            preco: "T$ 120",
            bonus_defesa: "+3",
            penalidade_armadura: "–2",
            espacos: "2",
            categoria: "Armadura",
            tipo: "Armadura Leve",
            descricao: "Armadura sinistra feita de ossos que oferece +3 na Defesa com penalidade de –2 na armadura. Ocupa 2 espaços. Fornece +1 em Intimidação e na CD de efeitos de medo.",
            fonte: "Heróis de Arton",
            imagem: "data/img/gibao-peles.webp"
        },
        {
            nome: "Brigantina",
            preco: "T$ 75",
            bonus_defesa: "+6",
            penalidade_armadura: "0",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Veste de couro com pequenas placas metálicas. Contra armas de perfuração, o bônus na Defesa diminui em –2.",
            fonte: "Heróis de Arton",
            imagem: "data/img/couro-batido.webp"
        },
        {
            nome: "Armadura de Quitina",
            preco: "T$ 350",
            bonus_defesa: "+7",
            penalidade_armadura: "–3",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Feita com carapaças de grandes insetos. Embora seja uma armadura pesada, não reduz o deslocamento do usuário.",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura de Chumbo",
            preco: "T$ 750",
            bonus_defesa: "+7",
            penalidade_armadura: "–5",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Extremamente pesada. Fornece redução de dano 2/mundano e resistência a magia +2 (cumulativo).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura de Justa",
            preco: "T$ 1.200",
            bonus_defesa: "+9",
            penalidade_armadura: "–5",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Meia armadura de placas. Fornece +5 para resistir a ser derrubado (montado). Contra armas de perfuração, bônus na Defesa +2. Penalidade de armadura aumenta em 2 se não estiver montado.",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-completa.webp"
        },
        {
            nome: "Armadura de Hussardo Alado",
            preco: "T$ 4.500",
            bonus_defesa: "+10",
            penalidade_armadura: "–6",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Armadura completa com 'asas' de penas. Quando faz uma investida montada, pode fazer um teste de Intimidação para assustar o alvo (1/cena por oponente).",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Armadura de Pedra",
            preco: "T$ 5.500",
            bonus_defesa: "+12",
            penalidade_armadura: "–5",
            espacos: "5",
            categoria: "Armadura",
            tipo: "Armadura Pesada",
            descricao: "Armadura completa de pedra. Fornece redução de dano 2 (cumulativo). Seu deslocamento é reduzido pela metade (em vez de -3m). Não pode receber material especial.",
            fonte: "Heróis de Arton",
            imagem: "data/img/armadura-couro.webp"
        },
        {
            nome: "Broquel",
            preco: "T$ 25",
            bonus_defesa: "0",
            penalidade_armadura: "–1",
            espacos: "0,5",
            categoria: "Escudo",
            tipo: "Escudo Leve",
            descricao: "Não fornece bônus passivo. 1/rodada, quando é atingido por um ataque, pode fazer um teste de ataque corpo a corpo (reação). Para cada 10 pontos no resultado, reduz o dano em 2. Pode atacar como escudo leve.",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },

        {
            nome: "Escudo de Vime",
            preco: "T$ 15",
            bonus_defesa: "+2",
            penalidade_armadura: "–2",
            espacos: "2",
            categoria: "Escudo",
            tipo: "Escudo Pesado",
            descricao: "Leve e volumoso. Exige duas mãos (impede empunhar armas). Não pode ser usado montado ou para atacar. Fornece camuflagem leve. Pode gastar ação para fornecer o bônus de Defesa e camuflagem a um aliado adjacente. Se você ou o aliado sofrerem um crítico, o escudo é destruído.",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-leve.webp"
        },
        {
            nome: "Escudo Torre",
            preco: "T$ 45",
            bonus_defesa: "+2",
            penalidade_armadura: "–4",
            espacos: "2",
            categoria: "Escudo",
            tipo: "Escudo Pesado",
            descricao: "Escudo grande e retangular. Não pode ser usado para atacar ou montado. Pode gastar uma ação de movimento para fixá-lo no chão (fornece cobertura leve).",
            fonte: "Heróis de Arton",
            imagem: "data/img/escudo-pesado.webp"
        },
        {
            nome: "Sagna",
            preco: "T$ 20",
            bonus_defesa: "+2",
            penalidade_armadura: "–3",
            espacos: "2",
            categoria: "Escudo",
            tipo: "Escudo Pesado",
            descricao: "Grande escudo de madeira. Anula a penalidade de armadura (deste escudo e da sua armadura) para natação. Se passa em teste de natação, avança deslocamento normal (+3m se já tiver desloc. de natação). Pode atacar como escudo pesado.",
            fonte: "Heróis de Arton"
        }

    ]
};

// Publica a variável para o script.js
window.armadurasData = armadurasData;