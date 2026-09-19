/* =====================================================
   CERTIFICADO MODELO
===================================================== */

// Atualiza automaticamente o ano, caso exista algum
// elemento com o ID "anoCertificado".

const ano = document.getElementById("anoCertificado");

if (ano) {
    ano.textContent = new Date().getFullYear();
}