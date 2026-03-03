async function buscarPokemon() {

  const pokemon = document.querySelector("#pokemon").value.toLowerCase();

  if (!pokemon) {
      alert("Digite o nome ou número do Pokémon!");
      return;
  }

  try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

      if (!response.ok) {
          alert("Pokémon não encontrado!");
          return;
      }

      const data = await response.json();

      // Nome + ID
      document.querySelector("#nome").textContent =
          `${data.name} #${data.id}`;

      // Imagem
      document.querySelector("#imagem").src =
          data.sprites.front_default;

      // Ataques (primeiros 2)
      const ataques = data.moves.slice(0, 2)
          .map((move, index) =>
              `ATAQUE ${index + 1}: ${move.move.name.toUpperCase()}`
          ).join("<br>");

      document.querySelector("#ataques").innerHTML = ataques;

  } catch (error) {
      alert("Erro ao buscar Pokémon");
      console.error(error);
  }
}