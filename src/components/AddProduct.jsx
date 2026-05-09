// // import { useState } from "react";
// // import API from "../api";

// // export default function AddProduct({ fetchProducts }) {
// //   const [name, setName] = useState("");
// //   const [total, setTotal] = useState("");

// //   const add = async () => {
// //     if (!name || !total) return alert("Fill all fields");

// //     await API.post("/products", {
// //       name,
// //       totalAdded: Number(total),
// //     });

// //     setName("");
// //     setTotal("");
// //     fetchProducts();
// //   };

// //   return (
// //     <div>
// //       <h3>Add Product</h3>

// //       <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
// //       <input value={total} onChange={e => setTotal(e.target.value)} placeholder="Stock" />

// //       <button onClick={add}>Add</button>
// //     </div>
// //   );
// // }

import { useState } from "react";
import API from "../api";

const categories = [
  "Shuttering Oil",
  "Grease",
  "Putty",
  "Bending Wire",
  "Other",
];

export default function AddProduct({ fetchProducts }) {
  const [name, setName] = useState("");
  const [total, setTotal] = useState("");
  const [category, setCategory] = useState("");

  const add = async () => {
    if (!name || !total || !category) {
      return alert("Fill all fields");
    }

    await API.post("/products", {
      name,
      totalAdded: Number(total),
      category,
    });

    setName("");
    setTotal("");
    setCategory("");

    fetchProducts();
  };

  return (
    <div>
      <h3>Add Product</h3>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />

      <input value={total} onChange={e => setTotal(e.target.value)} placeholder="Stock" />

      <select value={category} onChange={e => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        {categories.map(c => (
          <option key={c}>{c}</option>
        ))}
      </select>

      <button onClick={add}>Add</button>
    </div>
  );
}

// import { useState } from "react";
// import API from "../api";

// const categories = [
//   "Shuttering Oil",
//   "Grease",
//   "Putty",
//   "Bending Wire",
//   "Other",
// ];

// export default function AddProduct({ fetchProducts }) {
//   const [name, setName] = useState("");
//   const [total, setTotal] = useState("");
//   const [category, setCategory] = useState("");

//   const add = async () => {
//     if (!name || !total || !category) {
//       return alert("Fill all fields");
//     }

//     await API.post("/products", {
//       name,
//       totalAdded: Number(total),
//       category,
//     });

//     setName("");
//     setTotal("");
//     setCategory("");

//     fetchProducts();
//   };

//   return (
//     <div>
//       <h3>Add Product</h3>

//       <input
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//       />

//       <input
//         value={total}
//         onChange={(e) => setTotal(e.target.value)}
//         placeholder="Stock"
//       />

//       {/* ✅ FIX HERE */}
//       <select
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       >
//         <option value="">Select Category</option>
//         {categories.map((c) => (
//           <option key={c} value={c}>
//             {c}
//           </option>
//         ))}
//       </select>

//       <button onClick={add}>Add</button>
//     </div>
//   );
// }