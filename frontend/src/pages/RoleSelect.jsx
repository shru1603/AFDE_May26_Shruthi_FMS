function RoleSelect({ onSelect }) {
  return (
    <div className="role-select">
      <div className="role-card">
        <h1>Feedback Management System</h1>
        <p>Select your role to continue</p>
        <div className="role-buttons">
          <button onClick={() => onSelect('admin')}>Admin</button>
          <button onClick={() => onSelect('user')}>User</button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelect
