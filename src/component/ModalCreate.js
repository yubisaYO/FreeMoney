import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default class ModalCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      deskripsi: "",
      nominal: 0,
      tanggal: "",
      category: "",
    };
  }

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    const handleSave = this.props.handleSave;
    const Data = {
      deskripsi: this.state.deskripsi,
      nominal: parseInt(this.state.nominal),
      tanggal: this.state.tanggal,
      category: `${this.props.text === "Pengeluaran" ? "OUT" : "IN"}`,
    };
    handleSave(Data);
    this.handleClose();
  };

  render() {
    return (
      <>
        <button
          className={this.props.variant}
          onClick={() => this.handleShow()}
        >
          {this.props.text} <i className={this.props.icon}></i>
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="Masukkan Deskripsi"
                onChange={this.handleChange}
                name="deskripsi"
              />
              <label for="floatingInput">Deskripsi</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="number"
                class="form-control"
                id="floatingInput"
                placeholder="Masukan Nominal"
                onChange={this.handleChange}
                name="nominal"
              />
              <label for="floatingInput">Nominal</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="date"
                class="form-control"
                id="floatingInput"
                placeholder="Masukkan Tanggal"
                onChange={this.handleChange}
                name="tanggal"
              />
              <label for="floatingInput">Tanggal</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleSubmit}
              className={`${this.props.text === "Pengeluaran" && "btn-pink"}`}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
