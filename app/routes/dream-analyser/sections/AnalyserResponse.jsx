import PropTypes from "prop-types";
import HeroAnalysedCard from "../components/HeroAnalysedCard";
import MKBox from "~/components/MKBox";

const analyserResponseImg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa";

function AnalyserResponse({ analysedDream, disabled = false, loading = false }) {
  const { query, response, context } = analysedDream;
  return (
    <MKBox>
      <HeroAnalysedCard
        disabled={disabled}
        loading={loading}
        analyserObj={{ query: query, response: response, context: context }}
        image={analyserResponseImg}
        badge={{ content: "new analysis", color: "info" }}
        position={{ color: "info", label: "UI Designer" }}
      />
    </MKBox>
  );
}

AnalyserResponse.propTypes = {
  analysedDream: PropTypes.object,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default AnalyserResponse;
