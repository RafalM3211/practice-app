import { useQuery, useMutation } from 'react-query';
import { useMemo, useState, useCallback } from 'react';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import { GridActionsCellItem, gridStringOrNumberComparator, gridNumberComparator} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useSnackbarContext } from '../../context/snackbar';
import Table from '../../components/table/Table';
import ButtonLink from '../../components/link/ButtonLink';
import ViewHeader from '../../components/headers/MainHeader';
import Modal from '../../components/modal/Modal';
import { getPostsRequest, sendDeleteRequest } from '../../core/services/posts';
import { Tooltip } from '@mui/material';
import type { Post } from '../../globalTypes/globalTypes';
import type {GridComparatorFn, GridRowParams, GridRowId } from '@mui/x-data-grid';


const Main = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [deletedPost, setDeletedPost] = useState<Post | null>(null);
  const { successNotification, errorNotification } = useSnackbarContext();
  const { isLoading, isRefetching, data: rowsData, error, refetch } = useQuery('posts', getPostsRequest);
  const { mutate, isLoading: isDeletingLoading } = useMutation(sendDeleteRequest, {
    onSuccess: () => {
      setModalOpen(false);
      successNotification('Usunięto pomyślnie');
      refetch();
    },
    onError: ({ errorMessage }) => {
      setModalOpen(false);
      errorNotification(errorMessage);
    },
  });

  const handleEditClick = useCallback((id: GridRowId) => {
    navigate(`/edit/${id}`);
  }, [navigate]); 

  const handleDeleteClick = useCallback((row: Post) => {
    setDeletedPost(row);
    setModalOpen(true);
  }, [setDeletedPost, setModalOpen]);

  const deletePost = () => {
    if(!deletedPost) throw new Error("Deleted post set to null");
    mutate(deletedPost.id);
  };

  const comparator: GridComparatorFn = (v1, v2, param1, param2) => {
    const title1Parsed = parseInt(v1);
    const title2Parsed = parseInt(v2);
    if (!isNaN(title1Parsed) && !isNaN(title2Parsed)) {
      return gridNumberComparator(title1Parsed, title2Parsed, param1, param2);
    }
    return gridStringOrNumberComparator(v1, v2, param1, param2);
  };

  const columns = useMemo(
    () => [
      {
        field: 'title',
        headerName: 'tytuł posta',
        minWidth: 130,
        flex: 0.2,
        sortComparator: comparator,
      },
      {
        field: 'content',
        headerName: 'treść',
        flex: 0.8,
        minWidth: 200,
        sortComparator: comparator,
      },
      {
        field: 'actions',
        headerName: 'Akcje',
        type: 'actions',
        getActions: (rowParams: GridRowParams) => {
          return [
            <Tooltip title="Edytuj">
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                onClick={() => {
                  handleEditClick(rowParams.id);
                }}
              />
            </Tooltip>,
            <Tooltip title="Usuń">
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  handleDeleteClick(rowParams.row);
                }}
              />
            </Tooltip>,
          ];
        },
      },
    ],
    [handleEditClick, handleDeleteClick],
  );

  return (
    <Container>
      <>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <ViewHeader>Lista postów</ViewHeader>
          <ButtonLink variant="contained" to="/add">
            dodaj
          </ButtonLink>
        </Box>

        {error && (
          <Alert sx={{ mb: 1 }} severity="error">
            <AlertTitle>Błąd</AlertTitle>
            Wystąpił nieznany błąd podczas generowania tabeli
          </Alert>
        )}

        <Table loading={isLoading || isRefetching} columns={columns} rows={rowsData || []} disableVirtualization={true} />
        {isModalOpen ? (
          <Modal
            title={deletedPost?.title || ''}
            loading={isDeletingLoading}
            onConfirm={() => {
              deletePost();
            }}
            onCancel={() => {
              setModalOpen(false);
            }}
          />
        ) : null}
      </>
    </Container>
  );
};

export default Main;