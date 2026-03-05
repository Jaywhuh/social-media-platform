function InputField({ label, id, type, name, placeholder, value, onChange, error }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={error ? 'input-error' : ''}
      />
      {error && (
        <span className="error-message">{error}</span>
      )}
    </div>
  )
}

export default InputField