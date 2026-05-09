export default function MonthlyReport({ logs }) {
    const monthly = {};
  
    logs.forEach((l) => {
      const date = new Date(l.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;
  
      if (!monthly[key]) monthly[key] = 0;
      monthly[key] += l.quantityTaken;
    });
  
    return (
      <div>
        <h3>Monthly Usage</h3>
  
        {Object.keys(monthly).map((m) => (
          <div key={m}>
            {m} : {monthly[m]} items used
          </div>
        ))}
      </div>
    );
  }