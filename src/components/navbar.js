//this component is the navbar that is displayed on the top of the page



function navbar(data) {
    const apaceimage = {
        background: `url(${data.main_image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <div id="navbar" style={apaceimage}>
            <img src={data.logo} className="project_logo"></img>
            <div id="navbar-right">
                <a class="active" href="#home">Home</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        </div>
    );
}

export default navbar;