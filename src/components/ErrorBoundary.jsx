import React, { Component } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(
      "Error boundary successfully caught the error",
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      // Render an error fallback UI
      return <ErrorFallback />;
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

const ErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="error">
        <h2>AN ERROR OCCURRED!</h2>
        <div className="buttons">
          <button onClick={() => navigate("/")}>HOME</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
