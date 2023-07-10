import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "../router/Routes";
import { Profile } from "../models/profile";
import { prettyFormat } from "@testing-library/react";

export default class UserStore {
    user: User | null = null;
    loading: boolean = false;
    profile: Profile | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    setDisplayName = (name:string) =>{
        if(this.user) {
            this.user.displayName = name;
        }
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
           // console.log('user - ', user)
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user
            })
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => {
                this.user = user
            })
            router.navigate('/activities');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }



    setImage = (image: string) => {
        if (this.user) {
            this.user.image = image;
        }
    }

    logout = () => {
        store.commonStore.token = null;
        this.user = null;
        router.navigate('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error)
        }
    }

}