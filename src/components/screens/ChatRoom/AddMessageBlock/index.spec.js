import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMessageBlock from './index';

describe('Test AddMessageBlock component', () => {
    it('should be rendered', () => {
        const { asFragment } = render(<AddMessageBlock />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should be inputable', () => {
        const testString = 'Some text';
        const onAddStub = jest.fn();
        const { queryByTestId } = render(<AddMessageBlock onAdd={onAddStub} />);
        userEvent.type(queryByTestId('textarea'), testString);
        expect(queryByTestId('textarea').value).toBe(testString);
    });

    it('should add message', () => {
        const testString = 'Some text';
        const onAddStub = jest.fn();
        const { queryByTestId } = render(<AddMessageBlock onAdd={onAddStub} />);
        userEvent.type(queryByTestId('textarea'), testString);
        fireEvent.keyPress(queryByTestId('textarea'), { key: 'Enter', code: 13, charCode: 13 });
        expect(onAddStub).toBeCalledWith(testString);
    });
});
