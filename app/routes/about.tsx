import { Box } from "@mui/material";
import { MetaFunction } from "@remix-run/node";


export const meta: MetaFunction = () => [
  { title: 'About page' },
  { name: 'description', content: 'Welcome to about!' },
];

export const About = () => {
  return (
    <Box sx={{ background: 'black', color: 'white' }}>About</Box>
  )
}

export default About;
