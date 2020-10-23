import React from "react";
import styles from "./post.module.css";
import Avatar from "@material-ui/core/Avatar";
const Post = ({
  username,
  imageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/220px-React-icon.svg.png",
  caption,
}) => {
  return (
    <div className={styles.post}>
      <div className={styles.postHeader}>
        <Avatar
          className={styles.postAvatar}
          alt={username}
          src='/static/images/avatar/1.jpg'
        />
        <h3>{username}</h3>
      </div>
      <img className={styles.postImage} src={imageUrl} alt='Post Image' />
      <h4 className={styles.postText}>
        <strong>{username}</strong> {caption}
      </h4>
    </div>
  );
};

export default Post;
