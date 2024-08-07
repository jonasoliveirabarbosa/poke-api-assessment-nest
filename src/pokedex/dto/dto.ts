import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class NamedAPIResource {
  name: string;
  url: string;
}

class PokemonSprites {
  back_default: string;
  back_female: string;
  back_shiny: string;
  back_shiny_female: string;
  front_default: string;
  front_female: string;
  front_shiny: string;
  front_shiny_female: string;
}

class Item {
  item: NamedAPIResource;
  version_details: {
    rarity: number;
    version: NamedAPIResource;
  }[];
}

class Move {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
}

class GameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export class PokemonDTO {
  id: number;
  name: string;
  base_experience: string;
  height: string;
  weight: string;
  is_default: boolean;
  order: number;
  abilities: NamedAPIResource[];
  forms: NamedAPIResource[];
  game_indices: GameIndex[];
  held_items: Item[];
  moves: Move[];
  species: NamedAPIResource;
  sprites: PokemonSprites;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
  }[];
  types: {
    slot: number;
    type: NamedAPIResource;
  }[];
  past_types: {
    generation: NamedAPIResource;
    types: {
      slot: number;
      type: NamedAPIResource;
    }[];
  }[];
}

export class GetAllQuery {
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(50)
  limit?: number = 20;

  @IsNumber()
  @IsOptional()
  @Min(0)
  offset?: number = 0;
}

export class GetOneParams {
  @IsString()
  name: string;
}
