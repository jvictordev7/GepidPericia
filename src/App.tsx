import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Header from './components/Header';
import { FiClock, FiArchive, FiCheckCircle, FiMail } from 'react-icons/fi';
import './App.css';

const sheets = [
  {
    tipo: 'Celular',
    url: 'URL_DA_PLANILHA_CELULAR'
  },
  {
    tipo: 'Munição',
    url: 'URL_DA_PLANILHA_MUNICA'
  }
];

function maisDeUmAno(dataStr: string) {
  if (!dataStr) return false;
  const dataItem = new Date(dataStr);
  if (isNaN(dataItem.getTime())) return false;
  const hoje = new Date();
  const umAnoAtras = new Date(hoje.getFullYear() - 1, hoje.getMonth(), hoje.getDate());
  return dataItem < umAnoAtras;
}

function App() {
  const [vestigiosData, setVestigiosData] = useState<any[]>([]);
  const [tipoSelecionado, setTipoSelecionado] = useState('');

  const vestigioAtual = vestigiosData.find(v => v.tipo === tipoSelecionado);

  useEffect(() => {
    Promise.all(
      sheets.map(sheet =>
        fetch(sheet.url)
          .then(res => res.text())
          .then(csv => {
            const parsed = Papa.parse(csv, { header: true });
            return { tipo: sheet.tipo, itens: parsed.data.filter(row => Object.values(row).some(Boolean)) };
          })
      )
    ).then(setVestigiosData);
  }, []);

  const colunas = vestigioAtual?.itens && vestigioAtual.itens.length > 0
    ? Object.keys(vestigioAtual.itens[0])
    : [];

  const campoData = colunas.find(c =>
    c.toLowerCase().includes('data')
  ) || 'data';

  const alertaMaisDeUmAno = vestigioAtual?.itens.filter(
    (i: any) => maisDeUmAno(i[campoData])
  ).length ?? 0;

  const pendentes = vestigioAtual?.itens.filter(
    (i: any) =>
      (i.requisição === 'X' ||
        i.requisicao === 'X' ||
        i['Requisição'] === 'X' ||
        i['REQUISIÇÃO'] === 'X')
  ).length ?? 0;

  return (
    <>
      <Header />
      <div className="content">
        <h1>Gestão automatizada de vestígios</h1>
        <h2 className="subtitle">
          Controle, consulte e organize vestígios de forma eficiente e segura.
        </h2>

        <div className="tipo-vestigio-container">
          <label htmlFor="tipoVestigio" className="tipo-vestigio-label">Tipo de vestígio:</label>
          <select
            id="tipoVestigio"
            className="tipo-vestigio-select"
            value={tipoSelecionado}
            onChange={e => setTipoSelecionado(e.target.value)}
          >
            <option value="" disabled>Selecione o tipo de vestígio...</option>
            {vestigiosData.map(v => (
              <option key={v.tipo} value={v.tipo}>{v.tipo}</option>
            ))}
          </select>
        </div>

        <div className="cards-panel">
          <div className="card resumo">
            <span className="card-icon"><FiClock /></span>
            <div>
              <div className="card-number">{tipoSelecionado ? pendentes : 0}</div>
              <div className="card-label">Pendentes</div>
            </div>
          </div>
          <div className="card resumo">
            <span className="card-icon"><FiArchive /></span>
            <div>
              <div className="card-number">{tipoSelecionado ? alertaMaisDeUmAno : 0}</div>
              <div className="card-label">Aguardando Destinação</div>
            </div>
          </div>
          <div className="card resumo">
            <span className="card-icon"><FiCheckCircle /></span>
            <div>
              <div className="card-number">{vestigioAtual?.itens.length ?? 0}</div>
              <div className="card-label">Total</div>
            </div>
          </div>
        </div>

        <div className="alert-card">
          <span className="alert-icon"><FiMail /></span>
          <span className="alert-text">
            <strong>Alerta:</strong> {alertaMaisDeUmAno} vestígios armazenados há mais de 1 ano
          </span>
          <button className="alert-btn">Gerar Relatórios</button>
        </div>

        <div className="table-container">
          <h2 className="table-title">Vestígios - {tipoSelecionado}</h2>
          <table className="vestigios-table">
            <thead>
              <tr>
                {colunas.length > 0 ? (
                  colunas.map(col => <th key={col}>{col.toUpperCase()}</th>)
                ) : (
                  <th>Nenhuma coluna encontrada</th>
                )}
              </tr>
            </thead>
            <tbody>
              {vestigioAtual?.itens.length > 0 ? (
                vestigioAtual.itens.map((item: any, idx: number) => (
                  <tr key={idx}>
                    {colunas.map(col => (
                      <td key={col}>
                        {(item[col] ?? '').toString().trim()}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={colunas.length || 1} style={{ textAlign: 'center' }}>Nenhum vestígio encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default App;