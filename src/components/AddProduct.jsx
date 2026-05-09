import { useState } from "react";
import API from "../api";

const categories = [
  "Shuttering Oil",
  "Grease",
  "Putty",
  "Bending Wire",
  "Other",
];

export default function AddProduct({
  fetchProducts,
}) {
  const [name, setName] = useState("");
  const [total, setTotal] =
    useState("");
  const [category, setCategory] =
    useState("");

  const add = async () => {
    if (!name || !total || !category) {
      return alert("Fill all fields");
    }

    try {
      const res = await API.post(
        "/products",
        {
          name,
          totalAdded: Number(total),
          category,
        }
      );

      alert(res.data.message);

      setName("");
      setTotal("");
      setCategory("");

      fetchProducts();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <div>
      <h3
        style={{
          marginBottom: 15,
        }}
      >
        ➕ Add Product
      </h3>

      <input
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Product Name"
      />

      <input
        value={total}
        onChange={(e) =>
          setTotal(e.target.value)
        }
        placeholder="Stock Quantity"
        type="number"
      />

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          Select Category
        </option>

        {categories.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button onClick={add}>
        Add / Update Product
      </button>
    </div>
  );
}