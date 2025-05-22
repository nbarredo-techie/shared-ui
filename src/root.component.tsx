import "./input.css";
import { Button } from "./terraboost-shared-ui";

export default function Root(props) {
  return <Button>{props.name} is mounted!</Button>;
}
