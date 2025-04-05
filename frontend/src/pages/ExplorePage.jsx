import React, { useState } from 'react';
import InfoPage from './InfoPage';
import { countryData } from '../data/countryData';

const ExplorePage = () => {
  const [selectedCountry, setSelectedCountry] = useState('japan');

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <nav className="w-full max-w-4xl mb-6">
        <ul className="flex justify-center gap-4 flex-wrap">
          {['japan', 'brazil', 'india', 'italy'].map((country) => (
            <li key={country}>
              <button
                className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCountry === country
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-800 border border-gray-300 hover:bg-gray-100'
                }`}
                onClick={() => handleCountryChange(country)}
              >
                {country.charAt(0).toUpperCase() + country.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md">
        <InfoPage countryData={countryData[selectedCountry]} />
      </main>
    </div>
  );
};

export default ExplorePage;
