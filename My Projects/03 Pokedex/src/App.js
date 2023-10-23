import { useReducer } from 'react';
import pokemonListData from './pokemonList.json';
import Header from './Header';
import Tab from './Tab';
import TabsBox from './TabsBox';
import Pokemon from './Pokemon';

const regions = [
	{ name: 'Kanto', gen: '(Gen I)', start: 0, end: 151 },
	{ name: 'Johto', gen: '(Gen II)', start: 151, end: 251 },
	{ name: 'Hoenn', gen: '(Gen III)', start: 251, end: 383 },
	{ name: 'Sinnoh', gen: '(Gen IV)', start: 383, end: 492 },
	{ name: 'Unova', gen: '(Gen V)', start: 492, end: 648 },
	{ name: 'Kalos', gen: '(Gen VI)', start: 648, end: 718 },
	{ name: 'Alola', gen: '(Gen VII)', start: 722, end: 799 },
	{ name: 'Unknown', gen: '', start: 808, end: 810 },
	{ name: 'Galar', gen: '(Gen VIII)', start: 899, end: 902 },
	{ name: 'Hisui', gen: '', start: 902, end: 996 },
	{ name: 'Paldea', gen: '(Gen IX)', start: 906, end: 996 },
];

const initialState = {
	currentRegion: 'Kanto', // Domyślny region
	displayedData: [], // Dane do wyświetlenia
	checkboxState: {}, // Stan checkboxa
};
function reducer(state, action) {
	switch (action.type) {
		case 'SELECT_REGION':
			// Filtruj dane zgodnie z wybranym regionem
			const selectedRegion = regions.find(region => region.name === action.region);
			if (selectedRegion) {
				const filteredData = pokemonListData.slice(selectedRegion.start, selectedRegion.end);
				return {
					...state,
					currentRegion: action.region,
					displayedData: filteredData,
				};
			}
			return state;
		case 'TOGGLE_CHECKBOX':
			return {
				...state,
				checkboxState: {
					...state.checkboxState,
					[action.payload.pokemonName]: action.payload.checked,
				},
			};
		default:
			return state;
	}
}

export default function App() {
	const [pokeList, dispatch] = useReducer(reducer, initialState);

	const handleRegionClick = region => {
		// Obsługuje kliknięcie przycisku regionu
		dispatch({ type: 'SELECT_REGION', region });
	};

	return (
		<>
			<Header />
			<TabsBox>
				{regions.map(reg => (
					<Tab
						name={reg.name}
						generation={reg.gen}
						key={reg.name}
						onClick={() => handleRegionClick(reg.name)}
					/>
				))}
			</TabsBox>
			<ul>
				{/* Wyświetl dane z aktualnie wybranego regionu */}
				{pokeList.displayedData.map((pokemon, index) => (
					<Pokemon
						key={pokemon.name}
						name={pokemon.name}
						imgSrc={pokemon.imageUrl}
						num={pokemon.url}
						checked={pokeList.checkboxState[pokemon.name] || false}
						dispatch={dispatch}
					/>
				))}
			</ul>
		</>
	);
}
