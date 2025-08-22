import { useEffect } from "react";
import { useForm } from "react-hook-form";

function ProfilePage() {
  const defaultValues = {
    name: "",
    bio: "",
    email: "",
    skills: "React,Node",
    config: {
      mode: "view",
    },
  };

  const methods = useForm({ defaultValues });
  const { watch, reset, setValue, register } = methods;

  useEffect(() => {
    // backend api call
    const backendResponse = {
      name: "Bishal",
      bio: "this is my bio",
      email: "email@gmail.com",
      skills: "React,Node",
      config: {
        mode: "view",
      },
    };
    reset(backendResponse);
  }, [reset]);

  const data = watch();

  const OnClickEdit = () => {
    setValue("config.mode", "edit");
  };

  const GoBackButton = () => {
    setValue("config.mode", "view");
  };
  return (
    <div>
      <div>
        <h1>Profile Page</h1>
        {data?.config?.mode === "view" && (
          <button onClick={OnClickEdit}>Edit Profile</button>
        )}
      </div>
      {data?.config?.mode === "view" && (
        <div>
          <p>Name :{data?.name}</p>
          <p>Email : {data?.email}</p>
          <p>Bio : {data?.bio}</p>
          <p>Skills : {data?.skills}</p>
        </div>
      )}
      {data?.config?.mode === "edit" && (
        <div
          style={{ display: "flex", flexDirection: "column", width: "10rem" }}
        >
          {/* edit code */}
          <input {...register("name")} placeholder="Name" />
          <input {...register("email")} placeholder="Email" />
          <textarea {...register("bio")} placeholder="Bio" />
          <input {...register("skills")} placeholder="Skills" />
          <button onClick={GoBackButton}>Go Back</button>
          <button>Update</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
