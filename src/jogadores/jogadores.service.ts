import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v1 as uuid } from 'uuid';

import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  // private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(
    criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    const { email } = criarJogadorDto;

    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    return jogadorEncontrado
      ? await this.atualizar(criarJogadorDto)
      : await this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
  }

  async consultarJogadoresPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = this.jogadorModel.findOne({ email }).exec();

    if (!jogadorEncontrado) {
      throw new NotFoundException(
        `O jogador com o email: ${email}, nao pode ser encontrado`,
      );
    } else {
      return jogadorEncontrado;
    }
  }

  async deletarJogador(email: string): Promise<any> {
    // const jogadorEncontrado = this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );
    // this.jogadores = this.jogadores.filter(
    //   (jogador) => jogador.email !== jogadorEncontrado.email,
    // );

    return await this.jogadorModel.remove({ email }).exec();
  }
  private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    // const { nome, numeroTelefone, email } = criarJogadorDto;

    // const jogador: Jogador = {
    //   _id: uuid(),
    //   nome,
    //   numeroTelefone,
    //   email,
    //   ranking: 3,
    //   urlFotoJogador: 'www.google.com.br/foto123.jpg',
    // };

    // this.jogadores.push(jogador);
    // this.logger.log(`criaJogadorDto: ${JSON.stringify(this.jogadores)}`);

    // return this.jogadores.slice(-1)[0];

    const jogadorCriado = new this.jogadorModel(criarJogadorDto);
    return await jogadorCriado.save();
  }

  private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
    // const { nome } = criarJogadorDto;
    // jogadorEncontrado.nome = nome;

    // return jogadorEncontrado;

    return await this.jogadorModel
      .findOneAndUpdate(
        { email: criarJogadorDto.email },
        { $set: criarJogadorDto },
      )
      .exec();
  }
}
