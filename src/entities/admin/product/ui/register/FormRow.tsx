// src/components/backOffice/product/register/FormRow.tsx
type FormRowProps = {
  label: string;
  id: string;
  name: string;
  type?: string;
  as?: 'input' | 'select' | 'textarea';
  options?: { value: string; label: string }[];
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
};

const FormRow = ({
  label,
  id,
  name,
  type = 'text',
  as = 'input',
  options,
  placeholder,
  min,
  max,
  step,
  required,
}: FormRowProps) => (
  <div className="flex items-center gap-2">
    <label
      htmlFor={id}
      className="w-40 text-sm font-semibold text-gray-700 shrink-0"
    >
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {as === 'select' ? (
      <select
        id={id}
        name={name}
        required={required}
        className="flex-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500"
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder || '선택'}
        </option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : as === 'textarea' ? (
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="flex-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500 resize-none"
      />
    ) : (
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        min={min}
        max={max}
        step={step}
        className="flex-1 border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-gray-500"
      />
    )}
  </div>
);

export default FormRow;
