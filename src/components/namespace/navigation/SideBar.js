import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import Deployments from "../components/Workloads/Deployments";
import Jobs from "../components/Workloads/Jobs";
import Pods from "../components/Workloads/Pods";
import ReplicaSets from "../components/Workloads/ReplicaSets";
import Secrets from "../components/Config/Secrets";
import ConfigMaps from "../components/Config/ConfigMaps";
import Services from "../components/Services/Services";
import Ingresses from "../components/Services/Ingresses";
import PersistentVolumes from "../components/Storage/PersistentVolumes";


import '@trendmicro/react-sidenav/dist/react-sidenav.css';

export default class SideNavigation extends Component {

  render() {
    return (
      <Router>
        <Route render={({ location, history }) => (
          <React.Fragment>

            <SideNav
              onSelect={(selected) => {
                const to = '/' + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
            >

              <Toggle />

              <SideNav.Nav defaultSelected="namespaces">

                <NavItem eventKey="workloads">
                  <NavIcon>
                    <i className="fa fa-fw fa-pie-chart" style={{ fontSize: '1.75em' }} />
                  </NavIcon>
                  <NavText>
                    Workloads
                  </NavText>

                  <NavItem eventKey="workloads/deployments">
                    <NavText>
                      Deployments
                    </NavText>
                  </NavItem>

                  <NavItem eventKey="workloads/replica-sets">
                    <NavText>
                      Replica Sets
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
                    Services and Delivery
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
                    Storage
                  </NavText>

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
                    Config
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
              </SideNav.Nav>
            </SideNav>
            <main>
              <Route path="/workloads/deployments" exact component={Deployments} />
              <Route path="/workloads/jobs" component={Jobs} />
              <Route path="/workloads/pods" component={Pods} />
              <Route path="/workloads/replica-sets" component={ReplicaSets} />               
              <Route path="/services/services" component={Services} />
              <Route path="/services/ingresses" component={Ingresses} />
              <Route path="/storage/persistent-volume-claims" component={PersistentVolumes} />
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
