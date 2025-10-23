"use client";

import React, { useState } from "react";

export const AddressInput = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCities = async (query: string) => {
    if (query.length < 2) return;

    setLoading(true);
    try {
      const res = await fetch("https://api.novaposhta.ua/v2.0/json/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: "dac3940eb3c40c9f900274d2f1f461ad",
          modelName: "Address",
          calledMethod: "getCities",
          methodProperties: { FindByString: query },
        }),
      });

      const data = await res.json();
      setSuggestions(data.data || []);
    } catch (err) {
      console.error("Ошибка загрузки городов:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        value={value}
        placeholder="Введіть місто..."
        onChange={(e) => {
          setValue(e.target.value);
          fetchCities(e.target.value);
        }}
        className="border rounded p-2 w-full"
      />
      {loading && (
        <div className="text-sm text-gray-500 mt-1">Завантаження...</div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded w-full mt-1 max-h-48 overflow-y-auto z-10">
          {suggestions.map((item) => (
            <li
              key={item.Ref}
              onClick={() => {
                setValue(item.Description);
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.Description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
