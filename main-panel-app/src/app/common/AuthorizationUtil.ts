import jwt_decode from 'jwt-decode';

export class AuthorizationUtil {

  public static getBearerToken(): string | null {
    return localStorage.getItem("bearerToken")
  }

  public static getDecodedBearerToken(): any {
    try {
      return jwt_decode(<string>this.getBearerToken());
    } catch (Error) {
      return null;
    }
  }

  public static validateUserRoleForApp(token: string, requiredRole: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);
      const roles: string = decodedToken.roles;
      return roles.includes(requiredRole)
    } catch (Error) {
      return false;
    }
  }
}
