import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
 
export const baseCols = [
  { field: 'code', headerName: 'الرقم المرجعي', flex: 1, minWidth: 100 },
  { field: 'itemName', headerName: 'الصنف المجمع', flex: 1, minWidth: 120 },
  { field: 'qyantity', headerName: 'الكمية', flex: 0.5, minWidth: 80 },
  { field: 'date', headerName: 'تاريخ البدء', flex: 1, minWidth: 120 },
  { field: 'endDate', headerName: 'تاريخ الانتهاء', flex: 1, minWidth: 120 },
  { field: 'sourceName', headerName: 'مستودع الإدخال', flex: 1, minWidth: 120 },
  { field: 'distinationName', headerName: 'مستودع الإخراج', flex: 1, minWidth: 120 },
  { field: 'cost', headerName: 'التكلفة', flex: 0.5, minWidth: 80 },
  { field: 'extra', headerName: 'مصاريف إضافية', flex: 1, minWidth: 120 },
  { field: 'note', headerName: 'البيان', flex: 1, minWidth: 150 },
  {
    field: 'actions',
    headerName: 'الإجراءات',
    flex: 1,
    minWidth: 150,
    renderCell: (params) => {
      const handleEdit = () => {
        console.log('Edit', params.row);
      };

      const handleDelete = () => {
        console.log('Delete', params.row);
      };

      return (
        <div>
          <IconButton onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="primary">
            <DeleteIcon />
          </IconButton>
        </div>
      );
    },
  },
];


export const addCols = [
  { field: 'code', headerName: 'رمز الصنف', },
  { field: 'itemName', headerName: 'اسم الصنف', },
  { 
    field: 'uomName', 
    headerName: 'الكمية',
    renderCell: (params) => {
      const uoms = params.row.uoms;
      return uoms && uoms.length > 0 ? uoms[0].uomName : 'N/A';
    }
  },
  { field: 'defaultUOMId', headerName: 'وحدة القياس', },
  { 
    field: 'avg', 
    headerName: 'التكلفة',
    renderCell: (params) => {
      const uoms = params.row.uoms;
      return uoms && uoms.length > 0 ? uoms[0].avgCost : 'N/A';
    }
  },
  {
    field: 'avgCost',
    headerName: 'الأجمالي',
    renderCell: (params) => {
      const uoms = params.row.uoms;
      if (uoms && uoms.length > 0) {
        const avgCost = uoms[0].avgCost;
        const result = avgCost + avgCost * 0.15;
        return result;
      } else {
        return 'N/A';
      }
    }
  },
  { field: 'itemMasterId', headerName: 'المستودع', },
  { field: 'searchvalue', headerName: 'ملاحظات', },
];