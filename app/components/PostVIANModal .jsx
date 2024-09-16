import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

const PostVIANModal = ({ showModal, onClose }) => {
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    productService: '',
    category: '',
    manufacturer: '',
    problemDate: '',
    location: null,
    frequency: '',
    impact: '',
    evidence: null,
    contactEmail: '',
    consent: false,
    captcha: false,
    userName: '', // Nombre de usuario opcional
    gender: '', // Género del usuario
    age: '' // Edad del usuario
  });

  const [locationOptions, setLocationOptions] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  if (!showModal) return null;

  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({
      ...formData,
      location: selectedOption,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      evidence: e.target.files[0],
    });
  };

  const handleCaptchaChange = (value) => {
    setFormData({
      ...formData,
      captcha: !!value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.captcha) {
        alert("Please complete the CAPTCHA");
        return;
    }

    const dataToSend = new FormData();
    dataToSend.append('title', formData.title);
    dataToSend.append('description', formData.description);
    dataToSend.append('product_service', formData.productService);  // Correct field name
    dataToSend.append('category', formData.category);
    dataToSend.append('manufacturer', formData.manufacturer);
    dataToSend.append('problem_date', formData.problemDate);  // Correct field name
    dataToSend.append('location', formData.location ? formData.location.value : '');
    dataToSend.append('frequency', formData.frequency);
    dataToSend.append('impact', formData.impact);

    // Ensure the evidence field is correctly handled as a file
    if (formData.evidence) {
        dataToSend.append('evidence', formData.evidence);
    }

    dataToSend.append('userName', formData.userName);
    dataToSend.append('gender', formData.gender);
    dataToSend.append('age', formData.age);


    dataToSend.append('contact_email', formData.contactEmail);
    dataToSend.append('consent', formData.consent);

    console.log([...dataToSend]);  // Log the data being sent

    try {
        const response = await axios.post('https://djagodeploy.onrender.com/api/complaints/', dataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Complaint submitted successfully:', response.data);
        setSuccessMessage('Your complaint has been successfully registered!');
        setTimeout(() => {
            setSuccessMessage(null);
            onClose();
        }, 3000);
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);  // Log the error details
        } else {
            console.error('Error submitting complaint:', error);
        }
    }
};



  
  const fetchLocations = async (inputValue) => {
    if (!inputValue || inputValue.length < 2) return;
    setLoadingLocations(true);

    try {
      const response = await axios.get('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
        headers: {
          'X-RapidAPI-Key': '36d747b20dmsh7c9e73f5f0ea235p1ac4d9jsncf5f235a7809',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
        },
        params: {
          namePrefix: inputValue,
          limit: 10,
          sort: '-population',
        },
      });

      const options = response.data.data.map((city) => ({
        value: city.city,
        label: `${city.city}, ${city.countryCode}`
      }));
      setLocationOptions(options);
    } catch (error) {
      console.error('Error during API request:', error);
      setLocationOptions([]);
    } finally {
      setLoadingLocations(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-xl p-8 z-50 max-h-[90vh] overflow-y-auto m-4">
        <h2 className="text-2xl font-semibold text-white mb-4">Post Your VIAN</h2>
        <form onSubmit={handleSubmit}>
          {/* Título */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
              minLength="3"
            />
          </div>

          {/* Descripción */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              required
              minLength="20"
            ></textarea>
          </div>

          {/* Producto o Servicio Afectado */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="productService">
              Product or Service Affected
            </label>
            <input
              type="text"
              id="productService"
              name="productService"
              value={formData.productService}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Categoría */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a category</option>
              <option value="Telephony">Telephony</option>
              <option value="Automobiles">Automobiles</option>
              <option value="Televisions">Televisions</option>
              <option value="Restaurants">Restaurants</option>
              <option value="Home Appliances">Home Appliances</option>
              <option value="Internet and Services">Internet and Services</option>
              <option value="Travel and Airlines">Travel and Airlines</option>
              <option value="Banks and Finance">Banks and Finance</option>
              <option value="Clothing and Footwear">Clothing and Footwear</option>
              <option value="Technology and Gadgets">Technology and Gadgets</option>
            </select>
          </div>

          {/* Nombre del Fabricante o Proveedor del Servicio */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="manufacturer">
              Manufacturer or Service Provider
            </label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Fecha del Problema */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="problemDate">
              Date of the Problem
            </label>
            <input
              type="date"
              id="problemDate"
              name="problemDate"
              value={formData.problemDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Frecuencia del Problema */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="frequency">
              Frequency of the Problem
            </label>
            <select
              id="frequency"
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select frequency</option>
              <option value="Frequently">Frequently</option>
              <option value="Intermittently">Intermittently</option>
              <option value="Once">Once</option>
            </select>
          </div>

          {/* Impacto del Problema */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="impact">
              Impact of the Problem
            </label>
            <select
              id="impact"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select impact level</option>
              <option value="Minor">Minor</option>
              <option value="Moderate">Moderate</option>
              <option value="Severe">Severe</option>
              <option value="Critical">Critical</option>
            </select>
          </div>

             {/* Ubicación */}
         <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <Select
  id="location"
  name="location"
  value={formData.location}
  onChange={handleSelectChange} 
  onInputChange={(inputValue) => {
    console.log('Input value:', inputValue); // Para depuración
    fetchLocations(inputValue);
  }} 
  options={locationOptions} 
  isLoading={loadingLocations} 
  className="text-black"
  placeholder="Search for a city..."
  required
  getOptionValue={(option) => option.value}
  getOptionLabel={(option) => option.label}
/>

          </div>

          {/* Evidencia */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="evidence">
              Evidence (Optional)
            </label>
            <input
              type="file"
              id="evidence"
              name="evidence"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>


          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
              Name (Optional)
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name or leave blank for Anonymous"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your age"
              min="0"
            />
          </div>

          {/* Correo Electrónico de Contacto */}
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="contactEmail">
              Contact Email (Optional)
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Consentimiento */}
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mr-2 leading-tight"
                required
              />
              <span className="text-sm text-white">
              I consent to VentItNow! sharing my feedback and data with relevant third parties to address the issues I have reported and improve their offerings.
              </span>
            </label>
          </div>

          {/* CAPTCHA */}
          <div className="mb-4 flex items-center justify-center">
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={handleCaptchaChange}
            />
          </div>

          {/* Botones de Acción */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
        {/* Mostrar el mensaje de éxito */}
        {successMessage && (
          <div className="mt-4 p-4 bg-green-500 text-white rounded">
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostVIANModal;
