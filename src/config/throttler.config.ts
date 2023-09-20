import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule, ConfigService } from '@nestjs/config';

const throttlerConfig: ThrottlerModule = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => [
    {
      ttl: config.get('THROTTLE_TTL'),
      limit: config.get('THROTTLE_LIMIT'),
    },
  ],
};

export default throttlerConfig;
