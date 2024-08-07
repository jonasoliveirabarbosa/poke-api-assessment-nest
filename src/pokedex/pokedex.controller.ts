import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokedexService } from './pokedex.service';
import { GetAllQuery, GetOneParams, PokemonDTO } from './dto/dto';

@Controller('pokedex')
export class PokedexController {
  constructor(private pokedexService: PokedexService) {}

  @Get()
  async findAll(@Query() query: GetAllQuery): Promise<PokemonDTO[]> {
    return this.pokedexService.findAll(query);
  }

  @Get('/:name')
  async findOne(@Param() params: GetOneParams): Promise<PokemonDTO> {
    return this.pokedexService.findOne(params.name);
  }
}
