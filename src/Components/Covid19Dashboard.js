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
  Label as ChartLabel,
  Tooltip as ChartTooltip,
  TickInterval 
} from 'devextreme-react/chart';
import Form, {
  GroupItem,
} from 'devextreme-react/form';
import { TextBox } from 'devextreme-react';
import { formatNumber } from 'devextreme/localization';

import JQuery from 'jquery'
import Papa from 'papaparse'
import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js';

const worldRegionName = "World"
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
        const dataList = []
        JQuery.ajax({
          url: 'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports',
          async: false,
          crossDomain: true,
          accept: {
            'Access-Control-Allow-Origin': '*'
          },
          success: function (result) {
            const newestFile = result[result.length - 2]
            
            JQuery.ajax({
              url: newestFile.download_url,
              async: false,
              crossDomain: true,
              accept: {
                'Access-Control-Allow-Origin': '*'
              },
              success: function (result) {
                const csvdata = Papa.parse(result)
                for (var i = 1; i < csvdata.data.length - 1; i++) {
                  const isCompressRegion = (csvdata.data[i][3] === 'US' || csvdata.data[i][3] === 'China' ||
                                            csvdata.data[i][3] === 'Canada' || csvdata.data[i][3] === 'Australia')
  
                  let regionName = ''
  
                  if (isCompressRegion) {
                    regionName = csvdata.data[i][3]
                  } else {
                    regionName += csvdata.data[i][2] ? csvdata.data[i][2] + ', ' : ''
                    regionName += csvdata.data[i][3]
                  }
  
                  const found = dataList.find((element) => element.attributes.region === regionName && isCompressRegion)
                  if (found) {
                    found.attributes.confirmed += parseInt(csvdata.data[i][7])
                    found.attributes.recovered += parseInt(csvdata.data[i][9])
                    found.attributes.deaths += parseInt(csvdata.data[i][8])
                    found.attributes.active += parseInt(csvdata.data[i][10])
                  } else {
                    let lat = parseFloat(csvdata.data[i][5])
                    let long = parseFloat(csvdata.data[i][6])
  
                    if (regionName === 'US') {
                      lat = 39.50
                      long = -98.35
                    }
  
                    if (regionName === 'Canada') {
                      lat = 62.24
                      long = -96.4835
                    }
  
                    if (regionName === 'China') {
                      lat = 35.33
                      long = 103.23
                    }
                    if (regionName === 'Australia') {
                      lat = -23.7
                      long = 132.8
                    }
  
                    if (!isNaN(lat)) {
                      dataList.push({
                        coordinates: [long, lat],
                        attributes: {
                          region: regionName,
                          confirmed: parseInt(csvdata.data[i][7]),
                          recovered: parseInt(csvdata.data[i][9]),
                          deaths: parseInt(csvdata.data[i][8]),
                          active: parseInt(csvdata.data[i][10]),
                          confirmedDaily: [],
                          recoveredDaily: [],
                          deathsDaily: []
                        }
                      })
                    }
                  }

                  that.totalWorld.totalConfirmed +=  parseInt(csvdata.data[i][7]);
                  that.totalWorld.totalActive += parseInt(csvdata.data[i][10]);
                  that.totalWorld.totalRecovered += parseInt(csvdata.data[i][9]);
                  that.totalWorld.totalDeaths += parseInt(csvdata.data[i][8]);
                }
                that.confirmedDailyWorld = addDailyData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv', dataList, 'confirmedDaily')
                that.recoveredDailyWorld = addDailyData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv', dataList, 'recoveredDaily')
                that.deathsDailyWorld = addDailyData('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv', dataList, 'deathsDaily')

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
            })
          }
        })
        return dataList;
      };
  
    function addDailyData (ajaxUrl, dataList, attributeName) {
      const dailyWorldData = [];

      JQuery.ajax({
        url: ajaxUrl,
        async: false,
        crossDomain: true,
        accept: {
          'Access-Control-Allow-Origin': '*'
        },
        success: function (result) {
          const csvdata = Papa.parse(result)
          for (var i = 1; i < csvdata.data.length - 1; i++) {
            const isCompressRegion = (csvdata.data[i][1] === 'US' || csvdata.data[i][1] === 'China' ||
                                  csvdata.data[i][1] === 'Canada' || csvdata.data[i][1] === 'Australia')
    
            var regionName = ''
            if (isCompressRegion) {
              regionName = csvdata.data[i][1]
            } else {
              regionName = csvdata.data[i][0] ? csvdata.data[i][0] + ', ' : ''
              regionName += csvdata.data[i][1]
            }
            // eslint-disable-next-line no-loop-func
            const found = dataList.find((element) => {
              return element.attributes.region === regionName;
            })
            if (found) {
              let lastvalue = 0
              for (var j = 4; j < csvdata.data[i].length; j++) {
                if (!found.attributes[attributeName][j - 4]) {
                  found.attributes[attributeName][j - 4] = {}
                }
    
                if (!found.attributes[attributeName][j - 4].value) {
                  found.attributes[attributeName][j - 4].value = 0
                }
    
                if (!found.attributes[attributeName][j - 4].increase) {
                  found.attributes[attributeName][j - 4].increase = 0
                }
    
                found.attributes[attributeName][j - 4].date = new Date(csvdata.data[0][j])
                found.attributes[attributeName][j - 4].value += parseInt(csvdata.data[i][j])
                found.attributes[attributeName][j - 4].increase += parseInt(csvdata.data[i][j]) - lastvalue
                found.attributes[attributeName][j - 4].valueLog = found.attributes[attributeName][j - 4].value > 0 ? Math.log(found.attributes[attributeName][j - 4].value) : 0;

                if(i === 1) {
                  dailyWorldData.push({ 
                    date: new Date(csvdata.data[0][j]) , 
                    value: parseInt(csvdata.data[i][j]),
                    valueLog: Math.log(parseInt(csvdata.data[i][j])),
                    increase: parseInt(csvdata.data[i][j]) - lastvalue
                 });
                } else {
                  dailyWorldData[j - 4].value += parseInt(csvdata.data[i][j]);
                  dailyWorldData[j - 4].valueLog = dailyWorldData[j - 4].value > 0 ? Math.log(dailyWorldData[j - 4].value) : 0;
                  dailyWorldData[j - 4].increase += parseInt(csvdata.data[i][j]) - lastvalue
                }

                lastvalue = parseInt(csvdata.data[i][j]);
              }
            }
          }
        }
      });
      return dailyWorldData;
    }

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
          if(e.target.attribute('region') === this.mapRegions[i].attribute("name")) {
            this.mapRegions[i].applySettings({
              color: '#FFAE42',
            });
            //break;
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
            <TabPanel className="tab-panel">
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
                  height="500"
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
                  <Size height={150} />
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
                  <Size height={150} />
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
                  <Size height={150} />
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
                  <Size height={150} />
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
                  <Size height={150} />
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
                  <Size height={150} />
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
                  <Size height={150} />
                  <Series
                    valueField="valueLog"
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
              <TabPanelItem title="Recovered Log.">
                <Chart dataSource={this.state.recoveredDaily}>
                  <Size height={150} />
                  <Series
                    valueField="valueLog"
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
              <TabPanelItem title="Deaths Log.">
                <Chart dataSource={this.state.deathsDaily}>
                  <Size height={150} />
                  <Series
                    valueField="valueLog"
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
          </div>
        </ResponsiveBoxItem>

        <ResponsiveBoxItem>
          <Location row={1} col={0} screen="lg" />
          <Location row={2} col={0} screen="sm" />

          <div>Datasource: <a href="https://github.com/CSSEGISandData/COVID-19">Johns Hopkins CSSE</a></div>
        </ResponsiveBoxItem>

      </ResponsiveBox>
    );
  }
}

export default Covid19Dashboard;