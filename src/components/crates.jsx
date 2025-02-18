import React from "react";

export const Crates = (props) => {
  //disable all background scrolling when modal is open

  //function here that will redirect to given url or that will open a modal with the crate info
  const crateClick = (crate) => {
    //go to crate.url
    console.log(crate);
    window.open(crate.crateurl, "_blank");
  };

  const githubClick = (crate) => {
    //go to crate.url
    console.log(crate);
    window.open(crate.url, "_blank");
  };

  const colorPalette = {
    yellow: '#FFFF00',
    orange: '#FFA500',
    black: '#000000',
    white: '#FFFFFF',
    lightGray: '#F0F0F0',
  };

  // get all unique keyword values from all crates , assign a color from the color palette to each keyword
  // if the amount of unique keywords is greater than the amount of colors in the palette, then assign a random color to the keyword
  const getKeywordColors = (crates) => {
    let keywordColors = {};
    let keywordColorPalette = Object.keys(colorPalette);
    let keywordSet = new Set();
    crates.forEach((crate) => {
        keywordSet.add(crate.keyword);
    });
    let keywordArray = Array.from(keywordSet);
    keywordArray.forEach((keyword, index) => {
      if (index < keywordColorPalette.length) {
        keywordColors[keyword] = colorPalette[keywordColorPalette[index]];
      } else {
        keywordColors[keyword] = colorPalette['black'];
      }
    });
    return keywordColors;
  };

  // add the color of the keyword to the crate as a property color
  const addKeywordColorsToCrates = (crates, keywordColors) => {
    crates.forEach((crate) => {
      crate.color = keywordColors[crate.keyword];
    });
    return crates;
  };

  // function to make ellipse from long text
  const ellipseText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  };

  console.log(props.data);

  const keywordColors = getKeywordColors(props.data);
  const cratesWithColors = addKeywordColorsToCrates(props.data, keywordColors);

  // Group crates by keyword
  const groupedCrates = cratesWithColors.reduce((acc, crate) => {
    if (!acc[crate.keyword]) {
      acc[crate.keyword] = [];
    }
    acc[crate.keyword].push(crate);
    return acc;
  }, {});

  return (
    <div id="crates" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Our Data packages</h2>
        </div>
        {Object.keys(groupedCrates).map((keyword) => (
          <div key={keyword}>
            <h4>{keyword}</h4>
            <div
              className="row justify-content-center"
              style={{ marginBottom: "10px" }}
            >
              {groupedCrates[keyword].map((d, i) => (
                <div
                  key={`${d.name}-${i}`}
                  className="col-md-3 d-flex justify-content-center"
                >
                  <div
                    style={{
                      borderLeft: `7px solid`,
                      borderImage: `linear-gradient(white, ${d.color}, white) 1`,
                    }}
                  >
                    <div
                      className="card"
                      style={{
                        minWidth: "18rem",
                        minHeight: "150px",
                        maxHeight: "150px",
                        marginBottom: "5em",
                        borderTop: "2px solid white",
                        borderRight: "2px solid white",
                        borderBottom: "2px solid white",
                        borderRightColor: "white",
                        borderTopColor: "white",
                        borderBottomColor: "white",
                      }}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{d.name}</h5>
                        <h6 className="card-subtitle text-muted">{d.subtitle}</h6>
                        <p className="card-text">{ellipseText(d.text, 50)}</p>
                        <a
                          href={d.url}
                          className="card-link"
                          onClick={(e) => {
                            e.preventDefault();
                            githubClick(d);
                          }}
                        >
                          <i className="fa fa-github"></i>
                        </a>
                        {d.crateurl && (
                          <a
                            href={d.crateurl}
                            className="card-link"
                            onClick={(e) => {
                              e.preventDefault();
                              crateClick(d);
                            }}
                          >
                            <i className="fa fa-archive"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
