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

    this.storeDataGrid = (component) => {
      this.dataGrid = component.instance;
    }

    this.bounds = [-180, 85, 180, -60];

    this.sizeGroups = function () {
      const groupSize = []

      for (let i = 0; i < 11; i++) {
        groupSize.push(i * 10)
      }

      for (let i = 1; i < 11; i++) {
        groupSize.push(i * 100)
      }

      for (let i = 1; i < 11; i++) {
        groupSize.push(i * 1000)
      }

      for (let i = 1; i < 4001; i++) {
        groupSize.push(i * 10000)
      }

      //for (let i = 1; i < 31; i++) {
      //  groupSize.push(i * 1000000)
      //}

      //for (let i = 1; i < 11; i++) {
      //  groupSize.push(i * 100000)
      //}

      //for (let i = 1; i < 11; i++) {
      //  groupSize.push(i * 1000000)
      //}

      //for (let i = 1; i < 11; i++) {
      //  groupSize.push(i * 10000000)
      //}

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
                confirmedToday: country.todayCases,
                confirmedPerMillion: country.casesPerOneMillion,
                recovered: country.recovered,
                recoveredToday: country.todayRecovered,
                recoveredPerMillion: country.casesPerOneMillion,
                deaths: country.deaths,
                deathsToday: country.todayDeaths,
                deathsPerMillion: country.casesPerOneMillion,
                active: country.active,
                critical: country.critical,
                tests: country.tests,
                testsPerMillion: country.testsPerOneMillion,
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
      console.log(dataList)
      return dataList;
    };

    this.tooltipText = (info) => {
      if (info.layer.type === 'marker') {
        var dailyConfirmed = formatNumber(parseInt(info.attribute('confirmedDaily')[info.attribute('confirmedDaily').length - 1].increase));
        var dailyRecovered = formatNumber(parseInt(info.attribute('recoveredDaily')[info.attribute('recoveredDaily').length - 1].increase));
        var dailyDeaths = formatNumber(parseInt(info.attribute('deathsDaily')[info.attribute('deathsDaily').length - 1].increase));
        return {
          text: '<b>' + info.attribute('region') + '</b>' +
                '<br />&nbsp;<br />Cases: ' + formatNumber(parseInt(info.attribute('confirmed'))) + ' (' + dailyConfirmed + ')' +
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
        const region = e.target.attribute('region');
        this.dataGrid.selectRows(region, false);
        this.dataGrid.option('focusedRowKey', region);
      }
    }

    this.rowSelected = ({ selectedRowsData }) => {
      if(selectedRowsData.length > 0) {
        const scrollPostion = this.dataGrid.getScrollable().scrollTop();

        const confirmedDaily = selectedRowsData[0].attributes.confirmedDaily;
        const recoveredDaily = selectedRowsData[0].attributes.recoveredDaily;
        const deathsDaily = selectedRowsData[0].attributes.deathsDaily;
        
        const current = this.state.currentData;
        current.regionName = selectedRowsData[0].attributes.region;
        current.totalConfirmed = formatNumber(parseInt(selectedRowsData[0].attributes.confirmed));
        current.totalActive = formatNumber(parseInt(selectedRowsData[0].attributes.active));
        current.totalRecovered = formatNumber(parseInt(selectedRowsData[0].attributes.recovered));
        current.totalDeaths= formatNumber(parseInt(selectedRowsData[0].attributes.deaths));

        this.setState({
          confirmedDaily: confirmedDaily,
          recoveredDaily: recoveredDaily,
          deathsDaily: deathsDaily,
          currentData: current
        });

        this.vectorMap.zoomFactor(6);
        this.vectorMap.center(selectedRowsData[0].coordinates);
        for(let i = 0; i < this.mapRegions.length; i++) {
          if(selectedRowsData[0].attributes.regionISO3 === this.mapRegions[i].attribute('iso_a3')) {
            this.mapRegions[i].applySettings({
              color: '#FFAE42',
            });
          } else {
            this.mapRegions[i].applySettings({
              color: mapcolor,
            });
          }
        }

        this.dataGrid.getScrollable().scrollTo(scrollPostion);
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

      this.dataGrid.selectRows(null, false);
      this.dataGrid.option('focusedRowIndex', -1);
    };

    this.summarizeGridText = (data) => {
      return formatNumber(data.value);
    };

    this.getRegions = (elements) => {
      this.mapRegions = elements;
    }

    this.formatCellNumber = (cell) => {
      return formatNumber(cell.value);
    }

    this.dataSource = this.getData();
  }
  
  render() {
    return (
      <React.Fragment>
        <ResponsiveBox singleColumnScreen="sm" id="responsive-box" screenByWidth={this.screen} height={() => window.innerHeight}>
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
              <TabPanel className="map-tab-panel" deferRendering={false} >
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
                      maxSize={200}
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
                      maxSize={200}
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
                      maxSize={200}
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
                          <div className="dx-field-label">Cases</div>
                          <div className="dx-field-value">
                            <TextBox readOnly={true}
                              hoverStateEnabled={false}
                              value={this.state.currentData.totalConfirmed } />
                          </div>
                        </div>
                        <div className="dx-field">
                          <div className="dx-field-label">Active</div>
                          <div className="dx-field-value">
                            <TextBox readOnly={true}
                              hoverStateEnabled={false}
                              value={this.state.currentData.totalActive } />
                          </div>
                        </div>
                      </GroupItem>
                      <GroupItem>
                        <div className="dx-field">
                          <div className="dx-field-label">Recovered</div>
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
                    ref={this.storeDataGrid}
                    dataSource={this.dataSource}
                    showBorders={false}
                    showColumnLines={false}
                    showRowLines={false}
                    focusedRowEnabled={true}
                    autoNavigateToFocusedRow={true}
                    rowAlternationEnabled={true}
                    height={window.innerHeight - 140}
                    keyExpr="attributes.region"
                    onSelectionChanged={this.rowSelected} >
                    <Selection mode="single" />
                    <Scrolling mode="virtual" />
                    <Column dataField="attributes.region" caption="Country" />
                    <Column dataField="attributes.confirmed" width={100} caption="Cases" dataType="number" defaultSortOrder="desc" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.confirmedToday" width={100} caption="Cases Today" dataType="number" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.confirmedPerMillion" width={100} caption="Cases / Mio" dataType="number" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.recovered" width={100} caption="Recovered" dataType="number" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.deaths" width={100} caption="Deaths" dataType="number" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.deathsToday" width={100} caption="Deaths Today" dataType="number" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.active" width={100} caption="Active" dataType="number" customizeText={this.formatCellNumber}/>
                    <Column dataField="attributes.critical" width={100} caption="Critical" dataType="number" customizeText={this.formatCellNumber}/>
                    <Summary>
                      <TotalItem column="Cases" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Cases Today" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Cases / Mio" summaryType="avg" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Recovered" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Deaths" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Deaths Today" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Active" summaryType="sum" customizeText={this.summarizeGridText}/>
                      <TotalItem column="Critical" summaryType="sum" customizeText={this.summarizeGridText}/>
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
                <TabPanelItem title="Cases Daily">
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
                <TabPanelItem title="Cases Linear">
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
                <TabPanelItem title="Cases Log.">
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