import { UserRole } from "../types/user";

export const isAuthenticated = (next: any) => async (root: any, args: any, context: any, info: any) => {
  if (!context.userData) {
    throw new Error('UNAUTHORIZED');
  }
  return next(root, args, context, info);
};

export const isVeterinarian = (next: any) => async (root: any, args: any, context: any, info: any) => {
  if (!context.userData || context.userData.role !== UserRole.VETERINARIAN) {
    throw new Error('UNAUTHORIZED');
  }
  return next(root, args, context, info);
};