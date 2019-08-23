import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideNav, { Nav, NavItem, NavIcon, NavText } from './sideNavStyling';

import Deployments from "../components/Workloads/Deployments";
import Jobs from "../components/Workloads/Jobs";
import Pods from "../components/Workloads/Pods";
import ReplicaSets from "../components/Workloads/ReplicaSets";
import Secrets from "../components/Config/Secrets";
import ConfigMaps from "../components/Config/ConfigMaps";
import Services from "../components/Services/Services";
import Ingresses from "../components/Services/Ingresses";
import PersistentVolumes from "../components/Storage/PersistentVolumes";
import PersistentVolumeClaims from "../components/Storage/PersistentVolumeClaims";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import "../../../assets/css/dashbaord.css"
import "../../../assets/css/style.css"


export default class SideNavigation extends Component {
  state = {
    selected: 'workloads/deployments'
  };

  onSelect = (selected) => {
    this.setState({ selected: selected });
  };

  render() {
    const { selected } = this.state;

    return (
      <Router>
        <Route render={({ location, history }) => (
          <React.Fragment>

            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">


                <SideNav
                  onSelect={
                    (selected) => {
                      this.onSelect()
                      const to = '/' + selected;
                      if (location.pathname !== to) {
                        history.push(to);
                      }
                    }
                  }
                  defaultExpanded={true}
                >

                  <div className="my-5"></div>

                  <Nav
                    defaultSelected={selected}
                  >
                    <NavItem eventKey="workloads">
                      <NavIcon>
                        <i className="fa fa-fw fa-pie-chart" style={{ fontSize: '1.75em', verticalAlign: 'middle' }} />
                      </NavIcon>
                      <NavText style={{ paddingRight: 32 }}>
                        WORKLOADS
              </NavText>
                      <NavItem eventKey="workloads/deployments">
                        <NavText>
                          Deployments
                  </NavText>
                      </NavItem>
                      <NavItem eventKey="workloads/replica-sets">
                        <NavText>
                          Replica sets
                  </NavText>
                      </NavItem>
                      <NavItem eventKey="workloads/jobs">
                        <NavText>
                          Jobs
                  </NavText>
                      </NavItem>
                      <NavItem eventKey="workloads/pods">
                        <NavText>
                          Pods
                  </NavText>
                      </NavItem>
                    </NavItem>

                    <NavItem eventKey="services">
                      <NavIcon>
                        <i className="fa fa-fw fa-server" style={{ fontSize: '1.75em' }} />
                      </NavIcon>
                      <NavText>
                        SERVICES & DELIVERY
              </NavText>

                      <NavItem eventKey="services/services">
                        <NavText>
                          Services
                      </NavText>
                      </NavItem>

                      <NavItem eventKey="services/ingresses">
                        <NavText>
                          Ingresses
                      </NavText>
                      </NavItem>
                    </NavItem>

                    <NavItem eventKey="storage">
                      <NavIcon>
                        <i className="fa fa-fw fa-hdd-o" style={{ fontSize: '1.75em' }} />
                      </NavIcon>
                      <NavText>
                        STORAGE
              </NavText>

                      <NavItem eventKey="storage/persistent-volumes">
                        <NavText>
                          Persistent Volumes
                </NavText>
                      </NavItem>

                      <NavItem eventKey="storage/persistent-volume-claims">
                        <NavText>
                          Persistent Volume Claims
                </NavText>
                      </NavItem>

                    </NavItem>

                    <NavItem eventKey="config">
                      <NavIcon>
                        <i className="fa fa-fw fa-cogs" style={{ fontSize: '1.75em' }} />
                      </NavIcon>
                      <NavText>
                        CONFIG
                  </NavText>

                      <NavItem eventKey="config/secrets">
                        <NavText>
                          Secrets
                    </NavText>
                      </NavItem>

                      <NavItem eventKey="config/config-maps">
                        <NavText>
                          Config Maps
                    </NavText>
                      </NavItem>

                    </NavItem>
                  </Nav>
                </SideNav>
              </div>
            </nav>

            <main>
              <Route path="/workloads/deployments" exact component={Deployments} />
              <Route path="/workloads/jobs" component={Jobs} />
              <Route path="/workloads/pods" component={Pods} />
              <Route path="/workloads/replica-sets" component={ReplicaSets} />
              <Route path="/services/services" component={Services} />
              <Route path="/services/ingresses" component={Ingresses} />
              <Route path="/storage/persistent-volumes" component={PersistentVolumes} />
              <Route path="/storage/persistent-volume-claims" component={PersistentVolumeClaims} />
              <Route path="/config/secrets" component={Secrets} />
              <Route path="/config/config-maps" component={ConfigMaps} />
            </main>
          </React.Fragment>
        )}
        />
      </Router>
    );
  }
}