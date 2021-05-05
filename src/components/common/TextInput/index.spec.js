import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './index';

describe('Test TextInput component', () => {
    it('should be rendered', () => {
        const onChangeStub = jest.fn();
        const { asFragment } = render(
            <TextInput
                label="foo"
                onChange={onChangeStub} 
                value="bar"
                name="foo"
                type="text"
                error=""
                className="bar"
            />
        );
        expect(asFragment()).toMatchSnapshot();
    });

    it('should be changable', () => {
        const testInput = 'a';
        const onChangeStub = jest.fn();
        const { queryByTestId } = render(
            <TextInput
                label="foo"
                onChange={onChangeStub} 
                value=""
                name="foo"
                type="text"
                error=""
                className="bar"
            />
        );
        userEvent.type(queryByTestId('text-input'), testInput);
        expect(onChangeStub).toBeCalledTimes(testInput.length);
        expect(onChangeStub).toBeCalledWith('foo',  testInput);
    })

    it('should render an error', () => {
        const testError = 'Error';
        const onChangeStub = jest.fn();
        const { queryByText } = render(
            <TextInput
                label="foo"
                onChange={onChangeStub} 
                value=""
                name="foo"
                type="text"
                error={testError}
                className="bar"
            />
        );
        expect(queryByText(testError)).toBeInTheDocument();
    });
});
