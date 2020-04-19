<template>
  <div class="dx-card responsive-paddings">
    <DxVectorMap
      id="vector-map"
      ref="vectorMap"
      :bounds="bounds"
      :touchEnabled="true"
      @click="markerClick" >
      <DxLayer
        :data-source="mapsWorld"
        :hover-enabled="false" />
      <DxLayer
        :data-source="markers"
        :size-groups="sizeGroups"
        :min-size="5"
        :max-size="100"
        :opacity="0.8"
        name="bubbles"
        element-type="bubble"
        color="#ff3300"
        data-field="confirmed" />
      <DxLayer
        :data-source="markers"
        :size-groups="sizeGroups"
        :min-size="1"
        :max-size="100"
        :opacity="0.8"
        name="bubbles"
        element-type="bubble"
        color="#149414"
        data-field="recovered" />
      <DxLayer
        :data-source="markers"
        :size-groups="sizeGroups"
        :min-size="1"
        :max-size="100"
        :opacity="0.8"
        name="bubbles"
        color="#000000"
        element-type="bubble"
        data-field="deaths" />
      <DxTooltip
        :enabled="true"
        :customize-tooltip="tooltipText" />
    </DxVectorMap>
  <DxButton
    id="reset"
    text="Reset"
    @click="reset"
  />
  </div>
</template>
<script>

import * as mapsData from 'devextreme/dist/js/vectormap-data/world.js'
import JQuery from 'jquery'
import Papa from 'papaparse'
import {
  DxVectorMap,
  DxLayer,
  DxTooltip
} from 'devextreme-vue/vector-map'
import { DxButton } from 'devextreme-vue/button'

import DataSource from 'devextreme/data/data_source'

export default {
  name: 'Covid19Map',
  components: {
    DxVectorMap,
    DxLayer,
    DxTooltip,
    DxButton
  },
  data () {
    return {
      markers: this.getDataSource(),
      mapsWorld: mapsData.world,
      bounds: [-180, 85, 180, -60],
      sizeGroups: this.getSizeGroups()
    }
  },
  methods: {
    getSizeGroups () {
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

      return groupSize
    },
    getDataSource () {
      const ds = new DataSource({
        load: () => {
          const deferred = JQuery.Deferred()

          JQuery.ajax({
            url: 'https://api.github.com/repos/CSSEGISandData/COVID-19/contents/csse_covid_19_data/csse_covid_19_daily_reports',
            async: false,
            success: function (result) {
              const newestFile = result[result.length - 2]

              JQuery.ajax({
                url: newestFile.download_url,
                async: false,
                success: function (result) {
                  const dataList = []
                  const csvdata = Papa.parse(result)
                  for (var i = 1; i < csvdata.data.length - 1; i++) {
                    const isCompressRegion = (csvdata.data[i][3] === 'US' || csvdata.data[i][3] === 'China' ||
                                              csvdata.data[i][3] === 'Canada' || csvdata.data[i][3] === 'Australia')

                    let regionName = ''

                    if (isCompressRegion) {
                      regionName = csvdata.data[i][3]
                    } else {
                      regionName = csvdata.data[i][1] ? csvdata.data[i][1] + ', ' : ''
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
                            active: parseInt(csvdata.data[i][10])
                          }
                        })
                      }
                    }
                    deferred.resolve(dataList)
                  }
                }
              })
            }
          })

          return deferred.promise()
        }
      })

      return ds
    },
    tooltipText (info) {
      if (info.layer.type === 'marker') {
        return {
          text: '<b>' + info.attribute('region') + '</b>' +
                '<br />&nbsp;<br />Confirmed: ' + info.attribute('confirmed') +
                '<br />Recovered: ' + info.attribute('recovered') +
                '<br />Active: ' + info.attribute('active') +
                '<br />Deaths: ' + info.attribute('deaths')
        }
      }
    },
    markerClick (e) {
      if (e.target && e.target.layer.type === 'marker') {
        e.component.center(e.target.coordinates()).zoomFactor(10)
      }
    },
    reset () {
      const vectorMap = this.$refs.vectorMap.instance
      vectorMap.center(null)
      vectorMap.zoomFactor(null)
    }
  }
}
</script>
<style>
  #vector-map {
    margin: 10px;
    position: absolute;
    top: 0px;
    bottom: 30px;
    left: 0px;
    right: 0px;
  }
  #reset {
      position: absolute;
      bottom: 5px;
      left: 10px;
  }
  .dx-card {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 5px;
    right: 5px;
  }
</style>
