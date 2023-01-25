import React, { useRef } from "react";
import styles from "../styles/filter.module.css";

function FilterEvent({ onSearch }) {
  const yearRef = useRef();
  const monthRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedYear = yearRef.current.value;
    const selectedMonth = monthRef.current.value;

    onSearch(selectedYear, selectedMonth);
  };

  return (
    <>
      <h2 className={styles.searchHead}>Serach Events</h2>
      <form onSubmit={handleSubmit} className={styles.filterForm}>
        <div className={styles.formContent}>
          <div className={styles.year}>
            <label htmlFor="year">Year</label>
            <select id="year" ref={yearRef}>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <div className={styles.month}>
            <label htmlFor="month">Month</label>
            <select id="month" ref={monthRef}>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.btn} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default FilterEvent;
