import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PokedexModule } from './pokedex/pokedex.module';
import configuration from './config/configuration';

@Module({
  imports: [
    PokedexModule,
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
