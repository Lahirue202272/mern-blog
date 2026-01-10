import { Alert, Button, TextInput } from "flowbite-react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { HiMail } from "react-icons/hi"
import {useSelector} from "react-redux"
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { set } from "mongoose";





export default function DashProfile() {
    const {currentUser} = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = async () => {
      // service firebase.storage {
      //   match /b/{bucket}/o {
      //     match /{allPaths=**} {
      //       allow read;
      //       allow write: if 
      //       request.resource.size < 2 * 1024 * 1024 &&
      //       request.resource.contentType.matches('image/.*')
      //     }
      //   }
      // }
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadingProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError("Could not upload image (File must be less than 2MB).");
          setImageFileUploadingProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({...formData, profilePicture: downloadURL});
            setImageFileUploading(false);
          });
        }
      );

    };

    const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value});
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0) {
        setUpdateUserError("No changes made to update.");
        setTimeout(() => {
            setUpdateUserError(null);
        }, 3000);
        return;
      }
      if (imageFileUploading) {
        setUpdateUserError("Please wait for the image to finish uploading.");
        setTimeout(() => {
            setUpdateUserError(null);
        }, 3000);
        return;
      }
      try {
        dispatch(updateStart());

        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
          setTimeout(() => {
            setUpdateUserError(null);
          }, 3000);
        }else{ 
          dispatch(updateSuccess(data));
          setUpdateUserSuccess("Profile updated successfully.");
          setTimeout(() => {
            setUpdateUserSuccess(null);
          }, 3000);
        }
      } catch (error) {
        dispatch(updateFailure(error.message));
        setUpdateUserError(error.message);
        setTimeout(() => {
            setUpdateUserError(null);
        }, 3000);
      }
    };
    
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
        <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className="relative w-32 h-32 self-center cursor-pointer shadow-md rounded-full overflow-hidden" onClick={()=>
              filePickerRef.current.click()}>
                {imageFileUploadingProgress && (
                  <CircularProgressbar
                    value={imageFileUploadingProgress || 0}
                    text={`${imageFileUploadingProgress}%`}
                    strokeWidth={5}
                    styles={{
                      root: {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                      },
                      path: {
                        stroke: `rgba(62, 152, 199, ${
                          imageFileUploadingProgress / 100
                        })`,
                      },
                    }}
                  />
                )}
                <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
                className={`rounded-full w-full object-cover h-full border-8 border-[lightgray]
                ${imageFileUploadingProgress && imageFileUploadingProgress<100 && 'opacity-60'}`}/>
            </div>
            {imageFileUploadError && (<Alert color="failure">{imageFileUploadError}</Alert>)}

            <TextInput type="text" id="username" placeholder="username"
             defaultValue={currentUser.username} addon="@" onChange={handleChange}/>
             <TextInput type="email" id="email" placeholder="email"
             defaultValue={currentUser.email} icon={HiMail}onChange={handleChange}/>
             <TextInput type="password" id="password" placeholder="password"onChange={handleChange}/>
             <Button type="submit" className="text-black-600 bg-transparent hover:text-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-500
              focus:ring-4 focus:ring-blue-300 transition-all duration-300" outline>
                Update
             </Button>
        </form>
        <div className="text-red-500 flex justify-between mt-5">
            <span className="cursor-pointer hover:underline">Delete Account</span>
            <span className="cursor-pointer hover:underline">Sign Out</span>
        </div>
        {updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>)}
        {updateUserError && (
          <Alert color="failure" className="mt-5">
            {updateUserError}
          </Alert>)}
    </div>
  )
}
