import { useContext } from "react";
import Button from "./UI/Button";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import { UserProgressContext } from "../store/UserProgressContext";

const Checkout = () => {
  const { progress, hideCheckout } = useContext(UserProgressContext);

  const handleClose = () => {
    hideCheckout();
  };

  return (
    <Modal open={progress === "checkout"} onClose={handleClose}>
      <form>
        <h2>Checkout</h2>
        <p>Total Amount: </p>
        <Input label="Full Name" type="text" id="full-name" />
        <Input label="E-Mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
