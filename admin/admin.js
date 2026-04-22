document.addEventListener('DOMContentLoaded', function () {
        const mapping = document.getElementById('wiscus-mapping');
        const termWrapper = document.getElementById('wiscus-term-wrapper');

        function toggleTerm() {
            if (mapping.value === 'specific') {
                termWrapper.style.display = 'block';
            } else {
                termWrapper.style.display = 'none';
            }
        }

        mapping.addEventListener('change', toggleTerm);
        toggleTerm();
    });