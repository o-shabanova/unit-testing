import axios from "axios";
import Info from "../components/Info";
import React from 'react';
import {render, waitFor} from '@testing-library/react';
import renderer, {act} from "react-test-renderer";

jest.mock('axios');

describe("tests for Info Component", () => {
    // it("Test if Info Component renders correctly", () => {
    //   const wrapper = renderer.create(<Info/>);
    //   expect(wrapper.toJSON()).toMatchSnapshot();
    // });
    //
    // it('If h3 is present 2.0', () => {
    //   const wrapper = renderer.create(<Info/>);
    //   const infoInstance = wrapper.root;
    //   const headerInstance = infoInstance.findByType('h3');
    //
    //   expect(headerInstance).toBeTruthy();
    // });
    //
    // it('if h3 is present', () => {
    //   const wrapper = renderer.create(<Info/>);
    //   expect('h3').toBeDefined();
    // });
    //
    // it('if h3 contain text', () => {
    //   const wrapper = renderer.create(<Info/>);
    //   const testInstance = wrapper.root;
    //
    //   expect(testInstance.findByType('h3').children).toContain('GitHub User Info');
    // });
    //
    // it('fetches and displays user data on successful API call', async () => {
    //   const wrapper = renderer.create(<Info user="testuser" />);
    //
    //   const listItems = wrapper.root.findAllByType('li');
    //   expect(listItems.length).toBe(2);
    //   expect(listItems[0].children).toContain('name: John Doe');
    //   expect(listItems[1].children).toContain('bio: Developer');
    // });

    // https://stackoverflow.com/questions/61627298/cannot-read-property-mockresolvedvalue-of-undefined
    it('fetches and displays user data on successful API call, using testing-library/react', async () => {
        axios.get = jest.fn().mockResolvedValue({data: {name: 'John Doe', bio: 'Developer'}});

        const {getByText} = render(<Info user="someUser"/>);

        await waitFor(() => getByText('name: John Doe'));

        expect(getByText('name: John Doe')).toBeInTheDocument();
        expect(getByText('bio: Developer')).toBeInTheDocument();
    });

    it('fetches and displays user data on successful API call, using react-test-renderer', async () => {
        axios.get = jest.fn().mockResolvedValue({data: {name: 'John Doe', bio: 'Developer'}});

        const wrapper = renderer.create(<Info user="someUser" />);

        // // Manually trigger effect (componentDidMount in this case)
        // await wrapper.getInstance().componentDidMount();

        // // Re-rendering component tree after state update
        // wrapper.update(<Info user="someUser" />);

        await act(async () => {
            await Promise.resolve(wrapper);
            await Promise.resolve(); // This will resolve all the promises (including componentDidMount's)
            wrapper.update(<Info user="someUser" />);
        });

        const listItems = wrapper.root.findAllByType('li');
        expect(listItems.length).toBe(2);
        expect(listItems[0].children.join('')).toContain('name: John Doe');
        expect(listItems[1].children.join('')).toContain('bio: Developer');
    });

})

// TODO: Your test need to be here instead of fake tests