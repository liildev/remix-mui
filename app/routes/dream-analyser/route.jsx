/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { json, useLoaderData } from "@remix-run/react";
// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "~/components/MKBox";
import MKTypography from "~/components/MKTypography";

// Components
import DefaultNavbar from "~/components/Navbars/DefaultNavbar";
import DefaultFooter from "~/components/Footers/DefaultFooter";

// Sections
import Analyser from "./sections/Analyser.jsx";
import RecentlyAnalysedDreams from "./sections/RecentlyAnalysedDreams.jsx";

import DreamStats from "./sections/DreamStats.jsx";
import GetFeedback from "~/components/Sections/GetFeedback";

// Routes
import routes from "~/constants/routes/main";
import footerRoutes from "~/constants/routes/footer";

// Images
import bgImage from "~/assets/images/bg-about-us.jpg";
import AnalyserResponse from "./sections/AnalyserResponse.jsx";

// Functions & Helpers
import { analyseDream, publishAnalysedDream } from "~/lib/api";
import {
  apiCallsLeft,
  formatQuery,
  formatterAnalysedDream,
  saveAnalysedDreamToLocalStorage,
} from "~/lib/helpers";
import { ANALYSER_INPUT_MAX_CHARS, DEFAULT_MAX_API_CALLS } from "~/constants";
import { metaCreator } from "~/lib/meta";

function validateInput(input, length) {
  if (input.length < length) {
    alert("Please use at least 20 characters to describe your dream.");
    return false;
  }
  return true;
}

const originalData = {
  id: "UYD1630546800000",
  userId: "612f1b0a1c9d5b006a0f1b9e",
  query: "I dreamt was eating the sandwich and then I woke up.",
  context: "I was in the kitchen",
  response: "You are a very creative person.",
  date: "2021-09-01T00:00:00.000Z",
};

export const meta = () => metaCreator("Dream Analyser", "Unlock the secrets of your subconscious with our dream analyzer app, guiding you towards self-discovery and inner understanding.", "/palm.jpeg")

export const loader = async () => {
  return json({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    dev: process.env.DEV,
  });
}

const DreamAnalyser = () => {
  const [query, setQuery] = useState("");
  const [context, setContext] = useState("");
  const [savedDreams, setSavedDreams] = useState(
    Array.from({ length: 20 }, () => ({ ...originalData }))
  );

  const [lastAnalysedDream, setLastAnalysedDream] = useState({});
  const [loading, setLoading] = useState(false);
  const { accessKeyId, secretAccessKey, dev } = useLoaderData();

  useEffect(() => {
    const fetchData = async () => {
      const analysedDreamsLocal = JSON.parse(localStorage.getItem("uyd_saved"));
      console.log("analysedDreamsLocal", analysedDreamsLocal);
      analysedDreamsLocal && setSavedDreams(analysedDreamsLocal);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e, analyser, context) => {
    e.preventDefault();
    setLoading(true);
    if (!validateInput(analyser.value, 20)) {
      setLoading(false);
      return;
    }

    try {
      if (apiCallsLeft(savedDreams, DEFAULT_MAX_API_CALLS) > 0) {
        const formattedQuery = formatQuery(analyser.value, context.value);
        const dreamResponse = await analyseDream(formattedQuery);
        console.log(dreamResponse);
        const analysedDream = formatterAnalysedDream({
          query,
          analysedDream: dreamResponse,
          session: null,
          context: context.value,
        });
        setLastAnalysedDream(analysedDream);
        await publishAnalysedDream(analysedDream, accessKeyId, secretAccessKey, dev);
        saveAnalysedDreamToLocalStorage(analysedDream, setSavedDreams);
        if (apiCallsLeft(savedDreams, DEFAULT_MAX_API_CALLS) === 1) {
          alert(`You have one more dream to analyse for today! 1️⃣`);
        }
      } else {
        alert(
          `You have reached your limit of ${DEFAULT_MAX_API_CALLS} analysed dreams per day 🙈. Please try again tomorrow!`
        );
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <DefaultNavbar routes={routes} brand={"Use Your Dream"} transparent light />
      <MKBox
        minHeight="50vh"
        width="100%"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.85),
              rgba(gradients.dark.state, 0.85)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid
            container
            item
            xs={12}
            lg={8}
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ mx: "auto", textAlign: "center" }}
          >
            <MKTypography
              variant="h1"
              color="white"
              mb={2}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Dream Analyser
            </MKTypography>
            <MKTypography variant="body1" color="white" opacity={0.8} mt={1} mb={3}>
              Unravel the hidden meanings behind your dreams. Describe them here and gain valuable
              insights into your inner thoughts and emotions.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Analyser
          analyser={{
            title: "tell us about your dream",
            rows: 3,
            maxLength: ANALYSER_INPUT_MAX_CHARS,
            value: query,
            placeholderText: "I was flying in the sky and then I fell down and after...",
            onChange: (e) => {
              e.preventDefault();
              setQuery(e.target.value);
            },
          }}
          context={{
            title: "(Optional) Click to add Context here",
            maxLength: 300,
            placeholderText: "Context placeholder text",
            onChange: (e) => setContext(e.target.value),
            value: context,
            rows: 2,
          }}
          onSubmit={handleSubmit}
          placeholderText="I was flying in the sky and then I fell down and after.. "
        />
        <AnalyserResponse
          analysedDream={lastAnalysedDream}
          loading={loading}
          disabled={!(loading || Object.keys(lastAnalysedDream).length !== 0)}
        />
        <RecentlyAnalysedDreams
          dreams={savedDreams}
          setData={setSavedDreams}
          title="Recently Analysed Dreams"
          subtitle="Get a glimpse into your subconscious mind with our insightful interpretations."
          handleDeleteDream={(dreamId) => {
            const filteredDreams = savedDreams.filter((dream) => dream.id !== dreamId);
            setSavedDreams(filteredDreams);
            localStorage.setItem("uyd_saved", JSON.stringify(filteredDreams));
          }}
        />
        <DreamStats />
        <GetFeedback />
      </Card>
      <MKBox pt={4} px={1} mt={4}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
};

export default DreamAnalyser;
