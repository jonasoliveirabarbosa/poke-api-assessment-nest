import { Test, TestingModule } from '@nestjs/testing';
import { PokedexService } from './pokedex.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of, throwError } from 'rxjs';
import { AxiosError } from 'axios';

describe('PokedexService', () => {
  let pokedexService: PokedexService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokedexService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    pokedexService = module.get<PokedexService>(PokedexService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('findAll', () => {
    it('should return an array of NamedAPIResource', async () => {
      const query = { limit: 10, offset: 0 };
      const expectedResponse = [
        { name: 'pokemon1', url: 'mockurl/1' },
        { name: 'pokemon2', url: 'mockurl/1' },
      ];

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: expectedResponse }) as unknown as any);

      const result = await pokedexService.findAll(query);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw if the api returns an error', async () => {
      const query = { limit: 10, offset: 0 };

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        throwError(() => {
          return {
            response: { data: 'Error on calling the poke api' },
          } as unknown as AxiosError;
        }),
      );

      await expect(pokedexService.findAll(query)).rejects.toEqual(
        'Error on calling the poke api',
      );
    });
  });

  describe('findOne', () => {
    it('should return a PokemonDTO', async () => {
      const name = 'pikachu';
      const expectedResponse = {
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: ['electric'],
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: expectedResponse }) as unknown as any);
      const result = await pokedexService.findOne(name);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw if the api returns an error', async () => {
      const name = 'pikachu';

      jest.spyOn(httpService, 'get').mockReturnValueOnce(
        throwError(() => {
          return {
            response: { data: 'Error on calling the poke api' },
          } as unknown as AxiosError;
        }),
      );

      await expect(pokedexService.findOne(name)).rejects.toEqual(
        'Error on calling the poke api',
      );
    });
  });
});
