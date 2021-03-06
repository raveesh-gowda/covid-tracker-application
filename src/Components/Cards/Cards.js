import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames"

import styles from "./Cards.module.css";

const Cards = (props) => {
   const { data } = props;

   return (
      <div className={styles.container}>
         <Grid container spacing={3} justifyContent="center">
            <Grid
               item
               component={Card}
               xs={12}
               md={3}
               className={cx(styles.card, styles.infected)}
            >
               <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                     Infected
                  </Typography>
                  <Typography variant="h5">
                     <CountUp
                        start={0}
                        end={data.cases}
                        duration={2.5}
                        separator=","
                     />
                  </Typography>
                  <Typography color="textSecondary">
                     {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                     Number of active cases of COVID - 19
                  </Typography>
               </CardContent>
            </Grid>
            <Grid
               item
               component={Card}
               xs={12}
               md={3}
               className={cx(styles.card, styles.recovered)}
            >
               <CardContent>
                  <Typography color="textSecondary">Recovered</Typography>
                  <Typography variant="h5">
                     <CountUp
                        start={0}
                        end={data.recovered}
                        duration={2.5}
                        separator=","
                     />
                  </Typography>
                  <Typography color="textSecondary">
                     {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                     Number of recovered cases of COVID - 19
                  </Typography>
               </CardContent>
            </Grid>
            <Grid
               item
               component={Card}
               xs={12}
               md={3}
               className={cx(styles.card, styles.deaths)}
            >
               <CardContent>
                  <Typography color="textSecondary">Deaths</Typography>
                  <Typography variant="h5">
                     <CountUp
                        start={0}
                        end={data.deaths}
                        duration={2.5}
                        separator=","
                     />
                  </Typography>
                  <Typography color="textSecondary">
                     {new Date().toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">
                     Number of deaths due to COVID - 19
                  </Typography>
               </CardContent>
            </Grid>
         </Grid>
      </div>
   );
};

export default Cards;
