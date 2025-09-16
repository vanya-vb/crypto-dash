import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();
                console.log(data);
                setCoins(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoins();
    }, [limit]);

    const override = {
        margin: '200px auto',
    };

    const filteredCoins = coins.filter(coin => {
        return (
            coin.name.toLowerCase().includes(filter.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(filter.toLowerCase())
        )
    });

    return (
        <div>
            <h1>🚀 Crypto Dash</h1>
            {
                loading && <ClipLoader
                    color='grey'
                    loading={loading}
                    cssOverride={override}
                    size={120}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            }

            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter} />
            </div>

            <LimitSelector limit={limit} onLimitChange={setLimit} />

            {!loading && !error && (
                <main className="grid">
                    {
                        filteredCoins.length > 0 ?
                            (
                                filteredCoins.map(coin => (
                                    <CoinCard key={coin.id} coin={coin} />
                                ))
                            )
                            :
                            (<p>No matching coins</p>)
                    }
                </main>
            )}
        </div>
    )
}

export default App
