class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplate = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {
      // if template tag is supported
      const modalContentEls = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalEl = modalContentEls.querySelector(".modal");
      this.backdropEl = modalContentEls.querySelector(".backdrop");
      const contentElement = document.importNode(
        this.contentTemplate.content,
        true
      );
      this.modalEl.appendChild(contentElement);
      document.body.insertAdjacentElement("afterbegin", this.modalEl);
      document.body.insertAdjacentElement("afterbegin", this.backdropEl);
    } else {
      alert(this.fallbackText);
      return;
    }
  }
  hide() {
    this.modalEl.remove();
    this.backdropEl.remove();
    this.modalEl = null;
    this.backdropEl = null;
  }
}

export default Modal;
