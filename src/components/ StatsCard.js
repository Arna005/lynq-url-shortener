import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

export default function StatsCard({ links }) {
  //Prepares link data for visualization
  const getChartData = () => {
    return links.map(link => ({
      name: link.shortUrl.replace('lynq/', ''),
      clicks: link.clicks,
    }));
  };

  return (
    <div className="stats-card">
      <h3>Link Analytics</h3>
      {links.length > 0 ? (
        <div style={{ height: 250 }} aria-label="Click statistics chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Bar 
                dataKey="clicks" 
                fill="#2563eb" 
                radius={[4, 4, 0, 0]} 
                name="Clicks"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="no-data">Shorten some URLs to see analytics</p>
      )}
    </div>
  );
}