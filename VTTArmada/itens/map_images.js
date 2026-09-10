/**
 * Script para mapear imagens do Tormenta20-master para os itens do VTTArmada.
 * 
 * Estratégia: Para cada item no arquivo JS, encontra a imagem correspondente
 * e insere o campo "imagem" antes do fechamento do objeto (}).
 */

const fs = require('fs');
const path = require('path');

// ===== CONFIGURAÇÃO =====
const TORMENTA_ICONS = 'C:/Users/PICHAU/Downloads/Tormenta20-master/Tormenta20-master/icons/itens';
const VTTARMADA_DATA = 'C:/Users/PICHAU/Downloads/VTTArmada-main/VTTArmada-main/itens/data';
const IMG_OUTPUT = 'C:/Users/PICHAU/Downloads/VTTArmada-main/VTTArmada-main/itens/data/img';

const IMAGE_FOLDERS = [
    path.join(TORMENTA_ICONS, 'equipamentos'),
    path.join(TORMENTA_ICONS, 'gerais'),
    path.join(TORMENTA_ICONS, 'itens-magicos')
];

const DATA_FILES = ['armas.js', 'armaduras.js', 'itens.js', 'itensmagicos.js'];

// ===== NORMALIZAÇÃO =====

function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function normalizeForMatch(name) {
    let n = name.toLowerCase().trim();
    n = removeAccents(n);
    n = n.replace(/\s*\(.*?\)\s*/g, ''); // Remove parênteses
    n = n.replace(/[\s_]+/g, '-');        // Espaços -> hífens
    n = n.replace(/[^a-z0-9-]/g, '');     // Só alfanumérico e hífens
    n = n.replace(/-+/g, '-').replace(/^-|-$/g, '');
    return n;
}

// ===== MAPEAMENTO CUSTOMIZADO =====
const CUSTOM_MAPPINGS = {
    'adaga': 'adaga',
    'espada curta': 'espada-curta',
    'espada longa': 'espada-longa',
    'espada bastarda': 'espada-bastarda',
    'arco curto': 'arco-curto',
    'arco longo': 'arco-longo',
    'besta leve': 'besta-leve',
    'besta pesada': 'besta-pesada',
    'cajado de batalha': 'cajado-de-batalha',
    'corrente de espinhos': 'corrente-de-espinhos',
    'escudo leve': 'escudo-leve',
    'escudo pesado': 'escudo-pesado',
    'lança montada': 'lanca-montada',
    'maça de guerra': 'maca-de-guerra',
    'machado de batalha': 'machado-de-batalha',
    'machado de guerra': 'machado-de-guerra',
    'machado anão': 'machado-anao',
    'machado táurico': 'machado-taurico',
    'martelo de guerra': 'martelo-de-guerra',
    'ataque desarmado': 'ataque-desarmado',
    'meia-armadura': 'meia-armadura',
    'armadura acolchoada': 'armadura-acolchoada',
    'armadura completa': 'armadura-completa',
    'armadura de couro': 'armadura-couro',
    'couro batido': 'couro-batido',
    'gibão de peles': 'gibao-peles',
    'cota de malha': 'cota-malha',
    'loriga segmentada': 'loriga-segmentada',
    'água benta': 'agua-benta',
    'bandoleira de poções': 'bandoleira-de-pocoes',
    'bolsa de componentes': 'componentes-materiais',
    'corda (10m)': 'corda',
    'equipamento de viagem': 'equipamento-de-viagem',
    'estojo de disfarces': 'estojo-de-disfarces',
    'kit de medicamentos': 'kit-medicamentos',
    'maleta de medicamentos': 'maleta-de-medicamentos',
    'mochila de aventureiro': 'mochila-de-aventureiro',
    'ração de viagem': 'racao-viagem',
    'saco de dormir': 'saco-de-dormir',
    'símbolo sagrado': 'simbolo-sagrado',
    'traje da corte': 'traje-da-corte',
    'traje de artista': 'traje-artista',
    'traje de sacerdote': 'traje-de-sacerdote',
    'traje de viajante': 'traje-de-viajante',
    'traje de viagem': 'traje-viajante',
    'traje de plebeu': 'traje-plebeu',
    'uniforme militar': 'uniforme-militar',
    'fogo alquímico': 'fogo-alquimico',
    'kit de ladrão': 'kit-ladrao',
    'pó de giz': 'po-de-giz',
    'pé de cabra': 'pe-de-cabra',
    'anel sinete': 'anel-sinete',
    'espelho de metal': 'espelho-de-metal',
    'instrumento musical': 'instrumento-musical',
    'instrumentos de ofício': 'instrumentos-de-oficio',
    'luva de pelica': 'luva-de-pelica',
    'bálsamo restaurador': 'balsamo-restaurador',
    'bomba de fumaça': 'bomba-fumaca',
    'botas reforçadas': 'botas-reforcadas',
    'cajado arcano': 'cajado-arcano',
    'camisa bufante': 'camisa-bufante',
    'capa esvoaçante': 'capa-esvoacante',
    'capa pesada': 'capa-pesada',
    'casaco longo': 'casaco-longo',
    'chapéu arcano': 'chapeu-arcano',
    'componentes materiais': 'componentes-materiais',
    'enfeite de elmo': 'enfeite-de-elmo',
    'essência de mana': 'essencia-mana',
    'farrapos de ermitão': 'farrapos-de-ermitao',
    'flauta mística': 'flauta-mistica',
    'gorro de ervas': 'gorro-de-ervas',
    'instrumento musical exótico': 'instrumento-musical-exotico',
    'insígnia do exército': 'insignia-do-exercito',
    'insígnia de milícia': 'insignia-milicia',
    'livro de fórmulas': 'livro-formulas',
    'manto cerimonial': 'manto-cerimonial',
    'manto eclesiástico': 'manto-eclesiastico',
    'medalhão de prata': 'medalhao-de-prata',
    'orbe cristalina': 'orbe-cristalina',
    'organizador de pergaminhos': 'organizador-de-pergaminhos',
    'robe místico': 'robe-mistico',
    'saco de lona': 'saco-de-lona',
    'sapatos de camurça': 'sapatos-de-camurca',
    'tambor das profundezas': 'tambor-das-profundezas',
    'tomo hermético': 'tomo-hermetico',
    'traje camuflado': 'traje-camuflado',
    'traje estrangeiro': 'traje-estrangeiro',
    'varinha arcana': 'varinha-arcana',
    'veste de seda': 'veste-de-seda',
    'cetro elemental': 'cetro-elemental',
    'vara de madeira': 'vara-madeira',
    'bolsa de pó': 'bolsa-de-po',
    'andrajos de aldeão': 'andrajos-de-aldeao',
    'bolas de malabarista': 'bolas-malabarista',
    'item de admirador': 'item-admirador',
    'item estrangeiro': 'item-estrangeiro',
    'jóia falsificada': 'joia-falsificada',
    'jóia de família': 'joia-familia',
    'joia falsificada': 'joia-falsificada',
    'joia de família': 'joia-familia',
    'kit de ofício': 'kit-oficio',
    'kit de disfarce': 'kit-disfarce',
    'livro aprimorado': 'livro-aprimorado',
    'luva de ferro': 'luva-de-ferro',
    'madeira mágica': 'madeira-magica',
    'gemas preciosas': 'gemas-preciosas',
    'grimório': 'grimorio',
    'pó do desaparecimento': 'po-do-desaparecimento',
    'pó de cristal': 'po-de-cristal',
    'saco de sal': 'saco-de-sal',
    'seixo de âmbar': 'seixo-de-ambar',
    'costela de lich': 'costela-de-lich',
    'couro de basilisco': 'couro-de-basilisco',
    'couro de dragão': 'couro-de-dragao',
    'dedo de ente': 'dedo-de-ente',
    'dente de dragão': 'dente-de-dragao',
    'essência abissal': 'essencia-abissal',
    'gelo eterno': 'gelo-eterno',
    'líquen lilás': 'liquen-lilas',
    'matéria vermelha': 'materia-vermelha',
    'metal arco-íris': 'metal-arco-iris',
    'musgo púrpura': 'musgo-purpura',
    'ossos de monstro': 'ossos-de-monstro',
    'terra de cemitério': 'terra-de-cemiterio',
    'aço-rubi': 'aco-rubi',
    'ácido': 'acido',
    
    // Itens Mágicos - Armas
    'azagaia dos relâmpagos': 'azagaia-do-relampago',
    'espada baronial': 'espada-baronial',
    'lâmina da luz': 'lamina-da-luz',
    'florete fugaz': 'florete-fugaz',
    'punhal traiçoeiro': 'punhal-traicoeiro',
    'cajado da destruição': 'cajado-da-destruicao',
    'cajado da vida': 'cajado-da-vida',
    'cajado do poder': 'cajado-do-poder',
    'machado silvestre': 'machado-silvestre',
    'maça do terror': 'maca-do-terror',
    'martelo de doherimm': 'martelo-de-doherimm',
    'lança animalesca': 'lanca-animalesca',
    'língua do deserto': 'lingua-do-deserto',
    'vingadora sagrada': 'vingadora-sagrada',
    'avalanche': 'avalanche',
    'arco do juramento': 'arco-do-juramento',
    'arco do poder': 'arco-poder',
    'besta explosiva': 'besta-explosiva',
    'espada sortuda': 'espada-sortuda',

    // Itens Mágicos - Escudos
    'baluarte anão': 'baluarte-anao',
    'escudo do conjurador': 'escudo-do-conjurador',
    'escudo do deus-sol': 'escudo-do-deus-sol',
    'escudo do eclipse': 'escudo-do-eclipse',
    'escudo do leão': 'escudo-do-leao',
    'escudo espinhoso': 'escudo-espinhoso',

    // Itens Mágicos - Armaduras
    'armadura da luz': 'armadura-da-luz',
    'carapaça demoníaca': 'carapaca-demoniaca',
    'cota élfica': 'cota-elfica',
    'couraça do comando': 'couraca-do-comando',
    'couro de monstro': 'couro-de-monstro',
    'loriga do centurião': 'loriga-do-centuriao',
    'robe do arquimago': 'robe-do-arquimago',

    // Itens Mágicos - Acessórios e outros
    'amuleto': 'amuleto',
    'anel': 'anel',
    'anel de invisibilidade': 'anel-invisilidade',
    'anel refletor': 'anel-refletor',
    'bainha mágica': 'bainha-magica',
    'bola de cristal': 'bola-de-cristal',
    'botas aladas': 'botas-aladas',
    'botas velozes': 'botas-velozes',
    'braçadeiras do arqueiro': 'bracadeiras-do-arqueiro',
    'bracelete de bronze': 'bracelete-bronze',
    'bracelete de ouro': 'bracelete-ouro',
    'brincos': 'brincos',
    'caveira maldita': 'caveira-maldita',
    'chapéu do disfarce': 'chapeu-do-disfarse',
    'cinto da força do gigante': 'cinto-da-forca-do-gigante',
    'cinto do campeão': 'cinto-do-campeao',
    'colar guardião': 'colar-guardiao',
    'corda da escalada': 'corda-da-escalada',
    'coroa': 'coroa',
    'elmo do teletransporte': 'elmo-teletransporte',
    'espelho da oposição': 'espelho-da-oposicao',
    'espelho do aprisionamento': 'espelho-do-aprisonamento',
    'estatueta animista': 'estatueta-animista',
    'estola da serenidade': 'estola-da-serenidade',
    'faixas do pugilista': 'faixas-do-pugilista',
    'ferraduras da velocidade': 'ferraduras-da-velocidade',
    'flauta fantasma': 'flauta-fantasma',
    'garrafa da fumaça eterna': 'garrafa-da-fumaca-eterna',
    'gema da luminosidade': 'gema-da-luminosidade',
    'gema da telepatia': 'gema-da-telepatia',
    'gema elemental': 'gema-elemental',
    'lanterna da revelação': 'lanterna-da-revelacao',
    'luvas da delicadeza': 'luvas-da-delicadeza',
    'manoplas da força do ogro': 'manoplas-da-forca-do-ogro',
    'manto da aranha': 'manto-da-aranha',
    'manto da noite': 'manto-da-noite',
    'manto da resistência': 'manto-da-resistencia',
    'manto do fascínio': 'manto-do-fascinio',
    'manto do morcego': 'manto-do-morcego',
    'manto élfico': 'manto-elfico',
    'manual da saúde corporal': 'manual-da-saude-corporal',
    'manual do bom exercício': 'manual-do-bom-exercicio',
    'manual dos movimentos precisos': 'manual-dos-movimentos-precisos',
    'medalhão da deusa da vida': 'medalhao-deusa-da-vida',
    'mochila de carga': 'mochila-carga',
    'orbe da tempestade': 'orbe-da-tempestade',
    'pingente': 'pingente',
    'pulseiras da celeridade': 'pulseiras-da-celeridade',
    'símbolo abençoado': 'simbolo-abencoado',
    'tapete voador': 'tapete-voador',
    'tiara': 'tiara',
    'tomo da compreensão': 'tomo-da-compreensao',
    'tomo da liderança e influência': 'tomo-da-lideranca-influencia',
    'tomo dos grandes pensamentos': 'tomo-dos-grandes-pensamentos',
    'torque do vigor': 'torque-do-vigor',
    'vassoura voadora': 'vassoura-voadora',
    'baralho do caos': 'baralho-do-caos',
    
    // Materiais especiais
    'madeira de tollon': 'madeira-tollon',
    'madeira tollon': 'madeira-tollon',
};

// ===== INDEXAR IMAGENS =====

function indexImages() {
    const imageMap = new Map();

    for (const folder of IMAGE_FOLDERS) {
        if (!fs.existsSync(folder)) continue;
        const files = fs.readdirSync(folder).filter(f => f.endsWith('.webp'));
        for (const file of files) {
            const name = file.replace(/\.webp$/i, '').toLowerCase();
            imageMap.set(name, {
                fullPath: path.join(folder, file),
                fileName: file
            });
        }
    }

    console.log(`📦 Total de imagens indexadas: ${imageMap.size}`);
    return imageMap;
}

// ===== ENCONTRAR IMAGEM =====

function findImage(itemName, imageMap) {
    const nameLower = itemName.toLowerCase().trim();
    
    // 1. Mapeamento customizado
    if (CUSTOM_MAPPINGS[nameLower] && imageMap.has(CUSTOM_MAPPINGS[nameLower])) {
        return imageMap.get(CUSTOM_MAPPINGS[nameLower]);
    }
    
    // 2. Normalização direta
    const normalized = normalizeForMatch(itemName);
    if (imageMap.has(normalized)) {
        return imageMap.get(normalized);
    }
    
    // 3. Tenta só a primeira parte do nome (antes de ":")
    if (nameLower.includes(':')) {
        const afterColon = nameLower.split(':')[1].trim();
        const normalizedAfter = normalizeForMatch(afterColon);
        if (imageMap.has(normalizedAfter)) {
            return imageMap.get(normalizedAfter);
        }
    }
    
    return null;
}

// ===== PROCESSAR ARQUIVO =====

function processFile(filePath, imageMap) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const newLines = [];
    
    let matched = 0;
    let unmatched = [];
    let currentItemName = null;
    let hasImageField = false;
    let lastFieldLineIndex = -1;
    let pendingImageInserts = []; // { afterLineIndex, imagePath }
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Detecta o nome do item (com ou sem aspas nas chaves)
        const nameMatch = line.match(/(?:"nome"|nome)\s*:\s*"([^"]+)"/);
        if (nameMatch) {
            currentItemName = nameMatch[1];
            hasImageField = false;
        }
        
        // Detecta se já tem campo imagem
        if (currentItemName && /(?:"imagem"|imagem)\s*:/.test(line)) {
            hasImageField = true;
        }
        
        // Detecta último campo antes do fechamento do objeto
        if (currentItemName && /^\s*("|[a-z])/.test(line) && /:/.test(line)) {
            lastFieldLineIndex = i;
        }
        
        // Detecta fechamento do objeto do item
        if (currentItemName && /^\s*\}/.test(line)) {
            if (!hasImageField) {
                const img = findImage(currentItemName, imageMap);
                if (img) {
                    pendingImageInserts.push({
                        afterLineIndex: lastFieldLineIndex,
                        imagePath: `data/img/${img.fileName}`,
                        itemName: currentItemName,
                        sourceFile: img.fullPath
                    });
                    matched++;
                } else {
                    unmatched.push(currentItemName);
                }
            } else {
                // Já tem imagem, conta como matched
            }
            currentItemName = null;
        }
    }
    
    // Agora insere as linhas de imagem (de trás pra frente para não mudar os índices)
    pendingImageInserts.sort((a, b) => b.afterLineIndex - a.afterLineIndex);
    
    const resultLines = [...lines];
    for (const insert of pendingImageInserts) {
        const prevLine = resultLines[insert.afterLineIndex];
        // Detecta a indentação
        const indent = prevLine.match(/^(\s*)/)[1];
        
        // Garante que a linha anterior termina com vírgula
        if (!prevLine.trimEnd().endsWith(',')) {
            resultLines[insert.afterLineIndex] = prevLine.replace(/(\s*)$/, ',$1');
        }
        
        // Determina se usa aspas nas chaves (verifica a linha anterior)
        const usesQuotedKeys = prevLine.includes('"descricao"') || prevLine.includes('"fonte"') || prevLine.includes('"nome"') || prevLine.includes('"preco"') || prevLine.includes('"tipo"');
        
        const imageField = usesQuotedKeys 
            ? `${indent}"imagem": "${insert.imagePath}"`
            : `${indent}imagem: "${insert.imagePath}"`;
        
        resultLines.splice(insert.afterLineIndex + 1, 0, imageField);
    }
    
    // Salva o arquivo
    fs.writeFileSync(filePath, resultLines.join('\n'), 'utf-8');
    
    return { matched, unmatched, inserts: pendingImageInserts };
}

// ===== MAIN =====

function main() {
    console.log('🎯 Mapeamento de imagens Tormenta20 → VTTArmada\n');
    
    // 1. Indexar imagens
    const imageMap = indexImages();
    
    // 2. Criar pasta de saída
    if (!fs.existsSync(IMG_OUTPUT)) {
        fs.mkdirSync(IMG_OUTPUT, { recursive: true });
        console.log(`📁 Pasta criada: ${IMG_OUTPUT}\n`);
    }
    
    let totalMatched = 0;
    let totalUnmatched = 0;
    const allUnmatched = [];
    const allCopied = new Set();
    
    // 3. Processar cada arquivo
    for (const file of DATA_FILES) {
        const filePath = path.join(VTTARMADA_DATA, file);
        console.log(`\n📄 ${file}`);
        console.log('─'.repeat(50));
        
        const result = processFile(filePath, imageMap);
        
        // Copiar imagens
        for (const insert of result.inserts) {
            const dest = path.join(IMG_OUTPUT, path.basename(insert.sourceFile));
            if (!allCopied.has(insert.sourceFile)) {
                fs.copyFileSync(insert.sourceFile, dest);
                allCopied.add(insert.sourceFile);
            }
        }
        
        console.log(`   ✅ Correspondências: ${result.matched}`);
        console.log(`   ❌ Sem imagem: ${result.unmatched.length}`);
        
        totalMatched += result.matched;
        totalUnmatched += result.unmatched.length;
        allUnmatched.push(...result.unmatched.map(n => ({ file, name: n })));
    }
    
    // 4. Relatório
    console.log('\n' + '═'.repeat(50));
    console.log('📊 RELATÓRIO FINAL');
    console.log('═'.repeat(50));
    console.log(`✅ Imagens adicionadas: ${totalMatched}`);
    console.log(`📁 Imagens copiadas: ${allCopied.size}`);
    console.log(`❌ Sem correspondência: ${totalUnmatched}`);
    console.log(`📈 Cobertura: ${((totalMatched / (totalMatched + totalUnmatched)) * 100).toFixed(1)}%`);
    
    if (allUnmatched.length > 0) {
        console.log('\n❌ ITENS SEM IMAGEM:');
        for (const { file, name } of allUnmatched) {
            console.log(`   [${file}] ${name}`);
        }
    }
}

main();
