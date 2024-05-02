import React from "react";
import CustomInputOn from "./CustomInputOn";

const Settings = () => {
	return (
		<div className="mx-4 border w-full rounded-md p-3">
			<div className=" text-black text-lg font-medium">Ma'lumotlarim</div>
			<div className="my-2">
				<div className="lg:flex">
					<CustomInputOn label="Ism" type="text" />
					<CustomInputOn label="Familya" type="text" />
					<CustomInputOn label="Otasining ismi" type="text" />
				</div>
				<br />
				<hr />
				<br />
				<div className="lg:flex lg:w-[60%]">
					<CustomInputOn label="Elektron pochta" type="email" />
					<CustomInputOn label="Tel raqam" type="number" />
				</div>
				<br />
				<hr />
				<br />
				<div className="lg:flex lg:w-[60%]">
					<div className=" ">
						<div className="mb-1">Jinsi</div>
						<div className="border flex rounded-md py-3">
							<label htmlFor="" className="mx-1 flex items-center ">
								<input className=" h-4 w-4 mr-1" name="gender" type="radio" />
								Erkak
							</label>
							<label htmlFor="" className="mx-1 flex items-center ">
								<input className=" h-4 w-4 mr-1" name="gender" type="radio" />
								Ayol
							</label>
						</div>
					</div>
					<CustomInputOn label2="Tug'ilgan sana" type="date" />
				</div>
				<br />
				<hr />
				<br />
				<div className=" lg:w-[60%]"></div>
			</div>
			<div></div>
		</div>
	);
};

export default Settings;
