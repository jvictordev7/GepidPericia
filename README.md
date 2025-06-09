# 🕵️‍♂️ GepidPericia

**GepidPericia** é uma aplicação web para gestão automatizada de vestígios, desenvolvida para facilitar o controle, consulta e organização de vestígios periciais de forma eficiente, segura e centralizada.

---

## ✨ Funcionalidades

- **Importação automática de dados** via Google Sheets (Celular, Munição, etc.)
- **Visualização dinâmica** dos vestígios por tipo
- **Indicadores rápidos**: Pendentes, Aguardando Destinação, Total
- **Alertas automáticos** para vestígios armazenados há mais de 1 ano
- **Geração de relatórios** (em desenvolvimento)
- **Interface responsiva** e intuitiva

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### 2. Instalação

Clone o repositório:

```sh
git clone https://github.com/seu-usuario/GepidPericia.git
cd GepidPericia
```

Instale as dependências:

```sh
npm install
# ou
yarn install
```

### 3. Rodando o projeto

Inicie o servidor de desenvolvimento:

```sh
npm start
# ou
yarn start
```

Acesse no navegador: [http://localhost:3000](http://localhost:3000)

---

## 📝 Como usar

1. **Selecione o tipo de vestígio** no menu suspenso (Celular, Munição, etc.).
2. Visualize os cards com os totais:
   - **Pendentes:** Vestígios com requisição pendente (marcados com "X").
   - **Aguardando Destinação:** Vestígios armazenados há mais de 1 ano.
   - **Total:** Todos os vestígios do tipo selecionado.
3. Consulte a tabela detalhada com todos os dados importados.
4. Utilize o botão de alerta para gerar relatórios (em breve).

---

## 🗂️ Estrutura do Projeto

```
GepidPericia/
├── public/
├── src/
│   ├── components/
│   │   └── Header.tsx
│   ├── App.tsx
│   ├── App.css
│   └── ...
├── package.json
└── README.md
```

---

## ⚙️ Configuração dos dados

Os dados são importados automaticamente de planilhas Google Sheets.  
Para adicionar novos tipos de vestígios, edite o array `sheets` em `src/App.tsx`:

```js
const sheets = [
  {
    tipo: 'Celular',
    url: 'URL_DA_PLANILHA_CELULAR'
  },
  {
    tipo: 'Munição',
    url: 'URL_DA_PLANILHA_MUNICAO'
  }
  // Adicione mais tipos conforme necessário
];
```

---

## 💡 Personalização

- **Novos campos:** Basta adicionar colunas na planilha Google Sheets.
- **Novos tipos:** Adicione no array `sheets` em `App.tsx`.
- **Estilo:** Edite `App.css` para personalizar cores e layout.

---

## 🛡️ Licença

Este projeto é privado e de uso institucional.

---

## 👨‍💻 Autor

Desenvolvido por João Victor  
Equipe: GEPID

---