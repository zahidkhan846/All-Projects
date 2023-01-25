import React from "react"

export default function Contact() {
  return (
    <section className="contact-page">
      <article className="contact-form">
        <h3>Say Hello!</h3>
        <div className="underline"></div>
        <form
          action="https://formspree.io/f/mbjpklwe"
          method="POST"
          target="_blank"
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="name"
              name="name"
              className="form-control"
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              className="form-control"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="message"
              className="form-control"
            />
            <button type="submit" className="submit-btn btn">
              Submit
            </button>
          </div>
        </form>
      </article>
    </section>
  )
}
