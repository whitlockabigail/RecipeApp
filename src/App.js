import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { auth, db } from "./firebase";
import { Route, Link } from "react-router-dom";
import { Input } from "./Input";
import { Generate } from "./Generate";
import { Home } from "./Home";
import { MyRecipes } from "./MyRecipes";
import { Recipe } from "./Recipe";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField
} from "@material-ui/core";

export function App(props) {
  const [user, setUser] = useState(null);
  const [drawer_open, setDrawerOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [recipeTitle, setRecipeTitle] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });
    return unsubscribe;
  }, [props.history]);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {})
      .catch(error => {
        window.alert(error.message);
      });
  };

  const handleSaveRecipe = () => {
    db.collection("recipes")
      .add({ title: recipeTitle, uid: user.uid })
      .then(snapshot => {
        setRecipeTitle("");
        setOpen(false);
        props.history.push("/app/input/" + snapshot.id);
      });
  };

  if (!user) return <div />;

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <RestaurantIcon style={{ marginLeft: 25, marginRight: 10 }} />
          <Typography
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, fontFamily: "Marcellus", fontSize: 25 }}
          >
            Recipe App
          </Typography>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi! {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List>
          <ListItem
            button
            to="/app"
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setOpen(true);
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Input Recipe" />
          </ListItem>
          <ListItem
            button
            to="/app/myrecipes"
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="My Recipes" />
          </ListItem>
          <ListItem
            button
            to="/app/generate"
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Generate Recipe" />
          </ListItem>
        </List>
      </Drawer>
      <Route exact path="/app" component={Home} />
      <Route
        path="/app/input/:recipeId"
        render={routeProps => {
          return <Input user={user} {...routeProps} setOpen={setOpen} />;
        }}
      />
      <Route path="/app/generate" component={Generate} />
      <Route
        path="/app/myrecipes"
        render={routeProps => {
          return <MyRecipes uid={user.uid} {...routeProps} />;
        }}
      />
      <Route
        path="/app/recipe/:recipeId"
        render={routeProps => {
          return <Recipe uid={user.uid} {...routeProps} />;
        }}
      />
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Recipe</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={recipeTitle}
            onChange={e => {
              setRecipeTitle(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSaveRecipe}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
