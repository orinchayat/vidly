import React, { Component } from "react";
const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";

  return <i onClick={onClick} className={classes} aria-hidden="true"></i>;
};

export default Like;
