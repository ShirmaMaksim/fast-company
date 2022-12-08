import httpService from "./http.service";
const userEndpoint = "user/";

const userService = {
    getAll: async() => {
        const { data } = await httpService.get(userEndpoint);
        console.log(data);
        return data;
    },
    create: async(payload) => {
        const { data } = await httpService.put(userEndpoint + payload._id, payload);
        return data;
    },
    get: async(id) => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    }
};

export default userService;
