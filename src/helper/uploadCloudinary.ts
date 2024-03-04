import { UploadApiOptions } from "cloudinary";
import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async (
  file: string,
  folder: string
): Promise<string> => {
  const options: UploadApiOptions = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
    folder,
  };

  const result = await cloudinary.uploader.upload(file, options);
  return result.public_id;
};

export const getResourceToCloudinary = async (
  public_id: string
): Promise<string> => {
  const options: UploadApiOptions = {
    colors: true,
  };

  const result = await cloudinary.api.resource(public_id, options);
  return result.secure_url;
};

export const deleteResourceToCloudinary = async (
  public_id: string | null | undefined
): Promise<string | boolean> => {
  if (!public_id) return false;
  const options: UploadApiOptions = {
    type: "upload",
    resource_type: "image",
  };

  const result = await cloudinary.api.delete_resources([public_id], options);
  return "success";
};
