
    function getCalculadora() {
        var oDiv = document.getElementById("container"),
            oForm = document.createElement('form'),
            oTable = document.createElement('table');

        oForm.setAttribute('method', 'POST')

        oTable.setAttribute('style', 'border: 1px solid black');
        oTable.setAttribute('class', 'tbGeral');


        oTable.appendChild(getLinhaResultado());
        oTable.appendChild(getLinhaReset());

        oForm.appendChild(oTable);

        oDiv.appendChild(oForm);
        oDiv.appendChild(document.createTextNode("oi"))
            
    }

    function getLinhaResultado() {
        var oTr = document.createElement('tr'),
        oTd = document.createElement('td'),
        oInput = document.createElement('input');
        oQuebraLinha = document.createElement('br');

        oTd.setAttribute('colspan', 4);
        oTd.setAttribute('class', 'colunaTab');
        oTd.setAttribute('style', 'height: 10px');

        oInput.setAttribute('value', pegaValor());
        oInput.setAttribute('type', 'text');
        oInput.setAttribute('name', 'total');
        oInput.setAttribute('id', 'total');
        oInput.setAttribute('disabled', true);
        oInput.appendChild(oQuebraLinha);
        
        oTd.appendChild(oInput);

        oTr.appendChild(oTd);

        return oTr;
    }


    function pegaValor() {
        return 0;
    }


    getCalculadora();