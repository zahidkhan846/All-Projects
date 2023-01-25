import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuidV4 } from "uuid";

export function Login({ setId }) {
  const idRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setId(idRef.current.value);
  };

  const createUserId = () => {
    setId(uuidV4());
  };

  return (
    <Container
      className="align-items-center d-flex justify-content-center"
      style={{ height: "100vh" }}
    >
      <Form
        className="w-100"
        style={{ maxWidth: "450px" }}
        onSubmit={handleSubmit}
      >
        <Form.Group>
          <Form.Label>Enter Your Id</Form.Label>
          <Form.Control type="text" ref={idRef} required></Form.Control>
        </Form.Group>
        <Button type="submit" className="mr-2">
          Login
        </Button>
        <Button onClick={createUserId} variant="secondary">
          Create New Id
        </Button>
      </Form>
    </Container>
  );
}

// <section className="form-container">
//   <form className="login" onSubmit={handleSubmit}>
//     <h1 className="text-center mb-2 main-font">Login</h1>
//     <label htmlFor="id">Enter Your Id</label>
//     <input
//       type="text"
//       name="id"
//       onChange={(event) => setUserId(event.target.value)}
//       required
//     />
//     <button type="submit" className="btn">
//       Login
//     </button>
//   </form>
//   <div className="form-control">
//     <button onClick={createUserId} className="btn btn-secondary">
//       Create New Id
//     </button>
//   </div>
// </section>
