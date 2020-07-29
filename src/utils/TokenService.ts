import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { UserRole } from "../types/user";

class TokenService {
  static signToken({ id, email }: User, role: string = UserRole.USER) {
    return jwt.sign({ id, email, role }, process.env.JWT_SECRET as string);
  }
  static verifyToken(token: string){
    try {
      return jwt.verify(token, process.env.JWT_SECRET as string)
    } catch (error) {
      return false
    }
  }
}

export default TokenService