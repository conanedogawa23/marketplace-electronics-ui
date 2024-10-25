import { Box } from "@mui/material";
import HeaderSection from "../components/HeaderSection";

const AdjustStockDetail = () => {
  return (
    <Box component='main' flexGrow={1} overflow='scroll'>
      <HeaderSection
        onCancel={() => { console.log('Cancel') }}
        onDone={() => { console.log('Done') }}
        products={[]}
      />
    </Box>
  )
}

export default AdjustStockDetail;