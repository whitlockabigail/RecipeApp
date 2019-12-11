import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { db } from "./firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export function Recipe(props) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    db.collection("recipes")
      .doc(props.match.params.recipeId)
      .get()
      .then(snapshot => {
        console.log(snapshot.data());
        setTitle(snapshot.data().title);
        db.collection("recipes")
          .doc(props.match.params.recipeId)
          .collection("ingredients")
          .get()
          .then(snapshot => {
            const ingredients = snapshot.docs;
            setIngredients(ingredients);
          });
        db.collection("recipes")
          .doc(props.match.params.recipeId)
          .collection("instructions")
          .get()
          .then(snapshot => {
            const instructions = snapshot.docs;
            setInstructions(instructions);
          });
      });
  }, [props.match.params.recipeId]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
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
          <Typography
            style={{
              fontSize: 20,
              fontFamily: "Marcellus",
              marginBottom: 10,
              marginTop: 10,
              textDecoration: "underline"
            }}
          >
            Instruction
          </Typography>
          {instructions.map(value => (
            <Typography style={{ fontSize: 20 }}>
              {value.data().text}
            </Typography>
          ))}
        </Paper>
      </div>
    </div>
  );
}
