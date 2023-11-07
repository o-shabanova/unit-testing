import axios from "axios";
import Info from "../components/Info";
import React from 'react';
import {render, waitFor} from '@testing-library/react';
import renderer, {act} from "react-test-renderer";
import ReactDOMServer from 'react-dom/server';

jest.mock('axios');

describe("tests for Info Component", () => {
    it("Test if Info Component renders correctly", () => {
      const wrapper = renderer.create(<Info/>);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });

    it('If h3 is present 2.0', () => {
      const wrapper = renderer.create(<Info/>);
      const infoInstance = wrapper.root;
      const headerInstance = infoInstance.findByType('h3');

      expect(headerInstance).toBeTruthy();
    });

    it('if h3 is present', () => {
      const wrapper = renderer.create(<Info/>);
      expect('h3').toBeDefined();
    });

    it('if h3 contain text', () => {
      const wrapper = renderer.create(<Info/>);
      const testInstance = wrapper.root;

      expect(testInstance.findByType('h3').children).toContain('GitHub User Info');
    });

    it('fetches and displays user data on successful API call, using testing-library/react', async () => {
        axios.get = jest.fn().mockResolvedValue({data: {name: 'John Doe', bio: 'Developer'}});

        const {getByText} = render(<Info user="someUser"/>);

        await waitFor(() => getByText('name: John Doe'));

        expect(getByText('name: John Doe')).toBeInTheDocument();
        expect(getByText('bio: Developer')).toBeInTheDocument();
    });

    it('fetches and displays an error on unsuccessful API call, using testing-library/react', async () => {
        axios.get = jest.fn().mockRejectedValue({ error: "request error" });

        const {getByText} = render(<Info user="someUser"/>);

        await waitFor(() => getByText(`error: request error`));

        expect(getByText(`error: request error`)).toBeInTheDocument();
    });


});

describe("Mock testing with react-test-rendderer", ()=> {

    async function setup(axiosMock) {
        axios.get = axiosMock; //чи можна поміняти місцями, по типу як у нас було?

        const wrapper = renderer.create(<Info user="someUser" />);

        await act(async () => { //act helps us trigger ComponentDidMount effect instead of await wrapper.getInstance().componentDidMount(); (?)
            await Promise.resolve(wrapper);
            await Promise.resolve(); // This will resolve all the promises (including componentDidMount's)
            wrapper.update(<Info user="someUser" />); //update trigger re-rendering of our component
        });

        return wrapper.root;
    }

    it('fetches and displays user data on successful API call, using react-test-renderer', async () => {
        const axiosMock = jest.fn().mockResolvedValue({data: {name: 'John Doe', bio: 'Developer'}});
        const root = await setup(axiosMock);

        const listItems = root.findAllByType('li');
        expect(listItems.length).toBe(2);
        expect(listItems[0].children.join('')).toContain('name: John Doe');
        expect(listItems[1].children.join('')).toContain('bio: Developer');
    });


    it('displays an error message on API call failure', async () =>{
        const axiosMock = jest.fn().mockRejectedValue({ error: "request error" });
        const root = await setup(axiosMock);

        const listItems = root.findAllByType('li');
        expect(listItems.length).toBe(1);
        listItems.forEach(item => {
            const content = item.children.join('');
            expect(content).toContain(`error: request error`);
        });


    })
})

// TODO: Your test need to be here instead of fake tests