import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('market_cap_desc');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                setCoins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoins();
    }, [limit]);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={
                    <HomePage
                        coins={coins}
                        filter={filter}
                        setFilter={setFilter}
                        limit={limit}
                        setLimit={setLimit}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        loading={loading}
                        error={error}
                    />}
                />
                <Route path="/about" element={<AboutPage />} />
            </Routes>
        </>
    )
}

export default App
