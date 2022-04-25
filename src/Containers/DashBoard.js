import * as React from 'react'
import {
  MapsComponent,
  Inject,
  LayersDirective,
  LayerDirective,
  MarkersDirective,
  MarkerDirective,
  Marker,
  Zoom,
  MapsTooltip,
} from '@syncfusion/ej2-react-maps'
import * as map from './worldmap.json'
import db from './firebase'
let mapDataSource = map
function DashBoard() {
  const [vehiclesList, setVehiclesList] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const firebaseApp = db.collection('vehicles')
  const getVehicles = async () => {
    await firebaseApp.get().then((item) => {
      const items = item.docs.map((doc) => doc.data())
      setVehiclesList(items)
      setLoading(false)
    })
  }
  React.useEffect(() => {
    getVehicles()
  }, [])
  if (loading) {
    return <div>Loading</div>
  }
  return (
    <div className="control-panel">
      <div className="control-section">
        <MapsComponent
          id="maps"
          useGroupingSeparator={true}
          format="n"
          zoomSettings={{
            enable: true,
          }}
        >
          <Inject services={[Marker, MapsTooltip, Zoom]} />
          <LayersDirective>
            <LayerDirective
              shapeData={mapDataSource}
              shapeSettings={{
                fill: '#C1DFF5',
              }}
              markerClusterSettings={{
                allowClustering: true,
                shape: 'Image',
                height: 40,
                width: 40,
                labelStyle: { color: 'white' },
                imageUrl:
                  'https://ej2.syncfusion.com/react/demos/src/maps/images/cluster.svg',
              }}
            >
              <MarkersDirective>
                <MarkerDirective
                  visible={true}
                  dataSource={vehiclesList}
                  shape="Image"
                  imageUrl="https://ej2.syncfusion.com/react/demos/src/maps/images/ballon.png"
                  tooltipSettings={{
                    visible: true,
                    valuePath: 'Vin',
                    template:
                      '<div id="template" style="width: 140px;opacity: 90%;background: rgba(53, 63, 76, 0.90);box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.40);padding:10px;border: 1px #abb9c6;border-radius: 4px;">' +
                      '<div style="font-size:13px;color:#ffffff;font-weight: 500;"><center>${Driver}</center></div>' +
                      '<hr style="margin-top: 2px;margin-bottom:5px;border:0.5px solid #DDDDDD">' +
                      '<div><span style="font-size:13px;color:#cccccc">Speed : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Speed}Km/hr</span></div>' +
                      '<div><span style="font-size:13px;color:#cccccc">Vin : </span><span style="font-size:13px;color:#ffffff;font-weight: 500;">${Vin}</span></div></div>',
                  }}
                  height={20}
                  width={20}
                  animationDuration={0}
                ></MarkerDirective>
              </MarkersDirective>
            </LayerDirective>
          </LayersDirective>
        </MapsComponent>
      </div>
    </div>
  )
}
export default DashBoard
