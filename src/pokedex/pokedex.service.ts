import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { GetAllQuery, NamedAPIResource, PokemonDTO } from './dto/dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokedexService {
  private readonly logger = new Logger(PokedexService.name);
  private POKEAPI_BASE_URL = this.configService.get<string>('POKEAPI_BASE_URL');

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.POKEAPI_BASE_URL = this.configService.get<string>('POKEAPI_BASE_URL');
  }

  async findAll(query: GetAllQuery): Promise<PokemonDTO[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<{
          results: NamedAPIResource[];
        }>(`${this.POKEAPI_BASE_URL}/pokemon`, {
          params: query,
        })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'Error on calling the poke api';
          }),
        ),
    );

    return Promise.all(
      data.results.map(async (pokemon) => this.findOne(pokemon.name)),
    );
  }

  async findOne(name: string): Promise<PokemonDTO> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PokemonDTO>(`${this.POKEAPI_BASE_URL}/pokemon/${name}`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'Error on calling the poke api';
          }),
        ),
    );
    return data;
  }
}
