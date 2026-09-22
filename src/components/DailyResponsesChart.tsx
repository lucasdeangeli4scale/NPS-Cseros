import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

interface DailyResponsesChartProps {
  data: any[];
}

export default function DailyResponsesChart({ data }: DailyResponsesChartProps) {
  // Aggregate data by date
  const aggregated = data.reduce((acc: any, curr: any) => {
    // Corrected key: use 'Data e Hora' as updated in the table
    const rawValue = curr['Data e Hora'];
    
    if (!rawValue) return acc;

    // Normalize format: Replace space with T if it matches YYYY-MM-DD HH:MM
    const normalizedValue = typeof rawValue === 'string' && rawValue.includes(' ') && !rawValue.includes('T') 
      ? rawValue.replace(' ', 'T') 
      : rawValue;

    let rawDate = new Date(normalizedValue);
    
    // Fallback: If invalid date, try parsing dd/mm/yyyy
    if (isNaN(rawDate.getTime()) && typeof rawValue === 'string' && rawValue.includes('/')) {
        const parts = rawValue.split(/[\/\s:]/);
        const [day, month, year] = parts;
        rawDate = new Date(`${year}-${month}-${day}`);
    }

    // Ensure we have a valid date
    if (isNaN(rawDate.getTime())) {
      return acc;
    }
    
    // Store as ISO string for sorting, format as pt-BR for display
    const dateKey = rawDate.toISOString().split('T')[0];
    const displayDate = rawDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    
    if (!acc[dateKey]) {
      acc[dateKey] = { displayDate, count: 0 };
    }
    acc[dateKey].count += 1;
    return acc;
  }, {});

  const chartData = Object.keys(aggregated).map(dateKey => ({
    dateKey,
    date: aggregated[dateKey].displayDate,
    count: aggregated[dateKey].count
  })).sort((a, b) => a.dateKey.localeCompare(b.dateKey));

  if (chartData.length === 0) {
    return <div className="p-4 text-center text-slate-500">Sem dados para exibir no gráfico.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }}>
            <LabelList dataKey="count" position="top" />
        </Line>
      </LineChart>
    </ResponsiveContainer>
  );
}
