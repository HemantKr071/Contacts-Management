
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  // Creating an empty form where all fields are empty intitially
  const handleClick = async () => {
    const tempId = '1234'; // Create a temporary ID
    const newRecord = {
      id: tempId,
      firstname: "X",
      lastname: "X",
      email: "X",
      phoneNumber: "X",
      company: "X",
      jobTitle: "X",
      isNew: true, 
    };
  
    setRows((oldRows) => [...oldRows, newRecord]); // Add new row in frontend ,empty
  
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [tempId]: { mode: GridRowModes.Edit, fieldToFocus: "firstname" }, // Set the new row to edit mode
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function Table() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/contacts");
  
        // A new array with only the required fields
        const mappedRows = response.data.map((item) => ({
          id: item._id, // Map _id to id
          firstname: item.firstname,
          lastname: item.lastname,
          email: item.email,
          phoneNumber: item.phoneNumber,
          company: item.company,
          jobTitle: item.jobTitle,
        }));
  
        setRows(mappedRows); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

  },[])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    console.log(id);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/contacts/${id}`);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    if (newRow.isNew) {
      try {
        // Send POST request for new records
        const { id, ...rowData } = newRow;
        const response = await axios.post("http://localhost:3000/api/v1/contacts", rowData);
        
         // Extract the client data from the response
        const { client } = response.data;

        const savedRow = {
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        phoneNumber: client.phoneNumber,
        company: client.company,
        jobTitle: client.jobTitle,
        id: client._id, // Mapped id from server
      };
        setRows((oldRows) => oldRows.map((row) => (row.id === newRow.id ? savedRow : row)));
        return savedRow;
      } catch (error) {
        console.error('Error saving new record:', error);
        throw error; 
      }
    }

    // If not adding new record, It means updating an existing record
    else {
      try {
        
        await axios.put(`http://localhost:3000/api/v1/contacts/${newRow.id}`, newRow);
        return newRow;
      } catch (error) {
        console.error("Error updating record:", error);
        throw error; 
      }
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: 'firstname', headerName: 'First Name', width: 180, editable: true },
    {
      field: 'lastname',
      headerName: 'Last Name',
      width: 180,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
      editable: true,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      width: 180,
      editable: true,
    },
    {
        field: 'company',
        headerName: 'Company',
        width: 180,
        editable: true,
    },
    {
        field: 'jobTitle',
        headerName: 'Job Title',
        width: 180,
        editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={() => {
          console.error("Error while updating row:");
        }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
