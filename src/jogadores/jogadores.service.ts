import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const { email } = criarJogadorDto;

    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    return jogadorEncontrado
      ? await this.atualizar(jogadorEncontrado, criarJogadorDto)
      : await this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `O jogador com o email: ${email}, nao pode ser encontrado`,
      );
    } else {
      return jogadorEncontrado;
    }
  }

  private criar(criarJogadorDto: CriarJogadorDto): Jogador {
    const { nome, numeroTelefone, email } = criarJogadorDto;

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      numeroTelefone,
      email,
      ranking: 3,
      urlFotoJogador: 'www.google.com.br/foto123.jpg',
    };

    this.jogadores.push(jogador);
    this.logger.log(`criaJogadorDto: ${JSON.stringify(this.jogadores)}`);

    return this.jogadores.slice(-1)[0];
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): Jogador {
    const { nome } = criarJogadorDto;
    jogadorEncontrado.nome = nome;

    return jogadorEncontrado;
  }
  
}
