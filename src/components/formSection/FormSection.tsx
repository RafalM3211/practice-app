import Grid from '@mui/material/Grid';
import type { FC, ReactNode } from "react";

const FormSection: FC<{children: ReactNode}> = (props) => {
  return (
    <Grid mb={3} mt={1} container gap={3}>
      {props.children}
    </Grid>
  );
};

export default FormSection;
