import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CountryCard from "./components/CountryCard";
import PopulationChart from "./components/PopulationChart";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cities Modal
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // Details Modal
  const [details, setDetails] = useState(null);
  const [history, setHistory] = useState("");

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    try {
      setLoading(true);

      const [capitalRes, populationRes, currencyRes, flagRes] =
        await Promise.all([
          fetch("https://countriesnow.space/api/v0.1/countries/capital"),
          fetch("https://countriesnow.space/api/v0.1/countries/population"),
          fetch("https://countriesnow.space/api/v0.1/countries/currency"),
          fetch("https://countriesnow.space/api/v0.1/countries/flag/images"),
        ]);

      const capitalData = await capitalRes.json();
      const populationData = await populationRes.json();
      const currencyData = await currencyRes.json();
      const flagData = await flagRes.json();

      const merged = capitalData.data
        .map((country) => {
          const population = populationData.data.find(
            (p) => p.country === country.name
          );

          const currency = currencyData.data.find(
            (c) => c.name === country.name
          );

          const flag = flagData.data.find(
            (f) => f.name === country.name
          );

          if (!flag) return null;

          return {
            name: country.name,
            capital: country.capital,
            population: population
              ? population.populationCounts.at(-1).value
              : "N/A",
            currency: currency ? currency.currency : "N/A",
            flag: flag.flag,
          };
        })
        .filter(Boolean);

      setCountries(merged);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  // View Cities
  async function viewCities(countryName) {

    setSelectedCountry(countryName);

    try {

      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: countryName,
          }),
        }
      );

      const result = await response.json();

      if (!result.error) {
        setCities(result.data);
      } else {
        setCities([]);
      }

    } catch (error) {
      console.log(error);
      setCities([]);
    }
  }

  // View Details
  async function viewDetails(country) {

    setDetails(country);
    setHistory("Loading history...");

    try {

      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          country.name
        )}`
      );

      const result = await response.json();

      setHistory(result.extract || "History not available.");

    } catch (error) {

      console.log(error);
      setHistory("Unable to load history.");

    }
  }

  const filtered = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.capital.toLowerCase().includes(search.toLowerCase())
  );
          return (
  <div>

    <Header />

    {/* Chart Button */}
    <div className="container mt-3 text-end">
      <button
        className="btn btn-success"
        onClick={() => setShowChart(!showChart)}
      >
        {showChart ? "Close Population Chart" : "Show Population Chart"}
      </button>
    </div>

    <SearchBar
      search={search}
      setSearch={setSearch}
    />

    {/* Population Chart */}
    {showChart && (
      <PopulationChart countries={filtered} />
    )}

    {/* No Country Found */}
    {!loading && filtered.length === 0 && (
      <h3 className="text-center text-warning my-4">
        No Country Found
      </h3>
    )}

    {/* Country Cards */}
    <div className="container-fluid py-4">
      <div className="row">

        {filtered.map((country) => (

          <CountryCard
            key={country.name}
            country={country}
            onViewCities={viewCities}
            onViewDetails={viewDetails}
          />

        ))}

      </div>
    </div>

    {/* =======================
          VIEW CITIES MODAL
    ======================== */}

    <div
      className="modal fade"
      id="citiesModal"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          <div className="modal-header">

            <h5 className="modal-title">
              Cities of {selectedCountry}
            </h5>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            {cities.length === 0 ? (

              <p>No city data available.</p>

            ) : (

              <div className="row">

                {cities.slice(0, 20).map((city) => (

                  <div
                    className="col-md-6 mb-2"
                    key={city}
                  >

                    <div className="card p-2">

                      {city}

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </div>

    {/* =======================
         VIEW DETAILS MODAL
    ======================== */}

    <div
      className="modal fade"
      id="detailsModal"
      tabIndex="-1"
    >

      <div className="modal-dialog modal-lg">

        <div className="modal-content">

          <div className="modal-header">

            <h4 className="modal-title">

              {details?.name}

            </h4>

            <button
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>

          </div>

          <div className="modal-body">

            {details && (

              <>

                <div className="text-center">

                  <img
                    src={details.flag}
                    alt={details.name}
                    className="img-fluid rounded shadow mb-4"
                    style={{ width: "300px" }}
                  />

                </div>

                <table className="table table-bordered">

                  <tbody>

                    <tr>
                      <th>Capital</th>
                      <td>{details.capital}</td>
                    </tr>

                    <tr>
                      <th>Population</th>
                      <td>
                        {details.population === "N/A"
                          ? "N/A"
                          : Number(details.population).toLocaleString()}
                      </td>
                    </tr>

                    <tr>
                      <th>Currency</th>
                      <td>{details.currency}</td>
                    </tr>

                  </tbody>

                </table>

                <h4 className="mt-4">
                  History / About
                </h4>

                <p style={{ textAlign: "justify" }}>
                  {history}
                </p>

              </>

            )}

          </div>

        </div>

      </div>

    </div>
  <Footer />
  </div>
  )};

  export default App;