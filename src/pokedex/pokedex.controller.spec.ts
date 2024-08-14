import { Test, TestingModule } from '@nestjs/testing';
import { PokedexController } from './pokedex.controller';
import { PokedexService } from './pokedex.service';
import { GetAllQuery, GetOneParams, PokemonDTO } from './dto/dto';

describe('PokedexController', () => {
  let pokedexController: PokedexController;
  let pokedexService: PokedexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokedexController],
      providers: [
        {
          provide: PokedexService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    pokedexController = module.get<PokedexController>(PokedexController);
    pokedexService = module.get<PokedexService>(PokedexService);
  });

  describe('findAll', () => {
    it('should return an array of NamedAPIResource', async () => {
      const query: GetAllQuery = { limit: 10, offset: 0 };
      const expectedResponse: PokemonDTO[] = [
        {
          name: 'pikachu',
          height: '4',
          weight: '60',
          types: ['electric'],
        } as unknown as PokemonDTO,
        {
          name: 'raichu',
          height: '4',
          weight: '60',
          types: ['electric'],
        } as unknown as PokemonDTO,
      ];

      jest.spyOn(pokedexService, 'findAll').mockResolvedValue(expectedResponse);

      const result = await pokedexController.findAll(query);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw if the service throws an error', async () => {
      const query: GetAllQuery = { limit: 10, offset: 0 };
      const errorMessage = 'Error on calling the poke api';

      jest.spyOn(pokedexService, 'findAll').mockRejectedValue(errorMessage);

      await expect(pokedexController.findAll(query)).rejects.toEqual(
        errorMessage,
      );
    });
  });

  describe('findOne', () => {
    it('should return a PokemonDTO', async () => {
      const params: GetOneParams = { name: 'pikachu' };
      const expectedResponse: PokemonDTO = {
        name: 'pikachu',
        height: '4',
        weight: '60',
        types: ['electric'],
      } as unknown as PokemonDTO;

      jest.spyOn(pokedexService, 'findOne').mockResolvedValue(expectedResponse);

      const result = await pokedexController.findOne(params);

      expect(result).toEqual(expectedResponse);
    });

    it('should throw if the service throws an error', async () => {
      const params: GetOneParams = { name: 'pikachu' };
      const errorMessage = 'Error on calling the poke api';

      jest.spyOn(pokedexService, 'findOne').mockRejectedValue(errorMessage);

      await expect(pokedexController.findOne(params)).rejects.toEqual(
        errorMessage,
      );
    });
  });
});
