import { useState, useRef, useEffect } from "react";

export const Select = ({ label, value, onChange, options, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div style={{ marginBottom: "15px", position: "relative", zIndex: isOpen ? 9999 : "auto" }} ref={dropdownRef}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
          color: "#736558",
          fontSize: "14px"
        }}
      >
        {label}
      </label>

      {/* Custom Select Button */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          } else if (e.key === 'Escape' && isOpen) {
            e.preventDefault();
            setIsOpen(false);
          }
        }}
        style={{
          width: "100%",
          padding: "12px 16px",
          fontSize: "15px",
          borderRadius: "12px",
          border: "1px solid rgba(115, 101, 88, 0.2)",
          background: "rgba(242, 238, 235, 0.95)",
          backdropFilter: "blur(10px) saturate(180%)",
          WebkitBackdropFilter: "blur(10px) saturate(180%)",
          color: selectedOption ? "#2C2C2C" : "#736558",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          opacity: disabled ? 0.5 : 1,
          outline: "none",
          ...(isOpen && !disabled && {
            borderColor: "rgba(166, 155, 141, 0.5)",
            boxShadow: "0 0 0 3px rgba(166, 155, 141, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.7)",
          })
        }}
      >
        <span style={{ opacity: selectedOption ? 1 : 0.6 }}>
          {selectedOption?.label || `Select ${label.toLowerCase()}...`}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="#736558"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={`${label} options`}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "8px",
            background: "rgba(242, 238, 235, 0.98)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderRadius: "12px",
            border: "1px solid rgba(115, 101, 88, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
            overflow: "hidden",
            zIndex: 1000,
            animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {options.map((option, index) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`select-option ${value === option.value ? 'selected' : ''}`}
              style={{
                padding: "12px 16px",
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                background: value === option.value ? "rgba(166, 155, 141, 0.3)" : "transparent",
                color: value === option.value ? "#736558" : "#2C2C2C",
                fontWeight: value === option.value ? "600" : "400",
                borderBottom: index < options.length - 1 ? "1px solid rgba(115, 101, 88, 0.1)" : "none",
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .select-option:not(.selected):hover {
          background: rgba(166, 155, 141, 0.2) !important;
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
};
