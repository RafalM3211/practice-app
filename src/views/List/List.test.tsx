import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { server } from '../../test/server';
import { renderWithProviders } from '../../test/utils';
import PostsList from './List';
import { posts } from '../../test/fixures.json';

const [skiingPost, dogsPost] = posts;

describe('posts table tests', () => {
  it('displays no entries message when empty', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.json([]));
      }),
    );

    // act
    renderWithProviders(<PostsList />);

    // assert
    expect(await screen.findByText('brak postów')).toBeInTheDocument();
  });

  it('displays error message when it occured', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(400), ctx.json({ errorMessage: 'errorMessage' }));
      }),
    );

    // act
    renderWithProviders(<PostsList />);

    // assert
    expect(await screen.findByText(/Wystąpił nieznany błąd podczas generowania tabeli/i)).toBeInTheDocument();
  });

  it('displays loading state', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(200), ctx.delay(200), ctx.json([]));
      }),
    );

    // act
    renderWithProviders(<PostsList />);

    // assert
    expect(await screen.findByRole('progressbar')).toBeInTheDocument();
  });
});

describe('deleting post', () => {
  it('Modal for deleting post opens', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(204), ctx.json([skiingPost]));
      }),
    );
    const user = userEvent.setup();
    renderWithProviders(<PostsList />);
    const deleteButton = await screen.findByRole('menuitem', { name: 'Usuń' });
    // act
    await user.click(deleteButton);

    // assert
    expect(await screen.findByRole('heading', { name: /usuwanie postu?/i })).toBeInTheDocument();
  });

  it('shows loading state when deleting', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(204), ctx.json([skiingPost]));
      }),
    );
    const user = userEvent.setup();
    renderWithProviders(<PostsList />);
    const deleteButton = await screen.findByRole('menuitem', { name: 'Usuń' });
    await user.click(deleteButton);
    const acceptPostDeletionBtn = await screen.findByRole('button', { name: /tak/i });

    // act
    await user.click(acceptPostDeletionBtn);

    // assert
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('deletes correctly', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(204), ctx.json([skiingPost]));
      }),
    );
    const user = userEvent.setup();
    renderWithProviders(<PostsList />);
    const deleteButton = await screen.findByRole('menuitem', { name: 'Usuń' });
    await user.click(deleteButton);
    const acceptPostDeletionBtn = await screen.findByRole('button', { name: /tak/i });

    // act
    await user.click(acceptPostDeletionBtn);

    // assert
    expect(await screen.findByText('Usunięto pomyślnie')).toBeInTheDocument();
  });

  it('displays deletion error correctly', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(204), ctx.json([skiingPost]));
      }),
      rest.delete('http://localhost:3000/posts/:id', (req, res, ctx) => {
        return res.once(ctx.status(400), ctx.json({ errorMessage: 'POST_DOESNT_EXIST' }));
      }),
    );
    const user = userEvent.setup();
    renderWithProviders(<PostsList />);
    const deleteButton = await screen.findByRole('menuitem', { name: 'Usuń' });
    await user.click(deleteButton);
    const acceptPostDeletionBtn = await screen.findByRole('button', { name: /tak/i });

    // act
    await user.click(acceptPostDeletionBtn);

    // assert
    expect(await screen.findByText('Post nie istnieje')).toBeInTheDocument();
  });
});
