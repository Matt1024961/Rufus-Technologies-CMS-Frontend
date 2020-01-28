import { UserConfigService } from '@modules/user/services/user-config/user-config.service';

export function UserConfigsFactory(UserConfig: UserConfigService) {
  return () => {
    UserConfig.getConfiguration();
  };
}
