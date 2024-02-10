import React from "react";
import "./ContactForm.css";
import { useForm, ValidationError } from "@formspree/react";
import Button from "../shared/Button";
function ContactForm() {
  const [state, handleSubmit] = useForm("xqkvvbgq");
  if (state.succeeded) {
    return <p>Thanks for Contacting!</p>;
  }
  return (
    <div className="form_input">
      <h2 className="contact_header">Send Us A Message</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input id="email" type="email" name="email" />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
        <Button type="submit" disabled={state.submitting}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ContactForm;
