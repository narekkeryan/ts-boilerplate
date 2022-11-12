import 'module-alias/register';

import { random } from '@/core/util/random.util';

function bootstrap(): void {
  console.info('Application is running!', random(0, 101));
}

bootstrap();
