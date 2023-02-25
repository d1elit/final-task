import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from './Header';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
// import SpeedMatch from '../../Games/GameSpeedMatch/SpeedMatch';
// import MemoryMatch from '../../Games/GameMemoryMatch/MemoryMatch';
// import MemoryMatrix from '../../Games/GameMatrix/MemoryMatrix/MemoryMatrix';
// import RotationMatrix from '../../Games/GameMatrix/RotationMatrix/RotationMatrix';

// const components = [
//   { name: 'Speed Match', link: 'speedmatch' },
//   { name: 'Memory Match', link: 'memorymatch' },
//   { name: 'Memory Matrix', link: 'memorymatrix' },
//   { name: 'Rotation Matrix', link: 'rotationmatrix' },
// ];

test('Header page rendered', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );
  const btnElement = screen.getByText(/ru/i);
  expect(btnElement).toBeInTheDocument();
});

// const mockHistoryPush = jest.fn();

// // eslint-disable-next-line @typescript-eslint/no-unsafe-return
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useHistory: () => ({
//     push: mockHistoryPush,
//   }),
// }));

// test('App page rendered', () => {
//   // const history = createMemoryHistory();
//   render(
//     <Provider store={store}>
//       <MemoryRouter>
//         <Header />
//       </MemoryRouter>
//     </Provider>
//   );
//   const link = screen.getByText(/Speed Match/i);
//   fireEvent.click(link);
//   console.log('__________________________________________');
//   // console.log(link);
//   expect(mockHistoryPush).toHaveBeenCalledWith('/speedmatch');
// });

// describe('Header component', () => {
//   it('should change the url when clicking on the "Speed Match" link', () => {
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     // const store = mockStore({});
//     render(
//       <Provider store={store}>
//         <MemoryRouter>
//           <Header />
//         </MemoryRouter>
//       </Provider>
//     );

//     const link = screen.getByText(/Speed Match/i);

//     expect(link).toBeInTheDocument();

//     fireEvent.click(link);

//     expect(window.location.pathname).toEqual('/speedmatch');
//   });
// });
