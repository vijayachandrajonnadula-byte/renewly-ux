import { useEffect, useId, useRef, useState } from 'react'

export type FilterDropdownOption = {
  label: string
  value: string
}

type FilterDropdownProps = {
  className?: string
  label: string
  onChange: (value: string) => void
  options: FilterDropdownOption[]
  value: string
}

function FilterDropdown({ className = '', label, onChange, options, value }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div className={`filter-dropdown ${className}`.trim()} ref={dropdownRef}>
      <button
        aria-controls={listboxId}
        aria-expanded={isOpen}
        className="filter-dropdown__trigger"
        onClick={() => setIsOpen((current) => !current)}
        type="button"
      >
        <span className="filter-dropdown__label">{label}</span>
        <span className="filter-dropdown__value">{selectedOption?.label}</span>
        <svg aria-hidden="true" viewBox="0 0 16 16">
          <path d="M4.5 6.25 8 9.75l3.5-3.5" />
        </svg>
      </button>

      {isOpen ? (
        <div className="filter-dropdown__menu" id={listboxId} role="listbox">
          {options.map((option) => {
            const isSelected = option.value === value

            return (
              <button
                aria-selected={isSelected}
                className={`filter-dropdown__option${
                  isSelected ? ' filter-dropdown__option--selected' : ''
                }`}
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                role="option"
                type="button"
              >
                {option.label}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export default FilterDropdown
