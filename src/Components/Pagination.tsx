import React from "react";
import { Button, ButtonGroup } from "../Styles/BaseStyle";
import useListStyle from "../Styles/ListStyle";

type Props = {
    offset: number,
    loadNumber: number,
    count: number,
    setOffset: (offset:number) => void
}

const Pagination: React.FC<Props> = ({offset, loadNumber, count, setOffset}) => {

  const { root } = useListStyle();

  const handleNextPage = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (offset + loadNumber <= count) {
      setOffset(loadNumber + offset);
    }
  };
  const handlePrevPage = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (offset - loadNumber >= 0) {
      setOffset(offset - loadNumber);
    }
  };


  return (
    <div className={root}>
      <ButtonGroup color="primary" aria-label="pagination">
        <Button
          onClick={handlePrevPage}
          disabled={offset - loadNumber < 0}
          aria-label="previous"
        >
          Previous Page
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={offset + loadNumber >= count}
          aria-label="next"
        >
          Next Page
        </Button>
      </ButtonGroup>
    </div>
  );
};


export default Pagination;
