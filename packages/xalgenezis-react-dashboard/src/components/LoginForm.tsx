//= Functions & Modules
// Packages
import React from "react";
import { Container, Input, Button } from "@aykelith/xalgenezis-react-theme";

export default class LoginForm extends React.PureComponent {
  render() {
    return (
      <Container verticali {...this.props.containerProps}>
        <Input />
        <Input />
        <Button />
      </Container>
    );
  }
}
