import { useState } from 'react';

export default function Form({ onResult }) {
  const [formData, setFormData] = useState({
    pclass: 3,
    sex: 'male',
    age: 22,
    sibsp: 0,
    parch: 0,
    fare: 7.25,
    embarked: 'S'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pclass' || name === 'sibsp' || name === 'parch' ? parseInt(value) :
              name === 'age' || name === 'fare' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onResult(null); // clear previous result
    
    try {
      const res = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        onResult(data.prediction);
      } else {
        onResult('Error: ' + (data.detail || 'Failed to predict'));
      }
    } catch (error) {
      onResult('Failed to connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Passenger Class (1, 2, 3)
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="pclass" min="1" max="3" value={formData.pclass} onChange={handleChange} required />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Sex
        </label>
        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="sex" value={formData.sex} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Age
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" step="0.1" name="age" value={formData.age} onChange={handleChange} required />
      </div>

      <div className="mb-4 flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Siblings/Spouses
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="sibsp" value={formData.sibsp} onChange={handleChange} required />
        </div>
        <div className="w-1/2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Parents/Children
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" name="parch" value={formData.parch} onChange={handleChange} required />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fare
        </label>
        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" step="0.01" name="fare" value={formData.fare} onChange={handleChange} required />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Port of Embarkation
        </label>
        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="embarked" value={formData.embarked} onChange={handleChange}>
          <option value="C">Cherbourg (C)</option>
          <option value="Q">Queenstown (Q)</option>
          <option value="S">Southampton (S)</option>
        </select>
      </div>

      <div className="flex items-center justify-between">
        <button 
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
          type="submit" 
          disabled={loading}
        >
          {loading ? 'Predicting...' : 'Predict Survival'}
        </button>
      </div>
    </form>
  );
}
