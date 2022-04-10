import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./App.module.css";
import Cards from "./Components/Cards/Cards";
import Charts from "./Components/Chart/Chart";
import CountryPicker from "./Components/CountryPicker/CountryPicker";

const App = (props) => {
   const [data, setData] = useState([]);
   const [country, setCountry] = useState("");

   useEffect(() => {
      if (country.length > 0) {
         axios
            .get(`https://disease.sh/v3/covid-19/countries/${country}`)
            .then((response) => {
                  console.log(response.data);
               setData(response.data);
            })
            .catch((err) => {
               alert(err.message);
            });
      } else {
         axios
            .get("https://disease.sh/v3/covid-19/all")
            .then((response) => {
               // console.log(response.data);
               setData(response.data);
            })
            .catch((err) => {
               alert(err.message);
            });
      }
   }, [country]);

   const handleCountry = (e) => {
      setCountry(e.target.value);
   };

   return (
      <div className={styles.container}>
         <img
            className={styles.image}
            src="https://www.skuld.com/contentassets/c0d30d7bf2c64c67b5c0a29dbccf1ebe/covid-19_coronavirus_design_logo-shutterstock_1663374028.jpg"
            alt="coronalogo"
         />
         <Cards data={data} />
         <CountryPicker handleCountry={handleCountry} />
         <Charts data={data} country={country} />
      </div>
   );
};

export default App;
