import Modal from "../Modal";

const SettingsModal = ({ showModal, onClickAway, title, children }) => (
  <Modal showModal={showModal} onClickAway={onClickAway}>
    <div className="AppModal">
      <div className="ModalTitle">{title}</div>
      {children}
    </div>
  </Modal>
);

export default SettingsModal;
