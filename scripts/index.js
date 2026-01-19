import axios from "axios";

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: new Date() }; // store timestamp
    console.log("Request started:", config.url); // log request start
    return config;
  },
  (error) => {
    return Promise.reject(error); // pass error along
  }
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    const requestTime = new Date() - response.config.metadata.startTime; // duration
    console.log(`Response from ${response.config.url} in ${requestTime} ms`);
    return response; // pass the response to your code
  },
  (error) => {
    if (error.config?.metadata?.startTime) {
      const requestTime = new Date() - error.config.metadata.startTime;
      console.log(
        `Request failed (${error.config.url}) after ${requestTime} ms`
      );
    }
    return Promise.reject(error); // pass error along
  }
);

//name or number for ID
let pokemonID = "";
//let apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}`;

async function pokemonCarousel() {
    try {
        let randomNum = Math.floor(Math.random() * 1350) + 1;
        pokemonID = randomNum;
        let apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;
        let response = await axios.get(apiUrl);

        let result = response.data;

        displayPokemonData(result);

        // Show the next pokemon after 3 seconds
        setTimeout(pokemonCarousel, 3000);
    } catch(error) {
        console.log('Error fetching Pokémon data:', error.message);
        // Retry after 3 seconds even if there's an error
        setTimeout(pokemonCarousel, 3000);
    }
}

function displayPokemonData(pokemon) {
    // Update your DOM with pokemon data
    console.log(pokemon.name, pokemon.sprites.front_default);

    const imageUrl = pokemon.sprites.front_default;

    if (imageUrl) {
        // Use this URL to create and display an image in your application
        console.log("Image URL:", imageUrl);
        // Example of creating an image element (in a browser environment)
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = pokemonData.name;
        document.body.appendChild(imgElement); // Append to your page
    } else {
        console.log("No default image found for this Pokémon.");
    }
}

// Start the carousel
pokemonCarousel();