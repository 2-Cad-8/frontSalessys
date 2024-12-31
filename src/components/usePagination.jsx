import { useState, useEffect } from "react";

export default function Pagination({
  data,
  itemPerPage,
  onChangePage = (f) => f,
}) {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(itemPerPage);
  const [totalPages, setTotalPages] = useState();
  const [pages, setPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
 

  useEffect(() => {
    const total = Math.ceil(data.length / itemPerPage);
    setTotalPages(total);

    const pageNumbers = [];
    for (let i = 1; i <= total; i++) {
      pageNumbers.push(i);
    }
    setPages(pageNumbers);

    // Actualizar newData basado en los cambios en data y currentPage
    setStart((currentPage - 1) * itemPerPage);
    setEnd(currentPage * itemPerPage);
  }, [data, itemPerPage, currentPage]); // Añadir currentPage como dependencia

  useEffect(() => {
    
    onChangePage(data.slice(start, end));
  }, [start, end, data]);

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <>
      <div>
    
       <ul className="pagination">
       <li className="page-item" >
        <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 1}>
          Prev
        </button>
        </li>
        {pages ? (
          pages.map((item) => (
            <li className="page-item" >
            <a
            className="page-link"
              key={item}
              onClick={() => handleChangePage(item)}
              
            >
              {item}
            </a>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
        <li className="page-item" >
        <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        </li>
        </ul>
      </div>
    </>
  );
}
