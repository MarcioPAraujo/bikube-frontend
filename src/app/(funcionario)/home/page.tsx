'use client';

import { api } from '@/services/api';

const HomePage = () => {
  const handleGeneratePdf = async () => {
    const endpoint = '/espelho/gerarPDF';

    const body = {
      idespelho: 1,
    };

    try {
      const response = await api.post(endpoint, body, {
        responseType: 'blob', // Important for binary data
      });

      // Create a URL for the blob
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' }),
      );

      // Create a link element
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'espelho.pdf'); // Set the file name

      // Append to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up and remove the link
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <button type="button" onClick={handleGeneratePdf}>
        gerar pdf
      </button>
    </div>
  );
};

export default HomePage;
