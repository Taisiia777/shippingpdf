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
import Modal from 'react-bootstrap/Modal';
import template1Image from './template1.png'; // путь к вашему изображению для шаблона 1
import template2Image from './template2.png'; // путь к вашему изображению для шаблона 2

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTemplate: '',
      showTemplateModal: true,
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
      shipper:'',
      shipper1:'',
      consignee: '',
      consignee1: '',
      notify: '',
      notify1: '',
      slr: '',
      notes: '',
      asCarrier: '',
      noBl: '',
      placeIssue1: '',
      placeIssue: '',
      prepairedAt: '',
      ratePer: '',
      revenueTons: '',
      currency1: '',
      totalNo: '',
      dateBottom: '',
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
        descriptionName: '',
        descriptionQuantity: '',
        descriptionContacts: '',
        price: '1.00',
        quantity: 1,
        hs: '',
        ed: '',
        seal: '',
        pkgs: '',
        pkgs1: '',
        soc: '',
        load: '',
        material: '',
        contacts: '',
        measurement: '',

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
      descriptionName: '',
      descriptionQuantity: '',
      descriptionContacts: '',
      quantity: 1,
      hs: '',
      ed: '',
      seal: '',
      pkgs: '',
      pkgs1: '',
      soc: '',
      load: '',
      material: '',
      contacts: '',
      measurement: ''
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
  selectTemplate = (template) => {
    this.setState({
      selectedTemplate: template,
      showTemplateModal: false, // закрываем модальное окно
    });
  }
  render() {
      return (
      <div>
 
<Modal show={this.state.showTemplateModal} centered>
  <Modal.Header>
    <Modal.Title>Выберите шаблон для PDF</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <div className="d-flex justify-content-around">
      <Button variant="primary" onClick={() => {    alert("Выбран шаблое SLR");
this.selectTemplate('template1')}} style={{display: 'flex', flexDirection: 'column'}}>
        SLR
        <img src={template1Image} alt="Шаблон 1" style={{ width: '150px', marginRight: '10px' }} />
      </Button>
      <Button variant="secondary" onClick={() => {alert("Выбран шаблое HAL");
        this.selectTemplate('template2')}} style={{display: 'flex', flexDirection: 'column'}}>
        HAL
        <img src={template2Image} alt="Шаблон 2" style={{ width: '150px', marginRight: '10px' }} />
      </Button>
    </div>
  </Modal.Body>
</Modal>

        {this.state.selectedTemplate === 'template1' ? (

      <Form onSubmit={this.openModal}>
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
             
              </div>
             
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Shipper:</Form.Label>
                <Form.Control placeholder={"Name"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Adress"} rows={3} value={this.state.shipper} type="text" name="shipper" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Contact"} rows={3} value={this.state.shipper1} type="text" name="shipper1" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Label className="fw-bold">Consignee:</Form.Label>
                <Form.Control placeholder={"Name"} value={this.state.billToEmail} type="text" name="billToEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Adress"} value={this.state.consignee} type="text" name="consignee" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Contact"} value={this.state.consignee1} type="text" name="consignee1" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Label className="fw-bold">Notify Party:</Form.Label>
                <Form.Control placeholder={"Name"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Control placeholder={"Adress"} value={this.state.notify} type="text" name="notify" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Control placeholder={"Contact"} value={this.state.notify1} type="text" name="notify1" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
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
            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} template={this.state.selectedTemplate}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
               
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
          
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Generate PDF</Button>
            <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmmount={this.state.taxAmmount} discountAmmount={this.state.discountAmmount} total={this.state.total}/>
           
          </div>
        </Col>
      </Row>
    </Form>
      ):
      (
       
      <Form onSubmit={this.openModal}>
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
             
              </div>
             
            </div>
            <hr className="my-4"/>
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Shipper:</Form.Label>
                <Form.Control placeholder={"Name"} rows={3} value={this.state.billTo} type="text" name="billTo" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Adress"} rows={3} value={this.state.shipper} type="text" name="shipper" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Control placeholder={"Contact"} rows={3} value={this.state.shipper1} type="text" name="shipper1" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Label className="fw-bold">Consignee:</Form.Label>
                <Form.Control placeholder={"Name"} value={this.state.billToEmail} type="text" name="billToEmail" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Adress"} value={this.state.consignee} type="text" name="consignee" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Control placeholder={"Contact"} value={this.state.consignee1} type="text" name="consignee1" className="my-2" onChange={(event) => this.editField(event)} autoComplete="email" required="required"/>
                <Form.Label className="fw-bold">Notify Party:</Form.Label>
                <Form.Control placeholder={"Name"} value={this.state.billToAddress} type="text" name="billToAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Control placeholder={"Adress"} value={this.state.notify} type="text" name="notify" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Control placeholder={"Contact"} value={this.state.notify1} type="text" name="notify1" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">B/L No.:</Form.Label>
                <Form.Control placeholder={"B/L No."} rows={3} value={this.state.billFrom} type="text" name="billFrom" className="my-2" onChange={(event) => this.editField(event)} autoComplete="name" required="required"/>
                <Form.Label className="fw-bold">Vessel:</Form.Label>
                <Form.Control placeholder={"Vessel"} value={this.state.billFromAddress} type="text" name="billFromAddress" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Voyage No.:</Form.Label>
                <Form.Control placeholder={"Voyage No."} value={this.state.voyage} type="text" name="voyage" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Port of loading:</Form.Label>
                <Form.Control placeholder={"Port of loading"} value={this.state.port} type="text" name="port" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Port of discharge:</Form.Label>
                <Form.Control placeholder={"Port of discharge"} value={this.state.portTo} type="text" name="portTo" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Place of delivery:</Form.Label>
                <Form.Control placeholder={"Place of delivery"} value={this.state.place} type="text" name="place" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
              <Col>
                <Form.Label className="fw-bold">Total No:</Form.Label>
                <Form.Control placeholder={"Total No"} value={this.state.totalNo} type="text" name="totalNo" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Control placeholder={"Currency"} value={this.state.currency1} type="text" name="currency1" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Revenue Tons:</Form.Label>
                <Form.Control placeholder={"Revenue Tons"} value={this.state.revenueTons} type="text" name="revenueTons" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Rate per:</Form.Label>
                <Form.Control placeholder={"Rate per"} value={this.state.ratePer} type="text" name="ratePer" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Prepaired at:</Form.Label>
                <Form.Control placeholder={"Prepaired at"} value={this.state.prepairedAt} type="text" name="prepairedAt" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Place and date of issue:</Form.Label>
                <Form.Control placeholder={"Place"} value={this.state.placeIssue} type="text" name="placeIssue" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Control placeholder={"Issue"} value={this.state.placeIssue1} type="text" name="placeIssue1" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">No of original B/L:</Form.Label>
                <Form.Control placeholder={"Rate per"} value={this.state.noBl} type="text" name="noBl" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">Date:</Form.Label>
                <Form.Control placeholder={"Date"} value={this.state.dateBottom} type="text" name="dateBottom" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
                <Form.Label className="fw-bold">As Carrier:</Form.Label>
                <Form.Control placeholder={"Rate per"} value={this.state.asCarrier} type="text" name="asCarrier" className="my-2" autoComplete="address" onChange={(event) => this.editField(event)} required="required"/>
              </Col>
            </Row>
            <InvoiceItem onItemizedItemEdit={this.onItemizedItemEdit.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} onRowDel={this.handleRowDel.bind(this)} currency={this.state.currency} items={this.state.items} template={this.state.selectedTemplate}/>
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
               
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
          
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">Generate PDF</Button>
            <InvoiceModal showModal={this.state.isOpen} closeModal={this.closeModal} info={this.state} items={this.state.items} currency={this.state.currency} subTotal={this.state.subTotal} taxAmmount={this.state.taxAmmount} discountAmmount={this.state.discountAmmount} total={this.state.total}/>
           
          </div>
        </Col>
      </Row>
    </Form> 
      )
      }
    </div>
    )
  }
}

export default InvoiceForm;
