import c from "./styles/styles.module.scss";
import { Component } from "react";
import Container from "components/Container";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentDidCatch(err) {
    console.error(err);
    this.setState({ error: err });
  }

  render() {
    if (this.state.error) {
      return (
        <Container className={c.container}>
          <p>{this.state.error.message || "Something went wrong!"}</p>
        </Container>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
