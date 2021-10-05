import React, { useState } from "react";

function Table({ apiData, selectSortingCriteria }) {
  const [sortingStatus, setSortingStatus] = useState([null, null, null, null]);

  const tableHeaders = [
    "Country",
    "Continent",
    "Population",
    "Population Growth",
  ];

  //return data or null if called before receiving response
  function prepareData(results) {
    try {
      return results.map((entry, index) => {
        return (
          <tr key={index} className="table-entry">
            <td>{entry.Country}</td>
            <td>{entry.Continent}</td>
            <td>{entry.Population}</td>
            <td>{entry.PopulationGrowth}</td>
          </tr>
        );
      });
    } catch {
      return null;
    }
  }

  const toggleOrder = (index, array) => {
    let sortValue = "DESC";
    let newArray = array;
    if (sortingStatus[index] === "DESC") {
      sortValue = "ASC";
    }
    if (newArray === null) {
      newArray = [...sortingStatus];
    }
    newArray[index] = sortValue;
    setSortingStatus(newArray);
    return sortValue;
  };

  const changeHeaderIcons = (index) => {
    if (sortingStatus[index] !== null) {
      return toggleOrder(index, null);
    } else {
      const newArray = [null, null, null, null];
      return toggleOrder(index, newArray);
    }
  };

  const handleHeaderClick = (e, index) => {
    const order = changeHeaderIcons(index);
    selectSortingCriteria(e.target.innerHTML.replace(/\s+/g, ""), order);
  };

  const createHeader = (entry, index) => {
    if (sortingStatus[index] === null) {
      return (
        <th key={index} onClick={(e) => handleHeaderClick(e, index)}>
          {entry}
        </th>
      );
    } else {
      if (sortingStatus[index] === "ASC")
        return (
          <th key={index} onClick={(e) => handleHeaderClick(e, index)}>
            <span>{entry}</span> &#8593;
          </th>
        );
      else
        return (
          <th key={index} onClick={(e) => handleHeaderClick(e, index)}>
            <span>{entry}</span> &#8595;
          </th>
        );
    }
  };

  return (
    <table id="country-table">
      <thead>
        <tr>
          {tableHeaders.map((entry, index) => createHeader(entry, index))}
        </tr>
      </thead>
      <tbody>{prepareData(apiData.results)}</tbody>
    </table>
  );
}

export default Table;
