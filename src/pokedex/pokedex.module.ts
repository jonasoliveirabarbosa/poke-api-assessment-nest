import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PokedexController } from './pokedex.controller';
import { PokedexService } from './pokedex.service';

@Module({
  imports: [HttpModule],
  controllers: [PokedexController],
  providers: [PokedexService],
})
export class PokedexModule {}
