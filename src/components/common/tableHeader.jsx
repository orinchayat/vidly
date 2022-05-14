import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };

    if (path === sortColumn.path)
      // just change order direction
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path !== column.path) return;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns } = this.props;

    return (
      <thead>
        <tr>
          {columns.map((c) => (
            <th
              className="clickable"
              key={c.path || c.key}
              onClick={() => this.raiseSort(c.path)}
            >
              {c.label}
              {this.renderSortIcon(c)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
