import React, { useState, useEffect } from "react";
import axios from "axios";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";

const CountryPicker = (props) => {
    const{handleCountry} = props
   const [countries, setCountries] = useState([]);

   useEffect(() => {
      axios
         .get("https://covid19.mathdro.id/api/countries")
         .then((response) => {
            // console.log(response.data.countries);
            setCountries(response.data.countries);
         })
         .catch((err) => {
            alert(err.message);
         });
   }, [setCountries]);

   return (
      <div>
         <FormControl className={styles.formcontrol}>
            <NativeSelect defaultValue="" onChange={handleCountry}>
               <option value="">Global</option>
               {countries.map((country, i) => {
                  return (
                     <option value={country.name} key={i}>
                        {country.name}
                     </option>
                  );
               })}
            </NativeSelect>
         </FormControl>
      </div>
   );
};

export default CountryPicker;
