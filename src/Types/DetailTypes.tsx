
export interface IPokeDetailsTypes {
    data: {
      name: string;
      order: number;
      abilities: [
        {
          ability: {
            name: string;
          };
        }
      ];
      sprites: {
        front_default: string;
      };
      types: [
        {
          type: {
            name: string;
          };
        }
      ];
      stats: [
        {
          base_stat: number;
          effort: number;
          stat: {
            name: string;
          };
        }
      ];
      moves: [
        {
          move: {
            name: string;
          };
        }
      ];
    };
  }