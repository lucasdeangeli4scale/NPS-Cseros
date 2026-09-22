import { useState } from 'react';

interface TablePageProps {
  data: any;
}

export default function TablePage({ data }: TablePageProps) {
  const list = data?.list || [];
  
  if (list.length === 0) return <div className="p-6">Sem dados para exibir.</div>;

  const allColumns = Object.keys(list[0]);
  // Incluir 'Data e Hora' nas colunas
  const columns = ['Id', 'Data e Hora', ...allColumns.filter(col => col !== 'Id' && col !== 'Data e Hora')];

  const transformedList = list.map((row: any) => {
    const newRow = { ...row };
    
    // Formatar 'Data e Hora' corretamente
    if (newRow['Data e Hora']) {
      const rawValue = newRow['Data e Hora'];
      const normalizedValue = typeof rawValue === 'string' && rawValue.includes(' ') && !rawValue.includes('T') 
        ? rawValue.replace(' ', 'T') 
        : rawValue;
        
      const date = new Date(normalizedValue);
      if (!isNaN(date.getTime())) {
        newRow['Data e Hora'] = date.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
      }
    }
    return newRow;
  });

  return (
    <div className="p-6 overflow-x-auto">
      <table className="w-full text-left border-collapse bg-white dark:bg-slate-800 rounded-xl shadow-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            {columns.map((col) => (
              <th 
                key={col} 
                className="p-4 font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transformedList.map((row: any, i: number) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
              {columns.map((col) => (
                <td 
                  key={col} 
                  className="p-4 text-slate-600 dark:text-slate-400 whitespace-nowrap"
                >
                  {String(row[col] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
