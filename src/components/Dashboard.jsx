// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     Tooltip,
//     ResponsiveContainer,
//     CartesianGrid,
//     PieChart,
//     Pie,
//     Cell,
//     BarChart,
//     Bar,
//   } from "recharts";
  
//   export default function Dashboard({ products, logs }) {
  
//     // 📈 STOCK DATA
//     const stockData = products.map((p) => ({
//       name: p.name,
//       stock: p.availableStock,
//     }));
  
//     // ⚠️ LOW STOCK ALERT
//     const lowStock = products.filter((p) => p.availableStock < 50);
  
//     // 👤 USER DATA
//     const userMap = {};
//     logs.forEach((l) => {
//       if (!userMap[l.takenBy]) userMap[l.takenBy] = 0;
//       userMap[l.takenBy] += l.quantityTaken;
//     });
  
//     const userData = Object.keys(userMap).map((u) => ({
//       name: u,
//       value: userMap[u],
//     }));
  
//     // 📅 MONTHLY TREND (SORTED)
//     const monthlyMap = {};
//     logs.forEach((l) => {
//       const d = new Date(l.date);
//       const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  
//       if (!monthlyMap[key]) monthlyMap[key] = 0;
//       monthlyMap[key] += l.quantityTaken;
//     });
  
//     const monthlyData = Object.keys(monthlyMap)
//       .sort()
//       .map((m) => ({
//         month: m,
//         usage: monthlyMap[m],
//       }));
  
//     // 🔥 TOP PRODUCTS (MOST USED)
//     const productUsage = {};
//     logs.forEach((l) => {
//       if (!productUsage[l.productName]) productUsage[l.productName] = 0;
//       productUsage[l.productName] += l.quantityTaken;
//     });
  
//     const topProducts = Object.keys(productUsage)
//       .map((p) => ({
//         name: p,
//         usage: productUsage[p],
//       }))
//       .sort((a, b) => b.usage - a.usage)
//       .slice(0, 5);
  
//     return (
//       <div style={{ marginBottom: 40 }}>
//         <h2>📊 Dashboard</h2>
  
//         {/* ⚠️ LOW STOCK WARNING */}
//         {lowStock.length > 0 && (
//           <div style={{ background: "#ffdddd", padding: 10, marginBottom: 20 }}>
//             <strong>⚠️ Low Stock Alert:</strong>
//             {lowStock.map((p) => (
//               <div key={p._id}>
//                 {p.name} → {p.availableStock} left
//               </div>
//             ))}
//           </div>
//         )}
  
//         {/* 📈 STOCK LINE */}
//         <h4>Stock Overview</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={stockData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
  
//             <Line
//               type="monotone"
//               dataKey="stock"
//               stroke="#4CAF50"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
  
//         {/* 📅 MONTHLY TREND */}
//         <h4>Monthly Usage Trend</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={monthlyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
  
//             <Line
//               type="monotone"
//               dataKey="usage"
//               stroke="#FF9800"
//               strokeWidth={3}
//               dot={{ r: 4 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
  
//         {/* 🔥 TOP PRODUCTS */}
//         <h4>Top 5 Used Products</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={topProducts}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="usage" fill="#2196F3" />
//           </BarChart>
//         </ResponsiveContainer>
  
//         {/* 👤 USER DISTRIBUTION */}
//         <h4>Who Took Most</h4>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={userData}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={100}
//               label
//             >
//               {userData.map((_, i) => (
//                 <Cell key={i} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     );
//   }

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
  
  export default function Dashboard({ products, logs }) {
  
    // 📈 STOCK DATA
    const stockData = products.map((p) => ({
      name: p.name,
      stock: p.availableStock,
    }));
  
    // ⚠️ LOW STOCK ALERT
    const lowStock = products.filter((p) => p.availableStock < 50);
  
    // 👤 USER DATA
    const userMap = {};
    logs.forEach((l) => {
      if (!userMap[l.takenBy]) userMap[l.takenBy] = 0;
      userMap[l.takenBy] += l.quantityTaken;
    });
  
    const userData = Object.keys(userMap).map((u) => ({
      name: u,
      value: userMap[u],
    }));
  
    // 📅 MONTHLY TREND
    const monthlyMap = {};
    logs.forEach((l) => {
      const d = new Date(l.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  
      if (!monthlyMap[key]) monthlyMap[key] = 0;
      monthlyMap[key] += l.quantityTaken;
    });
  
    const monthlyData = Object.keys(monthlyMap)
      .sort()
      .map((m) => ({
        month: m,
        usage: monthlyMap[m],
      }));
  
    // 🔥 TOP PRODUCTS
    const productUsage = {};
    logs.forEach((l) => {
      if (!productUsage[l.productName]) productUsage[l.productName] = 0;
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
      <div>
  
        <h2 style={{ marginBottom: 20 }}>📊 Dashboard</h2>
  
        {/* ⚠️ LOW STOCK */}
        {lowStock.length > 0 && (
          <div className="card" style={{ background: "#7f1d1d" }}>
            <strong>⚠️ Low Stock Alert</strong>
  
            {lowStock.map((p) => (
              <div key={p._id}>
                {p.name} → {p.availableStock} left
              </div>
            ))}
          </div>
        )}
  
        {/* 📈 STOCK TREND */}
        <div className="card">
          <h4>Stock Trend</h4>
  
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stockData}>
              <CartesianGrid stroke="#334155" />
  
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey="stock"
                stroke="#38bdf8"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* 📅 MONTHLY TREND */}
        <div className="card">
          <h4>Monthly Usage Trend</h4>
  
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthlyData}>
              <CartesianGrid stroke="#334155" />
  
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey="usage"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
  
        {/* 🔥 TOP PRODUCTS */}
        <div className="card">
          <h4>Top 5 Used Products</h4>
  
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts}>
              <CartesianGrid stroke="#334155" />
  
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
  
              <Bar dataKey="usage" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* 👤 USER DISTRIBUTION */}
        <div className="card">
          <h4>Usage by People</h4>
  
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={userData}
                dataKey="value"
                outerRadius={90}
                label
              >
                {userData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${i * 60}, 70%, 50%)`} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
  
      </div>
    );
  }