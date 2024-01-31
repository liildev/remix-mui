// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "~/components/MKBox";
// import MKTypography from "~/components/MKTypography";

// Material Kit 2 PRO React example components
import DefaultNavbar from "~/examples/Navbars/DefaultNavbar";
import SimpleFooter from "~/examples/Footers/SimpleFooter";

// Material kit 2 PRO React page layout routes
import routes from "~/constants/routes/main";

function CoverLayout({ coverHeight, image, children }) {
  return (
    <MKBox height="calc(100vh - 1rem)">
      <MKBox width="100%" position="absolute" top="0.25rem">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-pro-react",
            label: "buy now",
          }}
          transparent
          light
        />
      </MKBox>
      <MKBox
        width="calc(100% - 2rem)"
        minHeight={coverHeight}
        borderRadius="xl"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox mt={{ xs: -20, lg: -18 }} px={1} width="calc(100% - 2rem)" mx="auto">
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" bottom="1.625rem">
        <SimpleFooter />
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the CoverLayout
CoverLayout.defaultProps = {
  coverHeight: "35vh",
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
  coverHeight: PropTypes.string,
  image: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default CoverLayout;