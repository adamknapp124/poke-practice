export default async function getPokemonz() {
	try {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
		const pokemonz = await response.json();
		console.log(pokemonz);
	} catch (error) {
		console.error('Problem catching them all...', error);
	}
}
