import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Routes, Route, MemoryRouter as Router } from 'react-router-dom';
import { useProvider } from 'test-data-provider';
import { rest } from 'msw';
import Edit from './Edit';
import PostsList from '../List/List';
import { renderWithProviders } from '../../test/utils';
import { server } from '../../test/server';
import { posts } from '../../test/fixures.json';

const [skiingPost, dogsPost] = posts;
jest.setTimeout(8000);
const renderEditWithProviders = () => {
  renderWithProviders(
    <Routes>
      <Route path="/edit/:id" element={<Edit />} />
      <Route path="/" element={<PostsList />} />
    </Routes>,
    { initialEntries: ['/edit/2'] },
  );
};

describe('validation', () => {
  const validationRequiredProvider = [
    {
      label: 'tytuł posta*',
      description: 'should show expected error when title is empty',
      expectedErrorMessage: 'pole jest wymagane',
    },
    {
      label: 'adres poczty e-mail*',
      description: 'should show expected error when email is empty',
      expectedErrorMessage: 'pole jest wymagane',
    },
  ];

  const validationProvider = [
    {
      label: 'tytuł posta*',
      description: 'should show expected error when title is too long',
      expectedErrorMessage: 'maksymalna liczba znaków: 40',
      incorrectValue: 'Lorem ipsum dolor sit amet, consectetur et elit',
    },
    {
      label: 'adres poczty e-mail*',
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
      renderEditWithProviders();
      const field = await screen.findByLabelText(label);
      await user.clear(field);
      const headerText = screen.getByText('Edytuj post');

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
      renderEditWithProviders();
      const field = await screen.findByLabelText(label);
      const headerText = screen.getByText('Edytuj post');
      await user.clear(field);

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
      rest.put('http://localhost:3000/posts/2', (req, res, ctx) => {
        return res.once(ctx.status(400), ctx.json({ errorMessage: 'TITLE_OCCUPIED', wrongField: 'title' }));
      }),
    );
    renderEditWithProviders();
    const titleField = await screen.findByLabelText('tytuł posta*');
    const emailField = screen.getByLabelText('adres poczty e-mail*');
    const sendButton = screen.getByRole('button', { name: /zapisz/i });
    await user.clear(titleField);
    await user.type(titleField, 'example title');
    await user.clear(emailField);
    await user.type(emailField, 'example@mail.com');

    // act
    await user.click(sendButton);

    // assert
    expect(await screen.findAllByText('Tytuł jest już zajęty')).toHaveLength(2);
  });
});

describe('saving post', () => {
  const clearAndFillRequiredFields = async (user) => {
    const titleField = await screen.findByLabelText('tytuł posta*');
    const emailField = await screen.findByLabelText('adres poczty e-mail*');
    await user.clear(titleField);
    await user.type(titleField, dogsPost.title);
    await user.clear(emailField);
    await user.type(emailField, dogsPost.email);
  };

  const clearAndFillAllFields = async (user) => {
    const titleField = await screen.findByLabelText('tytuł posta*');
    const contentField = await screen.findByLabelText('treść posta');
    const emailField = await screen.findByLabelText('adres poczty e-mail*');
    const zipCodeField = await screen.findByLabelText('kod pocztowy');
    await user.clear(titleField);
    await user.type(titleField, dogsPost.title);
    await user.clear(contentField);
    await user.type(contentField, dogsPost.content);
    await user.clear(emailField);
    await user.type(emailField, dogsPost.email);
    await user.clear(zipCodeField);
    await user.type(zipCodeField, dogsPost.zipCode);
  };

  it('saves correctly with only required data', async () => {
    // arrange
    const user = userEvent.setup();
    renderEditWithProviders();
    await clearAndFillRequiredFields(user);
    const sendButton = await screen.findByRole('button', { name: /zapisz/i });

    // act
    await user.click(sendButton);

    // assert
    expect(await screen.findByText(/zaktualizowany/i)).toBeInTheDocument();
  });

  it('loads correct fields data', async () => {
    // arrange
    server.use(
      rest.get('http://localhost:3000/posts/2', (req, res, ctx) => {
        return res.once(ctx.status(204), ctx.json(skiingPost));
      }),
    );

    // act
    renderEditWithProviders();

    // assert

    expect(await screen.findByDisplayValue(skiingPost.title)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(skiingPost.content)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(skiingPost.email)).toBeInTheDocument();
    expect(await screen.findByDisplayValue(skiingPost.zipCode)).toBeInTheDocument();
  });

  it('saves correctly with all data', async () => {
    // arrange
    const user = userEvent.setup();
    renderEditWithProviders();
    await clearAndFillAllFields(user);
    const sendButton = await screen.findByRole('button', { name: /zapisz/i });

    // act
    await user.click(sendButton);

    // assert
    expect(await screen.findByText(/zaktualizowany/i)).toBeInTheDocument();
  });
});

it('displays loading state', () => {
  // arrange

  // act
  renderWithProviders(<Edit />);

  // assert

  expect(screen.getAllByRole('skeletonLodaer')).toHaveLength(4);
});
