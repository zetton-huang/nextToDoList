import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
function Modal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_completed: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const handleChange = (e) => {
    console.log("handleChange", e);
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const click = () => {
    postTodoList();
  };
  const postTodoList = async () => {
    console.log("送出資料", formData);
    const postTodoList = await axios.post(`/task`, { formData });
    console.log("API新增任務回傳資訊", postTodoList);
    try {
      const postTodoList = await axios.post(`/task`, { formData });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      handleErrorMessage(dispatch, error);
    }
  };
  return (
    <div className=" fixed left-0 top-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
      <div className=" bg-slate-50 p-20 shadow-md shadow-stone-400 flex flex-col gap-3">
        <form>
          <input
            type="text"
            name="name"
            placeholder="任務名稱"
            className="px-3 py-2 border-2 w-full"
            onChange={handleChange}
          ></input>
          <textarea
            name="description"
            placeholder="任務描述"
            className="px-3 py-10 border-2 w-full"
            onChange={handleChange}
          ></textarea>
          <button
            onClick={click}
            type="button"
            className="bg-orange-600 py-3 px-11 text-white"
          >
            新增
          </button>
          <button
            className="bg-blue-600 py-3 px-11 text-white gap-10"
            onClick={onClose}
          >
            關閉
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
