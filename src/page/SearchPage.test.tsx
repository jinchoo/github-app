import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchPage from './SearchPage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('SearchPage', () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    mock
      .onGet('https://api.github.com/search/repositories', {
        params: { q: 'javascript', sort: 'stars' },
      })
      .reply(200, {
        items: [
          {
            id: '123',
            full_name: 'test/repo',
          },
        ],
      });
  });
  test('should have input to search repository', () => {
    render(<SearchPage />);
    const elmement = screen.getByTestId('search-input');
    expect(elmement).toBeInTheDocument();
  });
  test('should have filter to search repository', () => {
    render(<SearchPage />);
    const elmement = screen.getByTestId('filter-select');
    expect(elmement).toBeInTheDocument();
  });

  xtest('should get result from github when user type in to the search input and press search', async () => {
    render(<SearchPage />);
    const elmement = screen.getByTestId('search-input');

    fireEvent.click(elmement);
    userEvent.type(elmement, 'javascript');

    await waitFor(() => screen.findAllByTestId('repository'), {
      timeout: 1000,
    });
  });

  test.todo('when click on a repository result, it should route to detail page');
});
