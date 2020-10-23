import React, { useState } from "react";
import firebase from "../../../firebase";
import { Input, Button } from "@material-ui/core";

const PostUpload = ({ username }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const changHandler = (e) => {
    // console.log(e.target);
    // return;
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const storage = firebase.storage();
  const db = firebase.firestore();
  const uploadHandler = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              //timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: username,
            });
          });

        setProgress(0);
        setImage(null);
        setCaption("");
      }
    );
  };

  return (
    <div>
      <progress value={progress} max='100' />
      <Input
        type='text'
        placeholder='Enter a caption...'
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <Input type='file' onChange={changHandler} />
      <Button onClick={uploadHandler}>Upload</Button>
    </div>
  );
};

export default PostUpload;
