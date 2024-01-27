// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 PRO React components
import MKBox from "~/components/MKBox";
import MKTypography from "~/components/MKTypography";

// Material Kit 2 PRO React components
import SimpleBookingCard from "~/examples/Cards/BookingCards/SimpleBookingCard";

// Images
const product2 = "https://images.unsplash.com/photo-1550767988-929d81a0a090";
const product1 = "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04";
const product3 = "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba";

function BlogPostTwo() {
  const actionProps = {
    type: "internal",
    route: "guides/having-nightmares",
    color: "primary",
    label: "read more",
  };

  return (
    <MKBox component="section" py={3}>
      <Container>
        <Grid container spacing={1} sx={{ textAlign: "center", flexDirection: "column" }}>
          <MKTypography variant="h3" mb={1}>
            Featured Guides
          </MKTypography>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product2}
                title="Having Nightmares"
                description="Nightmares are a type of dream that can be unsettling and often quite intense. Most of us will experience nightmares at some point in our lives and they can be a source of fear and confusion. It is important to remember, however, that nightmares..."
                action={{ ...actionProps }}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product1}
                title="Teeth Falling Out"
                description="Teeth are closely associated with our sense of identity, so if we feel insecure about our appearance, it can manifest as teeth falling out in a..."
                action={{ ...actionProps, route: "/guides/teeth-falling-out" }}
              />
            </MKBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MKBox mt={3}>
              <SimpleBookingCard
                image={product3}
                title="Recurring Dreams"
                description="Recurring dreams can often feel like déjà vu, as if you’ve had the same dream before. They may be so vivid and intense that they seem like memories. While the exact meaning..."
                action={{ ...actionProps, route: "/guides/recurring-dreams" }}
              />
            </MKBox>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default BlogPostTwo;
