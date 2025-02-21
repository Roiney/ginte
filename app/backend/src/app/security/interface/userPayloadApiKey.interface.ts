export interface UserPayloadApiKey {
  id: string;
  userName: string;
  email: string;
  active: boolean;
  role: string;
  lastLogin: Date;
}

declare module 'express' {
  interface Request {
    user?: UserPayloadApiKey; // Adicione a propriedade 'user' à interface Request
  }
}
