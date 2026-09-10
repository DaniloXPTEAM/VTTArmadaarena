// maldicao.js

const maldicaoData = {
    "maldicao": [
        // ===== Maldições de Armas =====
        {
            nome: "Maldição: Acalentadora",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Sempre que você acerta um ataque em um inimigo que esteja sofrendo uma condição negativa, você remove essa condição.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Avarenta",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Reduza todo dano causado pela arma para o múltiplo de 10 mais próximo (ex: 15 vira 10, 29 vira 20).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Bailarina",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Sempre que quiser se mover em combate, precisa passar em Atuação (CD 10 + nível) ou não se move. Deslocamento diminuído à metade.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Carente (Arma)",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Arma amaldiçoada. Se for removida (ex: Purificação +3 PM), reaparece em sua mão 1d4 rodadas depois. Requer Lendas e Histórias para descobrir como se livrar.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Frustrante",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Quando erra um ataque, fica frustrado. Se já estiver frustrado, fica esmorecido. Condições são anuladas com um acerto crítico (um por condição).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Hesitante",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Sempre que faz um acerto crítico, deve rolar novamente o ataque. Se acertar, confirma o crítico. Se errar, vira um acerto normal.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Indecisa",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Se houver mais de um inimigo, deve decidir aleatoriamente qual atacar. Se não puder alcançá-lo e atacar, deve gastar a rodada inteira se deslocando até ele.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Isenta",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Sempre que você causa uma condição negativa a um inimigo, sofre essa mesma condição.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Mendicante",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Custa T$ 1 para fazer um ataque. Custa T$ 10 (1 TO) por ataque se usar qualquer habilidade com a arma.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Preguiçosa",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Você só pode atacar com a arma em rodadas alternadas. Não pode fazer nenhum outro tipo de ataque nas rodadas em que não ataca com ela.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Pró-Criatura",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Oposto de anticriatura. Sempre que causa dano a um inimigo de um determinado tipo, a arma em vez disso cura a mesma quantidade de PV.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Pueril/Idosa",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "A cada combate, a arma faz você rejuvenescer ou envelhecer um ano (decidido aleatoriamente).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Temerária",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "A arma puxa para o lado errado no bloqueio. Você sofre –2 na Defesa.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Trágica",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Se usa a regra de Falhas Críticas (p. 300), role duas vezes (pior resultado). Se não usa, é obrigado a usá-la (role 1 vez).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Vaidosa",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Arma",
            descricao: "Precisa gastar 1 hora por dia bajulando a arma. Se não o fizer, não pode atacar com ela (nem de nenhuma outra forma).",
            fonte: "Heróis de Arton"
        },

        // ===== Maldições de Armaduras, Escudos e Acessórios =====
        {
            nome: "Maldição: Amargo",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Tudo que você ingere tem gosto horrível. Exige Vontade (CD 20) para usar itens ingeridos (poções, comida). Falha em comer/beber causa fome/sede.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Antipático",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Todos os NPCs que você encontra pela primeira vez têm atitude uma categoria pior com você.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Carente (Outros)",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Item amaldiçoado. Se for removido (ex: Purificação +3 PM), reaparece 1d4 rodadas depois. Requer Lendas e Histórias para descobrir como se livrar.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Cético",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Sempre que lançar uma magia, deve fazer um teste de Misticismo (arcana) ou Religião (divina) (CD da magia). Se falhar, a magia falha, mas os PM são gastos.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Conspurcador",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Qualquer item consumível imbuído de magia divina (água benta, poção divina) que você toque perde suas propriedades (permanente).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Desastrado",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Em combate, sempre que você se mover deve fazer Acrobacia (CD 10 + nível). Se falhar, fica caído.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Desengonçado",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "O item ocupa +2 espaços que o normal.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Desleixado",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Você sofre –5 em todas as perícias baseadas em Carisma. Pode ser barrado de ambientes refinados.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Do Contra",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Quando um aliado lança uma magia em você, você é obrigado a fazer um teste de Vontade (CD da magia) para evitar o efeito (não pode falhar voluntariamente).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Esfomeado",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Você precisa consumir o dobro de comida por dia (ou sofre fome). Precisa consumir 2 unidades de um item ingerido para ele ter efeito.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Exaustivo",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "O custo em PM de suas habilidades aumenta em +1.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Fotofóbico",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Sempre que está em ambiente com iluminação normal, você fica ofuscado. Nenhum bônus para enxergar no escuro.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Ignorante",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Sempre que for fazer um teste (qualquer um), deve primeiro passar em Inteligência (CD 10 + nível). Se falhar, não pode tentar o teste (falha automática).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Maroto",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Sempre que for sacar um item, decida aleatoriamente qual item foi sacado (exceto itens vestidos).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Modesto",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Sempre que fizer um teste da perícia na qual tem o maior bônus (exceto Luta/Pontaria), role 2 dados e use o pior.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Perdulário",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "Você perde 10% de todo dinheiro que carrega por semana. Se não tiver dinheiro, perde um item aleatório (exceto este).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Maldição: Surrupiado",
            preco: "",
            espacos: "—",
            categoria: "Maldição",
            tipo: "Armadura/Escudo/Acessório",
            descricao: "O item assume a aparência de algo que obviamente pertence a alguém importante local (ex: brasão da rainha em Valkaria). Esconder exige Ladinagem por cena.",
            fonte: "Heróis de Arton"
        }
    ]
};

// Publica a variável para o script.js
window.maldicaoData = maldicaoData;