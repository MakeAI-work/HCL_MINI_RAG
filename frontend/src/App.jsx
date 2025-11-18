import React, { useState } from 'react';
import SchemeForm from './components/SchemeForm';
import SchemeResults from './components/SchemeResults';

export default function App() {
  const [results, setResults] = useState(null);
  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">Scheme Recommender</h1>
      <SchemeForm onResults={setResults} />
      <SchemeResults data={results} />
    </div>
  );
}
