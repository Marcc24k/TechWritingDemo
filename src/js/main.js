(function(){
    const dropdown = document.getElementById('catalogDropdown');
    const btn = document.getElementById('dropdownBtn');
    if (!dropdown || !btn) return;

    const menu = dropdown.querySelector('.dropdown-menu');
    const items = Array.from(menu.querySelectorAll('a[role="menuitem"]'));

    function openDropdown() {
        dropdown.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        menu.style.display = 'block';
        // focus first item for keyboard users
        items[0]?.focus();
    }

    function closeDropdown() {
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        menu.style.display = 'none';
        btn.focus();
    }

    function toggleDropdown(e) {
        e.stopPropagation();
        dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
    }

    function focusNext(delta) {
        const idx = items.indexOf(document.activeElement);
        let next = idx + delta;
        if (next < 0) next = items.length - 1;
        if (next >= items.length) next = 0;
        items[next].focus();
    }

    // click handlers
    btn.addEventListener('click', toggleDropdown);
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) closeDropdown();
    });

    // keyboard support when menu is open
    document.addEventListener('keydown', (e) => {
        if (!dropdown.classList.contains('open')) return;

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeDropdown();
                break;
            case 'ArrowDown':
                e.preventDefault();
                focusNext(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                focusNext(-1);
                break;
            case 'Home':
                e.preventDefault();
                items[0]?.focus();
                break;
            case 'End':
                e.preventDefault();
                items[items.length - 1]?.focus();
                break;
            default:
                break;
        }
    });

    // quick-open with Down arrow from the button
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            openDropdown();
        }
    });

    // close on window resize to avoid positioning issues
    window.addEventListener('resize', closeDropdown);
})();