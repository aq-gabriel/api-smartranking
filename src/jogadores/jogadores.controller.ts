import { JogadoresService } from './jogadores.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresValidacaoParametrosPipe } from './pipes/jogadores-validacao-parametros.pipes';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarJogador(
    @Body() criarJogadorDto: CriarJogadorDto,
  ): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criarJogadorDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() atualizarJogadorDto: AtualizarJogadorDto,
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    return await this.jogadoresService.atualizarJogador(
      _id,
      atualizarJogadorDto,
    );
  }

  @Get('/:_id')
  async consultarJogadoresPeloId(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<Jogador> {
    return await this.jogadoresService.consultarJogadoresPeloId(_id);
  }

  @Get()
  async consultarJogador(): Promise<Jogador | Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Delete('/:_id')
  async deletarJogadores(
    @Param('_id', JogadoresValidacaoParametrosPipe) _id: string,
  ): Promise<void> {
    this.jogadoresService.deletarJogador(_id);
  }
}
