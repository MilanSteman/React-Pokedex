export default function Searchbar({ searchInput, handleChange }) {
    return (
        <div>
            <div className="searchWrapper">
                <label htmlFor="search" className="material-icons">search</label>
                <input
                    type="text"
                    name="search"
                    placeholder="Search for pokemons"
                    value={searchInput}
                    onChange={e => handleChange(e.target.value)}
                />
            </div>
        </div>
    );
}
