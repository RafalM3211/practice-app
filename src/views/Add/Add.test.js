import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route, MemoryRouter as Router } from 'react-router-dom';
import { useProvider } from 'test-data-provider';
import Add from './Add';
import PostsList from '../List/List';
import { renderWithProviders } from '../../test/utils';
import { server } from '../../test/server';
import { rest } from 'msw';
import { posts } from '../../test/fixures.json';

const [skiingPost, dogsPost] = posts;
jest.setTimeout(8000);

describe('validation', () => {
  const validationRequiredProvider = [
    {
      label: 'tytuł posta',
      description: 'should show expected error when title is empty',
      expectedErrorMessage: 'pole jest wymagane',
    },
    {
      label: 'adres poczty e-mail',
      description: 'should show expected error when email is empty',
      expectedErrorMessage: 'pole jest wymagane',
    },
  ];

  const validationProvider = [
    {
      label: 'tytuł posta',
      description: 'should show expected error when title is too long',
      expectedErrorMessage: 'maksymalna liczba znaków: 40',
      incorrectValue: 'Lorem ipsum dolor sit amet, consectetur et elit',
    },
    {
      label: 'adres poczty e-mail',
      description: 'should show expected error when email is wrong',
      expectedErrorMessage: 'nieprawidłowy adres',
      incorrectValue: 'wrongMail@',
    },
    {
      label: 'kod pocztowy',
      description: 'should show expected error when zip code is wrong',
      expectedErrorMessage: 'nieprawidłowy format',
      incorrectValue: '123-21',
    },
  ];

  useProvider(validationRequiredProvider, ({ label, description, expectedErrorMessage }) => {
    it(`${description}`, async () => {
      // arrange
      const user = userEvent.setup();
      renderWithProviders(<Add />);
      const field = screen.getByLabelText(label);
      const headerText = screen.getByText('Dodaj post');

      // act
      await user.click(field);

      // assert
      await user.click(headerText); // click header to call validation for field
      expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();
    });
  });

  useProvider(validationProvider, ({ label, description, expectedErrorMessage, incorrectValue }) => {
    it(`${description}`, async () => {
      // arrange
      const user = userEvent.setup();
      renderWithProviders(<Add />);
      const field = screen.getByLabelText(label);
      const headerText = screen.getByText('Dodaj post');

      // act
      await user.type(field, incorrectValue);

      // assert
      await user.click(headerText); // click header to call validation for field
      expect(await screen.findByText(expectedErrorMessage)).toBeInTheDocument();
    });
  });

  it('shows error expected error message when title is occupied', async () => {
    // arrange
    const user = userEvent.setup();
    server.use(
      rest.post('http://localhost:3000/posts', (req, res, ctx) => {
        return res.once(ctx.status(400), ctx.json({ errorMessage: 'TITLE_OCCUPIED' }));
      }),
    );
    renderWithProviders(<Add />);
    const titleField = screen.getByLabelText('tytuł posta');
    const emailField = screen.getByLabelText('adres poczty e-mail');
    const sendButton = screen.getByRole('button', { name: /dodaj/i });
    await user.type(titleField, skiingPost.title);
    await user.type(emailField, skiingPost.email);

    // act
    await user.click(sendButton);

    // assert
    expect(await screen.findByText('Tytuł jest już zajęty')).toBeInTheDocument();
  });
});

describe('adding post', () => {
  it('adds correctly with only required data', async () => {
    // arrange
    const user = userEvent.setup();
    renderWithProviders(
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/" element={<PostsList />} />
      </Routes>,
      { initialEntries: ['/add'] },
    );
    const titleField = await screen.findByLabelText('tytuł posta');
    const emailField = await screen.findByLabelText('adres poczty e-mail');
    const sendButton = await screen.findByRole('button', { name: /dodaj/i });
    await user.type(titleField, dogsPost.title);
    await user.type(emailField, dogsPost.email);

    // act
    await user.click(sendButton);

    // assert
    expect(await screen.findByText('Dodano pomyślnie')).toBeInTheDocument();
  });

  it('adds correctly with all data', async () => {
    // arrange
    const user = userEvent.setup();
    renderWithProviders(
      <Routes>
        <Route path="/add" element={<Add />} />
        <Route path="/" element={<PostsList />} />
      </Routes>,
      { initialEntries: ['/add'] },
    );
    const titleField = await screen.findByLabelText('tytuł posta');
    const contentField = await screen.findByLabelText('treść posta');
    const emailField = await screen.findByLabelText('adres poczty e-mail');
    const zipCodeField = await screen.findByLabelText('kod pocztowy');
    const sendButton = await screen.findByRole('button', { name: /dodaj/i });
    await user.type(titleField, skiingPost.title);
    await user.type(contentField, skiingPost.content);
    await user.type(emailField, skiingPost.email);
    await user.type(zipCodeField, skiingPost.zipCode);

    // act
    await user.click(sendButton);

    // assert
    expect(await screen.findByText('Dodano pomyślnie')).toBeInTheDocument();
  });
});
