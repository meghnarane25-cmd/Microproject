function SearchBar({ search, setSearch }) {
  return (
    <div className="container mb-4 d-flex justify-content-center">
      <input
        type="text"
        className="form-control w-50"
        placeholder="Search Country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;