import { useState, useEffect } from 'react';
import {
  Box, Slide, Card, Button, Grid, TextField, InputAdornment, Autocomplete,
  FormControl, InputLabel, Select, MenuItem, Switch, RadioGroup, Radio, FormControlLabel, Typography
} from "@mui/material";
import { DataGrid, useGridApiContext, useGridSelector, gridPageCountSelector, gridPageSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Tacard from "../Tacard/Tacard";
import { baseCols, addCols } from '../../../Data/TableData';

function customCheckbox(theme) {
  return {
    '& .MuiCheckbox-root svg': {
      width: 16,
      height: 16,
      backgroundColor: 'transparent',
      border: '1px solid #d9d9d9',
      borderRadius: 2,
      ...theme.applyStyles('dark', {
        borderColor: 'rgb(67, 67, 67)',
      }),
    },
    '& .MuiCheckbox-root svg path': {
      display: 'none',
    },
    '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
      backgroundColor: '#1890ff',
      borderColor: '#1890ff',
    },
    '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
      position: 'absolute',
      display: 'table',
      border: '2px solid #fff',
      borderTop: 0,
      borderLeft: 0,
      transform: 'rotate(45deg) translate(-50%,-50%)',
      opacity: 1,
      transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
      content: '""',
      top: '50%',
      left: '39%',
      width: 5.71428571,
      height: 9.14285714,
    },
    '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
      width: 8,
      height: 8,
      backgroundColor: '#1890ff',
      transform: 'none',
      top: '39%',
      border: 0,
    },
  };
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: 'rgba(255,255,255,0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  letterSpacing: 'normal',
  "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer": {
    display: "none"
  },
  '& .MuiDataGrid-columnsContainer': {
    backgroundColor: '#1d1d1d',
    ...theme.applyStyles('light', {
      backgroundColor: '#fafafa',
    }),
  },
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderRight: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderRightColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: '1px solid #303030',
    ...theme.applyStyles('light', {
      borderBottomColor: '#f0f0f0',
    }),
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255,255,255,0.65)',
    ...theme.applyStyles('light', {
      color: 'rgba(0,0,0,.85)',
    }),
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
  ...customCheckbox(theme),
  ...theme.applyStyles('light', {
    color: 'rgba(0,0,0,.85)',
  }),
}));

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (<Pagination color="primary" variant="outlined" shape="rounded" page={page + 1} renderItem={(props2) => <PaginationItem {...props2} disableRipple />} onChange={(event, value) => apiRef.current.setPage(value - 1)} />);
}

const color = 'rgb(99, 102, 241)';
const PAGE_SIZE = 10;

export default function Datagrid() {
  const [paginationModel, setPaginationModel] = useState({ pageSize: PAGE_SIZE, page: 0, });
  const [paginationModel2, setPaginationModel2] = useState({ pageSize: PAGE_SIZE, page: 0, });
  const [groupdata, setgroupdata] = useState([])
  const [inputware, setinputware] = useState([])
  const [autocompletedata, setautocompletedata] = useState([])
  const [autodata, setautodata] = useState([])
  const [selectedItem, setSelectedItem] = useState(null);
  const [showCard, setShowCard] = useState(true);
  const handleAddNew = () => { setShowCard(!showCard); };

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/Assemlist1`);
      if (response.ok) {
        const catArray = await response.json();
        setgroupdata(catArray.list1array)
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    return;
  };

  const fetchInputware = async () => {
    try {
      const response = await fetch(`/api/Inputware`);
      if (response.ok) {
        const wareH = await response.json();
        setinputware(wareH.warehouse)
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    return;
  };

  const fetchDataAdd = async () => {
    try {
      const response = await fetch(`/api/Assemlist2`);
      if (response.ok) {
        const cArry = await response.json();
        const itemNames = cArry.list2array.data.map((item) => item.itemName);
        setautocompletedata(() => {
          const autocompletedata = itemNames;
          return autocompletedata;
        });
        setautodata(() => {
          const autodata = cArry.list2array.data;
          return autodata;
        });
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
    return;
  };

  const [formValues, setFormValues] = useState({
    "date": "",
    "additionalExpensesRatio": 0,
    "additionalExpensesValue": 0,
    "note": "",
    "itemQuanity": 0,
  });


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => {
      const updatedValues = {
        ...prevValues,
        [name]: value,
      };
      return updatedValues;
    });
  };


  useEffect(() => {
    fetchData();
    fetchInputware();
    fetchDataAdd();
  }, []);

  const handleAutocompleteChange = (event, value) => {
    if (value) {
      const selectedRow = autodata.find((item) => item.itemName === value);
      setSelectedItem(selectedRow);
    } else {
      setSelectedItem(null);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedItem || Object.keys(selectedItem).length === 0) {
      console.error('No selected item');
      return false;
    }

    const requestData = {
      "id": 0,
      "date": "2024-08-11T04:52:39.148Z",
      "operationType": 0,
      "warehouseId": 3,
      "additionalExpensesRatio": formValues.additionalExpensesRatio,
      "additionalExpensesValue": formValues.additionalExpensesValue,
      "note": formValues.note,
      "branchId": 3,
      "companyCode": "Testing",
      "isDisabled": false,
      "itemQuanity": formValues.itemQuanity,
      "itemAssemblyItemsDetails": [
        {
          "id": 0,
          "operationId": 0,
          "itemId": 292,
          "quantity": 100,
          "uomId": 1,
          "warehouseId": 3,
          "expenses": 0,
          "cost": 5,
          "note": "string",
          "branchId": 3,
          "isDeleted": false
        }
      ],
      "oprationCost": 230,
      "isManulCalculate": false,
      "itemId": 201,
      "status": 0
    };

    try {
      const response = await fetch('https://inv2api.studioerp.com/api/AssemplyAndDisassemblyOperation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        const [formValues, setFormValues] = useState({"date": "","additionalExpensesRatio": 0,"additionalExpensesValue": 0,"note": "","itemQuanity": 0,});
        console.log('Success:', result);

      } else {
        console.error('Error 1:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }} padding={2}>
        <Grid item xs={4}>
          <Button variant="contained" sx={{ backgroundColor: color, '&:hover': { backgroundColor: color } }} onClick={handleAddNew}>
            {showCard ? 'انشاء / جديد' : 'الغاء'}
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <TextField
              variant="outlined"
              placeholder="بحث ..."
              InputProps={{ startAdornment: (<InputAdornment position="start"> <SearchIcon /></InputAdornment>), }}
              sx={{
                height: 40,
                backgroundColor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': { height: '100%', borderRadius: 1, },
                '& .MuiInputBase-input': { padding: '0 14px', },
              }}
            />
          </Box>
        </Grid>
      </Box>
      <Grid container spacing={2} alignItems="center" >
        <Grid item xs={12}>
          <Slide direction="left" in={showCard} mountOnEnter unmountOnExit timeout={500}>
            <Card>
              <Tacard title="عمليات التجميع">
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                  <div style={{ height: 500, width: '100%' }}>
                    <StyledDataGrid
                      columns={baseCols}
                      checkboxSelection
                      paginationModel={paginationModel}
                      onPaginationModelChange={setPaginationModel}
                      pageSizeOptions={[PAGE_SIZE]}
                      slots={{pagination: CustomPagination,}}
                      rows={groupdata.data}
                    />
                  </div>
                </Box>
              </Tacard>
            </Card>
          </Slide>

          <Slide direction="right" in={!showCard} mountOnEnter unmountOnExit timeout={500}>
            <Card>
              <Tacard title="جديد / عمليات التجميع">
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>

                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={4}>
                        <TextField
                          disabled
                          label="الرقم المرجعي"
                          variant="outlined"
                          fullWidth
                          size="small"
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Autocomplete
                          disablePortal
                          size="small"
                          required
                          options={autocompletedata}
                          onChange={handleAutocompleteChange}
                          sx={{ width: 300 }}
                          renderInput={(params) => <TextField {...params} label="الصنف المراد تجميعه" />}
                        />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth size="small" required>
                          <InputLabel>مستودع الادخال</InputLabel>
                          <Select
                            name="warehouseId"
                            defaultValue=""
                          >
                            {inputware.map((warehouse) => (
                              <MenuItem key={warehouse.id} value={warehouse.id}>
                                {warehouse.lookupName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Box marginTop={1}>
                          <FormControl size="small" fullWidth required>
                            <InputLabel>مستودع الأخراج</InputLabel>
                            <Select defaultValue="">
                              {inputware.map((warehouse) => (
                                <MenuItem key={warehouse.id} value={warehouse.lookupName}>
                                  {warehouse.lookupName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>


                      <Grid item xs={12} sm={4}>
                        <TextField name="itemQuanity" value={formValues.itemQuanity} onChange={handleInputChange} required size="small" fullWidth label="الكمية" variant="outlined" />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField
                          name="date" onChange={handleInputChange} required size="small" fullWidth label="تاريخ البدء" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField size="small" fullWidth label="تاريخ الانتهاء" variant="outlined" type="date" InputLabelProps={{ shrink: true }} />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <TextField name="note" value={formValues.note} onChange={handleInputChange} required size="small" fullWidth label="البيان" variant="outlined" />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <FormControlLabel size="small" control={<Switch />} label="تجميع مباشر (مرحلة واحدة)" labelPlacement="start" />
                      </Grid>

                      <Grid item xs={12} sm={4}>
                        <Box >
                          <Typography variant="h5" color="textSecondary">
                            الية احتساب التكلفة :
                          </Typography>
                          <RadioGroup row defaultValue="combined" sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
                            <FormControlLabel value="combined" control={<Radio />} label="تكلفة الأصناف المجمعة" />
                            <Box sx={{ display: "flex", }} >
                              <FormControlLabel sx={{ width: "100%" }} value="manual" control={<Radio />} label="إدخال يدوي" />
                              <TextField size="small" fullWidth label="" variant="outlined" />
                            </Box>
                          </RadioGroup>
                        </Box>
                      </Grid>

                      <Grid item xs={12} sm={3} sx={{ width: "100%", display: "flex", }}>
                        <Typography sx={{ width: "100%" }} variant="body1" color="textSecondary">
                          مصاريف اضافية
                        </Typography>
                        <TextField onChange={handleInputChange} value={formValues.additionalExpensesValue}  name="additionalExpensesValue" required size="small" fullWidth label="القيمة" variant="outlined" />
                      </Grid>


                      <Grid item xs={12} sm={1.5}>
                        <TextField onChange={handleInputChange} value={formValues.additionalExpensesRatio} name="additionalExpensesRatio" required size="small" fullWidth label="% نسبة" variant="outlined" />
                      </Grid>

                      <Grid item xs={12} marginTop={10}>
                        <Button type='submit' sx={{ marginBottom: 5, }} variant="contained" color="primary">حفظ</Button>

                      </Grid>

                    </Grid>
                  </form>

                  <div style={{ height: 500, width: '100%' }}>
                    <StyledDataGrid
                      columns={addCols}
                      checkboxSelection
                      paginationModel={paginationModel2}
                      onPaginationModelChange={setPaginationModel2}
                      pageSizeOptions={[PAGE_SIZE]}
                      slots={{pagination: CustomPagination,}}
                      rows={selectedItem ? [selectedItem] : []}
                    />
                  </div>
                </Box>
              </Tacard>
            </Card>
          </Slide>
        </Grid>
      </Grid>
    </>
  );
}
