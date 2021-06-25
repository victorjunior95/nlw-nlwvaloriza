import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);
    // Verificar se email existe
    const user = await usersRepositories.findOne({ email });
    if (!user) {
      throw new Error("Email/Password incorrect");
    }

    // Verificar se password está correto
      // compare() - compara a senha do usuário com sua versão "hasheada" pela biblioteca bcryptjs
      // retorna um boolean
    const passwordMatch = await compare(password, user.password)
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect");
    }

    // Gerar o Token
      // sign() - recebe dois parâmetros e um opcional 
        // O primeiro é o dado que será passado dentro do Payload
        // O segundo é a chave secreta (www.md5hashgenerator.com)
    const token = sign({
      email: user.email,
    }, "4f93ac9d10cb751b8c9c646bc9dbccb9",{
      // Recebe o ID do usuário
      subject: user.id,
      // Tempo de expiração do token (1 dia)
      expiresIn: "1d"
    });

    return token;
  }
}

export { AuthenticateUserService };