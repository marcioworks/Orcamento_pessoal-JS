class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor =parseFloat( valor)
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }

    limparForm() {
        document.getElementById('ano').value = ''
        document.getElementById('mes').value = ''
        document.getElementById('dia').value = ''
        document.getElementById('tipo').value = ''
        document.getElementById('descricao').value = ''
        document.getElementById('valor').value = ''
    }
}

class BD {
    constructor() {
        let id = localStorage.getItem('id')
        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    proximoId() {
        let proximoId = localStorage.getItem('id')
        return (parseInt(proximoId) + 1)
    }

    gravar(d) {
        let id = this.proximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    carregarTodasdespesas() {
        let despesas = Array()
        let id = localStorage.getItem('id')

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) {
                continue
            }
            despesas.push(despesa)
        }

        return despesas

    }
}

let bd = new BD()


function cadastrarDespesa() {
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')


    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        document.getElementById('modal-titulo-div').className = 'modal-header text-success'
        document.getElementById('modal-titulo').innerHTML = 'Registro Inserido com Sucesso'
        document.getElementById('modal-conteudo').innerHTML = 'Despesa Cadastrada com Sucesso'
        document.getElementById('modal-btn').className = 'btn btn-success'
        document.getElementById('modal-btn').innerHTML = 'Voltar'
        $('#modalRegistadespesa').modal('show')
        despesa.limparForm()
    }
    else {
        document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
        document.getElementById('modal-titulo').innerHTML = 'Erro na Inserção de Dados'
        document.getElementById('modal-conteudo').innerHTML = 'Erro na Gravação. Verifique se Todos os Campos estão Preenchidos'
        document.getElementById('modal-btn').className = 'btn btn-danger'
        document.getElementById('modal-btn').innerHTML = 'Voltar e Corrigir'
        $('#modalRegistadespesa').modal('show')
    }
}

function listarTodasDespesas() {
    let despesas = Array()
    despesas = bd.carregarTodasdespesas()

    let listaDespesas = document.getElementById('listaDespesas')

    despesas.forEach(function (d) {
        let linha = listaDespesas.insertRow()

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        switch (d.tipo) {
            case '1': d.tipo = 'Alimentaçaõ'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = `R$ ${d.valor}`

    })
}



