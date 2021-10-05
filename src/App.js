import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";
import Checkboxes from "./Continents.js";
import Searchbar from "./Searchbar";
import PageSelector from "./PageSelector";
import Pagination from "./Pagination";

function App() {
  /* Create state:
        - apiData: List containing dictionaries of countries from API.
        - searchQuery: The query parameter that should be added to &search=
        - pageNumber: The page that is requested
  */

  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(); // Default = No search query
  const [pageNumber, setPageNumber] = useState(1); //Default = Page 1
  const [pageSize, setPageSize] = useState(10); // Default = 10 per page
  const [continents, setContinents] = useState([]); //Default = no checked continents
  const [sortingCriteria, setSortingCriteria] = useState({
    name: null,
    order: null,
  }); //Default = alphabetical

  //forward = true -> next page, forward = false -> previous
  const changePage = (forward) => {
    if (forward) setPageNumber(pageNumber + 1);
    else setPageNumber(pageNumber - 1);

    if (pageSize > 10) {
      const tableWrapper = document.getElementById("table-wrapper");
      tableWrapper.scrollTop = 0;
    }
  };

  //set page size according to value clicked in dropdown
  const changePageSize = (numberValue) => {
    setPageSize(numberValue);
    setPageNumber(1);
  };

  //set a new search term from the state in search component
  const submitSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    setPageNumber(1);
    setContinents([]); //reset continents on search
  };

  //add/remove a continentCode to the state array
  const selectContinents = (continentCode) => {
    let checked = false;
    let newContinents;

    continents.forEach((continent) => {
      if (continent === continentCode) {
        checked = true;
        newContinents = continents.filter((entry) => entry !== continent);
        setContinents(newContinents);
      }
    });

    if (!checked) {
      newContinents = [...continents];
      newContinents.push(continentCode);
      setContinents(newContinents);
    }
    setPageNumber(1);
  };

  const selectSortingCriteria = (name, order) => {
    const newCriteria = { name: name, order: order };
    setSortingCriteria(newCriteria);
    setPageNumber(1);
  };

  //this needs a try-catch block as it is called before the initial data is ready
  const returnTotalResults = () => {
    try {
      return apiData.pager.total;
    } catch {
      return 1;
    }
  };

  useEffect(() => {
    // All parameters are appended to this URL.
    let apiQuery = "https://dhis2-app-course-api.ifi.uio.no/api?";

    // If searchQuery isn't empty add &search=searchQuery to the API request.
    if (searchQuery) {
      apiQuery = apiQuery + "&search=" + searchQuery;
    }

    //if user has changed pageSize, the state should reflect that
    if (pageSize !== 10) {
      apiQuery = apiQuery + "&pageSize=" + pageSize;
    }

    //append continent codes when the state array is non-empty
    if (continents.length !== 0) {
      apiQuery = apiQuery + "&ContinentCode=" + continents.join(",");
    }

    if (sortingCriteria.name !== null) {
      apiQuery =
        apiQuery +
        "&order=" +
        sortingCriteria.name +
        ":" +
        sortingCriteria.order;
    }

    // Add what page we are requesting to the API request.
    apiQuery = apiQuery + "&page=" + pageNumber;

    // Query data from API.
    console.log("Querying: " + apiQuery);
    fetch(apiQuery)
      .then((results) => results.json())
      .then((data) => {
        // Then add response to state.
        setApiData(data);
      });
  }, [searchQuery, pageNumber, pageSize, continents, sortingCriteria]); // Array containing which state changes that should re-reun useEffect()

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <Searchbar submitSearch={submitSearch} />
      <section>
        <Checkboxes selectContinents={selectContinents} />
        <div id="table-wrapper">
          <Table
            apiData={apiData}
            selectSortingCriteria={selectSortingCriteria}
          />
        </div>
      </section>
      <div className="page-wrapper">
        <Pagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalResults={returnTotalResults()}
          changePage={changePage}
        />
        <PageSelector
          pageSize={pageSize}
          changePageSize={changePageSize}
        />
      </div>
    </div>
  );
}

export default App;
