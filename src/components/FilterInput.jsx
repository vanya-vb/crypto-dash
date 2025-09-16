export default function FilterInput({ filter, onFilterChange }) {
    return (
        <div className="filter">
            <input
                type="text"
                placeholder="Filter coins by name or symbol"
                value={filter}
                onChange={(e) => onFilterChange(e.target.value)}
            />
        </div>
    );
};