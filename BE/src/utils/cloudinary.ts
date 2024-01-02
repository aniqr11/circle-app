import { v2 as cloudinary } from "cloudinary";

export const uploadToCloudinary = (
	file: Express.Multer.File
): Promise<string> => {
	cloudinary.config({
        cloud_name: 'diwvvx24j', 
        api_key: '259495521649858', 
        api_secret: 'UAzEcA_hiOxHtD9yFTSaothbQ2I',
	});

	return new Promise((resolve, reject) => {
		const opt = {
			folder: "Threads",
		};

		cloudinary.uploader.upload(file.path, opt, function (error, result) {
			if (error) {
				return reject(error);
			}
			return resolve(result.secure_url);
		});
	});
};