import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(Math, 'random').mockReturnValue(0);
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test('keeping the winning door records a win and allows another game', () => {
  render(<App />);
  expect(screen.getAllByAltText('Porta')).toHaveLength(3);
  fireEvent.click(screen.getByText('1'));
  fireEvent.click(screen.getByRole('button', { name: 'Manter escolha' }));
  act(() => jest.advanceTimersByTime(200));
  expect(screen.getByText('Parabéns, ganhaste o carro!')).toBeInTheDocument();
  expect(screen.getByText('Vitórias: 1')).toBeInTheDocument();

  act(() => jest.advanceTimersByTime(1500));
  fireEvent.click(screen.getByRole('button', { name: 'Jogar novamente' }));
  act(() => jest.advanceTimersByTime(100));
  expect(screen.getAllByAltText('Porta')).toHaveLength(3);
  expect(screen.getByText('Vitórias: 1')).toBeInTheDocument();
});

test('switching from a losing door wins the car', () => {
  render(<App />);
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(screen.getByRole('button', { name: 'Trocar de porta' }));
  act(() => jest.advanceTimersByTime(200));
  expect(screen.getByText('Parabéns, ganhaste o carro!')).toBeInTheDocument();
  expect(screen.getByText('Vitórias: 1')).toBeInTheDocument();
});

test('keeping a losing door records a loss', () => {
  render(<App />);
  fireEvent.click(screen.getByText('2'));
  fireEvent.click(screen.getByRole('button', { name: 'Manter escolha' }));
  act(() => jest.advanceTimersByTime(200));
  expect(screen.getByText('Conforma-te com uma cabra...')).toBeInTheDocument();
  expect(screen.getByText('Derrotas: 1')).toBeInTheDocument();
});
