// src/components/ReportsLayout/ReportsLayout.js
import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  // Sample data for reports
  const reports = [
    { id: 1, doctorName: 'Dr. John Doe', specialty: 'Cardiology', reportUrl: '/patient_report.pdf' },
    { id: 2, doctorName: 'Dr. Jane Smith', specialty: 'Dermatology', reportUrl: '/patient_report.pdf' },
    // Add more reports as needed
  ];

  const handleViewReport = (url) => {
    window.open(url, '_blank'); // Open report in a new tab
  };

  return (
    <div className="reports-layout">
      <table className="reports-table">
        <h2>Your Reports</h2>
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
            {reports.map((report) => (
                <tr key={report.id}>
                    <td>{report.doctorName}</td>
                    <td>{report.specialty}</td>
                    <td>
                        <div className="button-container">
                            <button onClick={() => handleViewReport(report.reportUrl)}>View</button>
                        </div>
                    </td>
                    <td>
                        <div className="button-container">
                            <a href={report.reportUrl} download={`report_${report.id}.pdf`}>
                                <button>Download</button>
                            </a>
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;