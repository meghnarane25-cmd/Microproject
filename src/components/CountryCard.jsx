function CountryCard({ country, onViewDetails, onViewCities }) {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4">

      <div className="card h-100 shadow-lg border-0 rounded-4">

        <img
          src={country.flag}
          alt={country.name}
          className="card-img-top"
          style={{
            height: "200px",
            objectFit: "cover"
          }}
        />

        <div className="card-body text-center">

          <h3 className="text-primary">
            {country.name}
          </h3>

          <p>
            <strong>Capital:</strong> {country.capital}
          </p>

          <p>
            <strong>Population:</strong>{" "}
            {country.population === "N/A"
              ? "N/A"
              : Number(country.population).toLocaleString()}
          </p>

          <p>
            <strong>Currency:</strong> {country.currency}
          </p>

          <div className="d-flex justify-content-center gap-2 mt-3">

            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#detailsModal"
              onClick={() => onViewDetails(country)}
            >
              View Details
            </button>

            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#citiesModal"
              onClick={() => onViewCities(country.name)}
            >
              View Cities
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CountryCard;
