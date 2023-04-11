import React from "react";

export const GroupedCratesTable = (props) => {
    console.log(props);
    return (
        <div className="container">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="row">
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th>Crate description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data
                            ? props.data.index.map((d, i) => (
                                <tr key={`${d.path}-${i}`}>
                                    <td><a href={d.path} >{d.label}</a></td>
                                </tr>
                            ))
                            : "loading"}
                    </tbody>
                </table>
            </div>
        </div>
    );
}