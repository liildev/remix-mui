// @mui material components
// import Card from "@mui/material/Card";

// Material Kit 2 PRO React components
import MKBox from "~/components/MKBox";

// Material Kit 2 PRO React examples
import DefaultNavbar from "~/examples/Navbars/DefaultNavbar";
import DefaultFooter from "~/examples/Footers/SimpleFooter";

// Pricing page sections
import Header from "./sections/Header";
import AboutUs from "./sections/AboutUs";
import PricingSection from "./sections/Pricing";
import LifetimeMembership from "./sections/LifetimeMembership";
import Testimonials from "./sections/Testimonials";
import Trust from "./sections/Trust";
import Faq from "./sections/Faq";

// Routes
import routes from "~/constants/routes/main";
import footerRoutes from "~/constants/routes/footer";
import { metaCreator } from "~/lib/meta";

export const meta = () => metaCreator('Pricing', 'Pricing desc');

function Pricing() {
  return (
    <>
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
      <Header />
      <MKBox p={3}>
        <AboutUs />
        <PricingSection />
        <LifetimeMembership />
        <Testimonials />
        <Trust />
        <Faq />
      </MKBox>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Pricing;
