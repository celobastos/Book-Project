# Projeto de Recomendação de Livros

Este projeto é uma **Aplicação Web de Recomendação de Livros**, desenvolvida utilizando **React** no frontend e **Node.js** com **SQLite** no backend. Ele permite que os usuários gerenciem suas coleções pessoais de livros, incluindo a adição, edição e exclusão de livros. O projeto também integra a **API do Google Books** para obter informações adicionais sobre os livros, como imagens de capa e resenhas.

## Funcionalidades

- **Coleção Pessoal de Livros**: Os usuários podem adicionar livros à sua biblioteca pessoal, editar os detalhes e excluir livros.
- **Integração com Google Books**: Ao adicionar ou editar um livro, o aplicativo busca dados, como imagens de capa, da API do Google Books.
- **Modal de Detalhes do Livro**: Exibe informações detalhadas sobre o livro, incluindo título, autor, imagem de capa e resenhas.
- **Scroll Infinito**: O aplicativo implementa carregamento dinâmico de mais livros à medida que o usuário rola a página.
- **Funcionalidade de Busca**: Os usuários podem buscar livros por título ou autor.

## Tecnologias Utilizadas

### Frontend:
- **React**
- **TypeScript**
- **CSS Modules**
- **Axios** para chamadas de API

### Backend:
- **Node.js** com **Express**
- **SQLite** como banco de dados

### Integrações:
- **API do Google Books** para buscar informações adicionais dos livros

## Instalação

### Pré-requisitos:
- **Node.js**
- **npm** ou **yarn**

### Passos para rodar o projeto:

1. Clone o repositório

2. Acesse a pasta do projeto:
   ```bash
   cd book-project
   ```

3. Instale as dependências do frontend:
   ```bash
   cd frontend-book-recommendation
   npm install
   ```

4. Instale as dependências do backend:
   ```bash
   cd book-recommendation-api
   npm install
   ```

5. Inicie o servidor do backend:
   ```bash
   npx tsc
   node dist/server.js
   ```

6. Inicie o frontend:
   ```bash
   cd ../frontend-book-recommendation
   npm start
   ```

## Uso

- **Adição de Livros**: Acesse a página principal e clique no botão **Add New Book**. Preencha os detalhes do livro e salve. A API do Google Books será chamada automaticamente para buscar uma imagem de capa, se disponível.
- **Edição de Livros**: Clique em um livro para visualizar seus detalhes. Use o botão **Edit** para modificar as informações.
- **Exclusão de Livros**: Na mesma janela de detalhes, clique no botão **Delete** para remover o livro da coleção.


## Rotas da API

- **GET /books**: Retorna todos os livros da coleção.
- **POST /books**: Adiciona um novo livro à coleção.
- **PUT /books/:id**: Atualiza os detalhes de um livro existente.
- **DELETE /books/:id**: Remove um livro da coleção.
