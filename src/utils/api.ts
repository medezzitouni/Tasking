
import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";

type AxiosInput = [url: string, config?: AxiosRequestConfig<any> | undefined];
type AxiosDataInput = [url: string, data?: any, config?: AxiosRequestConfig<any> | undefined];

export default class Api {
    static AXIOS = axios.create({
        baseURL: ' https://my-json-server.typicode.com/methe-1/fake-db'
    });

    constructor() {}

    static async get(...args: AxiosInput): Promise<AxiosResponse<any, any>> {
        return Api.AXIOS.get(...args);
    }

    static async post(...args: AxiosDataInput): Promise<AxiosResponse<any, any>> {
        return Api.AXIOS.post(...args);
    }

    static async delete(...args: AxiosInput): Promise<AxiosResponse<any, any>> {
        return Api.AXIOS.delete(...args);
    }

    static async put(...args: AxiosDataInput): Promise<AxiosResponse<any, any>> {
        return Api.AXIOS.put(...args);
    }

    static async hit({ action, onSuccess, onError }: { action: Promise<AxiosResponse<any, any>> , onSuccess: Function, onError: Function }){
        try {
            const result = await action;
            onSuccess(result.data);
        } catch (error) {
            onError(error);
        }
    }
}