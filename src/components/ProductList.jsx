// export default function ProductList({ products }) {
//     return (
//       <div>
//         <h3>Products</h3>
  
//         {products.map(p => (
//           <div key={p._id}>
//             {p.name} | Total: {p.totalAdded} | Available: {p.availableStock}
//           </div>
//         ))}
//       </div>
//     );
//   }
// export default function ProductList({ products }) {
//   const grouped = {};

//   products.forEach(p => {
//     if (!grouped[p.category]) grouped[p.category] = [];
//     grouped[p.category].push(p);
//   });

//   return (
//     <div>
//       <h3>Products</h3>

//       {Object.keys(grouped).map(cat => (
//         <div key={cat}>
//           <h4>📦 {cat}</h4>

//           {grouped[cat].map(p => (
//             <div key={p._id}>
//               {p.name} | Total: {p.totalAdded} | Available: {p.availableStock}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
// import { useState } from "react";
// import API from "../api";

// export default function ProductList({ products, fetchProducts, search }) {
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({
//     name: "",
//     totalAdded: "",
//     category: "",
//   });

//   // 🔍 FILTER
//   const filtered = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search) ||
//       p.category.toLowerCase().includes(search)
//   );

//   // 📂 GROUP BY CATEGORY
//   const grouped = {};
//   filtered.forEach((p) => {
//     if (!grouped[p.category]) grouped[p.category] = [];
//     grouped[p.category].push(p);
//   });

//   // ✏️ START EDIT
//   const startEdit = (p) => {
//     setEditId(p._id);
//     setEditData({
//       name: p.name,
//       totalAdded: p.totalAdded,
//       category: p.category,
//     });
//   };

//   // 💾 SAVE EDIT
//   const saveEdit = async () => {
//     await API.put(`/products/${editId}`, editData);
//     setEditId(null);
//     fetchProducts();
//   };

//   // ❌ DELETE
//   const deleteProduct = async (id) => {
//     if (!confirm("Delete this product?")) return;

//     await API.delete(`/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h3>Products</h3>

//       {Object.keys(grouped).map((cat) => (
//         <div key={cat}>
//           <h4>📦 {cat}</h4>

//           {grouped[cat].map((p) => (
//             <div key={p._id} style={{ marginBottom: 5 }}>
              
//               {editId === p._id ? (
//                 <>
//                   <input
//                     value={editData.name}
//                     onChange={(e) =>
//                       setEditData({ ...editData, name: e.target.value })
//                     }
//                   />

//                   <input
//                     value={editData.totalAdded}
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         totalAdded: e.target.value,
//                       })
//                     }
//                   />

//                   <input
//                     value={editData.category}
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         category: e.target.value,
//                       })
//                     }
//                   />

//                   <button onClick={saveEdit}>Save</button>
//                 </>
//               ) : (
//                 <>
//                   {p.name} | Total: {p.totalAdded} | Available:{" "}
//                   {p.availableStock}
//                 </>
//               )}

//               <button onClick={() => startEdit(p)}>Edit</button>
//               <button onClick={() => deleteProduct(p._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useState } from "react";
// import API from "../api";

// export default function ProductList({ products, fetchProducts, search = "" }) {
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({
//     name: "",
//     totalAdded: "",
//     category: "",
//   });

//   // ✅ SAFE FILTER
//   const filtered = products.filter((p) => {
//     const name = p.name?.toLowerCase() || "";
//     const category = p.category?.toLowerCase() || "";

//     return (
//       name.includes(search || "") ||
//       category.includes(search || "")
//     );
//   });

//   // GROUP
//   const grouped = {};
//   filtered.forEach((p) => {
//     const cat = p.category || "Other";

//     if (!grouped[cat]) grouped[cat] = [];
//     grouped[cat].push(p);
//   });

//   const startEdit = (p) => {
//     setEditId(p._id);
//     setEditData({
//       name: p.name || "",
//       totalAdded: p.totalAdded || "",
//       category: p.category || "",
//     });
//   };

//   const saveEdit = async () => {
//     await API.put(`/products/${editId}`, editData);
//     setEditId(null);
//     fetchProducts();
//   };

//   const deleteProduct = async (id) => {
//     if (!window.confirm("Delete this product?")) return;

//     await API.delete(`/products/${id}`);
//     fetchProducts();
//   };

//   return (
//     <div>
//       <h3>Products</h3>

//       {Object.keys(grouped).length === 0 && <p>No products found</p>}

//       {Object.keys(grouped).map((cat) => (
//         <div key={cat}>
//           <h4>📦 {cat}</h4>

//           {grouped[cat].map((p) => (
//             <div key={p._id} style={{ marginBottom: 5 }}>
//               {editId === p._id ? (
//                 <>
//                   <input
//                     value={editData.name}
//                     onChange={(e) =>
//                       setEditData({ ...editData, name: e.target.value })
//                     }
//                   />

//                   <input
//                     value={editData.totalAdded}
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         totalAdded: e.target.value,
//                       })
//                     }
//                   />

//                   <input
//                     value={editData.category}
//                     onChange={(e) =>
//                       setEditData({
//                         ...editData,
//                         category: e.target.value,
//                       })
//                     }
//                   />

//                   <button onClick={saveEdit}>Save</button>
//                 </>
//               ) : (
//                 <>
//                   {p.name} | Total: {p.totalAdded} | Available:{" "}
//                   {p.availableStock}
//                 </>
//               )}

//               <button onClick={() => startEdit(p)}>Edit</button>
//               <button onClick={() => deleteProduct(p._id)}>Delete</button>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import API from "../api";

export default function ProductList({ products, fetchProducts, search = "" }) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    totalAdded: "",
    category: "",
  });

  // 🔍 FILTER (SAFE)
  const filtered = products.filter((p) => {
    const name = p.name?.toLowerCase() || "";
    const category = p.category?.toLowerCase() || "";

    return (
      name.includes(search.toLowerCase()) ||
      category.includes(search.toLowerCase())
    );
  });

  // 📂 GROUP BY CATEGORY
  const grouped = {};
  filtered.forEach((p) => {
    const cat = p.category || "Other";

    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  });

  // ✏️ EDIT
  const startEdit = (p) => {
    setEditId(p._id);
    setEditData({
      name: p.name || "",
      totalAdded: p.totalAdded || "",
      category: p.category || "",
    });
  };

  const saveEdit = async () => {
    try {
      await API.put(`/products/${editId}`, editData);
      setEditId(null);
      fetchProducts();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Update failed");
    }
  };

  // ❌ DELETE
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await API.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>📦 Products</h3>

      {Object.keys(grouped).length === 0 && <p>No products found</p>}

      {Object.keys(grouped).map((cat) => (
        <div key={cat} style={{ marginBottom: 30 }}>
          <h4 style={{ marginBottom: 10 }}>📂 {cat}</h4>

          {/* FLEX GRID */}
          <div className="flex" style={{ flexWrap: "wrap", gap: 15 }}>
            {grouped[cat].map((p) => (
              <div
                className="card"
                key={p._id}
                style={{
                  width: "260px",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "#1e293b",
                  color: "#fff",
                }}
              >
                {editId === p._id ? (
                  <>
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      placeholder="Name"
                    />

                    <input
                      value={editData.totalAdded}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          totalAdded: e.target.value,
                        })
                      }
                      placeholder="Stock"
                    />

                    <input
                      value={editData.category}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category: e.target.value,
                        })
                      }
                      placeholder="Category"
                    />

                    <button onClick={saveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    <h4>{p.name}</h4>

                    <p>Total: {p.totalAdded}</p>

                    <p>
                      Stock:{" "}
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "8px",
                          background:
                            p.availableStock < 20
                              ? "#dc2626"
                              : p.availableStock < 50
                              ? "#f59e0b"
                              : "#22c55e",
                        }}
                      >
                        {p.availableStock}
                      </span>
                    </p>
                  </>
                )}

                <div style={{ marginTop: 10 }}>
                  <button onClick={() => startEdit(p)}>Edit</button>
                  <button onClick={() => deleteProduct(p._id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}