import { Fragment } from "react";
import Meta from "../components/Meta/Meta";
import Form from "../components/UI/Form/Form";

function ContactPage() {
  return (
    <Fragment>
      <Meta
        title="Code with Zahid | Contact Me"
        description="This is contact page of codewithzahid.in, i will try to reply with in 72hrs."
      />
      <Form />
    </Fragment>
  );
}

export default ContactPage;
