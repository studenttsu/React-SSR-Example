import { makeAutoObservable } from "mobx";
import axios from "axios";

interface Data {
    title: string;
}

class AppStore {
    data: Data[] = [];

    constructor(initialState?: AppStore) {
        if (initialState) {
            this.data = initialState.data;
        }

        makeAutoObservable(this, undefined, { autoBind: true });
    }

    async fetchData() {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        this.data = response.data;
        return response.data;
    }

    toJson() {
        return {
            data: this.data,
        };
    }
}

export default AppStore;