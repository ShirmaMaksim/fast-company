import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children, onRenderContent }) => {
    return (
        <table className="table">
            { children || <>
                <TableHeader { ...{ onSort, selectedSort, columns }} />
                <TableBody { ...{ data, columns, onRenderContent }} />
            </> }
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array,
    onRenderContent: PropTypes.func
};

export default Table;
