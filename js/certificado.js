// ==========================================
// STUDIO BELLA NAILS
// VALIDAÇÃO DE CERTIFICADOS
// ==========================================


// ==========================================
// CERTIFICADOS CADASTRADOS
// ==========================================

const certificados = {

    "CERT-2026-000001": {

        nome: "Maria Juliana",

        certificado: "Manicure Profissional",

        cargaHoraria: "40 horas",

        dataEmissao: "05/10/2026",

        codigo: "CERT-2026-000001",

        emissor: "Studio Bella Nails"

    },


    "CERT-2026-000002": {

        nome: "Samuel Levindo",

        certificado: "Pedicure Profissional",

        cargaHoraria: "40 horas",

        dataEmissao: "16/09/2026",

        codigo: "CERT-2026-000002",

        emissor: "Studio Bella Nails"

    },


    "CERT-2026-000003": {

        nome: "Juliana Oliveira",

        certificado: "Nail Art Profissional",

        cargaHoraria: "50 horas",

        dataEmissao: "16/09/2026",

        codigo: "CERT-2026-000003",

        emissor: "Studio Bella Nails"

    },
      "CERT-2026-00022": {

        nome: "Maria Eduarda de Paiva silva",

        certificado: "Nail Art Profissional Duda Nails design",

        cargaHoraria: "40 horas",

        dataEmissao: "05/10/2026",

        codigo: "CERT-2026-00022",

        emissor: "Studio Bella Nails"

    }

};


// ==========================================
// FORMULÁRIO DE VALIDAÇÃO
// ==========================================

const validationForm =
    document.getElementById("validationForm");


if (validationForm) {

    validationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            validarCertificado();

        }
    );

}


// ==========================================
// VALIDAR AUTOMATICAMENTE PELO QR CODE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const parametros =
            new URLSearchParams(
                window.location.search
            );


        const codigoQR =
            parametros.get("codigo");


        if (codigoQR) {

            const input =
                document.getElementById("codigo");


            if (input) {

                input.value =
                    codigoQR;

            }


            validarCertificado();

        }

    }
);


// ==========================================
// FUNÇÃO PRINCIPAL
// ==========================================

function validarCertificado() {

    const input =
        document.getElementById("codigo");


    const resultado =
        document.getElementById("resultado");


    if (!input || !resultado) {

        return;

    }


    // ======================================
    // PEGA O CÓDIGO DIGITADO
    // ======================================

    const codigo =
        input.value
            .trim()
            .toUpperCase();


    // ======================================
    // LIMPA RESULTADO ANTERIOR
    // ======================================

    resultado.className =
        "resultado";

    resultado.innerHTML =
        "";


    // ======================================
    // CÓDIGO NÃO INFORMADO
    // ======================================

    if (!codigo) {

        resultado.classList.add("erro");


        resultado.innerHTML = `

            <h3>
                Código não informado
            </h3>

            <p>
                Digite o código de autenticação
                presente no certificado.
            </p>

        `;


        return;

    }


    // ======================================
    // PROCURA O CERTIFICADO
    // ======================================

    const certificado =
        certificados[codigo];


    // ======================================
    // CERTIFICADO ENCONTRADO
    // ======================================

    if (certificado) {

        mostrarCertificado(certificado);

        return;

    }


    // ======================================
    // CERTIFICADO NÃO ENCONTRADO
    // ======================================

    resultado.classList.add("erro");


    resultado.innerHTML = `

        <h3>
            ✕ Certificado não encontrado
        </h3>

        <p>
            O código informado não corresponde
            a nenhum registro cadastrado.
            Verifique o código e tente novamente.
        </p>

    `;

}


// ==========================================
// MOSTRAR CERTIFICADO
// ==========================================

function mostrarCertificado(certificado) {

    const resultado =
        document.getElementById("resultado");


    if (!resultado) {

        return;

    }


    // ======================================
    // ATIVAR MODO SOMENTE CERTIFICADO
    // ======================================

    const topo =
        document.querySelector(".topo");


    const validacaoBox =
        document.querySelector(".validacao-box");


    const paginaValidacao =
        document.querySelector(".pagina-validacao");


    // ======================================
    // ESCONDE O CABEÇALHO
    // ======================================

    if (topo) {

        topo.style.display = "none";

    }


    // ======================================
    // ESCONDE A CAIXA DE VALIDAÇÃO
    // ======================================

    if (validacaoBox) {

        validacaoBox.style.display = "none";

    }


    // ======================================
    // ATIVA MODO CERTIFICADO NA PÁGINA
    // ======================================

    if (paginaValidacao) {

        paginaValidacao.classList.add(
            "modo-certificado"
        );

    }


    // ======================================
    // ATIVA MODO CERTIFICADO NO BODY
    // ======================================

    document.body.classList.add(
        "modo-certificado-body"
    );


    // ======================================
    // URL EXCLUSIVA DO CERTIFICADO
    // ======================================

    const urlValidacao =
        window.location.origin +
        window.location.pathname +
        "?codigo=" +
        encodeURIComponent(
            certificado.codigo
        );


    // ======================================
    // HTML DO CERTIFICADO
    // ======================================

    resultado.className =
        "resultado certificado-validado";


    resultado.innerHTML = `

        <!-- ==================================
             CERTIFICADO
        =================================== -->

        <div class="certificado-documento">

            <section class="certificado">


                <!-- ==================================
                     BORDAS
                =================================== -->

                <div class="borda-externa"></div>

                <div class="borda-interna"></div>


                <!-- ==================================
                     DETALHES DECORATIVOS
                =================================== -->

                <div class="flor flor-1">
                    ✦
                </div>

                <div class="flor flor-2">
                    ✦
                </div>


                <!-- ==================================
                     CABEÇALHO
                =================================== -->

                <header class="cabecalho-certificado">


                    <!-- LOGO -->

                    <div class="logo-certificado">

                        <span>
                            STUDIO BELLA
                        </span>

                        <strong>
                            NAILS
                        </strong>

                    </div>


                    <!-- LINHA DOURADA -->

                    <div class="linha-dourada"></div>


                    <!-- TÍTULO -->

                    <h1>
                        CERTIFICADO
                    </h1>


                    <p class="subtitulo">
                        DE CAPACITAÇÃO PROFISSIONAL
                    </p>

                </header>


                <!-- ==================================
                     CONTEÚDO
                =================================== -->

                <div class="conteudo-certificado">


                    <!-- INTRODUÇÃO -->

                    <p class="texto-introducao">
                        Certificamos que
                    </p>


                    <!-- NOME -->

                    <h2 class="nome-aluno">
                        ${certificado.nome}
                    </h2>


                    <div class="linha-nome"></div>


                    <!-- TEXTO -->

                    <p class="texto-certificado">
                        concluiu a capacitação profissional em
                    </p>


                    <!-- CURSO -->

                    <h3 class="nome-curso">
                        ${certificado.certificado}
                    </h3>


                    <!-- DESCRIÇÃO -->

                    <p class="descricao">

                        Este certificado é emitido em nome do
                        titular acima identificado, contendo as
                        informações referentes à capacitação
                        realizada, conforme os registros mantidos
                        pela instituição emissora.

                    </p>


                    <!-- ==================================
                         INFORMAÇÕES
                    =================================== -->

                    <div class="informacoes">


                        <!-- CARGA HORÁRIA -->

                        <div class="info-item">

                            <span class="icone">
                                ◈
                            </span>

                            <div>

                                <small>
                                    CARGA HORÁRIA
                                </small>

                                <strong>
                                    ${certificado.cargaHoraria}
                                </strong>

                            </div>

                        </div>


                        <!-- DATA -->

                        <div class="info-item">

                            <span class="icone">
                                ◈
                            </span>

                            <div>

                                <small>
                                    DATA DE EMISSÃO
                                </small>

                                <strong>
                                    ${certificado.dataEmissao}
                                </strong>

                            </div>

                        </div>


                        <!-- CÓDIGO -->

                        <div class="info-item">

                            <span class="icone">
                                ◈
                            </span>

                            <div>

                                <small>
                                    CÓDIGO DE AUTENTICAÇÃO
                                </small>

                                <strong>
                                    ${certificado.codigo}
                                </strong>

                            </div>

                        </div>


                    </div>


                    <!-- ==================================
                         RODAPÉ
                    =================================== -->

                    <div class="rodape-certificado">


                        <!-- ASSINATURA -->

                        <div class="assinatura">

                            <div class="linha-assinatura"></div>

                            <strong>
                                RESPONSÁVEL PELA EMISSÃO
                            </strong>

                            <span>
                                ${certificado.emissor}
                            </span>

                        </div>


                        <!-- ==================================
                             QR CODE
                        =================================== -->

                        <div class="qr-area">

                            <div
                                id="qrcode-${certificado.codigo}"
                                class="qr-code">
                            </div>


                            <small>
                                Aponte a câmera do celular
                            </small>


                            <strong>
                                para validar este certificado
                            </strong>

                        </div>


                        <!-- INSTITUIÇÃO -->

                        <div class="instituicao">

                            <div class="linha-assinatura"></div>

                            <strong>
                                INSTITUIÇÃO EMISSORA
                            </strong>

                            <span>
                                ${certificado.emissor}
                            </span>

                        </div>


                    </div>


                    <!-- ==================================
                         CÓDIGO FINAL
                    =================================== -->

                    <div class="codigo-final">

                        Código de autenticação:

                        <strong>
                            ${certificado.codigo}
                        </strong>

                    </div>


                </div>

            </section>

        </div>


        <!-- ==================================
             BOTÕES
        =================================== -->

        <div class="acoes-certificado">


            <!-- IMPRIMIR -->

            <button
                type="button"
                class="btn-imprimir"
                onclick="imprimirCertificado()">

                🖨️ Imprimir / Salvar PDF

            </button>


            <!-- VOLTAR PARA O SITE -->

            <a
                href="index.html"
                class="btn-voltar-site">

                ← Voltar para o site

            </a>


        </div>

    `;


    // ==========================================
    // GERAR QR CODE
    // ==========================================

    setTimeout(function () {


        const qrContainer =
            document.getElementById(
                `qrcode-${certificado.codigo}`
            );


        if (!qrContainer) {

            return;

        }


        // ======================================
        // LIMPA QR CODE ANTERIOR
        // ======================================

        qrContainer.innerHTML =
            "";


        // ======================================
        // VERIFICA SE A BIBLIOTECA EXISTE
        // ======================================

        if (
            typeof QRCode !== "undefined"
        ) {


            // ==================================
            // CRIA QR CODE
            // ==================================

            new QRCode(

                qrContainer,

                {

                    text: urlValidacao,

                    width: 120,

                    height: 120,

                    colorDark: "#000000",

                    colorLight: "#ffffff",

                    correctLevel:
                        QRCode.CorrectLevel.H

                }

            );

        }

    }, 150);


    // ==========================================
    // VOLTAR PARA O TOPO
    // ==========================================

    setTimeout(function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 250);

}


// ==========================================
// IMPRIMIR / SALVAR PDF
// ==========================================

function imprimirCertificado() {

    window.print();

}
