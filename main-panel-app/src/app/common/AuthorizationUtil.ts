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
}
