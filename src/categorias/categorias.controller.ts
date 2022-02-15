import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CriarCategoriaDto } from 'src/categorias/dto/criar-categorias.dto';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dto/atualizar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategorias(
    @Body() criarCategoriaDto: CriarCategoriaDto,
  ): Promise<Categoria> {
    return await this.categoriaService.criarCategoria(criarCategoriaDto);
  }

  @Get()
  async cnsultarCategorias(): Promise<Array<Categoria>> {
    return await this.categoriaService.consultarTodasCategorias();
  }

  @Get('/:categoria')
  async consultarCategoriaPeloId(
    @Param('categoria') categoria: string,
  ): Promise<Categoria> {
    return await this.categoriaService.consultarCategoriaPeloId(categoria);
  }

  @Put('/:categoria')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Body() atualizarCategoria: AtualizarCategoriaDto,
    @Param('categoria') categoria: string,
  ): Promise<void> {
    await this.categoriaService.atualizarCategoria(
      categoria,
      atualizarCategoria,
    );
  }

  @Post('/:categoria/jogadores/:idJogador')
  async atribuirCategoriaJogador(@Param() params: string): Promise<void> {
    return await this.categoriaService.atribuirCategoriaJogador(params);
  }
}
