function RoleSelect({ onSelect }) {
  return (
    <div className="role-select">
      <div className="role-card">
        <h1>Feedback Management System</h1>
        <p>Select your role to continue</p>
        <div className="role-buttons">
          <button className="role-option admin-option" onClick={() => onSelect('admin')}>
            <span className="role-option-badge">A</span>
            <span className="role-option-text">
              <strong>Admin</strong>
              <small>Manage &amp; view all feedback</small>
            </span>
          </button>
          <button className="role-option user-option" onClick={() => onSelect('user')}>
            <span className="role-option-badge">U</span>
            <span className="role-option-text">
              <strong>User</strong>
              <small>Submit &amp; view feedback</small>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default RoleSelect
