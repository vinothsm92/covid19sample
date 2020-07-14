import React from 'react';
import PropTypes from 'prop-types';
import faker from 'faker/locale/en_US';
import _ from 'lodash';
import {
    Container,
    ButtonToolbar,
    ButtonGroup,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FloatGrid as Grid,
    Card,
    Media,
    CardBody,
    ListGroup,
    ListGroupItem,
    Progress,
    Table,
    CardFooter,
    Button,
    CardHeader
} from './../../../components';
import { applyColumn } from './../../../components/FloatGrid';
const axios = require('axios').default;
import { HeaderMain } from "../../components/HeaderMain";


import {
    WebsitePerformance
} from "../../components/Analytics/WebsitePerformance";
// import {
//     AudienceMetricsChart
// } from "./components/AudienceMetricsChart";
import {
    TinyAreaChart
} from "../../components/Analytics/TinyAreaChart";
import {
    SimpleLineChart
} from "./../../Graphs/ReCharts/components/SimpleLineChart";

import classes from './Analytics.scss';

const LAYOUT = {
    'metric-v-target-users': { h: 6, md: 4 },
    'metric-v-target-sessions': { h: 6, md: 4 },
    'metric-v-target-pageviews': { h: 6, md: 4 },
    'analytics-audience-metrics': { h: 9, minH: 7 },
    'traffic-channels': { md: 6, h: 6 },
    'sessions': { md: 6, h: 6, maxH: 9, minW: 3 },
    'spend': { md: 6, h: 7 },
    'website-performance': { md: 6, h: 11 },
    'organic-traffic': { md: 6, h: 10 }
}

const SessionByDevice = (props) => (
    <div className={classes['session']}>
        <div className={classes['session__title']}>
            { props.title }
        </div>
        <div className={classes['session__values']}>
            <div className={`${classes['session__percentage']} text-${props.color}`}>
                { props.valuePercent }%
            </div>
            <div className={`${classes['session__value']} text-${props.color}`}>
                { props.value }
            </div>
        </div>
    </div>
);
SessionByDevice.propTypes = {
    title: PropTypes.node,
    color: PropTypes.string,
    valuePercent: PropTypes.string,
    value: PropTypes.string
}

export default class Analytics extends React.Component {
    state = {
        layouts: _.clone(LAYOUT),
		covid19:[],
		activeProgress:0,
		recoveredProgress:0,
        deathProgress:0,
        data:[]
		
    }
componentDidMount(){
    debugger
// 	var results={
//   "success": true,
//   "data": {
//     "summary": {
//       "total": 820916,
//       "confirmedCasesIndian": 817452,
//       "confirmedCasesForeign": 48,
//       "discharged": 515386,
//       "deaths": 22123,
//       "confirmedButLocationUnidentified": 3416
//     },
//     "unofficial-summary": [
//       {
//         "source": "covid19india.org",
//         "total": 822674,
//         "recovered": 516309,
//         "deaths": 22152,
//         "active": 283834
//       }
//     ],
//     "regional": [
//       {
//         "confirmedCasesIndian": 156,
//         "confirmedCasesForeign": 0,
//         "discharged": 92,
//         "deaths": 0,
//         "loc": "Andaman and Nicobar Islands",
//         "totalConfirmed": 156
//       },
//       {
//         "confirmedCasesIndian": 25422,
//         "confirmedCasesForeign": 0,
//         "discharged": 13194,
//         "deaths": 292,
//         "loc": "Andhra Pradesh",
//         "totalConfirmed": 25422
//       },
//       {
//         "confirmedCasesIndian": 335,
//         "confirmedCasesForeign": 0,
//         "discharged": 120,
//         "deaths": 2,
//         "loc": "Arunachal Pradesh",
//         "totalConfirmed": 335
//       },
//       {
//         "confirmedCasesIndian": 14600,
//         "confirmedCasesForeign": 0,
//         "discharged": 9147,
//         "deaths": 27,
//         "loc": "Assam",
//         "totalConfirmed": 14600
//       },
//       {
//         "confirmedCasesIndian": 14575,
//         "confirmedCasesForeign": 0,
//         "discharged": 10109,
//         "deaths": 119,
//         "loc": "Bihar",
//         "totalConfirmed": 14575
//       },
//       {
//         "confirmedCasesIndian": 539,
//         "confirmedCasesForeign": 0,
//         "discharged": 408,
//         "deaths": 7,
//         "loc": "Chandigarh",
//         "totalConfirmed": 539
//       },
//       {
//         "confirmedCasesIndian": 3767,
//         "confirmedCasesForeign": 0,
//         "discharged": 3028,
//         "deaths": 17,
//         "loc": "Chhattisgarh",
//         "totalConfirmed": 3767
//       },
//       {
//         "confirmedCasesIndian": 459,
//         "confirmedCasesForeign": 0,
//         "discharged": 211,
//         "deaths": 0,
//         "loc": "Dadra and Nagar Haveli and Daman and Diu",
//         "totalConfirmed": 459
//       },
//       {
//         "confirmedCasesIndian": 109139,
//         "confirmedCasesForeign": 1,
//         "discharged": 84694,
//         "deaths": 3300,
//         "loc": "Delhi",
//         "totalConfirmed": 109140
//       },
//       {
//         "confirmedCasesIndian": 2250,
//         "confirmedCasesForeign": 1,
//         "discharged": 1347,
//         "deaths": 9,
//         "loc": "Goa",
//         "totalConfirmed": 2251
//       },
//       {
//         "confirmedCasesIndian": 40068,
//         "confirmedCasesForeign": 1,
//         "discharged": 28147,
//         "deaths": 2022,
//         "loc": "Gujarat",
//         "totalConfirmed": 40069
//       },
//       {
//         "confirmedCasesIndian": 19920,
//         "confirmedCasesForeign": 14,
//         "discharged": 14904,
//         "deaths": 290,
//         "loc": "Haryana",
//         "totalConfirmed": 19934
//       },
//       {
//         "confirmedCasesIndian": 1171,
//         "confirmedCasesForeign": 0,
//         "discharged": 883,
//         "deaths": 11,
//         "loc": "Himachal Pradesh",
//         "totalConfirmed": 1171
//       },
//       {
//         "confirmedCasesIndian": 9888,
//         "confirmedCasesForeign": 0,
//         "discharged": 5786,
//         "deaths": 159,
//         "loc": "Jammu and Kashmir",
//         "totalConfirmed": 9888
//       },
//       {
//         "confirmedCasesIndian": 3419,
//         "confirmedCasesForeign": 0,
//         "discharged": 2224,
//         "deaths": 23,
//         "loc": "Jharkhand",
//         "totalConfirmed": 3419
//       },
//       {
//         "confirmedCasesIndian": 33418,
//         "confirmedCasesForeign": 0,
//         "discharged": 13836,
//         "deaths": 543,
//         "loc": "Karnataka",
//         "totalConfirmed": 33418
//       },
//       {
//         "confirmedCasesIndian": 6942,
//         "confirmedCasesForeign": 8,
//         "discharged": 3820,
//         "deaths": 27,
//         "loc": "Kerala",
//         "totalConfirmed": 6950
//       },
//       {
//         "confirmedCasesIndian": 1064,
//         "confirmedCasesForeign": 0,
//         "discharged": 917,
//         "deaths": 1,
//         "loc": "Ladakh",
//         "totalConfirmed": 1064
//       },
//       {
//         "confirmedCasesIndian": 16657,
//         "confirmedCasesForeign": 0,
//         "discharged": 12481,
//         "deaths": 638,
//         "loc": "Madhya Pradesh",
//         "totalConfirmed": 16657
//       },
//       {
//         "confirmedCasesIndian": 238458,
//         "confirmedCasesForeign": 3,
//         "discharged": 132625,
//         "deaths": 9893,
//         "loc": "Maharashtra",
//         "totalConfirmed": 238461
//       },
//       {
//         "confirmedCasesIndian": 1582,
//         "confirmedCasesForeign": 0,
//         "discharged": 832,
//         "deaths": 0,
//         "loc": "Manipur",
//         "totalConfirmed": 1582
//       },
//       {
//         "confirmedCasesIndian": 207,
//         "confirmedCasesForeign": 0,
//         "discharged": 66,
//         "deaths": 2,
//         "loc": "Meghalaya",
//         "totalConfirmed": 207
//       },
//       {
//         "confirmedCasesIndian": 226,
//         "confirmedCasesForeign": 0,
//         "discharged": 143,
//         "deaths": 0,
//         "loc": "Mizoram",
//         "totalConfirmed": 226
//       },
//       {
//         "confirmedCasesIndian": 732,
//         "confirmedCasesForeign": 0,
//         "discharged": 304,
//         "deaths": 0,
//         "loc": "Nagaland",
//         "totalConfirmed": 732
//       },
//       {
//         "confirmedCasesIndian": 11956,
//         "confirmedCasesForeign": 0,
//         "discharged": 7972,
//         "deaths": 56,
//         "loc": "Odisha",
//         "totalConfirmed": 11956
//       },
//       {
//         "confirmedCasesIndian": 1272,
//         "confirmedCasesForeign": 0,
//         "discharged": 637,
//         "deaths": 17,
//         "loc": "Puducherry",
//         "totalConfirmed": 1272
//       },
//       {
//         "confirmedCasesIndian": 7357,
//         "confirmedCasesForeign": 0,
//         "discharged": 5017,
//         "deaths": 187,
//         "loc": "Punjab",
//         "totalConfirmed": 7357
//       },
//       {
//         "confirmedCasesIndian": 23172,
//         "confirmedCasesForeign": 2,
//         "discharged": 17620,
//         "deaths": 497,
//         "loc": "Rajasthan",
//         "totalConfirmed": 23174
//       },
//       {
//         "confirmedCasesIndian": 134,
//         "confirmedCasesForeign": 0,
//         "discharged": 80,
//         "deaths": 0,
//         "loc": "Sikkim",
//         "totalConfirmed": 134
//       },
//       {
//         "confirmedCasesIndian": 130255,
//         "confirmedCasesForeign": 6,
//         "discharged": 82324,
//         "deaths": 1829,
//         "loc": "Tamil Nadu",
//         "totalConfirmed": 130261
//       },
//       {
//         "confirmedCasesIndian": 32224,
//         "confirmedCasesForeign": 0,
//         "discharged": 19205,
//         "deaths": 339,
//         "loc": "Telangana",
//         "totalConfirmed": 32224
//       },
//       {
//         "confirmedCasesIndian": 1918,
//         "confirmedCasesForeign": 0,
//         "discharged": 1372,
//         "deaths": 1,
//         "loc": "Tripura",
//         "totalConfirmed": 1918
//       },
//       {
//         "confirmedCasesIndian": 3372,
//         "confirmedCasesForeign": 1,
//         "discharged": 2706,
//         "deaths": 46,
//         "loc": "Uttarakhand",
//         "totalConfirmed": 3373
//       },
//       {
//         "confirmedCasesIndian": 33699,
//         "confirmedCasesForeign": 1,
//         "discharged": 21787,
//         "deaths": 889,
//         "loc": "Uttar Pradesh",
//         "totalConfirmed": 33700
//       },
//       {
//         "confirmedCasesIndian": 27109,
//         "confirmedCasesForeign": 0,
//         "discharged": 17348,
//         "deaths": 880,
//         "loc": "West Bengal",
//         "totalConfirmed": 27109
//       }
//     ]
//   },
//   "lastRefreshed": "2020-07-11T07:18:32.996Z",
//   "lastOriginUpdate": "2020-07-11T02:30:00.000Z"
// }
// 	var result=results.data['unofficial-summary'][0]
   
// 	 this.setState({
//             covid19: result,
// 			activeProgress:(result.active/result.total) *100,
// 			recoveredProgress:(result.recovered/result.total) *100,
// 			deathProgress:(result.deaths/result.total) *100,
//             date:new Date(),
//             data:results.data
//         })
	axios.get('https://api.rootnet.in/covid19-in/stats/latest')
  .then( (response) =>{
	  debugger
    // handle success
	
	var result=response.data.data['unofficial-summary'][0]
    console.log(response);
	 this.setState({
            covid19: result,
			activeProgress:(result.active/result.total) *100,
			recoveredProgress:(result.recovered/result.total) *100,
			deathProgress:(result.deaths/result.total) *100,
            date:new Date(),
            data:response.data
        })
  })
  .catch( (error) =>{
    // handle error
    console.log(error);
  })
  .finally( ()=> {
    // always executed
  });


}
    _resetLayout = () => {
        this.setState({
            layouts: _.clone(LAYOUT)
        })
    }

    render() {
        const { layouts } = this.state;

        return (
            <React.Fragment>
                <Container fluid={ false }>
                    <div className="d-flex mt-12 mb-12">
                        <HeaderMain 
                            title=""
                            className="mt-0"
                        />
                        {/* <ButtonToolbar className="ml-auto">
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        <i className="fa fa-globe text-body mr-2"></i>
                                      ww<i className="fa fa-angle-down text-body ml-2" />
                                    </DropdownToggle>
                                    <div className="small">
                                        Last 30 Days vs Previous Period
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select Site:
                                        </DropdownItem>
                                        <DropdownItem active>
                                            www.webkom.co
                                        </DropdownItem>
                                        <DropdownItem>
                                            www.spin.webkom.co
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            <i className="fa fa-fw fa-plus mr-2"></i>
                                            Add New
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        <i className="fa fa-calendar-o text-body mr-2"></i>
                                        Last Month<i className="fa fa-angle-down text-body ml-2" />
                                    </DropdownToggle>
                                    <div className="small">
                                        Jan 01, 2017 to Jan 31, 2017
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select Period:
                                        </DropdownItem>
                                        <DropdownItem active>
                                            Last Month
                                        </DropdownItem>
                                        <DropdownItem>
                                            Last 3 Months
                                        </DropdownItem>
                                        <DropdownItem>
                                            Last 6 Months
                                        </DropdownItem>
                                        <DropdownItem>
                                            Last Year
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Custom...
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start mr-2">
                                <UncontrolledButtonDropdown className="ml-auto flex-column">
                                    <DropdownToggle color="link" className="text-left pl-0 text-decoration-none mb-2">
                                        <i className="fa fa-calendar-o text-body mr-2"></i>
                                        Previous Period<i className="fa fa-angle-down text-body ml-2" />
                                    </DropdownToggle>
                                    <div className="small">
                                        Jan 01, 2017 to Jan 31, 2017
                                    </div>
                                    <DropdownMenu>
                                        <DropdownItem header>
                                            Select Period:
                                        </DropdownItem>
                                        <DropdownItem active>
                                            Previous Period
                                        </DropdownItem>
                                        <DropdownItem>
                                            Last 3 Months
                                        </DropdownItem>
                                        <DropdownItem>
                                            Last 6 Months
                                        </DropdownItem>
                                        <DropdownItem>
                                            Last Year
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Custom...
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </ButtonGroup>
                            <ButtonGroup className="align-self-start">
                                <Button color="primary" className="mb-2 mr-2 px-3">
                                    Apply
                                </Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button
                                    color="link"
                                    className="mb-2 text-decoration-none align-self-start"
                                    onClick={this._resetLayout}
                                >
                                    Reset
                                </Button>
                            </ButtonGroup>
                        </ButtonToolbar> */}
                      <h6>Last Updated on : {this.state.data.data ==undefined ? '': this.state.data.lastOriginUpdate}</h6>
                    </div>
                </Container>

                <Grid>
                    <Grid.Row
                        onLayoutChange={ layouts => this.setState({ layouts }) }
                        columnSizes={ this.state.layouts }
                        rowHeight={ 55 }
						
                    >
                       <Grid.Col { ...(applyColumn('organic-traffic', layouts)) }>
                            <Card>
                               
                                <CardBody className="d-flex flex-column">
                                    <div className="text-center mb-12">
                                        <h6>Indian State  wise</h6>
                                        <h2>
                                        Covid count
                                        </h2>
                                        <div className="mb-1 text-success">
                                            <i className="fa mr-1 fa-caret-up"></i>
                                        Last Updated on    {this.state.data.data ==undefined ? '': this.state.data.lastOriginUpdate}
                                           
                                        </div>
                                    </div>
                                    <Grid.Ready>
                                        <SimpleLineChart data={this.state.data.data ==undefined ? []: this.state.data.data.regional} height="100%" className="flex-fill"/>
                                    </Grid.Ready>
                                </CardBody>
                             
                            </Card>
                        </Grid.Col>
                    </Grid.Row>
                </Grid>
            </React.Fragment>
        );
    }
}
