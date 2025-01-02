import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Form = () => {


    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchRepresentativeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/sevak/${id}`);
                const data = response.data.data;
                setFormData({
                    name: data.name,
                    party: data.party,
                    designation: data.designation,
                    email: data.email,
                    phone: data.phone,
                    area: data.area,
                });
            } catch (error) {
                console.error("Error fetching representative details", error);
            }
        };

        if (id) {
            fetchRepresentativeDetails();
        }
    }, [id]);

    const [formData, setFormData] = useState({
        name: "",
        party: "",
        designation: "",
        email: "",
        phone: "",
        area: "",
    });



    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/sevak/${id}`, formData);
            navigate("/");
        } catch (error) {
            console.error("Error updating representative details", error);
            alert("There was an error updating the details.");
        }
    };

    return (
        <div className="h-full bg-gray-50 py-8 px-4 flex items-center justify-center">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Edit Representative
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    disabled
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="party" className="block text-sm font-medium text-gray-700">
                                    Party
                                </label>
                                <input
                                    disabled
                                    id="party"
                                    name="party"
                                    value={formData.party}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md  bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                                    Designation
                                </label>
                                <input
                                    disabled
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border  bg-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                                    Area
                                </label>
                                <input
                                    id="area"
                                    name="area"
                                    value={formData.area}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;