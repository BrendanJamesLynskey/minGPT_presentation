// ========== Causal Mask Explorer ==========
// Visualises the registered `bias` buffer in CausalSelfAttention:
// a lower-triangular mask that makes attention causal.
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('mask-grid');
    if (!grid) return;

    const size = 8;
    const tokens = ['s', 'o', 'r', 't', ' ', 't', 'h', 'e'];
    grid.style.gridTemplateColumns = `auto repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `auto repeat(${size}, 1fr)`;

    // Header row
    const corner = document.createElement('div');
    corner.style.cssText = 'font-size:0.35em; color:rgba(251,247,244,0.3); display:flex; align-items:center; justify-content:center;';
    corner.textContent = 'Q\\K';
    grid.appendChild(corner);

    for (let j = 0; j < size; j++) {
        const header = document.createElement('div');
        header.style.cssText = 'font-size:0.4em; font-family:monospace; display:flex; align-items:center; justify-content:center; color:rgba(251,247,244,0.5);';
        header.textContent = tokens[j] === ' ' ? '␣' : tokens[j];
        grid.appendChild(header);
    }

    // Grid cells
    for (let i = 0; i < size; i++) {
        const rowLabel = document.createElement('div');
        rowLabel.style.cssText = 'font-size:0.4em; font-family:monospace; display:flex; align-items:center; justify-content:center; color:rgba(251,247,244,0.5);';
        rowLabel.textContent = tokens[i] === ' ' ? '␣' : tokens[i];
        grid.appendChild(rowLabel);

        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.className = 'mask-cell ' + (j <= i ? 'allowed' : 'blocked');
            cell.textContent = j <= i ? '1' : '0';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => highlightMaskRow(i, tokens));
            grid.appendChild(cell);
        }
    }
});

function highlightMaskRow(row, tokens) {
    const cells = document.querySelectorAll('.mask-cell');
    if (!cells.length) return;
    cells.forEach(c => c.classList.remove('highlight-row'));

    cells.forEach(c => {
        if (parseInt(c.dataset.row) === row && parseInt(c.dataset.col) <= row) {
            c.classList.add('highlight-row');
        }
    });

    const explain = document.getElementById('mask-explain');
    if (!explain) return;
    const tokenChar = tokens[row] === ' ' ? '␣' : tokens[row];
    const canSee = tokens.slice(0, row + 1).map(t => t === ' ' ? '␣' : t).join(', ');
    explain.innerHTML = `<p>Token at position ${row} (<strong>"${tokenChar}"</strong>) can attend to: <strong>${canSee}</strong> (${row + 1} of ${tokens.length} tokens)</p>`;
}

// ========== Model Zoo Selector ==========
// Real GPT-2 family configs from mingpt/model.py, with the official
// parameter counts for the published OpenAI checkpoints.
const ZOO = [
    { id: 'gpt2',        layer: 12, head: 12, embd: 768,  params: '124M',
      desc: 'The original GPT-2 "small" — the baseline released checkpoint.' },
    { id: 'gpt2-medium', layer: 24, head: 16, embd: 1024, params: '350M',
      desc: 'GPT-2 medium — deeper and wider than the base model.' },
    { id: 'gpt2-large',  layer: 36, head: 20, embd: 1280, params: '774M',
      desc: 'GPT-2 large — 36 layers, noticeably more fluent generations.' },
    { id: 'gpt2-xl',     layer: 48, head: 25, embd: 1600, params: '1558M',
      desc: 'GPT-2 XL — the largest public GPT-2, ~1.5B parameters.' },
];

document.addEventListener('DOMContentLoaded', () => {
    const btnRow = document.getElementById('zoo-buttons');
    if (!btnRow) return;

    ZOO.forEach((m, i) => {
        const btn = document.createElement('button');
        btn.className = 'zoo-btn' + (i === 0 ? ' active' : '');
        btn.textContent = m.id;
        btn.dataset.idx = i;
        btn.addEventListener('click', () => selectZoo(i));
        btnRow.appendChild(btn);
    });

    selectZoo(0);
});

function selectZoo(idx) {
    const m = ZOO[idx];
    if (!m) return;

    document.querySelectorAll('.zoo-btn').forEach((b, i) => {
        b.classList.toggle('active', i === idx);
    });

    const layerEl  = document.getElementById('zoo-layer');
    const headEl   = document.getElementById('zoo-head');
    const embdEl   = document.getElementById('zoo-embd');
    const paramsEl = document.getElementById('zoo-params');
    const descEl   = document.getElementById('zoo-desc');

    if (layerEl)  layerEl.textContent  = m.layer;
    if (headEl)   headEl.textContent   = m.head;
    if (embdEl)   embdEl.textContent   = m.embd;
    if (paramsEl) paramsEl.textContent = m.params;
    if (descEl)   descEl.innerHTML =
        `<strong>${m.id}</strong> &nbsp;·&nbsp; ${m.desc} ` +
        `Set <code>model_config.model_type = '${m.id}'</code> and minGPT expands it to ` +
        `n_layer=${m.layer}, n_head=${m.head}, n_embd=${m.embd}.`;
}
