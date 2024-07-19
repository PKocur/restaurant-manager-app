export interface RegistrationForm {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
  password: string | null | undefined;
  roles: string[] | null | undefined;
}
