import React from 'react';

import '../App.css';
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function createData(fieldName, type, dataSources, constraints, protein) {
  return { fieldName, type, dataSources, constraints, protein };
}


const rows = [
  createData('Id', "float", ["httpApi", "Facebook.Api"], ['Unique', 'Auto increments'], []),
  createData('Title', "string", ["Facebook.Api"], ['Unique', 'Auto increments', 'differents'], []),
  createData('IsActive', "boolean", ["default"], ['Unique', 'Auto increments'], []),
  createData('IsVisisble', "boolean", ["default"], ['Unique', 'Auto increments', 'UpperCase'], []),
];


const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let types = [
  "int",
  "float",
  "string",
  "boolean",
]
let DataSources = {
  httpApi: { label: "http:", color: 'green' },
  default: { label: "default:", color: 'grey' },
  "Facebook.Api": { label: "facebook.api/comments/id", color: 'blue ' }
}

let constraints = [
  'Unique',
  'Auto increments',
  'differents',
];

constraints = constraints.map((n, i) => (
  { label: n, color: i % 2 ? "primary" : "secondary" }
))

const Tables = ({ Tablefields, addField, setType }) => {

  console.log(Tablefields);
  

  const classes = useStyles();


  const [fields, setFields] = React.useState(rows)
  const [anchorChip, setAnchorChip] = React.useState(null);

  function handleChange(event, field, i) {
    console.log(event.target);

    rows[i][field] = event.target.value
    // setFields(JSON.parse(JSON.stringify(rows)));
  }

  function handlePropertyChipClick(event) {
    setAnchorChip(event.currentTarget === anchorChip ? null : event.currentTarget)
    event.stopPropagation()
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          DataConstrictor
        </p>
        <ThemeProvider theme={theme}>
          <Card className={classes.fieldName}>
            <Popper
              placement="bottom"
              disablePortal={false}
              anchorEl={anchorChip}
              open={Boolean(anchorChip)}
              modifiers={{
                flip: {
                  enabled: true,
                },
                preventOverflow: {
                  enabled: true,
                  boundariesElement: 'undefined',
                }
              }}
            >
              <Paper style={{ padding: '12px' }}>The content</Paper>
            </Popper>

            <CardHeader
              action={
                <IconButton aria-label="Table properties">
                  <MoreVertIcon />
                </IconButton>
              }
              title="Posts"
              subheader="db.Posts"
            />

            <CardContent>
              <Button variant="contained" color="primary" onClick={addField}>+</Button>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Field name</TableCell>
                    <TableCell align="right">Type</TableCell>
                    <TableCell align="right">Data source</TableCell>
                    <TableCell align="right">Field constraint</TableCell>
                    <TableCell align="right">Cross field constraint</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {Tablefields.map((row, i) => (
                    <TableRow key={i}>
                    {console.log("map :",row,i) }
                      <TableCell component="th" scope="row">
                        <TextField
                          id="standard-name"
                          onChange={(e) => handleChange(e, 'fieldName', i)}
                          className={classes.textField}
                          value={row.name}
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell align="right">
                        {/* row.calories */}
                        <Select
                          value={row.type}
                          key={i}
                          onChange={(e) => handleChange(e, 'type', i)}
                          inputProps={{
                            name: 'age',
                            id: 'age-simple',
                          }}
                        >
                          {types.map(t => (
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          multiple
                          value={row.dataSources}
                          // {onChange={(e)=>handleChange(e,'dataSources',1)}}
                          onChange={(e) => handleChange(e, 'dataSources', i)}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={selected => (
                            <div>
                              {console.log('selected', selected)}
                              {selected.map(sourceId => {
                                let value = DataSources[sourceId]
                                return (<Chip key={sourceId} label={value.label} style={{ background: value.color }} onClick={handlePropertyChipClick}></Chip>)
                              })}
                              {/* {DataSources.map(value => (
                              <Chip key={value.label} label={value.label} style={{background: 'linear-gradient(to right bottom, #430089, #82ffa1)'}} color={value.color} />
                            ))} */}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {Object.entries(DataSources).map(([key, value],i) => (
                            <MenuItem key={key} value={key} >
                              {value.label} {i}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          multiple
                          value={row.constraints}
                          onChange={e => handleChange(e, 'constraints', i)}
                          input={<Input id="select-multiple-constraints" />}
                          renderValue={selected => (
                            <div>
                              {selected.map((value, i) => {
                                return <Chip key={i} label={value} />
                              }
                              )}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {constraints.map((value, i) => (
                            <MenuItem key={i} value={value.label} >
                              {value.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      {!i ? <TableCell align="right" rowSpan={rows.length}>
                        <Select
                          multiple
                          disabled
                          value={row.constraints}
                          onChange={handleChange}
                          input={<Input id="select-multiple-chip" />}
                          renderValue={selected => (
                            <div>
                              {selected.map((value,i) => (
                                <Chip key={i} label={value.label} color={value.color} />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                        {/* {constraints.map(name => (
                          <MenuItem key={name.label} value={name} >
                            {name.label}
                          </MenuItem>
                        ))} */}
                        </Select>
                      </TableCell> : null}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </CardContent>
          </Card>

        </ThemeProvider>
      </header>
    </div>
  );
}

export default Tables