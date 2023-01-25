import React from "react";
import styles from "./AddProduct.module.css";

function AddProduct() {
  return (
    <div className={styles.addProduct}>
      <form>
        <h2>Add Product</h2>
        <div className={styles.formControl}>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" placeholder="Title" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            rows="5"
            placeholder="Description"
          ></textarea>
        </div>
        <div className={styles.formControl}>
          <label htmlFor="price">Price</label>
          <input name="price" type="number" placeholder="Price" />
        </div>
        <div className={styles.formControl}>
          <label htmlFor="quantity">Quantity</label>
          <input name="quantity" type="number" placeholder="Quantity" />
        </div>
        <div className={styles.formControl}>
          <div className={styles.filediv}>
            Choose Picture
            <input
              className={styles.fileBtn}
              type="file"
              name="choose-picture"
            />
          </div>
        </div>
        <div className={`${styles.formControl} ${styles.formButtons}`}>
          <button className="btn bg-sec" onClick={() => {}}>
            Cancel
          </button>
          <button className="btn bg-prim" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
