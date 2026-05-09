
import { useEffect, useState } from "react";
import API from "./api";

import AddProduct from "./components/AddProduct";
import TakeProduct from "./components/TakeProduct";
import ProductList from "./components/ProductList";
import Logs from "./components/Logs";
import Dashboard from "./components/Dashboard";
import "./App.css";
import SearchPanel from "./components/SearchBar";

import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [logs, setLogs] = useState([]);

  // 🔍 FILTER STATES
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // 📦 FETCH PRODUCTS
  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  // 📜 FETCH LOGS
  const fetchLogs = async () => {
    const res = await API.get("/logs");
    setLogs(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchLogs();
  }, []);

  // 🔍 FILTER LOGS
  const filteredLogs = logs.filter((l) => {
    const s = search.toLowerCase();

    const name = l.takenBy?.toLowerCase() || "";
    const product = l.productName?.toLowerCase() || "";
    const category = l.category?.toLowerCase() || "";

    const logDate = new Date(l.date).toISOString().split("T")[0];

    return (
      (name.includes(s) || product.includes(s) || category.includes(s)) &&
      (categoryFilter ? l.category === categoryFilter : true) &&
      (dateFilter ? logDate === dateFilter : true)
    );
  });

  // 🔍 FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();

    return (
      p.name?.toLowerCase().includes(s) ||
      p.category?.toLowerCase().includes(s)
    );
  });

  return (
    <div className="container">
      <h1>📦 Inventory App</h1>

      {/* 🔍 FILTER CARD */}
      <div className="card" style={{ marginBottom: 20 }}>
        <input
          placeholder="Search product / name / category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option>Shuttering Oil</option>
          <option>Grease</option>
          <option>Putty</option>
          <option>Bending Wire</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button
          onClick={() => {
            setSearch("");
            setCategoryFilter("");
            setDateFilter("");
          }}
        >
          Clear
        </button>
      </div>
{/* 🔍 FILTER CARD */}
<div className="card" style={{ marginBottom: 20 }}>
  <SearchPanel
  search={search}
  setSearch={setSearch}
  categoryFilter={categoryFilter}
  setCategoryFilter={setCategoryFilter}
  dateFilter={dateFilter}
  setDateFilter={setDateFilter}
  products={products}
  logs={logs}
/>
</div>
      {/* 📊 DASHBOARD */}
      <Dashboard products={filteredProducts} logs={filteredLogs} />

      {/* ➕ ACTION CARDS */}
      <div className="flex" style={{ gap: 20, marginTop: 20 }}>
        <div className="card" style={{ flex: 1 }}>
          <AddProduct fetchProducts={fetchProducts} />
        </div>

        <div className="card" style={{ flex: 1 }}>
          <TakeProduct
            products={products}
            fetchProducts={fetchProducts}
            fetchLogs={fetchLogs}
          />
        </div>
      </div>

      {/* 📦 PRODUCTS */}
      <div className="card" style={{ marginTop: 20 }}>
        <ProductList
          products={filteredProducts}
          fetchProducts={fetchProducts}
          search={search}
        />
      </div>

      {/* 📜 LOGS */}
      <div className="card" style={{ marginTop: 20 }}>
        <Logs
          logs={filteredLogs}
          fetchLogs={fetchLogs}
          fetchProducts={fetchProducts}
          search={search}
          categoryFilter={categoryFilter}
          dateFilter={dateFilter}
        />
      </div>
    </div>
  );
}

export default App;