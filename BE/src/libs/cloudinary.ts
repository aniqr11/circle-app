import { v2 } from "cloudinary";

export default new (class cloudinaryConfig {
  upload() {
    v2.config({
      cloud_name: "diwvvx24j",
      api_key: "259495521649858",
      api_secret: "UAzEcA_hiOxHtD9yFTSaothbQ2I",
      secure: true,
    });
  }

  async destination(image: string) {
    try {
      const cloudinary = await v2.uploader.upload("src/uploads/" + image);

      return cloudinary.secure_url;
    } catch (error) {
      throw error;
    }
  }
})();
