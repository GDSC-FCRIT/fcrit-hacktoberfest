import React, { useEffect, useState, useCallback } from "react";
import "./App.css";
import axios from "axios";
import { AiOutlineInstagram } from 'react-icons/ai';
import { FiCode } from 'react-icons/fi';
import { RiDiscordLine } from 'react-icons/ri';
import { FaXTwitter } from 'react-icons/fa6';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiOutlineGithub } from 'react-icons/ai';

function App() {
  const [repos, setRepos] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc"); // Default sort order

  const tags = [
    "javascript",
    "css",
    "figma",
    "react",
    "node.js",
    "api",
    "database"
  ];

  const authToken = process.env.REACT_APP_AUTH_TOKEN;

  const itemsPerPage = 50;

  // Function to list repositories with Hacktoberfest tag
  const listHacktoberfestRepos = useCallback(
    async (tags, page) => {
      try {
        //  the query parameters
        const tagQuery =
          tags.length > 0 ? tags.map((tag) => `+${tag}`).join(" OR ") : "";
        const response = await axios.get(
          `https://api.github.com/search/repositories?q=topic:hacktoberfest${tagQuery}+stars:>=1000+language:${tagQuery}&per_page=${itemsPerPage}&page=${page}&sort=stars&order=${sortOrder}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}` // Include your token here
            }
          }
        );

        const newRepos = response.data.items;
        setRepos(newRepos);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    },
    [sortOrder]
  );

  const handleTagClick = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
  };

  const handleNextPage = () => {
    const nextPage = currentPage + 1;

    // Manually update the URL and trigger a re-render
    window.history.pushState({}, "", `/page/${nextPage}`);

    // Set loading state and update the current page
    setLoading(true);
    setCurrentPage(nextPage);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;

      // Manually update the URL and trigger a re-render
      window.history.pushState({}, "", `/page/${prevPage}`);

      // Set loading state and update the current page
      setLoading(true);
      setCurrentPage(prevPage);
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  useEffect(() => {
    listHacktoberfestRepos(selectedTags, currentPage);
  }, [selectedTags, currentPage, listHacktoberfestRepos, sortOrder]);

  const renderTagButton = (tag) => (
    <button
      key={tag}
      className={`tag-button ${selectedTags.includes(tag) ? "selected" : ""}`}
      onClick={() => handleTagClick(tag)}
    >
      {tag}
    </button>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Hacktoberfest Showcase</h1>
        <div className="tag-filter">
          <span>Filter by Tags:</span>
          {tags.map((tag) => renderTagButton(tag))}
        </div>
        <div className="sort-filter">
          <span>Sort by Stars:</span>
          <button
            className={`sort-button ${sortOrder === "asc" ? "selected" : ""}`}
            onClick={() => handleSortChange("asc")}
          >
            Ascending
          </button>
          <button
            className={`sort-button ${sortOrder === "desc" ? "selected" : ""}`}
            onClick={() => handleSortChange("desc")}
          >
            Descending
          </button>
        </div>
      </header>
      <main>
        <section id="repositories">
          <h2>Repositories with Hacktoberfest Tag</h2>
          <div className="row">
            {repos.length > 0 ? (
              repos.map((repo) => (
                <div key={repo.id} className="col-md-3 mb-4">
                  <div className="card">
                    <div key={repo.id} className="col-md-3 mb-4">
                      <div className="">
                        <img
                          src={repo.owner.avatar_url}
                          className="card-img-top"
                          alt="Repository"
                          style={{ width: "30%", height: "auto" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">{repo.name}</h5>
                          <p className="card-text">{repo.description}</p>
                          <p className="card-text">
                            Stars: {repo.stargazers_count}
                          </p>
                          <p className="card-text">
                            Open Issues: {repo.open_issues_count}
                          </p>
                          <a
                            href={repo.html_url}
                            className="btn btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Repository
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No repositories found.</p>
            )}
          </div>
          {/* Pagination controls */}
          <div className="pagination">
            {currentPage > 1 && (
              <button className="btn btn-secondary" onClick={handlePrevPage}>
                Previous
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={loading}
            >
              {loading ? "Loading..." : "Next"}
            </button>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-title">
              <img 
                src="https://user-images.githubusercontent.com/84656423/273397050-243818bb-91eb-42b5-89ca-e5e817e663a8.png"
              />
              <img 
                src="https://user-images.githubusercontent.com/84656423/273397053-fa33c0a2-b10c-4837-b375-1ff836061078.png"
              />
        </div>
        <div className="footer-social">
          <p className="">
            Stay in Touch
          </p>
          <div className="social-links">
            <a href="https://gdsc.community.dev/fr-conceicao-rodrigues-institute-of-technology-navi-mumbai/">
              <FiCode className="icon"/>
            </a>
            <a href="https://www.instagram.com/gdscfcrit/">
              <AiOutlineInstagram className="icon"/>
            </a>
            <a href="https://discord.com/invite/vxmxQNtvD9">
              <RiDiscordLine className="icon"/>
            </a>
            <a href="https://twitter.com/gdscfcrit">
              <FaXTwitter className="icon"/>
            </a>
            <a href="https://www.linkedin.com/company/gdsc-fcrit/">
              <AiOutlineLinkedin className="icon"/>
            </a>
            <a href="https://github.com/GDSC-FCRIT">
              <AiOutlineGithub className="icon"/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
