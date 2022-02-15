import * as mongoose from 'mongoose';

export const JogadorSchema = new mongoose.Schema(
  {
    telefoneCelular: String,
    nome: String,
    email: { type: String, unique: true },
    ranking: String,
    posicaRanking: Number,
    urlFotoJogador: String,
  },
  { timestamps: true, collection: 'jogador' },
);
