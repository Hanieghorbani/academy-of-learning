import React from "react";
import { Link } from "react-router-dom";

export default function Button(props) {
  if (props.to) {
    return (
      <Link to={props.to} class={props.class}>
        {props.children}
      </Link>
    );
  } else if (props.href) {
    return (
      <a href={props.href} class={props.class}>
        {props.children}
      </a>
    );
  } else {
    return (
      <button
        class={props.class}
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }
}
