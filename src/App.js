import React, { Component } from "react";
import "./App.css";
import ModalCreate from "./component/ModalCreate";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sisaUang: 0,
      persentaseSisa: 0,
      pemasukanUang: 0,
      pengeluaranUang: 0,
      transaksiIN: 0,
      transaksiOUT: 0,
      summary: [
        {
          deskripsi: "Menerima Gaji",
          tanggal: "1 Juli 2002",
          nominal: 1000000,
          category: "IN",
        },
        {
          deskripsi: "Makan Nasi Padang",
          tanggal: "2 Juli 2002",
          nominal: 20000,
          category: "OUT",
        },
      ],
    };
  }

  handleCount() {
    let manyOfIn = 0;
    let manyOfOut = 0;
    const totalIncome = this.state.summary.reduce((total, item) => {
      if (item.category === "IN") {
        manyOfIn += 1;
        return total + item.nominal;
      }
      return total;
    }, 0);
    const totalOutcome = this.state.summary.reduce((total, item) => {
      if (item.category === "OUT") {
        manyOfOut += 1;
        return total + item.nominal;
      }
      return total;
    }, 0);
    this.setState({
      pemasukanUang: totalIncome,
      pengeluaranUang: totalOutcome,
      transaksiIN: manyOfIn,
      transaksiOUT: manyOfOut,
      sisaUang: totalIncome - totalOutcome,
      persentaseSisa: Math.floor(
        ((totalIncome - totalOutcome) / (totalIncome + totalOutcome)) * 100
      ),
    });
  }

  componentDidMount() {
    this.handleCount();
  }

  handleSave = (data) => {
    console.log("testing");
    this.setState(
      {
        summary: [...this.state.summary, data],
      },
      () => {
        this.handleCount();
      }
    );
  };

  numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  render() {
    return (
      <>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 text-center">
              <h1>FREEMONEY APPS</h1>
              <hr className="w-75 mx-auto" />
              <h2 className="fw-bolder">
                Rp. {this.numberWithCommas(this.state.sisaUang)}
              </h2>
              <span className="title">
                Sisa uang kamu sisa {this.state.persentaseSisa}% lagi
              </span>
            </div>
          </div>

          <div className="row">
            <div className="col-6 p-4">
              <div className="card-wrapper">
                <div className="icon-wrapper">
                  <i className="bi bi-wallet2"></i>
                </div>
                <span className="title">Pemasukan</span>
                <h3>Rp. {this.numberWithCommas(this.state.pemasukanUang)}</h3>
                <div>
                  <span className="title text-ungu">
                    {this.state.transaksiIN}
                  </span>
                  <span> Transaksi</span>
                </div>
              </div>
            </div>
            <div className="col-6 p-4">
              <div class="card-wrapper">
                <div className="icon-wrapper">
                  <i className="bi bi-cash-coin"></i>
                </div>
                <span className="title">Pemakaian</span>
                <h3>Rp. {this.numberWithCommas(this.state.pengeluaranUang)}</h3>
                <div>
                  <span className="title text-ungu">
                    {this.state.transaksiOUT}
                  </span>
                  <span> Transaksi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-between align-items-center px-4">
              <h4>Ringkasan Transaksi</h4>
              <div className="wrapper-button d-flex">
                <ModalCreate
                  variant="btn btn-ungu"
                  icon="bi bi-plus-circle-fill"
                  text="Pemasukan"
                  handleSave={this.handleSave}
                />
                <ModalCreate
                  variant="btn btn-pink"
                  icon="bi bi-dash-circle-fill"
                  text="Pengeluaran"
                  handleSave={this.handleSave}
                />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            {this.state.summary.map((summary, i) => {
              return (
                <div
                  className={`col-12 d-flex justify-content-between align-items-center px-4 mb-2 ${
                    summary.category === "IN" ? "money" : "charge"
                  }`}
                >
                  <div className="d-flex align-items-center">
                    <div class="icon-wrapper h-75 fs-4 px-4 me-2">
                      {summary.category === "IN" ? (
                        <i class="bi bi-wallet2"></i>
                      ) : (
                        <i class="bi bi-bag-dash"></i>
                      )}
                    </div>

                    <div className="transaction">
                      <h6>{summary.deskripsi}</h6>
                      <span className="title">{summary.tanggal}</span>
                    </div>
                  </div>

                  <h5>
                    {summary.category === "OUT" && "-"}Rp.{" "}
                    {this.numberWithCommas(summary.nominal)}
                  </h5>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
