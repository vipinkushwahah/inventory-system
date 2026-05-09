import { useState } from "react";
import API from "../api";

export default function ProductList({
  products,
  fetchProducts,
  search = "",
}) {
  const [editId, setEditId] =
    useState(null);

  const [editData, setEditData] =
    useState({
      name: "",
      totalAdded: "",
      category: "",
    });

  // FILTER
  const filtered = products.filter((p) => {
    const name =
      p.name?.toLowerCase() || "";

    const category =
      p.category?.toLowerCase() || "";

    return (
      name.includes(
        search.toLowerCase()
      ) ||
      category.includes(
        search.toLowerCase()
      )
    );
  });

  // GROUP BY CATEGORY
  const grouped = {};

  filtered.forEach((p) => {
    const cat = p.category || "Other";

    if (!grouped[cat]) {
      grouped[cat] = [];
    }

    grouped[cat].push(p);
  });

  // EDIT
  const startEdit = (p) => {
    setEditId(p._id);

    setEditData({
      name: p.name || "",
      totalAdded: p.totalAdded || "",
      category: p.category || "",
    });
  };

  // SAVE
  const saveEdit = async () => {
    try {
      await API.put(
        `/products/${editId}`,
        editData
      );

      setEditId(null);

      fetchProducts();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      alert("Update failed");
    }
  };

  // DELETE
  const deleteProduct = async (id) => {
    if (
      !window.confirm(
        "Delete this product?"
      )
    )
      return;

    await API.delete(`/products/${id}`);

    fetchProducts();
  };

  return (
    <div>
      <h3
        style={{
          marginBottom: 20,
        }}
      >
        📦 Products
      </h3>

      {Object.keys(grouped).length ===
        0 && <p>No products found</p>}

      {Object.keys(grouped).map((cat) => (
        <div
          key={cat}
          style={{
            marginBottom: 35,
          }}
        >
          <h4
            style={{
              marginBottom: 15,
            }}
          >
            📂 {cat}
          </h4>

          <div
            className="flex"
            style={{
              flexWrap: "wrap",
              gap: 18,
            }}
          >
            {grouped[cat].map((p) => (
              <div
                className="card"
                key={p._id}
                style={{
                  width: "280px",
                  padding: "18px",
                  borderRadius: "18px",
                  background:
                    "rgba(30,41,59,0.85)",
                  backdropFilter:
                    "blur(10px)",
                  color: "#fff",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {editId === p._id ? (
                  <>
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          name:
                            e.target.value,
                        })
                      }
                      placeholder="Name"
                    />

                    <input
                      value={
                        editData.totalAdded
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          totalAdded:
                            e.target.value,
                        })
                      }
                      placeholder="Stock"
                    />

                    <input
                      value={
                        editData.category
                      }
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          category:
                            e.target.value,
                        })
                      }
                      placeholder="Category"
                    />

                    <button
                      onClick={saveEdit}
                    >
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <h3>{p.name}</h3>

                    <p>
                      📂 {p.category}
                    </p>

                    <p>
                      📦 Total Added:
                      <strong>
                        {" "}
                        {p.totalAdded}
                      </strong>
                    </p>

                    

                    <p>
                      📊 Available:
                      <span
                        style={{
                          marginLeft: 8,
                          padding:
                            "4px 10px",
                          borderRadius:
                            "10px",
                          background:
                            p.availableStock <
                            20
                              ? "#dc2626"
                              : p.availableStock <
                                50
                              ? "#f59e0b"
                              : "#22c55e",
                        }}
                      >
                        {p.availableStock}
                      </span>
                    </p>
                    <p>
  ➕ Last Added:
  <strong>
    {" "}
    {p.lastAddedAmount || 0}
  </strong>
</p>
                    {/* CREATED */}
                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 13,
                        opacity: 0.8,
                      }}
                    >
                      🕒 Added:
                      <br />

                      {new Date(
                        p.createdAt
                      ).toLocaleString()}
                    </div>

                    {/* UPDATED */}
                    <div
                      style={{
                        marginTop: 10,
                        fontSize: 13,
                        opacity: 0.8,
                      }}
                    >
                      🔄 Updated:
                      <br />

                      {new Date(
                        p.updatedAt
                      ).toLocaleString()}
                    </div>
                  </>
                )}

                <div
                  style={{
                    marginTop: 18,
                    display: "flex",
                    gap: 10,
                  }}
                >
                  <button
                    onClick={() =>
                      startEdit(p)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteProduct(
                        p._id
                      )
                    }
                  >
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