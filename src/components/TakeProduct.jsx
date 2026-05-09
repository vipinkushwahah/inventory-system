import { useState } from "react";
import API from "../api";

export default function TakeProduct({ products, fetchProducts, fetchLogs }) {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [name, setName] = useState("");

  const take = async () => {
    if (!productId) return alert("Select product");
    if (!qty) return alert("Enter quantity");
    if (!name) return alert("Enter name");

    try {
      await API.post("/logs/take", {
        productId,
        quantityTaken: Number(qty),
        takenBy: name,
      });

      alert("Saved ✅");

      // CLEAR
      setProductId("");
      setQty("");
      setName("");

      // ✅ WAIT for updates (IMPORTANT)
      await fetchProducts();
      await fetchLogs();

    } catch (err) {
      alert(err.response?.data?.error || "Error");
    }
  };

  return (
    <div>
      <h3>Take Product</h3>

      <select
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      >
        <option value="">Select Product</option>

        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name} ({p.category}) - Available: {p.availableStock}
          </option>
        ))}
      </select>

      <input
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        placeholder="Quantity"
      />

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Taken By"
      />

      <button onClick={take}>Submit</button>
    </div>
  );
}