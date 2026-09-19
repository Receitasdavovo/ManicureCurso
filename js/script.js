/* =====================================================
   STUDIO BELLA NAILS
   PIX + PEDIDO + WHATSAPP
===================================================== */


/* =====================================================
   CONFIGURAÇÕES
===================================================== */

// SEU WHATSAPP
// Somente números.
// Exemplo: 5534999999999
const WHATSAPP = "555492649735";


// SUA CHAVE PIX REAL
const CHAVE_PIX = "31971705564";


// Nome que aparecerá no pagamento Pix
const NOME_RECEBEDOR = "STUDIO BELLA NAILS";


// Cidade do recebedor
const CIDADE_RECEBEDOR = "PIMENTA";


/* =====================================================
   VARIÁVEIS
===================================================== */

let certificadoAtual = "";
let valorAtual = 0;
let codigoPedidoAtual = "";


/* =====================================================
   MENU MOBILE
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("active");

        menuBtn.textContent =
            nav.classList.contains("active")
                ? "×"
                : "☰";

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


/* =====================================================
   FORMATAR VALOR
===================================================== */

function formatarValor(valor) {

    return Number(valor)
        .toFixed(2)
        .replace(".", ",");

}


/* =====================================================
   GERAR CÓDIGO DO PEDIDO
===================================================== */

function gerarCodigoPedido() {

    const agora = new Date();

    const ano =
        agora.getFullYear();

    const mes =
        String(agora.getMonth() + 1)
            .padStart(2, "0");

    const dia =
        String(agora.getDate())
            .padStart(2, "0");

    const numero =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return `PED-${ano}${mes}${dia}-${numero}`;

}


/* =====================================================
   NORMALIZAR TEXTO PARA PIX
===================================================== */

function removerAcentos(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

}


/* =====================================================
   LIMITAR TEXTO
===================================================== */

function limitarTexto(texto, tamanho) {

    return texto.substring(0, tamanho);

}


/* =====================================================
   MONTAR CAMPO PIX
===================================================== */

function campoPix(tag, valor) {

    const valorTexto =
        String(valor);

    return (
        String(tag.length) +
        tag +
        String(valorTexto.length) +
        valorTexto
    );

}


/* =====================================================
   CRC16 DO PIX
===================================================== */

function calcularCRC16(payload) {

    let crc = 0xFFFF;

    for (
        let i = 0;
        i < payload.length;
        i++
    ) {

        crc ^= payload.charCodeAt(i) << 8;

        for (
            let j = 0;
            j < 8;
            j++
        ) {

            if (crc & 0x8000) {

                crc =
                    (crc << 1) ^
                    0x1021;

            } else {

                crc <<= 1;

            }

            crc &= 0xFFFF;

        }

    }

    return crc
        .toString(16)
        .toUpperCase()
        .padStart(4, "0");

}


/* =====================================================
   GERAR PIX COPIA E COLA
===================================================== */

function gerarPixPayload() {

    const chave =
        CHAVE_PIX.trim();


    if (
        !chave ||
        chave === "SUA-CHAVE-PIX-AQUI"
    ) {

        throw new Error(
            "Configure sua chave Pix no script.js."
        );

    }


    const nome =
        removerAcentos(
            NOME_RECEBEDOR
                .toUpperCase()
                .trim()
        );


    const cidade =
        removerAcentos(
            CIDADE_RECEBEDOR
                .toUpperCase()
                .trim()
        );


    const valor =
        Number(valorAtual)
            .toFixed(2);


    /* =================================================
       MERCHANT ACCOUNT INFORMATION
    ================================================= */

    const merchantAccount =

        campoPix(
            "00",
            "BR.GOV.BCB.PIX"
        ) +

        campoPix(
            "01",
            chave
        );


    /* =================================================
       PAYLOAD PIX
    ================================================= */

    const payloadSemCRC =

        campoPix(
            "00",
            "01"
        ) +

        campoPix(
            "26",
            merchantAccount
        ) +

        campoPix(
            "52",
            "0000"
        ) +

        campoPix(
            "53",
            "986"
        ) +

        campoPix(
            "54",
            valor
        ) +

        campoPix(
            "58",
            "BR"
        ) +

        campoPix(
            "59",
            limitarTexto(nome, 25)
        ) +

        campoPix(
            "60",
            limitarTexto(cidade, 15)
        ) +

        campoPix(
            "62",
            campoPix(
                "05",
                codigoPedidoAtual
            )
        ) +

        "6304";


    const crc =
        calcularCRC16(payloadSemCRC);


    return payloadSemCRC + crc;

}


/* =====================================================
   ABRIR COMPRA
===================================================== */

function comprarCertificado(nome, valor) {

    certificadoAtual = nome;

    valorAtual = Number(valor);


    const modal =
        document.getElementById(
            "purchaseModal"
        );


    const nomeCertificado =
        document.getElementById(
            "certificadoSelecionado"
        );


    const valorCertificado =
        document.getElementById(
            "valorCertificado"
        );


    if (nomeCertificado) {

        nomeCertificado.textContent =
            certificadoAtual;

    }


    if (valorCertificado) {

        valorCertificado.textContent =
            `R$ ${formatarValor(valorAtual)}`;

    }


    if (modal) {

        modal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }

}


/* =====================================================
   FECHAR COMPRA
===================================================== */

function fecharCompra() {

    const modal =
        document.getElementById(
            "purchaseModal"
        );


    if (modal) {

        modal.classList.remove("active");

        document.body.style.overflow =
            "";

    }

}


/* =====================================================
   CONTINUAR PARA PIX
===================================================== */

function continuarCompra() {

    if (
        !certificadoAtual ||
        !valorAtual
    ) {

        alert(
            "Selecione um certificado primeiro."
        );

        return;

    }


    /* =================================================
       GERA O CÓDIGO DO PEDIDO
    ================================================= */

    codigoPedidoAtual =
        gerarCodigoPedido();


    /* =================================================
       FECHA MODAL DE COMPRA
    ================================================= */

    const modal =
        document.getElementById(
            "purchaseModal"
        );


    if (modal) {

        modal.classList.remove("active");

    }


    /* =================================================
       ELEMENTOS DO PIX
    ================================================= */

    const pixModal =
        document.getElementById(
            "pixModal"
        );


    const pixNome =
        document.getElementById(
            "pixNomeCurso"
        );


    const pixValor =
        document.getElementById(
            "pixValor"
        );


    const codigoPedido =
        document.getElementById(
            "codigoPedido"
        );


    /* =================================================
       MOSTRAR CERTIFICADO
    ================================================= */

    if (pixNome) {

        pixNome.textContent =
            certificadoAtual;

    }


    /* =================================================
       MOSTRAR VALOR
    ================================================= */

    if (pixValor) {

        pixValor.textContent =
            `R$ ${formatarValor(valorAtual)}`;

    }


    /* =================================================
       MOSTRAR PEDIDO
    ================================================= */

    if (codigoPedido) {

        codigoPedido.textContent =
            codigoPedidoAtual;

    }


    /* =================================================
       GERAR QR CODE PIX
    ================================================= */

    gerarQRCodePix();


    /* =================================================
       ABRIR MODAL PIX
    ================================================= */

    if (pixModal) {

        pixModal.classList.add("active");

        document.body.style.overflow =
            "hidden";

    }

}


/* =====================================================
   GERAR QR CODE PIX
===================================================== */

function gerarQRCodePix() {

    const qrContainer =
        document.getElementById(
            "qrcode"
        );


    const copiaCola =
        document.getElementById(
            "pixCopiaCola"
        );


    if (!qrContainer) {

        console.error(
            "Elemento #qrcode não encontrado."
        );

        return;

    }


    if (typeof QRCode === "undefined") {

        alert(
            "A biblioteca do QR Code não foi carregada."
        );

        return;

    }


    /* =================================================
       LIMPAR QR CODE ANTERIOR
    ================================================= */

    qrContainer.innerHTML = "";


    try {

        const payload =
            gerarPixPayload();


        /* =============================================
           PIX COPIA E COLA
        ============================================= */

        if (copiaCola) {

            copiaCola.value =
                payload;

        }


        /* =============================================
           GERAR QR CODE
        ============================================= */

        new QRCode(
            qrContainer,
            {
                text: payload,

                width: 190,

                height: 190,

                correctLevel:
                    QRCode.CorrectLevel.M
            }
        );


    } catch (erro) {

        console.error(
            "Erro ao gerar Pix:",
            erro
        );

        alert(
            erro.message
        );

    }

}


/* =====================================================
   FECHAR PIX
===================================================== */

function fecharPix() {

    const pixModal =
        document.getElementById(
            "pixModal"
        );


    if (pixModal) {

        pixModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }

}


/* =====================================================
   COPIAR PIX
===================================================== */

function copiarPix() {

    const campo =
        document.getElementById(
            "pixCopiaCola"
        );


    if (!campo || !campo.value) {

        alert(
            "Gere o pagamento Pix primeiro."
        );

        return;

    }


    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(campo.value)
            .then(() => {

                alert(
                    "Pix Copia e Cola copiado!"
                );

            })
            .catch(() => {

                campo.select();

                document.execCommand(
                    "copy"
                );

                alert(
                    "Pix Copia e Cola copiado!"
                );

            });

    } else {

        campo.select();

        document.execCommand(
            "copy"
        );

        alert(
            "Pix Copia e Cola copiado!"
        );

    }

}


/* =====================================================
   ENVIAR COMPROVANTE WHATSAPP
===================================================== */

function enviarComprovanteWhatsApp() {

    if (
        !certificadoAtual ||
        !valorAtual
    ) {

        alert(
            "Selecione um certificado primeiro."
        );

        return;

    }


    if (
        !WHATSAPP ||
        WHATSAPP === "+555492649735"
    ) {

        alert(
            "Configure seu WhatsApp no script.js."
        );

        return;

    }


    /* =================================================
       MENSAGEM DO WHATSAPP
    ================================================= */

    const mensagem =

        `Olá! Realizei o pagamento via Pix e estou enviando o comprovante.\n\n` +

        `📜 Certificado: ${certificadoAtual}\n` +

        `💰 Valor: R$ ${formatarValor(valorAtual)}\n` +

        `🔖 Código do pedido: ${codigoPedidoAtual}\n\n` +

        `Estou anexando o comprovante do pagamento nesta conversa.`;


    /* =================================================
       LIMPAR FORMATAÇÃO DO WHATSAPP
    ================================================= */

    const numeroWhatsApp =
        WHATSAPP.replace(/\D/g, "");


    /* =================================================
       CRIAR LINK DO WHATSAPP
    ================================================= */

    const url =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;


    /* =================================================
       ABRIR WHATSAPP
    ================================================= */

    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   WHATSAPP GERAL
===================================================== */

function abrirWhatsApp() {

    if (
        !WHATSAPP ||
        WHATSAPP === "+555492649735"
    ) {

        alert(
            "Configure seu WhatsApp no script.js."
        );

        return;

    }


    const mensagem =
        "Olá! Gostaria de obter informações sobre os certificados.";


    const numeroWhatsApp =
        WHATSAPP.replace(/\D/g, "");


    const url =
        `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   FECHAR MODAIS COM ESC
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            fecharCompra();

            fecharPix();

        }

    }
);


/* =====================================================
   ANO ATUAL
===================================================== */

const anoAtual =
    document.getElementById(
        "anoAtual"
    );


if (anoAtual) {

    anoAtual.textContent =
        new Date().getFullYear();

}