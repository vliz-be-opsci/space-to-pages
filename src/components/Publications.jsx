import React from "react";

export const Publications = (props) => {
  return (
    <div id="publications">
      <div className="container">
        <div className="section-title text-center">
          <h2>Publications</h2>
        </div>
        <div className="row">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {props.data
              ? props.data.map((d, i) => (
                  <tr key={`${d.title}-${i}`}>
                    <td>
                      <a href={d.link} target="_blank" rel="noreferrer">{d.title}</a>
                    </td>
                    <td>
                      {d.text}
                    </td>
                  </tr>
                ))
              : "loading"}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
