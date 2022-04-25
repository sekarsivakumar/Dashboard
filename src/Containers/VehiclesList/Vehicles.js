import React, { useEffect, useState } from 'react'
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Toolbar,
    Inject,
    InfiniteScroll,
    Edit,
    CommandColumn,
} from '@syncfusion/ej2-react-grids'
import { v4 as uuidv4 } from 'uuid'
import db from '../firebase'
const Vehicles = () => {
    const [vehiclesList, setVehiclesList] = useState([])
    const firebaseApp = db.collection('vehicles')
    let gridInstance;
    const dataSourceChanged = (state) => {
        if (state.requestType === 'save') {
            if (state.action === 'edit') {
                editVehicle(state.data)
            } else if (state.action === 'add') {
                state.data.Vin = uuidv4()
                state.data.latitude = 13.902309
                state.data.longitude = 79.23223
                state.data.Speed = 90
                state.data.ignition = "ON"
                addVehicle(state.data)
            }
        } else if (state.requestType === 'delete') {
            deleteVehicle(state.data[0])
            gridInstance.refresh();
        }
        console.log(state);
    }
    function getVehicles() {
        firebaseApp.onSnapshot((querySnapshot) => {
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            setVehiclesList(items);
          });
    }
    useEffect(() => {
        getVehicles()
    }, [])
    function addVehicle(newVehicle) {
        firebaseApp
            .doc(newVehicle.Vin)
            .set(newVehicle)
            .catch((err) => {
                console.error(err)
            })
    }
    function deleteVehicle(deleteVehicle) {
        firebaseApp
            .doc(deleteVehicle.Vin)
            .delete()
            .catch((err) => {
                console.error(err)
            })
    }
    function editVehicle(updatedVehicle) {
        firebaseApp
            .doc(updatedVehicle.Vin)
            .update(updatedVehicle)
            .catch((err) => {
                console.error(err)
            })
    }
    const toolbarOptions = ['Add', 'Delete', 'Update', 'Cancel', 'Search']
    const editSettings = {
        allowEditing: true,
        allowAdding: true,
        allowDeleting: true,
        allowEditOnDblClick: true,
    }
    const commands = [
        {
            type: 'Edit',
            buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' },
        },
        {
            type: 'Save',
            buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' },
        },
        {
            type: 'Cancel',
            buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' },
        },
    ]
    return (
        <GridComponent  ref={grid => (gridInstance = grid)}
            dataSource={vehiclesList}
            toolbar={toolbarOptions}
            enableInfiniteScrolling={true}
            actionComplete={dataSourceChanged}
            editSettings={editSettings}
        >
            <ColumnsDirective>
                <ColumnDirective
                    field="Vin"
                    allowEditing={false}
                    headerText="Vin"
                    width="150"
                ></ColumnDirective>
                <ColumnDirective
                    field="CustomerName"
                    headerText="Customer Name"
                    width="50"
                ></ColumnDirective>
                <ColumnDirective
                    field="Driver"
                    headerText="Driver Name"
                    width="70"
                ></ColumnDirective>
                <ColumnDirective
                    field="LicencePlate"
                    headerText="Licence Plate"
                    width="70"
                />
                <ColumnDirective field="Office" headerText="Office" width="70" />
                <ColumnDirective field="latitude" allowEditing={false} headerText="Latitude" width="70" />
                <ColumnDirective field="longitude" allowEditing={false} headerText="Longitude" width="70" />
                <ColumnDirective field="Speed" allowEditing={false} headerText="Speed" width="70" />
                <ColumnDirective field="ignition" allowEditing={false} headerText="Ignition" width="70" />
                <ColumnDirective
                    headerText="Manage Records"
                    width="160"
                    commands={commands}
                ></ColumnDirective>
            </ColumnsDirective>
            <Inject services={[Toolbar, Page, InfiniteScroll, CommandColumn, Edit]} />
        </GridComponent>
    )
}
export default Vehicles
