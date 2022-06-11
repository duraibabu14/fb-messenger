import React, { useState, useEffect } from "react";
import "./App.css";
import { FormControl, Input } from "@material-ui/core";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
function App() {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const [user, setuser] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setmessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setuser(prompt("Please Enter Your Name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      user: user,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  return (
    <div className="App">
      <img src="https://www.pngitem.com/pimgs/m/543-5439934_pink-messenger-icon-png-message-us-on-facebook.png" />
      <h1>Welcome to messenger</h1>
      <h2>Welcome {user}</h2>

      <form className="app__form">
        <FormControl className="app__formcontrol">
          <Input
            className="app__input"
            placeholder="Enter Message...."
            value={input}
            onChange={(event) => setinput(event.target.value)}
          />

          <IconButton
            className="app__iconbutton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} user={user} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
