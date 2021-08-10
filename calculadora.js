
    function getCalculadora() {
        var oDiv = document.getElementById("container"),
            oForm = document.createElement('form'),
            oTable = document.createElement('table'),
            oTr = document.createElement('tr'),
            oTd = document.createElement('td'),
            oInput = document.createElement('input');
            oQuebraLinha = document.createElement('br');

        oForm.setAttribute('method', 'POST');

        oTable.setAttribute('style', 'border: 1px solid black');
        oTable.setAttribute('class', 'tbGeral');

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

        oTable.appendChild(oTr);

        oForm.appendChild(oTable);

        oDiv.appendChild(oForm);
        oDiv.appendChild(document.createTextNode("oi"))
            
    }

    function pegaValor() {
        return 0;
    }


    getCalculadora();