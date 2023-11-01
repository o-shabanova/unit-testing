import App from '../components/App';
import {render, screen} from '@testing-library/react';
import renderer from 'react-test-renderer';
import Info from "../components/Info";

xdescribe("tests for App Component", () => {
    it("ensure App Component renders", () => {
        render(<App/>)
        // expect(screen.getByText('Hello World!')).toBeInTheDocument()
    });
    it("if App Component renders", () => {
        render(<App/>);
        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });
});

describe ("tests for App Component with help of react-test-renderer", () => {
    it("App component renders correctly", () => {
        const wrapper = renderer.create(<App/>);
        expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it("All Info components renders with NOT EMPTY props user", () => {
        const wrapper = renderer.create(<App/>);
        const appInstance = wrapper.root;
        const infoInstance = appInstance.findAllByType(Info);

        infoInstance.forEach(instance => {
            expect(instance.props.user).not.toBe('');
        })

    });

    it("Each Info components renders with specific props user", () => {
        const wrapper = renderer.create(<App/>);
        const appInstance = wrapper.root;
        const infoInstance = appInstance.findAllByType(Info);

        // If you expect two Info components, you can do:
        expect(infoInstance.length).toBe(2);

        // To check the props of the first Info:
        // expect(infoInstance[0].props.user).toBe("yurkovskiy");
        expect(infoInstance[0].props.user).toBe("o-shabanova");

        // To check the props of the second Info:
        expect(infoInstance[1].props.user).toBe("mplesha");

    });

    // it('it renders the Info component with user="mplesha" prop', () => {
    //     render(<App />);
    //     const element = screen.getByText(/mplesha/i);
    //     expect(element).toBeInTheDocument();
    // });




})

// TODO: Your test need to be here instead of fake tests
