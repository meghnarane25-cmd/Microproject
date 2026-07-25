function Dashboard({ countries, filtered }) {

  const totalCountries = countries.length;

  const totalPopulation = countries.reduce(
    (sum, country) => sum + Number(country.population || 0),
    0
  );

  const highest =
    countries.length > 0
      ? countries.reduce((a, b) =>
          Number(a.population) > Number(b.population)
            ? a
            : b
        )
      : {};

  const lowest =
    countries.length > 0
      ? countries.reduce((a, b) =>
          Number(a.population) < Number(b.population)
            ? a
            : b
        )
      : {};

  const averagePopulation =
    totalCountries > 0
      ? Math.round(totalPopulation / totalCountries)
      : 0;

  const currencies = new Set(
    countries
      .map((country) => country.currency)
      .filter((currency) => currency && currency !== "N/A")
  );

  return (
    <div className="container my-4">

      <h2 className="text-center mb-4">
        📊 Country Statistics Dashboard
      </h2>

      <div className="row g-4">

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>🌍 Total Countries</h5>
            <h3>{totalCountries}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>👥 Total Population</h5>
            <h3>{totalPopulation.toLocaleString()}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>🏆 Highest Population</h5>
            <h4>{highest.name}</h4>
            <small>
              {Number(highest.population || 0).toLocaleString()}
            </small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>📉 Lowest Population</h5>
            <h4>{lowest.name}</h4>
            <small>
              {Number(lowest.population || 0).toLocaleString()}
            </small>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>📈 Average Population</h5>
            <h4>{averagePopulation.toLocaleString()}</h4>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>💰 Total Currencies</h5>
            <h3>{currencies.size}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow text-center p-3">
            <h5>🔍 Countries Displayed</h5>
            <h3>{filtered.length}</h3>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;