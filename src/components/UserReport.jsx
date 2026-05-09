export default function UserReport({ logs }) {
    const users = {};
  
    logs.forEach((l) => {
      if (!users[l.takenBy]) users[l.takenBy] = 0;
      users[l.takenBy] += l.quantityTaken;
    });
  
    return (
      <div>
        <h3>User Report</h3>
  
        {Object.keys(users).map((u) => (
          <div key={u}>
            {u} → {users[u]} items taken
          </div>
        ))}
      </div>
    );
  }