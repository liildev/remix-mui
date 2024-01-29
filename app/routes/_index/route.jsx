/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { json, useLoaderData } from "@remix-run/react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
// Material Kit 2 PRO React components
import MKBox from "~/components/MKBox";
import MKTypography from "~/components/MKTypography";

// Material Kit 2 PRO React examples
import DefaultNavbar from "~/examples/Navbars/DefaultNavbar";

// Presentation page sections
import MainPageCards from "./sections/MainPageCards";
import GetFeedback from "~/components/Sections/GetFeedback";

// Components
import DefaultFooter from "~/components/Footers/DefaultFooter";

// Sections
import DreamsOverview from "./sections/DreamsOverview";
// import ContentRequest from "./sections/ContentRequest";

import { metaCreator } from "~/meta";
import { useSupabaseSession } from "~/auth/client";

// Routes
import routes from "~/routes";
import footerRoutes from "~/footer.routes";

// Images
import bgImage from "~/assets/images/uyd-banner.png";


export const meta = () => metaCreator('Use Your Dream', 'UYD: Free Dream Analyser and guides to understand and use your dreams more effectively', '/palm.jpeg');


export const loader = async () => {
  return json({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  });
}

function Home() {
  const { supabaseUrl, supabaseAnonKey } = useLoaderData();
  const { session } = useSupabaseSession(supabaseUrl, supabaseAnonKey);
  const [, setUserSession] = useState(null);

  useEffect(() => {
    setUserSession(session);
    console.log("HomeSession", session);
  }, [session]);

  return (
    <>
      <DefaultNavbar routes={routes} brand="Use Your Dream" sticky />

      <MainPageCards />
      <MKBox
        minHeight="60vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Use Your Dream
            </MKTypography>
            <MKTypography variant="body1" color="white" textAlign="center" px={6} mt={1}>
              Tap into the depths of your unconscious mind for empowerment and growth
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          // mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <DreamsOverview />
        <GetFeedback />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Home;
