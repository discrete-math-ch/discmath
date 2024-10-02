// components/SubmitTextForm.js
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dzmyneyzjixfmifddayi.supabase.co';
// safe to share online
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bXluZXl6aml4Zm1pZmRkYXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc4ODY2NTcsImV4cCI6MjA0MzQ2MjY1N30.wHiXIV3ncrUha1xVtNbZdsjcS6UmJZy2DyYSe1gzulQ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const SubmitTopics = () => {
  const [textInput, setTextInput] = useState('');
  const setMessage = useState('')[1];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const { error } = await supabase
        .from('Topics')
        .insert([{ topic: textInput }]);

      if (error) {
        throw error;
      }

      alert('Topic successfully submitted!');
      setTextInput(''); // Clear input field
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-5">
      <textarea
        id="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Suggest some topic ..."
        className="p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:focus:ring-blue-500"
        required
      ></textarea>
      <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 dark:bg-blue-700 dark:hover:bg-blue-900 dark:focus:ring-blue-600">Submit</button>
    </form>
  );
};

export default SubmitTopics;
