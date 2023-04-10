import React from "react";
import { Link, useParams } from "react-router-dom";
import SideNav from "../../components/SideNav";
import ResourceCard from "../../components/ResourceCard";
import Header from "../../components/Header";
import InformationBar from "../../components/InformationBar";
import MetricsCard from "../../components/MetricsCard";
import { Line, CartesianGrid, XAxis, YAxis, AreaChart, Area } from "recharts";
import AdminPeriod from "../../components/AdminPeriod";
import "./AdminProjectOverviewPage.css";

const AdminProjectOverviewPage = () => {
  const { clusterID } = useParams();
  return (
    <div className="MainPage">
      <div className="TopBarSection">
        <Header />
      </div>
      <div className="MainSection">
        <div className="SideBarSection">
          <SideNav clusterName="cis-dev" clusterId={clusterID} />
        </div>
        <div className="MainContentSection">
          <div className="InformationBarSection">
            <InformationBar header="Projects Overview" showBtn={false} />
          </div>
          <div className="ContentSection">
            <div className="TitleArea">
              <div className="SectionTitle">Project Categories</div>
            </div>
            <div className="ClusterContainer">
              <Link
                to={{
                  pathname: `/clusters/${clusterID}/projects-listing`,
                }}
              >
                <ResourceCard title="All" count="500" />
              </Link>
              <ResourceCard title="Personal" count="20" />
              <ResourceCard title="Student" count="100" />
              <ResourceCard title="Commercial" count="65" />
              <ResourceCard title="Research" count="200" />
              <ResourceCard title="Charity" count="86" />
            </div>

            <div className="TitleArea">
              <div className="SectionTitle">Graph Summary</div>
            </div>

            <div className="SummaryCardContainer">
              <div className="UserSection">
                <div className="LeftDBSide">
                  <div className="MetricsGraph">
                    <MetricsCard
                      className="ClusterMetricsCardGraph"
                      title={
                        <div className="GraphSummaryTitle">
                          <span className="SummaryTitleText">
                            Projects Created
                          </span>
                          <span>
                            <AdminPeriod />
                          </span>
                        </div>
                      }
                    >
                      <AreaChart
                        width={800}
                        height={300}
                        syncId="anyId"
                        data={[]}
                      >
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                        />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="month" xAxisId={0} />
                        <XAxis
                          xAxisId={1}
                          dx={10}
                          label={{
                            value: "Time",
                            angle: 0,
                            position: "bottom",
                          }}
                          interval={12}
                          dataKey="year"
                          tickLine={false}
                          tick={{ fontSize: 12, angle: 0 }}
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <YAxis
                          label={{
                            value: "Number of Projects",
                            angle: 270,
                            position: "outside",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                        />
                      </AreaChart>
                    </MetricsCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProjectOverviewPage;
