import { FavoriteGenre } from 'src/genre/favorite-genre.entity';
import { Injectable } from '@nestjs/common';
import { UpdatedFavoriteGenres } from './dto/updated-favorite-genres.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(FavoriteGenre)
    private readonly favoriteGenreRepository: Repository<FavoriteGenre>,
  ) {}

  async getFavoriteGenresList(userId: string): Promise<number[]> {
    const favoriteGenres = await this.favoriteGenreRepository.find({
      where: { userId },
    });

    return favoriteGenres.map((item) => item.genreId);
  }

  async updateSelectedGenres(
    genreDto: UpdatedFavoriteGenres,
  ): Promise<number[]> {
    const favoriteGenres = await this.favoriteGenreRepository.find({
      where: { userId: genreDto.userId },
    });

    const selectedGenres = favoriteGenres.map((item) => Number(item.genreId));

    if (selectedGenres.includes(genreDto.genreId)) {
      await this.favoriteGenreRepository.delete(genreDto);
      return selectedGenres.filter((genreId) => genreId !== genreDto.genreId);
    } else {
      await this.favoriteGenreRepository.create(genreDto).save();
      selectedGenres.push(genreDto.genreId);
      return selectedGenres;
    }
  }
}
