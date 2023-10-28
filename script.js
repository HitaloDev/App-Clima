const key = 'f743c6379d69a64dbb58ef65dcd0f417';

function exibirDados(dados) {
    document.getElementById('nome-cidade').innerHTML = `${dados.name}`;
    document.getElementById('temperatura').innerHTML = `${dados.main.temp.toFixed(0)}°C`;
    document.getElementById('umidade').innerHTML = `Umidade: ${dados.main.humidity}%`;
    document.getElementById('nuvens').innerHTML = `${dados.weather[0].description}`;
    document.getElementById('icone-tempo').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    console.log(dados);
}

async function buscarCidade(cidade) {
    try {
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json());

        if (dados.cod && dados.cod === '404') {
            throw new Error("Cidade não encontrada");
        }

        exibirDados(dados);

    } catch (error) {
        document.getElementById('nome-cidade').innerHTML = "Erro: " + error.message;
    }
}

function iniciarBotao() {
    const cidade = document.getElementById('input').value;

    if (cidade) {
        buscarCidade(cidade);
    } else {
        document.getElementById('nome-cidade').innerHTML = "Erro: Nenhum nome de cidade fornecido";
    }
}
