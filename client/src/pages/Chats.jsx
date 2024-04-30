import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
// import '../App.css';

export const Chats = ({ socket, userName, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      // console.log(data);
    });
  }, [socket]);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Chat Header */}
        <div className="chat-header p-4 shadow-md  bg-[#7EA1FF]">
          <h1 className="text-xl text-gray-100 font-bold">Chat Room: {room}</h1>
        </div>

        {/* Chat Body */}
        <div className="flex-1 p-4 overflow-y-scroll overflow-x-hidden">
          <ScrollToBottom className="message-container">
            {messageList.map((messageContent) => {
              return (
                <div className="flex flex-col mb-5">
                  <div>
                    <p className={userName === messageContent.author ? "font-bold text-right text-sm" : "font-bold text-left text-sm"}>{messageContent.author}</p>
                  </div>
                  <div className={userName === messageContent.author ? "rounded-lg p-4 my-2 bg-[#7EA1FF] max-w-xs w-max ml-auto text-gray-100 text-xl" : "rounded-lg p-4 my-2 bg-gray-300 max-w-xs w-max text-xl"}>
                    {messageContent.message}
                  </div>
                  <div>
                    <p className={userName === messageContent.author ? "font-semibold text-right text-gray-500 text-sm" : "font-semibold text-left text-gray-500 text-sm"}>{messageContent.time}</p>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div >

        {/* Chat Footer */}
        <div className="chat-footer p-4 shadow-inner">
          <form action="#" className="flex">
            <input
              type="text"
              value={currentMessage}
              placeholder="Type a message..."
              className="flex-1 p-2 border-2 border-gray-300 rounded-lg focus:outline-none"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button
              type="submit"
              className="ml-4 px-4 py-2 bg-[#7EA1FF] text-white rounded-lg hover:bg-blue-600"
              onClick={sendMessage}
            >
              &#11166;
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
