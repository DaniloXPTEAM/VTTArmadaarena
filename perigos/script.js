const perigos = [
  {
    origem: "Tormenta 20 JdA",
    nd: "4",
    tipo: "Desastre Natural",
    nome: "Avalanche",
    imagem: "https://i.gifer.com/7Npe.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar da avalanche.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo tem <strong>5 rodadas</strong> para se afastar dos escombros.</li>
        <li>Ao final, a posição de cada personagem é determinada pelos <strong>sucessos acumulados</strong> nas ações <em>Correr</em> ou <em>Carregar Outro</em>:</li>
        <ul>
          <li><strong>2 ou menos sucessos:</strong> Fica na <strong>zona de soterramento</strong> e sofre <strong>16d6 de dano de impacto</strong>, ficando <strong>soterrado</strong>.</li>
          <li><strong>3 ou 4 sucessos:</strong> Fica na <strong>zona de deslizamento</strong> e sofre <strong>8d6 de dano de impacto</strong>.</li>
          <li><strong>5 ou mais sucessos:</strong> <strong>Escapa ileso</strong>.</li>
        </ul>
      </ul>
      <hr>
      <ul>
        <li><strong>Percepção:</strong> Um teste de <strong>Sobrevivência (CD 20)</strong> permite perceber a avalanche. Sucesso concede uma <strong>ação adicional</strong> na primeira rodada.</li>
        <li><strong>Soterrado:</strong> Um personagem soterrado:
          <ul>
            <li>Fica <strong>imóvel</strong>.</li>
            <li>Sofre <strong>1d6 de dano</strong> no início de cada turno.</li>
            <li>Para se soltar (ou soltar um aliado), é necessário um teste de <strong>Força (CD 25)</strong>.</li>
            <li>Aliados podem ajudar (ver p. 221).</li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Correr (Atletismo CD 20):</strong> Corre para longe da avalanche. Um sucesso com margem de 10+ ou um 20 natural conta como <strong>2 sucessos</strong>. Pode ser substituído por <em>Cavalgar</em> ou <em>Pilotagem</em>.</li>
        <li><strong>Carregar Outro (Atletismo CD 25):</strong> Carrega um aliado próximo. Se passar, <strong>ambos ganham 1 sucesso</strong>.</li>
        <li><strong>Procurar Caminho (Percepção CD 20):</strong> Analisa o terreno. Se passar, ganha <strong>+5</strong> nos testes de <em>Correr</em> e <em>Carregar Outro</em>.</li>
      </ul>
    `
  },
  {
    origem: "Tormenta 20 JdA",
    nd: "2",
    tipo: "Viagem",
    nome: "Jornada pelos Ermos",
    imagem: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2863640/extras/MidnightWalk_potboyRun_600x338.gif?t=1742834125",
    efeito: `
      <ul>
        <li><strong>Objetivo:</strong> Chegar ao destino.</li>
      </ul>
      <hr>
      <ul>
        <li>
          <strong>Efeito:</strong> O grupo deve acumular uma quantidade de <strong>sucessos</strong> em testes, conforme a distância da jornada:
          <ul>
            <li><strong>Curta:</strong> até outro reino na mesma região — <strong>3 testes</strong></li>
            <li><strong>Média:</strong> até outra região (ex: do Reinado às Repúblicas Livres) — <strong>5 testes</strong></li>
            <li><strong>Longa:</strong> até regiões longínquas (ex: Deserto da Perdição, Lamnor) — <strong>7 testes</strong></li>
          </ul>
          Para cada <strong>falha</strong>, os personagens sofrem <strong>2d6 pontos de dano</strong>, representando cansaço e desgaste. Esse dano só pode ser curado <strong>um dia após</strong> o fim da jornada.<br><br>
          Se o grupo acumular <strong>3 falhas</strong>, cada personagem perde <strong>1 PM máximo por nível</strong> na próxima aventura, como reflexo do esgotamento extremo.
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li>
          <strong>Avançar (Sobrevivência ou outra, CD variável):</strong> Os personagens se revezam realizando testes até acumularem os sucessos exigidos (ou atingirem 3 falhas).
          <ul>
            <li>Os testes podem ser de <strong>Sobrevivência</strong> ou qualquer outra perícia que o jogador consiga justificar e o mestre aprove.</li>
            <li>Exemplos:
              <ul>
                <li><strong>Pilotagem:</strong> se o personagem tiver um veículo para levar o grupo.</li>
                <li><strong>Diplomacia:</strong> para pedir abrigo ou indicações (se houver pessoas no caminho).</li>
              </ul>
            </li>
            <li><strong>Nota:</strong> Cada perícia diferente de Sobrevivência só pode ser usada <strong>uma vez por jornada</strong>.</li>
          </ul>
        </li>
        <li>
          <strong>CD conforme o terreno:</strong>
          <ul>
            <li><strong>15</strong> – Planícies e colinas</li>
            <li><strong>20</strong> – Florestas e pântanos</li>
            <li><strong>25</strong> – Desertos ou montanhas</li>
            <li><strong>30</strong> – Regiões planares perigosas ou áreas de Tormenta</li>
          </ul>
        </li>
      </ul>
      <hr>
      <ul>
        <li>
          <strong>Nota para o Mestre:</strong> Este perigo é um <em>teste estendido</em>, utilizando a <strong>variante de testes abertos</strong> (veja p. 223). Recomendado usá-lo com as regras de “<strong>Jornadas em Montagem</strong>” (p. 267) para resolver viagens de forma ágil.
          <ul>
            <li>O grupo sempre <strong>chegará ao destino</strong> — o risco está no estado em que chegam.</li>
            <li>Para jornadas que possam <strong>falhar de verdade</strong>, considere reiniciar a viagem após 3 falhas, indicando que o grupo se perdeu e teve que retornar.</li>
            <li>Para aventuras mais detalhadas, é possível expandir este sistema com regras para mantimentos, encontros aleatórios, perigos ambientais, etc. Nesse caso, trata-se de uma aventura completa, e não apenas um perigo.</li>
          </ul>
        </li>
      </ul>
    `
  },

  {
    origem: "Tormenta 20 JdA",
    nd: "9",
    tipo: "Armadilha de Masmorra",
    nome: "Sala Esmagadora",
    imagem: "https://i.makeagif.com/media/1-13-2023/R9-LFa.gif",
    efeito: `
      <strong>Objetivo:</strong> Abrir a porta e sair da sala ou desabilitar o mecanismo.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo cai em uma armadilha. A porta se fecha e as paredes se movem.</li>
        <li><strong>3 rodadas</strong> para escapar.</li>
        <li>Na <strong>quarta rodada</strong>: 10d6 de dano de impacto a todos que estiverem na sala.</li>
        <li>Na <strong>quinta rodada</strong>: morte instantânea a quem permanecer na sala.</li>
        <li><strong>Âncora Dimensional</strong>: bloqueia teleporte e viagens planares.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Derrubar Porta (Força CD 30):</strong> Acumular <strong>3 sucessos</strong>. Máximo 2 personagens por rodada.</li>
        <li><strong>Desabilitar Mecanismo (Ladinagem CD 30):</strong> Acumular <strong>3 sucessos</strong> desativa o mecanismo permanentemente.</li>
        <li><strong>Segurar Paredes (Força CD 25):</strong> Cada <strong>2 sucessos</strong> concede <strong>+1 rodada extra</strong>.</li>
      </ul>
    `
  },

  {
    origem: "Tormenta 20 JdA",
    nd: "6",
    tipo: "Viagem Climática",
    nome: "Tempestade em Alto Mar",
    imagem: "https://gifdb.com/images/high/intense-sinking-ship-6umyix3jg0hqpj6l.webp",
    efeito: `
    <strong>Objetivo:</strong> Sobreviver à fúria do mar.
    <hr>
    <strong>Efeito:</strong>
    <ul>
      <li>Duração: 1d6+6 rodadas.</li>
      <li>No início do turno, teste de Reflexos (CD 20 + 1d6):
        <ul>
          <li>Falha: sofre 4d6 de dano de impacto.</li>
          <li>Falha por 10 ou mais: dano + cair no mar.</li>
          <li>No mar: falha automática.</li>
        </ul>
      </li>
      <li><strong>Percepção (Sobrevivência CD 20):</strong> Concede ação adicional na primeira rodada.</li>
    </ul>
    <hr>
    <h6 class="text-danger"><strong>Testes:</strong></h6>
    <ul>
      <li><strong>Navegar (Pilotagem CD 25):</strong> Reduz a duração da tempestade.</li>
      <li><strong>Ajudar o Piloto (CD variável):</strong> Ajuda com qualquer perícia justificada.</li>
      <li><strong>Esconder-se:</strong> Reduz CD para Reflexos, mas impede ajudar ou pilotar.</li>
      <li><strong>Voltar para o Navio (Atletismo CD 25):</strong> Exige 2 sucessos. Falha por 5+: afunda.</li>
    </ul>
  `
  },
  {
    origem: "Ameaças de Arton",
    nd: "17",
    tipo: "Encontro em Viagem",
    nome: "Vagalhão Kobold",
    imagem: "https://i.imgflip.com/9q25pb.gif",
    efeito: `
      <strong>Objetivo:</strong> Sobreviver ao frenesi selvagem.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Duração: 1d8+6 rodadas.</li>
        <li>Teste de Fortitude (CD 40 + 1d10):
          <ul>
            <li>Falha: 12d12 de dano de corte.</li>
            <li>Falha por 5+: dano + fica caído.</li>
          </ul>
        </li>
        <li>Armadura avariada. Sem armadura: +2d12 de dano.</li>
        <li>No fim da rodada: role para roubo de itens mágicos.
          <ul>
            <li>CD para recuperar: Sobrevivência CD 35 + rodadas.</li>
            <li>25% de chance de destruição.</li>
          </ul>
        </li>
        <li><strong>Enxame:</strong> Imune a manobras, efeitos de alvo único, sofre metade de armas, vulnerável a dano em área.</li>
        <li><strong>600 de dano em 1 rodada:</strong> duração –1 rodada, próximo turno com dano reduzido e sem roubo/avaria.</li>
        <li><strong>Percepção (CD 35):</strong> Concede ação adicional.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Atacar (Def 50):</strong> Sofre –5 à distância. Cada erro corpo a corpo: 4d12 de dano.</li>
        <li><strong>Conjurar (Vontade CD 35 + PM):</strong> Falha: perde PM e magia.</li>
        <li><strong>Esconder Item (Ladinagem CD 35):</strong> Usa 1d10 para checar roubo em vez do padrão.</li>
        <li><strong>Latir (Atuação ou Enganação CD 35):</strong> Imune a efeitos do vagalhão por 1 rodada, mas acumula –1 em perícias.</li>
        <li><strong>Levantar-se (Atletismo ou Acrobacia CD 35):</strong> Levanta-se da massa kobold.</li>
        <li><strong>Proteger-se:</strong> +5 no próximo teste de Fortitude.</li>
        <li><strong>Ajudar (CD variável):</strong> Usa qualquer perícia justificada para ajudar aliados.</li>
      </ul>
    `
  },

  {
    origem: "Ameaças de Arton",
    nd: "10",
    tipo: "Exploração Perigosa",
    nome: "Biblioteca em Ruínas",
    imagem: "https://media.tenor.com/Vs2yOGEQXMoAAAAM/dr-who-doctor-who.gif",
    efeito: `
      <ul>
        <li><strong>Objetivo:</strong> Obter a informação necessária antes que a biblioteca desabe.</li>
      </ul>
      <hr>
      <ul>
        <li>
          <strong>Efeito:</strong> O grupo precisa acumular <strong>6 sucessos</strong> nas ações listadas em até <strong>4 rodadas</strong>.
          <ul>
            <li>Na <strong>5ª rodada</strong>, a biblioteca entra em colapso — quem estiver dentro sofre <strong>12d6 de dano de impacto</strong>.</li>
            <li>Na <strong>6ª rodada</strong>, ela desaba completamente — quem estiver dentro sofre <strong>20d6 de dano de impacto</strong>.</li>
          </ul>
          <br>
          <strong>Evento Aleatório (1d6 no início de cada rodada):</strong>
          <ul>
            <li><strong>1-3)</strong> <em>Desmoronamento de livros:</em> Estantes caem. Cada personagem sofre <strong>4d6 de dano de impacto</strong> (Reflexos CD 25 evita).</li>
            <li><strong>4)</strong> <em>Pequeno incêndio:</em> Qualquer personagem pode abrir mão da ação para apagá-lo (Destreza CD 15). Enquanto ativo, a CD de todos os testes aumenta em +2 por rodada.</li>
            <li><strong>5)</strong> <em>Fissura no chão:</em> Testar Acrobacia ou Atletismo (CD 25). Falha causa tropeço e penalidade de –5 na próxima ação.</li>
            <li><strong>6)</strong> <em>Bloqueio:</em> Um personagem aleatório enfrenta um desabamento. Pode desistir da ação ou testar Atletismo (CD 25). Se falhar, perde a ação e sofre 4d6 de dano.</li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Usar Biblioteca (Investigação CD 22):</strong> Percorre os corredores em busca de livros úteis.</li>
        <li><strong>Ajuda Esotérica (Misticismo ou Religião CD 22):</strong> Para temas mágicos ou divinos.</li>
        <li><strong>Julgar pela Capa (Conhecimento CD 22):</strong> Busca títulos relacionados. Sucesso por 10+ (ou 20 natural) vale como dois sucessos.</li>
        <li><strong>Palpite Fortuito (Intuição CD 22):</strong> Usa intuição para escolher livros úteis.</li>
        <li><strong>Coordenar Pesquisa (Conhecimento CD 10):</strong> Ajuda os colegas. Não gera sucesso, mas dá bônus a todos na rodada.</li>
      </ul>
    `
  },

  {
    origem: "Ameaças de Arton",
    nd: "2",
    tipo: "Conflito Urbano",
    nome: "Briga de Taverna",
    imagem: "https://i.gifer.com/PNw.gif",
    efeito: `
    <ul>
      <li><strong>Objetivo:</strong> Ficar de pé até o fim. A briga dura <strong>1d6+2 rodadas</strong>.</li>
    </ul>
    <hr>
    <ul>
      <li>
        <strong>Efeito:</strong> No início de cada rodada, todos sofrem <strong>2d6+4 de dano de impacto não letal</strong>.
        <ul>
          <li>Quem chegar a 0 PV ou menos não sofre mais dano (brigões têm princípios!).</li>
          <li>Dano letal atrai a ira geral: o personagem passa a sofrer <strong>+1d6+2</strong> de dano extra por rodada a cada uso de dano letal.</li>
        </ul>
      </li>
    </ul>
    <hr>
    <h6 class="text-danger"><strong>Ações:</strong></h6>
    <ul>
      <li><strong>Brigar (Defesa 16):</strong> Ataque. Se causar 15+ de dano, nocauteia o oponente mais próximo e <strong>não sofre dano</strong> na próxima rodada.</li>
      <li><strong>Apartar (Diplomacia ou Intimidação CD 20):</strong> Reduz a duração da briga em 1 rodada.</li>
      <li><strong>Bater Carteiras (Ladinagem CD 20):</strong> Rouba no caos. Sucesso: <strong>T$ 2d8</strong>. Falha por 5+ faz ser pego e sofrer <strong>+1d6 de dano</strong> na próxima rodada.</li>
      <li><strong>Lançar Magia (Von CD 15 + PM):</strong> Lança uma magia. Efeitos a critério do mestre.</li>
      <li><strong>Sair de Fininho (Furtividade CD 20):</strong> Tenta sair da confusão. Se passar, tem <strong>50% de chance</strong> (par no 1d6) de evitar dano na próxima rodada.</li>
    </ul>
  `
  },

  {
    origem: "Ameaças de Arton",
    nd: "5",
    tipo: "Fenômeno Mágico",
    nome: "Ciclone Arcano",
    imagem: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhjzp7giAy3f8O2R-3rtdMphmat2FeJ0gkl79PWjeaQ409pyQmRcnUw879LWOhkT5myzyGWOmbhZrED0OetkSd-Lq7fN1t4iJpHGkZyx_c-fj0Ltu8wjNMnx3qs7sACbzKjZY1C4zD9xaf2/s1600/c_scale%252Cfl_progressive%252Cq_80%252Cw_800.gif",
    efeito: `
    <ul>
      <li><strong>Objetivo:</strong> Escapar do ciclone arcano.</li>
    </ul>
    <hr>
    <ul>
      <li>
        <strong>Efeito:</strong> Os personagens têm <strong>5 rodadas</strong> para acumular sucessos nas ações abaixo.
        <ul>
          <li><strong>2 ou menos sucessos:</strong> No centro. Sofre <strong>16d6 de dano de essência</strong> e perde <strong>4d4 PM</strong>.</li>
          <li><strong>3 ou 4 sucessos:</strong> Na orla. Sofre <strong>8d6 de dano de essência</strong> e perde <strong>2d4 PM</strong>.</li>
          <li><strong>5 ou mais sucessos:</strong> Escapa ileso.</li>
        </ul>
      </li>
    </ul>
    <hr>
    <ul>
      <li><strong>Aviso Prévio:</strong> Um teste de <strong>Misticismo (CD 20)</strong> detecta o fenômeno. Quem passar, age uma vez extra na primeira rodada.</li>
    </ul>
    <hr>
    <h6 class="text-danger"><strong>Ações:</strong></h6>
    <ul>
      <li><strong>Correr (Atletismo CD 20):</strong> Corre para longe. Sucesso por 10+ (ou 20 natural) conta como 2 sucessos. Pode ser substituído por Cavalgar ou Pilotagem.</li>
      <li><strong>Carregar Outro (Atletismo CD 25):</strong> Carrega um aliado próximo com no máximo 1 sucesso de diferença. Ambos ganham 1 sucesso.</li>
      <li><strong>Bloquear (Misticismo CD 15):</strong> Usa magia para conter os efeitos. Garante 1 sucesso. Só pode ser feito uma vez por personagem.</li>
      <li><strong>Resistir (Von CD 20):</strong> Tenta resistir aos efeitos em vez de fugir.</li>
    </ul>
  `
  },

  {
    origem: "Ameaças de Arton",
    nd: "8",
    tipo: "Desastre Urbano",
    nome: "Construção em Colapso",
    imagem: "https://media1.giphy.com/media/l0HlW0xP8iEILoy7m/giphy.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar da construção antes que ela desabe completamente.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Os personagens estão em uma vasta construção prestes a desabar.</li>
        <li>Eles têm <strong>7 rodadas</strong> para escapar, acumulando <strong>5 sucessos</strong> em ações de movimentação.</li>
        <li>No início de cada rodada, role <strong>1d6</strong> e aplique um dos efeitos abaixo:</li>
        <ul>
          <li><strong>1-2) Destroços:</strong> Reflexos CD 25. Falha: 4d6 de dano. Falha por 10+: 8d6.</li>
          <li><strong>3-4) Fenda no chão:</strong> Acrobacia ou Atletismo CD 25. Falha: -5 na próxima ação. Falha por 10+: perde a ação.</li>
          <li><strong>5) Bloqueio:</strong> Pode desistir (perde a ação) ou Atletismo CD 25. Falha: 8d6 de dano e perde a ação.</li>
          <li><strong>6) Explosão:</strong> Reflexos CD 30. Falha: 6d6 e -5 no próximo teste. Falha por 10+: 10d6 e perde a ação.</li>
        </ul>
        <li><strong>Rodada Final:</strong> Ao fim da 7ª rodada, quem não tiver 5 sucessos sofre <strong>20d6 de dano</strong>, sem direito a teste.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Avançar (Acrobacia ou Reflexos CD 25):</strong> Move-se com cuidado. Sucesso por 10+ ou 20 natural: <strong>2 sucessos</strong>.</li>
        <li><strong>Correr (Atletismo CD 20):</strong> Corre ignorando perigos, sofre <strong>4d6 de dano</strong>. Sucesso por 10+ ou 20 natural: <strong>2 sucessos</strong>.</li>
        <li><strong>Carregar Outro (Atletismo CD 30):</strong> Leva um aliado (com até 1 sucesso de diferença). Ambos ganham <strong>1 sucesso</strong>. Falha: ambos sofrem dano.</li>
        <li><strong>Procurar Caminho (Percepção CD 20):</strong> Concede <strong>+5</strong> em todos os testes durante este perigo.</li>
      </ul>
    `
  },
  {
    origem: "Ameaças de Arton",
    nd: "3 a 11",
    tipo: "Perigo Ambiental",
    nome: "Grama Carnívora",
    imagem: "https://i.imgflip.com/9q2cvd.gif",
    efeito: `
      <strong>Objetivo:</strong> Sair da área da grama carnívora antes de ser devorado.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Ao entrar na clareira, os personagens pisam em uma vegetação pegajosa — uma aberração planar.</li>
        <li>A área pode ser pequena (3 sucessos, ND 3), média (5 sucessos, ND 6) ou extensa (7 sucessos, ND 11).</li>
        <li>A cada início de turno:
          <ul>
            <li>Sofrem <strong>1d6 de dano</strong> (ou 2d6/3d6 em áreas maiores).</li>
            <li>Fazem teste de Reflexos CD 20 (ou 25/30 em áreas maiores).</li>
            <li><strong>Falha:</strong> Ficam agarrados e só podem usar a ação <em>Libertar-se</em>.</li>
            <li>A cada rodada agarrado, o dano aumenta em <strong>+1d6</strong>.</li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Fugir (Atletismo CD 20):</strong> Corre para fora da área. Sucesso por 10+ ou 20 natural: <strong>2 sucessos</strong>.</li>
        <li><strong>Libertar-se (Atletismo ou Acrobacia CD 20):</strong> Remove o estado de agarrado. Sucesso por 10+: ignora o teste da rodada.</li>
        <li><strong>Conjurar (Vontade CD 20 + PM):</strong> Tenta lançar uma magia. Falha: gasta os PM.</li>
        <li><strong>Atacar (Luta CD 20):</strong> Usa arma de corte para abrir caminho ou libertar aliado. Conta como <strong>1 sucesso</strong> em <em>Fugir</em>.</li>
        <li><strong>Analisar (Sobrevivência CD 20):</strong> Concede <strong>+2</strong> em todos os testes do grupo durante o perigo.</li>
        <li><strong>Identificação Inicial (Sobrevivência CD 20):</strong> Permite agir duas vezes no primeiro turno.</li>
      </ul>
    `
  },
  {
    origem: "Ameaças de Arton",
    nd: "4",
    tipo: "Desastre Urbano",
    nome: "Inundação de Esgoto",
    imagem: "https://static.wikia.nocookie.net/tmnt/images/2/25/Tumblr_135b9d62386351012b5902afe497fb53_dd46debc_400.gif",
    efeito: `
      <strong>Objetivo:</strong> Sobreviver à inundação.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Durante exploração subterrânea, uma enxurrada repentina atinge o grupo.</li>
        <li>Duração: <strong>1d4+4 rodadas</strong>.</li>
        <li><strong>Percepção CD 20</strong>: permite agir duas vezes no 1º turno.</li>
        <li>No início de cada rodada:
          <ul>
            <li>Role <strong>1d6</strong> e adicione o resultado à CD de todos os testes (obstáculos).</li>
          </ul>
        </li>
        <li>A água começa a <strong>6m</strong> dos personagens e avança 6m por rodada.</li>
        <li><strong>Alcançado:</strong> −2 nos testes de correr/carregar.</li>
        <li><strong>Ultrapassado:</strong> Engolfado, não pode correr/carregar, sofre <strong>4d6 de dano</strong> no fim do turno e precisa prender a respiração.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Correr (Atletismo CD 20+1d6):</strong> Avança 6m. Sucesso por 10+ ou 20 natural: <strong>2 sucessos</strong>.</li>
        <li><strong>Carregar Outro (Atletismo CD 25+1d6):</strong> Leva um aliado (com até 1 sucesso de diferença). Ambos avançam 6m.</li>
        <li><strong>Evitar Colisão (Atletismo ou Reflexos CD 20+1d6):</strong> Reduz ou evita dano quando engolfado.</li>
        <li><strong>Agarrar-se (Atletismo CD 20+1d6):</strong> Só disponível após sucesso em evitar colisão. Evita dano e mantém a ação nas próximas rodadas.</li>
      </ul>
    `
  },

  {
    origem: "Atlas de Arton",
    nd: "6",
    tipo: "Exploração de Masmorra",
    nome: "Labirinto",
    imagem: "https://i.redd.it/xmncpc7pfavc1.gif",
    efeito: `
      <strong>Objetivo:</strong> Sair do labirinto.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Para escapar, o grupo precisa acumular sucessos na ação <em>Guiar</em>:</li>
        <ul>
          <li><strong>3 sucessos:</strong> Labirinto pequeno (salas e corredores).</li>
          <li><strong>5 sucessos:</strong> Labirinto médio (subterrâneos de uma cidade pequena).</li>
          <li><strong>7 sucessos:</strong> Labirinto extenso (complexo sob uma metrópole).</li>
        </ul>
        <li>O mestre decide a duração de cada rodada (de 1h a 1 dia).</li>
        <li>No fim de cada rodada, cada personagem faz um teste de <strong>Fortitude (CD 20)</strong>. Falha causa <strong>2d6 de dano</strong>, que só pode ser curado após 1 dia fora do labirinto.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Guiar (Sobrevivência CD 25 ou 30):</strong> Apenas um personagem pode realizar esta ação por rodada.</li>
        <ul>
          <li>CD 25: Caminho padrão.</li>
          <li>CD 30: Caminho mais seguro. Sucesso reduz a CD do teste de Fortitude em <strong>5</strong> nesta rodada.</li>
        </ul>
        <li><strong>Ajudar o Guia (Perícia Variada):</strong> Pode usar qualquer perícia justificada para ajudar, mas cada perícia só pode ser usada uma vez por rodada (ver p. 221).</li>
        <li><strong>Calcular Rota (Conhecimento CD 20):</strong> Sucesso fornece <strong>+5</strong> no próximo teste de <em>Guiar</em>. Falha aumenta a CD do teste de Fortitude em <strong>+5</strong> nesta rodada.</li>
        <li><strong>Proteger-se (Sem teste):</strong> O personagem se protege, recebendo <strong>+5</strong> no teste de Fortitude.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Variante Psíquica:</strong></h6>
      <ul>
        <li>Troque o teste de <strong>Fortitude</strong> por <strong>Vontade</strong>.</li>
        <li>Substitua o dano por <strong>1d4 de perda de PM</strong>.</li>
        <li>Um personagem com <strong>0 PM</strong> fica <strong>catatônico</strong> e incapaz de agir.</li>
        <li>Se todo o grupo entrar em estado catatônico, eles <strong>succumbem à loucura</strong> do labirinto.</li>
      </ul>
    `
  },

  {
    origem: "Ameaças de Arton",
    nd: "7",
    tipo: "Desastre em Viagem",
    nome: "Naufrágio",
    imagem: "https://media1.tenor.com/m/A9h311k0IScAAAAd/pirate-asterix.gif",
    efeito: `
      <strong>Objetivo:</strong> Sobreviver ao naufrágio.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo está a bordo de uma embarcação que afunda.</li>
        <li>Cada personagem deve resistir à força das águas por um número de rodadas, conforme o tamanho do naufrágio:</li>
        <ul>
          <li><strong>3 rodadas:</strong> Naufrágio pequeno (barco de pesca).</li>
          <li><strong>5 rodadas:</strong> Naufrágio médio (veleiro ou cargueiro).</li>
          <li><strong>7 rodadas:</strong> Naufrágio grande (caravela ou navio de guerra).</li>
        </ul>
        <li>Após esse tempo, a embarcação afunda completamente e as águas se acalmam.</li>
        <li>Em cada rodada, cada personagem escolhe uma ação. Em caso de falha, sofre <strong>3d6 de dano de impacto</strong>.</li>
        <li>Personagens na água podem sofrer penalidades adicionais (ver <em>Nadar</em>).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Equilibrar-se (Acrobacia CD 20):</strong> Mantém-se sobre os destroços. A cada rodada, a CD aumenta em <strong>+2</strong>. Falha por 5 ou mais faz o personagem cair na água.</li>
        <li><strong>Içar Aliado (Acrobacia CD 25):</strong> Ajuda um aliado a subir nos destroços. Conta como sucesso para ambos.</li>
        <li><strong>Nadar (Atletismo CD 20):</strong> Nada contra a correnteza. Se falhar em <strong>2 testes</strong> antes de voltar aos destroços, é <strong>tragado pelas águas</strong> (ver abaixo).</li>
        <li><strong>Carregar Outro (Atletismo CD 25):</strong> Ajuda um aliado a nadar. Conta como 1 sucesso para ambos.</li>
        <li><strong>Escalar Destroços (Atletismo CD 25):</strong> Tenta subir de volta aos destroços. Só pode ser usada se tiver passado em <em>Nadar</em> na rodada anterior.</li>
      </ul>
      <hr>
      <h6 class="text-primary"><strong>Tragado pelas Águas:</strong></h6>
      <ul>
        <li>Começa a <strong>sufocar</strong> (ver p. 319).</li>
        <li>Sofre <strong>–5 em testes de Atletismo</strong>.</li>
        <li>Só pode usar as ações <em>Nadar</em> e <em>Carregar Outro</em>.</li>
        <li>Retorna à superfície se passar em <strong>2 testes de Nadar</strong> em sequência.</li>
      </ul>
    `
  },

  {
    origem: "Ameaças de Arton",
    nd: "2",
    tipo: "Desafio de Conhecimento",
    nome: "Pesquisa",
    imagem: "https://c.tenor.com/5qHvGMx9eJMAAAAC/tenor.gif",
    efeito: `
      <strong>Objetivo:</strong> Encontrar a informação desejada.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo está em uma biblioteca, livraria ou arquivo antigo, vasculhando textos em busca de uma informação importante.</li>
        <li>É necessário acumular <strong>6 sucessos</strong> para encontrar a informação.</li>
        <li>Para cada <strong>falha</strong>, o personagem perde <strong>1 PM</strong> devido ao esforço mental.</li>
        <li>Se um personagem for reduzido a <strong>0 PM</strong> dessa forma, fica <strong>frustrado</strong> até o fim do dia.</li>
        <li>Se o grupo acumular <strong>4 falhas</strong>, todos ficam frustrados e só podem tentar novamente no dia seguinte (mas mantêm os sucessos).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Usar Biblioteca (Investigação CD 15):</strong> Vasculha os livros e textos disponíveis, reunindo pistas relevantes.</li>
        <li><strong>Estudar Textos (Conhecimento CD 12):</strong> Usa conhecimentos prévios combinados com os textos disponíveis.</li>
        <li><strong>Consultar o Sobrenatural (Misticismo ou Religião CD 15):</strong> Pode ser usado uma vez por personagem se a informação for mística ou divina.</li>
        <li><strong>Ajudar (Perícia Variada, CD 10):</strong> Usa qualquer perícia justificada para auxiliar um aliado. Não conta como sucesso direto.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Frustrado:</strong></h6>
      <ul>
        <li>Um personagem frustrado está desmotivado e não pode participar de novas tentativas até o fim do dia.</li>
        <li>Se todo o grupo estiver frustrado, a pesquisa é interrompida até o próximo dia, mas os sucessos são mantidos.</li>
      </ul>
    `
  },
  {
    origem: "Ameaças de Arton",
    nd: "5",
    tipo: "Viagem Climática",
    nome: "Tempestade de Areia",
    imagem: "https://i.makeagif.com/media/9-15-2015/svCfIX.gif",
    efeito: `
      <strong>Objetivo:</strong> Sobreviver à passagem das areias.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo é surpreendido por uma <strong>tempestade de areia</strong> enquanto atravessa regiões desérticas.</li>
        <li>A tempestade dura <strong>2d4+1 rodadas</strong>. Após esse tempo, torna-se apenas um vento fraco, sem os efeitos abaixo.</li>
        <li>No início de cada rodada, role <strong>1d6</strong> e some a <strong>CD base 20</strong> — essa será a CD de Fortitude da rodada para todos os personagens.</li>
        <li>No início de seu turno, cada personagem faz um <strong>teste de Fortitude</strong> contra essa CD:</li>
        <ul>
          <li>Em caso de <strong>falha</strong>, sofre <strong>4d4 de dano de corte</strong> e fica <strong>cego</strong> até o início de seu próximo turno.</li>
          <li>Em caso de <strong>falha por 10 ou mais</strong>, além disso, começa a <strong>sufocar</strong> (ver p. 319).</li>
        </ul>
        <li>Personagens cegos sofrem <strong>–5</strong> em todas as ações abaixo.</li>
        <li>Ao fim de cada rodada, cada animal ou monstro irracional no grupo deve rolar <strong>1d4</strong>. Se o resultado for <strong>1</strong>, ele foge e desaparece na tempestade.</li>
        <li>Uma criatura que fugiu pode ser reencontrada após a tempestade com um <strong>teste de Sobrevivência (CD 20 + duração da tempestade)</strong>, mas há <strong>25% de chance de estar morta</strong>.</li>
        <li>Antes da tempestade atingir o grupo, todos têm direito a um <strong>teste de Sobrevivência (CD 20)</strong> para notá-la chegando. Quem passar pode realizar uma <strong>ação adicional</strong> na primeira rodada.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Proteger-se (Acrobacia ou Atletismo CD 15):</strong> Encolhe-se no chão e recebe <strong>+2 no próximo teste de Fortitude</strong>.</li>
        <li><strong>Cobrir-se (Sobrevivência CD 15):</strong> Usa um item como capa ou saco de dormir. Ganha <strong>+5 no próximo teste de Fortitude</strong> e <strong>+2 no seguinte</strong>. Depois, o item é destruído.</li>
        <li><strong>Procurar Abrigo (Percepção ou Sobrevivência CD 25):</strong> Encontra proteção (vala, rocha, etc). Ganha <strong>+5 nos testes de Fortitude</strong> até o fim da cena.</li>
        <li><strong>Proteger Aliado (Sobrevivência CD 15):</strong> Usa o próprio corpo para proteger um aliado. Na próxima rodada, recebe <strong>–5 em Fortitude</strong>, mas o aliado ganha <strong>+5</strong>.</li>
        <li><strong>Lavar o Rosto (Cura CD 15):</strong> Remove os efeitos de <strong>cegueira e sufocamento</strong> de si mesmo ou de um aliado.</li>
        <li><strong>Acalmar Animal (Adestramento CD 25):</strong> Acalma um animal ou monstro irracional, impedindo-o de fugir durante a tempestade.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Animais Irracionais:</strong></h6>
      <ul>
        <li>Ao final de cada rodada, role <strong>1d4 para cada animal/monstro irracional</strong> acompanhando o grupo.</li>
        <li>Se sair <strong>1</strong>, a criatura foge na tempestade.</li>
        <li>Para reencontrá-la depois, teste <strong>Sobrevivência</strong> com CD baseada na duração da tempestade. Há <strong>25% de chance da criatura estar morta</strong>.</li>
      </ul>
    `
  },

  {
    origem: "Só Aventuras",
    nd: "2",
    tipo: "Combate Aéreo",
    nome: "Embate nas Alturas!",
    imagem: "https://animatedmeta.wordpress.com/wp-content/uploads/2015/04/atla-balloon-plan-1.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar com vida do ataque dos goblins baloeiros e chegar a Vectora.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo está a bordo de um balão sob ataque de <strong>goblins baloeiros</strong>, tentando alcançar a cidade flutuante de Vectora.</li>
        <li>É necessário acumular <strong>8 sucessos</strong> para alcançar o destino com segurança.</li>
        <li>Ao fim de cada rodada, todos os personagens devem fazer um <strong>teste de Reflexos (CD 15)</strong>.</li>
        <ul>
          <li>Em caso de <strong>falha</strong>, o personagem <strong>cai do balão</strong>.</li>
          <li>Devido à baixa gravidade causada pelo campo de levitação de Vectora, é possível retornar ao balão com ações apropriadas.</li>
          <li>Se o personagem <strong>não retornar em até 3 rodadas</strong>, ele <strong>cai para a morte</strong>.</li>
        </ul>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Conduzir (Pilotagem CD 15):</strong> Assume o controle do balão após Glong ser atingido. Pode ser tentado <strong>uma vez por rodada</strong>.</li>
        <li><strong>Atirar (Ataque à distância, CD variável):</strong> Tenta repelir os goblins baloeiros com ataques. Cada sucesso válido ajuda a acumular progressos.</li>
        <li><strong>Manobrar Balão (Acrobacia ou Pilotagem CD 15):</strong> Realiza manobras evasivas contra os inimigos. Sucesso contribui para os sucessos totais.</li>
        <li><strong>Reparar (Ofício ou Engenharia CD 15):</strong> Conserta partes danificadas do balão, prevenindo penalidades ou queda.</li>
        <li><strong>Segurar-se (Atletismo ou Reflexos CD 15):</strong> Se estiver caindo, permite <strong>agarrar cordas ou partes do balão</strong> e retornar com sucesso.</li>
        <li><strong>Ajudar (Perícia Variada, CD 10):</strong> Usa uma perícia justificada para auxiliar um aliado. Não conta como sucesso direto.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Caindo do Balão:</strong></h6>
      <ul>
        <li>Se falhar no teste de Reflexos no final da rodada, o personagem cai.</li>
        <li>Durante até <strong>3 rodadas</strong>, pode tentar <strong>segurar-se ou voltar ao balão</strong> com testes apropriados.</li>
        <li>Se não conseguir retornar nesse tempo, <strong>cai para a morte</strong>.</li>
      </ul>
    `
  },

  {
    origem: "Só Aventuras",
    nd: "5",
    tipo: "Desafio Furtivo",
    nome: "Passagem pela Casa de Chá",
    imagem: "https://i.pinimg.com/originals/d5/d0/ea/d5d0eac0f4ec5e6d9a3c9e8fd0fe21c0.gif",
    efeito: `
      <strong>Objetivo:</strong> Atravessar a Casa de Chá passando pelos capangas sem ser notado — ou eliminar todos os guardas.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Cada personagem deve acumular <strong>3 sucessos</strong> em <strong>Passar Despercebido</strong> ou <strong>Passar por Cima</strong> para alcançar os aposentos de Taerir.</li>
        <li>Ao final de cada rodada, todos devem fazer um <strong>teste de Furtividade (CD 18)</strong>.</li>
        <ul>
          <li>Em caso de <strong>falha</strong>, o personagem é notado pelos capangas e sofre <strong>6d8+16 de dano de impacto</strong>.</li>
        </ul>
        <li>Se o grupo preferir lutar, o desafio se encerra ao somarem <strong>10 sucessos</strong> em <strong>Revidar</strong> ou <strong>Lançar Magia</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Passar Despercebido (Furtividade CD 20):</strong> Move-se entre os guardas sem ser notado. Somente personagens não descobertos ou que tenham tido sucesso em <strong>Despistar</strong> podem tentar.</li>
        <li><strong>Passar por Cima (Atletismo, Acrobacia ou Luta CD 20):</strong> Usa força ou agilidade para romper o cerco dos capangas e avançar. Personagens que usam esta ação <strong>não podem mais tentar Passar Despercebido</strong>, a menos que tenham sucesso em <strong>Despistar</strong>.</li>
        <li><strong>Revidar (Luta ou Pontaria CD 24):</strong> Combate direto com os capangas. Cada sucesso contribui para a contagem de 10 sucessos totais para encerrar o desafio por combate.</li>
        <li><strong>Lançar Magia (Vontade, CD 20 + custo em PM):</strong> Lança magia em meio ao caos da Casa de Chá. O ambiente é <strong>hostil à magia</strong>, dificultando a concentração.</li>
        <li><strong>Despistar (Enganação ou Furtividade CD 24):</strong> Usa o ambiente caótico e a fumaça para sair da linha de visão. Permite voltar a tentar <strong>Passar Despercebido</strong>. Se outro personagem tiver usado <strong>Revidar</strong> na rodada, a CD reduz em <strong>–5</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Detectado pelos Capangas:</strong></h6>
      <ul>
        <li>Falhar no teste de Furtividade no fim da rodada faz com que o personagem seja descoberto.</li>
        <li>Recebe <strong>6d8+16 de dano de impacto</strong> dos ataques dos guardas.</li>
        <li>Personagens descobertos não podem mais tentar <strong>Passar Despercebido</strong>, exceto se tiverem sucesso em <strong>Despistar</strong>.</li>
      </ul>
    `
  },

  {
    origem: "Só Aventuras",
    nd: "11",
    tipo: "Ameaça de Masmorra",
    nome: "Corredores em Chamas",
    imagem: "https://i.pinimg.com/originals/b0/b8/98/b0b89861ed00a56409b2b9dac744ae51.gif",
    efeito: `
      <strong>Objetivo:</strong> Correr pelos corredores em chamas até alcançar o salão principal.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O desafio dura <strong>cinco rodadas</strong>. Todos os personagens devem acumular sucessos em <strong>Correr</strong> ou <strong>Carregar Outro</strong>.</li>
        <li>No início de cada rodada, cada personagem sofre <strong>1d6 de dano de fogo</strong>, aumentando em +1d6 a cada rodada (máximo 5d6).</li>
        <li>Ao final da quinta rodada, o número de sucessos determina o destino de cada personagem:</li>
        <ul>
          <li><strong>0–2 sucessos:</strong> Sofre <strong>16d6 de dano de impacto</strong> e fica <strong>soterrado</strong>.</li>
          <li><strong>3–4 sucessos:</strong> Sofre <strong>8d6 de dano de impacto</strong>, mas escapa.</li>
          <li><strong>5 sucessos:</strong> Escapa completamente, sem ser atingido.</li>
        </ul>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Correr (Atletismo CD 26):</strong> Avança pelos corredores flamejantes. Um sucesso com 10 ou mais (ou um 20 natural) conta como <strong>dois sucessos</strong>.</li>
        <li><strong>Carregar Outro (Atletismo CD 30):</strong> Carrega um aliado com até um sucesso de diferença. Se bem-sucedido, concede <strong>um sucesso para ambos</strong>.</li>
        <li><strong>Procurar Caminho (Percepção CD 20):</strong> Analisa o trajeto em busca de uma rota mais segura. Se passar, <strong>todos recebem +5</strong> em testes de <strong>Correr</strong> e <strong>Carregar Outro</strong> (não cumulativo).</li>
        <li><strong>Soltar-se (Força CD 25):</strong> Usado para libertar-se ou libertar um aliado soterrado. Pode receber ajuda de outros personagens.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Personagens Soterrados:</strong></h6>
      <ul>
        <li>Ficam <strong>imóveis</strong> e sofrem <strong>1d6 de dano de impacto</strong> no início de cada turno, além de <strong>5d6 de dano contínuo de fogo</strong>.</li>
        <li>É necessário um teste de <strong>Força (CD 25)</strong> para se libertar ou libertar um aliado soterrado.</li>
      </ul>
    `
  },
  {
    origem: "Só Aventuras",
    nd: "2",
    tipo: "Missão de Salvamento",
    nome: "Resgate nas Chamas",
    imagem: "https://i.gifer.com/origin/a4/a40a7366f3f3fd565392d967bf2c0c5d.gif",
    efeito: `
      <strong>Objetivo:</strong> Salvar o maior número possível de pessoas presas no salão em chamas antes que ele desabe.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O salão queima durante <strong>cinco rodadas</strong>, desabando ao final da última. Use a ação <strong>Apagar</strong> para atrasar esse colapso.</li>
        <li>Os personagens mantêm a ordem de iniciativa e quaisquer efeitos ativos do combate anterior.</li>
        <li>No início de cada turno dentro do salão, cada personagem deve fazer um <strong>teste de Fortitude (CD 10 +1 por teste anterior)</strong> para resistir à fumaça. Criaturas que não respiram ignoram este efeito. Usar um pano úmido fornece <strong>+2</strong>.</li>
        <li>Existem <strong>8 NPCs</strong> presos (cada um ocupa 10 espaços; Nanamo ocupa 5).</li>
        <li>Quando o salão desaba, quem estiver dentro sofre <strong>6d6 de dano de fogo</strong> e fica <strong>soterrado</strong>. NPCs não resgatados morrem.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Apagar (Destreza ou Inteligência CD 10):</strong> Abafa focos do incêndio, <strong>adiando o colapso do salão em 1 rodada</strong>. Pode ser feito de fora.</li>
        <li><strong>Escapar (Acrobacia ou Atletismo CD 10):</strong> Tenta sair do salão sem carregar um NPC. Falha impede a saída naquela rodada.</li>
        <li><strong>Localizar (Investigação ou Percepção CD 15):</strong> Entra no salão para encontrar vítimas. Se bem-sucedido, pode usar <strong>Resgatar</strong> na próxima ação.</li>
        <li><strong>Resgatar (Atletismo CD 15):</strong> Carrega um NPC localizado para fora. <strong>Penalidade de -5</strong> se estiver sobrecarregado. Falha impede a saída.</li>
        <li><strong>Soltar-se (Força CD 17):</strong> Liberta a si ou a outro personagem soterrado. Cada tentativa causa <strong>1d6 de dano de fogo</strong>. Outros podem ajudar.</li>
      </ul>
      <hr>
      <h6 class="text-warning"><strong>Personagens Soterrados:</strong></h6>
      <ul>
        <li>Ficam <strong>imóveis</strong> e sofrem <strong>dano contínuo de fogo</strong>.</li>
        <li>Podem ser libertados com <strong>Força (CD 17)</strong>. Cada tentativa causa <strong>1d6 de dano de fogo</strong>. Vários personagens podem ajudar.</li>
      </ul>
    `
  },

  {
    origem: "Libertação de Valkaria",
    nd: "1",
    tipo: "Desafio",
    nome: "Procurar o Covil",
    imagem: "https://media.giphy.com/media/Eyd28c2wDWKOc/giphy.gif",
    efeito: `
      <strong>Objetivo:</strong> Encontrar a entrada do covil sszzaazita nas cavernas do Monte Palidor.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo deve acumular <strong>5 sucessos</strong> na ação <strong>Vasculhar</strong> para encontrar o covil.</li>
        <li>Para cada <strong>falha</strong>, cada personagem perde <strong>1d6 PV ou 1 PM</strong> (à escolha do jogador), representando cansaço, uso de habilidades ou ferimentos.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Vasculhar (Investigação, Percepção ou Sobrevivência CD 15):</strong> Procura pistas do covil nas cavernas. <strong>Hillard</strong>, se presente, concede <strong>+2 nos testes</strong>.</li>
        <li><strong>Proteger (Luta ou Pontaria CD 15):</strong> Ajuda o grupo enfrentando perigos e aliviando a jornada. Se passar, <strong>evita a penalidade de PV ou PM para um aliado</strong> em uma falha futura. A cada 5 pontos acima da CD, protege um personagem adicional.</li>
        <li>Outras perícias podem ser usadas uma única vez, desde que justificadas e aprovadas pelo mestre.</li>
      </ul>
    `
  },

  {
    origem: "Libertação de Valkaria",
    nd: "12",
    tipo: "Zona de Risco Mágico",
    nome: "Oficina Mágica",
    imagem: "https://i.imgflip.com/9q2szl.gif",
    efeito: `
      <strong>Objetivo:</strong> Fabricar um parceiro mobília em meio ao caos mágico da oficina.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa acumular <strong>2 sucessos</strong> em <strong>cada uma</strong> das seguintes ações: <strong>Agarrar Ferramenta</strong>, <strong>Ler Manual</strong> e <strong>Montagem</strong>.</li>
        <li>Ao final de <strong>rodadas ímpares</strong>, cada personagem sofre <strong>4d8 de dano de perfuração</strong> (<strong>Reflexos CD 30</strong> evita), causado pelas ferramentas dançantes.</li>
        <li>Ao final de <strong>rodadas pares</strong>, cada personagem perde <strong>1d4 PM</strong> (<strong>Vontade CD 30</strong> evita), devido aos vórtices arcanos.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Agarrar Ferramenta (Luta CD 30):</strong> Agarra ferramentas essenciais. <strong>+2 em Montagem</strong> com 1 sucesso, <strong>+5 com 2 sucessos</strong>.</li>
        <li><strong>Ler Manual (Conhecimento CD 25):</strong> Decifra o manual de Ranad. <strong>+2 em Montagem</strong> com 1 sucesso, <strong>+5 com 2 sucessos</strong>.</li>
        <li><strong>Montagem (Ofício [artesão] CD 40):</strong> Executa a montagem mágica do parceiro mobília.</li>
        <li><strong>Ajudar Aliado (variável):</strong> Ajuda em qualquer teste, usando uma perícia justificada e aprovada pelo mestre (ex.: Intuição, Misticismo, etc.).</li>
        <li><strong>Auxílio Esotérico (Misticismo CD 30):</strong> Substitui 1 sucesso em qualquer ação, <strong>máximo de 1 vez</strong>.</li>
        <li><strong>Dar Cobertura (Luta ou Pontaria CD 10):</strong> Garante <strong>bônus no teste de Reflexos</strong> de todos ao final da rodada.</li>
        <li><strong>Escudo Místico (Misticismo CD 10):</strong> Garante <strong>bônus no teste de Vontade</strong> de todos ao final da rodada.</li>
      </ul>
    `
  },

  {
    origem: "Coração de Rubi",
    nd: "14",
    tipo: "Perseguição Dimensional",
    nome: "Fuga dos Papa-Dim",
    imagem: "https://c.tenor.com/aIvGbxyqS4AAAAAC/tenor.gif",
    efeito: `
      <strong>Objetivo:</strong> Cruzar a floresta sem ser devorado pelos papa-dim.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo deve acumular <strong>5 sucessos</strong> na ação <strong>Conduzir</strong> para escapar com a carruagem.</li>
        <li>A carruagem possui <strong>RD 5</strong> e <strong>70 PV</strong>.</li>
        <li>No início de cada rodada, personagens na carruagem devem fazer <strong>Reflexos CD 20</strong>:
          <ul>
            <li>Falha: sofre <strong>2d6 de dano de impacto</strong>.</li>
            <li>Falha por 10 ou mais: sofre <strong>4d6 de dano</strong> e <strong>cai da carruagem</strong>.</li>
          </ul>
        </li>
        <li>Personagens voando ignoram o teste, mas <strong>não podem conduzir</strong>.</li>
        <li>Defina quem carrega os convites. Se esse personagem for reduzido a 0 PV por uma mordida, os <strong>papa-dim devoram as moedas e os convites</strong>! Será preciso <strong>derrotar o enxame</strong> para recuperar os itens.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Conduzir (Destreza, Adestramento ou Pilotagem CD 25):</strong> Conduz a carruagem. Sucesso: avança. Falha: avança, mas é alcançada. Falha por 5+: não avança e é alcançada.</li>
        <li><strong>Ajudar o Condutor (variável):</strong> Ajuda o condutor. Ex.: <em>Atletismo</em> (puxar arreios), <em>Percepção</em> (ver caminhos livres).</li>
        <li><strong>Atacar as Criaturas:</strong> Causar <strong>50 de dano</strong> no enxame em uma rodada impede que ele ataque a carruagem naquela rodada.</li>
        <li><strong>Quem Quer Dinheiro:</strong> Jogar <strong>T$ 100</strong> ou objetos valiosos como isca evita o ataque da rodada.</li>
        <li><strong>Lançar Magia (Vontade CD 15 + PM da magia):</strong> É necessário para conjurar magias na carruagem em movimento.</li>
        <li><strong>Embarcar (Atletismo CD 20):</strong> Para quem caiu do veículo. Ação completa. Outros podem ajudar, mas todos precisarão passar no teste.</li>
        <li><strong>Consertar Roda (Ladinagem ou Ofício CD 20):</strong> Requer 2 sucessos. Se ninguém enfrentar o enxame enquanto parada, a carruagem é atacada!</li>
      </ul>
    `
  },

  {
    origem: "Coração de Rubi",
    nd: "12",
    tipo: "Obstáculo Social",
    nome: "Burocracia Arcana",
    imagem: "https://i.gifer.com/7H9Z.gif",
    efeito: `
      <strong>Objetivo:</strong> Conseguir um visto de permanência em Vectora e permissão para usar magia de Raisenzan dentro da cidade.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo deve acumular <strong>7 sucessos</strong> entre as ações <strong>Preencher Formulário</strong> e <strong>Responder Entrevista</strong>.</li>
        <li>Ao final de cada rodada, cada personagem faz <strong>Vontade (CD 20 + 2 por teste já realizado)</strong>:
          <ul>
            <li>Falha: fica <strong>frustrado</strong>.</li>
            <li>Falha por 10 ou mais: fica <strong>frustrado e atordoado</strong> por uma rodada.</li>
            <li>Se já estiver frustrado: fica <strong>esmorecido</strong>.</li>
            <li>Se já estiver esmorecido: <strong>surta</strong> e sai da cena.</li>
          </ul>
        </li>
        <li>Se todos surtarem antes de alcançar 7 sucessos, falham no desafio. Podem tentar novamente na próxima semana.</li>
        <li>Se todos os testes forem um sucesso, recebem <strong>carta de recomendação</strong> de Vectorius, garantindo <strong>20% de desconto</strong> em compras pelos cofres da cidade (limites a critério do mestre).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Preencher Formulário (Conhecimento ou Nobreza CD 25):</strong> Preenche uma das requisições exigidas.</li>
        <li><strong>Responder Entrevista (Diplomacia ou Enganação CD 25):</strong> Convence uma das cópias de Vectorius de que é confiável.</li>
        <li><strong>Debater Planos (varia CD 10):</strong> Ajuda um aliado nos testes principais. Pode usar qualquer perícia justificada, como:
          <ul>
            <li><em>Nobreza:</em> Compreender a legislação.</li>
            <li><em>Investigação:</em> Esclarecer dúvidas com funcionários.</li>
            <li><em>Ladinagem:</em> Esconder uma cola para a entrevista.</li>
          </ul>
        </li>
      </ul>
    `
  },

  {
    origem: "Coração de Rubi",
    nd: "14",
    tipo: "Desafio Social",
    nome: "Jogo de Influências",
    imagem: "https://pa1.aminoapps.com/6907/1f592c2e680bb9618be717b85a4162efd389b8d8r1-500-281_hq.gif",
    efeito: `
      <strong>Objetivo:</strong> Cair nas graças de Schaven para obter a energia elemental do fogo.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O jantar dura <strong>três rodadas</strong> (cada rodada representa uma hora).</li>
        <li>Para chamar a atenção de Schaven, o grupo precisa acumular <strong>sete sucessos</strong> nas ações <strong>Estabelecer Presença</strong>, <strong>Performance</strong> e <strong>Politicagem</strong>.</li>
        <li>No início de cada rodada, Alurra faz um <strong>teste de Intimidação oposto pela Vontade</strong> de um dos personagens (à sua escolha):
          <ul>
            <li>Se Alurra vencer, o personagem <strong>não age nesta rodada</strong>.</li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Atrapalhar Alurra (Intuição CD 20):</strong> O personagem fica de olho na capitã Alurra, evitando que ela atrapalhe seus colegas. Se passar, o próximo teste de Intimidação da capitã sofre <strong>–5</strong> de penalidade.</li>
        <li><strong>Conduzir a Conversa (Enganação CD 25):</strong> O personagem se intromete na conversa de um colega, fazendo com que o rumo dela o favoreça. Se passar, fornece um <strong>bônus de +5</strong> no próximo teste desse colega.</li>
        <li><strong>Estabelecer Presença (Intimidação CD 30):</strong> O personagem atrai os nobres com sua presença altiva e orgulhosa.</li>
        <li><strong>Performance (Atuação CD 32):</strong> O personagem entretém os convidados do jantar.</li>
        <li><strong>Politicagem (Diplomacia CD 30):</strong> O personagem atrai os nobres através de conversa hábil.</li>
        <li><strong>Seguir Protocolos (Nobreza CD 20):</strong> O personagem segue a etiqueta e os costumes de Sckharshantallas. Ele recebe um <strong>bônus de +5</strong> em seu próximo teste, ou fornece esse bônus a um colega.</li>
      </ul>
      <hr>
      <h6 class="text-info"><strong>Modificadores:</strong></h6>
      <ul>
        <li><strong>+2</strong> em todos os testes para personagens com <strong>trajes luxuosos</strong>.</li>
        <li>Personagens que tenham <strong>comprado presentes</strong> podem gastá-los para <strong>rolar novamente</strong> um teste recém realizado.</li>
      </ul>
    `
  },

  {
    origem: "Coração de Rubi",
    nd: "14",
    tipo: "Desastre Natural",
    nome: "Desmoronamento",
    imagem: "https://gifdb.com/images/high/avalanche-360-x-270-gif-qpolkzsorc8e0qm1.gif",
    efeito: `
      <strong>Objetivo:</strong> Avançar pelos túneis rumo ao centro do Santuário com toneladas de neve e rochas nos calcanhares.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa acumular <strong>sete sucessos</strong> em testes de <strong>Avançar</strong> para chegar ao centro do Santuário.</li>
        <li>No fim de cada rodada, cada personagem deve fazer um <strong>teste de Reflexos (CD 25, +1 por teste já realizado)</strong>:
          <ul>
            <li><strong>Falha:</strong> sofre <strong>4d6 de dano de impacto</strong> e <strong>4d6 de dano de frio</strong>, e só pode fazer a ação <strong>Escapar</strong> na próxima rodada.</li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Avançar (CD 30):</strong> O personagem avança pelos túneis. Pode usar qualquer <strong>perícia justificada</strong>, mas <strong>não pode repetir mais de uma vez cada perícia</strong>.</li>
        <li><strong>Escapar/Soltar Colega (Força CD 20):</strong> Um personagem que tenha falhado no teste de Reflexos na rodada anterior escapa da pilha de neve e rochas e pode agir na próxima rodada. Também pode ser usada por outro personagem para soltar um colega preso.</li>
      </ul>
    `
  },


  {
    origem: "Coração de Rubi",
    nd: "15",
    tipo: "Perseguição Aérea",
    nome: "Perseguição Celeste",
    imagem: "https://i.gifer.com/2WLW.gif",
    efeito: `
      <strong>Objetivo:</strong> Encontrar um dos Três Espectros — navios voadores inimigos ocultos por magias e truques mundanos.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>A perseguição dura <strong>cinco rodadas</strong>. Para encontrar um dos navios inimigos, o grupo precisa acumular <strong>cinco sucessos</strong> na ação <strong>Olhos no Céu</strong>.</li>
        <li>No fim de cada rodada:
          <ul>
            <li>Cada personagem faz um <strong>teste de Fortitude (CD 20 +2 por rodada anterior)</strong>. <strong>Falha:</strong> fica <strong>enjoado</strong> e não pode agir na rodada seguinte.</li>
            <li>O Mariposa (aeronave aliada) é atingido por um disparo de um Espectro. Cada personagem sofre:
              <ul>
                <li><strong>12d6 de eletricidade</strong> (Hidra Helicoide)</li>
                <li><strong>6d12 de trevas</strong> (Diligência Dracocérbera)</li>
                <li><strong>6d8+10 de impacto</strong> (Corvo de Krauser)</li>
              </ul>
              Um <strong>teste de Reflexos (CD 30)</strong> reduz o dano à metade.
            </li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Olhos no Céu (Percepção CD 30):</strong> O personagem tenta localizar um dos Espectros no céu noturno.</li>
        <li><strong>Recompor (Diplomacia ou Intimidação CD 20):</strong> Remove a condição <em>enjoado</em> de um aliado, permitindo que ele aja nesta rodada.</li>
        <li><strong>Prestar Ajuda:</strong> O personagem usa uma perícia relevante para ajudar na ação Olhos no Céu de um colega. Exemplos:
          <ul>
            <li><strong>Conhecimento:</strong> Reconhece constelações alteradas.</li>
            <li><strong>Guerra:</strong> Prevê táticas inimigas.</li>
            <li><strong>Investigação:</strong> Analisa padrões no céu.</li>
            <li><strong>Misticismo:</strong> Detecta auras mágicas.</li>
            <li><strong>Sobrevivência:</strong> Observa alterações nas nuvens.</li>
          </ul>
        </li>
        <li><strong>Manobras Defensivas (Pilotagem CD 30):</strong> Ajuda a tripulação do Mariposa a evitar o disparo da rodada.</li>
      </ul>
    `
  },

  {
    origem: "Coração de Rubi",
    nd: "16",
    tipo: "Desafio de Busca",
    nome: "O Código Lefeu",
    imagem: "https://giffiles.alphacoders.com/205/2058.gif",
    efeito: `
      <strong>Objetivo:</strong> Estudar as anotações de Ezequias Heldret para descobrir as capacidades e fraquezas da máquina de guerra ARQUEMIS-B.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo tem <strong>três dias</strong> para estudar. No início de cada dia, cada personagem pode fazer uma das ações abaixo ou <strong>prestar ajuda</strong> a um colega que esteja realizando um teste.</li>
        <li>No final de cada dia, cada personagem que tiver feito uma das ações deve fazer um <strong>teste de Vontade (CD 30 +2 por teste anterior)</strong>:
          <ul>
            <li><strong>1 falha:</strong> o personagem fica <strong>frustrado</strong>.</li>
            <li><strong>2 falhas:</strong> o personagem fica <strong>alquebrado</strong>.</li>
            <li><strong>3 falhas:</strong> o personagem perde <strong>permanentemente 1 ponto</strong> de Inteligência, Sabedoria ou Carisma (determinado aleatoriamente).</li>
          </ul>
        </li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Brecha na Armadura (Ofício [Armeiro] CD 35):</strong> Detecta pontos vulneráveis na estrutura do ARQUEMIS.</li>
        <li><strong>É Grande, mas não É Dois (Iniciativa CD 35):</strong> Observa que a máquina é lenta demais para reagir rapidamente.</li>
        <li><strong>Explosão de Raiva (Luta CD 35):</strong> Após um surto de fúria, percebe a manipulação mental causada pelas inscrições lefou.</li>
        <li><strong>Fogo de Suporte (Pontaria CD 35):</strong> Conclui que ataques à distância são a melhor estratégia contra o colosso.</li>
        <li><strong>Fonte de Mana (Misticismo CD 35):</strong> Identifica uma fonte oculta de energia alimentando a máquina.</li>
        <li><strong>Referências Religiosas (Religião CD 35):</strong> Reconhece símbolos ligados ao deus da Tormenta nas anotações de Ezequias.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "2",
    tipo: "Fuga",
    nome: "Fuga de Warton",
    imagem: "https://31.media.tumblr.com/b3dbe4cf8681a00c44b8608cee2d3d82/tumblr_nlorfxPvIC1qg8dz8o1_400.gif",
    efeito: `
      <strong>Objetivo:</strong> Sair da cidade de Warton.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Uma vez por rodada, cada personagem deve descrever como escapará dos soldados puristas e de Lady Alyssa, escolhendo uma das opções abaixo.</li>
        <li>Na 1ª rodada: testes para escapar do gabinete.</li>
        <li>Na 2ª rodada: testes para escapar do quartel e arredores.</li>
        <li>Na 3ª rodada: testes para alcançar as periferias da cidade.</li>
        <li><strong>Falha:</strong> o personagem avança, mas sofre <strong>2d4 PV</strong> e <strong>1d4 PM</strong> de dano, representando o esforço extra. Esta perda não pode ser evitada, curada ou recuperada até o final do perigo.</li>
        <li><strong>Restrição:</strong> Um personagem não pode usar a mesma perícia mais de uma vez durante o desafio.</li>
        <li>Ao final da terceira rodada, os personagens têm uma rodada de descanso antes de Lady Alyssa aparecer no topo dos prédios.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Entrada Principal (CD 15):</strong> O personagem usa uma perícia que envolva abrir caminho à força (ex: Luta, Atletismo) pela saída mais óbvia.</li>
        <li><strong>Entrada de Serviço (CD 15):</strong> O personagem usa uma perícia ardilosa (ex: Enganação, Atuação, Disfarce) para sair discretamente.</li>
        <li><strong>Rota Alternativa (CD 15):</strong> O personagem usa uma perícia ágil (ex: Acrobacia, Reflexos, Sobrevivência) para escapar por passagens improváveis.</li>
        <li><strong>Carregar Outro (CD 20):</strong> O personagem realiza um dos testes acima, mas carregando um aliado. Sucesso conta para ambos; falha causa perdas para os dois.</li>
        <li><strong>Salto de Fé (Religião CD 25 – 1ª rodada apenas):</strong> O personagem salta pela janela confiando nos deuses. Sucesso: cai numa carroça de feno e escapa do perigo imediatamente. Falha: sofre o dobro do dano de PV e não pode tentar essa opção novamente.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "4",
    tipo: "Desafio urbano",
    nome: "Desabamento",
    imagem: "https://c.tenor.com/hGeQCSHBf_AAAAAd/tenor.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar do desabamento e fugir da torre.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo tem <strong>cinco rodadas</strong> para se afastar dos escombros.</li>
        <li>No fim da 5ª rodada, a posição de cada personagem é definida pelo número de <strong>sucessos acumulados</strong> nas ações <em>Correr</em> ou <em>Carregar Outro</em>:</li>
        <ul>
          <li><strong>0–2 sucessos:</strong> Zona de Desabamento — sofre <strong>8d12 de dano</strong> e fica <strong>soterrado</strong>.</li>
          <li><strong>3–4 sucessos:</strong> Zona de Deslizamento — sofre <strong>8d6 de dano</strong>.</li>
          <li><strong>5+ sucessos:</strong> Escapa <strong>ileso</strong>.</li>
        </ul>
        <li><strong>Soterrado:</strong> personagem fica <strong>imóvel</strong> e sofre <strong>1d6 de dano</strong> no início de cada turno.</li>
        <li>Libertar um soterrado exige <strong>ação completa</strong> e <strong>Atletismo CD 20</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Correr (Atletismo CD 20):</strong> Corre para longe dos escombros. Um sucesso por 10 ou mais (ou 20 natural) conta como <strong>dois sucessos</strong>. Pode ser substituído por Cavalgar ou Pilotagem.</li>
        <li><strong>Carregar Outro (Atletismo CD 25):</strong> Leva um aliado próximo (com até 1 sucesso de diferença). Sucesso acumula 1 sucesso para ambos.</li>
        <li><strong>Procurar Caminho (Percepção CD 20):</strong> Analisa o terreno. Sucesso concede <strong>+5</strong> em todos os testes de <em>Correr</em> e <em>Carregar Outro</em> durante o desafio.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "4",
    tipo: "Desafio de Sobrevivência",
    nome: "Jornada até Bielefeld",
    imagem: "https://gifdb.com/images/high/attack-on-titan-levi-riding-horse-en8pasm7u9dzbxya.gif",
    efeito: `
      <strong>Objetivo:</strong> Chegar ao Reino dos Cavaleiros o mais rápido possível, atravessando território hostil.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo deve realizar <strong>3 testes de Avançar</strong>.</li>
        <li><strong>Para cada falha:</strong> os personagens perdem <strong>3d6 PV</strong>, representando cansaço e desgaste. Essa perda só pode ser curada a partir de um dia após o fim da viagem.</li>
        <li><strong>Se acumular 3 falhas:</strong> todos os personagens têm seus <strong>PM máximos reduzidos em 1 por nível</strong> até o fim da aventura, como consequência do trauma da jornada.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Avançar (CD 25, +5 por teste anterior):</strong> Os personagens se alternam para realizar os 3 testes totais. Os testes podem ser de <strong>Sobrevivência</strong> ou qualquer outra perícia que o jogador consiga justificar e o mestre aprove.</li>
        <li><strong>Restrição:</strong> Cada perícia que <em>não</em> seja Sobrevivência só pode ser usada <strong>uma vez</strong> durante o desafio.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "6",
    tipo: "Desafio urbano",
    nome: "Fuga de Suth Eleghar",
    imagem: "https://j.gifs.com/w0kq6X.gif",
    efeito: `
      <strong>Objetivo:</strong> Ajudar os elegharianos a fugir do ataque.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo tem <strong>sete rodadas</strong> para ajudar na evacuação da cidade, realizando ações como combater inimigos, curar feridos e movimentar vítimas.</li>
        <li>Ao final de cada rodada, cada personagem sofre <strong>6d10 de dano</strong> (metade fogo, metade perfuração). Um teste de <strong>Reflexos CD 25</strong> reduz o dano à metade.</li>
        <li>No fim da sétima rodada, o perigo termina. Some os <strong>sucessos acumulados</strong> nas ações <em>Carregar Vítima</em>, <em>Chamar Atenção</em>, <em>Curar Vítima</em> e <em>Retirada Estratégica</em> para determinar o resultado.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Bater em Purista! (Varia CD 25):</strong> Ataque com arma ou magia. Para cada <strong>20 pontos de dano</strong> causados, evita que um aliado à escolha (ou o próprio personagem) sofra dano nesta rodada. Dano em área causa <strong>+50%</strong> de dano.</li>
        <li><strong>Buscar Cobertura (Furtividade CD 25):</strong> Recebe <strong>+5 no teste de Reflexos</strong> e, se passar, não sofre dano algum nesta rodada.</li>
        <li><strong>Carregar Vítima (Atletismo CD 25):</strong> Leva vítimas até um local seguro. Pode usar <strong>Cavalgar</strong> ou <strong>Pilotagem</strong> se estiver montado ou em veículo.</li>
        <li><strong>Chamar Atenção (Atuação, Enganação ou Intimidação CD 25):</strong> Atrai atenção dos puristas para permitir que outros escapem. Nesse caso, a <strong>CD do teste de Reflexos</strong> do personagem sobe para <strong>35</strong>.</li>
        <li><strong>Curar Vítima (Cura CD 25):</strong> Cura vítimas do ataque. Magias de cura fornecem <strong>+2 por PM gasto</strong>.</li>
        <li><strong>Retirada Estratégica (Guerra CD 25):</strong> Coordena os sobreviventes, aumentando a eficiência da evacuação.</li>
      </ul>
      <hr>
      <strong>Resultado dos Esforços:</strong>
      <ul>
        <li><strong>10 ou menos sucessos:</strong> A evacuação é um massacre. Todos os personagens ficam <strong>alquebrados</strong> até o fim da aventura (não pode ser removido antes).</li>
        <li><strong>11 a 20 sucessos:</strong> Algumas vidas são salvas. Os sobreviventes agradecem a ajuda.</li>
        <li><strong>21 a 30 sucessos:</strong> Muitas vidas são salvas. Cada personagem aumenta o limite de <strong>PM em +2d4</strong> até o fim da aventura.</li>
        <li><strong>31+ sucessos:</strong> Quase todos são salvos! Cada personagem recebe um <strong>cavalo de Namalkah veterano</strong>. O grupo ganha a ajuda de <strong>Knox Quíron</strong>, que fornece <strong>+2 em Cavalgar, Percepção e Sobrevivência</strong>, e <strong>+2 em testes de resistência</strong> de um personagem montado. Knox acredita que <em>Hippion</em> enviou os heróis.</li>
      </ul>
    `
  },
  {
    origem: "Guerra Artoniana",
    nd: "4",
    tipo: "Desafio de viagem",
    nome: "Jornada até Zakharov",
    imagem: "https://s-media-cache-ak0.pinimg.com/originals/fd/0a/b0/fd0ab0aff3a82bf4c74658a2dca4a7cb.gif",
    efeito: `
      <strong>Objetivo:</strong> Chegar ao Reino das Armas o mais rápido possível, atravessando território hostil.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo deve realizar <strong>3 testes de Avançar</strong> para completar a jornada.</li>
        <li>A cada <strong>falha</strong>, todos os personagens sofrem <strong>3d6 de dano</strong>. Esse dano representa cansaço e desgaste físico e <strong>só pode ser curado um dia após o fim da viagem</strong>.</li>
        <li>Se o grupo acumular <strong>3 falhas</strong>, seus <strong>PM máximos são reduzidos em 1 por nível</strong> até o fim da aventura, representando trauma.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Avançar (CD 25, +5 por teste anterior):</strong> Os personagens se revezam realizando testes até acumularem 3 sucessos. Pode-se usar <strong>Sobrevivência</strong> ou outra perícia com justificativa aprovada pelo mestre. Perícias diferentes de Sobrevivência só podem ser usadas <strong>uma vez</strong> durante a jornada.</li>
      </ul>
      <hr>
      <strong>Encontros:</strong> Cada teste leva a um encontro, independentemente do sucesso. Se o teste foi bem-sucedido, o grupo pode escolher enfrentar ou evitar o encontro. Em caso de falha, o grupo é <strong>surpreendido</strong>.
      <ul>
        <li>
          <strong>1º Encontro:</strong> Terras salgadas e estéreis de Yuden. Todos fazem teste de <strong>Vontade CD 25</strong>.
          <ul>
            <li>Sucesso: Ganha um <em>reteste contra puristas</em> até o fim da aventura.</li>
            <li>Falha: Fica <strong>esmorecido</strong> até o fim da próxima cena.</li>
          </ul>
        </li>
        <li>
          <strong>2º Encontro:</strong> Torre guarnecida em mina yudennach. Todos fazem <strong>Furtividade CD 25</strong>.
          <ul>
            <li>Falha: Sofre <strong>6d8 de dano de perfuração</strong> (Reflexos CD 25 reduz à metade).</li>
            <li>Se atacarem a torre: enfrentam dois <em>grupos de assalto puristas</em> e um <em>golem de reconhecimento</em>.</li>
            <li>Vitória: Encontram <strong>T$ 7.000</strong> e libertam prisioneiros. O domínio do grupo recebe a estrutura <strong>Exclave Kovith</strong> (bônus de +5 em Luta, Misticismo ou Pontaria, 1x por aventura).</li>
          </ul>
        </li>
        <li>
          <strong>3º Encontro:</strong> Penhascos do Monte Kovith. Um personagem faz <strong>Atletismo ou Sobrevivência CD 25</strong>.
          <ul>
            <li>Sucesso: Grupo surpreende <strong>patrulha de cavaleiros de serpe</strong>.</li>
            <li>Falha: Grupo <strong>fica fatigado</strong> e é surpreendido pela patrulha.</li>
            <li>Recompensa: Poção de <em>Bola de Fogo</em> e <em>Curar Ferimentos (4d8+4)</em>.</li>
          </ul>
        </li>
      </ul>
      <hr>
      <strong>Resultado da Jornada:</strong>
      <ul>
        <li><strong>0 a 1 sucesso:</strong> A viagem deixa cicatrizes profundas. Todos os personagens ficam <strong>esmorecidos</strong> até o fim da próxima cena.</li>
        <li><strong>2 sucessos:</strong> A jornada termina com desgaste, mas sem traumas permanentes.</li>
        <li><strong>3 sucessos:</strong> Chegam com sucesso! Cada personagem recupera <strong>2d6 PV</strong> e recebe <strong>+2 em testes de resistência contra cansaço</strong> até o fim da próxima cena.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "12",
    tipo: "Desafio Atletico",
    nome: "Escalando o Colosso",
    imagem: "https://images.squarespace-cdn.com/content/v1/5aac9b95cef3728570eeb118/1566630829435-9WK154HD87YHA30VOK53/ShadowOfTheCollossus_TwoBossFight.gif",
    efeito: `
      <strong>Objetivo:</strong> Chegar ao topo do colosso.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Cada personagem precisa de <strong>5 sucessos em testes de Escalar</strong> para alcançar o topo do colosso.</li>
        <li><strong>Voar</strong> é possível, mas exige tanto esforço quanto escalar e não oferece vantagem contra o vento. Os personagens voadores ainda podem <strong>cair</strong> e sofrem os mesmos efeitos.</li>
        <li>No início de cada rodada, as <strong>fornalhas do colosso</strong> emitem fumaça tóxica, fazendo todos perderem <strong>2d8 PV por veneno</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Escalar (Atletismo CD 25):</strong> O personagem tenta subir um trecho do colosso. Se passar, ganha 1 sucesso. Se falhar, não avança. Se falhar por 5 ou mais, <strong>cai</strong>, sofre <strong>4d6 de dano de impacto</strong> e <strong>perde 1 sucesso</strong>.</li>
        <li><strong>Personagens com deslocamento de escalada ou voo:</strong> ganham <strong>+5 nos testes</strong>, mas não têm sucesso automático.</li>
        <li><strong>Carregar Outro (Atletismo CD 30):</strong> Carrega um aliado próximo (com até 1 sucesso de diferença). Se passar, ambos ganham 1 sucesso. Se cair, <strong>ambos sofrem dano e perdem 1 sucesso</strong>.</li>
        <li><strong>Ajudar Outro (Atletismo CD 20):</strong> Fornece <strong>+5 no teste de um aliado</strong>. Se falhar por 5 ou mais, sofre <strong>–5 no próximo teste</strong>. O ajudante não avança nessa rodada.</li>
        <li><strong>Segurar Outro (Reflexos CD 25):</strong> Reação. Permite tentar <strong>segurar um aliado em queda</strong>. Se falhar por 5 ou mais, <strong>cai junto</strong>.</li>
        <li><strong>Procurar Caminho (Percepção CD 25):</strong> Analisa o terreno. Se passar, recebe <strong>+5 no próximo teste de escalada</strong>.</li>
      </ul>
      <hr>
      <strong>Encontros:</strong> A escalada em si é o desafio. A cada rodada, o mestre pode descrever <em>eventos ambientais</em> como ventanias, pedras desmoronando ou chamas repentinas, que exigem testes adicionais de Reflexos, Fortitude ou manobras criativas dos jogadores.
      <ul>
        <li>Esses eventos não têm efeitos mecânicos fixos, mas podem alterar o ritmo da escalada ou causar penalidades.</li>
      </ul>
      <hr>
      <strong>Resultado da Jornada:</strong>
      <ul>
        <li><strong>Personagens que caírem três vezes:</strong> Considerados derrotados e não alcançam o topo.</li>
        <li><strong>Todos alcançam o topo:</strong> Vitória completa. O grupo recebe <strong>+2 em testes contra medo</strong> até o fim da próxima cena e <strong>inspiração do mestre</strong>.</li>
        <li><strong>Metade ou mais alcança o topo:</strong> Vitória parcial. Aqueles que chegaram ganham <strong>+1 em testes físicos</strong> até o fim da próxima cena.</li>
        <li><strong>Menos da metade chega ao topo:</strong> Fracasso. O colosso libera uma onda de energia mágica, todos sofrem <strong>5d10 de dano de força</strong> e são arremessados de volta ao chão (teste de Reflexos CD 25 para reduzir à metade).</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "12",
    tipo: "Desafio de sobrevivência",
    nome: "Escapar da Explosão",
    imagem: "https://i.makeagif.com/media/3-10-2023/L4MKDf.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar da área da explosão e dos destroços.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Após sabotar a caldeira, o grupo tem <strong>1d6+3 rodadas</strong> para se afastar do cataclisma.</li>
        <li>No fim da última rodada, a posição de cada personagem é definida pelo <strong>número de sucessos acumulados</strong> nas ações <strong>escapar</strong> ou <strong>carregar outro</strong>.</li>
        <li><strong>3 sucessos ou menos:</strong> Zona de Devastação — sofre <strong>12d12 de dano</strong> (metade de fogo, metade de impacto) e fica <strong>soterrado</strong>.</li>
        <li><strong>4 a 8 sucessos:</strong> Zona de Destruição — sofre <strong>6d12 de dano de impacto</strong>.</li>
        <li><strong>9 sucessos ou mais:</strong> Escapa ileso.</li>
        <li>Personagens <strong>soterrados</strong> ficam <strong>imóveis</strong> e sofrem <strong>1d6 de dano de impacto</strong> no início de cada turno. Soltar-se (ou a um aliado) exige <strong>Força CD 25</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Escapar (Acrobacia ou Atletismo CD 25):</strong> Corre, escala, salta ou voa para longe da explosão. Um sucesso por 10 ou mais (ou um 20 natural) conta como <strong>dois sucessos</strong>. Pode ser substituído por <strong>Cavalgar, Pilotagem ou Misticismo</strong>, se aplicável.</li>
        <li><strong>Carregar Outro (Atletismo CD 30):</strong> Carrega um aliado próximo (com no máximo 1 sucesso de diferença). Ambos ganham 1 sucesso em caso de êxito.</li>
        <li><strong>Procurar Caminho (Percepção CD 25):</strong> Analisa o terreno em busca de rotas seguras. Se passar, recebe <strong>+5 em todos os testes</strong> para escapar ou carregar outro durante o desafio.</li>
      </ul>
      <hr>
      <strong>Encontros:</strong> Durante cada rodada, o mestre pode descrever <em>efeitos ambientais</em> como tremores, desabamentos, jatos de vapor ou obstáculos em chamas. Esses eventos podem:
      <ul>
        <li>Exigir testes adicionais de Reflexos ou Fortitude;</li>
        <li>Impedir certos caminhos ou forçar recuos;</li>
        <li>Gerar oportunidades para <strong>ações criativas</strong> dos jogadores.</li>
      </ul>
      <hr>
      <strong>Resultado da Jornada:</strong>
      <ul>
        <li><strong>Soterrado:</strong> Personagem sofre penalidade severa e pode morrer se não for resgatado.</li>
        <li><strong>Zona de Destruição:</strong> Sofre dano, mas sobrevive com ferimentos.</li>
        <li><strong>Fuga bem-sucedida:</strong> Escapa ileso. Ganha <strong>+2 em testes de iniciativa</strong> até o fim da próxima cena, pela adrenalina da fuga.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "12",
    tipo: "Desafio de sobrevivência",
    nome: "Fuga do Bosque",
    imagem: "https://i0.kym-cdn.com/photos/images/original/001/222/377/1c4.gif",
    efeito: `
      <strong>Objetivo:</strong> Guiar os refugiados através do bosque.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Para escapar com sucesso, o grupo precisa acumular <strong>3 sucessos</strong> na ação <strong>Organizar Fuga</strong>.</li>
        <li>Ao final de cada rodada, o batalhão inimigo dispara uma <strong>saraivada de flechas</strong>, causando <strong>10d6 de dano de perfuração</strong> em todos os personagens e nos refugiados (<strong>Reflexos CD 30</strong> reduz à metade).</li>
        <li>Se algum <strong>NPC importante</strong> ficou para ajudar Fiz-Grin, o dano inicial dos puristas é reduzido em <strong>–1d6 por NPC</strong>. Essa penalidade diminui em <strong>1d6 por rodada</strong>.</li>
      </ul>
      <hr>
      <strong>Resultado da Jornada:</strong>
      <ul>
        <li><strong>Menos de 50 de dano total nos refugiados:</strong> A maioria sobrevive e o grupo tem sucesso.</li>
        <li><strong>Entre 50 e 100 de dano:</strong> Apenas metade dos refugiados sobrevive.</li>
        <li><strong>Mais de 100 de dano:</strong> Poucos sobrevivem e o grupo falha na missão.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Organizar Fuga (Guerra CD 30):</strong> Dá ordens aos refugiados para avançar. <strong>Apenas um personagem</strong> pode fazer essa ação por rodada.</li>
        <li><strong>Curar Feridos (Cura CD 30):</strong> Socorre os feridos, curando <strong>10 pontos de dano</strong> causados aos refugiados. A magia <strong>Curar Ferimentos</strong> pode ser usada com aprimoramento de +5 PM.</li>
        <li><strong>Proteger Refugiados (Luta ou Pontaria CD 30):</strong> Ataca os inimigos ou cria obstáculos. Cada sucesso <strong>reduz o dano dos puristas em 2d6</strong> na próxima rodada.</li>
        <li><strong>Procurar Caminho (Percepção ou Sobrevivência CD 25):</strong> Analisa o terreno. Sucesso concede <strong>+5 no próximo teste de Organizar Fuga</strong> (próprio ou de um aliado).</li>
      </ul>
      <hr>
      <strong>Encontros:</strong> Durante a fuga, o mestre pode descrever <em>ameaças naturais</em> como:
      <ul>
        <li>Galhos caindo e espinhos venenosos;</li>
        <li>Trilhas falsas que levam a armadilhas ou emboscadas;</li>
        <li>Momentos de desespero entre os refugiados, exigindo ações criativas dos heróis.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "15",
    tipo: "Desafio de sobrevivência",
    nome: "Chuva de Meteoros",
    imagem: "https://i.makeagif.com/media/4-20-2024/E1ghJs.gif",
    efeito: `
      <strong>Objetivo:</strong> Sobreviver à chuva de meteoros enquanto navegam pelo éter divino.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>A chuva dura <strong>1d6+10 rodadas</strong>. Após esse tempo, o grupo deixa os campos de asteroides para trás.</li>
        <li>No início de cada rodada, o <strong>navio sofre 10d12+20 de dano de impacto</strong>. O piloto pode fazer um teste de <strong>Pilotagem</strong>; em caso de sucesso, o dano é reduzido à metade.</li>
        <li>Se o piloto falhar, o navio <strong>perde 1d4 tripulantes</strong> (exceto parceiros, NPCs importantes ou personagens).</li>
        <li>Cada personagem faz um teste de <strong>Reflexos</strong> (CD 35 +1d12, rolado no início da rodada). Se falhar, sofre <strong>5d12+10 de dano</strong> de impacto.</li>
        <li>Se também falhar em um teste de <strong>Fortitude</strong>, o personagem é arremessado para fora do navio, sofrendo <strong>10d10 de dano</strong> no início de cada turno enquanto estiver no éter.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Navegar (Pilotagem CD 30):</strong> Conduz o navio para fora da chuva. Cada sucesso reduz a duração da chuva em <strong>1 rodada</strong>. Apenas um personagem pode fazer essa ação por rodada.</li>
        <li><strong>Ajudar o Piloto (varia):</strong> Auxilia o teste de Pilotagem do piloto principal. Pode usar <em>qualquer perícia justificada</em>, como <strong>Atletismo</strong> para estabilizar estruturas ou <strong>Percepção</strong> para detectar meteoros.</li>
        <li><strong>Consertar o Navio (Ofício [artesão] CD 20):</strong> Recupera PV do navio igual à metade do resultado do teste.</li>
        <li><strong>Proteger Tripulantes (CD 30):</strong> Usa uma perícia à escolha (justificada) para salvar tripulantes perdidos. Um sucesso salva <strong>1 tripulante +1 a cada 10 pontos acima da CD</strong>.</li>
        <li><strong>Defender o Navio:</strong> Usa ataques, magia ou canhões para destruir meteoros (<strong>Def 10, RD 10, 100 PV</strong>). Cada meteoro destruído reduz a duração da chuva em <strong>1 rodada</strong>.</li>
        <li><strong>Voltar para o Navio (Misticismo ou Reflexos CD 30):</strong> Um personagem fora do navio pode retornar com um sucesso nesse teste, se tiver voo ou teletransporte. Outros casos exigem <em>planos criativos e/ou ajuda de aliados</em>.</li>
      </ul>
    `
  },

  {
    origem: "Guerra Artoniana",
    nd: "20",
    tipo: "Desafio de infiltração e resistência",
    nome: "Assalto à Base do Vilão",
    imagem: "https://i.pinimg.com/originals/e5/f8/46/e5f8460001aab4ba2ff8f8a6a60ce939.gif",
    efeito: `
      <strong>Objetivo:</strong> Chegar ao centro de comando do General Supremo, acumulando cinco “avanços”.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa de <strong>5 avanços</strong> para alcançar o centro. Um avanço ocorre quando a maioria dos personagens tem sucesso em suas ações na rodada.</li>
        <li>Ao final de cada rodada, os personagens sofrem:
          <ul>
            <li><strong>4d12 de dano de corte</strong> (guardas),</li>
            <li><strong>4d10 de dano de ácido</strong> (armadilhas),</li>
            <li><strong>4d8 de dano de essência</strong> (runas mágicas).</li>
          </ul>
          Esses danos podem ser reduzidos pelas ações descritas abaixo.
        </li>
        <li>Não há limite de rodadas, mas quanto mais tempo o grupo levar, mais exausto ele chegará ao final.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Enfrentar Guardas (Luta ou Pontaria CD 50):</strong> Reduz o dano de corte em <strong>–2d12</strong> nesta rodada.</li>
        <li><strong>Desarmar Armadilhas (Ladinagem CD 50):</strong> Reduz o dano de ácido em <strong>–2d10</strong> nesta rodada.</li>
        <li><strong>Anular Runas (Misticismo CD 50):</strong> Reduz o dano de essência em <strong>–2d8</strong>. <em>Dissipar Magia</em> concede +5 neste teste.</li>
        <li><strong>Avançar (Acrobacia ou Atletismo CD 40):</strong> Conta para avanço, mas não reduz nenhum dano. Pode usar Misticismo se utilizar magia de movimento.</li>
        <li><strong>Analisar Caminho (Sobrevivência CD 40):</strong> Fornece <strong>+5 em todos os testes de avançar</strong> até o fim do desafio. Não conta como sucesso para avanço.</li>
        <li><strong>Analisar Sistemas de Segurança (Guerra CD 40):</strong> Fornece <strong>+5 em testes de enfrentar guardas, desarmar armadilhas e anular runas</strong> até o fim do desafio. Não conta como sucesso para avanço.</li>
        <li><strong>Incitar Rebelião (Diplomacia CD 50):</strong> Faz com que o grupo <strong>não sofra nenhum dano</strong> nesta rodada. Só pode ser bem-sucedido <strong>uma vez</strong> durante o desafio.</li>
        <li><strong>Matar Oficial:</strong> Gasta sua ação e você tem uma rodada para causar <strong>200 de dano</strong> contra um inimigo (Def 40, testes de resistência +20). Sucesso fornece <strong>+5 em todos os testes</strong> na rodada seguinte.</li>
        <li><strong>Quebrar Parede:</strong> Gasta sua ação e você tem uma rodada para causar <strong>200 de dano</strong> contra a parede (sem Defesa, sem testes de resistência, mas com <strong>RD 20</strong>). Sucesso conta como <strong>dois sucessos de avanço</strong>.</li>
      </ul>
    `
  },
  {
    origem: "Duelo de Dragões",
    nd: "1/2",
    tipo: "Desafio de exploração e resistência",
    nome: "Jornada pelos Esgotos",
    imagem: "https://i.makeagif.com/media/4-10-2021/GUjgKI.gif",
    efeito: `
      <strong>Objetivo:</strong> Encontrar a vidreira Safira nos esgotos de Selentine, acumulando três sucessos na ação <em>explorar</em>.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa de <strong>3 sucessos</strong> na ação <em>explorar</em> para localizar Safira.</li>
        <li>Apenas <strong>um teste de explorar</strong> pode ser tentado por rodada.</li>
        <li>Cada rodada representa alguns minutos de busca, expondo os personagens a vapores tóxicos que causam <strong>1 ponto de dano de veneno</strong> (evitável com a ação correta).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Explorar (Sobrevivência CD 12):</strong> O personagem se orienta pelos corredores labirínticos. Cada sucesso conta para encontrar Safira.</li>
        <li><strong>Prender a Respiração (Fortitude CD 12):</strong> Evita o dano por vapores tóxicos nesta rodada.</li>
        <li><strong>Prever o Caminho (Intuição CD 12):</strong> Conta como um sucesso em <em>explorar</em>, mas só pode ser usada <strong>uma vez</strong> por personagem e apenas após uma falha em explorar.</li>
        <li><strong>Procurar Rastros (Investigação CD 12):</strong> Concede <strong>+2 em um teste de explorar</strong> (seu ou de um aliado).</li>
        <li><strong>Tratar (Cura CD 12):</strong> Cura <strong>1 ponto de dano</strong> causado pelos vapores do esgoto em um aliado.</li>
      </ul>
    `
  },
  {
    origem: "Duelo de Dragões",
    nd: "1",
    tipo: "Desafio de agilidade e sobrevivência",
    nome: "Fuga da Torre",
    imagem: "https://64.media.tumblr.com/e96c0a5d0c00f852967f42efe501cafd/d932109ee948e29d-ae/s500x750/2ecb2ffa41d9e41b0124e8057a8fc5d4c6f300e3.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar da torre em colapso antes que ela desmorone sobre os personagens.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Cada personagem precisa acumular <strong>3 sucessos</strong> na ação <em>fugir</em> para escapar.</li>
        <li>Ao final de cada rodada, escombros caem sobre os personagens ainda dentro da torre, causando <strong>1d6 de dano de impacto</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Fugir (Atletismo ou Sobrevivência CD 15):</strong> Aproxima o personagem da saída. Se ultrapassar a CD em <strong>10 ou mais</strong>, conta como <strong>dois sucessos</strong>.</li>
        <li><strong>Encontrar Rota (Conhecimento ou Percepção CD 15):</strong> Avalia a arquitetura ou identifica uma rota segura. Sucesso concede <strong>+5 no próximo teste para fugir</strong>.</li>
        <li><strong>Carregar Alguém (Atletismo CD 20):</strong> Move-se em direção à saída com um aliado que possua o mesmo número de sucessos no início da rodada. Um sucesso nesta ação <strong>conta como sucesso para ambos</strong>.</li>
        <li><strong>Guiar (Diplomacia CD 15):</strong> O personagem motiva ou orienta um aliado, concedendo <strong>+5 ao teste de fuga</strong> de outro personagem.</li>
      </ul>
    `
  },
  {
    origem: "Duelo de Dragões",
    nd: "1",
    tipo: "Desafio de exploração e resistência",
    nome: "Obter Recursos",
    imagem: "https://i.imgur.com/yq22WfW.gif",
    efeito: `
      <strong>Objetivo:</strong> Coletar cinco recursos (comida, água ou lenha) nos ermos congelados.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa reunir <strong>cinco recursos</strong> em qualquer combinação entre água, comida e lenha.</li>
        <li>Falhar em um teste de coleta por <strong>5 ou mais</strong> resulta em <strong>1d6 de dano</strong> por exaustão e ferimentos.</li>
        <li>A cada sucesso em encontrar um tipo de recurso, a <strong>CD para aquele tipo aumenta em +2</strong> cumulativamente.</li>
        <li>Ao final de cada rodada, cada personagem sofre <strong>1d6 de dano de frio</strong> (Fortitude CD 15 +1 por teste anterior reduz à metade).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Encontrar Recursos (Sobrevivência CD 15):</strong> Escolha entre água, comida ou lenha. Sucesso garante 1 recurso do tipo escolhido. Outras perícias podem ser usadas a critério do mestre, mas apenas <strong>uma vez por personagem</strong> durante o desafio.</li>
        <li><strong>Aconselhar (Conhecimento CD 15):</strong> Compartilha experiências úteis. Sucesso concede <strong>+2 no próximo teste</strong> de encontrar recursos de um aliado.</li>
        <li><strong>Encontrar Abrigo (Sobrevivência CD 15):</strong> Localiza um refúgio contra o frio. Todos os personagens recebem <strong>+2 em Fortitude contra o frio</strong> e, se passarem, não sofrem dano nesta rodada.</li>
        <li><strong>Aquecer (Cura CD 15):</strong> Auxilia um aliado a se aquecer. Este recupera <strong>1d6 PV</strong>, mas apenas do dano de frio causado por este desafio.</li>
      </ul>
    `
  },

  {
    origem: "Duelo de Dragões",
    nd: "1",
    tipo: "Desafio de agilidade e sobrevivência",
    nome: "Avalanche Menor",
    imagem: "https://media.tenor.com/JQlRItISRC0AAAAM/snow-plowing.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar da avalanche antes de ser soterrado.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Cada personagem precisa acumular <strong>3 sucessos</strong> na ação <em>fugir</em> para escapar.</li>
        <li>A avalanche causa <strong>1d6 de dano de impacto</strong> por rodada (Reflexos CD 15 reduz à metade).</li>
        <li>Ao acumular <strong>3 falhas</strong>, o personagem fica <strong>inconsciente</strong>.</li>
        <li>Personagens que escapam (3 sucessos) podem usar a ação <em>Guiar</em> para ajudar os outros e não sofrem mais dano de impacto.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Fugir (Atletismo ou Sobrevivência CD 15):</strong> Acumule 3 sucessos para escapar da avalanche.</li>
        <li><strong>Planejar Movimento (Guerra CD 15):</strong> Oferece tática ao grupo. Todos recebem <strong>+2 nos testes de fuga e Reflexos</strong> na próxima rodada.</li>
        <li><strong>Guiar (Intuição CD 15):</strong> Instrui aliados após escapar. Um aliado recebe <strong>+2 em seu próximo teste</strong> nesta rodada.</li>
      </ul>
    `
  },
  {
    origem: "Duelo de Dragões",
    nd: "3",
    tipo: "Desafio de precisão e evasão aérea",
    nome: "Céus Hostis",
    imagem: "https://i.makeagif.com/media/2-04-2019/u3sGsK.gif",
    efeito: `
      <strong>Objetivo:</strong> Ajudar Dame Lia a pilotar a carruagem até o Castelo Monteclaro evitando ataques puristas.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa alcançar <strong>7 sucessos em testes de Navegar</strong> para chegar ao destino com segurança.</li>
        <li>A cada falha em Navegar, uma patrulha purista em terra detecta a carruagem e dispara armas de cerco: todos sofrem <strong>2d6 de dano</strong> (1–2 fogo, 3–4 impacto, 5–6 perfuração). Reflexos CD 15 evita o dano.</li>
        <li>Apenas <strong>um personagem pode fazer o teste de Navegar por rodada</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Navegar (Pilotagem ou Sobrevivência CD 20):</strong> Ajuda Dame Lia a pilotar a carruagem. Conta para os 7 sucessos necessários.</li>
        <li><strong>Ler Mapas (Conhecimento ou Sobrevivência CD 10):</strong> Auxilia com pontos de referência. Concede <strong>+2 no teste de Navegar</strong> desta rodada. Apenas um personagem pode ajudar por vez.</li>
        <li><strong>Ocultar (Furtividade CD 20):</strong> Orienta Dame Lia a esconder a carruagem. Uma falha em Navegar nesta rodada <strong>não provoca ataques</strong> dos puristas. Apenas um personagem pode fazer este teste por rodada.</li>
        <li><strong>Esconder-se (Nenhum teste):</strong> O personagem se abriga na carruagem, ganhando <strong>+5 em Reflexos</strong> nesta rodada contra as armas de cerco.</li>
      </ul>
    `
  },
  {
    origem: "Duelo de Dragões",
    nd: "4",
    tipo: "Desafio de agilidade e resgate",
    nome: "Deslizamento",
    imagem: "https://y.yarn.co/094a06fc-3b94-4f01-a693-3651d239472d_text.gif",
    efeito: `
      <strong>Objetivo:</strong> Escapar do deslizamento antes de ser soterrado.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo tem <strong>5 rodadas</strong> para se afastar dos escombros. A posição final de cada personagem é definida pelo número de sucessos acumulados em <em>Correr</em> ou <em>Carregar Outro</em>.</li>
        <li><strong>2 ou menos sucessos:</strong> Zona de Soterramento – sofre <strong>16d6 de dano de impacto</strong> e fica soterrado.</li>
        <li><strong>3 ou 4 sucessos:</strong> Zona de Deslizamento – sofre <strong>8d6 de dano de impacto</strong>.</li>
        <li><strong>5 ou mais sucessos:</strong> Escapa ileso.</li>
        <li>Personagens soterrados ficam imóveis e sofrem <strong>1d6 de dano de impacto</strong> no início de seus turnos. Para se soltar, é necessário um teste de <strong>Força CD 25</strong> (pode ser ajudado).</li>
        <li>Cavaleiros iniciantes ficam na mesma zona de seus respectivos personagens. Se ficarem na zona de soterramento, morrem; na zona de deslizamento, ficam feridos (podem ser curados com 50 PV ou mais).</li>
        <li>Stramm e Dame Lia não correm risco neste desafio.</li>
        <li>Teste de <strong>Iniciativa CD 20</strong>: quem passar pode fazer uma ação adicional na primeira rodada.</li>
        <li>Uma vez por cena, Dame Lia, Stramm ou um Cavaleiro pode permitir que um aliado <strong>repita um teste após falha</strong>.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Correr (Atletismo CD 20):</strong> Corre para longe do deslizamento. Cada sucesso afasta o personagem. Um resultado 10+ acima da CD ou um 20 natural conta como dois sucessos. Pode ser substituído por Cavalgar ou Pilotagem se aplicável.</li>
        <li><strong>Carregar Outro (Atletismo CD 25):</strong> Carrega um aliado próximo (com no máximo 1 sucesso de diferença). Ambos ganham 1 sucesso se passar.</li>
        <li><strong>Procurar Caminho (Percepção CD 20):</strong> Analisa o terreno e encontra rotas de fuga. Se passar, recebe <strong>+5 em testes de Correr e Carregar Outro</strong> durante o desafio.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Desafio Furtivo",
    nome: "Travessia das Estalactites",
    imagem: "https://i.redd.it/s474etbymngf1.gif",
    efeito: `
      <strong>Objetivo:</strong> Atravessar a área sofrendo o mínimo de dano possível.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Os personagens agem na ordem de sua Iniciativa, e cada um deve acumular <strong>três sucessos</strong> na ação <strong>Travessia Silenciosa</strong> para sair da área perigosa.</li>
        <li>Entretanto, assim que acontecer a <strong>primeira falha</strong> na ação Travessia Silenciosa, as estalactites do teto começam a cair, causando <strong>1d6</strong> pontos de dano de perfuração por falhas subsequentes à primeira.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Travessia Silenciosa (Furtividade CD 15):</strong> O personagem dá passos lentos e calmos em direção à saída.</li>
        <li><strong>Correr à Toda (Atletismo CD 15):</strong> Um personagem percorre todo o caminho (efetivamente conseguindo os três sucessos), mas sofre <strong>2d6</strong> pontos de dano de perfuração. Caso ninguém tenha falhado ainda, usar essa ação conta como uma falha.</li>
        <li><strong>Interpor-se (Nenhum):</strong> Um personagem usa sua rodada para sofrer o dano que um outro de menor iniciativa sofreria.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Missão de Salvamento",
    nome: "Resgate nas Chamas",
    imagem: "https://i.ibb.co/d4nF3LYw/az3ecs.gif",
    efeito: `
      <strong>Objetivo:</strong> Salvar as pessoas no interior do prédio antes que ele desabe.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O prédio queima durante <strong>cinco rodadas</strong>, ao final das quais desmorona. É possível atrasar o desabamento com a ação <strong>Apagar</strong>.</li>
        <li>Role iniciativa para os personagens para definir em que ordem agem durante o perigo.</li>
        <li>No início de cada um de seus turnos dentro do salão, cada personagem deve fazer um teste de <strong>Fortitude (CD 10 + 1 por teste anterior)</strong> para resistir aos efeitos da fumaça (Tormenta20, p. 319).</li>
        <li>Soluções criativas para se proteger, como um pano úmido no rosto, fornecem <strong>+2</strong> nesse teste.</li>
        <li>Um personagem que fique inconsciente dentro do prédio devido à fumaça pode ser resgatado como um NPC.</li>
        <li>Dentro do prédio existem <strong>6 NPCs</strong>. Três ocupam <strong>10 espaços</strong> cada e outros três ocupam apenas <strong>5</strong>. Um personagem sobrecarregado sofre uma penalidade de <strong>–5</strong> no teste de <strong>Resgatar</strong>.</li>
        <li>Quando o prédio desaba, quaisquer personagens dentro dele sofrem <strong>6d6</strong> pontos de dano de fogo e ficam soterrados pelos escombros. Qualquer NPC que não tenha sido resgatado morre.</li>
        <li>Personagens soterrados ficam imóveis e em chamas. Soltar-se (ou soltar um personagem soterrado) exige um teste de <strong>Força (CD 15)</strong>. Entretanto, cada tentativa causa <strong>1d6</strong> pontos de dano de fogo em quem estiver fazendo o teste. Vários personagens podem ajudar nesse teste.</li>
        <li>Assim que resgatam todos, ou o tempo acaba, o prédio vem abaixo. Porém, um dos elementais em forma de mariposa avança na direção dos aventureiros.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Apagar (Destreza ou Inteligência CD 10):</strong> Você abafa focos do incêndio. Se passar, faz com que o salão resista por mais <strong>1 rodada</strong> antes do desmoronamento. Essa ação pode ser realizada apenas de fora do prédio.</li>
        <li><strong>Escapar (Acrobacia ou Atletismo CD 10):</strong> Você sai do salão. Essa ação só pode ser usada se não estiver carregando um NPC.</li>
        <li><strong>Localizar (Investigação ou Percepção CD 15):</strong> Você localiza um dos NPCs presos no incêndio e pode retirá-lo do salão com uma ação <strong>Resgatar</strong>.</li>
        <li><strong>Resgatar (Atletismo CD 15):</strong> Você carrega um NPC para fora do salão, mas se falhar não consegue sair do salão nesta rodada.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "1",
    tipo: "Desafio Social",
    nome: "Atravessar o Salão do Baile",
    imagem: "https://media.tenor.com/u1hbJJYB-qsAAAAM/dancing-anime.gif",
    efeito: `
      <strong>Objetivo:</strong> Sair do salão.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>No início de seu turno, cada personagem deve fazer um teste de <strong>Vontade (CD 15)</strong> para evitar ser dominado pelo baile.</li>
        <li>Se falhar, perde <strong>1 PM</strong> e fica <strong>fascinado</strong>, sendo compelido a dançar até o dia seguinte (não pode fazer ações contra o perigo enquanto está dançando).</li>
        <li>Um personagem que passe um dia inteiro dançando fica <strong>fatigado</strong> no primeiro dia, <strong>exausto</strong> no segundo e <strong>inconsciente</strong> no terceiro. No quarto dia desperta, mas pode ser afetado novamente pelo efeito do salão.</li>
        <li>A turba de infectos invade a vila e o castelo no fim do quinto dia.</li>
        <li>Para sair do salão, o personagem precisa de <strong>3 sucessos</strong> nas ações <strong>Atravessar</strong> ou <strong>Puxar Outro</strong>. Esse avanço é uma representação de vários minutos (ou horas) tentando passar pelo extenso local cheio de gente.</li>
        <li>Aventureiros fora do salão de baile não estão mais sob efeito da música e podem seguir para a próxima cena.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Atravessar (Vontade ou Outras, CD 15):</strong> O personagem tenta resistir e avançar pelo salão. Se falhar, não avança. Se passar, acumula <strong>1 sucesso</strong> para sair do baile. Os testes podem ser de Vontade ou de qualquer outra perícia que o jogador consiga justificar e que o mestre aprove. Cada perícia que não seja Vontade só pode ser usada uma vez pelo perigo.</li>
        <li><strong>Apresentação Dissonante (Atuação CD 20):</strong> O personagem faz uma performance que, por alguns momentos, distrai o grupo inteiro do fascínio do salão. Todos os personagens recebem <strong>+5</strong> no próximo teste de Vontade para não ficar fascinado.</li>
        <li><strong>Puxar Outro (Vontade ou Outras, CD 20):</strong> O personagem puxa um aliado próximo (com no máximo um sucesso de diferença). Isso funciona como a ação <strong>Atravessar</strong>, acima, mas com CD maior. Se passar, o personagem acumula um sucesso para si e para o aliado.</li>
        <li><strong>Apresentação Dissonante (Atuação, CD varia):</strong> O personagem usa seu turno para distrair os companheiros com uma apresentação que combate a música do baile. O personagem faz um teste para ajudar (Tormenta20, p. 221). Todos os personagens (incluindo ele mesmo) recebem o bônus da ajuda em todos os testes contra o perigo até atravessarem o salão de baile.</li>
        <li><strong>Balançar Outro (Nenhum teste):</strong> O personagem deixa de avançar nessa rodada, mas balança um outro personagem, removendo a condição <strong>fascinado</strong>.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Desafio de Busca",
    nome: "Onde Está o X?",
    imagem: "https://gifdb.com/images/thumbnail/map-pirate-ship-motion-animation-qxx1rnhy6y6zo5pe.gif",
    efeito: `
      <strong>Objetivo:</strong> Procurar pelo local onde o tesouro foi enterrado.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>O grupo precisa acumular <strong>6 sucessos</strong> para encontrar o tesouro.</li>
        <li>Para cada falha, os personagens perdem <strong>1 PM</strong> devido ao esforço mental; um personagem reduzido a 0 PM desta forma fica <strong>frustrado</strong> até o fim do dia.</li>
        <li>Se o grupo acumular <strong>4 falhas</strong>, todos os personagens ficam frustrados até o fim do dia e só podem tentar novamente no dia seguinte (mas mantêm os sucessos acumulados).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Analisar Terreno (Sobrevivência CD 15):</strong> O personagem vasculha o local, procurando indícios como terra diferente ou padrões de movimentação antigos.</li>
        <li><strong>Consultar o Sobrenatural (Misticismo ou Religião CD 15):</strong> O personagem, arcano ou divino, pode usar suas habilidades para sentir as energias do local, especialmente se ligado à Dama Altiva ou Allihanna, que recebe <strong>+2</strong> neste teste. Cada personagem só pode usar esta ação uma vez.</li>
        <li><strong>Estudar o Mapa (Conhecimento CD 18):</strong> O personagem analisa pistas e algumas notas estranhas escritas no mapa, que ajudam a identificar locais possíveis nas ruínas.</li>
        <li><strong>Ajudar (varia CD 10):</strong> O personagem faz um teste para ajudar (Tormenta20, p. 221) um aliado. O jogador pode usar qualquer perícia que conseguir justificar — Atletismo para escalar as ruínas para melhor visão, Intuição para sentir por onde pessoas andariam etc. Este uso não conta como um sucesso.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Desafio de Infiltração",
    nome: "Examinar a Mansão",
    imagem: "https://media.tenor.com/PpPE0k4TAZEAAAAM/anime-angel-beats.gif",
    efeito: `
      <strong>Objetivo:</strong> Obter informações sobre como invadir a propriedade.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Os personagens devem decidir como evitarão suspeitas: misturando-se às pessoas ou se sentando em um café próximo.</li>
        <li>No início de cada rodada, os personagens que estiverem misturando-se ao resto das pessoas devem fazer um teste de <strong>Furtividade (CD 15 + 5 para cada teste anterior)</strong>.</li>
        <li>Se um personagem falhar em três desses testes, sua atitude suspeita atrai <strong>1d6+2 guardas de cidade</strong> (Tormenta20, p. 289), que o escoltam para uma conversa em uma de suas guaridas. Se tentar fugir, começa uma perseguição (Tormenta20, p. 274), em que o personagem deve abrir uma vantagem de <strong>100m</strong> dos guardas para poder escapar. De uma forma ou de outra, não poderá mais fazer testes nesse dia.</li>
        <li>Caso prefiram sentar-se no café, no fim de cada rodada devem gastar <strong>T$ 2d6</strong>. Se não forem capazes de pagar o valor, serão expulsos do estabelecimento. Isso atrairá atenção para o personagem, que sofrerá uma penalidade de <strong>–5</strong> em Furtividade se tentar misturar-se às pessoas. Um personagem pode deixar voluntariamente o café no início de seu turno para não ter de pagar o valor, mas não pode realizar os testes abaixo.</li>
        <li>A cada sucesso, recebem um bônus cumulativo para a cena 4 e 5. Se um personagem passar no teste, ele decide quem recebe o bônus (ele mesmo ou um de seus aliados).</li>
        <li>Assim que terminarem o reconhecimento da mansão (parando quando estiverem satisfeitos), ou se três personagens forem pegos pelos guardas, um alvoroço começa na porta da propriedade.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Analisar a Construção (Guerra ou Ofício adequado CD 20):</strong> O personagem observa os pontos principais do local, ajudando-o a traçar seus planos (<strong>+5</strong> em um teste à escolha do personagem).</li>
        <li><strong>Conquistar Confiança (Diplomacia ou Enganação CD 20):</strong> O personagem convence um dos funcionários a entregar-lhe um uniforme de serviçal (permitindo substituir os testes de Furtividade na cena 4 e 5 por Enganação). Só pode ser realizado por um personagem que tenha passado na ação <strong>Seduzir Servo</strong>.</li>
        <li><strong>Observar Movimentação (Investigação ou Percepção CD 15):</strong> O personagem presta atenção nas janelas da residência, notando que os guardas se movem apenas no primeiro andar (<strong>+2</strong> em testes de Iniciativa).</li>
        <li><strong>Perguntas sobre a Mansão (Diplomacia ou Investigação CD 15):</strong> O personagem questiona alguém que trabalha na área sobre a mansão e descobre que há um jardim murado na parte de trás da construção (<strong>+2</strong> em testes de Atletismo para escalar).</li>
        <li><strong>Perguntas sobre os Funcionários (Diplomacia ou Investigação CD 20):</strong> O personagem faz perguntas diretas sobre a rotina dos empregados, permitindo saber sua movimentação e que a maioria parte ao anoitecer (<strong>+2</strong> em testes de Furtividade).</li>
        <li><strong>Seduzir Servo (Diplomacia ou Enganação CD 15):</strong> O personagem usa seu charme para conquistar um dos serviçais da mansão (fazendo com que a porta dos fundos esteja destrancada na cena 4).</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "4",
    tipo: "Desafio de Sobrevivência",
    nome: "Expurgo Onírico",
    imagem: "https://giffiles.alphacoders.com/249/2492.gif",
    efeito: `
      <strong>Objetivo:</strong> Expulsar a presença sombria habitando a estátua e defender a sacerdotisa.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Sylvana possui <strong>40 pontos de vida</strong>. Ela estará completamente concentrada no ritual e não pode auxiliar os personagens de qualquer forma. Ela precisa ficar <strong>cinco rodadas</strong> realizando o rito.</li>
        <li>Assim que o ritual inicia, um verdadeiro enxame de come-sonhos se espalha pela praça, tentando impedi-la. No final de cada rodada, todos os personagens e Sylvana sofrem <strong>4d4+4</strong> pontos de dano de perfuração da mordida das criaturas, <strong>2d6</strong> de dano psíquico e perdem <strong>1d4+1 PM</strong>.</li>
        <li>Caso os PV de Sylvana sejam reduzidos a 0, a elfa fica inconsciente. Se Sylvana sofrer qualquer dano após este, ela morre. Um personagem pode fazer a ação <strong>Continuar Ritual</strong> para mantê-lo pelas rodadas restantes. Caso falhe no teste, o ritual falha, manifestando o espectro do pesadelo.</li>
        <li>Caso consigam manter o ritual durante cinco rodadas, ouvem um relincho espectral ao longe e os come-sonhos desaparecem.</li>
        <li>Entretanto, se falharem, ou se tentarem simplesmente destruir a estátua, causando qualquer dano a ela, uma criatura sombria se manifesta.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Atacar Come-Sonhos (Luta ou Pontaria CD 18):</strong> O personagem golpeia uma quantidade das criaturas. Escolha um dos outros participantes do ritual, incluindo Sylvana, para não sofrer o dano no final da rodada.</li>
        <li><strong>Continuar Ritual (Religião CD 20):</strong> Caso Sylvana tenha sido derrotada, um único personagem pode fazer esse teste em uma rodada.</li>
        <li><strong>Distrair (Atuação ou Enganação CD 17):</strong> O personagem age de maneira inesperada, deixando os come-sonhos confusos. Reduza todo o dano causado pelas criaturas pela metade no final desta rodada.</li>
        <li><strong>Interpor-se (Nenhum teste):</strong> O personagem coloca-se na frente de outro, sofrendo, no fim da rodada, o dobro do dano, mas evitando que outro o sofra.</li>
        <li><strong>Lançar Magia (Vontade CD 20 + Custo em PM da magia):</strong> O personagem pode lançar uma magia que cause dano em área (com os mesmos resultados da ação <strong>Atacar Come-Sonhos</strong>), de cura para recuperar os próprios PV ou de Sylvana, ou que auxilie no perigo complexo. Se falhar no teste a magia é perdida, mas os PM são gastos mesmo assim.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "8",
    tipo: "Fuga",
    nome: "Desabamento dos Túneis",
    imagem: "https://media.tenor.com/6iufT2dm3DEAAAAM/cartoon-earthquake.gif",
    efeito: `
      <strong>Objetivo:</strong> Sair das cavernas.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Os túneis serão completamente destruídos em <strong>7 rodadas</strong>. Para escapar, um personagem precisa acumular <strong>5 sucessos</strong> nas ações <strong>Avançar</strong>, <strong>Correr</strong> ou <strong>Carregar Outro</strong>.</li>
        <li>No início de cada rodada, role <strong>1d6</strong> e consulte a lista de efeitos abaixo:
          <ul>
            <li><strong>1-2) Destroços.</strong> Destroços caem do teto. Cada personagem deve fazer um teste de <strong>Reflexos (CD 25)</strong>. Se falhar, sofre <strong>4d6</strong> pontos de dano de impacto. Se falhar por 10 ou mais, o dano aumenta para <strong>8d6</strong>.</li>
            <li><strong>3-4) Fenda no chão.</strong> Rachaduras se abrem no chão. Cada personagem deve fazer um teste de <strong>Acrobacia ou Atletismo (CD 25)</strong>. Se falhar, tropeça e sofre <strong>–5</strong> em sua próxima ação contra o perigo. Se falhar por 10 ou mais, cai e perde sua ação nesta rodada.</li>
            <li><strong>5) Bloqueio.</strong> Um desabamento vai bloquear o caminho! O personagem pode desistir desta rota e procurar outra (perde a ação nesta rodada, mas age normalmente a partir da próxima) ou tentar correr antes que o desabamento termine. Nesse caso, precisa fazer um teste de <strong>Atletismo (CD 25)</strong>. Se passar, pode fazer sua ação nesta rodada. Se falhar, perde a ação e sofre <strong>8d6</strong> pontos de dano de impacto.</li>
            <li><strong>6) Passagem livre.</strong> Este túnel é mais resistente, mas as paredes estão perto de ruir. Os personagens não sofrem qualquer efeito neste turno, mas devem continuar correndo ou serão soterrados.</li>
          </ul>
        </li>
        <li>Ao fim da sétima rodada, qualquer personagem que não tenha acumulado <strong>5 sucessos</strong> será atingido pelo desabamento, sofrendo <strong>20d6</strong> pontos de dano de impacto (sem teste de resistência).</li>
        <li>O túnel que dá acesso à superfície é bem perto do centro da vila. Antes que consigam pensar muito, todos sentem o chão tremer.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Avançar (Acrobacia ou Reflexos CD 25):</strong> O personagem avança com cuidado em direção à saída. Um sucesso por 10 ou mais (ou um <strong>20 natural</strong> no teste) conta como <strong>2 sucessos</strong>.</li>
        <li><strong>Correr (Atletismo CD 20):</strong> O personagem corre em direção à saída sem se preocupar com os perigos em seu caminho. Ele sofre <strong>4d6</strong> pontos de dano de impacto. Um sucesso por 10 ou mais (ou um 20 natural no teste) conta como <strong>2 sucessos</strong>.</li>
        <li><strong>Carregar Outro (Atletismo CD 30):</strong> O personagem carrega um aliado próximo (com no máximo 1 sucesso de diferença). Isto funciona como a ação <strong>Avançar</strong>. Se passar, o personagem acumula <strong>1 sucesso</strong> para si e para o aliado. Se falhar, ambos sofrem dano.</li>
        <li><strong>Procurar Caminho (Percepção CD 20):</strong> O personagem analisa o terreno em busca de uma rota de fuga. Se passar, recebe <strong>+5</strong> em todos os testes para <strong>Avançar</strong>, <strong>Correr</strong> e <strong>Carregar Outro</strong> realizados durante o perigo.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Defesa",
    nome: "Perigo na Cabana",
    imagem: "https://media2.giphy.com/media/u0SQkPClLiBry/giphy.gif",
    efeito: `
      <strong>Objetivo:</strong> Causar o máximo de dano contra a Horda.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>A Horda possui <strong>100 Pontos de Vida</strong>, enquanto a Cabana possui <strong>30 Pontos de Vida</strong> (mais qualquer bônus pela ação <strong>Montar Barricada</strong>, da Cena 3).</li>
        <li>A cada rodada, os personagens devem realizar uma das ações abaixo. Ao final da rodada, quando todos os personagens já tiverem realizado suas ações, a Cabana sofre <strong>2d8+3</strong> pontos de dano.</li>
        <li>Causando até <strong>50</strong> pontos de dano, o combate na Cena 5 ocorre assim como descrito. Causando entre <strong>51 e 99</strong> pontos de dano, remova os <strong>2 Corneteiros Amaldiçoados</strong> do combate. E, se conseguirem levar a Horda a <strong>0 Pontos de Vida</strong>, além dos 2 Corneteiros a menos, o <strong>Comandante Sem Cabeça</strong> terá apenas metade de seus Pontos de Vida (para um total de <strong>24 PVs</strong>).</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Ataque Corpo a Corpo (Luta CD 12):</strong> Com um sucesso, o personagem causa o dano de um ataque corpo a corpo com quaisquer melhorias ou habilidades, mas sofre <strong>1d8+3</strong> de Dano de Corte.</li>
        <li><strong>Ataque à Distância (Pontaria CD 12):</strong> Com um sucesso, o personagem causa metade do dano de um ataque à distância com quaisquer melhorias ou habilidades.</li>
        <li><strong>Reforçar Barricada (Força CD 10):</strong> Com um sucesso, a Cabana recupera <strong>5 Pontos de Vida</strong>, <strong>+5 PVs</strong> para cada 5 pontos acima da Dificuldade.</li>
        <li><strong>Usar itens ou magias que provocam dano:</strong> Dano normal, mas efeitos em área provocam <strong>50% a mais</strong> de dano.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "4",
    tipo: "Desafio Social",
    nome: "Entretendo a Bruxa",
    imagem: "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyMnBubnJsaW9kcnhlazVmd3ZzbmhrM3Vkamttb2NmYmlwMXU1eHliaCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/mrntmDtLQdILS/200w.gif",
    efeito: `
      <strong>Objetivo:</strong> Convencer Sophia a ajudá-los a remover a maldição da Caçada.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Para conseguir o apoio de Sophia, o grupo como um todo deve acumular <strong>cinco sucessos</strong> nas ações <strong>Apresentação</strong>, <strong>Brincadeiras</strong> e <strong>Quitutes</strong>.</li>
        <li>Aqueles que tiverem uma falha sentem-se julgados pela aniversariante, ficando <strong>frustrados</strong> até o final do dia.</li>
        <li>Caso alguém acumule <strong>duas falhas</strong>, será transformado em um inofensivo <strong>pudim de ameixa</strong>, como o efeito da magia <strong>Metamorfose</strong>, mas sem direito a qualquer teste para resistir.</li>
        <li>Se todos forem transformados em pudim de ameixa, escapam da Caçada Selvagem, ao menos por enquanto, acordando no meio da mata, esmorecidos e fatigados até conseguirem dormir por oito horas.</li>
        <li>Tendo feito a bruxa feliz, ela concorda em ajudá-los. E para isso... terão que fazer o chá!</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Apresentação (Atuação CD 22):</strong> Dança, música ou outra forma de arte é usada para agradar a anfitriã.</li>
        <li><strong>Brincadeiras (Jogatina CD 22):</strong> Jogos ou brincadeiras ajudam a passar o tempo.</li>
        <li><strong>Quitutes (Ofício [Cozinheiro] CD 24):</strong> Usando as rações de viagem, ou ingredientes que tenham coletado, criam um prato capaz de agradar o paladar exigente da bruxa.</li>
        <li><strong>Presentear:</strong> O que seria de um aniversário sem presentes? Para ser considerado um presente, é necessário que o item custe ao menos <strong>T$ 300</strong>. Esta ação cancela os efeitos de uma falha, removendo a condição frustrado ou retornando alguém à forma original.</li>
        <li><strong>Outras ações (CD 25):</strong> Ações que tenham uma boa justificativa podem ser usadas, como fazer um belo discurso com Diplomacia ou truques de mágica com Misticismo. O CD para esses testes é <strong>25</strong>, e cada perícia não listada em uma ação só pode ser usada uma vez.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Jogo de Azar",
    nome: "Cavilan de Marujo",
    imagem: "https://media.tenor.com/WH5-sVVBlaEAAAAM/toss-coin-flip.gif",
    efeito: `
      <strong>Objetivo:</strong> Acabar com o dinheiro dos marujos para que voltem ao navio.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>A aposta inicial é de <strong>T$ 50</strong>. Caso mais de uma pessoa entre no jogo, ambos terão de fazer a mesma aposta, considerando os tibares de cada um nas rodadas. Os piratas contam como um só, tendo <strong>T$ 150</strong>.</li>
        <li>A cada rodada o personagem que joga deve escolher entre apostar <strong>10 ou 30 tibares</strong>, e os piratas entrarão com o <strong>triplo</strong> do valor, representando os três cobrindo a aposta. Caso não tenha tibares o suficiente para cobrir a aposta, os piratas apostam tudo que tiverem.</li>
        <li>Quando o dinheiro acabar, os piratas se retiram, carregando o desacordado, e agradecendo pela partida. Do outro lado do aposento há mais um alçapão que leva à câmara onde o refém está sendo mantido.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Jogada Simples (Jogatina CD 16):</strong> Um turno simples, sem complicação. Se passar no teste, leva todo o valor apostado.</li>
        <li><strong>Blefe (Enganação CD 18):</strong> Através de manipulação, você convence os outros jogadores a desistir, mesmo que tenham uma boa mão. Se passar, recebe todos os tibares apostados.</li>
        <li><strong>Trapacear (Ladinagem CD 16):</strong> Claro que esta carta não estava no seu bolso. Se passar no teste, leva a aposta; se não, é pego no truque recebendo um soco que causa <strong>1d3+2</strong> pontos de dano de impacto.</li>
        <li><strong>Ofender (Intimidação CD 18):</strong> Caso tenha falhado em um teste em uma rodada anterior, é possível acusar um dos marujos de trapaça, recebendo <strong>+2</strong> em seu próximo teste.</li>
        <li><strong>Ajudar ou Atrapalhar (varia CD 20):</strong> Personagens que não estejam envolvidos no jogo podem ajudar seu colega ou atrapalhar os outros oponentes de alguma forma, fornecendo um bônus cumulativo de <strong>+2</strong> a uma pessoa que esteja jogando. Qualquer perícia justificável pode ser usada, porém apenas uma vez.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Ritual",
    nome: "Exorcismo",
    imagem: "https://media1.tenor.com/m/LfLwRfMn8xsAAAAd/golden-time-exorcist.gif",
    efeito: `
      <strong>Objetivo:</strong> Acalmar os fantasmas e enviá-los para os mundos dos deuses.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>No início de cada rodada, cada personagem deve fazer um teste de <strong>Vontade (CD 20)</strong>. Se falhar, fica <strong>abalado</strong>. Se já está abalado, fica <strong>apavorado</strong> e, se já está apavorado, foge do prédio e só consegue retornar no amanhecer seguinte.</li>
        <li>Ao fim de cada rodada, todos na sala sofrem <strong>2d6</strong> pontos de dano de trevas, vindos das emanações negativas dos mortos.</li>
        <li>Para completar o ritual, o grupo precisa acumular <strong>cinco sucessos</strong> na ação <strong>Exorcizar</strong>. Caso Selin fique encarregado de realizar o ritual, será necessário protegê-lo.</li>
        <li>Quando o ritual termina, as almas desaparecem, e o barulho é trocado por um silêncio sepulcral. Sobre o pilar, o objeto que vieram buscar.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Exorcizar (Religião CD 16):</strong> O personagem entoa cânticos religiosos para encomendar as almas penadas aos deuses. Apenas um personagem pode fazer esta ação por rodada.</li>
        <li><strong>Interpor-se (Vontade CD 16):</strong> O personagem se posiciona para proteger quem estiver realizando a ação <strong>Exorcizar</strong>. Se passar, o personagem sofre o dano da rodada no lugar de quem ele estiver protegendo.</li>
        <li><strong>Motivar (varia):</strong> Personagens que não estejam realizando a ação <strong>Exorcizar</strong> podem motivar quem a estiver fazendo, usando uma perícia apropriada, de acordo com o mestre, para ajudar no teste (Tormenta20, capítulo 5: Jogando). O bônus fornecido é cumulativo com testes seguintes até o fim do perigo.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Desafio Social",
    nome: "Solidificar Reputação",
    imagem: "https://media.tenor.com/Ynm40n9fwNMAAAAM/chainsaw-man-dance.gif",
    efeito: `
      <strong>Objetivo:</strong> Aumentar a influência de Viellmont com os convidados do banquete.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Os personagens terão <strong>três rodadas</strong>, representando as primeiras horas do evento, para solidificar a posição do lorde Viellmont. Para isso, devem acumular <strong>cinco sucessos</strong> nas ações <strong>Estabelecer Presença</strong>, <strong>Performance</strong>, <strong>Politicagem</strong> e <strong>Preparar Prato</strong>. Se falharem em acumular cinco sucessos, os personagens não sofrem nenhuma consequência adicional, exceto perder a oportunidade de ajudar Viellmont.</li>
        <li>Os personagens agem de acordo com seu Carisma. Aqueles de maior valor agem primeiro, e em caso de empate, devem decidir entre si.</li>
        <li>Se conseguirem conquistar os cinco sucessos necessários, lorde Viellmont é chamado para o círculo onde estão os anfitriões da festa. Em sua alegria quase infantil, o nobre entrega o resto do dinheiro aos aventureiros, e diz que os premiará ainda mais quando estiverem de volta à sua residência. Entretanto, caso não consigam os sucessos, o barão começa a ser evitado nas rodas de conversa, sendo considerado patético por ter asseclas tão rudes.</li>
        <li>Além disso, cada sucesso além dos cinco necessários rende <strong>T$ 200 tibares</strong> em presentes dados aos personagens pelos convidados.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Conduzir a Conversa (Enganação CD 15):</strong> O personagem se intromete na conversa de um colega de grupo, fazendo com que o rumo dela o favoreça. Se passar, fornece <strong>+5</strong> no próximo teste desse colega.</li>
        <li><strong>Estabelecer Presença (Intimidação CD 25):</strong> O personagem atrai os nobres com sua presença altiva e orgulhosa.</li>
        <li><strong>Performance (Atuação CD 25):</strong> O personagem entretém os convidados do jantar.</li>
        <li><strong>Politicagem (Diplomacia CD 22):</strong> O personagem atrai os nobres através de conversa hábil.</li>
        <li><strong>Preparar Prato (Ofício [Cozinheiro] CD 25):</strong> O personagem utiliza suas habilidades culinárias para impressionar os convidados.</li>
        <li><strong>Seguir Protocolos (Nobreza CD 15):</strong> O personagem conhece e segue à risca a etiqueta ahleniense. Se passar, recebe um bônus de <strong>+5</strong> em seu próximo teste, ou fornece um bônus de <strong>+5</strong> no próximo teste de um colega.</li>
      </ul>
    `
  },

  {
    origem: "Breves Jornadas",
    nd: "2",
    tipo: "Fuga",
    nome: "Despistando Perseguidores",
    imagem: "https://media.tenor.com/qqpbDvJz9pcAAAAM/correndo-anime.gif",
    efeito: `
      <strong>Objetivo:</strong> Despistar os recrutas do Clã da Lotus.
      <hr>
      <strong>Efeito:</strong>
      <ul>
        <li>Para fugir, cada personagem deve conseguir <strong>3 sucessos</strong> na ação <strong>Escapar</strong> em <strong>5 rodadas</strong>, agindo em ordem de iniciativa.</li>
        <li>No final de cada rodada, qualquer personagem que não tenha obtido um sucesso em qualquer uma das ações abaixo sofre <strong>2d6</strong> pontos de dano de perfuração. Porém, um personagem pode escolher falhar propositalmente em sua ação na rodada para sofrer o dano no lugar de um companheiro, para um total de <strong>4d6</strong> pontos de dano.</li>
        <li>Se no final da quinta rodada um personagem não tiver conseguido os <strong>3 sucessos</strong>, será alcançado por dois recrutas do Clã da Lotus, e um combate irá começar. Aqueles que tiverem conseguido os sucessos necessários podem retornar para auxiliar o companheiro nesse combate.</li>
        <li>Após algum tempo correndo, ou depois de enfrentar os inimigos, os disparos cessam e fica claro que o grupo agora está livre dos perseguidores.</li>
      </ul>
      <hr>
      <h6 class="text-danger"><strong>Testes:</strong></h6>
      <ul>
        <li><strong>Escapar (Acrobacia ou Atletismo CD 20):</strong> Seja forçando suas pernas ou agilmente desviando de obstáculos, você se distancia dos inimigos.</li>
        <li><strong>Criar Obstáculos (Força CD 10 ou Ladinagem ou Sobrevivência CD 20):</strong> Derrubando caixas ou preparando uma armadilha improvisada, você fornece <strong>+5</strong> nos testes de <strong>Escapar</strong> de outros personagens.</li>
        <li><strong>Disparar de Volta (Pontaria CD 13):</strong> Você dispara contra um dos perseguidores, recebendo <strong>+5</strong> em seu próximo teste de <strong>Escapar</strong>.</li>
        <li><strong>Lançar Magia (Misticismo CD 20 + Custo em PM da magia):</strong> Você recebe o benefício de uma magia, ou usa uma apropriada para atrapalhar os perseguidores, recebendo <strong>+5</strong> em seu próximo teste de <strong>Escapar</strong>.</li>
      </ul>
    `
  }

];

const buscaInput = document.querySelector("#busca");
const origemSelect = document.querySelector("#origem");
const ndSelect = document.querySelector("#nd");
const tipoSelect = document.querySelector("#tipo");
const container = document.querySelector("#perigos-container");
const ordemSelect = document.querySelector("#ordem");
const brevesInput = document.querySelector("#incluir-breves");


function perigosVisiveis() {
  return brevesInput.checked
    ? perigos
    : perigos.filter(p => p.origem !== "Breves Jornadas");
}


function preencherSelect(select, opcoes) {
  const optionTodos = document.createElement("option");
  optionTodos.value = "todos";
  optionTodos.textContent = "Todos";
  select.appendChild(optionTodos);

  opcoes.forEach(opcao => {
    const option = document.createElement("option");
    option.value = opcao;
    option.textContent = opcao;
    select.appendChild(option);
  });
}

function carregarPerigos() {
  ordemSelect.addEventListener("change", filtrarPerigos);
  const base = perigosVisiveis();
  const origens = Array.from(new Set(base.map(p => p.origem))).sort();
  const nds = Array.from(new Set(perigos.map(p => p.nd))).sort((a, b) => parseFloat(a) - parseFloat(b));
  const tipos = Array.from(new Set(perigos.map(p => p.tipo))).sort();

  preencherSelect(origemSelect, origens);
  preencherSelect(ndSelect, nds);
  preencherSelect(tipoSelect, tipos);

  origemSelect.addEventListener("change", filtrarPerigos);
  ndSelect.addEventListener("change", filtrarPerigos);
  tipoSelect.addEventListener("change", filtrarPerigos);
  buscaInput.addEventListener("input", filtrarPerigos);
  brevesInput.addEventListener("change", () => {
    origemSelect.innerHTML = "";
    preencherSelect(origemSelect, Array.from(new Set(perigosVisiveis().map(p => p.origem))).sort());
    filtrarPerigos();
  });

  perigos.forEach(p => {
    p.efeito = formatarEfeito(p.efeito);
  });

  filtrarPerigos();
}

function filtrarPerigos() {
  const origem = origemSelect.value;
  const nd = ndSelect.value;
  const tipo = tipoSelect.value;
  const busca = buscaInput.value.toLowerCase();
  const ordem = ordemSelect.value;

  let filtrados = perigosVisiveis().filter(p => {
    const textoCompleto = (
      p.nome + " " +
      p.nd + " " +
      p.origem + " " +
      p.tipo + " " +
      p.efeito
    ).toLowerCase();

    return (
      (origem === "todos" || p.origem === origem) &&
      (nd === "todos" || p.nd === nd) &&
      (tipo === "todos" || p.tipo === tipo) &&
      textoCompleto.includes(busca)
    );
  });

  // Ordenar se necessário
  if (ordem === "crescente") {
    filtrados.sort((a, b) => parseFloat(a.nd) - parseFloat(b.nd));
  } else if (ordem === "decrescente") {
    filtrados.sort((a, b) => parseFloat(b.nd) - parseFloat(a.nd));
  }

  container.innerHTML = "";
  filtrados.forEach(p => {
    const card = document.createElement("div");
    card.className = "col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="card h-100 perigo-card" style="cursor: pointer;">
        <img src="${p.imagem}" class="card-img-top" alt="${p.nome}">
        <div class="card-body">
          <h5 class="card-title text-danger fw-bold mb-1">${p.nome} (ND ${p.nd})</h5>
          <h6 class="card-subtitle text-warning fw-bold mb-2">${p.origem} - ${p.tipo}</h6>
          <div class="efeito collapse">${p.efeito}</div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}


// Expansão/recolhimento do efeito ao clicar no card
document.addEventListener("click", function (e) {
  const card = e.target.closest(".perigo-card");
  if (card) {
    const efeito = card.querySelector(".efeito");
    efeito.classList.toggle("collapse");
  }
});


function formatarEfeito(html) {
  return html
    // Objetivo e Efeito em vermelho e negrito
    .replace(/<strong>Objetivo:<\/strong>/g, `<span class="text-danger fw-bold">Objetivo:</span>`)
    .replace(/<strong>Efeito:<\/strong>/g, `<span class="text-danger fw-bold">Efeito:</span>`)
    // Remover "Testes:"
    .replace(/<h6[^>]*>.*?Testes:.*?<\/h6>/gi, '')
    // Deixa todos os títulos dos testes em vermelho e negrito
    .replace(/<strong>([^<]+?)<\/strong>/g, `<span class="text-danger fw-bold">$1</span>`)
    // CD xx → negrito e roxo
    .replace(/\b(CD\s*\d+)\b/gi, `<span class="fw-bold text-purple">$1</span>`)
    // Dados de dano tipo 1d6, 16d6 etc → negrito e azul
    .replace(/\b(\d+d\d+)\b/gi, `<span class="fw-bold text-primary">$1</span>`);
}


carregarPerigos();

// ================================================================
