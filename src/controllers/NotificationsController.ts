import { getRepository } from "typeorm";
import { Notification } from "../entity/Notification";
import { User } from "../entity/User";

class NotificationsController {
  static getAll =  async (parent: any, args: any, context: { userData: { id: number } }) => {
    try {
			const me = new User();
			me.id = context?.userData?.id;

      const notifications = await getRepository(Notification).find({ user: me });

      return notifications;
    } catch(e) {
      throw new Error(JSON.stringify(e));
    }
  };
};

export default NotificationsController;