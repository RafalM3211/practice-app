import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import type { FC } from 'react';
import type { AllNumber } from '../../globalTypes/utitityTypes';
import type { Column } from '../../components/table/types';
import type { Post } from '../../globalTypes/globalTypes';


const tableTranslations = {
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Pokaż kolumny',
  columnMenuFilter: 'Filtruj',
  columnMenuHideColumn: 'Ukryj',
  columnMenuUnsort: 'Nieposortowane',
  columnMenuSortAsc: 'Sortuj rosnąco',
  columnMenuSortDesc: 'Sortuj malejąco',
  columnsPanelTextFieldLabel: 'Znajdź kolumnę',
  columnsPanelTextFieldPlaceholder: 'Tytuł kolumny',
  columnsPanelShowAllButton: 'Pokaż wszystkie',
  columnsPanelHideAllButton: 'Ukryj wszystkie',
  checkboxSelectionHeaderName: 'Pola wyboru',
  filterPanelAddFilter: 'Dodaj filtr',
  filterPanelDeleteIconLabel: 'Usuń',
  filterPanelLinkOperator: 'Operator logiczny',
  filterPanelOperatorAnd: 'I',
  filterPanelOperatorOr: 'Lub',
  filterPanelColumns: 'Kolumny',
  filterPanelInputLabel: 'Wartość',
  filterPanelInputPlaceholder: 'Wartość filtru',
  filterOperatorContains: 'zawiera',
  filterOperatorEquals: 'jest równe',
  filterOperatorStartsWith: 'zaczyna się z',
  filterOperatorEndsWith: 'kończy się z',
  filterOperatorIsEmpty: 'jest puste',
  filterOperatorIsNotEmpty: 'nie jest puste',
  filterOperatorIsAnyOf: 'jest dowolnym z',
  noRowsLabel: 'brak postów',
  toolbarFiltersTooltipActive: (count: number) => (count !== 1 ? `${count} aktywne filtry` : `${count} aktywny filtr`),
  footerRowSelected: (count: number) =>
    count !== 1 ? `${count.toLocaleString()} wierszy zaznaczonych` : `${count.toLocaleString()} wiersz zaznaczony`,
};

const generateDisplayedRowsLabel = ({ from, to, count, pageSize }: AllNumber) => {
  const currentPage = Math.ceil(to / pageSize);
  const totalPages = Math.ceil(count / pageSize);
  return `${currentPage} z ${totalPages}`;
};

interface Props {
  loading: boolean,
  columns: Column[],
  rows: Post[],
}

const Table: FC<Props> = (props) => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rowsPerPageOptions={[10, 25]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        localeText={{
          ...tableTranslations,
          MuiTablePagination: {
            labelRowsPerPage: 'Wierszy na stronę: ',
            labelDisplayedRows: ({ from, to, count }) => {
              return generateDisplayedRowsLabel({ from, to, count, pageSize });
            },
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default Table;
