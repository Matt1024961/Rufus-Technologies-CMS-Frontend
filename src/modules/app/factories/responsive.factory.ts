import { ResponsiveService } from '@modules/app/services/responsive/responsive.service';

export function ResponsiveFactory(Responsive: ResponsiveService) {
  return () => {
    Responsive.getResponsive();
  };
}
