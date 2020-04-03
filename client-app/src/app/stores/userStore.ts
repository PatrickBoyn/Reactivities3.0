import { action, computed, observable } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../api/agent";

export default class UserStore {
	@observable user: IUser | null = null;
	
	@computed get isLoggedIn() { return !!this.user}
	
	@action login = async (values: IUserFormValues) => {
		try {
			this.user = await agent.User.login(values);
		} catch (error) {
			console.log(error)
		}
	}
}
