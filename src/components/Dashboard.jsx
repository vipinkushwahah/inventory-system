import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import "./Dashboard.scss";

export default function Dashboard({ products, logs }) {
  // STOCK DATA
  const stockData = products.map((p) => ({
    name: p.name,
    stock: p.availableStock,
  }));

  // LOW STOCK
  const lowStock = products.filter(
    (p) => p.availableStock < 50
  );

  // USER DATA
  const userMap = {};

  logs.forEach((l) => {
    if (!userMap[l.takenBy]) {
      userMap[l.takenBy] = 0;
    }

    userMap[l.takenBy] += l.quantityTaken;
  });

  const userData = Object.keys(userMap).map((u) => ({
    name: u,
    value: userMap[u],
  }));

  // MONTHLY DATA
  const monthlyMap = {};

  logs.forEach((l) => {
    const d = new Date(l.date);

    const key = `${d.getFullYear()}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}`;

    if (!monthlyMap[key]) {
      monthlyMap[key] = 0;
    }

    monthlyMap[key] += l.quantityTaken;
  });

  const monthlyData = Object.keys(monthlyMap)
    .sort()
    .map((m) => ({
      month: m,
      usage: monthlyMap[m],
    }));

  // TOP PRODUCTS
  const productUsage = {};

  logs.forEach((l) => {
    if (!productUsage[l.productName]) {
      productUsage[l.productName] = 0;
    }

    productUsage[l.productName] += l.quantityTaken;
  });

  const topProducts = Object.keys(productUsage)
    .map((p) => ({
      name: p,
      usage: productUsage[p],
    }))
    .sort((a, b) => b.usage - a.usage)
    .slice(0, 5);

  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>

      {/* LOW STOCK */}
      {lowStock.length > 0 && (
        <div
          className="dashboard-card low-stock"
          style={{ marginBottom: 20 }}
        >
          <div className="alert-title">
            ⚠️ Low Stock Alert
          </div>

          {lowStock.map((p) => (
            <div
              className="low-stock-item"
              key={p._id}
            >
              <span>{p.name}</span>

              <strong>
                {p.availableStock} left
              </strong>
            </div>
          ))}
        </div>
      )}

      <div className="dashboard-grid">
        {/* STOCK TREND */}
        <div className="dashboard-card">
          <h4>📈 Stock Trend</h4>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockData}>
                <CartesianGrid stroke="#334155" />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="stock"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* MONTHLY TREND */}
        <div className="dashboard-card">
          <h4>📅 Monthly Usage Trend</h4>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid stroke="#334155" />

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TOP PRODUCTS */}
        <div className="dashboard-card">
          <h4>🔥 Top 5 Used Products</h4>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <CartesianGrid stroke="#334155" />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                />

                <YAxis stroke="#94a3b8" />

                <Tooltip />

                <Bar
                  dataKey="usage"
                  fill="#22c55e"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* USER DISTRIBUTION */}
        <div className="dashboard-card">
          <h4>👤 Usage by People</h4>

          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="value"
                  outerRadius={90}
                  label
                >
                  {userData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={`hsl(${i * 60}, 70%, 50%)`}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}