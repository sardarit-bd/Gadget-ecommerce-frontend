// Adds a subtle shadow on the header row when table is scrolled horizontally
document.querySelectorAll('.bom-table-wrap').forEach(wrap => {
    wrap.addEventListener('scroll', () => {
        const thSticky = wrap.querySelector('thead .sticky');
        if (!thSticky) return;
        thSticky.style.boxShadow = wrap.scrollLeft > 0 ? '2px 0 0 rgba(0,0,0,0.06)' : 'none';
    });
});
