"use client";
import Head from "next/head";
import axios from "axios";
import ToDo from "../components/ToDo";
import { useState, useEffect } from "react";
import ToDoListModal from "../components/itemListModal";
axios.defaults.baseURL = "https://wayi.league-funny.com/api";
//axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log("API_URL",process)
const ToDoList = () => {
  let taskData = {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState([]);
  function switchModal() {
    setIsModalOpen(!isModalOpen);
  }

  //Todo行程回傳資訊
  useEffect(() => {
    getTodoList();
  }, []);
  const getTodoList = async () => {
    console.log(" 行程回傳資訊");
    try {
      const getTodoList = await axios.get(`/task`);
      const { total } = getTodoList.data;
      const indexTotal = Math.ceil(total / 10);
      taskData = { 1: getTodoList.data.data };
      for (let index = 2; index <= indexTotal; index++) {
        let getTodo = await axios.get(`/task?page=${index}`);
        taskData[index] = getTodo.data.data;
      }
      setTask(taskData);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  // const postTodoList = async (page = 1) => {
  //   const postTodoList = await axios.post(`/task`);
  //   console.log("API新增任務回傳資訊", postTodoList);
  // };
  // const putTodoList = async (page = 1) => {
  //   const putTodoList = await axios.put(`/task`);
  //   console.log("API更新任務回傳資訊", putTodoList);
  // };
  // const patchTodoList = async (page = 1) => {
  //   const patchTodoList = await axios.patch(`/task`);
  //   console.log("API更新任務狀態回傳資訊", patchTodoList);
  // };
  // const deleteTodoList = async (id) => {
  //   try {
  //     const deleteTodoList = await axios.delete(`/task${id}`);
  //     console.log("API刪除任務回傳資訊", deleteTodoList);
  //     if (res.data.success) {
  //       //刪除成功後重新載入商品列表
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      {isModalOpen ? (
        <ToDoListModal
          onClose={switchModal}
          title="我想用這個新標題"
          content="我想用這個內文"
        />
      ) : null}
      　
      <div className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <button
          onClick={switchModal}
          type="submit"
          className="bg-orange-600 py-3 px-11 w-full text-white"
        >
          新增
        </button>
      </div>
      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                任務名稱
              </th>
              <th scope="col" className="px-6 py-3">
                任務描述
              </th>
              <th scope="col" className="px-6 py-3">
                完成狀態
              </th>
              <th scope="col" className="px-6 py-3">
                創建時間
              </th>
              <th scope="col" className="px-6 py-3">
                更新時間
              </th>
              <th scope="col" className="px-6 py-3">
                狀態
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
 
       <ToDo task={task} />
 
          
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ToDoList;
