import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './index';

describe('Test Button component', () => {
    it('should be rendered', () => {
        const onClickStub = jest.fn();
        const { asFragment } = render(<Button text="foo" onClick={onClickStub} disabled={false} className="bar" />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('shoulda be clickable', () => {
        const onClickStub = jest.fn();
        const { queryByText } = render(<Button text="foo" onClick={onClickStub} disabled={false} className="bar" />);
        userEvent.click(queryByText('foo'));
        expect(onClickStub).toBeCalledTimes(1);
    });

    it('should be disabled', () => {
        const onClickStub = jest.fn();
        const { queryByText } = render(<Button text="foo" onClick={onClickStub} disabled={true} className="bar" />);
        userEvent.click(queryByText('foo'));
        expect(onClickStub).toBeCalledTimes(0);
    });
});
