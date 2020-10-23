import Head from "next/head";
import styles from "./index.module.css";
import Nav from "../components/nav/nav";
import Post from "../components/post/post";

import { useState, useEffect } from "react";
import firebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, Input } from "@material-ui/core";
import PostUpload from "../components/post/postUpload/postUpload";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const Home = () => {
  const [posts, setPosts] = useState([]);

  const db = firebase.firestore();
  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) =>
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })))
    );
    console.log(firebase.storage());
  }, []);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const [user, setUser] = useState(null);

  const auth = firebase.auth();

  const onSubmit = async (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => console.log(error.message));
    setOpen(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const [openSignIn, setOpenSignIn] = useState(null);

  const onSubmitSignIn = async (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => console.log(error.message));
    setOpenSignIn(false);
  };

  return (
    <div className={styles.home}>
      <Head>
        <title>Instagram</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Nav />
        {user?.displayName ? (
          <PostUpload username={user.displayName} />
        ) : (
          <h3>Plese login to upload</h3>
        )}

        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <center>
              <img
                className={styles.modalLogo}
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='Instagram Logo'
              />
            </center>
            <form className={styles.form} onSubmit={onSubmit}>
              <Input
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onChange}
              />
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
              />
              <Button type='submit'>Sign Up</Button>
            </form>
          </div>
        </Modal>
        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className={styles.buttonContainer}>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          </div>
        )}

        <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <center>
              <img
                className={styles.modalLogo}
                src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                alt='Instagram Logo'
              />
            </center>
            <form className={styles.form} onSubmit={onSubmitSignIn}>
              <Input
                type='email'
                placeholder='Email'
                name='email'
                value={email}
                onChange={onChange}
              />
              <Input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={onChange}
              />
              <Button type='submit'>Sign In</Button>
            </form>
          </div>
        </Modal>

        {posts.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            imageUrl={post.imageUrl}
            caption={post.caption}
          />
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
