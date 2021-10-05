function Continents({ selectContinents }) {
  const continentInfo = [
    { name: "Europe", code: "EU" },
    { name: "Africa", code: "AF" },
    { name: "South America", code: "SA" },
    { name: "North America", code: "NA" },
    { name: "Oceania", code: "OC" },
    { name: "Asia", code: "AS" },
  ];

  const handleChange = (continent) => {
    selectContinents(continent);
  };

  return (
    <ul className="continent-selector">
      {continentInfo.map((continent, index) => (
        <li key={index}>
          <label>
            {continent.name}
            <input
              type="checkbox"
              onChange={() => handleChange(continent.code)}
            ></input>
          </label>
        </li>
      ))}
    </ul>
  );
}

export default Continents;
