import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { auth, db } from "./firebase";

export function Input(props) {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [new_ingredient, setNewIngredient] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [new_instruction, setNewInstruction] = useState("");

  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("recipes")
      .doc(props.match.params.recipeId)
      .collection("ingredients")
      .onSnapshot(snapshot => {
        const updated_ingredients = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          updated_ingredients.push({ text: data.text, id: doc.id });
        });
        setIngredients(updated_ingredients);
      });

    return unsubscribe;
  }, [props.match.params.recipeId]);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("recipes")
      .doc(props.match.params.recipeId)
      .collection("instructions")
      .onSnapshot(snapshot => {
        const updated_instructions = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          updated_instructions.push({ text: data.text, id: doc.id });
        });
        setInstructions(updated_instructions);
      });

    return unsubscribe;
  }, [props.match.params.recipeId]);

  useEffect(() => {
    let unsubscribe;

    unsubscribe = db
      .collection("recipes")
      .doc(props.match.params.recipeId)
      .onSnapshot(snapshot => {
        const data = snapshot.data();
        console.log(data);
        setTitle(data.title);
      });

    return unsubscribe;
  }, [props.match.params.recipeId]);

  const handleAddIngredient = () => {
    db.collection("recipes")
      .doc(props.match.params.recipeId)
      .collection("ingredients")
      .add({ text: new_ingredient })
      .then(() => {
        setNewIngredient("");
      });
  };

  const handleDeleteIngredient = ingredient_id => {
    db.collection("recipes")
      .doc(props.match.params.recipeId)
      .collection("ingredients")
      .doc(ingredient_id)
      .delete();
  };

  const handleAddInstruction = () => {
    db.collection("recipes")
      .doc(props.match.params.recipeId)
      .collection("instructions")
      .add({ text: new_instruction })
      .then(() => {
        setNewInstruction("");
      });
  };

  const handleDeleteInstruction = instruction_id => {
    db.collection("recipes")
      .doc(props.match.params.recipeId)
      .collection("instructions")
      .doc(instruction_id)
      .delete();
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40"
        }}
      >
        <Paper
          style={{
            maxWidth: "500px",
            width: "100%",
            marginTop: 30,
            padding: "30px"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Typography
              style={{ fontSize: 40, fontFamily: "Fredericka the Great" }}
            >
              {title}
            </Typography>
          </div>
          <Typography
            style={{
              marginTop: 15,
              fontSize: 25,
              fontFamily: "Marcellus"
            }}
          >
            {" "}
            Ingredients{" "}
          </Typography>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <TextField
              fullWidth
              placeholder="Add ingredient here"
              style={{ marginRight: "30px" }}
              value={new_ingredient}
              onChange={e => {
                setNewIngredient(e.target.value);
              }}
            />
            <Button variant="contained" onClick={handleAddIngredient}>
              Save
            </Button>
          </div>
          <List>
            {ingredients.map(value => (
              <ListItem key={value.id}>
                <ListItemText primary={value.text} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      handleDeleteIngredient(value.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <Typography
            style={{
              marginTop: 25,
              fontSize: 25,
              fontFamily: "Marcellus"
            }}
          >
            {" "}
            Instructions{" "}
          </Typography>
          <div style={{ display: "flex", marginTop: "10px" }}>
            <TextField
              fullWidth
              placeholder="Add instruction here"
              style={{ marginRight: "30px" }}
              value={new_instruction}
              onChange={e => {
                setNewInstruction(e.target.value);
              }}
            />
            <Button variant="contained" onClick={handleAddInstruction}>
              Save
            </Button>
          </div>
          <List>
            {instructions.map(value => (
              <ListItem key={value.id}>
                <ListItemText primary={value.text} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      handleDeleteInstruction(value.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              style={{ width: 100, marginTop: "40px" }}
              onClick={() => {
                props.setOpen(true);
              }}
            >
              Done
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
}
