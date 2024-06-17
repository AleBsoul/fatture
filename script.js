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

    console.log(document.getElementById("textarea").value)

    
    if( ! false in check_list ){
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
        input.classList.remove("null");
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

    document.getElementById("nome").innerHTML = `<input id="nome-input" placeholder="nome"></input>`
    document.getElementById("via").innerHTML = `<input id="via-input" placeholder="via"></input>`
    document.getElementById("città").innerHTML = `<input id="citta-input" placeholder="città"></input>`
    document.getElementById("cf").innerHTML = `<input id="cf-input" placeholder="codice fiscale"></input>`

    document.getElementById("pagamento_p").innerHTML =`Pagamento: <select id="tipo_pagamento"class="near"><option value="POS">POS</option><option value="Contanti">Contanti</option></select>`;
    document.getElementById("tipo_pagamento").value = pagamento_val;
    document.getElementById("totale").innerHTML = `<input id="tot-input" placeholder="totale"></input>`;
    document.getElementById("tot-input").value = totale_val;

    print_btn.style.display="block";

};