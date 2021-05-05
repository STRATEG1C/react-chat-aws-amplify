import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactCard from './index';

const itemFixture = {
    id: 1,
    username: 'Name 1'
};

describe('Test ContactCard component', () => {
    it('should be rendered', () => {
       const { asFragment, queryByText } = render(<ContactCard contact={itemFixture} />);
       expect(asFragment()).toMatchSnapshot();
       expect(queryByText(itemFixture.username)).toBeInTheDocument();
    });

    it('should be clickable', () => {
        const onClickStub = jest.fn();
        const { asFragment, queryByTestId } = render(<ContactCard contact={itemFixture} onClick={onClickStub} />);
        userEvent.click(queryByTestId('contact'));
        expect(onClickStub).toBeCalledTimes(1);
     });
});