

    function getCalculadora() {
        var oDiv = document.getElementById("container"),
            oForm = document.createElement('form'),
            oTable = document.createElement('table');

        oForm.setAttribute('method', 'POST');

        oTable.setAttribute('style', 'border: 1px solid black');
        oTable.setAttribute('class', 'tbGeral');


        oTable.appendChild(getLinhaResultado());
        oTable.appendChild(getPrimeiraLinha());
        oTable.appendChild(getSegundaLinha());
        oTable.appendChild(getTerceiraLinha());
        oTable.appendChild(getQuartaLinha());
        oTable.appendChild(getQuintaLinha());

        oForm.appendChild(oTable);

        oDiv.appendChild(oForm);
    }

    function getLinhaResultado() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTd.setAttribute('colspan', 4);
        oTd.setAttribute('class', 'colunaTab');
        oTd.setAttribute('style', 'height: 10px');

        oInput.setAttribute('value', '');
        oInput.setAttribute('type', 'text');
        oInput.setAttribute('name', 'total');
        oInput.setAttribute('id', 'total');
        oInput.setAttribute('disabled', true);
        oInput.appendChild(oQuebraLinha);
        
        oTd.appendChild(oInput);

        oTr.appendChild(oTd);

        return oTr;
    }

    function getPrimeiraLinha() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTr.appendChild(getButton('C'));
        oTr.appendChild(getButtonVazio());
        oTr.appendChild(getButtonVazio());
        oTr.appendChild(getButton('/'));
 
        return oTr;
    }

    function getSegundaLinha() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTr.appendChild(getButton('7'));
        oTr.appendChild(getButton('8'));
        oTr.appendChild(getButton('9'));
        oTr.appendChild(getButton('x'));
 
        return oTr;
    }

    function getTerceiraLinha() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTr.appendChild(getButton('4'));
        oTr.appendChild(getButton('5'));
        oTr.appendChild(getButton('6'));
        oTr.appendChild(getButton('-'));
 
        return oTr;
    }

    function getQuartaLinha() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTr.appendChild(getButton('1'));
        oTr.appendChild(getButton('2'));
        oTr.appendChild(getButton('3'));
        oTr.appendChild(getButton('+'));
 
        return oTr;
    }

    function getQuintaLinha() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTr.appendChild(getButton('0', true));
        oTr.appendChild(getButton(','));
        oTr.appendChild(getButton('='));

        return oTr;
    }


    function getButton(sParam, bZero = false) {
        var oTd = document.createElement('td'),
            oInput = document.createElement('input');

        oTd.setAttribute('class', 'colunaTab');

        if(bZero) {
            oTd.setAttribute('colspan', 2);
            oInput.setAttribute('value', '0');
        } else {
            oInput.setAttribute('value', sParam);
        }

        oInput.setAttribute('type', 'button');
        oInput.setAttribute('class', 'btn');
        oInput.setAttribute('onclick', 'teste("'+sParam+'")');

        oTd.appendChild(oInput);
    
        return oTd;
    }

    function getButtonVazio() {
        var oTd = document.createElement('td'),
            oInput = document.createElement('input');

        oTd.setAttribute('class', 'colunaTab');

        oInput.setAttribute('value','');
        oInput.setAttribute('type', 'button');
        oInput.setAttribute('disabled', true);
        oInput.setAttribute('class', 'btn');

        oTd.appendChild(oInput);

        return oTd;
    }


    function teste(sParam) {
        var oDiv = document.getElementById("total");
        //oDiv.setAttribute('value', oDiv.value == 0 ? sParam : oDiv.value+sParam);

        debugger;

        if(sParam == 'C') {
            oDiv.setAttribute('value', 0);
        } else {
            var xValorTela = oDiv.value,
                iTotalChar = xValorTela.length;

            if(isCharOperador(sParam) && xValorTela == '') {
               // oDiv.setAttribute('value', 0);
            } else if (isCharOperador(sParam) && xValorTela !== '' && isCharOperador(xValorTela[iTotalChar-1])) {
                var sResto = xValorTela.substring(0, iTotalChar-1);
                oDiv.setAttribute('value', sResto+sParam);
            } else if ( (!isCharOperador(sParam) && xValorTela == '') || (isCharOperador(sParam) && xValorTela !== '') || (!isCharOperador(sParam) && xValorTela !== '')) {
                oDiv.setAttribute('value', xValorTela+sParam);
            }

            var xValorTela = oDiv.value;

            if(xValorTela !== '' && isCharOperador(xValorTela[iTotalChar-1]) && !isCharOperador(sParam)) {
                oDiv.setAttribute('value', resultado());
            }

        }
    }

    function isCharOperador(sChar) {
        var bValidaChar = sChar == '/' || sChar == 'x' || sChar == '-' || sChar == '+' || sChar == '=';
        return bValidaChar;
    }

    function resultado() {
        var aArray = tratamentoString();

        aArray = realizaCalculo(aArray, 'x');
        aArray = realizaCalculo(aArray, '/');
        aArray = realizaCalculo(aArray, '-');
        aArray = realizaCalculo(aArray, '+');

        return aArray[0];
    }

    function tratamentoString() {
        var oDiv = document.getElementById("total"),
        xValorTela = oDiv.value;
        xValorTelaAlterado = xValorTela.replaceAll(',', '.'),
        iTotalChar = xValorTelaAlterado.length;

        if(isCharOperador(xValorTelaAlterado[iTotalChar-1])) {
            var xValorTelaAlterado = xValorTelaAlterado.substring(0, iTotalChar-1);
        }

        return xValorTelaAlterado.match(/([0-9.]+|[+-/x])/g);
    }

    function realizaCalculo(aArray, sOperador) {
        var bContinuaCalculo = false;

        do {
            for (var i = 0; i < aArray.length; i++) {
                if(aArray[i] == sOperador) {
                    bContinuaCalculo = true;
                    iAnt = parseFloat(aArray[i-1]);
                    iPos = parseFloat(aArray[i+1]);
                    switch (sOperador) {
                        case 'x':
                            aArray[i] = iAnt * iPos;
                            break;
                        case '/':
                            aArray[i] = iAnt / iPos;
                            break;
                        case '+':
                            aArray[i] = iAnt + iPos;
                            break;
                        case '-':
                            aArray[i] = iAnt - iPos;
                            break;
                    }

                    aArray.splice(i-1, 1);
                    aArray.splice(i+1, 1);
                } else {
                    bContinuaCalculo = false;
                }
            }
        } while(bContinuaCalculo);
   
        aNewArray = reoordenaArray(aArray);

        return aNewArray;
    }

    function reoordenaArray(aArray) {
        var aNewArray = [];
        for (var i = 0; i < aArray.length; i++) {
            aNewArray[i] = aArray[i];
        }

        return aNewArray;
    }    

    getCalculadora();