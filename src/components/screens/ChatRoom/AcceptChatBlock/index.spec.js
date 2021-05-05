import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AcceptChatBlock from './index';

describe('Test AcceptChatBlock component', () => {
    it('should be rendered', () => {
        const { asFragment } = render(<AcceptChatBlock />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should be acceptable', () => {
        const onAcceptStub = jest.fn();
        const { queryByTestId } = render(<AcceptChatBlock onAccept={onAcceptStub} />);
        userEvent.click(queryByTestId('accept-btn'));
        expect(onAcceptStub).toBeCalledWith(true);
    });

    it('should be declinable', () => {
        const onAcceptStub = jest.fn();
        const { queryByTestId } = render(<AcceptChatBlock onAccept={onAcceptStub} />);
        userEvent.click(queryByTestId('decline-btn'));
        expect(onAcceptStub).toBeCalledWith(false);
    });
});
