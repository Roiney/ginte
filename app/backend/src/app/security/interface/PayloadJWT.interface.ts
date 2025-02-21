export class JWTPayload {
  username!: string;
  email!: string;
  sub!: string;
  role!: string;
  iat!: number;
  exp!: number;
}
