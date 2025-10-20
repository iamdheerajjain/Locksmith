import { useState } from "react";

const ExportOptions = ({ darkMode }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportStatus, setExportStatus] = useState("");

  const handleExport = async (type, format) => {
    setIsExporting(true);
    setExportStatus(`Exporting ${type} as ${format.toUpperCase()}...`);

    try {
      // Use the correct endpoint path (relative to the base URL)
      const endpoint = `/export/${type}/${format}`;
      const response = await fetch(endpoint);
      
      if (response.ok) {
        const blob = new Blob([
          await response.arrayBuffer()
        ], {
          type: format === 'pdf' ? 'application/pdf' : 'text/csv'
        });
        
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `locksmith-${type}.${format}`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setExportStatus(`Exported ${type} as ${format.toUpperCase()} successfully!`);
      } else {
        setExportStatus(`Failed to export ${type} as ${format.toUpperCase()}`);
      }
    } catch (error) {
      console.error("Export error:", error);
      setExportStatus(`Error exporting ${type} as ${format.toUpperCase()}`);
    } finally {
      setTimeout(() => {
        setIsExporting(false);
        setExportStatus("");
      }, 3000);
    }
  };

  return (
    <div className="card-primary p-8 mt-8 smooth-fade-in">
      <h2 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 pb-2 border-b border-light-border dark:border-dark-border">
        Export Options
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password History Export */}
        <div className="bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 border border-light-border dark:border-dark-border p-6 rounded-2xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 hover-lift">
          <div className="flex items-center space-x-4 mb-5">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
                Password History
              </h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
                Export your generated passwords
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => handleExport('history', 'pdf')}
              disabled={isExporting}
              className="flex-1 px-4 py-3 bg-gradient-primary text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover-lift disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              PDF
            </button>
            <button
              onClick={() => handleExport('history', 'csv')}
              disabled={isExporting}
              className="flex-1 px-4 py-3 bg-gradient-secondary text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover-lift disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              CSV
            </button>
          </div>
        </div>
        
        {/* Password Expiration Export */}
        <div className="bg-gradient-to-br from-light-background to-light-secondary/20 dark:from-dark-background dark:to-dark-secondary/20 border border-light-border dark:border-dark-border p-6 rounded-2xl hover:from-light-surfaceHover hover:to-light-secondary/30 dark:hover:from-dark-surfaceHover dark:hover:to-dark-secondary/30 transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-1 hover-lift">
          <div className="flex items-center space-x-4 mb-5">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-light-text dark:text-dark-text">
                Password Expirations
              </h3>
              <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
                Export your password expiration reminders
              </p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => handleExport('expiration', 'pdf')}
              disabled={isExporting}
              className="flex-1 px-4 py-3 bg-gradient-primary text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover-lift disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              PDF
            </button>
            <button
              onClick={() => handleExport('expiration', 'csv')}
              disabled={isExporting}
              className="flex-1 px-4 py-3 bg-gradient-secondary text-white rounded-xl font-bold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 hover-lift disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              CSV
            </button>
          </div>
        </div>
      </div>
      
      {/* Export Status */}
      {exportStatus && (
        <div className="mt-6 p-4 bg-gradient-to-br from-pastelPurple/10 to-lightSteelBlue/10 dark:from-pastelPurple/5 dark:to-lightSteelBlue/5 rounded-xl border border-pastelPurple/20 dark:border-lightSteelBlue/10 smooth-fade-in">
          <div className="flex items-center space-x-3">
            {isExporting ? (
              <svg className="animate-spin w-5 h-5 text-pastelPurple" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            <span className="text-sm font-bold text-light-text dark:text-dark-text">
              {exportStatus}
            </span>
          </div>
        </div>
      )}
      
      <div className="mt-6 p-5 bg-gradient-to-br from-pastelPurple/10 to-lightSteelBlue/10 dark:from-pastelPurple/5 dark:to-lightSteelBlue/5 rounded-2xl border border-pastelPurple/20 dark:border-lightSteelBlue/10">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text mb-2">
              Privacy Note
            </h3>
            <p className="text-light-textSecondary dark:text-dark-textSecondary text-sm">
              Exported files contain sensitive information. Store them securely and delete them when no longer needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;