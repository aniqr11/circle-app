export type IUserRegist = {
	username: string;
    fullname: string;
	email: string;
	password: string;
}

export type UserLogin = {
	email: string;
	password: string;
};

export type UserAPI = {
	id: number;
	email: string;
	username: string;
	fullname: string;
	profile_picture: string;
	profile_description: string;
	// password: string;

};

