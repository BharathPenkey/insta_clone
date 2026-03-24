import React, { useEffect, useState } from "react";
import "./post.css";
import insta_logo_img from "./insta_logo.png";
import camera_icon from "./camera_icon.png";
import share from "./share_logo.png";
import likeIconActive from "./heart.png";
import likeIconUnActive from "./heartLine.png";
import { Link, useNavigate } from "react-router-dom";

function Post() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch posts
  useEffect(() => {
    // fetch("https://insta-clone-ld6n.onrender.com/posts")
    fetch("https://insta-clone-b2.onrender.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // ensure likes is number
        const formatted = data.map((post) => ({
          ...post,
          likes: Number(post.likes)
        }));
        setData(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

 
  const handleLikeCount = async (id) => {
    try {
      //  Optimistic UI update
      const updatedData = data.map((post) =>
        post._id === id
          ? { ...post, likes: post.likes + 1 }
          : post
      );

      setData(updatedData);

      // ✅ API call
      await fetch(
        // `https://insta-clone-ld6n.onrender.com/posts/${id}/like`,
        `https://insta-clone-b2.onrender.com/post/${id}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          }
       
        }
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  //  Reverse posts (latest first)
  const all_posts = [...data].reverse();

  return (
    <>
      {/* Header */}
      <div className="main-header">
        <Link to="/">
          <img src={insta_logo_img} alt="logo" className="insta_logo" />
        </Link>

        <span className="tag">Instaclone</span>

        <div id="addPost" onClick={() => navigate("/form")}>
          ADD
        </div>

        <Link to="/form">
          <img src={camera_icon} alt="icon" className="cam_logo" />
        </Link>
      </div>

      {/* Posts */}
      <div className="all_posts">
        {all_posts.map((udata) => (
          <section className="post" key={udata._id}>
            
            {/* Post Header */}
            <section className="post_header">
              <div className="first_line">
                <strong>{udata.name}</strong>
                <span className="dots">
                  <strong>...</strong>
                </span>
              </div>
              <div className="second_line">
                <p>{udata.location}</p>
              </div>
            </section>

            {/* Post Image */}
            <section className="post_img">
              <img
                src={udata.PostImage}
                alt={udata.name}
                style={{ width: "100%", height: "80vh" }}
              />
            </section>

            {/* Footer */}
            <section className="footer">
              {/*  Like Button */}
              <img
                className="like_icon"
                onClick={() => handleLikeCount(udata._id)}
                src={
                  udata.likes > 0
                    ? likeIconActive
                    : likeIconUnActive
                }
                alt="like"
                style={{
                  width: "50px",
                  height: "30px",
                  padding: "5px",
                  cursor: "pointer"
                }}
              />

              {/* Share */}
              <img
                className="share_icon"
                src={share}
                alt="share"
                style={{ width: "50px", height: "30px", padding: "5px" }}
              />

              {/* Date */}
              <span className="date">{udata.date}</span>

              {/* Likes */}
              <div className="likes">
                <p>{udata.likes} likes</p>
              </div>

              {/* Description */}
              <div className="desc">
                <strong>{udata.description}</strong>
              </div>
            </section>
          </section>
        ))}
      </div>
    </>
  );
}

export default Post;
