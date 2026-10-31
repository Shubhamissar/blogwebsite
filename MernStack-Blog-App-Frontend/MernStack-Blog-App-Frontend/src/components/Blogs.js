import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${API}/api/blog`);
      return res.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.blogs) setBlogs(data.blogs);
    });
  }, []);

  return (
    <div>
      {blogs.filter(Boolean).map((blog) => (
        <Blog
          key={blog._id}
          id={blog._id}
          isUser={localStorage.getItem("userId") === blog.user?._id}
          title={blog.title}
          description={blog.description}
          imageURL={blog.image}
          userName={blog.user?.name}
        />
      ))}
    </div>
  );
};

export default Blogs;