import React from "react";
import PropTypes from "prop-types";

const TableBody = ({ data, columns, onRenderContent }) => {
    return (
        <tbody>
            { data.map(item => (
                <tr key={ item._id }>
                    { Object.keys(columns).map(column => (<td key={ column }>{ onRenderContent(item, column) }</td>)) }
                </tr>
            )) }
        </tbody>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired,
    onRenderContent: PropTypes.func
};

export default TableBody;
