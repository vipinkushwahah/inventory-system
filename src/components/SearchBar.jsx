import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function SearchPanel({
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
  dateFilter,
  setDateFilter,
  products,
  logs,
}) {
  // FILTER PRODUCTS
  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase();

    return (
      p.name?.toLowerCase().includes(s) ||
      p.category?.toLowerCase().includes(s)
    );
  });

  // FILTER LOGS
  const filteredLogs = logs.filter((l) => {
    const s = search.toLowerCase();

    const name = l.takenBy?.toLowerCase() || "";
    const product = l.productName?.toLowerCase() || "";
    const category = l.category?.toLowerCase() || "";

    const logDate = new Date(l.date).toISOString().split("T")[0];

    return (
      (name.includes(s) ||
        product.includes(s) ||
        category.includes(s)) &&
      (categoryFilter ? l.category === categoryFilter : true) &&
      (dateFilter ? logDate === dateFilter : true)
    );
  });

  // EXPORT EXCEL
  const exportExcel = () => {
    const data = [
      ...filteredProducts.map((p) => ({
        Type: "Product",
        Name: p.name,
        Category: p.category,
        Stock: p.availableStock,
      })),

      ...filteredLogs.map((l) => ({
        Type: "Log",
        TakenBy: l.takenBy,
        Product: l.productName,
        Category: l.category,
        Quantity: l.quantityTaken,
        Date: new Date(l.date).toLocaleString(),
      })),
    ];

    const ws = XLSX.utils.json_to_sheet(data);

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Search Results");

    const file = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([file]), "search-results.xlsx");
  };

  // EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    const rows = [];

    filteredProducts.forEach((p) => {
      rows.push([
        "Product",
        p.name,
        p.category,
        p.availableStock,
        "",
      ]);
    });

    filteredLogs.forEach((l) => {
      rows.push([
        "Log",
        l.takenBy,
        l.productName,
        l.quantityTaken,
        new Date(l.date).toLocaleString(),
      ]);
    });

    autoTable(doc, {
      head: [["Type", "Name", "Category/Product", "Qty", "Date"]],
      body: rows,
    });

    doc.save("search-results.pdf");
  };

  return (
    <div
      style={{
        marginBottom: 20,
        padding: 20,
        borderRadius: "20px",
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(15px)",
        border: "1px solid rgba(255,255,255,0.15)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        color: "#fff",
      }}
    >
      <h2 style={{ marginBottom: 15 }}>
        🔍 Smart Search Panel
      </h2>

      {/* SEARCH INPUT */}
      <input
        placeholder="Search product / name / category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginBottom: "12px",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.15)",
          background: "rgba(255,255,255,0.05)",
          color: "#fff",
          outline: "none",
          fontSize: "15px",
        }}
      />

      {/* FILTERS */}
      <div
        style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap",
          marginBottom: 15,
        }}
      >
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{
            padding: "12px",
            borderRadius: "10px",
          }}
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
          style={{
            padding: "12px",
            borderRadius: "10px",
          }}
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

      {/* SEARCH RESULTS */}
      {search && (
        <div
          style={{
            marginTop: 15,
            padding: 20,
            borderRadius: "18px",
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h3>
            🔎 Showing Results For:
            <span
              style={{
                color: "#38bdf8",
                marginLeft: 8,
              }}
            >
              {search}
            </span>
          </h3>

          {/* COUNTS */}
          <div
            style={{
              marginTop: 15,
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                padding: 15,
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                minWidth: 160,
              }}
            >
              📦 Products Found
              <h2>{filteredProducts.length}</h2>
            </div>

            <div
              style={{
                padding: 15,
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                minWidth: 160,
              }}
            >
              📜 Logs Found
              <h2>{filteredLogs.length}</h2>
            </div>
          </div>

          {/* PRODUCTS */}
          {filteredProducts.length > 0 && (
            <div style={{ marginTop: 25 }}>
              <h3 style={{ marginBottom: 15 }}>
                📦 Products
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 15,
                }}
              >
                {filteredProducts.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      padding: 15,
                      width: 220,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4>{p.name}</h4>

                    <p>📂 {p.category}</p>

                    <p>
                      📦 Stock:
                      <strong> {p.availableStock}</strong>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LOGS */}
          {filteredLogs.length > 0 && (
            <div style={{ marginTop: 30 }}>
              <h3 style={{ marginBottom: 15 }}>
                📜 Taken By
              </h3>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 15,
                }}
              >
                {filteredLogs.map((l) => (
                  <div
                    key={l._id}
                    style={{
                      padding: 15,
                      width: 240,
                      borderRadius: 16,
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <h4>{l.takenBy}</h4>

                    <p>
                      📦 Product:
                      <strong> {l.productName}</strong>
                    </p>

                    <p>
                      📂 Category:
                      <strong> {l.category}</strong>
                    </p>

                    <p>
                      🔢 Quantity:
                      <strong> {l.quantityTaken}</strong>
                    </p>

                    <small>
                      🕒 {new Date(l.date).toLocaleString()}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DOWNLOAD BUTTONS */}
          <div
            style={{
              marginTop: 25,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button onClick={exportPDF}>
              📄 Download PDF
            </button>

            <button onClick={exportExcel}>
              📊 Download Excel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}