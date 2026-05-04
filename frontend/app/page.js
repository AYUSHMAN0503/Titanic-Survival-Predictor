'use client';

import { useState } from 'react';
import Form from '../components/Form';

export default function Home() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Titanic Survival Prediction
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter passenger details to predict if they would have survived.
          </p>
        </div>

        <Form onResult={setResult} />

        {result && (
          <div className={`mt-6 p-4 rounded-md text-center text-xl font-bold ${result === 'Survived' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}
