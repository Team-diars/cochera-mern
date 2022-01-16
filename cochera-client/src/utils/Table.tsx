import { Options } from "material-table"


const optionsTable: Options<any> = {
  search: false,
  selection: false,
  showTitle: false,
  toolbar: false,
  paging: true,
  headerStyle:{
    fontFamily: 'inherit',
    fontSize:14,
    paddingTop:5,
    paddingBottom:5,
    textAlign:"left",
    fontWeight:"bold"
  },
  rowStyle: {
    fontFamily: 'inherit',
    textAlign:"left",
    padding:0,
  },
}

export {
  optionsTable
}