import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import './Covid19Dashboard.css'
import React from 'react';

import { Button } from 'devextreme-react';
import ResponsiveBox, {
  Row,
  Col,
  Item as ResponsiveBoxItem,
  Location
} from 'devextreme-react/responsive-box';
import VectorMap, {
  Label,
  Layer,
  Tooltip
} from 'devextreme-react/vector-map';
import DataGrid, { Column, Selection, Scrolling, Summary, TotalItem } from 'devextreme-react/data-grid';
import { TabPanel, Item as TabPanelItem } from "devextreme-react/tab-panel";
import { Chart,
  Series,
  Legend,
  Size,
  ArgumentAxis,
  ValueAxis,
  Label as ChartLabel,
  Tooltip as ChartTooltip,
  TickInterval 
} from 'devextreme-react/chart';
import Form, {
  GroupItem,
} from 'devextreme-react/form';
import { TextBox } from 'devextreme-react';
import { formatNumber } from 'devextreme/localization';

import JQuery from 'jquery';
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';

const worldRegionName = "World";
const mapcolor = '#D2D2D2';

class Covid19Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmedDaily: [],
      recoveredDaily: [],
      deathsDaily: [],
      currentData: {
        regionName: worldRegionName,
        totalConfirmed: '0',
        totalActive: '0',
        totalRecovered: '0',
        totalDeaths: '0',
      }
    };

    this.confirmedDailyWorld = [];
    this.recoveredDailyWorld = [];
    this.deathsDailyWorld = [];
    this.totalWorld = {
      totalConfirmed: 0,
      totalActive: 0,
      totalRecovered: 0,
      totalDeaths: 0,
    };
    this.mapRegions= [];


    this.screen = (width) => width < 700 ? "sm" : "lg";
  
    this.storeVectorMap = (component) => {
      this.vectorMap = component.instance;

      //dirty hack to set the right size
      setTimeout(() => this.vectorMap.render(), 300);
      this.vectorMap.render();
    };

    this.bounds = [-180, 85, 180, -60];

    this.sizeGroups = function () {
      const groupSize = []

      for (let i = 0; i < 11; i++) {
        groupSize.push(i * 10)
      }

      for (let i = 1; i < 11; i++) {
        groupSize.push(i * 100)
      }

      for (let i = 1; i < 101; i++) {
        groupSize.push(i * 1000)
      }

      for (let i = 1; i < 101; i++) {
        groupSize.push(i * 10000)
      }

      for (let i = 1; i < 201; i++) {
        groupSize.push(i * 10000)
      }

      return groupSize
    } ();

    this.getData = () => {

      var that = this;
      const dataList = [];
      JQuery.ajax({
        url: 'https://corona.lmao.ninja/v2/countries',
        async: false,
        success: (countryList) => {
          countryList.forEach((country) => {
            dataList.push({
              coordinates: [country.countryInfo.long, country.countryInfo.lat],
              attributes: {
                region: country.country,
                regionISO2: country.countryInfo.iso2,
                regionISO3: country.countryInfo.iso3,
                confirmed: country.cases,
                confirmedToday: country.casesToday,
                recovered: country.recovered,
                recoveredToday: country.recoveredToday,
                deaths: country.deaths,
                deathsToday: country.deathsToday,
                active: country.active,
                confirmedDaily: [],
                recoveredDaily: [],
                deathsDaily: []
              }
            });
            that.totalWorld.totalConfirmed += country.cases;
            that.totalWorld.totalActive += country.active;
            that.totalWorld.totalRecovered += country.recovered;
            that.totalWorld.totalDeaths += country.deaths;

            
          });

          JQuery.ajax({
            url: 'https://corona.lmao.ninja/v2/historical/?lastdays=all',
            async: false,
            success: (dailyData) => {
              const dailyWorldConfirmed = [];
              const dailyWorldRecovered = [];
              const dailyWorldDeaths = [];

              dailyData.forEach((countryDaily) => {
                
                //dirty clearing data
                if(countryDaily.country === "Cote d'Ivoire") {
                  countryDaily.country = "Côte d'Ivoire";
                }

                if(countryDaily.country === "Holy See") {
                  countryDaily.country = "Holy See (Vatican City State)";
                }
                
                if(countryDaily.country === "Burma") {
                  countryDaily.country = "Myanmar";
                }
                if(countryDaily.country === "Lao People\"s Democratic Republic") {
                  countryDaily.country = "Lao People's Democratic Republic";
                }
                
                if(countryDaily.province === "saint pierre and miquelon") {
                  countryDaily.province = "Saint Pierre Miquelon";
                }

                if(countryDaily.province === "curacao") {
                  countryDaily.province = "Curaçao";
                }

                if(countryDaily.province === "saint barthelemy") {
                  countryDaily.province = "St. Barth";
                }

                if(countryDaily.province === "st martin") {
                  countryDaily.province = "Saint Martin";
                }

                if(countryDaily.province === "reunion") {
                  countryDaily.province = "Réunion";
                }

                if(countryDaily.province === "macau") {
                  countryDaily.province = "Macao";
                }

                var country = dataList.find((element) => {
                  return (countryDaily.province != null && element.attributes.region.toLowerCase() === countryDaily.province.toLowerCase());
                });

                if(!country) {
                  country = dataList.find((element) => {
                    return (element.attributes.region.toLowerCase() === countryDaily.country.toLowerCase())
                  });
                }
                
                var lastdayConfirmed = 0;
                const caseDates = Object.keys(countryDaily.timeline.cases)
                caseDates.forEach((date) => {
                  try {

                    const dateDate = new Date(date);
                    const daily = country.attributes.confirmedDaily.find((element) => {return element.dateStr === date});                   
                    if(daily) {
                      daily.value += countryDaily.timeline.cases[date];
                      daily.increase += countryDaily.timeline.cases[date] - lastdayConfirmed;
                    } else {
                      country.attributes.confirmedDaily.push({
                        date: dateDate,
                        dateStr: date,
                        value: countryDaily.timeline.cases[date],
                        increase: countryDaily.timeline.cases[date] - lastdayConfirmed
                      });
                    }

                    const dailyWorld = dailyWorldConfirmed.find((element) => {return element.dateStr === date});
                    if (dailyWorld) {
                      dailyWorld.value += countryDaily.timeline.cases[date];
                      dailyWorld.increase += countryDaily.timeline.cases[date] - lastdayConfirmed;
                    } else {
                      dailyWorldConfirmed.push({ 
                        date: dateDate,
                        dateStr: date,
                        value: countryDaily.timeline.cases[date],
                        increase: countryDaily.timeline.cases[date] - lastdayConfirmed
                     });
                    }

                  } catch { }

                  lastdayConfirmed = countryDaily.timeline.cases[date]
                });

                var lastdayRecovered = 0;
                const recoveredDates = Object.keys(countryDaily.timeline.recovered)
                recoveredDates.forEach((date) => {
                  try {

                    const dateDate = new Date(date);
                    const daily = country.attributes.recoveredDaily.find((element) => {return element.dateStr === date});
                    if(daily) {
                      daily.value += countryDaily.timeline.recovered[date];
                      daily.increase += countryDaily.timeline.recovered[date] - lastdayRecovered;
                    } else {
                      country.attributes.recoveredDaily.push({
                        date: dateDate,
                        dateStr: date,
                        value: countryDaily.timeline.recovered[date],
                        increase:  countryDaily.timeline.recovered[date] - lastdayRecovered
                      });
                    }

                    const dailyWorld = dailyWorldRecovered.find((element) => {return element.dateStr === date});
                    if (dailyWorld) {
                      dailyWorld.value += countryDaily.timeline.recovered[date];
                      dailyWorld.increase += countryDaily.timeline.recovered[date] - lastdayRecovered;
                    } else {
                      dailyWorldRecovered.push({ 
                        date: dateDate,
                        dateStr: date,
                        value: countryDaily.timeline.recovered[date],
                        increase: countryDaily.timeline.recovered[date] - lastdayRecovered
                     });
                    }

                  } catch { }

                  lastdayRecovered = countryDaily.timeline.recovered[date]
                });

                var lastdayDeaths = 0;
                const deathsDates = Object.keys(countryDaily.timeline.deaths)
                deathsDates.forEach((date) => {
                  try {

                    const dateDate = new Date(date);
                    const daily = country.attributes.deathsDaily.find((element) => {return element.dateStr === date});
                    if(daily) {
                      daily.value += countryDaily.timeline.deaths[date];
                      daily.increase += countryDaily.timeline.deaths[date] - lastdayDeaths;
                    } else {
                      country.attributes.deathsDaily.push({
                        date: dateDate,
                        dateStr: date,
                        value: countryDaily.timeline.deaths[date],
                        increase: countryDaily.timeline.deaths[date] - lastdayDeaths
                      });
                    }

                    const dailyWorld = dailyWorldDeaths.find((element) => {return element.dateStr === date});
                    if (dailyWorld) {
                      dailyWorld.value += countryDaily.timeline.deaths[date];
                      dailyWorld.increase += countryDaily.timeline.deaths[date] - lastdayDeaths;
                    } else {
                      dailyWorldDeaths.push({ 
                        date: dateDate,
                        dateStr: date,
                        value: countryDaily.timeline.deaths[date],
                        increase: countryDaily.timeline.deaths[date] - lastdayDeaths
                     });
                    }

                } catch { }

                  lastdayDeaths = countryDaily.timeline.deaths[date]
                });
                
              });
              that.confirmedDailyWorld = dailyWorldConfirmed;
              that.recoveredDailyWorld = dailyWorldRecovered;
              that.deathsDailyWorld = dailyWorldDeaths;
            }
          });

          const current = that.state.currentData;
          current.totalConfirmed = formatNumber(that.totalWorld.totalConfirmed);
          current.totalActive = formatNumber(that.totalWorld.totalActive);
          current.totalRecovered = formatNumber(that.totalWorld.totalRecovered);
          current.totalDeaths = formatNumber(that.totalWorld.totalDeaths);

          that.state.confirmedDaily = that.confirmedDailyWorld;
          that.state.recoveredDaily = that.recoveredDailyWorld;
          that.state.deathsDaily = that.deathsDailyWorld;
          that.state.currentData = current;
          
        }
      });

      return dataList;
    };

    this.tooltipText = (info) => {
      if (info.layer.type === 'marker') {
        var dailyConfirmed = formatNumber(parseInt(info.attribute('confirmedDaily')[info.attribute('confirmedDaily').length - 1].increase));
        var dailyRecovered = formatNumber(parseInt(info.attribute('recoveredDaily')[info.attribute('recoveredDaily').length - 1].increase));
        var dailyDeaths = formatNumber(parseInt(info.attribute('deathsDaily')[info.attribute('deathsDaily').length - 1].increase));
        return {
          text: '<b>' + info.attribute('region') + '</b>' +
                '<br />&nbsp;<br />Confirmed: ' + formatNumber(parseInt(info.attribute('confirmed'))) + ' (' + dailyConfirmed + ')' +
                '<br />Recovered: ' + formatNumber(parseInt(info.attribute('recovered'))) + ' (' + dailyRecovered + ')' +
                '<br />Active: ' + formatNumber(parseInt(info.attribute('active'))) +
                '<br />Deaths: ' + formatNumber(parseInt(info.attribute('deaths'))) + ' (' + dailyDeaths + ')'
        }
      }
    }
    
    this.chartTooltipText = (info) => {
      return { text: info.argument.toLocaleDateString("en-US") + ': ' + formatNumber(parseInt(info.value)) };
    }

    this.markerClick = (e) => {
      if (e.target && e.target.layer.type === 'marker') {
        e.component.center(e.target.coordinates()).zoomFactor(6);

        const confirmedDaily = e.target.attribute('confirmedDaily');
        const recoveredDaily = e.target.attribute('recoveredDaily');
        const deathsDaily = e.target.attribute('deathsDaily');
        
        const current = this.state.currentData;
        current.regionName = e.target.attribute('region');
        current.totalConfirmed = formatNumber(parseInt(e.target.attribute('confirmed')));
        current.totalActive = formatNumber(parseInt(e.target.attribute('active')));
        current.totalRecovered = formatNumber(parseInt(e.target.attribute('recovered')));
        current.totalDeaths= formatNumber(parseInt(e.target.attribute('deaths')));

        this.setState({
          confirmedDaily: confirmedDaily,
          recoveredDaily: recoveredDaily,
          deathsDaily: deathsDaily,
          currentData: current
        });

        for(let i = 0; i < this.mapRegions.length; i++) {
          if(e.target.attribute('regionISO3') === this.mapRegions[i].attribute('iso_a3')) {
            this.mapRegions[i].applySettings({
              color: '#FFAE42',
            });
          } else {
            this.mapRegions[i].applySettings({
              color: mapcolor,
            });
          }
        }
      }
    }

    this.resetClick = () => {
      this.vectorMap.center(null);
      this.vectorMap.zoomFactor(null);

      const current = this.state.currentData;
      current.regionName = worldRegionName;
      current.totalConfirmed = formatNumber(this.totalWorld.totalConfirmed);
      current.totalActive = formatNumber(this.totalWorld.totalActive);
      current.totalRecovered = formatNumber(this.totalWorld.totalRecovered);
      current.totalDeaths = formatNumber(this.totalWorld.totalDeaths);

      this.setState({
        confirmedDaily: this.confirmedDailyWorld,
        recoveredDaily: this.recoveredDailyWorld,
        deathsDaily: this.deathsDailyWorld,
        currentData: current
      });

      for(let i = 0; i < this.mapRegions.length; i++) {
        this.mapRegions[i].applySettings({
          color: mapcolor,
        });
      }
    };

    this.summarizeGridText = (data) => {
      return formatNumber(data.value);
    };

    this.getRegions = (elements) => {
      this.mapRegions = elements;
    }

    this.dataSource = this.getData();
  }
  
  render() {
    return (
      <React.Fragment>
        <ResponsiveBox singleColumnScreen="sm" id="responsice-box" screenByWidth={this.screen} height={() => window.innerHeight}>
          <Row ratio={3} />
          <Row ratio={3} screen="xs" />
          <Row ratio={1} />

          <Col ratio={2} />
          <Col ratio={1} screen="lg" />
          <Col ratio={0} screen="lg" />
          <ResponsiveBoxItem>
            <Location row={0} col={0} screen="lg" />
            <Location row={0} col={0} colspan={2} screen="sm" />

            <div className="dx-card responsive-paddings">
              <div id="region"><h2 id="region-name">{this.state.currentData.regionName}</h2></div>
              <Button
                id="reset"
                text="Reset"
                onClick={this.resetClick}/>
              <TabPanel className="map-tab-panel">
                <TabPanelItem title="World Map">
                  <VectorMap
                    id="vector-map"
                    ref={this.storeVectorMap}
                    bounds={this.bounds}
                    onClick={this.markerClick}
                    >
                    <Layer
                      dataSource={mapsData.world}
                      hoverEnabled={false}
                      customize={this.getRegions}
                      color={mapcolor}>
                    </Layer>
                    <Layer
                      dataSource={this.dataSource}
                      name="bubbles"
                      elementType="bubble"
                      dataField="confirmed"
                      minSize={5}
                      maxSize={100}
                      opacity="0.8"
                      sizeGroups={this.sizeGroups}
                      color="#ff3300">
                      <Label enabled={false}></Label>
                    </Layer>
                    <Layer
                      dataSource={this.dataSource}
                      name="bubbles"
                      elementType="bubble"
                      dataField="recovered"
                      minSize={1}
                      maxSize={100}
                      opacity="0.8"
                      sizeGroups={this.sizeGroups}
                      color="#149414">
                      <Label enabled={false}></Label>
                    </Layer>
                    <Layer
                      dataSource={this.dataSource}
                      name="bubbles"
                      elementType="bubble"
                      dataField="deaths"
                      minSize={1}
                      maxSize={100}
                      opacity="0.8"
                      sizeGroups={this.sizeGroups}
                      color="#000000">
                      <Label enabled={false}></Label>
                    </Layer>
                    <Tooltip enabled={true}
                      customizeTooltip={this.tooltipText} />
                  </VectorMap>
                  <Form id="totals-form">
                    <GroupItem colCount={2}>
                      <GroupItem>
                        <div className="dx-field">
                          <div className="dx-field-label">Confirmed Cases</div>
                          <div className="dx-field-value">
                            <TextBox readOnly={true}
                              hoverStateEnabled={false}
                              value={this.state.currentData.totalConfirmed } />
                          </div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Active Cases</div>
                          <div className="dx-field-value">
                            <TextBox readOnly={true}
                              hoverStateEnabled={false}
                              value={this.state.currentData.totalActive } />
                          </div>
                        </div>
                      </GroupItem>
                      <GroupItem>
                        <div className="dx-field">
                          <div className="dx-field-label">Recovered Cases</div>
                          <div className="dx-field-value">
                            <TextBox readOnly={true}
                              hoverStateEnabled={false}
                              value={this.state.currentData.totalRecovered } />
                          </div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Deaths</div>
                          <div className="dx-field-value">
                            <TextBox readOnly={true}
                              hoverStateEnabled={false}
                              value={this.state.currentData.totalDeaths} />
                          </div>
                        </div>
                      </GroupItem>
                    </GroupItem>
                  </Form>
              </TabPanelItem>
                <TabPanelItem title="Table">
                  <DataGrid
                    id="gridContainer"
                    dataSource={this.dataSource}
                    showBorders={false}
                    showColumnLines={false}
                    showRowLines={false}
                    focusedRowEnabled={true}
                    rowAlternationEnabled={true}
                    height={window.innerHeight - 140}
                    keyExpr="attributes.region">
                    <Selection mode="single" />
                    <Scrolling mode="virtual" />
                    <Column dataField="attributes.region"  caption="Country" />
                    <Column dataField="attributes.confirmed" width={100} caption="Confirmed" dataType="number" defaultSortOrder="desc"/>
                    <Column dataField="attributes.recovered" width={100} caption="Recovered" dataType="number"/>
                    <Column dataField="attributes.deaths" width={100} caption="Deaths" dataType="number"/>
                    <Column dataField="attributes.active" width={100} caption="Active" dataType="number"/>
                    <Summary>
                      <TotalItem column="Confirmed" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Recovered" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Deaths" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Active" summaryType="sum" customizeText={this.summarizeGridText}/>
                    </Summary>
                  </DataGrid>
                </TabPanelItem>
              </TabPanel>
            </div>
          </ResponsiveBoxItem>

          <ResponsiveBoxItem>
            <Location row={0} col={1} screen="lg" />
            <Location row={1} col={0} colspan={2} screen="sm" />

            <div className="dx-card responsive-paddings">
              <TabPanel className="tab-panel">
                <TabPanelItem title="Confirmed Daily">
                  <Chart dataSource={this.state.confirmedDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="increase"
                      argumentField="date"
                      barPadding={0}
                      type="bar"
                      color="#ff3300" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
                <TabPanelItem title="Recovered Daily">
                  <Chart dataSource={this.state.recoveredDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="increase"
                      argumentField="date"
                      barPadding={0}
                      type="bar"
                      color="#149414" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
                <TabPanelItem title="Deaths Daily">
                  <Chart dataSource={this.state.deathsDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="increase"
                      argumentField="date"
                      barPadding={0}
                      type="bar"
                      color="#000000" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
              </TabPanel>
              <TabPanel className="tab-panel">
                <TabPanelItem title="Confirmed Linear">
                  <Chart dataSource={this.state.confirmedDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="value"
                      argumentField="date"
                      barPadding={0}
                      type="spline"
                      color="#ff3300" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
                <TabPanelItem title="Recovered Linear">
                  <Chart dataSource={this.state.recoveredDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="value"
                      argumentField="date"
                      barPadding={0}
                      type="spline"
                      color="#149414" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
                <TabPanelItem title="Deaths Linear">
                  <Chart dataSource={this.state.deathsDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="value"
                      argumentField="date"
                      barPadding={0}
                      type="spline"
                      color="#000000" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
              </TabPanel>
              <TabPanel className="tab-panel">
                <TabPanelItem title="Confirmed Log.">
                  <Chart dataSource={this.state.confirmedDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="value"
                      argumentField="date"
                      barPadding={0}
                      type="spline"
                      color="#ff3300" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ValueAxis type="logarithmic" />
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
                <TabPanelItem title="Recovered Log.">
                  <Chart dataSource={this.state.recoveredDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="value"
                      argumentField="date"
                      barPadding={0}
                      type="spline"
                      color="#149414" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ValueAxis type="logarithmic" />
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
                <TabPanelItem title="Deaths Log.">
                  <Chart dataSource={this.state.deathsDaily}>
                    <Size height={(window.innerHeight / 3)-70} />
                    <Series
                      valueField="value"
                      argumentField="date"
                      barPadding={0}
                      type="spline"
                      color="#000000" />
                      <Legend visible={false}></Legend>
                      <ArgumentAxis>
                        <TickInterval days={20} /> 
                        <ChartLabel overlappingBehavior={'hide'}></ChartLabel>
                      </ArgumentAxis>
                      <ValueAxis type="logarithmic" />
                      <ChartTooltip enabled={true} customizeTooltip={this.chartTooltipText} />
                  </Chart>
                </TabPanelItem>
              </TabPanel>
            </div>
          </ResponsiveBoxItem>

          <ResponsiveBoxItem>
            <Location row={1} col={0} screen="lg" />
            <Location row={2} col={0} screen="sm" />

            <div>Datasource: <a href="https://corona.lmao.ninja/docs/#/">Novel COVID API</a></div>
          </ResponsiveBoxItem>

        </ResponsiveBox>
      </React.Fragment>
    );
  }
}

export default Covid19Dashboard;