import React, { useState } from 'react';
import { Download, Upload, X, Minus, Maximize2 } from 'lucide-react';

type ConversionOption = {
  from: string;
  to: string;
  label: string;
};

const conversionOptions: ConversionOption[] = [
  { from: 'pdf', to: 'docx', label: 'PDF to DOCX' },
  { from: 'docx', to: 'pdf', label: 'DOCX to PDF' },
  { from: 'doc', to: 'pdf', label: 'DOC to PDF' },
  { from: 'doc', to: 'docx', label: 'DOC to DOCX' },
  { from: 'docx', to: 'doc', label: 'DOCX to DOC' },
  { from: 'jpg', to: 'pdf', label: 'JPG to PDF' },
  { from: 'png', to: 'pdf', label: 'PNG to PDF' },
];

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [converting, setConverting] = useState(false);
  const [converted, setConverted] = useState(false);
  const [selectedConversion, setSelectedConversion] = useState<string>(conversionOptions[0].label);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setConverted(false);
    }
  };

  const handleConvert = () => {
    setConverting(true);
    setTimeout(() => {
      setConverting(false);
      setConverted(true);
    }, 2000);
  };

  const handleDownload = () => {
    if (!file || !converted) return;
    
    const option = conversionOptions.find(opt => opt.label === selectedConversion);
    if (!option) return;

    const dummyContent = 'Converted file content';
    const blob = new Blob([dummyContent], { type: 'application/octet-stream' });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const originalName = file.name.substring(0, file.name.lastIndexOf('.'));
    
    link.download = `${originalName}.${option.to}`;
    link.href = url;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-teal-600 p-4 font-['MS_Sans_Serif'] flex flex-col">
      {/* Header */}
      <div className="max-w-2xl mx-auto w-full mb-4">
        <div className="bg-gray-200 border-2 border-gray-900 p-4 shadow-win92">
          <h1 className="text-2xl font-bold text-center text-navy-blue">
            Welcome to the Retro File Converter
          </h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto w-full relative flex-grow">
        {/* Loading Overlay */}
        {converting && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-90 z-50 flex items-center justify-center border-2 border-gray-900">
            <div className="bg-white p-8 border-2 border-gray-900 shadow-win92">
              <div className="flex flex-col items-center gap-4">
                <div className="w-8 h-8 border-4 border-navy-blue border-t-transparent animate-spin rounded-full"></div>
                <p className="text-lg font-bold">Converting...</p>
                <p>Please wait while we process your file</p>
              </div>
            </div>
          </div>
        )}

        {/* Window Container */}
        <div className="bg-gray-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-gray-900">
          {/* Title Bar */}
          <div className="bg-navy-blue px-2 py-1 flex items-center justify-between border-b-2 border-gray-900">
            <div className="text-white font-bold flex items-center gap-2">
              <Upload size={16} />
              File Converter Pro v1.0
            </div>
            <div className="flex gap-1">
              <button className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-900 px-2 hover:bg-gray-300">
                <Minus size={14} />
              </button>
              <button className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-900 px-2 hover:bg-gray-300">
                <Maximize2 size={14} />
              </button>
              <button className="bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-900 px-2 hover:bg-gray-300">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="bg-white border-2 border-gray-900 p-4 mb-4">
              <h2 className="text-xl mb-4 font-bold">Welcome to File Converter Pro!</h2>
              <p className="mb-4">Select conversion type:</p>
              <select 
                value={selectedConversion}
                onChange={(e) => setSelectedConversion(e.target.value)}
                className="w-full mb-4 px-2 py-1 border-2 border-gray-900 bg-white"
              >
                {conversionOptions.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload Section */}
            <div className="bg-white border-2 border-gray-900 p-4 mb-4">
              <div className="border-2 border-dashed border-gray-400 p-8 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-900 px-4 py-2 inline-flex items-center gap-2 hover:bg-gray-300"
                >
                  <Upload size={16} />
                  Choose File
                </label>
                {file && <p className="mt-2">Selected: {file.name}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handleConvert}
                disabled={!file || converting}
                className={`bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-900 px-4 py-2 flex items-center gap-2 ${
                  (!file || converting) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
                }`}
              >
                Convert
              </button>
              <button
                onClick={handleDownload}
                disabled={!file || converting || !converted}
                className={`bg-gray-200 border-t-2 border-l-2 border-white border-r-2 border-b-2 border-gray-900 px-4 py-2 flex items-center gap-2 ${
                  (!file || converting || !converted) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
                }`}
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>

          {/* Status Bar */}
          <div className="border-t-2 border-gray-900 p-2 bg-gray-200">
            {converting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent animate-spin rounded-full"></div>
                Converting...
              </div>
            ) : (
              <p>{converted ? 'Conversion complete! Click Download to save your file.' : 'Ready'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-2xl mx-auto w-full mt-4">
        <div className="bg-gray-200 border-2 border-gray-900 p-2 shadow-win92">
          <p className="text-center text-navy-blue">
            This website made by ebrardev
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;