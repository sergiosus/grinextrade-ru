'use client';

import { useState, useRef, useEffect } from 'react';
import { COUNTRIES } from '@/lib/countries';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  noMatchesLabel?: string;
  id?: string;
  className?: string;
  hasError?: boolean;
};

export function CountrySelect({
  value,
  onChange,
  placeholder = 'Select or type country',
  noMatchesLabel = 'No matches',
  id,
  className = '',
  hasError,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = query.trim()
    ? COUNTRIES.filter((c) => c.toLowerCase().includes(query.toLowerCase()))
    : COUNTRIES;
  const slice = filtered.slice(0, 50);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setHighlightIndex(0);
  }, [query]);

  const displayValue = open ? query : value;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        setOpen(true);
        setQuery('');
        e.preventDefault();
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
      setQuery('');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % slice.length);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((i) => (i - 1 + slice.length) % slice.length);
      return;
    }
    if (e.key === 'Enter' && slice[highlightIndex]) {
      e.preventDefault();
      onChange(slice[highlightIndex]);
      setQuery('');
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <input
        id={id}
        type="text"
        value={displayValue}
        onChange={(e) => {
          const v = e.target.value;
          setQuery(v);
          if (!open) setOpen(true);
          if (!v) onChange('');
          else if (COUNTRIES.includes(v)) onChange(v);
        }}
        onFocus={() => { setOpen(true); setQuery(value); }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        aria-controls="country-listbox"
        aria-activedescendant={open && slice[highlightIndex] ? `country-option-${highlightIndex}` : undefined}
        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:ring-primary focus:border-primary ${hasError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-medium/30'}`}
      />
      {open && (
        <ul
          id="country-listbox"
          role="listbox"
          className="absolute z-50 mt-1 w-full max-h-60 overflow-auto rounded-lg border border-gray-light bg-white shadow-lg py-1"
        >
          {slice.length === 0 ? (
            <li className="px-4 py-2 text-gray-medium text-sm">{noMatchesLabel}</li>
          ) : (
            slice.map((country, i) => (
              <li
                key={country}
                id={`country-option-${i}`}
                role="option"
                aria-selected={value === country || highlightIndex === i}
                className={`px-4 py-2 text-sm cursor-pointer ${
                  value === country || highlightIndex === i ? 'bg-primary/10 text-primary font-medium' : 'text-brand-black hover:bg-gray-light'
                }`}
                onMouseEnter={() => setHighlightIndex(i)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onChange(country);
                  setQuery('');
                  setOpen(false);
                }}
              >
                {country}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
