import getGitHubUser from "../services/DataService";

jest.mock("axios", () => ({
    __esModule: true,
    default: {
        get: () => ({
            data: {id: 1, name: "John"},
        }),
    },
}));

describe("Data Service fake Tests", () => {
    it("just 1st fake test", async () => {
        const res = await getGitHubUser("user");
        expect(res.data.id).toEqual(1);
        expect(res.data.name).toEqual("John");
    });
});

// TODO: Your test need to be here instead of fake tests

