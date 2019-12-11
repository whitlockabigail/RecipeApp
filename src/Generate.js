import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { db } from "./firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export function Generate(props) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const handleGenerate = () => {
    db.collection("recipes")
      .get()
      .then(snapshot => {
        const recipes = snapshot.docs;
        const recipe = recipes[Math.floor(Math.random() * recipes.length)];
        setTitle(recipe.data().title);
        db.collection("recipes")
          .doc(recipe.id)
          .collection("ingredients")
          .get()
          .then(snapshot => {
            const ingredients = snapshot.docs;
            setIngredients(ingredients);
          });
        db.collection("recipes")
          .doc(recipe.id)
          .collection("instructions")
          .get()
          .then(snapshot => {
            const instructions = snapshot.docs;
            setInstructions(instructions);
          });
      });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          onClick={handleGenerate}
          style={{
            maxWidth: "350px",
            width: "100%",
            marginTop: 30,
            padding: "25px",
            fontSize: 20
          }}
        >
          <Typography style={{ fontSize: 25, fontFamily: "Marcellus" }}>
            Generate Recipe
          </Typography>
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {ingredients.length > 0 && (
          <Paper
            style={{
              maxWidth: "500px",
              width: "100%",
              padding: "30px",
              marginTop: 50
            }}
          >
            <Typography
              style={{
                marginBottom: 12,
                fontSize: 30,
                fontFamily: "Fredericka the Great"
              }}
            >
              {title}
            </Typography>
            {ingredients.length > 0 && (
              <Typography
                style={{
                  fontSize: 20,
                  fontFamily: "Marcellus",
                  marginBottom: 10,
                  marginTop: 10,
                  textDecoration: "underline"
                }}
              >
                Ingredients
              </Typography>
            )}
            {ingredients.map(value => (
              <Typography style={{ fontSize: 20 }}>
                {value.data().text}
              </Typography>
            ))}
            {instructions.length > 0 && (
              <Typography
                style={{
                  fontSize: 20,
                  fontFamily: "Marcellus",
                  marginBottom: 10,
                  marginTop: 10,
                  textDecoration: "underline"
                }}
              >
                Instructions
              </Typography>
            )}
            {instructions.map(value => (
              <Typography style={{ fontSize: 20 }}>
                {value.data().text}
              </Typography>
            ))}
          </Paper>
        )}
      </div>
    </div>
  );
}
