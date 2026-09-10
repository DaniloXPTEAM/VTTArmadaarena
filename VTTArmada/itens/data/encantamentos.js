// enchantmentos.js

const enchantmentosData = {
    "encantamento": [
        // ===== ENCANTOS DE ARMA (Tabela 8-2) =====
        {
            "nome": "Encanto Ameaçadora",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que duplica a margem de ameaça da arma, aumentando a chance de acertos críticos."
        },
        {
            "nome": "Encanto Anticriatura",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que torna a arma letal contra um tipo de criatura específico. Causa +4d8 de dano (custo 2 PM) ao acertar esse tipo."
        },
        {
            "nome": "Encanto Arremesso",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que permite arremessar uma arma em alcance curto sem penalidades. Se a arma já possuía essa capacidade, seu alcance é aumentado em uma categoria. Após o arremesso, a arma retornará voando para você, e pegá-la é uma reação."
        },
        {
            "nome": "Encanto Assassina",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que aumenta dados de dano extra de ataque furtivo para d8. Permite rolar novamente resultados 1 (custo 2 PM)."
        },
        {
            "nome": "Encanto Caçadora",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que anula penalidades por camuflagem leve e total, bem como por cobertura leve. Aumenta alcance de armas à distância em uma categoria."
        },
        {
            "nome": "Encanto Congelante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que causa +1d6 de dano de frio. Pode enredar o alvo por 1 rodada (custo 2 PM)."
        },
        {
            "nome": "Encanto Conjuradora",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que armazena uma magia. Permite lançar a magia ao acertar um ataque (ação livre)."
        },
        {
            "nome": "Encanto Corrosiva",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que causa +1d6 de dano de ácido. Causa 4d4 de dano de ácido na próxima rodada (custo 2 PM)."
        },
        {
            "nome": "Encanto Dançarina",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que permite a arma flutuar e atacar sozinha com duração sustentada (custo 1 PM)."
        },
        {
            "nome": "Encanto Defensora",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que fornece +2 na Defesa do portador."
        },
        {
            "nome": "Encanto Destruidora",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que fornece +2 em testes de ataque contra construtos e objetos (manobra quebrar), causando +2d8 de dano."
        },
        {
            "nome": "Encanto Dilacerante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que causa +10 pontos de dano em acertos críticos."
        },
        {
            "nome": "Encanto Drenante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que em acertos críticos em criaturas vivas as deixa fracas e concede 2d10 PV temporários a você."
        },
        {
            "nome": "Encanto Elétrica",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "A arma causa +1d6 de dano de eletricidade. Uma vez por rodada, quando ataca, você pode gastar 2 PM. Se fizer isso e acertar o ataque, um raio atinge outra criatura em alcance curto, causando 3d8 pontos de dano de eletricidade"
        },
        {
            "nome": "Encanto Energética",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Concede +4 em testes de ataque, ignora 20 RD, causa dano de essência, emite luz (9m). Pré-Requisito: Formidável. (p. 335)"
        },
        {
            "nome": "Encanto Excruciante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Uma criatura viva atingida fica fraca. Se já estiver fraca, mesmo por este efeito, fica debilitada (a condição máxima que esta arma pode causar)."
        },
        {
            "nome": "Encanto Flamejante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que causa +1d6 de dano de fogo. Uma vez por rodada, quando ataca, pode gastar 2 PM para disparar uma bola de fogo contra um alvo em alcance médio, causando 6d6 de dano de fogo (Reflexos reduz à metade)."
        },
        {
            "nome": "Encanto Formidável",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que fornece +2 em testes de ataque e rolagens de dano."
        },
        {
            "nome": "Encanto Lacinante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "A arma inflige ferimentos mortais. Quando faz um acerto crítico com a arma, você causa +10 pontos de dano ou, além de multiplicar os dados de dano, multiplica também quaisquer bônus numéricos, a sua escolha. Este efeito substitui o efeito de dilacerante. Pré-requisito: dilacerante."
        },
        {
            "nome": "Encanto Magnífica",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Concede +4 em testes de ataque e rolagens de dano. Pré-Requisito: Formidável. (p. 336)"
        },
        {
            "nome": "Encanto Piedosa",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "+1d8 de dano, mas todo o dano causado é não letal. Você pode gastar 1 PM para desativar e ativar este encanto. (p. 336)"
        },
        {
            "nome": "Encanto Profana",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Causa +2d8 de dano contra devotos de deuses de energia positiva e criaturas bondosas. (p. 336)"
        },
        {
            "nome": "Encanto Sagrada",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que causa +2d8 de dano contra devotos de deuses que canalizam apenas energia negativa e criaturas malignas."
        },
        {
            "nome": "Encanto Sanguinaria",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Uma criatura viva atingida fica sangrando. A perda de PV por sangramento causada pela arma é cumulativa — uma criatura atingida duas vezes perde 2d6 PV por sangramento por rodada."
        },
        {
            "nome": "Encanto Trovejante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Quando você faz um acerto crítico, a vítima fica atordoada por uma rodada (apenas uma vez por cena; Fort CD For ou Des, a sua escolha, evita). (p. 336)"
        },
        {
            "nome": "Encanto Tumular",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que causa +1d8 de dano de trevas. Uma vez por rodada, quando ataca, pode gastar 2 PM para aumentar o dano para +2d8, mas perde 1d8 pvs."
        },
        {
            "nome": "Encanto Veloz",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Você recebe a habilidade Ataque Extra, do guerreiro, mas só pode usá-la com esta arma. Se já a possui, em vez disso, o custo para usá-la com esta arma diminui em –1 PM. (p. 336)"
        },

        {
            "nome": "Encanto Venenosa",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Arma",
            "descricao": "Encantamento que permite, uma vez por rodada ao atacar, gastar 2 PM para envenenar a vítima, que perde 1d12 PV por rodada durante 3 rodadas."
        },

        // ===== ENCANTOS DE ARMADURA E ESCUDO (Tabela 8-3) =====

        {
            "nome": "Encanto Abascanto",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe resistência a magia +5. (p. 338)"
        },
        {
            "nome": "Encanto Abençoado",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe redução de trevas 10 e +5 em testes de resistência contra efeitos de necromancia. (p. 338)"
        },
        {
            "nome": "Encanto Acrobático",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "+5 em Acrobacia e Ignora a penalidade de armadura do item para testes dessa perícia. (p. 338)"
        },
        {
            "nome": "Encanto Alado",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode gastar 2 PM para fazer asas emergirem de suas costas e receber deslocamento de voo 12m com duração sustentada. (p. 338)"
        },
        {
            "nome": "Encanto Animado",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode gastar uma ação de movimento e 1 PM para fazer o escudo flutuar ao seu redor até o fim da cena. Você recebe o mesmo bônus na Defesa que receberia se estivesse empunhando o escudo, mas fica com as duas mãos livres. Você só pode ser protegido por um escudo ao mesmo tempo. (p. 338)"
        },
        {
            "nome": "Encanto Assustador",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode gastar uma ação de movimento e 2 PM para gerar uma onda de medo. Inimigos em alcance curto devem passar num teste de Vontade (CD Car) ou ficarão abalados até o fim da cena. (p. 338)"
        },
        {
            "nome": "Encanto Cáustica",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe redução de ácido 10 e pode gastar uma ação de movimento e 2 PM para fazer o item gotejar ácido. Se fizer isso, seus ataques causam +1d4 de dano de ácido até o fim da cena."
        },
        {
            "nome": "Encanto Defensor",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "O bônus na Defesa do item aumenta em +2. (p. 338)"
        },
        {
            "nome": "Encanto Escorregadio",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe +10 em testes de Acrobacia para escapar e em testes de manobra contra agarrar. (p. 339)"
        },
        {
            "nome": "Encanto Esmagador (apenas Escudos)",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Este escudo fornece +2 em ataques e dano e tem seu dano aumentado em um passo. (p. 339)"
        },
        {
            "nome": "Encanto Fantasmagórico",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode lançar a magia Manto de Sombras. (p. 339)"
        },
        {
            "nome": "Encanto Fortificado",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Chance de ignorar dano extra de acerto crítico e ataques furtivos (25% escudo, 50% armadura). (p. 339)"
        },
        {
            "nome": "Encanto Gelido",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe redução de frio 10 e pode gastar uma ação de movimento e 2 PM para se cobrir de gelo até o fim da cena. Se fizer isso, recebe 10 PV temporários. (p. 339)"
        },
        {
            "nome": "Encanto Guardião",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "O bônus na Defesa do item aumenta em +4. Pré-Requisito: Defensor. (p. 339)"
        },
        {
            "nome": "Encanto Hipnotico",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode gastar uma ação padrão e 3 PM para emitir luzes coloridas. Inimigos em alcance curto devem passar num teste de Vontade (CD Car) ou ficarão fascinados por 1d6 rodadas. O efeito termina se qualquer criatura afetada for atacada. (p. 339)"
        },
        {
            "nome": "Encanto Ilusório",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode gastar uma ação de movimento e 1 PM para fazer o item adquirir a aparência de uma roupa comum, mas mantendo suas propriedades (bônus na Defesa, penalidade de armadura...). A magia Visão da Verdade revela o item disfarçado. (p. 339)"
        },
        {
            "nome": "Encanto Incandescente",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe redução de fogo 10 e pode gastar uma ação de movimento e 2 PM para fazer o item emitir labaredas até o fim da cena. Se fizer isso, no início de cada um de seus turnos você causa 1d6 pontos de dano de fogo em todas as criaturas adjacentes. (p. 339)"
        },
        {
            "nome": "Encanto Invulnerável (RD 2/5)",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Concede RD 2 (escudo) ou RD 5 (armadura). (p. 339)"
        },
        {
            "nome": "Encanto Opaco",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Concede Redução de Dano 10 contra ácido, frio, fogo e eletricidade. (p. 339)"
        },
        {
            "nome": "Encanto Protetor (+2 TR)",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Concede +2 em testes de resistência. (p. 339)"
        },
        {
            "nome": "Encanto Refletor",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Uma vez por rodada, quando você é alvo de uma magia, pode gastar PM igual ao custo dela para refleti-la de volta ao conjurador. As características da magia (efeitos, CD...) se mantêm, mas você toma qualquer decisão exigida por ela. Um item refletor parece espelhado e fica com os mesmos efeitos que o item que o reflete. (p. 339)"
        },
        {
            "nome": "Encanto Relampejante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe redução de eletricidade 10 e pode gastar uma ação de movimento e 2 PM para gerar arcos voltaicos até o fim da cena. Se fizer isso, qualquer criatura que o ataque em corpo a corpo sofre 2d6 pontos de dano de eletricidade. (p. 339)"
        },
        {
            "nome": "Encanto Reluzente",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você pode gastar uma ação de movimento e 2 PM para emitir um clarão de luz. Todos os inimigos em alcance curto devem passar num teste de Reflexos (CD Car) ou ficarão cegos por uma rodada. (p. 339)"
        },
        {
            "nome": "Encanto Sombrio",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Você recebe +5 em Furtividade e ignora a penalidade de armadura do item para testes dessa perícia. (p. 339)"
        },
        {
            "nome": "Encanto Zeloso",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Armadura/Escudo",
            "descricao": "Uma vez por rodada, se um aliado adjacente for alvo de um ataque, você pode gastar 1 PM para se tornar o alvo do ataque, que então é resolvido normalmente. (p. 339)"
        },
        // (Itens de Heróis de Arton - Encantos de Arma)
        {
            nome: "Encanto Alvorada",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Causa +1d8 dano de luz contra mortos-vivos/criaturas com sensibilidade à luz. 1/rodada, pode gastar 2 PM para cegar (alcance curto, 1 rodada, Fort CD For/Des evita, 1/cena por criatura).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Anátema",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Quando atinge, a CD para resistir às habilidades mágicas do alvo diminui em –2 por 1 rodada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Brumosa",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Envolta em névoa. Toda vez que acerta um ataque, recebe camuflagem leve por 1 rodada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Cantante",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Recebe +2 em Atuação. Pode gastar 1 PM para que você e aliados em alcance curto recebam +1 em testes de ataque por 1 rodada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Ciclônica",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Recebe +2 em testes contra manobras. 1/rodada, pode gastar 1 PM para criar uma rajada de vento (cone 9m) que empurra criaturas 3m (Fort CD For/Des evita).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Crescente",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Apenas (Armas Corpo a Corpo). Pode gastar 2 PM para o dano da arma aumentar em um passo e o alcance em +1,5m até o fim do turno.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Cristalina",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Feita de cristal. Causa +1d6 de dano de luz. 1/rodada, ao atacar, pode gastar 1 PM; se acertar, o alvo fica ofuscado por 1 rodada.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Cronal",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Ao atacar, pode gastar 3 PM para rolar 2 dados (use o melhor). No próximo ataque que sofrer, o atacante rola 2 dados (use o pior). Pré-requisito: Formidável.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Cuidadora",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Quando erra um ataque, recebe +2 na Defesa por 1 rodada. 1/rodada, quando sofre dano, pode gastar 2 PM para receber RD 10 contra esse dano.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Espreitadora",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Quando ataca, pode gastar 2 PM para deixar o oponente desprevenido (1/cena por criatura; Von CD For/Des evita).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Frenética",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Sempre que acerta um ataque, pode gastar 1 PM para receber +1 em ataque e dano com ela (cumulativo até +5) até o fim da cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Gárgula",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Pode gastar 2 PM para convocar uma pequena gárgula (parceiro combatente iniciante) até o fim da cena.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Horrenda",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Exala medo. Você recebe +2 em Intimidação e o custo de suas habilidades de medo diminui em –1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Infestada",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Sempre que acerta um ataque, pode gastar 2 PM para o alvo perder 2d6 PV (veneno) e ficar enjoado por 1d4 rodadas (Fort CD For/Des evita condição).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Manáfaga",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Ao acertar, alvo faz Vontade (CD For/Des). Se falhar, você recebe 1 PM temporário e ele perde 1d4 PM. Pré-requisito: Formidável.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Indignada",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Sempre que erra um ataque, concede +2 no próximo teste de ataque que fizer até o fim da cena (cumulativo).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Rebote",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Sempre que erra um ataque, ganha 1 carga (máx. 3). Ao acertar, gasta todas as cargas, causando +1d6 de dano por carga gasta.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Reflexiva",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "1/rodada, quando é alvo de uma magia, pode gastar PM (igual ao círculo da magia) para refleti-la de volta ao conjurador. Pré-requisito: Cristalina.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Ressonante",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Ao acertar, pode gastar 2 PM para emitir onda de choque em outra criatura (alcance curto). Compare o ataque com a Defesa do 2º alvo. Se acertar, sofre metade do dano (psíquico).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Sepulcral",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Quando gasta PM para ativar o efeito de Tumular, se acertar, a criatura não pode recuperar PV por 1d4 rodadas. Pré-requisito: Tumular.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Sombria",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Recebe +2 em Furtividade. Permite lançar a magia Escuridão (se já a conhece, custo -1 PM).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Vampírica",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Arma",
            descricao: "Quando ataca, pode gastar 1 PM. Se fizer isso, causa +2d6 de dano de trevas e você recupera PV igual ao dano de trevas causado.",
            fonte: "Heróis de Arton"
        },
        // (Itens de Heróis de Arton - Encantos de Armadura/Escudo)
        {
            nome: "Encanto Abissal",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe RD ácido 10 e RD fogo 10. 1/rodada, pode gastar 1 PM para causar 2d6 dano (ácido ou fogo) a uma criatura adjacente.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Ancorada",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe +5 em Atletismo para escalar. Pode gastar 1 PM para receber deslocamento de escalada 12m (duração sustentada).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Anulador",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "1/rodada, quando é alvo de uma magia, pode gastar 3 PM por círculo da magia para anulá-la. Pré-requisito: Abascanto.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Arbóreo",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe resistência a magia divina +5. Pode lançar Controlar Plantas (CD Sab). Se já conhece a magia, custo -1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Astuto",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe +5 em Intuição e Percepção. 1/rodada, pode gastar 3 PM para detectar criaturas escondidas/invisíveis em alcance curto.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Densa",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Reduz o deslocamento de inimigos em alcance curto em –3m. 1/rodada, pode gastar (Ação Mov., 2 PM) para deixar inimigos em alcance curto abalados e lentos por 1d4 rodadas (CD For/Des evita).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Égide",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Bônus na Defesa contra ataques à distância aumenta em +5. 1/cena, quando sofre dano de ataque à distância, pode gastar 3 PM para ignorar esse dano.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Enraizada",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe +5 em testes para resistir a derrubar e empurrar. Pode gastar 2 PM para receber +5 em testes de resistência contra outros efeitos de movimento.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Esmérico",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe RD ácido 10 e resistência a veneno +5. Pode gastar 1 PM para estender essa proteção a aliados em alcance curto (duração sustentada).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Estígio",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "1/cena, se for reduzido a 0 PV ou menos, pode gastar 5 PM para, em vez disso, ser reduzido a 1 PV. Pré-requisito: Abençoado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Etéreo",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "1/cena, pode gastar 3 PM para se tornar incorpóreo por 1 rodada (ignora ataques e efeitos não mágicos, pode atravessar paredes e objetos sólidos, Força nula). Se terminar a rodada dentro de um sólido, é expelido e sofre 1d12 PV por 1,5m.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Geomântico",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe RD 10/impacto e fortificação 25%. Pode lançar Controlar Terra (CD Car). Se já conhece a magia, custo -1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Ligeira",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "A armadura pode ser vestida ou removida com uma ação livre.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Luminescente",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Pode lançar Luz (CD Car). Se já conhece a magia, custo -1 PM. Ao lançar, criaturas com sensibilidade à luz devem fazer Vontade ou ficam cegas (1 rodada, 1/cena).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Prístino",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe resistência a necromancia e veneno +5. Pode gastar 2 PM para remover condição (doente, enjoado ou envenenado) de criatura adjacente.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Purificador",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe resistência a medo e mental +5. Pode gastar 2 PM para permitir que um aliado (alcance curto) repita um TR contra esses efeitos.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Reanimador",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Pode lançar Curar Ferimentos (CD Sab). Se já conhece a magia, custo -1 PM.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Replicante",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Quando é atingido por ataque corpo a corpo, pode gastar 1 PM para causar 2d6 de dano (mesmo tipo) ao atacante e reduzir o dano sofrido nessa mesma quantidade.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Resiliente",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Recebe resistência a atordoamento, paralisia e petrificação +5. Pode gastar 1 PM para repetir um TR contra uma dessas condições (1/efeito).",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Vórtice",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Armadura/Escudo",
            descricao: "Pode gastar 1 PM para puxar uma criatura em alcance curto até um ponto adjacente a você (Fort CD For evita).",
            fonte: "Heróis de Arton"
        },
        // (Itens de Heróis de Arton - Encantos Esotéricos)
        {
            "nome": "Encanto Abafador",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Se uma criatura falhar num TR contra uma magia sua, a CD das habilidades dela diminui em –2 por uma rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Bélico",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "O esotérico se parece com uma arma. Quando lança uma magia de dano, você causa +1d10 pontos de dano de essência.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Caridoso",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Quando lança uma magia em um aliado (custo >= 1 PM), recebe 1 PM temporário (não conta no limite) para gastar em aprimoramentos na próxima magia da cena.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Chocante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Suas magias de dano de eletricidade causam +1 dado extra e deixam o alvo ofuscado por 1 rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Clemente",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Suas magias de cura curam +1 dado extra do mesmo tipo.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Contido",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Quando lança uma magia de dano, pode gastar +1 PM para que ela cause dano não letal. Não pode ser Pulverizante.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Embusteiro",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Tem aparência de item mundano. Permite usar Magia Discreta (custo -1 PM se já o possui, e +Car na CD de Misticismo para perceber).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Emergencial",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "1/rodada, quando você ou um aliado em alcance curto sofre dano, pode gastar 4 PM para lançar uma magia de cura (com execução de ação) na vítima como reação.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Encadeado",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "1/cena, quando reduz um inimigo a 0 PV com uma magia, pode causar metade do dano da magia a outro inimigo (mesmo TR, sem efeitos extras).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Escultor",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Ao lançar magia (cone ou linha), pode gastar 1 PM para mudar a área (cone para linha [dobra] ou linha para cone [1/3]).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Frugal",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Ao lançar magia (com TR, afeta inimigos), pode diminuir a CD em –2. Se fizer, o custo da magia diminui em –2 PM.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Glacial",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Suas magias de dano de frio causam +1 dado extra e deixam os alvos vulneráveis por 1 rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Imperioso",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Magias que exigem ação para comandar (ex: Conjurar Monstro): a ação diminui em uma categoria (mín. livre). Limite de 1 comando/ação livre por rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Implacável",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Ao lançar magia, pode gastar +2 PM para afetar um alvo contra o qual não tenha linha de efeito (deve vê-lo ou tê-lo visto no último turno). Pré-requisito: outro encanto.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Incriminador",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "1/cena, ao lançar magia, pode gastar 3 PM para criar ilusão de que ela foi lançada por outra criatura (alcance médio). Criaturas que identificam a magia podem fazer Vontade (CD da magia) para desacreditar.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Inflamável",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Suas magias de dano de fogo causam +1 dado extra e deixam o alvo em chamas (+1d6 de dano se já causa chamas).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Inquisidor",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Marcado com símbolo sagrado. Magias divinas contra não devotos da divindade têm CD +1 (+2 se tiver Devoto Fiel).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Insistente",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Magias com dano por mais de uma rodada (ex: Flecha Ácida): efeitos que só se aplicam no lançamento (ex: Arcano de Batalha) aplicam-se também à 2ª rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Khalmyrita",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Ao lançar magia com efeito variável, pode escolher um valor igual à média da rolagem (em vez de rolar). Não pode ser Nímbico.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Majestoso",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "A CD para resistir a suas magias arcanas aumenta em +1 (+2 se tiver a habilidade de classe Magias). Pré-requisito: outro encanto.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Nímbico",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Ao lançar magia com efeito variável, pode rolar novamente dados (limite de PM atuais). A cada resultado par nas novas rolagens, perde 1 PM. Não pode ser Khalmyrita.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Pulverizante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Esotérico",
            "descricao": "Ao lançar magia que reduz PV de criatura a 0 ou menos, pode gastar 2 PM para desintegrá-la (resta pó, equipamento não-mágico é destruído). Não pode ser Contido. Pré-requisito: outro encanto.",
            "fonte": "Heróis de Arton"
        },
        {
            nome: "Encanto Retaliador",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Esotérico",
            descricao: "Quando evitar dano de inimigo com RD de uma magia, a CD da sua próxima magia de dano (até fim do próximo turno) aumenta em +1 para cada 10 de dano evitado.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Sanguessuga",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Esotérico",
            descricao: "Se lançar magia e um ou mais inimigos falharem no TR, você recebe 10 PV temporários.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Traiçoeiro",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Esotérico",
            descricao: "Se lançar magia hostil e afetar um aliado (que não tenha resistência/imunidade ao efeito), todas as criaturas afetadas sofrem –2 nos TR.",
            fonte: "Heróis de Arton"
        },
        {
            nome: "Encanto Verdugo",
            preco: "",
            espacos: "—",
            categoria: "encantamento",
            tipo: "Esotérico",
            descricao: "1/cena, quando reduz inimigo a 0 PV com magia, o dano de suas magias aumenta em +1 por dado até o fim da cena.",
            fonte: "Heróis de Arton"
        },
        // (Itens de Heróis de Arton - Encantos de Encantamento de Acessório)
        {
            "nome": "Encanto Aconchegante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Vestuário. Melhora seu descanso em uma categoria (confortável para luxuoso).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Ajudante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Ferramenta (que modifica perícia). O bônus em perícia da ferramenta aumenta em +2.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Autoritário",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Vestuário. Fornece +2 em Intimidação (cumulativo) e aumenta a CD de seus efeitos de medo em +2.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Compacto",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Itens Gerais. O equipamento não ocupa espaços.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Imaculado",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Vestuário. Está sempre limpo e perfumado. Fornece +2 em Diplomacia (cumulativo) e aumenta a CD de Aparência Inofensiva, etc., em +2.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Insinuante",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Vestuário. Fornece +2 em Enganação (cumulativo) e aumenta a CD de seus efeitos mentais em +2.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Ligeiro",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Vestuário. O item pode ser vestido ou removido com uma ação livre.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Encanto Prontidão",
            "preco": "",
            "espacos": "—",
            "categoria": "encantamento",
            "tipo": "Encantamento de Acessório",
            "descricao": "Aplicável em: Itens Gerais. Se o item estiver em alcance curto, você pode empunhá-lo ou guardá-lo como uma ação livre. Pode empunhá-lo como parte de uma reação.",
            "fonte": "Heróis de Arton"
        }


    ]
};

// Publica a variável para o script.js
window.enchantmentosData = enchantmentosData;
