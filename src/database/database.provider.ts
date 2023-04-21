import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from 'src/common/enum';
import { ConnectOptions } from 'typeorm';

export const DataBaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const isDevEnv = config.get('NODE_ENV') !== Environment.Production;
    const dbConfig = {
      type: 'postgres',
      host: config.get('DB_HOST'),
      port: +config.get('DB_PORT'),
      username: config.get('DB_USER'),
      password: config.get('DB_PASSWORD'),
      database: config.get('DB_NAME'),
      autoLoadEntities: true,
      synchronize: isDevEnv,
      loggin: config.get('DB_LOGGIN'),
    } as ConnectOptions;
    return dbConfig;
  },
});
