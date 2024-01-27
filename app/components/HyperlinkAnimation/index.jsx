import MKTypography from "~/components/MKTypography";
import Icon from "@mui/material/Icon";
import PropTypes from "prop-types";

function HyperlinkAnimation({ content }) {
  const { text, icon, iconWeight, fontSize, fontWeight, color, variant, link } = content;

  const typographyProps = {
    variant,
    color,
    fontWeight,
    fontSize,
    sx: {
      width: "max-content",
      display: "flex",
      alignItems: "center",
      "& .material-icons-round": {
        fontSize: "1.19rem",
        transform: "translateX(3px)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
      },
      "&:hover .material-icons-round, &:focus .material-icons-round": {
        transform: "translateX(6px)",
      },
    },
  };

  const typographyContent = (
    <>
      {text}
      {"   "}
      <Icon sx={{ fontWeight: { iconWeight } }}>{icon}</Icon>
    </>
  );

  return (
    <>
      {link ? (
        <a href={link} style={{ textDecoration: "none" }}>
          <MKTypography {...typographyProps}>{typographyContent}</MKTypography>
        </a>
      ) : (
        <MKTypography {...typographyProps}>{typographyContent}</MKTypography>
      )}
    </>
  );
}

// Typechecking props
HyperlinkAnimation.propTypes = {
  content: PropTypes.shape({
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconWeight: PropTypes.string.isRequired,
    fontSize: PropTypes.string.isRequired,
    fontWeight: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    variant: PropTypes.string.isRequired,
    link: PropTypes.string,
  }).isRequired,
};
export default HyperlinkAnimation;
