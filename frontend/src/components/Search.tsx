import axios from "axios";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [filter, setFilter] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    // Navigate to the edit page with the respective ID
    navigate(`/sevak/edit/${id}`);
  };

  const sendReq = async (filter: string) => {
    setLoading(true);
    if (filter.length === 0) {
      setLoading(false);
      return;
    }
    const req = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/sevak`, {
      locality: filter
    });
    const sevaks = req.data.data;
    setResults(sevaks);
    setFilter("");
    setLoading(false);
  };

  const handleSearch = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex gap-4 mb-8">
        <input
          onChange={handleSearch}
          type="text"
          placeholder="Search Area, District, State...."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
        />
        <button
          type="submit"
          onClick={() => sendReq(filter)}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <SearchIcon size={20} />
          Search
        </button>
      </div>

      {loading && <div className="text-center py-4 bg-blue-100 text-blue-500 rounded-lg shadow-sm">Loading...</div>}

      {
        results.length === 0 && filter.length > 0 && (
          <div className="text-center py-4 bg-red-100 text-red-500 rounded-lg shadow-sm">
            No results found for "{filter}"
          </div>
        )
      }

      {results.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sr. No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((item: any, index: number) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.party}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.locality.area}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEdit(item.id)}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        fontSize: "14px",
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Search;