import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

const API_KEY = "JI0YDmnIbX-CeE54KK3oDxC8vyz39c2SGvSI8u78sys";
const API_URL = "https://api.unsplash.com/search/photos";

function App() {
    const [query, setQuery] = useState("");
    const [inputText, setInputText] = useState("");
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get(API_URL, {
                params: {
                    client_id: API_KEY,
                    query: query,
                    page: page,
                },
            })
            .then((res) => {
                setResults((prevResults) =>
                    page === 1
                        ? res.data.results
                        : [...prevResults, ...res.data.results]
                );
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [query, page]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        setQuery(inputText);
    };

    return (
        <div className="App">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Search for photos"
                />
                <button type="submit">Search</button>
            </form>

            {loading && page === 1 && <LoadingSpinner />}

            <div className="image-grid">
                {results.map((photo) => (
                    <img
                        key={photo.id}
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                    />
                ))}
            </div>

            {!loading && page < 10 && results.length > 0 && (
                <button onClick={() => setPage(page + 1)} className="load-more">
                    Load more
                </button>
            )}

            {loading && page > 1 && <LoadingSpinner />}
        </div>
    );
}

export default App;
