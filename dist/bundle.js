/*! For license information please see bundle.js.LICENSE.txt */
(() => {
    let e = null;
    function t(t) {
        e = t;
    }
    document.getElementById('start').addEventListener('click', function () {
        localStorage.setItem('level', e), (window.location = '/game.html');
    }),
        document
            .getElementById('easy')
            .addEventListener('click', () => t('easy')),
        document
            .getElementById('medium')
            .addEventListener('click', () => t('medium')),
        document
            .getElementById('hard')
            .addEventListener('click', () => t('hard'));
})();
//# sourceMappingURL=bundle.js.map
