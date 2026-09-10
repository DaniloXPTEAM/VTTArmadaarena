const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const target = `<select id="gridSize" onchange="setGridSize(parseInt(this.value))" style="width: 70px; padding: 0.15rem 0.3rem; font-size: 0.7rem; background:var(--parch3); border:1px solid var(--border); color:var(--text-dim); border-radius:2px; outline:none;">
                <option value="40">40px</option>
                <option value="50" selected>50px</option>
                <option value="60">60px</option>
                <option value="70">70px</option>
                <option value="80">80px</option>
              </select>
            </div>
          </div>`;

const replacement = `<select id="gridSize" onchange="setGridSize(parseInt(this.value))" style="width: 70px; padding: 0.15rem 0.3rem; font-size: 0.7rem; background:var(--parch3); border:1px solid var(--border); color:var(--text-dim); border-radius:2px; outline:none;">
                <option value="40">40px</option>
                <option value="50" selected>50px</option>
                <option value="60">60px</option>
                <option value="70">70px</option>
                <option value="80">80px</option>
              </select>
            </div>
            <div style="margin-top:0.4rem; border-top:1px dashed rgba(107, 77, 42, 0.3); padding-top:0.4rem;">
              <div class="tool-section-label" style="margin-bottom: 0.2rem;">Distância (Movimento/Régua)</div>
              <select id="distanceModeSelect" onchange="setDistanceMode(this.value)" style="width: 100%; padding: 0.15rem 0.3rem; font-size: 0.7rem; background:var(--parch3); border:1px solid var(--border); color:var(--text-dim); border-radius:2px; outline:none; font-family:'Cinzel', serif;">
                <option value="euclidean">📏 Livre</option>
                <option value="square" selected>🔲 Quadrados (T20)</option>
                <option value="double_diagonal">✖ Diagonais Contam Dobro</option>
              </select>
            </div>
          </div>`;

// Normalize line endings to try and match
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');
const normalizedReplacement = replacement.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const newContent = normalizedContent.replace(normalizedTarget, normalizedReplacement);
  fs.writeFileSync('index.html', newContent);
  console.log("Success");
} else {
  console.log("Target not found");
}
