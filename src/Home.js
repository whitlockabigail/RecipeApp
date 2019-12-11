import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import RestaurantIcon from "@material-ui/icons/Restaurant";

export function Home(props) {
  return (
    <div
      style={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div style={{ marginTop: 50, marginLeft: 60 }}>
        <img
          style={{ height: "600px" }}
          src="https://i1.wp.com/letsgetcookingnow.com/wp-content/uploads/2018/02/Baking-Conversion-copy.jpg"
        />
      </div>
      <div style={{ marginTop: 50 }}>
        <img
          style={{ height: "550px" }}
          src="https://www.culinaryschools.org/images/cookingconversionchart.png"
        />
      </div>
    </div>
  );
}
