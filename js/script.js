function romoverCaracteresEspeciales(str){
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    str = str.replace(/[^a-z0-9\s]/g, "");
    return str;
}

let agreeTxt = document.getElementById("AgreeText");
let aboutContext = document.getElementById("Normalize");

aboutContext.addEventListener('click', function () {
    agreeTxt.focus();
});

agreeTxt.addEventListener("input", function(event){
    let txtAgreeUser = event.target.value;
    let txtSinCaractEspecial = romoverCaracteresEspeciales(txtAgreeUser);
    event.target.value = txtSinCaractEspecial;
});

function checkTextInput() {
    let Agretext = document.getElementById("AgreeText");
    if (Agretext.value.trim() === "") {
        alert("Debes ingresar el texto a encriptar");
        return false;
    }
    return true;
}

function reemplezarTxt(txtResult) {
    let aboutTxtInicio = document.getElementById("textoInicio");
    let aboutTxtResultado = document.getElementById("textoResultado");
    let txtEncriptado = document.getElementById("ResulText");

    aboutTxtInicio.style.display = "none";
    aboutTxtResultado.style.display = "flex";
    txtEncriptado.value = txtResult;
}

function bloqTxtResultado() {
    const ResultadoTexto = document.getElementById("ResulText");
    ResultadoTexto.readOnly = true;
}

const llaves = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat"
};

function encriptarTxt() {
    if (!checkTextInput()) {
        return 0;
    }

    let withoutEncript = document.getElementById("AgreeText");
    let txtWithEncript = withoutEncript.value;
    withoutEncript.value = "";

    let txtForEncript = Object.entries(llaves);

    for (let [llaveObj, resulObj] of txtForEncript) {
        txtWithEncript = txtWithEncript.replace(new RegExp(llaveObj, "g"), resulObj);
    }

    reemplezarTxt(txtWithEncript);
}

function desencriptarTxt() {
    if (!checkTextInput()) {
        return 0;
    }

    let txtWithEncript = document.getElementById("AgreeText");
    let txtDesencript = txtWithEncript.value;
    txtWithEncript.value = "";

    let txtForEncript = Object.entries(llaves);

    for (let [llaveObj, resulObj] of txtForEncript) {
        txtDesencript = txtDesencript.replace(new RegExp(resulObj, "g"), llaveObj);
    }
    reemplezarTxt(txtDesencript);
}

function copiarTxt() {
    const resulTxt = document.getElementById("ResulText");
    const agreeTxt = document.getElementById("AgreeText");

    let textoCopiar = resulTxt.value;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(textoCopiar)
            .then(() => {
                alert("Texto copiado");
            })
            .catch((error) => {
                alert("Error al copiar (" + error + ")");
            });
    } else {
        resulTxt.select();
        document.execCommand("copy");
        resulTxt.setSelectionRange(0, 0);
        alert("Texto copiado");
    }
    agreeTxt.focus();
}