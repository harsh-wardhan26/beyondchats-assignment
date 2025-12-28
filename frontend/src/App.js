import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>BeyondChats Articles</h1>

      {articles.length === 0 ? (
        <p>No articles found</p>
      ) : (
        articles.map((article) => (
          <div
            key={article._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
            }}
          >
            <h3>{article.title}</h3>
            <p>{article.content.substring(0, 200)}...</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
