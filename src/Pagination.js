function Pagination(props) {
  let totalResults = props.totalResults;
  let pageNumber = props.pageNumber;
  let pageSize = props.pageSize;
  let totalPages = Math.ceil(totalResults / pageSize);

  const leftArrow = () => {
    if (pageNumber !== 1)
      return (
        <button id="prev-page" onClick={() => props.changePage(false)}>
          &#10229;{" "}
        </button>
      );
  };

  const rightArrow = () => {
    if (pageNumber !== totalPages)
      return (
        <button id="next-page" onClick={() => props.changePage(true)}>
          &#10230;{" "}
        </button>
      );
  };

  return (
    <div className="page-nav">
      {leftArrow()}
      <div>
        Page {pageNumber} of {totalPages}{" "}
      </div>
      {rightArrow()}
    </div>
  );
}
export default Pagination;
