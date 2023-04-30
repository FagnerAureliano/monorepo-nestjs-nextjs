# MonorepoNestjsNextjs
![Criaro por mim:](<https://img.shields.io/badge/Criado_por-Fagner_Aureliano-blue>)

![Mantenedor:](<https://img.shields.io/badge/Mantenedor-Fagner_Aureliano-blue>) ![Versão](https://img.shields.io/badge/Vers%C3%A3o-1.0.0-green)

<a href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **Projeto Monorepo Utilizando Nx** ✨

Este projeto é um monorepo construído com a ferramenta Nx, que permite gerenciar vários projetos relacionados em um único repositório. O monorepo contém dois projetos:

#### Projeto (SERVER)

O projeto SERVER utiliza Node.js. É responsável por conectar ao banco de dados PostgreSQL utilizando o Prisma, além de implementar a autenticação com JWT. O objetivo desse projeto é fornecer uma API para o frontend consumir. O projeto está configurado para rodar em modo de desenvolvimento com o seguinte comando:

#### Projeto (WEB) 
O projeto WEB React utiliza o Next.js como framework e o NextAuth para implementar a autenticação no frontend. Além disso, o projeto utiliza o Tailwind CSS para estilização. O objetivo desse projeto é consumir a API fornecida pelo projeto Node.js. O projeto está configurado para rodar em modo de desenvolvimento com o seguinte comando: 

###### Backend
Crie um arquivo `.env` na raiz do projeto SERVER e adicione as seguintes variáveis de ambiente:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/prisma"
JWT_SECRET="segredo_do_jwt"
```
 ###### Frontend
 Crie um arquivo `.env` na raiz do projeto WEB e adicione as seguintes variáveis de ambiente:
```
NEXTAUTH_URL="url da API"
JWT_SIGNIN_PRIVATE_KEY="segredo_do_jwt"
NEXTAUTH_SECRET="segredo_do_next_auth"
```

###### Execução
Para executar o servidor, execute o seguinte comando na raiz do projeto:

`npm run start:db`: para iniciar o banco de dados PostgreSQL utilizando o `Docker Compose`. <br/>
`npm run srart:prisma` para executar as migrações do banco de dados. <br/> 
`npm run start:server`: URL do backend. http://localhost:3333/api/v1 <br/>
`npm run start:web`: URL do frontend http://localhost:4200/<br/>
 