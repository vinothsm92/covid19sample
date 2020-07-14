import React from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
const axios = require("axios");
var editorData;


var btnClk = false;
class ManageAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manageAccount: [],
      accountsLoader: false
    };
  }

  //Comp Life Cycle Start
  componentDidMount() {
    this.setState({ accountsLoader: true });debugger
    axios
      .get(
        "https://api.rootnet.in/covid19-in/stats/latest" 
      )
      .then(response => {
        debugger;


          this.setState({ manageAccount: response.data.data.regional, accountsLoader: false });
        
      })
      .catch(error => {debugger
        this.setState({ accountsLoader: false });
      });
  }

  componentWillMount() {}

  buttonClick = () => {
    debugger;
    btnClk = true;
  };
  //Comp Life Cycle end

  //render
  render() {
    const columns = [
      {
        name: "Location",
        options: {
          filter: true
        }
      },
      {
        name: "Total Confirmed",
        options: {
          filter: true
        }
      },
      {
        name: "Discharged",
        options: {
          filter: true
        }
      },
      {
        name: "Deaths",
        options: {
          filter: true
        }
      }
    ];

    const options = {
      selectableRows: false,
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      onCellClick: (cellIndex, rowIndex) => {
        debugger;
        editorData = this.state.manageAccount[rowIndex.dataIndex];
        if (btnClk) {
          var obj = {};
          obj.user = editorData.primaryEmail;
          obj.type = editorData.btn_action;
          obj.sponsor = usermailid;
        
        }
      }
    };

    return (
      <div>
          <br></br>
<br></br>        {this.state.accountsLoader ? (
          <div
            style={{
              marginRight: "40%",
              width: "100%",
              padding: "25% 0% 0% 45%"
            }}
          >
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <MUIDataTable
            title={"Manage Accounts"}
            data={this.state.manageAccount.map(item => {
              return [
                item.loc,
                item.totalConfirmed,
                item.discharged,
                item.deaths
              ];
            })}
            columns={columns}
            options={options}
          />
        )}
      </div>
    );
  }
}
export default ManageAccount;
