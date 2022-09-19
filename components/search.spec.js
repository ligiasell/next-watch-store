import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// fn() returns a mock function
const doSearch = jest.fn();

describe('Search', () => {
  it('should render Search component', () => {
    render(<Search doSearch={doSearch} />);

    // using data-testid="search" inside <Search />
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('should render an input type="search"', () => {
    render(<Search doSearch={doSearch} />);

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search');
  });

  it('should render a form', () => {
    render(<Search doSearch={doSearch} />);

    // using name="search-form" inside <Search />
    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should call props.doSearch() when form is submitted', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');

    // fireEvent returns a promise, then I need to use "async" and "await"
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with the user input', async () => {
    render(<Search doSearch={doSearch} />);

    const form = screen.getByRole('form');
    const inputText = 'some text here';
    const input = screen.getByRole('searchbox');

    // fireEvent returns a promise, then I need to use "async" and "await"
    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });
});
