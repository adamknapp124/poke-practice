'use client';

import React, { useState, useEffect } from 'react';

export default function MyComponent() {
	const [pokemonList, setPokemonList] = useState([]);

	useEffect(() => {
		async function fetchPokemonz() {
			try {
				const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
				const data = await response.json();
				// console.log(data.results[10].url);
				const pokemonData = await Promise.all(
					data.results.map(async (pokemon) => {
						const pokemonResponse = await fetch(pokemon.url);
						const pokemonData = await pokemonResponse.json();
						console.log('pokemonData ', pokemonData.sprites);
						return {
							name: pokemon.name,
							sprite: pokemonData.sprites.front_default,
						};
					})
				);
				setPokemonList(pokemonData);
			} catch (error) {
				console.error('Problem catching them all...', error);
			}
		}

		fetchPokemonz();
	}, []);

	return (
		<div>
			<h2>Pokemon</h2>
			{pokemonList.length === 0 ? (
				<p>Loading...</p>
			) : (
				<ul>
					{pokemonList.map((pokemon) => (
						<li key={pokemon.name}>
							<div>
								<p>{pokemon.name}</p>
								{pokemon.sprite && (
									<img src={pokemon.sprite} alt={pokemon.name} />
								)}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
