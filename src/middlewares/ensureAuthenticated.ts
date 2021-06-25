import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;
  // console.log(token);

  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRhbmlAZGFuaS5jb20uYnIiLCJpYXQiOjE2MjQ2NDg1NDUsImV4cCI6MTYyNDczNDk0NSwic3ViIjoiZjhlZDEwNzgtM2NhNi00YmM2LTgxMTAtOGU4OWM4MTE2NjU2In0.u1RQkD81A99X8UcfVBGJiFVm5R3-Ar17XKOR47YT1Uk
  const [, token] = authToken.split(" ");
  // Como o ".split()" retornará um array com duas posições ['Bearer', 'eyJhbGc...']
  // Na atribuição está se ignorando a primeira posição e atribuindo a segunda posição o alias token
  try {
    // Validar se o token é válido
    const { sub } = verify(token, "4f93ac9d10cb751b8c9c646bc9dbccb9") as IPayload;
    // Se o token for inválido, automaticamente cai no catch

    request.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }


  // Recuperar informações do usuário

  // response.status(401).json({ error: "Unauthorized" });
}