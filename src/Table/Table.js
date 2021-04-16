import React from 'react';
const Table = (props) => {
    const rows = props.data.map(({ name, status, species, episodes }, i) => {
        return (<tr key={i}>
            <td>{name}</td>
            <td>{status}</td>
            <td>{species}</td>
            {/* <td>{episodes}</td> */}
        </tr>)
    })
    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                </th>
                        <th>
                            Status
                </th>
                        <th>
                            Species
                </th>
                        <th>
                            Episode
                </th>
                    </tr>
                </thead>

                <tbody>
                    {rows}
                </tbody>
            </table>
        </React.Fragment>

    )
}
export default Table;