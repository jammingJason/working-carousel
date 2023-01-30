import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';
import TEST_IMAGES from './_testCommon.js';

it('does not crash', () => {
  render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
});

it('matches snapshot', function () {
  const { asFragment } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  expect(asFragment()).toMatchSnapshot();
});

it('handles button clicks', function () {
  const { getByRole } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  fireEvent.click(getByRole('rightClick'));
});

it('works when you click on the left arrow', function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move backward in the carousel
  // const leftArrow = container.querySelector('.bi-arrow-left-circle');
  // fireEvent.click(leftArrow);

  // expect the right button to  be on the screen
  // expect(
  //   container.querySelector('.bi-arrow-left-circle"]')
  // ).not.toBeInTheDocument();
  expect(container.querySelector('.bi-arrow-right-circle')).toBeInTheDocument();
});

it('works when you click on the right arrow', function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="images for testing" />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector('.bi-arrow-right-circle');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});
