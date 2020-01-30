import { AuthenticationService } from '@modules/user/services/authentication/authentication.service';

export function AuthenticationFactory(Authentication: AuthenticationService) {
  return () => {
    Authentication.getAuthentication();
  };
}
