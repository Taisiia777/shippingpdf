import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: '',
      currentDate: '',
      invoiceNumber: 1,
      dateOfIssue: '',
      billTo: '',
      billToEmail: '',
      billToAddress: '',
      billFrom: '',
      billFromEmail: '',
      billFromAddress: '',
      billFromAddress: '',
      voyage: '',
      port: '',
      portTo: '',
      place: '',
      freight: '',
      issue: '',
      containerNo: '',
      sealNo:'',
      packagesUnit:'',
      grWeight: '',
      slr: '',
      notes: '',
      total: '0.00',
      subTotal: '0.00',
      taxRate: '',
      taxAmmount: '0.00',
      discountRate: '',
      discountAmmount: '0.00'
    };
    this.state.items = [
      {
        id: 0,
        name: '',
        description: '',
        price: '1.00',
        quantity: 1,
        hs: '',
        ed: '',
        seal: ''

      }
    ];
    this.editField = this.editField.bind(this);
  }
  componentDidMount(prevProps) {
    this.handleCalculateTotal()
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState(this.state.items);
  };
  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var items = {
      id: id,
      name: '',
      price: '1.00',
      description: '',
      quantity: 1,
      hs: '',
      ed: '',
      seal: ''
    }
    this.state.items.push(items);
    this.setState(this.state.items);
  }
  handleCalculateTotal() {
    var items = this.state.items;
    var subTotal = 0;

    items.map(function(items) {
      subTotal = parseFloat(subTotal + (parseFloat(items.price).toFixed(2) * parseInt(items.quantity))).toFixed(2)
    });

    this.setState({
      subTotal: parseFloat(subTotal).toFixed(2)
    }, () => {
      this.setState({
        taxAmmount: parseFloat(parseFloat(subTotal) * (this.state.taxRate / 100)).toFixed(2)
      }, () => {
        this.setState({
          discountAmmount: parseFloat(parseFloat(subTotal) * (this.state.discountRate / 100)).toFixed(2)
        }, () => {
          this.setState({
            total: ((subTotal - this.state.discountAmmount) + parseFloat(this.state.taxAmmount))
          });
        });
      });
    });

  };
  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    };
    var items = this.state.items.slice();
    var newItems = items.map(function(items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({items: newItems});
    this.handleCalculateTotal();
  };
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    this.handleCalculateTotal();
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };
  openModal = (event) => {
    event.preventDefault()
    this.handleCalculateTotal()
    this.setState({isOpen: true})
  };
  closeModal = (event) => this.setState({isOpen: false});
  render() {
    return (<Form onSubmit={this.openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div class="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div class="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                {/* <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control type="date" value={this.state.dateOfIssue} name={"dateOfIssue"} onChange={(event) => this.editField(event)} style={{
                      maxWidth: '150px'
                    }} required="required"/>
                </div> */}
              </div>
              {/* <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control type="number" value={this.state.invoiceNumber} name={"invoiceNumber"} onChange={(event) => this.editField(event)} min="1" style={{
                    maxWidth: '70px'
                  }} required="required"/>
              </div> */}
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Shipper:</Form.Label>
                <Form.Control placeholder={"Shipper"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Label className="fw-bold">Consignee:</Form.Label>
                <Form.Control placeholder={"Consignee"} value={this.state.billToEmail} type="text" name="billToEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Label className="fw-bold">Notify Party:</Form.Label>
                <Form.Control placeholder={"Notify Party"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">B/L No.:</Form.Label>
                <Form.Control placeholder={"B/L No."} rows={3} value={this.state.billFrom} type="text" name="billFrom" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Label className="fw-bold">Booking No.:</Form.Label>
                <Form.Control placeholder={"Booking No."} value={this.state.billFromEmail} type="text" name="billFromEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Label className="fw-bold">Vessel:</Form.Label>
                <Form.Control placeholder={"Vessel"} value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Voyage No.:</Form.Label>
                <Form.Control placeholder={"Voyage No."} value={this.state.voyage} type="text" name="voyage" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Port of loading:</Form.Label>
                <Form.Control placeholder={"Port of loading"} value={this.state.port} type="text" name="port" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Port of discharge:</Form.Label>
                <Form.Control placeholder={"Port of discharge"} value={this.state.portTo} type="text" name="portTo" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Place of delivery:</Form.Label>
                <Form.Control placeholder={"Place of delivery"} value={this.state.place} type="text" name="place" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                
                <Form.Label className="fw-bold">CONTAINER NO:</Form.Label>
                <Form.Control placeholder={"CONTAINER NO"} value={this.state.containerNo} type="text" name="containerNo" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">SEAL NO:</Form.Label>
                <Form.Control placeholder={"SEAL NO"} value={this.state.sealNo} type="text" name="sealNo" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">PACKAGES(UNIT):</Form.Label>
                <Form.Control placeholder={"PACKAGES(UNIT)"} value={this.state.packagesUnit} type="text" name="packagesUnit" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">GR. WEIGHT</Form.Label>
                <Form.Control placeholder={"GR. WEIGHT"} value={this.state.grWeight} type="text" name="grWeight" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>

                <Form.Label className="fw-bold">Freight & Charges:</Form.Label>
                <Form.Control placeholder={"Freight & Charges"} value={this.state.freight} type="text" name="freight" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Place of Issue of B/L:</Form.Label>
                <Form.Control placeholder={"Place of Issue of B/L"} value={this.state.issue} type="text" name="issue" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">SLR Shipping:</Form.Label>
                <Form.Control placeholder={"SLR Shipping"} value={this.state.slr} type="text" name="slr" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                {/* <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:
                  </span>
                  <span>{this.state.currency}
                    {this.state.subTotal}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({this.state.discountRate || 0}%)</span>
                    {this.state.currency}
                    {this.state.discountAmmount || 0}</span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:
                  </span>
                  <span>
                    <span className="small ">({this.state.taxRate || 0}%)</span>
                    {this.state.currency}
                    {this.state.taxAmmount || 0}</span>
                </div>
                <hr/> */}
                <div className="d-flex flex-row align-items-start justify-content-between" style={{
                    fontSize: '1.125rem'
                  }}>
                  <span className="fw-bold">Total Weight:
                  </span>
                  <span className="fw-bold">
                    {this.state.total || 0}</span>
                </div>
              </Col>
            </Row>
            {/* <hr className="my-4"/>
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control placeholder="Thanks for your business!" name="notes" value={this.state.notes} onChange={(event) => this.editField(event)} as="textarea" className="my-2" rows={1}/> */}
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Generate PDF</Button>
            <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmmount={this.state.taxAmmount} discountAmmount={this.state.discountAmmount} total={this.state.total}/>
            {/* <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select onChange={event => this.onCurrencyChange({currency: event.target.value})} className="btn btn-light my-1" aria-label="Change Currency">
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group> */}
            {/* <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="taxRate" type="number" value={this.state.taxRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control name="discountRate" type="number" value={this.state.discountRate} onChange={(event) => this.editField(event)} className="bg-white border" placeholder="0.0" min="0.00" step="0.01" max="100.00"/>
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group> */}
          </div>
        </Col>
      </Row>
    </Form>)
  }
}

export default InvoiceForm;
