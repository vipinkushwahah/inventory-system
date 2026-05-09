// // import { useState } from "react";
// // import API from "../api";

// // export default function Logs({ logs, fetchLogs, fetchProducts, search = "" }) {
// //   const [editId, setEditId] = useState(null);
// //   const [editData, setEditData] = useState({
// //     quantityTaken: "",
// //     takenBy: "",
// //   });

// //   // ✅ FILTER LOGS (SEARCH BY NAME + PRODUCT + CATEGORY)
// //   const filtered = logs.filter((l) => {
// //     const name = l.takenBy?.toLowerCase() || "";
// //     const product = l.productName?.toLowerCase() || "";
// //     const category = l.category?.toLowerCase() || "";

// //     const s = search.toLowerCase();

// //     return (
// //       name.includes(s) ||
// //       product.includes(s) ||
// //       category.includes(s)
// //     );
// //   });

// //   // ✅ GROUP AFTER FILTER
// //   const grouped = {};
// //   filtered.forEach((l) => {
// //     const cat = l.category || "Other";

// //     if (!grouped[cat]) grouped[cat] = [];
// //     grouped[cat].push(l);
// //   });

// //   const startEdit = (l) => {
// //     setEditId(l._id);
// //     setEditData({
// //       quantityTaken: l.quantityTaken,
// //       takenBy: l.takenBy,
// //     });
// //   };

// //   const saveEdit = async () => {
// //     await API.put(`/logs/${editId}`, editData);
// //     setEditId(null);

// //     await fetchLogs();
// //     await fetchProducts(); // ✅ update stock
// //   };

// //   const deleteLog = async (id) => {
// //     if (!window.confirm("Delete this record?")) return;

// //     await API.delete(`/logs/${id}`);

// //     await fetchLogs();
// //     await fetchProducts(); // ✅ update stock
// //   };

// //   return (
// //     <div>
// //       <h3>Usage History</h3>

// //       {Object.keys(grouped).length === 0 && <p>No records found</p>}

// //       {Object.keys(grouped).map((cat) => (
// //         <div key={cat}>
// //           <h4>📂 {cat}</h4>

// //           <table border="1">
// //             <thead>
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Product</th>
// //                 <th>Qty</th>
// //                 <th>Date</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>

// //             <tbody>
// //               {grouped[cat].map((l) => (
// //                 <tr key={l._id}>
// //                   {editId === l._id ? (
// //                     <>
// //                       <td>
// //                         <input
// //                           value={editData.takenBy}
// //                           onChange={(e) =>
// //                             setEditData({
// //                               ...editData,
// //                               takenBy: e.target.value,
// //                             })
// //                           }
// //                         />
// //                       </td>

// //                       <td>{l.productName}</td>

// //                       <td>
// //                         <input
// //                           value={editData.quantityTaken}
// //                           onChange={(e) =>
// //                             setEditData({
// //                               ...editData,
// //                               quantityTaken: e.target.value,
// //                             })
// //                           }
// //                         />
// //                       </td>

// //                       <td>{new Date(l.date).toLocaleString()}</td>

// //                       <td>
// //                         <button onClick={saveEdit}>Save</button>
// //                       </td>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <td>{l.takenBy}</td>
// //                       <td>{l.productName}</td>
// //                       <td>{l.quantityTaken}</td>
// //                       <td>{new Date(l.date).toLocaleString()}</td>
// //                       <td>
// //                         <button onClick={() => startEdit(l)}>Edit</button>
// //                         <button onClick={() => deleteLog(l._id)}>
// //                           Delete
// //                         </button>
// //                       </td>
// //                     </>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       ))}
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import API from "../api";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function Logs({
//   logs,
//   fetchLogs,
//   fetchProducts,
//   search = "",
//   categoryFilter = "",
//   dateFilter = "",
// }) {
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({});

//   // 🔍 FILTER
//   const filtered = logs.filter((l) => {
//     const name = l.takenBy?.toLowerCase() || "";
//     const product = l.productName?.toLowerCase() || "";
//     const category = l.category?.toLowerCase() || "";

//     const logDate = new Date(l.date).toISOString().split("T")[0];
//     const s = search.toLowerCase();

//     return (
//       (name.includes(s) || product.includes(s) || category.includes(s)) &&
//       (categoryFilter ? l.category === categoryFilter : true) &&
//       (dateFilter ? logDate === dateFilter : true)
//     );
//   });

//   // 📂 GROUP
//   const grouped = {};
//   filtered.forEach((l) => {
//     const cat = l.category || "Other";
//     if (!grouped[cat]) grouped[cat] = [];
//     grouped[cat].push(l);
//   });

//   // 📊 EXPORT EXCEL
//   const exportExcel = () => {
//     const data = filtered.map((l) => ({
//       Name: l.takenBy,
//       Product: l.productName,
//       Category: l.category,
//       Quantity: l.quantityTaken,
//       Date: new Date(l.date).toLocaleString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Report");

//     const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     saveAs(new Blob([file]), "inventory.xlsx");
//   };

//   // 📄 EXPORT PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();

//     const rows = filtered.map((l) => [
//       l.takenBy,
//       l.productName,
//       l.category,
//       l.quantityTaken,
//       new Date(l.date).toLocaleString(),
//     ]);

//     autoTable(doc, {
//       head: [["Name", "Product", "Category", "Qty", "Date"]],
//       body: rows,
//     });

//     doc.save("inventory.pdf");
//   };

//   return (
//     <div>
//       <h3>Usage History</h3>

//       <button onClick={exportExcel}>Export Excel</button>
//       <button onClick={exportPDF}>Export PDF</button>

//       {Object.keys(grouped).map((cat) => (
//         <div key={cat}>
//           <h4>{cat}</h4>

//           {grouped[cat].map((l) => (
//             <div key={l._id}>
//               {l.takenBy} took {l.quantityTaken} of {l.productName}
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useState } from "react";
// import API from "../api";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// export default function Logs({
//   logs,
//   fetchLogs,
//   fetchProducts,
//   search = "",
//   categoryFilter = "",
//   dateFilter = "",
// }) {
//   const [editId, setEditId] = useState(null);
//   const [editData, setEditData] = useState({
//     quantityTaken: "",
//     takenBy: "",
//   });

//   // 🔍 FILTER (SEARCH + CATEGORY + DATE)
//   const filtered = logs.filter((l) => {
//     const name = l.takenBy?.toLowerCase() || "";
//     const product = l.productName?.toLowerCase() || "";
//     const category = l.category?.toLowerCase() || "";

//     const logDate = new Date(l.date).toISOString().split("T")[0];
//     const s = search.toLowerCase();

//     return (
//       (name.includes(s) || product.includes(s) || category.includes(s)) &&
//       (categoryFilter ? l.category === categoryFilter : true) &&
//       (dateFilter ? logDate === dateFilter : true)
//     );
//   });

//   // 📂 GROUP BY CATEGORY
//   const grouped = {};
//   filtered.forEach((l) => {
//     const cat = l.category || "Other";
//     if (!grouped[cat]) grouped[cat] = [];
//     grouped[cat].push(l);
//   });

//   // ✏️ START EDIT
//   const startEdit = (l) => {
//     setEditId(l._id);
//     setEditData({
//       quantityTaken: l.quantityTaken,
//       takenBy: l.takenBy,
//     });
//   };

//   // 💾 SAVE EDIT
//   const saveEdit = async () => {
//     await API.put(`/logs/${editId}`, editData);

//     setEditId(null);

//     await fetchLogs();
//     await fetchProducts(); // 🔥 updates stock automatically
//   };

//   // ❌ DELETE
//   const deleteLog = async (id) => {
//     if (!window.confirm("Delete this record?")) return;

//     await API.delete(`/logs/${id}`);

//     await fetchLogs();
//     await fetchProducts(); // 🔥 updates stock
//   };

//   // 📊 EXPORT EXCEL
//   const exportExcel = () => {
//     const data = filtered.map((l) => ({
//       Name: l.takenBy,
//       Product: l.productName,
//       Category: l.category,
//       Quantity: l.quantityTaken,
//       Date: new Date(l.date).toLocaleString(),
//     }));

//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Report");

//     const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     saveAs(new Blob([file]), "inventory.xlsx");
//   };

//   // 📄 EXPORT PDF
//   const exportPDF = () => {
//     const doc = new jsPDF();

//     const rows = filtered.map((l) => [
//       l.takenBy,
//       l.productName,
//       l.category,
//       l.quantityTaken,
//       new Date(l.date).toLocaleString(),
//     ]);

//     autoTable(doc, {
//       head: [["Name", "Product", "Category", "Qty", "Date"]],
//       body: rows,
//     });

//     doc.save("inventory.pdf");
//   };

//   return (
//     <div>
//       <h3>Usage History</h3>

//       {/* EXPORT BUTTONS */}
//       <button onClick={exportExcel}>Export Excel</button>
//       <button onClick={exportPDF}>Export PDF</button>

//       {Object.keys(grouped).length === 0 && <p>No records found</p>}

//       {Object.keys(grouped).map((cat) => (
//         <div key={cat}>
//           <h4>📂 {cat}</h4>

//           <table border="1" cellPadding="5">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Product</th>
//                 <th>Qty</th>
//                 <th>Date</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {grouped[cat].map((l) => (
//                 <tr key={l._id}>
//                   {editId === l._id ? (
//                     <>
//                       <td>
//                         <input
//                           value={editData.takenBy}
//                           onChange={(e) =>
//                             setEditData({
//                               ...editData,
//                               takenBy: e.target.value,
//                             })
//                           }
//                         />
//                       </td>

//                       <td>{l.productName}</td>

//                       <td>
//                         <input
//                           value={editData.quantityTaken}
//                           onChange={(e) =>
//                             setEditData({
//                               ...editData,
//                               quantityTaken: e.target.value,
//                             })
//                           }
//                         />
//                       </td>

//                       <td>{new Date(l.date).toLocaleString()}</td>

//                       <td>
//                         <button onClick={saveEdit}>Save</button>
//                       </td>
//                     </>
//                   ) : (
//                     <>
//                       <td>{l.takenBy}</td>
//                       <td>{l.productName}</td>
//                       <td>{l.quantityTaken}</td>
//                       <td>{new Date(l.date).toLocaleString()}</td>

//                       <td>
//                         <button onClick={() => startEdit(l)}>Edit</button>
//                         <button onClick={() => deleteLog(l._id)}>
//                           Delete
//                         </button>
//                       </td>
//                     </>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState } from "react";
import API from "../api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Logs({
  logs,
  fetchLogs,
  fetchProducts,
  search = "",
  categoryFilter = "",
  dateFilter = "",
}) {
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    quantityTaken: "",
    takenBy: "",
  });

  // 🔍 FILTER
  const filtered = logs.filter((l) => {
    const name = l.takenBy?.toLowerCase() || "";
    const product = l.productName?.toLowerCase() || "";
    const category = l.category?.toLowerCase() || "";

    const logDate = new Date(l.date).toISOString().split("T")[0];
    const s = search.toLowerCase();

    return (
      (name.includes(s) || product.includes(s) || category.includes(s)) &&
      (categoryFilter ? l.category === categoryFilter : true) &&
      (dateFilter ? logDate === dateFilter : true)
    );
  });

  // 📂 GROUP
  const grouped = {};
  filtered.forEach((l) => {
    const cat = l.category || "Other";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(l);
  });

  // ✏️ EDIT
  const startEdit = (l) => {
    setEditId(l._id);
    setEditData({
      quantityTaken: l.quantityTaken,
      takenBy: l.takenBy,
    });
  };

  const saveEdit = async () => {
    await API.put(`/logs/${editId}`, editData);

    setEditId(null);

    await fetchLogs();
    await fetchProducts(); // update stock
  };

  // ❌ DELETE
  const deleteLog = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await API.delete(`/logs/${id}`);

    await fetchLogs();
    await fetchProducts();
  };

  // 📊 EXPORT EXCEL
  const exportExcel = () => {
    const data = filtered.map((l) => ({
      Name: l.takenBy,
      Product: l.productName,
      Category: l.category,
      Quantity: l.quantityTaken,
      Date: new Date(l.date).toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Report");

    const file = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([file]), "inventory.xlsx");
  };

  // 📄 EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    const rows = filtered.map((l) => [
      l.takenBy,
      l.productName,
      l.category,
      l.quantityTaken,
      new Date(l.date).toLocaleString(),
    ]);

    autoTable(doc, {
      head: [["Name", "Product", "Category", "Qty", "Date"]],
      body: rows,
    });

    doc.save("inventory.pdf");
  };

  return (
    <div>
      <h3 style={{ marginBottom: 10 }}>📊 Usage History</h3>

      {/* EXPORT BUTTONS */}
      <div style={{ marginBottom: 15 }}>
        <button onClick={exportExcel}>Export Excel</button>
        <button onClick={exportPDF}>Export PDF</button>
      </div>

      {Object.keys(grouped).length === 0 && <p>No records found</p>}

      {Object.keys(grouped).map((cat) => (
        <div key={cat} style={{ marginBottom: 25 }}>
          <h4>📂 {cat}</h4>

          <div className="flex" style={{ flexWrap: "wrap", gap: 15 }}>
            {grouped[cat].map((l) => (
              <div
                className="card"
                key={l._id}
                style={{
                  width: "260px",
                  padding: "15px",
                  borderRadius: "12px",
                  background: "#1e293b",
                  color: "#fff",
                }}
              >
                {editId === l._id ? (
                  <>
                    <input
                      value={editData.takenBy}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          takenBy: e.target.value,
                        })
                      }
                      placeholder="Name"
                    />

                    <p>{l.productName}</p>

                    <input
                      value={editData.quantityTaken}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          quantityTaken: e.target.value,
                        })
                      }
                      placeholder="Quantity"
                    />

                    <small>
                      {new Date(l.date).toLocaleString()}
                    </small>

                    <div style={{ marginTop: 10 }}>
                      <button onClick={saveEdit}>Save</button>
                    </div>
                  </>
                ) : (
                  <>
                    <strong>{l.takenBy}</strong>

                    <p>{l.productName}</p>

                    <p>Qty: {l.quantityTaken}</p>

                    <small>
                      {new Date(l.date).toLocaleString()}
                    </small>

                    <div style={{ marginTop: 10 }}>
                      <button onClick={() => startEdit(l)}>Edit</button>
                      <button onClick={() => deleteLog(l._id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}