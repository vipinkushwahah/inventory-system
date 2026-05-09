export default function SearchBar({ setSearch }) {
  return (
    <input
      placeholder="Search by name or category..."
      onChange={(e) => setSearch(e.target.value.toLowerCase())}
      style={{ marginBottom: 10, padding: 5 }}
    />
  );
}