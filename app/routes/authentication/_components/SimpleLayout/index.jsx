// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "~/components/MKBox";
// import MKTypography from "~/components/MKTypography";

// Material Kit 2 PRO React example components
import DefaultNavbar from "~/examples/Navbars/DefaultNavbar";
// import CenteredFooter from "~/examples/Footers/CenteredFooter";

// Material kit 2 PRO React page layout routes
import routes from "~/constants/routes/main";

function SimpleLayout({ children }) {
  return (
    <MKBox height="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-pro-react",
          label: "buy now",
          color: "info",
        }}
        transparent
      />
      <MKBox width="calc(100% - 2rem)" px={1} mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
        {/* <CenteredFooter /> */}
      </MKBox>
    </MKBox>
  );
}

// Typechecking props for the SimpleLayout
SimpleLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SimpleLayout;
