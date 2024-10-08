  import React from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Button from 'react-bootstrap/Button';
  import Modal from 'react-bootstrap/Modal';
  import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
  import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
  import { saveAs } from 'file-saver';
  import BL_red from './BL.pdf'; // Load your template PDF
  import BL_blue from './BL_blue.pdf'; // Второй шаблон


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
    alert("Загружено успешно")
    const template = props.selectedTemplate === 'template1' ? BL_red : BL_blue;
    
    const existingPdfBytes = await fetch(template).then(res => res.arrayBuffer());
    // const existingPdfBytes = await fetch(BL_red).then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const { width, height } = firstPage.getSize();

    // const pdfFont = await pdfDoc.embedFont(StandardFonts.Courier); // Встраивание шрифта
    const pdfFont = await pdfDoc.embedFont(StandardFonts.CourierBold);
    console.log(pdfFont);
    const textSize = 8; // Размер шрифта
    const maxWidth = 265  ; // Ограничение по ширине текста
    const maxWidth1 = 120  ; // Ограничение по ширине текста
    const textSize1 = 18; // Размер шрифта

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
    const drawTextWithWrappingBig = (text, x, y) => {
      const lines = splitTextIntoLines(text, maxWidth, textSize1, pdfFont); 
      let yPosition = y;
      
      lines.forEach(line => {
        firstPage.drawText(line, {
          x,
          y: yPosition,
          size: textSize1,
          color: rgb(0, 0, 0),
          font: pdfFont, // шрифт, который вы встраиваете
        });
        yPosition -= lineHeight; // Сдвиг вниз для каждой новой строки
      });
    };
        // Функция для отрисовки текста с переносом на новую строку
        const drawTextWithWrapping100 = (text, x, y) => {
          const lines = splitTextIntoLines(text, maxWidth1, textSize, pdfFont); 
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
    if (props.selectedTemplate === 'template1') {

    // Отрисовка с переносом текста для каждого поля
    drawTextWithWrapping(`${props.info.billTo}`, 25, height - 60);
    drawTextWithWrapping(`${props.info.shipper}`, 25, height - 80);
    drawTextWithWrapping(`${props.info.shipper1}`, 25, height - 100);
    drawTextWithWrapping(`${props.info.billToEmail}`, 28, height - 132);
    drawTextWithWrapping(`${props.info.consignee}`, 28, height - 152);
    drawTextWithWrapping(`${props.info.consignee1}`, 28, height - 172);
    drawTextWithWrapping(`${props.info.billToAddress}`, 28, height - 202);
    drawTextWithWrapping(`${props.info.notify}`, 28, height - 226);
    drawTextWithWrapping(`${props.info.notify1}`, 28, height - 246);
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
      drawTextWithWrapping(`${item.descriptionName}`, 157, yPosition - 1); // Позиция для описания
      drawTextWithWrapping(`${item.descriptionQuantity}`, 157, yPosition - 11); // Позиция для описания
      drawTextWithWrapping(`${item.descriptionContacts}`, 157, yPosition - 21); // Позиция для описания
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
    drawTextWithWrapping(`${props.info.containerNo}`, 50, height - 557); // Позиция для описания
    drawTextWithWrapping(`${props.info.sealNo}`, 133, height - 557); // Позиция для описания
    drawTextWithWrapping(`${props.info.packagesUnit}`, 220, height - 557); // Позиция для описания
    drawTextWithWrapping(`${props.info.grWeight}`, 343, height - 557); // Позиция для описания
    drawTextWithWrapping(`${props.info.freight}`, 27, height - 625);
    drawTextWithWrapping(`${props.info.issue}`, 175, height - 704);
    drawTextWithWrapping(`${props.info.slr}`, 400, height - 787);
  } else {
    drawTextWithWrapping(`${props.info.billTo}`, 45, height - 35);
    drawTextWithWrapping(`${props.info.shipper}`, 45, height - 55);
    drawTextWithWrapping(`${props.info.shipper1}`, 45, height - 75);
    drawTextWithWrapping(`${props.info.billToEmail}`, 45, height - 112);
    drawTextWithWrapping(`${props.info.consignee}`, 45, height - 132);
    drawTextWithWrapping(`${props.info.consignee1}`, 45, height - 153);
    drawTextWithWrapping(`${props.info.billToAddress}`, 45, height - 183);
    drawTextWithWrapping(`${props.info.notify}`, 45, height - 193);
    drawTextWithWrapping(`${props.info.notify1}`, 45, height - 203);
    drawTextWithWrappingBig(`${props.info.billFrom}`, 405, height - 45);
    drawTextWithWrapping(`${props.info.billFromAddress}`, 45, height - 276);
    drawTextWithWrapping(`${props.info.voyage}`, 175, height - 275);
    drawTextWithWrapping(`${props.info.port}`, 45, height - 302);
    drawTextWithWrapping(`${props.info.portTo}`, 200, height - 302);
    drawTextWithWrapping(`${props.info.place}`, 365, height - 302);

    props.items.map((item, i) => {
      const yPosition = height - 330 - i * 80; // Увеличиваем отступ по высоте на 50 для каждого следующего элемента
      drawTextWithWrapping100(`${item.name}`, 45, yPosition - 32);       // Позиция для имени
      drawTextWithWrapping100(`${item.seal}`, 45, yPosition - 53);       // Позиция для имени
      drawTextWithWrapping100(`KGs`, 455, yPosition -5 );     // Позиция для цены
      drawTextWithWrapping100(`${item.price}`, 435, yPosition - 5);     // Позиция для цены
      drawTextWithWrapping100(`${item.descriptionName}`, 45, yPosition - 75); // Позиция для описания
      drawTextWithWrapping100(`SIZE : ${item.descriptionQuantity}`, 45, yPosition - 85); // Позиция для описания
      drawTextWithWrapping100(`${item.descriptionContacts}`, 45, yPosition - 95); // Позиция для описания
      drawTextWithWrapping100(`DATE OF MANUFACTURING: ${item.hs}`, 45, yPosition - 105); // Позиция для описания
      drawTextWithWrapping100(`COUNTRY OF ORIGIN ${item.ed}`, 45, yPosition - 135); // Позиция для описания
      drawTextWithWrapping100(`${item.pkgs}`, 185, yPosition - 5);     // Позиция для цены
      drawTextWithWrapping100(`${item.pkgs1}`, 185, yPosition - 15);     // Позиция для цены
      drawTextWithWrapping(`${item.load}`, 230, yPosition - 5);     // Позиция для цены
      drawTextWithWrapping(`SOC : ${item.soc}`, 230, yPosition - 30);     // Позиция для цены
      drawTextWithWrapping(`${item.material}`, 230, yPosition - 50);     // Позиция для цены
      drawTextWithWrapping(`${item.contacts}`, 230, yPosition - 95);     // Позиция для цены
      drawTextWithWrapping(`${item.measurement}`, 485, yPosition - 5);     // Позиция для цены
      drawTextWithWrapping(`CBM`, 510, yPosition -5 );     // Позиция для цены


    });

    drawTextWithWrapping(`${props.info.totalNo}`, 190, height - 561);
    drawTextWithWrapping(`${props.info.currency1}`, 500, height - 561);
    drawTextWithWrapping(`${props.info.revenueTons}`, 200, height - 586);
    drawTextWithWrapping100(`${props.info.ratePer}`, 285, height - 636);
    drawTextWithWrapping(`${props.info.prepairedAt}`, 110, height - 737);
    drawTextWithWrapping(`${props.info.noBl}`, 290, height - 760);
    drawTextWithWrapping(`${props.info.placeIssue}`, 400, height - 736);
    drawTextWithWrapping(`${props.info.placeIssue1}`, 500, height - 736);
    drawTextWithWrappingBig(`${props.info.asCarrier}`, 420, height - 755);
    drawTextWithWrapping(`${props.info.dateBottom}`, 55, height - 785);






    
  }
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

  





