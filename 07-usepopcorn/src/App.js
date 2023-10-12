import { useState, useEffect, useRef } from 'react';
import StarRating from './StarRating';

const average = arr => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = '509f2c9c';

export default function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [error, setError] = useState('');
	const [selectedId, setSelectedId] = useState(null);
	// const [watched, setWatched] = useState([]);
	const [watched, setWatched] = useState(function () {
		const storadValue = localStorage.getItem('watched');
		return JSON.parse(storadValue);
	});

	// tak nigdy nie robimy
	// useState(localStorage.getItem('watched'))

	function handleSelectMovie(id) {
		setSelectedId(selectedId => (id === selectedId ? null : id));
	}

	function handleCloseMovie() {
		setSelectedId(null);
	}

	function handleAddWatched(movie) {
		setWatched(watched => [...watched, movie]);

		// 1 metoda

		//localStorage.setItem('watched', JSON.stringify([...watched, movie]));
	}

	function handleDeleteWatched(id) {
		setWatched(watched => watched.filter(movie => movie.imdbID !== id));
	}

	useEffect(
		function () {
			localStorage.setItem('watched', JSON.stringify(watched));
		},
		[watched]
	);

	useEffect(
		function () {
			// browser api
			const controller = new AbortController();

			async function fetchMovies() {
				try {
					setIsLoading(true);
					setError('');
					const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
						signal: controller.signal,
					});

					if (!res.ok) throw new Error('Something get wrong with fetching movies');

					const data = await res.json();
					if (data.Response === 'False') throw new Error('Movie not found!');

					setMovies(data.Search);
					setError('');
				} catch (err) {
					if (err.name !== 'AbortError') {
						console.log(err.message);
						setError(err.message);
					}
				} finally {
					setIsLoading(false);
				}
			}

			if (query.length < 3) {
				setMovies([]);
				setError('');
				return;
			}

			handleCloseMovie();
			fetchMovies();

			return function () {
				controller.abort();
			};
		},
		[query]
	);
	// pusta tablica mowi ze useEffect będzie wykonane gdy komponent będzie 1 raz zamontowany

	return (
		<>
			<NavBar>
				<Search query={query} setQuery={setQuery} />
				<NumResults movies={movies} />
			</NavBar>

			<Main>
				<Box>
					{/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
					{isLoading && <Loader />}
					{!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
					{error && <ErrorMessage message={error} />}
				</Box>

				<Box>
					{selectedId ? (
						<MovieDetails
							selectedId={selectedId}
							onCloseMovie={handleCloseMovie}
							onAddWatched={handleAddWatched}
							watched={watched}
						/>
					) : (
						<>
							<WatchedSummary watched={watched} />
							<WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
						</>
					)}
				</Box>
			</Main>
		</>
	);
}

function Loader() {
	return <p className='loader'>Loading...</p>;
}

function ErrorMessage({ message }) {
	return (
		<p className='error'>
			<span>✋</span> {message}
		</p>
	);
}

function NavBar({ children }) {
	return (
		<nav className='nav-bar'>
			<Logo />
			{children}
		</nav>
	);
}

function NumResults({ movies }) {
	return (
		<p className='num-results'>
			Found <strong>{movies.length}</strong> results
		</p>
	);
}
function Logo() {
	return (
		<div className='logo'>
			<span role='img'>🍿</span>
			<h1>usePopcorn</h1>
		</div>
	);
}

function Search({ query, setQuery }) {
	useEffect(function () {
		// Tak nie robimy w reacie
		const el = document.querySelector('.search');
		el.focus();
		console.log(el);
	}, []);

	return (
		<input
			className='search'
			type='text'
			placeholder='Search movies...'
			value={query}
			onChange={e => setQuery(e.target.value)}
		/>
	);
}

function Main({ children }) {
	return <main className='main'>{children}</main>;
}

function Box({ children }) {
	const [isOpen, setIsOpen] = useState(true);

	return (
		<div className='box'>
			<button className='btn-toggle' onClick={() => setIsOpen(open => !open)}>
				{isOpen ? '-' : '+'}
			</button>
			{isOpen && children}
		</div>
	);
}

function MovieList({ movies, onSelectMovie }) {
	return (
		<ul className='list list-movies'>
			{movies?.map(movie => (
				<Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
			))}
		</ul>
	);
}

function Movie({ movie, onSelectMovie }) {
	return (
		<li onClick={e => onSelectMovie(movie.imdbID)}>
			<img src={movie.Poster} alt={`${movie.Title} poster`} />
			<h3>{movie.Title}</h3>
			<div>
				<p>
					<span>🗓</span>
					<span>{movie.Year}</span>
				</p>
			</div>
		</li>
	);
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
	const [movie, setMovie] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [userRating, setUserRating] = useState('');

	const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
	const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

	const {
		Title: title,
		Year: year,
		Poster: poster,
		Runtime: runtime,
		imdbRating,
		Plot: plot,
		Released: released,
		Actors: actors,
		Director: director,
		Genre: genre,
	} = movie;

	/* eslint-disable */
	// if (imdbRating > 8) [isTop, setIsTop] = useState(true);

	// if (imdbRating > 8)return <p>Greatest ever!</p>;

	/* 	const [isTop, setIsTop] = useState(imdbRating > 8);
	console.log(isTop);

	useEffect(
		function () {
			setIsTop(imdbRating > 8);
		},
		[imdbRating]
	); */

	/* const isTop = imdbRating > 8;
	console.log(isTop);

	const [avgRating, setAvgRating] = useState(0); */

	function handleAdd() {
		const newWatchedMovie = {
			imdbID: selectedId,
			title,
			year,
			poster,
			imdbRating: Number(imdbRating),
			runtime: Number(runtime.split(' ').at(0)),
			userRating,
		};
		onAddWatched(newWatchedMovie);
		onCloseMovie();

		/* 		setAvgRating(Number(imdbRating));
		setAvgRating(avgRating => (avgRating + userRating) / 2); */
	}

	useEffect(
		function () {
			function callback(e) {
				if (e.code === 'Escape') {
					onCloseMovie();
				}
			}

			document.addEventListener('keydown', callback);

			return function () {
				document.removeEventListener('keydown', callback);
			};
		},
		[onCloseMovie]
	);

	useEffect(
		function () {
			async function getMovieDetails() {
				setIsLoading(true);
				const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
				const data = await res.json();
				setMovie(data);
				setIsLoading(false);
			}
			getMovieDetails();
		},
		[selectedId]
	);

	useEffect(
		function () {
			if (!title) return;
			document.title = `MOVIE | ${title}`;

			return function () {
				document.title = 'usePopcorn';
				// console.log(`Clean up effect for movie ${title}`);
			};
		},
		[title]
	);

	return (
		<div className='details'>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<header>
						<button className='btn-back' onClick={onCloseMovie}>
							&larr;
						</button>
						<img src={poster} alt={`Poster of ${movie} movie`} />
						<div className='details-overview'>
							<h2>{title}</h2>
							<p>
								{released} &bull; {runtime}
							</p>
							<p>{genre}</p>
							<p>
								<span>⭐️</span>
								{imdbRating} IMDb rating
							</p>
						</div>
					</header>

					{/* 	<p>{avgRating}</p> */}

					<section>
						<div className='rating'>
							{!isWatched ? (
								<>
									<StarRating maxRating={10} size={24} onSetRating={setUserRating} />

									{userRating > 0 && (
										<button className='btn-add' onClick={handleAdd}>
											+ Add to list
										</button>
									)}
								</>
							) : (
								<p>
									You rated this movie {watchedUserRating}
									<span>⭐</span>
								</p>
							)}
						</div>
						<p>
							<em>{plot}</em>
						</p>
						<p>Starring {actors}</p>
						<p>Directed by {director}</p>
					</section>
				</>
			)}
		</div>
	);
}

function WatchedSummary({ watched }) {
	const avgImdbRating = average(watched.map(movie => movie.imdbRating));
	const avgUserRating = average(watched.map(movie => movie.userRating));
	const avgRuntime = average(watched.map(movie => movie.runtime));

	return (
		<div className='summary'>
			<h2>Movies you watched</h2>
			<div>
				<p>
					<span>#️⃣</span>
					<span>{watched.length} movies</span>
				</p>
				<p>
					<span>⭐️</span>
					<span>{avgImdbRating.toFixed(2)}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{avgUserRating.toFixed(2)}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{avgRuntime} min</span>
				</p>
			</div>
		</div>
	);
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
	return (
		<ul className='list'>
			{watched.map(movie => (
				<WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
			))}
		</ul>
	);
}

function WatchedMovie({ movie, onDeleteWatched }) {
	return (
		<li>
			<img src={movie.poster} alt={`${movie.title} poster`} />
			<h3>{movie.title}</h3>
			<div>
				<p>
					<span>⭐️</span>
					<span>{movie.imdbRating}</span>
				</p>
				<p>
					<span>🌟</span>
					<span>{movie.userRating}</span>
				</p>
				<p>
					<span>⏳</span>
					<span>{movie.runtime} min</span>
				</p>

				<button className='btn-delete' onClick={() => onDeleteWatched(movie.imdbID)}>
					X
				</button>
			</div>
		</li>
	);
}
