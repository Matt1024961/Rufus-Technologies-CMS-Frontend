import { ThemeService } from '@modules/user/services/theme/theme.service';

export function ThemeFactory(Theme: ThemeService) {
  return () => {
    Theme.getConfiguration();
  };
}
