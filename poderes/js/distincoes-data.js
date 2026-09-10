const distincoesData = [
    {
        id: 'aeronauta-goblin',
        name: 'Aeronauta Goblin',
        source: 'herois',
        exclusiva: true,
        admissao: 'Para se tornar um aeronauta goblin, é preciso ser um goblin. O candidato deve construir e testar quatro máquinas voadoras por conta própria. As três primeiras devem falhar em quedas ou explosões espetaculares, levando a inovação ao limite. Apenas após sobreviver a esses desastres e pilotar sua quarta obra-prima sem cair, desafiando a lógica dos povos presos ao chão, ele se torna um legítimo aeronauta.',
        marca: {
            name: 'Marca da Distinção: Aeronauta Goblin',
            desc: 'Você recebe uma ação de movimento extra por rodada, que só pode ser usada para pilotar sua aeronave, e não sofre penalidades para atacar à distância ou lançar magias por estar a bordo de uma aeronave.'
        },
        detalhes: {
            titulo: 'Regras de Ornitópteros',
            conteudo: 'Veículo Grande (1 passageiro Pequeno + 10 espaços). Voo 15m, Defesa 15 (+Des), RD 5 e PV = metade do criador. Fornece cobertura leve e permite investidas montadas. Fabricação: Ofício (artesão) CD 20, uma semana, T$ 300. Só operado pelo criador.',
            arsenal: [
                { n: 'Armado', d: 'Suporte para arma de fogo (usada pelo piloto) e 20 munições.' },
                { n: 'Blindado', d: '+10 na Defesa.' },
                { n: 'Bombardeiro', d: 'Espaço para 4 preparados/poções. Aumenta alcance em 1 categoria e +2 na CD.' },
                { n: 'Camuflado', d: '+10 em Furtividade; permite esconder-se voando sem cobertura.' },
                { n: 'Dobrável', d: 'Vira veículo Médio (12m, não voa). Ação completa para alternar.' },
                { n: 'Durável', d: 'Pontos de Vida iguais aos do criador (em vez de metade).' },
                { n: 'Espaçoso', d: 'Transporta passageiro Pequeno ou +10 espaços de carga adicionais.' },
                { n: 'Estável', d: '+5 nos testes de Pilotagem.' },
                { n: 'Resistente', d: 'Aumenta a RD em +5.' },
                { n: 'Veloz', d: 'Deslocamento de voo +6m.' },
                { n: 'Aço-rubi', d: 'Fortificação 50%. (+T$ 6.000).' },
                { n: 'Adamante', d: 'RD 5, –2 em Pilotagem. (+T$ 18.000).' },
                { n: 'Madeira Tollon', d: 'Resistência a magia +5. (+T$ 3.000).' },
                { n: 'Mitral', d: '+2 em Pilotagem. (+T$ 12.000).' },
            { n: 'Os materiais especiais que podem ser empregados em ornitópteros, bem como seu custo adicional, são descritos a seguir.', d: '' },
            { n: 'Casco de monstro*', d: '+2 na Defesa. (+T$ 6.000.).' },
            { n: 'Cristal de sol*', d: 'Redução de frio 10. Especial.' },
            { n: 'Couro de bulette*', d: 'Redução de ácido 10. Especial.' },
            { n: 'Couraça de kaiju*', d: 'RD 10/mágico. Especial.' },
            { n: 'Gelo eterno', d: 'Redução de fogo 10. (+T$ 3.000.).' },
            { n: 'Lanajuste*', d: 'Redução de corte 5. (+T$ 3.000.).' },
            { n: 'Matéria vermelha', d: 'Camuflagem leve, –2 nas perícias baseadas em Carisma do piloto (exceto Intimidação). (+T$ 18.000.).' },
            { n: 'Prata*', d: 'Redução de trevas 10. (+T$ 3.000.).' },
            { n: 'Pena de kraken*', d: 'Quando uma criatura erra um ataque contra o ornitóptero, perde 10 PV. Especial. *Materiais especiais descritos em Ameaças de Arton.' }
            ]
        },
        poderes: [
            {
                name: 'Cabeça nas Nuvens',
                req: 'Int 2, treinado em Ofício (artesão) e Pilotagem',
                desc: 'Quando está pilotando uma aeronave, você recebe +1 em testes de perícia, rolagens de dano e na CD de habilidades/itens. Bônus aumenta em +1 para cada dois outros poderes da distinção.'
            },
            {
                name: 'Engenharia Aeronáutica',
                req: 'Cabeça nas Nuvens, Engenhoqueiro',
                desc: 'Permite fabricar ornitópteros superiores e acoplar até duas engenhocas neles (não contam no limite, ativadas apenas pilotando).'
            },
            {
                name: 'Estou Bem, Pessoal!',
                req: 'Cabeça nas Nuvens',
                desc: 'Você recebe redução de fogo e impacto 5 e sofre apenas metade do dano de quedas.'
            },
            {
                name: 'Manobras Defensivas',
                req: 'treinado em Reflexos, Estou Bem, Pessoal!',
                desc: 'Soma Inteligência na Defesa da aeronave. Pode gastar 2 PM para teste de Pilotagem e reduzir dano sofrido pelo resultado do teste.'
            },
            {
                name: 'Senhor dos Céus',
                req: 'Manobras Defensivas, derrotar 5 aeronaves/voadores pilotando',
                desc: 'Uma vez por rodada pilotando, pode gastar 3 PM para realizar uma ação padrão adicional.'
            }
        ]
    },
    {
        id: 'algoz-da-tormenta',
        name: 'Algoz da Tormenta',
        source: 'herois',
        exclusiva: true,
        admissao: 'Tornar-se um Algoz exige a derrocada total da sanidade e individualidade artoniana. O candidato deve adentrar uma área de Tormenta e ter contato direto com um Lorde. Se aceito, deve provar sua lealdade cometendo um ato imperdoável contra algo que ama — como chacinar a própria família ou trair companheiros fiéis. Após missões profanas e uma prova final de humildade perante a Anticriação, o indivíduo emerge transformado em um servo fatalista e cruel da Tempestade Rubra.',
        marca: {
            name: 'Marca da Distinção: Servo e Senhor',
            desc: 'Você se torna imune à Insanidade da Tormenta e a efeitos de medo e mentais, exceto aqueles causados pelo lekael a quem serve.'
        },
        detalhes: {
            titulo: 'O Algoz da Tormenta em Jogo',
            conteudo: 'Esta não é uma distinção de herói ou anti-herói; o Algoz é um vilão e traidor da Criação. Sua presença muda drasticamente o tom da campanha, e aqueles que se associam a ele são vistos como traidores de Arton. Por fim, no momento em que seus senhores derem o comando, o algoz irá, sem remorso algum, trair seus próprios "companheiros".',
            arsenal: []
        },
        poderes: [
            {
                name: 'Lar Infernal',
                req: 'dois poderes da Tormenta',
                desc: 'Você se torna imune aos efeitos de áreas de Tormenta. Além disso, nessas áreas você recebe +5 em testes de perícia e seu descanso conta como luxuoso.'
            },
            {
                name: 'Ataque Corrupto',
                req: 'treinado em Luta ou Pontaria, Lar Infernal',
                desc: 'Seus ataques recebem o benefício de matéria vermelha, cumulativo com outras melhorias, mas seus efeitos nocivos não o afetam. Para cada dois outros poderes da distinção que você possui, o dano extra aumenta em +1d6.'
            },
            {
                name: 'Desprezo Profano',
                req: 'treinado em Vontade, Ataque Corrupto, não ser devoto (exceto de Aharadak)',
                desc: 'Você recebe resistência a magia +1 para cada poder da distinção e pode lançar Dissipar Magia, substituindo Misticismo por Vontade. Esta não é uma habilidade mágica.'
            },
            {
                name: 'General Rubro',
                req: 'Desprezo Profano, 11º nível',
                desc: 'Lefeu de ND menor que seu nível tornam-se prestativos. Criaturas tocadas pela Tormenta ficam Enfeitiçadas (Vontade evita). Se possuir parceiro, ele também se torna um parceiro aberrante iniciante.'
            },
            {
                name: 'Abraçar Anticriação',
                req: 'General Rubro, 17º nível',
                desc: 'Seu tipo muda para monstro (lefeu) e você recebe todas as habilidades lefeu. Sua Insanidade da Tormenta causa perda de 1d6 PM para cada poder da distinção que você possui (Sabedoria).'
            }
        ]
    },
    {
        id: 'amazona',
        name: 'Amazona',
        source: 'herois',
        exclusiva: true,
        admissao: 'Disponível apenas para mulheres, o caminho exige escolha e resiliência. Nativas devem exilar-se para conhecer o mundo e depois superar desafios das anciãs relatando o que aprenderam. Estrangeiras devem perseguir um grupo nômade sem usar equipamentos sofisticados ou tocar os pés no chão. Por fim, a candidata deve vencer um duelo de sua escolha contra uma irmã e libertar uma mulher de uma situação de opressão.',
        marca: {
            name: 'Marca da Distinção: Armadura das Amazonas',
            desc: 'Se não estiver usando armadura pesada, você recebe +2 na Defesa.'
        },
        poderes: [
            {
                name: 'Predadora',
                req: 'treinada em Sobrevivência',
                desc: 'Você pode gastar uma ação de movimento e 2 PM para analisar um inimigo em alcance médio. Até o fim da cena, você recebe +1 em testes de perícia e rolagens de dano contra esse inimigo e outras criaturas do mesmo tipo. Para cada outro poder da distinção, você pode gastar +1 PM para aumentar esses bônus em +1.'
            },
            {
                name: 'Bênção de Hippion',
                req: 'Ginete, Predadora',
                desc: 'Você recebe um cavalo de guerra parceiro veterano. Caso já possua uma montaria, ela fornece +2 em sua Destreza. Você e sua montaria possuem um vínculo emocional e se entendem sem testes. Se perdê-la, pode treinar outra em uma semana.'
            },
            {
                name: 'Arquearia Montada',
                req: 'Bênção de Hippion',
                desc: 'Enquanto está montada, você pode aplicar quaisquer bônus em testes de ataque e rolagens de dano fornecidos pela montaria em seus ataques à distância.'
            },
            {
                name: 'Estilo da Amazona',
                req: 'Estilo de Arremesso, Predadora',
                desc: 'Uma vez por rodada, ao fazer um ataque corpo a corpo com uma mão livre ou escudo leve, pode gastar 2 PM para um ataque adicional com arma de arremesso.'
            },
            {
                name: 'Nunca Ceder',
                req: 'Estilo da Amazona',
                desc: 'Ao falhar em um teste de resistência contra efeito de inimigo, pode gastar 2 PM para repetir o teste com bônus igual ao total de poderes desta distinção (uma vez por efeito).'
            },
            {
                name: 'Rainha Amazona',
                req: 'Arquearia Montada, Nunca Ceder, feito ou missão em nome das Amazonas',
                desc: 'Você recebe +1 em Carisma e, ao usar Predadora, aplica o bônus recebido como RD contra criaturas desse tipo.'
            }
        ]
    },
    {
        id: 'armadilheiro-mestre',
        name: 'Armadilheiro Mestre',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve obter conhecimentos obscuros sobre armadilhas, invadir uma masmorra complexa e desarmar pessoalmente todos os seus mecanismos durante dias. Por fim, deve preparar uma área com dez armadilhas e derrotar cinco intrusos reais que busquem o que elas protegem.',
        marca: {
            name: 'Marca da Distinção: Armadilheiro Experiente',
            desc: 'Você recebe +2 em testes de perícia relacionados a armadilhas (encontrar, desarmar e resistir). Sempre que desarma uma armadilha que não seja sua, você recupera 1 PM.'
        },
        detalhes: {
            titulo: 'Arsenal e Regras de Armadilhas',
            conteudo: 'Preparar uma armadilha gasta uma ação completa e 3 PM. Afeta uma área de 3m de lado adjacente e é acionada pela primeira criatura que entrar. Criaturas que não viram o preparo podem encontrá-la com Investigação (CD Sab). É possível aplicar venenos. Requer ambiente propício (natural ou urbano), a menos que possua Armadilha Instantânea.',
            arsenal: [
                { n: 'Atordoante', d: '4d8 impacto e atordoado por 1 rodada (Fortitude CD Int evita).' },
                { n: 'Barril de Óleo', d: 'Alvos ficam vulneráveis a fogo até se limparem (ação completa).' },
                { n: 'Buraco Portátil', d: 'Fosso de 6m (4d6 impacto). Reflexos CD Int evita e move para fora.' },
                { n: 'Constrangedora', d: 'Vítima fica pasma por 1 rodada e frustrada (Vontade CD Int evita pasmo).' },
                { n: 'Fumaça', d: 'Obscurece visão na área até o fim da cena (camuflagem leve a total).' },
                { n: 'Luz', d: 'Cegas por 1d4 rodadas e depois ofuscadas (Reflexos CD Int evita cego).' },
                { n: 'Mola', d: 'Empurra 9m e deixa caído (Reflexos CD Int evita empurrão). Se colidir, sofre 2d6 impacto.' },
                { n: 'Mina', d: '4d6 impacto e empurra 3m (Reflexos CD Int reduz metade e evita empurrão).' },
                { n: 'Substância Enervante', d: 'Impede ações que exijam calma ou concentração até se limpar (ação padrão).' }
            ]
        },
        poderes: [
            {
                name: 'Armadilha Instantânea',
                req: 'treinado em Ladinagem e Ofício (artesão)',
                desc: 'Escolha duas armadilhas (armadilheiro ou caçador). Você pode prepará-las sem ambiente propício e usa Inteligência na CD. Ganha uma nova armadilha a cada novo poder desta distinção.'
            },
            {
                name: 'Armadilha Distante',
                req: 'Des 1, Armadilha Instantânea',
                desc: 'Ao preparar uma armadilha, você pode gastar 1 PM para prepará-la em qualquer espaço desocupado em alcance curto.'
            },
            {
                name: 'Armadilha Furtiva',
                req: 'Armadilha Instantânea, Ataque Furtivo',
                desc: 'A CD para encontrar, desarmar e resistir aumenta em +5 e você adiciona seu Ataque Furtivo ao dano causado.'
            },
            {
                name: 'Armadilha Recarregável',
                req: 'Armadilha Instantânea',
                desc: 'Ao disparar uma armadilha em alcance médio, pode gastar 1 PM para rearmá-la automaticamente no início do próximo turno.'
            },
            {
                name: 'Aumentar Complexidade',
                req: 'Armadilha Instantânea',
                desc: 'Soma Inteligência no dano e CD das armadilhas. Elas ocupam área de 4,5m. Pode disparar armadilhas em alcance médio como ação livre.'
            },
            {
                name: 'Tripla Ameaça',
                req: 'Aumentar Complexidade',
                desc: 'Pode gastar 10 PM para preparar até 3 armadilhas simultaneamente em pontos diferentes de alcance curto.'
            },
            {
                name: 'Armadilha: Mina',
                req: '—',
                desc: 'Criaturas na área sofrem 4d6 pontos de dano de impacto e são empurradas 3m na direção oposta ao centro da armadilha (Reflexos CD Int reduz à metade e evita o empurrão). Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Buraco Portátil',
                req: '—',
                desc: 'Um fosso se abre na área. Queda de 6m causa 4d6 pontos de dano de impacto (Atletismo CD 20 para escalar de volta, Reflexos CD Int evita e move para fora da área). Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Mola',
                req: '—',
                desc: 'A criatura é empurrada 9m na direção oposta ao centro da armadilha e fica caída (Reflexos CD Int evita o empurrão). Se colidir com algum obstáculo no caminho do empurrão, a vítima sofre 2d6 pontos de dano de impacto. Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Atordoante',
                req: '—',
                desc: 'A criatura sofre 4d8 pontos de dano de impacto e fica atordoada por 1 rodada (Fortitude CD Int evita a condição). Uma criatura só pode ser atordoada por esta armadilha uma vez por cena Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Constrangedora',
                req: '—',
                desc: 'A criatura sofre um efeito constrangedor, como ser coberta de piche e penas. A vítima fica pasma por 1 rodada e frustrada (Vontade CD Int evita a condição pasmo). Uma criatura só pode ficar pasma por esta armadilha uma vez por cena. Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Fumaça',
                req: '—',
                desc: 'Uma nuvem de fumaça espessa obscurece toda a visão na área e dura até o fim da cena. Criaturas a até 1,5m têm camuflagem leve e criaturas a partir de 3m têm camuflagem total. Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Luz',
                req: '—',
                desc: 'Criaturas na área ficam cegas por 1d4 rodadas e depois ofuscadas (Reflexos CD Int evita a condição cego). Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            },
            {
                name: 'Armadilha: Barril de Óleo',
                req: '—',
                desc: 'Criaturas na área ficam vulneráveis a fogo até se limparem (o que exige uma ação completa)'
            },
            {
                name: 'Armadilha: Substância Enervante',
                req: '—',
                desc: 'Criaturas na área são cobertas por substâncias enervantes que impedem que elas façam quaisquer ações que exijam calma ou concentração (como lançar magias) até se limparem (uma ação padrão). Armadilhas - Regra Mestre Armadilheiro Esses poderes compartilham as seguintes regras. • Preparar uma armadilha gasta uma ação completa e 3 PM. • Uma armadilha afeta uma área de 3m de lado adjacente a você e é acionada pela primeira criatura que entrar na área. • Uma criatura que o veja preparando a armadilha saberá que ela está lá. • É possível aplicar veneno a uma armadilha, como se ela fosse uma arma. Uma criatura que não o veja preparando a armadilha pode encontrá-la se gastar uma ação padrão procurando e passar em um teste de Investigação (CD Int).'
            }
        ]
    },
    {
        id: 'arqueiro-lenorienn',
        name: 'Arqueiro de Lenórienn',
        source: 'herois',
        exclusiva: true,
        admissao: 'O candidato deve provar aptidão em arquearia e magia arcana, além de demonstrar respeito aos valores élficos perante um mentor. O treinamento exige a Provação das Três Setas (atingir um alvo distante três vezes com apenas duas flechas e um arco) e um período de isolamento absoluto de uma estação. Por fim, deve realizar um grande feito em prol do povo élfico, como resgatar prisioneiros ou recuperar tesouros antigos.',
        marca: {
            name: 'Marca da Distinção: O Arco Arcano',
            desc: 'Seu arco torna-se um item esotérico. Pode receber melhorias e encantos de armas e de esotéricos (escolhendo um se o bônus for comum aos dois). Se perdido, pode ser recuperado com um ritual de 1 dia e T$ 100.'
        },
        detalhes: {
            titulo: 'Regras de Encantamento e Flechas',
            conteudo: 'O Arqueiro de Lenórienn especializa-se na criação de munições místicas. Flechas mágicas imbuídas devolvem os PM gastos ao criador quando o pacote de 20 unidades é totalmente disparado. O nível das flechas fabricáveis (menores, médias ou maiores) depende do círculo de magia arcana disponível ao arqueiro.',
            arsenal: [
                { n: 'Arco Arcano', d: 'Funciona como arma e item esotérico simultaneamente.' },
                { n: 'Flechas Mágicas', d: 'Podem ser fabricadas (20 unidades) e devolvem PM após o uso total.' },
                { n: 'Flecha da Morte', d: 'Dano extra, +2 na margem de ameaça e +2 na CD de magias acopladas.' },
                { n: 'Munição Etérea', d: 'Ignora cobertura leve e 20 pontos de RD do alvo.' }
            ]
        },
        poderes: [
            {
                name: 'Energizar Arco',
                req: 'Misticismo, Pontaria, Magias, Foco em Arma (Arco)',
                desc: 'Aprende Arma Mágica e pode lançá-la como ação de movimento no arco arcano. Custo reduzido em -1 PM se já conhecia a magia.'
            },
            {
                name: 'Chuva de Flechas',
                req: 'Energizar Arco, Magias de 3º Círculo',
                desc: 'Gasta 2 PM para atacar vários inimigos (até seu atributo-chave) com um único teste e uma única munição.'
            },
            {
                name: 'Encantar Flechas',
                req: 'Ofício (armeiro), Energizar Arco, Magias de 2º Círculo',
                desc: 'Recebe e pode fabricar flechas mágicas. Recupera PM sacrificados na fabricação após disparar todas as 20 flechas do pacote.'
            },
            {
                name: 'Flecha de Toque',
                req: 'Energizar Arco',
                desc: 'Substitui ataques corpo a corpo de magias (como Toque Chocante) por ataques à distância com o arco arcano.'
            },
            {
                name: 'Flecha Explosiva',
                req: 'Flecha de Toque',
                desc: 'Aprimoramento (+2 PM): Magias de área podem ser disparadas via flecha, centrando o efeito no alvo atingido.'
            },
            {
                name: 'Flecha da Morte',
                req: 'Encantar Flechas, Crítico com arco em cada tipo de criatura',
                desc: 'Cria flecha mágica única (máximo igual a poderes da distinção) que causa dano extra e aumenta margem de ameaça.'
            },
            {
                name: 'Flecha Fantasma',
                req: 'Energizar Arco, Forma Etérea',
                desc: 'Gasta 2 PM para ignorar cobertura leve e 20 pontos de RD com munição etérea.'
            }
        ]
    },
    {
        id: 'bruxo-da-tormenta',
        name: 'Bruxo da Tormenta',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ingressar em um centro de ensino avançado (como a Academia Arcana) e provar que não é um infiltrado lefeu. O estudo exige pesquisa teórica constante e a apresentação de um tratado acadêmico baseado em contato direto com a Tormenta. O aprendizado é perigoso: cada material destrói a mente do estudante um pouco mais, transformando-o permanentemente ao descobrir algo inédito sobre a Tempestade Rubra.',
        marca: {
            name: 'Marca da Distinção: Insanidade Controlada',
            desc: 'Ao lançar magias, você pode receber Pontos de Insanidade (PI) limitados pelo círculo da magia. Cada PI recebido reduz o custo da magia em 1 PM.'
        },
        detalhes: {
            titulo: 'Mecânica: Pontos de Insanidade (PI)',
            conteudo: 'Seu limite de PI é igual a 5x seu total de poderes da Tormenta. Se ultrapassar metade do limite, você fica Frustrado. Se atingir o limite, fica Alquebrado e Esmorecido. PI são recuperados com descanso (1 por nível, modificado por condições de repouso).',
            arsenal: [
                { n: 'Conjuração Insana', d: 'Gaste PI (limite de poderes da distinção) para aumentar a CD da magia em +1 por ponto.' },
                { n: 'Magia Antiaberrante', d: 'Gaste PI (igual ao círculo) para ignorar 10 de RD e imunidades de Lefeu.' },
                { n: 'Escudo Rubro', d: 'Gaste PI para ganhar +2 em resistência ou 5 de RD por ponto (dobrado contra Tormenta).' },
                { n: 'Corromper Magia', d: 'Gaste PI para causar +1d6 de dano de essência por ponto em magias de dano.' }
            ]
        },
        poderes: [
            {
                name: 'Conjuração Insana',
                req: 'Int 2, Mago ou Bruxo, um poder da Tormenta',
                desc: 'Permite receber PI (limite de poderes da distinção) ao lançar magias para aumentar a CD em +1 por PI recebido.'
            },
            {
                name: 'Magia Antiaberrante',
                req: 'Conjuração Insana',
                desc: 'Ao lançar magias, pode receber PI igual ao círculo para ignorar 10 de RD e imunidades de lefeu.'
            },
            {
                name: 'Resistência à Tormenta',
                req: 'Conjuração Insana',
                desc: 'Aprende Resistência a Energia (-1 PM no custo). Aprimoramento (+2 PM): Protege contra efeitos de áreas de Tormenta e templos de Aharadak.'
            },
            {
                name: 'Corromper Magia',
                req: 'Magia Antiaberrante, Resistência à Tormenta',
                desc: 'Ao lançar magia de dano, pode receber PI para causar +1d6 de dano de essência por ponto gasto.'
            },
            {
                name: 'Escudo Rubro',
                req: 'Resistência à Tormenta',
                desc: 'Ao resistir ou sofrer dano, pode receber PI para ganhar +2 no teste ou 5 de RD por ponto (dobrado contra efeitos da Tormenta).'
            }
        ]
    },
    {
        id: 'cacador-de-cabecas',
        name: 'Caçador de Cabeças',
        source: 'herois',
        exclusiva: true,
        admissao: 'Apenas duyshidakk (ou aqueles aceitos por eles através de grande sacrifício) podem trilhar este caminho. O candidato deve localizar um mestre furtivo em Lamnor e convencê-lo de que seu treinamento servirá ao "Mundo Como Deve Ser". Após um isolamento brutal, o discípulo deve superar três testes sem direito a falhas: fabricar um item inusitado (bomba ou veneno), permanecer oculto do mestre por um dia inteiro e assassinar um alvo designado, trazendo sua cabeça como prova.',
        marca: {
            name: 'Marca da Distinção: Terror de Lamnor',
            desc: 'Você recebe +2 em Furtividade e +2 na margem de ameaça de ataques contra criaturas desprevenidas.'
        },
        detalhes: {
            titulo: 'Arsenal e Testes de Caçada',
            conteudo: 'O Caçador de Cabeças é mestre em truques e furtividade. Sua formação exige domínio sobre preparados alquímicos, venenos e ferramentas inusitadas. Durante os testes de admissão, o candidato demonstra sua prontidão ao fabricar bombas ou armadilhas e ao manter-se invisível mesmo sob o escrutínio de um mestre veterano.',
            arsenal: [
                { n: 'Preparados Alquímicos', d: 'Soma Sabedoria na CD e no dano; alcance de arremesso aumenta em uma categoria.' },
                { n: 'Venenos', d: 'Aplicação na arma torna-se ação livre; soma Sabedoria na CD e perda de vida.' },
                { n: 'Furtividade Absoluta', d: 'Capacidade de "surgir" adjacente ao alvo e tornar-se invisível contra ele.' },
                { n: 'Visão Superior', d: 'Enxerga perfeitamente no escuro (incluindo mágico) e ignora névoa ou fumaça.' }
            ]
        },
        poderes: [
            {
                name: 'Predador Alfa',
                req: 'Furtividade, Lobo Solitário, ser duyshidakk',
                desc: 'Uma vez por rodada (2 PM), faz teste de Furtividade oposto à Percepção. Se vencer, surge adjacente ao alvo e fica invisível contra ele até o próximo turno. Requer liberdade de movimentos (sem armadura pesada).'
            },
            {
                name: 'Arsenal do Caçador',
                req: 'Predador Alfa, Saque Rápido',
                desc: 'Soma Sabedoria na CD/dano de preparados e venenos; alcance aumenta em uma categoria. Preparar itens (pavio ou veneno) torna-se ação livre.'
            },
            {
                name: 'Camuflagem do Caçador',
                req: 'Camuflagem, Predador Alfa',
                desc: 'Inimigos aplicam chance de erro por camuflagem a qualquer efeito contra você (não apenas ataques).'
            },
            {
                name: 'Exterminar Presa',
                req: 'Espreitar, Predador Alfa',
                desc: 'Ao usar Marca da Presa, ganha 1 PM temporário por poder da distinção. Acertos críticos multiplicam o dano adicional da Marca da Presa.'
            },
            {
                name: 'Sentidos de Caçada',
                req: 'Predador Alfa, Sentidos Aguçados',
                desc: 'Enxerga perfeitamente no escuro (incluindo mágico) e ignora camuflagem por fumaça ou névoa.'
            },
            {
                name: 'Evasão do Caçador',
                req: 'treinado em Reflexos, Destemor Inflamado',
                desc: 'Quando sofre um efeito que permite um teste de Reflexos para reduzir o dano à metade, você não sofre dano nenhum se passar e sofre apenas metade do dano se falhar. Além disso, uma vez por rodada, quando passa em um teste de Reflexos, você pode percorrer até metade do seu deslocamento. Esta habilidade exige liberdade de movimentos; você não pode usá-la se estiver na condição imóvel.'
            },
            {
                name: 'Destemor Inflamado',
                req: 'treinado em Vontade.',
                desc: 'Você é imune a medo (exceto fobias raciais). Além disso, quando um inimigo usa um efeito de medo contra você, você recebe +2 em testes de perícia e rolagens de dano até o fim da cena. Para cada dois outros poderes da distinção que você possuir, esse bônus aumenta em +1.'
            }
        ]
    },
    {
        id: 'cacador-de-dragoes',
        name: 'Caçador de Dragões',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve obrigatoriamente treinar em uma organização especializada (como as Lanças de Sckharshantallas ou os Escamas Vivas). Após seis meses de treino, deve realizar o teste real: localizar um dragão específico, estudar seus hábitos e fraquezas, e liderar uma caçada para matá-lo. O sucesso exige trazer um troféu (cabeça ou couro) para a organização, provando que a vitória veio por técnica e planejamento, não apenas força bruta.',
        marca: {
            name: 'Marca da Distinção: Escama da Honra',
            desc: 'Você recebe um amuleto (não ocupa espaço de item) que permite causar +1d6 de dano extra uma vez por rodada. O tipo do dano deve ser escolhido entre os sopros de dragões que você já derrotou.'
        },
        detalhes: {
            titulo: 'Regras de Troféus e Caçada',
            conteudo: 'O caçador utiliza amuletos feitos com restos de seus inimigos. Se perder o amuleto, pode confeccionar outro em 1 dia usando uma escama de um dragão morto por ele há menos de 30 dias. Na caçada de admissão, o candidato deve ser o líder e os aliados devem seguir seu plano estratégico.',
            arsenal: [
                { n: 'Amuleto de Escama', d: 'Dano extra de +1d6 (Fogo, Frio, Ácido, Eletricidade ou Trevas conforme dragões derrotados).' },
                { n: 'Especialista em Dragões', d: 'Bônus de poderes como Alçar aos Céus e Danificar as Asas são dobrados contra dragões.' },
                { n: 'Liderança Tática', d: 'O caçador deve provar que vence através de estudo e registros perdidos sobre sua presa.' },
                { n: 'Escama da Honra', d: 'Pode ser refeito se perdido, exigindo uma caçada recente (menos de 30 dias).' }
            ]
        },
        poderes: [
            {
                name: 'Destemor Inflamado',
                req: 'treinado em Vontade',
                desc: 'Imune a medo (exceto fobias raciais). Se um inimigo usar medo contra você, recebe +2 em testes e dano até o fim da cena (bônus aumenta com outros poderes da distinção).'
            },
            {
                name: 'Alçar aos Céus',
                req: 'Atletismo, Destemor Inflamado',
                desc: 'Gasta 2 PM para investida saltando (ação completa). Causa um dado extra de dano (aumenta com poderes). Dano extra é dobrado contra dragões.'
            },
            {
                name: 'Danificar as Asas',
                req: 'Destemor Inflamado',
                desc: 'Gasta 2 PM no ataque para deixar o alvo caído e lento (Fortitude CD For/Des evita). CD aumenta com poderes da distinção, dobrado contra dragões.'
            },
            {
                name: 'Entortar Escamas',
                req: 'Destemor Inflamado, outro poder da distinção',
                desc: 'Em acertos críticos, o alvo sofre -2 na Defesa e -5 na RD até o fim da cena. Com cinco poderes da distinção, penalidades aumentam para -5 e -10.'
            },
            {
                name: 'Evasão do Caçador',
                req: 'Reflexos, Destemor Inflamado',
                desc: 'Não sofre dano se passar em Reflexos e apenas metade se falhar. Se passar no teste, pode percorrer metade do deslocamento (uma vez por rodada).'
            }
        ]
    },
    {
        id: 'campeao-dojo',
        name: 'Campeão de Dojo',
        source: 'herois',
        exclusiva: true,
        admissao: 'O candidato deve treinar em um dojo tamuraniano a vida toda, retornando sempre para relatar façanhas. O título é obtido ao vencer um campeonato em um único dia contra todos os alunos graduados, o mestre e o atual campeão, relatando uma lição após cada luta.',
        marca: {
            name: 'Marca da Distinção: Foco Marcial',
            desc: 'Você pode gastar uma ação de movimento para receber +1d8 na rolagem de dano de seu próximo ataque desarmado feito nesta rodada.'
        },
        detalhes: {
            titulo: 'Sobre a Graduação do Dojo',
            conteudo: 'O título de Campeão de Dojo deve ser defendido constantemente. Se um novo candidato desafiá-lo e vencer, você perde o status e os benefícios da distinção. Além disso, as técnicas do estilo permitem que certas armas corpo a corpo sejam tratadas como extensões do próprio corpo (punhos).',
            arsenal: [],
        },
        poderes: [
            {
                name: 'Golpe Concentrado',
                req: 'Sab 2, Briga',
                desc: 'Você pode gastar uma ação de movimento e 2 PM para se concentrar em seus golpes. Quando faz isso, até o fim da cena você recebe +1d8 em suas rolagens de dano desarmado.'
            },
            {
                name: 'Caminho da Mão Armada',
                req: 'Golpe Concentrado',
                desc: 'Escolha três armas corpo a corpo com as quais tenha proficiência. Para você, essas armas contam como ataques desarmados para efeitos que interagem com eles e você pode usar o melhor dano entre a arma ou seu dano desarmado.'
            },
            {
                name: 'Caminhar do Dragão',
                req: 'treinado em Atletismo, Golpe Concentrado',
                desc: 'Você recebe +5 em Atletismo e pode gastar 1 PM para “correr no ar” por 1 rodada (deslocamento de voo igual ao base). Deve terminar o movimento em superfície firme ou cairá.'
            },
            {
                name: 'Controlar a Respiração',
                req: 'Golpe Concentrado',
                desc: 'Ação de movimento: gaste PM (limite Sab) para recuperar 2d6 PV por PM. Para cada dois outros poderes da distinção, cada dado de cura aumenta em um passo.'
            },
            {
                name: 'Sentidos do Tigre',
                req: 'Golpe Concentrado',
                desc: 'Você soma sua Sabedoria na Defesa e em Reflexos. Exige liberdade de movimentos; não funciona com armadura pesada ou na condição imóvel.'
            }
        ]
    },
    {
        id: 'capitao-conclave',
        name: 'Capitão do Conclave',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve adquirir seu próprio navio e tripulação leal, cruzando o Mar Negro para provar seu valor. Deve viajar até o navio-fortaleza Sentença, jurar lealdade à Dupla Coroa (Izzy Tarante e Sidrius Tirallis) e prometer caçar puristas. O estágio final exige realizar um saque significativo de inimigos do Conclave e entregá-lo inteiramente para a operação e ampliação do Sentença.',
        marca: {
            name: 'Marca da Distinção: Membro do Conclave',
            desc: 'Você recebe +2 em Acrobacia e Pilotagem e não sofre penalidades por atacar à distância ou lançar magias a bordo de um veículo. Além disso, pode recorrer à Solidariedade Pirata.[cite: 1]'
        },
        detalhes: {
            titulo: 'Regras de Solidariedade Pirata',
            conteudo: 'Uma vez por aventura, você pode solicitar ajuda ao Conclave através de uma rede de comunicação (pessoal, equipamentos ou informações) com resposta em 1d3 dias. Casos de ameaças terríveis ou puristas podem atrair a ajuda do próprio Sentença, o que exigirá uma retribuição futura na forma de missões de extrema importância e dificuldade.',
            arsenal: [],
        },
        poderes: [
            {
                name: 'Içar A Bandeira Preta',
                req: 'treinado em Intimidação e Pilotagem, Audácia',
                desc: 'Uma vez por cena (5 PM), aliados em alcance curto recebem 5 PV e 1 PM temporários por poder da distinção. Inimigos ficam abalados por 1d4 rodadas (Vontade CD Car evita). Se a bandeira já estiver visível, custa 3 PM (ação livre).'
            },
            {
                name: 'Língua Afiada',
                req: 'Içar a Bandeira Preta',
                desc: 'Ao vencer teste oposto de Enganação, causa 2d6 de dano psíquico não letal por poder da distinção (1/cena). Se usar Audácia em Enganação, Diplomacia ou Intimidação, o custo diminui em –1 PM.'
            },
            {
                name: 'Lutar Sujo',
                req: 'Içar a Bandeira Preta',
                desc: 'Pode fazer teste de manobra para executar um truque sujo. Se vencer, o alvo sofre uma condição (cego, enjoado, lento ou surdo) por 1 rodada ou até gastar ação padrão para se recompor.'
            },
            {
                name: 'Sentença de Bolso',
                req: 'proficiência com armas de fogo, Içar a Bandeira Preta',
                desc: 'Recebe +2 em Intimidação e na margem de ameaça com armas de fogo, e causa +2d6 de dano com armas de fogo em oponentes desprevenidos.'
            },
            {
                name: 'Vento em Popa',
                req: 'treinado em Pilotagem, Içar a Bandeira Preta, Pernas do Mar',
                desc: 'Uma vez por rodada (2 PM), realiza uma ação de movimento adicional. O custo de Velocidade Ladina diminui em –1 PM. Custos diminuem em –1 PM se estiver a bordo de veículo aquático. Audácia para Acrobacia, Atletismo ou Pilotagem custa –1 PM.'
            }
        ]
    },
    {
        id: 'carteador',
        name: 'Carteador',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve dominar três jogos de azar e vencer três partidas sob condições únicas: uma superando a má sorte com habilidade, outra dependendo apenas da sorte pura, e uma terceira trapaceando sem ser detectado. As apostas devem envolver sua fortuna, sua vida e sua alma[cite: 1]. Por fim, deve desafiar e vencer um Carteador veterano em um jogo onde o prêmio são os próprios poderes da distinção[cite: 1].',
        marca: {
            name: 'Marca da Distinção: Sorte de Principiante',
            desc: 'Você aprende e pode lançar Orientação (apenas em si mesmo para testes de Jogatina) ou Sorriso da Fortuna[cite: 1]. Esta não é uma habilidade mágica e provém de sua capacidade de sutilmente torcer as regras do jogo a seu favor[cite: 1].'
        },
        poderes: [
            {
                name: 'Dado Viciado',
                req: 'treinado em Jogatina',
                desc: 'No início de cada cena, você recebe 1d6 como dado de auxílio, +1d6 para cada outros dois poderes da distinção que possua[cite: 1]. Quando faz um teste de perícia, pode pagar 1 PM por dado para somar o resultado no teste. Resultados iguais entre os dados de auxílio concedem 1 PM temporário por dado[cite: 1].'
            },
            {
                name: 'Ás na Manga',
                req: 'Dado Viciado',
                desc: 'Quando faz um teste de perícia, você pode gastar 2 PM para usar Jogatina no lugar dessa perícia (uma vez por perícia a cada cena)[cite: 1].'
            },
            {
                name: 'Jogo Perigoso',
                req: 'treinado em Misticismo, Ás na Manga',
                desc: 'Ação completa: faça um teste de Jogatina (CD 20 + custo da magia) para apostar com uma entidade[cite: 1]. Se passar, pode lançar uma magia de 1º círculo (atributo Carisma) com aprimoramentos de bardo[cite: 1]. A cada dois outros poderes, o círculo máximo aumenta[cite: 1].'
            },
            {
                name: 'Seduzir a Sorte',
                req: 'Dado Viciado',
                desc: 'Ao rolar dados de auxílio, pode pagar 1 PM para apostar com o mestre quem terá o maior total[cite: 1]. Se adivinhar corretamente, recupera os dados; se perder, fica frustrado[cite: 1].'
            },
            {
                name: 'Resultado Destinado',
                req: 'Jogo Perigoso, 17° nível de personagem',
                desc: 'Uma vez por cena (5 PM), escolha uma habilidade de até 5º nível de uma classe que não seja a sua e use-a como se tivesse 5 níveis nela até o fim da cena (atributo-chave Carisma)[cite: 1].'
            }
        ]
    },
    {
        id: 'cavaleiro-do-corvo',
        name: 'Cavaleiro do Corvo',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve localizar o Ninho do Corvo nas Montanhas Lannestul e aceitar um treinamento sem volta, onde a falha significa a morte. Deve realizar um juramento de segredo e sobreviver a meses de provações que simulam a corrupção da Tormenta, cumprindo missões enquanto perde sua antiga individualidade. Ao final, recebe um codinome que simboliza sua nova existência nas trevas para trazer a luz.',
        marca: {
            name: 'Marca da Distinção: Não Tenho Nome',
            desc: 'Você aprende a Língua dos Corvos e recebe imunidade a medo. Além disso, perde a habilidade Código de Honra (caso a tenha).'
        },
        detalhes: {
            titulo: 'Mecânica: Língua dos Corvos',
            conteudo: 'Você pode gastar uma ação de movimento e 1 PM para transmitir informações silenciosas a um aliado em alcance curto. Isso funciona como a magia Aviso, mas realizada apenas por gestos, exigindo que o alvo consiga vê-lo.',
            arsenal: [] // Campo mantido para evitar erro de renderização nos poderes
        },
        poderes: [
            {
                name: 'Reconhecimento e Infiltração',
                req: 'Furtividade, Guerra, armaduras pesadas',
                desc: 'Seu deslocamento aumenta em +3m, você não sofre penalidade por armadura e a penalidade por ações chamativas em Furtividade muda para –10.'
            },
            {
                name: 'A Qualquer Custo',
                req: 'Reconhecimento e Infiltração',
                desc: 'Gasta 1 dia e T$ 500 para preparar uma missão específica. Escolha um benefício (mais benefícios com outros poderes): Arma Anticriatura, treino em duas perícias, ou usar Guerra no lugar de perícias de inteligência/exploração.'
            },
            {
                name: 'Atrás das Linhas Inimigas',
                req: 'Reconhecimento e Infiltração',
                desc: 'Você recebe imunidade a atordoamento e cansaço. Sua recuperação por descanso nunca é inferior a normal.'
            },
            {
                name: 'Das Trevas',
                req: 'Duelo, Atrás das Linhas Inimigas',
                desc: 'Contra alvos do seu Duelo que estejam desprevenidos ou flanqueados, os bônus da habilidade Duelo aumentam em +2.'
            },
            {
                name: 'Ferramenta de Morte',
                req: 'A Qualquer Custo, liderar dois combates vitoriosos',
                desc: 'Ação de movimento (PM limite Int): Você e aliados recebem bônus no ataque, dano e margem de ameaça contra um alvo em alcance curto igual aos PM gastos até o próximo turno.'
            },
            {
                name: 'Postura de Combate: Tomada Furtiva',
                req: 'Pontaria, Reconhecimento e Infiltração',
                desc: 'Pode mirar como ação livre, não sofre penalidade de movimento em Furtividade e recebe +2 no ataque e dano à distância (aumenta com outros poderes).'
            },
            {
                name: 'Trazemos a Luz',
                req: 'Das Trevas',
                desc: 'Ação de movimento (3 PM): Teste de Guerra concede PV temporários e bônus em ataque/dano. Se o resultado for 30+, ignora imunidade a críticos e ataques furtivos até o fim da cena.'
            }
        ]
    },
    {
        id: 'cavaleiro-feerico',
        name: 'Cavaleiro Feérico',
        source: 'herois',
        exclusiva: true,
        admissao: 'O candidato deve treinar com um mestre em local isolado por um inverno inteiro, dominando artes da guerra, história élfica e caminhos das fadas. No inverno seguinte, deve trazer uma oferenda aceitável ao mentor e participar da cerimônia do chá, respondendo ritualisticamente sobre a busca pela perfeição "Em nome de Glórienn e Lenórienn".',
        marca: {
            name: 'Marca da Distinção: Conexão Feérica',
            desc: 'Você recebe a habilidade Empatia Selvagem e +1 PM para cada poder da distinção que possuir.'
        },
        poderes: [
            {
                name: 'Arte Élfica',
                req: 'Magias, Atuação, Luta, Foco em Arma (espada longa ou florete)',
                desc: 'Uma vez por rodada, ao acertar um ataque com espada longa ou florete, pode gastar 2 PM para ativar Música ou lançar magia arcana (ação livre). O círculo máximo é limitado pelo total de poderes da distinção.'
            },
            {
                name: 'Arma da Floresta',
                req: 'Arte Élfica',
                desc: 'Gasta 1 PM para cobrir sua arma com elementos naturais. O dano torna-se mágico e aumenta em um passo até o fim da cena (ou por 1 dia se estiver em uma floresta).'
            },
            {
                name: 'Armadura da Floresta',
                req: 'Arte Élfica',
                desc: 'Recebe armadura completa vegetal que permite somar Destreza na Defesa e lançar magias sem testes de Misticismo. Ganha melhorias a cada dois outros poderes da distinção. Renasce em 1 dia se destruída.'
            },
            {
                name: 'Flagelo dos Duyshidakk',
                req: 'Arte Élfica',
                desc: 'Soma o total de poderes da distinção no dano contra bandos, enxames e duyshidakk. Se reduzir um oponente a 0 PV, pode gastar 2 PM para deslocar-se e atacar outro inimigo.'
            },
            {
                name: 'Lâminas Feéricas',
                req: 'Arte Élfica',
                desc: 'Espadas longas tornam-se armas ágeis para você. Soma o círculo máximo de magias ao dano e aumenta a margem de ameaça em +1 para cada dois poderes da distinção.'
            },
            {
                name: 'Montaria Feérica',
                req: 'Cavalgar, Arte Élfica',
                desc: 'Recebe parceiro montaria veterano (ou torna montaria atual combatente iniciante). Recebe +5 em Cavalgar para correr e saltar. Pode treinar nova montaria em uma semana.'
            }
        ]
    },
    {
        id: 'chapeu-preto',
        name: 'Chapéu-Preto',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve testemunhar três atos de maldade marcantes que causem pesadelos constantes, perda de relações benéficas e ferimentos que afetem suas habilidades ou aparência. Deve renegar laços com divindades e organizações justas, virando as costas para quem o conhecia antes de sua transformação amarga. A maldição se manifesta quando o candidato acorda com um objeto sinistro que o acompanhará para sempre.',
        marca: {
            name: 'Marca da Distinção: Esse Maldito Chapéu',
            desc: 'Você recebe um "chapéu preto" que concede +2 em Intimidação e na CD de efeitos de medo, mas impõe –2 em Adestramento, Atuação e Diplomacia.'
        },
        detalhes: {
            titulo: 'A Maldição do Chapéu Preto',
            conteudo: 'O objeto da maldição é indestrutível e inseparável; se perdido ou destruído, ressurge na cena seguinte. Ele não pode ser escondido por magias de disfarce ou formas selvagens. A única forma de se livrar dele é através de uma jornada de redenção, o que resulta na perda imediata de todos os poderes desta distinção.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Coração Duro',
                req: 'Luta ou Pontaria, Presença Aterradora',
                desc: 'Recebe +2 em rolagens de dano com armas e imunidade a medo (ou +2 em Vontade se já for imune). Não elimina fobias raciais.'
            },
            {
                name: 'Dance!',
                req: 'Coração Duro',
                desc: 'Ao usar Intimidação, pode gastar 2 PM para demonstrar habilidade com a arma, somando o atributo-chave de ataque da arma como bônus no teste.'
            },
            {
                name: 'Rápido ou Morto',
                req: 'Iniciativa, Coração Duro',
                desc: 'Recebe +2 em Iniciativa e +3m de deslocamento. Esses bônus aumentam em +1 e +1,5m para cada dois outros poderes da distinção.'
            },
            {
                name: 'Olhos de Chumbo',
                req: 'Coração Duro, ser procurado por um crime',
                desc: 'Aura de medo de 9m: inimigos escolhidos sofrem –2 em dano e Defesa (penalidade aumenta em –1 para cada dois outros poderes da distinção).'
            },
            {
                name: 'Tiro à Traição',
                req: 'Coração Duro, três críticos em alvos desprevenidos',
                desc: 'O dano de seus ataques com armas contra alvos desprevenidos ou sob condição de medo aumenta em um passo.'
            },
            {
                name: 'Bala nas Costas',
                req: 'Coração Duro, dois outros poderes da distinção',
                desc: 'No primeiro ataque contra um oponente na cena, pode gastar 1 PM para receber +10 na margem de ameaça.'
            },
            {
                name: 'Congelar o Inferno',
                req: 'Coração Duro, dois outros poderes da distinção',
                desc: 'Ao usar um efeito de medo, pode gastar 2 PM para ignorar imunidades a medo e efeitos mentais dos alvos.'
            }
        ]
    },
    {
        id: 'medico-monstro',
        name: 'Médico Monstro',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve encontrar um antigo paciente do Grêmio em Vectora para ser seu "padrinho" e citar seu nome para ganhar acesso à clínica. Após pagar pelas modificações e ser sedado, passa por cirurgias drásticas para enxertar partes de criaturas em seu próprio corpo. Candidatos ligados à lei ou famosos são sumariamente rejeitados pelo Grêmio.',
        marca: {
            name: 'Marca da Distinção: Procedimento Inicial',
            desc: 'Você se torna um monstro em adição ao seu tipo original. A penalidade em perícias por implantes cai para –1 por implante e você paga 20% a menos por novos enxertos.'
        },
        detalhes: {
            titulo: 'Catálogo de Implantes e Cirurgia',
            conteudo: 'Receber um implante exige um dia de cirurgia e um teste estendido de Fortitude (CD 25, 3 sucessos). Falha total resulta em rejeição e possível morte. Cada implante impõe –2 em Adestramento, Diplomacia e Fortitude (reduzido pela marca). O limite de implantes é igual à sua Constituição.',
            arsenal: [
                { n: 'Asas', d: 'Voo igual ao deslocamento base; fica vulnerável enquanto voa. (T$ 20.000)' },
                { n: 'Braço de Ogro', d: '+2 em Força e alcance natural +1,5m. Substitui um braço. (T$ 36.000)' },
                { n: 'Cauda com Ferrão', d: 'Arma natural (1d6). Ataque extra por 1 PM. Veneno causa 1d12 perda de PV. (T$ 27.000)' },
                { n: 'Escamas', d: '+2 na Defesa. Pode ser enxertado uma segunda vez para total de +5 na Defesa. (T$ 12.000)' },
                { n: 'Garras', d: 'Armas naturais (1d6). Permite ataque extra por 1 PM ou uso como arma secundária. (T$ 27.000)' },
                { n: 'Olho Anulador', d: 'Pode lançar Dissipar Magia em cone de 9m usando Vontade. (T$ 30.000)' },
                { n: 'Olho Desintegrador', d: 'Pode lançar a magia Desintegrar usando Constituição. (T$ 50.000)' },
                { n: 'Olho Petrificante', d: 'Ganha Olhar Atordoante ou aumenta sua CD em +2. (T$ 18.000)' },
                { n: 'Patas de Aranha', d: 'Deslocamento de escalada igual ao base ou +6m se já possuir. (T$ 12.000)' },
                { n: 'Tentáculo', d: 'Arma natural (1d4) com alcance +1,5m. Ataque extra por 1 PM. (T$ 27.000)' }
            ]
        },
        poderes: [
            {
                name: 'Enxerto Experimental',
                req: 'Foco em Perícia (Fortitude)',
                desc: 'Recebe um implante de até T$ 18.000 (não conta no limite). No início da cena, role 1d4; se cair 1, o implante falha. O dado aumenta com outros poderes da distinção.'
            },
            {
                name: 'Corpo Resiliente',
                req: 'Enxerto Experimental',
                desc: 'Você não sofre penalidade em Fortitude por implantes. Seu limite de implantes aumenta em +1 (mais +1 para cada dois outros poderes).'
            },
            {
                name: 'Glândula de Infusão',
                req: 'Enxerto Experimental',
                desc: 'Recebe um implante para lançar uma magia de até 2º círculo (alvo você) como se fosse engenhoca, mas usa Constituição e Fortitude.'
            },
            {
                name: 'Implante Exclusivo',
                req: 'Enxerto Experimental',
                desc: 'Permite gastar 1 PM (ação de movimento) para aplicar um encanto de arma sem pré-requisitos em uma arma empunhada até o fim da cena.'
            },
            {
                name: 'Extrapolar o Próprio Corpo',
                req: 'Implante Exclusivo',
                desc: 'Recebe um implante que fornece o benefício de um poder racial à sua escolha (mesmo ignorando requisitos de raça), sujeito a aprovação.'
            },
            {
                name: 'Implante: Garras',
                req: '—',
                desc: 'Suas mãos se transformam em armas naturais de garra (dano 1d6 cada, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com uma arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com uma das garras, desde que ela esteja livre e não tenha sido usada para atacar nesse turno. Como alternativa, se tiver habilidades que exijam uma arma secundária (como Estilo de Duas Armas), você pode usá-las com suas garras. Preço T$ 27.000.'
            },
            {
                name: 'Implante: Tentáculo com Garras',
                req: '—',
                desc: 'Extraído de monstros como otyughs e tigres-de-Hyninn, fornece uma arma natural de tentáculo (dano 1d4, crítico x2, impacto) com a qual seu alcance natural aumenta em +1,5m. Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com o tentáculo. Preço T$ 27.000.'
            },
            {
                name: 'Implante: Olho Anulador',
                req: '—',
                desc: 'Extraído de tiranos oculares e implantado no peito do paciente, este olho projeta um campo antimagia. Você pode lançar Dissipar Magia, mas apenas em um cone de 9m e usando Vontade no lugar do teste de Misticismo. Preço T$ 30.000.'
            },
            {
                name: 'Implante: Escamas',
                req: '—',
                desc: 'Extraídas de vários monstros, formam uma armadura leve e poderosa. Fornecem +2 na Defesa. É possível enxertar este implante uma segunda vez, para aumentar o bônus na Defesa para +5. Preço T$ 12.000.'
            },
            {
                name: 'Implante: Olho Petrificante',
                req: '—',
                desc: 'Um olho amarelo reptiliano, extraído de um basilisco. Você recebe a habilidade Olhar Atordoante (Tormenta20, p. 29). Caso já tenha essa habilidade, a CD para resistir a ela aumenta em +2. Preço T$ 18.000.'
            },
            {
                name: 'Implante: Olho Desintegrador',
                req: '—',
                desc: 'Também retirado de um tirano ocular, este olho monstruoso fica na ponta de uma haste carnosa, em geral implantada nas costas do paciente. Você pode lançar a magia Desintegrar (atributo-chave Constituição). Preço T$ 50.000.'
            },
            {
                name: 'Implante: Asas',
                req: '—',
                desc: 'Asas monstruosas de tamanho correspondente ao paciente. Você pode voar com deslocamento igual ao seu deslocamento base mas, enquanto estiver voando dessa forma, fica vulnerável. Preço T$ 20.000.'
            },
            {
                name: 'Implante: Patas de Aranha',
                req: '—',
                desc: 'Extraídos de uma aranha gigante, estes dois pares de patas são implantados no tronco. Não servem para atacar, mas fornecem deslocamento de escalada igual ao seu deslocamento base. Se já tiver um deslocamento de escalada, ele aumenta em +6m. Preço T$ 12.000.'
            },
            {
                name: 'Implante: Braço de Ogro',
                req: '—',
                desc: 'Um enorme braço pertencente a uma criatura humanoide maior que o paciente. Você recebe +2 em Força e, com este braço, seu alcance natural aumenta em +1,5m. Este implante substitui um dos braços do paciente. Preço T$ 36.000.'
            },
            {
                name: 'Implante: Cauda com Ferrão',
                req: '—',
                desc: 'Você recebe uma arma natural de ferrão (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com o ferrão. Quando causa dano com ele, você pode gastar 1 PM para inocular veneno na vítima, que perde 1d12 PV. Preço T$ 27.000.'
            }
        ]
    },
    {
        id: 'dracomante-real',
        name: 'Dracomante Real',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser um mago e analisar resíduos mágicos de uma conjuração realizada pelo Dragão-Real escolhido. O passo final é o contato direto: estar a poucos passos do dragão em sua forma dracônica sem ser morto, sentindo seu cheiro e vislumbrando sua glória. Candidatos de Beluhga precisam de contato com sua presença viva ou voz espiritual.',
        marca: {
            name: 'Marca da Distinção: Mestre Dracônico',
            desc: 'Escolha um mestre: Behluga (Frio/Luz), Benthos (Ácido), Hydora (Eletricidade), Mzzileyn (Trevas), Sckhar (Fogo), Tarso (Trevas) ou Zadbblein (Veneno). Magias de dano/perda de PV do tipo da essência do mestre causam +2 de dano.'
        },
        detalhes: {
            titulo: 'A Admissão de Benthos',
            conteudo: 'Como Benthos não domina a magia arcana conhecida, o candidato a seu dracomante deve, em vez de analisar resíduos de magias, invocar o Dragão-Rei dos Mares de seu covil subaquático e sobreviver às consequências desse feito monumental.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Afinidade Dracônica',
                req: '5º nível de Mago',
                desc: 'Recebe +2 na CD de magias do tipo da essência do mestre. Recebe redução 3 contra esse tipo de dano para cada poder da distinção possuído.'
            },
            {
                name: 'Dracomancia',
                req: 'Afinidade Dracônica',
                desc: 'Ao lançar uma magia, você recebe redução de dano 5 e resistência a magia +5 até o início de seu próximo turno.'
            },
            {
                name: 'Majestade Elemental',
                req: 'Magias de 3º Círculo, Dracomancia',
                desc: 'Suas magias do tipo elemental do mestre ignoram 20 pontos de RD e causam metade do dano em criaturas imunes.'
            },
            {
                name: 'Memória Dracônica',
                req: 'Dracomancia',
                desc: 'Pode memorizar magias adicionais (limite igual aos poderes da distinção), mas apenas aquelas que causam dano do mesmo tipo que a essência de seu mestre.'
            },
            {
                name: 'Verdadeiro Poder',
                req: 'Magias de 4º Círculo, quatro poderes da distinção',
                desc: 'Aprende e pode lançar Metamorfose (podendo conjurar sob efeito dela) ou Transformação em Dragão (sem custo de componente material para o tipo do mestre).'
            }
        ]
    },
    {
        id: 'drogadora',
        name: 'Drogadora',
        source: 'herois',
        exclusiva: false,
        admissao: 'O caminho exige um metabolismo natural (incapaz para construtos ou mortos-vivos). A candidata deve ser aceita em uma comunidade Thera, realizar grandes serviços e convencer a drogadora local de seu valor. O treino envolve anos de exposição a toxinas e fórmulas aplicadas no próprio corpo. O rito final é um isolamento doloroso sob efeito de drogas expansoras de consciência, concluído com a ingestão de um antídoto preparado pela própria aprendiz.',
        marca: {
            name: 'Marca da Distinção: Tradição da Cura',
            desc: 'Você pode usar Sabedoria como atributo-chave de Ofício (alquimista). Se já possui esse efeito, recebe +2 na perícia.'
        },
        detalhes: {
            titulo: 'Mecânica: Receitas e Alquimia Corporal',
            conteudo: 'Drogadoras transformam o próprio corpo em laboratórios. Elas aprendem receitas (magias) de tradição oral para fabricar poções instantâneas. Ao usar Remédios da Floresta, a drogadora paga o custo da poção com PV em vez de PM ou Tibares, e esses pontos só podem ser recuperados com descanso.',
            arsenal: [] // Mantido para garantir a renderização correta
        },
        poderes: [
            {
                name: 'Curandeira Exímia',
                req: 'Cura, Ofício (alquimista), Vitalidade',
                desc: 'Seu corpo conta como maleta de medicamentos (bônus igual aos poderes da distinção). Ao usar cura fabricada por você, soma sua Constituição nos PV recuperados.'
            },
            {
                name: 'Aspersão Curativa',
                req: 'Curandeira Exímia',
                desc: 'Ação padrão (3 PV): Secreta líquido em aliado adjacente para curar 3d6+3 PV ou remover uma condição (lista completa nas regras). PV gastos só recuperam com descanso.'
            },
            {
                name: 'Remédios da Floresta',
                req: 'Curandeira Exímia',
                desc: 'Permite fabricar poções de suas receitas instantaneamente (ação padrão). Custa PV igual aos PM da magia; a poção dura até o fim da cena e PV só voltam com descanso.'
            },
            {
                name: 'Perfume Intoxicante',
                req: 'Curandeira Exímia',
                desc: 'Recebe +2 em Adestramento e Diplomacia. Atacantes corpo a corpo são marcados por feromônios: você e aliados ignoram camuflagem deles e recebem +2 no ataque.'
            },
            {
                name: 'Laboratório Natural',
                req: 'Remédios da Floresta',
                desc: 'Pode fabricar um item alquímico ou poção sem gastar tempo (limite de vezes por dia igual aos poderes da distinção). Ainda exige matérias-primas.'
            }
        ]
    },
    {
        id: 'engenhoqueiro-goblin',
        name: 'Engenhoqueiro Goblin',
        source: 'herois',
        exclusiva: true,
        admissao: 'Para ser um engenhoqueiro goblin, é preciso ser um goblin e abraçar o risco. Por duas estações, o candidato deve construir engenhocas sem segurança, sempre optando pelo efeito mais espetacular e arriscado. Deve sofrer pelo menos uma falha desastrosa (como uma explosão ou teletransporte planar) que não seja proposital, fabricar um invento com sucata improvisada e, por fim, apresentar uma grande criação que funcione diante de outros engenhoqueiros.',
        marca: {
            name: 'Marca da Distinção: Engenhocaria Goblinoide',
            desc: 'Você fabrica engenhocas em 1 dia pela metade do custo. Entretanto, nunca pode escolher 0, 10 ou 20 para ativá-las. Se falhar no teste por 5 ou mais (ou rolar 1), a engenhoca explode, causando 2d6 de dano de impacto por círculo da magia em área de 3m.'
        },
        detalhes: {
            titulo: 'Gambiarras de Aprimorar Bugiganga',
            conteudo: 'Você pode instalar gambiarras experimentais em suas engenhocas (1 hora, T$ 100). Cada gambiarra aumenta o valor de falha automática da engenhoca em +1. Os efeitos abaixo são rolados a cada uso do item.',
            arsenal: [
                { n: 'Bateria Potente', d: 'A CD para resistir à engenhoca aumenta em +1d4.' },
                { n: 'Bobina Poderosa', d: 'Aumenta os dados de cura ou dano em um passo (máximo d12).' },
                { n: 'Cristal Canalizador', d: 'Aumenta o limite de PM para aprimoramentos em +1d4.' },
                { n: 'Etiqueta de Instruções', d: 'A CD do teste de ativação diminui em –1d10.' },
                { n: 'Luneta Aproximadora', d: 'Aumenta o alcance em 1d3 –1 passos.' }
            ]
        },
        poderes: [
            {
                name: 'Aprimorar Bugiganga',
                req: 'Engenhoqueiro, Vitalidade',
                desc: 'Permite instalar gambiarras experimentais em suas engenhocas. Cada engenhoca pode ter uma gambiarra para cada poder da distinção que você possui.'
            },
            {
                name: 'Abandonar Geringonça',
                req: 'Aprimorar Bugiganga, ter sofrido dano de uma falha de ativação',
                desc: 'Ao falhar na ativação por 5 ou mais (ou falha automática), pode gastar 1 PM para arremessar a engenhoca em alcance curto antes da explosão.'
            },
            {
                name: 'Autodestruição',
                req: 'Abandonar Geringonça',
                desc: 'Ação completa (PM limitado por poderes da distinção): força uma falha crítica na engenhoca e a arremessa para explodir em uma esfera de 1d4 x 1,5m de raio. Dano aumenta em +2d6 por PM gasto.'
            },
            {
                name: 'Enjambração',
                req: 'Aprimorar Bugiganga, outro poder da distinção',
                desc: 'Ação completa: fabrica engenhoca temporária (até o fim da cena) sem custo em tibares, mas gasta os PM da magia na ativação. Chance de falha automática aumenta em +1d6.'
            },
            {
                name: 'Manutenção Precária',
                req: 'Aprimorar Bugiganga',
                desc: 'Entre aventuras, pode fabricar 1d3 + poderes da distinção engenhocas que não contam no limite. Elas exigem custos normais e param de funcionar no fim da próxima aventura.'
            }
        ]
    },
    {
        id: 'escapista',
        name: 'Escapista Magnífico',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser escolhido pela Guilda sem Nome de Valkaria por possuir um "defeito" evidente (como ferimento permanente, idade extrema ou roupas barulhentas) que o torne ordinário. O treinamento dura seis meses na sede secreta, exige pagamento em dinheiro ou serviços e deve ser mantido em segredo absoluto, sob risco de morte. Além disso, o escapista nunca pode curar ou corrigir seu defeito, sob pena de perder todas as suas capacidades.',
        marca: {
            name: 'Marca da Distinção: Vantagem Secreta',
            desc: 'Escolha uma fonte de penalidades (habilidade racial, poder da Tormenta ou complicação). Você deixa de sofrer as penalidades da fonte escolhida.'
        },

        poderes: [
            {
                name: 'Não Há Ninguém Aqui',
                req: 'Aparência Inofensiva, Escapista',
                desc: 'Gasta 2 PM para se esconder sem camuflagem ou cobertura. Se possuir o poder Camuflagem, a penalidade por ações chamativas em Furtividade é reduzida à metade.'
            },
            {
                name: 'Aparência Insignificante',
                req: 'Não Há Ninguém Aqui',
                desc: 'Soma o total de poderes da distinção na CD de Aparência Inofensiva. Pode usar esse poder uma vez contra cada inimigo por cena.'
            },
            {
                name: 'Fujão',
                req: 'treinado em Acrobacia, Não Há Ninguém Aqui',
                desc: 'Ao ser atingido por ataque ou efeito, gasta 2 PM para usar o resultado de um teste de Acrobacia no lugar da Defesa ou do teste de resistência.'
            },
            {
                name: 'Mão Leve',
                req: 'Não Há Ninguém Aqui',
                desc: 'Na manobra desarmar, gasta 2 PM para usar Ladinagem no lugar de Luta. Se vencer e tiver mão livre, fica com o item.'
            },
            {
                name: 'Peguei Um Bobo',
                req: 'Aparência Inofensiva',
                desc: 'Ação padrão (2 PM): Gera efeito de Comando (CD Car +1 por dois outros poderes) ignorando restrição de tipo de criatura. Habilidade não mágica (Magia Simulada).'
            }
        ]
    },
    {
        id: 'gigante-furioso',
        name: 'Gigante Furioso',
        source: 'herois',
        exclusiva: false,
        admissao: 'O processo exige derrotar um gigante em combate corporal e devorar seu coração inteiro, cru e ainda quente. Após esse ato, o candidato deve ser avaliado por um xamã de Megalokk ou sobreviver a uma provação enviada pela própria divindade, enfrentando monstros em um ritual fisicamente exigente.',
        marca: {
            name: 'Marca da Distinção: Desprezar os Pequenos',
            desc: 'Contra atacantes menores que você, você recebe redução de dano 2 por categoria de tamanho de diferença.'
        },
        poderes: [
            {
                name: 'Fúria dos Gigantes',
                req: 'Con 3, treinado em Fortitude, Fúria',
                desc: 'Ao entrar em fúria (2 PM), aumenta seu tamanho em uma categoria e Força em +2. Para cada dois outros poderes da distinção, pode gastar +2 PM para aumentar categorias adicionais (limite pela maior criatura que já matou). (Mágico)'
            },
            {
                name: 'Arremesso de Rochas',
                req: 'Fúria dos Gigantes',
                desc: 'Em fúria (ação de movimento, 1 PM), arranca e arremessa uma rocha (alcance médio, 1d12 impacto) que atinge área de 4,5m. O dano aumenta em +1d12 para cada categoria acima de Médio.'
            },
            {
                name: 'Golpes Pesados',
                req: 'Fúria dos Gigantes',
                desc: 'Ao acertar um ataque corpo a corpo em fúria (1 PM), realiza manobra empurrar como ação livre. Se o alvo atingir um objeto sólido, sofre 1d12 de dano de impacto para cada 3m empurrado.'
            },
            {
                name: 'Terremoto da Fúria',
                req: 'Fúria dos Gigantes',
                desc: 'Em fúria (ação de movimento, 3 PM), pisotear gera onda de choque em raio de 9m (1d12 + Força e queda; Fort CD For reduz à metade e evita queda). Dano aumenta com o tamanho.'
            },
            {
                name: 'Salto Tectônico',
                req: 'treinado em Atletismo, Terremoto da Fúria',
                desc: 'Ao usar Terremoto da Fúria, pode saltar (alcance médio) para fortalecer o efeito. Teste de Atletismo (CD 10) aumenta o raio em +3m e o dano em +2d12.'
            }
        ]
    },
    {
        id: 'ginete-namalkah',
        name: 'Ginete de Namalkah',
        source: 'herois',
        exclusiva: true,
        admissao: 'Exclusivo para nativos de Namalkah ou criados no reino. O candidato deve encontrar um mentor, integrar seu tropel e percorrer os pontos de interesse do reino. Além disso, deve viajar com seu cavalo por três outros territórios além-Reinado e superar três desafios: vencer uma corrida em cancha reta, domar um animal poderoso e derrotar um monstro. Por fim, deve relatar seus feitos ao mentor com humildade e receber o lenço das Veneráveis Hostes.',
        marca: {
            name: 'Marca da Distinção: Amalkhan',
            desc: 'Você e seu irmão cavalo desenvolvem um laço profundo. Ele passa a fornecer +1 na Defesa e em Reflexos, além de seus outros benefícios normais.'
        },
        detalhes: {
            titulo: 'Regras do Irmão Cavalo',
            conteudo: 'O irmão cavalo é um parceiro montaria (adquirido por habilidades de classe ou história) essencial para a admissão. Se o irmão cavalo morrer, você pode transformar outro parceiro cavalo em seu novo irmão através de uma ação entre aventuras.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Irmão Campestre',
                req: 'Ginete, ter um irmão cavalo',
                desc: 'Ao realizar testes de perícia montado, pode gastar 1 PM para receber +2 no teste. O bônus aumenta em +2 para cada nível de parceiro acima de iniciante (gastando +1 PM adicional).'
            },
            {
                name: 'Cavaleiro Rústico',
                req: 'Sab 1, Irmão Campestre',
                desc: 'Você soma sua Sabedoria na Defesa e seu irmão cavalo torna-se um parceiro guardião iniciante. Exige liberdade de movimentos (sem armadura pesada ou imóvel).'
            },
            {
                name: 'Coice',
                req: 'Luta ou Pontaria, Irmão Campestre',
                desc: 'Montado, você ganha arma natural de cascos (1d8 impacto). Ao usar agredir ou investida, pode gastar 1 PM para ataque extra com cascos. O dano aumenta em um passo por nível do cavalo acima de iniciante.'
            },
            {
                name: 'Caminho das Coxilhas',
                req: 'Cavaleiro Rústico',
                desc: 'Aumenta o nível de parceiro do irmão cavalo em um passo. Enquanto montado, você pode substituir testes de perícias baseadas em Destreza por testes de Cavalgar.'
            },
            {
                name: 'Irmãos Inseparáveis',
                req: 'Caminho das Coxilhas',
                desc: 'Aumenta o nível de parceiro do irmão cavalo em um passo (até mestre). Permite comunicação telepática com o animal em alcance longo.'
            }
        ]
    },
    {
        id: 'guerreiro-magico',
        name: 'Guerreiro Mágico',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser um arcanista experiente e um guerreiro capaz, tendo estudado ambos os caminhos de forma pura e separada. Deve ingressar em uma instituição de ensino prestigiosa, como a Academia Arcana, Wynlla ou Ubani, e ser aprovado em um curso básico extremamente rigoroso de um mês (podendo levar mais tempo em caso de falha nas provas) que une o treinamento físico ao conhecimento arcano.',
        marca: {
            name: 'Marca da Distinção: Arma Arcana',
            desc: 'Quando lança uma magia empunhando uma arma corpo a corpo, você recebe +2 na rolagem de dano da magia e pode usar a mão que empunha a arma para executar os gestos dela.'
        },
        poderes: [
            {
                name: 'Estilo de Combate Arcano',
                req: 'habilidade de classe Magias, treinado em Luta',
                desc: 'Escolha entre Encouraçado Místico (lança magias de armadura sem Misticismo e +1 em resistências) ou Dançarino Marcial (+1 na Defesa e dano com armas). Os bônus aumentam em +1 para cada outro poder da distinção.'
            },
            {
                name: 'Fogo e Aço',
                req: 'Estilo de Combate Arcano',
                desc: 'Quando lança uma magia, você recebe um bônus em testes de ataque e rolagens de dano com armas igual ao círculo da magia lançada até o fim do seu próximo turno (Mágico).'
            },
            {
                name: 'Aparar Magia',
                req: 'Fogo e Aço',
                desc: 'Uma vez por rodada, ao falhar em teste de resistência contra magia, pode gastar 2 PM para usar um teste de ataque no lugar. Se o ataque superar a CD por 10 ou mais, reflete o efeito contra a fonte.'
            },
            {
                name: 'Ataque Arcano',
                req: 'Fogo e Aço',
                desc: 'Uma vez por rodada, ao acertar um ataque corpo a corpo, pode gastar 2 PM para lançar uma magia (execução movimento ou padrão) como ação livre, tendo o alvo atingido como centro do efeito.'
            },
            {
                name: 'Preparação Veloz',
                req: 'Fogo e Aço',
                desc: 'Na primeira rodada de um combate, você pode lançar uma magia com alcance pessoal como uma ação livre.'
            }
        ]
    },
    {
        id: 'infiltrador-wynlla',
        name: 'Infiltrador de Wynlla',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve conquistar a confiança de uma organização secreta em Wynlla e provar talentos em magia arcana, furtividade e enganação através de testes de invasão. Após ser aceito, deve cumprir missões de espionagem fora do reino utilizando exclusivamente magia arcana. Ao retornar, é reconhecido privadamente, mantendo uma lealdade secreta ao seu patrono enquanto ganha liberdade para atuar como espião.',
        marca: {
            name: 'Marca da Distinção: Ladinagem Mágica',
            desc: 'Pode mover objetos leves em alcance curto (ação de movimento) e gastar 1 PM para realizar testes de Ladinagem (abrir fechaduras, ocultar itens, punga ou sabotar) à distância. (Mágico)'
        },
        poderes: [
            {
                name: 'Trapaça Arcana',
                req: 'Enganação, Ladinagem e Misticismo, capacidade de lançar uma magia arcana',
                desc: 'Permite lançar magias arcanas de 1º círculo (e 2º círculo com três poderes da distinção) usando Inteligência. Você aprende novas magias por poder e pode usá-las com armaduras leves sem testes de Misticismo.'
            },
            {
                name: 'Conjuração Furtiva',
                req: 'Furtividade, Magia Traiçoeira',
                desc: 'Alvos desprevenidos sofrem penalidade de –5 em testes de resistência contra suas habilidades mágicas.'
            },
            {
                name: 'Criar Armadilha Mágica',
                req: 'Trapaça Arcana',
                desc: 'Você aprende a magia Conjurar Armadilha. Se já a possuir, o custo diminui em –1 PM. (Mágico).'
            },
            {
                name: 'Disfarce Mental',
                req: 'Trapaça Arcana, Disfarce Ilusório',
                desc: 'Usa Inteligência para Enganação. Sob efeito de Disfarce Ilusório, usa Inteligência para uma perícia adequada ao disfarce e recebe +5 em resistências contra adivinhação mágica.'
            },
            {
                name: 'Enganar Item Mágico',
                req: 'Trapaça Arcana',
                desc: 'Permite usar aprimoramentos em itens mágicos mesmo sem conhecer a magia e ignorar requisitos de raça, classe ou devoção para ativar itens.'
            },
            {
                name: 'Magia Traiçoeira',
                req: 'Ataque Furtivo 3d6, Disfarce Mental',
                desc: 'Aprimoramento (+2 PM): Ao lançar magia de dano em alvos desprevenidos, pode aplicar seu Ataque Furtivo em um deles.'
            }
        ]
    },
    {
        id: 'mago-ordem-vazio',
        name: 'Mago da Ordem do Vazio',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser um arcanista experiente e redescobrir o método de conjuração da Ordem através de experimentos com um componente material único. Por meses, deve usar este componente como catalisador obrigatório (sem benefícios iniciais), proibindo-se de usar outros. A admissão se completa após vencer três desafios arcanos avançados sem nunca ter lançado uma magia sem o componente escolhido durante o treino.',
        marca: {
            name: 'Marca da Distinção: Componente Especial',
            desc: 'Você precisa gastar um componente especial mundano para lançar magias arcanas. Sem ele, você não conjura; com ele, a CD para resistir às suas magias aumenta em +2.'
        },
        detalhes: {
            titulo: 'Regras de Componentes Especiais',
            conteudo: 'Componentes especiais são itens mundanos (fios de cabelo, retalhos, etc.) de preço insignificante. Um punhado (1 espaço) serve para 5 magias. Você pode reunir um punhado por dia durante tarefas normais ou 1d3+1 punhados dedicando um dia inteiro à busca, desde que o ambiente permita encontrar o material escolhido.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Magia Experimental',
                req: 'Magias, Misticismo, um poder de aprimoramento',
                desc: 'Ao lançar magia, teste Misticismo (CD 15 + PM) para: aplicar aprimoramento que não possui (pagando custo), aplicar um que possui (sem custo) ou reduzir o custo em –1 PM. Falha anula a magia; um 1 natural gera explosão de essência em 9m (2d8 por círculo).'
            },
            {
                name: 'Conhecimento Obscuro',
                req: 'Magia Experimental',
                desc: 'Gasta 2 PM para substituir qualquer teste de perícia por Misticismo. Usos repetidos na mesma cena causam fadiga cumulativa, ignorando imunidades.'
            },
            {
                name: 'Exercitar os Músculos Arcanos',
                req: 'Magia Experimental',
                desc: 'Executa exercícios mágicos para reduzir o custo da próxima magia na cena em –1 PM. Usos repetidos na mesma cena causam fadiga cumulativa, ignorando imunidades.'
            },
            {
                name: 'Ingrediente Secreto',
                req: 'Magia Experimental',
                desc: 'Ao lançar magia de dano com teste de resistência, pode gastar PM (limite por poderes da distinção). Cada PM adiciona +2d6 de dano de essência em quem falhar no teste.'
            },
            {
                name: 'Inovação Particular',
                req: 'Magia Experimental',
                desc: 'Tentativas de anular ou dissipar suas magias exigem teste de Vontade (CD da magia +2 por poder da distinção) ou o efeito de anulação falha.'
            }
        ]
    },
    {
        id: 'mago-batalha-wynlla',
        name: 'Mago de Batalha de Wynlla',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser um arcanista e se apresentar ao Centro de Treinamento Arcano Militar em Sophand durante as janelas de recrutamento. Deve superar uma peneira inicial de testes físicos e arcanos e completar seis meses de confinamento em treinamento rigoroso. Após o treino, deve servir dois anos no exército ou superar um teste de duelo contra cinco instrutores para atuar como Mago de Batalha independente.',
        marca: {
            name: 'Marca da Distinção: Armamento Esotérico',
            desc: 'Quando você usa um item esotérico para lançar uma magia, a CD para resistir a ela aumenta em +1.'
        },
        detalhes: {
            titulo: 'Técnicas de Conjuração Magibélica',
            conteudo: 'Ao lançar uma magia, faça um teste de Misticismo (CD 10 + PM da magia + 5 por uso anterior) para aplicar uma técnica. O tempo de execução aumenta em um passo. Falha causa fadiga cumulativa.',
            arsenal: [
                { n: 'Expandir', d: 'Aumenta a área da magia em +3m (+3m por dois outros poderes da distinção).' },
                { n: 'Fortalecer', d: 'Adiciona um dado de dano (+1 dado por dois outros poderes da distinção).' },
                { n: 'Intensificar', d: 'Ignora 5 pontos de RD dos alvos (+5 para cada dois outros poderes da distinção).' },
                { n: 'Potencializar', d: 'Aumenta o limite de PM da magia em +2 (+1 para cada dois outros poderes da distinção).' }
            ]
        },
        poderes: [
            {
                name: 'Conjurador Encouraçado',
                req: 'Magias, Arcanista de 2º Círculo, Misticismo, Arcano de Batalha',
                desc: 'Ganha proficiência com armaduras pesadas e lança magias sem testes de Misticismo nelas. Recebe +1 na Defesa por outro poder da distinção.'
            },
            {
                name: 'Arsenal Arcano',
                req: 'Luta ou Pontaria, Conjurador Encouraçado',
                desc: 'Ganha proficiência com armas marciais e pode usá-las como itens esotéricos. Soma bônus da arma no Arcano de Batalha e usa atributo-chave de magia para o dano da arma.'
            },
            {
                name: 'Conjuração Magibélica',
                req: 'Conjurador Encouraçado',
                desc: 'Permite aprender técnicas de modificação de magias. Para cada poder da distinção diferente (exceto Encouraçado), pode escolher uma técnica adicional.'
            },
            {
                name: 'Guarda Mágica',
                req: 'Fortitude, Conjurador Encouraçado',
                desc: 'Ao lançar magia arcana, recebe PV temporários iguais ao total de PM gastos na magia até o próximo turno.'
            },
            {
                name: 'Infantaria Arcana',
                req: 'Guerra, Conjurador Encouraçado, 10 combates com esotérico',
                desc: 'Soma poderes da distinção ao dano do Arcano de Batalha. Criaturas que rolam 1 no teste de resistência sofrem +50% de dano.'
            }
        ]
    },
    {
        id: 'medico-salistick',
        name: 'Médico de Salistick',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato não pode ser devoto de nenhum deus. Deve pagar uma taxa de T$ 5.000 para uma audiência de avaliação no Colégio Real de Salistick, superando provas teóricas e práticas. Após aprovado, deve elaborar e defender um trabalho acadêmico original. A etapa final consiste em um semestre presencial intensivo em Salistick, culminando na "Semana de Provas", uma série de testes lendários pela sua dificuldade extrema.',
        marca: {
            name: 'Marca da Distinção: Ciências Médicas',
            desc: 'Você usa Inteligência como atributo-chave de Cura. Se já possui esse efeito, recebe +2 na perícia.'
        },
        poderes: [
            {
                name: 'Medicina Avançada',
                req: 'Foco em Perícia (Cura), Medicina',
                desc: 'Os dados de cura do seu poder Medicina aumentam para d10. A cada dois outros poderes da distinção, você pode usar Medicina uma vez adicional por criatura a cada dia.'
            },
            {
                name: 'Acompanhamento Médico',
                req: 'Medicina Avançada',
                desc: 'Reduz o tempo de primeiros socorros e uso de itens alquímicos de cura em um passo (mínimo movimento). Pode gastar 5 PM e ação completa (Cura CD 30) para ressuscitar uma criatura morta há 1 rodada com 1 PV (1/dia por criatura).'
            },
            {
                name: 'Medicina Preventiva',
                req: 'Medicina Avançada',
                desc: 'Gasta 1 hora para cuidar de pessoas (limite seu nível). Cada uma recebe 5 PV temporários e +1 em resistências por dia para cada poder da distinção que você possui.'
            },
            {
                name: 'Remédios',
                req: 'Ofício (alquimista), Medicina Avançada',
                desc: 'Preparados alquímicos de PV ou PM usados por você aumentam o efeito em +1 por dado. Pode fabricar esses itens em 10 minutos (duram até o fim da cena).'
            },
            {
                name: 'Saúde Perfeita',
                req: 'Fortitude, Acompanhamento Médico',
                desc: 'Você recebe +1 em Constituição, imunidade a veneno e +2 PM para cada poder da distinção que possui.'
            }
        ]
    },
    {
        id: 'mestre-bebado',
        name: 'Mestre Bêbado',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser hábil em combate desarmado e acrobacias, além de possuir metabolismo capaz de se embriagar (inviável para osteon). Deve treinar em uma escola tamuraniana por um mês e então encontrar um mentor isolado que se passe por um bêbado comum. Após meses de tarefas imprevisíveis e exaustivas, deve tomar três porres de bebidas lendárias (cerveja anã, saquê e dilínio) e vencer um combate desafiador em estado de embriaguez.',
        marca: {
            name: 'Marca da Distinção: Felicidade Engarrafada',
            desc: 'Você possui um recipiente místico que recupera goles diariamente. Gastar uma ação de movimento para beber fornece 1 PM temporário. O recipiente comporta 5 goles (+2 por poder da distinção).'
        },
        poderes: [
            {
                name: 'Lógica Alcoólica',
                req: 'Fortitude, Luta, Briga ou Estilo Desarmado',
                desc: 'No início de cada rodada, role 1d6 para receber um benefício aleatório: 1) +2 Ataque; 2) +2 Dano; 3) +3m Deslocamento; 4) +2 Defesa; 5) +2 Margem de Ameaça; 6) +2 Resistências. Bônus aumentam com outros poderes da distinção.'
            },
            {
                name: 'Bafo de Troll',
                req: 'Lógica Alcoólica',
                desc: 'Ação padrão (1 gole): Expele hálito horrível em alvo adjacente, deixando-o enjoado por 1d4+1 rodadas (Fortitude CD Con reduz para 1 rodada). Criaturas com Faro sofrem –5 no teste.'
            },
            {
                name: 'Bebida Revigorante',
                req: 'Lógica Alcoólica',
                desc: 'Ação de movimento: bebe 1 gole para recuperar 4d6 PV ou remover uma condição negativa (abalado, confuso, exausto, etc). Pode beber goles extras para aumentar a cura ou remover mais condições.'
            },
            {
                name: 'Luta Ridícula',
                req: 'Enganação, Lógica Alcoólica',
                desc: 'Ao fintar com sucesso, o alvo o subestima por 1 rodada (não pode fazer ações hostis exceto agredir, e sem ataques extras). Pode beber 1 gole para somar os poderes da distinção no teste de finta.'
            },
            {
                name: 'Bafo de Dragão',
                req: 'Con 3, Bafo de Troll',
                desc: 'Ação de movimento: bebe goles (limite por poderes da distinção) para sopro de fogo em cone de 9m. Causa 2d6 de dano de fogo por gole e deixa em chamas (Reflexos CD Con reduz metade e evita chamas).'
            }
        ]
    },
    {
        id: 'mestre-cozinheiro',
        name: 'Mestre Cozinheiro',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve abater seis monstros diferentes em três masmorras e cozinhar refeições com suas partes. Deve adquirir um Tomo Divino de Deauvorimm (via leilão, roubo ou achado) e, por fim, realizar um banquete delicioso para cinco pessoas usando exclusivamente ingredientes fantásticos, sem qualquer componente mundano, garantindo que ninguém sofra efeitos colaterais.',
        marca: {
            name: 'Marca da Distinção: Panela de Estimação',
            desc: 'Você recebe uma arma ou escudo proficiente que funciona como instrumento de cozinheiro e fornece +2 em Ofício (cozinheiro). Se perdido, pode ser reposto com 1 dia e T$ 100.'
        },
        detalhes: {
            titulo: 'Guia de Ingredientes Monstruosos',
            conteudo: 'Ingredientes monstruosos podem ser coletados em ambientes perigosos (1 dia, Ofício [cozinheiro] CD 20). Eles ocupam 0,5 espaço e adicionam efeitos cumulativos aos pratos especiais que você prepara.',
            arsenal: [
                { n: 'Carne Monstruosa', d: 'Fornece +5 PV temporários para cada poder da distinção que você possui.' },
                { n: 'Ervas Aromáticas', d: 'Bônus de +1d4 (escala com poderes) em um teste de Misticismo, Ofício, Percepção ou Vontade no dia.' },
                { n: 'Especiarias Picantes', d: 'Bônus de +1d4 (escala com poderes) em um teste de Acrobacia, Atletismo, Iniciativa ou Reflexos no dia.' },
                { n: 'Núcleo de Temperatura', d: 'Os bônus numéricos e em dados do prato aumentam em +1.' },
                { n: 'Raízes Curativas', d: 'Bônus de +1d4 (escala com poderes) em um teste de resistência.' },
                { n: 'Sal Azul', d: 'Fornece +1 PM temporário (+1 para cada outro poder da distinção).' }
            ]
        },
        poderes: [
            {
                name: 'Tudo que Há de Bom',
                req: 'Foco em Perícia (Ofício [cozinheiro])',
                desc: 'Permite coletar e usar ingredientes monstruosos. Ao fabricar um prato especial, pode adicionar 1 ingrediente (+1 para cada dois outros poderes da distinção).'
            },
            {
                name: 'Mise en Place',
                req: 'Tudo que Há de Bom',
                desc: 'Usa Ofício (cozinheiro) para identificar criaturas (exceto construtos/mortos-vivos) e extrair itens. Extrai 1 item consumível adicional para cada 10 pontos acima da CD.'
            },
            {
                name: 'À Moda da Casa',
                req: 'Tudo que Há de Bom',
                desc: 'Prepara pratos que combinam os efeitos de dois pratos diferentes. Pode substituir qualquer ingrediente específico de uma receita por um ingrediente monstruoso.'
            },
            {
                name: 'Guardar num potinho',
                req: 'À Moda da Casa',
                desc: 'Ao preparar um prato, pode gastar 1 ingrediente monstruoso extra para criar um lanche (ação padrão) com os mesmos benefícios. Dura 1 dia por poder da distinção.'
            },
            {
                name: 'Banquete de Aventureiros',
                req: 'Três poderes da distinção',
                desc: 'Entre aventuras, gasta ingredientes monstruosos para dar dados de auxílio (d6 ou d8 se usar 3+ ingredientes diferentes) ao grupo, usados como bônus em perícias.'
            }
        ]
    },
    {
        id: 'mestre-dos-desejos',
        name: 'Mestre dos Desejos',
        source: 'herois',
        exclusiva: true,
        admissao: 'Exclusivo para Qareen. O candidato deve realizar os desejos aparentemente inatingíveis de três mortais (sem usar truques ou soluções temporárias) e sem aceitar nada em troca. Depois, deve acompanhar um gênio verdadeiro de sua ascendência elemental, ajudando-o a servir seus amos. O passo final exige que o candidato, agindo sozinho, descubra e realize um desejo pessoal do próprio gênio que acompanhou.',
        marca: {
            name: 'Marca da Distinção: Desejo de Servir',
            desc: 'A CD para resistir às magias que você lança com sua habilidade Desejos aumenta em +2.'
        },
        detalhes: {
            titulo: 'Mecânica: Desejos Grandiosos',
            conteudo: 'Desejos Grandiosos são pedidos que impactam profundamente a vida de quem os faz e exigem grande esforço, geralmente servindo como o objetivo de uma aventura ou missão secundária. Eles são fundamentais para o despertar do poder total de um Mestre dos Desejos.',
            arsenal: []
        },
        poderes: [
            {
                name: 'O Primeiro Desejo',
                req: 'treinado em Intuição e Misticismo',
                desc: 'A redução de custo de suas magias lançadas com a habilidade Desejos muda para –2 PM.'
            },
            {
                name: 'O Segundo Desejo',
                req: 'O Primeiro Desejo',
                desc: 'Uma vez por rodada, um aliado pode gastar uma ação livre para pedir que você lance uma magia arcana de 1° círculo que você não conheça. Até o fim do seu próximo turno, você pode lançar essa magia.'
            },
            {
                name: 'Gênio da Lâmpada',
                req: 'O Primeiro Desejo, Refúgio',
                desc: 'Você recebe uma lâmpada mágica (item Minúsculo). Pode lançar Refúgio sem custo básico. Se reduzido a 0 PV, pode gastar 3 PM para ser transportado para dentro dela, estabilizando-se e recuperando vida por descanso.'
            },
            {
                name: 'Sempre Disponível',
                req: 'Gênio da Lâmpada',
                desc: 'Aprende Salto Dimensional (-1 PM no custo). Se um aliado esfregar sua lâmpada, você pode lançar essa magia sem custo básico para aparecer adjacente a ela até o fim do próximo turno.'
            },
            {
                name: 'O Último Desejo',
                req: 'O Segundo Desejo, realizar três desejos grandiosos',
                desc: 'Uma vez por aventura, você pode lançar a magia Desejo sem pagar o custo em PM (mantendo custos extras como sacrifício de PM), desde que atenda a um pedido feito por um aliado.'
            }
        ]
    },
    {
        id: 'mahou-jutsu',
        name: 'Mahou-Jutsu',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve encontrar um mestre (como Chibi ou Masaru Yudai) e provar seu valor através de desafios que testam separadamente seus punhos e sua magia. A prova mais icônica é o Círculo de Luz, onde o aluno enfrenta dois mashin de fogo (um imune a físico, outro a magia) em uma sala escura. Ao fim do treino, deve realizar um desafio invertido: superar uma prova física usando apenas magia e uma prova arcana usando apenas os punhos.',
        marca: {
            name: 'Marca da Distinção: Palma Mística',
            desc: 'Enquanto tiver pelo menos uma mão livre, você recebe +2 em testes de ataque realizados como parte de magias e na CD de suas magias arcanas contra alvos em seu alcance corpo a corpo.'
        },
        poderes: [
            {
                name: 'Mahou-Jutsu',
                req: 'lançar magias arcanas, Misticismo, Briga ou Estilo Desarmado',
                desc: 'Uma vez por rodada, ao usar a ação agredir para fazer dois ou mais ataques desarmados, pode gastar 2 PM para lançar uma magia arcana (ação livre). O círculo máximo é limitado pelo número de poderes da distinção.'
            },
            {
                name: 'Defesa da Magia',
                req: 'Mahou-Jutsu',
                desc: 'Quando lança uma magia arcana, você recebe PV temporários iguais a 5x o círculo da magia lançada, que duram até o início do seu próximo turno.'
            },
            {
                name: 'Determinação da Dor',
                req: 'Con 1, Mahou-Jutsu',
                desc: 'Soma sua Constituição em testes de Vontade para concentração. Quando sofre dano, soma sua Constituição no seu limite de PM para magias arcanas até o fim do próximo turno.'
            },
            {
                name: 'Punho Arcano',
                req: 'Mahou-Jutsu',
                desc: 'Uma vez por rodada, ao lançar uma magia arcana de toque, pode gastar 2 PM para um ataque desarmado (ação livre). Se acertar, a CD da magia aumenta em +1 (mais +1 para cada dois outros poderes).'
            },
            {
                name: 'Esplendor Vitorioso Inigualável',
                req: 'magias arcanas de 2º círculo, Punho Arcano',
                desc: 'Ao lançar magia de dano, pode gastar 10 PV para somar sua Constituição na CD e o dano básico do seu ataque desarmado ao dano da magia.'
            }
        ]
    },
    {
        id: 'mosqueteiro-rishantor',
        name: 'Mosqueteiro de Rishantor',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve superar uma rede de mentiras e sabotagens em Rishantor para encontrar o batalhão. Passa por uma sabatina ética rigorosa e investigação de histórico (qualquer desonestidade passada gera rejeição). O treinamento dura meses, servindo como guarda enquanto estuda esgrima e resiste a tentativas de corrupção da nobreza. O teste final é um duelo contra três mosqueteiros experientes para avaliar coragem e postura.',
        marca: {
            name: 'Marca da Distinção: Equipamento Real',
            desc: 'Você recebe um tabardo, um florete ou rapieira e um chapéu emplumado. Usando-os, recebe +1 em Diplomacia, ataques, dano e Defesa. Não pode ser devoto de deuses de energia negativa e deve seguir um Código de Conduta; violá-lo impede o uso de poderes da distinção até recuperar PM.'
        },
        poderes: [
            {
                name: 'Mestre Esgrimista',
                req: 'proficiência com armas marciais, Estilo de Uma Arma',
                desc: 'O multiplicador de crítico com florete e rapieira aumenta em +1. Ao atacar com essas armas, pode gastar 1 PM para rolar dois dados e usar o melhor resultado.'
            },
            {
                name: 'Um por Todos',
                req: 'Mestre Esgrimista',
                desc: 'O bônus fornecido ao Ajudar (exceto ataques) aumenta em +2. Uma vez por rodada, ao acertar um inimigo com florete ou rapieira, pode usar o resultado do ataque como um teste para ajudar o ataque de um aliado contra esse alvo.'
            },
            {
                name: 'Heroísmo Galante',
                req: 'Reflexos, Mestre Esgrimista',
                desc: 'Se um aliado adjacente for alvo de ataque, gasta 1 PM para se tornar o alvo. Se tiver todos os poderes da distinção, pode gastar 3 PM para saltar até alcance curto e interceptar o ataque (1/rodada). Exige liberdade de movimentos.'
            },
            {
                name: 'Todos Por Um',
                req: 'Duelo, Um por Todos',
                desc: 'Ao usar Duelo, pode gastar +1 PM por aliado em alcance curto (limite Carisma). Os aliados escolhidos também recebem os benefícios de Duelo contra o alvo.'
            },
            {
                name: 'Valentia',
                req: 'Mestre Esgrimista, dois outros poderes da distinção',
                desc: 'Pode lançar Heroísmo (apenas em si mesmo) como habilidade não mágica (Magia Simulada).'
            }
        ]
    },
    {
        id: 'mutagenista',
        name: 'Mutagenista',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve descobrir a existência das técnicas zarkhassianas e explorar o Deserto da Perdição para encontrar uma tabuleta com segredos mutagênicos (esforços por procuração sempre falham). Deve decifrar o idioma perdido sem o uso de magias, fabricar sua primeira beberagem fundindo partes de sua própria alma ao composto e, por fim, sobreviver à ingestão inicial, lidando com a euforia e as mutações resultantes.',
        marca: {
            name: 'Marca da Distinção: Preparação Corporal',
            desc: 'Você recebe +2 em Fortitude e Ofício (alquimista).'
        },
        detalhes: {
            titulo: 'Regras de Mutagênicos e Biochoque',
            conteudo: 'Mutagênicos duram 1 dia e só funcionam no fabricante. Ao ingerir, deve-se passar em Fortitude (CD 10 + 5 por teste no dia) ou sofrer Biochoque. Estágio 1: Enjoado; Estágio 2: Perda de 1d12 PV; Estágio 3: Confuso e em Fúria; Estágio 4: Mutações fatais e morte.',
            arsenal: [
                { n: 'Tonificante (T$ 60)', d: 'Fornece +1 em um atributo. Exaurir: Bônus aumenta para +2.' },
                { n: 'Energizante (T$ 90)', d: 'Lança uma magia de 1º círculo específica (Magia Simulada, Atrib: Con). Exaurir: Custo –1 PM.' },
                { n: 'Despersonalizante (T$ 150)', d: 'Ganha uma habilidade de raça específica. Exaurir: +1 em um atributo positivo dessa raça.' }
            ]
        },
        poderes: [
            {
                name: 'Fabricar Mutagênicos',
                req: 'Fortitude e Ofício (alquimista)',
                desc: 'Permite fabricar e usar Tonificantes. A cada dois outros poderes, permite o uso de Energizantes e Despersonalizantes, respectivamente.'
            },
            {
                name: 'Ingestão Rápida',
                req: 'Fabricar Mutagênicos',
                desc: 'Uma vez por rodada, você pode ingerir uma poção ou preparado (incluindo mutagênicos) como uma ação livre.'
            },
            {
                name: 'Mutagenia Adicional',
                req: 'Fabricar Mutagênicos',
                desc: 'O limite de mutagênicos ativos em seu corpo aumenta em +1.'
            },
            {
                name: 'Organismo Reagente',
                req: 'Mutagenia Adicional',
                desc: 'Bônus de preparados em perícias aumentam em +1; curas ou PV/PM temporários aumentam em +1 por dado. Bônus escala com outros poderes da distinção.'
            },
            {
                name: 'Potencializar Mutagênicos',
                req: 'Organismo Reagente',
                desc: 'O efeito básico de seus mutagênicos torna-se automaticamente o efeito de "Exaurir" (você ainda pode exauri-los para efeitos cumulativos).'
            }
        ]
    },
    {
        id: 'professor-magia',
        name: 'Professor de Magia',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve possuir formação na Academia Arcana ou provar saber equivalente em exames teóricos e práticos. Deve cursar seis meses de estudos avançados presenciais sobre pedagogia mágica, ética e história da instituição sem se ausentar. A etapa final consiste em um estágio probatório de um semestre ministrando aulas para uma turma; aventureiros podem levar seus alunos para o campo, mas todos devem sobreviver e ser aprovados ao fim do período.',
        marca: {
            name: 'Marca da Distinção: Pena e Pergaminho',
            desc: 'Você aprende e pode lançar uma magia de adivinhação (arcana ou divina) de qualquer círculo que você já tenha acesso.'
        },
        poderes: [
            {
                name: 'Pedagogia Mágica',
                req: 'magias de 2° círculo, Foco em Perícia (Misticismo)',
                desc: 'Gasta 1 hora e 1 PM para lecionar para alunos (limite sua Int). Escolha uma magia sua de 1º círculo; cada aluno pode lançá-la uma vez no dia (Int). Com mais poderes da distinção, alunos podem lançar mais vezes ou com custo reduzido se já a conheciam.'
            },
            {
                name: 'Introdução à Magia',
                req: 'Pedagogia Mágica',
                desc: 'Você e aliados em alcance curto recebem +2 em Misticismo e Vontade. Sempre que você lança uma magia, o custo das magias dos aliados diminui em –1 PM por 1 rodada.'
            },
            {
                name: 'Demonstrações Práticas',
                req: 'Pedagogia Mágica',
                desc: 'Quando um inimigo falha em resistência contra sua magia, você pode fazer um teste para ajudar. Até a próxima rodada, aliados em alcance curto recebem bônus em Misticismo e na CD de suas magias igual ao bônus de ajuda fornecido.'
            },
            {
                name: 'Orgulho do Mestre',
                req: 'Demonstrações Práticas',
                desc: 'Sempre que um inimigo falha contra a magia de um aliado em alcance curto (mínimo 1 PM), você recebe 1 PM temporário (limite da cena igual ao dobro de seus poderes da distinção).'
            },
            {
                name: 'Notório Saber Arcano',
                req: 'Orgulho do Mestre, dois poderes de aprimoramento',
                desc: 'Você recebe um assistente (parceiro veterano: adepto ou magivocador). O custo adicional de seus poderes de aprimoramento diminui em –1 PM para magias arcanas.'
            }
        ]
    },
    {
        id: 'pistoleiro-smokestone',
        name: 'Pistoleiro de Smokestone',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve sobreviver por meses em Smokestone e ser aceito pelos locais respeitando suas leis não escritas. Não pode usar armaduras pesadas, magias arcanas, possuir títulos de nobreza ou cultuar deuses. O passo final é desafiar um pistoleiro experiente para um duelo de pistolas até a morte. Há boatos de um contrato de sangue assinado com um estranho na noite após o duelo, selando o destino do novo pistoleiro.',
        marca: {
            name: 'Marca da Distinção: Honra do Pistoleiro',
            desc: 'Você recebe +2 em rolagens de dano com armas de fogo leves e de uma mão. Entretanto, você passa a seguir o Código do Pistoleiro.'
        },
        detalhes: {
            titulo: 'O Código do Pistoleiro',
            conteudo: 'Um pistoleiro não usa armaduras pesadas, escudos ou armas que não sejam de fogo leves/uma mão (exceto adagas). É proibido lançar magias, ter títulos oficiais ou cultuar deuses. Promessas feitas são lei. Violar o código zera seus PM até o próximo dia.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Rápido no Gatilho',
                req: 'proficiência com armas de fogo, Saque Rápido',
                desc: 'Recebe +2 em Iniciativa por poder da distinção. Se for o primeiro a agir, inimigos ficam desprevenidos. O multiplicador de crítico contra alvos desprevenidos aumenta em +1.'
            },
            {
                name: 'Buscar Cobertura',
                req: 'Rápido no Gatilho',
                desc: 'Uma vez por rodada (1 PM), pode se mover até uma cobertura dentro do seu deslocamento (caminho desimpedido).'
            },
            {
                name: 'Morrer Não É Muita Vida',
                req: 'Buscar Cobertura',
                desc: 'Recebe +2 na Defesa e Reflexos ao se mover 6m ou mais. Uma vez por cena, pode ignorar um dano que o levaria a 0 PV ou menos.'
            },
            {
                name: 'Balada do Pistoleiro',
                req: 'Morrer Não É Muita Vida',
                desc: 'Ação completa: gasta PM (limite de munição) para atacar inimigos escolhidos (um por PM). Faz uma única rolagem de dano com um dado extra do mesmo tipo para todos os atingidos.'
            },
            {
                name: 'Fornecedor de Smokestone',
                req: 'Rápido no Gatilho',
                desc: 'Em comunidades (vila ou maior), gasta 2 PM para teste de Carisma (CD 10). Sucesso garante 20% de desconto em armas de fogo/munição e manutenção garantida.'
            },
            {
                name: 'Viajante das Planícies',
                req: 'Cavalgar, Rápido no Gatilho',
                desc: 'Recebe cavalo de guerra veterano (ou torna montaria atual vigilante iniciante). Não sofre penalidade de ataque à distância enquanto montado.'
            }
        ]
    },
    {
        id: 'senador',
        name: 'Senador',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve ser um cidadão de plenos direitos do Império de Tauron. Deve cumprir o "Curso de Honra": primeiro servir em uma legião e, em seguida, exercer um cargo burocrático ou de assistência no Império. Após essas etapas, deve fixar-se em Tiberus para angariar base eleitoral, gastando recursos e influência em campanha. A admissão final ocorre apenas se o candidato vencer uma eleição para o cargo.',
        marca: {
            name: 'Marca da Distinção: Retórica Impecável',
            desc: 'Você recebe +2 em Nobreza e pode usar Carisma como atributo-chave desta perícia (em vez de Inteligência).'
        },
        detalhes: {
            titulo: 'O Curso de Honra',
            conteudo: 'A vida pública em Tapista segue uma trajetória rígida: 1. Serviço Militar (essencial para ingressar na política); 2. Serviço Público (cargos burocráticos e administrativos); 3. Senado (vaga conquistada por eleição); 4. Governo (posto vitalício em províncias); 5. Triunvirato (o ápice do poder imperial).',
            arsenal: []
        },
        poderes: [
            {
                name: 'Cofres Fundos',
                req: 'treinado em Diplomacia e Nobreza',
                desc: 'Uma vez por aventura, requisita fundos do Senado (teste de Carisma com +4 por poder da distinção). Com 3 poderes, recebe um item mágico menor (deve ser devolvido); com 5 poderes, o item pode ser médio.'
            },
            {
                name: 'Um Minotauro de Bem',
                req: 'Cofres Fundos',
                desc: 'Recebe +1 em perícias de Carisma e na CD de seus testes de Vontade. Para cada outro poder da distinção, esses bônus aumentam em +1.'
            },
            {
                name: 'Deliberação Desnorteante',
                req: 'Cofres Fundos',
                desc: 'Ao usar uma habilidade que exige teste de Vontade, pode gastar 1 PM. Criaturas que falharem ficam pasmas por 1 rodada (uma vez por cena).'
            },
            {
                name: 'Apoio Popular',
                req: 'Um Minotauro de Bem',
                desc: 'Ganha o poder Autoridade Feudal. Se já o possui, pode ter dois parceiros. O nível deles aumenta (veterano/mestre) para cada dois outros poderes da distinção.'
            },
            {
                name: 'Inocência Convicta',
                req: 'Um Minotauro de Bem',
                desc: 'Ao falhar em teste de resistência, gasta 2 PM para rolar novamente usando Nobreza (com bônus igual aos poderes da distinção) no lugar da perícia original.'
            }
        ]
    },
    {
        id: 'vigarista',
        name: 'Vigarista',
        source: 'herois',
        exclusiva: false,
        admissao: 'O candidato deve primeiro aceitar que é um "otário" e buscar ser enganado por golpistas reais para entender a mecânica da vigarice na prática. Após cair em diversos golpes e perder o que tem, deve atravessar a linha da malícia e aplicar um grande golpe bem-sucedido (como vender relíquias falsas ou criar esquemas de pirâmide). Se for desmascarado ou perder os lucros logo em seguida, o processo falhou e deve ser reiniciado do zero.',
        marca: {
            name: 'Marca da Distinção: Tirar Leite de Pedra',
            desc: 'Você pode usar Enganação para sustento com golpes rápidos (leva 1 dia em vez de uma semana). Recebe bônus de +2 em cidades, +5 em vilas e +10 em aldeias. Se falhar, não pode repetir na comunidade por um mês; um 1 natural desmascara você perante a multidão.'
        },
        poderes: [
            {
                name: 'Aquele Papinho',
                req: 'treinado em Enganação, Aparência Inofensiva',
                desc: 'Recebe +1 em Diplomacia, Enganação, Intuição e na CD de habilidades de Carisma (exceto magias). O bônus aumenta em +1 para cada outro poder da distinção.'
            },
            {
                name: 'Calma Lá',
                req: 'Aquele Papinho',
                desc: 'Não sofre penalidade para mudar atitude com ação completa. No início do combate, pode tentar mudar a atitude de um inimigo antes de todos agirem; se ele ficar indiferente ou melhor, fica pasmo por 1 rodada.'
            },
            {
                name: 'Efeito Placebo',
                req: 'Aquele Papinho',
                desc: 'Escolha magias de 1º círculo (uma por poder da distinção). Pode gastar uma ação completa e 3 PM para criar uma poção instantânea dessas magias. O custo é metade e não exige teste de Ofício, mas a poção dura apenas até o fim da cena.'
            },
            {
                name: 'Na Cara Não!',
                req: 'Aquele Papinho, Rolamento Defensivo',
                desc: 'Sempre que utilizar o poder Rolamento Defensivo, você recebe um uso adicional da habilidade Aparência Inofensiva para ser usado na mesma cena.'
            },
            {
                name: 'Relíquias Sagradas',
                req: 'Calma Lá, Efeito Placebo',
                desc: 'Transforma item mundano em acessório mágico menor (1h de trabalho, 1/100 do preço). Para ativar, deve empunhar e gastar ação de movimento e 2 PM professando seus poderes. Funciona até o fim da cena (limite de itens por poder da distinção).'
            }
        ]
    },
    {
        id: 'bufao-hyninn',
        name: 'Bufão de Hyninn',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ser devoto de Hyninn e ter servido como bobo da corte de um nobre específico por pelo menos um mês, testando os limites da zombaria. Após isso, deve realizar três "peças" cruéis contra vítimas inteligentes: a primeira deve causar ferimento sério ou prejuízo econômico; a segunda, uma perda irremediável (como expulsão de uma ordem); e a terceira deve custar a vida da vítima. Em todos os casos, o bufão deve fazer uma terceira pessoa rir da desgraça alheia.',
        marca: {
            name: 'Marca da Distinção: Chapéu do Bobo',
            desc: 'Você recebe um gorro com guizos (não ocupa espaço). Ele permite usar Músicas de Bardo sem instrumentos e fornece +2 em Atuação e Enganação, mas impõe –2 em Diplomacia e Intimidação.'
        },
        detalhes: {
            titulo: 'Cabriolas de Bobo',
            conteudo: 'Cabriolas contam como Música de Bardo. Você escolhe duas inicialmente e mais uma para cada outro poder da distinção que possuir.',
            arsenal: [
                { n: 'Deboche Mágico', d: 'Teste de Atuação vs Vontade. Se o alvo falhar, sua próxima habilidade mágica falha e os PM são perdidos.' },
                { n: 'Humor Macabro', d: 'Quando o alvo sofre dano, outra criatura pode fazer um ataque corpo a corpo contra ele como reação.' },
                { n: 'Humor Macabro em Massa', d: 'Como o anterior, mas afeta todos os inimigos no alcance. (Req: Humor Macabro).' },
                { n: 'Imitação Irritante', d: 'Teste de Atuação vs Vontade. O alvo sofre -5 em perícias que já usou nesta cena até seu próximo turno.' },
                { n: 'Passo Hilariante', d: 'Teste de Atuação vs Vontade. Alvo fica pasmo (1 rodada) e vulnerável (1d4+1 rodadas).' },
                { n: 'Passo Hilariante em Massa', d: 'Como o anterior, mas em área. (Req: Passo Hilariante).' },
                { n: 'Pirueta Desajeitada', d: 'Inimigos que falham em Vontade ficam enredados (1d4+1 rodadas) e caídos.' },
                { n: 'Rir da Desgraça Alheia', d: 'Sempre que o alvo falha em uma perícia, sofre -1 cumulativo nela até o fim da cena.' }
            ]
        },
        poderes: [
            {
                name: 'Cabriolas de Bobo',
                req: 'devoto de Hyninn, treinado em Acrobacia e Atuação',
                desc: 'Você aprende duas cabriolas do quadro de habilidades da distinção.'
            },
            {
                name: 'Arremedar',
                req: 'Cabriolas de Bobo',
                desc: 'Uma vez por rodada, pode imitar um teste de perícia de uma criatura em alcance curto. Faça um teste de Atuação para ajudar, mas aplique o bônus como uma penalidade ao teste do alvo.'
            },
            {
                name: 'Quem Ri Por Último…',
                req: 'Cabriolas de Bobo',
                desc: 'Enquanto for o último na iniciativa, recebe +1 em perícias e na CD de habilidades contra quem já agiu (+1 para cada dois outros poderes).'
            },
            {
                name: 'Rir de Tudo',
                req: 'Arremedar',
                desc: 'Uma vez por cena, gasta 3 PM para usar Atuação em um teste de resistência. Se passar, reverte o efeito: dano vira PV temporário e penalidades viram bônus até o fim da cena.'
            },
            {
                name: 'Piada Mortal',
                req: 'Cabriolas de Bobo, Canção Assustadora',
                desc: 'Ação completa (6 PM). Teste de Atuação vs Vontade. Se vencer, o alvo (Int -3 ou mais) deve usar sua próxima ação padrão para atacar a si mesmo da forma mais eficiente possível.'
            }
        ]
    },
    {
        id: 'cavaleiro-da-luz',
        name: 'Cavaleiro da Luz',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ser apadrinhado por um Cavaleiro da Luz de boa reputação, que empenha sua própria honra no processo. Deve provar seu valor ao padrinho (através de missões heroicas, histórico nobre ou serviço humilde) e vencer um cavaleiro experiente em um duelo não letal. Deve ser capaz de usar armaduras pesadas, cavalgar e não pode ser devoto de deuses traiçoeiros.',
        marca: {
            name: 'Marca da Distinção: Etiqueta da Ordem da Luz',
            desc: 'Você segue o Código de Honra (Cavaleiro) e as Obrigações de Khalmyr. Soma seu Carisma em Guerra e Nobreza, e consegue hospedagem e informações em locais afiliados à Ordem.'
        },
        detalhes: {
            titulo: 'A Cerimônia de Sagração',
            conteudo: 'O cavaleiro deve jurar defender a vida, ter coragem, ser piedoso, sábio, vigilante e justo perante os deuses. Ao final, deve recitar: "Ofereço minha honra e minha vontade à Luz", aceitando a irmandade acima de qualquer brasão ou propósito pessoal.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Ataque Subjugante',
                req: 'treinado em Luta, Car 1',
                desc: 'Ao atacar corpo a corpo, gasta 2 PM para somar Carisma no teste e +1d8 no dano (se já soma Carisma no ataque, recebe +2 no teste). Se acertar, o alvo fica vulnerável.'
            },
            {
                name: 'Alcunha',
                req: 'Ataque Subjugante',
                desc: 'Em testes de perícia baseadas em Carisma, pode gastar PM (limite de poderes da distinção) para receber +2 de bônus por cada PM gasto.'
            },
            {
                name: 'Alazão Impressionante',
                req: 'treinado em Cavalgar, Ataque Subjugante',
                desc: 'Recebe um cavalo de guerra veterano (ou torna montaria atual ajudante iniciante). Se perder a montaria, pode obter outra no Castelo da Luz.'
            },
            {
                name: 'Armadura da Integridade',
                req: 'treinado em Diplomacia, Alcunha',
                desc: 'Na primeira rodada, gasta ação de movimento e 3 PM para teste de Diplomacia. Para cada 10 no resultado, inimigos em alcance médio sofrem –1 no dano até o fim da cena.'
            },
            {
                name: 'Chamado às Armas',
                req: 'Comandar, quatro outros poderes de Cavaleiro da Luz',
                desc: 'Uma vez por rodada, gasta ação de movimento e 3 PM. Até o início do seu próximo turno, você e aliados em alcance curto que fizerem a ação agredir podem fazer um ataque adicional.'
            }
        ]
    },
    {
        id: 'cavaleiro-khalmyr',
        name: 'Cavaleiro de Khalmyr',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve viajar ao Mosteiro de Khalmyr nas Montanhas Lannestul e ser aceito por um Líder de Destacamento. Após um mês de instrução, recebe a "Primeira Bênção" e deve renunciar a títulos, sobrenomes e posses que não possa carregar. Deve realizar uma peregrinação de um ano combatendo o mal e, ao retornar, ser aprovado pela Alta Cúpula (Segunda Bênção) antes de passar por um rito de meditação e banho gelado.',
        marca: {
            name: 'Marca da Distinção: Seguir a Norma',
            desc: 'Você segue o Código da Norma e recebe +2 em Fortitude e Vontade.'
        },
        detalhes: {
            titulo: 'O Código da Norma e a Sagração',
            conteudo: 'Proibido: mentir, roubar, possuir títulos, residência fixa (>30 dias) ou itens mágicos de não devotos. Deve carregar apenas o que cabe na montaria. Violar o código zera seus PM até o dia seguinte. A cerimônia exige aceitar um destino de suplício e pobreza absoluta em nome da justiça.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Vitória da Ordem',
                req: 'devoto de Khalmyr, treinado em Luta',
                desc: 'Ao atacar corpo a corpo, gasta 2 PM para somar Sabedoria no teste de ataque (ou +2 se já soma) e +1d8 no dano.'
            },
            {
                name: 'Campeão Abnegado',
                req: 'Ao Sabor do Destino, Vitória da Ordem',
                desc: 'Dobra os bônus concedidos pelo poder Ao Sabor do Destino. Permite o uso de itens litúrgicos de Khalmyr sem perder os benefícios do poder.'
            },
            {
                name: 'Graça de Khalmyr',
                req: 'Sab 2, Vitória da Ordem',
                desc: 'Ao fazer um teste de resistência ou sofrer ataque, gasta PM (limite sua Sab). Cada PM gasto fornece +2 no teste ou na Defesa contra aquele ataque.'
            },
            {
                name: 'Corcel Santificado',
                req: 'treinado em Cavalgar, Vitória da Ordem',
                desc: 'Recebe um cavalo de guerra veterano (ou torna montaria atual guardião iniciante). Pode recuperar a montaria no Mosteiro de Khalmyr se a perder.'
            },
            {
                name: 'Manto da Justiça',
                req: 'Vitória da Ordem e dois outros poderes da distinção',
                desc: 'Gasta 3 PM para sustentar uma aura de 9m. Você fica imune a medo e efeitos mentais; aliados recebem RD igual sua Sabedoria; inimigos que iniciam o turno na aura ficam enjoados (Vontade CD Sab evita).'
            }
        ]
    },
    {
        id: 'colecionador-monstruoso',
        name: 'Colecionador Monstruoso',
        source: 'deuses',
        exclusiva: true,
        admissao: 'Exclusivo para druidas de Megalokk. O candidato deve viver um mês como um monstro, rejeitando ciclos naturais e autopreservação, caçando presas desafiadoras e agindo com destruição pura. Ao fim, deve caçar sozinho, sem equipamentos, um monstro de poder equivalente ao seu, matá-lo e devorá-lo por inteiro para iniciar sua coleção. Para novas formas, deve participar do combate e devorar a maior parte do corpo da criatura.',
        marca: {
            name: 'Marca da Distinção: Através da Selvageria',
            desc: 'Ao usar Forma Selvagem, seu tipo muda para monstro e você recebe +1 no multiplicador de crítico com armas naturais.'
        },
        detalhes: {
            titulo: 'Habilidades de Transformação Monstruosa',
            conteudo: 'Ao usar Forma Monstruosa, você gasta PM extras para ganhar habilidades de monstros que já derrotou e devorou.',
            arsenal: [
                { n: 'Agarrar Aprimorado (+1 PM)', d: 'Ganha +2 em testes de agarrar e pode agarrar como ação livre ao acertar ataque.' },
                { n: 'Arma Natural Extra (+1 PM)', d: 'Recebe arma natural (1d6) e pode fazer ataque extra com ela por 1 PM.' },
                { n: 'Borrão de Tigre (+2 PM)', d: 'Ataques contra você têm 25% de chance de falha (pode dobrar para 50%).' },
                { n: 'Brutalidade de Razza’kham (+1 PM)', d: 'Dados de dano máximo em armas naturais geram dados extras.' },
                { n: 'Carapaça Espinhosa (+1 PM)', d: 'Atacantes corpo a corpo sofrem 1d6 + Con de dano de perfuração.' },
                { n: 'Dilacerar (+1 PM)', d: 'Causa +2d8 de dano se acertar dois ataques de garra no mesmo alvo.' },
                { n: 'Meiose Glópica (+1 PM)', d: 'Invoca 1d4+2 glops (1 PV) que causam dano ou podem ser sacrificados para reduzir dano sofrido à metade.' },
                { n: 'Órgão Elemental (+1 PM)', d: 'Uma arma natural causa +1d6 de dano de ácido, eletricidade, fogo ou frio.' },
                { n: 'Regeneração (+1 PM)', d: 'Gasta 1 PM para receber Cura Acelerada 5 até curar 30 PV ou fim da cena.' },
                { n: 'Tentáculos (+1 PM)', d: 'Uma arma natural recebe +3m de alcance.' },
                { n: 'Veneno (+2 PM)', d: 'Uma arma natural causa 1d12 de perda de vida por veneno.' }
            ]
        },
        poderes: [
            {
                name: 'Forma Monstruosa',
                req: 'Forma Selvagem, devoto de Megalokk',
                desc: 'Ao usar Forma Selvagem, gasta PM adicionais (limite de poderes da distinção) para ativar habilidades de criaturas devoradas.'
            },
            {
                name: 'Predação Monstruosa',
                req: 'Forma Monstruosa',
                desc: 'Ação completa: devora monstro abatido para ganhar +10 PV, +1 em ataque e dano com armas naturais até o fim da aventura (acumulável).'
            },
            {
                name: 'Vigor Monstruoso',
                req: 'Forma Monstruosa',
                desc: 'Ao usar Forma Selvagem, cada 1 PM gasto na habilidade fornece 3 PV temporários.'
            },
            {
                name: 'Selvageria Incontrolável',
                req: 'Vigor Monstruoso',
                desc: 'Em Forma Selvagem, não fica inconsciente com 0 PV ou menos (ainda morre se chegar em metade dos PV negativos).'
            },
            {
                name: 'Monstro Supremo',
                req: 'Forma Selvagem Superior, ter devorado um kaiju',
                desc: 'Ganha subtipo kaiju, imunidade a efeitos mentais, medo, metamorfose, paralisia, veneno e ataques ignoram 20 de RD.'
            }
        ]
    },
    {
        id: 'dancarina-marah',
        name: 'Dançarina de Marah',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ser devoto de Marah e superar testes rigorosos de coreografia, cultura e resistência física em um convento. Após uma estação de isolamento absoluto dedicada à arte e à paz, deve resolver um conflito significativo (como rusgas entre nobres ou ameaças de invasão) utilizando exclusivamente uma apresentação de dança. O processo termina com a apresentação de uma coreografia autoral que narre a resolução do conflito perante uma banca de mestres.',
        marca: {
            name: 'Marca da Distinção: Graça de Marah',
            desc: 'Você soma sua Sabedoria em Atuação e pode substituir testes de Diplomacia por testes de Atuação.'
        },
        poderes: [
            {
                name: 'Transe Dançante',
                req: 'Foco em Perícia (Atuação), dois poderes concedidos de Marah',
                desc: 'Gasta 3 PM para gerar aura de 9m. Requer deslocar-se 6m por turno para manter. Você e aliados na aura recebem ação de movimento adicional e +2 na Defesa e resistências (bônus aumenta com outros poderes).'
            },
            {
                name: 'Contrapasso do Espírito',
                req: 'Transe Dançante',
                desc: 'Enquanto em Transe Dançante, você e aliados na aura recebem PV temporários iguais a 5 + Carisma no início de cada turno.'
            },
            {
                name: 'Êxtase da Dançarina',
                req: 'Transe Dançante',
                desc: 'Enquanto em Transe Dançante, soma o bônus do transe na CD de testes de Vontade de suas habilidades contra criaturas na aura.'
            },
            {
                name: 'No Ritmo da Magia',
                req: 'Transe Dançante',
                desc: 'Em Transe Dançante, pode lançar Salto Dimensional. Se já conhecer a magia, o custo dela diminui em –1 PM durante o transe.'
            },
            {
                name: 'Dança Hipnótica',
                req: 'Êxtase da Dançarina, três poderes concedidos de Marah',
                desc: 'Em Transe Dançante, a atitude de cada inimigo na aura melhora em um passo (1/cena) e ele fica fascinado (Vontade CD Car evita e concede imunidade na cena).'
            }
        ]
    },
    {
        id: 'detetive-tanna-toh',
        name: 'Detetive de Tanna-Toh',
        source: 'deuses',
        exclusiva: false,
        admissao: 'Exclusivo para devotos de Tanna-Toh. O candidato deve dominar disciplinas como leis, organizações criminosas, ladinagem, furtividade, interrogatório, alquimia e lógica. A prova final exige a solução de um mistério real e complexo (frequentemente um caso antigo considerado insolúvel), reunindo peças e provas materiais que apontem o culpado às autoridades através da dedução pura.',
        marca: {
            name: 'Marca da Distinção: Nada Além de Fatos',
            desc: 'Você recebe +5 em Intuição e Investigação.'
        },
        detalhes: {
            titulo: 'Rede de Informantes',
            conteudo: 'Informantes são NPCs especialistas que auxiliam o detetive de seus lares ou locais de trabalho. O benefício exige contato ou visita ao informante. Uma vez por aventura, você pode realocar sua rede para uma nova região.',
            arsenal: [
                { n: 'Aristocrata', d: 'Permite usar o poder Favor (ou recebe +5 no teste se já o possui).' },
                { n: 'Armeiro', d: 'Usa Investigação para identificar armas; concede uma melhoria temporária em um item por aventura.' },
                { n: 'Boticário', d: 'Usa Investigação para identificar itens alquímicos; fornece T$ 200 em itens por poder da distinção por aventura.' },
                { n: 'Curandeiro', d: 'Usa Investigação para necropsia; fornece três doses de cura acelerada 5 experimental por aventura.' },
                { n: 'Erudito', d: 'Concede dados de consulta (4d4 por poder da distinção) para bônus em testes de Inteligência ou Sabedoria.' },
                { n: 'Estalajadeiro', d: 'Garante descanso luxuoso e permite rolar dois dados em testes de Investigação para interrogar.' }
            ]
        },
        poderes: [
            {
                name: 'Traçar Perfil',
                req: 'devoto de Tanna-Toh, Investigador, Mente Analítica',
                desc: 'Usa Investigação para identificar criaturas inteligentes. Pode gastar 2 PM para receber +1 em perícias e na CD de habilidades contra o alvo para cada poder da distinção até o fim da cena.'
            },
            {
                name: 'Classificar como Suspeito',
                req: 'Traçar Perfil',
                desc: 'Transforma um alvo de Traçar Perfil em suspeito (limite por poderes da distinção). Bônus duram a aventura toda e você rola dois dados em Investigação e Intuição contra ele.'
            },
            {
                name: 'Elementar',
                req: 'Traçar Perfil',
                desc: 'Analisa cena de crime (10 min). Permite identificar e usar Traçar Perfil contra o responsável (mesmo ausente) se o evento ocorreu há até 2 dias por poder da distinção.'
            },
            {
                name: 'Sequência Dedutiva',
                req: 'Traçar Perfil',
                desc: 'Sucesso em Investigação ou deduções do jogador garantem bônus cumulativo de +1 (limite por poderes da distinção) em perícias de Int, Sab e Car na aventura. Falhas em Investigação reduzem o bônus.'
            },
            {
                name: 'Informantes',
                req: 'Traçar Perfil',
                desc: 'Você recebe um informante do quadro de detalhes. Ganha um informante adicional para cada outro poder desta distinção.'
            }
        ]
    },
    {
        id: 'exegeta-akzath',
        name: 'Exegeta do Akzath',
        source: 'deuses',
        exclusiva: false,
        admissao: 'A admissão depende da posição do candidato no Akzath, aproximando-se de conceitos como Conhecimento, Mudança ou Morte através de experiências de quase morte, isolamento ou peregrinação. O candidato compreende que sua identidade e passado podem ser alterados pelo Akzath, alinhando sua existência ao destino traçado por Thwor.',
        marca: {
            name: 'Marca da Distinção: Compreender o Akzath',
            desc: 'No início de cada cena, escolha uma perícia. Até o fim da cena, você pode gastar 1 PM para substituir qualquer teste dessa perícia por um teste de Religião.'
        },
        detalhes: {
            titulo: 'O Funcionamento dos Círculos',
            conteudo: 'Você pode escolher conceitos do Círculo Externo até três vezes (devem ser adjacentes no diagrama) e do Círculo Interno até duas vezes (respeitando o pré-requisito do Externo correspondente). Uma vez por dia, você pode alterar todas as suas escolhas.',
            arsenal: []
        },
        poderes: [
            /* --- CÍRCULO EXTERNO --- */
            {
                name: 'Vida (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Quando você ou um aliado em alcance curto morre, pode gastar 3 PM para que a criatura se mantenha viva por mais 1 rodada. Funciona mesmo se você estiver inconsciente.'
            },
            {
                name: 'Ignorância (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Quando uma criatura em alcance curto faz teste de perícia ou usa habilidade com CD, pode gastar 3 PM para impor penalidade de –5 nesse teste ou CD.'
            },
            {
                name: 'Mudança (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Pode rezar uma Missa especial: cada participante escolhe uma característica e substitui seu atributo-chave por outro à escolha pela duração do efeito.'
            },
            {
                name: 'Fim (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Ação completa (5 PM): encerra a cena atual e inicia uma nova imediatamente. Reseta durações de "cena" e "10 minutos", mas exige nova Iniciativa.'
            },
            {
                name: 'Morte (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Recupera 1d8 PV ao remover sangramento ou ao causar crítico/abater inimigo. Excedente vira PV temporário (limite dobro do nível).'
            },
            {
                name: 'Conhecimento (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Gasta 3 PM para que você e aliados em alcance curto recebam os benefícios de serem treinados em uma perícia escolhida até o fim da cena.'
            },
            {
                name: 'Continuidade (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Uma vez por rodada, se um efeito instantâneo é usado em alvo em alcance curto, gasta 3 PM para que o efeito se repita no mesmo alvo na rodada seguinte.'
            },
            {
                name: 'Início (Externo)',
                req: 'Religião, devoto de Thwor',
                desc: 'Gasta 3 PM na primeira rodada da cena para ganhar 1 turno extra (bolha temporal).'
            },
            /* --- CÍRCULO INTERNO --- */
            {
                name: 'Nós (Interno)',
                req: 'Conceito: Vida',
                desc: 'No início do dia, escolhe aliados (limite Sab). Vocês compartilham um total de PV único. Se o total zerar, todos caem simultaneamente.'
            },
            {
                name: 'Dentro (Interno)',
                req: 'Conceito: Ignorância',
                desc: 'Quando lança uma magia com alcance pessoal, você recebe +2 PM gratuitos para gastar em aprimoramentos dessa magia.'
            },
            {
                name: 'Estagnação (Interno)',
                req: 'Conceito: Mudança',
                desc: 'Ação padrão (3 PM): gera pulso em esfera de 6m. Criaturas na área devem passar em Vontade (CD Sab) ou têm todos os efeitos de duração maior que instantânea dissipados.'
            },
            {
                name: 'Trevas (Interno)',
                req: 'Conceito: Fim',
                desc: 'Ao usar habilidade mágica com teste de resistência, gasta 1 PM. Se o alvo falhar, ele não pode recuperar PV por 1 rodada.'
            },
            {
                name: 'Fora (Interno)',
                req: 'Conceito: Morte',
                desc: 'Ao usar habilidade mágica de área, gasta 1 PM para excluir da área uma quantidade de alvos igual à sua Sabedoria.'
            },
            {
                name: 'Eles (Interno)',
                req: 'Conceito: Conhecimento',
                desc: 'Inimigos percebidos em alcance curto sofrem –2 em testes de ataque e dano contra você (penalidade aumenta para –5 em alcance médio).'
            },
            {
                name: 'Movimento (Interno)',
                req: 'Conceito: Continuidade',
                desc: 'Uma vez por rodada, se criatura em alcance curto for se deslocar, gasta 2 PM (Fort CD Sab evita). Se falhar, ela perde o movimento e você ganha uma ação de movimento extra no próximo turno.'
            },
            {
                name: 'Luz (Interno)',
                req: 'Conceito: Início',
                desc: 'Sempre que rolar valor máximo em dado de cura ou dano de luz, role um dado extra (repetível até o limite do valor máximo do dado).'
            },
            {
                name: 'Interno: Eles',
                req: 'Conhecimento.',
                desc: 'Inimigos em alcance curto que você possa perceber sofrem uma penalidade de –2 em testes de ataque e rolagens de dano contra você. Essa penalidade aumenta para –5 se estiverem em alcance médio.'
            },
            {
                name: 'Interno: Fora',
                req: 'Morte.',
                desc: 'Quando usa uma habilidade mágica com efeito em área, você pode gastar 1 PM. Se fizer isso, você pode excluir da área afetada uma quantidade de alvos igual a sua Sabedoria.'
            },
            {
                name: 'Interno: Nós',
                req: 'Vida.',
                desc: 'No início de cada dia, escolha um número de aliados até o valor de sua Sabedoria. Até o final do dia, em vez de pontos de vida individuais, você e esses aliados compartilham de um total de PV igual à soma dos PV de cada um. Dano, recuperação e perda de vida são todos aplicados a esse total (após aplicar quaisquer habilidades, como RD, do alvo original do dano). Entretanto, se o total de PV acabar, todos os personagens sofrem os efeitos de serem reduzidos a 0 PV ou menos (e cada um ainda morre no seu limite individual de pontos de vida).'
            },
            {
                name: 'Interno: Luz',
                req: 'Início.',
                desc: 'Sempre que rolar o resultado máximo em um dado de cura ou dano de luz, role um dado extra e some ao resultado, repetindo até um limite de dados extras igual ao valor máximo do dado.'
            },
            {
                name: 'Externo: Continuidade',
                req: '—',
                desc: 'Uma vez por rodada, quando uma habilidade ou item com duração instantânea é usada em um alvo em alcance curto, você pode gastar 3 PM para que esse efeito seja usado novamente na rodada seguinte sobre o mesmo alvo. Você não pode usar este poder em um efeito que já tenha sido repetido por ele.'
            },
            {
                name: 'Interno: Trevas',
                req: 'Fim.',
                desc: 'Quando usa uma habilidade mágica que possui teste de resistência, você pode gastar 1 PM. Se fizer isso, alvos que falharem na resistência não podem recuperar pontos de vida por 1 rodada.'
            },
            {
                name: 'Círculo Interno',
                req: '—',
                desc: 'A proximidade com todos os aspectos do Akzath é uma consequência natural para o exegeta. Escolha um dos conceitos abaixo presentes na roda interna do Akzath. Você recebe a habilidade relacionada. Você pode escolher este poder até duas vezes para conceitos diferentes. Cada conceito possui como pré-requisito um dos conceitos do Círculo Externo. Quando troca os poderes do Círculo Externo, você também pode trocar os do Círculo Interno. Diagrama do Akzath'
            },
            {
                name: 'Interno: Dentro',
                req: 'Ignorância.',
                desc: 'Quando lança uma magia com alcance pessoal, você recebe +2 PM para gastar em aprimoramentos.'
            },
            {
                name: 'Externo: Início',
                req: '—',
                desc: 'Você pode gastar 3 PM para criar uma bolha temporal, dentro da qual o tempo passa mais devagar. Isso funciona como congelar o tempo da magia Controlar o Tempo (Tormenta20, p. 187), exceto que a bolha fornece apenas 1 turno extra. Este efeito só funciona na primeira rodada de cada cena.'
            },
            {
                name: 'Externo: Vida',
                req: '—',
                desc: 'Quando você ou um aliado em alcance curto morre, você pode gastar 3 PM para que a criatura se mantenha viva por mais 1 rodada. Ela ainda sofre os demais efeitos do evento que a matou (como dano, condições etc.) e irá morrer na rodada seguinte, a menos que eles sejam revertidos ou dissipados. Você pode usar esta habilidade mesmo que esteja inconsciente.'
            },
            {
                name: 'Externo: Fim',
                req: '—',
                desc: 'Você pode gastar uma ação completa e 5 PM para encerrar a cena atual e iniciar uma nova imediatamente. Isso encerra todos os efeitos com duração cena ou de até 10 minutos, mas permite que habilidades com usos limitados pela cena possam ser usadas novamente. Se os participantes da cena haviam rolado Iniciativa, ela deverá ser rolada novamente. Esta habilidade não afeta os eventos narrativos, apenas a duração da cena, e não pode ser usada em uma cena iniciada por ela mesma.'
            },
            {
                name: 'Interno: Movimento',
                req: 'Continuidade.',
                desc: 'Uma vez por rodada, quando uma criatura em alcance curto vai fazer uma ação de movimento para se deslocar, você pode gastar 2 PM. Se fizer isso, a criatura deve fazer um teste de Fortitude (CD Sab). Se falhar, ela perde a ação de movimento e você recebe uma ação de movimento adicional em seu próximo turno.'
            },
            {
                name: 'Externo: Mudança',
                req: '—',
                desc: 'Você pode rezar uma Missa (Tormenta20, p. 58) especial. Cada participante pode escolher uma característica que possui um atributo-chave (como Defesa, uma habilidade, uma perícia ou o modificador de dano de um item) e substituir esse atributo por outro a sua escolha pela duração do efeito da Missa.'
            },
            {
                name: 'Interno: Estagnação',
                req: 'Mudança.',
                desc: 'Você pode gastar uma ação padrão e 3 PM para gerar um pulso de estagnação em uma esfera de 6m em alcance médio. Cada criatura nessa área sob um efeito com duração maior que instantânea deve fazer um teste de Vontade (CD Sab). Se falhar, todos estes efeitos são dissipados.'
            },
            {
                name: 'Externo: Ignorância',
                req: '—',
                desc: 'Quando uma criatura em alcance curto faz um teste de perícia ou usa uma habilidade com CD, você pode gastar 3 PM para impor uma penalidade de –5 nesse teste ou nessa CD (apenas para esse uso).'
            },
            {
                name: 'Círculo Externo',
                req: 'treinado em Religião, devoto de Thwor. Diagrama do Akzath',
                desc: 'Há várias abordagens para o Akzath, todas igualmente libertadoras. Escolha um dos conceitos abaixo presentes na roda externa do Akzath. Você recebe a habilidade relacionada. Você pode escolher este poder até três vezes para conceitos diferentes, mas a cada vez adicional deve escolher um conceito adjacente a outro que já possua de acordo com o diagrama do Akzath (veja a imagem). Uma vez por dia você pode alterar todos os poderes desta distinção que tiver.'
            },
            {
                name: 'Externo: Morte',
                req: '—',
                desc: 'Quando passa em um teste de Constituição para remover a condição sangrando, você recupera 1d8 PV para cada teste desses já feito nessa mesma cena. Além disso, sempre que faz um acerto crítico em combate ou reduz um inimigo a 0 PV, você recupera 1d8 PV. Se recuperar mais pontos de vida dessa forma que o seu máximo, o excedente se torna PV temporários (cumulativo até o dobro de seu nível de personagem)'
            },
            {
                name: 'Externo: Conhecimento',
                req: '—',
                desc: 'Você pode gastar 3 PM para expandir o conhecimento do Azkath a outros. Escolha uma perícia que exija treinamento. Até o fim da cena, você e seus aliados em alcance curto recebem os benefícios de ser treinado nela.'
            }
        ]
    },
    {
        id: 'forjador-liturgico',
        name: 'Forjador Litúrgico',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ser devoto de Arsenal e um ferreiro exímio. Deve localizar um membro da Ordem, enfrentá-lo em duelo e provar coragem e engenhosidade para ser enviado ao templo secreto. Lá, deve forjar seis armas ao longo de seis meses, cada uma superior à anterior. O teste final consiste em vencer um professor em combate usando apenas as armas forjadas durante o treinamento.',
        marca: {
            name: 'Marca da Distinção: Ferreiro Sagrado',
            desc: 'Você recebe +2 em Ofício (armeiro) e em rolagens de dano com armas que tenha fabricado.'
        },
        poderes: [
            {
                name: 'Virtude do Forjador',
                req: 'treinado em Luta e Ofício (armeiro), um poder concedido de Arsenal',
                desc: 'Pode fabricar armas superiores com uma melhoria (+1 adicional por outro poder da distinção, máx. 4). Se já souber fabricar armas superiores, gasta metade do tempo.'
            },
            {
                name: 'Armamento Sagrado',
                req: 'Abençoar Arma, Virtude do Forjador',
                desc: 'O custo de Abençoar Arma diminui em –1 PM e pode ser usado em qualquer arma fabricada por você.'
            },
            {
                name: 'Forja Devocional',
                req: 'Virtude do Forjador',
                desc: 'Permite transplantar encantos de armas diversas para suas próprias criações. Exige metade do tempo de fabricação e teste de Ofício (armeiro) contra a CD do item original.'
            },
            {
                name: 'Armamento Trabalhado',
                req: 'Conjurar Arma, Forja Devocional',
                desc: 'Ao usar Conjurar Arma, pode gastar PM extras (até o dobro dos poderes da distinção) para adicionar melhorias (1 por cada 2 PM). Se pagar 10 PM adicionais, a arma também recebe um encanto.'
            },
            {
                name: 'Desprezo pelo Ordinário',
                req: 'Forja Devocional',
                desc: 'Sempre que sofre dano não mágico, pode gastar 2 PM para reduzir esse dano à metade.'
            }
        ]
    },
    {
        id: 'guardiao-da-realidade',
        name: 'Guardião da Realidade',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve estar livre da mácula da Tormenta (lefou não são aceitos). Deve conquistar uma vitória significativa contra os lefeu, atuando na linha de frente para proteger aliados e destruindo pessoalmente a criatura mais poderosa do confronto. Antigamente, exigia-se a bênção dos vinte deuses, mas com a ascensão de Aharadak, esse passo foi substituído por atos como remover a corrupção de inocentes ou eliminar células de culto ao Deus da Tormenta.',
        marca: {
            name: 'Marca da Distinção: Escudo da Realidade',
            desc: 'Você recebe +5 em testes de resistência. Contra efeitos da Tormenta, esse bônus aumenta em +1 por poder da distinção.'
        },
        poderes: [
            {
                name: 'Destruir Anticriação',
                req: 'treinado em Luta, Vontade de Ferro',
                desc: 'Ao atacar corpo a corpo, gasta 2 PM para somar Carisma no teste e +1d8 no dano; ignora imunidade a críticos de lefeu. Se possuir Golpe Divino, causa dois dados extras de dano e ignora a imunidade a críticos dessas criaturas.'
            },
            {
                name: 'Detectar Anticriação',
                req: 'Percepção, Destruir Anticriação',
                desc: 'Soma Carisma em Intuição e Percepção. Fica sob efeito permanente de Detectar Ameaças (com todos os aprimoramentos), mas apenas para detectar efeitos da Tormenta.'
            },
            {
                name: 'Herói dos Reinos',
                req: 'Detectar Anticriação',
                desc: 'Na primeira rodada, recebe PM temporários iguais ao Carisma. Uma vez por rodada, reduz em –1 PM o custo de habilidades usadas contra efeitos da Tormenta.'
            },
            {
                name: 'Herói de Arton',
                req: 'Herói dos Reinos',
                desc: 'Uma vez por rodada (2 PM), transforma acerto crítico sofrido em normal, repete um teste de resistência ou reduz dano de fonte da Tormenta à metade.'
            },
            {
                name: 'Herói da Realidade',
                req: 'Herói de Arton',
                desc: 'Gera aura de 9m: protege aliados de efeitos negativos de áreas de Tormenta/Aharadak e reduz aumento de custo de habilidades nesses locais. Aliados ignoram RD de lefeu igual ao seu Carisma e esses inimigos sofrem penalidade no dano igual ao seu Carisma.'
            }
        ]
    },
    {
        id: 'heroi-henshin',
        name: 'Herói Henshin',
        source: 'deuses',
        exclusiva: false,
        admissao: 'A transformação deve "acontecer" com o candidato através de um evento extraordinário e um objeto catalisador (como um bracelete mágico ou entidade). O herói deve manter uma identidade dupla e possuir uma montaria ou veículo fiel. Após um teste moral de altruísmo, o candidato perde sua força comum e deve provar sua retidão realizando sacrifícios e salvando inocentes sem buscar recompensas, enfrentando inimigos sem nenhuma vantagem inicial.',
        marca: {
            name: 'Marca da Distinção: Armadura Especial',
            desc: 'Um traje de combate que fornece +1 na Defesa e reduz a penalidade de armadura em –1.'
        },
        detalhes: {
            titulo: 'Catálogo de Poses de Combate',
            conteudo: 'Poses exigem o traje de combate, uma ação de movimento e 2 PM. Duram até o fim da cena ou até trocar de pose.',
            arsenal: [
                { n: 'Acrobacia Espalhafatosa', d: 'Inimigos em alcance curto ficam vulneráveis por 1 rodada; você ganha +3m de movimento e +5 em Acrobacia.' },
                { n: 'Calor do Combate', d: 'Recebe +2 em ataque e dano (escala com poderes), mas sofre –2 na Defesa.' },
                { n: 'Coordenação de Coreografia', d: 'Torna-se o último na iniciativa e ganha +1 no dano para cada aliado que atacou antes de você.' },
                { n: 'Defender o Sonho', d: 'Aliados recebem +2 em perícias, exceto ataque (escala com poderes).' },
                { n: 'Julgamento Heroico', d: 'Escolha um inimigo: causa +1d8 de luz nele (escala com poderes), mas sofre –2 em ataques contra outros.' },
                { n: 'Poder da Amizade', d: 'Aliados recebem PV temporários (5 + total de poderes da distinção) no início de seus turnos.' },
                { n: 'Terror dos Injustos', d: 'Inimigos que realizem ações hostis em alcance curto ficam abalados (Vontade CD Car evita).' }
            ]
        },
        poderes: [
            {
                name: 'Sequência de Transformação',
                req: 'Vontade de Ferro',
                desc: 'Um item e seu traje ganham uma melhoria gratuita. Com uma ação de movimento, você veste a armadura e empunha o item instantaneamente, onde quer que estejam.'
            },
            {
                name: 'Pose de Combate',
                req: 'treinado em Luta, Sequência de Transformação',
                desc: 'Você aprende uma pose de combate da lista. Ganha uma nova para cada outro poder da distinção.'
            },
            {
                name: 'Pose Complexa',
                req: 'duas poses de combate',
                desc: 'Permite manter duas poses de combate ativas simultaneamente.'
            },
            {
                name: 'Montaria Especial',
                req: 'Cavalgar ou Pilotagem, Sequência de Transformação',
                desc: 'Ação de movimento (2 PM): invoca montaria veterana ou Birrotor Henshin por uma cena com um brilho de luz.'
            },
            {
                name: 'Forma Final',
                req: 'quatro outros poderes da distinção',
                desc: 'Ao transformar-se (5 PM), os itens invocados recebem um encanto gratuito cada até o fim da cena.'
            },
            {
                name: 'Pose: Calor do Combate',
                req: '—',
                desc: 'Você recebe +2 em testes de ataque e rolagens de dano, mas sofre uma penalidade de –2 na Defesa. Para cada outros dois poderes da distinção, esses bônus aumentam em +1.'
            },
            {
                name: 'Pose: Coordenação de Coreografia',
                req: '—',
                desc: 'Quando assume esta pose, você se torna o último na iniciativa. Em seu turno, para cada aliado que fez pelo menos um ataque desde o seu turno anterior, você recebe +1 em suas rolagens de dano.'
            },
            {
                name: 'Pose: Defender o Sonho',
                req: '—',
                desc: 'Seus aliados recebem +2 em testes de perícia (exceto testes de ataque). Para cada outros dois poderes da distinção, esse bônus aumenta em +1.'
            },
            {
                name: 'Pose: Terror dos Injustos',
                req: '—',
                desc: 'Qualquer criatura em alcance curto que faça uma ação hostil contra você ou um de seus aliados fica abalada (Von CD Car evita e a criatura não pode mais ser afetada por esta pose por 1 dia).'
            },
            {
                name: 'Pose: Acrobacia Espalhafatosa',
                req: '—',
                desc: 'Quando você assume esta pose, todos os inimigos em alcance curto ficam vulneráveis por 1 rodada (uma criatura só pode ser afetada por esta pose uma vez por cena). Seu deslocamento aumenta em 3m e você recebe +5 em Acrobacia.'
            },
            {
                name: 'Pose: Poder da Amizade',
                req: '—',
                desc: 'Quando você assume esta pose, e no início de cada um dos seus turnos, seus aliados recebem uma quantidade de PV temporários igual a 5 + o total de poderes da distinção que você possui. A cura no efeito temporário deve ser mudada manualmente.'
            },
            {
                name: 'Pose: Julgamento Heroico',
                req: '—',
                desc: 'Ao assumir esta pose, escolha um inimigo em alcance curto. Suas rolagens de dano contra esse inimigo recebem +1d8 de luz, mas você sofre –2 em testes de ataque contra outras criaturas. Para cada dois outros poderes da distinção, esse dado de dano de luz aumenta em um passo. O aumento do passo do dano de luz deve ser mudado manualmente, assim como a penalidade ao atacar outras criaturas.'
            }
        ]
    },
    {
        id: 'improvisador-lena',
        name: 'Improvisador de Lena',
        source: 'deuses',
        exclusiva: false,
        admissao: 'Candidatos não humanos devem viver seis meses em uma comunidade humana para entender sua mentalidade. O candidato deve ser um artesão ou pesquisador e ter vivenciado um evento que o faça rejeitar o uso de armas em favor da paz. Deve vencer dois combates desafiadores sem que ninguém no grupo use violência ou cause ferimentos (mesmo não letais). Por fim, deve resolver uma situação de vida ou morte sem equipamentos, usando apenas a criatividade e itens do ambiente.',
        marca: {
            name: 'Marca da Distinção: Código do Improvisador',
            desc: 'Você segue o Código da Paz. Pode gastar uma ação de movimento para improvisar uma ferramenta (1 espaço) que, até o fim da cena, concede +2 em um teste de perícia ou reduz em –1 PM o custo de uma habilidade.'
        },
        poderes: [
            {
                name: 'Gambiarra Mestra',
                req: 'treinado em Investigação e Ofício',
                desc: 'Gasta ação de movimento e 3 PM para improvisar uma solução para uma tarefa. Escolha uma perícia; até o fim da cena, você pode substituir testes dessa perícia por testes de Ofício.'
            },
            {
                name: 'Poder Improvisado',
                req: 'Gambiarra Mestra',
                desc: 'Ação padrão (3 PM): escolha um poder de classe ou geral cujos pré-requisitos você cumpra (exceto concedidos/Tormenta). Você pode usar esse poder até o fim da cena ou até usar esta habilidade novamente, com nível de classe igual aos seus poderes da distinção.'
            },
            {
                name: 'Efeito Cenográfico',
                req: 'Poder Improvisado',
                desc: 'Ao causar dano não letal em criatura viva, gasta 2 PM para teste de Fortitude (CD Int +1 por poder da distinção). Falha deixa capangas inconscientes ou outros alvos atordoados por 1 rodada (1/cena).'
            },
            {
                name: 'Habilidade Improvisada',
                req: 'Poder Improvisado',
                desc: 'Ação padrão (3 PM): escolha uma habilidade de classe (exceto Magias) que não seja a sua. Você pode usá-la até o fim da cena ou novo uso deste poder, como um personagem de nível igual ao seu total de poderes da distinção.'
            },
            {
                name: 'Magia Improvisada',
                req: 'treinado em Misticismo, Poder Improvisado',
                desc: 'Ação completa: escolha uma magia de 1º círculo e faça teste de Inteligência (CD 10 +2 por uso no dia). Sucesso permite lançar a magia uma vez na cena pelo custo normal (Int). É uma Magia Simulada, não uma habilidade mágica.'
            }
        ]
    },
    {
        id: 'inquisidor-wynna',
        name: 'Inquisidor de Wynna',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ser um paladino com conhecimentos básicos de teoria arcana. Deve encontrar um mestre em templos isolados (como na Academia Arcana ou Wynlla) e segui-lo por tempo indeterminado, superando desafios arbitrários e perigosos sem ajuda de companheiros. Após cada prova, o aluno deve deduzir a lição aprendida; o treinamento termina quando o candidato preside um tribunal sobre um problema arcano e sua sentença coincide com a do mestre.',
        marca: {
            name: 'Marca da Distinção: Padroeira Adotiva',
            desc: 'Você recebe o poder Centelha Mágica, mas mantém sua divindade original. Ao escolher o poder Orar, pode aprender magias arcanas de 1º círculo como se fossem divinas.'
        },
        poderes: [
            {
                name: 'Golpe Purificador',
                req: 'Abençoado, Golpe Divino',
                desc: 'Ao usar Golpe Divino, pode gastar 2 PM para causar um efeito de Dissipar Magia no alvo, usando o resultado do ataque no lugar de Misticismo.'
            },
            {
                name: 'Magia Sagrada',
                req: 'Golpe Purificador, Orar',
                desc: 'Ao lançar magia de dano, gasta 2 PM para receber +2 na CD e +1d8 no dano (+1d8 por outro poder da distinção gastando +1 PM).'
            },
            {
                name: 'Pira da Inquisição',
                req: 'Aura Sagrada, Golpe Purificador',
                desc: 'Com Aura Sagrada ativa, dissipa magias em alvos na área no início do turno (Vontade). O conjurador sofre 1d8+1 de dano de essência por círculo dissipado.'
            },
            {
                name: 'Refletir Magia',
                req: 'Outros dois poderes da distinção',
                desc: 'Se passar em teste de resistência contra habilidade mágica, gasta 6 PM para refleti-la de volta à fonte.'
            },
            {
                name: 'Veredito Inquisitorial',
                req: 'Quatro outros poderes da distinção',
                desc: 'Ao usar Golpe Purificador, gasta +6 PM. Se acertar, o alvo deve vencer teste de Vontade contra seu ataque na próxima ação com custo em PM ou a ação falha (PM são gastos).'
            }
        ]
    },
    {
        id: 'mestre-armearia',
        name: 'Mestre de Armearia',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ingressar em uma armearia como aprendiz (comum em Doherimm, pode exigir contatos criminosos na superfície) e ser aceito por um mestre. Deve forjar uma arma de fogo inicial sob supervisão. Após seis meses de estudo, deve forjar uma arma com melhorias para tornar-se companheiro. Após mais seis meses, deve criar uma arma totalmente nova para atingir o posto de mestre. O passo final é estabelecer sua própria armearia, fixa ou itinerante.',
        marca: {
            name: 'Marca da Distinção: Domínio da Pólvora',
            desc: 'Você recebe +2 em testes de perícia (exceto ataque) relacionados a armas de fogo e munições, incluindo esconder, fabricar, identificar e negociar.'
        },
        detalhes: {
            titulo: 'Inovações Tecnológicas',
            conteudo: 'Inovações são técnicas experimentais que funcionam apenas nas mãos do criador ou sob sua manutenção. Uma arma pode ter até quatro inovações; a CD e o preço seguem a tabela de melhorias.',
            arsenal: [
                { n: 'Câmara de Bala', d: 'Permite disparar uma bala em ataques corpo a corpo para +2d6 de dano.' },
                { n: 'Cano Duplo', d: 'Dois canos disparáveis individualmente; permite usar Disparo Rápido sem penalidade.' },
                { n: 'Cano Serrado', d: 'Dano extra em alvos adjacentes, mas –2 no ataque contra alvos distantes.' },
                { n: 'Empunhadura de Segurança', d: '+5 para resistir a desarmar e quebrar.' },
                { n: 'Explosiva (Munição)', d: 'Causa dano em área adjacente ao alvo (Reflexos CD Int reduz metade).' },
                { n: 'Fragmentável (Munição)', d: 'Dano máximo em um dado gera um dado extra de dano.' },
                { n: 'Mira Calibrável', d: 'Ação mirar concede +2 em ataque e na margem de ameaça.' },
                { n: 'Pólvora de Smokestone (Munição)', d: 'Causa +1 de dano por dado da arma.' },
                { n: 'Tambor', d: 'Armazena 4 munições; recarga com ação completa.' },
                { n: 'Tanque Flamejante', d: 'Dano de fogo em linha de 6m; consome 1 bala e 1 fogo alquímico.' }
            ]
        },
        poderes: [
            {
                name: 'Prata da Casa',
                req: 'Balística',
                desc: 'Fabrica armas de fogo em uma semana. Recebe +1 no ataque e dano com armas fabricadas por você (+1 a cada dois outros poderes).'
            },
            {
                name: 'Inovação Tecnológica',
                req: 'Prata da Casa',
                desc: 'Adiciona uma inovação a uma arma própria e permite fabricar armas superiores com inovações.'
            },
            {
                name: 'Improvisar o Progresso',
                req: 'Inovação Tecnológica, ter construído três armas com melhorias exclusivas',
                desc: 'Ação completa (2 PM): aplica uma melhoria temporária (fim da cena) em uma arma empunhada sem custo ou teste. Gaste +2 PM para aplicar também uma inovação.'
            },
            {
                name: 'Profissional Completo',
                req: 'Prata da Casa, Maestria em Perícia (Ofício [armeiro])',
                desc: 'Pode substituir Pontaria por Ofício (armeiro) ao atacar com armas fabricadas por você, permitindo o uso de Maestria em Perícia nos ataques.'
            },
            {
                name: 'Arma de Estimação',
                req: 'Profissional Completo, ter feito três críticos no mesmo combate com a arma',
                desc: 'Uma arma fabricada recebe uma habilidade de 1º nível de outra classe (ativada em ataques ou que afete dano/ataque). Pode escolher Magias para aprender uma magia específica para a arma.'
            }
        ]
    },
    {
        id: 'numeromante',
        name: 'Numeromante',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve buscar instrução em escolas raras, como a Academia Arcana, templos de Tanna-Toh ou com os matemáticos sar-allan. Deve possuir um orientador, ser capaz de lançar magias arcanas e demonstrar conhecimento avançado em matemática. A etapa final exige a elaboração e defesa de uma tese original sobre numeromancia perante uma banca examinadora, demonstrando cálculos e provas complexas.',
        marca: {
            name: 'Marca da Distinção: Matemágica para iniciantes',
            desc: 'Sempre que lançar uma magia com custo em PM igual a um quadrado perfeito (1, 4, 9, 16, 25...), o custo da sua próxima magia na cena diminui em –1 PM.'
        },
        poderes: [
            {
                name: 'Aplicar Constante M',
                req: 'Conhecimento e Misticismo, magias arcanas de 2º círculo',
                desc: 'No início da cena, role 1d4 para definir sua Constante M. Magias com resistência ganham aprimoramento (+2 PM): alvos que falhem sofrem penalidade na Defesa e resistências igual à Constante M.'
            },
            {
                name: 'Magicometria',
                req: 'Aplicar Constante M',
                desc: 'Ao presenciar habilidade mágica com dados em alcance médio, pode fazer teste de Misticismo (CD 15 + PM). Se passar, pode rolar novamente uma quantidade de dados do efeito igual à sua Constante M.'
            },
            {
                name: 'Correção do Desvio Padrão',
                req: 'Magicometria',
                desc: 'Magias com dados ganham aprimoramento (+3 PM): dados que rolem menos da metade do valor máximo são considerados como metade do valor máximo.'
            },
            {
                name: 'Função Metamágica de M',
                req: 'Magicometria',
                desc: 'Sua Constante M passa a ser 1d6. Se um dado de efeito mágico em alcance médio resultar no valor da Constante, você pode lançar uma magia como ação livre até o fim do próximo turno (1/rodada).'
            },
            {
                name: 'Matriz da Equação Final',
                req: 'Correção do Desvio Padrão, dois poderes de magia',
                desc: 'Magias de dano com dados ganham aprimoramento (+2 PM): em vez de rolar todos os dados, role apenas um e multiplique o resultado pela quantidade original de dados.'
            }
        ]
    },
    {
        id: 'pacificador',
        name: 'Pacificador',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve anunciar sua jornada publicamente e dedicar-se diariamente ao treinamento físico e mental; falhar um dia reinicia o processo. Deve participar de dez combates na linha de frente, sem recuar ou cair, poupando inimigos no golpe final e garantindo que ninguém (aliado ou inimigo) morra. O processo termina com uma meditação de doze horas sob treinamento árduo para absorver os ensinamentos.',
        marca: {
            name: 'Marca da Distinção: Armas da Paz',
            desc: 'Você adota o Código da Paz e ganha proficiência com armas que não causem dano ou tenham habilidade inata de dano não letal. Recebe +1 em testes de ataque e rolagens de dano não letal.'
        },
        detalhes: {
            titulo: 'Código da Paz',
            conteudo: 'Você não acredita na morte como solução e não aceita matar ou causar dano letal. Violar este código resulta na perda imediata de todos os PM, recuperáveis apenas no dia seguinte.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Combate Pacífico',
                req: 'treinado em Luta',
                desc: 'Ao ser atingido corpo a corpo, gasta 1 PM para teste de manobra; se vencer, evita o ataque (1/rodada). Se um inimigo errar um ataque contra você, gasta 1 PM para realizar uma manobra contra ele (1/rodada).'
            },
            {
                name: 'Dor sem Morte',
                req: 'Combate Pacífico',
                desc: 'Ao causar dano não letal, gasta 1 PM para impor a condição fraco, frustrado ou lento (Fortitude CD For/Des evita). A CD aumenta em +1 por poder da distinção.'
            },
            {
                name: 'Golpe Paralisante',
                req: 'Dor sem Morte',
                desc: 'Ação padrão (3 PM): alvo adjacente fica paralisado (Fortitude CD For/Des reduz para lento). O alvo pode tentar um novo teste com ação completa por rodada. A CD aumenta em +1 por poder da distinção.'
            },
            {
                name: 'Presença do Bem',
                req: 'Combate Pacífico',
                desc: 'Ação de movimento (1 PM): você e aliados adjacentes recebem +2 na Defesa e resistências até o fim da cena. O bônus cai para quem causar dano letal.'
            },
            {
                name: 'Pacificação',
                req: 'Presença do Bem',
                desc: 'Ao derrotar um inimigo sem matá-lo, recebe +10 PV e +2 PM cumulativos até o fim da aventura (limite de usos por aventura igual ao total de poderes da distinção).'
            }
        ]
    },
    {
        id: 'pregador',
        name: 'Pregador',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve abandonar qualquer igreja formal, renunciando a recursos, benefícios ou ajuda de outros devotos por uma estação inteira, vivendo como os pobres ou excluídos. Deve forçar os limites dos dogmas de seu deus até ser punido e, então, converter uma comunidade não atendida por clérigos. O passo final exige descumprir deliberadamente um dos requisitos de admissão, justificando que, por uma "ótima razão", fez a coisa certa.',
        marca: {
            name: 'Marca da Distinção: Vista Grossa',
            desc: 'Sempre que violar as Obrigações & Restrições de sua divindade, pode fazer um teste de Religião (CD 10, +5 por uso anterior na aventura) para não sofrer as consequências da violação.'
        },
        poderes: [
            {
                name: 'Sincretismo Oportuno',
                req: 'treinado em Enganação e Religião, Devoto Fiel',
                desc: 'Ação padrão (3 PM): recebe um poder concedido de outra divindade, mas deve cumprir suas Obrigações & Restrições até o fim da cena. Se violá-las, perde o poder e o acesso a essa divindade na aventura.'
            },
            {
                name: 'Está nas Escrituras',
                req: 'Sincretismo Oportuno',
                desc: 'Ao falhar em um teste de Enganação ou Religião, pode gastar 1 PM para repetir o teste usando a outra perícia no lugar da original.'
            },
            {
                name: 'Abusar da Paciência',
                req: 'Está nas Escrituras, magias divinas de 2º círculo',
                desc: 'Teste de Religião (CD 15, +5 por uso no dia): se passar, pode lançar uma magia divina que não conheça (de círculo disponível) até o fim da cena. Falhar impede novos usos no dia.'
            },
            {
                name: 'Não Fui Eu',
                req: 'Está nas Escrituras',
                desc: 'Ao ser alvo de ação hostil de criatura inteligente, gasta 2 PM para teste de Enganação oposto à Vontade do alvo. Se vencer, a ação falha e é perdida (+5 se o alvo for devoto de deus que você também segue). (1/criatura por cena).'
            },
            {
                name: 'Releitura Conveniente',
                req: 'Sincretismo Oportuno',
                desc: 'Gasta 1 PM para adotar temporariamente (fim da cena) uma característica de outra divindade: Arma Preferida, Canalizar Energia ou requisito de devoto para itens/habilidades.'
            },
            {
                name: 'Vender Indulgências',
                req: 'Sincretismo Oportuno',
                desc: 'Aliado em alcance curto gasta 3 PM para rerrolar teste de perícia; você recebe 1 PM temporário (limite por poderes da distinção) que dura até o fim da cena.'
            }
        ]
    },
    {
        id: 'sombra-tenebra',
        name: 'Sombra de Tenebra',
        source: 'deuses',
        exclusiva: false,
        admissao: 'Os candidatos são escolhidos por Tenebra e contactados em sonho com uma missão que deve ser cumprida inteiramente à noite, sem exposição ao sol. Após a conclusão, o candidato deve viajar sozinho até um templo oculto, mantendo-se longe da claridade de Azgher, e meditar na escuridão até que a deusa se revele fisicamente para propor um pacto final.',
        marca: {
            name: 'Marca da Distinção: Ameaça das Sombras',
            desc: 'Em áreas de escuridão, você recebe Ataque Furtivo +1d6 (cumulativo se já possuir a habilidade).'
        },
        poderes: [
            {
                name: 'Caminhar nas Trevas',
                req: 'Acrobacia e Furtividade, Passo Sombrio, enxergar no escuro',
                desc: 'Aprende Manto de Sombras (custo -1 PM se já a conhecia). A execução da magia diminui em um passo (padrão > movimento > livre) para cada dois outros poderes da distinção.'
            },
            {
                name: 'Miragem de Sombras',
                req: 'Caminhar nas Trevas',
                desc: 'Aprende Criar Ilusão. Com três outros poderes, pode gastar +2 PM para que a ilusão emane uma aura de 3m que concede camuflagem leve por escuridão.'
            },
            {
                name: 'Moldar Sombra',
                req: 'Miragem de Sombras',
                desc: 'Ação de movimento (2 PM): cria arma ou ferramenta que dura até o fim da cena. Armas causam dano de trevas; ferramentas dão +1 em testes (+1 a cada dois outros poderes).'
            },
            {
                name: 'Clone Sombrio',
                req: 'Misticismo, Miragem das Sombras',
                desc: 'Ação padrão (3 PM): cria clone com 1 PV e Evasão. Pode gastar ação de movimento para o clone causar 1d6 de dano de frio por poder da distinção ou fazer manobra.'
            },
            {
                name: 'Sombra Espreitadora',
                req: 'Caminhar nas Trevas, Passo Sombrio',
                desc: 'Ao usar Passo Sombrio para flanquear, teste de Acrobacia vs Percepção/Reflexos deixa o alvo desprevenido e causa +1 de dano de trevas por dado.'
            },
            {
                name: 'Forma de Sombra',
                req: 'Ataque Furtivo, Sombra Espreitadora',
                desc: 'Sob Manto de Sombras, causa +1 de dano por dado de trevas. Pode gastar 1 PM para converter dano furtivo em trevas e afetar criaturas incorpóreas.'
            }
        ]
    },
    {
        id: 'sortudo-nimb',
        name: 'Sortudo de Nimb',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato não pode ser eficiente ou possuir "combos"; deve aprender técnicas inúteis e manter uma ficha propositalmente malfeita até ser tarde demais para mudar. Deve vencer três desafios mortais dependendo apenas de rolagens de dados "secos", sem qualquer modificador ou habilidade. Por fim, o jogador deve vencer uma aposta contra o mestre: ambos rolam um d20 três vezes; o jogador deve vencer em pelo menos duas rolagens para ingressar na distinção.',
        marca: {
            name: 'Marca da Distinção: Sorte Boba',
            desc: 'Ao usar uma habilidade que permita rolar qualquer dado novamente, você rola dois dados desse tipo e usa o melhor resultado.'
        },
        poderes: [
            {
                name: 'Sorte Visitante',
                req: 'Sortudo ou Sorte dos Loucos, devoto de Nimb',
                desc: 'No início de cada cena, role 1d8. Se o resultado for 1, você pode rolar novamente qualquer teste recém-feito até o fim da cena. O d8 diminui um passo para cada dois outros poderes da distinção.'
            },
            {
                name: 'Bênção de Nimb',
                req: 'Sorte Visitante',
                desc: 'Sempre que faz um teste, rola em tabelas ou determina eventos aleatórios (incluindo confusão de Nimb), você rola duas vezes e escolhe o resultado. Pode aplicar-se a encontros aleatórios sob critério do mestre.'
            },
            {
                name: 'Caminhada Descuidada',
                req: 'Bênção de Nimb',
                desc: 'Ao sofrer dano (2 PM), faz um teste de Vontade contra o ataque ou CD da habilidade. Se passar, ignora o dano; se passar por 10 ou mais, reflete o dano para uma criatura à escolha no alcance.'
            },
            {
                name: 'Sorte é o Que Se Faz',
                req: 'Bênção de Nimb',
                desc: 'Uma vez por rodada (3 PM), ao ver um teste de perícia em alcance curto, role 1d20 e troque o seu resultado pelo da criatura. Você pode usar o resultado coletado da criatura em um teste próprio até o fim da cena.'
            },
            {
                name: '50/50',
                req: 'Sorte é o Que Se Faz',
                desc: 'Ação de movimento (5 PM, sustentada): gera aura de 9m onde todos os testes são resolvidos com 1d2 (1 é falha, 2 é sucesso). Sucessos recuperam 2 PM para você e falhas drenam 2 PM.'
            },
            {
                name: 'Olha Só, Quem Diria?',
                req: '50/50',
                desc: 'Ação completa (6 PM): faz um item mágico menor à sua escolha surgir em alcance curto até o fim da cena. O item não pode ser único/artefato e some se mudar de dono.'
            }
        ]
    },
    {
        id: 'sumo-sacerdote',
        name: 'Sumo-Sacerdote',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve possuir conhecimento profundo e fé inabalável, dedicando a vida ao sacerdócio. Como apenas uma pessoa pode ocupar o cargo por vez (salvo exceções raríssimas), o aspirante deve chamar a atenção da divindade com atos de extrema relevância, que podem incluir desafiar o atual ocupante em combate ou resolver conflitos onde ele falhou. O processo culmina em um evento sentido por toda Arton, onde o escolhido é iluminado, aclamado por multidões ou recebido no reino da divindade.',
        marca: {
            name: 'Marca da Distinção: Autoridade Divina',
            desc: 'Você é a autoridade máxima em sua igreja, recebendo o poder Autoridade Eclesiástica. Se já possuir este poder, recebe +2 em Religião e na CD de suas magias divinas.'
        },
        poderes: [
            {
                name: 'Proteção Divina',
                req: 'treinado em Religião, devoto de um deus maior',
                desc: 'Você passa automaticamente em testes de resistência contra magias divinas lançadas por outros devotos de sua própria divindade.'
            },
            {
                name: 'Bênção do Patrono',
                req: 'Proteção Divina',
                desc: 'Recebe um poder concedido adicional e pode usar uma ação de movimento para trocar um de seus poderes concedidos por outro. Ganha um novo poder concedido para cada outro poder da distinção (afeta apenas poderes de sua devoção).'
            },
            {
                name: 'Evolução Espiritual',
                req: 'Proteção Divina',
                desc: 'Recebe +5 PV e +2 PM para cada poder da distinção. Além disso, a CD de suas magias divinas e poderes concedidos aumenta em +1 por poder da distinção.'
            },
            {
                name: 'Presente dos Deuses',
                req: 'Bênção do Patrono',
                desc: 'Recebe a habilidade Magias (Clérigo) com nível igual ao dobro dos poderes da distinção. Se já possuir a habilidade, soma Sabedoria no total de PM e no limite de PM por magia (cumulativo com outros efeitos).'
            },
            {
                name: 'Punição Divina',
                req: 'Bênção do Patrono',
                desc: 'Ação padrão: cancela magias divinas e poderes concedidos de um devoto da sua divindade em linha de visão (Vontade CD Sab +1 por poder da distinção evita por 1 dia). Pode ser revertido por você ou através de um rito de missão sagrada.'
            }
        ]
    },
    {
        id: 'taumaturgista',
        name: 'Taumaturgista',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve obter tomos raríssimos de origem nardmyr em ruínas de Lamnor e estudar magias planares. Deve invocar uma entidade extraplanar e vencê-la em uma negociação (enganação ou intimidação) antes de possuir poderes da distinção. Por fim, deve visitar o Plano da criatura, negociar com seu mestre em território hostil e conseguir trazer o extraplanar para Arton como servo através de um contrato físico que prejudique a entidade.',
        marca: {
            name: 'Marca da Distinção: Auxiliar Divino',
            desc: 'Você aprende e pode lançar Conjurar Monstro, Montaria Arcana ou Servos Invisíveis como magias divinas. A cada dois poderes da distinção, aprende outra destas magias (se repetir, o custo diminui em –1 PM).'
        },
        detalhes: {
            titulo: 'Barganhas e Contratos Planares',
            conteudo: 'Os taumaturgistas manipulam o poder de diferentes planos através de seus servos invocados. Cada amigo de outro mundo traz um efeito imediato ao surgir no campo de batalha.',
            arsenal: [
                { n: 'Abissal', d: 'Dano de trevas (2d8+2) e alvos abalados em raio de 6m.' },
                { n: 'Celestial', d: 'Concede 4d8+4 PV temporários para aliados em raio de 6m.' },
                { n: 'Elemental', d: 'Dano (2d12+2) de ácido, eletricidade, fogo ou frio em raio de 6m.' },
                { n: 'Feérico', d: 'Alvos sofrem –2 em testes de Vontade por 1 rodada em raio de 6m.' }
            ]
        },
        poderes: [
            {
                name: 'Amigo de Outro Mundo',
                req: 'Religião, magias divinas de 3° círculo, Servo Divino',
                desc: 'Ação de movimento (2 PM): invoca um parceiro extraplanar (básico, pilly, luminar, pégaso ou dragonete). Ele começa como iniciante e sobe de nível a cada dois outros poderes da distinção. Se destruído, só pode ser invocado novamente após 1 dia.'
            },
            {
                name: 'Barganha Planar',
                req: 'Amigo de Outro Mundo',
                desc: 'Escolha um efeito (Abissal, Celestial, Elemental ou Feérico). Ao invocar seu amigo de outro mundo, ele manifesta esse poder em um raio de 6m.'
            },
            {
                name: 'Contrato Planar',
                req: 'Barganha Planar',
                desc: 'Você recebe um segundo amigo de outro mundo e escolhe um efeito de Barganha Planar para ele (cumulativo se for o mesmo tipo).'
            },
            {
                name: 'Titereiro Planar',
                req: 'Conjurar Monstro, Amigo de Outro Mundo',
                desc: 'Pode dar ordens a monstros conjurados como ação de movimento e a magia Conjurar Monstro não conta no limite de magias sustentadas por turno.'
            },
            {
                name: 'Invocação Corrompida',
                req: 'Amigo de Outro Mundo, dois poderes da Tormenta',
                desc: 'Seus amigos tornam-se corrompidos; ao serem invocados, drenam 2d4 PM de criaturas em raio de 6m (CD Sab reduz metade; zero PM causa confusão). Você recebe +5 em Percepção e não pode ser flanqueado.'
            }
        ]
    },
    {
        id: 'teurgista-hermetico',
        name: 'Teurgista Hermético',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve cursar teoria e filosofia arcana em institutos prestigiados como a Academia Arcana, Wynlla ou Ubani, dedicando-se exclusivamente aos estudos por meses. Em seguida, deve ser aceito em um templo de Wynna ou Kallyadranoch que possua centros de estudo teórico (raros) e imergir em tarefas e estudos por mais um mês. O processo termina com a defesa de uma tese original que una a origem das magias arcana e divina perante uma banca de estudiosos, sem ser desacreditado.',
        marca: {
            name: 'Marca da Distinção: Princípio Hermético',
            desc: 'Você é considerado um conjurador tanto arcano quanto divino, e suas magias são consideradas simultaneamente arcanas e divinas.'
        },
        poderes: [
            {
                name: 'Conjuração Unificada',
                req: 'Misticismo e Religião, Magias (arcanas) e Magias (divinas)',
                desc: 'Escolha um atributo-chave de magia para usar em todas as suas magias e habilidades (exceto cálculo de PM). Restrições de um tipo de magia (como armaduras para arcanistas) passam a afetar ambos os tipos.'
            },
            {
                name: 'Conhecimento Adaptável',
                req: 'Conjuração Unificada',
                desc: 'Ao falhar em um teste de Misticismo ou Religião, pode gastar 1 PM para repetir o teste usando a outra perícia no lugar da original.'
            },
            {
                name: 'Teurgia Aplicada',
                req: 'Conjuração Unificada',
                desc: 'Escolha uma classe arcana e uma divina. Soma o total de poderes da distinção no nível dessas classes (até o limite de nível de personagem) para determinar PM máximo por magia e acesso a círculos.'
            },
            {
                name: 'Vontade Sobre Matéria',
                req: 'Teurgia Aplicada',
                desc: 'Ao lançar uma magia, pode pagar +1 PM para que ela ignore imunidades e resistências baseadas em sua escola ou tipo (arcana/divina).'
            },
            {
                name: 'Zênite Teúrgico',
                req: 'Conhecimento Adaptável, Teurgia Aplicada',
                desc: 'Ao lançar magia de dano, pode aplicar efeitos de tipos de dano específicos como se ela fosse de todos os tipos (ex: usar Cetro Elemental de Fogo com Adaga Mental).'
            }
        ]
    },
    {
        id: 'tibarita',
        name: 'Tibarita',
        source: 'deuses',
        exclusiva: false,
        admissao: 'O candidato deve ser devoto de Tibar e passar três meses gastando absolutamente tudo o que ganha, sem acumular riquezas por mais de um dia. Os gastos não podem ter finalidade prática ou utilitária para aventuras (como melhorias em armas ou armaduras); devem ser focados apenas em aproveitar a vida. Durante este período, deve obrigatoriamente comprar uma experiência extravagante, uma obra de arte de mestre e uma iguaria única, provando que o dinheiro pode comprar qualquer coisa.',
        marca: {
            name: 'Marca da Distinção: Poder Monetário',
            desc: 'Ao usar uma habilidade com custo em PM, você pode consumir Tibares de Ouro (TO) para pagar o custo (limite por Carisma). Pode consumir um número de TO por dia igual ao seu nível. Se já possuir esta habilidade, o limite diário aumenta em +5.'
        },
        poderes: [
            {
                name: 'O Preço do Sucesso',
                req: 'devoto de Tibar, Car 3',
                desc: 'Em testes de perícia, você pode comprar o resultado do dado em vez de rolá-lo. O custo é de T$ 100 para cada número desejado (ex: um 18 custa T$ 1.800). O valor não garante sucesso automático; deve superar a CD.'
            },
            {
                name: 'Faro para Tesouro',
                req: 'O Preço do Sucesso',
                desc: 'Em rolagens para determinar chances de ganho ou quantidade de dinheiro e tesouros, você rola duas vezes e escolhe o melhor resultado.'
            },
            {
                name: 'Revirar os Bolsos',
                req: 'O Preço do Sucesso',
                desc: 'Em cada cena, o primeiro Tibar de Ouro consumido para pagar um custo em PM abate 1d4 PM desse custo.'
            },
            {
                name: 'Saúde Comprada',
                req: 'O Preço do Sucesso',
                desc: 'Ação completa: gasta Tibares de Ouro (limite por Carisma) para curar criatura adjacente. Cada TO recupera 3d8 PV ou remove uma condição negativa (como atordoado, confuso, exausto, etc.).'
            },
            {
                name: 'Gostei, Vou Comprar!',
                req: 'O Preço do Sucesso, ter gastado T$ 100.000 na carreira',
                desc: 'Ao ver uma criatura em alcance curto usar uma habilidade de classe ou magia, gasta 6 PM para "comprá-la". Pode usá-la como habilidade de raça (atributo Carisma) até o fim da cena ou até comprar outra.'
            }
        ]
    },
    {
        id: 'tirano-terceiro',
        name: 'Tirano do Terceiro',
        source: 'deuses',
        exclusiva: false,
        admissao: 'Exclusivo para devotos de Kallyadranoch. O candidato deve localizar um dragão jovem e forçá-lo a aceitar ser sua montaria e servo agindo sozinho. Uma vez domado, formam um vínculo místico inquebrável.',
        marca: {
            name: 'Marca da Distinção: Companheiro Dragão',
            desc: 'Você recebe um dragão jovem (parceiro montaria iniciante). Com 3 poderes da distinção vira veterano; com 5 poderes vira um dragão adulto mestre (Enorme), com Aura Aterradora e Metamorfose Dracônica.'
        },
        detalhes: {
            titulo: 'Evolução do Companheiro Dragão',
            conteudo: 'Ao progredir na distinção, você deve escolher entre duas linhagens de treinamento para sua montaria:',
            arsenal: [
                {
                    n: 'Opção 1: O Predador',
                    d: 'Iniciante: 1 PM (livre) causa 2d6 de dano elemental em curto. Veterano: Ganha voo 18m. Mestre: Ação de movimento extra (deslocar) + Aura Aterradora + Metamorfose.'
                },
                {
                    n: 'Opção 2: O Soberano dos Céus',
                    d: 'Iniciante: Voo 12m e 1 PM causa 2d6 de dano em médio. Veterano: Ação de movimento extra e 2 PM para 4d6 de dano. Mestre: Voo 18m e 5 PM (movimento) para usar Sopro + Aura Aterradora + Metamorfose.'
                },
                {
                    n: 'Habilidades de Mestre',
                    d: 'Aura Aterradora (CD Car): Alvos abalados/apavorados. Metamorfose Dracônica: Pode assumir formas humanoides para infiltração.'
                }
            ]
        },
        poderes: [
            {
                name: 'Aspecto de Kallyadranoch',
                req: 'devoto de Kallyadranoch, treinado em Cavalgar',
                desc: 'Você se torna imune à Aura Aterradora de dragões e recebe RD 10 contra o elemento do sopro do seu companheiro. Se possuir Escamas Dracônicas, o bônus do poder aumenta para +5.'
            },
            {
                name: 'Ira Dracônica',
                req: 'treinado em Luta, Aspecto de Kallyadranoch',
                desc: 'Gasta 3 PM para receber RD 5 e +2 em testes de ataque, dano e na CD de habilidades mágicas e do Sopro Compartilhado até o fim da cena.'
            },
            {
                name: 'Sopro Compartilhado',
                req: 'Ira Dracônica',
                desc: 'Ganha o poder Baforada Dracônica do elemento do seu dragão. Se já possuir, aumenta o dano em +2 dados e pode escolher entre um alvo em alcance médio ou um cone de 6m.'
            },
            {
                name: 'Dádivas do Dragão',
                req: 'treinado em Religião, Ira Dracônica',
                desc: 'Aprende uma magia divina de 1º círculo (Sabedoria). Ganha uma magia adicional para cada dois outros poderes da distinção. Se já for conjurador divino, as magias podem ser de qualquer círculo disponível.'
            },
            {
                name: 'Apoteose do Terceiro',
                req: 'Dádivas do Dragão, Sopro Compartilhado',
                desc: 'Estando com o dragão e sob Ira Dracônica, gasta ação completa e 10 PM para se fundir a ele (Sustentada). Seu tamanho vira Grande, ganha voo 18m, imunidade ao elemento do dragão, +2 em atributos mentais e For/Con, e um ataque de mordida (1d8).'
            }
        ]
    },
    {
        id: 'andarilho-horizonte',
        name: 'Andarilho do Horizonte',
        source: 'heróicas',
        exclusiva: false,
        admissao: 'O candidato deve ter desbravado todos os dez tipos de terreno de Arton (Aquático, Ártico, Colina, Deserto, Floresta, Montanha, Pântano, Planície, Subterrâneo e Urbano), superando ao menos um perigo complexo em cada um ou passando uma aventura inteira neles. Além disso, deve ter visitado e explorado pelo menos um outro plano de existência de forma similar.',
        marca: {
            name: 'Marca da Distinção: Trilheiro',
            desc: 'Uma vez por rodada, você pode percorrer 1,5m com qualquer tipo de deslocamento que possua (exige liberdade de movimento; não funciona com armadura pesada ou condição imóvel).'
        },
        detalhes: {
            titulo: 'Domínios de Terreno',
            conteudo: 'Ao escolher o poder Domínio de Terreno, você seleciona dois benefícios permanentes da lista abaixo:',
            arsenal: [
                { n: 'Aquático', d: 'Natação 9m (ou +3m) e ignora penalidade de armadura para nadar.' },
                { n: 'Ártico', d: 'RD Frio 5; +1d6 de dano de frio na arma por 1 PM até o fim da cena.' },
                { n: 'Colina', d: '+2 em testes de ataque e +2 na Defesa se estiver em posição elevada.' },
                { n: 'Deserto', d: 'RD Fogo 5 e imunidade a cansaço.' },
                { n: 'Floresta', d: '+2 em Furtividade; recebe camuflagem leve quando sob cobertura.' },
                { n: 'Montanha', d: 'RD Eletricidade 5 e Escalada 9m (ou +3m).' },
                { n: 'Pântano', d: 'RD Ácido 5 e resistência a veneno +5.' },
                { n: 'Planície', d: '+2 em Atletismo e Deslocamento +3m.' },
                { n: 'Subterrâneo', d: 'Visão no Escuro (ou alcance aumenta para médio).' },
                { n: 'Urbano', d: 'RD Psíquico 5; pode usar Sobrevivência para Diplomacia e Investigação.' }
            ]
        },
        poderes: [
            {
                name: 'Domínio de Terreno',
                req: 'Conhecimento, Fortitude e Sobrevivência treinados',
                desc: 'Escolha dois tipos de terreno da lista de Domínios. Você recebe seus benefícios permanentemente, mesmo fora desses terrenos. Pode ser escolhido mais vezes para terrenos diferentes.'
            },
            {
                name: 'Explorador do Horizonte',
                req: 'Domínio de Terreno, Explorador',
                desc: 'Em terrenos que possua Domínio e a habilidade Explorador, o bônus de Explorador aplica-se a todos os testes de perícia e aumenta em +1 para cada dois outros poderes da distinção.'
            },
            {
                name: 'Já Vi de Tudo',
                req: 'Domínio de Terreno',
                desc: 'Usa Sobrevivência para identificar criaturas (ação de movimento). Aprende Suporte Ambiental (custo -1 PM se já a conhecia).'
            },
            {
                name: 'Domínio Planar',
                req: 'Três outros poderes de andarilho do horizonte',
                desc: 'Aprende Salto Dimensional. Em terrenos de seu Domínio, pode gastar 8h e teste de Sobrevivência (CD 30) para lançar Viagem Planar para um destino específico.'
            },
            {
                name: 'Lá Onde Não Há Horizonte',
                req: 'Ter sobrevivido à Tormenta, quatro outros poderes da distinção',
                desc: 'Ganha +5 em resistências contra efeitos da Tormenta e seus servos. Reduz perda de PM por efeitos (como Insanidade) em -1 (aumenta em -1 a cada dois outros poderes). Conta como Domínio de Terreno (Tormenta).'
            }
        ]
    },
    {
        id: 'cavaleiro-redencao',
        name: 'Cavaleiro da Redenção',
        source: 'heróicas',
        exclusiva: false,
        admissao: 'O candidato deve ter cometido um erro grave e carregar um profundo sentimento de culpa. Deve encontrar um mentor na Ordem e realizar uma tarefa de reparação pelos seus pecados (como reconstruir o que destruiu ou entregar-se às autoridades). Após corrigir seus próprios erros, deve atuar como redentor, ajudando outra pessoa desgarrada a obter uma segunda chance e limpando o caminho para que ela recomece. A jornada termina com uma cerimônia de sagração e a designação de um novo dever pelo mentor.',
        marca: {
            name: 'Marca da Distinção: Presença Protetora',
            desc: 'O efeito de sua habilidade Égide Sagrada estende-se para todos os aliados em alcance curto, em vez de apenas aliados adjacentes.'
        },
        poderes: [
            {
                name: 'Escudo Redentor',
                req: 'Diplomacia, Luta e Vontade treinados, Égide Sagrada, devoto de Thyatis',
                desc: 'Quando um aliado sob sua Égide é alvo de ataque/efeito, gasta 2 PM para fornecer a ele os bônus do seu escudo (Defesa, resistências e RD). Se o aliado sofrer dano, você sofre metade no lugar dele.'
            },
            {
                name: 'Conceder Segunda Chance',
                req: 'Escudo Redentor',
                desc: 'Uma vez por rodada, quando um aliado em alcance curto falha em um teste, gasta 2 PM para que ele role novamente. Pode usar mais vezes por rodada (+1 a cada dois outros poderes da distinção) em testes diferentes.'
            },
            {
                name: 'Palavras Redentoras',
                req: 'Escudo Redentor',
                desc: 'Você aprende e pode lançar as magias Escudo da Fé e Tranquilidade (atributo-chave Carisma).'
            },
            {
                name: 'Provocação Flamejante',
                req: 'Escudo Redentor, Provocação Petulante',
                desc: 'Se um inimigo resistir à sua Provocação Petulante, gasta 1 PM para causar 2d6 de dano de fogo. Pode gastar +1 PM para cada outro poder da distinção para aumentar o dano em +2d6.'
            },
            {
                name: 'Revoada da Fênix',
                req: 'Escudo Redentor',
                desc: 'Uma vez por rodada, gasta 2 PM para receber uma ação de movimento adicional, usada exclusivamente para se deslocar em direção a um aliado.'
            }
        ]
    },
    {
        id: 'cavaleiro-libertador',
        name: 'Cavaleiro Libertador',
        source: 'heróicas',
        exclusiva: false,
        admissao: 'O candidato deve ser devoto de Valkaria e realizar um ato de grandeza contra a opressão (como derrubar um tirano ou libertar prisioneiros) que represente um perigo real para seu grupo. Após o feito, deve espalhar a notícia para inspirar outros. A Ordem dos Libertadores, em Deheon, julgará o valor desses atos e poderá convocar o candidato para ser sagrado cavaleiro.',
        marca: {
            name: 'Marca da Distinção: Flâmula do Libertador',
            desc: 'Você recebe um tabardo da Ordem que funciona como símbolo sagrado de Valkaria. Se usado com uma armadura, não conta no limite de itens vestidos.'
        },
        poderes: [
            {
                name: 'Inspirar Bravura',
                req: 'Car 2, Diplomacia treinado, devoto de Valkaria',
                desc: 'Gasta 2 PM para aura de 9m. Você e aliados ganham +2 no dano e em resistências contra medo, efeitos mentais e de movimento. Pode gastar +1 PM para aumentar o bônus em +1 a cada dois outros poderes da distinção.'
            },
            {
                name: 'Campeão da Deusa',
                req: 'Religião treinado, Inspirar Bravura',
                desc: 'Ação de movimento (2 PM): recebe um poder concedido de Valkaria à sua escolha até o fim da cena ou até usar este poder novamente.'
            },
            {
                name: 'Desafiar o Perigo',
                req: 'Coragem Total, Inspirar Bravura',
                desc: 'Recebe +1 em perícias e Defesa ao lutar em desvantagem numérica (dobro de inimigos) ou contra adversário de ND igual ou superior ao seu nível (+1 a cada dois outros poderes da distinção).'
            },
            {
                name: 'Habilidade de Herói',
                req: 'Inspirar Bravura',
                desc: 'Você recebe +1 em um atributo à sua escolha. Se possuir todos os cinco poderes da distinção, recebe +1 em outro atributo adicional.'
            },
            {
                name: 'Por Valkaria!',
                req: 'Habilidade de Herói',
                desc: 'Ação padrão (2 PM): Escolha um poder concedido de Valkaria que você possua; todos os aliados em alcance curto recebem esse poder até o fim da cena.'
            }
        ]
    },
    {
        id: 'vigilante-mascarado',
        name: 'Vigilante Mascarado',
        source: 'heróicas',
        exclusiva: false,
        admissao: 'O candidato deve ter uma motivação transformadora para combater o crime e expressar um juramento solene. Deve criar uma identidade secreta com um codinome e um traje marcante (mantendo o segredo para no máximo duas pessoas) e desenvolver uma técnica ou ataque único. A prova final exige combater um crime sozinho, sem ajuda de aliados e sem revelar sua face, usando efetivamente sua manobra registrada.',
        marca: {
            name: 'Marca da Distinção: Traje das Sombras',
            desc: 'Escolha um traje: ele fornece +1 em Furtividade e Intimidação e reduz a penalidade de armadura em –1. Esses bônus aumentam em +1 para cada poder da distinção que você possuir.'
        },
        detalhes: {
            titulo: 'O Peso da Máscara',
            conteudo: 'As habilidades dependem do segredo. Se a identidade for revelada publicamente ou para muitas pessoas, o vigilante perde todos os bônus da marca e poderes da distinção até estabelecer uma nova identidade ou provar que a revelação era falsa.',
            arsenal: []
        },
        poderes: [
            {
                name: 'Cavaleiro das Trevas',
                req: 'Furtividade, Intimidação e Luta treinados, Ataque Furtivo',
                desc: 'Recebe visão no escuro e pode usar Ataque Furtivo contra alvos sob qualquer condição de medo (mesmo sem flanco/desprevenido). Pode gastar 1 PM em um crítico ou furtivo para ignorar imunidades a esses ataques.'
            },
            {
                name: 'Criatura da Noite',
                req: 'Cavaleiro das Trevas, animal estampado no traje',
                desc: 'Ação completa (3 PM): transforma-se em uma versão humanoide de um animal (como Forma Selvagem de Druida). Com 3 poderes pode usar a versão aprimorada (6 PM) e com 5 poderes a superior (10 PM).'
            },
            {
                name: 'Mobilidade Urbana',
                req: 'Acrobacia treinado, Cavaleiro das Trevas',
                desc: 'Em cidades, recebe +1 na Defesa e em perícias físicas/investigação (+1 por outro poder da distinção). Pode gastar 2 PM para investir pulando de lugar elevado; se passar em Acrobacia, causa +1d6 de dano para cada dado de queda reduzido.'
            },
            {
                name: 'Símbolo de Esperança',
                req: 'Cavaleiro das Trevas',
                desc: 'No início da cena ou ao abater inimigo, gasta 3 PM: você e aliados em alcance curto recebem +2 na Defesa e resistências até o fim da cena, e a próxima habilidade de cada aliado custa –1 PM.'
            },
            {
                name: 'Vingador Sem Rosto',
                req: 'Cavaleiro das Trevas',
                desc: 'Imune a todas as formas de detecção mágica ou mundana de sua identidade (como Visão da Verdade ou Intuição). O segredo só pode ser descoberto se a máscara for removida enquanto você estiver inconsciente ou paralisado.'
            }
        ]
    },
    {
        id: 'cavaleiro-ceruleo',
        name: 'Cavaleiro Cerúleo',
        source: 'revista-tormenta',
        exclusiva: false,
        admissao: 'O candidato deve ser aceito em Monteclaro por fama ou recomendação e completar uma missão para a Ordem. Se identificado como um "coração livre", ele e sua montaria realizam o Teste das Duas Asas: um labirinto onde devem se encontrar no centro e saltar juntos em um abismo. A coragem de saltar e a confiança da montaria garantem a sagração. O cavaleiro deve seguir o Código de Honra.',
        marca: {
            name: 'Marca da Distinção: Voar é Viver',
            desc: 'Gasta 1 PM para que sua montaria ganhe asas mágicas (Voo 12m ou +6m se já voar) até o fim da cena. Você passa a seguir o Código de Honra (se já não o seguia).'
        },
        poderes: [
            {
                name: 'Investida Cerúlea',
                req: 'Carga de Cavalaria, um parceiro montaria',
                desc: 'Em investida montada voadora (1 PM): subida não custa dobro, não precisa ser linha reta e não sofre penalidade na Defesa. Causa +1d8 de dano no primeiro ataque (aumenta passo a cada dois outros poderes).'
            },
            {
                name: 'Acrobacia Aérea',
                req: 'treinado em Acrobacia, Investida Cerúlea',
                desc: 'Sobre montaria voadora: ignora penalidade de armadura em Acrobacia. Se usar armadura pesada, ganha +1 na Defesa (+1 por outro poder da distinção). Não funciona sob condição de movimento.'
            },
            {
                name: 'Criatura o Firmamento',
                req: 'Acrobacia Aérea',
                desc: 'Ao atacar corpo a corpo, faz teste de Acrobacia vs Defesa do alvo (+2 se montado). Sucesso: ataque conta como investida sem distância mínima. Falha: perde 1 PM.'
            },
            {
                name: 'Nuvem de Aço',
                req: 'Investida Cerúlea',
                desc: 'Sobre montaria voadora: ao sofrer dano, gasta 2 PM para teste de Acrobacia e reduz o dano pelo resultado. Melhora a sobrevivência da montaria (aumenta passo do dado de parceiro vulnerável).'
            },
            {
                name: 'Proteger Sempre',
                req: 'treinado em Reflexos, Investida Cerúlea',
                desc: 'Aliados adjacentes ganham +2 na Defesa e Reflexos. Pode gastar 2 PM para trocar de lugar com um aliado alvo de efeito, ganhando RD 5 e +2 em resistências (escalam com outros poderes).'
            }
        ]
    }

];


