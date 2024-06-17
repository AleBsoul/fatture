document.getElementById('doctor-form').onsubmit = function(e) {
    e.preventDefault();
    let nome = document.getElementById('nome_auth').value;
    let cognome = document.getElementById('cognome').value;
    let telefono = document.getElementById('telefono').value;
    let sesso = document.getElementById('sesso').value;
    let indirizzo = document.getElementById('indirizzo').value;

    const nom_cog = capitalize(nome +" "+cognome)
    const dati = { "nome": nom_cog, "tel":telefono, "sesso":sesso, "indirizzo": indirizzo}
    localStorage.setItem("datiMedicoFatturazioni", JSON.stringify(dati));
    
    document.getElementById("auth").style.display = "none";
    document.getElementById("page-container").style.display = "block";
    
}

const datiMedico = JSON.parse(localStorage.getItem("datiMedicoFatturazioni"));
console.log(datiMedico)

if (datiMedico){
    const dott = document.getElementById("dott");
    const via = document.getElementById("via-int");
    const tel = document.getElementById("tel-int");

    if(datiMedico.sesso==="F"){
        dott.innerText = "Dott.ssa " + datiMedico.nome;
    }else{
        dott.innerText = "Dottore " + datiMedico.nome;
    }
    via.innerText = datiMedico.indirizzo;
    tel.innerText = "Tel. " + datiMedico.tel
    document.getElementById("auth").style.display = "none";
    document.getElementById("page-container").style.display = "block";

}

const data=new Date();
let day = String(data.getDate());
let month = String(data.getMonth()+1);
const year = String(data.getFullYear());

if (day.length===1){
    day = "0"+day;
}
if (month.length===1){
    month = "0"+month;
}

const fullDate = day+"/"+month+"/"+year;


document.getElementById("anno_fattura").innerText=" "+data.getFullYear();
document.getElementById("data").innerText=fullDate;

const print_btn = document.getElementById("print");

print_btn.onclick = () => {
    let check_list = [];
    check_list.push(check_num(document.getElementById("fatt_n_input"))); 
    check_list.push(check_num(document.getElementById("tot-input")));
    check_list.push(check_str(document.getElementById("nome-input")));
    check_list.push(check_str(document.getElementById("via-input")));
    check_list.push(check_str(document.getElementById("citta-input")));
    check_list.push(check_str(document.getElementById("cf-input")));
    check_list.push(check_str(document.getElementById("textarea")));

    const hasError = check_list.some(check => check === false);

    if( !hasError ){
        print();
    }
};

function check_str(input){
    if (!input.value){
        if(input.id==="textarea"){
            document.getElementById("table").classList.add("null");
        }else{
            input.classList.add("null");
        }
        return false
    }else{
        if(input.id==="textarea"){
            document.getElementById("table").classList.remove("null");
        }else{
            input.classList.remove("null");
        }
        return true
    }
}

function check_num(input){
    if (isNaN(input.value) || !input.value){
        input.classList.add("null");
        return false
    }else{
        input.classList.remove("null");
        return true
    }
}

function capitalize(text) {
    return text.toLowerCase().split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}


const print = () =>{
    const n_fattura_val = document.getElementById("fatt_n_input").value;
    const nome_val = document.getElementById("nome-input").value;
    const via_val = document.getElementById("via-input").value;
    const città_val = document.getElementById("citta-input").value;
    const cf_val = document.getElementById("cf-input").value;
    const pagamento_val = document.getElementById("tipo_pagamento").value;

    const totale_val = parseFloat(document.getElementById("tot-input").value).toFixed(2);
    document.getElementById("fatt_n").innerText = n_fattura_val+" /";
    document.getElementById("importo_tabella").innerText=totale_val;
    print_btn.style.display="none";

    document.getElementById("nome").innerText = capitalize(nome_val);
    document.getElementById("via").innerText = via_val
    document.getElementById("città").innerText = città_val
    document.getElementById("cf").innerText = cf_val
    document.getElementById("pagamento_p").innerText = "Pagamento: "+pagamento_val;
    document.getElementById("totale").innerText = totale_val;



    window.print();


    document.getElementById("fatt_n").innerHTML = `<input id="fatt_n_input"></input> /`
    document.getElementById("fatt_n_input").value = n_fattura_val;

    document.getElementById("nome").innerHTML = `<input class="input" id="nome-input" placeholder="nome"></input>`
    document.getElementById("via").innerHTML = `<input class="input" id="via-input" placeholder="via"></input>`
    document.getElementById("città").innerHTML = `<input class="input" id="citta-input" placeholder="città"></input>`
    document.getElementById("cf").innerHTML = `<input class="input" id="cf-input" placeholder="codice fiscale"></input>`

    document.getElementById("pagamento_p").innerHTML =`Pagamento: <select id="tipo_pagamento"class="near"><option value="POS">POS</option><option value="Contanti">Contanti</option></select>`;
    document.getElementById("tipo_pagamento").value = pagamento_val;
    document.getElementById("totale").innerHTML = `<input id="tot-input" placeholder="totale"></input>`;
    document.getElementById("tot-input").value = totale_val;

    document.getElementById("nome-input").value=nome_val;
    document.getElementById("via-input").value=via_val;
    document.getElementById("citta-input").value=città_val;
    document.getElementById("cf-input").value=cf_val;

    print_btn.style.display="block";

};