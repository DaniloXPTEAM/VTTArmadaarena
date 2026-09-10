// modificacoes.js

const modificacoesData = {
    "modificacao": [
        // ===== MELHORIAS (Tabela 3-6) =====
        {
            "nome": "Ajustada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armaduras/Escudos que reduz a penalidade de armadura em 1 ponto."
        },
        {
            "nome": "Aprimorado",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Ferramentas/Vestuário que fornece +1 na perícia ou aumenta o bônus em +1."
        },
        {
            "nome": "Atroz",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armas que fornece +2 nas rolagens de dano. Requer: Cruel."
        },
        {
            "nome": "Banhado a Ouro",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Todos que fornece +2 em Diplomacia."
        },
        {
            "nome": "Canalizador",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Esotéricos que aumenta o limite de PM que você pode gastar em magias em +1."
        },
        {
            "nome": "Certeira",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armas que fornece +1 nos testes de ataque."
        },
        {
            "nome": "Cravejado de Gemas",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Todos que fornece +2 em Enganação."
        },
        {
            "nome": "Cruel",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armas que fornece +1 nas rolagens de dano."
        },
        {
            "nome": "Delicada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armaduras Pesadas que permite aplicar 1 ponto de Destreza na Defesa. Não pode ser Reforçada."
        },
        {
            "nome": "Discreto",
            "preco": "",
            "espacos": "—",
            "categoria": "fItem Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Todos que reduz espaços ocupados em –1 (mín. 1) e fornece +5 em Ladinagem para ocultar."
        },
        {
            "nome": "Energético",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Esotéricos que aumenta dano de magias de dano em +1d6 do mesmo tipo."
        },
        {
            "nome": "Equilibrada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armas que fornece +2 em testes de manobras (desarmar, quebrar, etc.)."
        },
        {
            "nome": "Espinhosa (Armadura)",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras. Causa dano de perfuração (igual à Força) ao agarrar ou ser agarrado. (p. 165)"
        },
        {
            "nome": "Espinhoso (Escudo)",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Escudos. Aumenta o dano de um ataque com escudo em um passo. (p. 165)"
        },
        {
            "nome": "Harmonizada (Arma)",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. Reduz em –1 PM o custo de uma habilidade de ataque. Pré-req: outra melhoria. (p. 165)"
        },
        {
            "nome": "Harmonizado (Esotérico)",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Esotéricos. Reduz o custo de uma magia em –1 PM. (p. 165)"
        },
        {
            "nome": "Injeção Alquímica",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. Libera um preparado (ácido, fogo alquímico) ou água benta no acerto (2 doses). (p. 165)"
        },
        {
            "nome": "Macabro",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Todos. Fornece +2 em Intimidação, mas –2 em Diplomacia. (p. 165)"
        },
        {
            "nome": "Maciça",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. O multiplicador de crítico aumenta em +1. Não pode ser Precisa. (p. 165)"
        },
        {
            "nome": "Material Especial",
            "preco": "Variável",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas/Armaduras/Escudos/Esotéricos. O item é feito de um material especial. (p. 165-166)"
        },
        {
            "nome": "Mira Telescópica",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas de Disparo. Aumenta o alcance da arma em uma categoria. (p. 166)"
        },
        {
            "nome": "Poderoso",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Esotéricos. A CD para resistir a suas magias aumenta em +1. (p. 166)"
        },
        {
            "nome": "Polida",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras/Escudos. Fornece +5 na Defesa na primeira rodada de combate (em luz). (p. 166)"
        },
        {
            "nome": "Precisa",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Cuidado especial foi tomado ao temperar o aço desta arma, para que seu fio se mantenha sempre como uma navalha. A margem de ameaça aumenta em 1 ponto. Uma arma não pode ser precisa e maciça."
        },
        {
            "nome": "Pungente",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "A arma é um amontoado de pontas, ganchos e protuberâncias. É difícil empunhá-la sem se machucar, mas ela fornece +2 nas rolagens de dano. Pré-requisito: Cruel."
        },
        {
            "nome": "Reforçada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Armaduras/Escudos que fornece +1 na Defesa."
        },
        {
            "nome": "Selada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras Pesadas. Fornece +1 em testes de resistência. (p. 166)"
        },
        {
            "nome": "Sob Medida",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras/Escudos. Reduz a penalidade de armadura em 2 (apenas para o dono). Pré-req: Ajustada. (p. 166)"
        },
        {
            "nome": "Vigilante",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Esotéricos. Você recebe +2 na Defesa. (p. 166)"
        },

        // ===== MATERIAIS ESPECIAIS (Tabela 3-7) =====
        {
            "nome": "Aço-Rubi (Arma)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Ignora 10 RD e a imunidade a crítico de lefeu. (p. 166)"
        },
        {
            "nome": "Aço-Rubi (Armadura Pesada)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Chance de ignorar dano extra de acertos críticos/ataques furtivos (50%). (p. 166)"
        },
        {
            "nome": "Aço-Rubi (Armadura Leve/Escudo)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Chance de ignorar dano extra de acertos críticos/ataques furtivos (25%). (p. 166)"
        },
        {
            "nome": "Aço-Rubi (Esotérico)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Magias de dano ignoram 10 RD e imunidades a dano de lefeu. (p. 166)"
        },
        {
            "nome": "Adamante (Arma)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Aumenta o dano em um passo. (p. 166)"
        },
        {
            "nome": "Adamante (Armadura Pesada)",
            "preco": "+ T$ 18.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD 5. (p. 166)"
        },
        {
            "nome": "Adamante (Armadura Leve/Escudo)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD 2. (p. 166)"
        },
        {
            "nome": "Adamante (Esotérico)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Pode pagar +1 PM para rolar novamente resultados 1 em magias de dano. (p. 166)"
        },
        {
            "nome": "Gelo Eterno (Arma)",
            "preco": "+ T$ 600",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Causa +2 pontos de dano por frio. (p. 166)"
        },
        {
            "nome": "Gelo Eterno (Armadura Pesada)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD Fogo 10. (p. 166)"
        },
        {
            "nome": "Gelo Eterno (Armadura Leve/Escudo)",
            "preco": "+ T$ 1.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD Fogo 5. (p. 166)"
        },
        {
            "nome": "Gelo Eterno (Esotérico)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Pode rolar novamente resultados 1 em magias de dano de frio. (p. 166)"
        },
        {
            "nome": "Madeira Tollon (Arma)",
            "preco": "+ T$ 1.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Conta como mágica. Custo de habilidades de ataque diminui em –1 PM. (p. 167)"
        },
        {
            "nome": "Madeira Tollon (Escudo/Esotérico)",
            "preco": "+ T$ 1.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece resistência a magia +2. (p. 167)"
        },
        {
            "nome": "Matéria Vermelha (Arma)",
            "preco": "+ T$ 1.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Causa +1d6 de dano extra. Causa 1 de dano ao usuário por acerto. (-2 em Carisma). (p. 167)"
        },
        {
            "nome": "Matéria Vermelha (Armadura Pesada)",
            "preco": "+ T$ 18.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece chance de falha (25%). (-2 em Carisma). (p. 167)"
        },
        {
            "nome": "Matéria Vermelha (Armadura Leve/Escudo)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece chance de falha (10%). (-2 em Carisma). (p. 167)"
        },
        {
            "nome": "Matéria Vermelha (Esotérico)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Você e inimigos em alcance curto sofrem –2 em testes de resistência contra magia. (-2 em Carisma). (p. 167)"
        },
        {
            "nome": "Mitral (Arma)",
            "preco": "+ T$ 1.500",
            "espacos": "-1",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Aumenta a margem de ameaça em +1. Ocupa –1 espaço. (p. 167)"
        },
        {
            "nome": "Mitral (Armadura Pesada)",
            "preco": "+ T$ 12.000",
            "espacos": "-1",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Penalidade de armadura diminui em 2. Permite aplicar até Des +2 na Defesa. Ocupa –1 espaço. (p. 167)"
        },
        {
            "nome": "Mitral (Armadura Leve/Escudo)",
            "preco": "+ T$ 1.500",
            "espacos": "-1",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Penalidade de armadura diminui em 2. Ocupa –1 espaço. (p. 167)"
        },
        {
            "nome": "Mitral (Esotérico)",
            "preco": "+ T$ 3.000",
            "espacos": "-1",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Pode pagar +2 PM ao lançar magia para aumentar a CD em +2. Ocupa –1 espaço. (p. 167)"
        },
        // (Item de Ameaças de Arton)
        {
            nome: "Híbrida",
            preco: "",
            espacos: "—",
            categoria: "Item Superior",
            tipo: "Melhoria",
            descricao: "Aplicável em: Armas. A arma possui dois ou mais modos de uso. Trocar de modo é uma ação de movimento. Aplicar melhorias e encantos nesta arma custa o dobro do preço.",
            fonte: "Ameaças de Arton"
        },

        {
            "nome": "Multifuncional",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Ferramenta ou Vestuário (que modifica uma perícia). Escolha outra perícia que usa o mesmo atributo-chave; o item passa a funcionar também para a segunda perícia (não se aplica a testes de ataque).",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Penetrante",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. A arma ignora 5 pontos da redução de dano. Pré-requisito: Cruel.",
            "fonte": "Ameaças de Arton"
        },

        // (Itens de Ameaças de Arton - Materiais)
        {
            "nome": "Casco Monstruoso (Arma)",
            "preco": "+ T$ 750",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Conta como uma arma primitiva (para Armamento da Natureza). Sofre +1 de dano por dado de dano de impacto.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Casco Monstruoso (Armadura Leve/Escudo)",
            "preco": "+ T$ 750",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Penalidade de armadura diminui em 1. Sofre +1 de dano por dado de dano de impacto.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Casco Monstruoso (Armadura Pesada)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Penalidade de armadura diminui em 1. Permite aplicar 1 ponto de Destreza na Defesa. Sofre +1 de dano por dado de dano de impacto.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Casco Monstruoso (Esotérico)",
            "preco": "+ T$ 6.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Quando lança uma magia, você recebe RD 5 contra o próximo dano que sofrer até sua próxima rodada. Sofre +1 de dano por dado de dano de impacto.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couraça de Kaiju (Arma)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. O dano aumenta um passo. Pode gastar 2 PM para ignorar efeitos que reduzem o dano (exceto RD).",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couraça de Kaiju (Armadura Leve/Escudo)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Fornece RD 10/mágico.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couraça de Kaiju (Armadura Pesada)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 3 peças. Fornece RD 20/mágico.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couraça de Kaiju (Esotérico)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Ao lançar magia de dano, pode gastar 2 PM para ignorar efeitos que reduzem o dano (exceto RD e TR).",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couro de Bulette (Armadura Leve)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Fornece deslocamento de escavação 1/2 do normal e RD ácido 5.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couro de Bulette (Armadura Pesada)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 3 peças. Fornece deslocamento de escavação 1/2 do normal e RD ácido 10.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couro de Bulette (Esotérico)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Ao lançar magia de ácido, pode rolar novamente resultados 1 no dano.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Cristal de Sol (Arma)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça (Armas de corte/perfuração). Causa +2 pontos de dano por fogo.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Cristal de Sol (Armadura/Escudo)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Permite rolar 2 dados e usar o melhor em testes de resistência contra efeitos de frio.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Cristal de Sol (Esotérico)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Ao lançar magia de fogo, pode gastar 1 PM para deixar alvos em chamas (+1d6 dano se já causa chamas).",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Lanajuste (Arma)",
            "preco": "+ T$ 600",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Ignora penalidades por combate submerso. Pode ser usada por devotos do Oceano.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Lanajuste (Armadura Leve/Escudo)",
            "preco": "+ T$ 1.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD 5/corte.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Lanajuste (Armadura Pesada)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD 10/corte.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Lanajuste (Esotérico)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Ao lançar magia de corte, pode rolar novamente resultados 1 no dano.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Pena de Kraken (Arma)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Em um acerto crítico, o dano aumenta dois passos (antes de multiplicar).",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Pena de Kraken (Armadura Leve/Escudo)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Quando uma criatura erra um ataque corpo a corpo contra você, perde 5 PV.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Pena de Kraken (Armadura Pesada)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 3 peças. Quando uma criatura erra um ataque corpo a corpo contra você, perde 10 PV.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Pena de Kraken (Esotérico)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Se o item fornece algum bônus numérico, ele aumenta em +1.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Prata (Arma)",
            "preco": "+ T$ 600",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Causa +2 pontos de dano em espíritos e mortos-vivos e é considerada mágica contra eles. Pode ser combinada com outro material.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Prata (Armadura Leve/Escudo)",
            "preco": "+ T$ 1.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD 5 contra dano causado por espíritos e mortos-vivos. Pode ser combinada com outro material.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Prata (Armadura Pesada)",
            "preco": "+ T$ 3.000",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Fornece RD 10 contra dano causado por espíritos e mortos-vivos. Pode ser combinada com outro material.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Prata (Esotérico)",
            "preco": "+ T$ 400",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Suas magias causam +2 pontos de dano em espíritos e mortos-vivos.Pode ser combinada com outro material.",
            "fonte": "Ameaças de Arton"
        },
        // (Itens de Ameaças de Arton - Materiais)
        {
            "nome": "Quitina Razza (Arma)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Sempre que rolar o resultado máximo em um dado do dano básico da arma, role um dado extra, repetindo o processo a cada resultado máximo.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Quitina Razza (Armadura Leve/Escudo)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Concede +2 em Percepção e seu bônus na Defesa aumenta em 1.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Quitina Razza (Armadura Pesada)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 3 peças. Concede +5 em Percepção e seu bônus na Defesa aumenta em 2.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Quitina Razza (Esotérico)",
            "preco": "Variável",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Sempre que rolar o resultado máximo em um dado do dano básico da magia, role um dado extra, repetindo o processo a cada resultado máximo.",
            "fonte": "Ameaças de Arton"
        },
        {
            "nome": "Couro de Dragão (Armadura Leve/Escudo)",
            "preco": "Não comercializado",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Concede +1 na Defesa, RD 10 contra o tipo de dano do sopro do dragão e +2 em testes de resistência contra magia.",
            "fonte": ""
        },
        {
            "nome": "Couro de Dragão (Armadura Pesada)",
            "preco": "Não comercializado",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 3 peças. Concede +2 na Defesa, RD 20 contra o tipo de dano do sopro do dragão e +5 em testes de resistência contra magia.",
            "fonte": ""
        },
        {
            "nome": "Couro de Dragão (Esotérico)",
            "preco": "Não comercializado",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Exige 1 peça. Ao lançar uma magia que cause dano do mesmo tipo do sopro do dragão, você pode gastar 1 PM para aumentar o dano da magia em +1 por dado.",
            "fonte": ""
        },
        // (Itens de Revista Tormenta)
        {
            nome: "Guarda",
            preco: "",
            espacos: "—",
            categoria: "Item Superior",
            tipo: "Melhoria",
            descricao: "Aplicável em: Armas. Enquanto empunha esta arma, você recebe +1 na Defesa e em testes contra manobras (acumula se usar duas armas).",
            fonte: "Duelo de Dragões"
        },
        {
            nome: "Tesoura",
            preco: "",
            espacos: "—",
            categoria: "Item Superior",
            tipo: "Melhoria",
            descricao: "Aplicável em: Armas. A lâmina da arma se abre. Uma criatura atingida por um acerto crítico desta arma fica sangrando. Pré-requisito: arma perfurante.",
            fonte: "Duelo de Dragões"
        },
        {
            nome: "Vidro Selentino (Arma)",
            preco: "+ T$ 600",
            espacos: "—",
            categoria: "Item Superior",
            tipo: "Material",
            descricao: "Fornece +5 em Enganação para fintar com armas corpo a corpo.",
            fonte: "Duelo de Dragões"
        },
        {
            nome: "Vidro Selentino (Escudo)",
            preco: "+ T$ 600",
            espacos: "—",
            categoria: "Item Superior",
            tipo: "Material",
            descricao: "Fornece +1 na margem de ameaça contra um inimigo que fez um ataque corpo a corpo contra você nesta rodada ou na rodada anterior.",
            fonte: "Duelo de Dragões"
        },
        {
            nome: "Vidro Selentino (Esotérico)",
            preco: "+ T$ 600",
            espacos: "—",
            categoria: "Item Superior",
            tipo: "Material",
            descricao: "Serve como lente, concedendo +5 em Misticismo para detectar magia.",
            fonte: "Duelo de Dragões"
        },
        {
            "nome": "Tixonessica (Vestuário)",
            "preco": "Variável",
            "espacos": "2",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Concede +2 na Defesa, mas ocupa 2 espaços em vez de 1. Além disso, concede +2 em testes de perícias baseadas em Carisma com habitantes de Ghallystrix.",
            "fonte": "Duelo de Dragões"
        },
        {
            "nome": "Vitarium (Esotérico)",
            "preco": "+ T$ 4.500",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Material",
            "descricao": "Potencializa magias de cura de luz, aumentando sua cura em +1 PV por dado.",
            "fonte": "Só Aventuras"
        },
        // (Itens de Heróis de Arton - Melhorias)
        {
            "nome": "Ocultável",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. A arma fornece +5 em testes de Ladinagem para ocultá-la.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Surpreendente",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. Uma vez por cena, se você sacar a arma como ação livre e usá-la para atacar no mesmo turno, o oponente fica desprevenido contra esse ataque.",
            "fonte": "Heróis de Arton"
        },

        // (Itens de Heróis de Arton - Melhorias)
        {
            "nome": "Balístico",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Escudos. Quando faz um ataque com o escudo, pode gastar 1 bala para aumentar o dano em +2d6. Tem espaço para 2 balas. Pré-requisito: Reforçado.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Brasonado",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Ferramentas/Vestuário (que modifica uma perícia). 1/cena, pode usar a perícia do item em um teste de Diplomacia para mudar atitude. Não pode ser Discreto.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Deslumbrante",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras/Vestuário. A CD para resistir às suas habilidades baseadas em Carisma aumenta em +1. Pré-requisito: Banhado a Ouro ou Cravejado de Gemas.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Farpada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas (Corte/Perfuração). Acertos críticos deixam o alvo sangrando (–5 em testes de Constituição para remover a condição). Pré-requisito: Cruel.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Fósforo",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Munições (Armas). Dano diminui em um passo, mas o alvo atingido fica ofuscado por 1 rodada.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Guarda",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas (Corpo a Corpo). Fornece +1 na Defesa e em testes contra manobras (acumula se usar duas armas).",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Incendiária",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Munições (Armas). Causa +1 ponto de dano de fogo e, se acertar por 5 ou mais, deixa o alvo em chamas.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Injetora",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras. Armazena 1 dose de poção/preparado. Pode gastar uma ação de movimento para ingerir a dose.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Potencializador",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Esotéricos. O máximo de PM que você pode gastar em magias aumenta em +2. Pré-requisito: Canalizador.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Pressurizada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas (Impacto/Fogo). Pode gastar uma ação completa para pressurizar. No próximo ataque, recebe +2 no ataque e no dano.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Prudente",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Melhoria para Todos que fornece +2 em Vontade.",
            "fonte": "Heróis de Arton"
        },
        {
            "nome": "Usado",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Ferramentas/Vestuário. Item 'amaciado'. 1/dia, pode rolar novamente um resultado 1 natural em um teste de perícia com o item. Não pode ser fabricado, apenas comprado.",
            "fonte": "Heróis de Arton"
        },

        // (Itens de Deuses de Arton - Melhorias)
        {
            "nome": "Canônico",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas, Armaduras, Escudos, Ferramentas, Vestuário. Possui inscrições sagradas. Se for devoto da divindade, a CD de suas habilidades mágicas aumenta em +1.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Conduíte",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. O custo para usar o poder Abençoar Arma nela é reduzido em –1 PM.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Devotado",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas, Armaduras, Escudos, Ferramentas, Vestuário. Escolha um poder concedido com custo em PM. Esse custo é reduzido em –1. Pré-requisito: Inscrito.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Diligente",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras, Escudos, Ferramentas, Vestuário. Reduz o custo do poder Prece de Combate em –1 PM.",
            "fonte": "Deuses de Arton"
        },
        {
            "nome": "Inscrito",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras, Escudos, Ferramentas, Vestuário. Conta como um símbolo sagrado do deus (incluindo bônus de +1 em testes de resistência para devotos).",
            "fonte": "Deuses de Arton"
        },

        // (Melhorias de Vectora - Dragão Brasil)
        {
            "nome": "Bolsos Internos",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Vestuários. Aumenta sua capacidade de carga em 2 espaços (o item continua ocupando seu espaço).",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Tarimbado",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Equipamentos de Aventura, Ferramentas e Vestuários. O item fornece +1 em uma perícia (determinada na compra). O bônus só se aplica se o item estiver empunhado ou vestido, mas é cumulativo com bônus fornecidos pelo item.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Reforjado",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armaduras e Escudos. Uma vez por cena, você pode forçar um inimigo a rolar novamente um teste de ataque recém-feito contra você. Pré-requisito: uma melhoria qualquer.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Bênção da Guerra",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. Fornece +2 em testes de ataque e rolagens de dano, mas impõe –2 em Vontade. Pré-requisito: Cruel.",
            "fonte": "Dragão Brasil"
        },
        {
            "nome": "Eletrificada",
            "preco": "",
            "espacos": "—",
            "categoria": "Item Superior",
            "tipo": "Melhoria",
            "descricao": "Aplicável em: Armas. Causa +1d6 de dano de eletricidade, mas o torna vulnerável a esse mesmo elemento. Pré-requisitos: Certeira e Precisa.",
            "fonte": "Dragão Brasil"
        }

    ]
};

// Publica a variável para o script.js
window.modificacoesData = modificacoesData;
