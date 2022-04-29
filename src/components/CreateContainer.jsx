import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { storage } from "../firebase.config";
import { categories } from "../utils/data";
import { getAllFoodItems, saveItem } from "../utils/firebaseFunction";
import Loader from "./Loader";
const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [{ foodItems }, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];

    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMsg("Error while uploading: Try Again 😥😥!");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 2000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((dowloadURL) => {
          setImageAsset(dowloadURL);
          setIsLoading(false);
          setFields(true);
          setMsg("Image uploaded successfully 😊😊");
          setAlertStatus("success");
          setTimeout(() => {
            setFields(false);
          }, 2000);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Deleted successfully 😊😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 2000);
    });
  };
  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!title || !categories || !imageAsset || !price || !category) {
        setFields(true);
        setMsg("Required Field: Try Again 😥😥!");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 2000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: categories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Upload successfully 😊😊");
        clearData();
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 2000);
      }
    } catch (error) {
      setFields(true);
      setMsg("Error while uploading: Try Again 😥😥!");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 2000);
    }
    fetchData();
  };
  const clearData = () => {
    setTitle("");
    setImageAsset(null);
    setCalories("");
    setPrice("");
    setCalories("Select Category");
  };
  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4">
      <div className="w-[100%] md:w-[75%] border border-black rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg ${
              alertStatus === "danger"
                ? "bg-red-400 text-white"
                : "bg-emerald-400  text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give me a title..."
            className="w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-500"
          />
        </div>
        <div className="w-full">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 text-base border-b-2 border-gray-200 rounded-md outline-none cursor-pointer"
          >
            <option value="other" className="bg-white rounded-md">
              Select Category
            </option>
            {categories &&
              categories.length > 0 &&
              categories.map((item) => (
                <option
                  key={item.id}
                  className="text-base capitalize bg-white border-0 outline-none text-headingColor"
                  value={item.urlParamName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dotted rounded-lg cursor-pointer h-225 md:h-420">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2">
                      <MdCloudUpload className="text-3xl text-gray-500 hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        CLick here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadImage"
                      accept="image/*"
                      onChange={uploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full">
                    <img
                      src={imageAsset}
                      alt="uploadimage"
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      className="absolute p-3 text-xl transition-all duration-500 ease-in-out bg-red-500 rounded-full outline-none cursor-pointer bottom-3 right-3 hover:shadow-md"
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col items-center w-full gap-3 md:flex-row">
          <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
            <MdFoodBank className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-500"
            />
          </div>
          <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
            <MdAttachMoney className="text-2xl text-gray-700" />
            <input
              type="text"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent border-none outline-none placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="w-full px-12 py-2 ml-0 text-lg font-semibold text-white bg-blue-500 border-none rounded-lg outline-none md:ml-auto md:w-auto "
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
