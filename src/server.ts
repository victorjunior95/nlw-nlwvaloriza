import "reflect-metadata";
import express from "express";
import { router } from "./routes";

import "./database";

// @types/express
const app = express();

app.use(express.json());
/* Métodos disponíveis para utilizar com o protocolo HTTP
> GET    - Buscar uma informação
> POST   - Inserir/criar uma informação
> PUT    - Alterar uma informação
> DELETE - Remover um dado
> PATCH  - Alterar uma informação específica (ex.: alterar somente a senha de um usuário, ou um avatar);
*/

// O primeiro parâmetro é um recurso(rota)
// O segundo parâmetro é uma arrow function
// app.get('/test', (request, response) => {
//   // Request - informações entrando como uma requisição do Client
  
//   // Response - informações saindo como resposta do Server
//   return response.send("Olá NLW");
// });

/* No Browser retorna um erro "Cannot GET /test-post",
porque quando acessamos um server pelo Browser, por padrão,
toda requisição que ele recebe serão requisições GET.
Por isso a necessidade de utilizar o Insomnia ou Postman
*/ 
// app.post('/test-post', (request, response) => {
//   return response.send("Olá NLW método POST");
// });

app.use(router);

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"));
