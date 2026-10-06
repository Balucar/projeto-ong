export function iniciarSPA(paginas, carregarPagina) {
    const linksSPA = document.querySelectorAll('[data-page]');

    linksSPA.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const pagina = link.dataset.page;

            if (paginas[pagina]) {
                carregarPagina(pagina);
                window.location.hash = pagina;
            }
        });
    });
}