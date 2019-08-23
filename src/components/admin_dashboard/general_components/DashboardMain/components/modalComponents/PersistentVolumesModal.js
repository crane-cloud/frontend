import React, { Component } from "react";
import Modal from 'react-awesome-modal';



export default class PersistentVolumesModal extends Component {
    // link: /persistentVolumes/{ this.props.clusterID }
    nodesArray = [
        { 
          persistentVolumeID : 345,  
          name : "pvc-2d1d0bfb-91ba-11e9-9c68-0a7ab1ee162a",
          capacity : "2Gi",
          accessModes : "ReadWriteOnce",
          reclaimPolicy : "delete",
          status : "bound",
          claim : "monitoring/prometheus-alertmanager",
          storageClass : "openebs-jiva-default",
          reason : "some reason",
          age : "2 years"
        },
        { 
            persistentVolumeID : 85,  
            name : "pvc-2d1d0bfb-91ba-11e9-9c68-0a8ty",
            capacity : "6Gi",
            accessModes : "ReadWriteOnce",
            reclaimPolicy : "delete",
            status : "released",
            claim : "monitoring/prometheus-alertmanager",
            storageClass : "openebs-jiva-default",
            reason : "some reason",
            age : "3 months"
          },
    ]



render(){
    return (
        <section>
            <Modal visible={this.props.visible}  /* width="400"   height="300" */  effect="fadeInUp" onClickAway={() => this.props.closeModal()}>
                <div>
                <a href="javascript:void(0);" onClick={() => this.props.closeModal({ visiblePersistentVolumesModal : false })}>Close</a>
                    <h1>{ this.props.title } { this.props.clusterID } Persistent Volumes</h1>
                    { this.renderNodeTable() }
                    <a href="javascript:void(0);" onClick={() => this.props.closeModal({ visiblePersistentVolumesModal : false })}>Close</a>
                </div>
            </Modal>
        </section>
    );
}

renderNodeTable = () => {
    return (<div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Capacity</th>
                    <th scope="col">Access Modes</th>
                    <th scope="col">Reclaim Policy</th>
                    <th scope="col">Status</th>
                    <th scope="col">Claim</th>
                    <th scope="col">Storage Class</th>
                    <th scope="col">Reason</th>
                    <th scope="col">Age</th>
                </tr>
            </thead>
            <tbody>
                {  
                    this.nodesArray.map((element) => {
                        return (
                            <tr key={ this.nodesArray.indexOf(element) }>
                                <td> { element.name }</td>
                                <td> { element.capacity } </td>
                                <td> { element.accessModes } </td>
                                <td> { element.reclaimPolicy } </td>
                                <td> { element.status } </td>
                                <td> { element.claim } </td>
                                <td> { element.storageClass } </td>
                                <td> { element.reason } </td>
                                <td> { element.age } </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
        </div>
    );
}

}