// Date
const d = new Date();
const updatedEl = document.getElementById('updated-date');
if (updatedEl) {
    updatedEl.textContent = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
}

// Totals
const table = document.getElementById('bomTable');
const bodyRows = [...table.querySelectorAll('tbody tr')];

const totalItemsEl = document.getElementById('total-items');
const totalQtyEl = document.getElementById('total-qty');

if (totalItemsEl) totalItemsEl.textContent = bodyRows.length;
if (totalQtyEl) {
    const totalQty = bodyRows.reduce((sum, tr) => {
        const qty = parseFloat(tr.children[2].textContent.trim()) || 0;
        return sum + qty;
    }, 0);
    totalQtyEl.textContent = totalQty;
}

// Filters
const searchInput = document.getElementById('searchInput');
const categorySelect = document.getElementById('categorySelect');
const clearFilters = document.getElementById('clearFilters');

function applyFilters() {
    const q = (searchInput.value || '').toLowerCase();
    const cat = categorySelect.value;
    bodyRows.forEach(tr => {
        const txt = tr.innerText.toLowerCase();
        const matchesText = !q || txt.includes(q);
        const matchesCat = !cat || tr.getAttribute('data-cat') === cat;
        tr.style.display = (matchesText && matchesCat) ? '' : 'none';
    });
}
searchInput.addEventListener('input', applyFilters);
categorySelect.addEventListener('change', applyFilters);
clearFilters.addEventListener('click', () => { searchInput.value = ''; categorySelect.value = ''; applyFilters(); });

// CSV Export
function tableToCSV(table) {
    const rows = [...table.querySelectorAll('tr')];
    return rows.map(r => {
        const cells = [...r.children].map((cell, i) => {
            let t = '';
            if (i === 0) {
                const pn = cell.querySelector('.pn')?.textContent || cell.textContent;
                t = pn;
            } else {
                t = cell.innerText;
            }
            t = t.replace(/\s+/g, ' ').trim().replace(/"/g, '""');
            return `"${t}"`;
        });
        return cells.join(',');
    }).join('\n');
}

function downloadCSV(filename, csv) {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; document.body.appendChild(a);
    a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

function exportCSV() {
    const csv = tableToCSV(document.getElementById('bomTable'));
    downloadCSV('BOM_Crafter_M6_Assy_Main_Print_Belt.csv', csv);
}
document.getElementById('exportCsvBtn').addEventListener('click', exportCSV);
document.getElementById('exportCsvBtn2').addEventListener('click', exportCSV);

// Print
document.getElementById('printBtn').addEventListener('click', () => window.print());
