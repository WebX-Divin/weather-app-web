import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Autosuggest, { ChangeEvent, SuggestionsFetchRequestedParams } from 'react-autosuggest';

export interface City {
  name: string;
  cou_name_en: string;
  timezone: string;
}

interface CitiesTableProps {
  onCitySelect: (city: City) => void;
}

const CitiesTable: React.FC<CitiesTableProps> = ({ onCitySelect }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const tableRef = useRef<HTMLDivElement>(null);
  const startRef = useRef<number>(0); // Track start index for fetching cities
  const [sortBy, setSortBy] = useState<{ key: keyof City; ascending: boolean } | null>(null);
  const uniqueCityNames = useRef<Set<string>>(new Set());

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axios.get<{ records: { fields: City }[] }>(
        `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&format=json&disjunctive.cou_name_en&sort=name&refine.cou_name_en=India&start=${startRef.current}`
      );
      const newCities = response.data.records.map((record) => ({
        name: record.fields.name,
        cou_name_en: record.fields.cou_name_en,
        timezone: record.fields.timezone,
      })).filter(city => !uniqueCityNames.current.has(city.name)); // Filter out duplicates
      setCities((prevCities) => [...prevCities, ...newCities]);
      newCities.forEach(city => uniqueCityNames.current.add(city.name)); // Add new city names to set
      setIsLoading(false);
      startRef.current += newCities.length; // Update start index for the next fetch
    } catch (error) {
      console.error('Error fetching cities:', error);
      setIsLoading(false);
    }
  }, [isLoading]);

  const handleScroll = useCallback(() => {
    if (
      tableRef.current &&
      tableRef.current.scrollTop + tableRef.current.clientHeight >= tableRef.current.scrollHeight &&
      !isLoading &&
      uniqueCityNames.current.size < 99 // Adjust the condition as needed
    ) {
      fetchCities();
    }
  }, [fetchCities, isLoading, tableRef]);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.addEventListener('scroll', handleScroll);
      return () => {
        if (tableRef.current) {
          tableRef.current.removeEventListener('scroll', handleScroll);
        }
      };
    }
  }, [handleScroll]);

  const memoizedGetSuggestions = useCallback(
    async (inputValue: string) => {
      try {
        const response = await axios.get<{ records: { fields: City }[] }>(
          `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${inputValue}&format=json&disjunctive.cou_name_en&sort=name&refine.cou_name_en=India`
        );
        const suggestedCities = response.data.records.map((record) => ({
          name: record.fields.name,
          cou_name_en: record.fields.cou_name_en,
          timezone: record.fields.timezone,
        }));
        return suggestedCities;
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
      }
    },
    []
  );

  const onSuggestionsFetchRequested = async ({ value }: SuggestionsFetchRequestedParams) => {
    const suggestions = await memoizedGetSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: City) => suggestion.name;

  const renderSuggestion = (suggestion: City) => (
    <div>
      {suggestion.name}, {suggestion.cou_name_en}
    </div>
  );

  const onChange = (event: React.FormEvent, { newValue }: ChangeEvent) => {
    setValue(newValue);
  };

  const handleSort = (key: keyof City) => {
    setSortBy((prevSortBy) => {
      if (prevSortBy && prevSortBy.key === key) {
        return { key, ascending: !prevSortBy.ascending };
      } else {
        return { key, ascending: true };
      }
    });
  };

  const sortedCities = [...cities].sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy.key];
    const bValue = b[sortBy.key];
    if (aValue < bValue) return sortBy.ascending ? -1 : 1;
    if (aValue > bValue) return sortBy.ascending ? 1 : -1;
    return 0;
  });

  return (
    <div className="w-full bg-gray-100 py-8 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            placeholder: 'Search for a city...',
            value: value,
            onChange: onChange,
            style: { border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '50px' }, // Added border and padding
          }}
        />
        <div className="h-full overflow-y-auto" ref={tableRef}>
          <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-4 sticky top-0 z-10">
            <thead>
              <tr className="bg-gray-200 text-gray-600 font-bold">
                <th className="py-3 px-6 text-left" onClick={() => handleSort('name')}>
                  City Name
                </th>
                <th className="py-3 px-6 text-left" onClick={() => handleSort('cou_name_en')}>
                  Country
                </th>
                <th className="py-3 px-6 text-left" onClick={() => handleSort('timezone')}>
                  Timezone
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCities
                .filter((city) => city.name.toLowerCase().includes(value.toLowerCase())) // Filter cities based on search input
                .map((city, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
                    onClick={() => onCitySelect(city)}
                  >
                    <td className="py-4 px-6 text-gray-800">{city.name}</td>
                    <td className="py-4 px-6 text-gray-800">{city.cou_name_en}</td>
                    <td className="py-4 px-6 text-gray-800">{city.timezone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {isLoading && (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitiesTable;
