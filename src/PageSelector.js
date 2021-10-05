import Dropdown from "./Dropdown";

function PageSelector(props) {
  let pageSize = props.pageSize;

  const pageSizes = [10, 20, 50];

  return (
    <div className="results-wrapper">
      <p>Results per page</p>
      <Dropdown
        title={pageSize}
        items={pageSizes}
        changePageSize={props.changePageSize}
      />
    </div>
  );
}

export default PageSelector;
