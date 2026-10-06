import { salvarCadastro, recuperarCadastro } from './storage.js';
import { iniciarSPA } from './spa.js';
// Menu responsivo
const botaoMenu = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (botaoMenu && menu) {
    botaoMenu.addEventListener('click', function () {
        menu.classList.toggle('ativo');

        const menuAberto = menu.classList.contains('ativo');
        botaoMenu.setAttribute('aria-expanded', menuAberto);
        botaoMenu.setAttribute('aria-label', menuAberto ? 'Fechar menu' : 'Abrir menu');
    });
}

const dadosProjetos = [
    {
        titulo: 'Educação para Todos',
        categoria: 'Educação',
        imagem: '../images/educacao.png',
        alt: 'Ação educacional realizada com crianças e adolescentes',
        descricao: 'Iniciativa que oferece apoio educacional, atividades de reforço escolar e incentivo à leitura para crianças e adolescentes da comunidade.'
    },
    {
        titulo: 'Alimentando Esperança',
        categoria: 'Assistência Social',
        imagem: '../images/alimentos.png',
        alt: 'Voluntários realizando a distribuição de alimentos para a comunidade',
        descricao: 'Projeto destinado à arrecadação e distribuição de alimentos para famílias em situação de vulnerabilidade social.'
    }
];
function gerarCardsProjetos() {
    return dadosProjetos.map(function (projeto) {
        return `
            <article class="grid-6">
                <h3>${projeto.titulo}</h3>

                <span class="badge">
                    ${projeto.categoria}
                </span>

                <img src="${projeto.imagem}"
                     alt="${projeto.alt}">

                <p>
                    ${projeto.descricao}
                </p>
            </article>
        `;
    }).join('');
}
// Conteúdos da Single Page Application (SPA)
const paginas = {
    inicio: `
        <img src="../images/ong.png"
             alt="Voluntários da ONG Transformar participando de uma ação comunitária">

        <section id="sobre">
            <h2>Sobre a ONG</h2>
            <p>
                A ONG Transformar atua no desenvolvimento de projetos sociais
                voltados à inclusão, educação e apoio à comunidade.
            </p>
        </section>

        <section id="missao">
            <h2>Nossa missão</h2>
            <p>
                Nossa missão é promover oportunidades e contribuir para a
                transformação social por meio de ações que beneficiem pessoas
                em situação de vulnerabilidade.
            </p>
        </section>

        <section id="contato">
            <h2>Entre em contato</h2>
            <p>E-mail: contato@ongtransformar.org.br</p>
            <p>Telefone: (11) 99999-9999</p>
        </section>
   `,

projetos: `
    <section id="projetos">
        <h2>Conheça nossos projetos</h2>
        <p>
            A ONG Transformar desenvolve iniciativas voltadas à educação,
            alimentação e inclusão social, buscando melhorar a qualidade
            de vida das pessoas atendidas pela organização.
        </p>

        <h2>Projetos sociais</h2>

        <div class="grid-container">
            
${gerarCardsProjetos()}
           
        </div>
    </section>
`,
cadastro: `
    <section id="cadastro">
        <h2>Faça parte da ONG Transformar</h2>

        <p>
            Preencha o formulário para participar como voluntário
            ou contribuir com nossos projetos.
        </p>

        <form id="form-cadastro">
            <fieldset>
                <legend>Dados pessoais</legend>

                <label for="nome">Nome completo:</label>
                <input type="text" id="nome" name="nome" required>

                <label for="cpf">CPF:</label>
                <input type="text" id="cpf" name="cpf" required>

                <label for="nascimento">Data de nascimento:</label>
                <input type="date" id="nascimento" name="nascimento" required>
            </fieldset>

            <fieldset>
                <legend>Contato</legend>

                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required>

                <label for="telefone">Telefone:</label>
                <input type="tel" id="telefone" name="telefone" required>
            </fieldset>

            <fieldset>
                <legend>Endereço</legend>

                <label for="cep">CEP:</label>
                <input type="text" id="cep" name="cep" required>

                <label for="endereco">Endereço:</label>
                <input type="text" id="endereco" name="endereco" required>

                <label for="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" required>

                <div class="campo-estado">
                    <label for="estado">Estado:</label>
                    <select id="estado" name="estado" required>
                        <option value="">Selecione</option>
                        <option value="SP">São Paulo</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="ES">Espírito Santo</option>
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <legend>Participação</legend>

                <span>Como você deseja participar?</span>

                <input type="radio" id="voluntario" name="participacao"
                       value="voluntario" required>
                <label for="voluntario">Quero ser voluntário</label>

                <input type="radio" id="doador" name="participacao"
                       value="doador">
                <label for="doador">Quero ser doador</label>
            </fieldset>

            <button type="submit">Enviar cadastro</button>
        </form>
    </section>
`
};
function carregarPagina(pagina) {
    const conteudoPrincipal = document.querySelector('#conteudo-principal');

    if (conteudoPrincipal && paginas[pagina]) {
        conteudoPrincipal.innerHTML = paginas[pagina];
        if (pagina === 'cadastro') {
    ativarFormularioCadastro();
}
    }
}
iniciarSPA(paginas, carregarPagina);
export function ativarFormularioCadastro() {
    const formulario = document.querySelector('#form-cadastro');

    if (!formulario) {
        return;
    }
const campoNome = formulario.querySelector('#nome');
const campoCpf = formulario.querySelector('#cpf');

campoCpf.addEventListener('input', function () {
    const cpfLimpo = campoCpf.value.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        campoCpf.setCustomValidity('O CPF deve conter 11 números.');
    } else {
        campoCpf.setCustomValidity('');
    }
});
const campoCep = formulario.querySelector('#cep');

campoCep.addEventListener('input', function () {
    const cepLimpo = campoCep.value.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        campoCep.setCustomValidity('O CEP deve conter 8 números.');
    } else {
        campoCep.setCustomValidity('');
    }
});
const campoTelefone = formulario.querySelector('#telefone');

campoTelefone.addEventListener('input', function () {
    const telefoneLimpo = campoTelefone.value.replace(/\D/g, '');

    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        campoTelefone.setCustomValidity('O telefone deve conter 10 ou 11 números.');
    } else {
        campoTelefone.setCustomValidity('');
    }
});
campoNome.addEventListener('input', function () {
    if (campoNome.value.length >= 3) {
        campoNome.classList.add('campo-preenchido');
    } else {
        campoNome.classList.remove('campo-preenchido');
    }
});
    const dados = recuperarCadastro();

if (dados) {
    

    formulario.querySelector('#nome').value = dados.nome || '';
    formulario.querySelector('#cpf').value = dados.cpf || '';
    formulario.querySelector('#nascimento').value = dados.nascimento || '';
    formulario.querySelector('#email').value = dados.email || '';
    formulario.querySelector('#telefone').value = dados.telefone || '';
    formulario.querySelector('#cep').value = dados.cep || '';
    formulario.querySelector('#endereco').value = dados.endereco || '';
    formulario.querySelector('#cidade').value = dados.cidade || '';
    formulario.querySelector('#estado').value = dados.estado || '';

    if (dados.participacao) {
        const opcao = formulario.querySelector(
            `input[name="participacao"][value="${dados.participacao}"]`
        );

        if (opcao) {
            opcao.checked = true;
        }
    }
}
formulario.addEventListener('submit', function (event) {
        event.preventDefault();
const campoCpf = formulario.querySelector('#cpf');
const cpfLimpo = campoCpf.value.replace(/\D/g, '');

if (cpfLimpo.length !== 11) {
    campoCpf.setCustomValidity('O CPF deve conter 11 números.');
} else {
    campoCpf.setCustomValidity('');
}


        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }
const dadosCadastro = {
    nome: formulario.querySelector('#nome').value,
    cpf: formulario.querySelector('#cpf').value,
    nascimento: formulario.querySelector('#nascimento').value,
    email: formulario.querySelector('#email').value,
    telefone: formulario.querySelector('#telefone').value,
    cep: formulario.querySelector('#cep').value,
    endereco: formulario.querySelector('#endereco').value,
    cidade: formulario.querySelector('#cidade').value,
    estado: formulario.querySelector('#estado').value,
    participacao: formulario.querySelector(
        'input[name="participacao"]:checked'
    ).value
};

salvarCadastro(dadosCadastro);
        const mensagemAnterior = formulario.querySelector('.toast');

if (mensagemAnterior) {
    mensagemAnterior.remove();
}
        const mensagem = document.createElement('div');
mensagem.className = 'toast mostrar';
mensagem.setAttribute('role', 'status');
mensagem.setAttribute('aria-live', 'polite');
mensagem.textContent = '✓ Cadastro realizado com sucesso!';
Swal.fire({
    icon: 'success',
    title: 'Cadastro realizado!',
    text: 'Seus dados foram salvos com sucesso.',
    confirmButtonText: 'OK'
});
formulario.appendChild(mensagem);

setTimeout(function () {
    mensagem.remove();
}, 4000);
    });
}
// Modo de alto contraste
const botaoContraste = document.getElementById('botao-contraste');

if (botaoContraste) {
    botaoContraste.addEventListener('click', () => {
        const contrasteAtivo = document.body.classList.toggle('alto-contraste');

        botaoContraste.setAttribute('aria-pressed', contrasteAtivo);
        botaoContraste.setAttribute(
            'aria-label',
            contrasteAtivo
                ? 'Desativar modo de alto contraste'
                : 'Ativar modo de alto contraste'
        );
    });
}