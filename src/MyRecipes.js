import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { db } from "./firebase";
import { Link } from "react-router-dom";

export function MyRecipes(props) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("recipes")
      .where("uid", "==", props.uid)
      .onSnapshot(snapshot => {
        const recipes = snapshot.docs;
        setRecipes(recipes);
      });

    return unsubscribe;
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 50
      }}
    >
      <Paper style={{ padding: 15 }}>
        <div
          color="primary"
          variant="contained"
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            maxWidth: 500,
            padding: 20,
            fontSize: 20,
            textAlign: "center"
          }}
        >
          <Typography
            style={{ fontSize: 30, fontFamily: "Fredericka the Great" }}
          >
            My Recipes
          </Typography>
        </div>
        <List>
          {recipes.map(value => (
            <ListItem
              style={{ marginLeft: 10, width: "525px" }}
              key={value.id}
              button
              to={"/app/recipe/" + value.id}
              component={Link}
            >
              <ListItemText primary={value.data().title} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}
