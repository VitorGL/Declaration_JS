
"use strict";

var facts = [
  ['gabriel', 'endereço', 'av rio branco, 109', true], // 0
  ['joão', 'endereço', 'rua alice, 10', true], // 1
  ['joão', 'endereço', 'rua bob, 88', true], // 2
  ['joão', 'telefone', '234-5678', true], // 3
  ['joão', 'telefone', '91234-5555', true], // 4
  ['joão', 'telefone', '234-5678', false], // 5
  ['gabriel', 'telefone', '98888-1111', true], // 6
  ['gabriel', 'telefone', '56789-1010', true], // 7
];

printar(facts); // Parte da demonstação

var schema = [
    ['endereço', 'cardinality', 'one'],
    ['telefone', 'cardinality', 'many']
];


function verificaSchema(fact, schema) {
    for(var i = 0; i < schema.length; i++) {
        if(fact[1] === schema[i][0]) {
            if(schema[i][2] === 'one') {
                return false;
            }

            else if(schema[i][2] === 'many') {
                return true;
            }
        }
    }
}

function verficaExistencia(fact, facts, pos, medidor) { // Verifica a existência de um fato do último índice até 0, medidor define até onde um fato será verificado 

    var index = -1;
    var contador = 0;
    for(var i = pos - 1; i >= 0; i--) {
    
        contador = 0;

        for (var j = 0; j < facts[i].length - (1 + medidor); j++) {
            if(facts[i][j] === fact[j]) {
                contador++;
            }
        }
        if(contador === 2 && medidor === 1) {
            index = i;
            i = 0;
        }
        if(contador >= 3 && contador < 5) {
            index = i;
            i = 0;
        }
    }

    return index;
}

function retornaValores(facts, schema) {

    var factsFinal;
    var index;

    for(var i = 0; i < facts.length; i++) {
        if(facts[i][facts[i].length-1]) {
            factsFinal = facts.slice(0, 1);
            break;
        }
    }

    for(i = 1; i < facts.length; i++) {
        
        if(facts[i][3]) { // verificando com o próprio booleano
            
            if(verificaSchema(facts[i], schema)) { // if para many
                factsFinal.splice(factsFinal.length, 0, facts[i]);
            }
            else { // else para one
                index = verficaExistencia(facts[i], factsFinal, factsFinal.length, 1);
                if(index !== -1) {
                    factsFinal.splice(index, 1);
                    factsFinal.splice(factsFinal.length, 0, facts[i]);
                }
                else {
                    factsFinal.splice(factsFinal.length, 0, facts[i]);
                }
            }
        }
        else {
            index = verficaExistencia(facts[i], factsFinal, factsFinal.length, 0);
            if(index !== -1) {
                factsFinal.splice(index, 1);
            }
        }
    }
    return factsFinal;
    
}

//
//
// Função demonstação
// (Passando o retorno de retornaValores, a função imprime no HTML)
//

function printar(facts) {
    document.getElementById("demo").innerHTML = "";
    for (var i = 0; i < facts.length; i++) {
        facts[i].toString();
    }
    for (var i = 0; i < facts.length; i++) {
        document.getElementById("demo").innerHTML += "[" + facts[i] + "]" + "<br>";
    }
}
