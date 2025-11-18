import React from 'react';
import ReactMarkdown from 'react-markdown';

function extractSchemes(raw) {
  const central = [];
  const state = [];
  if (!raw) return { central, state };
  const centralMarker = /Central Government Schemes/i;
  const stateMarker = /Government Schemes/i;
  const parts = raw.split(centralMarker);
  if (parts.length > 1) {
    const afterCentral = parts[1];
    const [centralBlock, rest] = afterCentral.split(stateMarker);
    if (centralBlock) {
      central.push(...centralBlock.split(/\*\*Scheme Name:\*\*/i).slice(1).map(s=>s.trim().split('\n')[0]));
    }
    if (rest) {
      state.push(...rest.split(/\*\*Scheme Name:\*\*/i).slice(1).map(s=>s.trim().split('\n')[0]));
    }
  }
  return { central, state };
}

export default function SchemeResults({ data }) {
  if (!data) return null;
  if (data.error) {
    return <p className="text-red-600">{data.error}</p>;
  }
  const { central, state } = extractSchemes(data.result);
  return (
    <div className="mt-6 flex justify-center">
      <div className="w-full max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Results</h2>
        {central.length || state.length ? (
          <div className="bg-gray-50 p-6 rounded-lg shadow space-y-6">
            {/* Central */}
            {central.length > 0 && (
              <div>
                <p className="font-semibold mb-2">a. Central Government Schemes</p>
                <ol className="list-decimal ml-5 space-y-1">
                  {central.slice(0,3).map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ol>
              </div>
            )}
            {/* State */}
            {state.length > 0 && (
              <div>
                <p className="font-semibold mb-2">b. State Government Schemes</p>
                <ol className="list-decimal ml-5 space-y-1">
                  {state.slice(0,3).map((name, idx) => (
                    <li key={idx}>{name}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg shadow overflow-auto max-h-[70vh]">
            <ReactMarkdown>{data.result || ''}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
