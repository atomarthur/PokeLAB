document.addEventListener("DOMContentLoaded", () => 
{
    mostrarPokemon(1);
    
    document.querySelector(".pesquisa").addEventListener("submit", (event) =>
    {
        event.preventDefault();
        const numero = document.getElementById("num").value;
        mostrarPokemon(numero);
    });
});

// Functions

async function mostrarPokemon(numero)
{
    let url = `https://pokeapi.co/api/v2/pokemon/${numero}`
    
    let resposta = await fetch(url)

    let dados = await resposta.json()

    atualizarStatus(dados.stats)

    document.querySelector(".nome").textContent = dados.name.toUpperCase()
    document.getElementById("imagem").src = dados.sprites.other["official-artwork"].front_default;
    document.getElementById("imagem").alt = dados.name;
    document.getElementById("height").textContent = (dados.height)/10 + " m";
    document.getElementById("weight").textContent = (dados.weight)/10 + " kg";

    let respostaSpecies = await fetch(dados.species.url);
    let species = await respostaSpecies.json(); 
    let numeroPokedex = species.pokedex_numbers.find(p => p.pokedex.name === "national")?.entry_number || dados.id

    document.getElementById("index").textContent = numeroPokedex


    let tipos = dados.types.map(tipo => tipo.type.name.toUpperCase())

    document.getElementById("tipo1").textContent = tipos[0] || "";
    document.getElementById("tipo2").textContent = tipos[1] || "";

    let tipo1Elemento = document.getElementById('tipo1');
    let tipo2Elemento = document.getElementById('tipo2');

    tipo1Elemento.style.backgroundColor = coresTipos[tipos[0]];

    if (!tipos[1]) 
    {
        document.getElementById("tipo2").style.display = "none";
    } 
    else 
    {
        document.getElementById("tipo2").style.display = "list-item";
        tipo2Elemento.style.backgroundColor = coresTipos[tipos[1]];
    }
}

function atualizarStatus(stats)
{
    const MAX_STAT = 150;

    stats.forEach(stat => {

        const name_stat = stat.stat.name;
        const value_stat = stat.base_stat;

        const stat_bar = document.getElementById(name_stat);
        const percentage = Math.min((value_stat / MAX_STAT) * 100, 100);

        if (percentage < 24)
        {
            stat_bar.style.background = "linear-gradient(90deg,rgba(255, 0, 0, 1) 0%, rgba(255, 92, 92, 1) 90%)";
        }

        else if (percentage < 43)
        {
            stat_bar.style.background = "linear-gradient(90deg,rgba(255, 221, 0, 1) 0%, rgba(255, 250, 99, 1) 90%)";
        }

        else if (percentage < 68)
        {
            stat_bar.style.background = "linear-gradient(90deg,rgba(0, 255, 72, 1) 0%, rgba(140, 255, 180, 1) 90%)";
        }

        else
        {
            stat_bar.style.background = "linear-gradient(90deg,rgb(130, 240, 255) 0%, rgba(0, 180, 255, 1) 90%)";
        }

        stat_bar.style.width = percentage + "%";

    });
}

// Type colours struct

const coresTipos = {
    NORMAL: "#A8A77A",
    FIRE: "#EE8130",
    WATER: "#6390F0",
    ELECTRIC: "#F7D02C",
    GRASS: "#7AC74C",
    ICE: "#96D9D6",
    FIGHTING: "#C22E28",
    POISON: "#A33EA1",
    GROUND: "#E2BF65",
    FLYING: "#A98FF3",
    PSYCHIC: "#F95587",
    BUG: "#A6B91A",
    ROCK: "#B6A136",
    GHOST: "#735797",
    DRAGON: "#6F35FC",
    DARK: "#705746",
    STEEL: "#B7B7CE",
    FAIRY: "#D685AD"
};


