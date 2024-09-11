// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table';
// import Modal from 'react-bootstrap/Modal';
// import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf'

// function GenerateInvoice() {
//   html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png', 1.0);
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'pt',
//       format: [612, 792]
//     });
//     pdf.internal.scaleFactor = 1;
//     const imgProps= pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('invoice-001.pdf');
//   });
// }

// class InvoiceModal extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//   render() {
//     return(
//       <div>
//         <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
//           <div id="invoiceCapture">
//             <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
//               <div className="w-100">
//                 <h4 className="fw-bold my-2">{this.props.info.billFrom||'John Uberbacher'}</h4>
//                 <h6 className="fw-bold text-secondary mb-1">
//                   Invoice #: {this.props.info.invoiceNumber||''}
//                 </h6>
//               </div>
//               <div className="text-end ms-4">
//                 <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
//                 <h5 className="fw-bold text-secondary"> {this.props.currency} {this.props.total}</h5>
//               </div>
//             </div>
//             <div className="p-4">
//               <Row className="mb-4">
//                 <Col md={4}>
//                   <div className="fw-bold">Billed to:</div>
//                   <div>{this.props.info.billTo||''}</div>
//                   <div>{this.props.info.billToAddress||''}</div>
//                   <div>{this.props.info.billToEmail||''}</div>
//                 </Col>
//                 <Col md={4}>
//                   <div className="fw-bold">Billed From:</div>
//                   <div>{this.props.info.billFrom||''}</div>
//                   <div>{this.props.info.billFromAddress||''}</div>
//                   <div>{this.props.info.billFromEmail||''}</div>
//                 </Col>
//                 <Col md={4}>
//                   <div className="fw-bold mt-2">Date Of Issue:</div>
//                   <div>{this.props.info.dateOfIssue||''}</div>
//                 </Col>
//               </Row>
//               <Table className="mb-0">
//                 <thead>
//                   <tr>
//                     <th>QTY</th>
//                     <th>DESCRIPTION</th>
//                     <th className="text-end">PRICE</th>
//                     <th className="text-end">AMOUNT</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {this.props.items.map((item, i) => {
//                     return (
//                       <tr id={i} key={i}>
//                         <td style={{width: '70px'}}>
//                           {item.quantity}
//                         </td>
//                         <td>
//                           {item.name} - {item.description}
//                         </td>
//                         <td className="text-end" style={{width: '100px'}}>{this.props.currency} {item.price}</td>
//                         <td className="text-end" style={{width: '100px'}}>{this.props.currency} {item.price * item.quantity}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//               <Table>
//                 <tbody>
//                   <tr>
//                     <td>&nbsp;</td>
//                     <td>&nbsp;</td>
//                     <td>&nbsp;</td>
//                   </tr>
//                   <tr className="text-end">
//                     <td></td>
//                     <td className="fw-bold" style={{width: '100px'}}>SUBTOTAL</td>
//                     <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.subTotal}</td>
//                   </tr>
//                   {this.props.taxAmmount != 0.00 &&
//                     <tr className="text-end">
//                       <td></td>
//                       <td className="fw-bold" style={{width: '100px'}}>TAX</td>
//                       <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.taxAmmount}</td>
//                     </tr>
//                   }
//                   {this.props.discountAmmount != 0.00 &&
//                     <tr className="text-end">
//                       <td></td>
//                       <td className="fw-bold" style={{width: '100px'}}>DISCOUNT</td>
//                       <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.discountAmmount}</td>
//                     </tr>
//                   }
//                   <tr className="text-end">
//                     <td></td>
//                     <td className="fw-bold" style={{width: '100px'}}>TOTAL</td>
//                     <td className="text-end" style={{width: '100px'}}>{this.props.currency} {this.props.total}</td>
//                   </tr>
//                 </tbody>
//               </Table>
//               {this.props.info.notes &&
//                 <div className="bg-light py-3 px-4 rounded">
//                   {this.props.info.notes}
//                 </div>}
//             </div>
//           </div>
//           <div className="pb-4 px-4">
//             <Row>
//               <Col md={6}>
//                 <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
//                   <BiPaperPlane style={{width: '15px', height: '15px', marginTop: '-3px'}} className="me-2"/>Send Invoice
//                 </Button>
//               </Col>
//               <Col md={6}>
//                 <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
//                   <BiCloudDownload style={{width: '16px', height: '16px', marginTop: '-3px'}} className="me-2"/>
//                   Download Copy
//                 </Button>
//               </Col>
//             </Row>
//           </div>
//         </Modal>
//         <hr className="mt-4 mb-3"/>
//       </div>
//     )
//   }
// }

// export default InvoiceModal;











// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
// import { PDFDocument, rgb } from 'pdf-lib';
// import { saveAs } from 'file-saver';
// import BL_red from './BL_red.pdf'; // Load your template PDF

// async function GenerateInvoice(props) {
//   const existingPdfBytes = await fetch(BL_red).then(res => res.arrayBuffer());

//   const pdfDoc = await PDFDocument.load(existingPdfBytes);
//   const pages = pdfDoc.getPages();
//   const firstPage = pages[0];

//   const { width, height } = firstPage.getSize();

//   firstPage.drawText(`${props.info.billTo}`, {
//     x: 25,
//     y: height - 60,
//     size: 10,
//     color: rgb(0, 0, 0),
//   });

//   firstPage.drawText(`${props.info.billToEmail}`, {
//     x: 25,
//     y: height - 135,
//     size: 10,
//     color: rgb(0, 0, 0),
//   });

//   firstPage.drawText(`Amount Due: ${props.currency} ${props.total}`, {
//     x: 400,
//     y: height - 80,
//     size: 10,
//     color: rgb(0.5, 0, 0),
//   });
//   const pdfBytes = await pdfDoc.save();
//   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
//   saveAs(blob, 'invoice-template.pdf');

//   // Return the PDF bytes for previewing
//   return URL.createObjectURL(blob);
// }

// class InvoiceModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       previewUrl: null,
//       showPreview: false,
//     };
//   }

//   handlePreview = async () => {
//     const previewUrl = await GenerateInvoice(this.props);
//     this.setState({ previewUrl, showPreview: true });
//   };


//   render() {
//     return (
//       <div>
//         <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
//           <div id="invoiceCapture">
//             <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
//               <div className="w-100">
//                 <h4 className="fw-bold my-2">{this.props.info.billFrom || 'John Uberbacher'}</h4>
//                 <h6 className="fw-bold text-secondary mb-1">
//                   Invoice #: {this.props.info.invoiceNumber || ''}
//                 </h6>
//               </div>
//               <div className="text-end ms-4">
//                 <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
//                 <h5 className="fw-bold text-secondary">{this.props.currency} {this.props.total}</h5>
//               </div>
//             </div>
//             <div className="p-4">
//               {/* Your table and other UI components here */}
//             </div>
//           </div>
//           <div className="pb-4 px-4">
//             <Row>
//               <Col md={4}>
//                 <Button variant="primary" className="d-block w-100" onClick={() => GenerateInvoice(this.props)}>
//                   <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Send Invoice
//                 </Button>
//               </Col>
//               <Col md={4}>
//                 <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={() => GenerateInvoice(this.props)}>
//                   <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
//                   Download Copy
//                 </Button>
//               </Col>
//               <Col md={4}>
//                 <Button variant="outline-info" className="d-block w-100 mt-3 mt-md-0" onClick={this.handlePreview}>
//                   Preview PDF
//                 </Button>
//               </Col>
//             </Row>
//           </div>
//         </Modal>

//         {/* Preview Modal */}
//         <Modal show={this.state.showPreview} onHide={() => this.setState({ showPreview: false })} size="lg" centered>
//           <Modal.Header closeButton>
//             <Modal.Title>Invoice Preview</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {this.state.previewUrl ? (
//               <iframe
//                 src={this.state.previewUrl}
//                 title="Invoice Preview"
//                 width="100%"
//                 height="600px"
//                 style={{ border: 'none' }}
//               ></iframe>
//             ) : (
//               <p>Loading preview...</p>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => this.setState({ showPreview: false })}>
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default InvoiceModal;








  import React from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
  import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
  import { saveAs } from 'file-saver';
  import BL_red from './BL_red.pdf'; // Load your template PDF


  // Функция для разбиения текста на строки
  function splitTextIntoLines(text, maxWidth, size, pdfFont) {
    const lines = [];
    let currentLine = '';
    let currentWidth = 0;

    const words = text.split(' '); // Разделение текста на слова
    for (let word of words) {
      // Рассчитываем ширину текущего слова
      const wordWidth = pdfFont.widthOfTextAtSize(word + ' ', size);

      if (currentWidth + wordWidth > maxWidth) {
        // Если ширина текущей строки больше maxWidth, переносим слово на новую строку
        lines.push(currentLine.trim());
        currentLine = word + ' ';
        currentWidth = wordWidth;
      } else {
        // Иначе продолжаем добавлять слова в текущую строку
        currentLine += word + ' ';
        currentWidth += wordWidth;
      }
    }
    // Добавляем последнюю строку
    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines;
  }

  async function GenerateInvoice(props) {
    const existingPdfBytes = await fetch(BL_red).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    // const pdfFont = await pdfDoc.embedFont(StandardFonts.Courier); // Встраивание шрифта
    const pdfFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    console.log(pdfFont);
    const textSize = 8; // Размер шрифта
    const maxWidth = 265  ; // Ограничение по ширине текста
    const lineHeight = textSize * 1.2; // Межстрочный интервал

    // Функция для отрисовки текста с переносом на новую строку
    const drawTextWithWrapping = (text, x, y) => {
      const lines = splitTextIntoLines(text, maxWidth, textSize, pdfFont); 
      let yPosition = y;
      
      lines.forEach(line => {
        firstPage.drawText(line, {
          x,
          y: yPosition,
          size: textSize,
          color: rgb(0, 0, 0),
          font: pdfFont, // шрифт, который вы встраиваете
        });
        yPosition -= lineHeight; // Сдвиг вниз для каждой новой строки
      });
    };

    // Отрисовка с переносом текста для каждого поля
    drawTextWithWrapping(`${props.info.billTo}`, 25, height - 60);
    drawTextWithWrapping(`${props.info.billToEmail}`, 28, height - 132);
    drawTextWithWrapping(`${props.info.billToAddress}`, 22, height - 202);
    drawTextWithWrapping(`${props.info.billFrom}`, 443, height - 35);
    drawTextWithWrapping(`${props.info.billFromEmail}`, 458, height - 55);
    drawTextWithWrapping(`${props.info.billFromAddress}`, 30, height - 276);
    drawTextWithWrapping(`${props.info.voyage}`, 175, height - 275);
    drawTextWithWrapping(`${props.info.port}`, 30, height - 295);
    drawTextWithWrapping(`${props.info.portTo}`, 175, height - 297);
    drawTextWithWrapping(`${props.info.place}`, 330, height - 291);
    props.items.map((item, i) => {
      const yPosition = height - 330 - i * 80; // Увеличиваем отступ по высоте на 50 для каждого следующего элемента
      drawTextWithWrapping(`${item.name} /`, 25, yPosition);       // Позиция для имени
      drawTextWithWrapping(`${item.seal}`, 25, yPosition - 10);       // Позиция для имени
      drawTextWithWrapping(`KGs`, 453, yPosition);     // Позиция для цены
      drawTextWithWrapping(`${item.price}`, 450, yPosition - 10);     // Позиция для цены
      drawTextWithWrapping(`${item.description}`, 157, yPosition - 1); // Позиция для описания
      drawTextWithWrapping(`HS CODE: ${item.hs}`, 155, yPosition - 53); // Позиция для описания
      drawTextWithWrapping(`ED NO ${item.ed}`, 155, yPosition - 73); // Позиция для описания

    });
    drawTextWithWrapping(`CONTAINER NO`, 25, height - 542); // Позиция для описания
    drawTextWithWrapping(`SEAL NO`, 133, height - 542); // Позиция для описания
    drawTextWithWrapping(`PACKAGES(UNIT)`, 220, height - 542); // Позиция для описания
    drawTextWithWrapping(`GR. WEIGHT`, 343, height - 542); // Позиция для описания

    firstPage.drawText(`--------------------------------------------------------------------------------------------------------------------------------------------------------------`, {
      x: 25,
      y: height - 550,
      size: 8,
      color: rgb(0, 0, 0),
      
    });
    drawTextWithWrapping(`${props.info.freight}`, 27, height - 625);
    drawTextWithWrapping(`${props.info.issue}`, 175, height - 704);
    drawTextWithWrapping(`${props.info.slr}`, 380, height - 787);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'invoice-template.pdf');

    // Return the PDF bytes for previewing
    return URL.createObjectURL(blob);
  }

  class InvoiceModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        previewUrl: null,
        showPreview: false,
      };
    }

    handlePreview = async () => {
      const previewUrl = await GenerateInvoice(this.props);
      this.setState({ previewUrl, showPreview: true });
    };
    render() {
      return (
        <div>
          <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
            <div id="invoiceCapture">
              <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                <div className="w-100">
                  <h4 className="fw-bold my-2">{this.props.info.billFrom || 'John Uberbacher'}</h4>
                  <h6 className="fw-bold text-secondary mb-1">
                    Invoice #: {this.props.info.invoiceNumber || ''}
                  </h6>
                </div>
                <div className="text-end ms-4">
                  <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                  <h5 className="fw-bold text-secondary">{this.props.currency} {this.props.total}</h5>
                </div>
              </div>
              <div className="p-4">
                {/* Your table and other UI components here */}
              </div>
            </div>
            <div className="pb-4 px-4">
              <Row>
                <Col md={4}>
                  <Button variant="primary" className="d-block w-100" onClick={() => GenerateInvoice(this.props)}>
                    <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Send Invoice
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={() => GenerateInvoice(this.props)}>
                    <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                    Download Copy
                  </Button>
                </Col>
                <Col md={4}>
                  <Button variant="outline-info" className="d-block w-100 mt-3 mt-md-0" onClick={this.handlePreview}>
                    Preview PDF
                  </Button>
                </Col>
              </Row>
            </div>
          </Modal>

          {/* Preview Modal */}
          <Modal show={this.state.showPreview} onHide={() => this.setState({ showPreview: false })} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Invoice Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.previewUrl ? (
                <iframe
                  src={this.state.previewUrl}
                  title="Invoice Preview"
                  width="100%"
                  height="600px"
                  style={{ border: 'none' }}
                ></iframe>
              ) : (
                <p>Loading preview...</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => this.setState({ showPreview: false })}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

  export default InvoiceModal;
