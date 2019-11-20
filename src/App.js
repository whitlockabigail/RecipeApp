import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteIcon from "@material-ui/icons/Delete";
import { auth, db } from "./firebase";

export function App(props) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [new_task, setNewTask] = useState("");

  console.log(tasks);

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

  useEffect(() => {
    let unsubscribe;
    if (user) {
      unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("tasks")
        .onSnapshot(snapshot => {
          const user_tasks = snapshot.docs.map(qs => {
            const task = {
              id: qs.id,
              text: qs.data().text,
              checked: qs.data().checked
            };
            return task;
          });
          setTasks(user_tasks);
        });
    }
    return unsubscribe;
  }, [user]);

  const handleAddTask = () => {
    console.log("add task");
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .add({ text: new_task, checked: false })
      .then(() => {});

    setNewTask("");
  };

  const handleDeleteTask = task_id => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(task_id)
      .delete();
  };

  const handleCheckTask = (checked, task_id) => {
    db.collection("users")
      .doc(user.uid)
      .collection("tasks")
      .doc(task_id)
      .update({ checked: checked });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {})
      .catch(error => {
        window.alert(error.message);
      });
  };

  if (!user) return <div />;

  return (
    <div>
      <AppBar color="secondary" position="static" style={{ width: "100%" }}>
        <Toolbar>
          <Typography
            color="inherit"
            variant="h6"
            style={{ marginLeft: 15, flexGrow: 1 }}
          >
            To Do List
          </Typography>
          <Typography color="inherit" style={{ marginRight: 30 }}>
            Hi {user.email}
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30"
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
          <Typography color="secondary" variant={"h6"}>
            {" "}
            To Do List{" "}
          </Typography>
          <div style={{ display: "flex", marginTop: "40px" }}>
            <TextField
              fullWidth
              onKeyPress={e => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
              placeholder="Add a task here"
              style={{ marginRight: "30px" }}
              value={new_task}
              onChange={e => {
                setNewTask(e.target.value);
              }}
            />
            <Button
              color="secondary"
              variant="contained"
              onClick={handleAddTask}
            >
              Add
            </Button>
          </div>
          <List>
            {tasks.map(value => (
              <ListItem key={value.id}>
                <ListItemIcon>
                  <Checkbox
                    checked={value.checked}
                    onChange={(e, checked) => {
                      handleCheckTask(checked, value.id);
                    }}
                  />
                </ListItemIcon>
                <ListItemText primary={value.text} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => {
                      handleDeleteTask(value.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    </div>
  );
}
