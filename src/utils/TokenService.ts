import * as jwt from "jsonwebtoken";
import { User } from "../entity/User";

class TokenService {
  static signToken({ id, email }: User, role: string = "user") {
    return jwt.sign({ userId: id, email, role }, process.env.JWT_SECRET as string);
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