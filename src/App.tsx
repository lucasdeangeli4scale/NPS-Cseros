/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { LayoutDashboard, Table, HelpCircle } from 'lucide-react';
import axios from 'axios';
import DoughnutChart from './components/DoughnutChart';
import HorizontalBarChart from './components/HorizontalBarChart';
import TablePage from './components/TablePage';
import GaugeChart from './components/GaugeChart';

export default function App() {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState<'dashboard' | 'table'>('dashboard');

  useEffect(() => {
    // Fetch data from server proxy
    axios.get('/api/noco-data')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
      <header className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold">Pesquisa NPS - Cséros</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setPage('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${page === 'dashboard' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <LayoutDashboard size={18} /> Dados Gerais
            </button>
            <button 
              onClick={() => setPage('table')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${page === 'table' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <Table size={18} /> Tabela
            </button>
            
          </div>
        </header>

        <main className="p-6">
          {page === 'dashboard' ? (
            <div className="space-y-6">
              {/* Row 1: Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-sm text-slate-500">Total de respostas</h2>
                  <p className="text-3xl font-bold mt-2">{data?.list ? data.list.length : 0}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-sm text-slate-500">Experiência Média</h2>
                  <p className="text-3xl font-bold mt-2">10</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-sm text-slate-500">Média de recompra</h2>
                  <p className="text-3xl font-bold mt-2">4</p>
                </div>
              </div>

              {/* Row 2: NPS + Doughnut */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-bold">NPS Score</h2>
                    <div className="relative group">
                      <HelpCircle size={16} className="text-slate-400 cursor-help" />
                      <div className="absolute left-full ml-2 w-64 p-2 bg-slate-700 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        O NPS é calculado com base na média de satisfação dos clientes em relação aos nossos serviços.
                      </div>
                    </div>
                  </div>
                  <GaugeChart score={72} />
                  <p className="text-center text-slate-500 mt-4">Balanced Performance</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                  <h2 className="text-lg font-bold mb-4">Já usou antes</h2>
                  <DoughnutChart />
                </div>
              </div>

              {/* Row 3: Bar Chart */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-bold mb-4">Como recebeu</h2>
                <HorizontalBarChart />
              </div>
            </div>
          ) : (
            <TablePage data={data} />
          )}
        </main>
      </div>
  );
}
