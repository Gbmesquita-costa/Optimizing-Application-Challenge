import { useCallback, useEffect, useMemo, useState } from 'react';

import { SideBar } from './components/SideBar';
import { ContentItem } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1); // id do filme

  const [genres, setGenres] = useState<GenreResponseProps[]>([]); // id - 1 - name - action - title - ação

  const [movies, setMovies] = useState<MovieProps[]>([]); // Pega todos os dados do meu filme pelo genero selecionado
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps); // Retorna os generos pelo id selecionado

  // useEffect(() => {
  //   api.get<GenreResponseProps[]>('genres').then(response => {
  //     setGenres(response.data);
  //   });
  // }, []);

  useMemo(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, [])

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);


  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, [])

  // function handleClickButton(id: number) {
  //   setSelectedGenreId(id);
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <ContentItem
        selectedGenre={selectedGenre}
        movies={movies}
      />
    </div>
  )
}