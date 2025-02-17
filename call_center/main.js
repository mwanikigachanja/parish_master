/** @jsxImportSource https://esm.sh/react@18.2.0 */
import React, { useState, useEffect, useRef } from "https://esm.sh/react@18.2.0";
import { createRoot } from "https://esm.sh/react-dom@18.2.0/client";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation,
  useNavigate 
} from "https://esm.sh/react-router-dom@6.16.0?deps=react@18.2.0,react-dom@18.2.0";

// Types for our call record and analysis
interface CallRecord {
  id?: number;
  date: string;
  name: string;
  contact: string;
  queryType: string;
  department: string;
  actionTaken: string;
  followUp: string;
  remarks: string;
}

interface CallAnalytics {
  totalCalls: number;
  queryTypeCounts: Record<string, number>;
  departmentCounts: Record<string, number>;
  averageCallsPerDay: number | null;
  mostFrequentQueryType: string;
  mostFrequentDepartment: string;
}

// Main server handler and default export
export default async function handler(request: Request): Promise<Response> {
  const { sqlite } = await import("https://esm.town/v/stevekrouse/sqlite");
  
  const url = new URL(request.url);
  const KEY = new URL(import.meta.url).pathname.split("/").at(-1);
  const SCHEMA_VERSION = 2;

  // Ensure table exists
  try {
    await sqlite.execute(`
      CREATE TABLE IF NOT EXISTS ${KEY}_call_records_${SCHEMA_VERSION} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        date TEXT NOT NULL,
        name TEXT NOT NULL,
        contact TEXT NOT NULL,
        query_type TEXT NOT NULL,
        department TEXT NOT NULL,
        action_taken TEXT,
        follow_up TEXT,
        remarks TEXT
      )
    `);
  } catch (error) {
    console.error('Table creation error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }

  // CSS definition
  const css = `
    :root {
      --primary-color: #3498db;
      --secondary-color: #2ecc71;
      --background-color: #f4f6f7;
      --text-color: #2c3e50;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      background-color: var(--background-color);
      color: var(--text-color);
    }

    .app-container {
      display: flex;
      min-height: 100vh;
    }

    .main-navigation {
      width: 250px;
      background-color: #2c3e50;
      color: white;
      padding: 20px;
    }

    .main-navigation .nav-logo {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 30px;
      text-align: center;
    }

    .main-navigation ul {
      list-style: none;
    }

    .main-navigation ul li {
      margin-bottom: 15px;
    }

    .main-navigation ul li a {
      color: white;
      text-decoration: none;
      display: block;
      padding: 10px;
      border-radius: 5px;
      transition: background-color 0.3s;
    }

    .main-navigation ul li.active a,
    .main-navigation ul li a:hover {
      background-color: var(--primary-color);
    }

    main {
      flex-grow: 1;
      padding: 20px;
      background-color: var(--background-color);
      overflow-y: auto;
    }

    .dashboard .analytics-snapshot {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin-bottom: 30px;
    }

    .stat-card {
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .stat-card h3 {
      margin-bottom: 10px;
      color: var(--text-color);
    }

    .stat-card p {
      font-size: 1.5em;
      font-weight: bold;
      color: var(--primary-color);
    }

    .record-form {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .form-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-bottom: 15px;
    }

    .record-form input, 
    .record-form select, 
    .record-form textarea {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .record-form button {
      width: 100%;
      padding: 12px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .record-form button:hover {
      background-color: #2980b9;
    }

    .recent-calls table, 
    .records-table {
      width: 100%;
      border-collapse: collapse;
      background-color: white;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .recent-calls th, 
    .recent-calls td,
    .records-table th, 
    .records-table td {
      border: 1px solid #ddd;
      padding: 12px;
      text-align: left;
    }

    .recent-calls th,
    .records-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    .analytics-page .detailed-analytics {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .analytics-card {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .distribution-bar {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    .distribution-bar .bar {
      background-color: var(--primary-color);
      height: 20px;
      margin-left: 10px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      padding-left: 5px;
      color: white;
    }

    .export-section {
      display: flex;
      gap: 15px;
    }

    .export-section button {
      padding: 10px 20px;
      background-color: var(--secondary-color);
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .export-section button:hover {
      background-color: #27ae60;
    }
  `;

  // Route handling
  switch (url.pathname) {
    case '/':
    case '/record-call':
    case '/analysis':
      return new Response(`
        <html>
          <head>
            <title>Resonance</title>
            <style>${css}</style>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script type="importmap">
              {
                "imports": {
                  "react": "https://esm.sh/react@18.2.0",
                  "react-dom": "https://esm.sh/react-dom@18.2.0",
                  "react-dom/client": "https://esm.sh/react-dom@18.2.0/client",
                  "react-router-dom": "https://esm.sh/react-router-dom@6.16.0?deps=react@18.2.0,react-dom@18.2.0"
                }
              }
            </script>
          </head>
          <body>
            <div id="root"></div>
            <script src="https://esm.town/v/std/catch"></script>
            <script type="module">
              import React from 'react';
              import { createRoot } from 'react-dom/client';
              import { 
                BrowserRouter as Router, 
                Routes, 
                Route, 
                Link, 
                useLocation,
                useNavigate 
              } from 'react-router-dom';

              function Navigation() {
                const location = useLocation();
                return React.createElement('nav', { className: 'main-navigation' },
                  React.createElement('div', { className: 'nav-logo' }, '🔊 Resonance'),
                  React.createElement('ul', null,
                    React.createElement('li', { className: location.pathname === '/' ? 'active' : '' },
                      React.createElement(Link, { to: '/' }, 'Dashboard')
                    ),
                    React.createElement('li', { className: location.pathname === '/record-call' ? 'active' : '' },
                      React.createElement(Link, { to: '/record-call' }, 'Record Call')
                    ),
                    React.createElement('li', { className: location.pathname === '/analysis' ? 'active' : '' },
                      React.createElement(Link, { to: '/analysis' }, 'Analytics')
                    )
                  )
                );
              }

              function Dashboard() {
                const [analytics, setAnalytics] = React.useState(null);
                const [recentCalls, setRecentCalls] = React.useState([]);
                const [isLoading, setIsLoading] = React.useState(true);

                React.useEffect(() => {
                  Promise.all([
                    fetch('/analytics').then(res => res.json()),
                    fetch('/recent-records').then(res => res.json())
                  ]).then(([analyticsData, callsData]) => {
                    setAnalytics(analyticsData);
                    setRecentCalls(callsData);
                    setIsLoading(false);
                  }).catch(error => {
                    console.error('Failed to fetch data:', error);
                    setIsLoading(false);
                  });
                }, []);

                if (isLoading) {
                  return React.createElement('div', null, 'Loading...');
                }

                return React.createElement('div', { className: 'dashboard' },
                  React.createElement('h1', null, 'Resonance Dashboard'),
                  analytics && React.createElement('div', { className: 'analytics-snapshot' },
                    React.createElement('div', { className: 'stat-card' },
                      React.createElement('h3', null, 'Total Calls'),
                      React.createElement('p', null, analytics.totalCalls || 0)
                    ),
                    React.createElement('div', { className: 'stat-card' },
                      React.createElement('h3', null, 'Most Frequent Query'),
                      React.createElement('p', null, analytics.mostFrequentQueryType || 'N/A')
                    ),
                    React.createElement('div', { className: 'stat-card' },
                      React.createElement('h3', null, 'Busiest Department'),
                      React.createElement('p', null, analytics.mostFrequentDepartment || 'N/A')
                    ),
                    React.createElement('div', { className: 'stat-card' },
                      React.createElement('h3', null, 'Avg Calls/Day'),
                      React.createElement('p', null, 
                        analytics.averageCallsPerDay !== null 
                          ? analytics.averageCallsPerDay.toFixed(1) 
                          : 'N/A'
                      )
                    )
                  ),
                  React.createElement('div', { className: 'recent-calls' },
                    React.createElement('h2', null, 'Recent Interactions'),
                    React.createElement('table', null,
                      React.createElement('thead', null,
                        React.createElement('tr', null,
                          React.createElement('th', null, 'Date'),
                          React.createElement('th', null, 'Name'),
                          React.createElement('th', null, 'Query Type'),
                          React.createElement('th', null, 'Department')
                        )
                      ),
                      React.createElement('tbody', null,
                        recentCalls.length > 0
                          ? recentCalls.slice(0, 5).map(call => 
                              React.createElement('tr', { key: call.id },
                                React.createElement('td', null, call.date),
                                React.createElement('td', null, call.name),
                                React.createElement('td', null, call.queryType),
                                React.createElement('td', null, call.department)
                              )
                            )
                          : React.createElement('tr', null,
                              React.createElement('td', { colSpan: 4 }, 'No recent calls')
                            )
                      )
                    )
                  )
                );
              }

              function RecordCall() {
                const [newRecord, setNewRecord] = React.useState({
                  date: new Date().toISOString().split('T')[0],
                  name: '',
                  contact: '',
                  queryType: '',
                  department: '',
                  actionTaken: '',
                  followUp: '',
                  remarks: ''
                });

                const navigate = useNavigate();

                const handleSubmit = async (e) => {
                  e.preventDefault();
                  try {
                    const response = await fetch('/add-record', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(newRecord)
                    });
                    const result = await response.json();
                    if (result.success) {
                      alert('Call recorded successfully!');
                      setNewRecord({
                        date: new Date().toISOString().split('T')[0],
                        name: '',
                        contact: '',
                        queryType: '',
                        department: '',
                        actionTaken: '',
                        followUp: '',
                        remarks: ''
                      });
                      navigate('/');
                    }
                  } catch (error) {
                    console.error('Error recording call:', error);
                    alert('Failed to record call');
                  }
                };

                return React.createElement('div', { className: 'record-call-page' },
                  React.createElement('h1', null, '📞 Record New Interaction'),
                  React.createElement('form', { onSubmit: handleSubmit, className: 'record-form' },
                    React.createElement('div', { className: 'form-grid' },
                      // Date input
                      React.createElement('input', {
                        type: 'date',
                        value: newRecord.date,
                        onChange: (e) => setNewRecord({...newRecord, date: e.target.value}),
                        required: true
                      }),
                      
                      // Name input
                      React.createElement('input', {
                        type: 'text',
                        placeholder: 'Name',
                        value: newRecord.name,
                        onChange: (e) => setNewRecord({...newRecord, name: e.target.value}),
                        required: true
                      }),
                      
                      // Contact input
                      React.createElement('input', {
                        type: 'tel',
                        placeholder: 'Contact Number',
                        value: newRecord.contact,
                        onChange: (e) => setNewRecord({...newRecord, contact: e.target.value}),
                        required: true
                      }),
                      
                      // Query Type select
                      React.createElement('select', {
                        value: newRecord.queryType,
                        onChange: (e) => setNewRecord({...newRecord, queryType: e.target.value}),
                        required: true
                      },
                        React.createElement('option', { value: '' }, 'Select Query Type'),
                        React.createElement('option', { value: 'support' }, 'Support'),
                        React.createElement('option', { value: 'sales' }, 'Sales'),
                        React.createElement('option', { value: 'billing' }, 'Billing'),
                        React.createElement('option', { value: 'technical' }, 'Technical')
                      ),
                      
                      // Department select
                      React.createElement('select', {
                        value: newRecord.department,
                        onChange: (e) => setNewRecord({...newRecord, department: e.target.value}),
                        required: true
                      },
                        React.createElement('option', { value: '' }, 'Select Department'),
                        React.createElement('option', { value: 'sales' }, 'Sales'),
                        React.createElement('option', { value: 'support' }, 'Support'),
                        React.createElement('option', { value: 'hr' }, 'HR'),
                        React.createElement('option', { value: 'finance' }, 'Finance')
                      ),
                      
                      // Action Taken input
                      React.createElement('input', {
                        type: 'text',
                        placeholder: 'Action Taken',
                        value: newRecord.actionTaken,
                        onChange: (e) => setNewRecord({...newRecord, actionTaken: e.target.value})
                      }),
                      
                      // Follow Up input
                      React.createElement('input', {
                        type: 'text',
                        placeholder: 'Follow Up',
                        value: newRecord.followUp,
                        onChange: (e) => setNewRecord({...newRecord, followUp: e.target.value})
                      })
                    ),
                    
                    // Remarks textarea
                    React.createElement('textarea', {
                      placeholder: 'Detailed Remarks',
                      value: newRecord.remarks,
                      onChange: (e) => setNewRecord({...newRecord, remarks: e.target.value})
                    }),
                    
                    // Submit button
                    React.createElement('button', { type: 'submit' }, 'Save Interaction')
                  )
                );
              }

              function AnalyticsPage() {
                const [analytics, setAnalytics] = React.useState(null);
                const [records, setRecords] = React.useState([]);
                const [isLoading, setIsLoading] = React.useState(true);

                React.useEffect(() => {
                  Promise.all([
                    fetch('/analytics').then(res => res.json()),
                    fetch('/records').then(res => res.json())
                  ]).then(([analyticsData, recordsData]) => {
                    setAnalytics(analyticsData);
                    setRecords(recordsData);
                    setIsLoading(false);
                  }).catch(error => {
                    console.error('Failed to fetch data:', error);
                    setIsLoading(false);
                  });
                }, []);

                const handleExport = async (format) => {
                  const response = await fetch(\`/export?format=\${format}\`);
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = \`resonance_records.\${format}\`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                };

                if (isLoading) {
                  return React.createElement('div', null, 'Loading...');
                }

                return React.createElement('div', { className: 'analytics-page' },
                  React.createElement('h1', null, '📊 Interaction Analytics'),
                  analytics && React.createElement('div', { className: 'detailed-analytics' },
                    React.createElement('div', { className: 'analytics-grid' },
                      React.createElement('div', { className: 'analytics-card' },
                        React.createElement('h3', null, 'Query Type Distribution'),
                        Object.entries(analytics.queryTypeCounts).map(([type, count]) => 
                          React.createElement('div', { key: type, className: 'distribution-bar' },
                            React.createElement('span', null, type),
                            React.createElement('div', { 
                              className: 'bar', 
                              style: { width: \`\${(count / analytics.totalCalls) * 100}%\` } 
                            }, count)
                          )
                        )
                      ),
                      React.createElement('div', { className: 'analytics-card' },
                        React.createElement('h3', null, 'Department Activity'),
                        Object.entries(analytics.departmentCounts).map(([dept, count]) => 
                          React.createElement('div', { key: dept, className: 'distribution-bar' },
                            React.createElement('span', null, dept),
                            React.createElement('div', { 
                              className: 'bar', 
                              style: { width: \`\${(count / analytics.totalCalls) * 100}%\` } 
                            }, count)
                          )
                        )
                      )
                    ),
                    React.createElement('div', { className: 'export-section' },
                      React.createElement('button', { onClick: () => handleExport('csv') }, 'Export CSV'),
                      React.createElement('button', { onClick: () => handleExport('json') }, 'Export JSON')
                    )
                  )
                );
              }

              function ResonanceApp() {
                return React.createElement(Router, null,
                  React.createElement('div', { className: 'app-container' },
                    React.createElement(Navigation, null),
                    React.createElement('main', null,
                      React.createElement(Routes, null,
                        React.createElement(Route, { path: '/', element: React.createElement(Dashboard, null) }),
                        React.createElement(Route, { path: '/record-call', element: React.createElement(RecordCall, null) }),
                        React.createElement(Route, { path: '/analysis', element: React.createElement(AnalyticsPage, null) })
                      )
                    )
                  )
                );
              }

              const root = createRoot(document.getElementById('root'));
              root.render(React.createElement(ResonanceApp, null));
            </script>
          </body>
        </html>
      `, {
        headers: { 
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      });

    // Route handlers for data operations
    case '/add-record':
      if (request.method === 'POST') {
        try {
          const record = await request.json();
          const result = await sqlite.execute(`
            INSERT INTO ${KEY}_call_records_${SCHEMA_VERSION} 
            (date, name, contact, query_type, department, action_taken, follow_up, remarks)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `, [
            record.date, 
            record.name, 
            record.contact, 
            record.queryType, 
            record.department, 
            record.actionTaken, 
            record.followUp, 
            record.remarks
          ]);
          
          return Response.json({ 
            success: true, 
            record: { ...record, id: result.lastInsertRowid } 
          });
        } catch (error) {
          console.error('Record insertion error:', error);
          return new Response('Internal Server Error', { status: 500 });
        }
      }
      return new Response('Method Not Allowed', { status: 405 });

    case '/analytics':
      try {
        const { rows: totalCallsRows } = await sqlite.execute(`
          SELECT COUNT(*) as total FROM ${KEY}_call_records_${SCHEMA_VERSION}
        `);

        const { rows: queryTypeRows } = await sqlite.execute(`
          SELECT query_type, COUNT(*) as count 
          FROM ${KEY}_call_records_${SCHEMA_VERSION} 
          GROUP BY query_type 
          ORDER BY count DESC
        `);

        const { rows: departmentRows } = await sqlite.execute(`
          SELECT department, COUNT(*) as count 
          FROM ${KEY}_call_records_${SCHEMA_VERSION} 
          GROUP BY department 
          ORDER BY count DESC
        `);

        const { rows: avgCallsRows } = await sqlite.execute(`
          SELECT 
            CASE 
              WHEN COUNT(*) > 0 THEN 
                ROUND(COUNT(*) / (julianday('now') - julianday(MIN(date))), 2)
              ELSE 
                NULL 
            END as avg_calls_per_day 
          FROM ${KEY}_call_records_${SCHEMA_VERSION}
        `);

        return Response.json({
          totalCalls: totalCallsRows[0].total,
          queryTypeCounts: Object.fromEntries(
            queryTypeRows.map(row => [row.query_type, row.count])
          ),
          departmentCounts: Object.fromEntries(
            departmentRows.map(row => [row.department, row.count])
          ),
          averageCallsPerDay: avgCallsRows[0].avg_calls_per_day,
          mostFrequentQueryType: queryTypeRows[0]?.query_type || 'N/A',
          mostFrequentDepartment: departmentRows[0]?.department || 'N/A'
        });
      } catch (error) {
        console.error('Analytics fetch error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }

    case '/recent-records':
      try {
        const { rows } = await sqlite.execute(`
          SELECT * FROM ${KEY}_call_records_${SCHEMA_VERSION}
          ORDER BY date DESC
          LIMIT 5
        `);
        return Response.json(rows);
      } catch (error) {
        console.error('Recent records fetch error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }

    case '/records':
      try {
        const { rows } = await sqlite.execute(`
          SELECT * FROM ${KEY}_call_records_${SCHEMA_VERSION}
          ORDER BY date DESC
        `);
        return Response.json(rows);
      } catch (error) {
        console.error('Records fetch error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }

    case '/export':
      try {
        const format = url.searchParams.get('format') || 'csv';
        const { rows } = await sqlite.execute(`
          SELECT * FROM ${KEY}_call_records_${SCHEMA_VERSION}
          ORDER BY date DESC
        `);

        if (format === 'json') {
          return new Response(JSON.stringify(rows), {
            headers: {
              'Content-Type': 'application/json',
              'Content-Disposition': 'attachment; filename=resonance_records.json'
            }
          });
        } else {
          const csvContent = [
            'Date,Name,Contact,Query Type,Department,Action Taken,Follow Up,Remarks',
            ...rows.map(row => 
              `${row.date},${row.name},${row.contact},${row.query_type},${row.department},${row.action_taken},${row.follow_up},${row.remarks}`
            )
          ].join('\n');

          return new Response(csvContent, {
            headers: {
              'Content-Type': 'text/csv',
              'Content-Disposition': 'attachment; filename=resonance_records.csv'
            }
          });
        }
      } catch (error) {
        console.error('Export error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }

    default:
      return new Response('Not Found', { status: 404 });
  }
}
