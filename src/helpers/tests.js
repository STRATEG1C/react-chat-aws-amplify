import { createMemoryHistory } from "history";
import { render } from "react-dom";
import { Router } from "react-router";

export const renderWithRouter = (
    component,
    { 
        router='/', 
        history=createMemoryHistory({ initialEntries: [route], }) = {} 
    }
) => {
    const Wrapper = ({ children }) => (
        <Router history={history}>{children}</Router>
    );
    return {
        ...render(component, { wrapper: Wrapper }),
        history,
    ;
};