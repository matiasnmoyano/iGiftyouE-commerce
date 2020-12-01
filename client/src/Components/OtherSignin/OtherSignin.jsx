import React from "react";
import { Button } from "react-bootstrap";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const OtherSignin = () => {
  return (
    <>
      <div className="pb-4">
        <Button
          href="http://localhost:3001/auth/google"
          className="button-home  "
          style={{
            background: "rgba(153, 122, 97, 0.5)",
            border: "none",
            width: "50%",
            margin: "auto",
          }}
        >
          <FontAwesomeIcon icon={faGoogle} />
          <span className="ml-2">Google</span>
        </Button>
      </div>
      <div className="pb-4">
        <Button
          href="http://localhost:3001/auth/github"
          className="button-home"
          style={{
            background: "rgba(153, 122, 97, 0.5)",
            border: "none",
            width: "50%",
            margin: "auto",
          }}
        >
          <FontAwesomeIcon icon={faGithub} />
          <span className="ml-2">Github</span>
        </Button>
      </div>
    </>
  );
};

export default OtherSignin;
