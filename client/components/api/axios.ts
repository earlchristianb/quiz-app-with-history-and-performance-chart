import axios from "axios";
import { RootStateOrAny, useSelector } from "react-redux";
const API = axios.create({
   baseURL:"https://quiz-app-nodets.herokuapp.com/"
});



API.interceptors.request.use((req) => {
	
	if (sessionStorage.getItem("token")) {
		req.headers.authorization = `Bearer ${JSON.parse(
			sessionStorage.getItem("token")
		)}`;
	}
	

	return req;
});


export default API;