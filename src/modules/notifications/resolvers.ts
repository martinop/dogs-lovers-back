import NotificationsController from '../../controllers/NotificationsController';

export default {
  Query: {
    notifications: NotificationsController.getAll,
  },
}