import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var template = this.props.template;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map(function(item) {
      return (
        <ItemRow onItemizedItemEdit={onItemizedItemEdit} item={item} onDelEvent={rowDel.bind(this)} key={item.id} currency={currency} template={template}/>
      )
    });
    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>WEIGHT</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold" onClick={this.props.onRowAdd}>Add Item</Button>
      </div>
    );

  }

}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }
  render() {
    return (
      <tr>
                {this.props.template === 'template1' ? (

        <td style={{width: '100%'}}>
          
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "name",
            placeholder: "Container No.",
            value: this.props.item.name,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "seal",
            placeholder: "Seal No.",
            value: this.props.item.seal,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriptionName",
            placeholder: "name",
            value: this.props.item.descriptionName,
            id: this.props.item.id
          }}/>
                    <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriptionQuantity",
            placeholder: "quantity",
            value: this.props.item.descriptionQuantity,
            id: this.props.item.id
          }}/>
                    <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriptionContacts",
            placeholder: "contacts",
            value: this.props.item.descriptionContacts,
            id: this.props.item.id
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "hs",
            placeholder: "HS CODE",
            value: this.props.item.hs,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "ed",
            placeholder: "ED NO",
            value: this.props.item.ed,
            id: this.props.item.id,
          }}/>
          {/* <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "pkgs",
            placeholder: "No of containers",
            value: this.props.item.pkgs,
            id: this.props.item.id,
          }}/><EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          cellData={{
          type: "text",
          name: "pkgs1",
          placeholder: "No of containers",
          value: this.props.item.pkgs1,
          id: this.props.item.id,
        }}/><EditableField
        onItemizedItemEdit={this.props.onItemizedItemEdit}
        cellData={{
        type: "text",
        name: "load",
        placeholder: "load",
        value: this.props.item.load,
        id: this.props.item.id,
      }}/>
      <EditableField
        onItemizedItemEdit={this.props.onItemizedItemEdit}
        cellData={{
        type: "text",
        name: "soc",
        placeholder: "soc",
        value: this.props.item.soc,
        id: this.props.item.id,
      }}/>
      <EditableField
      onItemizedItemEdit={this.props.onItemizedItemEdit}
      cellData={{
      type: "text",
      name: "material",
      placeholder: "material",
      value: this.props.item.material,
      id: this.props.item.id,
    }}/>
    <EditableField
      onItemizedItemEdit={this.props.onItemizedItemEdit}
      cellData={{
      type: "text",
      name: "contacts",
      placeholder: "contacts",
      value: this.props.item.contacts,
      id: this.props.item.id,
    }}/> */}
       </td>
  ):(
    <td style={{width: '100%'}}>

    <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "name",
            placeholder: "Container No.",
            value: this.props.item.name,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "seal",
            placeholder: "Material",
            value: this.props.item.seal,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriptionName",
            placeholder: "No",
            value: this.props.item.descriptionName,
            id: this.props.item.id
          }}/>
                    <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriptionQuantity",
            placeholder: "Size",
            value: this.props.item.descriptionQuantity,
            id: this.props.item.id
          }}/>
                    <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "descriptionContacts",
            placeholder: "Size",
            value: this.props.item.descriptionContacts,
            id: this.props.item.id
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "hs",
            placeholder: "Date",
            value: this.props.item.hs,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "ed",
            placeholder: "Country",
            value: this.props.item.ed,
            id: this.props.item.id,
          }}/>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            type: "text",
            name: "pkgs",
            placeholder: "No of containers",
            value: this.props.item.pkgs,
            id: this.props.item.id,
          }}/><EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          cellData={{
          type: "text",
          name: "pkgs1",
          placeholder: "No of containers2",
          value: this.props.item.pkgs1,
          id: this.props.item.id,
        }}/><EditableField
        onItemizedItemEdit={this.props.onItemizedItemEdit}
        cellData={{
        type: "text",
        name: "load",
        placeholder: "load",
        value: this.props.item.load,
        id: this.props.item.id,
      }}/>
      <EditableField
        onItemizedItemEdit={this.props.onItemizedItemEdit}
        cellData={{
        type: "text",
        name: "soc",
        placeholder: "soc",
        value: this.props.item.soc,
        id: this.props.item.id,
      }}/>
      <EditableField
      onItemizedItemEdit={this.props.onItemizedItemEdit}
      cellData={{
      type: "text",
      name: "material",
      placeholder: "material",
      value: this.props.item.material,
      id: this.props.item.id,
    }}/>
    <EditableField
      onItemizedItemEdit={this.props.onItemizedItemEdit}
      cellData={{
      type: "text",
      name: "contacts",
      placeholder: "contacts",
      value: this.props.item.contacts,
      id: this.props.item.id,
    }}/>
    <EditableField
      onItemizedItemEdit={this.props.onItemizedItemEdit}
      cellData={{
      type: "text",
      name: "measurement",
      placeholder: "measurement",
      value: this.props.item.measurement,
      id: this.props.item.id,
    }}/>
        </td>
    )}
        <td style={{minWidth: '70px'}}>
          <EditableField
          onItemizedItemEdit={this.props.onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: this.props.item.quantity,
            id: this.props.item.id,
          }}/>
        </td>
        <td style={{minWidth: '130px'}}>
          <EditableField
            onItemizedItemEdit={this.props.onItemizedItemEdit}
            cellData={{
            leading: this.props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: this.props.item.price,
            id: this.props.item.id,
          }}/>
        </td>
        <td className="text-center" style={{minWidth: '50px'}}>
          <BiTrash onClick={this.onDelEvent.bind(this)} style={{height: '33px', width: '33px', padding: '7.5px'}} className="text-white mt-1 btn btn-danger"/>
        </td>
      </tr>
    );

  }

}

export default InvoiceItem;
