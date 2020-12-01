import React, { useEffect, useState } from "react";
import "./MiniProductCard.css";
import { Form } from "react-bootstrap";

export default function MiniProductCard({ name, id, qProduct, idQuestion, setBooleanAnswers }) {

//console.log(qProduct, '--------Soy qProduct---------')
  return (
    <>
      <div className="Mini__Product__Card">
        <div>
          <Form>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div key={`custom-checkbox${id}a`} className="mb-3">
                <Form.Check
                  custom
                  inline
                  type="checkbox"
                  id={`custom-inline-${"checkbox"}${id}a`}
                  label={`si`}
                  name="group1"
                  onChange = {() => setBooleanAnswers(id, idQuestion, true)}
                  checked={qProduct && qProduct.questionproduct && qProduct.questionproduct.booleanAnswer === true}
                />
              </div>
              <div key={`custom-checkbox${id}b`} className="mb-3">
                <Form.Check
                  custom
                  inline
                  type="checkbox"
                  id={`custom-inline-${"checkbox"}${id}b`}
                  label="no"
                  name="group1"
                  onChange= {() => setBooleanAnswers(id, idQuestion, false)}
                  checked={qProduct && qProduct.questionproduct && qProduct.questionproduct.booleanAnswer === false}
                />
              </div>
            </div>
          </Form>
        </div>
        <p style={{ marginLeft: "20px" }}>{name}</p>
      </div>
    </>
  );
}
