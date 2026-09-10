const powersData = [
    // ========================================================================
    // ARCANISTA: HABILIDADES BÁSICAS (PROGRESSÃO)
    // ========================================================================
    {
        name: "Caminho do Arcanista",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "arcanista-base",
        desc: "Escolha um caminho: Bruxo, Feiticeiro, Mago ou Necromante. Define seus PM iniciais, atributo-chave e mecânica de recuperação/preparação de magias."
    },
    {
        name: "Magias (1º Círculo)",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Você inicia com 3 magias de 1º círculo. Limite de PM por magia: igual ao seu nível. Atributo-chave define CD (10 + metade do nível + Atributo)."
    },
    {
        name: "Alta Arcana",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 20",
        pathReq: "arcanista-base",
        desc: "O custo em PM de suas magias arcanas é reduzido à metade (arredondado para baixo)."
    },

    // ========================================================================
    // ARCANISTA: CAMINHOS (DEFINIÇÕES)
    // ========================================================================
    {
        name: "Caminho: Bruxo",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "bruxo",
        desc: "Atributo: Inteligência. Usa Foco Arcano (item). Se perder o foco: exige teste de Misticismo (CD 20 + custo da magia) para conjurar. Aprende uma magia adicional por nível."
    },
    {
        name: "Caminho: Feiticeiro",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "feiticeiro",
        desc: "Atributo: Carisma. Não precisa decorar magias ou de foco arcano. Conhece menos magias (aprende uma magia adicional a cada nível par.(2, 4, 6...)). Deve escolher uma Linhagem Sobrenatural."
    },
    {
        name: "Caminho: Mago",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "mago",
        desc: "Atributo: Inteligência. Usa Grimório. Recebe uma magia adicional por círculo de magia que alcança (inicia com 1 magia adicional de 1º círculo). Deve preparar magias (1 hora/dia). Prepara metade das magias que conhece. Se perder grimório: não pode trocar magias preparadas. Pode aprender magias de pergaminhos (via poder)."
    },
    // --- LINHAGENS SOBRENATURAIS (FEITICEIRO) ---
    {
        name: "Linhagem Dracônica",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Caminho do Feiticeiro",
        pathReq: "feiticeiro",
        desc: "Um de seus antepassados foi um majestoso dragão. Escolha um tipo de dano entre ácido, eletricidade, fogo ou frio.<br><br><strong>• Básica:</strong> Você soma seu Carisma em seus pontos de vida iniciais e recebe redução de dano 5 ao tipo escolhido.<br><strong>• Aprimorada:</strong> Suas magias do tipo escolhido custam –1 PM e causam +1 ponto de dano por dado.<br><strong>• Superior:</strong> Você passa a somar o dobro do seu Carisma em seus pontos de vida iniciais e se torna imune a dano do tipo escolhido. Além disso, sempre que reduz um ou mais inimigos a 0 PV ou menos com uma magia do tipo escolhido, você recebe uma quantidade de PM temporários igual ao círculo da magia."
    },
    {
        name: "Linhagem Feérica",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Caminho do Feiticeiro",
        pathReq: "feiticeiro",
        desc: "Seu sangue foi tocado pelas fadas.<br><br><strong>• Básica:</strong> Você se torna treinado em Enganação e aprende uma magia de 1º círculo de encantamento ou ilusão, arcana ou divina, a sua escolha.<br><strong>• Aprimorada:</strong> A CD para resistir a suas magias de encantamento e ilusão aumenta em +2 e suas magias dessas escolas custam –1 PM.<br><strong>• Superior:</strong> Você recebe +2 em Carisma. Se uma criatura passar no teste de resistência contra uma magia de encantamento ou ilusão lançada por você, você fica alquebrado até o final da cena."
    },
    {
        name: "Linhagem Rubra",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Caminho do Feiticeiro",
        pathReq: "feiticeiro",
        desc: "Seu sangue foi corrompido pela Tormenta.<br><br><strong>• Básica:</strong> Você recebe um poder da Tormenta. Além disso, pode perder outro atributo em vez de Carisma por poderes da Tormenta.<br><strong>• Aprimorada:</strong> Escolha uma magia para cada poder da Tormenta que você possui. Essas magias custam –1 PM. Sempre que recebe um novo poder da Tormenta, você pode escolher uma nova magia. Esta herança conta como um poder da Tormenta (exceto para perda de Carisma).<br><strong>• Superior:</strong> Você recebe +4 PM para cada poder da Tormenta que tiver. Esta herança conta como um poder da Tormenta (exceto para perda de Carisma)."
    },
    {
        name: "Linhagem Abençoada",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Caminho do Feiticeiro",
        pathReq: "feiticeiro",
        desc: "Conexão com um Deus Maior.<br><br><strong>• Básica:</strong> Escolha um deus. Aprende 1 magia divina de 1º círculo. Pode aprender magias divinas de 1º círculo como de feiticeiro. Nível 2: Recebe um poder concedido do deus (sem precisar ser devoto).<br><strong>• Aprimorada:</strong> Magias divinas de círculo <= Sabedoria custam -1 PM. Aprende divinas de 2º/3º círculo como feiticeiro.<br><strong>• Superior:</strong> +1 Sabedoria. Aprende 1 magia divina de cada círculo acessível (troca com descanso). Aprende divinas de 4º/5º círculo como feiticeiro."
    },

    // ========================================================================
    // ARCANISTA: VARIANTE NECROMANTE (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Caminho do Necromante",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "necromante",
        desc: "Aprende magias de Necromancia divinas como arcanas. Proibida: Encantamento. 50% das magias conhecidas devem ser Necromancia. Para lançar magias, deve gastar PV = Círculo Máximo que deseja lançar (dura pela cena). Atributo: Inteligência."
    },
    {
        name: "Falar com Mortos",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 1",
        pathReq: "necromante",
        desc: "Usa Misticismo para persuasão com mortos-vivos. Nível 3: Ação padrão e 1 PM para conversar com cadáver em alcance curto (efeito de Voz Divina)."
    },
    {
        name: "Animar Cadáver",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 2",
        pathReq: "necromante",
        desc: "Ação completa e 3 PM. Anima cadáver (P/M/G) como parceiro iniciante. Pode sacrificar parceiro para reduzir dano à metade.<br>• Nível 7: Veterano (6 PM).<br>• Nível 11: Mestre (9 PM)."
    },
    {
        name: "Necrologia",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 3",
        pathReq: "necromante",
        desc: "Recebe +2 em Cura, Fortitude e na CD de suas magias de Necromancia. Bônus aumenta +1 a cada 5 níveis."
    },
    {
        name: "Distorção Necrótica",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 4",
        pathReq: "necromante",
        desc: "Escolha uma magia conhecida de 1º círculo (não necromancia). A escola dela muda para Necromancia (altera aparência do efeito)."
    },
    {
        name: "Necropotência",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 5",
        pathReq: "necromante",
        desc: "Ao ativar conexão com a morte, pode gastar o dobro de PV. Se fizer: ao reduzir vivo a 0 PV com necromancia, recebe 2 PM temporários (máx = nível)."
    },
    {
        name: "Ritual do Lich",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Celebrar Ritual, Escrever Pergaminho, Preparar Poção, 17º nível de necromante",
        pathReq: "necromante",
        desc: "Você aprendeu o Ritual do Lich e pode executar seus passos para se tornar um morto-vivo poderoso. (Ver regras completas no livro)."
    },
    {
        name: "Domínio Sobre a Morte",
        type: "class",
        class: "arcanista",
        subType: "ability",
        req: "Nível 20 (Substitui Alta Arcana)",
        pathReq: "necromante",
        desc: "Custo de magias de Necromancia reduzido à metade. Ao matar criatura viva com necromancia: pode gastar 2 PM para erguê-la como morto-vivo sob seu controle (Servo Morto-Vivo, sem material)."
    },
    // ========================================================================
    // ARCANISTA: PODERES DE CLASSE (TEXTO CORRIGIDO)
    // ========================================================================
    {
        name: "Arcano de Batalha",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Quando lança uma magia, você soma seu atributo-chave na rolagem de dano."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Caldeirão do Bruxo",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Bruxo, treinado em Ofício (alquimista)",
        pathReq: "bruxo",
        desc: "Você pode criar poções, como se tivesse o poder geral Preparar Poção. Se tiver ambos, pode criar poções de até 5º círculo."
    },
    {
        name: "Conhecimento Mágico",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Você aprende duas magias de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser."
    },
    {
        name: "Contramágica Aprimorada",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Dissipar Magia",
        pathReq: "all",
        desc: "Uma vez por rodada, você pode fazer uma contramágica como uma reação."
    },
    {
        name: "Envolto em Mistério",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Sua aparência e postura assombrosas o permitem manipular e assustar pessoas ignorantes ou supersticiosas. Como regra geral, você recebe +5 em Enganação e Intimidação contra pessoas não treinadas em Conhecimento ou Misticismo."
    },
    {
        name: "Escriba Arcano",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Mago, treinado em Ofício (escriba)",
        pathReq: "mago",
        desc: "Você pode aprender magias copiando os textos de pergaminhos e grimórios de outros magos. Exige um dia de trabalho e T$ 250 em matérias-primas por PM necessário para lançar a magia (ex: 3º círculo = 6 PM = T$ 1.500)."
    },
    {
        name: "Especialista em Escola",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Bruxo ou Mago",
        pathReq: "all", // Pode ser bruxo ou mago, então deixamos 'all' ou tratamos com lógica especial. Deixarei 'all' para aparecer na lista geral se não tiver filtro específico.
        desc: "Escolha uma escola de magia. A CD para resistir a suas magias dessa escola aumenta em +2."
    },
    {
        name: "Familiar",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Você possui um animal de estimação mágico. (Verifique o quadro de Familiares no livro para benefícios específicos de cada animal)."
    },
    {
        name: "Fluxo de Mana",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "10º nível de arcanista",
        pathReq: "all",
        desc: "Você pode manter dois efeitos sustentados ativos simultaneamente com apenas uma ação livre, pagando o custo de cada efeito separadamente."
    },
    {
        name: "Foco Vital",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Bruxo",
        pathReq: "bruxo",
        desc: "Se você estiver segurando seu foco e sofrer dano que o levaria a 0 PV ou menos, você fica com 1 PV e o foco perde PV igual ao valor excedente ou até ser destruído (se o foco for destruído, você sofre o dano excedente)."
    },
    {
        name: "Fortalecimento Arcano",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "5º nível de arcanista",
        pathReq: "all",
        desc: "A CD para resistir a suas magias aumenta em +1. Se você puder lançar magias de 4º círculo, em vez disso ela aumenta em +2."
    },
    {
        name: "Herança Aprimorada",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Feiticeiro, 6º nível de arcanista",
        pathReq: "feiticeiro",
        desc: "Você recebe a herança aprimorada de sua linhagem sobrenatural. (Veja card da Linhagem)."
    },
    {
        name: "Herança Superior",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Herança Aprimorada, 11º nível de arcanista",
        pathReq: "feiticeiro",
        desc: "Você recebe a herança superior de sua linhagem sobrenatural. (Veja card da Linhagem)."
    },
    {
        name: "Magia Pungente",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Quando lança uma magia, você pode pagar 1 PM para aumentar em +2 a CD para resistir a ela."
    },
    {
        name: "Mestre em Escola",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Especialista em Escola, 8º nível de arcanista",
        pathReq: "mago", // Tecnicamente Bruxo pode pegar especialista, mas Mestre em Escola exige ser 'Especialista'. Geralmente associado a mago, mas verifique se Bruxo pode pegar Especialista. O texto acima diz "Pré-req: Bruxo ou Mago" para especialista. Então Mestre pode ser pego por Bruxo também.
        desc: "Escolha uma escola de magia (da qual seja Especialista). O custo para lançar magias dessa escola diminui em –1 PM."
    },
    {
        name: "Poder Mágico",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Você recebe +1 ponto de mana por nível de arcanista. O bônus é retroativo e aumenta conforme você sobe de nível."
    },
    {
        name: "Raio Arcano",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Ação padrão. Causa 1d8 dano de essência em alcance curto. Dano aumenta +1d8 para cada círculo acima do 1º. Reflexos (CD atributo) reduz à metade. Conta como magia."
    },
    {
        name: "Raio Elemental",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Raio Arcano",
        pathReq: "all",
        desc: "Ao usar Raio Arcano, pague 1 PM para mudar dano (ácido, eletricidade, fogo, frio, trevas). Falha no teste de resistência causa condição adicional (vulnerável, ofuscado, em chamas, lento ou impede cura)."
    },
    {
        name: "Raio Poderoso",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Raio Arcano",
        pathReq: "all",
        desc: "Os dados de dano do seu Raio Arcano aumentam para d12 e o alcance dele aumenta para médio."
    },
    {
        name: "Tinta do Mago",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Mago, treinado em Ofício (escriba)",
        pathReq: "mago",
        desc: "Você pode criar pergaminhos como se tivesse o poder Escrever Pergaminho. Se tiver ambos, seu custo para criar pergaminhos é reduzido à metade."
    },

    // ========================================================================
    // BÁRBARO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Fúria",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Gaste 2 PM para entrar em Fúria. Recebe +2 em ataque e dano corpo a corpo. Não pode fazer ações de calma/concentração (furtividade, magias). A cada 5 níveis, pode gastar +1 PM para aumentar o bônus em +1. Termina se não atacar ou for alvo de efeito hostil na rodada."
    },
    {
        name: "Instinto Selvagem",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 3",
        pathReq: "all", // COMPARTILHADA
        desc: "Recebe +1 em rolagens de dano, Percepção e Reflexos. A cada seis níveis subsequentes, esse bônus aumenta em +1."
    },
    {
        name: "Redução de Dano",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 5",
        pathReq: "barbaro-base", // EXCLUSIVO PADRÃO
        desc: "Recebe Redução de Dano 2. A cada três níveis subsequentes, a RD aumenta em 2 (Máximo RD 10 no nível 17)."
    },
    {
        name: "Fúria Titânica",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 20",
        pathReq: "barbaro-base", // EXCLUSIVO PADRÃO
        desc: "O bônus de ataque e dano da Fúria é dobrado. (Ex: Se gastar 5 PM para bônus base +5, recebe +10)."
    },

    // ========================================================================
    // BÁRBARO: VARIANTE MACHADO DE PEDRA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Grunhidos",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "machadodepedra",
        desc: "Conhece apenas idioma rústico e sons simples. Aprende apenas 1 palavra em Valkar por nível de Machado de Pedra."
    },
    {
        name: "Machado de Pedra",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "machadodepedra",
        desc: "Não tem proficiência em armas simples (só adaga, azagaia, clava, funda, lança, machadinha, tacape). Com essas armas ou naturais, recebe +1 ataque e dano. Nível 9: Aprende 1 arma simples ou marcial."
    },
    {
        name: "Tanga de Peles",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "machadodepedra",
        desc: "Não usa armadura leve. Se sem armadura: soma Constituição na Defesa. Recebe +1 Defesa no nível 3 e a cada 4 níveis seguintes."
    },
    {
        name: "Fúria Primitiva",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 2",
        pathReq: "machadodepedra",
        desc: "Se sem armadura e usando arma do Machado de Pedra: Fúria custa -1 PM. Ao entrar em Fúria (1/cena), recebe PV temporários = Nível + Con."
    },
    {
        name: "Resiliência Primal",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 5 (Substitui Redução de Dano)",
        pathReq: "machadodepedra",
        desc: "Recebe RD 3. A cada 3 níveis, aumenta +3 (Máximo RD 15 no nível 17)."
    },
    {
        name: "Fúria Rústica",
        type: "class",
        class: "barbaro",
        subType: "ability",
        req: "Nível 20 (Substitui Fúria Titânica)",
        pathReq: "machadodepedra",
        desc: "Ao entrar em Fúria, gaste 5 PM: Recebe Cura Acelerada 10 e, ao usar ação agredir, pode fazer um ataque desarmado extra."
    },

    // ========================================================================
    // BÁRBARO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Alma de Bronze",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Quando entra em fúria, você recebe uma quantidade de pontos de vida temporários igual a seu nível + sua Força."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Brado Assustador",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Treinado em Intimidação",
        pathReq: "all",
        desc: "Ação de movimento e 1 PM. Todos os inimigos em alcance curto ficam vulneráveis até o fim da cena. (Efeito de Medo)."
    },
    {
        name: "Crítico Brutal",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "6º nível de bárbaro",
        pathReq: "all",
        desc: "Seu multiplicador de crítico com armas corpo a corpo e de arremesso aumenta em +1. (Ex: machado x3 vira x4)."
    },
    {
        name: "Destruidor",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "For 1",
        pathReq: "all",
        desc: "Quando causa dano com uma arma corpo a corpo de duas mãos, você pode rolar novamente qualquer resultado 1 ou 2 das rolagens de dano."
    },
    {
        name: "Espírito Inquebrável",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Alma de Bronze",
        pathReq: "all",
        desc: "Enquanto em fúria, não fica inconsciente com 0 PV ou menos. Só morre se chegar a um valor negativo igual à metade dos PV máximos."
    },
    {
        name: "Esquiva Sobrenatural",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Você nunca fica surpreendido."
    },
    {
        name: "Força Indomável",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Pague 1 PM para somar seu nível em um teste de Força ou Atletismo. Pode usar após rolar, mas antes do resultado."
    },
    {
        name: "Frenesi",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Uma vez por rodada, se estiver em fúria e usar a ação agredir (corpo a corpo ou arremesso), gaste 2 PM para fazer um ataque adicional."
    },
    {
        name: "Fúria da Savana",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Deslocamento +3m. Fúria aplica bônus de ataque e dano também a armas de arremesso."
    },
    {
        name: "Fúria Raivosa",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Se sua Fúria for terminar por falta de ataque/dano, pague 1 PM para mantê-la nesta rodada."
    },
    {
        name: "Golpe Poderoso",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Ao acertar ataque (corpo a corpo ou arremesso), gaste 1 PM para causar um dado extra de dano da arma (Ex: Machado 1d12 vira +1d12)."
    },
    {
        name: "Ímpeto",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Gaste 1 PM para aumentar seu deslocamento em +6m por uma rodada."
    },
    {
        name: "Investida Imprudente",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Ao fazer investida, pode aumentar a penalidade de Defesa para –5. Se fizer isso, recebe +1d12 na rolagem de dano do ataque."
    },
    {
        name: "Pele de Aço",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Pele de Ferro, 8º nível de bárbaro",
        pathReq: "all",
        desc: "O bônus de Pele de Ferro na Defesa aumenta para +8."
    },
    {
        name: "Pele de Ferro",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Você recebe +4 na Defesa (apenas se não estiver usando armadura pesada)."
    },
    {
        name: "Sangue dos Inimigos",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Em fúria, ao fazer crítico ou reduzir inimigo a 0 PV: ganha +1 cumulativo em ataque e dano (máximo = nível) até fim da cena."
    },
    {
        name: "Superstição",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Você odeia magia. Recebe resistência a magia +5."
    },
    {
        name: "Totem Espiritual",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Sab 1, 4º nível de bárbaro",
        pathReq: "all",
        desc: "Soma Sabedoria no total de PM. Escolha um animal para aprender uma magia (pode lançar em fúria, Atributo: Sab):<br><br><strong>• Coruja:</strong> Orientação<br><strong>• Corvo:</strong> Visão Mística<br><strong>• Falcão:</strong> Detectar Ameaças<br><strong>• Grifo:</strong> Primor Atlético<br><strong>• Lobo:</strong> Concentração de Combate<br><strong>• Raposa:</strong> Imagem Espelhada<br><strong>• Tartaruga:</strong> Armadura Arcana<br><strong>• Urso:</strong> Vitalidade Fantasma (aprimoramentos de Druida)"
    },
    {
        name: "Vigor Primal",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Ação de movimento. Gaste PM (limite Constituição). Para cada PM gasto, recupera 1d12 PV."
    },

    // ========================================================================
    // BARDO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Inspiração",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 1",
        pathReq: "bardo-base", // EXCLUSIVO PADRÃO
        desc: "Ação Padrão, 2 PM. Você e aliados em alcance curto recebem +1 em testes de perícia até o fim da cena. A cada 4 níveis, pode gastar +2 PM para aumentar o bônus em +1."
    },
    {
        name: "Magias",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Lança magias arcanas (Carisma). 3 Escolas. Começa com duas de 1º círculo. Novos Círculos: 2º (Nvl 6), 3º (Nvl 10), 4º (Nvl 14)."
    },
    {
        name: "Eclético",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 2",
        pathReq: "bardo-base", // EXCLUSIVO PADRÃO
        desc: "Ao fazer um teste de perícia, você pode gastar 1 PM para receber os benefícios de ser treinado nessa perícia para este teste."
    },
    {
        name: "Artista Completo",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 20",
        pathReq: "bardo-base", // EXCLUSIVO PADRÃO
        desc: "Pode usar Inspiração como ação livre. Enquanto sob efeito da Inspiração, suas habilidades de bardo (incluindo magias) custam metade dos PM."
    },
    // ========================================================================
    // BARDO: VARIANTE MAGIMARCIALISTA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Cadência Magimarcial",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 1 (Substitui Inspiração)",
        pathReq: "magimarcialista",
        desc: "Acumula cargas até o fim da cena (máx = Carisma):<br>• <strong>Carga Arcana:</strong> Ganha ao lançar magia de bardo.<br>• <strong>Carga Marcial:</strong> Ganha ao fazer ação agredir."
    },
    {
        name: "Magificação",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 1",
        pathReq: "magimarcialista",
        desc: "Se tiver pelo menos 1 Carga Arcana e 1 Carga Marcial: recebe +2 em ataque e dano e conta como sob efeito de Inspiração. Bônus aumenta +1 a cada 5 níveis."
    },
    {
        name: "Bravado Magimarcial",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 2 (Substitui Eclético)",
        pathReq: "magimarcialista",
        desc: "• Ao lançar magia: gaste 1 Carga Marcial para reduzir custo em -1 PM.<br>• Ao atacar: gaste 1 Carga Arcana para +1d6 dano."
    },
    {
        name: "Dança Defensiva",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 3",
        pathReq: "magimarcialista",
        desc: "• Ao fazer teste de resistência: gaste 1 Carga Marcial para +5 no teste.<br>• Ao sofrer dano: gaste 1 Carga Arcana para RD 10 contra esse dano."
    },
    {
        name: "Arte Sublime",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 7",
        pathReq: "magimarcialista",
        desc: "Ao usar Bravado ou Dança, pode gastar uma carga adicional do tipo exigido para dobrar o efeito (Ex: -2 PM, +2d6 dano, +10 Resistência ou RD 20)."
    },
    {
        name: "Crescendo Vitorioso",
        type: "class",
        class: "bardo",
        subType: "ability",
        req: "Nível 20 (Substitui Artista Completo)",
        pathReq: "magimarcialista",
        desc: "Inicia combate com 1 Carga Arcana e 1 Marcial. Soma total de Cargas Marciais na CD das suas habilidades e total de Cargas Arcanas no ataque e dano."
    },

    // ========================================================================
    // BARDO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Arte Mágica",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Enquanto você estiver sob efeito de sua Inspiração, a CD para resistir a suas habilidades de bardo aumenta em +2."
    },
    {
        name: "Aumentar Repertório",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Você aprende duas magias de qualquer círculo que possa lançar. Devem pertencer às escolas que sabe usar, mas podem ser arcanas ou divinas."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Dança das Lâminas",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Esgrima Mágica, 10º nível de bardo",
        pathReq: "all",
        desc: "Quando lança uma magia (ação padrão), pode gastar 1 PM para fazer um ataque corpo a corpo como ação livre."
    },
    {
        name: "Esgrima Mágica",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Se estiver sob efeito de Inspiração, pode usar Atuação em vez de Luta para ataques com armas leves ou de uma mão."
    },
    {
        name: "Estrelato",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "6º nível de bardo",
        pathReq: "all",
        desc: "Quando usa Atuação para impressionar uma plateia, o bônus recebido em perícias baseadas em Carisma aumenta para +5. (Você é famoso e reconhecido)."
    },
    {
        name: "Fascinar em Massa",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Música: Balada Fascinante",
        pathReq: "all",
        desc: "Quando usa Balada Fascinante, pode gastar +2 PM para afetar todas as criaturas a sua escolha no alcance (faz um único teste de Atuação)."
    },
    {
        name: "Golpe Elemental",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Golpe Mágico",
        pathReq: "all",
        desc: "Sob efeito de Inspiração, ao acertar ataque corpo a corpo: gaste 1 PM para causar +1d6 dano (ácido, eletricidade, fogo ou frio). A cada 4 níveis, pode gastar +1 PM para aumentar dano em +1d6."
    },
    {
        name: "Golpe Mágico",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Esgrima Mágica",
        pathReq: "all",
        desc: "Sob efeito de Inspiração, ao acertar ataque corpo a corpo em inimigo: recebe 2 PM temporários cumulativos (Máximo por cena = seu nível). Somem no fim da cena."
    },
    {
        name: "Inspiração Marcial",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Sua Inspiração aplica o bônus também em rolagens de dano (além dos testes de perícia)."
    },
    {
        name: "Lendas e Histórias",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Ao fazer teste de Conhecimento, Misticismo, Nobreza ou Religião (para informação/identificar), gaste 1 PM para rolar novamente."
    },
    {
        name: "Mestre dos Sussurros",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Car 1, treinado em Enganação e Investigação",
        pathReq: "all",
        desc: "Em testes de Investigação (interrogar) ou Enganação (intriga), role dois dados e use o melhor. Pode fazer esses testes em ambientes sociais sem custo e em 1 minuto."
    },
    {
        name: "Manipular",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Música: Balada Fascinante",
        pathReq: "all",
        desc: "Gaste 1 PM para transformar uma criatura fascinada em enfeitiçada até o fim da cena (Vontade CD Carisma anula). Se passar, imune por um dia. Não conta como ameaça."
    },
    {
        name: "Manipular em Massa",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Fascinar em Massa, Manipular, 10º nível de bardo",
        pathReq: "all",
        desc: "Quando usa Manipular, pode gastar +2 PM para afetar todas as criaturas a sua escolha em alcance curto."
    },
    {
        name: "Música: Balada Fascinante",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Atuação vs Vontade (alcance curto). Sucesso: alvo fica fascinado enquanto você se concentrar (ação padrão). Hostil/Combate recebe +5 no teste e testa nova a cada rodada. Imune por 1 dia se passar."
    },
    {
        name: "Música: Canção Assustadora",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Atuação vs Vontade (alcance curto, inimigos escolhidos). Falha: abalado até o fim da cena. Sucesso: imune por um dia."
    },
    {
        name: "Música: Melodia Curativa",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Ação padrão. Criaturas escolhidas em alcance curto recuperam 1d6 PV. Custo variável: +1 PM para aumentar cura em +1d6."
    },
    {
        name: "Paródia",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Uma vez por rodada, ao ver magia lançada (médio): Reação, 1 PM + Teste Atuação (CD 15 + custo magia). Sucesso: pode lançar essa magia até o fim do próximo turno."
    },
    {
        name: "Prestidigitação",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "6º nível de bardo",
        pathReq: "all",
        desc: "Ao fazer ação padrão, teste Atuação (CD 15 + custo magia) para lançar magia (completa ou menor) como ação livre, camuflada nos gestos. Percepção da magia exige Misticismo CD 20."
    },

    // ========================================================================
    // BUCANEIRO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Audácia",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "bucaneiro-base", // EXCLUSIVO PADRÃO
        desc: "Quando faz um teste de perícia, você pode gastar 2 PM para somar seu Carisma no teste. Não pode usar em testes de ataque."
    },
    {
        name: "Insolência",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Você soma seu Carisma na Defesa (limitado pelo seu nível). Exige liberdade de movimentos (sem armadura pesada ou condição imóvel)."
    },
    {
        name: "Evasão",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 2",
        pathReq: "bucaneiro-base", // EXCLUSIVO PADRÃO
        desc: "Quando sofre um efeito que permite Reflexos para reduzir o dano à metade, você não sofre dano algum se passar. (Sofre dano normal se falhar). Exige liberdade de movimentos."
    },
    {
        name: "Esquiva Sagaz",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 3",
        pathReq: "all", // COMPARTILHADA
        desc: "Recebe +1 na Defesa e em Reflexos. Esse bônus aumenta em +1 a cada quatro níveis. Exige liberdade de movimentos."
    },
    {
        name: "Panache",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 5",
        pathReq: "bucaneiro-base", // EXCLUSIVO PADRÃO
        desc: "Sempre que faz um acerto crítico em combate ou reduz um inimigo a 0 PV, você recupera 1 PM."
    },
    {
        name: "Evasão Aprimorada",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 10",
        pathReq: "bucaneiro-base", // EXCLUSIVO PADRÃO
        desc: "Quando sofre efeito que permite Reflexos para reduzir dano à metade: você não sofre dano se passar e sofre apenas metade se falhar. Exige liberdade de movimentos."
    },
    {
        name: "Sorte de Nimb",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 20",
        pathReq: "bucaneiro-base", // EXCLUSIVO PADRÃO
        desc: "Quando faz um teste, pode gastar 5 PM para rolá-lo novamente. Qualquer resultado 11 ou mais na segunda rolagem será considerado um 20 natural."
    },
    // ========================================================================
    // BUCANEIRO: VARIANTE DUELISTA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Duelo",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 1 (Substitui Audácia)",
        pathReq: "duelista",
        desc: "Gaste 2 PM para marcar oponente (curto). Recebe +2 ataque/dano contra ele até fim da cena. Termina se atacar outro. A cada 5 níveis, pode gastar +1 PM para aumentar bônus em +1."
    },
    {
        name: "Escola de Duelo",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 2 (Substitui Evasão)",
        pathReq: "duelista",
        desc: "Escolha uma:<br><strong>• Ambidestra:</strong> Se empunhar duas armas (uma leve): +2 Defesa e Reflexos.<br><strong>• Clássica:</strong> Se empunhar arma 1 mão e nada na outra: +2 dano.<br><strong>• Tiro:</strong> Proficiência armas de fogo leves/1 mão. Pode usar habilidades de bucaneiro (normalmente corpo a corpo) com elas."
    },
    {
        name: "Truques de Capa",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 4 (Requisito de nível para variantes de Panache)",
        pathReq: "duelista",
        desc: "Se usar capa esvoaçante, gaste 2 PM para efeito:<br>• <strong>Capa Inoportuna (Livre):</strong> Reduz ação de fintar em um passo.<br>• <strong>Distração (Reação):</strong> +5 em teste de Reflexos ou Vontade.<br>• <strong>Efeito Dramático (Livre):</strong> +5 em teste de Carisma.<br>• <strong>Impulso (Livre):</strong> +9m deslocamento e +5 Acrobacia/Atletismo.<br>• <strong>Paraquedas (Reação):</strong> Reduz dano de queda em 6d6.<br>• <strong>Rasgar a Capa (Reação):</strong> Reduz dano sofrido à metade (destrói capa)."
    },
    {
        name: "Técnica Avançada",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 10 (Substitui Evasão Aprimorada)",
        pathReq: "duelista",
        desc: "Conforme escola:<br><strong>• Ambidestra:</strong> Se criatura errar ataque em você, gaste 1 PM para fazer ataque nela (1 vez/rodada).<br><strong>• Clássica:</strong> Dano da escola sobe para +5. Se fizer crítico ao agredir, pode gastar 1 PM para ataque extra.<br><strong>• Tiro:</strong> Dano arma de fogo aumenta um passo e alcance aumenta uma categoria."
    },
    {
        name: "Duelista Lendário",
        type: "class",
        class: "bucaneiro",
        subType: "ability",
        req: "Nível 20 (Substitui Sorte de Nimb)",
        pathReq: "duelista",
        desc: "Ao atacar usando sua escola: gaste 1 PM para rolar novamente. Se oponente atacar você enquanto usa escola: gaste 1 PM para forçá-lo a rolar novamente (1 vez por ataque)."
    },

    // ========================================================================
    // BUCANEIRO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Abusar dos Fracos",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Flagelo dos Mares",
        pathReq: "all",
        desc: "Quando ataca uma criatura sob efeito de uma condição de medo, seu dano aumenta em um passo."
    },
    {
        name: "Amigos no Porto",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Car 1, 6º nível de bucaneiro",
        pathReq: "all",
        desc: "Em comunidade portuária, teste Carisma (CD 10). Sucesso: encontra amigo para pedir favor ou que ajuda como parceiro veterano por um dia."
    },
    {
        name: "Aparar",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Esgrimista",
        pathReq: "all",
        desc: "Uma vez por rodada, ao ser atingido por ataque: Gaste 1 PM para fazer teste de ataque (+ seu nível). Se resultado > ataque do oponente, você evita o ataque. (Apenas armas leves ou ágeis)."
    },
    {
        name: "Apostador",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Treinado em Jogatina",
        pathReq: "all",
        desc: "Gaste um dia jogando. Escolha valor e teste Jogatina:<br>• T$ 100 (CD 15)<br>• T$ 200 (CD 20)<br>• T$ 400 (CD 25)<br>• T$ 800 (CD 30)<br>• T$ 1.600 (CD 35)<br>Sucesso: ganha o valor. Falha: perde o valor."
    },
    {
        name: "Ataque Acrobático",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Quando se aproxima de inimigo com salto/pirueta (Atletismo/Acrobacia) e ataca no mesmo turno: recebe +2 no ataque e dano."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Aventureiro Ávido",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Uma vez por rodada, gaste 5 PM para realizar uma ação padrão ou de movimento adicional. Se tiver 'Surto Heroico', o custo diminui em –2 PM."
    },
    {
        name: "Bravata Audaz",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Jure uma façanha (roubar tesouro, beijar realeza, etc). Se cumprir, seus PM aumentam em +2 por nível de bucaneiro até o fim da aventura."
    },
    {
        name: "Bravata Imprudente",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Na 1ª rodada, jure derrotar inimigos com uma restrição (mão nas costas, vendado, etc). Sofre penalidade no combate. Se vencer, recebe +2 em ataque e margem de ameaça até fim da aventura."
    },
    {
        name: "En Garde",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Esgrimista",
        pathReq: "all",
        desc: "Ação de movimento e 1 PM. Até fim da cena, se usar arma leve/ágil: +2 na margem de ameaça e +2 na Defesa."
    },
    {
        name: "Esgrimista",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Quando usa arma leve ou ágil, soma Inteligência nas rolagens de dano (limitado pelo seu nível)."
    },
    {
        name: "Flagelo dos Mares",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Treinado em Intimidação",
        pathReq: "all",
        desc: "Aprende e pode lançar Amedrontar (Atributo: Carisma). Não é considerada habilidade mágica."
    },
    {
        name: "Folião",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Car 1",
        pathReq: "all",
        desc: "Em festas/tavernas/bailes: recebe +2 em perícias de Carisma e a atitude das pessoas melhora em uma categoria."
    },
    {
        name: "Grudar o Cano",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Treinado em Luta, Pistoleiro",
        pathReq: "all",
        desc: "Ataque à distância com arma de fogo contra oponente adjacente: não sofre penalidade de –5 e aumenta dano em um passo."
    },
    {
        name: "Pernas do Mar",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Recebe +2 em Acrobacia e Atletismo. Ao equilibrar ou escalar, não fica desprevenido e deslocamento não reduz à metade."
    },
    {
        name: "Pistoleiro",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Recebe proficiência com armas de fogo e +2 nas rolagens de dano com essas armas."
    },
    {
        name: "Presença Paralisante",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Car 1, 4º nível de bucaneiro",
        pathReq: "all",
        desc: "Soma Carisma na Iniciativa. Se for o primeiro na iniciativa, ganha uma ação padrão extra na primeira rodada."
    },
    {
        name: "Ripostar",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Aparar, 12º nível de bucaneiro",
        pathReq: "all",
        desc: "Quando usa Aparar e evita o ataque, pode gastar 1 PM para fazer um ataque corpo a corpo imediato contra o inimigo."
    },
    {
        name: "Touché",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Esgrimista, 10º nível de bucaneiro",
        pathReq: "all",
        desc: "Quando se aproxima e ataca (arma leve/ágil) no mesmo turno: gaste 2 PM para aumentar dano em um passo e receber +5 na margem de ameaça."
    },

    // ========================================================================
    // CAÇADOR: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Marca da Presa",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Ação de movimento e 1 PM. Analise criatura em alcance curto. Até fim da cena: +1d4 nas rolagens de dano contra ela. A cada 4 níveis, pode gastar +1 PM para aumentar o bônus de dano."
    },
    {
        name: "Rastreador",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 1",
        pathReq: "cacador-base", // EXCLUSIVO PADRÃO
        desc: "Recebe +2 em Sobrevivência. Pode se mover com deslocamento normal enquanto rastreia sem sofrer penalidades."
    },
    {
        name: "Explorador",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 3",
        pathReq: "cacador-base", // EXCLUSIVO PADRÃO
        desc: "Escolha um terreno (aquático, ártico, colina, deserto, floresta, montanha, pântano, planície, subterrâneo, urbano ou Tormenta no nível 11). Nesse terreno: soma Sabedoria na Defesa e em Acrobacia, Atletismo, Furtividade, Percepção e Sobrevivência. A cada 4 níveis, escolhe outro terreno ou aumenta bônus em +2."
    },
    {
        name: "Caminho do Explorador",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 5",
        pathReq: "cacador-base", // EXCLUSIVO PADRÃO
        desc: "Em seus terrenos escolhidos: atravessa terreno difícil sem reduzir deslocamento e CD para rastrear você aumenta em +10."
    },
    {
        name: "Mestre Caçador",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 20",
        pathReq: "cacador-base", // EXCLUSIVO PADRÃO
        desc: "Pode usar Marca da Presa como ação livre. Pode pagar 5 PM para aumentar margem de ameaça contra a presa em +2. Se reduzir presa a 0 PV, recupera 5 PM."
    },
    // ========================================================================
    // CAÇADOR: VARIANTE SETEIRO (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Caminho do Atirador",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 1 (Restrição)",
        pathReq: "seteiro",
        desc: "Suas habilidades de Seteiro relacionadas a ataques/armas só funcionam com arcos e bestas."
    },
    {
        name: "Tiro de Supressão",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 1 (Substitui Rastreador)",
        pathReq: "seteiro",
        desc: "Ao causar dano com arco/besta em criatura marcada: ela sofre penalidade cumulativa de -1 no dano (até valor = PM gasto na marca) até fim da cena."
    },
    {
        name: "Evasão (Seteiro)",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 3 (Substitui Explorador)",
        pathReq: "seteiro",
        desc: "Se passar em Reflexos para reduzir dano à metade, não sofre dano nenhum. (Exige liberdade de movimentos)."
    },
    {
        name: "Disparo Constritor",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 5 (Substitui Caminho do Explorador)",
        pathReq: "seteiro",
        desc: "Ao usar ação mirar, gaste 2 PM para executar manobra (desarmar, empurrar ou quebrar) com um ataque à distância neste turno."
    },
    {
        name: "Rajada de Flechas",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 10",
        pathReq: "seteiro",
        desc: "Ação completa e 2 PM. Escolha um ponto no alcance. Ataque à distância contra cada inimigo num raio de 3m desse ponto. Para cada acerto, ganha +2 cumulativo no dano. Gasta apenas 1 munição."
    },
    {
        name: "Evasão Aprimorada (Seteiro)",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 13",
        pathReq: "seteiro",
        desc: "Se passar em Reflexos para reduzir dano à metade, não sofre dano. Se falhar, sofre apenas metade."
    },
    {
        name: "Sentinela",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 15",
        pathReq: "seteiro",
        desc: "Uma vez por rodada, se criatura marcada acertar ataque em aliado: gaste 1 PM para fazer ataque contra ela."
    },
    {
        name: "Mestre do Disparo",
        type: "class",
        class: "cacador",
        subType: "ability",
        req: "Nível 20 (Substitui Mestre Caçador)",
        pathReq: "seteiro",
        desc: "Usa Marca da Presa como ação livre. Uma vez por rodada, ao atacar criatura marcada com arco/besta, pode fazer um ataque adicional."
    },

    // ========================================================================
    // CAÇADOR: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Ambidestria",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Des 2",
        pathReq: "all",
        desc: "Ao usar ação agredir com duas armas (pelo menos uma leve), pode fazer dois ataques (um com cada). Sofre –2 em todos os testes de ataque até próximo turno."
    },
    {
        name: "Armadilha: Arataca",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Vítima sofre 2d6 perfuração e fica agarrada. Escapar: ação padrão + teste Força ou Acrobacia (CD Sabedoria)."
    },
    {
        name: "Armadilha: Espinhos",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Vítima sofre 6d6 perfuração. Reflexos (CD Sabedoria) reduz à metade."
    },
    {
        name: "Armadilha: Laço",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Reflexos (CD Sabedoria). Sucesso: caída. Falha: agarrada (escapar CD Sab)."
    },
    {
        name: "Armadilha: Rede",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Área vira terreno difícil. Criaturas na área ficam enredadas e presas na área. Libertar: ação padrão + teste Força ou Acrobacia (CD 25)."
    },
    {
        name: "Armadilheiro",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Um poder de armadilha, 5º nível de caçador",
        pathReq: "all",
        desc: "Soma Sabedoria no dano e na CD de suas armadilhas (cumulativo)."
    },
    {
        name: "Arqueiro",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Sab 1",
        pathReq: "all",
        desc: "Se estiver usando arma de ataque à distância, soma Sabedoria nas rolagens de dano (limitado pelo nível)."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Bote",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Ambidestria, 6º nível de caçador",
        pathReq: "all",
        desc: "Se fizer investida empunhando duas armas, pague 1 PM para fazer um ataque adicional com a arma secundária."
    },
    {
        name: "Camuflagem",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "6º nível de caçador",
        pathReq: "all",
        desc: "Pode gastar 2 PM para se esconder mesmo sem camuflagem ou cobertura disponível."
    },
    {
        name: "Chuva de Lâminas",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Des 4, Ambidestria, 12º nível de caçador",
        pathReq: "all",
        desc: "Uma vez por rodada, ao usar Ambidestria, pague 2 PM para fazer um ataque adicional com arma primária."
    },
    {
        name: "Companheiro Animal",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Car 1, treinado em Adestramento",
        pathReq: "all",
        desc: "Recebe um companheiro animal. Veja quadro de parceiros no livro."
    },
    {
        name: "Elo com a Natureza",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Sab 1, 3º nível de caçador",
        pathReq: "all",
        desc: "Soma Sabedoria no total de PM. Aprende e pode lançar Caminhos da Natureza (Atributo: Sabedoria)."
    },
    {
        name: "Emboscar",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Treinado em Furtividade",
        pathReq: "all",
        desc: "Na primeira rodada do combate, pode gastar 2 PM para realizar uma ação padrão adicional."
    },
    {
        name: "Empatia Selvagem",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Pode usar Adestramento com animais para mudar atitude e persuasão (como Diplomacia). Comunica-se com animais via gestos/sons."
    },
    {
        name: "Ervas Curativas",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Ação completa. Gaste PM (limite Sabedoria) em você ou aliado adjacente. Cada PM cura 2d6 PV ou remove condição envenenado."
    },
    {
        name: "Escaramuça",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Des 2, 6º nível de caçador",
        pathReq: "all",
        desc: "Se mover 6m ou mais: recebe +2 na Defesa/Reflexos e +1d8 dano (corpo a corpo ou curto) até próximo turno. Não funciona com armadura pesada."
    },
    {
        name: "Escaramuça Superior",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Escaramuça, 12º nível de caçador",
        pathReq: "all",
        desc: "Bônus de Escaramuça aumentam para +5 na Defesa/Reflexos e +1d12 no dano."
    },
    {
        name: "Espreitar",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Ao usar Marca da Presa, recebe +1 em perícias contra a presa. Bônus aumenta +1 por PM extra gasto na marca. Dobra com Inimigo."
    },
    {
        name: "Ímpeto",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Gaste 1 PM para aumentar seu deslocamento em +6m por uma rodada."
    },
    {
        name: "Inimigo de (Criatura)",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Escolha um tipo (animal, monstro, morto-vivo, etc) ou duas raças humanoides. Contra esse tipo, Marca da Presa dobra os dados de bônus de dano."
    },
    {
        name: "Olho do Falcão",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Pode usar Marca da Presa em criaturas em alcance longo."
    },
    {
        name: "Ponto Fraco",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Ao usar Marca da Presa, seus ataques contra a presa recebem +2 na margem de ameaça. Dobra com Inimigo."
    },

    // ========================================================================
    // CAVALEIRO: HABILIDADES DE CLASSE (AUTOMÁTICAS)
    // ========================================================================
    {
        name: "Código de Honra",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Não pode atacar oponente pelas costas (flanquear), caído, desprevenido ou incapaz de lutar. Se violar: perde todos os PM e só recupera no dia seguinte."
    },
    {
        name: "Baluarte",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Ao sofrer ataque ou fazer resistência, gaste 1 PM para receber +2 na Defesa e resistências até próximo turno. A cada 4 níveis, pode gastar +1 PM para aumentar bônus em +2.<br>• Nível 7: Pode gastar +2 PM para dar bônus a aliados adjacentes.<br>• Nível 15: Pode gastar +5 PM para dar bônus a aliados em alcance curto."
    },
    {
        name: "Duelo",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 2",
        pathReq: "cavaleiro-base",
        desc: "Gaste 2 PM para marcar oponente em alcance curto: recebe +2 em ataque e dano contra ele até fim da cena (termina se atacar outro). A cada 5 níveis, pode gastar +1 PM para aumentar bônus em +1."
    },
    {
        name: "Caminho do Cavaleiro",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 5",
        pathReq: "cavaleiro-base",
        desc: "Escolha entre Bastião ou Montaria:<br><strong>• Bastião:</strong> Recebe RD 5 se usar armadura pesada (cumulativo com Especialização).<br><strong>• Montaria:</strong> Recebe cavalo de guerra (parceiro veterano, +5 em testes com ele). No nível 11 vira parceiro mestre."
    },
    {
        name: "Resoluto",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 11",
        pathReq: "cavaleiro-base",
        desc: "Gaste 1 PM para refazer teste de resistência contra condição que o afeta. Recebe +5 no novo teste. Se passar, cancela efeito. (Uma vez por efeito)."
    },
    {
        name: "Bravura Final",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 20",
        pathReq: "cavaleiro-base",
        desc: "Se for reduzido a 0 ou menos PV, pode gastar 3 PM para continuar de pé (sustentada). Ao encerrar, sofre efeitos dos PV atuais."
    },

    // ========================================================================
    // CAVALEIRO: VARIANTE VASSALO (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Jovem Pajem & Suserano",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 1 (Substitui Escolha de Poderes)",
        pathReq: "vassalo",
        desc: "<strong>Jovem Pajem:</strong> Treinado em Adestramento ou Ofício (armeiro).<br><strong>Suserano:</strong> Serve a um nobre. +5 Diplomacia/Intimidação com vassalos inferiores. Alojamento grátis nas terras dele. Se deixar de servir, perde PMs."
    },
    {
        name: "Valete",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 2 (Substitui Duelo)",
        pathReq: "vassalo",
        desc: "Treinado em Diplomacia ou Nobreza. Recebe um poder de cavaleiro a escolha."
    },
    {
        name: "Escudeiro Aprendiz",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 3",
        pathReq: "vassalo",
        desc: "Treinado em Cavalgar. Proficiência em armaduras pesadas (se já tiver, recebe +2 Defesa com elas)."
    },
    {
        name: "Guarda do Castelo",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 4",
        pathReq: "vassalo",
        desc: "Treinado em Intuição. Recebe um poder de cavaleiro a escolha."
    },
    {
        name: "Vigilante de Estradas",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 5 (Substitui Caminho do Cavaleiro)",
        pathReq: "vassalo",
        desc: "Recebe habilidade Montaria. Treinado em Percepção."
    },
    {
        name: "Cavaleiro do Reino",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 6",
        pathReq: "vassalo",
        desc: "Título de Sir/Dame. Recebe arma/armadura/escudo superior com 2 melhorias. Recebe um poder de cavaleiro a escolha."
    },
    {
        name: "Sargento do Reino",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 7",
        pathReq: "vassalo",
        desc: "Recebe um poder de cavaleiro ou guerreiro a escolha (conta como guerreiro do seu nível)."
    },
    {
        name: "Capitão do Reino",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 8",
        pathReq: "vassalo",
        desc: "Recebe poder Escudeiro e habilidade Golpe Divino (como paladino do seu nível)."
    },
    {
        name: "Lorde",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 9",
        pathReq: "vassalo",
        desc: "Recebe Autoridade Feudal (se já tiver, vira parceiro veterano). Escolha um Caminho:<br>• <strong>Soldado:</strong> Recebe poder de guerreiro.<br>• <strong>Governante:</strong> Recebe poder de nobre."
    },
    {
        name: "Barão",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 10",
        pathReq: "vassalo",
        desc: "Recebe poder Título e um Domínio nível 1 (ou construção se já tiver domínio)."
    },
    {
        name: "Visconde",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 11 (Substitui Resoluto)",
        pathReq: "vassalo",
        desc: "Conforme caminho escolhido:<br>• <strong>Soldado:</strong> +1 PV por nível de vassalo.<br>• <strong>Governante:</strong> +1 Inteligência."
    },
    {
        name: "Conde",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 12",
        pathReq: "vassalo",
        desc: "Orçamento de T$ 30.000 para itens mágicos por aventura. Recebe um poder de cavaleiro ou geral a escolha."
    },
    {
        name: "Marquês",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 13",
        pathReq: "vassalo",
        desc: "Conforme caminho:<br>• <strong>Soldado:</strong> RD 5 e +2 Defesa.<br>• <strong>Governante:</strong> Soma Carisma nos testes de resistência."
    },
    {
        name: "Duque & Arquiduque",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 14 e 15",
        pathReq: "vassalo",
        desc: "<strong>Duque (14):</strong> Autoridade Feudal aumenta nível do parceiro. Recebe poder de cavaleiro.<br><strong>Arquiduque (15):</strong> 1 vez/rodada, se criatura inteligente causar dano, gaste 5 PM para reduzir a 0."
    },
    {
        name: "Conselheiro Real",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 16",
        pathReq: "vassalo",
        desc: "Recebe poder de cavaleiro. Aprende uma magia divina até 4º círculo (Carisma)."
    },
    {
        name: "Rei Mercenário",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 17",
        pathReq: "vassalo",
        desc: "Recebe 3 pontos de atributo para distribuir em:<br>• <strong>Soldado:</strong> For, Des, Con.<br>• <strong>Governante:</strong> Int, Sab, Car."
    },
    {
        name: "Rei & Alto Rei",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 18 e 19",
        pathReq: "vassalo",
        desc: "<strong>Rei (18):</strong> +1 Carisma. Recebe poder de cavaleiro.<br><strong>Alto Rei (19):</strong> Orçamento sobe para T$ 100.000. Limite de parceiros +2."
    },
    {
        name: "Imperador",
        type: "class",
        class: "cavaleiro",
        subType: "ability",
        req: "Nível 20 (Substitui Bravura Final)",
        pathReq: "vassalo",
        desc: "Recebe +1 em dois atributos diferentes. Aprende magia divina até 5º círculo (Carisma)."
    },

    // ========================================================================
    // CAVALEIRO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Armadura da Honra",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "No início de cada cena, recebe PV temporários = seu nível + Carisma. Duram até o fim da cena."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Autoridade Feudal",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "6º nível de cavaleiro",
        pathReq: "all",
        desc: "Gaste 1 hora e 2 PM para conclamar o povo. Eles contam como parceiro iniciante (tipo a escolha) até fim da aventura. Exige local onde tenha influência."
    },
    {
        name: "Desprezar os Covardes",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Recebe RD 5 se estiver caído, desprevenido ou flanqueado."
    },
    {
        name: "Escudeiro",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Recebe parceiro Escudeiro. Armas dão +1 dano, Armadura dá +1 Defesa. Pode pagar 1 PM para receber ação de movimento extra (levantar, sacar, montaria)."
    },
    {
        name: "Especialização em Armadura",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "12º nível de cavaleiro",
        pathReq: "all",
        desc: "Se usar armadura pesada, recebe RD 5 (cumulativa com Bastião)."
    },
    {
        name: "Estandarte",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Título, 14º nível de cavaleiro",
        pathReq: "all",
        desc: "Início da cena: você e aliados que veem estandarte recebem PM temporários = seu Carisma (mínimo 1). Somem no fim da cena."
    },
    {
        name: "Etiqueta",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Recebe +2 em Diplomacia e Nobreza. Pode gastar 1 PM para rolar novamente testes dessas perícias."
    },
    {
        name: "Investida Destruidora",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Ao fazer investida, gaste 2 PM (antes do ataque) para causar +2d8 de dano."
    },
    {
        name: "Montaria Corajosa",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Montaria",
        pathReq: "all",
        desc: "Sua montaria concede +1d6 de dano corpo a corpo (cumulativo com outros bônus de parceiro)."
    },
    {
        name: "Pajem",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Recebe parceiro Pajem. +2 em Diplomacia. Condição de descanso é uma categoria acima do padrão."
    },
    {
        name: "Postura de Combate: Aríete Implacável",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Aumenta bônus de ataque em investida em +2. Gaste +2 PM ao ativar para aumentar bônus em +1. Investida contra construto/objeto causa +2d8 dano. Precisa se deslocar todo turno."
    },
    {
        name: "Postura de Combate: Castigo de Ferro",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Sempre que aliado adjacente sofrer ataque corpo a corpo, pode gastar 1 PM para fazer ataque contra o agressor."
    },
    {
        name: "Postura de Combate: Foco de Batalha",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Sempre que inimigo atacá-lo, recebe 1 PM temporário (cumulativo, máx = nível). Somem no fim da cena."
    },
    {
        name: "Postura de Combate: Muralha Intransponível",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Empunhar Escudo",
        pathReq: "all",
        desc: "+1 Defesa e Reflexos. Se passar em Reflexos para meio dano, não sofre dano. Gaste +2 PM ao ativar para aumentar bônus em +1. Deslocamento reduzido a 3m."
    },
    {
        name: "Postura de Combate: Provocação Petulante",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Inimigos que iniciam turno em alcance curto testam Vontade (CD Car). Falha: qualquer ação hostil deve ter você como alvo. (Efeito Mental)."
    },
    {
        name: "Postura de Combate: Torre Inabalável",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Imune a ser movido. Não pode se deslocar. Soma Constituição na Defesa. Pode usar Fortitude no lugar de Reflexos e Vontade."
    },
    {
        name: "Solidez",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Empunhar Escudo",
        pathReq: "all",
        desc: "Soma o bônus na Defesa recebido pelo escudo também nos testes de resistência."
    },
    {
        name: "Título",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Autoridade Feudal, 10º nível, terras/serviço",
        pathReq: "all",
        desc: "Adquire título de nobreza. Recebe 20 TO por nível no início da aventura ou ajuda de parceiro veterano da corte."
    },
    {
        name: "Torre Armada",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Quando inimigo erra ataque contra você: gaste 1 PM para receber +5 no dano contra ele até fim do próximo turno."
    },

    // ========================================================================
    // CLÉRIGO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Devoto Fiel",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 1",
        pathReq: "clerigo-base", // EXCLUSIVO PADRÃO (Usurpador não é devoto)
        desc: "Torne-se devoto de um Deus Maior (recebe 2 poderes concedidos) OU do Panteão (sem poderes, proibido armas cortantes/perfurantes, escolhe energia positiva ou negativa)."
    },
    {
        name: "Magias",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 1",
        pathReq: "clerigo-base", // EXCLUSIVO PADRÃO (Usurpador tem regra própria)
        desc: "Lança magias divinas (Atributo: Sabedoria). Começa com 3 magias de 1º círculo. A cada nível, aprende uma nova magia. A cada 4 níveis recebe um novo círculo de magia 2º (Nvl 5), 3º (Nvl 9), 4º (Nvl 13) e 5º (Nvl 17)."
    },
    {
        name: "Mão da Divindade",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 20",
        pathReq: "clerigo-base", // EXCLUSIVO PADRÃO
        desc: "Ação completa e 15 PM. Lança 3 magias divinas quaisquer (conhecidas ou não) como ação livre e sem custo de PM (apenas custos extras/aprimoramentos). Fica atordoado por 1d4 rodadas após o uso."
    },

    // ========================================================================
    // CLÉRIGO: VARIANTE USURPADOR (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Inimigo dos Deuses",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 1 (Substitui Devoto Fiel)",
        pathReq: "usurpador",
        desc: "Você não é aceito por nenhum deus. Não pode ter nenhuma devoção."
    },
    {
        name: "Magias e Usurpar",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 1 (Substitui Magias)",
        pathReq: "usurpador",
        desc: "Lança magias divinas (Carisma). Não aprende magias automaticamente (começa com 0).<br><strong>Usurpar:</strong> Pode lançar QUALQUER magia divina do círculo acessível. Exige teste de Enganação (CD 15 + custo PM). Falha: perde a magia e os PM. Penalidade de armadura aplica no teste. -5 se houver símbolo sagrado visível no local. A cada 4 níveis recebe um novo círculo de magia 2º (Nvl 5), 3º (Nvl 9), 4º (Nvl 13) e 5º (Nvl 17)."
    },
    {
        name: "Canalização Falsa",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 2",
        pathReq: "usurpador",
        desc: "Você pode canalizar tanto energia positiva quanto negativa (se tiver o poder Canalizar Energia). Substitui Sabedoria por Carisma nos poderes de clérigo."
    },
    {
        name: "Discrição Divina",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 3",
        pathReq: "usurpador",
        desc: "Recebe +1 em Furtividade e testes de resistência. Bônus aumenta +1 a cada 6 níveis."
    },
    {
        name: "Poder Capturado",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 4",
        pathReq: "usurpador",
        desc: "Escolha 1 Deus Maior/nível e 1 poder concedido dele (cumprindo reqs). Gaste 1h e teste Enganação (CD 20 +5/uso dia). Sucesso: conta como devoto e usa o poder sem Obrigações até fim do dia. Falha: perde 3 PM."
    },
    {
        name: "Roubo Divino",
        type: "class",
        class: "clerigo",
        subType: "ability",
        req: "Nível 20 (Substitui Mão da Divindade)",
        pathReq: "usurpador",
        desc: "Ao usar Usurpar: para cada 10 pontos no resultado do teste de Enganação, o custo da magia reduz em -1 PM e a CD aumenta em +1."
    },

    // ========================================================================
    // CLÉRIGO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Abençoar Arma",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Proficiência na arma preferida",
        pathReq: "all",
        desc: "Se empunhar arma preferida da divindade: Gaste ação movimento e 3 PM. Até fim da cena: arma vira mágica, dano aumenta um passo e usa Sabedoria para ataque e dano (não cumulativo com atributo padrão)."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Autoridade Eclesiástica",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Devoto de Deus Maior, 5º nível de clérigo",
        pathReq: "all",
        desc: "Recebe posição na igreja. +5 em Diplomacia/Intimidação com devotos da mesma fé. Paga metade do preço em itens alquímicos, poções e serviços em templos da divindade."
    },
    {
        name: "Canalizar Energia Positiva/Negativa",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Ação padrão. Gaste PM para liberar onda em alcance curto.<br><strong>• Positiva:</strong> Luz. Cura 1d6 PV em vivos, causa 1d6 dano em mortos-vivos por PM gasto.<br><strong>• Negativa:</strong> Trevas. Causa 1d6 dano em vivos, cura 1d6 PV em mortos-vivos por PM gasto.<br>Vontade (CD Sab) reduz dano à metade."
    },
    {
        name: "Canalizar Amplo",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Canalizar Energia",
        pathReq: "all",
        desc: "Ao usar Canalizar Energia, gaste +2 PM para aumentar o alcance para médio."
    },
    {
        name: "Comunhão Vital",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Quando lança magia que cura uma criatura, pague +2 PM para curar outra criatura em alcance curto (ou você) pela metade do valor original."
    },
    {
        name: "Conhecimento Mágico",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Você aprende duas magias de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser."
    },
    {
        name: "Expulsar/Comandar Mortos-Vivos",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Canalizar Energia",
        pathReq: "all",
        desc: "Ação padrão e 3 PM em alcance curto. Vontade (CD Sab) resiste.<br><strong>• Positiva (Expulsar):</strong> Mortos-vivos ficam apavorados por 1d6 rodadas.<br><strong>• Negativa (Comandar):</strong> Mortos-vivos (Int -4) obedecem por 1 dia. Inteligentes ficam fascinados por 1 rodada."
    },
    {
        name: "Liturgia Mágica",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Ação de movimento. A CD da sua próxima habilidade de clérigo (usada até fim do próximo turno) aumenta em +2."
    },
    {
        name: "Magia Sagrada/Profana",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Ao lançar magia divina de dano, gaste +1 PM para mudar o tipo de dano para Luz (se divindade Positiva) ou Trevas (se divindade Negativa)."
    },
    {
        name: "Mestre Celebrante",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Qualquer poder de Missa, 12º nível de clérigo",
        pathReq: "all",
        desc: "O número de pessoas afetadas por sua Missa aumenta em 10x e os benefícios que elas recebem dobram."
    },
    {
        name: "Missa: Bênção da Vida",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Os participantes recebem PV temporários = seu nível + sua Sabedoria."
    },
    {
        name: "Missa: Chamado às Armas",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Os participantes recebem +1 em testes de ataque e rolagens de dano."
    },
    {
        name: "Missa: Elevação do Espírito",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Os participantes recebem PM temporários = sua Sabedoria."
    },
    {
        name: "Missa: Escudo Divino",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Os participantes recebem +1 na Defesa e testes de resistência."
    },
    {
        name: "Missa: Superar as Limitações",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Cada participante recebe +1d6 num único teste a sua escolha e pode usá-lo mesmo após rolar o dado."
    },
    {
        name: "Prece de Combate",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Quando lança magia divina (ação padrão) em si mesmo, pode gastar +2 PM para lançá-la como ação de movimento."
    },
    {
        name: "Símbolo Sagrado Energizado",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Ação de movimento e 1 PM para energizar símbolo (ilumina como tocha). Enquanto empunhar, custo de magias divinas diminui em –1 PM."
    },
    // ========================================================================
    // DRUIDA: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Devoto Fiel",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Torna-se devoto de Allihanna, Megalokk ou Oceano (Se autorizado Heróis de Arton, também Tenebra, Aharadak e Arton). Recebe 2 poderes concedidos (ao invés de 1)."
    },
    {
        name: "Empatia Selvagem",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 1",
        pathReq: "druida-base", // EXCLUSIVO PADRÃO (Ermitão tem versão melhorada)
        desc: "Pode se comunicar com animais (gestos/sons). Pode usar Adestramento para mudar atitude e persuasão (como Diplomacia)."
    },
    {
        name: "Magias",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Lança magias divinas (Atributo: Sabedoria). Escolha 3 Escolas (permanente). Começa com 2 magias de 1º círculo dessas escolas. Novos círculos: 2º (Nvl 6), 3º (Nvl 10), 4º (Nvl 14)."
    },
    {
        name: "Caminho dos Ermos",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 2",
        pathReq: "druida-base", // EXCLUSIVO PADRÃO
        desc: "Atravessa terrenos difíceis naturais sem penalidade. CD para rastreá-lo aumenta em +10 (apenas terrenos naturais)."
    },
    {
        name: "Força da Natureza",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 20",
        pathReq: "druida-base", // EXCLUSIVO PADRÃO
        desc: "Custo de todas as magias diminui em -2 PM e CD aumenta em +2. Se estiver em terreno natural, bônus dobram (-4 PM e +4 CD)."
    },
    // ========================================================================
    // DRUIDA: VARIANTE ERMITÃO (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Empatia Selvagem (Ermitão)",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 1",
        pathReq: "ermitao",
        desc: "Pode se comunicar com animais, criaturas vegetais não inteligentes (Int -4/-5) e espíritos. Usa Adestramento para persuasão."
    },
    {
        name: "Sítio Sagrado",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 3",
        pathReq: "ermitao",
        desc: "Assume local sagrado (5km raio). Se destruído, perde todos PM até recriar.<br><br><strong>• Terreno Associado:</strong> Escolha 1 terreno (aquático, floresta, etc). Nele, soma Sab (mín +1) em Furtividade, Percepção, Misticismo, Religião e Sobrevivência. Nível 7 (e cada 4): escolhe +1 terreno ou aumenta bônus +2.<br><strong>• Aliados:</strong> Criaturas não inteligentes no sítio têm atitude melhorada. Pode comandar prestativas para defesa.<br><strong>• Caminhos Sagrados:</strong> No terreno associado, não sofre redução por terreno difícil e CD rastreio +10.<br><strong>• Base:</strong> Conta como base. Metade do custo para aumentar porte/cômodos."
    },
    {
        name: "Vínculo com a Terra",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 5",
        pathReq: "ermitao",
        desc: "Em terreno associado ao Sítio Sagrado: magias custam -1 PM. (Dentro do Sítio Sagrado em si, redutor muda para -2 PM)."
    },
    {
        name: "Temperado pelo Clima",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 11",
        pathReq: "ermitao",
        desc: "Recebe RD 5 contra dano associado aos seus terrenos: Aquático (Eletricidade), Ártico (Frio), Colina (Impacto), Deserto (Fogo), Floresta (Corte), Montanha (Perfuração), Pântano (Ácido), Planície (Luz), Subterrâneo (Trevas)."
    },
    {
        name: "Eixo de Pedras",
        type: "class",
        class: "druida",
        subType: "ability",
        req: "Nível 20 (Substitui Força da Natureza)",
        pathReq: "ermitao",
        desc: "Cria eixo de pedras no sítio. Uma vez por aventura, armazene magias (custo total = Nível + Sab). Até fim da aventura, se estiver em terreno associado, pode descarregar 1 dessas magias por rodada como ação livre sem custo."
    },

    // ========================================================================
    // DRUIDA: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Aspecto do Inverno",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Aprende 1 magia de Convocação ou Evocação (arcana ou divina). Recebe RD Frio 5. Suas magias de frio causam +1 dano por dado."
    },
    {
        name: "Aspecto do Outono",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Aprende 1 magia de Necromancia (arcana ou divina). Pode gastar 1 PM para impor -2 em testes de resistência de inimigos em alcance curto até próximo turno."
    },
    {
        name: "Aspecto da Primavera",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Aprende 1 magia de Encantamento ou Ilusão (arcana ou divina). Escolha magias = Carisma (mín 1): custo delas reduz em -1 PM."
    },
    {
        name: "Aspecto do Verão",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Aprende 1 magia de Transmutação (arcana ou divina). Gaste 1 PM para cobrir arma com chamas (cena): +1d6 fogo. Acertos dão 1 PM temporário (máx = nível)."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Companheiro Animal",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Car 1, treinado em Adestramento",
        pathReq: "all",
        desc: "Recebe um companheiro animal (limite de parceiros se aplica). Pode escolher várias vezes para ter animais diferentes."
    },
    {
        name: "Companheiro Animal Aprimorado",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Companheiro Animal, 6º nível de druida",
        pathReq: "all",
        desc: "Um companheiro recebe um segundo tipo, ganhando os bônus. (Ex: Guardião vira Guardião Fortão)."
    },
    {
        name: "Companheiro Animal Lendário",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Companheiro Animal, 18º nível de druida",
        pathReq: "all",
        desc: "Um companheiro dobra os bônus concedidos de seu tipo original."
    },
    {
        name: "Companheiro Animal Mágico",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Companheiro Animal, 8º nível de druida",
        pathReq: "all",
        desc: "Um companheiro recebe segundo tipo mágico: Adepto, Destruidor, Magivocador ou Médico."
    },
    {
        name: "Coração da Selva",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "CD para resistir a seus venenos aumenta em +2. Seus venenos causam +1 de perda de vida por dado."
    },
    {
        name: "Espírito dos Equinócios",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Aspecto da Primavera, Aspecto do Outono, 10º nível de druida",
        pathReq: "all",
        desc: "Gaste 4 PM (cena). Quando rola um dado, pode rolar novamente qualquer resultado 1."
    },
    {
        name: "Espírito dos Solstícios",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Aspecto do Inverno, Aspecto do Verão, 10º nível de druida",
        pathReq: "all",
        desc: "Ao lançar magia, gaste +4 PM para maximizar efeitos variáveis numéricos. (Ex: 5d8+5 cura vira 45 fixo)."
    },
    {
        name: "Força dos Penhascos",
        type: "class",
        class: "druida",
        subType: "power",
        req: "4º nível de druida",
        pathReq: "all",
        desc: "Recebe +2 Fortitude. Ao sofrer dano em contato com solo/pedra: gaste PM (limite Sabedoria) para reduzir dano em 10 por PM gasto."
    },
    {
        name: "Forma Primal",
        type: "class",
        class: "druida",
        subType: "power",
        req: "18º nível de druida",
        pathReq: "druida-base",
        desc: "Ao usar Forma Selvagem, recebe benefícios de dois tipos de animais ao mesmo tempo (bônus iguais não acumulam)."
    },
    {
        name: "Forma Selvagem",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "druida-base",
        desc: "Ação completa + 3 PM. Transforme-se (não fala/lança magias, itens somem).<br><br><strong>• Ágil:</strong> Des +2, 2 garras (1d6, 19). Ataca com ambas (-2 ataque).<br><strong>• Feroz:</strong> For +3, Def +2, mordida (1d8).<br><strong>• Resistente:</strong> Def +5, RD 5, ataque (1d6).<br><strong>• Sorrateira:</strong> Des +2, ataque (1d4), Pequeno (+2 Furtividade).<br><strong>• Veloz:</strong> Des +2, ataque (1d6), Deslocamento 15m ou Escalada 9m ou Natação 9m."
    },
    {
        name: "Forma Selvagem Aprimorada",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Selvagem, 6º nível de druida",
        pathReq: "druida-base",
        desc: "Gaste 6 PM para versões melhores:<br><strong>• Ágil:</strong> Des +4, Desl +3m, Grande, dano 1d8.<br><strong>• Feroz:</strong> For +5, Def +4, Grande, dano 2d6.<br><strong>• Resistente:</strong> For +3, Def +8, RD 8, Grande, dano 1d8.<br><strong>• Sorrateira:</strong> Des +4, Minúsculo (+5 Furtividade).<br><strong>• Veloz:</strong> Des +4, Desl 18m ou Esc 12m ou Nat 12m."
    },
    {
        name: "Forma Selvagem Superior",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Selvagem Aprimorada, 12º nível de druida",
        pathReq: "druida-base",
        desc: "Gaste 10 PM para versões superiores:<br><strong>• Ágil:</strong> Des +6, Desl +6m, Grande, dano 1d10.<br><strong>• Feroz:</strong> For +10, Def +6, Enorme, dano 4d6.<br><strong>• Resistente:</strong> For +5, Def +10, RD 10, Enorme, dano 2d6.<br><strong>• Sorrateira:</strong> Des +6, Voo 18m, Minúsculo.<br><strong>• Veloz:</strong> Des +6, Natação 18m ou Voo 24m."
    },
    {
        name: "Liberdade da Pradaria",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Recebe +2 Reflexos. Ao ar livre: gaste 1 PM para aumentar alcance da magia em um passo."
    },
    {
        name: "Magia Natural",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Selvagem",
        pathReq: "druida-base",
        desc: "Permite lançar magias e usar catalisadores/esotéricos enquanto em Forma Selvagem."
    },
    {
        name: "Presas Afiadas",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "druida-base",
        desc: "A margem de ameaça de suas armas naturais aumenta em +2."
    },
    {
        name: "Segredos da Natureza",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Aprende 2 magias de qualquer círculo que possa lançar (arcanas ou divinas, das escolas conhecidas)."
    },
    {
        name: "Tranquilidade dos Lagos",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Recebe +2 Vontade. Se portar recipiente com água: 1 vez/rodada, pague 1 PM para refazer teste de resistência."
    },
    // ========================================================================
    // GUERREIRO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Ataque Especial",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "guerreiro-base", // EXCLUSIVO PADRÃO
        desc: "Ao atacar, gaste 1 PM para receber +4 no ataque ou no dano. A cada 4 níveis, pode gastar +1 PM para aumentar bônus em +4 (pode dividir, ex: +4 atq/+4 dano)."
    },
    {
        name: "Durão",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 3",
        pathReq: "guerreiro-base", // EXCLUSIVO PADRÃO
        desc: "Sempre que sofre dano, pode gastar 3 PM para reduzir esse dano à metade."
    },
    {
        name: "Ataque Extra",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 6",
        pathReq: "guerreiro-base", // EXCLUSIVO PADRÃO
        desc: "Ao usar ação agredir, pode gastar 2 PM para realizar um ataque adicional (uma vez por rodada)."
    },
    {
        name: "Campeão",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 20",
        pathReq: "guerreiro-base", // EXCLUSIVO PADRÃO
        desc: "Dano de todos os ataques aumenta em um passo. Ao acertar um Ataque Especial ou Golpe Pessoal, recupera metade dos PM gastos neles."
    },
    // ========================================================================
    // GUERREIRO: VARIANTE INOVADOR (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Do Bom e do Melhor",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 1",
        pathReq: "inovador",
        desc: "Começa com arma/armadura/escudo superior (até T$ 500). Porém, é considerado NÃO proficiente em qualquer item que não seja superior ou mágico."
    },
    {
        name: "Sequência Especial",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 1 (Substitui Ataque Especial)",
        pathReq: "inovador",
        desc: "Gaste 2 PM. Recebe +1 cumulativo (máx +2) em ataque/dano cada vez que ataca com arma diferente na sequência. A cada 4 níveis, pode gastar +1 PM para aumentar limite em +2. Termina se ficar 1 rodada sem trocar arma."
    },
    {
        name: "Bombardeio Sequencial",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 2",
        pathReq: "inovador",
        desc: "Pode usar Sequência Especial com itens alquímicos ou poções (aplica o bônus acumulado na CD do item)."
    },
    {
        name: "Acrobacia Defensiva",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 3 (Substitui Durão)",
        pathReq: "inovador",
        desc: "Quando sofre dano, pode gastar 2 PM e fazer teste de Acrobacia. Subtrai o resultado do teste do dano sofrido."
    },
    {
        name: "Domínio Excêntrico",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 4",
        pathReq: "inovador",
        desc: "Se passar uma semana carregando arma exótica/de fogo (superior ou mágica), recebe proficiência nela."
    },
    {
        name: "Técnica Revolucionária",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 7",
        pathReq: "inovador",
        desc: "Gaste 2 PM. Até fim do combate, armas empunhadas ganham uma habilidade a escolha: Adaptável, Ágil, Alongada, Dupla ou Versátil."
    },
    {
        name: "Estilo Único",
        type: "class",
        class: "guerreiro",
        subType: "ability",
        req: "Nível 20 (Substitui Campeão)",
        pathReq: "inovador",
        desc: "Escolha 2 poderes de combate/guerreiro. Para eles, você ignora todos requisitos/restrições de arma (propósito, empunhadura, características). Ex: Usar 'Estilo de Duas Mãos' com adaga."
    },

    // ========================================================================
    // GUERREIRO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Ambidestria",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Des 2",
        pathReq: "all",
        desc: "Se usar ação agredir com duas armas (uma leve): faz 2 ataques (um com cada). Sofre -2 em todos os ataques até próximo turno."
    },
    {
        name: "Arqueiro",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Sab 1",
        pathReq: "all",
        desc: "Se usar arma de ataque à distância, soma Sabedoria nas rolagens de dano (limitado pelo nível)."
    },
    {
        name: "Ataque Reflexo",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Des 1",
        pathReq: "all",
        desc: "Se alvo em alcance sair voluntariamente ou ficar desprevenido: gaste 1 PM para fazer ataque corpo a corpo contra ele (1 vez por alvo/rodada)."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Bater e Correr",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Ao fazer investida, pode continuar se movendo após ataque. Se gastar 2 PM, pode investir em terreno difícil e sem penalidade de Defesa."
    },
    {
        name: "Destruidor",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "For 1",
        pathReq: "all",
        desc: "Quando causa dano com arma de duas mãos, pode rolar novamente resultados 1 ou 2 no dano."
    },
    {
        name: "Esgrimista",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Quando usa arma leve ou ágil, soma Inteligência nas rolagens de dano (limitado pelo nível)."
    },
    {
        name: "Especialização em Arma",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Escolha uma arma. Recebe +2 em dano com ela. Pode escolher várias vezes para armas diferentes."
    },
    {
        name: "Especialização em Armadura",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "12º nível de guerreiro",
        pathReq: "all",
        desc: "Recebe redução de dano 5 se estiver usando armadura pesada."
    },
    {
        name: "Golpe de Raspão",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Uma vez por rodada, ao errar ataque, gaste 2 PM: causa metade do dano (ignora efeitos de acerto)."
    },
    {
        name: "Golpe Demolidor",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Ao usar quebrar ou atacar objeto, gaste 2 PM para ignorar a redução de dano dele."
    },
    {
        name: "Golpe Pessoal",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "5º nível de guerreiro",
        pathReq: "all",
        desc: "Crie um golpe especial somando custos de PM (mínimo 1 PM). Só funciona com uma arma específica.<br><br><strong>Efeitos Básicos:</strong><br>• Amplo (+3 PM): Atinge todos em curto (1 teste).<br>• Atordoante (+2 PM): Atordoa 1 rodada (Fort anula, 1/cena).<br>• Brutal (+1 PM): +1 dado de dano.<br>• Conjurador (+custo+1 PM): Lança magia 1º/2º círculo (ação livre).<br>• Destruidor (+2 PM): Crítico x+1.<br>• Distante (+1 PM): Alcance +1 passo.<br>• Elemental (+2 PM): +2d6 dano (ácido/elet/fogo/frio).<br>• Impactante (+1 PM): Empurra 1,5m/10 dano.<br>• Letal (+2 PM): Ameaça +2.<br>• Penetrante (+1 PM): Ignora 10 RD.<br>• Preciso (+1 PM): Rola 2 dados, usa melhor.<br>• Qualquer Arma (+1 PM): Funciona com qualquer arma.<br>• Ricocheteante (+1 PM): Arma arremesso volta.<br>• Teleguiado (+1 PM): Ignora camuflagem/cobertura.<br><br><strong>Novos Efeitos (Heróis):</strong><br>• Avanço (+1 PM): Move deslocamento antes do golpe.<br>• Brando (+0 PM): Dano não letal.<br>• Carregado (+1 PM): Gaste ação padrão para +2d8 dano no próximo ataque.<br>• Sequencial (+2 PM): +1d6 dano (aumenta 1 passo a cada acerto na cena).<br>• Sifão (+2 PM): Ganha 1 PM temp/10 dano.<br><br><strong>Custos Negativos:</strong><br>• Lento (-2 PM): Ação completa.<br>• Perto da Morte (-2 PM): Só com PV <= 25%.<br>• Sacrifício (-2 PM): Perde 10 PV.<br>• Golpe de Abertura (-2 PM): Só no 1º turno.<br>• Truque Secreto (-2 PM): 1 vez/alvo por cena."
    },
    {
        name: "Ímpeto",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Gaste 1 PM para aumentar seu deslocamento em +6m por uma rodada."
    },
    {
        name: "Mestre em Arma",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Especialização em Arma, 12º nível de guerreiro",
        pathReq: "all",
        desc: "Com a arma escolhida: dano aumenta um passo e pode gastar 2 PM para rolar novamente teste de ataque."
    },
    {
        name: "Planejamento Marcial",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Treinado em Guerra, 10º nível de guerreiro",
        pathReq: "all",
        desc: "Uma vez por dia (1 hora, 3 PM): escolhe um poder de guerreiro ou combate que cumpra requisitos. Recebe benefício por 1 dia."
    },
    {
        name: "Romper Resistências",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Ao usar Ataque Especial, gaste +1 PM para ignorar 10 pontos de RD."
    },
    {
        name: "Solidez",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Empunhar Escudo",
        pathReq: "all",
        desc: "Aplica o bônus de Defesa do escudo também em testes de resistência."
    },
    {
        name: "Tornado de Dor",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "6º nível de guerreiro",
        pathReq: "all",
        desc: "Ação Padrão e 2 PM. Faça ataque corpo a corpo contra cada inimigo no alcance. Para cada acerto, ganha +2 cumulativo no dano e aplica em cada inimigo atingido."
    },
    {
        name: "Valentão",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Recebe +2 ataque e dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos."
    },
    // ========================================================================
    // INVENTOR: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Engenhosidade",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA: Alquimista também tem
        desc: "Ao fazer teste de perícia (exceto ataque), gaste 2 PM para somar Inteligência ao teste."
    },
    {
        name: "Protótipo",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 1",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Começa com um item superior OU 10 itens alquímicos (total até T$ 500)."
    },
    {
        name: "Fabricar Item Superior",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 2",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Recebe item superior (até T$ 2.000) com 1 melhoria e pode fabricar itens com 1 melhoria.<br>• Nível 5: Item com 2 melhorias.<br>• Nível 8: Item com 3 melhorias.<br>• Nível 11: Item com 4 melhorias."
    },
    {
        name: "Comerciante",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 3",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Pode vender itens 10% mais caro (não cumulativo com barganha)."
    },
    {
        name: "Encontrar Fraqueza",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 7",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Ação de movimento e 2 PM. Analisa objeto em alcance curto para ignorar sua RD. Se usar em inimigo (com armadura ou construto), recebe +2 no ataque contra ele (cena)."
    },
    {
        name: "Fabricar Item Mágico",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 9",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Recebe item mágico menor e pode fabricar menores.<br>• Nível 13: Item médio.<br>• Nível 17: Item maior."
    },
    {
        name: "Olho do Dragão",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 10",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Ação completa para analisar item. Descobre se é mágico, propriedades e como usar."
    },
    {
        name: "Obra-Prima",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 20",
        pathReq: "inventor-base", // EXCLUSIVO PADRÃO
        desc: "Fabrica item lendário (aprovado pelo mestre). Benefícios equivalentes a item com 5 melhorias e 4 encantos."
    },


    // ========================================================================
    // INVENTOR: VARIANTE ALQUIMISTA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Laboratório Pessoal",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 1 (Substitui Protótipo)",
        pathReq: "alquimista",
        desc: "Começa com instrumentos de alquimista aprimorados e 10 itens alquímicos (preço total até T$ 300)."
    },
    {
        name: "Alquimista Iniciado (Habilidade)",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 2 (Substitui Fabricar Item Superior)",
        pathReq: "alquimista",
        desc: "Recebe o poder Alquimista Iniciado gratuitamente (livro de fórmulas, fabrica poções 1º/2º círculo)."
    },
    {
        name: "Mistura Básica",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 3",
        pathReq: "alquimista",
        desc: "Pode usar catalisadores em itens alquímicos como se fossem magias."
    },
    {
        name: "Aplicação Rápida",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 5",
        pathReq: "alquimista",
        desc: "Ação completa e 2 PM: Usa dois preparados alquímicos ao mesmo tempo (precisa ter ambos em mãos ou sacar como livre)."
    },
    {
        name: "Magia Engarrafada",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 7",
        pathReq: "alquimista",
        desc: "Pode usar as habilidades Mistura Básica e Aplicação Rápida em poções."
    },
    {
        name: "Odores Alquímicos",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 8",
        pathReq: "alquimista",
        desc: "Ação completa. Detecta itens alquímicos/poções em alcance médio. Identifica tipo, uso, magia emulada e PM gastos na fabricação."
    },
    {
        name: "Fabricar Emulsão",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 9 (Substitui Fabr. Item Mágico)",
        pathReq: "alquimista",
        desc: "Aprende a fabricar emulsões com 1 encanto. No nível 13, pode fazer com 2 encantos. No nível 17, com 3 encantos.<br><br><strong>Regras de Emulsões:</strong><br>Uma emulsão é um óleo que concede propriedades mágicas a um item. Usá-la é uma ação padrão e dura até o fim da cena. Conta no limite de encantos do item.<br><br><strong>Fabricação (Custo / CD):</strong><br>Segue regras de itens alquímicos.<br>• <strong>1 Encanto:</strong> T$ 250 (CD 25)<br>• <strong>2 Encantos:</strong> T$ 750 (CD 30)<br>• <strong>3 Encantos:</strong> T$ 1.500 (CD 35)<br><br><em>Se um encanto tiver pré-requisito, a emulsão deve incluí-lo.</em>"
    },
    {
        name: "Mestre Alquimista (Habilidade)",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 10 (Substitui Olho do Dragão)",
        pathReq: "alquimista",
        desc: "Recebe o poder Mestre Alquimista (permite fabricar poções de qualquer círculo com fórmulas conhecidas)."
    },
    {
        name: "Bombardeio Eficiente",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 11",
        pathReq: "alquimista",
        desc: "Ao usar preparado alquímico ou poção que cause dano, pode gastar 1 PM para ignorar 10 pontos de redução de dano das criaturas atingidas."
    },
    {
        name: "Pedra Filosofal",
        type: "class",
        class: "inventor",
        subType: "ability",
        req: "Nível 20 (Substitui Obra-Prima)",
        pathReq: "alquimista",
        desc: "Recebe uma pedra filosofal. Benefícios: Cura Acelerada 10 e rola dois dados em testes de Fortitude (usa o melhor). Pode sacrificar a pedra para salvar a si ou aliado (alcance curto) que morreu ou caiu a 0 PV (efeito de Segunda Chance + reconstrução corporal). Recriar pedra: 1 semana e T$ 18.000."
    },

    // ========================================================================
    // INVENTOR: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Agite Antes de Usar",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "Ao usar preparado alquímico de dano, gaste PM (limite Int) para causar +1 dado de dano do mesmo tipo por PM gasto."
    },
    {
        name: "Ajuste de Mira",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Balística",
        pathReq: "all",
        desc: "Ação padrão e PM (limite Int). Aprimora arma à distância: +1 dano por PM gasto até fim da cena."
    },
    {
        name: "Alquimista de Batalha",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Soma Inteligência no dano de preparados alquímicos e poções que causam dano."
    },
    {
        name: "Alquimista Iniciado",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Int 1, Sab 1, treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "Recebe livro de fórmulas. Pode fabricar poções de 1º e 2º círculos."
    },
    {
        name: "Armeiro",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Luta e Ofício (armeiro)",
        pathReq: "all",
        desc: "Proficiência em armas marciais corpo a corpo. Usa Inteligência no ataque e dano com armas corpo a corpo."
    },
    {
        name: "Ativação Rápida",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro, 7º nível de inventor",
        pathReq: "all",
        desc: "Pode pagar 2 PM para ativar engenhoca como ação de movimento (ao invés de padrão)."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Inventor",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Autômato",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro",
        pathReq: "all",
        desc: "Fabrica autômato (construto parceiro iniciante: ajudante, assassino, atirador, combatente, guardião, montaria ou vigilante).<br>• Nível 7: Veterano.<br>• Nível 15: Mestre."
    },
    {
        name: "Autômato Prototipado",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Autômato",
        pathReq: "all",
        desc: "Ação padrão e 2 PM. Rola 1d6:<br>• 2-6: Autômato sobe nível de parceiro ou ganha habilidade de outro tipo (cena).<br>• 1: Autômato enguiça."
    },
    {
        name: "Balística",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Pontaria e Ofício (armeiro)",
        pathReq: "all",
        desc: "Proficiência em armas marciais de ataque à distância ou armas de fogo. Usa Inteligência no ataque (e dano, se tiver Estilo de Disparo) com armas à distância."
    },
    {
        name: "Blindagem",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Couraceiro, 8º nível de inventor",
        pathReq: "all",
        desc: "Pode usar Inteligência na Defesa com armadura pesada. (Não soma Destreza)."
    },
    {
        name: "Cano Raiado",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Balística, 5º nível de inventor",
        pathReq: "all",
        desc: "Armas de disparo feitas por você recebem +1 na margem de ameaça."
    },
    {
        name: "Catalisador Instável",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Ação completa e 3 PM. Fabrica item alquímico/poção instantaneamente pela metade do custo, sem teste. Dura apenas a cena."
    },
    {
        name: "Chutes e Palavrões",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro",
        pathReq: "all",
        desc: "Uma vez por rodada, gaste 1 PM para rolar novamente teste de Ofício (engenhoqueiro) para ativar engenhoca."
    },
    {
        name: "Conhecimento de Fórmulas",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Aprende 3 fórmulas de qualquer círculo que possa aprender."
    },
    {
        name: "Couraceiro",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (armeiro)",
        pathReq: "all",
        desc: "Proficiência com armaduras pesadas e escudos. Usa Inteligência na Defesa com armaduras (exceto pesadas, a menos que tenha Blindagem)."
    },
    {
        name: "Engenhoqueiro",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Int 3, treinado em Ofício (engenhoqueiro)",
        pathReq: "all",
        desc: "Pode fabricar engenhocas que simulam magias.<br><br><strong>• Fabricação:</strong> Tempo: 1 Semana. Custo T$ 100 x PM da magia. Teste CD 20 + PM. Limite de engenhocas = Int.<br><strong>• Ativação:</strong> Ação padrão. Teste CD 15 + PM. Falha = Enguiça (1h conserto).<br><strong>• Regras:</strong> Efeito mundano (não mágico). Sofre penalidade de armadura no teste. Pode aprimorar pagando PM extra e aumentando CD."
    },
    {
        name: "Farmacêutico",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Sab 1, treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "Ao usar item alquímico de cura, gaste PM (limite Int) para curar +1 dado do mesmo tipo por PM gasto."
    },
    {
        name: "Ferreiro",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Armeiro, 5º nível de inventor",
        pathReq: "all",
        desc: "Armas corpo a corpo feitas por você aumentam dano em um passo."
    },
    {
        name: "Granadeiro",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista de Batalha",
        pathReq: "all",
        desc: "Pode arremessar itens alquímicos/poções em alcance médio. Usa Inteligência para calcular CD desses itens."
    },
    {
        name: "Homúnculo",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Possui homúnculo (parceiro ajudante iniciante). Pode perder 1d6 PV para ele virar guardião iniciante pela cena."
    },
    {
        name: "Invenção Potente",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Inventor",
        pathReq: "all",
        desc: "Ao usar item ou engenhoca feito por você, pague 1 PM para aumentar CD em +2."
    },
    {
        name: "Maestria em Perícia",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Inventor",
        pathReq: "all",
        desc: "Escolha perícias = Int. Pode gastar 1 PM para escolher 10 nessas perícias em qualquer situação (exceto ataque)."
    },
    {
        name: "Manutenção Eficiente",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro, 5º nível de inventor",
        pathReq: "all",
        desc: "Limite de engenhocas aumenta em +3. Cada engenhoca ocupa meio espaço."
    },
    {
        name: "Mestre Alquimista",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Int 3, Sab 3, Alquimista Iniciado, 10º nível de inventor",
        pathReq: "all",
        desc: "Pode fabricar poções de qualquer círculo (fórmulas conhecidas)."
    },
    {
        name: "Mestre Cuca",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (cozinheiro)",
        pathReq: "all",
        desc: "Comidas que você cozinha tem bônus numérico aumentado em +1."
    },
    {
        name: "Mistura Fervilhante",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado, 5º nível de inventor",
        pathReq: "all",
        desc: "Ao usar item alquímico/poção, gaste 2 PM para dobrar a área de efeito."
    },
    {
        name: "Oficina de Campo",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (armeiro)",
        pathReq: "all",
        desc: "Gaste 1h e 2 PM. Grupo escolhe armas (+1 ataque) ou armaduras/escudos (+1 Defesa). Dura 1 dia."
    },
    {
        name: "Pedra de Amolar",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Armeiro",
        pathReq: "all",
        desc: "Ação de movimento e PM (limite Int). Aprimora arma corpo a corpo: +1 dano por PM gasto até fim da cena."
    },
    {
        name: "Síntese Rápida",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Fabrica o dobro de doses de itens alquímicos/poções no mesmo tempo (paga custo de cada)."
    },
    // ========================================================================
    // LADINO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Ataque Furtivo",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 1",
        pathReq: "ladino-base", // EXCLUSIVO PADRÃO
        desc: "Uma vez por rodada, causa +1d6 dano se atingir criatura desprevenida ou flanqueada (corpo a corpo ou curto). A cada 2 níveis, dano aumenta +1d6. (Imune a crítico = imune a furtivo)."
    },
    {
        name: "Especialista",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 1",
        pathReq: "ladino-base", // EXCLUSIVO PADRÃO
        desc: "Escolha perícias = Inteligência. Gaste 1 PM para dobrar seu bônus de treinamento num teste dessas perícias (não vale para ataque)."
    },
    {
        name: "Evasão",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 2",
        pathReq: "all", // COMPARTILHADA
        desc: "Se passar em Reflexos para reduzir dano à metade, não sofre dano nenhum. (Exige liberdade de movimentos/sem armadura pesada)."
    },
    {
        name: "Esquiva Sobrenatural",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 4",
        pathReq: "all", // COMPARTILHADA
        desc: "Seus instintos são apurados. Você nunca fica surpreendido."
    },
    {
        name: "Olhos nas Costas",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 8",
        pathReq: "all", // COMPARTILHADA
        desc: "Você não pode ser flanqueado."
    },
    {
        name: "Evasão Aprimorada",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 10",
        pathReq: "all", // COMPARTILHADA
        desc: "Se passar em Reflexos para reduzir dano à metade, não sofre dano. Se falhar, sofre apenas metade. (Exige liberdade de movimentos)."
    },
    {
        name: "A Pessoa Certa para o Trabalho",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 20",
        pathReq: "ladino-base", // EXCLUSIVO PADRÃO
        desc: "Ao fazer ataque furtivo ou usar perícia da lista de ladino, pode gastar 5 PM para receber +10 no teste."
    },
    // ========================================================================
    // LADINO: VARIANTE VENTANISTA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Charme",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 1 (Substitui Ataque Furtivo)",
        pathReq: "ventanista",
        desc: "Soma Carisma no total de PM. Ao fazer teste de perícia (exceto ataque), gaste PM (limite Carisma) para receber +2 no teste por PM gasto."
    },
    {
        name: "Truques do Ofício",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 1 (Substitui Especialista)",
        pathReq: "ventanista",
        desc: "Lança magias arcanas (Encantamento/Ilusão). Atributo: Inteligência. Começa com duas de 1º círculo. Novos círculos: 2º (Nvl 6), 3º (Nvl 10), 4º (Nvl 14). Habilidade não mágica (simulada)."
    },
    {
        name: "Disfarce Elaborado",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 3",
        pathReq: "ventanista",
        desc: "Ao fazer teste de Enganação para disfarce, pode escolher um poder relacionado (cujos pré-requisitos cumpra). Enquanto disfarçado, pode usar o poder mas sofre -3 PM máx. A cada 6 níveis, pode pegar +1 poder (-3 PM adicional)."
    },
    {
        name: "Virar a Casaca",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 7",
        pathReq: "ventanista",
        desc: "Se estiver disfarçado, gaste 1 PM para remover o disfarce. Se fizer isso, pode fazer teste de esconder-se (Enganação) mesmo sem camuflagem/cobertura."
    },
    {
        name: "Provocação Ousada",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 11",
        pathReq: "ventanista",
        desc: "1º turno da cena: Ação completa para provocar inimigos (alertar presença/intenção). Se houver risco, inimigos ganham +2 Percepção/Sobrevivência/Vontade contra você, mas você recupera 2 PM no início de seus turnos (máx = nível)."
    },
    {
        name: "O Grande Golpe",
        type: "class",
        class: "ladino",
        subType: "ability",
        req: "Nível 20 (Substitui Pessoa Certa)",
        pathReq: "ventanista",
        desc: "Início da aventura: Escolha magias (arcanas/divinas) igual a Inteligência. Para cada magia, defina um tipo de cena (ação, exploração, interpretação). Se estiver na cena correta, pode lançar a magia sem gastar PM (limite 20 PM). Habilidade não mágica."
    },

    // ========================================================================
    // LADINO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Assassinar",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "5º nível de ladino",
        pathReq: "all",
        desc: "Ação de movimento e 3 PM. Analise criatura em alcance curto. Até fim do próximo turno, seu primeiro Ataque Furtivo nela tem os dados de dano extra dobrados."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Contatos no Submundo",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Em vila ou maior: Gaste 2 PM e teste Carisma (CD 10). Sucesso: +5 Investigação (interrogar), compra itens mundanos/poções com 20% desconto e acesso a mercado negro."
    },
    {
        name: "Emboscar",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Furtividade",
        pathReq: "all",
        desc: "Na primeira rodada do combate, gaste 2 PM para executar uma ação padrão adicional."
    },
    {
        name: "Escapista",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Recebe +5 em Acrobacia para escapar, passar em espaço apertado/inimigo e resistir a efeitos de movimento."
    },
    {
        name: "Fuga Formidável",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Ação completa e 1 PM. Analise o local. Até fim da cena: +3m deslocamento, +5 Acrobacia/Atletismo, ignora terreno difícil. (Perde se fizer ação não relacionada a fugir)."
    },
    {
        name: "Gatuno",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Recebe +2 Atletismo. Escala com deslocamento normal e não fica desprevenido ao escalar."
    },
    {
        name: "Ladrão Arcano",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Roubo de Mana, 13º nível de ladino",
        pathReq: "all",
        desc: "Ao causar dano furtivo em conjurador, pode roubar magia que viu ele lançar. Custo: 1 PM por círculo (máx 4º). Pode lançar essa magia até fim da cena (Inteligência)."
    },
    {
        name: "Mão na Boca",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Luta",
        pathReq: "all",
        desc: "Recebe +2 em agarrar. Ao acertar furtivo em desprevenido, pode fazer teste de agarrar (ação livre). Se agarrar, criatura não pode falar."
    },
    {
        name: "Mãos Rápidas",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Des 2, treinado em Ladinagem",
        pathReq: "all",
        desc: "Uma vez por rodada, pague 1 PM para fazer teste de Ladinagem (abrir fechadura, punga, etc) como ação livre."
    },
    {
        name: "Mente Criminosa",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Soma Inteligência em Ladinagem e Furtividade."
    },
    {
        name: "Oportunismo",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "6º nível de ladino",
        pathReq: "all",
        desc: "Uma vez por rodada, quando inimigo adjacente sofre dano de aliado, gaste 2 PM para fazer ataque corpo a corpo contra ele."
    },
    {
        name: "Rolamento Defensivo",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Reflexos",
        pathReq: "all",
        desc: "Sempre que sofre dano, gaste 2 PM para reduzir à metade. Você fica caído após usar."
    },
    {
        name: "Roubo de Mana",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Truque Mágico, 7º nível de ladino",
        pathReq: "all",
        desc: "Ao causar dano furtivo: ganha 1 PM temporário para cada 1d6 de furtivo e alvo perde 1 PM. (Máx 1 vez por cena contra mesma criatura)."
    },
    {
        name: "Saqueador de Tumbas",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "+5 Investigação (armadilhas) e resistência contra elas. Desabilitar mecanismo vira ação padrão (em vez de 1d4 rodadas)."
    },
    {
        name: "Sombra",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Furtividade",
        pathReq: "all",
        desc: "+2 Furtividade. Sem penalidade por mover normal. Penalidade por atacar/ação chamativa cai para -10."
    },
    {
        name: "Truque Mágico",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Aprende 1 magia arcana de 1º círculo (Atributo: Int). Gasta PM normal. Pode escolher várias vezes."
    },
    {
        name: "Velocidade Ladina",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Des 2, treinado em Iniciativa",
        pathReq: "all",
        desc: "Uma vez por rodada, gaste 2 PM para realizar uma ação de movimento adicional."
    },
    {
        name: "Veneno Persistente",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Veneno Potente, 8º nível de ladino",
        pathReq: "all",
        desc: "Dose de veneno aplicada em arma dura 3 ataques (em vez de 1)."
    },
    {
        name: "Veneno Potente",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "A CD para resistir aos seus venenos aumenta em +5."
    },

    // ========================================================================
    // LUTADOR: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Briga",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Ataques desarmados causam 1d6 dano (pode ser letal ou não letal). Dano aumenta a cada 4 níveis. (Dano muda conforme tamanho da criatura)."
    },
    {
        name: "Golpe Relâmpago",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 1",
        pathReq: "lutador-base", // EXCLUSIVO PADRÃO
        desc: "Ao usar ação agredir com ataque desarmado, gaste 1 PM para fazer um ataque desarmado adicional."
    },
    {
        name: "Casca Grossa",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 3",
        pathReq: "all", // COMPARTILHADA
        desc: "Soma Constituição na Defesa (limitado pelo nível, sem armadura pesada). No nível 7 e a cada 4 níveis, recebe +1 na Defesa."
    },
    {
        name: "Golpe Cruel",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 5",
        pathReq: "lutador-base", // EXCLUSIVO PADRÃO
        desc: "Sua margem de ameaça com ataques desarmados aumenta em +1."
    },
    {
        name: "Golpe Violento",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 9",
        pathReq: "lutador-base", // EXCLUSIVO PADRÃO
        desc: "Seu multiplicador de crítico com ataques desarmados aumenta em +1."
    },
    {
        name: "Dono da Rua",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 20",
        pathReq: "lutador-base", // EXCLUSIVO PADRÃO
        desc: "Dano desarmado aumenta para 2d10 (Médio). Ao usar ação agredir desarmado, faz 2 ataques em vez de 1 (pode usar Golpe Relâmpago para um 3º)."
    },

    // ========================================================================
    // LUTADOR: VARIANTE ATLETA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Façanha Atlética",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 1 (Substitui Golpe Relâmpago)",
        pathReq: "atleta",
        desc: "Ao fazer teste de perícia, gaste PM (limite Força) para receber +2 no teste por PM gasto."
    },
    {
        name: "Arremesso Atlético",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 2",
        pathReq: "atleta",
        desc: "Alcance de arremesso aumenta um passo. Pode usar dano de Briga em armas de arremesso. Nível 10: Arremessos contam como ataques desarmados para habilidades de lutador."
    },
    {
        name: "Poderio Muscular",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 2",
        pathReq: "atleta",
        desc: "Aprende e pode lançar Primor Atlético (apenas em si mesmo). Habilidade não mágica."
    },
    {
        name: "Mais Alto e Mais Rápido",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 5 (Substitui Golpe Cruel)",
        pathReq: "atleta",
        desc: "Deslocamento +3m. Recebe deslocamento de escalada e natação igual à metade do normal (ou +3m se já tiver). Soma nível de atleta no tempo de prender respiração."
    },
    {
        name: "Disciplina Atlética",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 9 (Substitui Golpe Violento)",
        pathReq: "atleta",
        desc: "Ao falhar em teste de resistência, pode gastar 2 PM para rolar novamente usando a perícia Atletismo."
    },
    {
        name: "Corpo Ideal",
        type: "class",
        class: "lutador",
        subType: "ability",
        req: "Nível 20 (Substitui Dono da Rua)",
        pathReq: "atleta",
        desc: "Imunidade a cansaço, metabolismo e veneno. Recebe RD 10. Dano desarmado e de arremesso aumenta para 2d10 (Médio)."
    },

    // ========================================================================
    // LUTADOR: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Arma Improvisada",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Atacar com arma improvisada conta como desarmado, mas dano aumenta um passo. Ação movimento + Percepção CD 20 para encontrar arma. Se errar com ímpar no dado, arma quebra."
    },
    {
        name: "Até Acertar",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao errar ataque desarmado, recebe bônus cumulativo +2 ataque/dano contra oponente. Termina ao acertar ou fim da cena."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Braços Calejados",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Se não usar armadura, soma Força na Defesa (limitado pelo nível)."
    },
    {
        name: "Cabeçada",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao fazer ataque desarmado, gaste 2 PM: oponente fica desprevenido contra este ataque. (1 vez por cena contra mesmo alvo)."
    },
    {
        name: "Chave",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Int 1, Lutador de Chão, 4º nível de lutador",
        pathReq: "all",
        desc: "Se estiver agarrando e fizer teste de manobra para causar dano, dano desarmado aumenta um passo."
    },
    {
        name: "Confiança dos Ringues",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "8º nível de lutador",
        pathReq: "all",
        desc: "Quando inimigo erra ataque corpo a corpo contra você, recebe 2 PM temporários (cumulativo, máx = nível). Somem no fim da cena."
    },
    {
        name: "Convencido",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Recebe resistência a medo e mental +5."
    },
    {
        name: "Golpe Baixo",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao fazer ataque desarmado, gaste 2 PM. Se acertar, oponente faz Fortitude (CD For). Falha: atordoado por 1 rodada. (1 vez por cena)."
    },
    {
        name: "Golpe Imprudente",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao usar Golpe Relâmpago, pode atacar impulsivamente: +1 dado de dano extra, mas sofre -5 na Defesa até próximo turno."
    },
    {
        name: "Imobilização",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Chave, 8º nível de lutador",
        pathReq: "all",
        desc: "Se agarrando: Ação completa e teste de manobra. Sucesso: imobiliza (indefeso, sem ações exceto soltar). Se soltar, continua agarrado. Sofre penalidade de agarrar enquanto imobiliza."
    },
    {
        name: "Língua dos Becos",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "For 1, treinado em Intimidação",
        pathReq: "all",
        desc: "Em teste de perícia de Carisma, pague 1 PM para usar Força no lugar do atributo."
    },
    {
        name: "Lutador de Chão",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Recebe +2 ataque para agarrar e derrubar. Quando agarra, pode gastar 1 PM para derrubar como ação livre."
    },
    {
        name: "Nome na Arena",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "11º nível de lutador",
        pathReq: "all",
        desc: "Ação completa e teste Luta (CD 10) para impressionar. Sucesso: +2 em perícias de Carisma (cena) e melhora atitude de fãs de luta. Bônus aumenta conforme resultado excede CD."
    },
    {
        name: "Punhos de Adamante",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "8º nível de lutador",
        pathReq: "all",
        desc: "Ataques desarmados ignoram 10 pontos de RD."
    },
    {
        name: "Rasteira",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao atacar desarmado criatura até uma categoria maior: gaste 2 PM. Se acertar, criatura fica caída."
    },
    {
        name: "Sarado",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "For 3",
        pathReq: "all",
        desc: "Soma Força no total de PV e em Fortitude. Pode usar Força em Diplomacia com quem se atrai por físico."
    },
    {
        name: "Sequência Destruidora",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Trocação, 12º nível de lutador",
        pathReq: "all",
        desc: "Início do turno: gaste 2 PM e diga um número (mín 2). Se acertar essa qtd de ataques, o último recebe +4 dano cumulativo por ataque feito."
    },
    {
        name: "Trincado",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Con 3, Sarado, 10º nível de lutador",
        pathReq: "all",
        desc: "Soma Constituição no dano desarmado."
    },
    {
        name: "Trocação",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "6º nível de lutador",
        pathReq: "all",
        desc: "Ao acertar desarmado, pode fazer outro ataque no mesmo alvo pagando PM = qtd ataques já feitos na rodada (1 PM, depois 2 PM...). Para ao errar ou acabar PM."
    },
    {
        name: "Trocação Tumultuosa",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Trocação, 8º nível de lutador",
        pathReq: "all",
        desc: "Ao usar ação agredir desarmado: gaste 2 PM para atingir TODAS criaturas adjacentes (aliados inclusos!). Faz um teste e compara com Defesa de cada um."
    },
    {
        name: "Valentão",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Recebe +2 ataque e dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos."
    },
    {
        name: "Voadora",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao fazer investida desarmada, gaste 2 PM: +1d6 dano para cada 3m deslocado até oponente (limitado pelo nível)."
    },

    // ========================================================================
    // NOBRE: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Autoconfiança",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 1",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "Pode usar Carisma na Defesa em vez de Destreza (limitado pelo nível, não soma com armadura pesada)."
    },
    {
        name: "Espólio",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 1",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "Recebe um item a sua escolha com preço de até T$ 2.000."
    },
    {
        name: "Orgulho",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Ao fazer teste de perícia, gaste PM (limite Carisma). Para cada PM gasto, recebe +2 no teste."
    },
    {
        name: "Palavras Afiadas",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 2",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "Ação padrão e 1 PM. Teste Diplomacia/Intimidação vs Vontade do alvo (curto, Int -3 ou maior). Venceu: 2d6 dano psíquico não letal (Perdeu: metade). Se zerar PV: alvo se rende (Diplomacia) ou foge (Intimidação). Dano aumenta +2d6 a cada 4 níveis (custo +1 PM)."
    },
    {
        name: "Riqueza",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 3",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "Uma vez por aventura, teste Carisma (+ nível de nobre). Recebe TO igual ao resultado. (Depende de onde está/relação com família)."
    },
    {
        name: "Gritar Ordens",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 4",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "Gaste PM (limite Carisma). Até seu próximo turno, aliados em alcance curto recebem bônus em perícias igual aos PM gastos."
    },
    {
        name: "Presença Aristocrática",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 5",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "Se criatura inteligente tentar machucá-lo: gaste 2 PM. Ela testa Vontade (CD Car). Falha: perde a ação e não machuca. (1 vez por cena contra cada criatura)."
    },
    {
        name: "Realeza",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 20",
        pathReq: "nobre-base", // EXCLUSIVO PADRÃO
        desc: "CD de Presença Aristocrática aumenta +5. Se falhar por 10+: luta ao seu lado. Se Palavras Afiadas zerar PV: luta ao seu lado em vez de dano."
    },

    // ========================================================================
    // NOBRE: VARIANTE BURGUÊS (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Meios de Produção",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 1 (Substitui Autoconfiança/Espólio)",
        pathReq: "burgues",
        desc: "Início da aventura: recebe T$ 100 em dinheiro/itens/poções. Valor sobe para T$ 300 (Veterano), T$ 600 (Campeão) e T$ 1.000 (Lenda)."
    },
    {
        name: "Poder Monetário",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 1",
        pathReq: "burgues",
        desc: "Pode consumir Tibares de Ouro para pagar custos de PM (1 TO = 1 PM). Limite por uso: Carisma. Limite por dia: Nível (Dobro do nível no 5º)."
    },
    {
        name: "Desmoralizar",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 2 (Substitui Palavras Afiadas)",
        pathReq: "burgues",
        desc: "Aprende e pode lançar Perdição (apenas criaturas inteligentes, Int -3+). Pode usar aprimoramentos como clérigo do nível. Habilidade não mágica."
    },
    {
        name: "Negociante Nato",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 3 (Substitui Riqueza)",
        pathReq: "burgues",
        desc: "Em nova comunidade: gaste 1 dia e teste Diplomacia (CD 20). Sucesso: vende itens por 60% do valor (base é 50%). A cada 10 acima da CD, +10% no preço (máx 100%)."
    },
    {
        name: "Suborno",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 4 (Substitui Gritar Ordens)",
        pathReq: "burgues",
        desc: "Aprende e pode lançar Enfeitiçar (Carisma). Habilidade não mágica. CD aumenta +2 se pagar custo com pelo menos 1 TO."
    },
    {
        name: "Ostentação",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 5 (Substitui Presença Aristocrática)",
        pathReq: "burgues",
        desc: "Pode usar um item vestido adicional. CD de habilidades aumenta +1 por item especial vestido (banhado a ouro, gemas ou mitral). Cumulativo até +3."
    },
    {
        name: "Novo Rico",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 9",
        pathReq: "burgues",
        desc: "Recebe +1 PM por nível de poder de cada item mágico que estiver vestindo (após 1 dia de uso)."
    },
    {
        name: "Magnata",
        type: "class",
        class: "nobre",
        subType: "ability",
        req: "Nível 20 (Substitui Realeza)",
        pathReq: "burgues",
        desc: "Desmoralizar também aplica penalidade na CD das habilidades do alvo. Ao gastar TO para pagar PM, recebe 10 PV temporários cumulativos (cena)."
    },
    // ========================================================================
    // NOBRE: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Armadura Brilhante",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "8º nível de nobre",
        pathReq: "all",
        desc: "Pode usar Carisma na Defesa com armadura pesada (não soma Destreza)."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Autoridade Feudal",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "6º nível de nobre",
        pathReq: "all",
        desc: "Gaste 1h e 2 PM para conclamar o povo (parceiro iniciante até fim da aventura). Exige influência no local."
    },
    {
        name: "Educação Privilegiada",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Torna-se treinado em duas perícias de nobre a sua escolha."
    },
    {
        name: "Estrategista",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Int 1, treinado em Guerra, 6º nível de nobre",
        pathReq: "all",
        desc: "Ação padrão. Gaste 1 PM por aliado (limite Carisma) em alcance curto. No próximo turno, eles ganham uma ação de movimento extra."
    },
    {
        name: "Favor",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Gaste 5 PM e 1h de conversa para pedir favor a pessoa poderosa (funciona como Diplomacia). Pode pedir favores caros/perigosos. Falha = não pode pedir mesmo favor por 1 semana."
    },
    {
        name: "General",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Estrategista, 12º nível de nobre",
        pathReq: "all",
        desc: "Ao usar Estrategista, aliados recebem 1d4 PM temporários (duram até fim do turno deles)."
    },
    {
        name: "Grito Tirânico",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "8º nível de nobre",
        pathReq: "all",
        desc: "Pode usar Palavras Afiadas como ação completa. Se fizer: dano vira d8 e atinge TODOS inimigos em alcance curto."
    },
    {
        name: "Inspirar Confiança",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Quando aliado em alcance curto faz teste, gaste 2 PM para fazê-lo rolar novamente."
    },
    {
        name: "Inspirar Glória",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Inspirar Confiança, 8º nível de nobre",
        pathReq: "all",
        desc: "Uma vez por rodada, gaste 5 PM: aliado em alcance curto ganha ação padrão extra no próximo turno dele. (1 vez por cena em cada aliado)."
    },
    {
        name: "Jogo da Corte",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Ao testar Diplomacia, Intuição ou Nobreza, gaste 1 PM para rolar novamente."
    },
    {
        name: "Liderar pelo Exemplo",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "6º nível de nobre",
        pathReq: "all",
        desc: "Gaste 2 PM. Até seu próximo turno, se você passar em perícia, aliados em alcance curto podem usar seu resultado no lugar do deles (mesma perícia)."
    },
    {
        name: "Língua de Ouro",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Língua de Prata, 8º nível de nobre",
        pathReq: "all",
        desc: "Ação padrão e 4 PM. Gera efeito de 'Enfeitiçar' (sugerir ação, todas as criaturas no alcance, CD Car). Habilidade não mágica."
    },
    {
        name: "Língua de Prata",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Em teste de perícia de Carisma, gaste 2 PM para receber bônus igual a metade do seu nível."
    },
    {
        name: "Língua Rápida",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Mudar atitude com Diplomacia como ação completa sofre penalidade de -5 (em vez de -10)."
    },
    {
        name: "Presença Majestosa",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "16º nível de nobre",
        pathReq: "all",
        desc: "Presença Aristocrática funciona contra qualquer criatura com Inteligência (animais inclusos) e pode ser usada mais de uma vez por cena no mesmo alvo."
    },
    {
        name: "Título",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Autoridade Feudal, 10º nível, terras/serviço",
        pathReq: "all",
        desc: "Adquire título de nobreza. Recebe 20 TO por nível no início da aventura ou ajuda de parceiro veterano."
    },
    {
        name: "Voz Poderosa",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Recebe +2 em Diplomacia e Intimidação. Habilidades de nobre de alcance curto viram alcance médio."
    },
    // ========================================================================
    // PALADINO: HABILIDADES DE CLASSE (PADRÃO E COMPARTILHADAS)
    // ========================================================================
    {
        name: "Abençoado",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA (Santo tem restrição leve no texto, mas a hab é a mesma)
        desc: "Soma Carisma no total de PM. Torna-se devoto de um deus (recebe 2 poderes) OU devoto do Bem (sem poderes, sem Obrigações exceto Código do Herói). (Santo não pode ser do Bem)."
    },
    {
        name: "Código do Herói",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all", // COMPARTILHADA
        desc: "Manter a palavra, nunca recusar ajuda a inocentes, não mentir/trapacear/roubar. Se violar: perde todos PM (recupera dia seguinte)."
    },
    {
        name: "Golpe Divino",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 1",
        pathReq: "paladino-base", // EXCLUSIVO PADRÃO
        desc: "Ao atacar corpo a corpo, gaste 2 PM: Soma Carisma no ataque e +1d8 no dano. A cada 4 níveis, pode gastar +1 PM para aumentar dano em +1d8."
    },
    {
        name: "Cura pelas Mãos",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 2",
        pathReq: "paladino-base", // EXCLUSIVO PADRÃO
        desc: "Ação movimento e 1 PM. Cura 1d8+1 (Luz) em alcance corpo a corpo. A cada 4 níveis, pode gastar +1 PM para aumentar em +1d8+1. (Causa dano em mortos-vivos). Nível 6: Gaste +1 PM para remover condição."
    },
    {
        name: "Aura Sagrada",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 3",
        pathReq: "paladino-base", // EXCLUSIVO PADRÃO
        desc: "Gaste 1 PM (sustentada). Aura de 9m raio. Você e aliados na aura somam seu Carisma nos testes de resistência."
    },
    {
        name: "Bênção da Justiça",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 5",
        pathReq: "paladino-base", // EXCLUSIVO PADRÃO
        desc: "Escolha uma:<br><strong>• Égide Sagrada:</strong> Ação mov e 2 PM. Soma Carisma na Defesa de aliados adjacentes (cena). Nível 11: reflete magias.<br><strong>• Montaria Sagrada:</strong> Invoca montaria especial (ação mov e 2 PM)."
    },
    {
        name: "Vingador Sagrado",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 20",
        pathReq: "paladino-base", // EXCLUSIVO PADRÃO
        desc: "Ação completa e 10 PM. Vira avatar divino (cena): Voo 18m, RD 20. Golpe Divino custa metade e causa +2 dados de dano."
    },

    // ========================================================================
    // PALADINO: VARIANTE SANTO (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Ladainha de Combate",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 1 (Substitui Golpe Divino)",
        pathReq: "santo",
        desc: "Ação padrão e 2 PM (sustentada). Aura 9m: aliados ganham +1 Ataque, Dano e Defesa. (Aumenta +1 a cada 4 níveis).<br>• Nível 5: +1d8 luz contra malignos/devotos de trevas.<br>• Nível 9: Armas recebem 'Veloz'."
    },
    {
        name: "Santo Curandeiro",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 2 (Substitui Cura pelas Mãos)",
        pathReq: "santo",
        desc: "Ação movimento e PM (limite Carisma). Aliado mais ferido (médio) cura 2d8 por PM gasto. Nível 6: remove condição."
    },
    {
        name: "Vaso do Espírito",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 3 (Substitui Aura Sagrada)",
        pathReq: "santo",
        desc: "Ao fazer teste de resistência, gaste 1 PM para somar Carisma."
    },
    {
        name: "Mártir",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 6 (Substitui Bênção da Justiça)",
        pathReq: "santo",
        desc: "Se aliado (médio) faz resistência: gaste 1 PM para dar bônus = seu Carisma. Nível 12: Se ele falhar, você pode sofrer o efeito no lugar dele (1 vez/cena)."
    },
    {
        name: "Pira Santa",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 8",
        pathReq: "santo",
        desc: "Sob Ladainha: Ação movimento e PM (limite Carisma). Inimigo maior ND (médio) sofre 2d8 Luz por PM e fica ofuscado. (Fort reduz metade)."
    },
    {
        name: "Vingador Santificado",
        type: "class",
        class: "paladino",
        subType: "ability",
        req: "Nível 20 (Substitui Vingador Sagrado)",
        pathReq: "santo",
        desc: "Ao usar Ladainha, gaste +5 PM: Bônus numéricos dobram. Aliados na aura ganham imunidade a crítico e RD = 5 + Carisma."
    },

    // ========================================================================
    // PALADINO: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Arma Sagrada",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Devoto de divindade (exceto Lena/Marah)",
        pathReq: "all",
        desc: "Se usar Golpe Divino com arma preferida da divindade, o dado de dano do golpe aumenta para d12."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Aura Antimagia",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "14º nível de paladino",
        pathReq: "all",
        desc: "Enquanto Aura ativa: você e aliados dentro podem rolar novamente testes de resistência contra magia."
    },
    {
        name: "Aura Ardente",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "10º nível de paladino",
        pathReq: "all",
        desc: "Enquanto Aura ativa: Início do seu turno, espíritos e mortos-vivos na aura sofrem 5 + Carisma de dano de luz."
    },
    {
        name: "Aura de Cura",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "6º nível de paladino",
        pathReq: "all",
        desc: "Enquanto Aura ativa: Início do seu turno, você e aliados escolhidos curam 5 + Carisma PV."
    },
    {
        name: "Aura de Invencibilidade",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "18º nível de paladino",
        pathReq: "all",
        desc: "Enquanto Aura ativa: você e aliados ignoram o primeiro dano que sofrerem na cena."
    },
    {
        name: "Aura Poderosa",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "6º nível de paladino",
        pathReq: "all",
        desc: "Raio da aura aumenta para 30m."
    },
    {
        name: "Fulgor Divino",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Ao usar Golpe Divino, inimigos em alcance curto ficam ofuscados até início do seu próximo turno."
    },
    {
        name: "Julgamento Divino: Arrependimento",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM para marcar inimigo (curto). Se ele acertar ataque em você/aliado, testa Vontade (CD Car). Falha: atordoado no próximo turno dele. (1 vez por cena)."
    },
    {
        name: "Julgamento Divino: Autoridade",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 1 PM. Teste Diplomacia vs Vontade (alvo curto). Sucesso: obedece comando simples. (1 vez por cena)."
    },
    {
        name: "Julgamento Divino: Coragem",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM em criatura (curto). Ela fica imune a medo e recebe +2 ataque contra inimigo de maior ND."
    },
    {
        name: "Julgamento Divino: Iluminação",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Marque inimigo (curto). Quando acerta ataque corpo a corpo nele, recebe 2 PM temporários. (1 vez por cena)."
    },
    {
        name: "Julgamento Divino: Justiça",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM para marcar inimigo (curto). Se ele causar dano em você/aliado, testa Vontade. Falha: sofre dano de luz igual metade do dano causado."
    },
    {
        name: "Julgamento Divino: Libertação",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 5 PM para cancelar uma condição negativa em criatura (curto)."
    },
    {
        name: "Julgamento Divino: Salvação",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM para marcar inimigo (curto). Até fim da cena, ao acertar ataque nele, você recupera 5 PV."
    },
    {
        name: "Julgamento Divino: Vindicação",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM para marcar inimigo que causou dano. Recebe +1 ataque / +1d8 dano contra ele (e -5 ataque contra outros). A cada 5 níveis, pode pagar +1 PM para aumentar bônus em +1/+1d8."
    },
    {
        name: "Julgamento Divino: Zelo",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 1 PM para marcar alvo (longo). Pela cena, mover na direção dele dobra seu deslocamento."
    },
    {
        name: "Orar",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Aprende 1 magia divina de 1º círculo (Sabedoria). Pode escolher várias vezes."
    },
    {
        name: "Virtude: Caridade",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Custo de habilidades com aliado como alvo reduz -1 PM.<br><br><strong>Regra das Virtudes:</strong> +1 PM no total por virtude (+1, +3, +6...). Deve sempre ajudar necessitados."
    },
    {
        name: "Virtude: Castidade",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Imune a encantamento e +5 Intuição (blefes).<br><br><strong>Regra das Virtudes:</strong> +1 PM no total por virtude (+1, +3, +6...). Nunca cair em tentação."
    },
    {
        name: "Virtude: Compaixão",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Cura pelas Mãos tem alcance curto e cura 2d6+1 por PM (ao invés de 1d8+1).<br><br><strong>Regra das Virtudes:</strong> +1 PM no total por virtude (+1, +3, +6...)."
    },
    {
        name: "Virtude: Humildade",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "1ª rodada combate: Ação completa para rezar. Recebe PM temporários = Carisma (cena).<br><br><strong>Regra das Virtudes:</strong> +1 PM no total por virtude (+1, +3, +6...)."
    },
    {
        name: "Virtude: Temperança",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Consome apenas metade de alimentos/poções (cada item rende 2 doses).<br><br><strong>Regra das Virtudes:</strong> +1 PM no total por virtude (+1, +3, +6...)."
    },

    // ========================================================================
    // PODERES GERAIS: COMBATE (PARTE 1)
    // ========================================================================
    {
        name: "Acuidade com Arma",
        type: "combat",
        category: "Geral",
        req: "Des 1",
        desc: "Quando usa uma arma corpo a corpo leve ou uma arma de arremesso, você pode usar sua Destreza em vez de Força nos testes de ataque e rolagens de dano."
    },
    {
        name: "Arma Secundária Grande",
        type: "combat",
        category: "Geral",
        req: "Estilo de Duas Armas",
        desc: "Você pode empunhar duas armas de uma mão com o poder Estilo de Duas Armas (normalmente exige uma leve)."
    },
    {
        name: "Arremesso Potente",
        type: "combat",
        category: "Geral",
        req: "For 1, Estilo de Arremesso",
        desc: "Quando usa uma arma de arremesso, você pode usar sua Força em vez de Destreza nos testes de ataque. Se possuir Ataque Poderoso, pode usá-lo com armas de arremesso."
    },
    {
        name: "Arremesso Múltiplo",
        type: "combat",
        category: "Geral",
        req: "Des 1, Estilo de Arremesso",
        desc: "Uma vez por rodada, quando faz um ataque com arma de arremesso, gaste 1 PM para fazer um ataque adicional contra o mesmo alvo (arremessando outra arma)."
    },
    {
        name: "Ataque com Escudo",
        type: "combat",
        category: "Geral",
        req: "Estilo de Arma e Escudo",
        desc: "Uma vez por rodada, se empunhar escudo e usar ação agredir: gaste 1 PM para fazer ataque corpo a corpo extra com o escudo. Mantém bônus de Defesa."
    },
    {
        name: "Ataque Pesado",
        type: "combat",
        category: "Geral",
        req: "Estilo de Duas Mãos",
        desc: "Ao atacar com arma de duas mãos, pague 1 PM. Se acertar: além do dano, faz manobra derrubar ou empurrar como ação livre (use o ataque como teste)."
    },
    {
        name: "Ataque Poderoso",
        type: "combat",
        category: "Geral",
        req: "For 1",
        desc: "Ao fazer ataque corpo a corpo, pode sofrer –2 no teste de ataque para receber +5 na rolagem de dano."
    },
    {
        name: "Ataque Preciso",
        type: "combat",
        category: "Geral",
        req: "Estilo de Uma Arma",
        desc: "Se empunhar arma corpo a corpo em uma mão e nada na outra: recebe +2 na margem de ameaça e +1 no multiplicador de crítico."
    },
    {
        name: "Bloqueio com Escudo",
        type: "combat",
        category: "Geral",
        req: "Estilo de Arma e Escudo",
        desc: "Quando sofre dano usando escudo: gaste 1 PM para receber RD igual ao bônus de Defesa do escudo."
    },
    {
        name: "Carga de Cavalaria",
        type: "combat",
        category: "Geral",
        req: "Ginete",
        desc: "Investida montada causa +2d8 de dano. Pode continuar se movendo após o ataque (linha reta, até o dobro do deslocamento)."
    },
    {
        name: "Combate Defensivo",
        type: "combat",
        category: "Geral",
        req: "Int 1",
        desc: "Ao usar ação agredir, pode sofrer –2 no ataque para receber +5 na Defesa até o próximo turno."
    },
    {
        name: "Derrubar Aprimorado",
        type: "combat",
        category: "Geral",
        req: "Combate Defensivo",
        desc: "Recebe +2 para derrubar. Se derrubar, pode gastar 1 PM para fazer um ataque extra contra a criatura."
    },
    {
        name: "Desarmar Aprimorado",
        type: "combat",
        category: "Geral",
        req: "Combate Defensivo",
        desc: "Recebe +2 para desarmar. Se desarmar, pode gastar 1 PM para arremessar a arma longe (1d8 direção, 1d6 distância)."
    },
    {
        name: "Disparo Preciso",
        type: "combat",
        category: "Geral",
        req: "Estilo de Disparo ou Estilo de Arremesso",
        desc: "Pode fazer ataques à distância contra oponentes em combate corpo a corpo sem sofrer a penalidade de –5."
    },
    {
        name: "Disparo Rápido",
        type: "combat",
        category: "Geral",
        req: "Des 1, Estilo de Disparo",
        desc: "Se usar arma de disparo (recarga livre) e gastar ação completa para agredir: faz um ataque adicional. Sofre –2 em todos os ataques até o próximo turno."
    },
    {
        name: "Empunhadura Poderosa",
        type: "combat",
        category: "Geral",
        req: "For 3",
        desc: "Ao usar arma de uma categoria de tamanho maior que a sua, a penalidade de ataque cai para –2 (o normal é –5)."
    },
    {
        name: "Encouraçado",
        type: "combat",
        category: "Geral",
        req: "Proficiência com armaduras pesadas",
        desc: "Se usar armadura pesada, recebe +2 na Defesa. Bônus aumenta +2 para cada outro poder que tenha Encouraçado como pré-requisito."
    },
    {
        name: "Esquiva",
        type: "combat",
        category: "Geral",
        req: "Des 1",
        desc: "Você recebe +2 na Defesa e Reflexos."
    },
    {
        name: "Estilo de Arma e Escudo",
        type: "combat",
        category: "Geral",
        req: "Treinado em Luta, proficiência com escudos",
        desc: "Se estiver usando escudo, o bônus na Defesa que ele fornece aumenta em +2."
    },
    {
        name: "Estilo de Arma Longa",
        type: "combat",
        category: "Geral",
        req: "For 1, treinado em Luta",
        desc: "Recebe +2 ataque com armas alongadas e pode atacar alvos adjacentes com elas."
    },
    {
        name: "Estilo de Arremesso",
        type: "combat",
        category: "Geral",
        req: "Treinado em Pontaria",
        desc: "Saca armas de arremesso como ação livre e recebe +2 dano com elas. Se tiver Saque Rápido, recebe também +2 no ataque."
    },
    {
        name: "Estilo de Disparo",
        type: "combat",
        category: "Geral",
        req: "Treinado em Pontaria",
        desc: "Soma Destreza nas rolagens de dano com armas de disparo."
    },
    {
        name: "Estilo de Duas Armas",
        type: "combat",
        category: "Geral",
        req: "Des 2, treinado em Luta",
        desc: "Se empunhar duas armas (uma leve) e agredir: faz dois ataques (um com cada), com –2 de penalidade. Se tiver Ambidestria, não sofre penalidade."
    },

    // ========================================================================
    // PODERES GERAIS: COMBATE (PARTE 2 - FINAL)
    // ========================================================================
    {
        name: "Adestrar Montaria",
        type: "combat",
        category: "Geral",
        source: "ameacas",
        req: "Treinado em Adestramento, 7º nível de personagem",
        desc: "Você recebe +2 em Adestramento. Além disso, a sua escolha, sua montaria se torna veterana ou recebe a habilidade iniciante de um tipo de parceiro entre ajudante, assassino, besta de carga, combatente, fortão, guardião, perseguidor ou vigilante. Você só pode ter uma montaria treinada desta forma por vez e, se perdê-la, pode aplicar esse treinamento a outra com uma semana de trabalho."
    },
    {
        name: "Combate Montado",
        type: "combat",
        category: "Geral",
        source: "ameacas",
        req: "Ginete",
        desc: "Enquanto estiver montado, você recebe +2 em testes de ataque e rolagens de dano com armas."
    },
    {
        name: "Dois Como Um",
        type: "combat",
        category: "Geral",
        source: "ameacas",
        req: "Ginete",
        desc: "Quando faz um teste de Atletismo, Cavalgar, Iniciativa, Luta, Percepção, Pontaria ou Reflexos enquanto montado, você pode gastar 2 PM para rolar dois dados e usar o melhor resultado."
    },
    {
        name: "Resistência Montada",
        type: "combat",
        category: "Geral",
        source: "ameacas",
        req: "Combate Montado",
        desc: "Enquanto estiver montado, sempre que precisar fazer um teste de resistência você pode gastar 2 PM para usar Cavalgar no lugar desta perícia. Se o teste for contra um efeito que permite um teste para reduzir o dano à metade, você não sofre dano algum se passar. Você ainda sofre dano normal se falhar no teste."
    },
    {
        name: "Coração de Dragão",
        type: "combat",
        category: "Geral",
        source: "ameacas",
        req: "Car 2, 3º nível de personagem",
        desc: "Você recebe +2 PV e +2 PM. Além disso, para você, um dragão jovem conta como um único parceiro para seu limite de parceiros."
    },
    {
        name: "Estilo de Duas Mãos",
        type: "combat",
        category: "Geral",
        req: "For 2, Treinado em Luta",
        desc: "Se estiver usando uma arma corpo a corpo com as duas mãos (exceto leves), recebe +5 nas rolagens de dano."
    },
    {
        name: "Estilo de Uma Arma",
        type: "combat",
        category: "Geral",
        req: "Treinado em Luta",
        desc: "Se usar arma corpo a corpo em uma mão e nada na outra: recebe +2 na Defesa e nos testes de ataque (exceto desarmados)."
    },
    {
        name: "Estilo Desarmado",
        type: "combat",
        category: "Geral",
        req: "Treinado em Luta",
        desc: "Ataques desarmados causam 1d6 de dano e podem causar dano letal ou não letal sem penalidades."
    },
    {
        name: "Fanático",
        type: "combat",
        category: "Geral",
        req: "12º nível de personagem, Encouraçado",
        desc: "Seu deslocamento não é reduzido por usar armaduras pesadas."
    },
    {
        name: "Finta Aprimorada",
        type: "combat",
        category: "Geral",
        req: "Treinado em Enganação",
        desc: "Recebe +2 em Enganação para fintar e pode fintar como ação de movimento."
    },
    {
        name: "Foco em Arma",
        type: "combat",
        category: "Geral",
        req: "Proficiência com a arma",
        desc: "Escolha uma arma. Recebe +2 em testes de ataque com ela. Pode escolher várias vezes para armas diferentes."
    },
    {
        name: "Ginete",
        type: "combat",
        category: "Geral",
        req: "Treinado em Cavalgar",
        desc: "Passa automaticamente em testes de Cavalgar para não cair por dano. Não sofre penalidade para atacar à distância ou lançar magia montado."
    },
    {
        name: "Inexpugnável",
        type: "combat",
        category: "Geral",
        req: "Encouraçado, 6º nível de personagem",
        desc: "Se usar armadura pesada, recebe +2 em todos os testes de resistência."
    },
    {
        name: "Mira Apurada",
        type: "combat",
        category: "Geral",
        req: "Sab 1, Disparo Preciso",
        desc: "Quando usa ação mirar: recebe +2 no ataque e na margem de ameaça com ataques à distância até o fim do turno."
    },
    {
        name: "Piqueiro",
        type: "combat",
        category: "Geral",
        req: "Estilo de Arma Longa",
        desc: "Uma vez por rodada, se inimigo entrar voluntariamente no alcance da sua arma alongada: gaste 1 PM para atacá-lo. Se for investida, causa +2 dados de dano."
    },
    {
        name: "Presença Aterradora",
        type: "combat",
        category: "Geral",
        req: "Treinado em Intimidação",
        desc: "Ação padrão e 1 PM para assustar todas as criaturas a sua escolha em alcance curto."
    },
    {
        name: "Proficiência",
        type: "combat",
        category: "Geral",
        req: "-",
        desc: "Escolha uma: armas marciais, armas de fogo, armaduras pesadas ou escudos (se tiver marciais, pode pegar exóticas)."
    },
    {
        name: "Quebrar Aprimorado",
        type: "combat",
        category: "Geral",
        req: "Ataque Poderoso",
        desc: "Recebe +2 para quebrar. Se reduzir PV da arma a 0, gaste 1 PM para ataque extra contra o usuário."
    },
    {
        name: "Reflexos de Combate",
        type: "combat",
        category: "Geral",
        req: "Des 1",
        desc: "Ganha uma ação de movimento extra no seu primeiro turno de cada combate."
    },
    {
        name: "Saque Rápido",
        type: "combat",
        category: "Geral",
        req: "Treinado em Iniciativa",
        desc: "Recebe +2 Iniciativa. Saca/guarda como livre. Recarga de armas de disparo diminui uma categoria (Completa>Padrão>Movimento>Livre)."
    },
    {
        name: "Trespassar",
        type: "combat",
        category: "Geral",
        req: "Ataque Poderoso",
        desc: "Se reduzir alvo a 0 PV com ataque corpo a corpo: gaste 1 PM para ataque adicional contra outra criatura no alcance."
    },
    {
        name: "Vitalidade",
        type: "combat",
        category: "Geral",
        req: "Con 1",
        desc: "Recebe +1 PV por nível de personagem e +2 em Fortitude."
    },

    // ========================================================================
    // PODERES GERAIS: DESTINO
    // ========================================================================
    {
        name: "Acrobático",
        type: "destiny",
        category: "Geral",
        req: "Des 2",
        desc: "Usa Destreza em vez de Força em Atletismo. Terreno difícil não reduz deslocamento nem impede investidas."
    },
    {
        name: "Ao Sabor do Destino",
        type: "destiny",
        category: "Geral",
        req: "6º nível de personagem",
        desc: "Se não usar itens mágicos (exceto poções), recebe bônus cumulativos (não cumulativo com mesmo atributo/perícia):<br>• Nvl 6: +2 em uma perícia<br>• Nvl 7: +1 na Defesa<br>• Nvl 8: +1 no dano<br>• Nvl 9: +1 em um atributo<br>• Nvl 11: +2 em uma perícia<br>• Nvl 12: +2 na Defesa<br>• Nvl 13: +2 no dano<br>• Nvl 14: +1 em um atributo<br>• Nvl 16: +2 em uma perícia<br>• Nvl 17: +3 na Defesa<br>• Nvl 18: +3 no dano<br>• Nvl 19: +1 em um atributo."
    },
    {
        name: "Aparência Inofensiva",
        type: "destiny",
        category: "Geral",
        req: "Car 1",
        desc: "A primeira criatura inteligente (Int -3+) que te atacar na cena deve testar Vontade (CD Car). Falha: perde a ação. (Funciona 1 vez/cena, independente de falha ou sucesso)."
    },
    {
        name: "Atlético",
        type: "destiny",
        category: "Geral",
        req: "For 2",
        desc: "Recebe +2 em Atletismo e +3m em seu deslocamento."
    },
    {
        name: "Atraente",
        type: "destiny",
        category: "Geral",
        req: "Car 1",
        desc: "Recebe +2 em perícias de Carisma contra criaturas que possam se sentir fisicamente atraídas por você."
    },
    {
        name: "Comandar",
        type: "destiny",
        category: "Geral",
        req: "Car 1",
        desc: "Ação de movimento e 1 PM. Aliados em alcance médio recebem +1 em testes de perícia até o fim da cena."
    },
    {
        name: "Costas Largas",
        type: "destiny",
        category: "Geral",
        req: "Con 1, For 1",
        desc: "Limite de carga aumenta em 5 espaços. Pode se beneficiar de um item vestido adicional."
    },
    {
        name: "Foco em Perícia",
        type: "destiny",
        category: "Geral",
        req: "Treinado na perícia",
        desc: "Escolha uma perícia (exceto Luta/Pontaria). Ao fazer teste, pode gastar 1 PM para rolar dois dados e usar o melhor."
    },
    {
        name: "Inventário Organizado",
        type: "destiny",
        category: "Geral",
        req: "Int 1",
        desc: "Soma Inteligência no limite de carga. Itens pequenos (0,5 espaço) passam a ocupar 0,25 espaço."
    },
    {
        name: "Investigador",
        type: "destiny",
        category: "Geral",
        req: "Int 1",
        desc: "Recebe +2 em Investigação e soma Inteligência em Intuição."
    },
    {
        name: "Lobo Solitário",
        type: "destiny",
        category: "Geral",
        req: "-",
        desc: "Recebe +1 em perícias e Defesa se não tiver aliados em alcance curto. Não sofre penalidade por usar Cura em si mesmo."
    },
    {
        name: "Medicina",
        type: "destiny",
        category: "Geral",
        req: "Sab 1, treinado em Cura",
        desc: "Ação completa. Teste de Cura (CD 15). Sucesso: recupera 1d6 PV + 1d6 para cada 5 pontos acima da CD. (1 vez por dia por criatura)."
    },
    {
        name: "Parceiro",
        type: "destiny",
        category: "Geral",
        req: "5º nível, treinado em Adestramento (animal) ou Diplomacia (humanoide)",
        desc: "Recebe um parceiro iniciante (animal ou humanoide). Se perder, recebe outro na próxima aventura."
    },
    {
        name: "Sentidos Aguçados",
        type: "destiny",
        category: "Geral",
        req: "Sab 1, treinado em Percepção",
        desc: "Recebe +2 Percepção. Não fica desprevenido contra inimigos não percebidos. Rola duas vezes a chance de falha por camuflagem."
    },
    {
        name: "Sortudo",
        type: "destiny",
        category: "Geral",
        req: "-",
        desc: "Quando faz um teste, pode gastar 3 PM para rolá-lo novamente."
    },
    {
        name: "Surto Heroico",
        type: "destiny",
        category: "Geral",
        req: "-",
        desc: "Uma vez por rodada, gaste 5 PM para realizar uma ação padrão ou de movimento adicional."
    },
    {
        name: "Torcida",
        type: "destiny",
        category: "Geral",
        req: "Car 1",
        desc: "Recebe +2 em perícias e Defesa se tiver torcida a favor (criaturas em alcance médio apenas torcendo)."
    },
    {
        name: "Treinamento em Perícia",
        type: "destiny",
        category: "Geral",
        req: "-",
        desc: "Torna-se treinado em uma perícia a sua escolha."
    },
    {
        name: "Venefício",
        type: "destiny",
        category: "Geral",
        req: "Treinado em Ofício (alquimista)",
        desc: "Não se envenena acidentalmente. A CD dos seus venenos aumenta em +2."
    },
    {
        name: "Vontade de Ferro",
        type: "destiny",
        category: "Geral",
        req: "Sab 1",
        desc: "Recebe +1 PM para cada dois níveis de personagem e +2 em Vontade."
    },
    // ========================================================================
    // PODERES GERAIS: MAGIA
    // ========================================================================
    {
        name: "Celebrar Ritual",
        type: "magic",
        category: "Geral",
        req: "Treinado em Misticismo ou Religião, 8º nível",
        desc: "Pode lançar magias como rituais. Dobra o limite de PM, mas execução muda para 1 hora (ou dobro) e custa T$ 10 por PM gasto. Não pode ser armazenado em itens."
    },
    {
        name: "Escrever Pergaminho",
        type: "magic",
        category: "Geral",
        req: "Habilidade Magias, treinado em Ofício (escriba)",
        desc: "Permite fabricar pergaminhos com magias que conheça. (Veja regras de fabricação no livro)."
    },
    {
        name: "Foco em Magia",
        type: "magic",
        category: "Geral",
        req: "Lançar magias",
        desc: "Escolha uma magia que possa lançar. Seu custo diminui em –1 PM (cumulativo). Pode escolher várias vezes para magias diferentes."
    },
    {
        name: "Magia Acelerada",
        type: "magic",
        category: "Geral",
        req: "Lançar magias de 2º círculo",
        desc: "<strong>Aprimoramento (+4 PM):</strong> Muda a execução da magia para ação livre. Limite de 1 magia acelerada por rodada."
    },
    {
        name: "Magia Ampliada",
        type: "magic",
        category: "Geral",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+2 PM):</strong> Aumenta o alcance em um passo (curto->médio->longo) OU dobra a área de efeito."
    },
    {
        name: "Magia Discreta",
        type: "magic",
        category: "Geral",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+2 PM):</strong> Lança sem gesticular e falar. Permite lançar magia arcana de armadura sem teste de Misticismo. Perceber a magia exige Misticismo CD 20."
    },
    {
        name: "Magia Ilimitada",
        type: "magic",
        category: "Geral",
        req: "Lançar magias",
        desc: "Você soma seu atributo-chave no limite de PM que pode gastar numa magia."
    },
    {
        name: "Preparar Poção",
        type: "magic",
        category: "Geral",
        req: "Habilidade Magias, treinado em Ofício (alquimista)",
        desc: "Permite fabricar poções com magias conhecidas de 1º e 2º círculos. (Veja regras de fabricação no livro)."
    },
    // ========================================================================
    // PODERES CONCEDIDOS: DEUSES (PARTE 1)
    // ========================================================================
    {
        name: "Afinidade com a Tormenta",
        type: "conceded",
        category: "Aharadak",
        req: "Devoto de Aharadak",
        desc: "Recebe +10 em testes de resistência contra a Tormenta e seus devotos. Seu primeiro poder da Tormenta não causa perda de Carisma."
    },
    {
        name: "Almejar o Impossível",
        type: "conceded",
        category: "Thwor, Valkaria",
        req: "Devoto de Thwor ou Valkaria",
        desc: "Em testes de perícia, um resultado 19 ou mais no dado é sempre um sucesso (independente da CD)."
    },
    {
        name: "Anfíbio",
        type: "conceded",
        category: "Oceano",
        req: "Devoto de Oceano",
        desc: "Pode respirar embaixo d'água e ganha deslocamento de natação igual ao terrestre."
    },
    {
        name: "Apostar com o Trapaceiro",
        type: "conceded",
        category: "Hyninn",
        req: "Devoto de Hyninn",
        desc: "Ao testar perícia, gaste 1 PM. Você e mestre rolam 1d20 (mestre secreto). Escolha usar seu resultado ou o do mestre (revelado após escolha)."
    },
    {
        name: "Armas da Ambição",
        type: "conceded",
        category: "Valkaria",
        req: "Devoto de Valkaria",
        desc: "Recebe +1 em testes de ataque e na margem de ameaça com armas nas quais é proficiente."
    },
    {
        name: "Arsenal das Profundezas",
        type: "conceded",
        category: "Oceano",
        req: "Devoto de Oceano",
        desc: "Recebe +2 dano com azagaias, lanças e tridentes. Multiplicador de crítico com essas armas aumenta em +1."
    },
    {
        name: "Astúcia da Serpente",
        type: "conceded",
        category: "Sszzaas",
        req: "Devoto de Sszzaas",
        desc: "Recebe +2 em Enganação, Furtividade e Intuição."
    },
    {
        name: "Ataque Piedoso",
        type: "conceded",
        category: "Lena, Thyatis",
        req: "Devoto de Lena ou Thyatis",
        desc: "Pode causar dano não letal com armas corpo a corpo sem sofrer penalidade de -5 no ataque."
    },
    {
        name: "Aura de Medo",
        type: "conceded",
        category: "Kallyadranoch",
        req: "Devoto de Kallyadranoch",
        desc: "Gaste 2 PM (cena). Aura 9m raio. Inimigos que entram testam Vontade (CD Car) ou ficam abalados. Sucesso imune por 1 dia."
    },
    {
        name: "Aura de Paz",
        type: "conceded",
        category: "Marah",
        req: "Devoto de Marah",
        desc: "Gaste 2 PM (cena). Aura 9m raio. Inimigo na aura que tentar ação hostil contra você testa Vontade (CD Car). Falha: perde ação. Sucesso: imune por 1 dia."
    },
    {
        name: "Aura Restauradora",
        type: "conceded",
        category: "Lena",
        req: "Devoto de Lena",
        desc: "Curas usadas por você e aliados em raio de 9m recuperam +1 PV por dado."
    },
    {
        name: "Bênção do Mana",
        type: "conceded",
        category: "Wynna",
        req: "Devoto de Wynna",
        desc: "Recebe +1 PM a cada nível ímpar."
    },
    {
        name: "Carícia Sombria",
        type: "conceded",
        category: "Tenebra, Ragnar",
        req: "Devoto de Tenebra",
        desc: "Ação padrão e 1 PM. Toque causa 2d6 trevas (Fort reduz metade) e você cura metade do dano. Pode aprender Toque Vampírico (custo -1 PM)."
    },
    {
        name: "Centelha Mágica",
        type: "conceded",
        category: "Wynna, Glórienn",
        req: "Devoto de Wynna",
        desc: "Aprende uma magia arcana ou divina de 1º círculo."
    },
    {
        name: "Compreender os Ermos",
        type: "conceded",
        category: "Allihanna",
        req: "Devoto de Allihanna",
        desc: "Recebe +2 Sobrevivência. Pode usar Sabedoria para Adestramento (em vez de Carisma)."
    },
    {
        name: "Conhecimento Enciclopédico",
        type: "conceded",
        category: "Tanna Toh",
        req: "Devoto de Tanna Toh",
        desc: "Torna-se treinado em duas perícias baseadas em Inteligência."
    },
    {
        name: "Conjurar Arma",
        type: "conceded",
        category: "Arsenal",
        req: "Devoto de Arsenal",
        desc: "Gaste 1 PM para invocar arma corpo a corpo/arremesso proficiente (cena). Fornece +1 ataque/dano, conta como mágica. (Ou 20 munições)."
    },
    {
        name: "Coragem Total",
        type: "conceded",
        category: "Arsenal, Khalmyr, Lin-Wu, Valkaria, Tauron",
        req: "Devoto de Arsenal, Khalmyr, Lin-Wu ou Valkaria",
        desc: "Imune a medo (mágico ou não). Não elimina fobias raciais."
    },
    {
        name: "Cura Gentil",
        type: "conceded",
        category: "Lena",
        req: "Devoto de Lena",
        desc: "Soma Carisma aos PV restaurados por seus efeitos mágicos de cura."
    },
    {
        name: "Curandeira Perfeita",
        type: "conceded",
        category: "Lena",
        req: "Devoto de Lena",
        desc: "Sempre pode escolher 10 em Cura. Sem penalidade por falta de kit. Com kit recebe +2 (ou +5 aprimorado)."
    },
    {
        name: "Dedo Verde",
        type: "conceded",
        category: "Allihanna",
        req: "Devoto de Allihanna",
        desc: "Aprende Controlar Plantas. Se aprender de novo, custo diminui -1 PM."
    },
    {
        name: "Descanso Natural",
        type: "conceded",
        category: "Allihanna",
        req: "Devoto de Allihanna",
        desc: "Dormir ao relento conta como descanso confortável."
    },
    {
        name: "Dom da Esperança",
        type: "conceded",
        category: "Marah",
        req: "Devoto de Marah",
        desc: "Soma Sabedoria nos PV (em vez de Con). Imune a alquebrado, esmorecido e frustrado."
    },
    {
        name: "Dom da Imortalidade",
        type: "conceded",
        category: "Thyatis",
        req: "Paladino de Thyatis",
        desc: "Imortal. Se morrer, volta em 3d6 dias. (Não acumula com Dom da Ressurreição)."
    },
    {
        name: "Dom da Profecia",
        type: "conceded",
        category: "Thyatis",
        req: "Devoto de Thyatis",
        desc: "Aprende Augúrio (custo -1 PM se reaprender). Pode gastar 2 PM para receber +2 em um teste."
    },
    {
        name: "Dom da Ressurreição",
        type: "conceded",
        category: "Thyatis",
        req: "Clérigo de Thyatis",
        desc: "Ação completa, gasta TODOS PM (mín 1). Ressuscita criatura morta < 1 ano com 1 PV/0 PM (perde 1 Con permanente). 1 vez por criatura."
    },
    {
        name: "Dom da Verdade",
        type: "conceded",
        category: "Khalmyr",
        req: "Devoto de Khalmyr",
        desc: "Pague 2 PM para receber +5 Intuição, e Percepção (contra Enganação/Furtividade) até fim da cena."
    },
    {
        name: "Escamas Dracônicas",
        type: "conceded",
        category: "Kallyadranoch",
        req: "Devoto de Kallyadranoch",
        desc: "Recebe +2 na Defesa e em Fortitude."
    },
    {
        name: "Escudo Mágico",
        type: "conceded",
        category: "Wynna",
        req: "Devoto de Wynna",
        desc: "Ao lançar magia, recebe bônus na Defesa igual ao círculo da magia até o próximo turno."
    },
    {
        name: "Espada Justiceira",
        type: "conceded",
        category: "Khalmyr",
        req: "Devoto de Khalmyr",
        desc: "Gaste 1 PM para encantar arma de corte (cena): dano aumenta um passo."
    },
    {
        name: "Espada Solar",
        type: "conceded",
        category: "Azgher",
        req: "Devoto de Azgher",
        desc: "Gaste 1 PM para fazer arma de corte causar +1d6 fogo (cena)."
    },
    {
        name: "Êxtase da Loucura",
        type: "conceded",
        category: "Aharadak, Nimb",
        req: "Devoto de Aharadak ou Nimb",
        desc: "Quando criatura falha em Vontade contra suas habilidades mágicas: ganha 1 PM temporário (cumulativo, máx = Sab)."
    },
    {
        name: "Familiar Ofídico",
        type: "conceded",
        category: "Sszzaas",
        req: "Devoto de Sszzaas",
        desc: "Recebe um familiar cobra (não conta no limite de parceiros)."
    },
    {
        name: "Farsa do Fingidor",
        type: "conceded",
        category: "Hyninn",
        req: "Devoto de Hyninn",
        desc: "Aprende Criar Ilusão (custo -1 PM se reaprender)."
    },
    {
        name: "Fé Guerreira",
        type: "conceded",
        category: "Arsenal",
        req: "Devoto de Arsenal",
        desc: "Usa Sabedoria para Guerra. Em combate, pode gastar 2 PM para substituir teste de perícia por Guerra (exceto ataque)."
    },
    {
        name: "Forma de Macaco",
        type: "conceded",
        category: "Hyninn",
        req: "Devoto de Hyninn",
        desc: "Ação completa e 2 PM. Vira macaco (Minúsculo, escalar 9m, +5 Furtividade, -5 manobra). Itens somem. Termina se atacar/lançar magia/sofrer dano."
    },
    {
        name: "Fulgor Solar",
        type: "conceded",
        category: "Azgher",
        req: "Devoto de Azgher",
        desc: "RD Frio e Trevas 5. Ao ser atacado, gaste 1 PM para ofuscar atacante por 1 rodada."
    },
    {
        name: "Fúria Divina",
        type: "conceded",
        category: "Thwor, Keen, Ragnar, Tauron",
        req: "Devoto de Thwor",
        desc: "Gaste 2 PM (cena). +2 ataque/dano corpo a corpo. Sem ações de calma/concentração. Se tiver Fúria bárbara, dura a cena toda."
    },
    {
        name: "Golpista Divino",
        type: "conceded",
        category: "Hyninn",
        req: "Devoto de Hyninn",
        desc: "Recebe +2 em Enganação, Jogatina e Ladinagem."
    },
    {
        name: "Habitante do Deserto",
        type: "conceded",
        category: "Azgher",
        req: "Devoto de Azgher",
        desc: "RD Fogo 10. Pode pagar 1 PM para criar água potável (um odre)."
    },
    {
        name: "Inimigo de Tenebra",
        type: "conceded",
        category: "Azgher",
        req: "Devoto de Azgher",
        desc: "Causa +1d6 dano em mortos-vivos. Efeitos de luz dobram alcance."
    },
    {
        name: "Kiai Divino",
        type: "conceded",
        category: "Lin-Wu",
        req: "Devoto de Lin-Wu",
        desc: "Uma vez por rodada, ao atacar corpo a corpo, pague 3 PM. Se acertar, causa dano máximo."
    },
    {
        name: "Liberdade Divina",
        type: "conceded",
        category: "Valkaria",
        req: "Devoto de Valkaria",
        desc: "Gaste 2 PM para imunidade a efeitos de movimento por uma rodada."
    },
    {
        name: "Manto da Penumbra",
        type: "conceded",
        category: "Tenebra",
        req: "Devoto de Tenebra",
        desc: "Aprende Escuridão (custo -1 PM se reaprender)."
    },
    {
        name: "Mente Analítica",
        type: "conceded",
        category: "Tanna Toh",
        req: "Devoto de Tanna Toh",
        desc: "Recebe +2 em Intuição, Investigação e Vontade."
    },
    {
        name: "Mente Vazia",
        type: "conceded",
        category: "Lin-Wu",
        req: "Devoto de Lin-Wu",
        desc: "Recebe +2 em Iniciativa, Percepção e Vontade."
    },
    {
        name: "Mestre dos Mares",
        type: "conceded",
        category: "Oceano",
        req: "Devoto de Oceano",
        desc: "Fala com animais aquáticos. Aprende Acalmar Animal (só aquáticos, custo -1 PM se reaprender)."
    },
    {
        name: "Olhar Amedrontador",
        type: "conceded",
        category: "Megalokk, Thwor, Ragnar",
        req: "Devoto de Megalokk ou Thwor",
        desc: "Aprende Amedrontar (custo -1 PM se reaprender)."
    },
    {
        name: "Palavras de Bondade",
        type: "conceded",
        category: "Marah",
        req: "Devoto de Marah",
        desc: "Aprende Enfeitiçar (custo -1 PM se reaprender)."
    },
    {
        name: "Percepção Temporal",
        type: "conceded",
        category: "Aharadak",
        req: "Devoto de Aharadak",
        desc: "Gaste 3 PM para somar Sabedoria (limite nível) em ataque, Defesa e Reflexos até fim da cena."
    },
    {
        name: "Pesquisa Abençoada",
        type: "conceded",
        category: "Tanna Toh",
        req: "Devoto de Tanna Toh",
        desc: "Se passar 1h pesquisando, pode rolar novamente teste de perícia de Int ou Sab. Se tiver biblioteca, recebe +2 a +5."
    },
    {
        name: "Poder Oculto",
        type: "conceded",
        category: "Nimb",
        req: "Devoto de Nimb",
        desc: "Ação de movimento e 2 PM. Rola 1d6 para +2 atributo (cena): 1-2 For, 3-4 Des, 5-6 Con. Acumula com atributos diferentes."
    },

    // ========================================================================
    // PODERES CONCEDIDOS: DEUSES (PARTE 2 - FINAL)
    // ========================================================================
    {
        name: "Presas Primordiais",
        type: "conceded",
        category: "Kallyadranoch, Megalokk",
        req: "Devoto de Kallyadranoch ou Megalokk",
        desc: "Gaste 1 PM para receber arma natural de mordida (1d6, x2) pela cena. Ao agredir com outra arma, gaste 1 PM para ataque extra com mordida. Se já tiver mordida, dano aumenta 2 passos."
    },
    {
        name: "Presas Venenosas",
        type: "conceded",
        category: "Sszzaas",
        req: "Devoto de Sszzaas",
        desc: "Ação de movimento e 1 PM. Envenena arma corpo a corpo. No acerto, causa perda de 1d12 PV. Dura até acertar ou fim da cena."
    },
    {
        name: "Rejeição Divina",
        type: "conceded",
        category: "Aharadak, Ragnar",
        req: "Devoto de Aharadak",
        desc: "Recebe resistência a magia divina +5."
    },
    {
        name: "Reparar Injustiça",
        type: "conceded",
        category: "Khalmyr",
        req: "Devoto de Khalmyr",
        desc: "Uma vez por rodada, quando oponente (curto) acerta ataque em você ou aliado: gaste 2 PM para obrigá-lo a repetir o ataque (pega o pior resultado)."
    },
    {
        name: "Sangue de Ferro",
        type: "conceded",
        category: "Arsenal, Tauron",
        req: "Devoto de Arsenal",
        desc: "Pague 3 PM para receber +2 dano e RD 5 até o fim da cena."
    },
    {
        name: "Sangue Ofídico",
        type: "conceded",
        category: "Sszzaas",
        req: "Devoto de Sszzaas",
        desc: "Recebe resistência a veneno +5. A CD dos seus venenos aumenta em +2."
    },
    {
        name: "Servos do Dragão",
        type: "conceded",
        category: "Kallyadranoch",
        req: "Devoto de Kallyadranoch",
        desc: "Ação completa e 2 PM. Invoca 2d4+1 kobolds capangas (1 PV, Def 12). Ação movimento para andar, Padrão para causar 1d6-1 dano perfuração."
    },
    {
        name: "Sopro do Mar",
        type: "conceded",
        category: "Oceano",
        req: "Devoto de Oceano",
        desc: "Ação padrão e 1 PM. Cone 6m causa 2d6 frio (Reflexos reduz metade). Pode aprender Sopro das Uivantes (custo -1 PM)."
    },
    {
        name: "Sorte dos Loucos",
        type: "conceded",
        category: "Nimb",
        req: "Devoto de Nimb",
        desc: "Ao fazer teste, pague 1 PM para rolar novamente (pode repetir). Se falhar no fim, perde 1d6 PM por vez que usou."
    },
    {
        name: "Talento Artístico",
        type: "conceded",
        category: "Marah",
        req: "Devoto de Marah",
        desc: "Recebe +2 em Acrobacia, Atuação e Diplomacia."
    },
    {
        name: "Teurgista Místico",
        type: "conceded",
        category: "Wynna",
        req: "Devoto de Wynna, Habilidade Magias",
        desc: "Pode escolher 1 magia de cada círculo da lista oposta à sua (Divina se for Arcano, Arcana se for Divino)."
    },
    {
        name: "Tradição de Lin-Wu",
        type: "conceded",
        category: "Lin-Wu",
        req: "Devoto de Lin-Wu",
        desc: "Considera katana arma simples. Se tiver proficiência marcial, recebe +1 na margem de ameaça com ela."
    },
    {
        name: "Transmissão da Loucura",
        type: "conceded",
        category: "Nimb",
        req: "Devoto de Nimb",
        desc: "Pode lançar Sussurros Insanos (CD Car). Se aprender a magia novamente, custo diminui -1 PM."
    },
    {
        name: "Tropas Duyshidakk",
        type: "conceded",
        category: "Thwor",
        req: "Devoto de Thwor",
        desc: "Ação completa e 2 PM. Invoca 1d4+1 goblinoides (1 PV, Def 15). Ação movimento para andar, Padrão para causar 1d6+1 dano corte."
    },
    {
        name: "Urro Divino",
        type: "conceded",
        category: "Megalokk",
        req: "Devoto de Megalokk",
        desc: "Ao atacar ou lançar magia, pague 1 PM para somar Constituição ao dano."
    },
    {
        name: "Visão nas Trevas",
        type: "conceded",
        category: "Tenebra",
        req: "Devoto de Tenebra",
        desc: "Enxerga perfeitamente no escuro (inclusive mágico)."
    },
    {
        name: "Voz da Civilização",
        type: "conceded",
        category: "Tanna Toh",
        req: "Devoto de Tanna Toh",
        desc: "Está sempre sob efeito da magia Compreensão."
    },
    {
        name: "Voz da Natureza",
        type: "conceded",
        category: "Allihanna",
        req: "Devoto de Allihanna",
        desc: "Fala com animais. Aprende Acalmar Animal (só animais, custo -1 PM se reaprender)."
    },
    {
        name: "Voz dos Monstros",
        type: "conceded",
        category: "Megalokk",
        req: "Devoto de Megalokk",
        desc: "Fala idiomas de monstros inteligentes e comunica com não inteligentes."
    },
    {
        name: "Zumbificar",
        type: "conceded",
        category: "Tenebra",
        req: "Devoto de Tenebra",
        desc: "Ação completa e 3 PM. Reanima cadáver adjacente por 1 dia (Parceiro iniciante combatente, fortão ou guardião). Pode sacrificar parceiro para sofrer metade do dano."
    },

    // ========================================================================
    // PODERES DA TORMENTA (LIVRO BÁSICO)
    // ========================================================================
    {
        name: "Anatomia Insana",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Tem 25% de chance de ignorar dano extra de crítico ou furtivo. Chance aumenta +25% a cada dois outros poderes da Tormenta."
    },
    {
        name: "Antenas",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe +1 em Iniciativa, Percepção e Vontade. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Armamento Aberrante",
        type: "tormenta",
        category: "Tormenta",
        req: "Outro poder da Tormenta",
        desc: "Ação de movimento e 1 PM. Cria arma orgânica (corpo a corpo ou arremesso). Dano aumenta um passo a cada dois outros poderes da Tormenta. Dura pela cena."
    },
    {
        name: "Articulações Flexíveis",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe +1 em Acrobacia, Furtividade e Reflexos. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Asas Insetoides",
        type: "tormenta",
        category: "Tormenta",
        req: "Quatro outros poderes da Tormenta",
        desc: "Gaste 1 PM para voo 9m até fim do turno. Deslocamento aumenta +1,5m para cada outro poder da Tormenta."
    },
    {
        name: "Carapaça",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe +1 na Defesa. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Corpo Aberrante",
        type: "tormenta",
        category: "Tormenta",
        req: "Outro poder da Tormenta",
        desc: "Dano desarmado aumenta em um passo. Aumenta mais um passo a cada quatro outros poderes da Tormenta."
    },
    {
        name: "Cuspir Enxame",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Ação completa e 2 PM (sustentada). Cria enxame em alcance curto. Causa 2d6 ácido no fim do turno. Gaste +1 PM na ativação para aumentar dano em +1d6 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Dentes Afiados",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe mordida (1d4). Ao agredir com outra arma, gaste 1 PM para ataque extra com mordida."
    },
    {
        name: "Desprezar a Realidade",
        type: "tormenta",
        category: "Tormenta",
        req: "Quatro outros poderes da Tormenta",
        desc: "Gaste 2 PM. Até próximo turno: ignora terreno difícil e tem 20% chance de falha contra efeitos usados em você. Chance aumenta +5% a cada dois outros poderes da Tormenta (Max 50%)."
    },
    {
        name: "Empunhadura Rubra",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Gaste 1 PM para receber +1 em Luta pela cena. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Fome de Mana",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Ao passar em resistência contra magia inimiga: ganha 1 PM temporário cumulativo (Máximo = número de poderes da Tormenta)."
    },
    {
        name: "Larva Explosiva",
        type: "tormenta",
        category: "Tormenta",
        req: "Dentes Afiados",
        desc: "Se criatura mordida na cena for a 0 PV, ela explode: 4d4 ácido em adjacentes. Dano aumenta +2d4 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Legião Aberrante",
        type: "tormenta",
        category: "Tormenta",
        req: "Anatomia Insana, três outros poderes da Tormenta",
        desc: "Passa por qualquer espaço (terreno difícil). +1 em testes contra manobra e resistências contra efeitos alvejados. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Mãos Membranosas",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe +1 em Atletismo, Fortitude e agarrar. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Membros Estendidos",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Alcance natural aumenta +1,5m. Aumenta mais +1,5m a cada quatro outros poderes da Tormenta."
    },
    {
        name: "Membros Extras",
        type: "tormenta",
        category: "Tormenta",
        req: "Quatro outros poderes da Tormenta",
        desc: "Possui duas patas insetoides (armas naturais). Ao agredir, pode gastar 2 PM para atacar com cada uma. Pode empunhar armas leves nelas (penalidade -2)."
    },
    {
        name: "Mente Aberrante",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe +1 resistência mental. Ao testar Vontade contra habilidade, o atacante sofre 1d6 psíquico. Bônus e dano aumentam (+1 / +1d6) a cada dois outros poderes da Tormenta."
    },
    {
        name: "Olhos Vermelhos",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Recebe visão no escuro e +1 em Intimidação. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Pele Corrompida",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "RD 2 (ácido, eletricidade, fogo, frio, luz, trevas). RD aumenta +2 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Sangue Ácido",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Ao sofrer dano corpo a corpo, atacante sofre 1 dano de ácido por poder da Tormenta que você possui."
    },
    {
        name: "Visco Rubro",
        type: "tormenta",
        category: "Tormenta",
        req: "-",
        desc: "Gaste 1 PM. Até fim da cena, recebe +1 dano corpo a corpo. Bônus aumenta +1 a cada dois outros poderes da Tormenta."
    },

    // ========================================================================
    // TREINADOR (HERÓIS DE ARTON): HABILIDADES DE CLASSE (AUTOMÁTICAS)
    // ========================================================================
    {
        name: "Direcionar",
        type: "class",
        class: "treinador",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Se seu melhor amigo (alcance curto) fizer teste de perícia, gaste 2 PM para somar seu Carisma no teste dele."
    },
    {
        name: "Melhor Amigo",
        type: "class",
        class: "treinador",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Recebe um parceiro especial (Melhor Amigo). Começa com 2 truques (ganha +1 a cada 3 níveis). Se morrer, você fica atordoado 1d4 rodadas. Treinar novo: 1 mês."
    },
    {
        name: "Domar Criatura",
        type: "class",
        class: "treinador",
        subType: "ability",
        req: "Nível 2",
        pathReq: "all",
        desc: "Ação movimento e 1 PM. Teste Adestramento vs Vontade (criatura não inteligente, curto). Sucesso: 2d8 dano psíquico não letal (Falha: metade). Se zerar PV, ela se rende. Nível 5: Pode controlar ações da criatura rendida (gasto PM = ND)."
    },
    {
        name: "Treino Especializado",
        type: "class",
        class: "treinador",
        subType: "ability",
        req: "Nível 5",
        pathReq: "all",
        desc: "Escolha um:<br><strong>• Conquistar pelos Números:</strong> Recebe 2º melhor amigo. Gaste 3 PM para dar ação padrão ao segundo quando comanda o primeiro.<br><strong>• Treino Intensivo:</strong> Melhor amigo recebe +4 PV/nível, RD 5 e +1 truque. (Nível 11: RD 10 +1 truque; Nível 17: RD 15)."
    },
    {
        name: "Sincronia de Combate",
        type: "class",
        class: "treinador",
        subType: "ability",
        req: "Nível 6",
        pathReq: "all",
        desc: "Uma vez por rodada, quando melhor amigo acerta ataque (agredir), gaste 2 PM para fazer um ataque contra o mesmo alvo."
    },
    {
        name: "Sincronia Perfeita",
        type: "class",
        class: "treinador",
        subType: "ability",
        req: "Nível 20",
        pathReq: "all",
        desc: "Ação movimento e 6 PM. Sincronia com melhor amigo (cena): tamanho dele aumenta uma categoria. Uma vez por rodada, se usar ação padrão em si mesmo, recebe ação padrão extra para usar com ele."
    },

    // ========================================================================
    // TREINADOR: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Amigo Divino",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Melhor amigo vive em mundo divino (tem Cura Acelerada 10 lá). Gaste ação movimento e 2 PM para invocá-lo em alcance curto (cena)."
    },
    {
        name: "Asas Aliadas",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Se estiver perto de melhor amigo voando: pague 1 PM para ser alçado aos céus (move-se junto). Seu próximo ataque conta como investida."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Você recebe +1 em um atributo. Você pode escolher este poder várias vezes, mas apenas uma vez por patamar para um mesmo atributo."
    },
    {
        name: "Bom Garoto",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "11º nível de treinador",
        pathReq: "all",
        desc: "Uma vez por rodada, se melhor amigo faz crítico ou reduz inimigo a 0 PV: você recebe uma ação padrão extra (só para si)."
    },
    {
        name: "Comando Defensivo",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Quando melhor amigo sofre dano: gaste 2 PM e teste Adestramento para reduzir o dano pelo resultado do teste. (1 vez/rodada por amigo)."
    },
    {
        name: "Comandos Distantes",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Alcance de habilidades de treinador aumenta uma categoria (curto->médio->longo)."
    },
    {
        name: "Convocar Enxame",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "5º nível de treinador",
        pathReq: "all",
        desc: "Aprende e lança Enxame de Pestes (Carisma). Pode usar aprimoramentos como clérigo do seu nível. Habilidade não mágica."
    },
    {
        name: "Coração Grande",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Limite de parceiros aumenta em +1. No nível 11, aumenta mais +1."
    },
    {
        name: "Direcionamento Marcial",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Quando usa Direcionar em teste de ataque, soma Carisma também no dano."
    },
    {
        name: "Domador Cativante",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Soma Carisma no dano de Domar Criatura. Dado de dano aumenta para d10."
    },
    {
        name: "Domador Lendário",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Domador Cativante, 17º nível de treinador",
        pathReq: "all",
        desc: "Ao usar Domar Criatura: gaste +2 PM para mudar dado para d12 e atingir todos os alvos no alcance."
    },
    {
        name: "Ensinar Truque",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Um de seus melhores amigos aprende um truque adicional. (1 vez por patamar por amigo)."
    },
    {
        name: "Investida Conjunta",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Melhor amigo montaria",
        pathReq: "all",
        desc: "Uma vez por rodada, se montaria faz investida: gaste 2 PM para fazer ataque corpo a corpo (conta como investida)."
    },
    {
        name: "Líder da Matilha",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Conquistar pelos Números",
        pathReq: "all",
        desc: "Ao usar Direcionar, pode aplicar bônus a outros melhores amigos (+1 PM por amigo)."
    },
    {
        name: "Língua das Criaturas",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Comunica-se com criaturas não inteligentes (Int -4/-5). Pode usar Adestramento para diplomacia com elas."
    },
    {
        name: "Mascote",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Recebe um mascote (não conta no limite de parceiros, dá bônus para você e amigos).<br><br><strong>• Águia Real:</strong> +1d6 dano com arma (1/rodada).<br><strong>• Bicho Preguiça:</strong> Item vestido. Garra 1d6 (ataque extra por 1 PM).<br><strong>• Camundongo:</strong> +1 CD magias.<br><strong>• Fada-Borboleta:</strong> -1 custo magias.<br><strong>• Gekko Malhado:</strong> +2 Defesa e Reflexos.<br><strong>• Mico-Leão:</strong> Ladinagem (punga) em curto.<br><strong>• Minivaca:</strong> +1 ataque (dobra investida).<br><strong>• Ossinhos:</strong> RD 2 (corte/frio/perfuração)."
    },
    {
        name: "Petisco Merecido",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Gaste 2 PM para dar +2 Força e Destreza a melhor amigo (curto) até fim da cena."
    },
    {
        name: "Proteção Fraterna",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Se você e/ou amigo sofrem efeito de resistência (curto): gaste 2 PM. Ambos rolam, usam o melhor resultado. Efeitos como Evasão aplicam a ambos."
    },
    {
        name: "Trabalho em Equipe",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "5º nível de treinador",
        pathReq: "all",
        desc: "Uma vez por rodada, quando você faz ação movimento, seus melhores amigos ganham ação movimento."
    },
    {
        name: "Treinador Eclético",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "6º nível de treinador",
        pathReq: "all",
        desc: "Melhores amigos usam seu nível de personagem (não de classe) para calcular PV, perícias e Defesa."
    },
    {
        name: "Veterinário de Campo",
        type: "class",
        class: "treinador",
        subType: "power",
        req: "Treinador",
        pathReq: "all",
        desc: "Ação completa. Teste Adestramento em amigo adjacente. Recupera PV igual ao resultado. (1 vez/dia por alvo)."
    },

    // ========================================================================
    // ARCANISTA: PODERES (DEUSES E HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Agrilhoar os Caídos",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "3º nível de arcanista",
        pathReq: "all",
        desc: "Ao reduzir inimigo vivo a 0 PV com necromancia, aprisiona espírito (máx = atributo-chave). Cada espírito dá +2 Defesa/Resistência. Pode libertar espírito ao lançar magia de dano para causar +2d6 trevas."
    },
    {
        name: "Alquimia Arcana",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "A CD dos seus preparados alquímicos e poções aumenta em +1 para cada círculo de magia a que você tem acesso."
    },
    {
        name: "Apoteose Celestial",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Herança Superior (Celestial), 17º nível",
        pathReq: "feiticeiro",
        desc: "Recebe +1 Sabedoria e aprende uma magia divina de cada círculo a que tem acesso. Sua Constituição diminui em –1."
    },
    {
        name: "Apoteose Dracônica",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Herança Superior (Dracônica), 17º nível",
        pathReq: "feiticeiro",
        desc: "Magias do elemento escolhido causam +1 dano por dado e causam metade do dano em imunes. Não pode mais lançar magias do elemento oposto."
    },
    {
        name: "Apoteose Feérica",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Herança Superior (Feérica), 17º nível",
        pathReq: "feiticeiro",
        desc: "Quando inimigo falha em Vontade contra sua magia, ganha 1 PM temporário (2 PM se Encantamento/Ilusão). Não pode mais lançar Convocação e Necromancia."
    },
    {
        name: "Apoteose Rubra",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Herança Superior (Rubra), 17º nível",
        pathReq: "feiticeiro",
        desc: "Escolha 1 magia de dano de cada círculo: o dano vira psíquico. Soma poderes da Tormenta no dano de magias psíquicas. Conta como Poder da Tormenta."
    },
    {
        name: "Arcanista de Linha de Frente",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Quando lança magia, criaturas adjacentes sofrem –2 na resistência contra ela. Se causar dano, causa um dado extra."
    },
    {
        name: "Asas de Sapo",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "Pode empunhar dois catalisadores diferentes em uma mão e gastar ambos na mesma magia para aplicar seus efeitos."
    },
    {
        name: "Contingência Arcana",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Runa de Proteção",
        pathReq: "all",
        desc: "Ao lançar Runa de Proteção em si mesmo, pode substituir o componente material por uma penalidade em PM igual ao círculo da magia inscrita."
    },
    {
        name: "Contramágica Superior",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Contramágica Aprimorada, 9º nível",
        pathReq: "all",
        desc: "Quando anula magia com contramágica, recebe PM temporários igual ao círculo da magia anulada."
    },
    {
        name: "Especialista em Invocações",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Arcanista",
        pathReq: "all",
        desc: "Soma atributo-chave na Defesa de criaturas conjuradas. Ação para comandar diminui um passo (Padrão->Movimento->Livre)."
    },
    {
        name: "Familiar Aprimorado",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Familiar, 5º nível",
        pathReq: "all",
        desc: "Seu familiar pode falar e fornece um segundo benefício da lista de familiares."
    },
    {
        name: "Ingrediente Especial",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Caldeirão do Bruxo, 5º nível",
        pathReq: "bruxo",
        desc: "Quando usa uma poção, pode usar um catalisador e aplicar seus efeitos a ela."
    },
    {
        name: "Magia Performática",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Car 1, treinado em Atuação",
        pathReq: "all",
        desc: "Ao lançar magia, faça teste Atuação (CD 20 + custo). Sucesso: CD aumenta +1 (e +1 a cada 10 pontos acima da CD). Falha: magia não funciona."
    },
    {
        name: "Memória Súbita",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Mago",
        pathReq: "mago",
        desc: "Ação de movimento. Memoriza uma magia não preparada até o fim da cena, esquecendo outra magia preparada."
    },
    {
        name: "O Próprio Sangue",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Feiticeiro",
        pathReq: "feiticeiro",
        desc: "Se aprender como feiticeiro uma magia que já lance por outra habilidade (raça/devoto), a CD dela aumenta em +2."
    },
    {
        name: "Raio Dividido",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Raio Arcano, 5º nível",
        pathReq: "all",
        desc: "Pode usar Raio Arcano como ação completa para afetar um número de alvos igual ao seu atributo-chave."
    },
    {
        name: "Sifão de Mana",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "17º nível de arcanista",
        pathReq: "all",
        desc: "Quando lança magia e inimigo falha na resistência, recupera PM igual ao círculo da magia."
    },
    {
        name: "Trama Célere",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "9º nível de arcanista",
        pathReq: "all",
        desc: "Uma vez por rodada, ao lançar magia (padrão), gaste 2 PM para lançar uma segunda magia de 1º círculo como ação livre."
    },
    {
        name: "Transliteração Impossível",
        type: "class",
        class: "arcanista",
        subType: "power",
        req: "Escriba Arcano",
        pathReq: "mago",
        desc: "Ao usar pergaminho de magia conhecida: recebe +2 PM para aprimoramentos e a magia não pode sofrer contramágica."
    },
    // ========================================================================
    // BÁRBARO: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Alma Inabalável",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Treinado em Intimidação",
        pathReq: "all",
        desc: "Ao fazer teste de resistência, gaste 1 PM para usar Intimidação no lugar. Se passar e fonte for criatura, ela fica Abalada 1d4 rodadas (Vontade CD teste anula)."
    },
    {
        name: "Ampliar Brado",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Alcance dos brados aumenta para médio. CD para resistir aumenta em +2."
    },
    {
        name: "Arremesso Violento",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Fúria da Savana",
        pathReq: "all",
        desc: "Em fúria: dano e alcance de armas de arremesso aumenta um passo. Penalidade por arremessar sem alcance cai para -2."
    },
    {
        name: "Beberrão Selvagem",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Con 3",
        pathReq: "all",
        desc: "Ação movimento. Ingere item alquímico de dano (guarda 3 cargas na boca). Ao acertar ataque corpo a corpo, gasta carga para somar dano do item."
    },
    {
        name: "Brado: Assombroso",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Brado Assustador",
        pathReq: "all",
        desc: "Ação de movimento.Gaste PM (limite Con). Causa 1d6 dano psíquico por PM em inimigos no alcance. (Vontade CD Con reduz metade). Efeito de Medo."
    },
    {
        name: "Brado: Retardante",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Ação de movimento e 1 PM. Criaturas escolhidas no alcance ficam Lentas por 1 rodada. Efeito de Medo."
    },
    {
        name: "Brado: Sísmico",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Outro poder de brado",
        pathReq: "all",
        desc: "Ação de movimento e 1 PM.Criaturas no alcance ficam Vulneráveis (1d4 rodadas) e caídas. (Fort CD For reduz para vulnerável 1 rodada). Se já vulnerável, fica Desprevenida."
    },
    {
        name: "Brado Vitorioso",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Brado Assustador, Sangue dos Inimigos",
        pathReq: "all",
        desc: "Em fúria, ao fazer crítico ou reduzir inimigo a 0 PV: usa um poder de brado como ação livre."
    },
    {
        name: "Enigma do Aço",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "17º nível de bárbaro",
        pathReq: "all",
        desc: "Se empunhar arma mundana: recebe +5 ataque e +2 dados extras de dano do mesmo tipo."
    },
    {
        name: "Espiritualista",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Sab 2, Totem Espiritual, 6º nível de bárbaro",
        pathReq: "all",
        desc: "+1 PM por nível ímpar. Aprende magia do totem (Sabedoria, lança em fúria):<br>• Coruja: Augúrio<br>• Corvo: Voz Divina<br>• Falcão: Mapear<br>• Grifo: Físico Divino<br>• Lobo: Localização<br>• Raposa: Camuflagem Ilusória<br>• Tartaruga: Vestimenta da Fé<br>• Urso: Soco de Arsenal."
    },
    {
        name: "Fúria Bestial",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Em fúria: dano das armas naturais aumenta 2 passos e multiplicador de crítico aumenta +1."
    },
    {
        name: "Fúria Elemental",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Totem Espiritual, 11º nível de bárbaro",
        pathReq: "all",
        desc: "Escolha: Ácido, Eletricidade, Fogo ou Frio. Em fúria, seus ataques causam +1d12 dano do tipo escolhido."
    },
    {
        name: "Impiedoso",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Recebe +2 ataque, dano e CD de habilidades contra criaturas vulneráveis."
    },
    {
        name: "Invocar os Ancestrais",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Totem Espiritual, 11º nível de bárbaro",
        pathReq: "all",
        desc: "Ação completa e 2 PM. Invoca 1d4+1 ancestrais (1 PV, incorpóreo). Dão +2 dano a adjacente. Pode gastar um para ataque extra ao agredir."
    },
    {
        name: "Manifestar Totem",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Totem Espiritual, 7º nível de bárbaro",
        pathReq: "all",
        desc: "Ação movimento e 3 PM. Invoca manifestação do totem (Parceiro Veterano de tipo a escolha)."
    },
    {
        name: "Recuperação Gutural",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Alma de Bronze, um poder de brado",
        pathReq: "all",
        desc: "Ao usar brado em fúria, ganha PV temporários = Metade do nível + Força."
    },
    {
        name: "Regeneração Sobrenatural",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Con 5, Vigor Primal, 5º nível de bárbaro",
        pathReq: "all",
        desc: "Em fúria e com menos da metade dos PV: ganha Cura Acelerada 5."
    },
    {
        name: "Revide",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Frenesi, 11º nível de bárbaro",
        pathReq: "all",
        desc: "1 vez/rodada, ao sofrer dano corpo a corpo em fúria: gaste 2 PM para fazer ataque contra o agressor (se estiver no alcance)."
    },
    {
        name: "Rigidez Selvagem",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Bárbaro",
        pathReq: "all",
        desc: "Em fúria, soma o bônus da fúria na Defesa, Fortitude e RD."
    },
    {
        name: "Sede Sanguinária",
        type: "class",
        class: "barbaro",
        subType: "power",
        req: "Sangue dos Inimigos, 5º nível de bárbaro",
        pathReq: "all",
        desc: "Em fúria, ao fazer crítico ou reduzir inimigo a 0 PV: recupera 10 PV e 2 PM."
    },

    // ========================================================================
    // BARDO: PODERES (DEUSES E HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Acorde Místico",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Se empunhar instrumento: Ação padrão. Teste Atuação vs Vontade (curto). Sucesso: 1d6 essência + vulnerável (1 rodada). Dano aumenta +1d6 por círculo acima do 1º. Pode usar no lugar de ataque ao lançar magia (ex: Toque Chocante)."
    },
    {
        name: "Acorde Poderoso",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Acorde Místico",
        pathReq: "all",
        desc: "Acorde Místico causa d10 de dano, alcance aumenta para médio e alvo fica Desprevenido em vez de vulnerável."
    },
    {
        name: "Adereço Musical",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Gaste 10 min para acoplar esotérico ao instrumento. Permite usar o efeito do esotérico no Acorde Místico."
    },
    {
        name: "Apresentação Impactante",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Ao usar Inspiração, afeta inimigos no alcance: o próximo teste de ataque ou resistência que fizerem na cena deve rolar dois dados e usar o pior (1 vez/cena)."
    },
    {
        name: "Balada do Atirador",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Esgrima Mágica",
        pathReq: "all",
        desc: "Pode usar Esgrima Mágica com armas de ataque à distância (leves ou 1 mão). Substitui Pontaria por Atuação."
    },
    {
        name: "Celebridade Artoniana",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Estrelato, 17º nível de bardo",
        pathReq: "all",
        desc: "Gaste 3 PM e teste Atuação vs Vontade (alvo inteligente). Sucesso: vira seu fã (você ganha +5 em perícias contra ele, ele sofre -5 contra você) até fim da aventura."
    },
    {
        name: "Dança Acrobática",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Pode substituir testes de Acrobacia por Atuação. Se usar para passar por inimigo, ele só pode usar Acrobacia ou Iniciativa no oposto."
    },
    {
        name: "Espada Encantada",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Golpe Elemental",
        pathReq: "all",
        desc: "Ao causar dano com Golpe Elemental, aplica condição:<br>• Ácido: Vulnerável.<br>• Eletricidade: Ofuscado.<br>• Fogo: Em chamas.<br>• Frio: Lento.<br>(Duração 1 rodada)."
    },
    {
        name: "História de Acampamento",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Gaste 1 hora entretendo grupo (qtd = nível). A recuperação de PM por descanso deles aumenta em +1 por nível."
    },
    {
        name: "Inspiração Espirituosa",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "11º nível de bardo",
        pathReq: "all",
        desc: "Na primeira vez que usa Inspiração no combate, todos recebem PM temporários igual ao bônus da inspiração."
    },
    {
        name: "Inspiração Resoluta",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Sua Inspiração também aplica o bônus na Defesa."
    },
    {
        name: "Inspiração Revigorante",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Sua Inspiração concede PV temporários igual a 5 vezes o bônus fornecido."
    },
    {
        name: "Magia Performática",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Car 1, treinado em Atuação",
        pathReq: "all",
        desc: "Ao lançar magia, faça teste Atuação (CD 20 + custo). Sucesso: CD aumenta +1 (e +1 a cada 10 pontos acima da CD). Falha: magia não funciona."
    },
    {
        name: "Mago Vermelho",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Treinado em Misticismo",
        pathReq: "all",
        desc: "Se empunhar arma leve/ágil: Soma círculo máximo de magia nos ataques e danos. Mão da arma conta como livre para conjurar."
    },
    {
        name: "Música: Marcha Vitoriosa",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Inspiração Marcial, 5º nível de bardo",
        pathReq: "all",
        desc: "Teste Atuação. Para cada 10 pontos no resultado, aliados no alcance recebem +1 no dano por 1 rodada."
    },
    {
        name: "Música: Réquiem Sombrio",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Necromancia como escola conhecida",
        pathReq: "all",
        desc: "Ergue cadáver (Médio ou menor) no alcance como parceiro iniciante sob seu comando (não conta no limite). Máximo de cadáveres = Carisma. Duram uma cena."
    },
    {
        name: "Música: Sonata da Distração",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Teste Atuação vs Vontade de inimigos no alcance. Falha: Desprevenido por 1 rodada. Sucesso: Imune por 1 dia."
    },
    {
        name: "Portas da Fama",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Estrelato",
        pathReq: "all",
        desc: "Recebe +10 em Diplomacia, Enganação e Furtividade para entrar em lugares proibidos."
    },
    {
        name: "Ressoar",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "17º nível de bardo",
        pathReq: "all",
        desc: "Ao lançar magia com alvo 'Você', gaste 2 PM e teste Atuação (CD 15 + custo). Sucesso: compartilha efeito com aliado em alcance curto sob Inspiração."
    },
    {
        name: "Triunfo do Amor",
        type: "class",
        class: "bardo",
        subType: "power",
        req: "Bardo",
        pathReq: "all",
        desc: "Se 'conquistar' romanticamente um NPC (Atitude Prestativa + Teste vs Vontade+10): seus PM aumentam em +1 por nível até fim da aventura (Máx 2 vezes/aventura)."
    },
    // ========================================================================
    // BUCANEIRO: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Ardil Afiado",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Car 1, treinado em Enganação",
        pathReq: "all",
        desc: "Pode usar Audácia em testes de manobra. Se o alvo estiver desprevenido, soma o dobro do Carisma."
    },
    {
        name: "Bloqueio Desconcertante",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Esgrimista",
        pathReq: "all",
        desc: "Se criatura errar ataque corpo a corpo em você (ou você aparar): gaste 1 PM para deixá-la Desprevenida contra seu próximo ataque."
    },
    {
        name: "Bom de Trago",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Uma vez por rodada, pode ingerir bebida/preparado/poção (empunhada) como ação livre."
    },
    {
        name: "Charme Cafajeste",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Treinado em Enganação, 3º nível de bucaneiro",
        pathReq: "all",
        desc: "Lança Enfeitiçar (Carisma, habilidade não mágica). CD +2 contra inamistosos, +5 contra hostis."
    },
    {
        name: "Cobrir de Pólvora",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Ação movimento, 1 PM e 1 bala. Cobre alvo (curto). Fica Cego 1 rodada (Ref anula). Próximo ataque nele causa +1d6 fogo e deixa Em Chamas."
    },
    {
        name: "Cortejo de Espadas",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Treinado em Acrobacia",
        pathReq: "all",
        desc: "Ao usar Acrobacia para passar por inimigo: espaço dele não é terreno difícil, ele só usa Iniciativa no oposto. Sucesso: +2 Defesa/Reflexos contra ele (1 rodada)."
    },
    {
        name: "Dançar nas Cordas",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Ataque Acrobático",
        pathReq: "all",
        desc: "Se usar Ataque Acrobático após vencer teste de passar por inimigo: bônus aumenta para +5 e vale para todos ataques contra ele na rodada."
    },
    {
        name: "Entrada Triunfal",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Se for o primeiro na iniciativa do combate, recebe PV temporários = metade dos PV máximos."
    },
    {
        name: "Esgrima Sambur",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Esgrimista",
        pathReq: "all",
        desc: "Se empunhar duas armas leves/ágeis e agredir: gaste 1 PM para fazer dois ataques (um com cada). Se tiver Ambidestria, não tem penalidade. Permite usar Aparar 2 vezes na rodada."
    },
    {
        name: "Estampido Ensurdecedor",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Grudar o Cano",
        pathReq: "all",
        desc: "Ao atacar com arma de fogo: pague 1 PM para deixar criaturas adjacentes Abaladas e Surdas (Fort reduz para 1 rodada)."
    },
    {
        name: "Estocada no Flanco",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Cortejo de Espadas",
        pathReq: "all",
        desc: "1 vez/rodada, ao vencer teste de passar por inimigo: gaste 2 PM para fazer ataque nele. Se acertar (corte/perfuração), alvo fica Sangrando."
    },
    {
        name: "Gole da Coragem",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "1 vez/cena, ao ingerir bebida/poção, recebe uma ação padrão extra no turno."
    },
    {
        name: "Golpe Humilhante",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Gaste 2 PM para humilhar criatura (curto). Até fim da cena, seus ataques nela impõem -1 cumulativo na Defesa dela (limite = Carisma)."
    },
    {
        name: "Introdução Calorosa",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Na 1ª rodada, gaste ação para se apresentar. Ganha benefícios cumulativos (duram a cena):<br>• <strong>Livre (Saudação):</strong> +1 PM temporário.<br>• <strong>Movimento (Nome):</strong> +2 perícias de Carisma.<br>• <strong>Padrão (Ligação):</strong> +2 dano.<br>• <strong>Completa (Objetivo):</strong> Rola novamente um teste de perícia."
    },
    {
        name: "Lobo do Mar",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "17º nível de bucaneiro",
        pathReq: "all",
        desc: "Ao chegar em lugar inédito: Audácia custa -1 PM e pode ser usada em ataques (ambos nesse lugar, pela aventura)."
    },
    {
        name: "Lorotas da Terra e do Mar",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Treinado em Enganação, 11º nível de bucaneiro",
        pathReq: "all",
        desc: "10 min contando mentira. Teste Enganação (CD 15 +5/uso). Sucesso: ganha uso de um poder relacionado à mentira até o fim do dia."
    },
    {
        name: "Onda de Sangue",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Estocada no Flanco",
        pathReq: "all",
        desc: "Se deixar alguém sangrando: perda de vida aumenta um passo (máx d12) e alvo falha automaticamente no próximo teste de Con para remover."
    },
    {
        name: "Passo das Ondas",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Pernas do Mar",
        pathReq: "all",
        desc: "1 vez/rodada, ao acertar ataque: gaste 2 PM para mover metade do deslocamento. Ignora terreno difícil e não gera ataques de oportunidade."
    },
    {
        name: "Pirouette",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "En Garde",
        pathReq: "all",
        desc: "Sob En Garde, gaste ação movimento para +5 Defesa por 1 rodada."
    },
    {
        name: "Remise",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "En Garde, 7º nível de bucaneiro",
        pathReq: "all",
        desc: "Sob En Garde, 1 vez/rodada, ao usar agredir: gaste 2 PM para fazer um ataque adicional."
    },
    {
        name: "Sucesso Atrai Sucesso",
        type: "class",
        class: "bucaneiro",
        subType: "power",
        req: "Bucaneiro",
        pathReq: "all",
        desc: "Gaste 2 PM. Até fim da cena, cada crítico concede +2 cumulativo no dano (limite = Carisma)."
    },
    // ========================================================================
    // CAÇADOR: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Armadilha Alquímica",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Armadilheiro",
        pathReq: "all",
        desc: "Ao preparar armadilha, gaste uma dose de preparado alquímico. Criaturas afetadas pela armadilha sofrem também os efeitos do preparado."
    },
    {
        name: "Avanço do Predador",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Ímpeto, 11° nível de caçador",
        pathReq: "all",
        desc: "1 vez/rodada, se presa marcada se afastar voluntariamente: gaste 1 PM para se mover na direção dela (limite deslocamento)."
    },
    {
        name: "Batedor Marcial",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Usa Sobrevivência no lugar de Guerra. Se passar em teste de analisar terreno, recupera 1 PM na próxima Marca da Presa."
    },
    {
        name: "Curandeiro dos Ermos",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Ervas Curativas",
        pathReq: "all",
        desc: "Pode usar Ervas Curativas como ação de movimento e os dados de cura aumentam para d8."
    },
    {
        name: "Elo Com a Natureza Maior",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Elo com a Natureza",
        pathReq: "all",
        desc: "Aprende 2 magias (Sabedoria): Abençoar Alimentos, Acalmar Animal, Alarme, Aviso, Conjurar Armadilhas, Detectar Ameaças, Orientação ou Suporte Ambiental."
    },
    {
        name: "Explorador Viajado",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "5º nível de caçador",
        pathReq: "all",
        desc: "Escolha dois tipos de terrenos extras para a habilidade Explorador. Pode pegar várias vezes."
    },
    {
        name: "Flecheiro",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "3° nível de caçador",
        pathReq: "all",
        desc: "Usa Sobrevivência no lugar de Ofício para fabricar munições. Pode fabricar munições com uma melhoria."
    },
    {
        name: "Golpe do Predador",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Dano em criatura marcada deixa Sangrando. Se já sangrando: dano aumenta um passo (máx d12) e ela falha no teste de Constituição para remover."
    },
    {
        name: "Herói do Povo",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "5º nível de caçador",
        pathReq: "all",
        desc: "Recebe +2 Defesa/Resistência. Ao acertar vilão ameaçando comuns, ganha 2 PM temporários (máx = nível)."
    },
    {
        name: "Identificar Presas",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Identificar criaturas vira ação de movimento. Se passar, ganha +1 dano contra essa espécie pela cena para cada informação obtida."
    },
    {
        name: "Lâminas Guardiãs",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Ambidestria, 5° nível de caçador",
        pathReq: "all",
        desc: "Empunhando duas armas corpo a corpo: +2 Defesa e Resistência contra inimigos no alcance natural."
    },
    {
        name: "Lanceiro",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "+2 ataque/dano com lanças (exceto montada/justa). Se empunhar com duas mãos: dano aumenta um passo e conta como alongada."
    },
    {
        name: "Pega!",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Companheiro Animal",
        pathReq: "all",
        desc: "Ação movimento e 1 PM. Manobra agarrar usando Adestramento (pelo companheiro). Se alvo marcado, soma bônus da Marca."
    },
    {
        name: "Primeiro Sangue",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Emboscar",
        pathReq: "all",
        desc: "Na 1ª rodada: +2 ataque e todos dados de dano aumentam 2 passos."
    },
    {
        name: "Sequência Dilaceradora",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Ambidestria, 11° nível de caçador",
        pathReq: "all",
        desc: "Ao acertar ambos ataques de Ambidestria: gaste 1 PM para causar +2d8 dano no segundo ataque."
    },
    {
        name: "Sequência do Predador",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Ambidestria (tipos de dano diferentes), 8° nível de caçador",
        pathReq: "all",
        desc: "Ao acertar ambos ataques de Ambidestria com tipos de dano diferentes: gaste 1 PM para fazer manobra (desarmar/derrubar/quebrar) no alvo."
    },
    {
        name: "Sombra dos Ermos",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Camuflagem",
        pathReq: "all",
        desc: "Ação movimento e 1 PM. Recebe camuflagem leve (sustentada)."
    },
    {
        name: "Tiro de Abate",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Sab 1, Espreitar",
        pathReq: "all",
        desc: "Ao Mirar: +2 ataque e margem de ameaça (distância). Dados extras da Marca da Presa multiplicam em crítico."
    },
    {
        name: "Tiro Trespassante",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Arqueiro",
        pathReq: "all",
        desc: "Se ataque à distância reduzir PV a 0: gaste 1 PM para atacar criatura atrás na mesma linha (mesma arma/munição)."
    },
    {
        name: "Tempestade de Lâminas",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Chuva de Lâminas, 17º nível de caçador",
        pathReq: "all",
        desc: "Ao usar Chuva de Lâminas, faz ataque adicional com arma secundária (Total 4 ataques)."
    },
    {
        name: "Tocaia Habilidosa",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "Caçador",
        pathReq: "all",
        desc: "Marca da Presa fornece +1 na CD de habilidades contra a presa por PM gasto. Dobra com Inimigo."
    },
    {
        name: "Último Sangue",
        type: "class",
        class: "cacador",
        subType: "power",
        req: "5º nível de caçador",
        pathReq: "all",
        desc: "Ataques contra criaturas sangrando causam um dado extra de dano do mesmo tipo."
    },
    // ========================================================================
    // CAVALEIRO: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Armas da Cavalaria",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "5º nível de cavaleiro",
        pathReq: "all",
        desc: "Recebe +2 ataque/dano com espadas longas/bastardas, escudos, lanças montadas/justa, maças e alabardas."
    },
    {
        name: "Cavaleiro das Paixões",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Um poder de Paixão",
        pathReq: "all",
        desc: "Recebe +5 em testes de atributo para usar suas Paixões."
    },
    {
        name: "Cavaleiro Bandido",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Código de Honra, Duelo",
        pathReq: "all",
        desc: "Perde Código de Honra e Duelo. Recebe Ataque Furtivo como ladino do seu nível."
    },
    {
        name: "Cavaleiro Sagrado",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Treinado em Religião, Devoto",
        pathReq: "all",
        desc: "Recebe um poder de Paladino (usa nível de cavaleiro como de paladino)."
    },
    {
        name: "Duelista Escudado",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Enquanto Duelo ativo e empunhando escudo: recebe RD igual ao bônus do Duelo."
    },
    {
        name: "Duelo Irrecusável",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Alvo do Duelo sofre penalidade em ataque/dano contra seus aliados igual ao bônus do Duelo."
    },
    {
        name: "Grão-Mestre",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "17º nível de cavaleiro",
        pathReq: "all",
        desc: "+5 Diplomacia e Nobreza. Causa +2 dados de dano em investidas ou contra alvo do Duelo."
    },
    {
        name: "Honra Compartilhada",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Armadura da Honra",
        pathReq: "all",
        desc: "Pode fornecer o benefício de Armadura da Honra a todos aliados em alcance curto."
    },
    {
        name: "Inércia do Aço",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "5º nível de cavaleiro",
        pathReq: "all",
        desc: "Ao acertar com arma de duas mãos: gaste 3 PM para causar metade do dano a cada inimigo adjacente ao alvo."
    },
    {
        name: "Investida Convicta",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Ao investir, gaste 1 PM para somar Carisma no ataque e dano."
    },
    {
        name: "Investida Defensiva",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Investida não causa penalidade na Defesa e não gera ataques de oportunidade."
    },
    {
        name: "Mestre das Posturas",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Dois poderes de postura, 11º nível",
        pathReq: "all",
        desc: "Custo de posturas reduz -1 PM. Pode manter duas posturas ao mesmo tempo."
    },
    {
        name: "Paixão: Amor",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Evocar (Livre, Teste Carisma CD 10+5/uso): Recupera 2d4 PM por ponto de bônus máximo de Duelo. (Falha impede uso na aventura. Sucesso crítico/vitória significativa dá +1 permanente no teste; Falha crítica/significativa -1)."
    },
    {
        name: "Paixão: Honra",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Evocar (Livre, Teste Carisma CD 10+5/uso): Recupera 2d12 PV por ponto de bônus máximo de Duelo. (Regras de falha/sucesso iguais a outras paixões)."
    },
    {
        name: "Paixão: Hospitalidade",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Evocar (Livre, Teste Carisma CD 10+5/uso): Aura 6m (cena). Aliados ganham bônus na Defesa/Resistência igual ao bônus máximo de Duelo."
    },
    {
        name: "Paixão: Lealdade",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Evocar (Livre, Teste Carisma CD 10+5/uso): Recebe bônus em ataque/dano igual ao bônus máximo de Duelo (cena)."
    },
    {
        name: "Postura de Combate: Armamento Pesado",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Arma de duas mãos",
        pathReq: "all",
        desc: "+2 Fortitude e dano. Gaste PM extra na ativação para +1 bônus (máx +5). Ao acertar, pode empurrar 1,5m. Precisa atacar todo turno."
    },
    {
        name: "Postura de Combate: Quebra-Magia",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Resistência a Magia +2 (aumenta com PM extra). 1 vez/rodada, se criatura no alcance usar magia: gaste 1 PM para atacá-la."
    },
    {
        name: "Postura de Combate: Sequência Blindada",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Armadura Pesada",
        pathReq: "all",
        desc: "Ao fazer ação agredir, pode fazer um ataque desarmado extra."
    },
    {
        name: "Presença de Muralha",
        type: "class",
        class: "cavaleiro",
        subType: "power",
        req: "Cavaleiro",
        pathReq: "all",
        desc: "Gaste 1 PM (sustentada). Aura 9m. Inimigo que inicia turno testa Vontade (CD Car). Falha: deslocamento reduzido à metade. (Medo)."
    },
    // ========================================================================
    // CLÉRIGO: PODERES (DEUSES E HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Acólito Escudeiro",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Autoridade Eclesiástica",
        pathReq: "all",
        desc: "Recebe parceiro Acólito Escudeiro (não conta limite). +2 Religião. Escolha uma magia de 1º círculo: custo -1 PM. Pode gastar 1 PM para usar esotérico/catalisador do inventário sem empunhar."
    },
    {
        name: "Arma Divina",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Abençoar Arma, 7º nível de clérigo",
        pathReq: "all",
        desc: "Ao usar Abençoar Arma, ela ganha encanto Sagrado (se energia positiva) ou Profano (se negativa)."
    },
    {
        name: "Bênção de Batalha",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Bênção",
        pathReq: "all",
        desc: "Magia Bênção afeta você também. Na 1ª rodada, pode lançá-la como ação de movimento."
    },
    {
        name: "Canalizar Abençoado",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Canalizar Energia Positiva, 11° nível de clérigo",
        pathReq: "all",
        desc: "Ao usar Canalizar Energia Positiva, gaste +1 PM para conceder 10 PV temporários aos afetados."
    },
    {
        name: "Canalizar Concentrado",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Canalizar Energia, 11° nível de clérigo",
        pathReq: "all",
        desc: "Ao Canalizar, pode afetar apenas uma criatura. Cura/Dano aumenta +1 por dado e CD aumenta +2."
    },
    {
        name: "Canalizar Profanado",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Canalizar Energia Negativa, 11° nível de clérigo",
        pathReq: "all",
        desc: "Ao usar Canalizar Energia Negativa, gaste +1 PM. Falha na resistência impede recuperação de PV por 1 rodada."
    },
    {
        name: "Canalizar Poderoso",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Canalizar Amplo, 9° nível de clérigo",
        pathReq: "all",
        desc: "Os dados de seu Canalizar Energia mudam para d10."
    },
    {
        name: "Conversão de Fé",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Autoridade Eclesiástica",
        pathReq: "all",
        desc: "1 vez/cena: Ação completa e 3 PM. Teste Religião vs Vontade de lacaio (curto). Sucesso: torna-se parceiro iniciante (tipo a escolha) pela cena."
    },
    {
        name: "Dizimar Infiéis",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Abençoar Arma, 5º nível de clérigo",
        pathReq: "all",
        desc: "Se usar arma abençoada: Padrão e 2 PM. Ataque corpo a corpo contra TODOS em alcance curto. Acerto causa dano + Ofuscado (Positiva) ou Vulnerável (Negativa) por 1 rodada."
    },
    {
        name: "Égide da Fé",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Escudo da Fé",
        pathReq: "all",
        desc: "Magia Escudo da Fé fornece 5 PV temporários para cada +1 na Defesa conferido (duram pela cena)."
    },
    {
        name: "Força da Devoção",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "6º nível de clérigo",
        pathReq: "all",
        desc: "CD de magias aumenta +1 para cada dois poderes concedidos que possuir."
    },
    {
        name: "Liturgia Marcial",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Ação movimento. Recebe +2 ataque e dano no próximo ataque corpo a corpo neste turno."
    },
    {
        name: "Missa: Compartilhar Milagre",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "17° nível de clérigo",
        pathReq: "all",
        desc: "Participantes podem usar um de seus poderes concedidos por 1 rodada durante o dia."
    },
    {
        name: "Missa: Imposição da Vontade",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "A CD para resistir às habilidades dos participantes aumenta em +1."
    },
    {
        name: "Missa: Mente Abençoada",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Clérigo",
        pathReq: "all",
        desc: "Participantes recebem +2 em testes de perícias baseadas em Sabedoria."
    },
    {
        name: "Presente dos Deuses",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "9º nível de clérigo",
        pathReq: "all",
        desc: "Recebe arma superior mágica (2 melhorias, 1 encanto). Melhora a cada 4 níveis (+1 melhoria/+1 encanto)."
    },
    {
        name: "Punição Divina",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Prece de Combate",
        pathReq: "all",
        desc: "1 vez/rodada, ao lançar magia divina (movimento) em si mesmo: gaste +2 PM para fazer ataque como ação livre."
    },
    {
        name: "Representante Divino",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "17º nível de clérigo",
        pathReq: "all",
        desc: "Pode lançar magia divina (padrão/completa) como ação de movimento (apenas verbal)."
    },
    {
        name: "Solo Profanado",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Profanar",
        pathReq: "all",
        desc: "Se lançar magia de dano trevas em área de Profanar: falha na resistência impede cura por rodadas iguais ao círculo."
    },
    {
        name: "Solo Sagrado",
        type: "class",
        class: "clerigo",
        subType: "power",
        req: "Consagrar",
        pathReq: "all",
        desc: "Se lançar magia de luz em área de Consagrar: alvos ganham RD igual ao dobro do círculo contra próximo dano."
    },

    // ========================================================================
    // DRUIDA: PODERES (DEUSES E HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Arma Tradicional",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Arton, 5º nível",
        pathReq: "all",
        desc: "Ao atacar com foice, gaste 2 PM para lançar magia (ácido/elet/fogo/frio) como ação livre."
    },
    {
        name: "Auspício do Crepúsculo",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Tenebra",
        pathReq: "all",
        desc: "Gaste 1 PM. Arma causa +1d6 trevas (cena). Se estiver sob escuridão, ganha 5 PV temporários por acerto."
    },
    {
        name: "Auspício da Madrugada",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Tenebra",
        pathReq: "all",
        desc: "Gaste 1 PM. Inimigos escolhidos (curto) sofrem -1 em perícias e CD (1 rodada). Sob escuridão, penalidade vira -2."
    },
    {
        name: "Auspício da Meia-Noite",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Tenebra",
        pathReq: "all",
        desc: "Ação movimento e 2 PM. Aumenta CD de magias druida em +1 (cena). Sob escuridão, bônus vira +2."
    },
    {
        name: "Banquete Selvagem",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Megalokk, Forma Selvagem",
        pathReq: "all",
        desc: "Em forma selvagem, devore pedaço de inconsciente (0 PV). Recebe +2 Força, +5 Intimidação e PV temp = 2x nível. Mata lacaios."
    },
    {
        name: "Ciclo da Vida",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "1 vez/cena, ação padrão. Decompõe cadáver (curto). Recebe +2 PM por ND da criatura (duram o dia)."
    },
    {
        name: "Companheiro Aberrante",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Aharadak, Companheiro Animal, 6º nível",
        pathReq: "all",
        desc: "Companheiro ganha tipo Aberrante. Permite disparar pulso mental (dano psíquico ou perda de PM) gastando PM."
    },
    {
        name: "Companheiro Elemental",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Arton, Companheiro Animal",
        pathReq: "all",
        desc: "Companheiro ganha tipo Destruidor (ou parceiro elemental se tiver Ameaças de Arton)."
    },
    {
        name: "Erupção Elemental",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Elemental",
        pathReq: "all",
        desc: "Em forma elemental: movimento e 2 PM. Próximo ataque afeta cone 6m (dano em área) e causa +2 dados de dano."
    },
    {
        name: "Força da Natureza (Poder)",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Selvagem Superior, 17º nível",
        pathReq: "all",
        desc: "Em forma selvagem: gaste 4 PM para se cobrir de terra/raízes. +4 em um atributo (cena)."
    },
    {
        name: "Forma Aberrante",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Aharadak, Forma Selvagem",
        pathReq: "all",
        desc: "Ao usar Forma Selvagem, gaste +2 PM: Forma Aberrante. Conta como ter +2 poderes da Tormenta."
    },
    {
        name: "Forma de Cardume",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Oceano, Forma Selvagem",
        pathReq: "all",
        desc: "Ao usar Forma Selvagem, gaste +1 PM: Forma Cardume. Imune manobras, sofre metade dano armas, entra em espaço inimigo (deixa em condição ruim)."
    },
    {
        name: "Forma Elemental",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Arton, Forma Selvagem",
        pathReq: "all",
        desc: "Ao usar Forma Selvagem, gaste +2 PM: Forma Elemental (ácido/elet/fogo/frio). Imune ao elemento, vulnerável oposto. Alcance +1,5m e dano muda para tipo."
    },
    {
        name: "Forma Esquelética",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Tenebra, Forma Selvagem",
        pathReq: "all",
        desc: "Ao usar Forma Selvagem, gaste +2 PM: Morto-vivo. RD 5 (corte/frio/perf), imune cansaço/metabolismo. Sofre dano por Luz, cura com Trevas."
    },
    {
        name: "Forma Vegetal",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida de Allihanna, Forma Selvagem",
        pathReq: "all",
        desc: "Ao usar Forma Selvagem, gaste +2 PM: Planta. RD 5/corte ou fogo. Imune atordoamento/metamorfose."
    },
    {
        name: "Instinto Venenoso",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Coração da Selva",
        pathReq: "all",
        desc: "Usa Sabedoria para venenos. Em Forma Selvagem, aplica veneno contato como ação livre nas armas naturais."
    },
    {
        name: "Metamorfose Instantânea",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Selvagem, 11º nível",
        pathReq: "all",
        desc: "1 vez/rodada, gaste +2 PM para usar Forma Selvagem como ação livre."
    },
    {
        name: "Oráculo da Natureza",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Xamã Místico, 11º nível",
        pathReq: "all",
        desc: "Ação movimento. Enquanto imóvel: CD +2 e recebe 2 PM para aprimoramentos ao lançar magia. (Urbano exige ação completa)."
    },
    {
        name: "Orador dos Elementos",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Druida",
        pathReq: "all",
        desc: "Aprende 1 magia de dano elemental. Pode aprender magias arcanas elementais como divinas."
    },
    {
        name: "Proteção Fúngica",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Coração da Selva",
        pathReq: "all",
        desc: "Gaste 1 PM (sustentada). Atacante corpo a corpo perde 1d8 PV (veneno). Aumenta dano com mais PM."
    },
    {
        name: "Transformação Repugnante",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Forma Aberrante",
        pathReq: "all",
        desc: "Ao usar Forma Selvagem, gaste +2 PM: Inimigos (curto) sofrem dano psíquico por poder da Tormenta e ficam Alquebrados/Frustrados."
    },
    {
        name: "Xamã Místico",
        type: "class",
        class: "druida",
        subType: "power",
        req: "Não possuir Forma Selvagem",
        pathReq: "all",
        desc: "Recebe +1 PM por nível, aprende magias de uma escola adicional e CD +1. (Incompatível com Forma Selvagem)."
    },

    // ========================================================================
    // GUERREIRO: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Análise Tática",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Treinado em Guerra",
        pathReq: "all",
        desc: "Recebe +2 em Guerra. Pode usar Guerra para identificar criaturas humanoides (como Misticismo)."
    },
    {
        name: "Arremesso de Investida",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Ao fazer investida, gaste 1 PM para realizar ataque adicional à distância (arremesso) contra o alvo."
    },
    {
        name: "Bloqueio Brutal",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "For 5",
        pathReq: "all",
        desc: "1 vez/rodada, ao ser atingido: gaste 2 PM, role seu dano corpo a corpo e subtraia do dano sofrido."
    },
    {
        name: "Corte Ágil",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Des 1",
        pathReq: "all",
        desc: "1 vez/rodada, ao atacar com arma ágil/leve: gaste 1 PM para mover metade do deslocamento (antes ou depois). Não gera ataque de oportunidade."
    },
    {
        name: "Criar Oportunidade",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Xadrez de Batalha",
        pathReq: "all",
        desc: "Se você ou aliado (curto) atacar alvo do Xadrez: gaste 1 PM para ataque causar +1d10 dano."
    },
    {
        name: "Defesa Estratégica",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Int 1",
        pathReq: "all",
        desc: "Soma Inteligência na Defesa (limitado pelo nível)."
    },
    {
        name: "Determinação Inabalável",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "11º nível de guerreiro",
        pathReq: "all",
        desc: "Com metade dos PV ou menos: +2 resistência e custo de Durão diminui -1 PM."
    },
    {
        name: "Estrategista Inspirador",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Treinado em Guerra",
        pathReq: "all",
        desc: "1º turno: Ação padrão e teste Guerra. Para cada 10 pontos no resultado, você e aliados (curto) ganham 1 PM temporário (cena)."
    },
    {
        name: "Executor",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Recebe +1d6 dano contra criaturas com menos da metade dos PV. Aumenta um passo a cada 4 níveis."
    },
    {
        name: "Fender Defesas",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Ao acertar com Ataque Especial: criatura sofre penalidade na Defesa igual ao PM gasto (1 rodada)."
    },
    {
        name: "Inércia do Aço",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "5º nível de guerreiro",
        pathReq: "all",
        desc: "Ao acertar com arma duas mãos: gaste 3 PM para causar metade do dano em cada inimigo adjacente ao alvo."
    },
    {
        name: "Investida Ricochete",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Bater e Correr, 5º nível de guerreiro",
        pathReq: "all",
        desc: "1 vez/rodada, ao acertar investida: gaste 2 PM para atacar outra criatura no alcance como parte da investida."
    },
    {
        name: "Manobra Dupla",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "1 vez/rodada, ao fazer manobra com arma versátil: gaste 1 PM para fazer manobra extra diferente."
    },
    {
        name: "Mente Disciplinada",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "6º nível de guerreiro",
        pathReq: "all",
        desc: "Bônus numéricos recebidos de aliados (perícia, dano, defesa) aumentam em +1 para você."
    },
    {
        name: "Operações Combinadas",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Ordens de Engajamento, 14º nível de guerreiro",
        pathReq: "all",
        desc: "Ao usar Ordens: gaste +3 PM para atacar junto. Bônus aplicados a um ataque também afetam o outro."
    },
    {
        name: "Ordens de Engajamento",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Criar Oportunidade, Xadrez de Batalha, 11º nível",
        pathReq: "all",
        desc: "1 vez/rodada, ao acertar alvo do Xadrez: gaste 2 PM para permitir aliado (curto) atacar o alvo."
    },
    {
        name: "Recuperar Fôlego",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "1 vez/cena, se estiver com 0 PM: Ação movimento para recuperar 1d8 PM."
    },
    {
        name: "Resiliência Marcial",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "4º nível de guerreiro",
        pathReq: "all",
        desc: "Ao sofrer dano letal, recebe RD 1 cumulativa (máx = nível). Dura até fim da cena ou ser curado."
    },
    {
        name: "Soldado de Infantaria",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Guerreiro",
        pathReq: "all",
        desc: "Deslocamento +3m e limite de carga +6 espaços."
    },
    {
        name: "Velho de Guerra",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "17º nível de guerreiro",
        pathReq: "all",
        desc: "+5 Intimidação e Imune a Medo. 1 vez/cena, gaste 5 PM para evitar completamente um efeito (ataque/magia) contra você."
    },
    {
        name: "Xadrez de Batalha",
        type: "class",
        class: "guerreiro",
        subType: "power",
        req: "Treinado em Guerra",
        pathReq: "all",
        desc: "Ação movimento e 1 PM. Analisa oponente (curto): +2 Defesa/Reflexos contra ele (cena). Bônus aumenta +1 por poder que tenha este como pré-requisito."
    },

    // ========================================================================
    // INVENTOR: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Alquimista Exímio",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Ao usar preparado alquímico/poção: CD aumenta +2. Se causar dano, cura ou recuperação de PM, efeito aumenta +1 por dado."
    },
    {
        name: "Alterar Programação",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (artesão)",
        pathReq: "all",
        desc: "Ação completa e 3 PM. Teste Ofício vs Vontade de construto não inteligente adjacente. Sucesso: confuso e vulnerável 1 rodada. Se for lacaio, você controla até fim da aventura."
    },
    {
        name: "Aparato Personalizado",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro",
        pathReq: "all",
        desc: "O primeiro aparato (aprimoramento) de cada uma de suas engenhocas não aumenta a CD para ativá-la."
    },
    {
        name: "Armadura Avançada",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Armadura Mecanizada, 7º nível de inventor",
        pathReq: "all",
        desc: "Ao ativar engenhoca acoplada: recebe bônus no teste igual a melhorias da armadura. Pode gastar 4 PM para ativar como ação livre."
    },
    {
        name: "Armadura Mecanizada",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro",
        pathReq: "all",
        desc: "Pode acoplar engenhocas na armadura (T$ 100, 1 dia). Leve aceita 1, Pesada até 3. Não contam no limite de itens e não precisam ser empunhadas."
    },
    {
        name: "Artesão Criativo",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (artesão)",
        pathReq: "all",
        desc: "Pode usar Ofício (artesão) no lugar de qualquer outro Ofício para qualquer fim (incluindo pré-requisitos)."
    },
    {
        name: "Autômato Alquímico",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Autômato",
        pathReq: "all",
        desc: "Autômato pode armazenar itens alquímicos (capacidade = Int). 1 vez/rodada, você pode gastar 1 PM para usar um item dele como ação livre."
    },
    {
        name: "Autômato Engenhocado",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Autômato Prototipado",
        pathReq: "all",
        desc: "Acopla engenhoca de 1º círculo no autômato. 1 vez/rodada, se ele estiver perto, gaste +2 PM para ativar a engenhoca como ação de movimento (origem nele)."
    },
    {
        name: "Catalisador Experimental",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro, 5º nível de inventor",
        pathReq: "all",
        desc: "Ao ativar uma engenhoca, você pode usar um catalisador e aplicar seus efeitos a ela."
    },
    {
        name: "Estilista",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Car 1, treinado em Ofício (alfaiate)",
        pathReq: "all",
        desc: "Se vestir item feito por você: bônus de perícia aumenta em +1 e se aplica também a Diplomacia e Enganação."
    },
    {
        name: "Explicação Científica",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "5º nível de inventor",
        pathReq: "all",
        desc: "Ação movimento. Gaste PM (limite Int) para receber Resistência a Magia igual aos PM gastos até fim da cena."
    },
    {
        name: "Explorar Fraqueza",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Encontrar Fraqueza",
        pathReq: "inventor-base", // ALQUIMISTA NÃO TEM O REQUISITO
        desc: "Quando usa Encontrar Fraqueza em inimigo, ignora também 5 pontos de RD dele."
    },
    {
        name: "Farmácia Mágica",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado, Farmacêutico",
        pathReq: "all",
        desc: "Você pode usar o poder Farmacêutico em poções de cura (além de itens alquímicos)."
    },
    {
        name: "Forçar a Calibragem",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Engenhoqueiro",
        pathReq: "all",
        desc: "Ao testar para ativar engenhoca, pode aceitar penalidade -5 no teste para aumentar a CD da engenhoca em +2."
    },
    {
        name: "Galvanização",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Ofício (artesão)",
        pathReq: "all",
        desc: "Ação padrão. Adiciona material especial a um item pela cena (paga 5% do preço, sem teste, não conta no limite)."
    },
    {
        name: "Gênio Inovador",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "17º nível de inventor",
        pathReq: "inventor-base", // ALQUIMISTA NÃO FABRICA ITENS SUPERIORES
        desc: "Usa Int em duas perícias a escolha. Ao fabricar item superior, adiciona uma melhoria extra gratuita (acima do limite). Pode ter dois materiais especiais."
    },
    {
        name: "Golpe de Gênio",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "11º nível de inventor",
        pathReq: "all",
        desc: "1 vez/aventura: Pode usar Engenhosidade duas vezes no mesmo teste OU fabricar item superior/mágico em 1 semana."
    },
    {
        name: "Infusão Distante",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Alquimista Iniciado",
        pathReq: "all",
        desc: "Ao usar item alquímico/poção de toque, gaste 1 PM para alcance curto (ou médio se tiver Granadeiro)."
    },
    {
        name: "Oficina Esotérica",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Treinado em Misticismo, Oficina de Campo",
        pathReq: "all",
        desc: "Pode usar Oficina de Campo em esotéricos (+1 limite PM), poções (rende 2 doses) e pergaminhos (+1 PM aprimoramento)."
    },
    {
        name: "Saraivada Alquímica",
        type: "class",
        class: "inventor",
        subType: "power",
        req: "Granadeiro, 7º nível de inventor",
        pathReq: "all",
        desc: "Ao usar item de dano, gaste 2 PM e uma dose extra para aumentar dano em 50%."
    },
    // ========================================================================
    // LADINO: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Ameaça Brutal",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Ao assustar (Intimidação) criatura que sofreu dano seu na rodada: recebe +5 no teste. Se passar por 5 ou mais, ela fica Apavorada."
    },
    {
        name: "Assassino em Série",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "11º nível de ladino",
        pathReq: "all",
        desc: "Pode gastar 2 PM para usar Ataque Furtivo uma segunda vez na mesma rodada."
    },
    {
        name: "Ataque Furtivo Letal",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "5º nível de ladino",
        pathReq: "all",
        desc: "Ao rolar dano furtivo, se cair o valor máximo ou um abaixo (ex: 5 ou 6 em d6), role um dado extra."
    },
    {
        name: "Bombardeiro Furtivo",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Ofício (alquimista)",
        pathReq: "all",
        desc: "Você pode aplicar o dano de Ataque Furtivo ao utilizar preparados alquímicos de dano."
    },
    {
        name: "Chefe de Gangue",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "5º nível de ladino",
        pathReq: "all",
        desc: "Seus capangas ganham Ataque Furtivo +1d6 e Evasão. Eles usam seu valor de Reflexos."
    },
    {
        name: "Conhecimento Anatômico",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Cura",
        pathReq: "all",
        desc: "Contra humanoides, os dados do seu Ataque Furtivo aumentam em um passo."
    },
    {
        name: "Enganar os Olhos",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Ao usar Acrobacia para passar por inimigo: ele te considera invisível por 1 rodada (Reflexos CD Des evita)."
    },
    {
        name: "Finta Acrobática",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Acrobacia e Enganação",
        pathReq: "all",
        desc: "Você soma sua Destreza em testes de Enganação para fintar."
    },
    {
        name: "Improvisação Arcana",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Misticismo",
        pathReq: "all",
        desc: "Ao lançar pergaminho desconhecido (Misticismo): para cada 2 pontos acima da CD, pode gastar 1 PM em aprimoramentos."
    },
    {
        name: "Investida Rasteira",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Se acertar corpo a corpo em criatura que sofreu investida na rodada: ela fica Desprevenida (1 rodada) e caída (Reflexos CD Des evita)."
    },
    {
        name: "Mestre Assassino",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Assassinar, Furtivo Letal, 11º nível",
        pathReq: "all",
        desc: "Ao usar Assassinar, gaste +2 PM por opção:<br>• Usar como ação livre.<br>• Rolar 2 dados de ataque (usa melhor).<br>• Ignorar imunidade a crítico."
    },
    {
        name: "Mestre Envenenador",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Veneno Persistente, 11º nível",
        pathReq: "all",
        desc: "Ao envenenar, gaste +2 PM por opção:<br>• Aumentar efeito em 1 dado.<br>• Aumentar CD em +5.<br>• Ignorar imunidade a veneno."
    },
    {
        name: "Papo Furado",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Diplomacia e Enganação",
        pathReq: "all",
        desc: "Se passar em Diplomacia e depois Enganação contra criatura (até próximo turno): atitude melhora uma categoria."
    },
    {
        name: "Precisão Furtiva",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Pontaria, Ataque Furtivo",
        pathReq: "all",
        desc: "Alcance do Furtivo aumenta uma categoria. +2 margem de ameaça contra desprevenido ou flanqueado."
    },
    {
        name: "Rei do Crime",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Chefe de Gangue, Contatos, 17º nível",
        pathReq: "all",
        desc: "1 vez/cena: Gaste 6 PM para invocar 2d4+2 assassinos capangas (Furtivo +4d6). Pode sacrificar capanga adjacente para ignorar um efeito contra você."
    },
    {
        name: "Sabotagem Corrosiva",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Ladino",
        pathReq: "all",
        desc: "Gaste um ácido para +5 em Ladinagem (abrir/sabotar). Ou Ação Movimento + Ácido: Teste Ladinagem vs Reflexos (curto). Sucesso: Desprevenido e -5 ataque (1 rodada)."
    },
    {
        name: "Senhor do Submundo",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Intimidação, 17º nível",
        pathReq: "all",
        desc: "+5 Intimidação, Imune a medo. Ao ficar adjacente a criatura (1 vez/cena por alvo): ela fica Apavorada e Desprevenida por 1 rodada."
    },
    {
        name: "Truque de Palco",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Atuação",
        pathReq: "all",
        desc: "Aprende 3 magias arcanas de 1º círculo (Inteligência) apenas com aprimoramento 'Truque'. Habilidade não mágica."
    },
    {
        name: "Truque do Chapéu",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Enganação",
        pathReq: "all",
        desc: "1 vez/rodada, ação movimento: tira e arremessa item vestido em alvo curto. Pode fazer ataque de arremesso (arma ou poção) como parte da ação."
    },
    {
        name: "Vestido Para a Ocasião",
        type: "class",
        class: "ladino",
        subType: "power",
        req: "Treinado em Enganação",
        pathReq: "all",
        desc: "Se usar traje corte/viajante: Ação completa e 1 PM para transformar em outro traje mundano (cena). +5 Enganação para disfarce."
    },
    // ========================================================================
    // LUTADOR: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Aquecimento",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "1º turno: Ação completa. Soma Constituição nos ataques desarmados (limite nível) e recebe PV temporários (Con + Nível) pela cena."
    },
    {
        name: "Caminhar pelas Paredes",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Treinado em Atletismo",
        pathReq: "all",
        desc: "Recebe +10 em Atletismo (saltar) e pode se deslocar por paredes e tetos (cai se terminar movimento na parede)."
    },
    {
        name: "Caminho Suave",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Sab 1",
        pathReq: "all",
        desc: "Ao fazer manobra com ataque desarmado, gaste PM (limite Sab) para receber +2 no teste por PM."
    },
    {
        name: "Combinação: Boca do Estômago",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> 1 PM. Se acertar: alvo fica Enjoado e você soma a Contagem de Combos no dano."
    },
    {
        name: "Combinação: Chute Circular",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Outro poder de Combinação",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> 2 PM. Se acertar: Causa +1d6 dano por ponto na Contagem de Combos e faz manobra Empurrar (livre, usa ataque como teste)."
    },
    {
        name: "Combinação: Chute no Joelho",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> 1 PM. Se acertar: alvo fica Lento e sofre penalidade em ataque/dano igual à Contagem de Combos."
    },
    {
        name: "Combinação: Esquiva Técnica",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Um poder de Combinação",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> Reação (ao sofrer ataque), 2 PM. Teste Reflexos vs Percepção (bônus = Contagem). Sucesso: evita ataque e ganha +5 no próximo ataque contra ele."
    },
    {
        name: "Combinação: Quebra-Guarda",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> 1 PM. Recebe bônus de ataque igual à Contagem. Se acertar: alvo fica Vulnerável e não pode usar RD/redução de dano."
    },
    {
        name: "Combinação: Técnica de Sacrifício",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> 1 PM. Faz manobra Agarrar (bônus = Contagem). Sucesso: Ambos caídos e agarrados, alvo sofre seu dano desarmado."
    },
    {
        name: "Combinação: Um-Dois",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Jogo de Pernas",
        pathReq: "all",
        desc: "<strong>(Combo):</strong> 1 PM. Flanqueia sozinho. Se acertar: recebe bônus na Defesa igual à Contagem."
    },
    {
        name: "Corpo Fechado",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao fazer teste de resistência, gaste 1 PM para somar Constituição."
    },
    {
        name: "Dança Marcial",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Treinado em Acrobacia e Atuação",
        pathReq: "all",
        desc: "Ação movimento e 2 PM. +2 Defesa, Acrobacia e Enganação (Fintar). Bônus aumenta +1 nos níveis 6, 11 e 16. (Cena)."
    },
    {
        name: "Gingado Elusivo",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Dança Marcial, 7º nível de lutador",
        pathReq: "all",
        desc: "Sob Dança Marcial: 1 vez/rodada, ao sofrer efeito hostil, gaste 2 PM para +5 Defesa/Reflexos e saltar para espaço adjacente."
    },
    {
        name: "Invencível",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Nome na Arena, 17º nível de lutador",
        pathReq: "all",
        desc: "Gaste 2 PM para usar Força em perícias de Carisma. Se cair a 0 PV, gaste 5 PM para recuperar metade dos PV máximos."
    },
    {
        name: "Jogo de Pernas",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Des 1",
        pathReq: "all",
        desc: "1 vez/rodada, ao atacar corpo a corpo: move 1,5m (antes ou depois). Não gera reações/ataque oportunidade."
    },
    {
        name: "Mestre das Combinações",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Dois poderes de Combinação",
        pathReq: "all",
        desc: "Sua contagem de combinações aumenta em +2 (em vez de +1) para cada ataque de Combinação diferente que acertar."
    },
    {
        name: "Rilhar os Dentes",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao sofrer dano corpo a corpo, gaste 1 PM para receber RD = 5 + Constituição contra esse dano."
    },
    {
        name: "Rolamento Escapatório",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Treinado em Acrobacia",
        pathReq: "all",
        desc: "Ao falhar em teste para evitar condição de movimento (ex: agarrar), gaste 2 PM para rolar novamente usando Acrobacia."
    },
    {
        name: "Ruas Furiosas",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Quando quebra objeto empunhado por inimigo, recebe PV temporários = 1d6 x Constituição."
    },
    {
        name: "Sequência Defensiva",
        type: "class",
        class: "lutador",
        subType: "power",
        req: "Lutador",
        pathReq: "all",
        desc: "Ao acertar ataque desarmado, recebe +2 cumulativo na Defesa contra aquele alvo até próximo turno."
    },
    // ========================================================================
    // NOBRE: PODERES (DEUSES E HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Agente de Elite",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Título, 11º nível de nobre",
        pathReq: "all",
        desc: "Recebe parceiro veterano especial (escolhe benefício de parceiro ou poder de outra classe). Pode trocar no início da aventura."
    },
    {
        name: "Comandante de Campo",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Seus capangas recebem +2 dano e bônus na Defesa = seu Carisma. Ao receber capangas, ganha um adicional do mesmo tipo."
    },
    {
        name: "Comitiva",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Limite de parceiros aumenta em +1. No nível 11, aumenta mais +1."
    },
    {
        name: "Discurso de Batalha",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "1º turno do combate: Ação completa e teste Diplomacia/Intimidação. Para cada 10 no resultado, você e aliados (curto) ganham 2 PM temporários (cena)."
    },
    {
        name: "Fofocas da Corte",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Treinado em Intuição e Investigação",
        pathReq: "all",
        desc: "Em ambiente social: gaste 1 hora para ganhar 4d6 dados de auxílio. Pode gastar dado para somar em testes de Carisma no local."
    },
    {
        name: "Guarda Pessoal",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Recebe Pelotão de Infantaria veterano (parceiro guarda-costas). Nível 11: vira Mestre."
    },
    {
        name: "Hedonismo Aristocrático",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "1 vez/dia, gaste 1h e T$:<br>• T$ 100: +4 PM temp por patamar.<br>• T$ 500: +5 PM temp por patamar.<br>• T$ 2.000: +6 PM temp por patamar.<br>(Duram o dia todo)."
    },
    {
        name: "Instigar Violência",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Treinado em Guerra, 11º nível de nobre",
        pathReq: "all",
        desc: "Se aliado (curto) critar: gaste 3 PM para ele fazer ataque extra no mesmo inimigo. (1 vez/rodada por aliado)."
    },
    {
        name: "Insuflar Investida",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Estrategista",
        pathReq: "all",
        desc: "Ao investir: gaste 1 PM por aliado (curto). A próxima investida deles causa +2d8 dano."
    },
    {
        name: "Legado Mágico",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "11º nível de nobre",
        pathReq: "all",
        desc: "Recebe item mágico menor (troca por aventura). Nível 14: Médio. Nível 17: Maior."
    },
    {
        name: "Líder Enérgico",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Treinado em Iniciativa",
        pathReq: "all",
        desc: "Soma Carisma na Iniciativa. Se for primeiro, no 1º turno pode usar habilidade de nobre (padrão/movimento) como livre."
    },
    {
        name: "Líder Impiedoso",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Se aliado sob Gritar Ordens critar ou zerar inimigo: você recupera 1 PM."
    },
    {
        name: "Linhagem Distinta",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "17º nível de nobre",
        pathReq: "all",
        desc: "Orgulho custa -1 PM. 1 vez/cena: gaste +5 PM no Orgulho para dobrar bônus e rolar 2 dados (usa melhor)."
    },
    {
        name: "Ordens Agressivas",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Gritar Ordens também soma o bônus na primeira rolagem de dano dos aliados."
    },
    {
        name: "Ordens Encorajadoras",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Gritar Ordens fornece 10 PV temporários cumulativos (cena)."
    },
    {
        name: "Palavras de Efeito",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "nobre-base", // Burguês não tem Palavras Afiadas
        desc: "Soma Carisma no dano de Palavras Afiadas. Ação diminui um passo (Padrão->Movimento)."
    },
    {
        name: "Palavras Ressonantes",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "nobre-base", // Burguês não tem Palavras Afiadas
        desc: "Ao rolar dano de Palavras Afiadas, se sair máximo ou máximo-1 (ex: 5 ou 6 em d6), rola dado extra."
    },
    {
        name: "Protocolo Impecável",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Treinado em Nobreza, Jogo da Corte",
        pathReq: "all",
        desc: "Em ambiente social: Gaste 2 PM e teste Nobreza (CD 20). Sucesso: melhora atitude de todos em uma categoria."
    },
    {
        name: "Senescal",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "5º nível de nobre",
        pathReq: "all",
        desc: "Recebe +1/patamar em testes de base/domínio/negócio. Executa uma ação de estrutura adicional por turno."
    },
    {
        name: "Voz Límpida",
        type: "class",
        class: "nobre",
        subType: "power",
        req: "Nobre",
        pathReq: "all",
        desc: "Habilidades de nobre que afetam aliados custam -1 PM."
    },
    // ========================================================================
    // PALADINO: PODERES (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Arma Juramentada",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Devoto de uma divindade",
        pathReq: "all",
        desc: "Se empunhar arma preferida da divindade: ela se torna mágica e ganha 1 melhoria (sem contar no limite). Efeito cessa se quebrar Obrigações."
    },
    {
        name: "Arma Sacramentada",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Arma Juramentada, 11º nível de paladino",
        pathReq: "all",
        desc: "Sua Arma Juramentada recebe também 1 encanto (sem contar no limite)."
    },
    {
        name: "Aura Vingadora",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "8º nível de paladino",
        pathReq: "all",
        desc: "Enquanto Aura ativa: você e aliados dentro dela causam +1d6 luz em dano corpo a corpo (1 vez/rodada)."
    },
    {
        name: "Bloqueio Divino",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Proficiência com escudos",
        pathReq: "all",
        desc: "Ao sofrer ataque (com escudo): gaste 2 PM para receber +5 Defesa contra esse ataque."
    },
    {
        name: "Convicção Heroica",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "11º nível de paladino",
        pathReq: "all",
        desc: "1 vez/cena, se PV reduzir a 0 ou menos: gaste 5 PM para curar 50 PV."
    },
    {
        name: "Expurgo Sagrado",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Golpe Divino",
        pathReq: "paladino-base", // Santo não tem Golpe Divino
        desc: "Golpe Divino contra Abissal ou Morto-vivo custa -1 PM e causa +1 dado de dano."
    },
    {
        name: "Escudo Fraterno",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Égide Sagrada",
        pathReq: "paladino-base", // Santo não tem Égide
        desc: "Sua Égide Sagrada afeta aliados em até 9m (em vez de apenas adjacentes)."
    },
    {
        name: "Escudo Sagrado",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Bloqueio Divino, 7º nível de paladino",
        pathReq: "all",
        desc: "Movimento e 1 PM (sustentada). Se empunhar escudo, recebe RD igual ao seu Carisma."
    },
    {
        name: "Fulgor Ardente",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Fulgor Divino",
        pathReq: "all",
        desc: "Ao usar Golpe Divino, gaste +1 PM. Se acertar, inimigos a até 6m do alvo sofrem dano de luz igual ao dano extra do golpe."
    },
    {
        name: "Guardião Celestial",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "17º nível de paladino",
        pathReq: "all",
        desc: "Padrão e 10 PM. Convoca espírito (100 pontos luz). Ele absorve seu dano (gastando luz). Pode gastar 2 PM para ele atacar (4d8+Car luz)."
    },
    {
        name: "Investida Sagrada",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Montaria Sagrada, 10º nível de paladino",
        pathReq: "paladino-base", // Santo não tem Montaria
        desc: "Ao investir montado: gaste 1 PM para ganhar voo (no turno) e causar +1d8 dano."
    },
    {
        name: "Julgamento Divino: Desafio",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM para marcar inimigo (curto). Se ele atacar seus aliados, sofre -1 cumulativo no ataque (limite Carisma)."
    },
    {
        name: "Julgamento Divino: Proteção",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Gaste 2 PM para conceder 10 PV temporários e +2 Defesa a uma criatura (curto)."
    },
    {
        name: "Julgamento Divino: Redenção",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Pode lançar Escudo da Fé (aprimoramento de dividir dano) em aliado."
    },
    {
        name: "Julgamento Divino: Retribuição",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Marque inimigo (curto). Quando ele te causar dano, gaste 2 PM para fazer ataque corpo a corpo nele (se no alcance)."
    },
    {
        name: "Luz Purificadora",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Golpe Divino",
        pathReq: "paladino-base", // Santo não tem Golpe Divino
        desc: "Ao usar Golpe Divino, gaste +1 PM: Todo dano vira Luz e ignora 10 de RD."
    },
    {
        name: "Manto de Batalha",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "5º nível de paladino",
        pathReq: "all",
        desc: "Aprende Vestimenta da Fé. Pode usar aprimoramentos como clérigo do seu nível."
    },
    {
        name: "Paladino do Reino",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Treinado em Nobreza",
        pathReq: "all",
        desc: "Recebe um poder de cavaleiro (nível conta como cavaleiro)."
    },
    {
        name: "Rajada Divina",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Luz Purificadora",
        pathReq: "paladino-base", // Santo não tem Golpe Divino
        desc: "Ao usar Golpe Divino com Luz Purificadora: gaste +1 PM para alcance ser Curto (ainda conta como corpo a corpo)."
    },
    {
        name: "Sacrifício",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "1 vez/rodada, ao atacar corpo a corpo: sacrifique 5 PV por patamar para causar +1d10 dano por patamar."
    },
    {
        name: "Sentença Dobrada",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Um Julgamento Divino",
        pathReq: "all",
        desc: "Ao usar Julgamento, gaste +1 PM para usar um segundo julgamento na mesma ação (paga custo de ambos)."
    },
    {
        name: "Virtude: Paciência",
        type: "class",
        class: "paladino",
        subType: "power",
        req: "Paladino",
        pathReq: "all",
        desc: "Se ficar 1 rodada meditando em combate (sem ações, só reações): +2 perícias e Defesa até fim da cena.<br><br><strong>Regra das Virtudes:</strong> +1 PM no total por virtude (+1, +3, +6...)."
    },
    // ========================================================================
    // PODERES GERAIS: COMBATE (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Arremesso Devastador",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Arremesso Potente",
        desc: "Ao acertar ataque à distância (arremesso): gaste 1 PM para fazer manobra derrubar ou empurrar junto (usa o ataque como teste)."
    },
    {
        name: "Ataque com o Cabo",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Estilo de Arma Longa",
        desc: "1 vez/rodada, ao agredir com arma alongada: gaste 1 PM para fazer ataque extra com cabo (1d6, x2, impacto)."
    },
    {
        name: "Ataque em Arco",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Treinado em Luta, 4º nível de personagem",
        desc: "Ao atacar corpo a corpo: gaste 2 PM para atingir até 3 criaturas adjacentes entre si (único teste de ataque). Se for Bando, causa +50% dano."
    },
    {
        name: "Bravura Indômita",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Treinado em Vontade",
        desc: "Se adjacente a 2+ inimigos aptos a atacar: recebe +2 ataque e margem de ameaça."
    },
    {
        name: "Briga de Rua",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Briga ou Estilo Desarmado",
        desc: "1 vez/rodada, ao vencer finta: gaste 1 PM para fazer ataque desarmado extra (livre). Se acertar, +2d6 dano."
    },
    {
        name: "Chuva de Golpes",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Briga/Estilo Desarmado, Estilo de Duas Armas",
        desc: "Quando ataca com duas armas (Estilo Duas Armas), pode fazer um ataque desarmado adicional."
    },
    {
        name: "Catafractário",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Encouraçado, Ginete",
        desc: "Se montado e com armadura pesada: +1 Defesa por nível de parceiro da montaria."
    },
    {
        name: "Contra-Ataque",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Combate Defensivo",
        desc: "1 vez/rodada, se criatura errar ataque em você: gaste 2 PM para atacá-la corpo a corpo."
    },
    {
        name: "Coragem Aguerrida",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Treinado em Vontade",
        desc: "Com PV pela metade ou menos: recebe +2 em perícias e Defesa."
    },
    {
        name: "Corte Lacerante",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Treinado em Luta",
        desc: "Ao atacar com arma de corte: gaste 2 PM. Se acertar, +1d10 dano e alvo fica Sangrando."
    },
    {
        name: "Defesa Armada",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Estilo de Duas Mãos",
        desc: "Se usar arma de duas mãos: recebe +2 Defesa e Fortitude."
    },
    {
        name: "Encastelado",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Encouraçado, 5º nível de personagem",
        desc: "Se usar armadura pesada: RD 2. Aumenta +1 por poder que tenha Encouraçado como pré-requisito."
    },
    {
        name: "Escudo Heroico",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Ataque com Escudo",
        desc: "Empunha/solta escudo como livre. Pode arremessar escudo (curto). Ao acertar arremesso: gaste 1 PM para retornar (reação) ou ricochetear em outro alvo (-5 ataque, cumulativo)."
    },
    {
        name: "Estocada Pungente",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Treinado em Luta",
        desc: "Ao atacar com arma perfuração: gaste 2 PM. Se acertar, alvo sofre -5 no dano (1 rodada)."
    },
    {
        name: "Estudar o Adversário",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Int 1",
        desc: "Na primeira vez que erra ataque na rodada: recebe +2 cumulativo no ataque contra o mesmo alvo (cena)."
    },
    {
        name: "Firula Inspiradora",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Movimento e 1 PM. Teste Atuação (CD 10). Sucesso: +1 perícias e Defesa (+1 a cada 10 acima da CD) até próximo turno."
    },
    {
        name: "Matador de Monstros",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "5º nível de personagem",
        desc: "Recebe +1d10 dano contra criaturas Grandes ou maiores. Elas não recebem bônus de tamanho em manobras contra você."
    },
    {
        name: "Mobilidade",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Esquiva",
        desc: "Se mover pelo menos 6m (ação movimentar-se): +2 ataque e Defesa até próximo turno."
    },
    {
        name: "Na Mosca",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Estilo de Arremesso ou Disparo",
        desc: "Ao atacar à distância: gaste 1 PM. Se acertar, +1 dado extra de dano do mesmo tipo."
    },
    {
        name: "Pancada Estonteante",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Treinado em Luta",
        desc: "Ao atacar com arma impacto: gaste 2 PM. Se acertar, alvo fica Desprevenido por 1 rodada."
    },
    {
        name: "Precisão Letal",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "11º nível de personagem",
        desc: "Margem de ameaça de seus ataques aumenta em +1."
    },
    {
        name: "Sanguinário",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Se causar 10+ dano: recebe +1 cumulativo no dano até fim da cena (limite Força)."
    },
    {
        name: "Sentinela Implacável",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Sab 1, Iniciativa, Percepção, Estilo Disparo",
        desc: "1 vez/rodada, se inimigo mover no alcance da arma de disparo carregada: gaste 2 PM para atacá-lo."
    },
    {
        name: "Sequência de Golpes",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Ao acertar ataque corpo a corpo: recebe +1 cumulativo em ataque/dano contra a mesma criatura no turno (limite Força)."
    },
    {
        name: "Truque da Mão Lesta",
        type: "combat",
        category: "Geral",
        source: "herois",
        req: "Estilo de Uma Arma",
        desc: "Se empunhar arma 1 mão e nada na outra: Troca de mão para confundir (1 vez/inimigo por cena). Inimigo adjacente fica Desprevenido (turno) e se acertar, dano aumenta 2 passos."
    },
    // ========================================================================
    // PODERES GERAIS: DESTINO (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Alma Livre",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Escolha uma classe. Você pode escolher um poder dessa classe como se pertencesse a ela (considere seu nível -4)."
    },
    {
        name: "Andarilho Urbano",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Se estiver em uma cidade, recebe +2 na Defesa, em Enganação e em Investigação."
    },
    {
        name: "Carícias Revigorantes",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Car 2, Sedução Lasciva",
        desc: "Gaste 1 min e 2 PM. Criatura adjacente recupera 2d4 PM. (1 vez/dia por criatura)."
    },
    {
        name: "Diligente",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Ação movimento. Recebe +2 em um teste de perícia (exceto ataque) realizado até o fim do próximo turno (ação máx completa)."
    },
    {
        name: "Foco em Habilidade",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Escolha uma habilidade. A CD para resistir a ela aumenta em +2. (Não se aplica a magias)."
    },
    {
        name: "Grandão",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Con 2",
        desc: "Conta como uma categoria de tamanho maior para Furtividade, manobras, espaço e alcance natural. Capacidade de carga +5 espaços."
    },
    {
        name: "Herói dos Sete Instrumentos",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "-",
        desc: "Recebe +1 em perícias não treinadas. Nível 7: +2. Nível 15: +3."
    },
    {
        name: "Impostor",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Car 3, Foco em Perícia (Enganação)",
        desc: "1 vez/cena. Gaste 2 PM para usar Enganação no lugar de outra perícia (ação máx completa)."
    },
    {
        name: "Liderança Inspiradora",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Car 1",
        desc: "Comanda capangas com ação padrão (em vez de completa). 1 vez/rodada, gasta ação livre para fazê-los mover ou causar dano."
    },
    {
        name: "Meditação Autoafirmativa",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Sab 1, Car 1, 5º nível",
        desc: "Medite 1 dia e teste Carisma para ganhar benefício por 1 semana:<br>• <strong>+1 Ataque:</strong> CD 15<br>• <strong>+2 Ataque:</strong> CD 20<br>• <strong>+3 Ataque:</strong> CD 25<br>• <strong>+2 Defesa:</strong> CD 20<br>• <strong>+5 Resistências:</strong> CD 20<br>• <strong>Treinado em perícia:</strong> CD 17<br>• <strong>Usar um poder (com reqs):</strong> CD 22<br>Meditar mais dias dá bônus no teste."
    },
    {
        name: "Pose Assustadora",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Car 1, treinado em Intimidação",
        desc: "Recebe +2 em Intimidação. Pode gastar 1 PM para assustar como ação de movimento."
    },
    {
        name: "Sedução Lasciva",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Car 1, treinado em Enganação",
        desc: "Gaste minutos e 3 PM. Teste Enganação vs Vontade. Sucesso: Alvo fica Enfeitiçado por 1 dia."
    },
    {
        name: "Ventriloquismo",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Treinado em Atuação e Enganação",
        desc: "Gaste 1 PM para fazer sua voz vir de outro lugar por 1 rodada. (Enganação vs Intuição se for suspeito)."
    },
    // ========================================================================
    // PODERES GERAIS: MAGIA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Barreira Mística",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "Ao lançar magia, gaste 1 PM: Recebe +4 na Defesa até o início do seu próximo turno."
    },
    {
        name: "Encantar Itens Menores",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Magias 3º círculo, treinado em Misticismo/Religião",
        desc: "Pode encantar itens mágicos menores (se já tiver o item base). Usa Misticismo (Arcano) ou Religião (Divino) no lugar de Ofício."
    },
    {
        name: "Encantar Itens Médios",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Magias 4º círculo, Encantar Itens Menores",
        desc: "Pode encantar itens mágicos médios (se já tiver o item base)."
    },
    {
        name: "Encantar Itens Maiores",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Magias 5º círculo, Encantar Itens Médios",
        desc: "Pode encantar itens mágicos maiores (se já tiver o item base)."
    },
    {
        name: "Esoterismo",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias de 2º círculo",
        desc: "Ao lançar magia, pague 2 PM para usar dois itens esotéricos diferentes simultaneamente (recebe benefícios de ambos)."
    },
    {
        name: "Especialização em Magia",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Foco em Magia na magia escolhida",
        desc: "Escolha uma magia (com Foco). A CD para resistir a ela aumenta em +2."
    },
    {
        name: "Estilo Esotérico",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Treinado em Luta e Misticismo, 5º nível",
        desc: "1 vez/rodada, ao agresrir corpo a corpo empunhando esotérico: gaste 2 PM para lançar magia (padrão/mov/completa) como livre."
    },
    {
        name: "Explosão Fulgente",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Fogo. Falha na resistência: Cego por 1 rodada (ou ofuscado se já cego)."
    },
    {
        name: "Gênese Elemental",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias de 2º círculo",
        desc: "<strong>Aprimoramento (+3 PM):</strong> Cria 1d4 (+1/círculo) capangas elementais (dano 1d6+1 do elemento)."
    },
    {
        name: "Magia Dividida",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias de 2º círculo",
        desc: "<strong>Aprimoramento (+2 PM):</strong> Divide área da magia em duas (metade do tamanho original cada, sem sobrepor)."
    },
    {
        name: "Magia Suspensa",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "Pode aumentar tempo de execução (movimento/padrão) para aumentar a CD:<br>• Ação Completa: +1 CD.<br>• 2 rodadas: +2 CD.<br>• 3 rodadas: +5 CD."
    },
    {
        name: "Miasma Tóxico",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Ácido. Falha na resistência: Enjoado por 1 rodada."
    },
    {
        name: "Prisão Gélida",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Frio. Falha na resistência: Enredado por 1 rodada."
    },
    {
        name: "Trovão Retumbante",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Eletricidade. Falha na resistência: Caído (1/cena) e Surdo."
    },

    // ========================================================================
    // PODERES DA TORMENTA (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Bolsões Insanos",
        type: "tormenta",
        category: "Tormenta",
        source: "herois",
        req: "-",
        desc: "Limite de carga aumenta +2 espaços (+1 por outro poder da Tormenta). +5 Ladinagem para ocultar itens nesses espaços."
    },
    {
        name: "Carapaça Corrompida",
        type: "tormenta",
        category: "Tormenta",
        source: "herois",
        req: "Carapaça",
        desc: "Recebe RD 1. Aumenta +1 a cada dois outros poderes da Tormenta."
    },
    {
        name: "Repulsivo",
        type: "tormenta",
        category: "Tormenta",
        source: "herois",
        req: "Carisma -1 ou menor",
        desc: "Primeiro ataque de cada inimigo contra você na cena sofre penalidade igual ao total de poderes da Tormenta que possui."
    },
    {
        name: "Explosão Fulgente",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Fogo. Falha na resistência: Cego por 1 rodada (ou ofuscado se já cego)."
    },
    {
        name: "Gênese Elemental",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias de 2º círculo",
        desc: "<strong>Aprimoramento (+3 PM):</strong> Cria 1d4 (+1/círculo) capangas elementais (dano 1d6+1 do elemento)."
    },
    {
        name: "Magia Dividida",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias de 2º círculo",
        desc: "<strong>Aprimoramento (+2 PM):</strong> Divide área da magia em duas (metade do tamanho original cada, sem sobrepor)."
    },
    {
        name: "Magia Suspensa",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "Pode aumentar tempo de execução (movimento/padrão) para aumentar a CD:<br>• Ação Completa: +1 CD.<br>• 2 rodadas: +2 CD.<br>• 3 rodadas: +5 CD."
    },
    {
        name: "Miasma Tóxico",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Ácido. Falha na resistência: Enjoado por 1 rodada."
    },
    {
        name: "Prisão Gélida",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Frio. Falha na resistência: Enredado por 1 rodada."
    },
    {
        name: "Trovão Retumbante",
        type: "magic",
        category: "Geral",
        source: "herois",
        req: "Lançar magias",
        desc: "<strong>Aprimoramento (+1 PM):</strong> Para magias de Eletricidade. Falha na resistência: Caído (1/cena) e Surdo."
    },

    // ========================================================================
    // PODERES RACIAIS (HERÓIS DE ARTON) - PARTE 1
    // ========================================================================
    {
        name: "Ajudante Nato",
        type: "raca",
        category: "Qareen",
        source: "herois",
        req: "-",
        desc: "Ao passar em teste de ajuda, bônus aumenta +1 (Total +3). Bônus de flanquear para aliados aumenta +1 (Total +3)."
    },
    {
        name: "Amo",
        type: "raca",
        category: "Qareen",
        source: "herois",
        req: "-",
        desc: "Escolha um personagem como Amo. Custo de Desejos para ele reduz -2 PM. Se amo estiver em perigo/condição, você sofre -2 em perícias."
    },
    {
        name: "Arma Amada",
        type: "raca",
        category: "Anão, Hobgoblin",
        source: "herois",
        req: "-",
        desc: "Escolha uma arma. Com ela: +2 dano e +5 resistência contra desarmar e quebrar."
    },
    {
        name: "Arma Natural Aprimorada",
        type: "raca",
        category: "Várias",
        source: "herois",
        req: "Arma natural racial",
        desc: "Escolha uma arma natural racial. Dano aumenta um passo e margem de ameaça +1."
    },
    {
        name: "Arma Natural Hábil",
        type: "raca",
        category: "Várias",
        source: "herois",
        req: "Arma natural racial (com custo PM para ataque extra)",
        desc: "Escolha uma arma natural que gaste PM para ataque extra. Agora não custa PM (limite 1/rodada)."
    },
    {
        name: "Arquearia Élfica",
        type: "raca",
        category: "Elfo",
        source: "herois",
        req: "-",
        desc: "Arcos contam como armas simples. Recebe +2 dano com arcos."
    },
    {
        name: "Arsenal de Lisandra",
        type: "raca",
        category: "Dahllan",
        source: "herois",
        req: "-",
        desc: "Aprende Armamento da Natureza (custo -1 PM se reaprender). Bônus de Armadura de Allihanna aumenta +1 por patamar."
    },
    {
        name: "Asas de Aço",
        type: "raca",
        category: "Harpia, Kallyanach, Pteros, Suraggel",
        source: "herois",
        req: "Possuir asas",
        desc: "Asas dão +2 Defesa e contam como armas naturais (2d4, x2). Ao agredir, pode gastar 1 PM para ataque extra com elas (se não estiver voando)."
    },
    {
        name: "Asas Extraplanares",
        type: "raca",
        category: "Suraggel",
        source: "herois",
        req: "-",
        desc: "Gaste 1 PM/rodada para voo 12m (fica Vulnerável enquanto voa)."
    },
    {
        name: "Atração pela Pólvora",
        type: "raca",
        category: "Anão, Goblin, Hobgoblin, Kliren",
        source: "herois",
        req: "Treinado em Ofício (alquimista)",
        desc: "+1 ataque e +2 dano com armas de fogo. Bombas/itens de pólvora causam +1 dano por dado."
    },
    {
        name: "Camuflagem Mimética",
        type: "raca",
        category: "Sereia/Tritão, Trog",
        source: "herois",
        req: "-",
        desc: "Movimento e 2 PM. Bônus Furtividade (cena): +10 (sem armadura), +5 (leve), +2 (pesada)."
    },
    {
        name: "Canto da Sereia",
        type: "raca",
        category: "Sereia/Tritão",
        source: "herois",
        req: "-",
        desc: "+2 Atuação. Magias de Canção dos Mares tem alcance aumentado um passo e CD +2."
    },
    {
        name: "Cascos Poderosos",
        type: "raca",
        category: "Centauro, Minotauro, Sátiro",
        source: "herois",
        req: "-",
        desc: "Ao fazer ataque desarmado, gaste 1 PM para usar cascos: +1 dado de dano (apenas letal)."
    },
    {
        name: "Chassi Gracioso",
        type: "raca",
        category: "Golem",
        source: "herois",
        req: "-",
        desc: "+2 Diplomacia. Remove penalidade de armadura da habilidade Chassi."
    },
    {
        name: "Citadino",
        type: "raca",
        category: "Humano, Hynne, Kliren, Meio-Elfo",
        source: "herois",
        req: "-",
        desc: "+2 em perícias baseadas em Carisma (exceto Adestramento)."
    },
    {
        name: "Comandar Aprimorado",
        type: "raca",
        category: "Humano",
        source: "herois",
        req: "Car 2, Comandar",
        desc: "Ao usar Comandar, gaste +2 PM para aumentar bônus em +1."
    },
    {
        name: "Conforto do Aço",
        type: "raca",
        category: "Anão",
        source: "herois",
        req: "-",
        desc: "Não sofre penalidade de armadura (apenas escudos). Se usar armadura pesada, recebe +2 Defesa."
    },
    {
        name: "Constrição Atroz",
        type: "raca",
        category: "Dahllan",
        source: "herois",
        req: "-",
        desc: "Movimento e 1 PM (sustentada). Inimigo em alcance curto testa Reflexos (CD Sab) ou fica Enredado."
    },
    {
        name: "Coração de Pedra",
        type: "raca",
        category: "Anão, Medusa",
        source: "herois",
        req: "-",
        desc: "+1 PV por nível e imunidade a petrificação."
    },
    {
        name: "Coro Sibilante",
        type: "raca",
        category: "Medusa",
        source: "herois",
        req: "-",
        desc: "Gaste 1 PM. Recebe +2 em perícias de Carisma (exceto ataque) até fim da cena."
    },
    {
        name: "Crescimento Feérico",
        type: "raca",
        category: "Duende, Sílfide",
        source: "herois",
        req: "-",
        desc: "Movimento e 1 PM: Aumenta uma categoria (máx Grande), +1 Força. Veterano (3 PM): Duas categorias (máx Enorme), +2 Força. Dura quanto quiser."
    },
    {
        name: "Criança da Luz",
        type: "raca",
        category: "Aggelus",
        source: "herois",
        req: "-",
        desc: "Bônus racial Diplomacia/Intuição aumenta para +5. Recebe RD Eletricidade e Frio 5."
    },
    {
        name: "Criança das Trevas",
        type: "raca",
        category: "Sulfure",
        source: "herois",
        req: "-",
        desc: "Bônus racial Enganação/Furtividade aumenta para +5. Recebe RD Fogo e Trevas 5."
    },
    {
        name: "Devoção Iluminada",
        type: "raca",
        category: "Várias",
        source: "herois",
        req: "Sensibilidade a luz racial, Devoto de energia positiva",
        desc: "+2 Vontade. Perde sensibilidade a luz e não pode ser ofuscado."
    },

    {
        name: "Duas Cabeças",
        type: "raca",
        category: "Gnoll, Kaijin, Lefou, Orc, Trog",
        source: "herois",
        req: "-",
        desc: "Ao fazer teste de Vontade, gaste 1 PM para rolar dois dados e usar o melhor. Se tiver mordida, ganha uma extra (ataque com ambas custa 2 PM)."
    },
    {
        name: "Dupla Conjuração",
        type: "raca",
        category: "Gnoll, Kaijin, Lefou, Orc, Trog",
        source: "herois",
        req: "Des 2, Lançar magias, Dupla Inteligência",
        desc: "1 vez/rodada, ao lançar magia (padrão), gaste 5 PM para lançar magia adicional (movimento ou padrão). Exige duas mãos livres."
    },
    {
        name: "Dupla Inteligência",
        type: "raca",
        category: "Gnoll, Kaijin, Lefou, Orc, Trog",
        source: "herois",
        req: "Int 2, Duas Cabeças",
        desc: "Ao testar Inteligência ou perícia baseada nela, gaste 2 PM para rolar dois dados e usar o melhor."
    },
    {
        name: "Dupla Prontidão",
        type: "raca",
        category: "Gnoll, Kaijin, Lefou, Orc, Trog",
        source: "herois",
        req: "Sab 2, Duas Cabeças",
        desc: "Recebe +2 Percepção. Nunca fica desprevenido e não pode ser flanqueado."
    },
    {
        name: "Duro Como Aço",
        type: "raca",
        category: "Anão",
        source: "herois",
        req: "11º nível de personagem",
        desc: "Pode somar Constituição na Defesa com armadura pesada (não soma Destreza)."
    },
    {
        name: "Entre as Pernas",
        type: "raca",
        category: "Goblin, Hynne, Kobolds",
        source: "herois",
        req: "Treinado em Acrobacia",
        desc: "Pode ocupar espaço de criatura 2 categorias maior (em vez de 3). Enquanto no espaço dela, ataques em você têm 25% chance de acertá-la."
    },
    {
        name: "Escapada Criativa",
        type: "raca",
        category: "Goblin, Meio-Elfo",
        source: "herois",
        req: "-",
        desc: "Ao fazer teste de resistência, gaste 2 PM para somar Inteligência."
    },
    {
        name: "Esgrima Élfica",
        type: "raca",
        category: "Elfo",
        source: "herois",
        req: "-",
        desc: "Recebe +1 ataque com espadas. Todas as espadas contam como armas ágeis para você."
    },
    {
        name: "Estilo Clássico",
        type: "raca",
        category: "Humano",
        source: "herois",
        req: "-",
        desc: "Se empunhar espada e escudo: +2 dano e +2 Defesa."
    },
    {
        name: "Estirpe Arcana",
        type: "raca",
        category: "Elfo, Eiradaan, Nagah (fêmea)",
        source: "herois",
        req: "-",
        desc: "Recebe +2 PM por patamar e +2 em Misticismo."
    },
    {
        name: "Exaltação do Rejeitado",
        type: "raca",
        category: "Kaijin, Lefou",
        source: "herois",
        req: "Lançar magias divinas",
        desc: "Ao lançar magia divina, recebe bônus em resistência igual ao círculo da magia até próximo turno."
    },
    {
        name: "Explosão Óssea",
        type: "raca",
        category: "Osteon",
        source: "herois",
        req: "-",
        desc: "Ao sofrer dano, gaste 2 PM para reduzir à metade (perde ossos). Acumula penalidade: 1x Fraco, 2x Debilitado, 3x Inconsciente. Recupera com ação completa."
    },
    {
        name: "Falatório Criativo",
        type: "raca",
        category: "Goblin",
        source: "herois",
        req: "-",
        desc: "Escolha uma perícia de Carisma. Pode usar Inteligência nela."
    },
    {
        name: "Familiar Elemental",
        type: "raca",
        category: "Qareen (Água, Ar, Fogo, Terra)",
        source: "herois",
        req: "Possuir familiar",
        desc: "Familiar vira elemental (imune ao elemento). Ao lançar magia desse elemento, ganha +1 PM para aprimoramentos."
    },
    {
        name: "Familiar de Luz",
        type: "raca",
        category: "Aggelus, Qareen da Luz",
        source: "herois",
        req: "Possuir familiar",
        desc: "Familiar vira celestial (imune a luz). Ao lançar magia de luz, ganha +1 PM para aprimoramentos."
    },
    {
        name: "Familiar de Trevas",
        type: "raca",
        category: "Sulfure, Qareen das Trevas",
        source: "herois",
        req: "Possuir familiar",
        desc: "Familiar vira abissal (imune a trevas). Ao lançar magia de trevas, ganha +1 PM para aprimoramentos."
    },
    {
        name: "Faro Aprimorado",
        type: "raca",
        category: "Minotauro, Moreau do Lobo",
        source: "herois",
        req: "-",
        desc: "+2 Intuição/Investigação/Percepção, +5 Sobrevivência (rastrear). Percebe criaturas em alcance curto (faro)."
    },
    {
        name: "Fragrância de Rosas",
        type: "raca",
        category: "Dahllan, Duende",
        source: "herois",
        req: "-",
        desc: "+2 Diplomacia. Padrão e 2 PM: Criaturas em alcance curto testam Fortitude ou ficam Pasmas 1 rodada (metabólico)."
    },
    {
        name: "Fúria Aterrorizante",
        type: "raca",
        category: "Galokk, Ogro",
        source: "herois",
        req: "Fúria ou Fúria Divina",
        desc: "Ao entrar em Fúria, inimigos (curto) ficam Abalados (Vontade reduz para 1 rodada)."
    },
    {
        name: "Fúria Natural",
        type: "raca",
        category: "Várias",
        source: "herois",
        req: "Fúria, arma natural racial",
        desc: "Em fúria, dano de armas naturais aumenta um passo e margem de ameaça +1."
    },
    {
        name: "Gavinhas",
        type: "raca",
        category: "Dahllan",
        source: "herois",
        req: "5º nível de personagem",
        desc: "Ao usar Armadura de Allihanna: crescem 2 gavinhas (1d4, 3m, +2 desarmar/derrubar). Ao agredir, pode gastar 1 PM/gavinha para ataque extra."
    },
    {
        name: "Ginete de Javali",
        type: "raca",
        category: "Anão",
        source: "herois",
        req: "-",
        desc: "Recebe javali doherita (parceiro iniciante). +2 Adestramento e Cavalgar com ele."
    },
    {
        name: "Glamour",
        type: "raca",
        category: "Duende, Eiradaan, Sílfide",
        source: "herois",
        req: "-",
        desc: "Escolha 3 magias de 1º círculo. Pode lançar como Glamour (Ilusão extra, risco de falha 1 em 1d6, alvo resiste com Vontade e fica imune). Custo -1 PM se já conhecer a magia."
    },
    {
        name: "Glamour Maior",
        type: "raca",
        category: "Duende, Eiradaan, Sílfide",
        source: "herois",
        req: "Glamour, 5º nível",
        desc: "Aprende mais 3 magias (1º ou 2º círculo) para lançar como Glamour."
    },
    {
        name: "Golpe dos Titãs",
        type: "raca",
        category: "Galokk",
        source: "herois",
        req: "-",
        desc: "Ao usar Força dos Titãs, resultados um ponto abaixo do máximo também explodem o dado."
    },
    {
        name: "Golpe no Joelho",
        type: "raca",
        category: "Goblin, Hynne, Kobolds",
        source: "herois",
        req: "Entre as Pernas",
        desc: "Ataque corpo a corpo em criatura maior ocupando mesmo espaço: dano aumenta um passo e +2 margem de ameaça."
    },
    {
        name: "Grande Marca de Wynna",
        type: "raca",
        category: "Qareen",
        source: "herois",
        req: "-",
        desc: "Lança mais uma magia de 1º círculo (Carisma). Pode usar aprimoramentos como feiticeiro do nível."
    },
    {
        name: "Herança Erudita",
        type: "raca",
        category: "Eiradaan, Elfo, Kallyanach",
        source: "herois",
        req: "-",
        desc: "Escolha uma perícia de Inteligência. Soma seu Carisma nela."
    },
    {
        name: "Lógica Gnômica",
        type: "raca",
        category: "Kliren",
        source: "herois",
        req: "-",
        desc: "1 vez/cena, ao fazer teste de perícia (exceto ataque), gaste 3 PM para usar Inteligência no lugar do atributo normal."
    },
    {
        name: "Magia Ofídica",
        type: "raca",
        category: "Medusa, Moreau da Serpente, Nagah",
        source: "herois",
        req: "Lançar magias",
        desc: "CD de venenos aumenta +1 e dano aumenta +1 por dado para cada círculo de magia que pode lançar."
    },
    {
        name: "Manipulação Esquelética",
        type: "raca",
        category: "Osteon",
        source: "herois",
        req: "-",
        desc: "Movimento e 1 PM (cena). Escolha: Alcance +1,5m, Deslocamento +3m ou virar pilha de ossos (+5 Furtividade, imóvel)."
    },
    {
        name: "Marrada Poderosa",
        type: "raca",
        category: "Minotauro, Sátiro",
        source: "herois",
        req: "-",
        desc: "Ao acertar investida com chifres: dano aumenta um passo e pode gastar 1 PM para ataque extra (desarmado/arma) com bônus de investida."
    },
    {
        name: "Meditação Mística",
        type: "raca",
        category: "Eiradaan, Elfo",
        source: "herois",
        req: "Sab 1, treinado em Vontade",
        desc: "1 vez/dia, medite 1d4 minutos. Se concluir, recupera PM igual ao nível."
    },
    {
        name: "Olhar Petrificante",
        type: "raca",
        category: "Medusa",
        source: "herois",
        req: "9º nível de personagem",
        desc: "Padrão e 3 PM. Alvo (curto) testa Fortitude. Falha: Lento 1d4 rodadas. Se já lento, vira Pedra (permanente, RD 8)."
    },
    {
        name: "Ossos Afiados",
        type: "raca",
        category: "Osteon",
        source: "herois",
        req: "-",
        desc: "Recebe +2 em Intimidação e +2 no dano com armas naturais e ataques desarmados."
    },
    {
        name: "Pirata Oceânico",
        type: "raca",
        category: "Sereia/Tritão",
        source: "herois",
        req: "-",
        desc: "Mestre do Tridente afeta arpões. Recebe +2 ataque com essas armas e elas contam como ágeis."
    },
    {
        name: "Programação de Combate",
        type: "raca",
        category: "Golem",
        source: "herois",
        req: "-",
        desc: "Movimento e 3 PM (sustentada). Ao atacar, rola dois dados e usa o melhor."
    },
    {
        name: "Programação Holística",
        type: "raca",
        category: "Golem",
        source: "herois",
        req: "-",
        desc: "Completa e 2 PM. Torna-se treinado em uma perícia (dia). Role 1d4: se cair 1, fica frustrado e não usa mais hoje."
    },
    {
        name: "Protetor Eterno",
        type: "raca",
        category: "Minotauro",
        source: "herois",
        req: "Protetor Táurico",
        desc: "Se tiver aliado adjacente, continua consciente mesmo com 0 ou menos PV. (Ainda morre no limite negativo)."
    },
    {
        name: "Protetor Táurico",
        type: "raca",
        category: "Minotauro",
        source: "herois",
        req: "-",
        desc: "Movimento. Carrega aliado adjacente (mão livre). Aliado ganha +5 Defesa (cobertura leve). 50% chance de ataque no aliado acertar você."
    },
    {
        name: "Quadridestria",
        type: "raca",
        category: "Kaijin, Lefou, Nagah, Orc, Trog",
        source: "herois",
        req: "Estilo de Duas Armas, Quatro Braços, 5º nível",
        desc: "Ao usar Estilo Duas Armas: gaste 2 PM para atacar com todas as armas empunhadas (se as extras forem leves)."
    },
    {
        name: "Quatro Braços",
        type: "raca",
        category: "Kaijin, Lefou, Nagah, Orc, Trog",
        source: "herois",
        req: "-",
        desc: "Possui par de braços extras (empunha 4 itens). Não dá ataques extras (veja Quadridestria)."
    },
    {
        name: "Saliva Corrosiva",
        type: "raca",
        category: "Trog",
        source: "herois",
        req: "-",
        desc: "Mordida causa +1d6 ácido. Ação movimento: cobre arma com saliva (+1d6 ácido até acertar ou fim da cena)."
    },
    {
        name: "Sangue Mágico",
        type: "raca",
        category: "Eiradaan, Qareen, Sílfide",
        source: "herois",
        req: "-",
        desc: "1 vez/dia. Recebe PM a escolha (limite Con). Permite quebrar limite de PM por turno. Perde 1d4 PV por PM recebido no fim do turno."
    },
    {
        name: "Saraivada Florestal",
        type: "raca",
        category: "Dahllan",
        source: "herois",
        req: "-",
        desc: "Sob Armadura de Allihanna: Movimento e 2 PM. Cone 9m causa 2d8+2 corte (Reflexos metade). Aumenta +1d8+1 por patamar (+1 PM)."
    },
    {
        name: "Soco Foguete",
        type: "raca",
        category: "Golem",
        source: "herois",
        req: "-",
        desc: "Ao fazer ataque corpo a corpo, gaste 1 PM para atingir alvo em alcance curto (mão voa e volta)."
    },
    {
        name: "Valentia Nata",
        type: "raca",
        category: "Hynne",
        source: "herois",
        req: "-",
        desc: "Imunidade a medo e +5 Iniciativa."
    },
    {
        name: "Tradição de Ayrelynn",
        type: "raca",
        category: "Anão",
        source: "herois",
        req: "-",
        desc: "Proficiência armas de fogo. Usa Sabedoria em vez de Destreza no ataque (e dano, se tiver Estilo)."
    },
    {
        name: "Tradição Perdida",
        type: "raca",
        category: "Várias (Não humano)",
        source: "herois",
        req: "Habilidade Magias",
        desc: "Escolha atributo e classe conjuradora. Soma esse atributo nos PM (limite 6 + 2/patamar) em vez do original."
    },
    {
        name: "Tradição Perdida Aprimorada",
        type: "raca",
        category: "Várias",
        source: "herois",
        req: "Tradição Perdida",
        desc: "O atributo-chave da classe escolhida passa a ser o atributo da Tradição Perdida."
    },
    {
        name: "Veneno Aprimorado",
        type: "raca",
        category: "Medusa",
        source: "herois",
        req: "Con 1",
        desc: "Natureza Venenosa causa perda de 2d12 PV."
    },
    {
        name: "Vigilância Élfica",
        type: "raca",
        category: "Elfo, Meio-Elfo, Naidora",
        source: "herois",
        req: "-",
        desc: "No primeiro turno do combate, recebe uma ação de movimento adicional."
    },
    {
        name: "Vitalidade das Fadas",
        type: "raca",
        category: "Dahllan, Duende, Sátiro, Sílfide",
        source: "herois",
        req: "-",
        desc: "Soma Carisma nos PV iniciais e Fortitude. Recebe +1 PV por nível a partir do 2º."
    },
    // ========================================================================
    // PODERES DE GRUPO (HERÓIS DE ARTON)
    // ========================================================================
    {
        name: "Abrir a Guarda",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Treinado em Luta/Pontaria, Aliado com poder",
        desc: "Quando você agarra ou derruba inimigo, aliados (curto) com este poder podem gastar 2 PM para fazer um ataque contra ele. (1 vez/rodada por aliado)."
    },
    {
        name: "Ajuda do Amador",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Padrão. Teste de ajuda para atrapalhar inimigo (curto). Se fizer, aliados com este poder ganham o bônus da ajuda nos ataques contra ele (1 rodada)."
    },
    {
        name: "Apontar Fraqueza",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Quando você faz crítico, aliados com poder podem gastar 2 PM no primeiro ataque deles contra o mesmo alvo para transformar acerto em crítico. (1 vez/cena por aliado)."
    },
    {
        name: "Barragem de Golpes",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Ao causar dano, aliados com poder ganham +1 dano contra o alvo (cena, limite nível). Bônus acaba se ninguém com o poder causar dano na rodada."
    },
    {
        name: "Bode Expiatório",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Se atitude de NPC piorar com aliado (com poder), você assume a culpa: atitude piora para você, mas mantém igual para o aliado."
    },
    {
        name: "Bote Coletivo",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Treinado em Iniciativa, Aliado com poder",
        desc: "Bônus em Iniciativa igual nº aliados com poder. Na 1ª rodada: mesmo bônus em perícias e CD."
    },
    {
        name: "Conforto Familiar",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Ao dormir perto de aliados com poder: começa o dia com 3 PV e 1 PM temporários por patamar para cada aliado."
    },
    {
        name: "Conselhos Salvadores",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Gaste 2 PM para fazer teste de resistência usando o valor de perícia de um aliado (curto) com este poder."
    },
    {
        name: "Corrente de Corpos",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "1 vez/rodada, livre: Entregue item empunhado a aliado com poder (curto ou cadeia de aliados)."
    },
    {
        name: "Defesa do Mártir",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "1 vez/rodada, se aliado (curto, com poder) sofrer dano: gaste 2 PM para sofrer o dano no lugar dele."
    },
    {
        name: "Dinheiro Atrai Dinheiro",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Cada personagem com poder adiciona +5% nas rolagens de tesouro (apenas tesouro rolado e encontrado pelo grupo)."
    },
    {
        name: "Escudo Vivo",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Se área afetar você e aliados (com poder): gaste 2 PM para sofrer o dano no lugar deles. (Suas imunidades/RD aplicam)."
    },
    {
        name: "Espírito de União",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Exército de Um Grupo Só, Todos do grupo terem o poder",
        desc: "Todos gastam 2 PM: Compartilham total de PV (soma de todos). Dano/Cura vai para o total. Se zerar, todos caem. (Fim da cena divide restante)."
    },
    {
        name: "Exército de Um Grupo Só",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Treinado em Guerra, Aliado com poder",
        desc: "Padrão e 2 PM (todos gastam). Forma bando com aliados. Aliados não agem, mas dão +2 ataque cada. Se acertar por 10+, aliados somam dano de um ataque deles."
    },
    {
        name: "Magia Comunitária",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "1 vez/rodada, ao lançar magia (alvo você/1 criatura): pague custo novamente por aliado (curto, com poder) para afetá-lo também."
    },
    {
        name: "Mão Amiga",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Ações de tempo longo (>1 semana): aliados podem ajudar gastando tempo igual. Cada aliado conta como +1 semana de progresso na mesma semana."
    },
    {
        name: "Parede de Escudos",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Movimento. Se usar escudo e estiver adjacente a aliado (com poder/escudo): +5 Defesa e RD 5 enquanto adjacentes."
    },
    {
        name: "Presença Luminosa",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Todos gastam 2 PM. Até fim da cena, todos usam o maior valor de perícia de Carisma entre os membros do grupo."
    },
    {
        name: "Saúde Coletiva",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Aliado com poder",
        desc: "Ao curar membro do grupo com este poder: PV recuperados aumentam +2 por dado."
    },
    {
        name: "Uma Mão Lava a Outra",
        type: "grupo",
        category: "Grupo",
        source: "herois",
        req: "Mão Amiga, Aliado com poder",
        desc: "Ao testar perícia (fora de combate), gaste 1 PM para rolar novamente. Usos/cena = nº membros com poder."
    },

    // ========================================================================
    // FRADE (DEUSES E HERÓIS DE ARTON): HABILIDADES DE CLASSE
    // ========================================================================
    {
        name: "Devoto Fiel",
        type: "class",
        class: "frade",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Torna-se devoto de Deus Maior (2 poderes concedidos) OU Panteão (sem poder, proibido armas corte/perfuração, escolhe energia Pos/Neg)."
    },
    {
        name: "Erudição",
        type: "class",
        class: "frade",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Ao fazer teste de perícia (exceto ataque), gaste PM (limite Int) para receber +2 por PM gasto."
    },
    {
        name: "Magias",
        type: "class",
        class: "frade",
        subType: "ability",
        req: "Nível 1",
        pathReq: "all",
        desc: "Lança magias divinas (Sabedoria). Começa com 3 de 1º círculo. Pode usar armadura leve sem teste (pesada exige teste Misticismo). Novos círculos: 2º (Nvl 5), 3º (Nvl 9), etc."
    },
    {
        name: "Versiculário",
        type: "class",
        class: "frade",
        subType: "ability",
        req: "Nível 2",
        pathReq: "all",
        desc: "Livro de anotações. 1 vez/dia, estude 1h: escolha magias = Inteligência. Até próximo dia, ao lançar essas magias, ganha +1 PM para aprimoramentos."
    },
    {
        name: "Dádiva da Fé",
        type: "class",
        class: "frade",
        subType: "ability",
        req: "Nível 5",
        pathReq: "all",
        desc: "Energiza símbolo sagrado (Movimento + PM até 2x Círculo). Aura 9m (Cena).<br>• <strong>Positiva (Proteção Sagrada):</strong> Aliados ganham RD = metade dos PM gastos.<br>• <strong>Negativa (Cólera Divina):</strong> Aliados ganham +Dano = metade dos PM gastos."
    },
    {
        name: "Solo Santificado",
        type: "class",
        class: "frade",
        subType: "ability",
        req: "Nível 20",
        pathReq: "all",
        desc: "Raio da Dádiva da Fé aumenta para 30m. O bônus concedido (RD ou Dano) também soma na CD das habilidades dos aliados afetados."
    },

    // ========================================================================
    // FRADE: PODERES DE CLASSE (ORDEM ALFABÉTICA)
    // ========================================================================
    {
        name: "Acelerar Sacrário",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "5º nível de frade",
        pathReq: "all",
        desc: "Ao criar sacrário, gaste +2 PM para criar como ação de movimento."
    },
    {
        name: "Ampliar Sacrário",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "10º nível de frade",
        pathReq: "all",
        desc: "Cria sacrários em alcance médio. Raio aumenta para 6m."
    },
    {
        name: "Aumento de Atributo",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Recebe +1 em um atributo. Pode escolher várias vezes (1 vez/patamar por atributo)."
    },
    {
        name: "Autoridade Eclesiástica",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "5º nível de frade, Devoto Deus Maior",
        pathReq: "all",
        desc: "Possui posição na igreja. Efeitos variam conforme divindade."
    },
    {
        name: "Bênção Fortalecedora",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Bênção",
        pathReq: "all",
        desc: "Ao lançar Bênção: aliados ganham PV temporários = 5 x bônus de ataque da magia. Duram enquanto a magia durar."
    },
    {
        name: "Canto Monástico",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Treinado em Atuação",
        pathReq: "all",
        desc: "Padrão e 1 PM. Teste Atuação (Ajuda). Aliados (curto) recebem bônus da ajuda em um teste de perícia ou na CD de uma habilidade (cena)."
    },
    {
        name: "Comunhão Vital",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Ao lançar magia de cura, gaste +2 PM para curar outro alvo (curto) pela metade do valor."
    },
    {
        name: "Conhecimento Mágico",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Aprende 2 magias divinas de qualquer círculo que possa lançar."
    },
    {
        name: "Copista",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Treinado em Ofício (escriba)",
        pathReq: "all",
        desc: "Cria pergaminhos (como Escrever Pergaminho). Se tiver ambos, fabrica o dobro ao mesmo tempo."
    },
    {
        name: "Cozinheiro da Abadia",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Treinado em Ofício (cozinheiro)",
        pathReq: "all",
        desc: "Ao preparar prato especial, combina efeitos de dois pratos (um teste, paga custo de ambos)."
    },
    {
        name: "Estudante Diligente",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Início do dia: escolha perícia não treinada. Sofre -2 PM máx, mas conta como treinado nela até fim do dia."
    },
    {
        name: "Fé e Razão",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Ao usar habilidade de frade, gaste PM (limite Int). CD aumenta +1 por PM gasto."
    },
    {
        name: "Mago Branco",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "3º nível de frade",
        pathReq: "all",
        desc: "Magias de cura de luz custam -1 PM e curam +1 PV por dado."
    },
    {
        name: "Memorizar Liturgia",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Copista, 8º nível de frade",
        pathReq: "all",
        desc: "1 vez/dia, estude pergaminhos divinos (qtd = Int). Até fim do dia, lança como se conhecesse (ou soma Int no limite PM se já conhece)."
    },
    {
        name: "Ofício do Mosteiro",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Treinado em Ofício (artesão)",
        pathReq: "all",
        desc: "Fabrica vestuário com Ofício (artesão). Pode fabricar itens com uma melhoria."
    },
    {
        name: "Psicografia",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Copista, 5º nível de frade",
        pathReq: "all",
        desc: "Pode fabricar pergaminho de qualquer magia divina (mesmo desconhecida). CD aumenta +5."
    },
    {
        name: "Sacrário da Erudição",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Você e aliados dentro ganham +1 PM para aprimoramentos ao usar pergaminhos."
    },
    {
        name: "Sacrário da Misericórdia",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "5º nível de frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Início do seu turno, criaturas escolhidas recuperam 5 + Sab PV. (Sustentada)."
    },
    {
        name: "Sacrário da Resiliência",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "5º nível de frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Você e aliados ganham +2 Resistência e Defesa. Gaste +2 PM na criação para aumentar bônus em +1 (limite círculo máx)."
    },
    {
        name: "Sacrário da Solenidade",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Criaturas sofrem condição Terrível para lançar magias e -2 Defesa. Gaste +2 PM na criação para aumentar penalidade em -1 (limite círculo máx)."
    },
    {
        name: "Sacrário da Verdade",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Se criatura passar em Acrobacia/Enganação/Furtividade/Ladinagem ou atacar alvo com condição: sofre 2d6 psíquico por círculo de magia que você tem acesso."
    },
    {
        name: "Sacrário das Sombras",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Área coberta por sombras (camuflagem leve). Mortos-vivos ganham +2 Defesa e Perícias."
    },
    {
        name: "Sacrário do Compartilhamento",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "7º nível de frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Sustentada. Ao lançar magia pessoal (1º/2º círculo), gaste 2 PM para compartilhar efeito com aliado dentro."
    },
    {
        name: "Sacrário do Ocaso",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "<strong>(Sacrário):</strong> Criado com 60 pontos de ocaso. Perde 1d10/turno. Criaturas dentro perdem PV igual. Perda aumenta +1d10 por círculo acima do 1º. Gaste +1 PM na criação para +20 pontos de ocaso."
    },
    {
        name: "Sermão da Celeridade",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "8º nível de frade",
        pathReq: "all",
        desc: "1 vez/rodada, gaste 5 PM: Aliado (curto) ganha ação padrão extra no próximo turno. (1 vez/cena por aliado)."
    },
    {
        name: "Sermão da Égide",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Padrão e 3 PM. Aliado (curto) recebe proteção: na próxima vez que sofrer dano (até seu próximo turno), reduz à metade."
    },
    {
        name: "Teologia Aplicada",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Escolha duas perícias. Pode gastar 1 PM para rolar novamente testes delas usando Religião."
    },
    {
        name: "Transferir Sacrário",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Frade",
        pathReq: "all",
        desc: "Movimento e 1 PM. Move um sacrário ativo para outro ponto no alcance."
    },
    {
        name: "Zelador dos Vinhedos",
        type: "class",
        class: "frade",
        subType: "power",
        source: "deuses",
        req: "Treinado em Ofício (cozinheiro)",
        pathReq: "all",
        desc: "Usa Ofício (cozinheiro) para criar poções (bebidas). Ação padrão para ingerir. Pode fazer bebida especial (+5 CD, custo extra) que combina efeito da poção e da bebida."
    },

    // ========================================================================
    // PODERES CONCEDIDOS: DEUSES (HERÓIS DE ARTON) - PARTE 1
    // ========================================================================
    {
        name: "Abraço da Fênix",
        type: "conceded",
        category: "Thyatis",
        source: "deuses",
        req: "Devoto de Thyatis",
        desc: "Imune a fogo. Se sofrer dano mágico de fogo, cura metade do dano (se já curava, cura total)."
    },
    {
        name: "Adaga Noturna",
        type: "conceded",
        category: "Tenebra",
        source: "deuses",
        req: "Devoto de Tenebra",
        desc: "Gaste 1 PM. Arma de perfuração causa +1d6 frio (cena)."
    },
    {
        name: "A Ferramenta Certa",
        type: "conceded",
        category: "Hyninn",
        source: "deuses",
        req: "Devoto de Hyninn",
        desc: "Gaste 1 PM. Cria ferramenta/equipamento de aventura (até T$ 400) na mão. Dura pela cena."
    },
    {
        name: "Alimentar-se do Pavor",
        type: "conceded",
        category: "Kallyadranoch, Megalokk",
        source: "deuses",
        req: "Devoto de Kallyadranoch ou Megalokk",
        desc: "Quando criatura com medo morre (curto): ganha PV temporários = 2x ND dela (cena)."
    },
    {
        name: "Alma de Mudança",
        type: "conceded",
        category: "Thwor, Valkaria",
        source: "deuses",
        req: "Devoto de Thwor ou Valkaria",
        desc: "Início da aventura: troque poderes (qtd = Sabedoria) por outros que cumpra requisitos."
    },
    {
        name: "Andarilho Carregado",
        type: "conceded",
        category: "Valkaria",
        source: "deuses",
        req: "Devoto de Valkaria",
        desc: "Mochila de aventureiro não conta limite de itens vestidos. Se usar, limite de carga usa Sabedoria em vez de Força."
    },
    {
        name: "Arma do Panteão",
        type: "conceded",
        category: "Panteão",
        source: "deuses",
        req: "Devoto de qualquer deus",
        desc: "Escolha um deus. Você recebe uma arma profana abençoada pelo seu deuschosen. Se a arma for proficiente, recebe +1 no dano. Se não for, pode empunhá-la."
    },
    {
        name: "Armadilha Divina",
        type: "conceded",
        category: "Hyninn",
        source: "deuses",
        req: "Devoto de Hyninn",
        desc: "Recebe um poder de Armadilha de Caçador. Pode preparar sem materiais."
    },
    {
        name: "Armadura de Ossos",
        type: "conceded",
        category: "Tenebra",
        source: "deuses",
        req: "Devoto de Tenebra",
        desc: "Movimento e 2 PM. +2 Defesa/Intimidação e RD 5 (corte/frio/trevas) pela cena."
    },
    {
        name: "Armas da Destruição",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "Recebe +1 dano e +1 multiplicador de crítico com armas proficientes."
    },
    {
        name: "Armas da Selvageria",
        type: "conceded",
        category: "Megalokk",
        source: "deuses",
        req: "Devoto de Megalokk",
        desc: "Armas naturais contam como favoritas. +2 dano com elas. Abençoar Arma afeta todas naturais sem custo extra."
    },
    {
        name: "Aventureiro Inquieto",
        type: "conceded",
        category: "Valkaria",
        source: "deuses",
        req: "Devoto de Valkaria",
        desc: "1 vez/busca: Rola novamente teste. Ao receber recompensa/castigo aleatório, rola 2 dados e escolhe."
    },
    {
        name: "Baforada Dracônica",
        type: "conceded",
        category: "Kallyadranoch",
        source: "deuses",
        req: "Devoto de Kallyadranoch",
        desc: "Escolha elemento (ácido/elet/fogo/frio/luz/trevas). 1 vez/rodada: gaste PM (limite Con) para causar 1d10 dano/PM em alvo curto (Reflexos reduz metade)."
    },
    {
        name: "Barreira de Coral",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Movimento e 3 PM. +5 Defesa (cena). Atacante corpo a corpo sofre 1d6+Con perfuração (aumenta +1d6/patamar)."
    },
    {
        name: "Belo Presente",
        type: "conceded",
        category: "Wynna",
        source: "deuses",
        req: "Devoto de Wynna",
        desc: "1 vez/cena. Padrão e Teste Religião (CD 15+custo). Lança magia vista na aventura (até fim do próximo turno, paga custo)."
    },
    {
        name: "Biblioteca Divina",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Recebe uma perícia treinada. Ganha mais uma a cada patamar acima de iniciante."
    },
    {
        name: "Cancioneiro da Esperança",
        type: "conceded",
        category: "Marah",
        source: "deuses",
        req: "Devoto de Marah",
        desc: "Padrão e 2 PM. Criaturas escolhidas (limite Car) em curto ganham +2 testes e +3m desl (cena). Perde se fizer ação hostil."
    },
    {
        name: "Cerimonialista Divino",
        type: "conceded",
        category: "Lin-Wu",
        source: "deuses",
        req: "Devoto de Lin-Wu",
        desc: "1 vez/dia, 1 hora. Teste Religião (+Car). Para cada 10 no resultado, alvos ganham 1 dado auxílio (+1d6 ou +1d8 se pagar T$ 25)."
    },
    {
        name: "Chamado Monstruoso",
        type: "conceded",
        category: "Megalokk",
        source: "deuses",
        req: "Devoto de Megalokk",
        desc: "Aprende Conjurar Monstro (não viola Obrigações). Custo -1 PM se reaprender."
    },
    {
        name: "Companheiro Celeste",
        type: "conceded",
        category: "Lena, Marah",
        source: "deuses",
        req: "Devoto de Lena ou Marah",
        desc: "Recebe parceiro Luminar (iniciante)."
    },
    {
        name: "Companheiro Silvestre",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Recebe parceiro Espírito da Natureza (perseguidor iniciante) ou Bogum (iniciante)."
    },
    {
        name: "Convicção Ambiciosa",
        type: "conceded",
        category: "Valkaria",
        source: "deuses",
        req: "Devoto de Valkaria",
        desc: "Se lutar em desvantagem: +2 perícias. Se houver inimigo ND >= nível: ação padrão extra no 1º turno."
    },
    {
        name: "Corromper Equipamento",
        type: "conceded",
        category: "Aharadak",
        source: "deuses",
        req: "Devoto de Aharadak",
        desc: "Gaste 2 PM. Arma/escudo/esotérico ganha benefícios de Matéria Vermelha (cena)."
    },
    {
        name: "Curar o Espírito",
        type: "conceded",
        category: "Lena",
        source: "deuses",
        req: "Devoto de Lena",
        desc: "Ação completa. Teste Carisma (CD 10). Recupera 1d4+1 PM do alvo tocado. (1 vez/dia por criatura)."
    },
    {
        name: "Discurso Conciliador",
        type: "conceded",
        category: "Marah",
        source: "deuses",
        req: "Devoto de Marah",
        desc: "Ao mudar atitude (Diplomacia): rola 2 dados. Pode usar melhor ou ambos (efeitos somam)."
    },
    {
        name: "Dom da Furtividade",
        type: "conceded",
        category: "Hyninn",
        source: "deuses",
        req: "Devoto de Hyninn",
        desc: "Soma Sabedoria em Furtividade. Penalidade para esconder após conjurar cai para -10."
    },
    {
        name: "Dom da Vontade",
        type: "conceded",
        category: "Khalmyr",
        source: "deuses",
        req: "Devoto de Khalmyr",
        desc: "Recebe +2 Vontade. 1 vez/cena, ao passar em Vontade contra inimigo/perigo: ganha 1d4 PM temporários."
    },
    {
        name: "Dom dos Segredos",
        type: "conceded",
        category: "Sszzaas",
        source: "deuses",
        req: "Devoto de Sszzaas",
        desc: "Padrão e 2 PM. Teste Carisma (CD 10 +2/uso). Sucesso: Aprende/lança magia 1º círculo (cena)."
    },
    {
        name: "Égide dos Mares",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Recebe parceiro Espírito das Águas (guardião iniciante) ou Escudeiro (iniciante)."
    },
    {
        name: "Espalhar a Corrupção",
        type: "conceded",
        category: "Aharadak",
        source: "deuses",
        req: "Devoto de Aharadak",
        desc: "1 dia e Teste Religião (CD 20). Planta corrupção na comunidade: atitude piora um passo por 1 semana."
    },
    {
        name: "Espírito Animal",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Movimento e 2 PM. Imune a flanqueado, 10 PV temporários e arma natural (1d6). Ao agresrir, pode gastar 1 PM para ataque extra com ela. (Gaste +PM para +5 PV cada)."
    },
    {
        name: "Espírito do Conhecimento",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Padrão e 2 PM. Invoca espírito do saber (Minúsculo, voo 6m). Você percebe por ele e lança magias a partir dele."
    },
    {
        name: "Estouro da Trobada",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Completa e 2 PM (sustentada). Manada Enorme. Movimento para mover 12m (linha reta). Causa 3d6 impacto e derruba (Fort reduz metade)."
    },
    {
        name: "Exaltar Honra",
        type: "conceded",
        category: "Lin-Wu",
        source: "deuses",
        req: "Devoto de Lin-Wu, Abençoado/Devoto Fiel",
        desc: "Gaste 2 PM. Aura 9m (cena). Honrados: +5 Diplomacia/Nobreza. Todos: -5 Enganação/Furtividade/Ladinagem."
    },
    {
        name: "Expurgar a Derrota",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "Se com 0 PM: gaste PV para pagar custos (3 PV = 1 PM). Dano só cura com descanso."
    },
    {
        name: "Familiar Elemental (Concedido)",
        type: "conceded",
        category: "Wynna",
        source: "deuses",
        req: "Devoto de Wynna",
        desc: "Recebe parceiro Espírito Arcano (adepto iniciante) ou Familiar Elemental (iniciante)."
    },
    {
        name: "Ferramentas da Guerra",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "1 vez/dia, 1 hora e T$ 10/item. Abençoa itens (qtd = Sab). Armas +2 dano, Armadura/Escudo RD 2. Dura 1 dia."
    },
    {
        name: "Golpe Semântico",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Pode substituir Diplomacia e Intimidação por Conhecimento."
    },
    {
        name: "Adaga Noturna",
        type: "conceded",
        category: "Tenebra",
        source: "deuses",
        req: "Devoto de Tenebra",
        desc: "Gaste 1 PM. Arma de perfuração causa +1d6 frio (cena)."
    },
    {
        name: "A Ferramenta Certa",
        type: "conceded",
        category: "Hyninn",
        source: "deuses",
        req: "Devoto de Hyninn",
        desc: "Gaste 1 PM. Cria ferramenta/equipamento de aventura (até T$ 400) na mão. Dura pela cena."
    },
    {
        name: "Alimentar-se do Pavor",
        type: "conceded",
        category: "Kallyadranoch, Megalokk",
        source: "deuses",
        req: "Devoto de Kallyadranoch ou Megalokk",
        desc: "Quando criatura com medo morre (curto): ganha PV temporários = 2x ND dela (cena)."
    },
    {
        name: "Alma de Mudança",
        type: "conceded",
        category: "Thwor, Valkaria",
        source: "deuses",
        req: "Devoto de Thwor ou Valkaria",
        desc: "Início da aventura: troque poderes (qtd = Sabedoria) por outros que cumpra requisitos."
    },
    {
        name: "Andarilho Carregado",
        type: "conceded",
        category: "Valkaria",
        source: "deuses",
        req: "Devoto de Valkaria",
        desc: "Mochila de aventureiro não conta limite de itens vestidos. Se usar, limite de carga usa Sabedoria em vez de Força."
    },
    {
        name: "Armadilha Divina",
        type: "conceded",
        category: "Hyninn",
        source: "deuses",
        req: "Devoto de Hyninn",
        desc: "Recebe um poder de Armadilha de Caçador. Pode preparar sem materiais."
    },
    {
        name: "Armadura de Ossos",
        type: "conceded",
        category: "Tenebra",
        source: "deuses",
        req: "Devoto de Tenebra",
        desc: "Movimento e 2 PM. +2 Defesa/Intimidação e RD 5 (corte/frio/trevas) pela cena."
    },
    {
        name: "Armas da Destruição",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "Recebe +1 dano e +1 multiplicador de crítico com armas proficientes."
    },
    {
        name: "Armas da Selvageria",
        type: "conceded",
        category: "Megalokk",
        source: "deuses",
        req: "Devoto de Megalokk",
        desc: "Armas naturais contam como favoritas. +2 dano com elas. Abençoar Arma afeta todas naturais sem custo extra."
    },
    {
        name: "Aventureiro Inquieto",
        type: "conceded",
        category: "Valkaria",
        source: "deuses",
        req: "Devoto de Valkaria",
        desc: "1 vez/busca: Rola novamente teste. Ao receber recompensa/castigo aleatório, rola 2 dados e escolhe."
    },
    {
        name: "Baforada Dracônica",
        type: "conceded",
        category: "Kallyadranoch",
        source: "deuses",
        req: "Devoto de Kallyadranoch",
        desc: "Escolha elemento (ácido/elet/fogo/frio/luz/trevas). 1 vez/rodada: gaste PM (limite Con) para causar 1d10 dano/PM em alvo curto (Reflexos reduz metade)."
    },
    {
        name: "Barreira de Coral",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Movimento e 3 PM. +5 Defesa (cena). Atacante corpo a corpo sofre 1d6+Con perfuração (aumenta +1d6/patamar)."
    },
    {
        name: "Belo Presente",
        type: "conceded",
        category: "Wynna",
        source: "deuses",
        req: "Devoto de Wynna",
        desc: "1 vez/cena. Padrão e Teste Religião (CD 15+custo). Lança magia vista na aventura (até fim do próximo turno, paga custo)."
    },
    {
        name: "Biblioteca Divina",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Recebe uma perícia treinada. Ganha mais uma a cada patamar acima de iniciante."
    },
    {
        name: "Cancioneiro da Esperança",
        type: "conceded",
        category: "Marah",
        source: "deuses",
        req: "Devoto de Marah",
        desc: "Padrão e 2 PM. Criaturas escolhidas (limite Car) em curto ganham +2 testes e +3m desl (cena). Perde se fizer ação hostil."
    },
    {
        name: "Cerimonialista Divino",
        type: "conceded",
        category: "Lin-Wu",
        source: "deuses",
        req: "Devoto de Lin-Wu",
        desc: "1 vez/dia, 1 hora. Teste Religião (+Car). Para cada 10 no resultado, alvos ganham 1 dado auxílio (+1d6 ou +1d8 se pagar T$ 25)."
    },
    {
        name: "Chamado Monstruoso",
        type: "conceded",
        category: "Megalokk",
        source: "deuses",
        req: "Devoto de Megalokk",
        desc: "Aprende Conjurar Monstro (não viola Obrigações). Custo -1 PM se reaprender."
    },
    {
        name: "Companheiro Celeste",
        type: "conceded",
        category: "Lena, Marah",
        source: "deuses",
        req: "Devoto de Lena ou Marah",
        desc: "Recebe parceiro Luminar (iniciante)."
    },
    {
        name: "Companheiro Silvestre",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Recebe parceiro Espírito da Natureza (perseguidor iniciante) ou Bogum (iniciante)."
    },
    {
        name: "Convicção Ambiciosa",
        type: "conceded",
        category: "Valkaria",
        source: "deuses",
        req: "Devoto de Valkaria",
        desc: "Se lutar em desvantagem: +2 perícias. Se houver inimigo ND >= nível: ação padrão extra no 1º turno."
    },
    {
        name: "Corromper Equipamento",
        type: "conceded",
        category: "Aharadak",
        source: "deuses",
        req: "Devoto de Aharadak",
        desc: "Gaste 2 PM. Arma/escudo/esotérico ganha benefícios de Matéria Vermelha (cena)."
    },
    {
        name: "Curar o Espírito",
        type: "conceded",
        category: "Lena",
        source: "deuses",
        req: "Devoto de Lena",
        desc: "Ação completa. Teste Carisma (CD 10). Recupera 1d4+1 PM do alvo tocado. (1 vez/dia por criatura)."
    },
    {
        name: "Discurso Conciliador",
        type: "conceded",
        category: "Marah",
        source: "deuses",
        req: "Devoto de Marah",
        desc: "Ao mudar atitude (Diplomacia): rola 2 dados. Pode usar melhor ou ambos (efeitos somam)."
    },
    {
        name: "Dom da Furtividade",
        type: "conceded",
        source: "deuses",
        category: "Hyninn",
        req: "Devoto de Hyninn",
        desc: "Soma Sabedoria em Furtividade. Penalidade para esconder após conjurar cai para -10."
    },
    {
        name: "Dom da Vontade",
        type: "conceded",
        category: "Khalmyr",
        source: "deuses",
        req: "Devoto de Khalmyr",
        desc: "Recebe +2 Vontade. 1 vez/cena, ao passar em Vontade contra inimigo/perigo: ganha 1d4 PM temporários."
    },
    {
        name: "Dom dos Segredos",
        type: "conceded",
        category: "Sszzaas",
        source: "deuses",
        req: "Devoto de Sszzaas",
        desc: "Padrão e 2 PM. Teste Carisma (CD 10 +2/uso). Sucesso: Aprende/lança magia 1º círculo (cena)."
    },
    {
        name: "Égide dos Mares",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Recebe parceiro Espírito das Águas (guardião iniciante) ou Escudeiro (iniciante)."
    },
    {
        name: "Espalhar a Corrupção",
        type: "conceded",
        category: "Aharadak",
        source: "deuses",
        req: "Devoto de Aharadak",
        desc: "1 dia e Teste Religião (CD 20). Planta corrupção na comunidade: atitude piora um passo por 1 semana."
    },
    {
        name: "Espírito Animal",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Movimento e 2 PM. Imune a flanqueado, 10 PV temporários e arma natural (1d6). Ao agredir, pode gastar 1 PM para ataque extra com ela. (Gaste +PM para +5 PV cada)."
    },
    {
        name: "Espírito do Conhecimento",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Padrão e 2 PM. Invoca espírito do saber (Minúsculo, voo 6m). Você percebe por ele e lança magias a partir dele."
    },
    {
        name: "Estouro da Trobada",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Completa e 2 PM (sustentada). Manada Enorme. Movimento para mover 12m (linha reta). Causa 3d6 impacto e derruba (Fort reduz metade)."
    },
    {
        name: "Exaltar Honra",
        type: "conceded",
        category: "Lin-Wu",
        source: "deuses",
        req: "Devoto de Lin-Wu, Abençoado/Devoto Fiel",
        desc: "Gaste 2 PM. Aura 9m (cena). Honrados: +5 Diplomacia/Nobreza. Todos: -5 Enganação/Furtividade/Ladinagem."
    },
    {
        name: "Expurgar a Derrota",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "Se com 0 PM: gaste PV para pagar custos (3 PV = 1 PM). Dano só cura com descanso."
    },
    {
        name: "Familiar Elemental (Concedido)",
        type: "conceded",
        category: "Wynna",
        source: "deuses",
        req: "Devoto de Wynna",
        desc: "Recebe parceiro Espírito Arcano (adepto iniciante) ou Familiar Elemental (iniciante)."
    },
    {
        name: "Ferramentas da Guerra",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "1 vez/dia, 1 hora e T$ 10/item. Abençoa itens (qtd = Sab). Armas +2 dano, Armadura/Escudo RD 2. Dura 1 dia."
    },
    {
        name: "Golpe Semântico",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Pode substituir Diplomacia e Intimidação por Conhecimento."
    },
    // ========================================================================
    // PODERES CONCEDIDOS: DEUSES (HERÓIS DE ARTON) - PARTE 2
    // ========================================================================
    {
        name: "Golpe Tempestuoso",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Ao acertar ataque corpo a corpo, gaste 2 PM: Empurra criatura 3m (direção a escolha) e ela fica Desprevenida (1 rodada)."
    },
    {
        name: "Imolação Sagrada",
        type: "conceded",
        category: "Azgher, Thyatis",
        source: "deuses",
        req: "Devoto de Azgher ou Thyatis",
        desc: "Padrão e 1 PM (sustentada). Braços em chamas. Ataques corpo a corpo causam +1d6 fogo."
    },
    {
        name: "Júbilo na Dor",
        type: "conceded",
        category: "Aharadak",
        source: "deuses",
        req: "Devoto de Aharadak",
        desc: "Ao causar ou sofrer dano: recebe RD 1 cumulativa (limite Sabedoria). Termina se passar 1 rodada sem causar/sofrer dano."
    },
    {
        name: "Jurista Divino",
        type: "conceded",
        category: "Khalmyr, Lin-Wu",
        source: "deuses",
        req: "Devoto de Khalmyr ou Lin-Wu",
        desc: "Usa Sabedoria para Nobreza. Pode usar Nobreza no lugar de Diplomacia e Intimidação."
    },
    {
        name: "Magia Caótica",
        type: "conceded",
        category: "Nimb",
        source: "deuses",
        req: "Devoto de Nimb",
        desc: "Ao lançar magia, gaste +2 PM: CD calculada com 1d20 (em vez de 10)."
    },
    {
        name: "Magia Piedosa",
        type: "conceded",
        category: "Lena, Thyatis",
        source: "deuses",
        req: "Devoto de Lena ou Thyatis",
        desc: "Pode fazer magias de dano causarem dano não letal."
    },
    {
        name: "Magia Venenosa",
        type: "conceded",
        category: "Sszzaas",
        source: "deuses",
        req: "Devoto de Sszzaas",
        desc: "Magias com Fortitude ganham aprimoramento (+1 PM): Falha causa 1d12 PV veneno (sucesso 1d6)."
    },
    {
        name: "Manto Ardiloso",
        type: "conceded",
        category: "Sszzaas",
        source: "deuses",
        req: "Devoto de Sszzaas",
        desc: "Aprende Disfarce Ilusório (CD Car, custo -1 PM se reaprender). Sob efeito da magia, ganha +10 Diplomacia na 1ª interação para mudar atitude."
    },
    {
        name: "Mar Revolto",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Gaste 1 PM (sustentada). Aura 6m. Inimigos testam Acrobacia (CD Sab, +5 se na água) ou caem no início do turno."
    },
    {
        name: "Mediador da Tempestade",
        type: "conceded",
        category: "Aharadak",
        source: "deuses",
        req: "Devoto de Aharadak",
        desc: "Comunica-se com lefeu inteligentes. +5 Diplomacia/Intuição com Tormenta e devotos."
    },
    {
        name: "Mestre de Si",
        type: "conceded",
        category: "Lin-Wu",
        source: "deuses",
        req: "Devoto de Lin-Wu",
        desc: "Passa automaticamente no primeiro teste de Vontade contra inimigo a cada cena."
    },
    {
        name: "Mordida de Víbora",
        type: "conceded",
        category: "Sszzaas",
        source: "deuses",
        req: "Devoto de Sszzaas",
        desc: "Recebe mordida (1d6). Pode armazenar 2 doses de veneno contato. Gaste 1 PM para ataque extra com mordida e inocular veneno."
    },
    {
        name: "Navegador Sagrado",
        type: "conceded",
        category: "Oceano",
        source: "deuses",
        req: "Devoto de Oceano",
        desc: "Usa Sabedoria para Pilotagem. Em embarcação, magias divinas custam -2 PM."
    },
    {
        name: "Nimb",
        type: "conceded",
        category: "Nimb",
        source: "deuses",
        req: "Devoto de Nimb",
        desc: "Padrão e 2 PM. Role 1d6 em cada coluna (Área e Efeito):<br><strong>1:</strong> Cone 6m / Verdes (-2 Carisma)<br><strong>2:</strong> 1d3 alvos médios / Curam 3d6 PV<br><strong>3:</strong> Raio 9m / Próximo teste rola 2 dados (você escolhe)<br><strong>4:</strong> Esfera 6m curto / Perdem 3d6+3 PV<br><strong>5:</strong> 1d3 linhas 15m / 1d4 PM temporários (1 rodada)<br><strong>6:</strong> Alvos curto / Usam Poder Oculto (cena)."
    },
    {
        name: "O Dobro ou Nada",
        type: "conceded",
        category: "Hyninn, Nimb",
        source: "deuses",
        req: "Devoto de Hyninn ou Nimb",
        desc: "Ao usar habilidade (exceto magia), pague dobro do PM para +5 CD. Se alguém passar, você fica Alquebrado."
    },
    {
        name: "O Futuro que Vem Disso",
        type: "conceded",
        category: "Thwor",
        source: "deuses",
        req: "Devoto de Thwor",
        desc: "Ao testar: some 1d4 a d20 (a escolha). Mestre ganha dado igual para usar contra você como penalidade. (Recarrega quando mestre usar)."
    },
    {
        name: "O Sol que nos Aquece",
        type: "conceded",
        category: "Allihanna, Azgher",
        source: "deuses",
        req: "Devoto de Allihanna ou Azgher",
        desc: "Padrão e 2 PM (sustentada). Aura 6m Luz Solar. Magias fogo/luz/plantas custam -1 PM. Sensíveis a luz/mortos-vivos ficam Vulneráveis."
    },
    {
        name: "Palavra de Poder",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Aprende Comando (custo -1 PM se reaprender)."
    },
    {
        name: "Passo Sombrio",
        type: "conceded",
        category: "Tenebra",
        source: "deuses",
        req: "Devoto de Tenebra",
        desc: "1 vez/rodada, gaste 2 PM para teleporte curto. Custo -1 PM se origem e destino estiverem em escuridão."
    },
    {
        name: "Perceber Farsas",
        type: "conceded",
        category: "Tanna Toh",
        source: "deuses",
        req: "Devoto de Tanna Toh",
        desc: "Recebe +5 Intuição e imunidade a ilusões."
    },
    {
        name: "Pilar de Heredrimm",
        type: "conceded",
        category: "Khalmyr",
        source: "deuses",
        req: "Devoto de Khalmyr",
        desc: "Gaste 2 PM. +2 Defesa e RD 5. Deslocamento reduzido à metade. (Cena ou até encerrar)."
    },
    {
        name: "Poder do Vínculo",
        type: "conceded",
        category: "Wynna",
        source: "deuses",
        req: "Devoto de Wynna",
        desc: "Movimento. Gaste PM (limite círculo) e toque conjurador. Próxima magia dele custa menos PM (valor gasto)."
    },
    {
        name: "Poder Sem Limites",
        type: "conceded",
        category: "Kallyadranoch",
        source: "deuses",
        req: "Devoto de Kallyadranoch",
        desc: "CD e limites de PM de habilidades (exceto magias) aumentam em +1 por patamar."
    },
    {
        name: "Proeminência Solar",
        type: "conceded",
        category: "Azgher",
        source: "deuses",
        req: "Devoto de Azgher",
        desc: "Magias de fogo ganham aprimoramento (+1 PM): Falha na resistência deixa Em Chamas e Lento."
    },
    {
        name: "Quebrar Encanto",
        type: "conceded",
        category: "Khalmyr",
        source: "deuses",
        req: "Devoto de Khalmyr",
        desc: "Recebe +2 Quebrar. Ao quebrar, gaste 2 PM: Acerto causa Dissipar Magia no item/portador (Teste Quebrar vs Misticismo)."
    },
    {
        name: "Redirecionar Destino",
        type: "conceded",
        category: "Thyatis",
        source: "deuses",
        req: "Devoto de Thyatis",
        desc: "Role d20 no início do dia (guarde). 1 vez/rodada, gaste 3 PM para substituir teste de criatura (curto) pelo valor guardado. Resultado substituído vira o novo guardado."
    },
    {
        name: "Remorso do Belicista",
        type: "conceded",
        category: "Marah",
        source: "deuses",
        req: "Devoto de Marah",
        desc: "1 vez/rodada, ao sofrer dano: gaste 1 PM. Atacante sofre -2 cumulativo em ataque/dano (cena)."
    },
    {
        name: "Resplendor Divino",
        type: "conceded",
        category: "Azgher",
        source: "deuses",
        req: "Devoto de Azgher",
        desc: "Gaste 2 PM (cena). Aura 9m Luz Solar. Remove camuflagem por escuridão/sombras na área."
    },
    {
        name: "Saque Celestial",
        type: "conceded",
        category: "Lin-Wu",
        source: "deuses",
        req: "Devoto de Lin-Wu",
        desc: "Gaste 1 PM para sacar como livre. Se atacar no mesmo turno: +2 ataque e dano aumenta 2 passos (1 vez/criatura por cena)."
    },
    {
        name: "Só os Loucos Sabem",
        type: "conceded",
        category: "Nimb",
        source: "deuses",
        req: "Devoto de Nimb",
        desc: "Role 2 perícias aleatórias. Torna-se treinado nelas (ou +3 se já for). Pode rolar novas por 3 PM no início do dia."
    },
    {
        name: "Sorvo de Mana",
        type: "conceded",
        category: "Wynna",
        source: "deuses",
        req: "Devoto de Wynna",
        desc: "Se falhar em resistência contra magia inimiga: recupera PM igual ao círculo dela."
    },
    {
        name: "Temor Arcano",
        type: "conceded",
        category: "Kallyadranoch",
        source: "deuses",
        req: "Devoto de Kallyadranoch",
        desc: "Se inimigo com medo (médio) falhar contra sua magia: ganha 1 PM temporário cumulativo (limite nível)."
    },
    {
        name: "Terror Profundo",
        type: "conceded",
        category: "Kallyadranoch, Megalokk, Thwor",
        source: "deuses",
        req: "Devoto de Kallyadranoch, Megalokk ou Thwor",
        desc: "+2 Intimidação e na CD de efeitos de medo."
    },
    {
        name: "Toque de Não Vida",
        type: "conceded",
        category: "Tenebra",
        source: "deuses",
        req: "Devoto de Tenebra",
        desc: "Movimento e 2 PM. Concede 2d12 PV temporários e camuflagem leve a você ou criatura adjacente."
    },
    {
        name: "Transbordar Cura",
        type: "conceded",
        category: "Lena",
        source: "deuses",
        req: "Devoto de Lena",
        desc: "Cura excedente vira PV temporários (limite dobro do nível do alvo)."
    },
    {
        name: "Trilha Desimpedida",
        type: "conceded",
        category: "Allihanna",
        source: "deuses",
        req: "Devoto de Allihanna",
        desc: "Aprende Caminhos da Natureza (custo -1 PM se reaprender)."
    },
    {
        name: "Ushultt",
        type: "conceded",
        category: "Thwor",
        source: "deuses",
        req: "Devoto de Thwor",
        desc: "Escolha um aliado. +2 ataque/dano se estiverem perto (+3 se aliado for duyshidakk). Troca 1 vez/aventura."
    },
    {
        name: "Vitória a Qualquer Custo",
        type: "conceded",
        category: "Arsenal",
        source: "deuses",
        req: "Devoto de Arsenal",
        desc: "Ao fazer teste ataque/resistência/guerra: gaste 2 PM para rolar novamente. Pode repetir (custo aumenta +1 PM/uso)."
    },

    // ========================================================================
    // DEUSES MENORES: PODERES CONCEDIDOS (ORDEM ALFABÉTICA)
    // ========================================================================

    {
        name: "Alcançar os Céus",
        type: "conceded",
        category: "Hydora",
        req: "Devoto de Hydora",
        desc: "Você pode gastar uma quantidade de PM limitada por sua Sabedoria (mínimo de 1) para receber deslocamento de voo até o fim do seu turno. Esse deslocamento é igual a 12m, +3m para cada PM gasto além do primeiro."
    },
    {
        name: "Alimento da Alma",
        type: "conceded",
        category: "Sunnary",
        req: "Devoto de Sunnary",
        desc: "Você recebe treinamento em Ofício (cozinheiro) e aprende e pode lançar Abençoar Alimentos. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    {
        name: "Alma em Erupção",
        type: "conceded",
        category: "Kurur Lianth",
        req: "Devoto de Kurur Lianth",
        desc: "Você recebe redução de fogo 10 e, quando causa dano, pode perder 2 pontos de vida (exceto PV temporários) para causar +1d8 pontos de dano de fogo."
    },
    {
        name: "Amor ao Machado",
        type: "conceded",
        category: "Goharom",
        req: "Devoto de Goharom",
        desc: "Você pode gastar uma ação padrão e 3 PM para tocar um machado e colocar nele um encanto de arma a sua escolha. O encanto não pode ter pré-requisitos e dura até o fim da cena ou até você usar este poder novamente."
    },
    {
        name: "Arsenal do Oceano",
        type: "conceded",
        category: "Tessalus",
        req: "Devoto de Tessalus",
        desc: "Você recebe proficiência em tridente e recebe +1 em testes de ataque e na margem de ameaça com essa arma. Se já for proficiente em tridente, seu dano aumenta em um passo."
    },
    {
        name: "Artista das Armas",
        type: "conceded",
        category: "Rhond",
        req: "Devoto de Rhond",
        desc: "Você pode infundir armas com uma fagulha divina. Gaste uma semana e T$ 100 e faça um teste de Ofício (armeiro) com CD igual à de fabricação da arma. Se passar, a arma se torna mágica e recebe uma melhoria cujos pré-requisitos cumpra (exceto material especial), que não conta em seu limite de melhorias."
    },
    {
        name: "Água da Vida",
        type: "conceded",
        category: "Nerelim",
        req: "Devoto de Nerelim",
        desc: "Uma vez por dia, você pode transformar um jarro (ou outro recipiente equivalente que ocupe 0,5 espaço) de água doce em uma poção mágica. Beber essa água mágica é uma ação padrão e recupera 2d8+2 PV e 1d4+1 PM. A água mantém suas propriedades mágicas por 1 semana ou até ser bebida."
    },
    {
        name: "Âmago de Escultor",
        type: "conceded",
        category: "Granto",
        req: "Devoto de Granto",
        desc: "Você paga 20% a menos em aposentos e mobílias de bases e construções de domínios. Além disso, pode construir um aposento ou construção acima do limite definido pelo tamanho da base ou nível do domínio."
    },
    {
        name: "Armas e Espólios",
        type: "conceded",
        category: "Dunsark",
        req: "Devoto de Dunsark",
        desc: "Você recebe uma proficiência a sua escolha entre armaduras pesadas, armas de fogo, armas marciais ou escudos. Se já tiver proficiência com armas marciais, pode escolher armas exóticas. Além disso, quando rolar um tesouro, como na tabela de Tesouro por Nível de Desafio (Tormenta20, p. 328), você pode rolar duas vezes para cada coluna apropriada e escolher entre os dois resultados."
    },
    {
        name: "Bênção do Frio",
        type: "conceded",
        category: "Beluhga",
        req: "Devoto de Beluhga",
        desc: "Você recebe redução de frio 5. Além disso, se terminar o seu turno adjacente a um ou mais inimigos, eles ficam enredados por cristais de gelo por 1 rodada. Se já estavam enredados dessa forma, em vez disso ficam imóveis por 1 rodada (Fortitude evita a condição imóvel)."
    },
    {
        name: "Bolha Hídrica",
        type: "conceded",
        category: "Piscigeros",
        req: "Devoto de Piscigeros",
        desc: "Uma vez por rodada, quando você ou um aliado em alcance curto faz um teste de resistência ou sofre dano, você pode gastar 2 PM para cuspir uma bolha de água protetora que fornece +5 nesse teste de resistência ou RD 15 contra esse dano. Estes benefícios são dobrados contra efeitos de fogo."
    },
    {
        name: "Canção Divina",
        type: "conceded",
        category: "Canora",
        req: "Devoto de Canora",
        desc: "Você pode usar Sabedoria para Atuação (em vez de Carisma) e como atributo-chave de suas magias de bardo (se as tiver). Além disso, aprende e pode lançar a magia Despedaçar. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    {
        name: "Canção dos Mares",
        type: "conceded",
        category: "Ayllana",
        req: "Devoto de Ayllana",
        desc: "Você adquire a habilidade Canção dos Mares das sereias/tritões. Se já tiver essa habilidade, você pode escolher outras magia da lista da habilidade, ou as mesmas para diminuir seu custo."
    },
    {
        name: "Casco de Tartaruga",
        type: "conceded",
        category: "Tamagrah",
        req: "Devoto de Tamagrah",
        desc: "Uma vez por rodada, quando sofre dano, você pode gastar 2 PM para receber RD 20 contra esse dano."
    },
    {
        name: "Chamado da Colmeia",
        type: "conceded",
        category: "Apis",
        req: "Devoto de Apis",
        desc: "Você pode gastar 1 PM e uma ação padrão para invocar um enxame de abelhas Grande com duração sustentada, que surge em um espaço a sua escolha em alcance médio. O enxame pode passar pelo espaço de outras criaturas e não impede que outras criaturas entrem no espaço dele. No final de seus turnos, o enxame causa 2d6 pontos de dano de perfuração a qualquer criatura em seu espaço (Reflexos CD Sab reduz à metade). Você pode gastar uma ação de movimento para mover o enxame 12m. A cada patamar além de iniciante, você pode gastar +1 PM quando invoca o enxame para aumentar seu dano em +2d6."
    },
    {
        name: "Conjurar Cristal",
        type: "conceded",
        category: "O Deus Cristal de Urielka",
        req: "Devoto do Deus Cristal de Urielka",
        desc: "Você pode gastar uma ação de movimento e 3 PM para conjurar um cristal azul, verde ou vermelho. Conforme a cor do cristal, você pode quebrá-lo para gerar um efeito: azul (recebe RD 20 contra um dano recém-sofrido); verde (rola novamente um teste de resistência recém-realizado); vermelho (ganha uma ação de movimento nesse turno). O cristal dura até o fim da cena, até ser usado ou até você conjurar outro cristal."
    },
    {
        name: "Despertar do Gigante",
        type: "conceded",
        category: "Teldiskan",
        req: "Devoto de Teldiskan",
        desc: "Você pode gastar uma ação de movimento e 3 PM para se tornar fisicamente mais imponente. Até o fim da cena você recebe +1 em Força e é considerado uma categoria de tamanho maior para modificadores de manobra de combate."
    },
    {
        name: "Disparo Sublime",
        type: "conceded",
        category: "Cette",
        req: "Devoto de Cette",
        desc: "Você pode gastar uma ação de movimento e 2 PM para fazer um teste de Percepção (CD 15 + ND da criatura) contra uma criatura em alcance médio. Se passar no teste e acertar um ataque com arco contra o alvo na mesma rodada, esse ataque é um acerto crítico automático. Se for o paladino de Cette, você pode usar Golpe Divino com ataques com arco à distância."
    },
    {
        name: "Dom de Armadilheiro",
        type: "conceded",
        category: "Canastra",
        req: "Devoto de Canastra",
        desc: "Você recebe um poder de Armadilha do caçador a sua escolha e a CD de todas as suas armadilhas aumenta em +2. Além disso, você pode aprender Conjurar Armadilha como uma magia divina."
    },
    {
        name: "Domínio do Medo",
        type: "conceded",
        category: "O Deus do Medo",
        req: "Devoto do Deus do Medo",
        desc: "Você recebe +2 em Intimidação e na CD de seus efeitos de medo, e pode escolher poderes relacionados a efeitos de medo sem necessidade de cumprir pré-requisitos de classe ou devoção. Por fim, pode aprender magias de medo como magias divinas."
    },
    {
        name: "Ego",
        type: "conceded",
        category: "Sckhar",
        req: "Devoto de Sckhar",
        desc: "Quando faz um teste, você pode gastar 1 PM para receber +5 nesse teste. Se fizer isso e falhar no teste, até o fim da cena você sofre uma penalidade de –2 em testes e não pode usar este poder."
    },
    {
        name: "Espadachim Divino",
        type: "conceded",
        category: "A Espada-Deus",
        req: "Devoto da Espada-Deus",
        desc: "Você recebe +1 nas rolagens de dano e no multiplicador de crítico com espadas e, para você, todas as espadas marciais são armas simples."
    },
    {
        name: "Espírito da Alcateia",
        type: "conceded",
        category: "Akok",
        req: "Devoto de Akok",
        desc: "Você pode se comunicar livremente com todos os tipos de cães e lobos, como se estivesse sob efeito da magia Voz Divina. Além disso, quando ataca um inimigo que você esteja flanqueando, você recebe +2 na rolagem de dano."
    },
    {
        name: "Etiqueta a Toda Hora",
        type: "conceded",
        category: "Jandra",
        req: "Devoto de Jandra",
        desc: "Uma vez por cena, você pode gastar uma ação de movimento e 1 PM para fazer um teste de Nobreza para ajudar. Cada aliado em alcance curto pode usar o bônus de ajuda fornecido por este teste em um de seus testes de perícia feito até o fim da cena."
    },
    {
        name: "Fisgar Corações",
        type: "conceded",
        category: "Irione",
        req: "Devoto de Irione",
        desc: "Você aprende e pode lançar a magia Enfeitiçar (atributo-chave Carisma) usando apenas concentração, sem necessidade de gestos ou palavras (como se sob efeito do poder Magia Discreta). Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    {
        name: "Furacão de Lâminas",
        type: "conceded",
        category: "Lamashtu",
        req: "Devoto de Lamashtu",
        desc: "Uma vez por rodada, quando erra um ataque corpo a corpo, você pode gastar 2 PM para fazer um novo ataque (com a mesma arma) contra outra criatura ao seu alcance."
    },
    {
        name: "Ginete Altivo",
        type: "conceded",
        category: "Hippion",
        req: "Devoto de Hippion",
        desc: "Enquanto está montado sobre um cavalo, você recebe +2 em testes de ataque e em Cavalgar. Além disso, você passa automaticamente em testes de Cavalgar para não cair do cavalo quando sofre dano e não sofre penalidades para atacar à distância ou lançar magias quando montado em cavalos. Este poder conta como o poder Ginete para efeitos de pré-requisitos de outras habilidades. Se você é um centauro, os benefícios deste poder mudam para: você pode fazer investidas em terreno difícil e não sofre a penalidade de –2 na Defesa por fazer uma investida. Por fim, recebe +2 nas rolagens de dano com armas em investidas."
    },
    {
        name: "Guardei para Você",
        type: "conceded",
        category: "Mauziell",
        req: "Devoto de Mauziell",
        desc: "Você pode gastar uma ação de movimento e 1 PM para produzir uma lembrança, na forma de uma memória ou de um objeto, para um aliado em alcance curto. Uma memória fornece +1d4 em um teste de perícia feito até o fim da cena, enquanto um objeto é uma versão mundana e não superior de um item não consumível a sua escolha, que dura até o fim da cena ou até ser largado pelo aliado. Você só pode produzir uma lembrança para cada aliado na mesma cena."
    },
    {
        name: "Igual ao Lar",
        type: "conceded",
        category: "Gratissa",
        req: "Devoto de Gratissa",
        desc: "Uma vez por dia, você pode gastar alguns minutos para transformar um espaço de descanso em um lar provisório por um dia. Todas as criaturas que descansarem nesse local aumentam sua recuperação de PV ou PM em +1 por nível (a escolha da criatura) e, enquanto estiverem nesse lar, recebem +1 em testes de perícias."
    },
    {
        name: "Incentivador da Economia",
        type: "conceded",
        category: "Tibar",
        req: "Devoto de Tibar",
        desc: "A cada T$ 50 x seu nível que gastar em uma aventura, você recebe +1 PM cumulativo até o fim da aventura."
    },
    {
        name: "Inimigo dos Deuses",
        type: "conceded",
        category: "Sartan",
        req: "Devoto de Sartan",
        desc: "Você recebe resistência a magia divina +5 e, contra devotos de outros deuses, recebe +2 em testes de ataque e na CD de suas habilidades."
    },
    {
        name: "Inspiração Concedida",
        type: "conceded",
        category: "Anilatir",
        req: "Devoto de Anilatir",
        desc: "Você pode gastar 2 PM para evocar o poder da criatividade. Até o fim da cena, sempre que fizer um teste de perícia, você recebe um bônus cumulativo de +1 nesse teste (ou seja, +1 no primeiro teste, +2 no segundo teste, +3 no terceiro e assim por diante). Esse bônus dura até o fim da cena ou até você fazer um teste de uma perícia que já tenha usado nesta cena."
    },
    {
        name: "Investida Tempestade",
        type: "conceded",
        category: "Benthos",
        req: "Devoto de Benthos",
        desc: "Quando faz uma investida, você pode gastar 2 PM para cobrir seu corpo com eletricidade. Se fizer isso, seu ataque causa +2d8 pontos de dano de eletricidade. Além disso, criaturas adjacentes ao caminho que você percorre na investida sofrem 2d8 pontos de dano de eletricidade e ficam ofuscadas por 1 rodada (Ref CD Sab reduz à metade e evita a condição)."
    },
    {
        name: "Irmão da Coragem",
        type: "conceded",
        category: "Zakharov",
        req: "Devoto de Zakharov",
        desc: "Você se torna imune a medo (se já for imune, em vez disso recebe +2 em Vontade). Além disso, uma vez por cena envolvendo um perigo, você pode substituir um teste de perícia por um teste de Vontade."
    },
    {
        name: "Jogada Decisiva",
        type: "conceded",
        category: "Champarr",
        req: "Devoto de Champarr",
        desc: "Uma vez por dia, quando faz um teste, você pode gastar 1 PM para somar +2 por patamar no teste."
    },
    {
        name: "Liberdade das Montanhas",
        type: "conceded",
        category: "Altair",
        req: "Devoto de Altair",
        desc: "Quando faz um teste de Atletismo para escalar, você rola dois dados e usa o melhor resultado. Além disso, se você estiver em terreno elevado, recebe +2 em testes de perícia contra criaturas em terreno inferior."
    },
    {
        name: "Liberdade Irrestrita",
        type: "conceded",
        category: "Gwendolynn",
        req: "Devoto de Gwendolynn",
        desc: "Você recebe +2 em testes de manobra para evitar ser agarrado e de resistência contra efeitos mentais, de medo, de metamorfose e de movimento. Além disso, se falhar num desses testes, pode rolá-lo novamente. Se ainda assim falhar, no início de cada um de seus turnos pode rolar esse teste novamente, como uma ação livre e com um bônus cumulativo de +2, até se libertar."
    },
    {
        name: "Manha da Cidade",
        type: "conceded",
        category: "O Deus das Cidades",
        req: "Devoto do Deus das Cidades",
        desc: "Quando está em uma comunidade, você soma sua Sabedoria (mínimo de 1) em testes de Conhecimento, Investigação, Ladinagem e Nobreza, e pode fazer testes dessas perícias mesmo sem ser treinado. Além disso, em comunidades pode fazer testes para interrogar sem precisar falar com pessoas ou gastar tibares, questionando a própria cidade."
    },
    {
        name: "Manutenção Sagrada",
        type: "conceded",
        category: "Klangor",
        req: "Devoto de Klangor",
        desc: "Uma vez por dia, você pode gastar 10 minutos ajustando sua própria armadura. Faça um teste de Ofício (armeiro) para ajudar. Enquanto estiver trajando esta armadura, você recebe um bônus na Defesa igual ao bônus de ajuda fornecido pelo teste. Entretanto, a cada vez que você for atingido por um ataque, esse bônus diminui em 1 (até um mínimo de 0)."
    },
    {
        name: "Mar Aberto",
        type: "conceded",
        category: "Marina",
        req: "Devoto de Marina",
        desc: "Você aprende e pode lançar Caminhos da Natureza. Você só pode lançar essa magia em ambientes aquáticos, mas pode aplicar seu bônus em deslocamento em qualquer embarcação em que esteja. Caso aprenda novamente essa magia, pode usá-la em qualquer ambiente e seu custo diminui em –1 PM."
    },
    {
        name: "Máscara Mística",
        type: "conceded",
        category: "Blinar",
        req: "Devoto de Blinar",
        desc: "Se estiver usando uma máscara, você pode lançar as magias Disfarce Ilusório e Proteção Divina (mas apenas em você mesmo). Caso aprenda uma dessas magias, seu custo diminui em –1 PM enquanto você estiver de máscara."
    },
    {
        name: "Na Ponta da Língua",
        type: "conceded",
        category: "Garanaam",
        req: "Devoto de Garanaam",
        desc: "Sempre que fizer um teste de Vontade para resistir a uma habilidade de uma criatura inteligente (Int –3 ou maior), você pode gastar 2 PM para propor uma charada a ela. Faça um teste de Enganação, oposto pelo Conhecimento ou Intuição da criatura. Se você vencer o teste, passa automaticamente no teste de Vontade. Caso contrário, faça o teste de Vontade normalmente."
    },
    {
        name: "Natureza Gloriosa",
        type: "conceded",
        category: "Zadbblein",
        req: "Devoto de Zadbblein",
        desc: "Você pode gastar 2 PM para que uma parte de seu corpo assuma uma forma animalesca até você ficar inconsciente ou escolher encerrá-la (uma ação livre). Quando faz isso, você recebe dois benefícios a sua escolha entre os seguintes: uma arma natural à sua escolha (dano 1d6, crítico x2, a sua escolha entre corte, impacto ou perfuração); +1 passo de dano em uma de suas armas naturais; +2 na Defesa; +6m de deslocamento; deslocamento de natação 9m; faro; ou +5 em Atletismo e Fortitude."
    },
    {
        name: "Olhar Atordoante",
        type: "conceded",
        category: "Escamandra",
        req: "Devoto de Escamandra",
        desc: "Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se falhar, a criatura fica atordoada por 1 rodada (apenas uma vez por cena). Se você já tiver esta habilidade, em vez disso ela passa a afetar criaturas a sua escolha em alcance curto e a CD para resistir a ela aumenta em +2."
    },
    {
        name: "Olhos do Vigia",
        type: "conceded",
        category: "Betsumial",
        req: "Devoto de Betsumial",
        desc: "Você recebe +2 em Percepção, não fica surpreendido e desprevenido contra inimigos que não possa perceber e nunca acerta o alvo errado ao atacar alguém envolvido na manobra agarrar. Quando erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha."
    },
    {
        name: "Oprimir Escolhas",
        type: "conceded",
        category: "Yasshara",
        req: "Devoto de Yasshara",
        desc: "Quando uma criatura em alcance curto faz um teste de perícia, você pode gastar 2 PM para forçar essa criatura a escolher 10 nesse teste (mesmo que isso não seja possível). A criatura tem direito a um teste de Vontade (CD Sab) para resistir a esse efeito. Você só pode usar este poder uma vez por criatura em cada cena."
    },
    {
        name: "Passo do Caçador",
        type: "conceded",
        category: "Lupan",
        req: "Devoto de Lupan",
        desc: "Você recebe +2 em Sobrevivência e soma sua Sabedoria em Furtividade. Além disso, contra criaturas desprevenidas ou surpreendidas, seus ataques causam +1d6 pontos de dano."
    },
    {
        name: "Pé na Estrada",
        type: "conceded",
        category: "Laan",
        req: "Devoto de Laan",
        desc: "Você pode gastar 3 PM para fornecer o dom da caminhada a criaturas escolhidas em alcance curto. Até o fim da cena, as criaturas afetadas recebem +3m em deslocamento, ficam imunes às condições imóvel e lento e passam automaticamente em testes de Fortitude para marcha forçada (Tormenta20, p. 270)."
    },
    {
        name: "Poder da Amizade",
        type: "conceded",
        category: "Artaphan",
        req: "Devoto de Artaphan",
        desc: "Escolha um personagem para ser seu amigo de fé. Se estiver em alcance médio dele e vocês puderem pelo menos trocar olhares, você recebe +2 em todos os testes de perícia e o custo de suas habilidades que tenham ele como alvo diminui em –1 PM (cumulativo com outras reduções). Entretanto, se ele morrer, seus pontos de mana máximos diminuem em 1 por nível até o fim da aventura. Se perder seu amigo de fé, você pode escolher outro entre os demais personagens no início da próxima aventura."
    },
    {
        name: "Pólvora Sagrada",
        type: "conceded",
        category: "Garth",
        req: "Devoto de Garth",
        desc: "Você recebe proficiência com armas de fogo. Além disso, pode gastar 1 PM para abençoar até 10 balas. Até o fim da cena, estas balas fornecem +1 na margem de ameaça e +2 nas rolagens de dano (cumulativo com outros bônus de itens)."
    },
    {
        name: "Pureza Corporal",
        type: "conceded",
        category: "Caerdellach",
        req: "Devoto de Caerdellach",
        desc: "Você pode gastar uma ação de movimento e 1 PM para cobrir sua mão com luz e tocar uma criatura em alcance corpo a corpo. A criatura recupera 2d6+2 PV. Além disso, aprende e pode lançar a magia Purificação. Se aprender essa magia novamente, o custo dela diminui em –1 PM."
    },
    {
        name: "Revoada de Texugos",
        type: "conceded",
        category: "Tukala",
        req: "Devoto de Tukala",
        desc: "Você pode gastar uma ação de movimento e 3 PM para invocar uma revoada de 1d4+1 texugos alados espirituais que ficam ao seu redor até o fim da cena. Enquanto estiverem ao seu redor, os texugos fornecem +2 em rolagens de dano corpo a corpo e na Defesa. Além disso, quando sofre dano, você pode “gastar” um dos texugos alados para receber RD 5 contra esse dano."
    },
    {
        name: "Salto Anurídeo",
        type: "conceded",
        category: "Inghlblhpholstgt",
        req: "Devoto de Inghlblhpholstgt",
        desc: "Você pode gastar uma ação de movimento e 2 PM para saltar 9m em qualquer direção. Se terminar o salto em alcance corpo a corpo de uma criatura e atacá-la no mesmo turno, você recebe os benefícios e as penalidades de uma investida e sua arma causa um dado extra de dano do mesmo tipo durante esse ataque. Você pode aprender Primor Atlético como uma magia divina. Se fizer isso, o custo dela diminui em –1 PM."
    },
    {
        name: "Selo Impedidor",
        type: "conceded",
        category: "Dahriol",
        req: "Devoto de Dahriol",
        desc: "Você pode gastar uma ação padrão e 3 PM para impedir uma criatura em alcance curto de usar uma habilidade a sua escolha até o fim da cena (Von CD Sab evita). Você só pode escolher uma habilidade que tenha visto a criatura usar ou que tenha identificado com um teste de perícia (como um teste de Misticismo para identificar criatura). Você não pode escolher a habilidade Magias (ou habilidades equivalentes), mas pode escolher uma magia específica. Uma mesma criatura só pode ser afetada por este poder uma vez por cena."
    },
    {
        name: "Selvageria Marcial",
        type: "conceded",
        category: "Hurlaagh",
        req: "Devoto de Hurlaagh",
        desc: "Você pode usar Sobrevivência no lugar de Guerra. Além disso, se passar em um teste para analisar terreno, além das vantagens descobertas, você fornece um bônus de +1 em testes de ataque e rolagens de dano de seus aliados em alcance curto até o fim da cena."
    },
    {
        name: "Sombras Venenosas",
        type: "conceded",
        category: "Mzzileyn",
        req: "Devoto de Mzzileyn",
        desc: "Você pode gastar uma ação de movimento e 1 PM para envenenar uma arma que esteja usando. A arma causa perda de 1d12 PV por veneno. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro). Além disso, se você estiver em uma área de escuridão, a CD para resistir aos seus venenos aumenta em +2 e a perda de vida deles aumenta em +2 por dado."
    },
    {
        name: "Sono Reparador",
        type: "conceded",
        category: "Neruíte",
        req: "Devoto de Neruíte",
        desc: "Se descansar (dormindo) em condições normais ou melhores, você pode melhorar sua recuperação de PV ou PM em um passo. Alternativamente, você pode ter um sonho inspirador: ao despertar, recebe +1d6 em um teste de perícia a sua escolha realizado até o fim do dia."
    },
    {
        name: "Toque de Esmeralda",
        type: "conceded",
        category: "Esmeralda",
        req: "Devoto de Esmeralda",
        desc: "Se fabricar um item que possa receber as melhorias banhado a ouro ou cravejado de joias, você pode gastar T$ 100 para aplicar uma dessas melhorias automaticamente, sem aumento na CD e sem que ela conte como uma melhoria. Sempre que você encontra uma riqueza aleatória (Tormenta20, p. 330), pode rolar duas vezes na tabela e escolher o melhor valor."
    },
    {
        name: "Toque Pestilento",
        type: "conceded",
        category: "Luvithy",
        req: "Devoto de Luvithy",
        desc: "Você aprende e pode lançar Infligir Ferimentos e, quando você usa essa magia, se o alvo falhar no teste de resistência, ele também é exposto à doença maldição pegajosa (Tormenta20, p. 318) e sofre seu efeito inicial imediadamente. Caso aprenda novamente essa magia, seu custo diminui em –1 PM."
    },
    {
        name: "Trilhas das Árvores Antigas",
        type: "conceded",
        category: "Ur",
        req: "Devoto de Ur",
        desc: "Uma vez por rodada, você pode gastar 1 PM para entrar em uma árvore adjacente de tamanho igual ou maior que o seu e sair em outra árvore em alcance longo (também de tamanho igual ou maior que o seu). Você não precisa de linha de visão para a árvore de saída, mas deve estar ciente de sua existência."
    },
    {
        name: "Um Contra Um",
        type: "conceded",
        category: "Drumak",
        req: "Devoto de Drumak",
        desc: "Você pode gastar 2 PM para escolher um oponente em alcance curto e receber +2 em testes de ataque e rolagens de dano contra ele até o fim da cena. Se atacar outro oponente, o bônus termina. Se tiver a habilidade Duelo, em vez disso seu custo diminui em –1 PM."
    },
    {
        name: "Vanglória",
        type: "conceded",
        category: "Elrophin",
        req: "Devoto de Elrophin",
        desc: "Uma vez por cena, quando faz um teste de perícia, você pode gastar 1 PM para somar +1d6 como um bônus no teste. Se rolar o valor máximo nesse dado de bônus, role um segundo d6 e adicione ao resultado. Você não pode usar esta habilidade em testes de ataque."
    },
    {
        name: "Véu de Toris",
        type: "conceded",
        category: "Toris",
        req: "Devoto de Toris",
        desc: "Você recebe +5 em Furtividade e não sofre penalidade de armadura em testes dessa perícia. Além disso, você sempre sabe em que direção está Jallar, sendo capaz de encontrar o pequeno reino mesmo com a magia de proteção contra detecção invocada pela deusa."
    },
    {
        name: "Palavra de Drelene",
        type: "conceded",
        category: "Drelene",
        req: "Devoto de Drelene",
        desc: "Você recebe +2 em testes de perícia para convencer alguém a adorar Drelene."
    },

    // Complicações

    {
        name: "Amaldiçoado",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você foi amaldiçoado por uma entidade poderosa. No início de cada cena envolvendo qualquer tipo de risco ou perigo, role 1d6. Em um resultado 1, você não consegue usar seus pontos de mana nessa cena."
    },
    {
        name: "Apetitoso",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Por algum motivo, feras salivam ao farejá-lo. Animais e monstros recebem +5 em testes de ataque e rolagens de dano contra você."
    },
    {
        name: "Assombrado",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você é assombrado por um ser desagradável. Ele conta no seu limite de parceiros, mas não fornece nenhum benefício. Além disso, no início de cada cena envolvendo qualquer tipo de risco ou perigo, role um dado. Em um resultado ímpar, você fica alquebrado até o fim da cena."
    },
    {
        name: "Cabeça Quente",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Sempre que você sofre dano, seu próximo turno deve ser dedicado a atacar a fonte do dano. Se não puder atacá-la, você deve gastar sua próxima ação de movimento esbravejando contra o ar."
    },
    {
        name: "Caolho",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você não tem um dos olhos. Você sofre –2 em Iniciativa, Percepção, Pontaria e Reflexos e fica automaticamente flanqueado por dois ou mais oponentes em corpo a corpo."
    },
    {
        name: "Chato",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Sempre que você sai de uma aldeia, uma festa acontece. Você sofre –5 em Diplomacia e a atitude inicial de NPCs em relação a você é uma categoria pior."
    },
    {
        name: "Combalido",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Por alguma razão, natural ou sobrenatural, sua saúde é frágil. Você sofre –5 em Fortitude e recebe –1 PV por nível de personagem."
    },
    {
        name: "Covarde",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você sofre –5 em testes de resistência contra efeitos de medo e, no início de cada cena envolvendo qualquer tipo de risco ou perigo, deve rolar um dado. Em um resultado ímpar, você fica abalado (mesmo que seja imune a isso)."
    },
    {
        name: "Cria de Nimb",
        type: "complication",
        category: "Geral",
        req: "Não ser devoto de Nimb",
        desc: "Você sofre –5 em testes de perícias baseadas em Carisma. No início de cada cena de ação, role 1d6. Com um resultado 1, você fica confuso. Você não pode escolher esta complicação se for devoto de Nimb ou seguir suas Obrigações & Restrições."
    },
    {
        name: "Criado na cidade",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você sofre –5 em Sobrevivência e, quando descansa nos ermos, sua recuperação é uma categoria pior (se já era ruim, recupera apenas 1 PV e 1 PM)."
    },
    {
        name: "Crise de Fé †",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você sofre –2 em Vontade e segue as Obrigações & Restrições de um deus, mas não recebe poderes concedidos nem conta como devoto para pré-requisitos. Você não pode ser devoto de outro deus."
    },
    {
        name: "Desprotegido",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você nunca aprendeu a se defender. Você sofre –2 na Defesa e em testes de resistência."
    },
    {
        name: "Distraído",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você é muito desligado. Você sofre –5 em Iniciativa e Percepção."
    },
    {
        name: "Emotivo",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Fadado a sofrer, você não se beneficia de efeitos que forneçam bônus numéricos (em atributos, testes, Defesa etc.) usados por outros personagens."
    },
    {
        name: "Expurgo de Wynna",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Algo em você não agrada à Deusa da Magia. Você sofre –5 em testes de resistência contra efeitos mágicos."
    },
    {
        name: "Fracote",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você nunca praticou atividades físicas. Você está permanentemente fraco (mesmo que seja imune a essa condição)."
    },
    {
        name: "Hedonista",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você está acostumado ao luxo. Em condições luxuosas, recupera PV/PM igual ao nível. Em confortáveis, metade do nível. Em normais/ruins, apenas 1 PV e 1 PM."
    },
    {
        name: "Ímpio",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você odeia os deuses. Você sofre –5 em testes de resistência contra magias divinas e não pode se beneficiar de efeitos dessas magias."
    },
    {
        name: "Impulsivo",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você age primeiro e pensa depois. Você sofre –5 em Furtividade e Investigação, e não pode fazer as ações atrasar e preparar."
    },
    {
        name: "Inculto",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você é analfabeto e recebe duas perícias treinadas a menos (isso pode reduzir as perícias a escolher a zero, mas não afeta as fixas de classe)."
    },
    {
        name: "Indolente",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você é apático e preguiçoso. Você sofre –5 em Reflexos e –3m em seu deslocamento."
    },
    {
        name: "Ingênuo",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Não há maldade em seu coração. Você sofre –5 em Enganação, Intuição, Investigação e Ladinagem."
    },
    {
        name: "Maneta",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você não tem uma das mãos. Você só pode empunhar um item (e não pode usar armas de duas mãos)."
    },
    {
        name: "Marcado pelo Passado",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Um evento em seu passado o deixou taciturno. Você sofre –5 em Diplomacia e recebe –1 PM por nível de personagem."
    },
    {
        name: "Matugo",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você fica alquebrado em ambientes urbanos. Ao descansar neles, sua recuperação é uma categoria pior (ou apenas 1 PV e 1 PM)."
    },
    {
        name: "Míope",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Dificuldade com objetos distantes. Sofre –5 em Percepção e Pontaria, e fica desprevenido contra efeitos além de alcance curto."
    },
    {
        name: "Mouco",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Sua audição é ruim. Você sofre –2 em Iniciativa, Intuição, Percepção e Reflexos."
    },
    {
        name: "Paladar infantil",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você não se beneficia de itens da categoria alimentação, nem de poções. Além disso, sofre –2 em testes de perícias baseadas em Carisma durante situações sociais baseadas em refeições."
    },
    {
        name: "Paranoico",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Precisa passar em Vontade (CD 20 + nível) para aceitar qualquer ajuda. Se falhar e for ajudado, fica alquebrado. Sua condição de descanso é sempre uma categoria pior."
    },
    {
        name: "Temeroso",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você sofre –5 em Luta e, enquanto estiver adjacente a um inimigo, fica abalado."
    },
    {
        name: "Tolo",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "É fácil enganá-lo e manipulá-lo. Você sofre –5 em Intuição e Vontade."
    },
    {
        name: "Vagaroso",
        type: "complication",
        category: "Geral",
        req: "Nenhum",
        desc: "Você está permanentemente sob efeito da condição lento (deslocamentos reduzidos à metade e não pode correr ou fazer investidas)."
    },

    // Complicações de Classe 

    {
        name: "Arcanista de Rotina",
        type: "complication",
        class: "arcanista",
        category: "Classe",
        req: "Arcanista",
        desc: "Você não está acostumado a lançar magias sob pressão. Se estiver em alcance curto de qualquer ameaça, é considerado sob condição ruim para lançar magias. Se já estiver sob efeito de uma condição ruim ou terrível para conjurar, a CD do teste aumenta em +2."
    },
    {
        name: "Foco Exigente",
        type: "complication",
        class: "arcanista",
        category: "Classe",
        req: "Bruxo",
        desc: "Seu foco o pune quando você falha. Sempre que uma criatura passa em um teste de resistência contra uma magia sua, você perde 1 PV por PM gasto na magia."
    },
    {
        name: "Linhagem Prepotente",
        type: "complication",
        class: "arcanista",
        category: "Classe",
        req: "Feiticeiro",
        desc: "Sua magia inata rejeita auxílio de cacarecos. Você não pode usar catalisadores e itens esotéricos mundanos. Você ainda pode usar itens esotéricos mágicos."
    },
    {
        name: "Mente Cansada",
        type: "complication",
        class: "arcanista",
        category: "Classe",
        req: "Mago",
        desc: "Para cada círculo de magia que você pode lançar, o total de magias que pode memorizar diminui em 1."
    },
    {
        name: "De Peito Aberto †",
        type: "complication",
        class: "barbaro",
        category: "Classe",
        req: "Bárbaro",
        desc: "Seja por tatuagens ou confiança na resistência, você não pode vestir armaduras e seu limite de itens vestidos diminui em dois."
    },
    {
        name: "Totem Gigante †",
        type: "complication",
        class: "barbaro",
        category: "Classe",
        req: "Bárbaro",
        desc: "Você carrega uma grande coluna de madeira esculpida que jamais pode abandonar. A coluna ocupa 10 espaços e impõe penalidade de armadura –5."
    },
    {
        name: "Estrelismo",
        type: "complication",
        class: "bardo",
        category: "Classe",
        req: "Bardo",
        desc: "Você é extremamente egocêntrico. Você sofre –5 em testes de Diplomacia e Intuição. Além disso, sempre que falha em um teste de Atuação, fica alquebrado até o fim da cena."
    },
    {
        name: "Falastrão",
        type: "complication",
        class: "bardo",
        category: "Classe",
        req: "Bardo",
        desc: "Você deve ser sempre o primeiro a falar. Você sofre –5 em testes de Furtividade e Nobreza e pode se envolver em diversos problemas diante de autoridades ou tentando ser discreto."
    },
    {
        name: "Coragem Líquida",
        type: "complication",
        class: "bucaneiro",
        category: "Classe",
        req: "Bucaneiro",
        desc: "No início do turno em cenas de perigo, role 1d4. Em um resultado 1, deve gastar uma ação de movimento para tomar um gole de bebida ou fica pasmo pela rodada."
    },
    {
        name: "Esbanjador",
        type: "complication",
        class: "bucaneiro",
        category: "Classe",
        req: "Bucaneiro",
        desc: "Para subir de nível, você deve 'torrar' tibares em festas e frivolidades, em um valor igual a 20% da diferença do dinheiro inicial do nível que vai alcançar para o atual."
    },
    {
        name: "Limitado a (Criatura)",
        type: "complication",
        class: "cacador",
        category: "Classe",
        req: "Caçador",
        desc: "Escolha um tipo de criatura do poder Inimigo de (Criatura). O custo base para usar Marca da Presa contra criaturas de outros tipos muda para 3 PM."
    },
    {
        name: "Superprotetor",
        type: "complication",
        class: "cavaleiro",
        category: "Classe",
        req: "Cavaleiro",
        desc: "Em cenas de risco, você deve terminar seu turno adjacente a um aliado. Se não o fizer, fica alquebrado e sofre –2 em seus testes por 1 rodada."
    },
    {
        name: "Divindade Exigente",
        type: "complication",
        class: "clerigo",
        category: "Classe",
        req: "Clérigo",
        desc: "Sempre que lançar uma magia divina, role 1d6. Em um resultado 1, você fica frustrado (esta condição é cumulativa)."
    },
    {
        name: "Preparação Litúrgica",
        type: "complication",
        class: "clerigo",
        category: "Classe",
        req: "Clérigo",
        desc: "Você só pode lançar magias preparadas. Precisa gastar uma hora orando para escolher metade das magias que conhece; apenas estas podem ser lançadas no dia."
    },
    {
        name: "Tosco †",
        type: "complication",
        class: "druida",
        category: "Classe",
        req: "Druida",
        desc: "Você não se dá bem com objetos civilizados. Você não pode usar itens superiores."
    },
    {
        name: "Precavido",
        type: "complication",
        class: "guerreiro",
        category: "Classe",
        req: "Guerreiro",
        desc: "Sofre –2 em ataques e resistência. Na segunda rodada, pode gastar ação de movimento e passar em teste de Guerra (CD 15 + ND do inimigo) para ignorar a penalidade."
    },
    {
        name: "Trabalhador Ocupado",
        type: "complication",
        class: "inventor",
        category: "Classe",
        req: "Inventor",
        desc: "Você não recebe a habilidade Protótipo e, quando recebe a habilidade Fabricar Item Superior, não recebe um item gratuito."
    },
    {
        name: "Honra de Ladrão †",
        type: "complication",
        class: "ladino",
        category: "Classe",
        req: "Ladino",
        desc: "Você sempre cumpre suas promessas e nunca rouba ou tira vantagem de pessoas com menos recursos que você e seu grupo."
    },
    {
        name: "Firula †",
        type: "complication",
        class: "lutador",
        category: "Classe",
        req: "Lutador",
        desc: "Na primeira rodada de cada combate, você deve gastar uma ação padrão apresentando-se, fazendo uma coreografia ou informando seu peso, altura e cartel."
    },
    {
        name: "Filantropo",
        type: "complication",
        class: "nobre",
        category: "Classe",
        req: "Nobre",
        desc: "Você doa parte de sua riqueza. Você não recebe a habilidade Espólio e, quando usa sua habilidade Riqueza, recebe apenas metade do valor normal."
    },
    {
        name: "Mimado",
        type: "complication",
        class: "nobre",
        category: "Classe",
        req: "Nobre",
        desc: "Na primeira vez em cada cena que falha em um teste de perícia, você perde 1 PM por patamar. Se estiver sem PM, fica frustrado por 1 rodada."
    },
    {
        name: "Certinho",
        type: "complication",
        class: "paladino",
        category: "Classe",
        req: "Paladino",
        desc: "Sempre que um aliado violar seu Código do Herói, conta como uma violação sua — a menos que você não note (Percepção/Intuição vs Enganação/Furtividade)."
    },

    //  - Complicações de Idade

    {
        name: "Abatido",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Seu vigor se foi. Você recebe –2 PV por nível de personagem."
    },
    {
        name: "Catarata",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Seus olhos já não são os mesmos. Você sofre –5 em Percepção e Pontaria."
    },
    {
        name: "Dedos Trêmulos",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você sofre –2 em Luta e Pontaria. Além disso, quando usa um item que esteja empunhando, role 1d4. Em um resultado 1, você derruba esse item."
    },
    {
        name: "Definhamento",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "A idade roubou seu peso, deixando-o um fiapo do que era antes. Você sofre –5 em Fortitude e em testes de manobras de combate."
    },
    {
        name: "Desatento",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você já não é mais tão atento quanto outrora. Na primeira rodada de qualquer cena de ação, role um dado. Em um resultado ímpar, você fica surpreendido (mesmo que um efeito possa evitar isso)."
    },
    {
        name: "“Devagar, Jovem!”",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você já não anda no mesmo ritmo que antes. Seu deslocamento diminui em –3m e você não pode correr ou fazer investidas."
    },
    {
        name: "Gota",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Sempre que faz um teste de Destreza ou de perícias baseadas nesse atributo você perde 1d6 pontos de vida. Você só pode recuperar esses PV com descanso."
    },
    {
        name: "Juntas Duras",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Suas articulações doem. Você sofre –5 em testes de Acrobacia e Reflexos."
    },
    {
        name: "Melancólico",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você já não tem mais tanta motivação para realizar grandes façanhas. Você perde 1 PM por nível de personagem."
    },
    {
        name: "Memórias Tristes",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Sempre que rola um resultado 1 natural em qualquer teste, você fica pasmo por 1 rodada e frustrado até o fim do dia (cumulativo)."
    },
    {
        name: "“No Meu Tempo...”",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você se prende a visões idealizadas do passado. Você sofre –5 em Intuição e Vontade."
    },
    {
        name: "Pulmão Ruim",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Precisa de testes de Fortitude para não fadigar ao correr/prender respiração desde a 1ª rodada. Investidas deixam você fatigado até o fim da cena."
    },
    {
        name: "Rabugento",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você reclama de tudo. Você sofre –5 em testes de Carisma e perícias baseadas nele, exceto Intimidação."
    },
    {
        name: "Recurvado",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "A idade dobrou suas costas. Você conta como uma categoria de tamanho menor para alcance natural, manobras e armas (mas não para espaço ou Furtividade)."
    },
    {
        name: "Sono Ruim",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Sua recuperação de PM e PV é sempre uma categoria pior. Se já for ruim, recupera apenas 1; se já recupera apenas 1, não recupera nada!"
    },
    {
        name: "Teimoso",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Sempre que falha em um teste que possa tentar novamente, é obrigado a tentar pelo menos mais uma vez."
    },
    {
        name: "Tosse",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Em ação, role 1d6 por rodada; no 1, fica atordoado. Em social, role 1d6 por teste de Carisma; no 1, sofre penalidade de –5."
    },
    {
        name: "Turrão",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Você tem dificuldade com o que não domina. Você não recebe o bônus de metade do nível em perícias nas quais não é treinado."
    },
    {
        name: "Velha Ferida",
        type: "complication",
        category: "Idade",
        req: "Nenhum",
        desc: "Sempre que sofre um crítico, o multiplicador de dano aumenta em +1 e você fica fraco (mesmo que seja imune, cumulativo)."
    },

    //outras fontes
    {
        name: "Escolhido dos Deuses",
        type: "destiny",
        category: "destino",
        req: "Origem Criação dos Deuses ou Serviço de Importância",
        desc: "Você recebe a atenção de uma divindade maior. Escolha um deus para receber seus traços e benefícios únicos (JH).",
        variants: [
            { deity: 'Aharadak', desc: 'Alterações físicas grotescas, semelhantes às de um lefou. Imunidade a metamorfose e +2 em uma perícia à sua escolha. Este poder conta como um poder da Tormenta.' },
            { deity: 'Allihanna', desc: 'Característica física de um animal. Pode falar com animais e, em terreno natural, gastar ação completa e 2 PM para invocar um animal que atua como parceiro iniciante até o fim do dia.' },
            { deity: 'Arsenal/Keen', desc: '–2 em Diplomacia, mas +1 em testes de ataque e margem de ameaça com armas. Esses bônus são dobrados com menos da metade dos PV.' },
            { deity: 'Azgher', desc: 'Pupilas em chamas. Ação de movimento e 1 PM: aura de 9m de iluminação solar que causa 1d6 de fogo a criaturas à sua escolha no início de seus turnos.' },
            { deity: 'Glórienn', desc: '+2 em perícias de Carisma contra não elfos e, uma vez por cena, ao passar em teste de perícia de Carisma, recebe 2 PM temporários.' },
            { deity: 'Hyninn', desc: 'Familiar raposa com deslocamento 12m, fornece +2 em Furtividade. Uma vez por rodada, gaste 1 PM para trocar de lugar com ela (até 30m, visível).' },
            { deity: 'Kallyadranoch', desc: 'Escamas em parte do corpo. Aprende e pode lançar uma magia de 1º círculo elemental à escolha (atributo Carisma). Se aprender novamente, custo –1 PM.' },
            { deity: 'Khalmyr', desc: 'Aparência altiva. Imunidade a encantamento e confusão. Efeitos de perda de vida contínua (sangramento etc.) causam apenas metade do efeito máximo.' },
            { deity: 'Lena', desc: 'Esfera de luz flutuante que pode iluminar como tocha. Pode transferir até 5 pontos de dano sofrido por aliados adjacentes para a esfera (capacidade = metade dos seus PV).' },
            { deity: 'Lin-Wu', desc: 'Cabelos prateados. Incapaz de mentir. Aura de 9m: criaturas sofrem –5 em Enganação e Furtividade; você e aliados recebem +2 em Vontade.' },
            { deity: 'Marah', desc: '+2 em Adestramento, Atuação e Diplomacia. Aura de calmaria de 9m: criaturas na área sofrem –2 em testes de ataque e rolagens de dano.' },
            { deity: 'Megalokk', desc: 'Aparência feral. Arma natural à escolha (dano 1d6, crítico x2). Uma vez por rodada, ao agredir com outra arma, gaste 1 PM para um ataque extra com a arma natural.' },
            { deity: 'Nimb', desc: 'Característica estética que muda. Gaste 1 PM para receber +2 em um atributo aleatório até o fim da cena.' },
            { deity: 'Oceano', desc: 'Guelras e membranas entre os dedos. Pode respirar debaixo d\'água e recebe deslocamento de natação igual ao deslocamento normal.' },
            { deity: 'Ragnar', desc: 'Traços goblinoides. +1 em rolagens de dano. Uma vez por rodada, ao reduzir inimigo a 0 PV, recupera 1 PM.' },
            { deity: 'Sszzaas', desc: 'Olhos serpentinos no escuro. +2 em Furtividade. Ao passar por 10+ em Furtividade contra um lacaio, ele esquece que você esteve presente.' },
            { deity: 'Tanna-Toh', desc: 'Mecha branca nos cabelos. Uma vez por cena, ao passar em Conhecimento/Guerra/Misticismo/Nobreza/Religião, recebe +1d6 para usar como bônus em outro teste relacionado.' },
            { deity: 'Tauron', desc: 'Pés em cascos. Gaste 2 PM para +4 em teste de Força. Se adjacente a aliado indefeso, custo reduzido em –1 PM.' },
            { deity: 'Tenebra', desc: 'Parte do corpo negra como noite sem luar. Gaste 2 PM: aura de sombras de 9m (sustentada) — camuflagem leve, redução de luz 5 e +5 em Furtividade para você e aliados.' },
            { deity: 'Thwor', desc: 'Roda do Akzath gravada nas costas. Uma vez por cena, +2 em um teste de perícia usada pela primeira vez naquela cena.' },
            { deity: 'Thyatis', desc: 'Cabelos vermelhos como chamas. Aprende Orientação (apenas em si mesmo). Se aprender novamente, custo –1 PM.' },
            { deity: 'Valkaria', desc: 'Marcas na pele e olhos/cabelos avermelhados. No início de cada aventura, escolha um objetivo e uma perícia relacionada: torna-se treinado nela (ou +2 se já for) até o fim da aventura.' },
            { deity: 'Wynna', desc: 'Runa mística tatuada no corpo. Escolha INT, SAB ou CAR: soma esse atributo ao total de PM (limitado pelo nível).' },
        ]
    },
    // ========================================================================
    // PODERES CONCEDIDOS: JORNADA HERÓICA / GUIA NPC
    // ========================================================================
    {
        name: "Arma de Morte",
        type: "conceded",
        category: "Ragnar",
        source: "jornada",
        req: "Devoto de Ragnar",
        desc: "Você pode gastar 1 PM para imbuir uma arma que estiver empunhando com energia sombria até o fim da cena. A arma causa +2 pontos de dano de trevas. Sempre que você reduzir um inimigo a 0 PV ou menos com a arma, esse bônus aumenta em +1 (aumento máximo limitado por sua Força)."
    },
    {
        name: "Arquearia de Outrora",
        type: "conceded",
        category: "Glórienn",
        source: "jornada",
        req: "Devoto de Glórienn",
        desc: "Você recebe proficiência em arco longo. Além disso, você considera todos os arcos como armas preferidas de Glórienn e, se tiver a habilidade Golpe Divino, pode usá-la em ataques à distância com arcos."
    },
    {
        name: "Aura Bélica",
        type: "conceded",
        category: "Keenn",
        source: "jornada",
        req: "Devoto de Keenn",
        desc: "Você pode gastar 2 PM para gerar uma aura belicosa com 9m de raio (dura a cena). Criaturas que entram ou começam o turno na área devem passar em Vontade (CD Car) ou realizar ao menos uma ação hostil contra seu alvo de menor atitude. Criaturas com códigos de não violência recebem +5 no teste. Sucesso garante imunidade por um dia."
    },
    {
        name: "Beleza Protetora",
        type: "conceded",
        category: "Glórienn",
        source: "jornada",
        req: "Devoto de Glórienn",
        desc: "Quando faz um teste de resistência ou de perícia para resistir a uma manobra de combate, você pode gastar 1 PM para somar o seu Carisma nesse teste."
    },
    {
        name: "Cura Desafiadora",
        type: "conceded",
        category: "Keenn",
        source: "jornada",
        req: "Devoto de Keenn",
        desc: "Quando lança uma magia de cura, você pode gastar +2 PM para que isso não viole suas Obrigações & Restrições perante Keenn."
    },
    {
        name: "Desprezar Cura",
        type: "conceded",
        category: "Keenn",
        source: "jornada",
        req: "Devoto de Keenn",
        desc: "Você recebe +2 em testes de ataque e dano com armas e RD 2 (valores aumentam em +1 por patamar). Entretanto, você não recupera pontos de vida por nenhum efeito, exceto descanso."
    },
    {
        name: "Esgrima do Povo Ancestral",
        type: "conceded",
        category: "Glórienn",
        source: "jornada",
        req: "Devoto de Glórienn",
        desc: "Você pode usar Destreza em vez de Força nos testes de ataque e dano com espadas curtas, longas e floretes. Se tiver Acuidade com Arma, recebe +1 em ataque e dano com estas armas."
    },
    {
        name: "Ginete Altivo",
        type: "conceded",
        category: "Hippion",
        source: "jornada",
        req: "Devoto de Hippion",
        desc: "Quando está montado em uma montaria, você pode gastar 1 PM para fazer um teste de Cavalgar como ação livre. Se passar, até o fim do seu próximo turno, sua montaria recebe +2 na Defesa e em testes de ataque."
    },
    {
        name: "Investida Tempestade",
        type: "conceded",
        category: "Benthos",
        source: "jornada",
        req: "Devoto de Benthos",
        desc: "Quando você faz uma investida, você pode gastar 3 PM para causar dano adicional igual ao dano que causou no turno anterior."
    },
    {
        name: "Legião Tapistana",
        type: "conceded",
        category: "Tauron",
        source: "jornada",
        req: "Devoto de Tauron",
        desc: "Gasta ação completa e 2 PM para invocar 1d4+1 legionários (alcance curto). Cada legionário adjacente a um aliado fornece +2 na Defesa (cumulativo). Se um ataque contra o protegido errar, um legionário desaparece. Legionários têm For 3, Des 0, Def 19, 1 PV e desaparecem no fim da cena."
    },
    {
        name: "Liberdade Irrestrita",
        type: "conceded",
        category: "Gwendolynn",
        source: "jornada",
        req: "Devoto de Gwendolynn",
        desc: "Você pode gastar 2 PM para ficar imune a efeitos de aprisionamento (como a magia Aprisionamento) por uma rodada."
    },
    {
        name: "Músculos Divinos",
        type: "conceded",
        category: "Tauron",
        source: "jornada",
        req: "Devoto de Tauron",
        desc: "Você pode gastar 1 PM para receber +2 em Força por uma rodada."
    },
    {
        name: "Proteger os Fracos",
        type: "conceded",
        category: "Tauron",
        source: "jornada",
        req: "Devoto de Tauron",
        desc: "Você pode gastar 2 PM para fornecer +2 na Defesa e em testes de resistência de um aliado em alcance curto até o fim da cena (ou até usar em outro alvo)."
    },
    {
        name: "Salto Anurídeo",
        type: "conceded",
        category: "Inghlblhpholtsgt",
        source: "jornada",
        req: "Devoto de Inghlblhpholtsgt",
        desc: "Quando você usa uma ação de movimento, você pode gastar 2 PM para pular uma distância igual ao seu deslocamento. Se pousar em uma criatura que não seja um aliado, essa criatura fica atolada."
    },
    {
        name: "Sede de Batalha",
        type: "conceded",
        category: "Keenn",
        source: "jornada",
        req: "Devoto de Keenn",
        desc: "Em combate real, você ganha 1 PM temporário no início de cada um de seus turnos. O máximo de PM ganho por cena desta forma é igual ao seu nível."
    },
    {
        name: "Toque da Ruína",
        type: "conceded",
        category: "Ragnar",
        source: "jornada",
        req: "Devoto de Ragnar",
        desc: "Gasta 1 PM e ação padrão para causar 2d12 de trevas no toque (Fort CD Sab reduz metade). Se o alvo cair a 0 PV, vira pó e você ganha PV temporários igual ao dano. Pode aprender Desintegrar como magia divina com custo -1 PM."
    },
    {
        name: "Vingança Élfica",
        type: "conceded",
        category: "Glórienn",
        source: "jornada",
        req: "Devoto de Glórienn",
        desc: "Você recebe +1d6 em rolagens de dano contra goblinoides (goblins, hobgoblins e bugbears) e duyshidakk."
    },

    // ========================================================================
    // ESCOLHIDO DOS DEUSES (JORNADA HERÓICA)
    // ========================================================================
    {
        name: "Escolhido de Aharadak",
        type: "conceded",
        category: "Aharadak",
        source: "jornada",
        req: "Devoto de Aharadak",
        desc: "Você possui alterações físicas grotescas, semelhantes às de um lefou. Você se torna imune a metamorfose e recebe +2 em uma perícia a sua escolha (não cumulativo com a habilidade Deformidade dos lefou). Este poder conta como um poder da Tormenta"
    },
    {
        name: "Escolhido de Allihanna",
        type: "conceded",
        category: "Allihanna",
        source: "jornada",
        req: "Devoto de Allihanna",
        desc: "Você possui uma característica física de um animal, como orelhas de lobo, cauda de raposa ou um bico no lugar do nariz. Você pode falar com animais (como a magia Voz Divina; se já faz isso, recebe +2 em Adestramento) e, se estiver em terreno natural, pode gastar uma ação completa e 2 PM para invocar um animal à sua escolha. O animal invocado surge em 1d4 minutos e atua como um parceiro iniciante de um tipo a sua escolha até ser dispensado ou até o fim do dia. O mestre tem a palavra final sobre quais animais e tipos de parceiros estão disponíveis em uma determinada área."
    },
    {
        name: "Escolhido de Arsenal",
        type: "conceded",
        category: "Arsenal",
        source: "jornada",
        req: "Devoto de Arsenal",
        desc: "Você projeta uma aura de austeridade e perigo que pode ser incômoda aos demais; você sofre –2 em Diplomacia. Entretanto, você recebe +1 em testes de ataque e na margem de ameaça com armas. Estes bônus são dobrados enquanto você estiver com menos da metade de seus PV."
    },
    {
        name: "Escolhido de Azgher",
        type: "conceded",
        category: "Azgher",
        source: "jornada",
        req: "Devoto de Azgher",
        desc: "Suas pupilas possuem a aparência de chamas em constante movimento. Você pode gastar uma ação de movimento e 1 PM para gerar uma aura com 9m de raio a partir de você e duração sustentada. Esta aura ilumina como a luz do sol e, no início de seus turnos, causa 1d6 pontos de dano de fogo a criaturas a sua escolha dentro dela. Se for um paladino de Azgher e usar esta aura junto com sua Aura Sagrada, você pode sustentar ambas por apenas 1 PM.*"
    },
    {
        name: "Escolhido de Glórienn",
        type: "conceded",
        category: "Glórienn",
        source: "jornada",
        req: "Devoto de Glórienn",
        desc: "Você possui uma perfeição que quase se iguala à dos elfos. Você recebe +2 em testes de perícias baseadas em Carisma contra não elfos e, uma vez por cena, se passar em um teste de perícia baseada em Carisma, recebe 2 PM temporários."
    },
    {
        name: "Escolhido de Hyninn",
        type: "conceded",
        category: "Hyninn",
        source: "jornada",
        req: "Devoto de Hyninn",
        desc: "Você possui um familiar raposa. Ela tem deslocamento 12m e fornece +2 em Furtividade e, uma vez por rodada, você pode gastar 1 PM para trocar de lugar com ela, desde que esteja a no máximo 30m dela e possa vê-la. Se perder sua raposa, ela reaparece após 24 horas.*"
    },
    {
        name: "Escolhido de Kallyadranoch",
        type: "conceded",
        category: "Kallyadranoch",
        source: "jornada",
        req: "Devoto de Kallyadranoch",
        desc: "Uma parte de seu corpo possui escamas em um padrão de cores à sua escolha. Além disso, você aprende e pode lançar uma magia de 1º círculo de ácido, eletricidade, fogo, frio, luz ou trevas a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.*"
    },
    {
        name: "Escolhido de Khalmyr",
        type: "conceded",
        category: "Khalmyr",
        source: "jornada",
        req: "Devoto de Khalmyr",
        desc: "Você possui uma aparência altiva e nobre. Você tem imunidade a encantamento e efeitos de confusão e efeitos que causam perda de vida contínua (como sangramento) em você causam apenas metade do efeito máximo (arredondado para baixo)."
    },
    {
        name: "Escolhido de Lena",
        type: "conceded",
        category: "Lena",
        source: "jornada",
        req: "Devoto de Lena",
        desc: "Você é permanentemente acompanhado por uma pequena esfera de luz que flutua ao seu redor. Ao seu comando, essa esfera pode emanar luz como uma tocha. Além disso, sempre que uma criatura em alcance curto sofre dano, você pode transferir até 5 pontos desse dano para a esfera. A esfera pode armazenar um total de pontos de dano igual à metade dos seus PV, e elimina uma quantidade de dano armazenado a cada dia igual ao total de PV que você recuperar por descanso.*"
    },
    {
        name: "Escolhido de Lin-Wu",
        type: "conceded",
        category: "Lin-Wu",
        source: "jornada",
        req: "Devoto de Lin-Wu",
        desc: "Seus cabelos, ou o equivalente, são prateados como os de um dragão celestial. Infundido com a essência do que é ser honrado, você é incapaz de mentir ou enganar outros seres (em termos de jogo, você segue as Obrigações & Restrições de Lin-Wu). Entretanto, você projeta uma aura de honradez de 9m de raio. Criaturas nessa área sofrem –5 em Enganação e Furtividade e você e seus aliados na área recebem +2 em Vontade."
    },
    {
        name: "Escolhido de Marah",
        type: "conceded",
        category: "Marah",
        source: "jornada",
        req: "Devoto de Marah",
        desc: "Sua aparência, sua voz e seus movimentos são dotados de beleza e graça celestiais. Você recebe +2 em Adestramento, Atuação e Diplomacia. Além disso, você emana uma aura de calmaria de 9m de raio; criaturas nessa área sofrem –2 em testes de ataque e rolagens de dano."
    },
    {
        name: "Escolhido de Megalokk",
        type: "conceded",
        category: "Megalokk",
        source: "jornada",
        req: "Devoto de Megalokk",
        desc: "Seu corpo assume uma aparência feral, com pelos, carapaça ou outra característica monstruosa. Além disso, você recebe uma arma natural (dano 1d6, crítico x2) escolhida entre cauda (impacto), chifres (perfuração) ou mordida (perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com essa arma."
    },
    {
        name: "Escolhido de Nimb",
        type: "conceded",
        category: "Nimb",
        source: "jornada",
        req: "Devoto de Nimb",
        desc: "Uma característica estética de seu corpo se altera de tempos em tempos. Pode ser a cor dos seus cabelos ou olhos, uma marca ou tatuagem na pele, ou mesmo sua própria voz. Além disso, você pode gastar 1 PM para receber +2 em um atributo, determinado aleatoriamente ao usar este poder, até o fim da cena (esse aumento não oferece PV, PM ou perícias adicionais). Você pode usar este poder múltiplas vezes na mesma cena, mas bônus no mesmo atributo não são cumulativos.*"
    },
    {
        name: "Escolhido de Oceano",
        type: "conceded",
        category: "Oceano",
        source: "jornada",
        req: "Devoto de Oceano",
        desc: "Você possui guelras e membranas entre os dedos. Você pode respirar debaixo d’água e recebe deslocamento de natação igual ao seu deslocamento normal (se já tem um deslocamento de natação, em vez disso recebe camuflagem total dentro d’água)."
    },
    {
        name: "Escolhido de Ragnar",
        type: "conceded",
        category: "Ragnar",
        source: "jornada",
        req: "Devoto de Ragnar",
        desc: "Você possui traços físicos goblinoides perceptíveis, como se tivesse um antepassado desta raça. Você recebe +1 em rolagens de dano. Além disso, uma vez por rodada, quando você reduz um inimigo a 0 PV, recupera 1 PM."
    },
    {
        name: "Escolhido de Sszzaas",
        type: "conceded",
        category: "Sszzaas",
        source: "jornada",
        req: "Devoto de Sszzaas",
        desc: "Sob escuridão total, seus olhos se tornam amarelados e suas pupilas verticais e alongadas, como as de serpentes. Exceto por isso, você é “comum”. De fato, exageradamente comum. Você recebe +2 em Furtividade e, sempre que passa por 10 ou mais num teste de Furtividade oposto a uma criatura lacaio, ela esquece que você esteve presente na cena."
    },
    {
        name: "Escolhido de Tanna-Toh",
        type: "conceded",
        category: "Tanna-Toh",
        source: "jornada",
        req: "Devoto de Tanna-Toh",
        desc: "Você possui uma mecha branca em seus cabelos (ou equivalente). Uma vez por cena, se passar em um teste de Conhecimento, Guerra, Misticismo, Nobreza ou Religião, você recebe +1d6 que pode ser usado como bônus em outro teste de perícia na mesma cena, relacionado a esse teste."
    },
    {
        name: "Escolhido de Tauron",
        type: "conceded",
        category: "Tauron",
        source: "jornada",
        req: "Devoto de Tauron",
        desc: "Seus pés são cascos, como os de um minotauro. Quando faz um teste de Força ou de perícia baseada em Força, você pode gastar 2 PM para receber +4 nesse teste. Se você estiver adjacente a um aliado indefeso, o custo deste poder é reduzido em –1 PM."
    },
    {
        name: "Escolhido de Tenebra",
        type: "conceded",
        category: "Tenebra",
        source: "jornada",
        req: "Devoto de Tenebra",
        desc: "Uma parte do seu corpo, como seus cabelos, olhos, asas ou chifres (se os tiver) é negra como uma noite sem luar. Você pode pagar 2 PM para emanar uma aura de sombras em um raio de 9m com duração sustentada. Você e seus aliados na área recebem camuflagem leve por escuridão leve, redução de luz 5 e +5 em Furtividade.*"
    },
    {
        name: "Escolhido de Thwor",
        type: "conceded",
        category: "Thwor",
        source: "jornada",
        req: "Devoto de Thwor",
        desc: "Você possui a Roda do Akzath gravada em suas costas, como uma tatuagem, cicatriz ou outra forma apropriada à sua pele. Uma vez por cena, você pode receber +2 em um teste de uma perícia que esteja usando pela primeira vez naquela cena."
    },
    {
        name: "Escolhido de Thyatis",
        type: "conceded",
        category: "Thyatis",
        source: "jornada",
        req: "Devoto de Thyatis",
        desc: "Seus cabelos são vermelhos e ondulados, como chamas crepitantes. Você aprende e pode lançar Orientação, mas apenas em você. Se aprender novamente esta magia, seu custo é reduzido em –1 PM."
    },
    {
        name: "Escolhido de Valkaria",
        type: "conceded",
        category: "Valkaria",
        source: "jornada",
        req: "Devoto de Valkaria",
        desc: "Sua pele possui marcas semelhantes às da pele da deusa e seus olhos, ou seu cabelo, exibem o mesmo tom avermelhado dos cabelos dela. Além disso, em seu coração arde a chama da ambição. No início de cada aventura, você pode escolher um objetivo específico (que pode ser algo pessoal ou relacionado à própria aventura) e uma perícia relacionada a este objetivo. Até o fim da aventura, você se torna treinado na perícia escolhida ou, se já for treinado, recebe +2 nela. O mestre deve aprovar tanto o objetivo quanto a perícia escolhidos."
    },
    {
        name: "Escolhido de Wynna",
        type: "conceded",
        category: "Wynna",
        source: "jornada",
        req: "Devoto de Wynna",
        desc: "Você possui uma runa mística, que representa o nome que Wynna lhe deu, tatuada em algum lugar do seu corpo. Escolha um de seus atributos entre Inteligência, Sabedoria ou Carisma. Você soma o atributoescolhido em seu total de PM (limitado por seu nível)."
    },
    {
        name: "Caminho da Mão Vazia",
        type: "combat",
        category: "Geral",
        req: "Briga ou Estilo Desarmado, Sab 1, ser treinado por Kasumi",
        desc: "Você pode gastar uma ação de movimento e 2 PM para realizar uma coreografia. Até o fim da cena, sempre que faz um teste de ataque desarmado, você rola dois dados e usa o melhor resultado."
    },
    {
        name: "Enigma da Espada",
        type: "combat",
        category: "Geral",
        req: "Proficiência com espada enigma, treinado em Conhecimento e Luta",
        desc: "Ao trocar o modo da espada enigma (Conhecimento), pode usar o resultado como um teste para ajudar seu próximo ataque no turno (acerto e dano). Uma vez por rodada, se acertar com a arma, pode gastar PM (limite modos usados) para causar 1d10 de perda de vida por PM gasto."
    },
    {
        name: "Método Zaratt",
        type: "combat",
        category: "Geral",
        req: "Proficiente com katar, Briga ou Estilo Desarmado, Esquiva, Foco em Arma (ataque desarmado ou katar)",
        desc: "Pode usar habilidades de ataque desarmado com katar. Bônus para um se aplicam ao outro (não acumula). Se acertar o mesmo alvo com katar e desarmado no turno, gasta 2 PM para ataque adicional com katar somando o dano fixo do desarmado ao dano desse ataque."
    },
    {
        name: "Ás da Cozinha",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Treinado em Ofício (cozinheiro), 5º nível de personagem",
        desc: "Aprende três receitas (e mais três nos patamares campeão e lendário). Pode acumular benefícios de dois pratos especiais em um só preparo (CD do prato mais difícil +5; gasta ingredientes de ambos)."
    },
    {
        name: "Bom de Garfo",
        type: "destiny",
        category: "Geral",
        source: "herois",
        req: "Con 1",
        desc: "Recebe +3 PV por patamar e pode comer até dois pratos especiais por dia, acumulando seus benefícios (bônus iguais não se acumulam)."
    },

    {
        name: "Presente de Wynlla",
        type: "magic",
        category: "Geral",
        source: "Atlas",
        req: "lançar magia arcana. Especial: Para nativos de Wynlla, este poder é parte da lista de poderes das seguintes origens: Acólito, Aristocrata, Artesão, Artista, Assistente de Laboratório, Curandeiro, Estudioso, Guarda, Marujo, Membro de Guilda, Mercador, Minerador, Soldado, Trabalho",
        desc: "Escolha uma magia arcana de 1° círculo que você saiba lançar. Quanto lança esta magia, o custo total de seus aprimoramentos é reduzido em -1 PM. Quando em Wynlla, o efeito se torna reduzir o custo de aprimoramentos de suas magias arcanas no valor de seu atributo chave. Estes efeitos são cumulativos com reducão de custo básico da magia."
    },

    // ========================================================================
    // PODERES GERAIS: DRAGÃO BRASIL
    // ========================================================================
    {
        name: "Certificado de Conclusão",
        type: "destiny",
        category: "Geral",
        source: "dragaobrasil",
        req: "Especial: Estudar por um mês na Caravana das Três Chamas. Só pode ser aprendido dessa maneira.",
        desc: "Você recebe +1 PM e escolhe uma magia entre: <i>Alarme</i>, <i>Aviso</i>, <i>Criar Elementos</i> ou <i>Luz</i> (atributo Inteligência, sem aprimoramentos). Se aprender novamente a magia depois, ela custa –1 PM e permite aplicar aprimoramentos normalmente."
    },
    {
        name: "Percepção de Masmorra",
        type: "conceded",
        category: "Hyninn",
        source: "dragaobrasil",
        req: "Devoto de Hyninn",
        desc: "Uma vez por cena, você tem sucesso automático em testes de Investigação para encontrar armadilhas realizados no subterrâneo ou dentro de uma masmorra."
    },
    {
        name: "Previdência da Vigília",
        type: "destiny",
        category: "Geral",
        source: "dragaobrasil",
        req: "Especial: Contribuir com a Vigília das Segundas Chances ou realizar juramento para Thyatis.",
        desc: "Você recebe o poder Dom da Imortalidade, mas só pode usá-lo na primeira vez que morrer na campanha."
    },

];


