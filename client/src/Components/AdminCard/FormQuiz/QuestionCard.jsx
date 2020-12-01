import React, { useState } from "react";

export default function QuestionCard({
  question,
  id,
  setEdit,
  edit,
  setShowProducts,
  deleteCurrentQuestion,
  setInput,
  saveChange,
}) {
  const [deleted, setDeleted] = useState(false);

  if (deleted || !question) return null;
  if (id === -1) setDeleted(true);
  return (
    <div className="Question__Card" key={id}>
      {!edit[id] && (
        <div
          style={{
            display: "Flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <p>{question}</p>
          {/*------------------BUTTON EDIT----------------------- */}
          <div>
            <button
              className="Button__Gift__Question"
              style={{ width: "fit-content" }}
              onClick={() => setEdit({ [id]: !edit[id] })}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-pencil-square"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "25px",
                  height: "25px",
                  margin: "5px",
                }}
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
            {/* -------------------------BUTTON GIFT--------------------------- */}
            <button
              className="Button__Gift__Question"
              onClick={() => setShowProducts(id)}
            >
              <svg
                width="1.5em"
                height="1.5em"
                viewBox="0 0 16 16"
                class="bi bi-gift-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3z"
                />
                <path d="M15 7v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z" />
              </svg>
            </button>
            {/* ---------------------BUTTON DELETE---------------------------- */}
            <button
              className="Button__Gift__Question"
              onClick={() => {
                deleteCurrentQuestion(id, setDeleted);
              }}
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-trash-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  width: "25px",
                  height: "25px",
                  margin: "5px",
                  color: "#AA123D",
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {edit[id] && (
        <div style={{ display: "flex", flexDirection: "row" }} key={id}>
          <form style={{ width: "90%" }}>
            <input
              className="Input__Question"
              style={{ width: "100%" }}
              onChange={(e) => setInput(e.target.value)}
              placeholder={question}
            ></input>
          </form>
          {/* -------------------------------BUTTON CHECK------------------------------- */}
          <button className="Button__Check" onClick={() => saveChange(id)}>
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              class="bi bi-check-circle"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                fill-rule="evenodd"
                d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
