import CartItem from './cart-item';
import { screen, render, fireEvent } from '@testing-library/react';

const product = {
  title: 'Nice watch',
  price: '22.00',
  image:
    'https://images.unsplash.com/photo-1495856458515-0637185db551?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
};

const addToCart = jest.fn();

const renderCartItem = () => {
  render(<CartItem product={product} addToCart={addToCart} />);
};

describe('CartItem', () => {
  it('should render CartItem', () => {
    renderCartItem();

    expect(screen.getByTestId('cart-item')).toBeInTheDocument();
  });

  it('should display proper content', () => {
    renderCartItem();

    const image = screen.getByTestId('image');

    expect(
      screen.getByText(new RegExp(product.title, 'i')),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(product.price, 'i')),
    ).toBeInTheDocument();
    expect(image).toHaveProperty('src', product.image);
    expect(image).toHaveProperty('alt', product.title);
  });

  it('should display 1 as initial quantity', () => {
    renderCartItem();

    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should increase quantity by 1 when second button is clicked', async () => {
    renderCartItem();

    // get just second button of the array, which means the + button
    const [_, button] = screen.getAllByRole('button');
    // screen.debug(buttons);

    await fireEvent.click(button);

    expect(screen.getByTestId('quantity').textContent).toBe('2');
  });

  it('should decrease quantity by 1 when first button is clicked', async () => {
    renderCartItem();

    const [buttonDecrease, buttonIncrease] = screen.getAllByRole('button');

    await fireEvent.click(buttonIncrease);
    expect(screen.getByTestId('quantity').textContent).toBe('2');

    await fireEvent.click(buttonDecrease);
    expect(screen.getByTestId('quantity').textContent).toBe('1');
  });

  it('should not go below zero in the quantity', async () => {
    renderCartItem();

    const [buttonDecrease, _] = screen.getAllByRole('button');

    expect(screen.getByTestId('quantity').textContent).toBe('1');

    await fireEvent.click(buttonDecrease);
    await fireEvent.click(buttonDecrease);

    expect(screen.getByTestId('quantity').textContent).toBe('0');
  });
});
