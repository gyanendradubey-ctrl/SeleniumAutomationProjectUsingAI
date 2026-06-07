import React, { useState } from 'react';

export default function App() {
  const [jiraId, setJiraId] = useState('KAN-1');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Settings state for dynamic runtime injection
  const [config, setConfig] = useState({
    jiraUrl: '',
    jiraEmail: '',
    jiraToken: '',
    groqKey: ''
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('http://localhost:8787/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jiraId, config })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveToServer = async () => {
    try {
      const response = await fetch('http://localhost:8787/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jiraId, testPlan: result.testPlan })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Saved successfully to:\n${data.path}`);
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (err) {
      alert(`Error saving to server: ${err.message}`);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!result || !result.markdown) return;
    const blob = new Blob([result.markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-plan-${jiraId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui, sans-serif', maxWidth: '800px', margin: 'auto' }}>
      <h1>B.L.A.S.T. QA Test Plan Generator</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Settings Configuration (Overrides .env)</h3>
        <div style={{ display: 'grid', gap: '10px' }}>
          <input placeholder="Jira URL (e.g. https://your-domain.atlassian.net)" onChange={e => setConfig({...config, jiraUrl: e.target.value})} />
          <input placeholder="Jira Email" type="email" onChange={e => setConfig({...config, jiraEmail: e.target.value})} />
          <input placeholder="Jira API Token" type="password" onChange={e => setConfig({...config, jiraToken: e.target.value})} />
          <input placeholder="GROQ API Key" type="password" onChange={e => setConfig({...config, groqKey: e.target.value})} />
        </div>
      </div>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#eef2f5', borderRadius: '8px' }}>
        <h3>Fetch & Generate</h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={jiraId} onChange={e => setJiraId(e.target.value)} placeholder="JIRA ID (e.g. KAN-1)" />
          <button onClick={handleGenerate} disabled={loading} style={{ padding: '8px 16px', cursor: 'pointer' }}>
            {loading ? 'Processing...' : 'Generate Plan'}
          </button>
        </div>
      </div>

      {error && <div style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</div>}

      {result && (
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ color: 'green' }}>Generation Successful</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4>Source Issue Data: {result.jira.summary}</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleDownloadMarkdown} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                Download .md
              </button>
              <button onClick={handleSaveToServer} style={{ padding: '5px 10px', cursor: 'pointer' }}>
                Save to Server
              </button>
            </div>
          </div>
          <div style={{ background: '#282c34', color: '#abb2bf', padding: '15px', borderRadius: '8px', overflowX: 'auto' }}>
            <pre>
              {JSON.stringify(result.testPlan, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}