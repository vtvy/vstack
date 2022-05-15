import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axiosClient from '../../../../api/axiosClient';
import Modal from '../../../../components/Modal';
import EmailForm from '../../components/EmailForm';
import OtpForm from '../../components/OtpForm';
import RegisterForm from '../../components/RegisterForm';
import { register } from '../../userSlice';

function RegisterPage() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [isOpenOtpForm, setIsOpenOtpForm] = useState(false);
	const [isCorrectOtp, seIsCorrectOtp] = useState(false);

	const handleSendOtp = async (data) => {
		const url = '/auth/otp';
		try {
			const res = await axiosClient.post(url, data);

			if (res.data.success) {
				setEmail(data.email);
				setIsOpenOtpForm(true);
			} else {
				alert('Email is already exists');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const resendOtp = () => {
		handleSendOtp({ email: email });
	};
	const handleSubmitOtp = async (data) => {
		const url = '/auth/confirmOtp';
		try {
			const res = await axiosClient.post(url, data);
			if (res.data.success) {
				seIsCorrectOtp(true);
				setIsOpenOtpForm(false);
			} else {
				alert(res.data.message);
			}
		} catch (err) {
			alert(err.status.message);
		}
	};

	const handleRegister = async (data) => {
		data.append('email', email);
		try {
			const action = register(data);
			await dispatch(action);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="md:max-w-[50rem] w-full bg-white h-screen flex justify-center  flex-col pt-12 lg:px-28 md:items-start items-center px-4 space-y-12 ">
			<div>
				<h1 className="my-2 text-7xl font-bold text-slate-700">Register</h1>
			</div>

			<div className="w-full flex justify-center items-center">
				{' '}
				{isCorrectOtp && (
					<RegisterForm onSubmit={handleRegister} email={email} />
				)}
				{!isCorrectOtp && (
					<EmailForm onSubmit={handleSendOtp} isCorrectOtp={isCorrectOtp} />
				)}
				{isOpenOtpForm && (
					<Modal setIsOpen={setIsOpenOtpForm}>
						<OtpForm onSubmit={handleSubmitOtp} resendOtp={resendOtp} />
					</Modal>
				)}
			</div>

			<div className="py-4 border-t text-center md:text-left w-full border-solid border-gray-300">
				<p className="my-4 text-2xl text-gray-600">
					Already an account?
					<Link
						to="/login"
						className="font-medium ml-2 text-2xl text-indigo-600 underline"
					>
						Login
					</Link>
				</p>
			</div>
		</div>
	);
}

export default RegisterPage;
