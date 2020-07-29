import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { User } from "../entity/User";
import TokenService from "../utils/TokenService";
import { UserRole } from "../types/user";

type Input = {
  email: string,
  password: string,
  role: string,
};

class AuthController {

  static signUp = async (root: any, args: { input: Input }) => {
    const { email, password, role } = args.input
    const userRepository = getRepository(User)

    const duplicates = await userRepository.find({ where:  `"email" ILIKE '${email}'` });
    if(duplicates.length)  throw new Error("Email en uso");

    const user = new User();

    user.email = email;
    user.password = password;
    user.role = role === UserRole.VETERINARIAN ? UserRole.VETERINARIAN : UserRole.USER;

    const errors = await validate(user);
    if (errors.length > 0) {
      console.log(errors)
      throw new Error(JSON.stringify(errors));
    }


    try {
      user.hashPassword();
      await userRepository.save(user);
      console.log(user);
      const token = TokenService.signToken(user, role);
      return { message: "Cuenta creada", token }
    } catch (e) {
      throw new Error(JSON.stringify(e));
    }
  };

  static login = async (root: any, args: { input: Input }) => {
    const { email, password } = args.input;
    const userRepository = getRepository(User)
    let user: User;

    if (!(email && password)) {
      throw new Error("Contraseña o Email vacios");
    }

    try {
      user = await userRepository.findOneOrFail({ where:  `"email" ILIKE '${email}'` });
    } catch (error) {
      throw new Error("El Usuario no existe o su contraseña es incorrecta");
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      throw new Error("El Usuario no existe o su contraseña es incorrecta");
    }

    try {
      const token = TokenService.signToken(user, user.role);
  
      return {
        data: { ...user, token },
        message: "Ha iniciado session correctamente",
      }
    } catch(e) {
      console.log(e);
      throw new Error("Error interno del servidor");
    }

  };
}
export default AuthController;
