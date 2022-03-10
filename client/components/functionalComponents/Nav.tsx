/** @format */

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
const Nav = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const handleLoginClick = () => {
		dispatch(authActions.signInPage());
		router.push("/login");
	};

	return (
		<div className='flex justify-end items-center bg-transparent h-24 w-5/6 z-20'>
			<button
				onClick={handleLoginClick}
				className='p-2 rounded-sm bg-teal-800 text-white shadow-2xl'>
				Login
			</button>
		</div>
	);
};

export default Nav;
