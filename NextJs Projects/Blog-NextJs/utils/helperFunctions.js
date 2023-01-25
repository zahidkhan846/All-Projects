export const uploadFile = async (picture) => {
  const formData = new FormData();
  formData.append("file", picture);
  formData.append("upload_preset", "next-blog");
  formData.append("cloud_name", "zahidkhan");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/zahidkhan/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await res.json();

  return data;
};
