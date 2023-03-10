<h1>iBlog - API</h1>

<p>Esse projeto consiste na API desenvolvida para uma aplicação de blog construída com Fastify e Prisma, utilizando o TypeScript como linguagem.</p>


<h2>🏗️ | Funcionalidades Incluídas</h2>

- Criptografia de Senhas
- Autenticação com JWT
- CRUD das entidades de Usuário, Post e Categoria.
- Casos de Uso para favoritar posts.

<h2>🛠 | Bibliotecas e Tecnologias Utilizadas</h2>

- NodeJS
- TypeScript
- Fastify
- PrismaORM
- Zod
- JSON Web Token
- CryptoTS

<h2>✔ | Requisitos</h2>

- Editor de Códigos
- NodeJS
- Git
- Ferramenta para testes de API(como Postman, Insomnia)

<h2> 🖥 | Rodando Localmente </h2>

### Instalação

```bash
$ npm install
```

### Configurando o Banco
Crie o arquivo `.env` e insira os dados

```bash
DATABASE_URL=
```

### Migrando o Banco

```bash
npx prisma migrate dev
```

### Excutando o projeto

```bash
$ npm run dev
```

<h2>🛣️ | Endpoints</h2>


<h3>Posts</h3>

<table>
  <tr>
   <td>Entidade</td>
   <td>Rota</td>
   <td>Parâmetros</td>
   <td>Método</td>
   <td>Retorno</td>
    </tr>
    <tr>
   <td>POST</td>
   <td>
 /posts
   </td>
   <td>Nenhum</td>
   <td>GET</td>
   <td>Retorna todos os posts cadastrados.</td>
    </tr>
     <tr>
   <td>POST</td>
   <td>/posts</td>
   <td>Nenhum</td>
   <td>POST</td>
   <td>Criação de um Post.</td>
    </tr> 
     <tr>
   <td>POST</td>
   <td>/posts/:id</td>
   <td>ID do Post</td>
   <td>GET</td>
   <td>Retorna um post  de acordo com seu ID.</td>
    </tr>
      <tr>
   <td>POST</td>
   <td>/posts/:id</td>
   <td>ID do Post</td>
   <td>PUT</td>
   <td>Atualiza o Post através do seu ID.</td>
    </tr>
     <tr>
   <td>POST</td>
   <td>/posts/:id</td>
   <td>ID do Post</td>
   <td>DELETE</td>
   <td>Deleta o Post através do seu ID.</td>
    </tr>
    </table>
    
    
   <h3>Auth</h3>
    
    
<table>
  <tr>
   <td>Entidade</td>
   <td>Rota</td>
   <td>Parâmetros</td>
   <td>Método</td>
   <td>Retorno</td>
    </tr>
    <tr>
   <td>AUTH</td>
   <td>
 /me
   </td>
   <td>Nenhum</td>
   <td>GET</td>
   <td>Retorna os dados do usuário autenticado.</td>
    </tr>
     <tr>
   <td>AUTH</td>
   <td>/signin</td>
   <td>Nenhum</td>
   <td>POST</td>
   <td>Autentica o usuário.</td>
    </tr> 
    </table>
    
  <h3>Categorias</h3>
    
<table>
  <tr>
   <td>Entidade</td>
   <td>Rota</td>
   <td>Parâmetros</td>
   <td>Método</td>
   <td>Retorno</td>
    </tr>
    <tr>
   <td>CATEGORIA</td>
   <td>/categories</td>
   <td>Nenhum</td>
   <td>GET</td>
   <td>Retorna todas as categorias.</td>
    </tr>
     <tr>
   <td>CATEGORIA</td>
   <td>/categories/:name</td>
   <td>Nome da Categoria</td>
   <td>GET</td>
   <td>Retorna uma categoria por nome.</td>
    </tr> 
    <tr>
   <td>CATEGORIA</td>
   <td>/categories</td>
   <td>Nenhum</td>
   <td>POST</td>
   <td>Cria uma nova categoria.</td>
    </tr> 
    </table>

## 👤 | Autor

<table>
  <tr>
    <td align="center"><a href="https://github.com/igorviniciussantana"><img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/86114583?v=4" width="100px;" alt=""/><br /><sub><b>Igor Vinicius</b></sub></a><br /><br /><a href="https://linkedin.com/in/igorviniciussantana"><img src="https://user-images.githubusercontent.com/86114583/192514843-1087a34f-74f9-46aa-94fa-e824950af81f.svg" width="20px"/></a>⠀<a href="mailto:igor.santana@estudante.ifms.edu.br"><img src="https://user-images.githubusercontent.com/86114583/192515071-4fa6bce6-6ee9-49ca-9395-c17e74075a20.svg" width="20px"/></a>⠀<a href="https://behance.net/igorvinicius8"><img src="https://user-images.githubusercontent.com/86114583/192515924-e754ab5f-d7bc-416f-a3f9-0b6e3e81eb6c.svg" width="20px"/></a>
    </td>
    </tr>
    </table>
